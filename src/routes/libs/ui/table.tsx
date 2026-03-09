import { createFileRoute } from '@tanstack/react-router'
import { Table, Provider } from '@turystack/ui'
import { useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const tableProps = [
	{
		description: 'Column definitions including key, label, selector, align, width, sorter, and hide.',
		name: 'columns',
		required: true,
		type: 'TableColumns<T>',
	},
	{
		description: 'Array of data items to display.',
		name: 'items',
		type: 'T[]',
	},
	{
		description: 'The key of the item to use as a unique row identifier.',
		name: 'itemKey',
		required: true,
		type: 'keyof T',
	},
	{
		default: '"none"',
		description: 'Row selection mode.',
		name: 'selection',
		type: '"none" | "multiple"',
	},
	{
		description: 'Pagination configuration (offset or cursor mode).',
		name: 'pagination',
		type: 'PaginationProps',
	},
	{
		description: 'Current sort key. Prefix with "-" for descending (e.g., "-name").',
		name: 'sort',
		type: 'string',
	},
	{
		default: 'false',
		description: 'When true, hides the pagination control even if pagination is provided.',
		name: 'hidePagination',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'When true, shows a loading overlay over the table.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Content to display when there are no items.',
		name: 'emptySection',
		type: 'React.ReactNode',
	},
	{
		description: 'Handler called when a row is clicked.',
		name: 'onRowClick',
		type: '(row: T) => void',
	},
	{
		description: 'Handler called when selection changes. Receives array of selected key strings.',
		name: 'onSelectionChange',
		type: '(value: string[]) => void',
	},
	{
		description: 'Handler called when a sortable column header is clicked.',
		name: 'onSortChange',
		type: '(sort?: string) => void',
	},
]

const columnProps = [
	{
		description: 'Unique key identifying this column (also used as the row data key).',
		name: 'key',
		required: true,
		type: 'string',
	},
	{
		description: 'Header label text.',
		name: 'label',
		type: 'string',
	},
	{
		description: 'Custom cell renderer. Falls back to String(row[key]) if omitted.',
		name: 'selector',
		type: '(row: T, index: number) => React.ReactNode',
	},
	{
		default: '"left"',
		description: 'Text alignment for the column header and cells.',
		name: 'align',
		type: '"left" | "center" | "right"',
	},
	{
		description: 'Fixed width in pixels for the column.',
		name: 'width',
		type: 'number',
	},
	{
		default: 'false',
		description: 'When true, clicking the header toggles sort for this column.',
		name: 'sorter',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'When true, the column is hidden from the table.',
		name: 'hide',
		type: 'boolean',
	},
]

type User = {
	id: number
	name: string
	email: string
	role: string
	status: 'Active' | 'Inactive' | 'Pending'
}

const ALL_USERS: User[] = [
	{ email: 'alice@example.com', id: 1, name: 'Alice Johnson', role: 'Admin', status: 'Active' },
	{ email: 'bob@example.com', id: 2, name: 'Bob Smith', role: 'User', status: 'Active' },
	{ email: 'carol@example.com', id: 3, name: 'Carol White', role: 'Editor', status: 'Inactive' },
	{ email: 'dave@example.com', id: 4, name: 'Dave Brown', role: 'User', status: 'Active' },
	{ email: 'eve@example.com', id: 5, name: 'Eve Davis', role: 'Viewer', status: 'Pending' },
	{ email: 'frank@example.com', id: 6, name: 'Frank Miller', role: 'User', status: 'Active' },
	{ email: 'grace@example.com', id: 7, name: 'Grace Lee', role: 'Editor', status: 'Active' },
	{ email: 'henry@example.com', id: 8, name: 'Henry Wilson', role: 'Viewer', status: 'Inactive' },
	{ email: 'iris@example.com', id: 9, name: 'Iris Clark', role: 'Admin', status: 'Active' },
	{ email: 'jack@example.com', id: 10, name: 'Jack Turner', role: 'User', status: 'Pending' },
	{ email: 'kate@example.com', id: 11, name: 'Kate Adams', role: 'Editor', status: 'Active' },
	{ email: 'leo@example.com', id: 12, name: 'Leo Scott', role: 'Viewer', status: 'Active' },
]

function applySortToUsers(data: User[], sort?: string): User[] {
	if (!sort) return data
	const desc = sort.startsWith('-')
	const key = (desc ? sort.slice(1) : sort) as keyof User
	return [...data].sort((a, b) =>
		desc
			? String(b[key]).localeCompare(String(a[key]))
			: String(a[key]).localeCompare(String(b[key])),
	)
}

function StatusBadge({ status }: { status: User['status'] }) {
	const colors: Record<User['status'], string> = {
		Active: 'bg-green-100 text-green-700',
		Inactive: 'bg-red-100 text-red-700',
		Pending: 'bg-yellow-100 text-yellow-700',
	}
	return (
		<span
			className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[status]}`}
		>
			{status}
		</span>
	)
}

const usageCode = `import { Table } from '@turystack/ui'
import { useState } from 'react'

type User = { id: number; name: string; email: string; role: string; status: string }

const columns = [
  { key: 'name', label: 'Name', sorter: true },
  { key: 'email', label: 'Email', sorter: true },
  { key: 'role', label: 'Role' },
  {
    key: 'status',
    label: 'Status',
    align: 'center' as const,
    selector: (row: User) => <StatusBadge status={row.status} />,
  },
]

function UserTable() {
  const [sort, setSort] = useState<string | undefined>()
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const sorted = applySortToUsers(users, sort)
  const items = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  return (
    <Table
      columns={columns}
      items={items}
      itemKey="id"
      selection="multiple"
      sort={sort}
      loading={isLoading}
      pagination={{
        mode: 'offset',
        page,
        rowsPerPage,
        total: users.length,
        onPageChange: setPage,
        onRowsPerPageChange: (rpp) => { setRowsPerPage(rpp); setPage(1) },
      }}
      onRowClick={(row) => console.log(row)}
      onSelectionChange={(keys) => console.log(keys)}
      onSortChange={(s) => { setSort(s); setPage(1) }}
    />
  )
}`

function Page() {
	// Basic with sort
	const [basicSort, setBasicSort] = useState<string | undefined>()

	// Pagination example
	const [paginatedSort, setPaginatedSort] = useState<string | undefined>()
	const [page, setPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	// Full-featured (sort + selection + pagination)
	const [fullSort, setFullSort] = useState<string | undefined>()
	const [fullPage, setFullPage] = useState(1)
	const [fullRowsPerPage, setFullRowsPerPage] = useState(5)

	// Row click example
	const [clickedUser, setClickedUser] = useState<User | null>(null)

	const columns = [
		{ key: 'name', label: 'Name', sorter: true },
		{ key: 'email', label: 'Email', sorter: true },
		{ key: 'role', label: 'Role', sorter: true },
		{
			align: 'center' as const,
			key: 'status',
			label: 'Status',
			selector: (row: User) => <StatusBadge status={row.status} />,
		},
	]

	const basicItems = applySortToUsers(ALL_USERS.slice(0, 5), basicSort)

	const paginatedSorted = applySortToUsers(ALL_USERS, paginatedSort)
	const paginatedItems = paginatedSorted.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage,
	)

	const fullSorted = applySortToUsers(ALL_USERS, fullSort)
	const fullItems = fullSorted.slice(
		(fullPage - 1) * fullRowsPerPage,
		fullPage * fullRowsPerPage,
	)

	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Table
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A data table with support for sorting, multi-row selection,
						pagination, loading state, and custom cell renderers.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Table Props</h2>
					<PropsTable props={tableProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Column definition
					</h2>
					<PropsTable props={columnProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview
						className="block p-4"
						title="Simple table with sortable columns"
					>
						<Table
							columns={columns}
							itemKey="id"
							items={basicItems}
							sort={basicSort}
							onSortChange={setBasicSort}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With pagination
					</h2>
					<ComponentPreview
						className="block p-4"
						title="Offset pagination — 12 rows, 5 per page, with sort"
					>
						<Table
							columns={columns}
							itemKey="id"
							items={paginatedItems}
							pagination={{
								mode: 'offset',
								onPageChange: setPage,
								onRowsPerPageChange: (rpp) => {
									setRowsPerPage(rpp)
									setPage(1)
								},
								page,
								rowsPerPage,
								total: ALL_USERS.length,
							}}
							sort={paginatedSort}
							onSortChange={(s) => {
								setPaginatedSort(s)
								setPage(1)
							}}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With selection
					</h2>
					<ComponentPreview
						className="block p-4"
						title="Multi-select, sorting and pagination combined"
					>
						<Table
							columns={columns}
							itemKey="id"
							items={fullItems}
							pagination={{
								mode: 'offset',
								onPageChange: setFullPage,
								onRowsPerPageChange: (rpp) => {
									setFullRowsPerPage(rpp)
									setFullPage(1)
								},
								page: fullPage,
								rowsPerPage: fullRowsPerPage,
								total: ALL_USERS.length,
							}}
							selection="multiple"
							sort={fullSort}
							onSelectionChange={() => {}}
							onSortChange={(s) => {
								setFullSort(s)
								setFullPage(1)
							}}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Clickable rows
					</h2>
					<ComponentPreview
						className="block p-4"
						title="Table with row click handler"
					>
						<div className="space-y-3">
							<Table
								columns={columns}
								itemKey="id"
								items={ALL_USERS.slice(0, 5)}
								onRowClick={setClickedUser}
							/>
							{clickedUser && (
								<p className="text-sm text-muted-foreground">
									Clicked:{' '}
									<span className="font-medium text-foreground">
										{clickedUser.name}
									</span>{' '}
									— {clickedUser.email}
								</p>
							)}
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Loading state
					</h2>
					<ComponentPreview
						className="block p-4"
						title="Table with loading overlay"
					>
						<Table
							columns={columns}
							itemKey="id"
							items={ALL_USERS.slice(0, 5)}
							loading
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Empty state</h2>
					<ComponentPreview
						className="block p-4"
						title="Empty table with custom message"
					>
						<Table
							columns={columns}
							emptySection="No users found. Try adjusting your filters."
							itemKey="id"
							items={[]}
						/>
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

export const Route = createFileRoute('/libs/ui/table')({
	component: Page,
})
