import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import{P as s}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const a=[{description:"Items per page — coerced number, 1 to 100, defaults to 10",name:"limit",type:"number"},{description:"Page number — coerced number, min 1, defaults to 1",name:"page",type:"number"}],o=[{description:"Items per page — coerced number, 1 to 100, defaults to 10",name:"limit",type:"number"},{description:"Cursor to end before (optional)",name:"nextCursor",type:"string"},{description:"Cursor to start after (optional)",name:"previousCursor",type:"string"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Pagination"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Every list endpoint accepts page OR cursor pagination through one schema — the caller picks the mode per request, the input parses into a discriminated union, and the response meta comes back discriminated the same way."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"PaginationSchema — one schema, two modes"}),e.jsx(t,{code:`import { PaginationSchema, type Pagination } from '@turystack/query-dsl'

PaginationSchema.parse({})                    // { mode: 'page', page: 1, limit: 10 }
PaginationSchema.parse({ page: '2' })         // { mode: 'page', page: 2, limit: 10 }
PaginationSchema.parse({ nextCursor: 'abc' }) // { mode: 'cursor', limit: 10, nextCursor: 'abc' }

PaginationSchema.parse({ page: '2', nextCursor: 'abc' }) // throws paginationMixedModes — one mode only

// Pagination — the parsed output type:
//   | { mode: 'page'; page: number; limit: number }
//   | { mode: 'cursor'; limit: number; nextCursor?: string; previousCursor?: string }`,filename:"example.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Composing the route query"}),e.jsx(t,{code:`export const listOrdersRequest = createRequestSchema({
  query: PaginationSchema
    .and(SortSchema(['created_at'], { defaultSortBy: 'created_at', defaultSortOrder: 'desc' }))
    .and(z.object({ status: orderStatusSchema.optional() })),
})`,filename:"list-orders.dto.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Dynamic meta — discriminated response"}),e.jsx(t,{code:`import {
  PaginatedResponseSchema,
  type PaginatedResponse,
} from '@turystack/query-dsl'

export const orderListSchemaResponse = PaginatedResponseSchema(orderSchemaResponse)
// { data: T[], meta: { mode: 'page', page, limit, totalItems, totalPages } }
// { data: T[], meta: { mode: 'cursor', limit, hasMore, nextCursor? } }

if (response.meta.mode === 'cursor') {
  response.meta.nextCursor // TypeScript narrows automatically
}`,filename:"response.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground",children:"Not a problem for the frontend: the caller always knows which mode it requested (page views use useQuery, feeds use useInfiniteQuery), and meta.mode makes the union self-describing — in OpenAPI it becomes a discriminated oneOf, so the generated SDK narrows it too."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Repository — one method, mode-dynamic"}),e.jsx(t,{code:`type ListOrdersInput = { statuses?: List<OrderStatus> } & Pagination &
  Sort<readonly ['created_at', 'total']>

interface IOrderRepository {
  findPaginated(input: ListOrdersInput): Promise<PaginatedResponse<OrderEntity>>
}

// implementation switches on input.mode:
// 'page'   -> offset/limit + count  -> meta { mode: 'page', totalItems, totalPages }
// 'cursor' -> where cursor, limit+1 -> meta { mode: 'cursor', hasMore, nextCursor }`,filename:"order.repository.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Building blocks — PagePagination"}),e.jsx(s,{props:a})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Building blocks — CursorPagination"}),e.jsx(s,{props:o})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsx("p",{className:"text-muted-foreground",children:"PaginationSchema validates that exactly one mode was sent (both at once is a 400 with the paginationMixedModes issue) and transforms the flat query params into the discriminated object — nothing sent defaults to page 1. PagePaginationSchema, CursorPaginationSchema and their single-mode envelopes stay exported as building blocks for the rare endpoint that locks one mode. In a monorepo the package is a dependency of the domains lib, where these types annotate the repository contracts."})]})]})}export{c as component};
