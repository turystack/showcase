import { createFileRoute } from '@tanstack/react-router'
import { Provider, Separator } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const separatorProps = [
	{
		default: '"horizontal"',
		description: 'The orientation of the separator line.',
		name: 'orientation',
		type: '"horizontal" | "vertical"',
	},
	{
		default: 'true',
		description:
			'When true, the separator is purely visual and hidden from accessibility tree.',
		name: 'decorative',
		type: 'boolean',
	},
]

const usageCode = `import { Separator } from '@turystack/ui'

// Horizontal (default) — divides sections vertically
<div>
  <p>Above the separator</p>
  <Separator />
  <p>Below the separator</p>
</div>

// Vertical — divides items horizontally
<div className="flex items-center gap-2 h-5">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>About</span>
  <Separator orientation="vertical" />
  <span>Contact</span>
</div>

// Semantic separator (role="separator" in accessibility tree)
<Separator decorative={false} />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Separator
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A visual divider between sections of content. Renders horizontally
						by default and can be oriented vertically for inline use.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={separatorProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Horizontal</h2>
					<ComponentPreview title="Horizontal separator between sections">
						<div className="w-full max-w-sm space-y-3">
							<div>
								<p className="font-medium text-sm">Section A</p>
								<p className="text-muted-foreground text-xs">
									Some content for the first section.
								</p>
							</div>
							<Separator />
							<div>
								<p className="font-medium text-sm">Section B</p>
								<p className="text-muted-foreground text-xs">
									Some content for the second section.
								</p>
							</div>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Vertical</h2>
					<ComponentPreview title="Vertical separator in breadcrumb-style layout">
						<div className="flex h-5 items-center gap-3">
							<span className="text-sm">Home</span>
							<Separator orientation="vertical" />
							<span className="text-sm">Products</span>
							<Separator orientation="vertical" />
							<span className="text-muted-foreground text-sm">Details</span>
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

export const Route = createFileRoute('/libs/react-web/separator')({
	component: Page,
})
