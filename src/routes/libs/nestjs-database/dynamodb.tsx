import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-database/dynamodb')({
	component: Page,
})

const options = [
	{
		description: 'The AWS region the table lives in.',
		name: 'dynamodb.region',
		required: true,
		type: 'string',
	},
	{
		description:
			'Prepended to every table name, so one account can hold many environments.',
		name: 'dynamodb.tablePrefix',
		required: false,
		type: 'string',
	},
	{
		description:
			'Points at DynamoDB Local in tests. Omitted in production, where the SDK resolves the real endpoint.',
		name: 'dynamodb.endpoint',
		required: false,
		type: 'string',
	},
	{
		description:
			'Explicit credentials. Omitted when the runtime already provides a credential chain.',
		name: 'dynamodb.credentials',
		required: false,
		type: '{ accessKeyId: string; secretAccessKey: string }',
	},
	{
		description:
			'A function that receives the DynamoDB schema builder and returns the table definitions.',
		name: 'schemaResolver',
		required: true,
		type: '(schema: DynamoSchemaBuilder) => DynamoSchemaResolverResult',
	},
]

const methods = [
	{
		description:
			'Reads one item. The key is the declared partition and sort attributes, nothing else.',
		name: 'findById(key)',
		type: 'Promise<Row | undefined>',
	},
	{
		description:
			'The list read. `index` accepts declared index names only, and paging is by cursor.',
		name: 'query({ index?, partition, sort?, direction?, limit?, cursor? })',
		type: 'Promise<DynamoPage<Row>>',
	},
	{
		description:
			'Counts within one partition. There is no table-wide count, because that is a table walk.',
		name: 'count({ index?, partition, sort? })',
		type: 'Promise<number>',
	},
	{
		description: 'Existence by key.',
		name: 'exists(key)',
		type: 'Promise<boolean>',
	},
	{
		description:
			'A put is already an upsert here; both names exist so the call site can say which it meant. Batches chunk at the engine limit of 25.',
		name: 'create(data) · createMany(data[]) · upsert(data)',
		type: 'Promise<Row | Row[]>',
	},
	{
		description:
			'Optimistic locking lands as a condition on the write itself — the engine settles the conflict, with no read-then-write and no isolation level.',
		name: 'updateById(key, data, { expectedVersion?, versionAttribute? })',
		type: 'Promise<Row>',
	},
	{
		description: 'Removes an item and returns what it removed.',
		name: 'deleteById(key)',
		type: 'Promise<Row>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					DynamoDB adapter
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A second engine behind the same module, with a deliberately smaller
					repository. In PostgreSQL you declare columns and query whatever you
					like; here you declare access paths and can only query those.
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
  adapter: 'dynamodb',
  dynamodb: {
    region: config.get('AWS_REGION'),
    tablePrefix: config.get('DYNAMODB_TABLE_PREFIX'),
    endpoint: config.get('DYNAMODB_ENDPOINT'), // DynamoDB Local, in tests
  },
  schemaResolver: databaseSchema,
}))`}
					filename="app.module.ts"
					language="ts"
				/>
				<PropsTable props={options} />
				<p className="text-muted-foreground text-sm">
					`@aws-sdk/client-dynamodb` and `@aws-sdk/lib-dynamodb` are optional
					peers, loaded lazily: an app on PostgreSQL never installs them.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The schema declares the read paths
				</h2>
				<p className="text-muted-foreground text-sm">
					A key-value store has no query planner to fall back on: a read either
					walks a key path that exists or scans the table. So the paths are part
					of the declaration, and the repository's type is derived from them.
				</p>
				<CodeBlock
					code={`export const databaseSchema = defineDynamoDatabaseSchema((t) => ({
  auditEvents: t.table({
    attributes: {
      actor_id: t.string(),
      audit_event_id: t.string(),
      occurred_at: t.string(),
      organization_id: t.string(),
      metadata: t.map().optional(),
    },
    // the pair that addresses an item
    key: { partition: 'organization_id', sort: 'occurred_at' },
    // every other read path, declared
    indexes: {
      byActor: { partition: 'organization_id', sort: 'actor_id' },
    },
  }),
}))

declare module '@turystack/nestjs-database' {
  interface DatabaseServiceRegistry
    extends InferDynamoDatabaseConfig<ReturnType<typeof databaseSchema>> {}
}`}
					filename="database.schema.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					A key naming an attribute that was never declared throws at boot, not
					at the first empty page.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The repository</h2>
				<PropsTable props={methods} />
				<p className="text-muted-foreground text-sm">
					Absent on purpose, because the engine has no cheap answer for them:
					findMany and findFirst (an arbitrary relational read), update and
					delete by predicate (there is no write-by-predicate), and a table-wide
					count. Each of those, in an adapter that accepted everything and
					degraded into a scan, is a line that passes review and shows up three
					months later as a cost graph.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Pagination is cursor-only
				</h2>
				<p className="text-muted-foreground text-sm">
					There is no page, no offset and no totalItems. Not because they are
					hard, but because the only honest way to produce them here is to walk
					the table, and a number that costs a table walk is a trap rather than
					a number. Pair it with CursorPaginationSchema and
					CursorPaginatedResponseSchema from @turystack/query-dsl, which the
					rest of the stack already understands.
				</p>
				<CodeBlock
					code={`const page = await this.db.auditEvents.query({
  index: 'byActor',           // declared indexes only
  partition: organizationId,
  sort: { eq: actorId },
  direction: 'desc',          // the sort key's order, forwards or backwards
  limit: 20,
  cursor: search.nextCursor,
})

page.items       // Row[]
page.nextCursor  // string | undefined
page.hasMore     // boolean`}
					filename="audit-event.repository.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Transactions are a batch, not an open handle
				</h2>
				<p className="text-muted-foreground text-sm">
					TransactWriteItems is one atomic call built up front, so
					@Transactional collects the writes and sends one batch before
					returning.
				</p>
				<p className="text-muted-foreground text-sm">
					Three things it refuses rather than approximates:
				</p>
				<CodeBlock
					code={`// 1. A read inside the operation does not see the buffered writes, so the two
//    methods whose contract is to return the resulting item refuse outright.
await this.db.auditEvents.updateById(key, data)
// Error: updateById cannot run inside @Transactional …

// 2. Over 100 buffered writes fails, because splitting the batch would stop
//    being atomic.

// 3. There are no isolation levels here.
@Transactional('serializable')
// Error: adapter "dynamodb" has no isolation levels …`}
					filename="refusals.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Each of these is stated at the call rather than ignored, because a
					silently different behaviour between two engines is the failure nobody
					finds until production.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Materializing the schema
				</h2>
				<p className="text-muted-foreground">
					The factories live behind their own entry point, mirroring{' '}
					<code className="text-lib">/postgresql</code>. An application that
					registers one adapter never resolves the other's types, and never
					installs the peer behind it.
				</p>
				<CodeBlock
					code={`import {
  createDynamoSchemaBuilder,
  materializeDynamoSchema,
} from '@turystack/nestjs-database/dynamodb'

import { databaseSchema } from './database.schema'

export const tables = materializeDynamoSchema(
  databaseSchema(createDynamoSchemaBuilder()),
)`}
					filename="database.migration.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
