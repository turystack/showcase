import { createFileRoute } from '@tanstack/react-router'
import { Checkbox, TuryStackProvider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const checkboxProps = [
	{
		description: 'Label text displayed next to the checkbox.',
		name: 'label',
		type: 'string',
	},
	{
		description: 'The value associated with the checkbox (useful in groups).',
		name: 'value',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the checkbox.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Disables the checkbox, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'The controlled checked state.',
		name: 'checked',
		type: 'boolean',
	},
	{
		description: 'The default checked state when uncontrolled.',
		name: 'defaultChecked',
		type: 'boolean',
	},
	{
		description: 'Handler called when the checked state changes.',
		name: 'onChange',
		type: '(checked: boolean) => void',
	},
]

const checkboxGroupProps = [
	{
		description: 'The list of checkbox items to render.',
		name: 'items',
		required: true,
		type: 'CheckboxItem[]',
	},
	{
		description: 'The controlled selected values.',
		name: 'value',
		type: 'string[]',
	},
	{
		description: 'The default selected values when uncontrolled.',
		name: 'defaultValue',
		type: 'string[]',
	},
	{
		default: 'false',
		description: 'Disables all checkboxes in the group.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: '"vertical"',
		description: 'The layout direction of the group.',
		name: 'variant',
		type: '"vertical" | "horizontal"',
	},
	{
		description: 'Handler called when the selected values change.',
		name: 'onChange',
		type: '(value: string[]) => void',
	},
]

const usageCode = `import { Checkbox } from '@turystack/ui'

// Single checkbox
<Checkbox label="Accept terms and conditions" />

// Sizes
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />

// Checkbox group (vertical)
<Checkbox.Group
  items={[
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
  ]}
  defaultValue={['react']}
/>

// Checkbox group (horizontal)
<Checkbox.Group
  variant="horizontal"
  items={[
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ]}
/>`

function Page() {
	return (
		<TuryStackProvider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Checkbox
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A control that allows the user to toggle between checked and not
						checked.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={checkboxProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Checkbox.Group Props
					</h2>
					<PropsTable props={checkboxGroupProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Single checkbox">
						<div className="flex flex-col gap-3">
							<Checkbox label="Accept terms and conditions" />
							<Checkbox
								label="Subscribe to newsletter"
								defaultChecked
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Checkbox sizes">
						<div className="flex flex-col gap-3">
							<Checkbox
								size="sm"
								label="Small"
							/>
							<Checkbox
								size="md"
								label="Medium"
							/>
							<Checkbox
								size="lg"
								label="Large"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Group (vertical)
					</h2>
					<ComponentPreview title="Vertical checkbox group">
						<Checkbox.Group
							defaultValue={[
								'react',
							]}
							items={[
								{
									label: 'React',
									value: 'react',
								},
								{
									label: 'Vue',
									value: 'vue',
								},
								{
									label: 'Svelte',
									value: 'svelte',
								},
								{
									label: 'Angular',
									value: 'angular',
								},
							]}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Group (horizontal)
					</h2>
					<ComponentPreview title="Horizontal checkbox group">
						<Checkbox.Group
							items={[
								{
									label: 'Small',
									value: 'sm',
								},
								{
									label: 'Medium',
									value: 'md',
								},
								{
									label: 'Large',
									value: 'lg',
								},
							]}
							variant="horizontal"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="flex flex-col gap-3">
							<Checkbox
								disabled
								label="Disabled unchecked"
							/>
							<Checkbox
								disabled
								defaultChecked
								label="Disabled checked"
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Disabled group">
						<Checkbox.Group
							defaultValue={[
								'react',
							]}
							disabled
							items={[
								{
									label: 'React',
									value: 'react',
								},
								{
									label: 'Vue',
									value: 'vue',
								},
								{
									label: 'Svelte',
									value: 'svelte',
								},
							]}
						/>
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

export const Route = createFileRoute('/libs/ui/checkbox')({
	component: Page,
})
