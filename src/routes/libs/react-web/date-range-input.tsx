import { createFileRoute } from '@tanstack/react-router'
import { DateRangeInput, Provider } from '@turystack/ui'

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

// Full width (inputs are w-full by default)
<DateRangeInput placeholder="Select a period" />`

function Page() {
	return (
		<Provider>
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
						<div className="w-80">
							<DateRangeInput placeholder="Select a period" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<DateRangeInput
								disabled
								placeholder="Disabled"
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

export const Route = createFileRoute('/libs/react-web/date-range-input')({
	component: Page,
})
