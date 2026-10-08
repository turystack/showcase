import { BellOffIcon, SettingsIcon } from '@turystack/react-icons'
import { Button, EmptyState, Layout } from '@turystack/react-web'

import { HomeOverview } from './app-shell'
import { NOTICE_CATEGORIES } from './crm-data'
import { CrmShell, NOTICE_ENTRIES, OLDER_NOTICE_ENTRIES } from './crm-shell'

import {
	InboxBell,
	NotificationInbox,
	useNotificationInbox,
} from '@/components/audiences/notification-inbox'

/**
 * What needs attention.
 *
 * The bell has three states, and two are shown here open: `popover` with
 * unread items — the count on the bell, the latest notices — and
 * `popover-empty`, a plain bell and a list that says there is nothing to catch
 * up on. (The third, a notice arriving, is the count changing on a closed bell,
 * announced by its label.) `sheet` is "View all" as a side sheet over the
 * page, and `page` the whole inbox, read and unread, filterable by kind.
 *
 * All of it is react-web's NotificationCenter, NotificationFilter and
 * NotificationList over one inbox in local state: opening a notice or its "…"
 * menu marks it read or unread, mutes its topic or deletes it, and the bell's
 * count follows.
 */
export type NotificationsVariant =
	| 'popover'
	| 'popover-empty'
	| 'sheet'
	| 'page'

export function Notifications({ variant }: { variant: NotificationsVariant }) {
	const empty = variant === 'popover-empty'
	const inbox = useNotificationInbox({
		categories: NOTICE_CATEGORIES,
		initial: empty ? [] : NOTICE_ENTRIES,
		older: empty ? [] : OLDER_NOTICE_ENTRIES,
	})

	return (
		<CrmShell
			active="home"
			bell={
				<InboxBell
					emptySection={
						<EmptyState
							description="Mentions, replies and assignments land here."
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
			}
		>
			{variant === 'page' ? (
				<Layout.Content maxWidth="md">
					<NotificationInbox
						actions={
							<Button
								leftSection={<SettingsIcon size={16} />}
								size="sm"
								variant="outline"
							>
								Preferences
							</Button>
						}
						description="Replies, mentions and assignments across your records."
						inbox={inbox}
						searchPlaceholder="Search notices"
					/>
				</Layout.Content>
			) : (
				<HomeOverview />
			)}
		</CrmShell>
	)
}
