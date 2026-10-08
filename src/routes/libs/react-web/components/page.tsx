import { createFileRoute } from '@tanstack/react-router'
import {
	AnchorNav,
	Badge,
	Button,
	Card,
	DescriptionList,
	Page,
	Table,
} from '@turystack/react-web'
import { Package, Plus } from 'lucide-react'
import type { ReactNode } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Read from `react-web/src/components/page/page.types.ts`. The header is the
 * only part with props, because its arrangement is fixed; the rest take
 * children, so nothing here wraps a component you could not have placed
 * yourself.
 */
const pageProps = [
	{
		description: 'The column holding the parts; renders no landmark.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const headerProps = [
	{
		description: 'What this page is. Rendered as the heading.',
		name: 'title',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'Mark beside the title, in a 40px tinted square.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		description: 'One line under the title. Omitted entirely when not given.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'Primary action at the row’s end; wraps under the title.',
		name: 'action',
		type: 'React.ReactNode',
	},
	{
		description: 'Trail above the title; the last step is the current page.',
		name: 'breadcrumbs',
		type: 'Array<{ label: React.ReactNode; href?: string }>',
	},
	{
		description: 'DOM id on the header, an in-page anchor target.',
		name: 'id',
		type: 'string',
	},
]

const toolbarProps = [
	{
		description: 'The filters. Sits between the header and the body.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'DOM id on the toolbar, the target of an in-page anchor link.',
		name: 'id',
		type: 'string',
	},
]

const contentProps = [
	{
		description: 'The body: the table, the cards, the screen’s subject.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'DOM id on the block, an in-page anchor target.',
		name: 'id',
		type: 'string',
	},
]

const usageCode = `import { Page, Search, Table } from '@turystack/react-web'

// src/routes/_app/orders.tsx — the route owns the router, nothing else does
export const Route = createFileRoute('/_app/orders')({
  component: OrdersPage,
  validateSearch: (raw) => listOrdersQueryParamsSchema.parse(raw),
})

function OrdersPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()

  function handleSearchChange(nextSearch: ListOrdersQueryParams) {
    navigate({ search: nextSearch })
  }

  function handleSelect(order: Order) {
    navigate({ params: { orderId: order.order_id }, to: '/orders/$orderId' })
  }

  return (
    <Page>
      <Page.Header
        action={<Button>New order</Button>}
        breadcrumbs={[{ href: '/', label: 'Home' }, { label: 'Orders' }]}
        description="Every order, across every channel."
        icon={<Package />}
        title="Orders"
      />
      <Page.Toolbar>
        {/* the search goes down whole — the toolbar does not know Route exists */}
        <OrdersToolbar onSearchChange={handleSearchChange} value={search} />
      </Page.Toolbar>
      <Page.Content>
        <OrderList onSelect={handleSelect} params={search} />
      </Page.Content>
    </Page>
  )
}`

const anchorsCode = `import { AnchorNav, Page } from '@turystack/react-web'

const sections = [
  { id: 'items', label: 'Itens' },
  { id: 'payment', label: 'Pagamento' },
  { id: 'activity', label: 'Histórico' },
]

<Page>
  <Page.Header id="summary" title="Pedido #4812" />
  <Page.Content id="items"><OrderItems /></Page.Content>
  <Page.Content id="payment"><Payment /></Page.Content>
  <Page.Content id="activity"><Activity /></Page.Content>
</Page>

// Beside it, in a column the layout makes sticky
<AnchorNav items={sections} />`

const ORDER_SECTIONS = [
	{
		id: 'pedido-itens',
		label: 'Itens',
		rows: [
			{
				label: 'Aéreo',
				value: 'GRU → LIS, 12 out',
			},
			{
				label: 'Hotel',
				value: 'Hotel Avenida Palace, 4 noites',
			},
			{
				label: 'Hotel',
				value: 'Pestana Vintage Porto, 3 noites',
			},
			{
				label: 'Traslado',
				value: 'Aeroporto ↔ hotel, ida e volta',
			},
		],
	},
	{
		id: 'pedido-pagamento',
		label: 'Pagamento',
		rows: [
			{
				label: 'Forma',
				value: 'Cartão de crédito, 10x',
			},
			{
				label: 'Total',
				value: 'R$ 13.780,00',
			},
			{
				label: 'Situação',
				value: 'Aprovado',
			},
		],
	},
	{
		id: 'pedido-historico',
		label: 'Histórico',
		rows: [
			{
				label: '24 set, 10:12',
				value: 'Pedido criado pelo site',
			},
			{
				label: '24 set, 10:15',
				value: 'Pagamento aprovado',
			},
			{
				label: '25 set, 09:40',
				value: 'Vouchers enviados ao cliente',
			},
		],
	},
]

const ORDERS = [
	{
		channel: 'Web',
		id: '1042',
		status: 'Paid',
		total: 'R$ 1.240,00',
	},
	{
		channel: 'Store',
		id: '1041',
		status: 'Awaiting',
		total: 'R$ 380,00',
	},
	{
		channel: 'Web',
		id: '1040',
		status: 'Shipped',
		total: 'R$ 2.115,00',
	},
	{
		channel: 'Partner',
		id: '1039',
		status: 'Refunded',
		total: 'R$ 90,00',
	},
]

const COLUMNS = [
	{
		key: 'id',
		label: 'Order',
		selector: (row: (typeof ORDERS)[number]) => `#${row.id}`,
	},
	{
		key: 'channel',
		label: 'Channel',
	},
	{
		key: 'status',
		label: 'Status',
		selector: (row: (typeof ORDERS)[number]) => (
			<Badge size="sm">{row.status}</Badge>
		),
	},
	{
		align: 'right' as const,
		key: 'total',
		label: 'Total',
	},
]

function Code({ children }: { children: ReactNode }) {
	return (
		<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
			{children}
		</code>
	)
}

function Page_() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Page
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The inside of a shell: what a route renders into{' '}
					<Code>Layout.Content</Code>.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>Page</Code> — the column.
				</p>
				<PropsTable props={pageProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>Page.Header</Code> — the only part with props, because its
					arrangement is fixed.
				</p>
				<PropsTable props={headerProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>Page.Toolbar</Code> — a slot: children, plus an id.
				</p>
				<PropsTable props={toolbarProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>Page.Content</Code> — a slot: children, plus an id.
				</p>
				<PropsTable props={contentProps} />
			</section>

			<SlotsSection slug="page" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Playground</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One screen, whole: trail, identity, action, filters, body.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="A list screen"
				>
					<div className="rounded-lg border border-border p-6">
						<Page>
							<Page.Header
								action={
									<Button size="sm">
										<Plus />
										New order
									</Button>
								}
								breadcrumbs={[
									{
										href: '#operations',
										label: 'Operations',
									},
									{
										label: 'Orders',
									},
								]}
								description="Every order, across every channel."
								icon={<Package />}
								title="Orders"
							/>
							<Page.Content>
								<Table
									columns={COLUMNS}
									itemKey="id"
									items={ORDERS}
								/>
							</Page.Content>
						</Page>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					When the row runs out of room
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The header row wraps: when the title block can’t keep about 16rem, the
					action moves under the title.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="The same header in a 22rem column"
				>
					<div className="max-w-88 rounded-lg border border-border p-6">
						<Page.Header
							action={
								<Button size="sm">
									<Plus />
									New order
								</Button>
							}
							description="Every order, across every channel."
							icon={<Package />}
							title="Orders"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Sections you can link to
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Each <Code>Page.Content</Code> takes an <Code>id</Code>, so the block
					itself is an <Code>AnchorNav</Code> or <Code>#pagamento</Code> target.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					This frame scrolls itself, so the nav uses <Code>offset="none"</Code>{' '}
					and no scroll spy. Click a section.
				</p>
				<ComponentPreview title="Order detail: one Page.Content per section">
					<div className="h-96 w-full max-w-3xl overflow-y-auto rounded-lg bg-background ring-1 ring-foreground/10">
						<div className="grid grid-cols-[minmax(0,1fr)_9rem] gap-6 p-6">
							<Page>
								<Page.Header
									description="Lisboa e Porto — 2 adultos, 7 noites"
									id="pedido-resumo"
									title="Pedido #4812"
								/>
								{ORDER_SECTIONS.map((section) => (
									<Page.Content
										id={section.id}
										key={section.id}
									>
										<Card>
											<Card.Header bordered>
												<Card.Title>{section.label}</Card.Title>
											</Card.Header>
											<Card.Content>
												<DescriptionList
													items={section.rows}
													layout="inline"
												/>
											</Card.Content>
										</Card>
									</Page.Content>
								))}
							</Page>
							<aside>
								<div className="sticky top-0">
									<AnchorNav
										ariaLabel="Seções do pedido"
										items={[
											{
												id: 'pedido-resumo',
												label: 'Resumo',
											},
											...ORDER_SECTIONS.map(({ id, label }) => ({
												id,
												label,
											})),
										]}
										offset="none"
										scrollSpy={false}
									/>
								</div>
							</aside>
						</div>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={anchorsCode}
					filename="order-detail.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="orders.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/page')({
	component: Page_,
})
