import { createFileRoute } from '@tanstack/react-router'
import { Pagination } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/pagination/pagination.types.ts`.
 * `PaginationProps` is a discriminated union on `mode`, so the two tables below
 * are two separate shapes — not one table with optional halves.
 */
const offsetProps = [
	{
		description: 'Selects the page-based shape. Nothing else is accepted.',
		name: 'mode',
		required: true,
		type: '"offset"',
	},
	{
		description: 'The current page, one-based.',
		name: 'page',
		required: true,
		type: 'number',
	},
	{
		description: 'Items per page; drives the page count and the selector.',
		name: 'rowsPerPage',
		required: true,
		type: 'number',
	},
	{
		default: '[10, 20, 50, 100]',
		description: 'Page sizes offered by the selector.',
		name: 'rowsPerPageOptions',
		type: 'number[]',
	},
	{
		description: 'Total items across all pages; 0 shows “0-0 of 0”.',
		name: 'total',
		required: true,
		type: 'number',
	},
	{
		description: 'Fires with the requested page.',
		name: 'onPageChange',
		required: true,
		type: '(page: number) => void',
	},
	{
		description: 'Fires with the new page size, then onPageChange(1).',
		name: 'onRowsPerPageChange',
		required: true,
		type: '(rowsPerPage: number) => void',
	},
]

const cursorProps = [
	{
		description: 'Selects the prev/next shape, for keyset or API-driven lists.',
		name: 'mode',
		required: true,
		type: '"cursor"',
	},
	{
		description: 'Items on a page. Only used as the selector value.',
		name: 'rowsPerPage',
		required: true,
		type: 'number',
	},
	{
		default: '[10, 20, 50, 100]',
		description: 'Page sizes offered by the selector.',
		name: 'rowsPerPageOptions',
		type: 'number[]',
	},
	{
		default: 'undefined',
		description: 'Enables the previous arrow. Falsy leaves it disabled.',
		name: 'hasPreviousPage',
		type: 'boolean',
	},
	{
		default: 'undefined',
		description: 'Enables the next arrow. Falsy leaves it disabled.',
		name: 'hasNextPage',
		type: 'boolean',
	},
	{
		description: 'Fires when the previous arrow is pressed.',
		name: 'onPreviousPage',
		type: '() => void',
	},
	{
		description: 'Fires when the next arrow is pressed.',
		name: 'onNextPage',
		type: '() => void',
	},
	{
		description: 'Fires with the new page size; omit to hide the control.',
		name: 'onRowsPerPageChange',
		type: '(rowsPerPage: number) => void',
	},
]

const usageCode = `import { Pagination } from '@turystack/react-web'
import { useState } from 'react'

// Offset — you know the total, so you can show page numbers
const [page, setPage] = useState(1)
const [rows, setRows] = useState(20)

<Pagination
  mode="offset"
  onPageChange={setPage}
  onRowsPerPageChange={setRows} // offset mode calls onPageChange(1) for you
  page={page}
  rowsPerPage={rows}
  rowsPerPageOptions={[10, 25, 50]}
  total={248}
/>

// Cursor — no total, so only prev/next
<Pagination
  hasNextPage={Boolean(data.endCursor)}
  hasPreviousPage={Boolean(data.startCursor)}
  mode="cursor"
  onNextPage={() => fetchAfter(data.endCursor)}
  onPreviousPage={() => fetchBefore(data.startCursor)}
  onRowsPerPageChange={setRows}
  rowsPerPage={rows}
/>

// Cursor without the selector — the whole control is dropped
<Pagination
  hasNextPage
  mode="cursor"
  onNextPage={loadMore}
  rowsPerPage={20}
/>`

function OffsetExample({ total }: { total: number }) {
	const [page, setPage] = useState(1)
	const [rows, setRows] = useState(20)

	const pages = Math.max(1, Math.ceil(total / rows))

	return (
		<div className="w-full space-y-3">
			<Pagination
				mode="offset"
				onPageChange={setPage}
				onRowsPerPageChange={setRows}
				page={page}
				rowsPerPage={rows}
				total={total}
			/>
			<p className="text-center text-muted-foreground text-xs">
				page <code className="text-foreground">{page}</code> of{' '}
				<code className="text-foreground">{pages}</code> ·{' '}
				<code className="text-foreground">{rows}</code> rows ·{' '}
				<code className="text-foreground">{total}</code> items
			</p>
		</div>
	)
}

function RowsPerPageOptionsExample() {
	const [page, setPage] = useState(1)
	const [rows, setRows] = useState(25)

	return (
		<div className="w-full space-y-3">
			<Pagination
				mode="offset"
				onPageChange={setPage}
				onRowsPerPageChange={setRows}
				page={page}
				rowsPerPage={rows}
				rowsPerPageOptions={[
					25,
					50,
					75,
				]}
				total={300}
			/>
			<p className="text-center text-muted-foreground text-xs">
				rowsPerPageOptions=
				<code className="text-foreground">[25, 50, 75]</code> · page{' '}
				<code className="text-foreground">{page}</code> ·{' '}
				<code className="text-foreground">{rows}</code> rows
			</p>
		</div>
	)
}

function CursorExample() {
	const [cursor, setCursor] = useState(0)
	const [rows, setRows] = useState(20)

	const lastCursor = 3

	return (
		<div className="w-full space-y-3">
			<Pagination
				hasNextPage={cursor < lastCursor}
				hasPreviousPage={cursor > 0}
				mode="cursor"
				onNextPage={() => setCursor((c) => c + 1)}
				onPreviousPage={() => setCursor((c) => c - 1)}
				onRowsPerPageChange={setRows}
				rowsPerPage={rows}
			/>
			<p className="text-center text-muted-foreground text-xs">
				batch <code className="text-foreground">{cursor + 1}</code> ·{' '}
				<code className="text-foreground">{rows}</code> rows · next{' '}
				{cursor < lastCursor ? 'available' : 'exhausted'}
			</p>
		</div>
	)
}

function NarrowExample() {
	const [page, setPage] = useState(4)
	const [rows, setRows] = useState(10)

	return (
		<div className="flex w-full flex-wrap items-start justify-center gap-6">
			<div className="w-full max-w-[20rem] rounded-lg border p-3">
				<p className="mb-2 text-muted-foreground text-xs">
					20rem — a phone column
				</p>
				<Pagination
					mode="offset"
					onPageChange={setPage}
					onRowsPerPageChange={setRows}
					page={page}
					rowsPerPage={rows}
					total={248}
				/>
			</div>
			<div className="w-full max-w-[13rem] rounded-lg border p-3">
				<p className="mb-2 text-muted-foreground text-xs">
					13rem — a side panel
				</p>
				<Pagination
					mode="offset"
					onPageChange={setPage}
					onRowsPerPageChange={setRows}
					page={page}
					rowsPerPage={rows}
					total={248}
				/>
			</div>
		</div>
	)
}

function CursorWithoutSelector() {
	const [cursor, setCursor] = useState(0)

	return (
		<div className="w-full">
			<Pagination
				hasNextPage={cursor < 2}
				hasPreviousPage={cursor > 0}
				mode="cursor"
				onNextPage={() => setCursor((c) => c + 1)}
				onPreviousPage={() => setCursor((c) => c - 1)}
				rowsPerPage={20}
			/>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Navigation
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Pagination
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One component, two shapes: offset draws page numbers, cursor only
					moves.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						mode
					</code>{' '}
					picks the shape; both share only{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rowsPerPage
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rowsPerPageOptions
					</code>
					.
				</p>
				<h3 className="font-medium text-sm">mode="offset"</h3>
				<PropsTable props={offsetProps} />
				<h3 className="font-medium text-sm">mode="cursor"</h3>
				<PropsTable props={cursorProps} />
			</section>

			<SlotsSection slug="pagination" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Offset mode</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The component derives everything from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						page
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rowsPerPage
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						total
					</code>
					: the range caption, the page count, and which arrow is disabled.
				</p>
				<ComponentPreview title="Under eight pages — every number is shown">
					<OffsetExample total={100} />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Past seven pages the list collapses around the current page, with
					ellipses over the gaps.
				</p>
				<ComponentPreview title="Many pages — the middle collapses">
					<OffsetExample total={2480} />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						total={'{0}'}
					</code>{' '}
					is not hidden as a special case — it renders a real, disabled control
					with an empty range.
				</p>
				<ComponentPreview title="total={0} — empty range">
					<OffsetExample total={0} />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rowsPerPageOptions
					</code>{' '}
					replaces the default 10 / 20 / 50 / 100 list — the selector only ever
					offers what you pass it.
				</p>
				<ComponentPreview title="rowsPerPageOptions={[25, 50, 75]}">
					<RowsPerPageOptionsExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Narrow widths</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A container query: below{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						28rem
					</code>{' '}
					the page numbers hide and the arrows carry navigation. Nothing
					overflows.
				</p>
				<ComponentPreview title="The same pager at 20rem and at 13rem">
					<NarrowExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Cursor mode</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without a total there is nothing to number, so the control is two
					arrows whose enablement you assert with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						hasPreviousPage
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						hasNextPage
					</code>
					.
				</p>
				<ComponentPreview title="Prev and next, with the rows selector">
					<CursorExample />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Leaving{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onRowsPerPageChange
					</code>{' '}
					off removes the selector entirely; an empty spacer keeps the arrows
					pinned to the right.
				</p>
				<ComponentPreview title="No rows selector">
					<CursorWithoutSelector />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Names for assistive technology
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every control is named from the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						pagination
					</code>{' '}
					labels of{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						@turystack/react-i18n
					</code>
					, including the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;nav&gt;
					</code>{' '}
					landmark.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Two paginated tables on one screen would give two landmarks with the
					same name. Name them apart with a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						LabelsProvider
					</code>{' '}
					around each —{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{"{ pagination: { label: 'Páginas de reservas' } }"}
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/pagination')({
	component: Page,
})
