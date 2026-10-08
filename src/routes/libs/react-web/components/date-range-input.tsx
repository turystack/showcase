import { createFileRoute, Link } from '@tanstack/react-router'
import {
	type DateRange,
	DateRangeInput,
	type DateRangeInputPreset,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/date-range-input/date-range-input.types.ts`, which
 * is `Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'leftSection' |
 * 'rightSection'>` plus seven of its own — the two sections are the calendar
 * and clear buttons, so the type refuses a node of the consumer's. Defaults come from the destructuring in `date-range-input.tsx` and
 * from the `defaultVariants` in `input.tsx`.
 */
const dateRangeInputProps = [
	{
		description: 'Controlled range; `null` or `{}` shows the placeholder.',
		name: 'value',
		type: '{ from?: Date; to?: Date } | null',
	},
	{
		description: 'Initial range when uncontrolled; sets the opening month.',
		name: 'defaultValue',
		type: '{ from?: Date; to?: Date } | null',
	},
	{
		description: 'Fires on Apply or clear (empty as `null`); never on Cancel.',
		name: 'onChange',
		type: '(range: { from?: Date; to?: Date } | null) => void',
	},
	{
		default: 'seven built-ins',
		description: 'Quick ranges listed on the left of the popover.',
		name: 'presets',
		type: '{ key: string; label: string; getValue?: () => DateRange | null }[]',
	},
	{
		default: 'true',
		description: 'Shows the preset column.',
		name: 'showPresets',
		type: 'boolean',
	},
	{
		default: 'labels.common.apply — "Apply"',
		description: 'Label of the button that commits the draft.',
		name: 'applyLabel',
		type: 'string',
	},
	{
		default: 'labels.common.cancel — "Cancel"',
		description: 'Label of the button that discards the draft.',
		name: 'cancelLabel',
		type: 'string',
	},
	{
		default: '"dd/mm/yyyy ~ dd/mm/yyyy"',
		description: 'Text shown while there is no range.',
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
		description: 'Field styling. `ghost` drops the border and the background.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		default: 'false',
		description: 'Disables the calendar button and actions; hides clear.',
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
		default: '36',
		description: 'Calendar button width in px; also the left padding.',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		default: '36',
		description: 'Clear button width in px; also the right padding.',
		name: 'rightSectionWidth',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Inert: the field is read-only.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id of the native input.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Name submitted with a native form.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Id of the form the field belongs to.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Accessible name (aria-label).',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Invalid state; destructive border.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id(s) of the hint or error message.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: '"input-field"',
		description: 'Inherited from Input. Testing handle on the native input.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Set on the read-only trigger input.',
		name: 'autoComplete',
		type: 'React.HTMLInputAutoCompleteAttribute',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Focuses the field on mount.',
		name: 'autoFocus',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Set on the read-only trigger input.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Inherited from Input. Set on the read-only trigger input.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Inherited from Input. Set on the read-only trigger input.',
		name: 'minLength',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Required for native form validation.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Inherited from Input. No-op: trigger is always read-only.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Fires when the field loses focus.',
		name: 'onBlur',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires when the field gains focus.',
		name: 'onFocus',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires on every key press in the field.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Runs on click, then the popover opens.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

const usageCode = `import { DateRangeInput } from '@turystack/react-web'
import type { DateRange, DateRangeInputPreset } from '@turystack/react-web'
import { useState } from 'react'

// Controlled — onChange fires on Apply, not on every click in the calendar
const [range, setRange] = useState<DateRange | null>({
  from: new Date(2026, 0, 10),
  to: new Date(2026, 0, 20),
})

// No visible label: name the field (inside a Form.Field the label does it)
<DateRangeInput ariaLabel="Período da estadia" onChange={setRange} value={range} />

// Uncontrolled
<DateRangeInput
  defaultValue={{ from: new Date(2026, 0, 10), to: new Date(2026, 0, 20) }}
/>

// Presets of your own. No getValue means "custom" — it only marks itself
// active; a getValue that returns null clears the draft.
const presets: DateRangeInputPreset[] = [
  {
    getValue: () => ({ from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) }),
    key: 'january',
    label: 'January 2026',
  },
  { getValue: () => null, key: 'none', label: 'Clear' },
  { key: 'custom', label: 'Custom' },
]

<DateRangeInput onChange={setRange} presets={presets} />

// Calendar only
<DateRangeInput onChange={setRange} showPresets={false} />

// Action labels
<DateRangeInput applyLabel="Filter" cancelLabel="Close" onChange={setRange} />

// States
<DateRangeInput disabled value={range} />
<DateRangeInput loading value={range} />

// Your onClick runs too — then the popover opens (unless disabled)
<DateRangeInput onClick={() => track('periodo_aberto')} value={range} />`

const JAN_10 = new Date(2026, 0, 10)
const JAN_20 = new Date(2026, 0, 20)
const MAY_04 = new Date(2026, 4, 4)

const customPresets: DateRangeInputPreset[] = [
	{
		getValue: () => ({
			from: new Date(2026, 0, 1),
			to: new Date(2026, 0, 31),
		}),
		key: 'january',
		label: 'January 2026',
	},
	{
		getValue: () => ({
			from: new Date(2026, 0, 1),
			to: new Date(2026, 2, 31),
		}),
		key: 'q1',
		label: 'Q1 2026',
	},
	{
		getValue: () => null,
		key: 'none',
		label: 'Clear',
	},
	{
		key: 'custom',
		label: 'Custom',
	},
]

/** dd/MM/yyyy without pulling date-fns into the showcase. */
function dmy(date: Date | undefined) {
	if (!date) {
		return '—'
	}
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	return `${day}/${month}/${date.getFullYear()}`
}

function describe(range: DateRange | null) {
	if (!range) {
		return 'null'
	}
	return `{ from: ${dmy(range.from)}, to: ${dmy(range.to)} }`
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
	const [range, setRange] = useState<DateRange | null>({
		from: JAN_10,
		to: JAN_20,
	})

	return (
		<div className="flex w-72 flex-col gap-3">
			<DateRangeInput
				ariaLabel="Período da estadia"
				onChange={setRange}
				value={range}
			/>
			<Readout>{describe(range)}</Readout>
		</div>
	)
}

function PresetExample() {
	const [range, setRange] = useState<DateRange | null>(null)

	return (
		<div className="flex w-72 flex-col gap-3">
			<DateRangeInput
				ariaLabel="Período da estadia"
				onChange={setRange}
				presets={customPresets}
				value={range}
			/>
			<Readout>{describe(range)}</Readout>
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
					DateRangeInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A read-only field over a two-month calendar with a column of quick
					ranges beside it.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={dateRangeInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					“Inherited from Input” rows are Input’s closed list of form
					attributes, set on the read-only field. See{' '}
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

			<SlotsSection slug="date-range-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Picks build a draft: Apply commits it, Cancel discards it.
				</p>
				<ComponentPreview title="Controlled — Apply commits, Cancel discards">
					<ControlledExample />
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — the field owns the range">
					<div className="w-72">
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Display</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A half-open range is legal, and reads differently at each end: a lone
					start shows bare, a lone end goes through the labels.
				</p>
				<ComponentPreview title="Both ends, start only, end only, empty">
					<div className="flex w-72 flex-col gap-3">
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
							}}
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								to: JAN_20,
							}}
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={null}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Presets</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Six ranges relative to today, Today to Last month, plus Custom. The
					provider labels them.
				</p>
				<ComponentPreview title="The built-in quick ranges">
					<div className="w-72">
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={null}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Replacing them replaces all seven.
				</p>
				<ComponentPreview title="Presets of your own">
					<PresetExample />
				</ComponentPreview>
				<ComponentPreview title="showPresets={false} — calendar and actions only">
					<div className="w-72">
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={null}
							showPresets={false}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Action labels</h2>
				<ComponentPreview title="applyLabel and cancelLabel">
					<div className="w-72">
						<DateRangeInput
							applyLabel="Filter"
							ariaLabel="Período da estadia"
							cancelLabel="Close"
							defaultValue={{
								from: MAY_04,
							}}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="flex w-72 flex-col gap-3">
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
							size="sm"
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
							size="md"
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="default and ghost">
					<div className="flex w-72 flex-col gap-3">
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
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
					swaps the clear button for a spinner; the popover still opens.
				</p>
				<ComponentPreview title="Disabled">
					<div className="flex w-72 flex-col gap-3">
						<DateRangeInput
							ariaLabel="Período da estadia"
							disabled
							value={{
								from: JAN_10,
								to: JAN_20,
							}}
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							disabled
							value={null}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Loading">
					<div className="w-72">
						<DateRangeInput
							ariaLabel="Período da estadia"
							loading
							value={{
								from: JAN_10,
								to: JAN_20,
							}}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Buttons and keyboard
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Buttons are named by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dateInput.open
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						common.clear
					</code>
					. Tab: calendar button, field, clear (only with a range).
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Section widths</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The sections hold the calendar and clear buttons; only their widths
					are configurable. There is no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						leftSection
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rightSection
					</code>
					.
				</p>
				<ComponentPreview title="Default 36px against a roomier 56px">
					<div className="flex w-72 flex-col gap-3">
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
						/>
						<DateRangeInput
							ariaLabel="Período da estadia"
							defaultValue={{
								from: JAN_10,
								to: JAN_20,
							}}
							leftSectionWidth={56}
							rightSectionWidth={56}
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

export const Route = createFileRoute(
	'/libs/react-web/components/date-range-input',
)({
	component: Page,
})
