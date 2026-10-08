import { BellOffIcon, LinkIcon } from '@turystack/react-icons'
import {
	Alert,
	Button,
	Card,
	EmptyState,
	Flex,
	Layout,
	Switch,
	toast,
} from '@turystack/react-web'
import { useEffect } from 'react'

import { AppShellHome } from './app-shell'
import {
	NOTIFICATION_CATEGORIES,
	NOTIFICATIONS,
	OLDER_NOTIFICATIONS,
} from './notification-data'
import { BackofficeShell, SandboxBanner } from './shell'

import {
	InboxBell,
	NotificationInbox,
	useNotificationInbox,
} from '@/components/audiences/notification-inbox'

/**
 * - `popover`       — the latest few, from the bell in the header
 * - `popover-empty` — the same bell with nothing in it: no count, "all clear"
 * - `sheet`         — "View all" as a side sheet over the page, filterable
 * - `page`          — the whole inbox as a page, with delivery settings
 * - `banner`        — the two other channels: a banner for what needs action,
 *   a toast for what just happened
 *
 * Everything but the banner is react-web's NotificationCenter,
 * NotificationFilter and NotificationList over one inbox held in local state:
 * clicking a notification or its "…" menu marks it read or unread, mutes its
 * topic or deletes it, and the bell's count follows.
 */
export type NotificationsVariant =
	| 'popover'
	| 'popover-empty'
	| 'sheet'
	| 'page'
	| 'banner'

/** What also reaches the operator outside the dashboard. */
function DeliveryCard() {
	return (
		<Card size="sm">
			<Card.Header bordered>
				<Card.Title headingLevel={2}>Delivery</Card.Title>
				<Card.Description>
					What also reaches you outside the dashboard.
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<Switch
						defaultChecked
						description="Evidence is due within 7 days."
						label="Email me new disputes"
					/>
					<Switch
						defaultChecked
						description="After 5 failures in an hour."
						label="Email me failing webhooks"
					/>
					<Switch
						description="One email every Monday."
						label="Weekly payouts summary"
					/>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/** The bell and the inbox page over one inbox, so either one's changes show in both. */
function InboxScreen({ variant }: { variant: NotificationsVariant }) {
	const empty = variant === 'popover-empty'
	const inbox = useNotificationInbox({
		categories: NOTIFICATION_CATEGORIES,
		initial: empty ? [] : NOTIFICATIONS,
		older: empty ? [] : OLDER_NOTIFICATIONS,
	})

	const bell = (
		<InboxBell
			emptySection={
				<EmptyState
					description="Disputes, payouts and failing webhooks land here."
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
			viewAll={
				variant === 'sheet'
					? 'sheet'
					: {
							href: '#notifications',
						}
			}
		/>
	)

	return (
		<BackofficeShell
			active="home"
			bell={bell}
		>
			{variant === 'page' ? (
				<Layout.Content maxWidth="lg">
					<NotificationInbox
						aside={<DeliveryCard />}
						description="Disputes, payouts, webhooks and mentions, newest first."
						inbox={inbox}
						searchPlaceholder="Search notifications"
					/>
				</Layout.Content>
			) : (
				<AppShellHome />
			)}
		</BackofficeShell>
	)
}

/** A problem that needs someone goes in a banner; it stays until it is fixed. */
function ActionBanner() {
	return (
		<Alert
			layout="banner"
			variant="destructive"
		>
			<Alert.Icon>
				<LinkIcon size={16} />
			</Alert.Icon>
			<Alert.Title>Webhook endpoint failing</Alert.Title>
			<Alert.Description>
				12 deliveries to api.acme.example/hooks failed in the last hour. Events
				are retried for 3 days.
			</Alert.Description>
			<Alert.Action>
				<Button
					href="#webhooks"
					size="sm"
					variant="outline"
				>
					Fix endpoint
				</Button>
			</Alert.Action>
		</Alert>
	)
}

/** What just happened is a toast: under 30 characters, then gone. */
function ConfirmationToast() {
	useEffect(() => {
		toast.success('Refund issued', {
			description: 'R$ 749,90 to Lucas Ferreira',
		})
	}, [])

	return null
}

/**
 * Three channels for "something happened", each for one kind of it:
 * the bell for what is new, the inbox for all of it, a banner for a problem
 * that needs someone, and a toast for a confirmation.
 */
export function Notifications({ variant }: { variant: NotificationsVariant }) {
	if (variant === 'banner') {
		return (
			<BackofficeShell
				active="home"
				banner={
					<Flex
						align="stretch"
						direction="col"
						gap="none"
					>
						<SandboxBanner />
						<ActionBanner />
					</Flex>
				}
			>
				<AppShellHome />
				<ConfirmationToast />
			</BackofficeShell>
		)
	}

	return <InboxScreen variant={variant} />
}
