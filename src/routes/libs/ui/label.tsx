import { createFileRoute } from '@tanstack/react-router'
import { Label, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const labelProps = [
	{
		description: 'The id of the form element this label is associated with.',
		name: 'htmlFor',
		type: 'string',
	},
	{
		default: 'false',
		description:
			'When true, renders a red asterisk (*) indicating a required field.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description:
			'When true, renders an "(optional)" text indicating an optional field.',
		name: 'optional',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'When true, renders the label in a muted/disabled style.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description:
			'Tooltip content shown via an info icon next to the label text.',
		name: 'tooltip',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Label } from '@turystack/ui'

// Basic
<Label htmlFor="email">Email address</Label>

// Required field
<Label htmlFor="name" required>Full name</Label>

// Optional field
<Label htmlFor="bio" optional>Bio</Label>

// Disabled
<Label htmlFor="field" disabled>Disabled field</Label>

// With tooltip
<Label htmlFor="api-key" required tooltip="Find this in your developer settings.">
  API Key
</Label>

// With input
<div className="flex flex-col gap-1.5">
  <Label htmlFor="email" required>Email</Label>
  <input id="email" type="email" placeholder="you@example.com" />
</div>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Label
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						An accessible label for form elements, with optional required,
						optional, and tooltip indicators.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={labelProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Label variants">
						<div className="flex flex-col gap-3">
							<Label htmlFor="basic">Basic label</Label>
							<Label
								htmlFor="required"
								required
							>
								Required field
							</Label>
							<Label
								htmlFor="optional"
								optional
							>
								Optional field
							</Label>
							<Label
								disabled
								htmlFor="disabled"
							>
								Disabled label
							</Label>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With tooltip</h2>
					<ComponentPreview title="Label with info tooltip">
						<div className="flex flex-col gap-3">
							<Label
								htmlFor="api-key"
								required
								tooltip="Find your API key in the developer settings."
							>
								API Key
							</Label>
							<Label
								htmlFor="webhook"
								optional
								tooltip="We'll send POST requests to this URL on each event."
							>
								Webhook URL
							</Label>
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

export const Route = createFileRoute('/libs/ui/label')({
	component: Page,
})
