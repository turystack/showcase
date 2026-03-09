import { createFileRoute } from '@tanstack/react-router'
import { Switch, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const switchProps = [
	{
		description:
			'Label text or a label config object with content, required, optional, and disabled.',
		name: 'label',
		type: 'string | { content?: string; required?: boolean; optional?: boolean; disabled?: boolean }',
	},
	{
		description: 'Helper text displayed below the label.',
		name: 'description',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Size of the switch track and thumb.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'The controlled checked state of the switch.',
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
		description: 'Disables the switch, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'When true, renders a bordered card-style container.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		description: 'Handler called when the checked state changes.',
		name: 'onCheckedChange',
		type: '(checked: boolean) => void',
	},
]

const usageCode = `import { Switch } from '@turystack/ui'

// Basic
<Switch />

// With label
<Switch label="Enable notifications" />

// Sizes
<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />

// With description
<Switch
  label="Marketing emails"
  description="Receive emails about new products and features."
/>

// Bordered
<Switch
  label="Dark mode"
  description="Use dark theme across the application."
  bordered
/>

// Controlled
const [enabled, setEnabled] = useState(false)

<Switch
  label="Auto-save"
  checked={enabled}
  onCheckedChange={setEnabled}
/>

// Disabled
<Switch label="Disabled option" disabled />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Switch
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A toggle control that lets users switch between two states: on and
						off.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={switchProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Switch with and without label">
						<div className="flex flex-col gap-4">
							<Switch />
							<Switch label="Enable notifications" />
							<Switch
								label="Marketing emails"
								description="Receive emails about new products and features."
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Switch in sm, md and lg">
						<div className="flex flex-col gap-4">
							<Switch
								size="sm"
								label="Small"
								defaultChecked
							/>
							<Switch
								size="md"
								label="Medium"
								defaultChecked
							/>
							<Switch
								size="lg"
								label="Large"
								defaultChecked
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Bordered</h2>
					<ComponentPreview title="Bordered switch — title only">
						<div className="w-full max-w-md space-y-3">
							<Switch
								bordered
								label="Dark mode"
							/>
							<Switch
								bordered
								defaultChecked
								label="Auto-save"
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Bordered switch — with description">
						<div className="w-full max-w-md space-y-3">
							<Switch
								bordered
								label="Dark mode"
								description="Use dark theme across the application."
							/>
							<Switch
								bordered
								defaultChecked
								label="Auto-save"
								description="Automatically save your work every minute."
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="flex flex-col gap-3">
							<Switch
								label="Disabled (off)"
								disabled
							/>
							<Switch
								label="Disabled (on)"
								disabled
								defaultChecked
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

export const Route = createFileRoute('/libs/ui/switch')({
	component: Page,
})
