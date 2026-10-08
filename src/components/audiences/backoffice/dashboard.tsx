import { Chart, Sparkline, type SparklineTrend } from '@turystack/react-charts'
import {
	GripVerticalIcon,
	LayoutGridIcon,
	PlusIcon,
	ShieldAlertIcon,
	StoreIcon,
	XIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Button,
	Card,
	DateText,
	EmptyState,
	Flex,
	Grid,
	Layout,
	List,
	MoneyText,
	NumberText,
	Page,
	Select,
	Stat,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { PAYMENTS } from './data'
import { PaymentStatusBadge } from './payments-table'
import { BackofficeShell } from './shell'

/**
 * - `overview`  — the home page as it is read: alerts, figures, the chart and
 *   the modules beside it
 * - `customize` — the same page while its widgets are being arranged
 */
export type DashboardVariant = 'overview' | 'customize'

type Kpi = {
	history: number[]
	label: string
	/** The same figure for the comparison period, already formatted. */
	previous: ReactNode
	trend: SparklineTrend
	change: number
	value: ReactNode
}

/** A comparison figure, sized by the line it sits in. */
function previousMoney(cents: number) {
	return (
		<MoneyText
			size="inherit"
			value={cents}
			weight="inherit"
		/>
	)
}

const KPIS: Kpi[] = [
	{
		change: 0.124,
		history: [
			31,
			34,
			30,
			38,
			41,
			39,
			44,
			47,
			43,
			49,
			52,
			50,
		],
		label: 'Gross volume',
		previous: previousMoney(114_260_000),
		trend: 'up',
		value: (
			<MoneyText
				currency="brl"
				size="inherit"
				value={128_431_000}
				weight="inherit"
			/>
		),
	},
	{
		change: 0.098,
		history: [
			28,
			30,
			27,
			33,
			35,
			34,
			38,
			40,
			37,
			42,
			44,
			43,
		],
		label: 'Net volume',
		previous: previousMoney(109_171_630),
		trend: 'up',
		value: (
			<MoneyText
				currency="brl"
				size="inherit"
				value={119_870_450}
				weight="inherit"
			/>
		),
	},
	{
		change: 0.081,
		history: [
			22,
			25,
			21,
			27,
			26,
			29,
			31,
			28,
			33,
			32,
			35,
			36,
		],
		label: 'New customers',
		previous: (
			<NumberText
				size="inherit"
				value={316}
				weight="inherit"
			/>
		),
		trend: 'up',
		value: (
			<NumberText
				size="inherit"
				value={342}
				weight="inherit"
			/>
		),
	},
	{
		change: -0.023,
		history: [
			42,
			41,
			43,
			40,
			39,
			41,
			38,
			37,
			39,
			36,
			37,
			35,
		],
		label: 'Average order',
		previous: previousMoney(31_970),
		trend: 'down',
		value: (
			<MoneyText
				currency="brl"
				size="inherit"
				value={31_240}
				weight="inherit"
			/>
		),
	},
]

/** Four weeks by day, this period and the one before it. */
const VOLUME = Array.from(
	{
		length: 28,
	},
	(_, index) => {
		const day = new Date(2026, 7, 30 + index)
		const weekly = [
			0.82,
			1,
			1.05,
			1.02,
			1.1,
			1.24,
			0.9,
		][index % 7]
		const current = Math.round((38_000 + index * 620) * weekly)
		const previous = Math.round((35_500 + index * 410) * weekly * 0.96)

		return {
			current,
			day: day.toLocaleDateString('en-GB', {
				day: 'numeric',
				month: 'short',
			}),
			previous,
		}
	},
)

const compactMoney = (value: number) => `R$ ${Math.round(value / 1000)}k`

const RANGES = [
	{
		label: 'Last 4 weeks',
		value: '4w',
	},
	{
		label: 'Last 7 days',
		value: '7d',
	},
	{
		label: 'Month to date',
		value: 'mtd',
	},
	{
		label: 'Last 12 months',
		value: '12m',
	},
]

const COMPARISONS = [
	{
		label: 'Previous period',
		value: 'previous',
	},
	{
		label: 'Previous year',
		value: 'year',
	},
	{
		label: 'No comparison',
		value: 'none',
	},
]

const PAYOUTS = [
	{
		amount: 3_912_004,
		at: new Date(2026, 8, 29),
		id: 'po_1',
		status: 'In transit',
	},
	{
		amount: 4_821_055,
		at: new Date(2026, 8, 26),
		id: 'po_2',
		status: 'Paid',
	},
	{
		amount: 2_764_310,
		at: new Date(2026, 8, 23),
		id: 'po_3',
		status: 'Paid',
	},
]

/**
 * A picker that is sized by what it says, the way dashboard period pills are:
 * a `width="auto"` Select that fits its current choice, named by `ariaLabel`
 * because the pill has no visible label of its own.
 */
function PeriodPicker({
	label,
	options,
}: {
	label: string
	options: {
		label: string
		value: string
	}[]
}) {
	return (
		<Select
			ariaLabel={label}
			clearable={false}
			defaultValue={options[0].value}
			mode="single"
			optionLabel="label"
			options={options}
			optionValue="value"
			size="sm"
			width="auto"
		/>
	)
}

/** The period the whole page answers to, and what it is compared with. */
function PeriodControls() {
	return (
		<Flex
			align="center"
			gap="xs"
		>
			<PeriodPicker
				label="Date range"
				options={RANGES}
			/>
			<Typography
				noWrap
				size="sm"
				variant="muted"
			>
				compared to
			</Typography>
			<PeriodPicker
				label="Comparison"
				options={COMPARISONS}
			/>
		</Flex>
	)
}

/** What needs a person before anything else on the page is worth reading. */
function AttentionStrip() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="sm"
		>
			<Alert variant="warning">
				<Alert.Icon>
					<ShieldAlertIcon size={16} />
				</Alert.Icon>
				<Alert.Title>2 disputes need a response</Alert.Title>
				<Alert.Description>
					R$ 1.249,80 is on hold until you submit evidence. The first one is due
					3 Oct.
				</Alert.Description>
				<Alert.Action>
					<Button
						href="#disputes"
						size="sm"
						variant="outline"
					>
						Review disputes
					</Button>
				</Alert.Action>
			</Alert>
			<Alert variant="info">
				<Alert.Icon>
					<StoreIcon size={16} />
				</Alert.Icon>
				<Alert.Title>Confirm your business address</Alert.Title>
				<Alert.Description>
					Payouts pause on 10 Oct if the address is not confirmed.
				</Alert.Description>
				<Alert.Action>
					<Button
						href="#settings"
						size="sm"
						variant="outline"
					>
						Confirm address
					</Button>
				</Alert.Action>
			</Alert>
		</Flex>
	)
}

/**
 * A widget's frame. While the page is being customised it grows a grip and a
 * remove control, and nothing inside it changes — the operator arranges the
 * page they already know.
 */
function Widget({
	children,
	editing,
	title,
	action,
}: {
	action?: ReactNode
	children: ReactNode
	editing: boolean
	title: string
}) {
	return (
		<Card size="sm">
			<Card.Header>
				<Flex
					align="center"
					gap="sm"
					justify="between"
				>
					<Flex
						align="center"
						gap="xs"
					>
						{editing && (
							<Button
								ariaLabel={`Move ${title}`}
								size="icon-xs"
								variant="ghost"
							>
								<GripVerticalIcon size={14} />
							</Button>
						)}
						<Card.Title headingLevel={2}>{title}</Card.Title>
					</Flex>
					{editing ? (
						<Button
							ariaLabel={`Remove ${title}`}
							size="icon-xs"
							variant="ghost"
						>
							<XIcon size={14} />
						</Button>
					) : (
						action
					)}
				</Flex>
			</Card.Header>
			<Card.Content>{children}</Card.Content>
		</Card>
	)
}

/**
 * A figure, then what it did: the change sits on its own line under the
 * figure, beside the comparison it was measured against. Stat's own `trend`
 * slot would put the change on the figure's line, and a seven-figure amount
 * leaves no room for it there in a quarter-width tile.
 */
function KpiTile({ editing, kpi }: { editing: boolean; kpi: Kpi }) {
	return (
		<Card size="sm">
			<Card.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="sm"
				>
					<Flex
						align="start"
						gap="xs"
						justify="between"
					>
						<Stat
							label={kpi.label}
							value={kpi.value}
						/>
						{editing && (
							<Button
								ariaLabel={`Remove ${kpi.label}`}
								size="icon-xs"
								variant="ghost"
							>
								<XIcon size={14} />
							</Button>
						)}
					</Flex>
					<Flex
						align="baseline"
						gap="xs"
						wrap="wrap"
					>
						<NumberText
							colored
							fractionDigits={1}
							signDisplay="always"
							size="sm"
							value={kpi.change}
							variant="percent"
							weight="medium"
						/>
						<Typography
							noWrap
							size="xs"
							variant="muted"
						>
							vs. {kpi.previous}
						</Typography>
					</Flex>
					<Sparkline
						data={kpi.history}
						height="sm"
						label={`${kpi.label}, last 12 weeks`}
						trend={kpi.trend}
						variant="area"
					/>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/**
 * The home page of the operation, in the usual order: what needs attention,
 * then the figures for the chosen period with the previous one beside them,
 * then the modules an operator checks every morning.
 *
 * `customize` is the same page with its widgets unlocked — a grip and a remove
 * control on each, a dashed slot to add one, and Apply / Cancel where the
 * period picker was.
 */
export function Dashboard({ variant }: { variant: DashboardVariant }) {
	const editing = variant === 'customize'

	return (
		<BackofficeShell active="home">
			<Layout.Content maxWidth="lg">
				<Page>
					<Page.Header
						action={
							editing ? (
								<Flex
									align="center"
									gap="sm"
								>
									<Button
										size="sm"
										variant="outline"
									>
										Cancel
									</Button>
									<Button size="sm">Apply</Button>
								</Flex>
							) : (
								<Button
									leftSection={<LayoutGridIcon size={14} />}
									size="sm"
									variant="outline"
								>
									Edit
								</Button>
							)
						}
						description={
							editing
								? 'Drag widgets to reorder them, or remove what you do not use.'
								: '1 Sep – 26 Sep 2026, compared to 4 Aug – 29 Aug'
						}
						title={editing ? 'Customize your overview' : 'Home'}
					/>
					{/* The period sits on its own row under the title:
					    beside the title it took the width the date line needed. */}
					{!editing && (
						<Page.Toolbar>
							<PeriodControls />
						</Page.Toolbar>
					)}
					<Page.Content>
						{!editing && <AttentionStrip />}

						<Grid
							cols={{
								base: 1,
								md: 2,
								xl: 4,
							}}
							gap="md"
						>
							{KPIS.map((kpi) => (
								<KpiTile
									editing={editing}
									key={kpi.label}
									kpi={kpi}
								/>
							))}
						</Grid>

						<Grid
							cols={{
								base: 1,
								xl: 3,
							}}
							gap="md"
						>
							<Grid.Item
								span={{
									base: 1,
									xl: 2,
								}}
							>
								<Widget
									action={
										<Button
											href="#reports"
											size="sm"
											variant="link-muted"
										>
											View report
										</Button>
									}
									editing={editing}
									title="Gross volume by day"
								>
									<Chart
										compare={{
											key: 'previous',
											label: 'Previous period',
										}}
										data={VOLUME}
										description="Daily gross volume for the last four weeks, drawn over the four weeks before."
										emptyText="No payments in this period"
										height="md"
										legend
										loadingText="Loading gross volume"
										series={[
											{
												color: 1,
												key: 'current',
												label: 'This period',
											},
										]}
										title="Gross volume by day"
										type="area"
										valueFormat={compactMoney}
										xKey="day"
									/>
								</Widget>
							</Grid.Item>

							<Flex
								align="stretch"
								direction="col"
								gap="md"
							>
								<Widget
									action={
										<Button
											href="#payouts"
											size="sm"
											variant="link-muted"
										>
											View all
										</Button>
									}
									editing={editing}
									title="Payouts"
								>
									<List
										divided
										gap="none"
										itemKey="id"
										items={PAYOUTS}
										renderItem={(payout) => (
											<Flex
												align="center"
												gap="sm"
												justify="between"
											>
												<Flex
													align="stretch"
													direction="col"
													gap="none"
												>
													<MoneyText
														currency="brl"
														size="sm"
														value={payout.amount}
														weight="medium"
													/>
													<DateText
														format="d MMM yyyy"
														muted
														size="xs"
														value={payout.at}
													/>
												</Flex>
												<Typography
													size="xs"
													variant="muted"
												>
													{payout.status}
												</Typography>
											</Flex>
										)}
									/>
								</Widget>

								<Widget
									editing={editing}
									title="Recent payments"
								>
									<List
										divided
										gap="none"
										itemKey="id"
										items={PAYMENTS.slice(0, 4)}
										renderItem={(payment) => (
											<Flex
												align="center"
												gap="sm"
												justify="between"
											>
												<Flex
													align="stretch"
													direction="col"
													gap="none"
												>
													<MoneyText
														currency="brl"
														size="sm"
														value={payment.amount}
														weight="medium"
													/>
													<Typography
														size="xs"
														truncate
														variant="muted"
													>
														{payment.customer}
													</Typography>
												</Flex>
												<PaymentStatusBadge status={payment.status} />
											</Flex>
										)}
									/>
								</Widget>
							</Flex>
						</Grid>

						{editing && (
							<EmptyState
								action={
									<Button
										leftSection={<PlusIcon size={14} />}
										size="sm"
										variant="outline"
									>
										Add widget
									</Button>
								}
								bordered="dashed"
								description="Charts, lists and figures from any product."
								headingLevel={2}
								size="sm"
								title="Add a widget"
							/>
						)}
					</Page.Content>
				</Page>
			</Layout.Content>
		</BackofficeShell>
	)
}
