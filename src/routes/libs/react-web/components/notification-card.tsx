import { createFileRoute } from '@tanstack/react-router'
import { Button, DropdownMenu, NotificationCard } from '@turystack/react-web'
import { MailOpen, MoreHorizontal, Trash2 } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'
import { notificationSamples } from '@/data/react-web-notifications'

/**
 * Props read from
 * `react-web/src/components/notification-card/notification-card.types.ts` and
 * the destructuring default in `notification-card.tsx`. The card is the row
 * NotificationList renders, so the two pages share the sample data.
 */
const notificationCardProps = [
	{
		description: 'The notification to show.',
		name: 'notification',
		type: 'NotificationItem',
	},
	{
		description: 'Makes it a button, or runs before a link navigates.',
		name: 'onClick',
		type: '(notification: NotificationItem) => void',
	},
	{
		description: 'Its own controls, beside the card, never inside it.',
		name: 'actions',
		type: 'React.ReactNode',
	},
	{
		default: '"comfortable"',
		description: 'Spacing. compact is for a popover.',
		name: 'density',
		type: '"compact" | "comfortable"',
	},
]

const usageCode = `import { NotificationCard } from '@turystack/react-web'

<NotificationCard notification={latest} onClick={(n) => open(n.id)} />

<NotificationCard
  density="compact"
  notification={latest}
  actions={<DropdownMenu>…</DropdownMenu>}
/>`

const [first, second, third] = notificationSamples

function ActionsPreview() {
	const [read, setRead] = useState(false)

	return (
		<div className="w-full max-w-md">
			<NotificationCard
				actions={
					<DropdownMenu>
						<DropdownMenu.Trigger asChild>
							<Button
								ariaLabel="Ações da notificação"
								size="icon-xs"
								variant="ghost"
							>
								<MoreHorizontal size={16} />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							align="end"
							width={220}
						>
							<DropdownMenu.Item onClick={() => setRead((value) => !value)}>
								<MailOpen size={16} />
								{read ? 'Marcar como não lida' : 'Marcar como lida'}
							</DropdownMenu.Item>
							<DropdownMenu.Item variant="destructive">
								<Trash2 size={16} />
								Excluir
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu>
				}
				notification={{
					...first,
					read,
				}}
				onClick={() => setRead(true)}
			/>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Notifications
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					NotificationCard
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One notification: what happened, when, and whether it was seen.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={notificationCardProps} />
			</section>

			<SlotsSection slug="notification-card" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Read and unread</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Unread carries a dot and a semibold title. The time stays live.
				</p>
				<ComponentPreview title="Unread, then read">
					<div className="flex w-full max-w-md flex-col">
						<NotificationCard notification={second} />
						<NotificationCard
							notification={{
								...third,
								read: true,
							}}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">With actions</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Actions sit beside the card. A click on them never opens it.
				</p>
				<ComponentPreview title="onClick marks it read; the menu toggles">
					<ActionsPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Density</h2>
				<ComponentPreview title="compact, as in a popover">
					<div className="w-full max-w-sm">
						<NotificationCard
							density="compact"
							notification={first}
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
		</div>
	)
}

export const Route = createFileRoute(
	'/libs/react-web/components/notification-card',
)({
	component: Page,
})
