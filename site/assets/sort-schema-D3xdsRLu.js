import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import{P as s}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const r=[{description:"Field to sort by — constrained to the declared allow-list",name:"sortBy",type:"T[number]"},{description:"Sort direction — 'asc' | 'desc'",name:"sortOrder",type:"SortOrder"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"SortSchema"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Query schema for sorting, constrained to an allow-list of fields with explicit defaults — no endpoint ever sorts by an unindexed or sensitive column."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`const SortSchema: <T extends readonly string[]>(
  fields: T,
  options: { defaultSortBy: T[number]; defaultSortOrder: SortOrder },
) => z.ZodObject

const SortOrderSchema: z.ZodEnum<{ asc: 'asc'; desc: 'desc' }>`,filename:"sort.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { SortSchema, type Sort } from '@turystack/query-dsl'

const OrderSortSchema = SortSchema(['created_at', 'total'], {
  defaultSortBy: 'created_at',
  defaultSortOrder: 'desc',
})

OrderSortSchema.parse({})                    // { sortBy: 'created_at', sortOrder: 'desc' }
OrderSortSchema.parse({ sortBy: 'total' })   // { sortBy: 'total', sortOrder: 'desc' }
OrderSortSchema.parse({ sortBy: 'password' }) // throws — outside the allow-list

type ListOrdersInput = { statuses?: List<OrderStatus> } & PagePagination &
  Sort<readonly ['created_at', 'total']>`,filename:"example.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Parsed object"}),e.jsx(s,{props:r})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsxs("p",{className:"text-muted-foreground",children:["The field list becomes a zod enum, so anything outside it is rejected at the route with a validation error. Defaults are mandatory in the options — a request without sort params always resolves to a deterministic order. The ",e.jsx("code",{children:"Sort"})," type carries the same allow-list into repository inputs, keeping route contract and query typing in sync."]})]})]})}export{l as component};
