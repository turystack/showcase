import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-database/postgresql')({
	component: Page,
})

const options = [
	{
		description: 'The connection URL. The pool is opened lazily, at boot.',
		name: 'postgresql.url',
		required: true,
		type: 'string',
	},
	{
		description:
			'A function that receives the PostgreSQL schema builder and returns the table definitions.',
		name: 'schemaResolver',
		required: true,
		type: '(schema: PgSchemaBuilder) => SchemaResolverResult',
	},
	{
		description:
			'Defines Drizzle relations over the materialized tables, which is what makes nested reads possible. No counterpart on the other engine.',
		name: 'relationsResolver',
		required: false,
		type: '(tables, helpers) => RelationsResolverResult',
	},
]

const methods = [
	{
		description:
			'The Drizzle relational query API, passed straight through: where, columns, with, orderBy, limit, offset.',
		name: 'findMany(config?) · findFirst(config?)',
		type: 'Promise<Row[] | Row | undefined>',
	},
	{
		description: 'Lookup by the single-column primary key.',
		name: 'findById(id, { columns?, with? })',
		type: 'Promise<Row | undefined>',
	},
	{
		description:
			'A primary key with no database default is filled with a uuid v7 before the insert.',
		name: 'create(data, { returning?, with? }) · createMany(data[])',
		type: 'Promise<Row | Row[]>',
	},
	{
		description:
			'Writes by predicate — one statement over however many rows match. The half a key-value store does not have.',
		name: 'update({ where, data }) · delete({ where })',
		type: 'Promise<Row[]>',
	},
	{
		description:
			'Optimistic locking through expectedVersion: the guard is folded into the WHERE, and a zero-row result is re-read to tell "gone" from "someone else won".',
		name: 'updateById(id, data, { expectedVersion?, versionColumn? })',
		type: 'Promise<Row>',
	},
	{
		description: 'INSERT … ON CONFLICT DO UPDATE over the target columns.',
		name: 'upsert({ target, create, update, where? })',
		type: 'Promise<Row>',
	},
	{
		description: 'Aggregates over any predicate.',
		name: 'count({ where? }) · exists({ where })',
		type: 'Promise<number | boolean>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					PostgreSQL adapter
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Drizzle over node-postgres. You declare columns and query whatever you
					like — the planner is there to find a way, so the repository can offer
					the whole relational surface without a call being a trap.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Registration</h2>
				<p className="text-muted-foreground text-sm">
					`adapter` is a discriminated union: each engine brings its own config
					block and its own schema builder, so choosing one and passing the
					other's schema does not compile.
				</p>
				<CodeBlock
					code={`DatabaseModule.register((config) => ({
  adapter: 'postgresql',
  postgresql: { url: config.get('DATABASE_URL') },
  relationsResolver: databaseRelations,
  schemaResolver: databaseSchema,
}))`}
					filename="app.module.ts"
					language="ts"
				/>
				<PropsTable props={options} />
				<p className="text-muted-foreground text-sm">
					`drizzle-orm` and `pg` are optional peers, loaded lazily: an app on
					DynamoDB never installs them. For the same reason the schema builder
					lives at{' '}
					<code className="text-lib">
						@turystack/nestjs-database/postgresql
					</code>{' '}
					rather than the package root — everything it exports imports Drizzle
					at module scope.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The schema declares columns
				</h2>
				<p className="text-muted-foreground text-sm">
					The builder is the whole `drizzle-orm/pg-core` column set, so an app
					defines tables without importing Drizzle directly. Relations are
					declared beside them and are what `with` reads.
				</p>
				<CodeBlock
					code={`export const databaseSchema = defineDatabaseSchema((schema) => ({
  users: schema.table({
    user_id: schema.uuid('user_id').primaryKey(),
    name: schema.text('name').notNull(),
  }),
  posts: schema.table({
    post_id: schema.uuid('post_id').primaryKey(),
    author_id: schema.uuid('author_id').notNull(),
    title: schema.text('title').notNull(),
  }),
}))

export const databaseRelations = defineDatabaseRelations(
  databaseSchema,
  (tables, { relations }) => ({
    usersRelations: relations(tables.users, ({ many }) => ({
      posts: many(tables.posts),
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
				<p className="text-muted-foreground text-sm">
					Creating the table is a versioned migration the app runs, generated by
					drizzle-kit from this same declaration — see Schema Definition. That
					is the other half of what makes this engine different: the schema is
					both the type source and what creates the table.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The repository</h2>
				<PropsTable props={methods} />
				<p className="text-muted-foreground text-sm">
					`this.db.raw` exposes the Drizzle client itself, transaction-aware,
					for the query the repository does not cover. The DynamoDB registry has
					no `raw`, because there the client is a command bus rather than a
					query builder.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Pagination is yours to choose
				</h2>
				<p className="text-muted-foreground text-sm">
					Offset and cursor are both expressible, because `findMany` takes
					`limit`, `offset` and `orderBy`, and `count` answers over any
					predicate. Neither is built in: you assemble the one the screen needs.
					Pair it with `PagePaginationSchema` or `CursorPaginationSchema` from
					@turystack/query-dsl and keep the mode the contract returned.
				</p>
				<CodeBlock
					code={`async listUsers(page: number, limit: number) {
  const [users, total] = await Promise.all([
    this.db.users.findMany({
      limit,
      offset: (page - 1) * limit,
      orderBy: (fields, { desc }) => desc(fields.created_at),
    }),
    this.db.users.count(),
  ])

  return { users, meta: { mode: 'page', page, limit, totalItems: total } }
}`}
					filename="users.repository.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The total is cheap here and is the reason a numbered pager is
					reasonable on this engine and not on the other one.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Transactions are an open handle
				</h2>
				<p className="text-muted-foreground text-sm">
					`@Transactional` opens a real transaction and puts it in
					AsyncLocalStorage, so every repository call in the tree writes through
					it without being told. A read inside the operation sees the writes the
					operation already made, a throw rolls everything back, and a nested
					decorated call joins the transaction instead of opening a second one.
				</p>
				<CodeBlock
					code={`@Transactional('serializable')
async transfer(fromId: string, toId: string, amount: number) {
  const from = await this.db.accounts.findById(fromId)

  await this.db.accounts.updateById(fromId, { balance: from.balance - amount })
  await this.db.accounts.updateById(toId, { balance: to.balance + amount })

  // Reads inside the transaction see the writes above.
}`}
					filename="transfer.service.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Isolation levels are honoured here and only here — DynamoDB has none,
					and passing one there throws rather than being ignored.
				</p>
			</div>
		</div>
	)
}
