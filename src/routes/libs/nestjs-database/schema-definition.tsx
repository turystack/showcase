import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-database/schema-definition')(
	{
		component: Page,
	},
)

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Schema Definition
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Tables, relations, and typing in one file — owned by the lib that owns
					the database model.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					database.schema.ts
				</h2>
				<p className="text-muted-foreground">
					This file lives in the lib that owns the database model. It contains
					your schema resolver, relations resolver, and the module augmentation
					that provides full type safety across the monorepo.
				</p>
				<CodeBlock
					filename="database.schema.ts"
					language="ts"
					tabs={[
						{
							code: `import {
  defineDatabaseRelations,
  defineDatabaseSchema,
  type InferDatabaseConfig,
} from '@turystack/nestjs-database'

export const databaseSchema = defineDatabaseSchema((schema) => ({
  user: schema.table({
    user_id: schema.uuid('user_id').primaryKey().notNull(),
    name: schema.text('name').notNull(),
    email: schema.text('email').notNull(),
  }),
  product: schema.table({
    product_id: schema.uuid('product_id').primaryKey().notNull(),
    user_id: schema.uuid('user_id').notNull(),
    name: schema.text('name').notNull(),
    price: schema.integer('price').notNull(),
  }),
}))

export const databaseRelations = defineDatabaseRelations(
  databaseSchema,
  (tables, { relations }) => ({
    userRelations: relations(tables.user, ({ many }) => ({
      products: many(tables.product),
    })),
    productRelations: relations(tables.product, ({ one }) => ({
      user: one(tables.user, {
        fields: [tables.product.user_id],
        references: [tables.user.user_id],
      }),
    })),
  }),
)

declare module '@turystack/nestjs-database' {
  interface DatabaseServiceRegistry
    extends InferDatabaseConfig<
      ReturnType<typeof databaseSchema>,
      ReturnType<typeof databaseRelations>
    > {}
}`,
							label: 'PostgreSQL',
						},
						{
							code: `import {
  defineDynamoDatabaseSchema,
  type InferDynamoDatabaseConfig,
} from '@turystack/nestjs-database'

// You declare attributes AND the paths a read may take. There is no query
// planner to fall back on: a read walks a key that exists, or it scans.
export const databaseSchema = defineDynamoDatabaseSchema((t) => ({
  product: t.table({
    attributes: {
      user_id: t.string(),
      product_id: t.string(),
      name: t.string(),
      price: t.number(),
      specs: t.map().optional(),
    },
    // the pair that addresses an item
    key: { partition: 'user_id', sort: 'product_id' },
    // every other read path, declared
    indexes: {
      byName: { partition: 'user_id', sort: 'name' },
    },
  }),
}))

// No relations resolver: relations have no counterpart here. A product that
// belongs to a user is a partition, not a foreign key.
declare module '@turystack/nestjs-database' {
  interface DatabaseServiceRegistry
    extends InferDynamoDatabaseConfig<ReturnType<typeof databaseSchema>> {}
}`,
							label: 'DynamoDB',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The two builders share the two-phase shape — declare, then materialize
					under the object key that becomes the table name — and nothing else.
					One hands out column types, the other attribute types plus the key
					paths, and the repository each produces is derived from what was
					declared.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					database.migration.ts
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground">
					This file materializes the schema into actual Drizzle table objects.
					It is used by <code className="text-lib">drizzle-kit</code> for
					migrations and by <code className="text-lib">drizzle studio</code> for
					database inspection.
				</p>
				<CodeBlock
					code={`import {
  createSchemaBuilder,
  materializeSchema,
} from '@turystack/nestjs-database/postgresql'

import { databaseSchema } from './database.schema'

const resolved = databaseSchema(createSchemaBuilder())

export const tables = materializeSchema(resolved)
export const { user, product } = tables`}
					filename="database.migration.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					drizzle.config.ts
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground">
					Point <code className="text-lib">drizzle-kit</code> to the migration
					file for generating and running migrations:
				</p>
				<CodeBlock
					code={`import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database.migration.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})`}
					filename="drizzle.config.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Migrations, on the other engine
				</h2>
				<p className="text-muted-foreground text-sm">
					There is no counterpart to the two files above on DynamoDB. Creating a
					table and its indexes is infrastructure — CDK, Terraform, the console
					— not a versioned migration this package runs, because the engine has
					no DDL for an application to apply. What remains for the application
					is data migration, which is a different problem with a different
					shape.
				</p>
				<p className="text-muted-foreground text-sm">
					The schema you declare here is still the single source for the types
					and the repositories; it just is not what creates the table.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Available Column Types
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground">
					The schema builder exposes all Drizzle PostgreSQL column types. Some
					commonly used ones:
				</p>
				<CodeBlock
					code={`schema.uuid('column_name')
schema.text('column_name')
schema.varchar('column_name', { length: 255 })
schema.integer('column_name')
schema.bigint('column_name', { mode: 'number' })
schema.serial('column_name')
schema.boolean('column_name')
schema.timestamp('column_name')
schema.date('column_name')
schema.json('column_name')
schema.jsonb('column_name')
schema.numeric('column_name', { precision: 10, scale: 2 })`}
					filename="column-types.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Key Helpers
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground text-sm">
					On DynamoDB the attribute helpers are `t.string()`, `t.number()`,
					`t.boolean()`, `t.binary()`, `t.list()` and `t.map()`, each with
					`.optional()`. There is no `.primaryKey()`, because the key belongs to
					the table rather than to a column — it is the `key` block, and every
					other read path is an entry in `indexes`.
				</p>
				<p className="text-muted-foreground">
					<code className="text-lib">defineDatabaseSchema(resolver)</code> —
					identity helper that preserves the inferred table types. The resolver
					receives a <code className="text-lib">PgSchemaBuilder</code> and
					returns table definitions.
				</p>
				<p className="text-muted-foreground">
					<code className="text-lib">defineDynamoDatabaseSchema(resolver)</code>{' '}
					— the same identity helper for the other engine. Separate rather than
					overloaded because the two builders share nothing: one hands out
					column types, the other attribute types plus the key paths a read may
					take.
				</p>
				<p className="text-muted-foreground">
					<code className="text-lib">
						defineDatabaseRelations(schema, resolver)
					</code>{' '}
					— types the <code className="text-lib">tables</code> parameter from
					the schema resolver while preserving the inferred relations.
				</p>
				<p className="text-muted-foreground">
					<code className="text-lib">
						{'InferDatabaseConfig<TSchema, TRelations>'}
					</code>{' '}
					— convenience type for augmenting{' '}
					<code className="text-lib">DatabaseServiceRegistry</code> with the
					fully-typed database instance and schema.
				</p>
			</div>
		</div>
	)
}
