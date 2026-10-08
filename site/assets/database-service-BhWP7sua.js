import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function i(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"DatabaseService & Repositories"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"One typed repository per schema table — CRUD, count, exists, upsert."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Injection"}),e.jsxs("p",{className:"text-muted-foreground",children:["Inject the ",e.jsx("code",{className:"text-lib",children:"DatabaseService"})," class directly from any domain service — the module is global, so no imports are needed:"]}),e.jsx(s,{code:`import { Injectable } from '@nestjs/common'
import { DatabaseService } from '@turystack/nestjs-database'

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
}`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Two engines, two surfaces"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The repository you get depends on the engine the registry was augmented with. The writes read alike; the reads do not, because a key-value store has no cheap answer for an arbitrary query. What it would only fake is absent from the type rather than present and expensive."}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-border border-b text-left text-muted-foreground text-xs uppercase",children:[e.jsx("th",{className:"py-2 pr-4 font-medium",children:"Method"}),e.jsx("th",{className:"py-2 pr-4 font-medium",children:"PostgreSQL"}),e.jsx("th",{className:"py-2 font-medium",children:"DynamoDB"})]})}),e.jsxs("tbody",{className:"divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-xs",children:"findById"}),e.jsx("td",{className:"py-2 pr-4",children:"by primary key"}),e.jsx("td",{className:"py-2",children:"by partition (and sort) attributes"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-xs",children:"findMany · findFirst"}),e.jsx("td",{className:"py-2 pr-4",children:"the Drizzle query API"}),e.jsx("td",{className:"py-2 text-muted-foreground",children:"not available"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-xs",children:"query"}),e.jsx("td",{className:"py-2 pr-4 text-muted-foreground",children:"not available"}),e.jsx("td",{className:"py-2",children:"declared key path, cursor paged"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-xs",children:"create · createMany · upsert"}),e.jsx("td",{className:"py-2 pr-4",children:"yes"}),e.jsx("td",{className:"py-2",children:"yes"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-xs",children:"updateById"}),e.jsx("td",{className:"py-2 pr-4",children:"optimistic locking via expectedVersion"}),e.jsx("td",{className:"py-2",children:"the same, settled by the engine's own condition"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-xs",children:"update · delete by where"}),e.jsx("td",{className:"py-2 pr-4",children:"yes"}),e.jsx("td",{className:"py-2 text-muted-foreground",children:"not available — there is no write-by-predicate"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 pr-4 font-mono text-xs",children:"count"}),e.jsx("td",{className:"py-2 pr-4",children:"by predicate"}),e.jsx("td",{className:"py-2",children:"within one partition only"})]})]})]})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["findMany",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"An arbitrary relational read. On DynamoDB use `query` over a declared key path instead — see the adapter page."}),e.jsxs("p",{className:"text-muted-foreground",children:["Delegates to Drizzle's relational query API. Supports"," ",e.jsx("code",{className:"text-lib",children:"where"}),","," ",e.jsx("code",{className:"text-lib",children:"columns"}),","," ",e.jsx("code",{className:"text-lib",children:"with"}),","," ",e.jsx("code",{className:"text-lib",children:"limit"}),","," ",e.jsx("code",{className:"text-lib",children:"offset"}),", and"," ",e.jsx("code",{className:"text-lib",children:"orderBy"}),"."]}),e.jsx(s,{code:`const users = await this.db.users.findMany({
  where: (fields, { eq }) => eq(fields.role, 'admin'),
  columns: { id: true, name: true, email: true },
  limit: 10,
  offset: 0,
})

const usersWithPosts = await this.db.users.findMany({
  with: { posts: true },
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Pagination"}),e.jsxs("p",{className:"text-muted-foreground",children:["Two common patterns for paginating results using"," ",e.jsx("code",{className:"text-lib",children:"findMany"})," and"," ",e.jsx("code",{className:"text-lib",children:"count"}),"."]}),e.jsx(s,{tabs:[{code:`async listUsersPaginated(page: number, limit: number) {
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
}`,label:"page + limit"},{code:`async listUsersPaginated(options: {
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
}`,label:"cursor"},{code:`// On DynamoDB the cursor is not hand-rolled: it is the engine's own
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
}`,label:"DynamoDB cursor"}]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Pair the third one with CursorPaginationSchema and CursorPaginatedResponseSchema from @turystack/query-dsl: the response meta is discriminated on mode, so the screen renders a feed instead of a numbered pager without anything new being built."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["findFirst",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx(s,{code:`const user = await this.db.users.findFirst({
  where: (fields, { eq }) => eq(fields.email, 'john@example.com'),
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"findById"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The argument differs by engine: a scalar primary key on PostgreSQL, and on DynamoDB an object carrying the declared partition and sort attributes, because that pair is the address."}),e.jsx("p",{className:"text-muted-foreground",children:"Shorthand that looks up a record by its primary key."}),e.jsx(s,{code:`const user = await this.db.users.findById(userId)

const userWithPosts = await this.db.users.findById(userId, {
  with: { posts: true },
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"create"}),e.jsx("p",{className:"text-muted-foreground",children:"Inserts a new record. If the primary key column has no default, a UUID v7 is auto-generated."}),e.jsx(s,{code:`const user = await this.db.users.create({
  name: 'John',
  email: 'john@example.com',
})

const partial = await this.db.users.create(
  { name: 'Jane', email: 'jane@example.com' },
  { returning: { id: true, email: true } },
)`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"createMany"}),e.jsx(s,{code:`const users = await this.db.users.createMany([
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
])`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["update",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"A write by predicate. DynamoDB has no such thing — there you read the keys and write each item, which is a different cost and a different guarantee, so the method is absent rather than emulated."}),e.jsx("p",{className:"text-muted-foreground",children:"Updates records matching a where condition. Returns the updated rows."}),e.jsx(s,{code:`const updated = await this.db.users.update({
  where: (fields, { eq }) => eq(fields.role, 'guest'),
  data: { role: 'member' },
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"updateById"}),e.jsxs("p",{className:"text-muted-foreground",children:["Updates a single record by primary key. Throws"," ",e.jsx("code",{className:"text-lib",children:"RecordNotFoundError"})," if not found."]}),e.jsx(s,{code:`const user = await this.db.users.updateById(userId, {
  name: 'Updated Name',
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"updateById · optimistic locking"}),e.jsx("p",{className:"text-muted-foreground",children:"Passing the version the caller read narrows the write to that version and bumps it. A concurrent writer that got there first makes this update fail instead of silently overwriting it."}),e.jsx(s,{code:`const order = await this.db.orders.findById(orderId)

const updated = await this.db.orders.updateById(
  orderId,
  { status: 'cancelled' },
  { expectedVersion: order.version },
)`,filename:"orders.service.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The table needs an integer column named ",e.jsx("code",{children:"version"}),", or another one named through ",e.jsx("code",{children:"versionColumn"}),"."]}),e.jsx(s,{code:`ConcurrentUpdateError  // from @turystack/exceptions — 409

{
  message: '[TableRepository] "orders" was updated by another writer',
  metadata: { expectedVersion: 3, actualVersion: 5, table: 'orders' },
}`,filename:"error",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["A write that matched nothing is ambiguous — the row may be gone, or another writer may have moved the version on. Resolving it costs one read, and only on the failure path: without"," ",e.jsx("code",{children:"expectedVersion"})," the behaviour is unchanged and no extra read happens."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["delete",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Same reason as update: there is no delete-by-predicate on DynamoDB."}),e.jsx(s,{code:`const deleted = await this.db.users.delete({
  where: (fields, { eq }) => eq(fields.role, 'inactive'),
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"deleteById"}),e.jsxs("p",{className:"text-muted-foreground",children:["Deletes a single record by primary key. Returns the deleted record. Throws ",e.jsx("code",{className:"text-lib",children:"RecordNotFoundError"})," if not found."]}),e.jsx(s,{code:"const deleted = await this.db.users.deleteById(userId)",filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"count"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"On DynamoDB `count` takes the same argument shape as `query` and works within one partition. There is no table-wide count, because producing one means walking the table."}),e.jsx(s,{code:`const total = await this.db.users.count()

const admins = await this.db.users.count({
  where: (fields, { eq }) => eq(fields.role, 'admin'),
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"exists"}),e.jsx(s,{code:`const emailTaken = await this.db.users.exists({
  where: (fields, { eq }) => eq(fields.email, 'john@example.com'),
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"upsert"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The conflict target is a PostgreSQL idea. On DynamoDB a put is already an upsert and the only possible target is the key, so `upsert(data)` takes the item and nothing else."}),e.jsxs("p",{className:"text-muted-foreground",children:["Insert or update on conflict. Uses PostgreSQL's"," ",e.jsx("code",{className:"text-lib",children:"ON CONFLICT DO UPDATE"}),"."]}),e.jsx(s,{code:`const user = await this.db.users.upsert({
  target: ['email'],
  create: { name: 'John', email: 'john@example.com' },
  update: { name: 'John Updated' },
})`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["Raw Drizzle Access",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx("p",{className:"text-muted-foreground",children:"Access the underlying Drizzle instance for custom queries:"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The DynamoDB registry exposes no `raw`: the engine's client is a command bus rather than a query builder, and handing it out would invite exactly the scans the adapter's smaller surface exists to prevent."}),e.jsx(s,{code:`import { sql } from 'drizzle-orm'

const result = await this.db.raw.execute(
  sql\`SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'\`
)`,filename:"analytics.service.ts",language:"ts"})]})]})}export{i as component};
