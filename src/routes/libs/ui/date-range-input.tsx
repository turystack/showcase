import { createFileRoute } from '@tanstack/react-router'
import { DateRangeInput, TuryStackProvider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const dateRangeInputProps = [
	{
		description: 'The controlled date range value.',
		name: 'value',
		type: '{ from?: Date; to?: Date } | null',
	},
	{
		description: 'The default date range when uncontrolled.',
		name: 'defaultValue',
		type: '{ from?: Date; to?: Date } | null',
	},
	{
		description: 'Placeholder text when no range is selected.',
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
		description: 'Disables the date range input.',
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
			'Handler called when the range changes. Receives null when cleared.',
		name: 'onChange',
		type: '(range: DateRange | null) => void',
	},
]

const usageCode = `import { DateRangeInput } from '@turystack/ui'

// Basic
<DateRangeInput placeholder="Select a period" />

// Block (full width)
<DateRangeInput block placeholder="Select a period" />`

function Page() {
	return (
		<TuryStackProvider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						DateRangeInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A date range picker with a two-month calendar popover. Displays the
						selected range as "dd/MM/yyyy ~ dd/MM/yyyy".
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={dateRangeInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Click to open calendar">
						<DateRangeInput placeholder="Select a period" />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<DateRangeInput
							disabled
							placeholder="Disabled"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Block</h2>
					<ComponentPreview title="Full width">
						<DateRangeInput
							block
							placeholder="Select a period"
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

export const Route = createFileRoute('/libs/ui/date-range-input')({
	component: Page,
})
