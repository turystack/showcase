import { createFileRoute } from '@tanstack/react-router'
import type { DataOutcome } from '@turystack/react-hooks'
import type { NotificationItem } from '@turystack/react-web'
import {
	Button,
	DropdownMenu,
	EmptyState,
	NotificationList,
} from '@turystack/react-web'
import { BellOff, Mail, MailOpen, MoreHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'
import {
	notificationSamples,
	useDemoInbox,
} from '@/data/react-web-notifications'

/**
 * Props read from
 * `react-web/src/components/notification-list/notification-list.types.ts` and
 * the destructuring defaults in `notification-list.tsx`. Like List, the data
 * arrives as `items` (+ `loading`/`error`) or as one `outcome`, never both.
 */
const notificationListProps = [
	{
		description: 'The notifications, newest first.',
		name: 'items',
		type: 'NotificationItem[]',
	},
	{
		default: 'false',
		description: 'Initial load: skeleton rows while there are no items.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Initial failure: List’s error state.',
		name: 'error',
		type: 'boolean',
	},
	{
		description: 'Five remote-read states, instead of items/loading/error.',
		name: 'outcome',
		type: 'DataOutcome<NotificationItem[]>',
	},
	{
		default: '"comfortable"',
		description: 'Row spacing. compact is for a popover.',
		name: 'density',
		type: '"compact" | "comfortable"',
	},
	{
		default: '"none"',
		description: 'day heads the rows with Today, Yesterday or the date.',
		name: 'groupBy',
		type: '"none" | "day"',
	},
	{
		default: '3',
		description: 'The heading level of each day (h2–h6).',
		name: 'headingLevel',
		type: '2 | 3 | 4 | 5 | 6',
	},
	{
		description: 'Makes rows buttons, or runs before a link navigates.',
		name: 'onItemClick',
		type: '(item: NotificationItem) => void',
	},
	{
		description: 'A row’s own controls, beside the row, never inside it.',
		name: 'itemActions',
		type: '(item: NotificationItem) => React.ReactNode',
	},
	{
		description: 'Id of the notification open elsewhere; aria-current.',
		name: 'activeKey',
		type: 'string',
	},
	{
		description: 'Replaces the default “You’re all caught up” state.',
		name: 'emptySection',
		type: 'React.ReactNode',
	},
	{
		default: '3',
		description: 'Skeleton rows while pending.',
		name: 'loadingRows',
		type: 'number',
	},
	{
		description: 'A further page exists — turns on List’s infinite mode.',
		name: 'hasMore',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'A further page is loading.',
		name: 'loadingMore',
		type: 'boolean',
	},
	{
		description: 'Loads the next page, from the sentinel or the button.',
		name: 'onLoadMore',
		type: '() => void',
	},
	{
		description: 'Shown under the rows once nothing is left to load.',
		name: 'endReachedSection',
		type: 'React.ReactNode',
	},
	{
		default: 'labels.notifications.list',
		description: 'Names the list.',
		name: 'ariaLabel',
		type: 'string',
	},
]

/** `NotificationItem`, the row every Notification* component reads. */
const itemProps = [
	{
		description: 'Stable identity; what activeKey is compared with.',
		name: 'id',
		required: true,
		type: 'string',
	},
	{
		description: 'What happened.',
		name: 'title',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'One or two lines of detail, clamped.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'When it arrived, in the FormatProvider’s locale.',
		name: 'at',
		required: true,
		type: 'Date',
	},
	{
		description: 'Seen already; unread rows get a dot and a bold title.',
		name: 'read',
		type: 'boolean',
	},
	{
		description: 'An Avatar, an icon in a square, a logo.',
		name: 'media',
		type: 'React.ReactNode',
	},
	{
		description: 'Makes the row a link.',
		name: 'href',
		type: 'string',
	},
]

const retry = () => undefined

const outcomes: {
	label: string
	outcome: DataOutcome<NotificationItem[]>
}[] = [
	{
		label: 'pending',
		outcome: {
			retry,
			status: 'pending',
		},
	},
	{
		label: 'error',
		outcome: {
			error: new Error('503'),
			retry,
			status: 'error',
		},
	},
	{
		label: 'denied',
		outcome: {
			reason: 'Você não tem acesso às notificações desta conta.',
			retry,
			status: 'denied',
		},
	},
	{
		label: 'empty',
		outcome: {
			retry,
			status: 'empty',
		},
	},
]

const usageCode = `import { NotificationList } from '@turystack/react-web'

<NotificationList items={notifications} onItemClick={(n) => open(n.id)} />

<NotificationList
  density="compact"
  items={latest}
  itemActions={(n) => <RowMenu notification={n} />}
/>

<NotificationList
  groupBy="day"
  hasMore={hasMore}
  loadingMore={loadingMore}
  onLoadMore={onLoadMore}
  outcome={outcome}
/>`

const wiringCode = `// The component never imports the SDK: the app adapts the query and hands
// the pure component an outcome.
import { useInfiniteDataOutcome } from '@turystack/react-hooks'
import { NotificationList, type NotificationItem } from '@turystack/react-web'
import { useListNotificationsInfinite } from '@/gen/hooks' // kubb

const toItem = (n: Notification): NotificationItem => ({
  at: new Date(n.created_at),
  description: n.body,
  href: n.link ?? undefined,
  id: n.notification_id,
  read: n.read_at !== null,
  title: n.title,
})

function NotificationsPage() {
  const { outcome, hasMore, loadingMore, onLoadMore } = useInfiniteDataOutcome({
    query: useListNotificationsInfinite({ limit: 20 }),
    select: (pages) => pages.flatMap((page) => page.data.map(toItem)),
  })

  return (
    <NotificationList
      groupBy="day"
      hasMore={hasMore}
      loadingMore={loadingMore}
      onLoadMore={onLoadMore}
      outcome={outcome}
    />
  )
}`

function RowMenu({
	item,
	onDelete,
	onToggleRead,
}: {
	item: NotificationItem
	onDelete: (item: NotificationItem) => void
	onToggleRead: (item: NotificationItem) => void
}) {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel="Ações da notificação"
					size="icon-sm"
					variant="ghost"
				>
					<MoreHorizontal />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={220}
			>
				<DropdownMenu.Item onClick={() => onToggleRead(item)}>
					{item.read ? <Mail /> : <MailOpen />}
					{item.read ? 'Marcar como não lida' : 'Marcar como lida'}
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					onClick={() => onDelete(item)}
					variant="destructive"
				>
					<Trash2 /> Excluir
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

function Page() {
	const inbox = useDemoInbox()
	const feed = useDemoInbox()
	const [openId, setOpenId] = useState<string | undefined>(undefined)
	const [lastEvent, setLastEvent] = useState('nenhum')

	const openItem = inbox.items.find((item) => item.id === openId)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Notifications
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					NotificationList
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The notifications sent to the reader, built on List.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={notificationListProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Each row is a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						NotificationItem
					</code>
					, the shape all three components share.
				</p>
				<PropsTable props={itemProps} />
			</section>

			<SlotsSection slug="notification-list" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Density</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						comfortable
					</code>{' '}
					for a page or panel,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						compact
					</code>{' '}
					for a popover. Unread rows carry a dot and a bold title.
				</p>
				<ComponentPreview
					className="items-start"
					title="comfortable and compact"
				>
					<div className="grid w-full gap-6 lg:grid-cols-2">
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">comfortable</p>
							<div className="rounded-lg border border-border bg-card p-1">
								<NotificationList items={notificationSamples.slice(0, 4)} />
							</div>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">compact</p>
							<div className="rounded-lg border border-border bg-card p-1">
								<NotificationList
									density="compact"
									items={notificationSamples.slice(0, 4)}
								/>
							</div>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Grouped by day</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						groupBy="day"
					</code>{' '}
					heads the rows with Today, Yesterday or the date. Each day is a
					heading;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						headingLevel
					</code>{' '}
					(2–6) sets its level.
				</p>
				<ComponentPreview
					className="items-stretch"
					title='groupBy="day"'
				>
					<div className="w-full max-w-lg rounded-lg border border-border bg-card p-1">
						<NotificationList
							groupBy="day"
							items={notificationSamples}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Clicks and row actions
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onItemClick
					</code>{' '}
					makes each row a button; it never marks it read.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						itemActions
					</code>{' '}
					puts a “…” menu beside the row.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="onItemClick + itemActions + activeKey"
				>
					<div className="grid w-full gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
						<div className="rounded-lg border border-border bg-card p-1">
							<NotificationList
								activeKey={openId}
								itemActions={(item) => (
									<RowMenu
										item={item}
										onDelete={(target) => {
											inbox.remove(target.id)
											setLastEvent(`excluiu ${target.id}`)
										}}
										onToggleRead={(target) => {
											inbox.setRead(target.id, !target.read)
											setLastEvent(
												`${target.read ? 'marcou como não lida' : 'marcou como lida'} ${target.id}`,
											)
										}}
									/>
								)}
								items={inbox.items.slice(0, 6)}
								onItemClick={(item) => {
									setOpenId(item.id)
									inbox.setRead(item.id, true)
									setLastEvent(`abriu ${item.id}`)
								}}
							/>
						</div>
						<div className="space-y-3 rounded-lg border border-border bg-card p-4 text-sm">
							{openItem ? (
								<>
									<p className="font-semibold">{openItem.title}</p>
									<p className="text-muted-foreground">
										{openItem.description}
									</p>
								</>
							) : (
								<p className="text-muted-foreground">
									Clique numa notificação para abri-la aqui.
								</p>
							)}
							<p className="text-muted-foreground text-xs">
								último evento: <code>{lastEvent}</code>
							</p>
							<Button
								onClick={() => {
									inbox.reset()
									setOpenId(undefined)
									setLastEvent('nenhum')
								}}
								size="sm"
								variant="outline"
							>
								Reset
							</Button>
						</div>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					A row with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>{' '}
					is a link; one with neither href nor onItemClick is plain content.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="href rows"
				>
					<div className="w-full max-w-lg rounded-lg border border-border bg-card p-1">
						<NotificationList
							items={notificationSamples.slice(0, 3).map((item) => ({
								...item,
								href: '#notificacao',
							}))}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Infinite</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						hasMore
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loadingMore
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onLoadMore
					</code>{' '}
					pass through to List’s infinite mode — the shape{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						useInfiniteDataOutcome
					</code>{' '}
					returns.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Scroll down: 16 older, six at a time"
				>
					<div className="w-full max-w-lg space-y-3">
						<div className="flex items-center justify-between gap-3">
							<span className="text-muted-foreground text-sm">
								{feed.items.length} carregadas
							</span>
							<Button
								onClick={feed.reset}
								size="sm"
								variant="outline"
							>
								Reset
							</Button>
						</div>
						<div className="max-h-96 overflow-y-auto rounded-lg border border-border bg-card p-1">
							<NotificationList
								endReachedSection="Isso é tudo dos últimos 30 dias."
								groupBy="day"
								hasMore={feed.hasMore}
								items={feed.items}
								loadingMore={feed.loadingMore}
								onLoadMore={feed.loadMore}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Through{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						outcome
					</code>
					, List paints every state. Empty says “all caught up”, not “no data”.
				</p>
				<ComponentPreview
					className="items-start"
					title="outcome: pending, error, denied, empty"
				>
					<div className="grid w-full gap-4 md:grid-cols-2">
						{outcomes.map(({ label, outcome }) => (
							<div
								className="space-y-2"
								key={label}
							>
								<p className="text-muted-foreground text-xs">{label}</p>
								<div className="rounded-lg border border-border bg-card p-1">
									<NotificationList outcome={outcome} />
								</div>
							</div>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="emptySection"
				>
					<div className="w-full max-w-lg rounded-lg border border-border bg-card p-1">
						<NotificationList
							emptySection={
								<EmptyState
									description="Ative as notificações em Preferências para acompanhar pedidos e pagamentos."
									icon={<BellOff />}
									size="sm"
									title="Notificações desativadas"
								/>
							}
							items={[]}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Wiring to the SDK
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The app adapts the kubb infinite query with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						useInfiniteDataOutcome
					</code>{' '}
					and maps rows to NotificationItem.
				</p>
				<CodeBlock
					code={wiringCode}
					filename="notifications-page.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute(
	'/libs/react-web/components/notification-list',
)({
	component: Page,
})
