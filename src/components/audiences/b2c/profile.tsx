import {
	ChevronRightIcon,
	CreditCardIcon,
	CrownIcon,
	HeartIcon,
	type IconComponent,
	LifeBuoyIcon,
	LogOutIcon,
	MapPinIcon,
	ReceiptIcon,
	SettingsIcon,
	TicketIcon,
	UserPlusIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Layout,
	List,
	Rating,
	Stat,
	Tabs,
	Typography,
} from '@turystack/react-web'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { CUSTOMER, STORES } from '@/components/audiences/b2c/data'
import { SectionHeading, StoreCard } from '@/components/audiences/b2c/parts'

/**
 * A person, as they see themselves and as others see them.
 *
 * - `account-hub` — "Account" in a delivery app: who you are at the top,
 *   then a menu of destinations — orders, addresses, payment, coupons, help.
 *   It edits nothing itself; every row goes somewhere
 * - `public` — the same person seen by someone else: what they chose to
 *   publish, their reviews and lists, and a way to follow them
 */
export type ProfileVariant = 'account-hub' | 'public'

type Destination = {
	badge?: string
	description: string
	icon: IconComponent
	id: string
	label: string
}

const DESTINATIONS: Destination[] = [
	{
		description: 'Track, reorder and get help with an order',
		icon: ReceiptIcon,
		id: 'orders',
		label: 'Orders',
	},
	{
		description: 'Home, Work and 1 more',
		icon: MapPinIcon,
		id: 'addresses',
		label: 'Addresses',
	},
	{
		description: 'PIX and a card ending 4242',
		icon: CreditCardIcon,
		id: 'payment',
		label: 'Payment methods',
	},
	{
		badge: '3 available',
		description: 'Discounts you can use at checkout',
		icon: TicketIcon,
		id: 'coupons',
		label: 'Coupons',
	},
	{
		description: '12 stores and 4 dishes',
		icon: HeartIcon,
		id: 'favourites',
		label: 'Favourites',
	},
	{
		badge: 'Member',
		description: 'Free delivery over R$ 30\u00a0· renews 14 Oct',
		icon: CrownIcon,
		id: 'one',
		label: 'Acme One',
	},
	{
		description: 'Notifications, privacy, language',
		icon: SettingsIcon,
		id: 'settings',
		label: 'Settings',
	},
	{
		description: 'Chat with us about an order or your account',
		icon: LifeBuoyIcon,
		id: 'help',
		label: 'Help',
	},
]

function DestinationRow({ item }: { item: Destination }) {
	return (
		<Card
			ariaLabel={item.label}
			href={`#${item.id}`}
			size="sm"
		>
			<Card.Content>
				<Flex
					align="center"
					gap="md"
				>
					<item.icon size={20} />
					<Box
						grow
						overflow="hidden"
					>
						<Flex
							align="center"
							gap="sm"
						>
							<Typography
								component="span"
								size="sm"
								weight="semibold"
							>
								{item.label}
							</Typography>
							{item.badge && (
								<Badge
									size="sm"
									variant="success"
								>
									{item.badge}
								</Badge>
							)}
						</Flex>
						<Typography
							component="p"
							size="xs"
							truncate
							variant="muted"
						>
							{item.description}
						</Typography>
					</Box>
					<ChevronRightIcon size={16} />
				</Flex>
			</Card.Content>
		</Card>
	)
}

function AccountHub() {
	return (
		<ConsumerShell>
			<Layout.Content maxWidth="md">
				<Flex
					align="stretch"
					direction="col"
					gap="lg"
				>
					<Flex
						align="center"
						gap="md"
						justify="between"
						wrap="wrap"
					>
						<Flex
							align="center"
							gap="md"
						>
							<Avatar
								alt={CUSTOMER.name}
								size="lg"
							>
								{CUSTOMER.initials}
							</Avatar>
							<Flex
								align="stretch"
								direction="col"
								gap="none"
							>
								<Typography
									component="h1"
									size="2xl"
									weight="bold"
								>
									{CUSTOMER.name}
								</Typography>
								<Typography
									component="p"
									size="sm"
									variant="muted"
								>
									{CUSTOMER.email}&nbsp;· +55 11 98765-4321
								</Typography>
							</Flex>
						</Flex>
						<Button
							size="sm"
							variant="outline"
						>
							Edit profile
						</Button>
					</Flex>
					<Grid
						cols={3}
						gap="md"
					>
						<Card size="sm">
							<Card.Content>
								<Stat
									hint="Since March 2023"
									label="Orders"
									value="148"
								/>
							</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>
								<Stat
									hint="With Acme One this year"
									label="Saved on delivery"
									value="R$ 412,60"
								/>
							</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>
								<Stat
									hint="Expires 31 Dec"
									label="Acme credit"
									value="R$ 30,00"
								/>
							</Card.Content>
						</Card>
					</Grid>
					<List
						gap="sm"
						itemKey="id"
						items={DESTINATIONS}
						renderItem={(item) => <DestinationRow item={item} />}
					/>
					<Flex>
						<Button
							leftSection={<LogOutIcon size={16} />}
							variant="ghost"
						>
							Sign out
						</Button>
					</Flex>
				</Flex>
			</Layout.Content>
		</ConsumerShell>
	)
}

const REVIEWS = [
	{
		date: '12 Sep',
		id: 'r1',
		rating: 5,
		store: STORES[1],
		text: 'The margherita is the best in the neighbourhood: thin, blistered, and it arrived hot. The burrata one is worth the extra.',
	},
	{
		date: '3 Sep',
		id: 'r2',
		rating: 4,
		store: STORES[0],
		text: 'Croissants are excellent. The brunch box was generous, but the juice came warm — order it separately.',
	},
	{
		date: '28 Aug',
		id: 'r3',
		rating: 5,
		store: STORES[5],
		text: 'Proper espresso, delivered in ten minutes, and they remembered no sugar. Rare.',
	},
]

function PublicProfile() {
	return (
		<ConsumerShell>
			<Layout.Content maxWidth="lg">
				<Flex
					align="stretch"
					direction="col"
					gap="xl"
				>
					<Box
						bg="muted"
						padding="xl"
						rounded="xl"
					>
						<Flex
							align="end"
							gap="lg"
							justify="between"
							wrap="wrap"
						>
							<Flex
								align="center"
								gap="lg"
							>
								<Avatar
									alt="Rafael Nunes"
									size="lg"
								>
									RN
								</Avatar>
								<Flex
									align="stretch"
									direction="col"
									gap="xs"
								>
									<Typography
										component="span"
										size="xs"
										variant="muted"
										weight="medium"
									>
										PUBLIC PROFILE
									</Typography>
									<Typography
										component="h1"
										size="4xl"
										weight="bold"
									>
										Rafael Nunes
									</Typography>
									<Typography
										component="p"
										size="sm"
										variant="muted"
									>
										Eats his way through Pinheiros&nbsp;· 128 reviews&nbsp;· 2,4
										mil followers
									</Typography>
								</Flex>
							</Flex>
							<Flex
								align="center"
								gap="sm"
							>
								<Button leftSection={<UserPlusIcon size={16} />}>Follow</Button>
								<Button variant="outline">Share</Button>
							</Flex>
						</Flex>
					</Box>
					<Tabs defaultValue="reviews">
						<Tabs.List
							ariaLabel="Profile content"
							block
							justified={false}
						>
							<Tabs.Trigger value="reviews">Reviews · 128</Tabs.Trigger>
							<Tabs.Trigger value="lists">Lists · 6</Tabs.Trigger>
							<Tabs.Trigger value="photos">Photos</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="reviews">
							<Grid
								cols={3}
								gap="lg"
							>
								<Grid.Item span={2}>
									<List
										divided
										gap="md"
										itemKey="id"
										items={REVIEWS}
										renderItem={(review) => (
											<Flex
												align="start"
												gap="md"
											>
												<Avatar
													alt={review.store.name}
													size="md"
													variant="square"
												>
													{review.store.initials}
												</Avatar>
												<Flex
													align="stretch"
													direction="col"
													gap="xs"
												>
													<Flex
														align="center"
														gap="sm"
													>
														<Typography
															component="span"
															size="sm"
															weight="semibold"
														>
															{review.store.name}
														</Typography>
														<Typography
															component="span"
															size="xs"
															variant="muted"
														>
															{review.date}
														</Typography>
													</Flex>
													<Rating
														ariaLabel={`${review.rating} of 5 stars`}
														readOnly
														size={14}
														value={review.rating}
													/>
													<Typography
														component="p"
														size="sm"
													>
														{review.text}
													</Typography>
												</Flex>
											</Flex>
										)}
									/>
								</Grid.Item>
								<Flex
									align="stretch"
									direction="col"
									gap="md"
								>
									<SectionHeading title="Favourite places" />
									{STORES.slice(0, 2).map((store) => (
										<StoreCard
											key={store.id}
											store={store}
										/>
									))}
								</Flex>
							</Grid>
						</Tabs.Content>
					</Tabs>
				</Flex>
			</Layout.Content>
		</ConsumerShell>
	)
}

export function Profile({ variant }: { variant: ProfileVariant }) {
	return variant === 'public' ? <PublicProfile /> : <AccountHub />
}
