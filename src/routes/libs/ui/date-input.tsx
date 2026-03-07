import { createFileRoute } from '@tanstack/react-router'
import { DateInput, TuryStackProvider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const dateInputProps = [
	{
		description: 'The controlled date value.',
		name: 'value',
		type: 'Date | null',
	},
	{
		description: 'The default date when uncontrolled.',
		name: 'defaultValue',
		type: 'Date | null',
	},
	{
		description: 'Placeholder text when no date is selected.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the trigger input.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Makes the input take the full width of its container.',
		name: 'block',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Disables the date input.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a loading spinner.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description:
			'Handler called when a date is selected. Receives null when cleared.',
		name: 'onChange',
		type: '(date: Date | null) => void',
	},
]

const usageCode = `import { DateInput } from '@turystack/ui'

// Basic
<DateInput placeholder="Select a date" />

// With default value
<DateInput defaultValue={new Date()} />

// Block (full width)
<DateInput block placeholder="Select a date" />`

function Page() {
	return (
		<TuryStackProvider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						DateInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A date picker that displays a calendar popover. Formats dates as
						dd/MM/yyyy.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={dateInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Click to open calendar">
						<DateInput placeholder="Select a date" />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With Default Value
					</h2>
					<ComponentPreview title="Pre-selected date">
						<DateInput defaultValue={new Date()} />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<DateInput
							disabled
							placeholder="Disabled"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Block</h2>
					<ComponentPreview title="Full width">
						<DateInput
							block
							placeholder="Select a date"
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

export const Route = createFileRoute('/libs/ui/date-input')({
	component: Page,
})
