import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-database/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-database
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Define the schema once, get one typed repository per table. Two
					engines behind the same module: PostgreSQL through Drizzle, and
					DynamoDB.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<p className="text-muted-foreground">
					Every engine's driver is an optional peer, so you install the one you
					use and nothing else. An app on PostgreSQL never pulls the AWS SDK,
					and an app on DynamoDB never pulls Drizzle.
				</p>
				<CodeBlock
					tabs={[
						{
							code: `# PostgreSQL
pnpm add @turystack/nestjs-database drizzle-orm pg

# DynamoDB
pnpm add @turystack/nestjs-database @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb`,
							label: 'pnpm',
						},
						{
							code: `# PostgreSQL
npm install @turystack/nestjs-database drizzle-orm pg

# DynamoDB
npm install @turystack/nestjs-database @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb`,
							label: 'npm',
						},
						{
							code: `# PostgreSQL
yarn add @turystack/nestjs-database drizzle-orm pg

# DynamoDB
yarn add @turystack/nestjs-database @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb`,
							label: 'yarn',
						},
						{
							code: `# PostgreSQL
bun add @turystack/nestjs-database drizzle-orm pg

# DynamoDB
bun add @turystack/nestjs-database @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb`,
							label: 'bun',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The PostgreSQL schema builder lives at{' '}
					<code className="text-lib">
						@turystack/nestjs-database/postgresql
					</code>{' '}
					rather than the root, for the same reason: everything it exports
					imports Drizzle at module scope, and re-exporting it from the barrel
					would make Drizzle required for a DynamoDB app.
				</p>
				<p className="text-muted-foreground text-sm">
					Dev tooling, where the engine has any. PostgreSQL has migrations and
					Drizzle Studio; on DynamoDB the table and its indexes are
					infrastructure — CDK or Terraform — not a migration this package runs.
				</p>
				<CodeBlock
					tabs={[
						{
							code: `# PostgreSQL only
pnpm add -D drizzle-kit @types/pg`,
							label: 'pnpm',
						},
						{
							code: `# PostgreSQL only
npm install -D drizzle-kit @types/pg`,
							label: 'npm',
						},
						{
							code: `# PostgreSQL only
yarn add -D drizzle-kit @types/pg`,
							label: 'yarn',
						},
						{
							code: `# PostgreSQL only
bun add -D drizzle-kit @types/pg`,
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Two engines, one module — PostgreSQL through Drizzle, DynamoDB
							through the AWS SDK, chosen by a discriminated `adapter`
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Schema builder API — define tables without importing the engine's
							driver, whichever one you picked
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Repositories derived from the schema — on PostgreSQL findMany,
							findFirst, update and delete by predicate; on DynamoDB a cursor
							`query` over declared key paths, and the calls the engine cannot
							serve cheaply are absent from the type
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Transactional decorator — method-level transactions via
							AsyncLocalStorage; an open handle on PostgreSQL, one atomic batch
							on DynamoDB
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Relations support — PostgreSQL only; a key-value store has no
							counterpart, and pretending otherwise would be the wrong shape
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Auto UUID v7 — PostgreSQL primary keys without defaults are
							auto-generated; on DynamoDB the key is yours to supply, because it
							is also the partition
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Both engines tested against a real server in Docker, not against a
							mock
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Start</h2>
				<p className="text-muted-foreground text-sm">
					1. Define your schema and type augmentation — in the lib that owns the
					database model:
				</p>
				<CodeBlock
					code={`import {
  defineDatabaseSchema,
  type InferDatabaseConfig,
} from '@turystack/nestjs-database'

export const databaseSchema = defineDatabaseSchema((schema) => ({
  users: schema.table({
    id: schema.uuid().primaryKey(),
    name: schema.text().notNull(),
    email: schema.text().notNull(),
  }),
}))

declare module '@turystack/nestjs-database' {
  interface DatabaseServiceRegistry
    extends InferDatabaseConfig<ReturnType<typeof databaseSchema>> {}
}`}
					filename="database.schema.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					2. Register the module once at the app root (API or lambda handler) —
					it is global:
				</p>
				<CodeBlock
					filename="app.module.ts"
					language="ts"
					tabs={[
						{
							code: `import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'
import { configSchema } from './config.schema'
import { databaseSchema } from './database.schema'

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
							label: 'PostgreSQL',
						},
						{
							code: `import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'
import { configSchema } from './config.schema'
import { databaseSchema } from './database.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'dynamodb',
      dynamodb: {
        region: config.get('AWS_REGION'),
        tablePrefix: config.get('DYNAMODB_TABLE_PREFIX'),
      },
      schemaResolver: databaseSchema,
    })),
  ],
})
export class AppModule {}`,
							label: 'DynamoDB',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					One word changes. The config block beside it belongs to that engine,
					and swapping one without the other does not compile.
				</p>
				<p className="text-muted-foreground text-sm">
					3. Inject the typed DatabaseService from any domain service — no
					module imports needed:
				</p>
				<CodeBlock
					filename="users.service.ts"
					language="ts"
					tabs={[
						{
							code: `import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@turystack/nestjs-database'

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.users.findMany()
  }

  async create(name: string, email: string) {
    return this.db.users.create({ name, email })
  }
}`,
							label: 'PostgreSQL',
						},
						{
							code: `import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@turystack/nestjs-database'

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  // A list read walks a declared key path and pages by cursor. There is no
  // findMany here, and no page number — see the DynamoDB adapter page.
  async listForUser(userId: string, cursor?: string) {
    return this.db.product.query({ partition: userId, limit: 20, cursor })
  }

  async create(userId: string, productId: string, name: string, price: number) {
    return this.db.product.create({ user_id: userId, product_id: productId, name, price })
  }
}`,
							label: 'DynamoDB',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The writes read the same. The reads do not, and that is the point: a
					call the engine cannot serve cheaply is absent from the type instead
					of present and expensive.
				</p>
			</div>
		</div>
	)
}
