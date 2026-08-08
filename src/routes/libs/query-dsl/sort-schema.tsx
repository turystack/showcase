import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/query-dsl/sort-schema')({
	component: Page,
})

const sortProps = [
	{
		description: 'Field to sort by — constrained to the declared allow-list',
		name: 'sortBy',
		type: 'T[number]',
	},
	{
		description: "Sort direction — 'asc' | 'desc'",
		name: 'sortOrder',
		type: 'SortOrder',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					SortSchema
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Query schema for sorting, constrained to an allow-list of fields with
					explicit defaults — no endpoint ever sorts by an unindexed or
					sensitive column.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`const SortSchema: <T extends readonly string[]>(
  fields: T,
  options: { defaultSortBy: T[number]; defaultSortOrder: SortOrder },
) => z.ZodObject

const SortOrderSchema: z.ZodEnum<{ asc: 'asc'; desc: 'desc' }>`}
					filename="sort.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { SortSchema, type Sort } from '@turystack/query-dsl'

const OrderSortSchema = SortSchema(['createdAt', 'total'], {
  defaultSortBy: 'createdAt',
  defaultSortOrder: 'desc',
})

OrderSortSchema.parse({})                    // { sortBy: 'createdAt', sortOrder: 'desc' }
OrderSortSchema.parse({ sortBy: 'total' })   // { sortBy: 'total', sortOrder: 'desc' }
OrderSortSchema.parse({ sortBy: 'password' }) // throws — outside the allow-list

type ListOrdersInput = { statuses?: List<OrderStatus> } & PagePagination &
  Sort<readonly ['createdAt', 'total']>`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Parsed object</h2>
				<PropsTable props={sortProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					The field list becomes a zod enum, so anything outside it is rejected
					at the route with a validation error. Defaults are mandatory in the
					options — a request without sort params always resolves to a
					deterministic order. The <code>Sort</code> type carries the same
					allow-list into repository inputs, keeping route contract and query
					typing in sync.
				</p>
			</div>
		</div>
	)
}
