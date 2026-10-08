import { createFileRoute } from '@tanstack/react-router'
import { Badge, Button, List, Resizable } from '@turystack/react-web'
import { useCallback, useRef, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/list/list.types.ts` and the
 * destructuring defaults in `list.tsx`.
 *
 * `ListProps<T>` is a union of two shapes — one carrying `pagination` with
 * `infinite?: never`, the other carrying `infinite` with `pagination?: never`.
 * Passing both is a type error, which is the point: a list either pages or it
 * grows.
 */
const listProps = [
	{
		description: 'Renders one item from the item and its index.',
		name: 'renderItem',
		required: true,
		type: '(item: T, index: number) => React.ReactNode',
	},
	{
		description: 'React key per item: a field name or a function.',
		name: 'itemKey',
		required: true,
		type: 'keyof T | ((item: T, index: number) => string | number)',
	},
	{
		description: 'The items. Omitting it is the same as an empty array.',
		name: 'items',
		type: 'T[]',
	},
	{
		description: 'Key of the item open elsewhere; sets aria-current.',
		name: 'activeKey',
		type: 'string | number',
	},
	{
		description: 'Fires on row click; ignores clicks on inner controls.',
		name: 'onItemClick',
		type: '(item: T, index: number) => void',
	},
	{
		default: 'false',
		description: 'Initial load; only shows while there are no items.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Remote-read state painted by the list; excludes items.',
		name: 'outcome',
		type: 'DataOutcome<T[]>',
	},
	{
		description: 'Replaces the default content when the outcome is denied.',
		name: 'deniedSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Initial failure; loading wins when both are set.',
		name: 'error',
		type: 'boolean',
	},
	{
		default: '3',
		description: 'How many skeleton rows the default loading state draws.',
		name: 'loadingRows',
		type: 'number',
	},
	{
		description: 'Replaces the skeleton rows shown while loading.',
		name: 'loadingSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Replaces the default error text.',
		name: 'errorSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Replaces the default empty text.',
		name: 'emptySection',
		type: 'React.ReactNode',
	},
	{
		description: 'Rendered below the content, even beside the empty state.',
		name: 'footerSection',
		type: 'React.ReactNode',
	},
	{
		default: '"sm"',
		description: 'Vertical spacing between items.',
		name: 'gap',
		type: '"none" | "xs" | "sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Draws a rule under every item but the last.',
		name: 'divided',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Adds padding around the item column.',
		name: 'padded',
		type: 'boolean',
	},
	{
		description: 'Accessible name when no visible heading names the list.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Renders a Pagination below; excludes infinite.',
		name: 'pagination',
		type: 'PaginationProps',
	},
	{
		description: 'Makes the list infinite; excludes pagination.',
		name: 'infinite',
		type: 'ListInfiniteProps',
	},
]

const infiniteProps = [
	{
		default: 'false',
		description: 'Whether more items remain to load.',
		name: 'hasMore',
		type: 'boolean',
	},
	{
		description: 'Loads the next chunk when the sentinel is in view.',
		name: 'onLoadMore',
		type: '() => void',
	},
	{
		default: 'false',
		description: 'A chunk is in flight; shows a loader, hides the trigger.',
		name: 'loadingMore',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Pauses loading while keeping the items on screen.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: "'160px'",
		description: 'Observer rootMargin; how early the next chunk loads.',
		name: 'rootMargin',
		type: 'string',
	},
	{
		default: 'labels.list.loadMore — "Load more"',
		description: 'Label of the manual fallback load button.',
		name: 'loadMoreText',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'The next page failed; rows stay, error shows in footer.',
		name: 'error',
		type: 'boolean',
	},
	{
		description: 'Shown in the footer while error is true.',
		name: 'errorSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Text shown beside the loader while a chunk is in flight.',
		name: 'loadingMoreText',
		type: 'React.ReactNode',
	},
	{
		description: 'Shown once hasMore is false and items exist.',
		name: 'endReachedSection',
		type: 'React.ReactNode',
	},
]

type Order = {
	id: string
	customer: string
	city: string
	total: number
	status: 'pago' | 'aguardando' | 'estornado'
}

const cities = [
	'São Paulo',
	'Rio de Janeiro',
	'Belo Horizonte',
	'Curitiba',
	'Porto Alegre',
	'Recife',
	'Salvador',
	'Fortaleza',
]

const customers = [
	'Ana Silva',
	'Bruno Costa',
	'Carla Mendes',
	'Diego Ramos',
	'Elisa Prado',
	'Felipe Nunes',
	'Gabriela Rocha',
	'Henrique Dias',
]

const statuses = [
	'pago',
	'aguardando',
	'estornado',
] as const

const statusVariant = {
	aguardando: 'warning',
	estornado: 'destructive',
	pago: 'success',
} as const

const currency = new Intl.NumberFormat('pt-BR', {
	currency: 'BRL',
	style: 'currency',
})

const TOTAL_ORDERS = 24
const CHUNK = 6

function makeOrders(from: number, count: number): Order[] {
	return Array.from(
		{
			length: count,
		},
		(_, offset) => {
			const index = from + offset

			return {
				city: cities[index % cities.length],
				customer: customers[index % customers.length],
				id: `P-${1000 + index}`,
				status: statuses[index % statuses.length],
				total: 180 + index * 47.5,
			}
		},
	)
}

const allOrders = makeOrders(0, TOTAL_ORDERS)

function OrderRow({ order }: { order: Order }) {
	return (
		<div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2">
			<div className="min-w-0">
				<p className="truncate font-medium text-sm">{order.customer}</p>
				<p className="truncate text-muted-foreground text-xs">
					{order.id} · {order.city}
				</p>
			</div>
			<div className="flex shrink-0 items-center gap-3">
				<span className="text-sm tabular-nums">
					{currency.format(order.total)}
				</span>
				<Badge variant={statusVariant[order.status]}>{order.status}</Badge>
			</div>
		</div>
	)
}

function renderOrder(order: Order) {
	return <OrderRow order={order} />
}

/**
 * The item for a list that highlights its active row. No background of its
 * own — `activeKey` paints the accent on the row around it, and an opaque card
 * here would cover it.
 */
function OrderLine({ order }: { order: Order }) {
	return (
		<div className="flex items-center justify-between gap-3 px-3 py-2">
			<div className="min-w-0">
				<p className="truncate font-medium text-sm">{order.customer}</p>
				<p className="truncate text-muted-foreground text-xs">
					{order.id} · {order.city}
				</p>
			</div>
			<span className="shrink-0 text-sm tabular-nums">
				{currency.format(order.total)}
			</span>
		</div>
	)
}

/**
 * A row with a control of its own. The copy button keeps its click: the list's
 * onItemClick does not fire for it, and nothing here stops propagation.
 */
function OrderLineWithCopy({
	onCopy,
	order,
}: {
	onCopy: (order: Order) => void
	order: Order
}) {
	return (
		<div className="flex items-center justify-between gap-3 px-3 py-2">
			<div className="min-w-0">
				<p className="truncate font-medium text-sm">{order.customer}</p>
				<p className="truncate text-muted-foreground text-xs">
					{order.id} · {order.city}
				</p>
			</div>
			<Button
				ariaLabel={`Copiar código ${order.id}`}
				onClick={() => onCopy(order)}
				size="sm"
				variant="ghost"
			>
				Copiar código
			</Button>
		</div>
	)
}

function OrderPreview({ order }: { order: Order }) {
	return (
		<div className="space-y-4 p-4">
			<div className="min-w-0">
				<p className="text-muted-foreground text-xs">{order.id}</p>
				<p className="truncate font-semibold text-foreground">
					{order.customer}
				</p>
			</div>
			<Badge variant={statusVariant[order.status]}>{order.status}</Badge>
			<dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
				<div>
					<dt className="text-muted-foreground text-xs">Cidade</dt>
					<dd className="font-medium">{order.city}</dd>
				</div>
				<div>
					<dt className="text-muted-foreground text-xs">Total</dt>
					<dd className="font-medium tabular-nums">
						{currency.format(order.total)}
					</dd>
				</div>
			</dl>
		</div>
	)
}

const usageCode = `import { List } from '@turystack/react-web'

// The plain list — renderItem owns every pixel of the item
<List
  itemKey="id"
  items={orders}
  renderItem={(order) => <OrderCard order={order} />}
/>

// Paged
<List
  itemKey="id"
  items={pageOrders}
  pagination={{
    mode: 'offset',
    onPageChange: setPage,
    onRowsPerPageChange: setRowsPerPage,
    page,
    rowsPerPage,
    total,
  }}
  renderItem={renderOrder}
/>

// Infinite — an IntersectionObserver sentinel with a button behind it
<List
  infinite={{
    endReachedSection: 'Todos os pedidos carregados',
    hasMore,
    loadingMore,
    loadingMoreText: 'Carregando…',
    onLoadMore: loadNextChunk,
  }}
  itemKey="id"
  items={orders}
  renderItem={renderOrder}
/>

// Split view — onItemClick opens a row, activeKey marks the one open
const open = orders.find((order) => order.id === openId)

<Resizable>
  <Resizable.Panel defaultSize={45} minSize={30}>
    <List
      activeKey={openId}
      gap="none"
      itemKey="id"
      items={orders}
      onItemClick={(order) => setOpenId(order.id)}
      renderItem={(order) => <OrderLine order={order} />}
    />
  </Resizable.Panel>
  <Resizable.Handle withGrip />
  <Resizable.Panel minSize={30}>
    {open && <OrderPreview order={open} />}
  </Resizable.Panel>
</Resizable>

// States, all of which only apply while there are no items
<List emptySection={<Empty />} itemKey="id" items={[]} renderItem={renderOrder} />
<List itemKey="id" items={[]} loading loadingRows={5} renderItem={renderOrder} />
<List error errorSection={<Failed />} itemKey="id" items={[]} renderItem={renderOrder} />`

const gaps = [
	'none',
	'xs',
	'sm',
	'md',
	'lg',
] as const

function Page() {
	const [visible, setVisible] = useState(() => allOrders.slice(0, CHUNK))
	const [loadingMore, setLoadingMore] = useState(false)
	const [page, setPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(5)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const [openId, setOpenId] = useState('P-1001')
	const openOrder = allOrders.find((order) => order.id === openId)
	const [lastEvent, setLastEvent] = useState('nenhum')

	const hasMore = visible.length < allOrders.length

	const loadMore = useCallback(() => {
		if (timer.current) {
			return
		}

		setLoadingMore(true)
		timer.current = setTimeout(() => {
			setVisible((current) =>
				allOrders.slice(0, Math.min(current.length + CHUNK, allOrders.length)),
			)
			setLoadingMore(false)
			timer.current = null
		}, 700)
	}, [])

	const reset = () => {
		if (timer.current) {
			clearTimeout(timer.current)
			timer.current = null
		}
		setLoadingMore(false)
		setVisible(allOrders.slice(0, CHUNK))
	}

	const pageOrders = allOrders.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage,
	)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					List
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A vertical collection with loading, error and empty states, plus
					pagination or infinite loading.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={listProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					The{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						infinite
					</code>{' '}
					object has a shape of its own.
				</p>
				<PropsTable props={infiniteProps} />
			</section>

			<SlotsSection slug="list" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The plain list</h2>
				<ComponentPreview
					className="items-stretch"
					title="items, itemKey and renderItem"
				>
					<div className="w-full max-w-md">
						<List
							itemKey="id"
							items={allOrders.slice(0, 4)}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Infinite scroll</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The mechanism is two things at once.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Scroll to the bottom — 24 orders, six at a time"
				>
					<div className="w-full max-w-md space-y-3">
						<div className="flex items-center justify-between gap-3">
							<span className="text-muted-foreground text-sm">
								{visible.length} of {allOrders.length} loaded
							</span>
							<Button
								onClick={reset}
								size="sm"
								variant="outline"
							>
								Reset
							</Button>
						</div>
						<div className="max-h-80 overflow-y-auto rounded-lg border border-border p-3">
							<List
								infinite={{
									endReachedSection: 'Todos os pedidos carregados',
									hasMore,
									loadingMore,
									loadingMoreText: 'Carregando mais pedidos…',
									onLoadMore: loadMore,
								}}
								itemKey="id"
								items={visible}
								renderItem={renderOrder}
							/>
						</div>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					pauses loading without unmounting, e.g. while editing a filter.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="infinite with disabled, and hasMore still true"
				>
					<div className="w-full max-w-md">
						<List
							infinite={{
								disabled: true,
								hasMore: true,
								onLoadMore: () => undefined,
							}}
							itemKey="id"
							items={allOrders.slice(0, 3)}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Pagination</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The other half of the union. As with the table, the control is
					rendered and reported on — the slicing is the page's own work.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="pagination, offset mode"
				>
					<div className="w-full max-w-md">
						<List
							itemKey="id"
							items={pageOrders}
							pagination={{
								mode: 'offset',
								onPageChange: setPage,
								onRowsPerPageChange: (next: number) => {
									setRowsPerPage(next)
									setPage(1)
								},
								page,
								rowsPerPage,
								total: allOrders.length,
							}}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Active item and split view
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						activeKey
					</code>{' '}
					gives the open item the accent background and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-current="true"
					</code>
					. Keep items transparent.
				</p>
				<ComponentPreview
					className="items-stretch"
					title='activeKey="P-1002"'
				>
					<div className="w-full max-w-md rounded-lg border border-border p-1">
						<List
							activeKey="P-1002"
							gap="none"
							itemKey="id"
							items={allOrders.slice(0, 4)}
							renderItem={(order: Order) => <OrderLine order={order} />}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					A split view: list left, open record right.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onItemClick
					</code>{' '}
					makes each row clickable and focusable.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="activeKey with a resizable preview panel"
				>
					<div className="h-80 w-full overflow-hidden rounded-lg border border-border">
						<Resizable>
							<Resizable.Panel
								defaultSize={45}
								minSize={30}
							>
								<div className="p-1">
									<List
										activeKey={openId}
										gap="none"
										itemKey="id"
										items={allOrders.slice(0, 8)}
										onItemClick={(next: Order) => setOpenId(next.id)}
										renderItem={(order: Order) => <OrderLine order={order} />}
									/>
								</div>
							</Resizable.Panel>
							<Resizable.Handle withGrip />
							<Resizable.Panel minSize={30}>
								{openOrder && <OrderPreview order={openOrder} />}
							</Resizable.Panel>
						</Resizable>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Inner controls keep their clicks: “Copiar código” copies without
					opening the order.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="onItemClick with a control inside the row"
				>
					<div className="w-full max-w-md space-y-2">
						<div className="rounded-lg border border-border p-1">
							<List
								activeKey={openId}
								gap="none"
								itemKey="id"
								items={allOrders.slice(0, 3)}
								onItemClick={(next: Order) => {
									setOpenId(next.id)
									setLastEvent(`abriu ${next.id}`)
								}}
								renderItem={(order: Order) => (
									<OrderLineWithCopy
										onCopy={(copied) => setLastEvent(`copiou ${copied.id}`)}
										order={order}
									/>
								)}
							/>
						</div>
						<p className="text-muted-foreground text-xs">
							último evento: <code>{lastEvent}</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					All three states replace the item column, and all three only apply
					when the column is empty.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="loading, with the default skeleton rows"
				>
					<div className="w-full max-w-md">
						<List
							itemKey="id"
							items={[]}
							loading
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="loadingRows={5}"
				>
					<div className="w-full max-w-md">
						<List
							itemKey="id"
							items={[]}
							loading
							loadingRows={5}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="loadingSection, replacing the skeletons"
				>
					<div className="w-full max-w-md">
						<List
							itemKey="id"
							items={[]}
							loading
							loadingSection={
								<div className="rounded-lg border border-border border-dashed p-6 text-center text-muted-foreground text-sm">
									Buscando pedidos…
								</div>
							}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="loading with items already on screen — no change"
				>
					<div className="w-full max-w-md">
						<List
							itemKey="id"
							items={allOrders.slice(0, 2)}
							loading
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="error, default and custom"
				>
					<div className="w-full max-w-md space-y-4">
						<List
							error
							itemKey="id"
							items={[]}
							renderItem={renderOrder}
						/>
						<List
							error
							errorSection={
								<div className="space-y-2">
									<p className="font-medium text-foreground">
										Não foi possível carregar os pedidos
									</p>
									<Button
										size="sm"
										variant="outline"
									>
										Tentar novamente
									</Button>
								</div>
							}
							itemKey="id"
							items={[]}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="empty, default and custom"
				>
					<div className="w-full max-w-md space-y-4">
						<List
							itemKey="id"
							items={[]}
							renderItem={renderOrder}
						/>
						<List
							emptySection={
								<div className="space-y-1">
									<p className="font-medium text-foreground">
										Nenhum pedido neste período
									</p>
									<p className="text-muted-foreground text-sm">
										Ajuste o filtro de datas para ver mais.
									</p>
								</div>
							}
							itemKey="id"
							items={[]}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="footerSection, shown beside the empty state too"
				>
					<div className="w-full max-w-md space-y-4">
						<List
							footerSection={
								<p className="text-muted-foreground text-xs">3 pedidos</p>
							}
							itemKey="id"
							items={allOrders.slice(0, 3)}
							renderItem={renderOrder}
						/>
						<List
							footerSection={
								<p className="text-muted-foreground text-xs">0 pedidos</p>
							}
							itemKey="id"
							items={[]}
							renderItem={renderOrder}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Spacing</h2>
				<ComponentPreview
					className="items-start"
					title="All five gaps"
				>
					<div className="grid w-full gap-6 sm:grid-cols-5">
						{gaps.map((gap) => (
							<div
								className="space-y-2"
								key={gap}
							>
								<p className="text-muted-foreground text-xs">gap="{gap}"</p>
								<List
									gap={gap}
									itemKey="id"
									items={allOrders.slice(0, 3)}
									renderItem={(order: Order) => (
										<div className="rounded-lg border border-border bg-card px-2 py-1 text-xs">
											{order.id}
										</div>
									)}
								/>
							</div>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						divided
					</code>{' '}
					draws rules between items (close the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">gap</code>
					);{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						padded
					</code>{' '}
					insets the column.
				</p>
				<ComponentPreview
					className="items-start"
					title="divided and padded"
				>
					<div className="grid w-full gap-6 sm:grid-cols-3">
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">divided</p>
							<div className="rounded-lg border border-border">
								<List
									divided
									gap="none"
									itemKey="id"
									items={allOrders.slice(0, 3)}
									renderItem={(order: Order) => (
										<div className="px-3 py-2 text-sm">{order.customer}</div>
									)}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">divided + padded</p>
							<div className="rounded-lg border border-border">
								<List
									divided
									gap="none"
									itemKey="id"
									items={allOrders.slice(0, 3)}
									padded
									renderItem={(order: Order) => (
										<div className="py-2 text-sm">{order.customer}</div>
									)}
								/>
							</div>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">
								neither — the default
							</p>
							<div className="rounded-lg border border-border">
								<List
									itemKey="id"
									items={allOrders.slice(0, 3)}
									renderItem={(order: Order) => (
										<div className="px-3 py-2 text-sm">{order.customer}</div>
									)}
								/>
							</div>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Keys</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						itemKey
					</code>{' '}
					takes a field name or a function of the item and index.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="A function itemKey"
				>
					<div className="w-full max-w-md">
						<List
							itemKey={(order: Order, index: number) => `${order.id}-${index}`}
							items={allOrders.slice(0, 3)}
							renderItem={renderOrder}
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

export const Route = createFileRoute('/libs/react-web/components/list')({
	component: Page,
})
