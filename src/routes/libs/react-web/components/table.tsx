import { createFileRoute } from '@tanstack/react-router'
import {
	Avatar,
	Badge,
	Button,
	DropdownMenu,
	EmptyState,
	Resizable,
	Table,
	type TableColumns,
} from '@turystack/react-web'
import {
	Copy,
	Inbox,
	Luggage,
	Minus,
	MoreHorizontal,
	Pencil,
	Trash2,
	X,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/table/table.types.ts` and the
 * destructuring defaults in `table.tsx`.
 *
 * The important thing the type does not say: the table sorts nothing and
 * paginates nothing. `sort` and `pagination` are display state it renders and
 * reports back — the rows it is handed are the rows it shows, in that order.
 * Every preview on this page does the slicing and the comparing itself.
 */
const tableProps = [
	{
		description: 'Column definitions (key, label, selector, width, sorter…).',
		name: 'columns',
		required: true,
		type: 'TableColumns<T>',
	},
	{
		description: 'Row field used as key for React and selection.',
		name: 'itemKey',
		required: true,
		type: 'keyof T',
	},
	{
		description: 'Rows to render, already sorted and paged.',
		name: 'items',
		type: 'T[]',
	},
	{
		default: '"none"',
		description: 'multiple adds row checkboxes and a select-all box.',
		name: 'selection',
		type: '"none" | "multiple"',
	},
	{
		description: 'Names each row checkbox for screen readers.',
		name: 'rowName',
		type: '(row: T) => string',
	},
	{
		description: 'Controlled selection; reported via onSelectionChange.',
		name: 'selectedKeys',
		type: 'string[]',
	},
	{
		default: '[]',
		description: 'Initial selection, read once (uncontrolled).',
		name: 'defaultSelectedKeys',
		type: 'string[]',
	},
	{
		description: 'Current sort: key ascending, -key descending.',
		name: 'sort',
		type: 'string',
	},
	{
		description: 'Config passed to the Pagination below the table.',
		name: 'pagination',
		type: 'PaginationProps',
	},
	{
		default: 'false',
		description: 'Keeps the pagination config but hides the control.',
		name: 'hidePagination',
		type: 'boolean',
	},
	{
		default: '"default"',
		description: 'Row spacing; compact tightens padding and header.',
		name: 'density',
		type: '"compact" | "default"',
	},
	{
		description: 'Key of the row open elsewhere; sets aria-current.',
		name: 'activeKey',
		type: 'string | number',
	},
	{
		default: 'false',
		description: 'Overlays a LoadingOverlay; excludes outcome.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Remote-read state painted by the table; excludes items.',
		name: 'outcome',
		type: 'DataOutcome<T[]>',
	},
	{
		default: '3',
		description: 'Skeleton rows drawn while an outcome is pending.',
		name: 'loadingRows',
		type: 'number',
	},
	{
		description: 'Body content when there are no rows.',
		name: 'emptySection',
		type: 'React.ReactNode',
	},
	{
		description: 'Replaces the body when the outcome is denied.',
		name: 'deniedSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Replaces the body when the outcome failed.',
		name: 'errorSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Minimum width in px; scrolls horizontally below it.',
		name: 'layoutWidth',
		type: 'number',
	},
	{
		description: 'Fires with the row; ignores clicks on cell controls.',
		name: 'onRowClick',
		type: '(row: T) => void',
	},
	{
		description: 'Fires with the full list of selected keys after any change.',
		name: 'onSelectionChange',
		type: '(value: string[]) => void',
	},
	{
		description: 'Fires with the next sort when a header is clicked.',
		name: 'onSortChange',
		type: '(sort?: string) => void',
	},
]

const columnProps = [
	{
		description: 'Column id; read off the row when there is no selector.',
		name: 'key',
		required: true,
		type: 'string',
	},
	{
		description: 'Header text. Nothing is rendered in the header without it.',
		name: 'label',
		type: 'string',
	},
	{
		description: 'Renders the cell from the row and its index.',
		name: 'selector',
		type: '(row: T, index: number) => React.ReactNode',
	},
	{
		default: '"left"',
		description: 'Header and cell alignment; center suits a lone action.',
		name: 'align',
		type: '"left" | "center" | "right"',
	},
	{
		description: 'Column width, as a share of all widths.',
		name: 'width',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Makes width exact pixels instead of a share.',
		name: 'fixedWidth',
		type: 'boolean',
	},
	{
		description: 'Pins the column to the left or right edge on scroll.',
		name: 'sticky',
		type: '"left" | "right"',
	},
	{
		default: 'false',
		description: 'Makes the header a sort button (needs onSortChange).',
		name: 'sorter',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Removes the column: header, cells and colgroup.',
		name: 'hide',
		type: 'boolean',
	},
]

type Reservation = {
	id: string
	passenger: string
	route: string
	departure: string
	seats: number
	status: 'confirmada' | 'pendente' | 'cancelada'
	total: number
}

const reservations: Reservation[] = [
	{
		departure: '2026-03-12',
		id: 'R-4821',
		passenger: 'Ana Silva',
		route: 'GRU → LIS',
		seats: 2,
		status: 'confirmada',
		total: 4820.5,
	},
	{
		departure: '2026-03-14',
		id: 'R-4822',
		passenger: 'Bruno Costa',
		route: 'CGH → SDU',
		seats: 1,
		status: 'pendente',
		total: 612,
	},
	{
		departure: '2026-03-15',
		id: 'R-4823',
		passenger: 'Carla Mendes',
		route: 'BSB → MIA',
		seats: 3,
		status: 'confirmada',
		total: 9210.9,
	},
	{
		departure: '2026-03-18',
		id: 'R-4824',
		passenger: 'Diego Ramos',
		route: 'POA → EZE',
		seats: 1,
		status: 'cancelada',
		total: 1150,
	},
	{
		departure: '2026-03-19',
		id: 'R-4825',
		passenger: 'Elisa Prado',
		route: 'REC → LIS',
		seats: 2,
		status: 'confirmada',
		total: 5340.75,
	},
	{
		departure: '2026-03-21',
		id: 'R-4826',
		passenger: 'Felipe Nunes',
		route: 'GIG → MCO',
		seats: 4,
		status: 'pendente',
		total: 11480,
	},
	{
		departure: '2026-03-23',
		id: 'R-4827',
		passenger: 'Gabriela Rocha',
		route: 'SSA → CDG',
		seats: 1,
		status: 'confirmada',
		total: 6120.4,
	},
	{
		departure: '2026-03-25',
		id: 'R-4828',
		passenger: 'Henrique Dias',
		route: 'CWB → SCL',
		seats: 2,
		status: 'confirmada',
		total: 2980,
	},
	{
		departure: '2026-03-27',
		id: 'R-4829',
		passenger: 'Isabela Freitas',
		route: 'FOR → LIS',
		seats: 1,
		status: 'cancelada',
		total: 3410.2,
	},
	{
		departure: '2026-03-29',
		id: 'R-4830',
		passenger: 'João Barreto',
		route: 'VCP → BOG',
		seats: 3,
		status: 'pendente',
		total: 7755,
	},
	{
		departure: '2026-04-02',
		id: 'R-4831',
		passenger: 'Karina Lopes',
		route: 'GRU → JFK',
		seats: 2,
		status: 'confirmada',
		total: 10230.6,
	},
	{
		departure: '2026-04-05',
		id: 'R-4832',
		passenger: 'Lucas Antunes',
		route: 'BEL → MAO',
		seats: 1,
		status: 'pendente',
		total: 890,
	},
]

/**
 * A second entity, because an identity cell needs fields a reservation does
 * not have — a person has a name, an address and a badge; a booking has a
 * code.
 */
type Agent = {
	code: string
	email: string
	id: string
	name: string
	role: string
	status: 'ativo' | 'convidado' | 'suspenso'
	team: string
}

const agents: Agent[] = [
	{
		code: 'AG-0197',
		email: 'ana.silva@turystack.com',
		id: 'AG-0197',
		name: 'Ana Silva',
		role: 'Consultora sênior',
		status: 'ativo',
		team: 'Corporativo',
	},
	{
		code: 'AG-0204',
		email: 'bruno.costa@turystack.com',
		id: 'AG-0204',
		name: 'Bruno Costa',
		role: 'Consultor',
		status: 'convidado',
		team: 'Lazer',
	},
	{
		code: 'AG-0231',
		email: 'gabriela.rocha.esteves@grupo-turystack.com.br',
		id: 'AG-0231',
		name: 'Gabriela Rocha Esteves',
		role: 'Coordenadora de emissão',
		status: 'ativo',
		team: 'Emissão',
	},
	{
		code: 'AG-0248',
		email: 'henrique.dias@turystack.com',
		id: 'AG-0248',
		name: 'Henrique Dias',
		role: 'Analista de suporte',
		status: 'suspenso',
		team: 'Suporte',
	},
]

const currency = new Intl.NumberFormat('pt-BR', {
	currency: 'BRL',
	style: 'currency',
})

const statusVariant = {
	cancelada: 'destructive',
	confirmada: 'success',
	pendente: 'warning',
} as const

const agentStatusVariant = {
	ativo: 'success',
	convidado: 'info',
	suspenso: 'destructive',
} as const

function initialsOf(name: string) {
	return name
		.split(' ')
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase()
}

/**
 * Identity, variation one: avatar, name, address.
 *
 * `truncate` on both lines is not decoration. The cell is `whitespace-nowrap`
 * and nothing in the table clips it, so an address longer than the column
 * would run across the cell beside it — the third row here is that long on
 * purpose.
 */
function AgentIdentity({ agent }: { agent: Agent }) {
	return (
		<div className="flex min-w-0 items-center gap-2.5">
			<Avatar size="sm">{initialsOf(agent.name)}</Avatar>
			<div className="min-w-0">
				<p className="truncate font-medium text-foreground">{agent.name}</p>
				<p className="truncate text-muted-foreground text-xs">{agent.email}</p>
			</div>
		</div>
	)
}

/** Identity, variation two: name, badge, then code and role on one line. */
function AgentSummary({ agent }: { agent: Agent }) {
	return (
		<div className="min-w-0 space-y-1">
			<div className="flex min-w-0 items-center gap-2">
				<span className="truncate font-medium text-foreground">
					{agent.name}
				</span>
				<Badge
					size="sm"
					variant={agentStatusVariant[agent.status]}
				>
					{agent.status}
				</Badge>
			</div>
			<p className="truncate text-muted-foreground text-xs">
				{agent.code} · {agent.role}
			</p>
		</div>
	)
}

/**
 * The menu that ends a row.
 *
 * The trigger is a real `<button>`, and the open menu is portalled out of the
 * row — the table excludes both from `onRowClick`, so this needs no
 * `stopPropagation` and no `data-table-row-click-ignore`.
 */
function RowActions({
	onAction,
	reservation,
}: {
	onAction: (action: string) => void
	reservation: Reservation
}) {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`Ações da reserva ${reservation.id}`}
					size="icon-sm"
					variant="ghost"
				>
					<MoreHorizontal />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={200}
			>
				<DropdownMenu.Item onClick={() => onAction(`editar ${reservation.id}`)}>
					<Pencil /> Editar
					<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item
					onClick={() => onAction(`duplicar ${reservation.id}`)}
				>
					<Copy /> Duplicar
					<DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					onClick={() => onAction(`excluir ${reservation.id}`)}
					variant="destructive"
				>
					<Trash2 /> Excluir
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/** The right-hand pane of the split view: the record the active row points at. */
function ReservationPreview({
	onClose,
	reservation,
}: {
	onClose: () => void
	reservation: Reservation
}) {
	return (
		<div className="space-y-4 p-4">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="text-muted-foreground text-xs">{reservation.id}</p>
					<p className="truncate font-semibold text-foreground">
						{reservation.passenger}
					</p>
				</div>
				<Button
					ariaLabel="Fechar pré-visualização"
					onClick={onClose}
					size="icon-sm"
					variant="ghost"
				>
					<X />
				</Button>
			</div>
			<Badge variant={statusVariant[reservation.status]}>
				{reservation.status}
			</Badge>
			<dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
				<div>
					<dt className="text-muted-foreground text-xs">Trecho</dt>
					<dd className="font-medium">{reservation.route}</dd>
				</div>
				<div>
					<dt className="text-muted-foreground text-xs">Embarque</dt>
					<dd className="font-medium">{reservation.departure}</dd>
				</div>
				<div>
					<dt className="text-muted-foreground text-xs">Assentos</dt>
					<dd className="font-medium">{reservation.seats}</dd>
				</div>
				<div>
					<dt className="text-muted-foreground text-xs">Total</dt>
					<dd className="font-medium tabular-nums">
						{currency.format(reservation.total)}
					</dd>
				</div>
			</dl>
		</div>
	)
}

function sortReservations(rows: Reservation[], sort?: string) {
	if (!sort) {
		return rows
	}

	const descending = sort.startsWith('-')
	const key = (descending ? sort.slice(1) : sort) as keyof Reservation

	return [
		...rows,
	].sort((left, right) => {
		const a = left[key]
		const b = right[key]
		const result =
			typeof a === 'number' && typeof b === 'number'
				? a - b
				: String(a).localeCompare(String(b), 'pt-BR')

		return descending ? -result : result
	})
}

const usageCode = `import { Table, type TableColumns } from '@turystack/react-web'

const columns: TableColumns<Reservation> = [
  { key: 'id', label: 'Código', sorter: true, width: 120 },
  { key: 'passenger', label: 'Passageiro', sorter: true, width: 220 },
  {
    align: 'right',
    key: 'total',
    label: 'Total',
    selector: (row) => currency.format(row.total),
    sorter: true,
    width: 140,
  },
  {
    key: 'status',
    label: 'Status',
    selector: (row) => <Badge variant={statusVariant[row.status]}>{row.status}</Badge>,
    width: 140,
  },
]

// The table renders; the page sorts and slices.
const sorted = sortReservations(reservations, sort)
const page = sorted.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage)

<Table
  columns={columns}
  emptySection={<EmptyState />}
  itemKey="id"
  items={page}
  loading={loading}
  onRowClick={(row) => open(row)}
  onSelectionChange={setSelectedKeys}
  onSortChange={setSort}
  pagination={{
    mode: 'offset',
    onPageChange: setPageNumber,
    onRowsPerPageChange: setRowsPerPage,
    page: pageNumber,
    rowsPerPage,
    total: sorted.length,
  }}
  rowName={(row) => row.passenger}
  selectedKeys={selectedKeys}
  selection="multiple"
  sort={sort}
/>`

const identityCode = `// Several fields of one entity in a single cell. The key still has to be a
// real field — sorting and nothing else reads it — but the selector decides
// what is drawn, so the cell can carry as many of them as it needs.
{
  key: 'name',
  label: 'Agente',
  sorter: true,
  // Wider than a plain text column: two lines and an avatar need the room.
  width: 280,
  selector: (agent) => (
    <div className="flex min-w-0 items-center gap-2.5">
      <Avatar size="sm">{initialsOf(agent.name)}</Avatar>
      {/* min-w-0 on the parent, truncate on the children — the cell is
          whitespace-nowrap and nothing in the table clips it for you. */}
      <div className="min-w-0">
        <p className="truncate font-medium text-foreground">{agent.name}</p>
        <p className="truncate text-muted-foreground text-xs">{agent.email}</p>
      </div>
    </div>
  ),
}`

const actionsCode = `// Row actions are not a table prop — just an ordinary last column.
{
  align: 'center',
  // No field on the row is called "actions" — with a selector, item[key] is
  // never read, so the key is just an identifier here. Leave sorter off.
  key: 'actions',
  label: '',
  // 56 real pixels, not a share of the total…
  width: 56,
  fixedWidth: true,
  // …and pinned to the right edge while the rest scrolls sideways.
  sticky: 'right',
  selector: (row) => (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button ariaLabel={\`Ações da reserva \${row.id}\`} size="icon-sm" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" width={200}>
        <DropdownMenu.Item onClick={() => edit(row)}>
          <Pencil /> Editar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => duplicate(row)}>
          <Copy /> Duplicar
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => remove(row)} variant="destructive">
          <Trash2 /> Excluir
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  ),
}

// The trigger is a <button> and the open menu is portalled out of the row;
// onRowClick ignores both — no stopPropagation needed.
<Table
  columns={columns}
  itemKey="id"
  items={rows}
  layoutWidth={900}
  onRowClick={open}
/>`

const widthCode = `// width is a share; fixedWidth makes it exact pixels
const columns: TableColumns<Reservation> = [
  { key: 'passenger', label: 'Passageiro', width: 200 }, // two shares…
  { key: 'route', label: 'Trecho', width: 100 },        // …to one
  {
    align: 'center',   // an icon alone is centred too, not only text
    fixedWidth: true,  // 96px however wide the table is
    key: 'baggage',
    label: 'Bagagem',
    selector: (row) =>
      row.seats > 1
        ? <Luggage aria-label="Com bagagem" className="size-4" role="img" />
        : <Minus aria-label="Sem bagagem" className="size-4 text-muted-foreground" role="img" />,
    width: 96,
  },
]`

const stickyCode = `// Pinned at both ends: the name on the left, the total on the right.
// layoutWidth makes the table wider than its box, so the middle scrolls.
const columns: TableColumns<Reservation> = [
  { key: 'passenger', label: 'Passageiro', sticky: 'left', width: 200 },
  { key: 'id', label: 'Código', width: 120 },
  { key: 'route', label: 'Trecho', width: 160 },
  { key: 'departure', label: 'Partida', width: 160 },
  { align: 'center', key: 'seats', label: 'Assentos', width: 120 },
  { key: 'status', label: 'Status', selector: (row) => <Badge>{row.status}</Badge>, width: 160 },
  {
    align: 'right',
    key: 'total',
    label: 'Total',
    selector: (row) => currency.format(row.total),
    sticky: 'right',
    width: 140,
  },
]

<Table columns={columns} itemKey="id" items={rows} layoutWidth={1060} selection="multiple" />`

const densityCode = `<Table columns={columns} density="compact" itemKey="id" items={rows} />`

const splitViewCode = `const [openId, setOpenId] = useState<string>()
const open = reservations.find((row) => row.id === openId)

<Resizable>
  <Resizable.Panel defaultSize={60} minSize={40}>
    <Table
      activeKey={openId}
      columns={columns}
      density="compact"
      itemKey="id"
      items={reservations}
      onRowClick={(row) => setOpenId(row.id)}
    />
  </Resizable.Panel>
  <Resizable.Handle withGrip />
  <Resizable.Panel minSize={25}>
    {open ? <ReservationPreview reservation={open} /> : <EmptyState title="Nenhuma reserva aberta" />}
  </Resizable.Panel>
</Resizable>`

function Page() {
	const [sort, setSort] = useState<string | undefined>('id')
	const [page, setPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const [loading, setLoading] = useState(false)
	const [lastRow, setLastRow] = useState<Reservation | null>(null)
	const [lastAction, setLastAction] = useState<string | null>(null)
	const [actionsRow, setActionsRow] = useState<Reservation | null>(null)
	const [openId, setOpenId] = useState<string | undefined>('R-4823')

	const sorted = useMemo(
		() => sortReservations(reservations, sort),
		[
			sort,
		],
	)
	const pageRows = useMemo(
		() => sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage),
		[
			page,
			rowsPerPage,
			sorted,
		],
	)

	const columns: TableColumns<Reservation> = [
		{
			key: 'id',
			label: 'Código',
			sorter: true,
			width: 110,
		},
		{
			key: 'passenger',
			label: 'Passageiro',
			sorter: true,
			width: 200,
		},
		{
			key: 'route',
			label: 'Trecho',
			width: 130,
		},
		{
			align: 'center',
			key: 'seats',
			label: 'Assentos',
			sorter: true,
			width: 110,
		},
		{
			key: 'status',
			label: 'Status',
			selector: (row: Reservation) => (
				<Badge variant={statusVariant[row.status]}>{row.status}</Badge>
			),
			width: 140,
		},
		{
			align: 'right',
			key: 'total',
			label: 'Total',
			selector: (row: Reservation) => currency.format(row.total),
			sorter: true,
			width: 150,
		},
	]

	const compactColumns: TableColumns<Reservation> = [
		{
			key: 'id',
			label: 'Código',
		},
		{
			key: 'passenger',
			label: 'Passageiro',
		},
		{
			key: 'route',
			label: 'Trecho',
		},
	]

	const actionColumns: TableColumns<Reservation> = [
		{
			key: 'id',
			label: 'Código',
			width: 110,
		},
		{
			key: 'passenger',
			label: 'Passageiro',
			width: 200,
		},
		{
			key: 'route',
			label: 'Trecho',
			width: 130,
		},
		{
			key: 'departure',
			label: 'Embarque',
			width: 130,
		},
		{
			key: 'status',
			label: 'Status',
			selector: (row: Reservation) => (
				<Badge variant={statusVariant[row.status]}>{row.status}</Badge>
			),
			width: 140,
		},
		{
			align: 'right',
			key: 'total',
			label: 'Total',
			selector: (row: Reservation) => currency.format(row.total),
			width: 150,
		},
		{
			align: 'center',
			fixedWidth: true,
			key: 'actions',
			label: '',
			selector: (row: Reservation) => (
				<RowActions
					onAction={setLastAction}
					reservation={row}
				/>
			),
			sticky: 'right',
			width: 56,
		},
	]

	const widthColumns: TableColumns<Reservation> = [
		{
			key: 'passenger',
			label: 'Passageiro (width 200)',
			width: 200,
		},
		{
			key: 'route',
			label: 'Trecho (width 100)',
			width: 100,
		},
		{
			align: 'center',
			fixedWidth: true,
			key: 'baggage',
			label: 'Bagagem',
			selector: (row: Reservation) =>
				row.seats > 1 ? (
					<Luggage
						aria-label="Com bagagem"
						className="size-4"
						role="img"
					/>
				) : (
					<Minus
						aria-label="Sem bagagem"
						className="size-4 text-muted-foreground"
						role="img"
					/>
				),
			width: 96,
		},
	]

	const splitColumns: TableColumns<Reservation> = [
		{
			key: 'id',
			label: 'Código',
			width: 90,
		},
		{
			key: 'passenger',
			label: 'Passageiro',
			width: 160,
		},
		{
			key: 'status',
			label: 'Status',
			selector: (row: Reservation) => (
				<Badge
					size="sm"
					variant={statusVariant[row.status]}
				>
					{row.status}
				</Badge>
			),
			width: 110,
		},
	]

	const openReservation = reservations.find(
		(reservation) => reservation.id === openId,
	)

	const identityColumns: TableColumns<Agent> = [
		{
			key: 'name',
			label: 'Agente',
			selector: (agent: Agent) => <AgentIdentity agent={agent} />,
			sorter: true,
			width: 280,
		},
		{
			key: 'team',
			label: 'Equipe',
			width: 140,
		},
		{
			align: 'right',
			key: 'status',
			label: 'Status',
			selector: (agent: Agent) => (
				<Badge variant={agentStatusVariant[agent.status]}>{agent.status}</Badge>
			),
			width: 130,
		},
	]

	const summaryColumns: TableColumns<Agent> = [
		{
			key: 'name',
			label: 'Agente',
			selector: (agent: Agent) => <AgentSummary agent={agent} />,
			width: 280,
		},
		{
			key: 'email',
			label: 'E-mail',
			width: 240,
		},
		{
			align: 'right',
			key: 'team',
			label: 'Equipe',
			width: 140,
		},
	]

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Table
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A generic data table: columns as data, selection, a sort control, a
					pagination bar, a loading overlay and an empty state.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={tableProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Each entry in{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						columns
					</code>{' '}
					is an object of its own.
				</p>
				<PropsTable props={columnProps} />
			</section>

			<SlotsSection slug="table" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Everything at once
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Twelve reservations behind a five-row page.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Sortable, selectable, paginated"
				>
					<div className="w-full space-y-4">
						<div className="flex flex-wrap items-center gap-3">
							<Button
								onClick={() => setLoading((value) => !value)}
								size="sm"
								variant="outline"
							>
								{loading ? 'Stop loading' : 'Show the loading overlay'}
							</Button>
							<Button
								onClick={() => setSelectedKeys([])}
								size="sm"
								variant="ghost"
							>
								Clear selection
							</Button>
							<span className="text-muted-foreground text-sm">
								sort:{' '}
								<code className="text-foreground">{sort ?? 'undefined'}</code> ·
								selected: {selectedKeys.length} · last row clicked:{' '}
								<code className="text-foreground">{lastRow?.id ?? '—'}</code>
							</span>
						</div>
						<Table
							columns={columns}
							itemKey="id"
							items={pageRows}
							loading={loading}
							onRowClick={(row: Reservation) => setLastRow(row)}
							onSelectionChange={setSelectedKeys}
							onSortChange={setSort}
							pagination={{
								mode: 'offset',
								onPageChange: setPage,
								onRowsPerPageChange: (next: number) => {
									setRowsPerPage(next)
									setPage(1)
								},
								page,
								rowsPerPage,
								total: sorted.length,
							}}
							selectedKeys={selectedKeys}
							selection="multiple"
							sort={sort}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Selection</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultSelectedKeys
					</code>{' '}
					lets the table own the selection;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						selectedKeys
					</code>{' '}
					makes you own it.
				</p>
				<ComponentPreview
					className="items-stretch"
					title={'selection="multiple", uncontrolled'}
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							defaultSelectedKeys={[
								'R-4822',
							]}
							itemKey="id"
							items={reservations.slice(0, 4)}
							selection="multiple"
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The header box turns indeterminate on partial selection.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rowName
					</code>{' '}
					names each row box, e.g. “Select row Bruno Costa”.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="rowName and an indeterminate header box"
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							defaultSelectedKeys={[
								'R-4822',
							]}
							itemKey="id"
							items={reservations.slice(0, 4)}
							rowName={(row: Reservation) => row.passenger}
							selection="multiple"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title='selection="none" — the default'
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							itemKey="id"
							items={reservations.slice(0, 4)}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Loading and empty
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					overlays the rows; they stay in the DOM and the height holds.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="loading over real rows"
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							itemKey="id"
							items={reservations.slice(0, 3)}
							loading
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="No rows, default message"
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							itemKey="id"
							items={[]}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="No rows, custom emptySection"
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							emptySection={
								<div className="flex flex-col items-center gap-3 py-6">
									<Inbox className="size-8 text-muted-foreground" />
									<div className="space-y-1">
										<p className="font-medium text-foreground">
											Nenhuma reserva neste período
										</p>
										<p className="text-muted-foreground text-sm">
											Ajuste o intervalo de datas ou limpe os filtros.
										</p>
									</div>
									<Button
										size="sm"
										variant="outline"
									>
										Limpar filtros
									</Button>
								</div>
							}
							itemKey="id"
							items={[]}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Columns</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						selector
					</code>{' '}
					is what turns a field into a cell — a badge, a formatted amount, a
					link.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="selector, align, and a hidden column"
				>
					<div className="w-full">
						<Table
							columns={[
								{
									key: 'id',
									label: 'Código',
									width: 110,
								},
								{
									hide: true,
									key: 'passenger',
									label: 'Passageiro (hide: true)',
									width: 200,
								},
								{
									align: 'center',
									key: 'seats',
									label: 'align center',
									width: 130,
								},
								{
									align: 'right',
									key: 'total',
									label: 'align right',
									selector: (row: Reservation) => currency.format(row.total),
									width: 150,
								},
								{
									key: 'status',
									label: 'selector → Badge',
									selector: (row: Reservation) => (
										<Badge variant={statusVariant[row.status]}>
											{row.status}
										</Badge>
									),
									width: 160,
								},
							]}
							itemKey="id"
							items={reservations.slice(0, 4)}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						layoutWidth
					</code>{' '}
					is the opt-in for horizontal scrolling.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="layoutWidth={900}"
				>
					<div className="w-full">
						<Table
							columns={columns}
							itemKey="id"
							items={reservations.slice(0, 4)}
							layoutWidth={900}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						sticky
					</code>{' '}
					pins a column:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						'left'
					</code>{' '}
					the first,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						'right'
					</code>{' '}
					the last. Scroll sideways to see.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Left and right sticky columns"
				>
					<div className="w-full">
						<Table
							columns={[
								{
									key: 'passenger',
									label: 'Passageiro',
									sticky: 'left',
									width: 200,
								},
								{
									key: 'id',
									label: 'Código',
									width: 120,
								},
								{
									key: 'route',
									label: 'Trecho',
									width: 160,
								},
								{
									key: 'departure',
									label: 'Partida',
									width: 160,
								},
								{
									align: 'center',
									key: 'seats',
									label: 'Assentos',
									width: 120,
								},
								{
									key: 'status',
									label: 'Status',
									selector: (row: Reservation) => (
										<Badge variant={statusVariant[row.status]}>
											{row.status}
										</Badge>
									),
									width: 160,
								},
								{
									align: 'right',
									key: 'total',
									label: 'Total',
									selector: (row: Reservation) => currency.format(row.total),
									sticky: 'right',
									width: 140,
								},
							]}
							defaultSelectedKeys={[
								'R-4822',
							]}
							itemKey="id"
							items={reservations.slice(0, 4)}
							layoutWidth={1060}
							selection="multiple"
						/>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={stickyCode}
					filename="sticky-columns.tsx"
					language="tsx"
				/>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width
					</code>{' '}
					alone is a ratio;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						fixedWidth
					</code>{' '}
					makes it exact pixels. Drag the handle: the icon column stays put.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Shares, a fixed 96px column, and a centred icon"
				>
					<div className="h-72 w-full overflow-hidden rounded-lg border border-border">
						<Resizable>
							<Resizable.Panel
								defaultSize={75}
								minSize={40}
							>
								<div className="p-3">
									<Table
										columns={widthColumns}
										density="compact"
										itemKey="id"
										items={reservations.slice(0, 4)}
									/>
								</div>
							</Resizable.Panel>
							<Resizable.Handle withGrip />
							<Resizable.Panel minSize={15}>
								<div className="p-3 text-muted-foreground text-xs">
									Drag the handle
								</div>
							</Resizable.Panel>
						</Resizable>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={widthCode}
					filename="columns.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Identity columns</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A row is one entity, so the first column is usually more than one
					field of it: a face, a name and the address you would actually search
					by.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Two things to get right: give the column room with width, and truncate
					the text yourself — cells do not wrap.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Avatar, name and e-mail in one cell"
				>
					<div className="w-full">
						<Table
							columns={identityColumns}
							itemKey="id"
							items={agents}
							layoutWidth={720}
							onSortChange={() => undefined}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same without a picture: name with an inline badge, two identifiers
					on line two.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Name with a status badge, code and role underneath"
				>
					<div className="w-full">
						<Table
							columns={summaryColumns}
							itemKey="id"
							items={agents}
						/>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={identityCode}
					filename="identity-column.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					An actions column
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A last{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						DropdownMenu
					</code>{' '}
					column keeps per-row actions out of the way.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					An ordinary column:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width: 56
					</code>{' '}
					with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						fixedWidth
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						sticky: 'right'
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Works with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onRowClick
					</code>
					: picking a menu item does not fire the row click.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="A pinned DropdownMenu column with onRowClick"
				>
					<div className="w-full space-y-4">
						<div className="flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
							<span>
								row clicked:{' '}
								<code className="text-foreground">{actionsRow?.id ?? '—'}</code>
							</span>
							<span>
								action picked:{' '}
								<code className="text-foreground">{lastAction ?? '—'}</code>
							</span>
						</div>
						<Table
							columns={actionColumns}
							itemKey="id"
							items={reservations.slice(0, 5)}
							layoutWidth={900}
							onRowClick={(row: Reservation) => setActionsRow(row)}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onRowClick
					</code>
					, rows are Tab stops; Enter or Space opens them.
				</p>
				<CodeBlock
					code={actionsCode}
					filename="actions-column.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Density</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						density="compact"
					</code>{' '}
					tightens the cell padding and the header height, for back-office
					screens that need a lot of rows on one screen.
				</p>
				<ComponentPreview
					className="items-stretch"
					title='density="compact"'
				>
					<div className="w-full">
						<Table
							columns={columns}
							density="compact"
							itemKey="id"
							items={reservations.slice(0, 6)}
						/>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={densityCode}
					filename="compact.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Split view</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						activeKey
					</code>{' '}
					highlights the open row and marks it{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-current="true"
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					It is not selection. Checking a box and opening a row are separate
					acts, and a row can be both at once.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="activeKey with a resizable preview panel"
				>
					<div className="h-96 w-full overflow-hidden rounded-lg border border-border">
						<Resizable>
							<Resizable.Panel
								defaultSize={60}
								minSize={40}
							>
								<div className="p-3">
									<Table
										activeKey={openId}
										columns={splitColumns}
										density="compact"
										itemKey="id"
										items={reservations.slice(0, 8)}
										onRowClick={(row: Reservation) => setOpenId(row.id)}
									/>
								</div>
							</Resizable.Panel>
							<Resizable.Handle withGrip />
							<Resizable.Panel minSize={25}>
								{openReservation ? (
									<ReservationPreview
										onClose={() => setOpenId(undefined)}
										reservation={openReservation}
									/>
								) : (
									<div className="flex h-full items-center justify-center p-4">
										<EmptyState
											description="Clique em uma linha para ver os detalhes."
											icon={<Inbox />}
											size="sm"
											title="Nenhuma reserva aberta"
										/>
									</div>
								)}
							</Resizable.Panel>
						</Resizable>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={splitViewCode}
					filename="split-view.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Pagination</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The pagination object goes straight to Pagination, so cursor mode
					works here too.
				</p>
				<ComponentPreview
					className="items-stretch"
					title='pagination mode="cursor"'
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							itemKey="id"
							items={reservations.slice(0, 3)}
							pagination={{
								hasNextPage: true,
								hasPreviousPage: false,
								mode: 'cursor',
								rowsPerPage: 3,
							}}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="The same configuration with hidePagination"
				>
					<div className="w-full">
						<Table
							columns={compactColumns}
							hidePagination
							itemKey="id"
							items={reservations.slice(0, 3)}
							pagination={{
								hasNextPage: true,
								hasPreviousPage: false,
								mode: 'cursor',
								rowsPerPage: 3,
							}}
						/>
					</div>
				</ComponentPreview>
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

export const Route = createFileRoute('/libs/react-web/components/table')({
	component: Page,
})
