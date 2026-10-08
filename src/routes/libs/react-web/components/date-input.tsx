import { createFileRoute, Link } from '@tanstack/react-router'
import { DateInput } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/date-input/date-input.types.ts`,
 * which is `Omit<InputProps, 'value' | 'defaultValue' | 'onChange'>` plus three
 * date-shaped replacements. Everything else in the table comes from
 * `input.types.ts` and from the `defaultVariants` in `input.tsx`.
 */
const dateInputProps = [
	{
		description: 'Controlled date; `null` shows the placeholder.',
		name: 'value',
		type: 'Date | null',
	},
	{
		description: 'Initial date when uncontrolled.',
		name: 'defaultValue',
		type: 'Date | null',
	},
	{
		description: 'Fires with the picked day, or `null` when cleared.',
		name: 'onChange',
		type: '(date: Date | null) => void',
	},
	{
		default: '"dd/mm/yyyy"',
		description: 'Text shown while there is no date.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Field height; also sizes the popover Calendar.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'Field style; `ghost` has no border or background.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		default: 'false',
		description: 'Blocks the popover and hides the clear button.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a spinner in place of the clear button.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Replaces the icon inside the calendar button.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Left section width in px (also the left padding).',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		description: 'Replaces the clear button.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Right section width in px (also the right padding).',
		name: 'rightSectionWidth',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Inert here; nothing is typed into the field.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		description: 'Id of the native input, for label htmlFor.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Field name submitted with a native form.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Id of a form to associate the field with.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'Accessible name (aria-label) when no visible label.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Marks the field invalid; paints the destructive border.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Id(s) of the hint or error describing the field.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: '"input-field"',
		description: 'Test id on the native input.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Forwarded to the read-only trigger input.',
		name: 'autoComplete',
		type: 'React.HTMLInputAutoCompleteAttribute',
	},
	{
		default: 'false',
		description: 'Focuses the field on mount.',
		name: 'autoFocus',
		type: 'boolean',
	},
	{
		description: 'Forwarded to the read-only trigger input.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Forwarded to the read-only trigger input.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Forwarded to the read-only trigger input.',
		name: 'minLength',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Marks the field required for native validation.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Accepted; the trigger is always read-only.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		description: 'Fires when the field loses focus.',
		name: 'onBlur',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Fires when the field gains focus.',
		name: 'onFocus',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Fires on every key press in the field.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLInputElement>',
	},
	{
		description: 'Called before the popover opens.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

const usageCode = `import { DateInput, LabelsProvider } from '@turystack/react-web'
import { useState } from 'react'

// Controlled — the parent stores the Date
const [date, setDate] = useState<Date | null>(new Date(2026, 0, 15))

<DateInput onChange={setDate} value={date} />

// Uncontrolled — the field keeps its own value
<DateInput defaultValue={new Date(2026, 0, 15)} />

// Empty, with a placeholder of your own
<DateInput onChange={setDate} placeholder="Pick a day" value={null} />

// Sizes — the Calendar in the popover follows the field
<DateInput defaultValue={date} size="sm" />
<DateInput defaultValue={date} size="md" />
<DateInput defaultValue={date} size="lg" />

// Borderless
<DateInput defaultValue={date} variant="ghost" />

// States
<DateInput disabled value={date} />
<DateInput loading value={date} />

// Named controls — the words come from LabelsProvider (dateInput.open / dateInput.clear)
<LabelsProvider labels={{ dateInput: { clear: 'Limpar data de ida', open: 'Escolher data de ida' } }}>
  <DateInput ariaLabel="Data de ida" onChange={setDate} value={date} />
</LabelsProvider>`

const JAN_15 = new Date(2026, 0, 15)
const MAR_03 = new Date(2026, 2, 3)
const SEP_28 = new Date(2026, 8, 28)

/** dd/MM/yyyy without pulling date-fns into the showcase. */
function dmy(date: Date | null) {
	if (!date) {
		return 'null'
	}
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	return `${day}/${month}/${date.getFullYear()}`
}

function Readout({ children }: { children: string }) {
	return (
		<p className="text-center text-muted-foreground text-xs">
			onChange delivered{' '}
			<code className="rounded-lg bg-muted px-1.5 py-0.5 text-foreground">
				{children}
			</code>
		</p>
	)
}

function ControlledExample() {
	const [date, setDate] = useState<Date | null>(JAN_15)

	return (
		<div className="flex w-64 flex-col gap-3">
			<DateInput
				ariaLabel="Data do check-in"
				onChange={setDate}
				value={date}
			/>
			<Readout>{dmy(date)}</Readout>
		</div>
	)
}

function EmptyExample() {
	const [date, setDate] = useState<Date | null>(null)

	return (
		<div className="flex w-64 flex-col gap-3">
			<DateInput
				ariaLabel="Data do check-in"
				onChange={setDate}
				placeholder="Pick a day"
				value={date}
			/>
			<Readout>{dmy(date)}</Readout>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					DateInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A read-only field that opens a single-month calendar.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={dateInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Inherited props land on the read-only trigger input; see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					.
				</p>
			</section>

			<SlotsSection slug="date-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The popover opens on the selected month, or the current month when
					empty.
				</p>
				<ComponentPreview title="Controlled — the parent owns the Date">
					<ControlledExample />
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultValue">
					<div className="w-64">
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={MAR_03}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Empty, with a placeholder of its own">
					<EmptyExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size
					</code>{' '}
					sets the field height and the popover Calendar size.
				</p>
				<ComponentPreview title="sm, md, lg">
					<div className="flex w-64 flex-col gap-3">
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
							size="sm"
						/>
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
							size="md"
						/>
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="default and ghost">
					<div className="flex w-64 flex-col gap-3">
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
						/>
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					puts a spinner where the clear button lives — it does not sit beside
					it, and it does not block the popover. Only{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					does that.
				</p>
				<ComponentPreview title="Disabled, with and without a value">
					<div className="flex w-64 flex-col gap-3">
						<DateInput
							ariaLabel="Data do check-in"
							disabled
							value={JAN_15}
						/>
						<DateInput
							ariaLabel="Data do check-in"
							disabled
							value={null}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Loading">
					<div className="w-64">
						<DateInput
							ariaLabel="Data do check-in"
							loading
							value={SEP_28}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The calendar icon and the clear button are defaults rather than
					fixtures: pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						leftSection
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rightSection
					</code>{' '}
					and yours renders instead.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Both are sibling buttons named by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dateInput.open
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dateInput.clear
					</code>
					; override them via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						LabelsProvider
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Tab order: calendar button, field, clear button. The popup anchors to
					the field and matches its width.
				</p>
				<ComponentPreview title="Default 36px against a roomier 56px">
					<div className="flex w-64 flex-col gap-3">
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
						/>
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
							leftSectionWidth={56}
							rightSectionWidth={56}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="A left section of your own">
					<div className="flex w-64 flex-col gap-3">
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
						/>
						<DateInput
							ariaLabel="Data do check-in"
							defaultValue={JAN_15}
							leftSection={
								<span className="text-muted-foreground text-xs">Due</span>
							}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/date-input')({
	component: Page,
})
