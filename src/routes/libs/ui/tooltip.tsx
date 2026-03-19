import { createFileRoute } from '@tanstack/react-router'
import { Button, Provider, Tooltip, Typography } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const tooltipProps = [
	{
		description: 'The text content displayed inside the tooltip.',
		name: 'content',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: '"top"',
		description: 'The preferred side of the trigger to render the tooltip.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '4',
		description: 'The distance in pixels between the tooltip and its trigger.',
		name: 'sideOffset',
		type: 'number',
	},
	{
		description:
			'The duration in milliseconds to wait before showing the tooltip.',
		name: 'delayDuration',
		type: 'number',
	},
]

const usageCode = `import { Tooltip, Button } from '@turystack/ui'

// Wrap any element as the trigger
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Different sides
<Tooltip content="Top tooltip" side="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Right tooltip" side="right">
  <Button>Right</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" side="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" side="left">
  <Button>Left</Button>
</Tooltip>

// Custom delay
<Tooltip content="Delayed tooltip" delayDuration={800}>
  <Button>Slow tooltip</Button>
</Tooltip>

// Instant tooltip
<Tooltip content="Instant tooltip" delayDuration={0}>
  <Button>Instant</Button>
</Tooltip>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Tooltip
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A popup that displays informative text when users hover over or
						focus on an element.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={tooltipProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Simple tooltip">
						<Tooltip content="This is a helpful tooltip">
							<Button variant="outline">Hover me</Button>
						</Tooltip>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sides</h2>
					<ComponentPreview title="Tooltip sides">
						<div className="flex flex-wrap items-center justify-center gap-4">
							<Tooltip
								content="Top tooltip"
								side="top"
							>
								<Button variant="outline">Top</Button>
							</Tooltip>
							<Tooltip
								content="Right tooltip"
								side="right"
							>
								<Button variant="outline">Right</Button>
							</Tooltip>
							<Tooltip
								content="Bottom tooltip"
								side="bottom"
							>
								<Button variant="outline">Bottom</Button>
							</Tooltip>
							<Tooltip
								content="Left tooltip"
								side="left"
							>
								<Button variant="outline">Left</Button>
							</Tooltip>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Delay duration</h2>
					<ComponentPreview title="Tooltip with custom delay">
						<div className="flex flex-wrap items-center justify-center gap-4">
							<Tooltip
								content="Instant tooltip"
								delayDuration={0}
							>
								<Button variant="outline">Instant (0ms)</Button>
							</Tooltip>
							<Tooltip content="Default delay tooltip">
								<Button variant="outline">Default</Button>
							</Tooltip>
							<Tooltip
								content="Slow tooltip"
								delayDuration={800}
							>
								<Button variant="outline">Slow (800ms)</Button>
							</Tooltip>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Rich content</h2>
					<ComponentPreview title="Tooltip with structured content">
						<Tooltip
							content={
								<div className="flex max-w-xs flex-col items-start gap-1">
									<Typography
										size="sm"
										weight="semibold"
									>
										Pro feature
									</Typography>
									<Typography
										size="xs"
										variant="muted"
									>
										Unlock advanced analytics, custom reports, and priority
										support on the Pro plan.
									</Typography>
								</div>
							}
						>
							<Button variant="outline">Hover for details</Button>
						</Tooltip>
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
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/tooltip')({
	component: Page,
})
