import { CheckIcon, ChevronDownIcon } from '@turystack/react-icons'
import {
	Badge,
	BooleanText,
	Button,
	Card,
	Collapsible,
	Flex,
	FormatProvider,
	Grid,
	MoneyText,
	SegmentedControl,
	Separator,
	Table,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import {
	PRIMARY_CTA,
	Section,
	SectionHeading,
} from '@/components/audiences/landing-page/section'

/**
 * Plans and what each costs.
 *
 * - `tiers` — three plan cards, the middle one recommended (ringed, and
 *   badged "Recommended" in words too), with the monthly or yearly switch
 *   above them. The switch is part of the tiers, not a layout of its own: it
 *   changes the figures, not the arrangement. Business is sold by a person:
 *   "Talk to sales"
 * - `comparison` — the feature-by-plan table, for the visitor who reads every
 *   row before paying
 *
 * The full page shows the tiers with the table folded underneath them
 * (`compare`), so the long read is one click away and not in the way.
 */
export type PricingVariant = 'tiers' | 'comparison'

type Interval = 'month' | 'year'

/** A plan as the catalogue returns it; prices in BRL cents per month. */
type Tier = {
	id: string
	name: string
	description: string
	features: string[]
	/** The recommended plan: ringed, badged, and its button filled. */
	highlighted: boolean
	/** Bought on the site; otherwise sold by a person. */
	selfServe: boolean
	monthly: number
	/** The yearly price, divided by twelve. */
	yearlyPerMonth: number
}

const TRIAL_DAYS = 14

const TIERS: Tier[] = [
	{
		description: 'For a small team leaving spreadsheets.',
		features: [
			'Up to 3 users',
			'500 orders a month',
			'Invoices and reminders',
			'Email support',
		],
		highlighted: false,
		id: 'starter',
		monthly: 4900,
		name: 'Starter',
		selfServe: true,
		yearlyPerMonth: 3900,
	},
	{
		description: 'For teams selling on several channels.',
		features: [
			'Up to 15 users',
			'Unlimited orders',
			'Marketplace and messaging channels',
			'Automations and reports',
			'Chat support in business hours',
		],
		highlighted: true,
		id: 'pro',
		monthly: 12900,
		name: 'Pro',
		selfServe: true,
		yearlyPerMonth: 10300,
	},
	{
		description: 'For teams that need audit and a contract.',
		features: [
			'Unlimited users',
			'Roles, SSO and audit trail',
			'Custom integrations via API',
			'Dedicated account manager',
			'99,9% uptime SLA',
		],
		highlighted: false,
		id: 'business',
		monthly: 34900,
		name: 'Business',
		selfServe: false,
		yearlyPerMonth: 27900,
	},
]

/** The whole percent paying yearly saves against paying monthly. */
function savingOf(tier: Tier): number {
	return Math.round((1 - tier.yearlyPerMonth / tier.monthly) * 100)
}

const BEST_SAVING = Math.max(...TIERS.map(savingOf))

const INTERVALS = [
	{
		label: 'Monthly',
		value: 'month',
	},
	{
		label: `Yearly · Save ${BEST_SAVING}%`,
		value: 'year',
	},
]

/**
 * One plan: name and pitch, the monthly-equivalent price and how it is
 * billed, the saving and the trial, the call to action, and what it includes.
 */
function TierCard({ interval, tier }: { interval: Interval; tier: Tier }) {
	const yearly = interval === 'year'

	return (
		<Card
			height="full"
			highlighted={tier.highlighted}
		>
			<Card.Header>
				<Flex
					align="center"
					gap="sm"
					justify="between"
				>
					<Card.Title headingLevel={3}>{tier.name}</Card.Title>
					{tier.highlighted && <Badge variant="solid">Recommended</Badge>}
				</Flex>
				<Card.Description>{tier.description}</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					direction="col"
					gap="lg"
				>
					<Flex
						direction="col"
						gap="xs"
					>
						<Flex
							align="baseline"
							gap="xs"
						>
							<MoneyText
								size="4xl"
								value={yearly ? tier.yearlyPerMonth : tier.monthly}
								weight="bold"
							/>
							<Typography
								component="span"
								variant="muted"
							>
								/month
							</Typography>
						</Flex>
						<Typography
							component="p"
							size="sm"
							variant="muted"
						>
							{yearly ? (
								<>
									<MoneyText
										inheritColor
										size="inherit"
										value={tier.yearlyPerMonth * 12}
									/>{' '}
									billed yearly
								</>
							) : (
								'Billed monthly'
							)}
						</Typography>
						<Flex
							align="center"
							gap="xs"
							wrap="wrap"
						>
							{yearly && (
								<Badge
									size="sm"
									variant="success"
								>
									Save {savingOf(tier)}%
								</Badge>
							)}
							<Badge
								size="sm"
								variant="secondary"
							>
								{TRIAL_DAYS} days free
							</Badge>
						</Flex>
					</Flex>
					<Button
						block
						variant={tier.highlighted ? 'default' : 'outline'}
					>
						{tier.selfServe ? PRIMARY_CTA : 'Talk to sales'}
					</Button>
					<Separator />
					<Flex
						direction="col"
						gap="sm"
					>
						{tier.features.map((feature) => (
							<Flex
								align="center"
								gap="sm"
								key={feature}
							>
								<CheckIcon size={16} />
								<Typography
									component="span"
									size="sm"
								>
									{feature}
								</Typography>
							</Flex>
						))}
					</Flex>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/** The monthly or yearly switch, and the three plans priced on it. */
function TierCards() {
	const [interval, setCadence] = useState<Interval>('year')

	return (
		<Flex
			direction="col"
			gap="xl"
		>
			<Flex justify="center">
				<SegmentedControl
					ariaLabel="Billing period"
					onChange={(value) => setCadence(value as Interval)}
					optionLabel="label"
					options={INTERVALS}
					optionValue="value"
					value={interval}
				/>
			</Flex>
			<Grid
				cols={{
					base: 1,
					md: 3,
				}}
				gap="lg"
			>
				{TIERS.map((tier) => (
					<TierCard
						interval={interval}
						key={tier.id}
						tier={tier}
					/>
				))}
			</Grid>
		</Flex>
	)
}

type Row = {
	business: ReactNode
	feature: string
	pro: ReactNode
	starter: ReactNode
}

/**
 * A yes or a no, as a tick or a cross (`BooleanText variant="check"`). The
 * icon sits in an inline box, so the centred plan columns (`align:
 * 'center'`) centre it, and it keeps the word for a screen reader — an icon
 * alone would leave the cell silent.
 */
const YES = (
	<BooleanText
		value
		variant="check"
	/>
)

const NO = (
	<BooleanText
		value={false}
		variant="check"
	/>
)

const COMPARISON: Row[] = [
	{
		business: 'Unlimited',
		feature: 'Users',
		pro: '15',
		starter: '3',
	},
	{
		business: 'Unlimited',
		feature: 'Orders a month',
		pro: 'Unlimited',
		starter: '500',
	},
	{
		business: YES,
		feature: 'Invoices and reminders',
		pro: YES,
		starter: YES,
	},
	{
		business: YES,
		feature: 'Marketplace and messaging channels',
		pro: YES,
		starter: NO,
	},
	{
		business: YES,
		feature: 'Automations',
		pro: '50 rules',
		starter: NO,
	},
	{
		business: YES,
		feature: 'Reports and CSV export',
		pro: YES,
		starter: 'Basic',
	},
	{
		business: YES,
		feature: 'Roles and permissions',
		pro: YES,
		starter: NO,
	},
	{
		business: YES,
		feature: 'SSO and audit trail',
		pro: NO,
		starter: NO,
	},
	{
		business: YES,
		feature: 'API access',
		pro: 'Read only',
		starter: NO,
	},
	{
		business: 'Dedicated manager',
		feature: 'Support',
		pro: 'Chat, business hours',
		starter: 'Email',
	},
]

/**
 * Column widths are shares, sized in pixels so they can also set a floor: the
 * feature names take 260, each plan 150, so the three plan columns are equal
 * at any width. `layoutWidth` is their sum — below it (a phone) the table
 * scrolls sideways instead of crushing the plans, and the feature column is
 * pinned (`sticky: 'left'`) so every row keeps its name while the plans
 * scroll under it.
 */
const FEATURE_WIDTH = 260
const PLAN_WIDTH = 150
function ComparisonTable() {
	return (
		<Table
			columns={[
				{
					key: 'feature',
					label: 'Feature',
					sticky: 'left',
					width: FEATURE_WIDTH,
				},
				{
					align: 'center',
					key: 'starter',
					label: 'Starter',
					selector: (row) => row.starter,
					width: PLAN_WIDTH,
				},
				{
					align: 'center',
					key: 'pro',
					label: 'Pro',
					selector: (row) => row.pro,
					width: PLAN_WIDTH,
				},
				{
					align: 'center',
					key: 'business',
					label: 'Business',
					selector: (row) => row.business,
					width: PLAN_WIDTH,
				},
			]}
			itemKey="feature"
			items={COMPARISON}
			layoutWidth={FEATURE_WIDTH + PLAN_WIDTH * 3}
		/>
	)
}

function Tiers({ compare = false }: { compare?: boolean }) {
	return (
		<Flex
			direction="col"
			gap="xl"
		>
			<SectionHeading
				description="Every plan starts with 14 days free. Prices in reais, taxes included, no setup fee."
				eyebrow="Pricing"
				title="Pay for the size of your team"
			/>
			{/* Prices are reais, written the Brazilian way; the copy stays English. */}
			<FormatProvider
				format={{
					currency: 'brl',
					locale: 'pt-BR',
				}}
			>
				<TierCards />
			</FormatProvider>
			{compare ? (
				<Collapsible>
					<Flex
						direction="col"
						gap="lg"
					>
						<Flex justify="center">
							<Collapsible.Trigger asChild>
								<Button
									rightSection={<ChevronDownIcon />}
									variant="ghost"
								>
									Compare every feature
								</Button>
							</Collapsible.Trigger>
						</Flex>
						<Collapsible.Panel>
							<ComparisonTable />
						</Collapsible.Panel>
					</Flex>
				</Collapsible>
			) : null}
		</Flex>
	)
}

export function Pricing({
	compare = false,
	id,
	variant,
}: {
	compare?: boolean
	id?: string
	variant: PricingVariant
}) {
	return (
		<Section id={id}>
			{variant === 'tiers' ? (
				<Tiers compare={compare} />
			) : (
				<Flex
					direction="col"
					gap="xl"
				>
					<SectionHeading
						description="Every limit and every feature, plan by plan."
						eyebrow="Pricing"
						title="Compare the plans"
					/>
					<ComparisonTable />
				</Flex>
			)}
		</Section>
	)
}
