import { createFileRoute } from '@tanstack/react-router'
import { DateInput, Provider } from '@turystack/ui'

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

// Full width (inputs are w-full by default)
<DateInput placeholder="Select a date" />`

function Page() {
	return (
		<Provider>
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
						<div className="w-80">
							<DateInput placeholder="Select a date" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With Default Value
					</h2>
					<ComponentPreview title="Pre-selected date">
						<div className="w-80">
							<DateInput defaultValue={new Date()} />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<DateInput
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

export const Route = createFileRoute('/libs/react-web/date-input')({
	component: Page,
})
