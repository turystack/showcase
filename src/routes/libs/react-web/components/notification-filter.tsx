import { createFileRoute } from '@tanstack/react-router'
import type { NotificationFilterStatus } from '@turystack/react-web'
import {
	Button,
	NotificationFilter,
	NotificationList,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'
import {
	notificationCategories,
	notificationSamples,
} from '@/data/react-web-notifications'

/**
 * Props read from
 * `react-web/src/components/notification-filter/notification-filter.types.ts`.
 * The component holds no filter state: every value comes in and goes out.
 */
const notificationFilterProps = [
	{
		description: 'Which notifications show.',
		name: 'status',
		required: true,
		type: '"all" | "unread"',
	},
	{
		description: 'Fires on a new status.',
		name: 'onStatusChange',
		required: true,
		type: '(status: "all" | "unread") => void',
	},
	{
		description: 'Numbers beside the options: “Unread · 3”.',
		name: 'counts',
		type: '{ all?: number; unread?: number }',
	},
	{
		description: 'Adds a debounced search field (shape below).',
		name: 'search',
		type: 'NotificationFilterSearch',
	},
	{
		description: 'Adds one category chip with a radio picker.',
		name: 'categories',
		type: '{ value: string; label: string }[]',
	},
	{
		description: 'The chosen category’s value.',
		name: 'category',
		type: 'string',
	},
	{
		description: 'Fires with the chosen value; undefined once cleared.',
		name: 'onCategoryChange',
		type: '(value?: string) => void',
	},
]

/** `NotificationFilterSearch`, the shape of the `search` prop. */
const searchProps = [
	{
		description: 'The query; a value you set (a reset) replaces the field.',
		name: 'value',
		required: true,
		type: 'string',
	},
	{
		description: 'Fires debounced; with "" once cleared.',
		name: 'onChange',
		required: true,
		type: '(value: string) => void',
	},
	{
		default: 'labels.notifications.search',
		description: 'The empty field’s prompt.',
		name: 'placeholder',
		type: 'string',
	},
]

const usageCode = `import { NotificationFilter } from '@turystack/react-web'

<NotificationFilter
  counts={{ unread: 3 }}
  onStatusChange={setStatus}
  status={status}
/>

<NotificationFilter
  categories={[{ label: 'Financeiro', value: 'financeiro' }]}
  category={category}
  onCategoryChange={setCategory}
  onStatusChange={setStatus}
  search={{ onChange: setQuery, value: query }}
  status={status}
/>`

const unreadTotal = notificationSamples.filter((item) => !item.read).length

function matches(text: unknown, query: string) {
	return typeof text === 'string' && text.toLowerCase().includes(query)
}

function Page() {
	const [status, setStatus] = useState<NotificationFilterStatus>('all')
	const [query, setQuery] = useState('')
	const [searchStatus, setSearchStatus] =
		useState<NotificationFilterStatus>('all')
	const [category, setCategory] = useState<string | undefined>(undefined)
	const [allStatus, setAllStatus] = useState<NotificationFilterStatus>('unread')
	const [allQuery, setAllQuery] = useState('')
	const [allCategory, setAllCategory] = useState<string | undefined>('sistema')

	const needle = allQuery.trim().toLowerCase()
	const filtered = notificationSamples.filter(
		(item) =>
			(allStatus === 'all' || !item.read) &&
			(!allCategory || item.category === allCategory) &&
			(!needle ||
				matches(item.title, needle) ||
				matches(item.description, needle)),
	)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Notifications
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					NotificationFilter
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Controlled filters above a notification list: all or unread, search
					and category.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={notificationFilterProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					The{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						search
					</code>{' '}
					object.
				</p>
				<PropsTable props={searchProps} />
			</section>

			<SlotsSection slug="notification-filter" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Status and counts
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The status is always there.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						counts
					</code>{' '}
					adds a number beside each option.
				</p>
				<ComponentPreview title="status + counts">
					<div className="space-y-3">
						<NotificationFilter
							counts={{
								all: notificationSamples.length,
								unread: unreadTotal,
							}}
							onStatusChange={setStatus}
							status={status}
						/>
						<p className="text-muted-foreground text-xs">
							status: <code>{status}</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Search</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						search
					</code>{' '}
					is controlled and debounced; typing is never lost, and “Limpar” resets
					it from outside.
				</p>
				<ComponentPreview title="search, controlled">
					<div className="w-full max-w-lg space-y-3">
						<NotificationFilter
							onStatusChange={setSearchStatus}
							search={{
								onChange: setQuery,
								placeholder: 'Buscar por título ou texto',
								value: query,
							}}
							status={searchStatus}
						/>
						<div className="flex items-center gap-3 text-muted-foreground text-xs">
							<span>
								query: <code>{JSON.stringify(query)}</code>
							</span>
							<Button
								onClick={() => setQuery('')}
								size="sm"
								variant="outline"
							>
								Limpar
							</Button>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Categories</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						categories
					</code>{' '}
					adds one FilterChip; once chosen it reads “Categories: Financeiro”
					with an × that clears it.
				</p>
				<ComponentPreview title="categories">
					<div className="space-y-3">
						<NotificationFilter
							categories={notificationCategories}
							category={category}
							onCategoryChange={setCategory}
							onStatusChange={setStatus}
							status={status}
						/>
						<p className="text-muted-foreground text-xs">
							category: <code>{JSON.stringify(category ?? null)}</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Over a list, in memory
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					All three together, filtering a NotificationList in memory.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="status + search + categories + NotificationList"
				>
					<div className="w-full max-w-xl space-y-3">
						<NotificationFilter
							categories={notificationCategories}
							category={allCategory}
							counts={{
								all: notificationSamples.length,
								unread: unreadTotal,
							}}
							onCategoryChange={setAllCategory}
							onStatusChange={setAllStatus}
							search={{
								onChange: setAllQuery,
								value: allQuery,
							}}
							status={allStatus}
						/>
						<div className="rounded-lg border border-border bg-card p-1">
							<NotificationList items={filtered} />
						</div>
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
		</div>
	)
}

export const Route = createFileRoute(
	'/libs/react-web/components/notification-filter',
)({
	component: Page,
})
