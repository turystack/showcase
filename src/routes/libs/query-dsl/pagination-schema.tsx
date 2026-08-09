import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/query-dsl/pagination-schema')({
	component: Page,
})

const pageProps = [
	{
		description: 'Items per page — coerced number, 1 to 100, defaults to 10',
		name: 'limit',
		type: 'number',
	},
	{
		description: 'Page number — coerced number, min 1, defaults to 1',
		name: 'page',
		type: 'number',
	},
]

const cursorProps = [
	{
		description: 'Items per page — coerced number, 1 to 100, defaults to 10',
		name: 'limit',
		type: 'number',
	},
	{
		description: 'Cursor to end before (optional)',
		name: 'nextCursor',
		type: 'string',
	},
	{
		description: 'Cursor to start after (optional)',
		name: 'previousCursor',
		type: 'string',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Pagination
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Every list endpoint accepts page OR cursor pagination through one
					schema — the caller picks the mode per request, the input parses into
					a discriminated union, and the response meta comes back discriminated
					the same way.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					PaginationSchema — one schema, two modes
				</h2>
				<CodeBlock
					code={`import { PaginationSchema, type Pagination } from '@turystack/query-dsl'

PaginationSchema.parse({})                    // { mode: 'page', page: 1, limit: 10 }
PaginationSchema.parse({ page: '2' })         // { mode: 'page', page: 2, limit: 10 }
PaginationSchema.parse({ nextCursor: 'abc' }) // { mode: 'cursor', limit: 10, nextCursor: 'abc' }

PaginationSchema.parse({ page: '2', nextCursor: 'abc' }) // throws paginationMixedModes — one mode only

// Pagination — the parsed output type:
//   | { mode: 'page'; page: number; limit: number }
//   | { mode: 'cursor'; limit: number; nextCursor?: string; previousCursor?: string }`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Composing the route query
				</h2>
				<CodeBlock
					code={`export const listOrdersRequest = createRequestSchema({
  query: PaginationSchema
    .and(SortSchema(['createdAt'], { defaultSortBy: 'createdAt', defaultSortOrder: 'desc' }))
    .and(z.object({ status: orderStatusSchema.optional() })),
})`}
					filename="list-orders.dto.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Dynamic meta — discriminated response
				</h2>
				<CodeBlock
					code={`import {
  PaginatedResponseSchema,
  type PaginatedResponse,
} from '@turystack/query-dsl'

export const orderListSchemaResponse = PaginatedResponseSchema(orderSchemaResponse)
// { data: T[], meta: { mode: 'page', page, limit, totalItems, totalPages } }
// { data: T[], meta: { mode: 'cursor', limit, hasMore, nextCursor? } }

if (response.meta.mode === 'cursor') {
  response.meta.nextCursor // TypeScript narrows automatically
}`}
					filename="response.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Not a problem for the frontend: the caller always knows which mode it
					requested (page views use useQuery, feeds use useInfiniteQuery), and
					meta.mode makes the union self-describing — in OpenAPI it becomes a
					discriminated oneOf, so the generated SDK narrows it too.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Repository — one method, mode-dynamic
				</h2>
				<CodeBlock
					code={`type ListOrdersInput = { statuses?: List<OrderStatus> } & Pagination &
  Sort<readonly ['createdAt', 'total']>

interface IOrderRepository {
  findPaginated(input: ListOrdersInput): Promise<PaginatedResponse<OrderEntity>>
}

// implementation switches on input.mode:
// 'page'   -> offset/limit + count  -> meta { mode: 'page', totalItems, totalPages }
// 'cursor' -> where cursor, limit+1 -> meta { mode: 'cursor', hasMore, nextCursor }`}
					filename="order.repository.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Building blocks — PagePagination
				</h2>
				<PropsTable props={pageProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Building blocks — CursorPagination
				</h2>
				<PropsTable props={cursorProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					PaginationSchema validates that exactly one mode was sent (both at
					once is a 400 with the paginationMixedModes issue) and transforms the
					flat query params into the discriminated object — nothing sent
					defaults to page 1. PagePaginationSchema, CursorPaginationSchema and
					their single-mode envelopes stay exported as building blocks for the
					rare endpoint that locks one mode. In a monorepo the package is a
					dependency of the domains lib, where these types annotate the
					repository contracts.
				</p>
			</div>
		</div>
	)
}
