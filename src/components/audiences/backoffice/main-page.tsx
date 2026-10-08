import {
	Columns2Icon,
	DownloadIcon,
	ExternalLinkIcon,
	PlusIcon,
	RotateCcwIcon,
} from '@turystack/react-icons'
import {
	Badge,
	BulkActions,
	Button,
	Card,
	CopyButton,
	DateText,
	DescriptionList,
	FilterBar,
	FilterChip,
	Flex,
	Layout,
	MoneyText,
	Page,
	Radio,
	Separator,
	Tabs,
	Timeline,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { OPEN_PAYMENT, PAYMENTS, type Payment } from './data'
import { PaymentStatusBadge, PaymentsTable } from './payments-table'
import { BackofficeShell } from './shell'

/**
 * - `table` — the canonical list: status tabs as saved views, filter chips,
 *   compact rows, bulk actions and paging
 * - `split` — the same list beside a preview of the row that is open
 */
export type MainPageVariant = 'table' | 'split'

/** Saved views across the top, each with its count — status tabs. */
const VIEWS = [
	{
		count: 1284,
		label: 'All',
		value: 'all',
	},
	{
		count: 1197,
		label: 'Succeeded',
		value: 'succeeded',
	},
	{
		count: 41,
		label: 'Refunded',
		value: 'refunded',
	},
	{
		count: 2,
		label: 'Disputed',
		value: 'disputed',
	},
	{
		count: 29,
		label: 'Failed',
		value: 'failed',
	},
	{
		count: 15,
		label: 'Uncaptured',
		value: 'uncaptured',
	},
]

const METHODS = [
	{
		label: 'Card',
		value: 'Card',
	},
	{
		label: 'Pix',
		value: 'Pix',
	},
	{
		label: 'Boleto',
		value: 'Boleto',
	},
]

function SavedViews() {
	const [view, setView] = useState('all')

	return (
		<Tabs
			block
			onChange={setView}
			value={view}
		>
			<Tabs.List ariaLabel="Saved views">
				{VIEWS.map((item) => (
					<Tabs.Trigger
						key={item.value}
						value={item.value}
					>
						{item.label}
						<Badge
							size="sm"
							variant="secondary"
						>
							{item.count.toLocaleString('pt-BR')}
						</Badge>
					</Tabs.Trigger>
				))}
			</Tabs.List>
		</Tabs>
	)
}

/** One chip per column worth filtering; the label is the column header. */
function Filters() {
	const [method, setMethod] = useState<string | undefined>('Card')
	const [methodOpen, setMethodOpen] = useState(false)
	const [date, setDate] = useState<string | undefined>('Last 7 days')

	return (
		<FilterBar
			onClear={() => {
				setMethod(undefined)
				setDate(undefined)
			}}
			trailing={
				<Flex
					align="center"
					gap="xs"
				>
					<Button
						leftSection={<Columns2Icon size={14} />}
						size="sm"
						variant="outline"
					>
						Edit columns
					</Button>
					<Button
						leftSection={<DownloadIcon size={14} />}
						size="sm"
						variant="outline"
					>
						Export
					</Button>
				</Flex>
			}
		>
			<FilterChip
				label="Date"
				onRemove={() => setDate(undefined)}
				value={date}
			/>
			<FilterChip label="Amount" />
			<FilterChip label="Currency" />
			<FilterChip
				label="Payment method"
				onOpenChange={setMethodOpen}
				onRemove={() => setMethod(undefined)}
				open={methodOpen}
				value={method}
			>
				<Radio.Group
					ariaLabel="Payment method"
					items={METHODS}
					onChange={(next) => {
						setMethod(next)
						setMethodOpen(false)
					}}
					value={method}
				/>
			</FilterChip>
			<FilterChip label="Customer" />
		</FilterBar>
	)
}

/** The right-hand pane of the split view: the open payment, read-only. */
export function PaymentPreview({ payment }: { payment: Payment }) {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Flex
				align="start"
				gap="sm"
				justify="between"
				wrap="wrap"
			>
				<Flex
					align="stretch"
					direction="col"
					gap="xs"
				>
					<Typography
						size="xs"
						variant="muted"
					>
						Payment
					</Typography>
					<Flex
						align="center"
						gap="sm"
						wrap="wrap"
					>
						<MoneyText
							currency="brl"
							size="2xl"
							value={payment.amount}
							weight="semibold"
						/>
						<PaymentStatusBadge status={payment.status} />
					</Flex>
					<Flex
						align="center"
						gap="xs"
					>
						<Typography
							size="xs"
							variant="muted"
						>
							{payment.id}
						</Typography>
						<CopyButton
							size="xs"
							value={payment.id}
						/>
					</Flex>
				</Flex>
				<Button
					href="#payment"
					leftSection={<ExternalLinkIcon size={14} />}
					size="sm"
					variant="outline"
				>
					Open
				</Button>
			</Flex>

			<Flex
				align="center"
				gap="sm"
			>
				<Button
					size="sm"
					variant="outline"
				>
					Respond to dispute
				</Button>
				<Button
					leftSection={<RotateCcwIcon size={14} />}
					size="sm"
					variant="ghost"
				>
					Refund
				</Button>
			</Flex>

			<Separator />

			<DescriptionList
				dividers
				items={[
					{
						label: 'Customer',
						value: payment.customer,
					},
					{
						copyable: true,
						label: 'Email',
						value: payment.email,
					},
					{
						label: 'Payment method',
						value: payment.method,
					},
					{
						label: 'Description',
						value: payment.description,
					},
					{
						label: 'Created',
						value: (
							<DateText
								format="d MMM yyyy, HH:mm"
								value={payment.createdAt}
							/>
						),
					},
				]}
				layout="inline"
			/>

			<Separator />

			<Typography
				size="sm"
				weight="semibold"
			>
				Timeline
			</Typography>
			<Timeline compact>
				<Timeline.Item
					meta="26 Sep, 10:51"
					status="error"
					title="Dispute opened: product not received"
				/>
				<Timeline.Item
					meta="25 Sep, 16:27"
					status="done"
					title="Payment succeeded"
				/>
				<Timeline.Item
					meta="25 Sep, 16:27"
					status="done"
					title="Payment authorized by the issuer"
				/>
			</Timeline>
		</Flex>
	)
}

/**
 * The page a section opens on, in a payments dashboard's shape: saved views as
 * status tabs with their counts, a row of filter chips whose labels are the
 * column headers, compact rows with the amount and status first, a pinned "…"
 * column, and — once rows are ticked — the bulk actions in the filter row's
 * place, so the selection is acted on where it was made.
 *
 * `split` keeps the same list and opens the clicked row in a pane beside it,
 * for working down a queue without losing the place.
 */
export function MainPage({ variant }: { variant: MainPageVariant }) {
	const [selected, setSelected] = useState<string[]>(
		variant === 'table'
			? [
					PAYMENTS[1].id,
					PAYMENTS[6].id,
					PAYMENTS[9].id,
				]
			: [],
	)
	const [openId, setOpenId] = useState(OPEN_PAYMENT.id)
	const open = PAYMENTS.find((payment) => payment.id === openId) ?? OPEN_PAYMENT

	const header = (
		<Page.Header
			action={
				<Button
					leftSection={<PlusIcon size={14} />}
					size="sm"
				>
					Create payment
				</Button>
			}
			title="Payments"
		/>
	)

	if (variant === 'split') {
		return (
			<BackofficeShell
				active="payments"
				nav="collapsed"
			>
				<Layout.Content span={3}>
					<Page>
						{header}
						<Page.Toolbar>
							<SavedViews />
							<Filters />
						</Page.Toolbar>
						<Page.Content>
							<PaymentsTableWithOpen
								onOpen={setOpenId}
								openId={openId}
							/>
						</Page.Content>
					</Page>
				</Layout.Content>
				<Layout.Content
					bg="muted"
					span={2}
				>
					<Card>
						<Card.Content>
							<PaymentPreview payment={open} />
						</Card.Content>
					</Card>
				</Layout.Content>
			</BackofficeShell>
		)
	}

	return (
		<BackofficeShell active="payments">
			<Layout.Content maxWidth="lg">
				<Page>
					{header}
					<Page.Toolbar>
						<SavedViews />
						{selected.length > 0 ? (
							<BulkActions
								actions={[
									{
										confirm: (selection) => ({
											confirmText: 'Refund payments',
											description: `The full amount of ${selection.length} payments goes back to the customers. This cannot be undone.`,
											title: `Refund ${selection.length} payments?`,
										}),
										icon: <RotateCcwIcon size={14} />,
										id: 'refund',
										label: 'Refund',
										onRun: () => undefined,
										variant: 'destructive',
									},
									{
										icon: <DownloadIcon size={14} />,
										id: 'export',
										label: 'Export',
										onRun: () => undefined,
										variant: 'outline',
									},
								]}
								onClear={() => setSelected([])}
								placement="inline"
								selection={selected}
							/>
						) : (
							<Filters />
						)}
					</Page.Toolbar>
					<Page.Content>
						<PaymentsTable
							items={PAYMENTS}
							onSelectionChange={setSelected}
							pagination
							selectable
							selectedKeys={selected}
						/>
					</Page.Content>
				</Page>
			</Layout.Content>
		</BackofficeShell>
	)
}

/** The split view's list: fewer columns, and the open row marked. */
function PaymentsTableWithOpen({
	onOpen,
	openId,
}: {
	onOpen: (id: string) => void
	openId: string
}) {
	return (
		<PaymentsTable
			activeKey={openId}
			columns={[
				'amount',
				'customer',
				'date',
				'actions',
			]}
			items={PAYMENTS}
			onRowClick={(row) => onOpen(row.id)}
			pagination
		/>
	)
}
