import {
	AlertTriangleIcon,
	BanknoteIcon,
	FileTextIcon,
	LinkIcon,
	MessageSquareIcon,
} from '@turystack/react-icons'
import { Avatar } from '@turystack/react-web'
import type { ReactNode } from 'react'

import {
	daysAgo,
	type InboxCategory,
	type InboxEntry,
	minutesAgo,
} from '@/components/audiences/notification-inbox'

/**
 * What the Backoffice tells its operators: disputes, payouts, failing
 * webhooks, mentions and reports. The bell in the shell and the inbox page
 * read these; each kind is an icon in a square avatar.
 */
export type NotificationKind =
	| 'dispute'
	| 'payout'
	| 'webhook'
	| 'mention'
	| 'report'

export const NOTIFICATION_CATEGORIES: InboxCategory[] = [
	{
		label: 'Disputes',
		value: 'dispute',
	},
	{
		label: 'Payouts',
		value: 'payout',
	},
	{
		label: 'Webhooks',
		value: 'webhook',
	},
	{
		label: 'Mentions',
		value: 'mention',
	},
	{
		label: 'Reports',
		value: 'report',
	},
]

const ICONS: Record<NotificationKind, ReactNode> = {
	dispute: <AlertTriangleIcon size={16} />,
	mention: <MessageSquareIcon size={16} />,
	payout: <BanknoteIcon size={16} />,
	report: <FileTextIcon size={16} />,
	webhook: <LinkIcon size={16} />,
}

function entry(
	kind: NotificationKind,
	fields: Omit<InboxEntry, 'kind' | 'media'>,
): InboxEntry {
	return {
		...fields,
		kind,
		media: (
			<Avatar
				alt=""
				size="sm"
				variant="square"
			>
				{ICONS[kind]}
			</Avatar>
		),
	}
}

/** The first page: today's, yesterday's and this week's. */
export const NOTIFICATIONS: InboxEntry[] = [
	entry('dispute', {
		at: minutesAgo(9),
		description:
			'Lucas Ferreira disputed R$ 749,90. Respond by 3 Oct with evidence.',
		id: 'ntf_1',
		title: 'New dispute on Order #10479',
		topic: 'dispute_opened',
	}),
	entry('webhook', {
		at: minutesAgo(58),
		description:
			'12 deliveries to api.acme.example/hooks failed with 503 in the last hour.',
		id: 'ntf_2',
		title: 'Webhook endpoint is failing',
		topic: 'webhook_failing',
	}),
	entry('payout', {
		at: minutesAgo(170),
		description: 'R$ 48.210,55 arrived in your bank account •••• 0932.',
		id: 'ntf_3',
		title: 'Payout paid',
		topic: 'payout_paid',
	}),
	entry('mention', {
		at: daysAgo(1, 17, 12),
		description:
			'Ana Ribeiro: “Can you check the refund on Order #10477 before Friday?”',
		id: 'ntf_4',
		read: true,
		title: 'Ana Ribeiro mentioned you',
		topic: 'mentioned',
	}),
	entry('report', {
		at: daysAgo(2, 9, 0),
		description: 'The balance summary for August 2026 is ready to download.',
		id: 'ntf_5',
		read: true,
		title: 'Monthly report ready',
		topic: 'monthly_report_ready',
	}),
	entry('payout', {
		at: daysAgo(4, 14, 40),
		description: 'Payouts to account •••• 0932 now arrive in 2 business days.',
		id: 'ntf_6',
		read: true,
		title: 'Payout schedule changed',
		topic: 'payout_schedule_changed',
	}),
]

/** The older pages the infinite list fetches as the reader nears the end. */
export const OLDER_NOTIFICATIONS: InboxEntry[] = [
	entry('dispute', {
		at: daysAgo(6, 11, 5),
		description: 'The bank sided with you on Order #10412. R$ 312,00 returned.',
		id: 'ntf_7',
		read: true,
		title: 'Dispute won',
		topic: 'dispute_won',
	}),
	entry('webhook', {
		at: daysAgo(7, 16, 20),
		description: 'api.acme.example/hooks answers again; 38 events were resent.',
		id: 'ntf_8',
		read: true,
		title: 'Webhook endpoint recovered',
		topic: 'webhook_recovered',
	}),
	entry('mention', {
		at: daysAgo(8, 10, 45),
		description: 'Diego Almeida: “Refund approved, customer notified.”',
		id: 'ntf_9',
		read: true,
		title: 'Diego Almeida replied to you',
		topic: 'replied',
	}),
	entry('payout', {
		at: daysAgo(10, 6, 30),
		description: 'R$ 51.904,10 arrived in your bank account •••• 0932.',
		id: 'ntf_10',
		read: true,
		title: 'Payout paid',
		topic: 'payout_paid',
	}),
	entry('report', {
		at: daysAgo(12, 9, 0),
		description: 'The fee statement for August 2026 is ready to download.',
		id: 'ntf_11',
		read: true,
		title: 'Fee statement ready',
		topic: 'fee_statement_ready',
	}),
	entry('dispute', {
		at: daysAgo(14, 15, 10),
		description: 'Order #10388 · R$ 1.020,00. Evidence was due today.',
		id: 'ntf_12',
		read: true,
		title: 'Dispute closed as lost',
		topic: 'dispute_lost',
	}),
]
