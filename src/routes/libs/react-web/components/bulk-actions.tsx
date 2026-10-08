import { createFileRoute } from '@tanstack/react-router'
import {
	BulkActions,
	Button,
	Checkbox,
	Input,
	List,
	MoneyText,
	ProtectedProvider,
	Table,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const bulkActionsProps = [
	{
		description: 'The selection: keys, rows or ids (generic, default string).',
		name: 'selection',
		required: true,
		type: 'T[]',
	},
	{
		description: 'Actions to run on the selection.',
		name: 'actions',
		required: true,
		type: 'BulkAction<T>[]',
	},
	{
		description: 'Empties the selection (X, Escape, finished action).',
		name: 'onClear',
		type: '() => void',
	},
	{
		default: 'true',
		description: 'Whether a successful action clears the selection.',
		name: 'clearOnRun',
		type: 'boolean',
	},
	{
		description: 'Node beside the count; a function gets the selection.',
		name: 'extra',
		type: 'React.ReactNode | ((selection: T[]) => React.ReactNode)',
	},
	{
		default: '3',
		description: 'Actions shown as buttons; the rest go in a menu.',
		name: 'maxVisible',
		type: 'number',
	},
	{
		description: 'A node before the count: a thumbnail row, an avatar stack.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		default: '"bottom"',
		description: 'Which edge the bar floats over. Floating placement only.',
		name: 'position',
		type: '"bottom" | "top"',
	},
	{
		default: '"floating"',
		description: 'floating Sheet over the page, or inline in the flow.',
		name: 'placement',
		type: '"floating" | "inline"',
	},
	{
		description: 'Blocks every action.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'The page is busy: the bar says so and refuses to run.',
		name: 'loading',
		type: 'boolean',
	},
]

const bulkActionProps = [
	{
		description: 'Stable identity, and the React key.',
		name: 'id',
		required: true,
		type: 'string',
	},
	{
		description: 'What the control says.',
		name: 'label',
		required: true,
		type: 'string',
	},
	{
		description: 'Runs the action with the selection and challenge input.',
		name: 'onRun',
		required: true,
		type: '(selection: T[], confirmation?: string) => void | Promise<void>',
	},
	{
		description: 'Confirm dialog config, or a function of the selection.',
		name: 'confirm',
		type: 'BulkActionConfirm | ((selection: T[]) => BulkActionConfirm)',
	},
	{
		description: 'A node before the label. Never an icon name.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		default: '"ghost"',
		description: 'Visual weight. destructive for the ones that are.',
		name: 'variant',
		type: 'ButtonVariant',
	},
	{
		description: 'Disables the action; a function reads the selection.',
		name: 'disabled',
		type: 'boolean | ((selection: T[]) => boolean)',
	},
	{
		description: 'Blocks it and says why in a tooltip.',
		name: 'disabledReason',
		type: 'string | ((selection: T[]) => string | undefined)',
	},
	{
		description: 'Absent from the bar entirely, rather than shown greyed.',
		name: 'hidden',
		type: 'boolean | ((selection: T[]) => boolean)',
	},
	{
		description: 'Not held: blocked, with a permission-denied reason.',
		name: 'permissionIds',
		type: 'PermissionId[]',
	},
]

const usageCode = `import { BulkActions, Table } from '@turystack/react-web'

const [selectedKeys, setSelectedKeys] = useState<string[]>([])

const actions: BulkAction<string>[] = [
  {
    icon: <ArrowDownToLine />,
    id: 'export',
    label: 'Export',
    onRun: (ids) => exportBookings.mutateAsync({ ids }),
  },
  {
    // a function of the selection, so the dialog can count
    confirm: (ids) => ({
      content: <BookingSummary ids={ids} />,
      description: 'This cannot be undone.',
      mode: 'typed',
      confirmationValue: \`DELETE \${ids.length}\`,
      title: \`Delete \${ids.length} bookings?\`,
    }),
    icon: <Trash2 />,
    id: 'delete',
    label: 'Delete',
    permissionIds: ['booking:delete'],
    variant: 'destructive',
    // the typed text arrives here; a password or an OTP would too
    onRun: (ids, confirmation) =>
      deleteBookings.mutateAsync({ confirmation, ids }),
  },
]

<Table
  columns={columns}
  itemKey="id"
  items={bookings}
  onSelectionChange={setSelectedKeys}
  selectedKeys={selectedKeys}
  selection="multiple"
/>

<BulkActions
  actions={actions}
  onClear={() => setSelectedKeys([])}
  selection={selectedKeys}
/>

// extra is whatever else this bar has to say. Select-all is one thing you
// can put there — it is no longer the only thing the slot can hold.
<BulkActions
  actions={actions}
  extra={(selection) =>
    selection.length >= total ? (
      <span className="text-muted-foreground text-sm">All {total} selected</span>
    ) : (
      <Button onClick={selectEveryMatch} size="sm" variant="link">
        Select all {total}
      </Button>
    )
  }
  onClear={() => setSelectedKeys([])}
  selection={selectedKeys}
/>

// Inline — the toolbar row becomes the bar while something is selected
{selectedKeys.length > 0 ? (
  <BulkActions
    actions={actions}
    onClear={() => setSelectedKeys([])}
    placement="inline"
    selection={selectedKeys}
  />
) : (
  <Input placeholder="Buscar reserva" />
)}`

type Booking = {
	code: string
	id: string
	price: number
	status: string
}

const BOOKINGS: Booking[] = [
	{
		code: 'TRY-1041',
		id: '1',
		price: 128000,
		status: 'Confirmed',
	},
	{
		code: 'TRY-1042',
		id: '2',
		price: 39900,
		status: 'Pending',
	},
	{
		code: 'TRY-1043',
		id: '3',
		price: 812000,
		status: 'Confirmed',
	},
]

const COLUMNS = [
	{
		key: 'code',
		label: 'Code',
	},
	{
		key: 'status',
		label: 'Status',
	},
	{
		key: 'price',
		label: 'Price',
		selector: (row: Booking) => <MoneyText value={row.price} />,
	},
]

function useDemoActions(onRan: (message: string) => void) {
	return [
		{
			id: 'export',
			label: 'Export',
			onRun: (ids: string[]) => onRan(`Exported ${ids.length}`),
		},
		{
			id: 'archive',
			label: 'Archive',
			onRun: (ids: string[]) => onRan(`Archived ${ids.length}`),
		},
		{
			id: 'tag',
			label: 'Tag',
			onRun: (ids: string[]) => onRan(`Tagged ${ids.length}`),
		},
		{
			confirm: (ids: string[]) => ({
				description: 'This cannot be undone.',
				title: `Delete ${ids.length} bookings?`,
			}),
			id: 'delete',
			label: 'Delete',
			onRun: (ids: string[]) => onRan(`Deleted ${ids.length}`),
			variant: 'destructive' as const,
		},
	]
}

function TableExample() {
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const [ran, setRan] = useState<string | null>(null)
	const actions = useDemoActions(setRan)

	return (
		<div className="flex w-full flex-col gap-3">
			<Table
				columns={COLUMNS}
				itemKey="id"
				items={BOOKINGS}
				onSelectionChange={setSelectedKeys}
				selectedKeys={selectedKeys}
				selection="multiple"
			/>
			<span className="text-muted-foreground text-xs">
				last run: {ran ?? '(nothing yet)'}
			</span>
			<BulkActions
				actions={actions}
				extra={(selection) =>
					selection.length >= BOOKINGS.length ? (
						<span className="text-muted-foreground text-sm">
							All {BOOKINGS.length} selected
						</span>
					) : (
						<Button
							onClick={() => setSelectedKeys(BOOKINGS.map((row) => row.id))}
							size="sm"
							variant="link"
						>
							Select all {BOOKINGS.length}
						</Button>
					)
				}
				maxVisible={2}
				onClear={() => setSelectedKeys([])}
				selection={selectedKeys}
			/>
		</div>
	)
}

function ListExample() {
	const [selected, setSelected] = useState<Booking[]>([])
	const [ran, setRan] = useState<string | null>(null)

	function toggle(booking: Booking, checked: boolean) {
		setSelected((current) =>
			checked
				? [
						...current,
						booking,
					]
				: current.filter((row) => row.id !== booking.id),
		)
	}

	return (
		<div className="flex w-full flex-col gap-3">
			<List
				divided
				itemKey="id"
				items={BOOKINGS}
				renderItem={(booking) => (
					<div className="flex items-center gap-3 py-2 text-sm">
						<Checkbox
							checked={selected.some((row) => row.id === booking.id)}
							label={booking.code}
							onChange={(checked) => toggle(booking, checked === true)}
						/>
						<span className="flex-1" />
						<MoneyText
							muted
							size="sm"
							value={booking.price}
						/>
					</div>
				)}
			/>
			<span className="text-muted-foreground text-xs">
				last run: {ran ?? '(nothing yet)'}
			</span>
			<BulkActions<Booking>
				actions={[
					{
						id: 'export',
						label: 'Export',
						onRun: (rows) => setRan(rows.map((row) => row.code).join(', ')),
					},
					{
						disabled: (rows) => rows.some((row) => row.status === 'Pending'),
						id: 'invoice',
						label: 'Invoice',
						onRun: (rows) => setRan(`Invoiced ${rows.length}`),
					},
				]}
				leftSection={
					<MoneyText
						value={selected.reduce((total, row) => total + row.price, 0)}
						weight="semibold"
					/>
				}
				onClear={() => setSelected([])}
				selection={selected}
			/>
		</div>
	)
}

function ReasonExample() {
	const [selected, setSelected] = useState<Booking[]>(BOOKINGS.slice(0, 2))

	return (
		<ProtectedProvider permissions={[]}>
			<div className="flex min-h-12 w-full items-center">
				{selected.length > 0 ? (
					<div className="w-full">
						<BulkActions<Booking>
							actions={[
								{
									id: 'export',
									label: 'Exportar',
									onRun: () => undefined,
								},
								{
									disabledReason: (rows) =>
										rows.some((row) => row.status === 'Pending')
											? 'Reservas pendentes não podem ser faturadas'
											: undefined,
									id: 'invoice',
									label: 'Faturar',
									onRun: () => undefined,
								},
								{
									id: 'delete',
									label: 'Excluir',
									onRun: () => undefined,
									permissionIds: [
										'booking:delete',
									],
									variant: 'destructive',
								},
							]}
							clearOnRun={false}
							onClear={() => setSelected([])}
							placement="inline"
							selection={selected}
						/>
					</div>
				) : (
					<Button
						onClick={() => setSelected(BOOKINGS.slice(0, 2))}
						size="sm"
						variant="outline"
					>
						Selecionar de novo
					</Button>
				)}
			</div>
		</ProtectedProvider>
	)
}

function InlineExample() {
	const [selectedKeys, setSelectedKeys] = useState<string[]>([
		'1',
	])
	const [ran, setRan] = useState<string | null>(null)
	const actions = useDemoActions(setRan)

	return (
		<div className="flex w-full flex-col gap-3">
			<div className="flex min-h-12 items-center">
				{selectedKeys.length > 0 ? (
					<div className="w-full">
						<BulkActions
							actions={actions}
							maxVisible={2}
							onClear={() => setSelectedKeys([])}
							placement="inline"
							selection={selectedKeys}
						/>
					</div>
				) : (
					<Input
						ariaLabel="Buscar reserva"
						placeholder="Buscar reserva por código"
					/>
				)}
			</div>
			<Table
				columns={COLUMNS}
				itemKey="id"
				items={BOOKINGS}
				onSelectionChange={setSelectedKeys}
				selectedKeys={selectedKeys}
				selection="multiple"
			/>
			<span className="text-muted-foreground text-xs">
				last run: {ran ?? '(nothing yet)'}
			</span>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Overlays
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					BulkActions
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A bar that shows up when a selection exists and offers what can be
					done to it — floating over the page, or inline in place of its
					toolbar.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={bulkActionsProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">BulkAction</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One entry in{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						actions
					</code>
					. Everything that varies per action lives here rather than in the bar,
					so a screen adds a button by adding an object.
				</p>
				<PropsTable props={bulkActionProps} />
			</section>

			<SlotsSection slug="bulk-actions" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					With a Table, which selects keys
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Table
					</code>{' '}
					emits row keys through{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onSelectionChange
					</code>
					, and those keys go straight in — the generic defaults to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						string
					</code>{' '}
					for exactly this.
				</p>
				<ComponentPreview title="Table selection, keys in the bar">
					<TableExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					With a List, which selects nothing at all
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						List
					</code>{' '}
					has no selection of its own — the screen owns it, with whatever
					control fits the row.
				</p>
				<ComponentPreview title="Rows in the bar, and a running total">
					<ListExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Inline, in place of the toolbar
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						placement="inline"
					</code>{' '}
					draws the bar in the page flow, replacing the toolbar while rows are
					selected.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						position
					</code>{' '}
					does not apply.
				</p>
				<ComponentPreview title="The search row becomes the bar">
					<InlineExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabledReason
					</code>{' '}
					can read the selection; a missing permission brings its own reason.
					Hover or focus to read it.
				</p>
				<ComponentPreview title="One reason from rows, one from permissions">
					<ReasonExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Confirmation belongs to the action
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					An action with confirm hands its whole run to Confirm: the dialog
					spins, refuses, and closes only on success.
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

export const Route = createFileRoute('/libs/react-web/components/bulk-actions')(
	{
		component: Page,
	},
)
