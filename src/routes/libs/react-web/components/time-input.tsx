import { createFileRoute, Link } from '@tanstack/react-router'
import type { PartialTuryLabels } from '@turystack/react-web'
import { LabelsProvider, TimeInput } from '@turystack/react-web'
import { Timer } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/time-input/time-input.types.ts`,
 * which is `Omit<InputProps, …>` minus the value trio, `debounce`, and every
 * text-field attribute with nothing to land on in a group of segments
 * (`placeholder`, `name`, `form`, `autoComplete`, `autoFocus`, `inputMode`,
 * `maxLength`, `minLength`, `required`), plus six of its own. The omitted
 * props are deliberately absent below. The field is a <fieldset> (native group):
 * `id`, `ariaLabel`, the aria attributes and the handlers land on it.
 * Defaults come from the destructuring in `time-input.tsx` and from the
 * `defaultVariants` in `input.shared.ts`.
 */
const timeInputProps = [
	{
		description: 'Controlled "HH:MM" or "HH:MM:SS"; `null` empties it.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'Initial value when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires on edit; the time when complete, else `null`.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
	{
		default: 'false',
		description: 'Adds a seconds segment; format becomes "HH:MM:SS".',
		name: 'withSeconds',
		type: 'boolean',
	},
	{
		description: 'Lower bound, same shape as value; clamped on blur.',
		name: 'minTime',
		type: 'string',
	},
	{
		description: 'Upper bound, same shape as value; clamped on blur.',
		name: 'maxTime',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Height of the field: sm 36px, md 40px, lg 44px.',
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
		default: '<Clock size={14} />',
		description: 'Left slot content; pass `null` to remove the clock.',
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
		description: 'Content in the right slot. Empty by default.',
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
		description: 'Shows a spinner in place of rightSection.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Disables every segment and blocks the whole group.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Blocks edits; segments stay focusable.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		description: 'Fires once when focus enters the group.',
		name: 'onFocus',
		type: '(event: React.FocusEvent<HTMLInputElement>) => void',
	},
	{
		description: 'Fires once when focus leaves the group.',
		name: 'onBlur',
		type: '(event: React.FocusEvent<HTMLInputElement>) => void',
	},
	{
		description: 'Id of the <fieldset> group.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Accessible name of the <fieldset> group.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Marks the group invalid; paints the destructive border.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Id of the hint or error describing the group.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: '"time-input-field"',
		description: 'Test id on the <fieldset> group.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Key handler on the group, after segment handling.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLInputElement>',
	},
	{
		description: 'Click handler on the group; fires for any segment.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

const usageCode = `import { TimeInput } from '@turystack/react-web'
import { useState } from 'react'

// Controlled — null arrives while the entry is still partial
const [time, setTime] = useState<string | null>('08:30')

<TimeInput onChange={setTime} value={time} />

// Uncontrolled
<TimeInput defaultValue="08:30" />

// Seconds
<TimeInput onChange={setTime} value={time} withSeconds />

// Bounds, applied when the group loses focus
<TimeInput maxTime="18:00" minTime="08:00" onChange={setTime} value={time} />

// Sections — leftSection has a default, so null is how you remove it
<TimeInput leftSection={null} onChange={setTime} value={time} />
<TimeInput
  onChange={setTime}
  rightSection={<span className="text-xs">UTC</span>}
  rightSectionWidth={44}
  value={time}
/>

// States
<TimeInput disabled value="08:30" />
<TimeInput readOnly value="08:30" />
<TimeInput loading value="08:30" />

// No visible label: ariaLabel names the <fieldset> around the segments
<TimeInput
  aria-describedby="checkin-hint"
  ariaLabel="Check-in time"
  onChange={setTime}
  value={time}
/>`

/** Module scope: the provider memoises on this reference. */
const ptBRTime: PartialTuryLabels = {
	timeInput: {
		hours: 'horas',
		minutes: 'minutos',
		seconds: 'segundos',
	},
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
	const [time, setTime] = useState<string | null>('08:30')

	return (
		<div className="flex w-56 flex-col gap-3">
			<TimeInput
				onChange={setTime}
				value={time}
			/>
			<Readout>{time ?? 'null'}</Readout>
		</div>
	)
}

function SecondsExample() {
	const [time, setTime] = useState<string | null>('08:30:15')

	return (
		<div className="flex w-56 flex-col gap-3">
			<TimeInput
				onChange={setTime}
				value={time}
				withSeconds
			/>
			<Readout>{time ?? 'null'}</Readout>
		</div>
	)
}

function BoundsExample() {
	const [first, setFirst] = useState<string | null>('06:00')
	const [second, setSecond] = useState<string | null>('23:30')

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-wrap items-start justify-center gap-4">
				<div className="flex w-56 flex-col gap-3">
					<TimeInput
						maxTime="18:00"
						minTime="08:00"
						onChange={setFirst}
						value={first}
					/>
					<Readout>{first ?? 'null'}</Readout>
				</div>
				<div className="flex w-56 flex-col gap-3">
					<TimeInput
						maxTime="18:00"
						minTime="08:00"
						onChange={setSecond}
						value={second}
					/>
					<Readout>{second ?? 'null'}</Readout>
				</div>
			</div>
			<p className="text-center text-muted-foreground text-xs">
				Tab out of one field and into the other — the clamp happens on the way
				out.
			</p>
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
					TimeInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Segmented 24-hour time entry, one spinbutton per unit.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={timeInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Each segment is a spinbutton inside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;fieldset&gt;
					</code>
					; inherited props land on it. No form attributes — see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					.
				</p>
				<ComponentPreview title="A group named by ariaLabel and described by a hint">
					<div className="w-full max-w-xs space-y-1.5">
						<TimeInput
							aria-describedby="time-input-docs-checkin-hint"
							ariaLabel="Check-in time"
							defaultValue="14:00"
						/>
						<p
							className="text-muted-foreground text-xs"
							id="time-input-docs-checkin-hint"
						>
							The group is announced as “Check-in time”, followed by this hint.
						</p>
					</div>
				</ComponentPreview>
			</section>

			<SlotsSection slug="time-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The readout shows what{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					delivered; a partial time arrives as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						null
					</code>
					.
				</p>
				<ComponentPreview title="Controlled — the parent owns the string">
					<ControlledExample />
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultValue">
					<div className="w-56">
						<TimeInput defaultValue="08:30" />
					</div>
				</ComponentPreview>
				<ComponentPreview title="Empty">
					<div className="w-56">
						<TimeInput defaultValue={null} />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Seconds</h2>
				<ComponentPreview title="withSeconds">
					<SecondsExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Segment names</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Segment names come from the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						timeInput
					</code>{' '}
					labels of{' '}
					<Link
						className="text-lib underline underline-offset-4"
						to="/libs/react-web/components/labels-provider"
					>
						LabelsProvider
					</Link>
					, shared with DateTimeInput.
				</p>
				<ComponentPreview title="pt-BR labels: horas, minutos, segundos">
					<LabelsProvider labels={ptBRTime}>
						<div className="w-56">
							<TimeInput
								ariaLabel="Horário de check-in"
								defaultValue="14:00:00"
								withSeconds
							/>
						</div>
					</LabelsProvider>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bounds</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						minTime
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						maxTime
					</code>{' '}
					clamp on blur, never while typing.
				</p>
				<ComponentPreview title="08:00 to 18:00, one below the window and one above">
					<BoundsExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Typing, keys and paste
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A segment advances once no digit can follow (typing{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">3</code>{' '}
					in hours). Left/right move between segments; up/down step by one.
				</p>
				<ComponentPreview title="Type 3, then 99; or paste 1:2:3 on the right">
					<div className="flex flex-wrap items-start justify-center gap-4">
						<div className="w-56">
							<TimeInput defaultValue={null} />
						</div>
						<div className="w-56">
							<TimeInput
								defaultValue={null}
								withSeconds
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="flex w-56 flex-col gap-3">
						<TimeInput
							defaultValue="08:30"
							size="sm"
						/>
						<TimeInput
							defaultValue="08:30"
							size="md"
						/>
						<TimeInput
							defaultValue="08:30"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="default and ghost">
					<div className="flex w-56 flex-col gap-3">
						<TimeInput defaultValue="08:30" />
						<TimeInput
							defaultValue="08:30"
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						leftSection
					</code>{' '}
					defaults to a clock; pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						null
					</code>{' '}
					to remove it and its padding.
				</p>
				<ComponentPreview title="Default, removed, replaced, right section">
					<div className="flex w-56 flex-col gap-3">
						<TimeInput defaultValue="08:30" />
						<TimeInput
							defaultValue="08:30"
							leftSection={null}
						/>
						<TimeInput
							defaultValue="08:30"
							leftSection={<Timer size={14} />}
						/>
						<TimeInput
							defaultValue="08:30"
							rightSection={<span className="text-xs">UTC</span>}
							rightSectionWidth={44}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Read-only still takes focus and selects its digits; disabled takes
					neither.
				</p>
				<ComponentPreview title="Disabled, read-only, loading">
					<div className="flex w-56 flex-col gap-3">
						<TimeInput
							defaultValue="08:30"
							disabled
						/>
						<TimeInput
							defaultValue="08:30"
							readOnly
						/>
						<TimeInput
							defaultValue="08:30"
							loading
						/>
						<TimeInput
							defaultValue="08:30"
							disabled
							variant="ghost"
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

export const Route = createFileRoute('/libs/react-web/components/time-input')({
	component: Page,
})
