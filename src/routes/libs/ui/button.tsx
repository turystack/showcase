import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'
import { Button } from '@/components/ui/button'

const buttonProps = [
	{
		default: '"default"',
		description: 'The visual style variant of the button.',
		name: 'variant',
		type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
	},
	{
		default: '"default"',
		description: 'The size of the button.',
		name: 'size',
		type: '"default" | "sm" | "lg" | "icon"',
	},
	{
		default: 'false',
		description:
			'When true, the button renders as its child element using Radix Slot.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Disables the button, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Handler called when the button is clicked.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
	},
]

const usageCode = `import { Button } from '@tury/ui'

// Default
<Button>Click me</Button>

// Variants
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="secondary">Secondary</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>`

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Button
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Displays a button or a component that looks like a button.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Preview</h2>
				<ComponentPreview title="Button variants">
					<div className="flex flex-wrap items-center gap-3">
						<Button>Default</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="ghost">Ghost</Button>
						<Button variant="destructive">Destructive</Button>
						<Button variant="link">Link</Button>
					</div>
				</ComponentPreview>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="Button sizes">
					<div className="flex flex-wrap items-center gap-3">
						<Button size="sm">Small</Button>
						<Button>Default</Button>
						<Button size="lg">Large</Button>
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

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={buttonProps} />
			</div>
		</div>
	)
}

export const Route = createFileRoute('/libs/ui/button')({
	component: Page,
})
