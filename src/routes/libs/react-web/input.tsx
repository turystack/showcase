import { createFileRoute } from '@tanstack/react-router'
import { Input, Provider } from '@turystack/ui'
import { Search } from 'lucide-react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const inputProps = [
	{
		description: 'The controlled value of the input.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'The default value when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Placeholder text displayed when the input is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the input.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Content rendered on the left side of the input.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content rendered on the right side of the input.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description:
			'When true, the onChange callback is debounced (~300ms) and the input uses defaultValue instead of controlled value.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Disables the input, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a loading spinner in the input.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description:
			'Handler called when the input value changes. Receives null when empty.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
]

const usageCode = `import { Input } from '@turystack/ui'

// Basic
<Input placeholder="Enter your name" />

// Sizes
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />

// With sections
<Input
  leftSection={<Search className="size-4 text-muted-foreground" />}
  placeholder="Search..."
/>

// Loading
<Input loading placeholder="Loading..." />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Input
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A text input field that supports multiple sizes, sections, debounce,
						and loading state.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={inputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Simple text input">
						<div className="w-80">
							<Input placeholder="Enter your name" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Input sizes">
						<div className="flex w-80 flex-col gap-3">
							<Input
								placeholder="Small"
								size="sm"
							/>
							<Input
								placeholder="Medium"
								size="md"
							/>
							<Input
								placeholder="Large"
								size="lg"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With sections</h2>
					<ComponentPreview title="Left and right sections">
						<div className="flex w-80 flex-col gap-3">
							<Input
								leftSection={
									<Search className="size-4 text-muted-foreground" />
								}
								placeholder="Search..."
							/>
							<Input
								placeholder="Weight"
								rightSection={
									<span className="text-muted-foreground text-sm">kg</span>
								}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<div className="w-80">
							<Input
								loading
								placeholder="Loading..."
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<Input
								disabled
								placeholder="Disabled input"
							/>
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

export const Route = createFileRoute('/libs/react-web/input')({
	component: Page,
})
