import { createFileRoute } from '@tanstack/react-router'
import { Button, Calendar } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/calendar/calendar.types.ts` and
 * the destructuring plus `defaultVariants` in `calendar.tsx`.
 *
 * `weekStartsOn` is forwarded straight to DayPicker. `highlightToday={false}`
 * swaps in a custom `Day` component that strips the cell's `data-today`
 * attribute — react-day-picker itself would otherwise skip a falsy custom
 * modifier before it could shadow its own internal `today` flag, so unmarking
 * today happens one level down, at the cell.
 */
const calendarProps = [
	{
		description: 'One date or a range; sets the selected/onDateChange types.',
		name: 'mode',
		required: true,
		type: '"single" | "range"',
	},
	{
		description: 'Controlled selection: a Date, a { from, to }, or null.',
		name: 'selected',
		type: 'Date | null | { from?: Date; to?: Date } | null',
	},
	{
		description: 'Fires with the next selection; reclicking yields null.',
		name: 'onDateChange',
		type: '(date: Date | null) => void | (range: { from?: Date; to?: Date } | null) => void',
	},
	{
		description: 'Initial month shown (uncontrolled).',
		name: 'defaultMonth',
		type: 'Date',
	},
	{
		description: 'Controlled displayed month; arrows only report.',
		name: 'month',
		type: 'Date',
	},
	{
		description: 'Fires with the month the arrows request.',
		name: 'onMonthChange',
		type: '(month: Date) => void',
	},
	{
		default: '1 in single mode, 2 in range mode',
		description: 'How many consecutive months are drawn side by side.',
		name: 'numberOfMonths',
		type: 'number',
	},
	{
		description: 'Earliest selectable day; also caps navigation.',
		name: 'minDate',
		type: 'Date',
	},
	{
		description: 'Latest selectable day; also caps navigation.',
		name: 'maxDate',
		type: 'Date',
	},
	{
		description: 'Returns true for days that cannot be selected.',
		name: 'excludeDate',
		type: '(date: Date) => boolean',
	},
	{
		default: 'true',
		description: 'Shows neighbouring-month days in the edge weeks.',
		name: 'showOutsideDays',
		type: 'boolean',
	},
	{
		default: 'true',
		description: "Marks today's cell.",
		name: 'highlightToday',
		type: 'boolean',
	},
	{
		description: 'First day of the week, 0 being Sunday.',
		name: 'weekStartsOn',
		type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
	},
	{
		default: 'en-US',
		description: 'Partial date-fns locale, merged over English.',
		name: 'locale',
		type: 'Partial<Locale>',
	},
	{
		default: '"md"',
		description: 'Cell size: sm 1.5rem, md 1.75rem, lg 2.25rem.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Stretches the calendar to its container.',
		name: 'fullWidth',
		type: 'boolean',
	},
	{
		description: 'Extra classes merged onto the root.',
		name: 'className',
		type: 'string',
	},
]

const dayFormat = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
})

const monthFormat = new Intl.DateTimeFormat('pt-BR', {
	month: 'long',
	year: 'numeric',
})

type Range = {
	from?: Date
	to?: Date
} | null

const MARCH_2026 = new Date(2026, 2, 1)

const MONDAY_FIRST = {
	options: {
		weekStartsOn: 1,
	},
} as const

const usageCode = `import { Calendar } from '@turystack/react-web'

// Single — selected and onDateChange are both required for it to do anything
const [date, setDate] = useState<Date | null>(null)

<Calendar mode="single" onDateChange={setDate} selected={date} />

// Range — two months by default
const [range, setRange] = useState<{ from?: Date; to?: Date } | null>(null)

<Calendar mode="range" onDateChange={setRange} selected={range} />

// Bounds and exclusions compose into one disabled set
<Calendar
  excludeDate={(day) => day.getDay() === 0 || day.getDay() === 6}
  maxDate={new Date(2026, 3, 30)}
  minDate={new Date()}
  mode="single"
  onDateChange={setDate}
  selected={date}
/>

// Controlled month — the arrows report, you decide
<Calendar
  mode="single"
  month={month}
  onDateChange={setDate}
  onMonthChange={setMonth}
  selected={date}
/>

// weekStartsOn moves the first column of every week
<Calendar mode="single" weekStartsOn={1} />

// highlightToday off — today's cell keeps no marker
<Calendar highlightToday={false} mode="single" />`

const sizes = [
	'sm',
	'md',
	'lg',
] as const

function Page() {
	const [single, setSingle] = useState<Date | null>(null)
	const [range, setRange] = useState<Range>(null)
	const [month, setMonth] = useState(MARCH_2026)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Calendar
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A month grid for picking one date or a range.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={calendarProps} />
			</section>

			<SlotsSection slug="calendar" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Modes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						mode
					</code>{' '}
					sets the value type and the default month count.
				</p>
				<ComponentPreview title='mode="single"'>
					<div className="flex flex-col items-center gap-3">
						<Calendar
							mode="single"
							onDateChange={setSingle}
							selected={single}
						/>
						<p className="text-muted-foreground text-sm">
							selected:{' '}
							<code className="text-foreground">
								{single ? dayFormat.format(single) : 'null'}
							</code>
						</p>
						<p className="max-w-xs text-center text-muted-foreground text-xs">
							Click the selected day a second time and the handler is called
							with null.
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title='mode="range" — two months, by default'>
					<div className="flex flex-col items-center gap-3">
						<Calendar
							mode="range"
							onDateChange={setRange}
							selected={range}
						/>
						<p className="text-muted-foreground text-sm">
							selected:{' '}
							<code className="text-foreground">
								{range?.from
									? `${dayFormat.format(range.from)} → ${
											range.to ? dayFormat.format(range.to) : '…'
										}`
									: 'null'}
							</code>
						</p>
						<p className="max-w-sm text-center text-muted-foreground text-xs">
							The first click starts a one-day range; the second closes it.
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="numberOfMonths={3}, overriding the mode default">
					<Calendar
						defaultMonth={MARCH_2026}
						mode="single"
						numberOfMonths={3}
						onDateChange={setSingle}
						selected={single}
						size="sm"
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The month</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultMonth
					</code>{' '}
					is a start point; with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						month
					</code>{' '}
					the grid moves only when you write the value back.
				</p>
				<ComponentPreview title="A controlled month">
					<div className="flex flex-col items-center gap-3">
						<Calendar
							mode="single"
							month={month}
							onDateChange={setSingle}
							onMonthChange={setMonth}
							selected={single}
						/>
						<div className="flex flex-wrap items-center justify-center gap-2">
							<Button
								onClick={() =>
									setMonth(
										(current) =>
											new Date(
												current.getFullYear(),
												current.getMonth() - 1,
												1,
											),
									)
								}
								size="sm"
								variant="outline"
							>
								Previous
							</Button>
							<span className="text-muted-foreground text-sm">
								{monthFormat.format(month)}
							</span>
							<Button
								onClick={() =>
									setMonth(
										(current) =>
											new Date(
												current.getFullYear(),
												current.getMonth() + 1,
												1,
											),
									)
								}
								size="sm"
								variant="outline"
							>
								Next
							</Button>
						</div>
					</div>
				</ComponentPreview>
				<ComponentPreview title="defaultMonth — uncontrolled, navigates on its own">
					<Calendar
						defaultMonth={MARCH_2026}
						mode="single"
						onDateChange={setSingle}
						selected={single}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Bounds and exclusions
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The three restrictions stack;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						minDate
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						maxDate
					</code>{' '}
					also cap navigation.
				</p>
				<ComponentPreview title="minDate and maxDate">
					<Calendar
						defaultMonth={MARCH_2026}
						maxDate={new Date(2026, 2, 24)}
						minDate={new Date(2026, 2, 9)}
						mode="single"
						onDateChange={setSingle}
						selected={single}
					/>
				</ComponentPreview>
				<ComponentPreview title="excludeDate — weekends off">
					<Calendar
						defaultMonth={MARCH_2026}
						excludeDate={(date: Date) =>
							date.getDay() === 0 || date.getDay() === 6
						}
						mode="single"
						onDateChange={setSingle}
						selected={single}
					/>
				</ComponentPreview>
				<ComponentPreview title="All three together">
					<Calendar
						defaultMonth={MARCH_2026}
						excludeDate={(date: Date) =>
							date.getDay() === 0 || date.getDay() === 6
						}
						maxDate={new Date(2026, 2, 24)}
						minDate={new Date(2026, 2, 9)}
						mode="single"
						onDateChange={setSingle}
						selected={single}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Size and layout</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="flex flex-wrap items-start justify-center gap-6">
						{sizes.map((size) => (
							<div
								className="space-y-2"
								key={size}
							>
								<p className="text-center text-muted-foreground text-xs">
									{size}
								</p>
								<Calendar
									defaultMonth={MARCH_2026}
									mode="single"
									onDateChange={setSingle}
									selected={single}
									size={size}
								/>
							</div>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-stretch"
					title="fullWidth, with a className for the frame"
				>
					<div className="w-full max-w-lg">
						<Calendar
							className="rounded-lg border border-border"
							defaultMonth={MARCH_2026}
							fullWidth
							mode="single"
							onDateChange={setSingle}
							selected={single}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="showOutsideDays off">
					<div className="flex flex-wrap items-start justify-center gap-6">
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								default — neighbours shown
							</p>
							<Calendar
								defaultMonth={MARCH_2026}
								mode="single"
								onDateChange={setSingle}
								selected={single}
							/>
						</div>
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								showOutsideDays={'{false}'}
							</p>
							<Calendar
								defaultMonth={MARCH_2026}
								mode="single"
								onDateChange={setSingle}
								selected={single}
								showOutsideDays={false}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Locale</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						locale
					</code>{' '}
					is a partial date-fns locale merged over English. Here it carries only{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						options
					</code>
					, so only the week start changes.
				</p>
				<ComponentPreview title="A partial locale that starts the week on Monday">
					<div className="flex flex-wrap items-start justify-center gap-6">
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								default — Sunday first
							</p>
							<Calendar
								defaultMonth={MARCH_2026}
								mode="single"
								onDateChange={setSingle}
								selected={single}
							/>
						</div>
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								{'locale={{ options: { weekStartsOn: 1 } }}'}
							</p>
							<Calendar
								defaultMonth={MARCH_2026}
								locale={MONDAY_FIRST}
								mode="single"
								onDateChange={setSingle}
								selected={single}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					weekStartsOn and highlightToday
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="text-foreground">weekStartsOn.</strong> Moves the
					first column of every week, no locale needed.
				</p>
				<ComponentPreview title="weekStartsOn={0} vs weekStartsOn={1}">
					<div className="flex flex-wrap items-start justify-center gap-6">
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								weekStartsOn={'{0}'} — Sunday first (the default)
							</p>
							<Calendar
								defaultMonth={MARCH_2026}
								mode="single"
								onDateChange={setSingle}
								selected={single}
								weekStartsOn={0}
							/>
						</div>
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								weekStartsOn={'{1}'} — Monday first
							</p>
							<Calendar
								defaultMonth={MARCH_2026}
								mode="single"
								onDateChange={setSingle}
								selected={single}
								weekStartsOn={1}
							/>
						</div>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="text-foreground">highlightToday.</strong> Set false
					to drop today's marker.
				</p>
				<ComponentPreview title="highlightToday={false} against the default">
					<div className="flex flex-wrap items-start justify-center gap-6">
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								default — today is marked
							</p>
							<Calendar
								mode="single"
								onDateChange={setSingle}
								selected={single}
							/>
						</div>
						<div className="space-y-2">
							<p className="text-center text-muted-foreground text-xs">
								highlightToday={'{false}'} — no marker
							</p>
							<Calendar
								highlightToday={false}
								mode="single"
								onDateChange={setSingle}
								selected={single}
							/>
						</div>
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

export const Route = createFileRoute('/libs/react-web/components/calendar')({
	component: Page,
})
