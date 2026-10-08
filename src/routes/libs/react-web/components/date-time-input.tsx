import { createFileRoute, Link } from '@tanstack/react-router'
import { DateTimeInput } from '@turystack/react-web'
import { Plane } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/date-time-input/date-time-input.types.ts`, which is
 * `Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'debounce'>` plus
 * a Date-shaped value trio and seven props of its own — so `debounce` is gone from this component and is
 * deliberately absent below. Rows marked "Inherited from Input" are Input's
 * closed list of form attributes, forwarded to the read-only trigger.
 */
const dateTimeInputProps = [
	{
		description: 'Controlled date-time; `null` shows the placeholder.',
		name: 'value',
		type: 'Date | null',
	},
	{
		description: 'Initial date-time when uncontrolled.',
		name: 'defaultValue',
		type: 'Date | null',
	},
	{
		description: 'Fires on a picked day and on every complete time.',
		name: 'onChange',
		type: '(value: Date | null) => void',
	},
	{
		default: '"00:00" / "00:00:00"',
		description: 'Time set when a day is picked with no time yet.',
		name: 'defaultTime',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Adds a seconds segment and `:ss` to the format.',
		name: 'withSeconds',
		type: 'boolean',
	},
	{
		default: '"dd/MM/yyyy HH:mm"',
		description: 'date-fns format of the trigger; gains ":ss" with seconds.',
		name: 'valueFormat',
		type: 'string',
	},
	{
		description: 'Earliest selectable day; earlier days are disabled.',
		name: 'minDate',
		type: 'Date',
	},
	{
		description: 'Latest selectable day; later days are disabled.',
		name: 'maxDate',
		type: 'Date',
	},
	{
		description: 'Earliest time; an earlier one is raised to it on blur.',
		name: 'minTime',
		type: 'string',
	},
	{
		description: 'Latest time; a later one is lowered to it on blur.',
		name: 'maxTime',
		type: 'string',
	},
	{
		default: '"dd/mm/yyyy hh:mm"',
		description: 'Text shown while empty; gains ":ss" with seconds.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Field height; also sizes the popover Calendar and TimeInput.',
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
		description: 'Disables the calendar, confirm and clear buttons.',
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
		description: 'Content of the calendar button, in place of its icon.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Left section width in px; also the left padding.',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		description: 'Replaces the clear button, the only way to empty the field.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Right section width in px; also the right padding.',
		name: 'rightSectionWidth',
		type: 'number',
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

const usageCode = `import { DateTimeInput } from '@turystack/react-web'
import { useState } from 'react'

// Controlled — onChange fires on the day, and again on every complete time
const [when, setWhen] = useState<Date | null>(new Date(2026, 0, 15, 14, 30))

<DateTimeInput onChange={setWhen} value={when} />

// Uncontrolled
<DateTimeInput defaultValue={new Date(2026, 0, 15, 14, 30)} />

// Seconds, in the popover and in the trigger
<DateTimeInput onChange={setWhen} value={when} withSeconds />

// A display format of your own — date-fns tokens, trigger only
<DateTimeInput onChange={setWhen} value={when} valueFormat="yyyy-MM-dd HH:mm" />

// The time a freshly picked day starts on
<DateTimeInput defaultTime="09:15" onChange={setWhen} value={when} />

// Bounds: days on the calendar, times in the time control
<DateTimeInput
  maxDate={new Date(2026, 0, 20)}
  maxTime="18:00"
  minDate={new Date(2026, 0, 12)}
  minTime="08:00"
  onChange={setWhen}
  value={when}
/>

// States
<DateTimeInput disabled value={when} />
<DateTimeInput loading value={when} />`

const JAN_15_1430 = new Date(2026, 0, 15, 14, 30)
const JAN_15_143045 = new Date(2026, 0, 15, 14, 30, 45)
const MIN_DATE = new Date(2026, 0, 12)
const MAX_DATE = new Date(2026, 0, 20)

/** dd/MM/yyyy HH:mm:ss without pulling date-fns into the showcase. */
function stamp(date: Date | null) {
	if (!date) {
		return 'null'
	}
	const pad = (n: number) => String(n).padStart(2, '0')
	const day = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`
	const time = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
	return `${day} ${time}`
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
	const [when, setWhen] = useState<Date | null>(JAN_15_1430)

	return (
		<div className="flex w-72 flex-col gap-3">
			<DateTimeInput
				onChange={setWhen}
				value={when}
			/>
			<Readout>{stamp(when)}</Readout>
		</div>
	)
}

function SecondsExample() {
	const [when, setWhen] = useState<Date | null>(JAN_15_143045)

	return (
		<div className="flex w-72 flex-col gap-3">
			<DateTimeInput
				onChange={setWhen}
				value={when}
				withSeconds
			/>
			<Readout>{stamp(when)}</Readout>
		</div>
	)
}

function DefaultTimeExample() {
	const [when, setWhen] = useState<Date | null>(null)

	return (
		<div className="flex w-72 flex-col gap-3">
			<DateTimeInput
				defaultTime="09:15"
				onChange={setWhen}
				value={when}
			/>
			<Readout>{stamp(when)}</Readout>
		</div>
	)
}

function BoundsExample() {
	const [when, setWhen] = useState<Date | null>(JAN_15_1430)

	return (
		<div className="flex w-72 flex-col gap-3">
			<DateTimeInput
				maxDate={MAX_DATE}
				maxTime="18:00"
				minDate={MIN_DATE}
				minTime="08:00"
				onChange={setWhen}
				value={when}
			/>
			<Readout>{stamp(when)}</Readout>
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
					DateTimeInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A calendar and a segmented time control stacked in one popover.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={dateTimeInputProps} />
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

			<SlotsSection slug="date-time-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Picking a day keeps the popover open and moves focus to the hours. The
					calendar opens on the current month, not the value’s.
				</p>
				<ComponentPreview title="Controlled — the parent owns the Date">
					<ControlledExample />
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — the field owns the Date">
					<div className="w-72">
						<DateTimeInput defaultValue={JAN_15_1430} />
					</div>
				</ComponentPreview>
				<ComponentPreview title="Empty">
					<div className="w-72">
						<DateTimeInput defaultValue={null} />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Seconds</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						withSeconds
					</code>{' '}
					adds a seconds segment; a time commits only once all three are filled.
				</p>
				<ComponentPreview title="withSeconds">
					<SecondsExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Display format</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						valueFormat
					</code>{' '}
					is a date-fns token string and changes the trigger only — the calendar
					and the segments inside the popover are unaffected.
				</p>
				<ComponentPreview title="Default, ISO-ish, and a written-out one">
					<div className="flex w-72 flex-col gap-3">
						<DateTimeInput defaultValue={JAN_15_1430} />
						<DateTimeInput
							defaultValue={JAN_15_1430}
							valueFormat="yyyy-MM-dd HH:mm"
						/>
						<DateTimeInput
							defaultValue={JAN_15_1430}
							valueFormat="d MMM yyyy, HH'h'mm"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Default time</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultTime
					</code>{' '}
					is where a picked day lands with no time yet (default midnight); here
					09:15. A time already set is kept.
				</p>
				<ComponentPreview title='defaultTime="09:15"'>
					<DefaultTimeExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bounds</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The two pairs differ: minDate and maxDate disable days outright, the
					time bounds only clamp what the segments accept.
				</p>
				<ComponentPreview title="12–20 January, 08:00–18:00">
					<BoundsExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Closing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The check button, Enter in the time control, a click outside and
					Escape close the popover; none changes the value.
				</p>
				<ComponentPreview title="Open it, then try all four">
					<div className="w-72">
						<DateTimeInput defaultValue={JAN_15_1430} />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="flex w-72 flex-col gap-3">
						<DateTimeInput
							defaultValue={JAN_15_1430}
							size="sm"
						/>
						<DateTimeInput
							defaultValue={JAN_15_1430}
							size="md"
						/>
						<DateTimeInput
							defaultValue={JAN_15_1430}
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="default and ghost">
					<div className="flex w-72 flex-col gap-3">
						<DateTimeInput defaultValue={JAN_15_1430} />
						<DateTimeInput
							defaultValue={JAN_15_1430}
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<ComponentPreview title="Disabled">
					<div className="flex w-72 flex-col gap-3">
						<DateTimeInput
							disabled
							value={JAN_15_1430}
						/>
						<DateTimeInput
							disabled
							value={null}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Loading">
					<div className="w-72">
						<DateTimeInput
							loading
							value={JAN_15_1430}
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
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						dateInput.clear
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						confirm.confirm
					</code>
					. Tab: calendar button, field, clear (only with a value).
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						leftSection
					</code>{' '}
					replaces the calendar button’s icon; the button itself stays.
				</p>
				<ComponentPreview title="leftSection={<Plane />} inside the calendar button">
					<div className="w-72">
						<DateTimeInput
							ariaLabel="Início do embarque"
							defaultValue={JAN_15_1430}
							leftSection={<Plane className="size-4" />}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Section widths</h2>
				<ComponentPreview title="Default 36px against a roomier 56px">
					<div className="flex w-72 flex-col gap-3">
						<DateTimeInput defaultValue={JAN_15_1430} />
						<DateTimeInput
							defaultValue={JAN_15_1430}
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
	'/libs/react-web/components/date-time-input',
)({
	component: Page,
})
