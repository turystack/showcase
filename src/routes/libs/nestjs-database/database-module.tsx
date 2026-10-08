import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-database/database-module')({
	component: Page,
})

const options = [
	{
		description:
			"The engine. A discriminated union: each arm brings its own config block and its own schema builder, so choosing one and passing the other's schema does not compile.",
		name: 'adapter',
		required: true,
		type: "'postgresql' | 'dynamodb'",
	},
	{
		description:
			"The PostgreSQL connection URL. Required with adapter: 'postgresql'.",
		name: 'postgresql.url',
		required: false,
		type: 'string',
	},
	{
		description:
			"Region, table prefix, endpoint and credentials. Required with adapter: 'dynamodb' — see the DynamoDB page.",
		name: 'dynamodb',
		required: false,
		type: 'DynamodbOptions',
	},
	{
		description:
			"A function that receives the engine's schema builder and returns the table definitions.",
		name: 'schemaResolver',
		required: true,
		type: '(schema: PgSchemaBuilder | DynamoSchemaBuilder) => …',
	},
	{
		description:
			'An optional function that receives materialized tables and a relations helper to define Drizzle relations. PostgreSQL only — relations have no counterpart in a key-value store.',
		name: 'relationsResolver',
		required: false,
		type: '(tables, helpers) => RelationsResolverResult',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					DatabaseModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Global module that connects and builds the repositories. Register it
					once at the app root.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`DatabaseModule.register(
  options: DatabaseModuleOptions | ((config: ConfigService) => DatabaseModuleOptions),
): DynamicModule`}
					filename="database-module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the app.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Basic Usage</h2>
				<p className="text-muted-foreground text-sm">
					Both forms below register the PostgreSQL engine; the two tabs are the
					static and the config-factory shapes, not two engines. The DynamoDB
					registration is in the next section.
				</p>
				<CodeBlock
					tabs={[
						{
							code: `import { Module } from '@nestjs/common'
import { DatabaseModule } from '@turystack/nestjs-database'
import { databaseSchema } from './database.schema'

@Module({
  imports: [
    DatabaseModule.register({
      adapter: 'postgresql',
      postgresql: { url: 'postgres://localhost:5432/app' },
      schemaResolver: databaseSchema,
    }),
  ],
})
export class AppModule {}`,
							label: 'Static',
						},
						{
							code: `import { Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'
import { z } from 'zod'
import { databaseSchema } from './database.schema'

const configSchema = defineConfigSchema({ DATABASE_URL: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'postgresql',
      postgresql: { url: config.get('DATABASE_URL') },
      schemaResolver: databaseSchema,
    })),
  ],
})
export class AppModule {}`,
							label: 'From config',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Choosing the engine
				</h2>
				<p className="text-muted-foreground text-sm">
					`adapter` discriminates the union. Each arm carries its own config
					block and its own schema builder, so passing the other engine's schema
					is a compile error rather than a runtime surprise.
				</p>
				<CodeBlock
					filename="app.module.ts"
					language="ts"
					tabs={[
						{
							code: `DatabaseModule.register((config) => ({
  adapter: 'postgresql',
  postgresql: { url: config.get('DATABASE_URL') },
  relationsResolver: databaseRelations,
  schemaResolver: databaseSchema,
}))`,
							label: 'PostgreSQL',
						},
						{
							code: `DatabaseModule.register((config) => ({
  adapter: 'dynamodb',
  dynamodb: {
    region: config.get('AWS_REGION'),
    tablePrefix: config.get('DYNAMODB_TABLE_PREFIX'),
    endpoint: config.get('DYNAMODB_ENDPOINT'), // DynamoDB Local, in tests
  },
  // no relationsResolver: relations have no counterpart in a key-value store
  schemaResolver: databaseSchema,
}))`,
							label: 'DynamoDB',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					With Relations
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground text-sm">
					A key-value store has no join to plan, so `relationsResolver` exists
					only on the PostgreSQL arm of the union. On DynamoDB the equivalent of
					"belongs to" is the partition key, decided in the schema.
				</p>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'
import { databaseSchema, databaseRelations } from './database.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'postgresql',
      postgresql: { url: config.get('DATABASE_URL') },
      schemaResolver: databaseSchema,
      relationsResolver: databaseRelations,
    })),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					DatabaseModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>
		</div>
	)
}
