import { Chart, Sparkline } from '@turystack/react-charts'
import {
	ArrowRightIcon,
	BarChart3Icon,
	CheckIcon,
	GitBranchIcon,
	ReceiptIcon,
	ShieldCheckIcon,
	ShoppingCartIcon,
	UsersIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	NumberText,
	Separator,
	Stat,
	Table,
	Timeline,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import {
	Section,
	SectionHeading,
} from '@/components/audiences/landing-page/section'

/**
 * What the product does.
 *
 * - `grid` — 3×2: icon, a short title, one or two sentences. Scanned, not read
 * - `alternating` — three capabilities told at length, copy and a live
 *   product fragment swapping sides, one link each
 * - `bento` — unequal tiles, each one a working fragment of the product
 */
export type FeaturesVariant = 'grid' | 'alternating' | 'bento'

const FEATURES = [
	{
		description:
			'Store, marketplace and chat orders land in one queue, with stock checked as they arrive.',
		icon: ShoppingCartIcon,
		title: 'Orders from every channel',
	},
	{
		description:
			'Invoices go out on the day the order ships, and overdue ones chase themselves by email.',
		icon: ReceiptIcon,
		title: 'Invoices that send themselves',
	},
	{
		description:
			'One record per customer, with every order, ticket and payment on the same page.',
		icon: UsersIcon,
		title: 'One record per customer',
	},
	{
		description:
			'Revenue, margin and churn update as orders close. Export to CSV when the accountant asks.',
		icon: BarChart3Icon,
		title: 'Reports without spreadsheets',
	},
	{
		description:
			'Tag, assign and notify on rules you write once, so the busywork runs without anyone.',
		icon: GitBranchIcon,
		title: 'Automations for the busywork',
	},
	{
		description:
			'Roles per team, two-step sign in, and an audit trail of every change anyone makes.',
		icon: ShieldCheckIcon,
		title: 'Roles and an audit trail',
	},
]

function FeatureIcon({ children }: { children: ReactNode }) {
	return (
		<Flex align="start">
			<Box
				bg="muted"
				padding="sm"
				rounded="md"
			>
				<Flex align="center">{children}</Flex>
			</Box>
		</Flex>
	)
}

function FeatureGrid() {
	return (
		<Flex
			direction="col"
			gap="xl"
		>
			<SectionHeading
				description="The six things an operations team does every day, in one place instead of six tabs."
				eyebrow="Features"
				title="Everything the back office runs on"
			/>
			<Grid
				cols={{
					base: 1,
					lg: 3,
					sm: 2,
				}}
				gap="xl"
			>
				{FEATURES.map(({ description, icon: Icon, title }) => (
					<Flex
						direction="col"
						gap="sm"
						key={title}
					>
						<FeatureIcon>
							<Icon size={20} />
						</FeatureIcon>
						<Typography
							component="h3"
							size="lg"
							weight="semibold"
						>
							{title}
						</Typography>
						<Typography
							component="p"
							variant="muted"
						>
							{description}
						</Typography>
					</Flex>
				))}
			</Grid>
		</Flex>
	)
}

type Order = {
	customer: string
	id: string
	status: 'Paid' | 'Shipped' | 'Pending'
	total: string
}

const ORDERS: Order[] = [
	{
		customer: 'Mariana Souza',
		id: '#4821',
		status: 'Paid',
		total: 'R$ 1.240,00',
	},
	{
		customer: 'Rafael Lima',
		id: '#4820',
		status: 'Shipped',
		total: 'R$ 389,90',
	},
	{
		customer: 'Beatriz Costa',
		id: '#4819',
		status: 'Pending',
		total: 'R$ 2.715,50',
	},
	{
		customer: 'Lucas Almeida',
		id: '#4818',
		status: 'Paid',
		total: 'R$ 96,00',
	},
]

const STATUS_BADGE = {
	Paid: 'success',
	Pending: 'warning',
	Shipped: 'info',
} as const

/**
 * Column widths are shares (4 : 3 : 3), so the table fills its half. Three
 * columns, not four: at phone width a fourth (the order number) pushed the
 * totals past the edge into a sideways scroll.
 */
function OrdersFragment() {
	return (
		<Table
			columns={[
				{
					key: 'customer',
					label: 'Customer',
					width: 4,
				},
				{
					key: 'status',
					label: 'Status',
					selector: (row) => (
						<Badge variant={STATUS_BADGE[row.status]}>{row.status}</Badge>
					),
					width: 3,
				},
				{
					align: 'right',
					key: 'total',
					label: 'Total',
					width: 3,
				},
			]}
			density="compact"
			itemKey="id"
			items={ORDERS}
		/>
	)
}

const INVOICES = [
	{
		amount: 'R$ 1.240,00',
		customer: 'Mariana Souza',
		status: 'Sent today',
		variant: 'success',
	},
	{
		amount: 'R$ 2.715,50',
		customer: 'Beatriz Costa',
		status: 'Reminder in 2 days',
		variant: 'warning',
	},
	{
		amount: 'R$ 389,90',
		customer: 'Rafael Lima',
		status: 'Scheduled for 30/09',
		variant: 'info',
	},
] as const

function InvoicesFragment() {
	return (
		<Card>
			<Card.Header bordered>
				<Card.Title>Invoices this week</Card.Title>
				<Card.Description>Sent and chased without anyone</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					direction="col"
					gap="md"
				>
					{INVOICES.map((invoice, index) => (
						<Flex
							direction="col"
							gap="md"
							key={invoice.customer}
						>
							{index > 0 ? <Separator /> : null}
							<Flex
								align="center"
								gap="md"
								justify="between"
							>
								<Flex
									align="center"
									gap="sm"
								>
									<Avatar size="sm">
										{invoice.customer
											.split(' ')
											.map((part) => part[0])
											.join('')}
									</Avatar>
									<Flex direction="col">
										<Typography
											size="sm"
											weight="medium"
										>
											{invoice.customer}
										</Typography>
										<Typography
											size="xs"
											variant="muted"
										>
											{invoice.amount}
										</Typography>
									</Flex>
								</Flex>
								<Badge variant={invoice.variant}>{invoice.status}</Badge>
							</Flex>
						</Flex>
					))}
				</Flex>
			</Card.Content>
		</Card>
	)
}

const MARGIN = [
	{
		margin: 31,
		week: 'W35',
	},
	{
		margin: 29,
		week: 'W36',
	},
	{
		margin: 34,
		week: 'W37',
	},
	{
		margin: 36,
		week: 'W38',
	},
	{
		margin: 38,
		week: 'W39',
	},
]

/**
 * `withFigure` leads with this week's number, for the tall bento tile where
 * the chart alone would leave the card half empty; that tile also fills its
 * two-row cell (`height="full"`).
 * As a bento tile its title is a heading, level with the other tiles'; as a
 * story's picture of the product it stays a plain label.
 */
function ReportsFragment({ withFigure = false }: { withFigure?: boolean }) {
	return (
		<Card height={withFigure ? 'full' : 'auto'}>
			<Card.Header>
				<Card.Title headingLevel={withFigure ? 3 : undefined}>
					Gross margin by week
				</Card.Title>
				<Card.Description>Updated as orders close</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					direction="col"
					gap="lg"
				>
					{withFigure ? (
						<Stat
							hint="Week 39 · up from 36% in week 38"
							label="Gross margin"
							value={
								<NumberText
									inheritColor
									size="inherit"
									value={0.38}
									variant="percent"
									weight="inherit"
								/>
							}
						/>
					) : null}
					<Chart
						data={MARGIN}
						emptyText="No margin recorded yet"
						height={withFigure ? 'md' : 'sm'}
						loadingText="Loading gross margin"
						series={[
							{
								color: 2,
								key: 'margin',
								label: 'Margin',
							},
						]}
						title="Gross margin by week"
						type="bar"
						valueFormat={(value) => `${value}%`}
						xKey="week"
					/>
				</Flex>
			</Card.Content>
		</Card>
	)
}

const STORIES = [
	{
		bullets: [
			'Store, marketplace and chat in one list',
			'Stock reserved the moment an order lands',
		],
		description:
			'Every channel you sell on feeds the same queue, so nobody reconciles three dashboards at the end of the day.',
		eyebrow: 'Orders',
		fragment: <OrdersFragment />,
		href: '/product/orders',
		link: 'See how orders work',
		title: 'One queue for every order',
	},
	{
		bullets: [
			'Invoice issued when the order ships',
			'Polite reminders before and after the due date',
		],
		description:
			'Billing follows the order instead of a calendar reminder. Your team only hears about the invoices that need a person.',
		eyebrow: 'Billing',
		fragment: <InvoicesFragment />,
		href: '/product/billing',
		link: 'Explore billing',
		title: 'Get paid without chasing',
	},
	{
		bullets: [
			'Revenue, margin and churn, live',
			'CSV export for the accountant',
		],
		description:
			'The numbers you used to build on Friday afternoon are already there on Monday morning.',
		eyebrow: 'Reports',
		fragment: <ReportsFragment />,
		href: '/product/reports',
		link: 'Browse the reports',
		title: 'Know your margin this week',
	},
]

function StoryCopy({ story }: { story: (typeof STORIES)[number] }) {
	return (
		<Flex
			align="start"
			direction="col"
			gap="md"
		>
			<Badge variant="outline">{story.eyebrow}</Badge>
			<Typography
				component="h2"
				size="3xl"
				weight="bold"
			>
				{story.title}
			</Typography>
			<Typography
				component="p"
				size="lg"
				variant="muted"
			>
				{story.description}
			</Typography>
			<Flex
				direction="col"
				gap="sm"
			>
				{story.bullets.map((bullet) => (
					<Flex
						align="center"
						gap="sm"
						key={bullet}
					>
						<CheckIcon size={16} />
						<Typography size="sm">{bullet}</Typography>
					</Flex>
				))}
			</Flex>
			<Button
				href={story.href}
				rightSection={<ArrowRightIcon />}
				variant="link"
			>
				{story.link}
			</Button>
		</Flex>
	)
}

/**
 * `align="center"` sets the shorter side against the middle of the taller
 * one. Every row is written copy first, the order a phone reads it in: below
 * 768px the two sides stack that way. From `md` the swapped rows move their
 * fragment to the left with `Grid.Item order={{ base: 'last', md: 'first' }}`
 * — a visual move only, so keyboard and screen-reader order stay copy first.
 */
function Alternating() {
	return (
		<Flex
			direction="col"
			gap="xl"
		>
			{STORIES.map((story, index) => (
				<Box
					key={story.title}
					paddingY="lg"
				>
					<Grid
						align="center"
						cols={{
							base: 1,
							md: 2,
						}}
						gap="xl"
					>
						<StoryCopy story={story} />
						{index % 2 === 0 ? (
							story.fragment
						) : (
							<Grid.Item
								order={{
									base: 'last',
									md: 'first',
								}}
							>
								{story.fragment}
							</Grid.Item>
						)}
					</Grid>
				</Box>
			))}
		</Flex>
	)
}

const AUTOMATION_RUNS = [
	12,
	18,
	15,
	22,
	27,
	24,
	31,
	29,
	36,
	41,
	38,
	44,
]

/**
 * Three columns of unequal tiles: a tall one at each side, two rows high
 * and two short ones stacked between them. Below 1024px the tiles stack in
 * one column. Every tile is a working piece of the product, not an
 * illustration of it.
 *
 * The short tiles are grid cells themselves, so they stretch to their row.
 * The tall ones sit in a `Grid.Item` spanning two rows from `lg`
 * (`rowSpan={{ lg: 2 }}`; stacked, each takes one row), and their cards take
 * `height="full"` to fill that cell down to the second short tile's bottom
 * edge.
 */
function Bento() {
	return (
		<Flex
			direction="col"
			gap="xl"
		>
			<SectionHeading
				description="Not a list of promises: each tile is a piece of the product, working."
				eyebrow="Features"
				title="Built for the way operations run"
			/>
			<Grid
				cols={{
					base: 1,
					lg: 3,
				}}
				gap="md"
			>
				<Grid.Item
					rowSpan={{
						lg: 2,
					}}
				>
					<ReportsFragment withFigure />
				</Grid.Item>
				<Card>
					<Card.Header>
						<Card.Title headingLevel={3}>Automations</Card.Title>
						<Card.Description>Rules that ran this week</Card.Description>
					</Card.Header>
					<Card.Content>
						<Flex
							direction="col"
							gap="md"
						>
							<Typography
								size="4xl"
								weight="bold"
							>
								1.284
							</Typography>
							<Sparkline
								data={AUTOMATION_RUNS}
								height="sm"
								label="Automation runs per day, rising"
								trend="up"
								variant="bar"
							/>
						</Flex>
					</Card.Content>
				</Card>
				<Grid.Item
					rowSpan={{
						lg: 2,
					}}
				>
					<Card height="full">
						<Card.Header>
							<Card.Title headingLevel={3}>Audit trail</Card.Title>
							<Card.Description>
								Every change, by whom and when
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<Timeline compact>
								<Timeline.Item
									meta="Today, 14:32"
									status="done"
									title="Ana Ribeiro changed the Pro plan price to R$ 129"
								/>
								<Timeline.Item
									meta="Today, 11:05"
									status="done"
									title="Carlos Mendes gave Júlia Prado the Billing role"
								/>
								<Timeline.Item
									meta="Yesterday, 18:47"
									status="done"
									title="Automation “Overdue reminder” sent 23 emails"
								/>
								<Timeline.Item
									meta="Yesterday, 09:12"
									status="done"
									title="Júlia Prado exported September's invoices to CSV"
								/>
							</Timeline>
						</Card.Content>
					</Card>
				</Grid.Item>
				<Card>
					<Card.Header>
						<Card.Title headingLevel={3}>Customers</Card.Title>
						<Card.Description>One record, every touchpoint</Card.Description>
					</Card.Header>
					<Card.Content>
						<Flex
							direction="col"
							gap="md"
						>
							<Avatar.Group max={5}>
								<Avatar>MS</Avatar>
								<Avatar>RL</Avatar>
								<Avatar>BC</Avatar>
								<Avatar>LA</Avatar>
								<Avatar>JP</Avatar>
								<Avatar>CF</Avatar>
								<Avatar>TN</Avatar>
							</Avatar.Group>
							<Typography
								size="sm"
								variant="muted"
							>
								12.480 customers, each with orders, tickets and payments on one
								page.
							</Typography>
						</Flex>
					</Card.Content>
				</Card>
			</Grid>
		</Flex>
	)
}

export function Features({
	bg,
	id,
	variant,
}: {
	bg?: 'muted'
	id?: string
	variant: FeaturesVariant
}) {
	return (
		<Section
			bg={bg}
			id={id}
		>
			{variant === 'grid' ? <FeatureGrid /> : null}
			{variant === 'alternating' ? <Alternating /> : null}
			{variant === 'bento' ? <Bento /> : null}
		</Section>
	)
}
