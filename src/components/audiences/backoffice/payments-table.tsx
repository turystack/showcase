import { MoreHorizontalIcon } from '@turystack/react-icons'
import {
	Badge,
	Button,
	DateText,
	DropdownMenu,
	Flex,
	MoneyText,
	Table,
	type TableColumns,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { PAYMENT_STATUS, type Payment, type PaymentStatus } from './data'

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
	return (
		<Badge
			size="sm"
			variant={PAYMENT_STATUS[status].variant}
		>
			{PAYMENT_STATUS[status].label}
		</Badge>
	)
}

/** The "…" menu of one row: the actions kept one click away. */
export function PaymentRowMenu({ payment }: { payment: Payment }) {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`Actions for ${payment.description}`}
					size="icon-xs"
					variant="ghost"
				>
					<MoreHorizontalIcon size={16} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={200}
			>
				<DropdownMenu.Item>View payment details</DropdownMenu.Item>
				<DropdownMenu.Item>View customer</DropdownMenu.Item>
				<DropdownMenu.Item>Copy payment ID</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					disabled={payment.status !== 'succeeded'}
					variant="destructive"
				>
					Refund payment
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/** Amount, then its currency code and status, the way a ledger reads them. */
function AmountCell({ payment }: { payment: Payment }) {
	return (
		<Flex
			align="center"
			gap="sm"
		>
			<MoneyText
				currency="brl"
				size="sm"
				value={payment.amount}
				weight="medium"
			/>
			<Typography
				size="xs"
				variant="muted"
			>
				BRL
			</Typography>
			<PaymentStatusBadge status={payment.status} />
		</Flex>
	)
}

export type PaymentColumn =
	| 'amount'
	| 'method'
	| 'description'
	| 'customer'
	| 'date'
	| 'actions'

const ALL_COLUMNS: PaymentColumn[] = [
	'amount',
	'method',
	'description',
	'customer',
	'date',
	'actions',
]

export function paymentColumns(
	visible: PaymentColumn[] = ALL_COLUMNS,
): TableColumns<Payment> {
	const columns: TableColumns<Payment> = [
		{
			key: 'amount',
			label: 'Amount',
			selector: (row) => <AmountCell payment={row} />,
			sorter: true,
			width: 260,
		},
		{
			key: 'method',
			label: 'Payment method',
			selector: (row) => (
				<Typography
					noWrap
					size="sm"
				>
					{row.method}
				</Typography>
			),
			width: 170,
		},
		{
			key: 'description',
			label: 'Description',
			selector: (row) => (
				<Typography
					noWrap
					size="sm"
					variant="muted"
				>
					{row.description}
				</Typography>
			),
			width: 180,
		},
		{
			key: 'customer',
			label: 'Customer',
			selector: (row) => (
				<Typography
					noWrap
					size="sm"
				>
					{row.email}
				</Typography>
			),
			width: 240,
		},
		{
			key: 'date',
			label: 'Date',
			selector: (row) => (
				<DateText
					format="d MMM, HH:mm"
					muted
					size="sm"
					value={row.createdAt}
				/>
			),
			sorter: true,
			width: 130,
		},
		{
			align: 'center',
			fixedWidth: true,
			key: 'actions',
			selector: (row) => <PaymentRowMenu payment={row} />,
			sticky: 'right',
			width: 52,
		},
	]

	return columns.filter((column) =>
		visible.includes(column.key as PaymentColumn),
	)
}

export type PaymentsTableProps = {
	activeKey?: string
	columns?: PaymentColumn[]
	emptySection?: ReactNode
	items: Payment[]
	onRowClick?: (row: Payment) => void
	onSelectionChange?: (keys: string[]) => void
	pagination?: boolean
	selectable?: boolean
	selectedKeys?: string[]
}

/**
 * The payments list in its dashboard shape: compact rows, amount and status
 * first, a pinned "…" column, and paging built in.
 */
export function PaymentsTable({
	activeKey,
	columns,
	emptySection,
	items,
	onRowClick = () => undefined,
	onSelectionChange,
	pagination = false,
	selectable = false,
	selectedKeys,
}: PaymentsTableProps) {
	return (
		<Table
			activeKey={activeKey}
			columns={paymentColumns(columns)}
			density="compact"
			emptySection={emptySection}
			itemKey="id"
			items={items}
			layoutWidth={columns ? undefined : 1040}
			onRowClick={onRowClick}
			onSelectionChange={onSelectionChange}
			pagination={
				pagination
					? {
							mode: 'offset',
							onPageChange: () => undefined,
							onRowsPerPageChange: () => undefined,
							page: 1,
							rowsPerPage: 20,
							total: 1284,
						}
					: undefined
			}
			/* The first column is the amount cell (money, currency and status),
			   not plain text, so the row checkbox is named from the charge and
			   its customer instead. */
			rowName={(row) => `${row.description}, ${row.email}`}
			selectedKeys={selectedKeys}
			selection={selectable ? 'multiple' : 'none'}
		/>
	)
}
