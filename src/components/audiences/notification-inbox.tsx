import { CheckCheckIcon, EllipsisIcon } from '@turystack/react-icons'
import {
	Button,
	Card,
	DropdownMenu,
	EmptyState,
	Flex,
	FormatProvider,
	Grid,
	NotificationCenter,
	type NotificationCenterTriggerSize,
	type NotificationCenterTriggerVariant,
	type NotificationCenterViewAll,
	NotificationFilter,
	type NotificationFilterStatus,
	type NotificationItem,
	NotificationList,
	Page,
	Typography,
	toast,
} from '@turystack/react-web'
import { type ReactNode, useEffect, useRef, useState } from 'react'

/**
 * The notification plumbing the Backoffice, B2B and B2C audiences share: one
 * piece of local state (what is read, muted, deleted, loaded), the bell every
 * shell puts in its header, and the inbox page. Each audience brings its own
 * notifications, kinds and shell; everything painted is react-web's
 * NotificationCenter, NotificationFilter and NotificationList.
 */

/**
 * One notification as these screens keep it: react-web's `NotificationItem`
 * plus its category (`kind`, the filter's chip) and its topic (what the row's
 * "Mute" silences — "Payout paid", not every payout), with a plain-text title
 * and description so the search can match them.
 */
export type InboxEntry = NotificationItem & {
	description?: string
	kind: string
	title: string
	topic: string
}

export type InboxCategory = {
	label: string // plural, as the filter chip reads it: "Payouts"
	value: string // the entry kind it collects
}

/**
 * The category whose notifications cannot be muted — a new sign-in has to
 * reach the person — so its rows offer no "Mute".
 */
const UNMUTABLE_KIND = 'security'

/** A moment `days` back at `hours:minutes` — so "Today" is always today. */
export function daysAgo(days: number, hours: number, minutes = 0): Date {
	const at = new Date()
	at.setDate(at.getDate() - days)
	at.setHours(hours, minutes, 0, 0)
	return at
}

/** A moment `minutes` before the screen was opened. */
export function minutesAgo(minutes: number): Date {
	return new Date(Date.now() - minutes * 60_000)
}

/**
 * Every notification component here reads times in English words and a 24-hour
 * clock ("5 minutes ago", "Yesterday, 14:30", "22 Sept, 09:00"), matching the
 * copy around them — even inside the Backoffice, whose FormatProvider writes
 * its amounts the Brazilian way.
 */
const NOTIFICATION_FORMAT = {
	locale: 'en-GB',
} as const

const LOAD_MORE_DELAY_MS = 800

export type NotificationInboxState = {
	categories: InboxCategory[]
	hasMore: boolean
	items: InboxEntry[]
	loadingMore: boolean
	loadMore: () => void
	markAllRead: () => void
	markRead: (id: string, read?: boolean) => void
	mute: (topic: string) => void
	remove: (id: string) => void
	unreadCount: number
}

/**
 * The inbox as a server would hold it, faked in memory: `initial` is the first
 * page, `older` the pages the infinite list fetches — `pageSize` at a time,
 * after a short wait — as the reader scrolls towards the end.
 */
export function useNotificationInbox({
	categories = [],
	initial,
	older = [],
	pageSize = 3,
}: {
	categories?: InboxCategory[]
	initial: InboxEntry[]
	older?: InboxEntry[]
	pageSize?: number
}): NotificationInboxState {
	const [loaded, setLoaded] = useState(initial)
	const [pending, setPending] = useState(older)
	const [loadingMore, setLoadingMore] = useState(false)
	const [muted, setMuted] = useState<string[]>([])
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

	useEffect(() => () => clearTimeout(timer.current), [])

	// A muted topic leaves the inbox, the rows already in it included.
	const items = loaded.filter((entry) => !muted.includes(entry.topic))

	return {
		categories,
		hasMore: pending.length > 0,
		items,
		loadingMore,
		loadMore: () => {
			if (loadingMore || pending.length === 0) {
				return
			}
			setLoadingMore(true)
			timer.current = setTimeout(() => {
				setLoaded((current) => [
					...current,
					...pending.slice(0, pageSize),
				])
				setPending((current) => current.slice(pageSize))
				setLoadingMore(false)
			}, LOAD_MORE_DELAY_MS)
		},
		markAllRead: () =>
			setLoaded((current) =>
				current.map((entry) => ({
					...entry,
					read: true,
				})),
			),
		markRead: (id, read = true) =>
			setLoaded((current) =>
				current.map((entry) =>
					entry.id === id
						? {
								...entry,
								read,
							}
						: entry,
				),
			),
		mute: (topic) => {
			setMuted((current) => [
				...current,
				topic,
			])
			toast.success('Notifications like this muted', {
				description:
					'The ones already here leave too. Others of this kind still arrive.',
			})
		},
		remove: (id) => {
			setLoaded((current) => current.filter((entry) => entry.id !== id))
			toast.success('Notification deleted')
		},
		unreadCount: items.filter((entry) => !entry.read).length,
	}
}

/** A row's own "…" menu: read or unread, mute its topic, delete it. */
function EntryActions({
	entry,
	inbox,
}: {
	entry: NotificationItem
	inbox: NotificationInboxState
}) {
	const listed = inbox.items.find((item) => item.id === entry.id)

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`Actions for “${String(entry.title)}”`}
					size="icon-sm"
					variant="ghost"
				>
					<EllipsisIcon size={16} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={220}
			>
				<DropdownMenu.Item
					onClick={() => inbox.markRead(entry.id, !entry.read)}
				>
					{entry.read ? 'Mark as unread' : 'Mark as read'}
				</DropdownMenu.Item>
				{listed && listed.kind !== UNMUTABLE_KIND ? (
					<DropdownMenu.Item onClick={() => inbox.mute(listed.topic)}>
						Mute notifications like this
					</DropdownMenu.Item>
				) : null}
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					onClick={() => inbox.remove(entry.id)}
					variant="destructive"
				>
					Delete
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/** Opens the bell's popover on mount, or — for `sheet` — its whole-inbox sheet. */
export type InboxBellOpen = 'popover' | 'sheet'

/**
 * The header bell of a shell: react-web's NotificationCenter over the inbox
 * state. Clicking a notification marks it read (the app's decision, not the
 * component's); the sheet's rows carry the same "…" menu as the inbox page.
 */
export function InboxBell({
	emptySection,
	inbox,
	openOnMount,
	triggerSize,
	triggerVariant,
	viewAll = {
		href: '#notifications',
	},
}: {
	emptySection?: ReactNode
	inbox: NotificationInboxState
	openOnMount?: InboxBellOpen
	triggerSize?: NotificationCenterTriggerSize
	triggerVariant?: NotificationCenterTriggerVariant
	viewAll?: NotificationCenterViewAll
}) {
	const [open, setOpen] = useState(false)
	const [sheetOpen, setSheetOpen] = useState(false)

	// Open after the click that mounted the screen, or that click closes it.
	useEffect(() => {
		if (!openOnMount) {
			return
		}
		const timer = setTimeout(
			() =>
				openOnMount === 'sheet' && viewAll === 'sheet'
					? setSheetOpen(true)
					: setOpen(true),
			300,
		)
		return () => clearTimeout(timer)
	}, [
		openOnMount,
		viewAll,
	])

	return (
		<FormatProvider format={NOTIFICATION_FORMAT}>
			<NotificationCenter
				emptySection={emptySection}
				endReachedSection={<EndOfInbox />}
				hasMore={inbox.hasMore}
				itemActions={(entry) => (
					<EntryActions
						entry={entry}
						inbox={inbox}
					/>
				)}
				items={inbox.items}
				loadingMore={inbox.loadingMore}
				onItemClick={(entry) => inbox.markRead(entry.id)}
				onLoadMore={inbox.loadMore}
				onMarkAllRead={inbox.markAllRead}
				onOpenChange={setOpen}
				onSheetOpenChange={setSheetOpen}
				open={open}
				sheetOpen={sheetOpen}
				triggerSize={triggerSize}
				triggerVariant={triggerVariant}
				viewAll={viewAll}
			/>
		</FormatProvider>
	)
}

/** Under the last page, in the bell's sheet and on the inbox page alike. */
function EndOfInbox() {
	return (
		<Typography
			align="center"
			size="xs"
			variant="muted"
		>
			That is everything.
		</Typography>
	)
}

function matches(entry: InboxEntry, query: string): boolean {
	const needle = query.trim().toLowerCase()
	return (
		needle === '' ||
		entry.title.toLowerCase().includes(needle) ||
		(entry.description ?? '').toLowerCase().includes(needle)
	)
}

/**
 * The notifications page: the page header with "Mark all as read", and a card
 * holding the filter (status with counts, a search that filters as you type,
 * the kinds as a category chip) over the list grouped by day, with each row's
 * "…" menu and older pages loading as the end nears. `aside` puts a second
 * column beside it — delivery settings, say.
 */
export function NotificationInbox({
	actions,
	aside,
	description,
	inbox,
	searchPlaceholder,
}: {
	actions?: ReactNode // buttons before "Mark all as read"
	aside?: ReactNode // a column beside the inbox from md up
	description?: ReactNode // the line under the page title
	inbox: NotificationInboxState
	searchPlaceholder?: string
}) {
	const [status, setStatus] = useState<NotificationFilterStatus>('all')
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState<string>()

	const scoped = inbox.items.filter(
		(entry) => matches(entry, query) && (!category || entry.kind === category),
	)
	const unread = scoped.filter((entry) => !entry.read)
	const shown = status === 'unread' ? unread : scoped
	const searching = query.trim() !== ''
	const filtered = searching || Boolean(category)
	const clearLabel = searching
		? category
			? 'Clear search and kind'
			: 'Clear search'
		: 'Show every kind'

	const inboxCard = (
		<Card size="sm">
			<Card.Header bordered>
				<Card.Title headingLevel={2}>Inbox</Card.Title>
				<Card.Description>
					{inbox.unreadCount === 0
						? 'Nothing unread'
						: `${inbox.unreadCount} unread`}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<NotificationFilter
						categories={
							inbox.categories.length > 0 ? inbox.categories : undefined
						}
						category={category}
						counts={{
							all: scoped.length,
							unread: unread.length,
						}}
						onCategoryChange={setCategory}
						onStatusChange={setStatus}
						search={{
							onChange: setQuery,
							placeholder: searchPlaceholder,
							value: query,
						}}
						status={status}
					/>
					<NotificationList
						emptySection={
							filtered ? (
								<EmptyState
									action={
										<Button
											onClick={() => {
												setQuery('')
												setCategory(undefined)
											}}
											size="sm"
											variant="outline"
										>
											{clearLabel}
										</Button>
									}
									description="Try other words, or another kind of notification."
									size="sm"
									title="No notifications match"
								/>
							) : undefined
						}
						endReachedSection={<EndOfInbox />}
						groupBy="day"
						hasMore={inbox.hasMore}
						headingLevel={3}
						itemActions={(entry) => (
							<EntryActions
								entry={entry}
								inbox={inbox}
							/>
						)}
						items={shown}
						loadingMore={inbox.loadingMore}
						onItemClick={(entry) => inbox.markRead(entry.id)}
						onLoadMore={inbox.loadMore}
					/>
				</Flex>
			</Card.Content>
		</Card>
	)

	return (
		<FormatProvider format={NOTIFICATION_FORMAT}>
			<Page>
				<Page.Header
					action={
						<Flex
							align="center"
							gap="sm"
							wrap="wrap"
						>
							{actions}
							<Button
								disabled={inbox.unreadCount === 0}
								leftSection={<CheckCheckIcon size={16} />}
								onClick={inbox.markAllRead}
								size="sm"
								variant="outline"
							>
								Mark all as read
							</Button>
						</Flex>
					}
					description={description}
					title="Notifications"
				/>
				<Page.Content>
					{aside ? (
						<Grid
							align="start"
							cols={{
								base: 1,
								lg: 3,
							}}
							gap="lg"
						>
							<Grid.Item
								span={{
									base: 1,
									lg: 2,
								}}
							>
								{inboxCard}
							</Grid.Item>
							{aside}
						</Grid>
					) : (
						inboxCard
					)}
				</Page.Content>
			</Page>
		</FormatProvider>
	)
}
