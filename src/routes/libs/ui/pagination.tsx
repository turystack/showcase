import { createFileRoute } from '@tanstack/react-router'
import { Pagination, Provider } from '@turystack/ui'
import { useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const offsetProps = [
	{
		description: 'Mode discriminant — use "offset" for page-based pagination.',
		name: 'mode',
		required: true,
		type: '"offset"',
	},
	{
		description: 'The current page number (1-based).',
		name: 'page',
		required: true,
		type: 'number',
	},
	{
		description: 'Number of rows displayed per page.',
		name: 'rowsPerPage',
		required: true,
		type: 'number',
	},
	{
		description: 'Total number of items across all pages.',
		name: 'total',
		required: true,
		type: 'number',
	},
	{
		description: 'Handler called when the user navigates to a different page.',
		name: 'onPageChange',
		required: true,
		type: '(page: number) => void',
	},
	{
		description: 'Handler called when the user changes the rows per page.',
		name: 'onRowsPerPageChange',
		required: true,
		type: '(rowsPerPage: number) => void',
	},
]

const cursorProps = [
	{
		description:
			'Mode discriminant — use "cursor" for cursor-based pagination.',
		name: 'mode',
		required: true,
		type: '"cursor"',
	},
	{
		description: 'Number of rows displayed per page.',
		name: 'rowsPerPage',
		required: true,
		type: 'number',
	},
	{
		description: 'Whether there is a previous page to navigate to.',
		name: 'hasPreviousPage',
		type: 'boolean',
	},
	{
		description: 'Whether there is a next page to navigate to.',
		name: 'hasNextPage',
		type: 'boolean',
	},
	{
		description: 'Handler called when navigating to the previous page.',
		name: 'onPreviousPage',
		type: '() => void',
	},
	{
		description: 'Handler called when navigating to the next page.',
		name: 'onNextPage',
		type: '() => void',
	},
	{
		description: 'Handler called when the user changes the rows per page.',
		name: 'onRowsPerPageChange',
		type: '(rowsPerPage: number) => void',
	},
]

const usageCode = `import { Pagination } from '@turystack/ui'
import { useState } from 'react'

// Offset pagination (page-based)
function OffsetExample() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  return (
    <Pagination
      mode="offset"
      page={page}
      rowsPerPage={rowsPerPage}
      total={250}
      onPageChange={setPage}
      onRowsPerPageChange={setRowsPerPage}
    />
  )
}

// Cursor pagination (next/prev only)
function CursorExample() {
  const [rowsPerPage, setRowsPerPage] = useState(10)

  return (
    <Pagination
      mode="cursor"
      rowsPerPage={rowsPerPage}
      hasPreviousPage={!!cursor.previous}
      hasNextPage={!!cursor.next}
      onPreviousPage={() => fetchPrevious(cursor.previous)}
      onNextPage={() => fetchNext(cursor.next)}
      onRowsPerPageChange={setRowsPerPage}
    />
  )
}`

function OffsetDemo() {
	const [page, setPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	return (
		<Pagination
			mode="offset"
			onPageChange={setPage}
			onRowsPerPageChange={setRowsPerPage}
			page={page}
			rowsPerPage={rowsPerPage}
			total={250}
		/>
	)
}

function CursorDemo() {
	const [rowsPerPage, setRowsPerPage] = useState(10)

	return (
		<Pagination
			hasNextPage
			hasPreviousPage={false}
			mode="cursor"
			onNextPage={() => {}}
			onPreviousPage={() => {}}
			onRowsPerPageChange={setRowsPerPage}
			rowsPerPage={rowsPerPage}
		/>
	)
}

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Pagination
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A navigation control for paginating through large datasets. Supports
						both offset (page-based) and cursor-based pagination modes.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Offset mode props
					</h2>
					<PropsTable props={offsetProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Cursor mode props
					</h2>
					<PropsTable props={cursorProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Offset pagination
					</h2>
					<ComponentPreview title="Page-based pagination (250 total items)">
						<OffsetDemo />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Cursor pagination
					</h2>
					<ComponentPreview title="Cursor-based prev/next pagination">
						<CursorDemo />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/pagination')({
	component: Page,
})
