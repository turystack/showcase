import { createFileRoute } from '@tanstack/react-router'
import { Button, TuryStackProvider } from '@turystack/ui'
import { Mail, Search, Trash2 } from 'lucide-react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const buttonProps = [
	{
		default: '"default"',
		description: 'The visual style variant of the button.',
		name: 'variant',
		type: '"default" | "destructive" | "outline" | "dashed" | "secondary" | "ghost" | "link"',
	},
	{
		default: '"md"',
		description: 'The size of the button.',
		name: 'size',
		type: '"sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-md" | "icon-lg"',
	},
	{
		description: 'Content rendered before the button label.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content rendered after the button label.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'When true, shows a loading spinner and disables interaction.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'When true, the button stretches to fill its container width.',
		name: 'block',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Disables the button, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: '"button"',
		description: 'The HTML type attribute for the button element.',
		name: 'type',
		type: '"button" | "submit" | "reset"',
	},
	{
		description:
			'Associates the button with a form element by its id, allowing it to submit or reset a form outside its DOM tree.',
		name: 'form',
		type: 'string',
	},
	{
		default: 'false',
		description:
			'When true, the button renders as its child element using Radix Slot.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Handler called when the button is clicked.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
	},
]

const usageCode = `import { Button } from '@turystack/ui'

// Default
<Button>Click me</Button>

// Variants
<Button variant="outline">Outline</Button>
<Button variant="dashed">Dashed</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="secondary">Secondary</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Icon sizes
<Button size="icon-sm"><Search /></Button>
<Button size="icon-md"><Search /></Button>
<Button size="icon-lg"><Search /></Button>

// With sections
<Button leftSection={<Mail />}>Send email</Button>
<Button rightSection={<Trash2 />} variant="destructive">Delete</Button>

// Loading
<Button loading>Saving...</Button>

// Block (full width)
<Button block>Full width</Button>

// Type & Form association
<Button type="submit">Submit</Button>
<Button type="reset" form="my-form">Reset</Button>`

function Page() {
	return (
		<TuryStackProvider>
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
					<h2 className="font-display font-semibold text-xl">Variants</h2>
					<ComponentPreview title="Button variants">
						<div className="flex flex-wrap gap-3">
							<Button>Default</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="dashed">Dashed</Button>
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
						<div className="flex flex-wrap items-end gap-3">
							<Button size="sm">Small</Button>
							<Button size="md">Medium</Button>
							<Button size="lg">Large</Button>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Icon sizes">
						<div className="flex flex-wrap items-end gap-3">
							<Button size="icon-sm">
								<Search />
							</Button>
							<Button size="icon-md">
								<Search />
							</Button>
							<Button size="icon-lg">
								<Search />
							</Button>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With sections</h2>
					<ComponentPreview title="Left and right sections">
						<div className="flex flex-wrap items-center gap-3">
							<Button leftSection={<Mail />}>Send email</Button>
							<Button
								rightSection={<Trash2 />}
								variant="destructive"
							>
								Delete
							</Button>
							<Button
								leftSection={<Search />}
								variant="outline"
							>
								Search
							</Button>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<div className="flex flex-wrap items-center gap-3">
							<Button loading>Default</Button>
							<Button
								loading
								variant="outline"
							>
								Outline
							</Button>
							<Button
								loading
								variant="secondary"
							>
								Secondary
							</Button>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Block</h2>
					<ComponentPreview title="Full width button">
						<div className="w-full max-w-sm">
							<Button block>Full width</Button>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="flex flex-wrap items-center gap-3">
							<Button disabled>Default</Button>
							<Button
								disabled
								variant="outline"
							>
								Outline
							</Button>
							<Button
								disabled
								variant="destructive"
							>
								Destructive
							</Button>
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
		</TuryStackProvider>
	)
}

export const Route = createFileRoute('/libs/ui/button')({
	component: Page,
})
