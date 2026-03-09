import { createFileRoute } from '@tanstack/react-router'
import { Button, Popover, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const popoverProps = [
	{
		description: 'The content rendered inside the popover panel.',
		name: 'content',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: '"bottom"',
		description: 'The preferred side of the trigger to render the popover.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '4',
		description: 'Distance in pixels between the popover and the trigger.',
		name: 'sideOffset',
		type: 'number',
	},
]

const usageCode = `import { Popover, Button } from '@turystack/ui'

<Popover
  content={
    <div className="p-2">
      <p className="font-medium text-sm">Quick info</p>
      <p className="mt-1 text-muted-foreground text-xs">
        This is a popover with rich content.
      </p>
    </div>
  }
>
  <Button variant="outline">Open popover</Button>
</Popover>

// Different sides
<Popover side="top" content={<div>Top popover</div>}>
  <Button>Top</Button>
</Popover>

<Popover side="right" content={<div>Right popover</div>}>
  <Button>Right</Button>
</Popover>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Popover
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A floating panel that appears relative to a trigger element, used to
						show rich content without blocking the main UI.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={popoverProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Popover with rich content">
						<Popover
							content={
								<div className="p-3">
									<p className="font-medium text-sm">Popover title</p>
									<p className="mt-1 max-w-xs text-muted-foreground text-xs">
										This is a popover with custom content. You can put any
										React node here.
									</p>
								</div>
							}
						>
							<Button variant="outline">Open popover</Button>
						</Popover>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sides</h2>
					<ComponentPreview title="Popover on different sides">
						<div className="flex flex-wrap items-center justify-center gap-4">
							{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
								<Popover
									key={side}
									content={<div className="p-2 text-sm">{side} popover</div>}
									side={side}
								>
									<Button variant="outline">{side}</Button>
								</Popover>
							))}
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
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/popover')({
	component: Page,
})
