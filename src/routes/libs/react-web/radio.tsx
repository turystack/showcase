import { createFileRoute } from '@tanstack/react-router'
import { Provider, Radio } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const radioGroupProps = [
	{
		description:
			'Array of radio items with label, value, optional description, and optional disabled.',
		name: 'items',
		required: true,
		type: 'Array<{ label: string; value: string; description?: string; disabled?: boolean }>',
	},
	{
		default: '"vertical"',
		description: 'Layout direction of the radio group.',
		name: 'variant',
		type: '"vertical" | "horizontal"',
	},
	{
		description: 'The controlled selected value.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'The default selected value when uncontrolled.',
		name: 'defaultValue',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Disables all items in the group.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Wraps each item in a bordered card.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		description: 'Handler called when the selected value changes.',
		name: 'onChange',
		type: '(value: string) => void',
	},
]

const radioProps = [
	{
		description: 'Label text for the radio.',
		name: 'label',
		type: 'string',
	},
	{
		description: 'Helper text rendered below the label.',
		name: 'description',
		type: 'string',
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
		default: 'false',
		description: 'Disables the radio, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Wraps the radio in a bordered card.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		description: 'Handler called when the checked state changes.',
		name: 'onChange',
		type: '(checked: boolean) => void',
	},
]

const usageCode = `import { Radio } from '@turystack/ui'

// Radio.Group (most common usage)
<Radio.Group
  items={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ]}
  defaultValue="a"
  onChange={(value) => console.log(value)}
/>

// With per-item descriptions
<Radio.Group
  items={[
    { label: 'Monthly', value: 'monthly', description: 'Billed every month.' },
    { label: 'Annual', value: 'annual', description: 'Save 20% vs monthly.' },
  ]}
  defaultValue="monthly"
/>

// Bordered (card-style items)
<Radio.Group
  bordered
  items={[
    { label: 'Starter', value: 'starter', description: 'Up to 5 users.' },
    { label: 'Pro', value: 'pro', description: 'Up to 50 users.' },
    { label: 'Enterprise', value: 'enterprise', description: 'Unlimited users.' },
  ]}
  defaultValue="pro"
/>

// Horizontal layout
<Radio.Group
  variant="horizontal"
  items={[
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
  ]}
/>

// Standalone Radio with description
<Radio
  bordered
  label="Accept terms and conditions"
  description="By selecting this you agree to our Terms of Service."
/>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Radio
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A set of mutually exclusive radio buttons that allow users to select
						one option from a group.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Radio.Group Props
					</h2>
					<PropsTable props={radioGroupProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Radio Props</h2>
					<PropsTable props={radioProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Vertical</h2>
					<ComponentPreview title="Vertical radio group (default)">
						<Radio.Group
							defaultValue="b"
							items={[
								{
									label: 'Option A',
									value: 'a',
								},
								{
									label: 'Option B',
									value: 'b',
								},
								{
									label: 'Option C',
									value: 'c',
								},
							]}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Horizontal</h2>
					<ComponentPreview title="Horizontal radio group">
						<Radio.Group
							defaultValue="md"
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
					<h2 className="font-display font-semibold text-xl">
						With disabled items
					</h2>
					<ComponentPreview title="Group with a disabled item">
						<Radio.Group
							defaultValue="a"
							items={[
								{
									label: 'Available option',
									value: 'a',
								},
								{
									disabled: true,
									label: 'Unavailable option',
									value: 'b',
								},
								{
									label: 'Another available option',
									value: 'c',
								},
							]}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled group</h2>
					<ComponentPreview title="Entirely disabled group">
						<Radio.Group
							defaultValue="a"
							disabled
							items={[
								{
									label: 'Option A',
									value: 'a',
								},
								{
									label: 'Option B',
									value: 'b',
								},
							]}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With description
					</h2>
					<ComponentPreview title="Radio group with per-item descriptions">
						<Radio.Group
							defaultValue="annual"
							items={[
								{
									description: 'Billed every month.',
									label: 'Monthly',
									value: 'monthly',
								},
								{
									description: 'Save 20% vs monthly.',
									label: 'Annual',
									value: 'annual',
								},
							]}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Bordered</h2>
					<ComponentPreview title="Bordered radio group — title only">
						<div className="w-full max-w-sm">
							<Radio.Group
								bordered
								defaultValue="pro"
								items={[
									{
										label: 'Starter',
										value: 'starter',
									},
									{
										label: 'Pro',
										value: 'pro',
									},
									{
										label: 'Enterprise',
										value: 'enterprise',
									},
								]}
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Bordered radio group — with description">
						<div className="w-full max-w-sm">
							<Radio.Group
								bordered
								defaultValue="pro"
								items={[
									{
										description: 'Up to 5 users.',
										label: 'Starter',
										value: 'starter',
									},
									{
										description: 'Up to 50 users.',
										label: 'Pro',
										value: 'pro',
									},
									{
										description: 'Unlimited users.',
										label: 'Enterprise',
										value: 'enterprise',
									},
								]}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Standalone Radio
					</h2>
					<ComponentPreview title="Single radio button">
						<Radio label="Accept terms and conditions" />
					</ComponentPreview>
					<ComponentPreview title="Standalone radio — bordered title only">
						<div className="w-full max-w-sm">
							<Radio
								bordered
								label="Accept terms and conditions"
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Standalone radio — bordered with description">
						<div className="w-full max-w-sm">
							<Radio
								bordered
								description="By selecting this you agree to our Terms of Service."
								label="Accept terms and conditions"
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

export const Route = createFileRoute('/libs/react-web/radio')({
	component: Page,
})
