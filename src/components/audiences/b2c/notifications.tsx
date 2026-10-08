import {
	BellOffIcon,
	BikeIcon,
	CircleCheckIcon,
	type IconComponent,
	MessageCircleIcon,
	PhoneIcon,
	ReceiptIcon,
	ShieldCheckIcon,
	StarIcon,
	TicketIcon,
	TruckIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	DescriptionList,
	EmptyState,
	Flex,
	Grid,
	Layout,
	Page,
	Progress,
	Separator,
	Timeline,
	Typography,
} from '@turystack/react-web'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { STORES } from '@/components/audiences/b2c/data'
import {
	SectionHeading,
	Shelf,
	StoreCard,
} from '@/components/audiences/b2c/parts'
import {
	daysAgo,
	InboxBell,
	type InboxCategory,
	type InboxEntry,
	minutesAgo,
	NotificationInbox,
	useNotificationInbox,
} from '@/components/audiences/notification-inbox'

/**
 * What happened that needs attention.
 *
 * - `popover` — the latest few from the bell, over whatever page is open
 * - `popover-empty` — the same bell with nothing new: no count, "all caught up"
 * - `sheet` — "View all" as a side sheet over the page, filterable
 * - `page` — the whole inbox, grouped by day, filterable by kind
 * - `live-status` — an order in flight. It is not an item in the inbox: it
 *   is a banner across the whole shell that stays until the food arrives,
 *   and a tracker page with the courier, the steps and the ETA
 *
 * Everything but the live status is react-web's NotificationCenter,
 * NotificationFilter and NotificationList over one inbox in local state:
 * opening a notification or its "…" menu marks it read or unread, mutes its
 * topic (never a security one) or deletes it, and the bell's count follows.
 */
export type NotificationsVariant =
	| 'popover'
	| 'popover-empty'
	| 'sheet'
	| 'page'
	| 'live-status'

type NoticeKind = 'order' | 'offer' | 'account' | 'security'

type Notice = {
	at: Date
	icon: IconComponent
	id: string
	kind: NoticeKind
	text: string
	title: string
	/** What the row's "Mute" silences: one topic, not the whole kind. */
	topic: string
	unread: boolean
}

const CATEGORIES: InboxCategory[] = [
	{
		label: 'Orders',
		value: 'order',
	},
	{
		label: 'Offers',
		value: 'offer',
	},
	{
		label: 'Account',
		value: 'account',
	},
	{
		label: 'Security',
		value: 'security',
	},
]

const NOTICES: Notice[] = [
	{
		at: minutesAgo(6),
		icon: TruckIcon,
		id: 'n1',
		kind: 'order',
		text: 'Rafael picked up your order from Padaria Aurora.',
		title: 'Your order is on its way',
		topic: 'order_picked_up',
		unread: true,
	},
	{
		at: minutesAgo(200),
		icon: TicketIcon,
		id: 'n2',
		kind: 'offer',
		text: 'WEEKEND10 takes 10% off orders over R$ 50 until Sunday.',
		title: 'A coupon for the weekend',
		topic: 'coupon_offered',
		unread: true,
	},
	{
		at: minutesAgo(250),
		icon: StarIcon,
		id: 'n3',
		kind: 'order',
		text: 'How was Forno Vila Madalena? Your rating helps other people choose.',
		title: 'Rate yesterday’s order',
		topic: 'order_rating_requested',
		unread: false,
	},
	{
		at: daysAgo(1, 19, 40),
		icon: ReceiptIcon,
		id: 'n4',
		kind: 'order',
		text: 'Forno Vila Madalena · R$ 86,40 paid with PIX.',
		title: 'Order delivered',
		topic: 'order_delivered',
		unread: false,
	},
	{
		at: daysAgo(3, 10, 15),
		icon: CircleCheckIcon,
		id: 'n5',
		kind: 'account',
		text: 'R$ 30,00 of credit for the missing croissants is in your account.',
		title: 'Your report was resolved',
		topic: 'report_resolved',
		unread: false,
	},
	{
		at: daysAgo(4, 18, 5),
		icon: BikeIcon,
		id: 'n6',
		kind: 'offer',
		text: 'Grão Torrado Café now delivers to Rua Harmonia in 10–15 min.',
		title: 'A new favourite is nearby',
		topic: 'store_nearby',
		unread: false,
	},
]

/** The older pages the inbox's infinite list fetches near its end. */
const OLDER_NOTICES: Notice[] = [
	{
		at: daysAgo(6, 12, 30),
		icon: ReceiptIcon,
		id: 'n7',
		kind: 'order',
		text: 'Padaria Aurora · R$ 48,90 paid with PIX.',
		title: 'Order delivered',
		topic: 'order_delivered',
		unread: false,
	},
	{
		at: daysAgo(8, 9, 0),
		icon: TicketIcon,
		id: 'n8',
		kind: 'offer',
		text: 'Free delivery on your next three orders from Mercado Pinheiros.',
		title: 'Free delivery, three times',
		topic: 'coupon_offered',
		unread: false,
	},
	{
		at: daysAgo(9, 21, 10),
		icon: ShieldCheckIcon,
		id: 'n9',
		kind: 'security',
		text: 'A new sign-in from Chrome on macOS, in São Paulo.',
		title: 'New sign-in to your account',
		topic: 'new_sign_in',
		unread: false,
	},
	{
		at: daysAgo(12, 13, 45),
		icon: ReceiptIcon,
		id: 'n10',
		kind: 'order',
		text: 'Forno Vila Madalena · R$ 64,00 paid with a card.',
		title: 'Order delivered',
		topic: 'order_delivered',
		unread: false,
	},
	{
		at: daysAgo(14, 8, 20),
		icon: CircleCheckIcon,
		id: 'n11',
		kind: 'account',
		text: 'Your address Rua Harmonia, 412 is now the default.',
		title: 'Delivery address saved',
		topic: 'address_saved',
		unread: false,
	},
	{
		at: daysAgo(16, 17, 55),
		icon: StarIcon,
		id: 'n12',
		kind: 'order',
		text: 'Grão Torrado Café thanked you for your 5-star rating.',
		title: 'Your rating was read',
		topic: 'rating_read',
		unread: false,
	},
]

/** A notice as the notification components read it: its icon in an avatar. */
function toEntry(notice: Notice): InboxEntry {
	return {
		at: notice.at,
		description: notice.text,
		id: notice.id,
		kind: notice.kind,
		media: (
			<Avatar
				alt=""
				size="md"
			>
				<notice.icon size={16} />
			</Avatar>
		),
		read: !notice.unread,
		title: notice.title,
		topic: notice.topic,
	}
}

const ENTRIES = NOTICES.map(toEntry)

const OLDER_ENTRIES = OLDER_NOTICES.map(toEntry)

/** The home page the bell opens over. */
function Home() {
	return (
		<Layout.Content maxWidth="lg">
			<Flex
				align="stretch"
				direction="col"
				gap="xl"
			>
				<Box paddingX="lg">
					<Page.Header
						description="Delivering to Rua Harmonia, 412 — Vila Madalena"
						title="Good afternoon, Marina"
					/>
				</Box>
				<Shelf
					subtitle="The places you order from most"
					title="Order again"
				>
					{STORES.map((store) => (
						<StoreCard
							key={store.id}
							store={store}
						/>
					))}
				</Shelf>
			</Flex>
		</Layout.Content>
	)
}

/** The bell and the inbox page over one inbox, so either one's changes show in both. */
function InboxScreen({
	variant,
}: {
	variant: Exclude<NotificationsVariant, 'live-status'>
}) {
	const empty = variant === 'popover-empty'
	const inbox = useNotificationInbox({
		categories: CATEGORIES,
		initial: empty ? [] : ENTRIES,
		older: empty ? [] : OLDER_ENTRIES,
	})

	return (
		<ConsumerShell
			extra={
				<InboxBell
					emptySection={
						<EmptyState
							description="Order updates and offers for you land here."
							icon={<BellOffIcon size={20} />}
							size="sm"
							title="You’re all caught up"
						/>
					}
					inbox={inbox}
					openOnMount={
						variant === 'page'
							? undefined
							: variant === 'sheet'
								? 'sheet'
								: 'popover'
					}
					triggerSize="md"
					triggerVariant="outline"
					viewAll={
						variant === 'sheet'
							? 'sheet'
							: {
									href: '#notifications',
								}
					}
				/>
			}
		>
			{variant === 'page' ? (
				<Layout.Content maxWidth="md">
					<NotificationInbox
						description="Orders, offers, your account and its security, newest first."
						inbox={inbox}
						searchPlaceholder="Search notifications"
					/>
				</Layout.Content>
			) : (
				<Home />
			)}
		</ConsumerShell>
	)
}

function LiveStatus() {
	return (
		<ConsumerShell
			active="orders"
			banner={
				<Alert
					layout="banner"
					variant="info"
				>
					<Alert.Icon>
						<TruckIcon />
					</Alert.Icon>
					<Alert.Title>On its way · arrives 12:40</Alert.Title>
					<Alert.Description>
						Rafael is 1.2 km away with your Padaria Aurora order.
					</Alert.Description>
					<Alert.Action>
						<Button
							size="sm"
							variant="outline"
						>
							Track
						</Button>
					</Alert.Action>
				</Alert>
			}
		>
			<Layout.Content maxWidth="lg">
				<Grid
					cols={5}
					gap="lg"
				>
					<Grid.Item span={3}>
						<Flex
							align="stretch"
							direction="col"
							gap="lg"
						>
							<Flex
								align="stretch"
								direction="col"
								gap="xs"
							>
								<Flex
									align="center"
									gap="sm"
								>
									<Badge variant="info">Out for delivery</Badge>
									<Typography
										component="span"
										size="sm"
										variant="muted"
									>
										Order #4821&nbsp;· Padaria Aurora
									</Typography>
								</Flex>
								<Typography
									component="h1"
									size="4xl"
									weight="bold"
								>
									Arriving at 12:40
								</Typography>
								<Typography
									component="p"
									variant="muted"
								>
									About 9 minutes. We will tell you when Rafael is at the door.
								</Typography>
							</Flex>
							<Progress
								ariaLabel="Delivery progress: arriving at 12:40"
								size="md"
								value={72}
							/>
							<Card>
								<Card.Content>
									<Timeline>
										<Timeline.Item
											meta="12:02"
											status="done"
											title="Order confirmed by Padaria Aurora"
										/>
										<Timeline.Item
											meta="12:06"
											status="done"
											title="Being prepared"
										/>
										<Timeline.Item
											meta="12:24"
											status="done"
											title="Picked up by Rafael"
										/>
										<Timeline.Item
											meta="Now"
											status="current"
											title="On the way to Rua Harmonia, 412"
										/>
										<Timeline.Item
											meta="12:40"
											status="pending"
											title="Delivered"
										/>
									</Timeline>
								</Card.Content>
							</Card>
						</Flex>
					</Grid.Item>
					<Grid.Item span={2}>
						<Flex
							align="stretch"
							direction="col"
							gap="md"
						>
							<Card>
								<Card.Content>
									<Flex
										align="stretch"
										direction="col"
										gap="md"
									>
										<Flex
											align="center"
											gap="sm"
										>
											<Avatar
												alt="Rafael Souza"
												size="lg"
											>
												RS
											</Avatar>
											<Flex
												align="stretch"
												direction="col"
												gap="none"
											>
												<Typography
													component="span"
													weight="semibold"
												>
													Rafael Souza
												</Typography>
												<Typography
													component="span"
													size="sm"
													variant="muted"
												>
													Motorbike&nbsp;· FJX-2B41&nbsp;· ★ 4.9
												</Typography>
											</Flex>
										</Flex>
										<Grid
											cols={2}
											gap="sm"
										>
											<Button
												leftSection={<MessageCircleIcon size={16} />}
												variant="outline"
											>
												Message
											</Button>
											<Button
												leftSection={<PhoneIcon size={16} />}
												variant="outline"
											>
												Call
											</Button>
										</Grid>
										<Separator />
										<Flex
											align="stretch"
											direction="col"
											gap="none"
										>
											<Typography
												component="span"
												size="xs"
												variant="muted"
											>
												Delivery code — say it at the door
											</Typography>
											<Typography
												component="span"
												size="2xl"
												weight="bold"
											>
												4 7 1 9
											</Typography>
										</Flex>
									</Flex>
								</Card.Content>
							</Card>
							<SectionHeading title="Your order" />
							<DescriptionList
								dividers
								items={[
									{
										label: '4 × Butter croissant',
										value: 'R$ 30,00',
									},
									{
										label: '1 × Country loaf',
										value: 'R$ 18,90',
									},
									{
										label: 'Delivery',
										value: 'Free',
									},
									{
										label: 'Paid with PIX',
										value: 'R$ 48,90',
									},
								]}
								layout="inline"
							/>
							<Button
								href="#"
								variant="link"
							>
								Get help with this order
							</Button>
						</Flex>
					</Grid.Item>
				</Grid>
			</Layout.Content>
		</ConsumerShell>
	)
}

export function Notifications({ variant }: { variant: NotificationsVariant }) {
	if (variant === 'live-status') {
		return <LiveStatus />
	}

	return <InboxScreen variant={variant} />
}
