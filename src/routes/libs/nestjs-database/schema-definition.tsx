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
					code={`import {
  defineDatabaseRelations,
  defineDatabaseSchema,
  type InferDatabaseConfig,
} from '@turystack/nestjs-database'

export const databaseSchema = defineDatabaseSchema((schema) => ({
  user: schema.table({
    userId: schema.uuid('user_id').primaryKey().notNull(),
    name: schema.text('name').notNull(),
    email: schema.text('email').notNull(),
  }),
  product: schema.table({
    productId: schema.uuid('product_id').primaryKey().notNull(),
    userId: schema.uuid('user_id').notNull(),
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
        fields: [tables.product.userId],
        references: [tables.user.userId],
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
}`}
					filename="database.schema.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					database.migration.ts
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
} from '@turystack/nestjs-database'

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
					Available Column Types
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
				<h2 className="font-display font-semibold text-xl">Key Helpers</h2>
				<p className="text-muted-foreground">
					<code className="text-lib">defineDatabaseSchema(resolver)</code> —
					identity helper that preserves the inferred table types. The resolver
					receives a <code className="text-lib">PgSchemaBuilder</code> and
					returns table definitions.
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
