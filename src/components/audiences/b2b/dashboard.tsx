import { Chart, Sparkline } from '@turystack/react-charts'
import {
	BriefcaseIcon,
	CalendarDaysIcon,
	CircleCheckIcon,
	DownloadIcon,
	MailIcon,
	NotebookIcon,
	PhoneIcon,
	PlusIcon,
	SlidersHorizontalIcon,
	TrophyIcon,
	UsersIcon,
} from '@turystack/react-icons'
import {
	Badge,
	Button,
	Card,
	Checkbox,
	Checklist,
	DateText,
	Flex,
	Grid,
	Layout,
	List,
	MoneyText,
	NumberText,
	Page,
	Stat,
	Timeline,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { ACTIVITIES, type ActivityKind, DEALS, STAGES, TASKS } from './crm-data'
import { CrmShell } from './crm-shell'

/**
 * The first page after signing in, three ways.
 *
 * Every variant opens on the same header row with exactly one primary action,
 * the rule CRM design systems write down for header actions: a second primary is a
 * second answer to "what is this page for". `metrics` leads with the figures
 * and puts the charts on wide surfaces, never in a side column. `activity`
 * leads with what changed. `my-work` is the seller's own day — tasks due and
 * the workspace's setup assistant, which stays until it is finished.
 */
export type DashboardVariant = 'metrics' | 'activity' | 'my-work'

const MONTHS = [
	{
		created: 612,
		lastYear: 480,
		month: 'Apr',
		won: 210,
	},
	{
		created: 684,
		lastYear: 520,
		month: 'May',
		won: 236,
	},
	{
		created: 702,
		lastYear: 555,
		month: 'Jun',
		won: 251,
	},
	{
		created: 778,
		lastYear: 590,
		month: 'Jul',
		won: 298,
	},
	{
		created: 846,
		lastYear: 610,
		month: 'Aug',
		won: 312,
	},
	{
		created: 905,
		lastYear: 640,
		month: 'Sep',
		won: 347,
	},
]

const BY_STAGE = STAGES.map((stage) => ({
	amount:
		DEALS.filter((deal) => deal.stage === stage.id).reduce(
			(sum, deal) => sum + deal.amount,
			0,
		) / 100_000,
	stage: stage.label,
}))

const thousands = (value: number) => `R$ ${value}k`

export const KIND_ICON: Record<ActivityKind, ReactNode> = {
	call: <PhoneIcon size={14} />,
	email: <MailIcon size={14} />,
	meeting: <UsersIcon size={14} />,
	note: <NotebookIcon size={14} />,
	stage: <TrophyIcon size={14} />,
	task: <CircleCheckIcon size={14} />,
}

function Kpis() {
	return (
		<Grid
			cols={4}
			gap="md"
		>
			<Card>
				<Card.Content>
					<Stat
						hint="10 open deals"
						label="Open pipeline"
						trend={
							<NumberText
								colored
								signDisplay="always"
								value={0.124}
								variant="percent"
							/>
						}
						value={
							<MoneyText
								currency="brl"
								value={105_350_000}
								variant="compact"
							/>
						}
					/>
				</Card.Content>
			</Card>
			<Card>
				<Card.Content>
					<Stat
						hint="Quarter to date"
						label="Won"
						trend={
							<NumberText
								colored
								signDisplay="always"
								value={0.081}
								variant="percent"
							/>
						}
						value={
							<MoneyText
								currency="brl"
								value={17_800_000}
								variant="compact"
							/>
						}
					/>
				</Card.Content>
			</Card>
			<Card>
				<Card.Content>
					<Stat
						hint="Last 90 days"
						label="Win rate"
						trend={
							<NumberText
								colored
								signDisplay="always"
								value={-0.02}
								variant="percent"
							/>
						}
						value={
							<NumberText
								value={0.32}
								variant="percent"
							/>
						}
					/>
				</Card.Content>
			</Card>
			<Card>
				<Card.Content>
					<Flex
						align="end"
						gap="sm"
						justify="between"
					>
						<Stat
							hint="Days from created to won"
							label="Sales cycle"
							value={
								<NumberText
									unit="days"
									value={38}
								/>
							}
						/>
						<Sparkline
							data={[
								46,
								44,
								45,
								41,
								40,
								38,
							]}
							label="Sales cycle, last six months"
							trend="up"
						/>
					</Flex>
				</Card.Content>
			</Card>
		</Grid>
	)
}

function Metrics() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Kpis />
			<Card>
				<Card.Header>
					<Card.Title headingLevel={2}>Pipeline created</Card.Title>
					<Card.Description>
						New pipeline per month, against the same month last year
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Chart
						compare={{
							key: 'lastYear',
							label: 'Last year',
						}}
						data={MONTHS}
						emptyText="No pipeline created yet"
						height="md"
						legend
						loadingText="Loading pipeline"
						series={[
							{
								color: 1,
								key: 'created',
								label: 'Created',
							},
						]}
						title="Pipeline created per month"
						type="area"
						valueFormat={thousands}
						xKey="month"
					/>
				</Card.Content>
			</Card>
			<Grid
				cols={2}
				gap="md"
			>
				<Card>
					<Card.Header>
						<Card.Title headingLevel={2}>Open amount by stage</Card.Title>
						<Card.Description>All open deals, in thousands</Card.Description>
					</Card.Header>
					<Card.Content>
						<Chart
							data={BY_STAGE}
							emptyText="No open deals"
							height="sm"
							loadingText="Loading open deals"
							series={[
								{
									color: 2,
									key: 'amount',
									label: 'Amount',
								},
							]}
							title="Open amount by stage"
							type="bar"
							valueFormat={thousands}
							xKey="stage"
						/>
					</Card.Content>
				</Card>
				<Card>
					<Card.Header>
						<Card.Title headingLevel={2}>Won per month</Card.Title>
						<Card.Description>Closed won, in thousands</Card.Description>
					</Card.Header>
					<Card.Content>
						<Chart
							data={MONTHS}
							emptyText="No deals won yet"
							height="sm"
							loadingText="Loading won deals"
							series={[
								{
									color: 3,
									key: 'won',
									label: 'Won',
								},
							]}
							title="Won per month"
							type="line"
							valueFormat={thousands}
							xKey="month"
						/>
					</Card.Content>
				</Card>
			</Grid>
		</Flex>
	)
}

export function ActivityTimeline({ compact }: { compact?: boolean }) {
	return (
		<Timeline compact={compact}>
			{ACTIVITIES.slice(0, 6).map((item) => (
				<Timeline.Item
					icon={KIND_ICON[item.kind]}
					key={item.id}
					meta={
						<>
							<DateText
								inheritColor
								size="inherit"
								value={item.at}
								variant="dateTime"
							/>{' '}
							· {item.by}
						</>
					}
					status="done"
					title={item.title}
				>
					<Typography
						size="sm"
						variant="muted"
					>
						{item.record} — {item.detail}
					</Typography>
				</Timeline.Item>
			))}
		</Timeline>
	)
}

function ActivityFirst() {
	return (
		<Grid
			cols={3}
			gap="md"
		>
			<Grid.Item span={2}>
				<Card>
					<Card.Header bordered>
						<Flex
							align="center"
							justify="between"
						>
							<Card.Title headingLevel={2}>Recent activity</Card.Title>
							<Button
								size="sm"
								variant="link"
							>
								View all activity
							</Button>
						</Flex>
					</Card.Header>
					<Card.Content>
						<ActivityTimeline />
					</Card.Content>
				</Card>
			</Grid.Item>
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<Card>
					<Card.Content>
						<Stat
							hint="10 open deals"
							label="Open pipeline"
							value={
								<MoneyText
									currency="brl"
									value={105_350_000}
									variant="compact"
								/>
							}
						/>
					</Card.Content>
				</Card>
				<Card>
					<Card.Content>
						<Stat
							hint="This week, across the team"
							label="Activities logged"
							trend={
								<NumberText
									colored
									signDisplay="always"
									value={0.18}
									variant="percent"
								/>
							}
							value={<NumberText value={64} />}
						/>
					</Card.Content>
				</Card>
				<Card>
					<Card.Header>
						<Card.Title headingLevel={2}>Closing soon</Card.Title>
					</Card.Header>
					<Card.Content>
						<List
							divided
							itemKey="id"
							items={DEALS.filter((deal) => deal.stage === 'negotiation')}
							renderItem={(deal) => (
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
										<Typography
											size="sm"
											weight="medium"
										>
											{deal.name}
										</Typography>
										<Typography
											size="xs"
											variant="muted"
										>
											Closes{' '}
											<DateText
												inheritColor
												size="inherit"
												value={deal.closeDate}
											/>
										</Typography>
									</Flex>
									<MoneyText
										currency="brl"
										size="sm"
										value={deal.amount}
										variant="compact"
									/>
								</Flex>
							)}
						/>
					</Card.Content>
				</Card>
			</Flex>
		</Grid>
	)
}

export const SETUP_STEPS = [
	{
		description: '1.284 contacts from a spreadsheet',
		done: true,
		id: 'import',
		label: 'Import your contacts',
	},
	{
		description: 'Emails you send and receive are logged on the record',
		done: true,
		id: 'inbox',
		label: 'Connect your inbox',
	},
	{
		action: (
			<Button
				size="sm"
				variant="outline"
			>
				Invite
			</Button>
		),
		description: 'Deals can be assigned once they have an account',
		done: false,
		id: 'team',
		label: 'Invite your sales team',
	},
	{
		action: (
			<Button
				size="sm"
				variant="outline"
			>
				Customise
			</Button>
		),
		description: 'Match the stages to how your team sells',
		done: false,
		id: 'pipeline',
		label: 'Set up your pipeline stages',
	},
	{
		action: (
			<Button
				size="sm"
				variant="outline"
			>
				Connect
			</Button>
		),
		description: 'Put meetings on deals automatically',
		done: false,
		id: 'calendar',
		label: 'Connect your calendar',
	},
]

function MyWork() {
	return (
		<Grid
			cols={3}
			gap="md"
		>
			<Grid.Item span={2}>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<Card>
						<Card.Header bordered>
							<Flex
								align="center"
								justify="between"
							>
								<Card.Title headingLevel={2}>My tasks</Card.Title>
								<Badge
									size="sm"
									variant="destructive"
								>
									1 overdue
								</Badge>
							</Flex>
						</Card.Header>
						<Card.Content>
							<List
								divided
								itemKey="id"
								items={TASKS}
								renderItem={(task) => (
									<Flex
										align="center"
										gap="md"
										justify="between"
									>
										<Flex
											align="start"
											gap="sm"
										>
											<Checkbox label={task.title} />
										</Flex>
										<Flex
											align="center"
											gap="sm"
										>
											<Typography
												noWrap
												size="xs"
												variant="muted"
											>
												{task.record}
											</Typography>
											<Badge
												size="sm"
												variant={task.overdue ? 'destructive' : 'secondary'}
											>
												{task.overdue ? 'Overdue' : task.due}
											</Badge>
										</Flex>
									</Flex>
								)}
							/>
						</Card.Content>
					</Card>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>My open deals</Card.Title>
							<Card.Description>
								Sorted by close date · 5 deals
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<List
								divided
								itemKey="id"
								items={DEALS.filter(
									(deal) =>
										deal.owner === 'Marina Costa' &&
										deal.stage !== 'closed-won',
								)}
								renderItem={(deal) => (
									<Flex
										align="center"
										gap="md"
										justify="between"
									>
										<Flex
											align="center"
											gap="sm"
										>
											<BriefcaseIcon size={16} />
											<Typography
												size="sm"
												weight="medium"
											>
												{deal.name}
											</Typography>
										</Flex>
										<Flex
											align="center"
											gap="md"
										>
											<Typography
												noWrap
												size="xs"
												variant="muted"
											>
												<DateText
													inheritColor
													size="inherit"
													value={deal.closeDate}
												/>
											</Typography>
											<MoneyText
												currency="brl"
												size="sm"
												value={deal.amount}
												variant="compact"
											/>
										</Flex>
									</Flex>
								)}
							/>
						</Card.Content>
					</Card>
				</Flex>
			</Grid.Item>
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<Card>
					<Card.Content>
						<Checklist
							items={SETUP_STEPS}
							title="Set up your workspace"
						/>
					</Card.Content>
				</Card>
				<Card>
					<Card.Header>
						<Card.Title headingLevel={2}>Today’s meetings</Card.Title>
					</Card.Header>
					<Card.Content>
						<Timeline compact>
							<Timeline.Item
								icon={<CalendarDaysIcon size={14} />}
								meta="14:00 – 14:30 · Video call"
								status="current"
								title="Globex — pricing review"
							/>
							<Timeline.Item
								icon={<CalendarDaysIcon size={14} />}
								meta="16:00 – 16:45 · Northwind office"
								status="pending"
								title="Northwind — procurement call"
							/>
						</Timeline>
					</Card.Content>
				</Card>
			</Flex>
		</Grid>
	)
}

const TITLES: Record<DashboardVariant, string> = {
	activity: 'Sales activity',
	metrics: 'Sales dashboard',
	'my-work': 'My work',
}

export function Dashboard({ variant }: { variant: DashboardVariant }) {
	return (
		<CrmShell active="home">
			<Layout.Content>
				<Page>
					<Page.Header
						action={
							<Flex
								align="center"
								gap="sm"
							>
								<Button
									leftSection={<SlidersHorizontalIcon size={16} />}
									variant="outline"
								>
									This quarter
								</Button>
								<Button
									leftSection={<DownloadIcon size={16} />}
									variant="outline"
								>
									Export
								</Button>
								<Button leftSection={<PlusIcon size={16} />}>New deal</Button>
							</Flex>
						}
						description="Q4 2026 · your team · updated 5 minutes ago"
						title={TITLES[variant]}
					/>
					<Page.Content>
						{variant === 'metrics' && <Metrics />}
						{variant === 'activity' && <ActivityFirst />}
						{variant === 'my-work' && <MyWork />}
					</Page.Content>
				</Page>
			</Layout.Content>
		</CrmShell>
	)
}
