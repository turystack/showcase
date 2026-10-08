import { Chart } from '@turystack/react-charts'
import {
	BarChart3Icon,
	LayoutDashboardIcon,
	ReceiptIcon,
	SettingsIcon,
	ShoppingCartIcon,
	UsersIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Card,
	Flex,
	Grid,
	Stat,
	Typography,
} from '@turystack/react-web'

import { AcmeMark } from '@/components/audiences/acme-logo'

/**
 * The hero's "product screenshot".
 *
 * The shot is the product itself, not a picture of it: a small overview
 * screen composed from real components inside a Card. react-web's `Image`
 * could frame a PNG here, but a composition is live, follows the light and
 * dark theme, stays sharp at any width and needs no asset kept in step with
 * the product — and it is honest about being a composition. A product with
 * a real marketing render would swap this Card for
 * `<Image alt="…" loading="eager" ratio="16/9" src={shot} />`.
 *
 * It is a picture of a desktop screen, so its inner columns do not reflow:
 * the navigation rail and the three figures keep their places at any width.
 */

const REVENUE = [
	{
		last: 151_200,
		month: 'Apr',
		revenue: 168_400,
	},
	{
		last: 158_900,
		month: 'May',
		revenue: 181_700,
	},
	{
		last: 162_300,
		month: 'Jun',
		revenue: 204_900,
	},
	{
		last: 171_800,
		month: 'Jul',
		revenue: 226_300,
	},
	{
		last: 176_400,
		month: 'Aug',
		revenue: 251_800,
	},
	{
		last: 183_100,
		month: 'Sep',
		revenue: 284_120,
	},
]

const NAV = [
	{
		icon: LayoutDashboardIcon,
		label: 'Overview',
	},
	{
		icon: ShoppingCartIcon,
		label: 'Orders',
	},
	{
		icon: UsersIcon,
		label: 'Customers',
	},
	{
		icon: ReceiptIcon,
		label: 'Invoices',
	},
	{
		icon: BarChart3Icon,
		label: 'Reports',
	},
	{
		icon: SettingsIcon,
		label: 'Settings',
	},
]

const STATS = [
	{
		label: 'Revenue',
		trend: '+12,4%',
		value: 'R$ 284.120',
	},
	{
		label: 'Orders',
		trend: '+3,1%',
		value: '1.284',
	},
	{
		label: 'New customers',
		trend: '+8,6%',
		value: '316',
	},
]

function formatThousands(value: number) {
	return `R$ ${Math.round(value / 1000)}k`
}

/** `compact` drops the navigation rail, for a narrow column. */
export function ProductShot({ compact = false }: { compact?: boolean }) {
	const stats = compact ? STATS.slice(0, 2) : STATS

	return (
		<Card>
			<Card.Header bordered>
				<Flex
					align="center"
					justify="between"
				>
					<Flex
						align="center"
						gap="sm"
					>
						<AcmeMark size={18} />
						<Typography
							size="sm"
							weight="semibold"
						>
							Acme
						</Typography>
						<Typography
							size="sm"
							variant="muted"
						>
							/ Overview
						</Typography>
					</Flex>
					<Flex
						align="center"
						gap="sm"
					>
						<Badge
							size="sm"
							variant="success"
						>
							Live
						</Badge>
						<Avatar size="sm">MS</Avatar>
					</Flex>
				</Flex>
			</Card.Header>
			<Card.Content>
				<Grid
					cols={compact ? 1 : 4}
					gap="lg"
				>
					{compact ? null : (
						<Flex
							direction="col"
							gap="md"
						>
							{NAV.map(({ icon: Icon, label }, index) => (
								<Typography
									component="div"
									key={label}
									size="sm"
									variant={index === 0 ? 'default' : 'muted'}
									weight={index === 0 ? 'semibold' : 'normal'}
								>
									<Flex
										align="center"
										gap="sm"
									>
										<Icon size={16} />
										{label}
									</Flex>
								</Typography>
							))}
						</Flex>
					)}
					<Grid.Item span={compact ? 1 : 3}>
						<Flex
							direction="col"
							gap="md"
						>
							<Grid
								cols={compact ? 2 : 3}
								gap="md"
							>
								{stats.map((stat) => (
									<Card
										key={stat.label}
										size="sm"
									>
										<Card.Content>
											<Stat
												label={stat.label}
												trend={
													<Badge
														size="sm"
														variant="success"
													>
														{stat.trend}
													</Badge>
												}
												value={stat.value}
											/>
										</Card.Content>
									</Card>
								))}
							</Grid>
							<Chart
								compare={{
									key: 'last',
									label: 'Last year',
								}}
								data={REVENUE}
								emptyText="No revenue yet"
								height="sm"
								loadingText="Loading revenue"
								series={[
									{
										color: 1,
										key: 'revenue',
										label: 'Revenue',
									},
								]}
								title="Revenue by month"
								type="area"
								valueFormat={formatThousands}
								xKey="month"
							/>
						</Flex>
					</Grid.Item>
				</Grid>
			</Card.Content>
		</Card>
	)
}
