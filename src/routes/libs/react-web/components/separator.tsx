import { createFileRoute } from '@tanstack/react-router'
import { Separator } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/separator/separator.types.ts`.
 * `SeparatorProps` is a closed set of three — it no longer spreads
 * `React.ComponentProps<'div'>`, so there is no `className` and no `style`:
 * the room around the rule comes from `spacing`.
 */
const separatorProps = [
	{
		description: 'Sets aria-hidden: drawn, but not announced.',
		name: 'decorative',
		type: 'boolean',
	},
	{
		default: "'horizontal'",
		description: 'Line direction; vertical stretches to its flex row.',
		name: 'orientation',
		type: "'horizontal' | 'vertical'",
	},
	{
		default: "'none'",
		description: 'Margin on the axis it divides: sm 8px, md 16px, lg 24px.',
		name: 'spacing',
		type: "'none' | 'sm' | 'md' | 'lg'",
	},
]

const usageCode = `import { Separator } from '@turystack/react-web'

// Between stacked sections
<section>Profile</section>
<Separator spacing="md" />
<section>Billing</section>

// Between items on a row — the parent must be a flex row,
// because the vertical rule sizes itself with self-stretch
<div className="flex h-6 items-center">
  <span>Docs</span>
  <Separator orientation="vertical" spacing="sm" />
  <span>Support</span>
  <Separator orientation="vertical" spacing="sm" />
  <span>Status</span>
</div>

// A rule that is pure decoration: still drawn, no longer announced
<Separator decorative />`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Separator
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A one-pixel rule between two regions.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={separatorProps} />
			</section>

			<SlotsSection slug="separator" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Orientation</h2>
				<ComponentPreview title="Horizontal — the default">
					<div className="w-full max-w-sm text-sm">
						<p>Profile</p>
						<Separator spacing="md" />
						<p>Billing</p>
						<Separator spacing="md" />
						<p>Notifications</p>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The vertical rule is styled with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						self-stretch
					</code>{' '}
					so it takes its flex row's height; outside one it collapses.
				</p>
				<ComponentPreview title="Vertical, in a flex row">
					<div className="flex h-6 items-center text-sm">
						<span>Docs</span>
						<Separator
							orientation="vertical"
							spacing="md"
						/>
						<span>Support</span>
						<Separator
							orientation="vertical"
							spacing="md"
						/>
						<span>Status</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Vertical, in a taller row">
					<div className="flex items-stretch text-sm">
						<div className="space-y-1">
							<p className="font-medium">Orders</p>
							<p className="text-muted-foreground text-xs">128 this month</p>
						</div>
						<Separator
							orientation="vertical"
							spacing="lg"
						/>
						<div className="space-y-1">
							<p className="font-medium">Revenue</p>
							<p className="text-muted-foreground text-xs">R$ 42.900</p>
						</div>
						<Separator
							orientation="vertical"
							spacing="lg"
						/>
						<div className="space-y-1">
							<p className="font-medium">Refunds</p>
							<p className="text-muted-foreground text-xs">3 open</p>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Spacing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The rule owns the room around it.
				</p>
				<ComponentPreview title="none, sm, md, lg">
					<div className="w-full max-w-sm text-sm">
						<p className="text-muted-foreground text-xs">spacing="none"</p>
						<Separator />
						<p className="text-muted-foreground text-xs">spacing="sm" — 8px</p>
						<Separator spacing="sm" />
						<p className="text-muted-foreground text-xs">spacing="md" — 16px</p>
						<Separator spacing="md" />
						<p className="text-muted-foreground text-xs">spacing="lg" — 24px</p>
						<Separator spacing="lg" />
						<p className="text-muted-foreground text-xs">end</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Decorative</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					All three rules below look identical, and that is the point —{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						decorative
					</code>{' '}
					changes nothing on screen.
				</p>
				<ComponentPreview title="Announced, explicitly announced, and hidden">
					<div className="w-full max-w-sm space-y-6 text-sm">
						<div className="space-y-2">
							<code className="text-muted-foreground text-xs">
								{'<Separator />'} — announced
							</code>
							<Separator />
						</div>
						<div className="space-y-2">
							<code className="text-muted-foreground text-xs">
								{'<Separator decorative={false} />'} — announced
							</code>
							<Separator decorative={false} />
						</div>
						<div className="space-y-2">
							<code className="text-muted-foreground text-xs">
								{'<Separator decorative />'} — drawn, not announced
							</code>
							<Separator decorative />
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

export const Route = createFileRoute('/libs/react-web/components/separator')({
	component: Page,
})
