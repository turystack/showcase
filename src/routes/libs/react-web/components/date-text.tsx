import { createFileRoute } from '@tanstack/react-router'
import { DateText, FormatProvider, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const dateTextProps = [
	{
		description: 'The instant, or a from/to pair in range mode.',
		name: 'value',
		required: true,
		type: 'Date | string | number | null',
	},
	{
		default: '"date"',
		description: 'date/time/dateTime/relative/calendar/month/weekday/iso',
		name: 'variant',
		type: 'DateTextVariant',
	},
	{
		default: '"single"',
		description: 'Range mode reads a from/to pair; one bound may be missing.',
		name: 'mode',
		type: '"single" | "range"',
	},
	{
		description: 'Relative variant: re-renders once a minute.',
		name: 'live',
		type: 'boolean',
	},
	{
		description: 'A date-fns pattern; wins over the variant.',
		name: 'format',
		type: 'string',
	},
	{
		description: 'Overrides the FormatProvider locale for this instance.',
		name: 'locale',
		type: 'string',
	},
	{
		description: 'IANA zone; absent means the runtime’s own zone.',
		name: 'timeZone',
		type: 'string',
	},
]

const appearanceProps = [
	{
		default: '"—"',
		description: 'Text shown for an absent or unreadable value.',
		name: 'fallback',
		type: 'string',
	},
	{
		description: 'Adds a button that copies the rendered text.',
		name: 'copyable',
		type: 'boolean',
	},
	{
		description: 'Shows the rendered text in a tooltip on hover.',
		name: 'tooltip',
		type: 'boolean',
	},
	{
		default: '"span"',
		description: 'The element the value renders as.',
		name: 'component',
		type: 'TypographyComponent',
	},
	{
		default: '"base"',
		description: 'Typography size preset; "inherit" takes the parent\'s size.',
		name: 'size',
		type: 'TypographySize | "inherit"',
	},
	{
		default: '"normal"',
		description: 'Font weight.',
		name: 'weight',
		type: 'TypographyWeight',
	},
	{
		description: 'Text alignment.',
		name: 'align',
		type: 'TypographyAlign',
	},
	{
		description: 'Renders in the muted foreground colour.',
		name: 'muted',
		type: 'boolean',
	},
	{
		default: 'false',
		description: "Takes the surrounding text's colour instead of foreground.",
		name: 'inheritColor',
		type: 'boolean',
	},
	{
		description: 'Renders in the error colour.',
		name: 'destructive',
		type: 'boolean',
	},
	{
		description: 'Truncates with an ellipsis on overflow.',
		name: 'truncate',
		type: 'boolean',
	},
]

const usageCode = `import { DateText, FormatProvider, Typography } from '@turystack/react-web'

// Set the locale and zone once, at the root
<FormatProvider format={{ locale: 'pt-BR', timeZone: 'America/Sao_Paulo' }}>
  <App />
</FormatProvider>

<DateText value={booking.created_at} />                       // 24/08/2026
<DateText value={booking.created_at} variant="dateTime" />    // 24/08/2026 15:30
<DateText live value={booking.created_at} variant="relative" />  // há 2 horas
<DateText value={booking.checkIn} variant="calendar" />      // Hoje

// A range, with either end optional
<DateText mode="range" value={{ from: checkIn, to: checkOut }} />

// The escape hatch: a date-fns pattern wins over the variant
<DateText format="dd 'de' MMMM" value={booking.checkIn} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  Cancelamento grátis até <DateText inheritColor size="inherit" value={booking.freeCancelUntil} />.
</Typography>`

const INSTANT = new Date('2026-08-24T15:30:00.000Z')

const NOW = new Date()

const TWO_HOURS_AGO = new Date(Date.now() - 2 * 60 * 60 * 1000)

const YESTERDAY = new Date(Date.now() - 24 * 60 * 60 * 1000)

const IN_THREE_DAYS = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					DateText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A date in the reader’s locale, as a distance from now or a day name.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={dateTextProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Shared with every formatter
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						*Text
					</code>{' '}
					component shares these appearance props.
				</p>
				<PropsTable props={appearanceProps} />
			</section>

			<SlotsSection slug="date-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Formatted by Intl in the reader’s locale: 24/08/2026 in Brazil,
					08/24/2026 in the US.
				</p>
				<ComponentPreview title="The same instant, six ways">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">date</span>
							<DateText value={INSTANT} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">dateTime</span>
							<DateText
								value={INSTANT}
								variant="dateTime"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">time</span>
							<DateText
								value={INSTANT}
								variant="time"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">month</span>
							<DateText
								value={INSTANT}
								variant="month"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">weekday</span>
							<DateText
								value={INSTANT}
								variant="weekday"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">iso</span>
							<DateText
								value={INSTANT}
								variant="iso"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Relative and calendar
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Relative measures distance from now; calendar names nearby days and
					dates the rest.
				</p>
				<ComponentPreview title="Distance, and the words for nearby days">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								two hours ago
							</span>
							<DateText
								value={TWO_HOURS_AGO}
								variant="relative"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								in three days
							</span>
							<DateText
								value={IN_THREE_DAYS}
								variant="relative"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">today</span>
							<DateText
								value={NOW}
								variant="calendar"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">yesterday</span>
							<DateText
								value={YESTERDAY}
								variant="calendar"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">a plain day</span>
							<DateText
								value={INSTANT}
								variant="calendar"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The reader’s locale
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					FormatProvider sets locale and time zone for the tree; an instance can
					override them.
				</p>
				<ComponentPreview title="Same value, two providers">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">en-US · UTC</span>
							<FormatProvider
								format={{
									locale: 'en-US',
									timeZone: 'UTC',
								}}
							>
								<DateText
									value={INSTANT}
									variant="dateTime"
								/>
							</FormatProvider>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								pt-BR · America/Sao_Paulo
							</span>
							<FormatProvider
								format={{
									locale: 'pt-BR',
									timeZone: 'America/Sao_Paulo',
								}}
							>
								<DateText
									value={INSTANT}
									variant="dateTime"
								/>
							</FormatProvider>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Ranges, and what is missing
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A half-open range reads “From …” or “Up to …”, worded by the shared
					labels.
				</p>
				<ComponentPreview title="Both bounds, one bound, no value">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">from and to</span>
							<DateText
								mode="range"
								value={{
									from: INSTANT,
									to: IN_THREE_DAYS,
								}}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">from only</span>
							<DateText
								mode="range"
								value={{
									from: INSTANT,
								}}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">to only</span>
							<DateText
								mode="range"
								value={{
									to: INSTANT,
								}}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								nothing at all
							</span>
							<DateText value={null} />
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Inline in a sentence
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					In running text,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size="inherit"
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						inheritColor
					</code>{' '}
					take the sentence's size and colour;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						weight
					</code>{' '}
					can still lift it.
				</p>
				<ComponentPreview title='size="inherit" and inheritColor in muted copy'>
					<div className="max-w-md">
						<Typography
							size="sm"
							variant="muted"
						>
							Sua reserva foi confirmada em{' '}
							<DateText
								inheritColor
								size="inherit"
								value={new Date(2026, 8, 12, 14, 30)}
								weight="semibold"
							/>{' '}
							e pode ser cancelada sem custo até{' '}
							<DateText
								inheritColor
								size="inherit"
								value={new Date(2026, 9, 1)}
								weight="semibold"
							/>
							.
						</Typography>
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

export const Route = createFileRoute('/libs/react-web/components/date-text')({
	component: Page,
})
