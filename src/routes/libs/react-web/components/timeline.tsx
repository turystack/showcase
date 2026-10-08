import { createFileRoute } from '@tanstack/react-router'
import {
	Avatar,
	Badge,
	Button,
	Card,
	MoneyText,
	Timeline,
} from '@turystack/react-web'
import {
	Check,
	CreditCard,
	FileText,
	LogIn,
	Mail,
	TriangleAlert,
	X,
} from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const timelineProps = [
	{
		default: '"pending"',
		description: 'Timeline.Item: entry status, shown by its colour.',
		name: 'status',
		type: '"done" | "current" | "pending" | "error"',
	},
	{
		description: 'Timeline.Item: what happened.',
		name: 'title',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'Timeline.Item: when it happened, usually a DateText.',
		name: 'meta',
		type: 'React.ReactNode',
	},
	{
		description: 'Timeline.Item: replaces the dot.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		description: 'Timeline: tightens the spacing for a sidebar or a card.',
		name: 'compact',
		type: 'boolean',
	},
	{
		description: 'Timeline.Group: the period label, rendered as a heading.',
		name: 'label',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: '3',
		description: 'Timeline.Group: the heading level of the label.',
		name: 'headingLevel',
		type: '2 | 3 | 4 | 5 | 6',
	},
]

const usageCode = `import { DateText, Timeline } from '@turystack/react-web'

<Timeline>
  <Timeline.Item
    meta={<DateText live value={booking.confirmedAt} variant="relative" />}
    status="done"
    title="Booking confirmed"
  />
  <Timeline.Item status="current" title="Awaiting payment" />
  <Timeline.Item status="pending" title="Check-in" />
</Timeline>

// An icon replaces the dot, and keeps the status colour
<Timeline.Item icon={<Check />} status="done" title="Payment received" />

// Children are the entry's body: whatever the event was
<Timeline.Item status="done" title="Refund issued">
  <MoneyText value={-12800} colored />
</Timeline.Item>

// compact tightens every entry, for a sidebar or a card
<Timeline compact>…</Timeline>

// Timeline.Group puts a period's entries under a date heading
<Timeline>
  <Timeline.Group label="Setembro de 2026">
    <Timeline.Item status="current" title="Aguardando check-in" />
    <Timeline.Item status="done" title="Pagamento recebido" />
  </Timeline.Group>
  <Timeline.Group headingLevel={3} label="Agosto de 2026">
    <Timeline.Item status="done" title="Reserva confirmada" />
  </Timeline.Group>
</Timeline>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Timeline
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					What happened to something, in order: a booking’s history, an audit
					trail, a refund’s steps.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The table covers all three parts: <code>compact</code> is the root’s,{' '}
					<code>label</code> and <code>headingLevel</code> belong to a group,
					and the rest to an item.
				</p>
				<PropsTable props={timelineProps} />
			</section>

			<SlotsSection slug="timeline" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A booking’s history
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The status also lands on the row as <code>data-status</code>, so it is
					readable by a test and by anything styling around it — not only by the
					eye.
				</p>
				<ComponentPreview title="Four statuses, one connector">
					<div className="w-full max-w-md">
						<Timeline>
							<Timeline.Item
								meta="24/08/2026 14:02"
								status="done"
								title="Booking confirmed"
							>
								<MoneyText
									muted
									size="sm"
									value={128000}
								/>
							</Timeline.Item>
							<Timeline.Item
								meta="24/08/2026 14:05"
								status="error"
								title="Card refused"
							/>
							<Timeline.Item
								meta="now"
								status="current"
								title="Awaiting a new payment method"
							/>
							<Timeline.Item title="Check-in" />
						</Timeline>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Icons instead of dots
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					An icon replaces the dot and keeps the status colour. Pass the node,
					not a size.
				</p>
				<ComponentPreview title="An audit trail">
					<div className="w-full max-w-md">
						<Timeline>
							<Timeline.Item
								icon={<FileText />}
								meta="24/08/2026 09:14"
								status="done"
								title="Quote sent"
							/>
							<Timeline.Item
								icon={<Mail />}
								meta="24/08/2026 09:40"
								status="done"
								title="Guest opened the email"
							/>
							<Timeline.Item
								icon={<CreditCard />}
								meta="24/08/2026 14:02"
								status="done"
								title="Payment received"
							>
								<MoneyText
									muted
									size="sm"
									value={128_000}
								/>
							</Timeline.Item>
							<Timeline.Item
								icon={<LogIn />}
								meta="Expected 02/09/2026"
								status="current"
								title="Check-in"
							/>
						</Timeline>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Grouped by period
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Timeline.Group
					</code>{' '}
					puts a period under a heading (
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						headingLevel
					</code>
					, 3 by default); the connector stops at each group.
				</p>
				<ComponentPreview title="A guest's history, month by month">
					<div className="w-full max-w-md">
						<Timeline>
							<Timeline.Group label="Setembro de 2026">
								<Timeline.Item
									icon={<LogIn />}
									meta="Previsto para 02/09/2026"
									status="current"
									title="Check-in"
								/>
								<Timeline.Item
									icon={<CreditCard />}
									meta="01/09/2026 10:12"
									status="done"
									title="Saldo pago"
								>
									<MoneyText
										muted
										size="sm"
										value={96_000}
									/>
								</Timeline.Item>
							</Timeline.Group>
							<Timeline.Group label="Agosto de 2026">
								<Timeline.Item
									icon={<TriangleAlert />}
									meta="24/08/2026 14:05"
									status="error"
									title="Cartão recusado"
								/>
								<Timeline.Item
									icon={<FileText />}
									meta="24/08/2026 09:14"
									status="done"
									title="Orçamento enviado"
								/>
							</Timeline.Group>
						</Timeline>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Inside a card</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						compact
					</code>{' '}
					on the root tightens every entry, e.g. for a sidebar.
				</p>
				<ComponentPreview title="Roomy, then compact">
					<div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
						<Card>
							<Card.Header bordered>
								<Card.Title>Default spacing</Card.Title>
								<Card.Description>For a page that has room</Card.Description>
							</Card.Header>
							<Card.Content>
								<Timeline>
									<Timeline.Item
										icon={<Check />}
										meta="09:14"
										status="done"
										title="Quote sent"
									/>
									<Timeline.Item
										icon={<Check />}
										meta="09:40"
										status="done"
										title="Email opened"
									/>
									<Timeline.Item
										meta="14:02"
										status="current"
										title="Awaiting payment"
									/>
								</Timeline>
							</Card.Content>
						</Card>
						<Card>
							<Card.Header bordered>
								<Card.Title>Compact</Card.Title>
								<Card.Description>For a sidebar or a tile</Card.Description>
							</Card.Header>
							<Card.Content>
								<Timeline compact>
									<Timeline.Item
										icon={<Check />}
										meta="09:14"
										status="done"
										title="Quote sent"
									/>
									<Timeline.Item
										icon={<Check />}
										meta="09:40"
										status="done"
										title="Email opened"
									/>
									<Timeline.Item
										meta="14:02"
										status="current"
										title="Awaiting payment"
									/>
								</Timeline>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					An entry is not only a line of text
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Children are the entry body: an amount, an avatar, a badge, an action.
				</p>
				<ComponentPreview title="A refund, with everything it carries">
					<div className="w-full max-w-lg">
						<Timeline>
							<Timeline.Item
								icon={<TriangleAlert />}
								meta="24/08/2026 14:05"
								status="error"
								title="Card refused"
							>
								<div className="flex flex-wrap items-center gap-2">
									<Badge variant="destructive">insufficient_funds</Badge>
									<Button
										size="sm"
										variant="outline"
									>
										Retry the charge
									</Button>
								</div>
							</Timeline.Item>
							<Timeline.Item
								icon={<Mail />}
								meta="24/08/2026 14:06"
								status="done"
								title="Guest notified"
							>
								<div className="flex items-center gap-2">
									<Avatar size="sm">AR</Avatar>
									<span>ana.ribeiro@example.com</span>
								</div>
							</Timeline.Item>
							<Timeline.Item
								icon={<X />}
								meta="26/08/2026 00:00"
								status="pending"
								title="Reservation expires"
							>
								<MoneyText
									colored
									size="sm"
									value={-128_000}
								/>
							</Timeline.Item>
						</Timeline>
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

export const Route = createFileRoute('/libs/react-web/components/timeline')({
	component: Page,
})
