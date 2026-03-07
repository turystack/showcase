import { createFileRoute } from '@tanstack/react-router'
import { Badge, TuryStackProvider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const badgeProps = [
	{
		default: '"default"',
		description: 'The visual style variant of the badge.',
		name: 'variant',
		type: '"default" | "secondary" | "destructive" | "outline"',
	},
	{
		description: 'Horizontal alignment of the badge content.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
	{
		default: 'false',
		description: 'When true, the badge stretches to fill its container width.',
		name: 'block',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'When true, shows a loading spinner instead of the content.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description:
			'When true, the badge renders as its child element using Radix Slot.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Handler called when the badge is clicked.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLDivElement>) => void',
	},
]

const usageCode = `import { Badge } from '@turystack/ui'

// Variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>

// Loading
<Badge loading>Loading</Badge>

// Block (full width)
<Badge block>Full width</Badge>`

function Page() {
	return (
		<TuryStackProvider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Badge
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						Displays a badge or a component that looks like a badge.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={badgeProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Variants</h2>
					<ComponentPreview title="Badge variants">
						<div className="flex flex-wrap items-center gap-3">
							<Badge>Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="destructive">Destructive</Badge>
							<Badge variant="outline">Outline</Badge>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<div className="flex flex-wrap items-center gap-3">
							<Badge loading>Default</Badge>
							<Badge
								loading
								variant="secondary"
							>
								Secondary
							</Badge>
							<Badge
								loading
								variant="destructive"
							>
								Destructive
							</Badge>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Block</h2>
					<ComponentPreview title="Full width badge">
						<div className="w-full max-w-sm">
							<Badge block>Full width</Badge>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</TuryStackProvider>
	)
}

export const Route = createFileRoute('/libs/ui/badge')({
	component: Page,
})
