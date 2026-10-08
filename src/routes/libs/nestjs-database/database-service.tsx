import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-database/database-service')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					DatabaseService & Repositories
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					One typed repository per schema table — CRUD, count, exists, upsert.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Injection</h2>
				<p className="text-muted-foreground">
					Inject the <code className="text-lib">DatabaseService</code> class
					directly from any domain service — the module is global, so no imports
					are needed:
				</p>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@turystack/nestjs-database'

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
}`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Two engines, two surfaces
				</h2>
				<p className="text-muted-foreground text-sm">
					The repository you get depends on the engine the registry was
					augmented with. The writes read alike; the reads do not, because a
					key-value store has no cheap answer for an arbitrary query. What it
					would only fake is absent from the type rather than present and
					expensive.
				</p>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-border border-b text-left text-muted-foreground text-xs uppercase">
								<th className="py-2 pr-4 font-medium">Method</th>
								<th className="py-2 pr-4 font-medium">PostgreSQL</th>
								<th className="py-2 font-medium">DynamoDB</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">findById</td>
								<td className="py-2 pr-4">by primary key</td>
								<td className="py-2">by partition (and sort) attributes</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">
									findMany · findFirst
								</td>
								<td className="py-2 pr-4">the Drizzle query API</td>
								<td className="py-2 text-muted-foreground">not available</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">query</td>
								<td className="py-2 pr-4 text-muted-foreground">
									not available
								</td>
								<td className="py-2">declared key path, cursor paged</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">
									create · createMany · upsert
								</td>
								<td className="py-2 pr-4">yes</td>
								<td className="py-2">yes</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">updateById</td>
								<td className="py-2 pr-4">
									optimistic locking via expectedVersion
								</td>
								<td className="py-2">
									the same, settled by the engine's own condition
								</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">
									update · delete by where
								</td>
								<td className="py-2 pr-4">yes</td>
								<td className="py-2 text-muted-foreground">
									not available — there is no write-by-predicate
								</td>
							</tr>
							<tr>
								<td className="py-2 pr-4 font-mono text-xs">count</td>
								<td className="py-2 pr-4">by predicate</td>
								<td className="py-2">within one partition only</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					findMany
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground text-sm">
					An arbitrary relational read. On DynamoDB use `query` over a declared
					key path instead — see the adapter page.
				</p>
				<p className="text-muted-foreground">
					Delegates to Drizzle's relational query API. Supports{' '}
					<code className="text-lib">where</code>,{' '}
					<code className="text-lib">columns</code>,{' '}
					<code className="text-lib">with</code>,{' '}
					<code className="text-lib">limit</code>,{' '}
					<code className="text-lib">offset</code>, and{' '}
					<code className="text-lib">orderBy</code>.
				</p>
				<CodeBlock
					code={`const users = await this.db.users.findMany({
  where: (fields, { eq }) => eq(fields.role, 'admin'),
  columns: { id: true, name: true, email: true },
  limit: 10,
  offset: 0,
})

const usersWithPosts = await this.db.users.findMany({
  with: { posts: true },
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Pagination</h2>
				<p className="text-muted-foreground">
					Two common patterns for paginating results using{' '}
					<code className="text-lib">findMany</code> and{' '}
					<code className="text-lib">count</code>.
				</p>
				<CodeBlock
					tabs={[
						{
							code: `async listUsersPaginated(page: number, limit: number) {
  const offset = (page - 1) * limit

  const [users, total] = await Promise.all([
    this.db.user.findMany({
      limit,
      offset,
      orderBy: (fields, { desc }) => desc(fields.created_at),
    }),
    this.db.user.count(),
  ])

  return { users, total, page, limit }
}`,
							label: 'page + limit',
						},
						{
							code: `async listUsersPaginated(options: {
  limit: number
  startingAfter?: string
  endingBefore?: string
}) {
  const { limit } = options

  const users = await this.db.user.findMany({
    where: options.startingAfter
      ? (fields, { gt }) => gt(fields.user_id, options.startingAfter!)
      : options.endingBefore
        ? (fields, { lt }) => lt(fields.user_id, options.endingBefore!)
        : undefined,
    orderBy: (fields, operators) =>
      options.endingBefore
        ? operators.asc(fields.user_id)
        : operators.desc(fields.user_id),
    limit: limit + 1,
  })

  const hasMore = users.length > limit
  if (hasMore) users.pop()
  if (options.endingBefore) users.reverse()

  return { users, hasMore }
}`,
							label: 'cursor',
						},
						{
							code: `// On DynamoDB the cursor is not hand-rolled: it is the engine's own
// resume token, and there is no page number or total to offer.
async listProductsPaginated(userId: string, options: {
  limit: number
  cursor?: string
}) {
  const page = await this.db.product.query({
    partition: userId,
    direction: 'desc',
    limit: options.limit,
    cursor: options.cursor,
  })

  return page // { items, nextCursor, hasMore }
}`,
							label: 'DynamoDB cursor',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					Pair the third one with CursorPaginationSchema and
					CursorPaginatedResponseSchema from @turystack/query-dsl: the response
					meta is discriminated on mode, so the screen renders a feed instead of
					a numbered pager without anything new being built.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					findFirst
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<CodeBlock
					code={`const user = await this.db.users.findFirst({
  where: (fields, { eq }) => eq(fields.email, 'john@example.com'),
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">findById</h2>
				<p className="text-muted-foreground text-sm">
					The argument differs by engine: a scalar primary key on PostgreSQL,
					and on DynamoDB an object carrying the declared partition and sort
					attributes, because that pair is the address.
				</p>
				<p className="text-muted-foreground">
					Shorthand that looks up a record by its primary key.
				</p>
				<CodeBlock
					code={`const user = await this.db.users.findById(userId)

const userWithPosts = await this.db.users.findById(userId, {
  with: { posts: true },
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">create</h2>
				<p className="text-muted-foreground">
					Inserts a new record. If the primary key column has no default, a UUID
					v7 is auto-generated.
				</p>
				<CodeBlock
					code={`const user = await this.db.users.create({
  name: 'John',
  email: 'john@example.com',
})

const partial = await this.db.users.create(
  { name: 'Jane', email: 'jane@example.com' },
  { returning: { id: true, email: true } },
)`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">createMany</h2>
				<CodeBlock
					code={`const users = await this.db.users.createMany([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
])`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					update
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground text-sm">
					A write by predicate. DynamoDB has no such thing — there you read the
					keys and write each item, which is a different cost and a different
					guarantee, so the method is absent rather than emulated.
				</p>
				<p className="text-muted-foreground">
					Updates records matching a where condition. Returns the updated rows.
				</p>
				<CodeBlock
					code={`const updated = await this.db.users.update({
  where: (fields, { eq }) => eq(fields.role, 'guest'),
  data: { role: 'member' },
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">updateById</h2>
				<p className="text-muted-foreground">
					Updates a single record by primary key. Throws{' '}
					<code className="text-lib">RecordNotFoundError</code> if not found.
				</p>
				<CodeBlock
					code={`const user = await this.db.users.updateById(userId, {
  name: 'Updated Name',
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					updateById · optimistic locking
				</h2>
				<p className="text-muted-foreground">
					Passing the version the caller read narrows the write to that version
					and bumps it. A concurrent writer that got there first makes this
					update fail instead of silently overwriting it.
				</p>
				<CodeBlock
					code={`const order = await this.db.orders.findById(orderId)

const updated = await this.db.orders.updateById(
  orderId,
  { status: 'cancelled' },
  { expectedVersion: order.version },
)`}
					filename="orders.service.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The table needs an integer column named <code>version</code>, or
					another one named through <code>versionColumn</code>.
				</p>
				<CodeBlock
					code={`ConcurrentUpdateError  // from @turystack/exceptions — 409

{
  message: '[TableRepository] "orders" was updated by another writer',
  metadata: { expectedVersion: 3, actualVersion: 5, table: 'orders' },
}`}
					filename="error"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					A write that matched nothing is ambiguous — the row may be gone, or
					another writer may have moved the version on. Resolving it costs one
					read, and only on the failure path: without{' '}
					<code>expectedVersion</code> the behaviour is unchanged and no extra
					read happens.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					delete
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground text-sm">
					Same reason as update: there is no delete-by-predicate on DynamoDB.
				</p>
				<CodeBlock
					code={`const deleted = await this.db.users.delete({
  where: (fields, { eq }) => eq(fields.role, 'inactive'),
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">deleteById</h2>
				<p className="text-muted-foreground">
					Deletes a single record by primary key. Returns the deleted record.
					Throws <code className="text-lib">RecordNotFoundError</code> if not
					found.
				</p>
				<CodeBlock
					code={`const deleted = await this.db.users.deleteById(userId)`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">count</h2>
				<p className="text-muted-foreground text-sm">
					On DynamoDB `count` takes the same argument shape as `query` and works
					within one partition. There is no table-wide count, because producing
					one means walking the table.
				</p>
				<CodeBlock
					code={`const total = await this.db.users.count()

const admins = await this.db.users.count({
  where: (fields, { eq }) => eq(fields.role, 'admin'),
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">exists</h2>
				<CodeBlock
					code={`const emailTaken = await this.db.users.exists({
  where: (fields, { eq }) => eq(fields.email, 'john@example.com'),
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">upsert</h2>
				<p className="text-muted-foreground text-sm">
					The conflict target is a PostgreSQL idea. On DynamoDB a put is already
					an upsert and the only possible target is the key, so `upsert(data)`
					takes the item and nothing else.
				</p>
				<p className="text-muted-foreground">
					Insert or update on conflict. Uses PostgreSQL's{' '}
					<code className="text-lib">ON CONFLICT DO UPDATE</code>.
				</p>
				<CodeBlock
					code={`const user = await this.db.users.upsert({
  target: ['email'],
  create: { name: 'John', email: 'john@example.com' },
  update: { name: 'John Updated' },
})`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Raw Drizzle Access
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground">
					Access the underlying Drizzle instance for custom queries:
				</p>
				<p className="text-muted-foreground text-sm">
					The DynamoDB registry exposes no `raw`: the engine's client is a
					command bus rather than a query builder, and handing it out would
					invite exactly the scans the adapter's smaller surface exists to
					prevent.
				</p>
				<CodeBlock
					code={`import { sql } from 'drizzle-orm'

const result = await this.db.raw.execute(
  sql\`SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'\`
)`}
					filename="analytics.service.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
