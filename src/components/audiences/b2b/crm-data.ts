/**
 * The records every B2B screen reads.
 *
 * One small, consistent CRM: the same deals appear in the list, the board, the
 * record page and the search results, so moving between layouts reads as
 * moving around one product rather than between unrelated mock-ups. Amounts
 * are integer cents, the unit MoneyText expects.
 */

import { daysAgo, minutesAgo } from '@/components/audiences/notification-inbox'

export type DealStage =
	| 'prospecting'
	| 'qualification'
	| 'proposal'
	| 'negotiation'
	| 'closed-won'

export type Person = {
	email: string
	initials: string
	name: string
	title: string
}

export type Deal = {
	account: string
	amount: number
	closeDate: string
	contact: string
	id: string
	name: string
	owner: string
	probability: number
	stage: DealStage
}

export const ME: Person = {
	email: 'marina.costa@acme.example',
	initials: 'MC',
	name: 'Marina Costa',
	title: 'Account Executive',
}

export const STAGES: {
	id: DealStage
	label: string
}[] = [
	{
		id: 'prospecting',
		label: 'Prospecting',
	},
	{
		id: 'qualification',
		label: 'Qualification',
	},
	{
		id: 'proposal',
		label: 'Proposal',
	},
	{
		id: 'negotiation',
		label: 'Negotiation',
	},
	{
		id: 'closed-won',
		label: 'Closed won',
	},
]

export function stageLabel(stage: DealStage): string {
	return STAGES.find((item) => item.id === stage)?.label ?? stage
}

export function stageIndex(stage: DealStage): number {
	return STAGES.findIndex((item) => item.id === stage)
}

export const DEALS: Deal[] = [
	{
		account: 'Northwind Logistics',
		amount: 18_400_000,
		closeDate: '2026-10-30',
		contact: 'Rafael Menezes',
		id: 'D-1042',
		name: 'Northwind — 120 seats, annual',
		owner: 'Marina Costa',
		probability: 60,
		stage: 'proposal',
	},
	{
		account: 'Globex Tours',
		amount: 7_250_000,
		closeDate: '2026-10-14',
		contact: 'Helena Prado',
		id: 'D-1039',
		name: 'Globex — fleet expansion',
		owner: 'Marina Costa',
		probability: 80,
		stage: 'negotiation',
	},
	{
		account: 'Initech Brasil',
		amount: 3_900_000,
		closeDate: '2026-11-20',
		contact: 'Otávio Ramos',
		id: 'D-1051',
		name: 'Initech — onboarding package',
		owner: 'Diego Almeida',
		probability: 20,
		stage: 'qualification',
	},
	{
		account: 'Umbrella Saúde',
		amount: 26_000_000,
		closeDate: '2026-12-05',
		contact: 'Camila Duarte',
		id: 'D-1055',
		name: 'Umbrella — enterprise rollout',
		owner: 'Marina Costa',
		probability: 10,
		stage: 'prospecting',
	},
	{
		account: 'Stark Engenharia',
		amount: 11_500_000,
		closeDate: '2026-09-22',
		contact: 'Bruno Tavares',
		id: 'D-1028',
		name: 'Stark — renewal 2027',
		owner: 'Ana Ribeiro',
		probability: 100,
		stage: 'closed-won',
	},
	{
		account: 'Wayne Varejo',
		amount: 5_600_000,
		closeDate: '2026-10-08',
		contact: 'Juliana Freitas',
		id: 'D-1047',
		name: 'Wayne — 40 new stores',
		owner: 'Diego Almeida',
		probability: 60,
		stage: 'proposal',
	},
	{
		account: 'Hooli Pagamentos',
		amount: 9_800_000,
		closeDate: '2026-11-03',
		contact: 'Lucas Barros',
		id: 'D-1049',
		name: 'Hooli — API tier upgrade',
		owner: 'Ana Ribeiro',
		probability: 20,
		stage: 'qualification',
	},
	{
		account: 'Solano Alimentos',
		amount: 2_400_000,
		closeDate: '2026-12-12',
		contact: 'Patrícia Lopes',
		id: 'D-1057',
		name: 'Solano — pilot, 3 plants',
		owner: 'Marina Costa',
		probability: 10,
		stage: 'prospecting',
	},
	{
		account: 'Vandelay Importação',
		amount: 14_200_000,
		closeDate: '2026-10-21',
		contact: 'Fernando Souza',
		id: 'D-1036',
		name: 'Vandelay — multi-year deal',
		owner: 'Marina Costa',
		probability: 80,
		stage: 'negotiation',
	},
	{
		account: 'Cyberdyne Sistemas',
		amount: 6_300_000,
		closeDate: '2026-09-15',
		contact: 'Renata Gomes',
		id: 'D-1021',
		name: 'Cyberdyne — support add-on',
		owner: 'Diego Almeida',
		probability: 100,
		stage: 'closed-won',
	},
]

/** The deal the record page, the preview and the path are about. */
export const FOCUS_DEAL = DEALS[0] as Deal

export type ActivityKind =
	| 'call'
	| 'email'
	| 'meeting'
	| 'note'
	| 'task'
	| 'stage'

export type Activity = {
	at: string
	by: string
	detail: string
	id: string
	kind: ActivityKind
	record: string
	title: string
}

export const ACTIVITIES: Activity[] = [
	{
		at: '2026-09-25T16:40:00',
		by: 'Marina Costa',
		detail: 'Sent the revised proposal with the 12-month ramp.',
		id: 'a1',
		kind: 'email',
		record: 'Northwind — 120 seats, annual',
		title: 'Email: Revised proposal v3',
	},
	{
		at: '2026-09-25T11:15:00',
		by: 'Marina Costa',
		detail: 'Rafael wants procurement on the next call.',
		id: 'a2',
		kind: 'call',
		record: 'Northwind — 120 seats, annual',
		title: 'Call with Rafael Menezes · 24 min',
	},
	{
		at: '2026-09-24T15:00:00',
		by: 'Diego Almeida',
		detail: 'Qualification → Proposal',
		id: 'a3',
		kind: 'stage',
		record: 'Wayne — 40 new stores',
		title: 'Stage changed to Proposal',
	},
	{
		at: '2026-09-24T10:30:00',
		by: 'Marina Costa',
		detail: 'Demo for the operations team, 6 attendees.',
		id: 'a4',
		kind: 'meeting',
		record: 'Globex — fleet expansion',
		title: 'Meeting: Product demo',
	},
	{
		at: '2026-09-22T17:20:00',
		by: 'Ana Ribeiro',
		detail: 'Signed order form received.',
		id: 'a5',
		kind: 'stage',
		record: 'Stark — renewal 2027',
		title: 'Deal won',
	},
	{
		at: '2026-09-22T09:05:00',
		by: 'Marina Costa',
		detail: 'Legal asked for the DPA before redlines.',
		id: 'a6',
		kind: 'note',
		record: 'Vandelay — multi-year deal',
		title: 'Note added',
	},
	{
		at: '2026-08-29T14:00:00',
		by: 'Marina Costa',
		detail: 'Discovery call, budget confirmed for Q4.',
		id: 'a7',
		kind: 'call',
		record: 'Northwind — 120 seats, annual',
		title: 'Call with Rafael Menezes · 41 min',
	},
	{
		at: '2026-08-27T10:00:00',
		by: 'Diego Almeida',
		detail: 'Completed',
		id: 'a8',
		kind: 'task',
		record: 'Hooli — API tier upgrade',
		title: 'Task: Send security questionnaire',
	},
]

export type Task = {
	due: string
	id: string
	overdue?: boolean
	record: string
	title: string
}

export const TASKS: Task[] = [
	{
		due: 'Today',
		id: 't1',
		overdue: true,
		record: 'Globex — fleet expansion',
		title: 'Send pricing for 30 extra vehicles',
	},
	{
		due: 'Today',
		id: 't2',
		record: 'Northwind — 120 seats, annual',
		title: 'Book a call with procurement',
	},
	{
		due: 'Tomorrow',
		id: 't3',
		record: 'Vandelay — multi-year deal',
		title: 'Share the signed DPA with legal',
	},
	{
		due: 'Tue, 29 Sep',
		id: 't4',
		record: 'Umbrella — enterprise rollout',
		title: 'Intro email to Camila Duarte',
	},
	{
		due: 'Wed, 1 Oct',
		id: 't5',
		record: 'Northwind — 120 seats, annual',
		title: 'Send the security questionnaire',
	},
]

/**
 * What the CRM tells a seller: replies, mentions, overdue tasks, won deals,
 * imports and invitations. Each notice comes from a person, shown as their
 * initials; `kind` feeds the inbox's category filter, `topic` its "Mute".
 */
export type NoticeKind =
	| 'email'
	| 'mention'
	| 'task'
	| 'deal'
	| 'import'
	| 'meeting'

export type Notice = {
	at: Date
	body: string
	id: string
	initials: string
	kind: NoticeKind
	title: string
	/** What the notice's "Mute" silences: one topic, not the whole kind. */
	topic: string
	unread: boolean
}

export const NOTICE_CATEGORIES: {
	label: string
	value: NoticeKind
}[] = [
	{
		label: 'Mentions',
		value: 'mention',
	},
	{
		label: 'Email replies',
		value: 'email',
	},
	{
		label: 'Tasks',
		value: 'task',
	},
	{
		label: 'Deals',
		value: 'deal',
	},
	{
		label: 'Imports',
		value: 'import',
	},
	{
		label: 'Meetings',
		value: 'meeting',
	},
]

export const NOTICES: Notice[] = [
	{
		at: minutesAgo(8),
		body: 'Globex — fleet expansion',
		id: 'n1',
		initials: 'HP',
		kind: 'email',
		title: 'Helena Prado replied to your email',
		topic: 'email_replied',
		unread: true,
	},
	{
		at: minutesAgo(64),
		body: 'Northwind — 120 seats, annual',
		id: 'n2',
		initials: 'DA',
		kind: 'mention',
		title: 'Diego Almeida mentioned you in a note',
		topic: 'mentioned',
		unread: true,
	},
	{
		at: minutesAgo(185),
		body: 'Send pricing for 30 extra vehicles',
		id: 'n3',
		initials: 'AC',
		kind: 'task',
		title: 'A task assigned to you is overdue',
		topic: 'task_overdue',
		unread: true,
	},
	{
		at: daysAgo(1, 16, 20),
		body: 'Stark — renewal 2027 · R$ 115.000',
		id: 'n4',
		initials: 'AR',
		kind: 'deal',
		title: 'Ana Ribeiro won a deal',
		topic: 'deal_won',
		unread: false,
	},
	{
		at: daysAgo(1, 11, 5),
		body: '48 records imported, 2 skipped',
		id: 'n5',
		initials: 'AC',
		kind: 'import',
		title: 'Your contacts import finished',
		topic: 'import_finished',
		unread: false,
	},
	{
		at: daysAgo(4, 9, 30),
		body: 'Pipeline review · Thu 10:00',
		id: 'n6',
		initials: 'AR',
		kind: 'meeting',
		title: 'Ana Ribeiro invited you to a meeting',
		topic: 'meeting_invited',
		unread: false,
	},
]

/** The older pages the inbox's infinite list fetches near its end. */
export const OLDER_NOTICES: Notice[] = [
	{
		at: daysAgo(6, 15, 45),
		body: 'Initech — 40 seats · moved to Negotiation',
		id: 'n7',
		initials: 'MC',
		kind: 'deal',
		title: 'Marina Costa moved a deal forward',
		topic: 'deal_stage_changed',
		unread: false,
	},
	{
		at: daysAgo(7, 10, 10),
		body: 'Umbrella — onboarding questions',
		id: 'n8',
		initials: 'RM',
		kind: 'email',
		title: 'Rafael Menezes replied to your email',
		topic: 'email_replied',
		unread: false,
	},
	{
		at: daysAgo(8, 17, 0),
		body: 'Call Soylent about the pilot results',
		id: 'n9',
		initials: 'DA',
		kind: 'task',
		title: 'Diego Almeida assigned you a task',
		topic: 'task_assigned',
		unread: false,
	},
	{
		at: daysAgo(11, 9, 15),
		body: 'Hooli — security review',
		id: 'n10',
		initials: 'HP',
		kind: 'mention',
		title: 'Helena Prado mentioned you in a note',
		topic: 'mentioned',
		unread: false,
	},
	{
		at: daysAgo(13, 14, 0),
		body: 'Quarterly business review · Mon 14:00',
		id: 'n11',
		initials: 'DA',
		kind: 'meeting',
		title: 'Diego Almeida invited you to a meeting',
		topic: 'meeting_invited',
		unread: false,
	},
	{
		at: daysAgo(15, 8, 40),
		body: '112 companies imported, none skipped',
		id: 'n12',
		initials: 'AC',
		kind: 'import',
		title: 'Your companies import finished',
		topic: 'import_finished',
		unread: false,
	},
]

/** The history of the focus deal, for its record page and its timeline. */
export const DEAL_HISTORY: Activity[] = [
	{
		at: '2026-09-25T16:40:00',
		by: 'Marina Costa',
		detail:
			'Sent the revised proposal with the 12-month ramp and the volume discount.',
		id: 'h1',
		kind: 'email',
		record: FOCUS_DEAL.name,
		title: 'Email: Revised proposal v3',
	},
	{
		at: '2026-09-25T11:15:00',
		by: 'Marina Costa',
		detail:
			'Rafael wants procurement on the next call. Budget holder is the CFO.',
		id: 'h2',
		kind: 'call',
		record: FOCUS_DEAL.name,
		title: 'Call with Rafael Menezes · 24 min',
	},
	{
		at: '2026-09-18T15:00:00',
		by: 'Marina Costa',
		detail: 'Qualification → Proposal',
		id: 'h3',
		kind: 'stage',
		record: FOCUS_DEAL.name,
		title: 'Stage changed to Proposal',
	},
	{
		at: '2026-09-17T10:00:00',
		by: 'Marina Costa',
		detail: 'Demo for 6 people from operations and IT.',
		id: 'h4',
		kind: 'meeting',
		record: FOCUS_DEAL.name,
		title: 'Meeting: Product demo',
	},
	{
		at: '2026-08-29T14:00:00',
		by: 'Marina Costa',
		detail: 'Discovery call, budget confirmed for Q4.',
		id: 'h5',
		kind: 'call',
		record: FOCUS_DEAL.name,
		title: 'Call with Rafael Menezes · 41 min',
	},
	{
		at: '2026-08-27T09:30:00',
		by: 'Diego Almeida',
		detail: 'Came in through the logistics webinar; 120 drivers today.',
		id: 'h6',
		kind: 'note',
		record: FOCUS_DEAL.name,
		title: 'Note added',
	},
]
