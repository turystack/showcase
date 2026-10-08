import {
	ArrowLeftRightIcon,
	BanknoteIcon,
	Code2Icon,
	FileTextIcon,
	KeyRoundIcon,
	PlusIcon,
	RotateCcwIcon,
	SearchIcon,
	ShieldAlertIcon,
	UserRoundIcon,
	UsersIcon,
} from '@turystack/react-icons'
import {
	Badge,
	Button,
	Card,
	DateText,
	Flex,
	Input,
	Layout,
	List,
	MoneyText,
	Page,
	SegmentedControl,
	SpotlightSearch,
	type SpotlightSearchGroup,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { CUSTOMERS, PAYMENTS } from './data'
import { PaymentsTable } from './payments-table'
import { BackofficeShell } from './shell'

/**
 * - `instant` — top hits hanging under the header field while typing
 * - `grouped` — the full results page Enter opens, one section per kind
 * - `command` — the palette: actions and navigation, not records
 */
export type SearchResultsVariant = 'instant' | 'grouped' | 'command'

const QUERY = 'ferreira'

const SCOPES = [
	{
		label: 'All',
		value: 'all',
	},
	{
		label: 'Payments',
		value: 'payments',
	},
	{
		label: 'Customers',
		value: 'customers',
	},
	{
		label: 'Invoices',
		value: 'invoices',
	},
]

/** The operators the query understands, shown where the query is typed. */
const OPERATORS = [
	'email:',
	'amount:>100',
	'is:refunded',
	'-status:failed',
]

const COMMANDS: SpotlightSearchGroup[] = [
	{
		heading: 'Actions',
		items: [
			{
				description: 'Charge a card, Pix or boleto',
				icon: <PlusIcon size={16} />,
				id: 'create-payment',
				keywords: [
					'new',
					'charge',
				],
				label: 'Create payment',
				shortcut: [
					'N',
					'P',
				],
			},
			{
				icon: <UserRoundIcon size={16} />,
				id: 'create-customer',
				keywords: [
					'new',
				],
				label: 'Create customer',
				shortcut: [
					'N',
					'C',
				],
			},
			{
				description: 'Find a payment, then refund all or part of it',
				icon: <RotateCcwIcon size={16} />,
				id: 'refund',
				label: 'Refund a payment',
			},
		],
	},
	{
		heading: 'Navigate',
		items: [
			{
				icon: <ArrowLeftRightIcon size={16} />,
				id: 'go-payments',
				label: 'Payments',
				shortcut: [
					'G',
					'P',
				],
			},
			{
				icon: <ShieldAlertIcon size={16} />,
				id: 'go-disputes',
				label: 'Disputes',
				shortcut: [
					'G',
					'D',
				],
			},
			{
				icon: <BanknoteIcon size={16} />,
				id: 'go-payouts',
				label: 'Payouts',
				shortcut: [
					'G',
					'O',
				],
			},
		],
	},
	{
		heading: 'Developers',
		items: [
			{
				icon: <KeyRoundIcon size={16} />,
				id: 'api-keys',
				keywords: [
					'secret',
					'token',
				],
				label: 'API keys',
			},
			{
				icon: <Code2Icon size={16} />,
				id: 'logs',
				keywords: [
					'requests',
				],
				label: 'Request logs',
			},
		],
	},
]

function ResultSection({
	children,
	count,
	title,
}: {
	children: ReactNode
	count: number
	title: string
}) {
	return (
		<Card size="sm">
			<Card.Header bordered>
				<Flex
					align="center"
					justify="between"
				>
					<Flex
						align="center"
						gap="xs"
					>
						<Card.Title headingLevel={2}>{title}</Card.Title>
						<Badge
							size="sm"
							variant="secondary"
						>
							{count}
						</Badge>
					</Flex>
					<Button
						href="#search"
						size="sm"
						variant="link-muted"
					>
						View all {title.toLowerCase()}
					</Button>
				</Flex>
			</Card.Header>
			<Card.Content>{children}</Card.Content>
		</Card>
	)
}

/** The page Enter opens: the query, its scope, and one section per kind. */
function GroupedResults() {
	const payments = PAYMENTS.filter((payment) =>
		payment.customer.toLowerCase().includes(QUERY),
	)
	const customers = CUSTOMERS.filter((customer) =>
		customer.name.toLowerCase().includes(QUERY),
	)

	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					description="2 kinds of record match. Paste an ID to open it directly."
					title={`Results for “${QUERY}”`}
				/>
				<Page.Toolbar>
					<Flex
						align="stretch"
						direction="col"
						gap="sm"
					>
						<Flex
							align="center"
							gap="sm"
						>
							<Input
								ariaLabel="Search"
								defaultValue={QUERY}
								leftSection={<SearchIcon size={16} />}
								size="sm"
							/>
							<SegmentedControl
								ariaLabel="Search scope"
								defaultValue="all"
								optionLabel="label"
								options={SCOPES}
								optionValue="value"
								size="sm"
							/>
						</Flex>
						<Flex
							align="center"
							gap="xs"
							wrap="wrap"
						>
							<Typography
								size="xs"
								variant="muted"
							>
								Narrow it down with
							</Typography>
							{OPERATORS.map((operator) => (
								<Badge
									key={operator}
									size="sm"
									variant="outline"
								>
									{operator}
								</Badge>
							))}
						</Flex>
					</Flex>
				</Page.Toolbar>
				<Page.Content>
					<ResultSection
						count={payments.length}
						title="Payments"
					>
						<PaymentsTable
							columns={[
								'amount',
								'method',
								'customer',
								'date',
								'actions',
							]}
							items={payments}
						/>
					</ResultSection>
					<ResultSection
						count={customers.length}
						title="Customers"
					>
						<List
							divided
							gap="none"
							itemKey="id"
							items={customers}
							renderItem={(customer) => (
								<Flex
									align="center"
									gap="md"
									justify="between"
								>
									<Flex
										align="center"
										gap="sm"
									>
										<UsersIcon size={16} />
										<Flex
											align="stretch"
											direction="col"
											gap="none"
										>
											<Typography
												size="sm"
												weight="medium"
											>
												{customer.name}
											</Typography>
											<Typography
												size="xs"
												variant="muted"
											>
												{customer.email}&nbsp;· {customer.id}
											</Typography>
										</Flex>
									</Flex>
									<Flex
										align="center"
										gap="md"
									>
										<MoneyText
											currency="brl"
											muted
											size="sm"
											value={customer.spent}
										/>
										<DateText
											format="d MMM yyyy"
											muted
											size="sm"
											value={customer.createdAt}
										/>
									</Flex>
								</Flex>
							)}
						/>
					</ResultSection>
					<ResultSection
						count={0}
						title="Invoices"
					>
						<Flex
							align="center"
							gap="xs"
						>
							<FileTextIcon size={14} />
							<Typography
								size="sm"
								variant="muted"
							>
								No invoices match “{QUERY}”.
							</Typography>
						</Flex>
					</ResultSection>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/** What sits behind the instant dropdown and the palette: the list itself. */
function PaymentsBehind() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header title="Payments" />
				<Page.Content>
					<PaymentsTable items={PAYMENTS} />
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/**
 * Search in a payments dashboard is three surfaces for one query language.
 *
 * `instant` answers under the header field as the operator types — top hits
 * by kind, and before anything is typed the recent records and "jump to".
 * Enter opens `grouped`: the query, a scope, the operators it understands and
 * one section per kind, each with its own "View all". `command` is the other
 * palette, Cmd+K over the page, and it holds actions and places rather than
 * records.
 */
export function SearchResults({ variant }: { variant: SearchResultsVariant }) {
	if (variant === 'grouped') {
		return (
			<BackofficeShell
				active="payments"
				searchQuery={QUERY}
			>
				<GroupedResults />
			</BackofficeShell>
		)
	}

	if (variant === 'command') {
		return (
			<BackofficeShell
				active="payments"
				searchShortcut={false}
			>
				<PaymentsBehind />
				<SpotlightSearch
					ariaLabel="Command palette"
					defaultOpen
					footer={
						<Flex
							align="center"
							gap="md"
						>
							<Typography
								size="xs"
								variant="muted"
							>
								↑↓ to move&nbsp;· Enter to run&nbsp;· Esc to close
							</Typography>
						</Flex>
					}
					groups={COMMANDS}
					placeholder="Type a command or search…"
					shortcut
				/>
			</BackofficeShell>
		)
	}

	return (
		<BackofficeShell
			active="payments"
			searchOpen
			searchQuery="north"
		>
			<PaymentsBehind />
		</BackofficeShell>
	)
}
