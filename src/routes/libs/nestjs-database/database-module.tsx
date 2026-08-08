import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-database/database-module')({
	component: Page,
})

const options = [
	{
		description:
			"The database adapter. Currently only 'postgresql' is supported.",
		name: 'adapter',
		required: true,
		type: "'postgresql'",
	},
	{
		description: 'The PostgreSQL connection URL.',
		name: 'postgresql.url',
		required: true,
		type: 'string',
	},
	{
		description:
			'A function that receives a schema builder and returns the table definitions.',
		name: 'schemaResolver',
		required: true,
		type: '(schema: PgSchemaBuilder) => SchemaResolverResult',
	},
	{
		description:
			'An optional function that receives materialized tables and a relations helper to define Drizzle relations.',
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
				<h2 className="font-display font-semibold text-xl">With Relations</h2>
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
