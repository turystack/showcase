import { createFileRoute } from '@tanstack/react-router'
import { Avatar, Button, Indicator } from '@turystack/react-web'
import { Bell, Inbox } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/indicator/indicator.types.ts` and
 * the `tv()` call in `indicator.tsx`. `max` defaults to 99 in the function
 * body; `variant` and `position` defaults come from `defaultVariants`.
 */
const indicatorProps = [
	{
		description: 'The element the indicator is pinned to.',
		name: 'children',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'The number shown. 0 hides it unless showZero.',
		name: 'count',
		type: 'number',
	},
	{
		default: '99',
		description: 'Counts above it read "max+".',
		name: 'max',
		type: 'number',
	},
	{
		default: 'false',
		description: 'A dot instead of the number.',
		name: 'dot',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Keeps the indicator when count is 0.',
		name: 'showZero',
		type: 'boolean',
	},
	{
		default: '"default"',
		description: 'Colour. destructive for counts that need action.',
		name: 'variant',
		type: '"default" | "destructive"',
	},
	{
		default: '"top-right"',
		description: 'The corner the indicator is pinned to.',
		name: 'position',
		type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"',
	},
	{
		description: "What a screen reader hears, as the child's description.",
		name: 'label',
		type: 'string',
	},
]

const usageCode = `import { Button, Indicator } from '@turystack/react-web'

<Indicator count={unread} label={\`\${unread} unread notifications\`}>
  <Button ariaLabel="Notifications" size="icon-md" variant="outline">
    <Bell />
  </Button>
</Indicator>

// "Something new", without a number
<Indicator count={unread} dot label="New messages" variant="destructive">
  <Avatar alt="Ana Souza">AS</Avatar>
</Indicator>

<Indicator count={240}>{bell}</Indicator>          // 99+
<Indicator count={12} max={9}>{bell}</Indicator>   // 9+
<Indicator count={0} showZero>{bell}</Indicator>   // keeps the 0`

const positions = [
	'top-left',
	'top-right',
	'bottom-left',
	'bottom-right',
] as const

function BellButton() {
	return (
		<Button
			ariaLabel="Notificações"
			size="icon-md"
			variant="outline"
		>
			<Bell />
		</Button>
	)
}

function Page() {
	const [unread, setUnread] = useState(3)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Content
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Indicator
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A count or dot pinned to the corner of another element.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={indicatorProps} />
			</section>

			<SlotsSection slug="indicator" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Count and label</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						label
					</code>{' '}
					replaces the bare number for screen readers, linked to a single
					element child via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-describedby
					</code>
					. At zero the indicator hides.
				</p>
				<ComponentPreview title="Notifications bell">
					<div className="flex flex-col items-center gap-4">
						<Indicator
							count={unread}
							label={`${unread} notificações não lidas`}
						>
							<BellButton />
						</Indicator>
						<div className="flex gap-2">
							<Button
								onClick={() => setUnread((n) => Math.max(0, n - 1))}
								size="sm"
								variant="outline"
							>
								Marcar uma como lida
							</Button>
							<Button
								onClick={() => setUnread((n) => n + 1)}
								size="sm"
								variant="ghost"
							>
								Chegou outra
							</Button>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Dot</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">dot</code>{' '}
					shows presence, not quantity. A count of zero still hides it.
				</p>
				<ComponentPreview title="Dots">
					<div className="flex items-center gap-8">
						<Indicator
							count={2}
							dot
							label="Mensagens novas"
							position="bottom-right"
						>
							<Avatar alt="Ana Souza">AS</Avatar>
						</Indicator>
						<Indicator
							dot
							label="Novidades"
						>
							<BellButton />
						</Indicator>
						<Indicator
							count={0}
							dot
							label="Nada novo"
						>
							<BellButton />
						</Indicator>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					max, showZero and destructive
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Counts above{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">max</code>{' '}
					read "99+".{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						destructive
					</code>{' '}
					is for counts that need action.
				</p>
				<ComponentPreview title="99+, 9+, zero, destructive">
					<div className="flex items-center gap-8">
						<Indicator
							count={240}
							label="240 notificações não lidas"
						>
							<BellButton />
						</Indicator>
						<Indicator
							count={12}
							label="12 notificações não lidas"
							max={9}
						>
							<BellButton />
						</Indicator>
						<Indicator
							count={0}
							label="Nenhuma notificação"
							showZero
						>
							<BellButton />
						</Indicator>
						<Indicator
							count={4}
							label="4 pagamentos falharam"
							variant="destructive"
						>
							<Button
								ariaLabel="Pagamentos"
								size="icon-md"
								variant="outline"
							>
								<Inbox />
							</Button>
						</Indicator>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Position</h2>
				<ComponentPreview title="All four corners">
					<div className="flex items-center gap-10">
						{positions.map((position) => (
							<div
								className="flex flex-col items-center gap-2"
								key={position}
							>
								<Indicator
									count={5}
									label="5 novas"
									position={position}
								>
									<Avatar
										alt="Bruno Lima"
										variant="square"
									>
										BL
									</Avatar>
								</Indicator>
								<span className="font-mono text-muted-foreground text-xs">
									{position}
								</span>
							</div>
						))}
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

export const Route = createFileRoute('/libs/react-web/components/indicator')({
	component: Page,
})
