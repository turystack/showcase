import { createFileRoute } from '@tanstack/react-router'
import { DurationText, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const durationTextProps = [
	{
		description: 'The length of time.',
		name: 'value',
		required: true,
		type: 'number | null',
	},
	{
		default: '"seconds"',
		description: 'Unit the value arrives in: seconds, minutes or milliseconds.',
		name: 'unit',
		type: 'DurationTextUnit',
	},
	{
		default: '"short"',
		description: 'short (2h 15min), long (2 hours 15 minutes) or clock.',
		name: 'variant',
		type: 'DurationTextVariant',
	},
	{
		default: '2',
		description: 'How many units to show; 26 hours reads "1d 2h".',
		name: 'maxParts',
		type: 'number',
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

const usageCode = `import { DurationText, Typography } from '@turystack/react-web'

<DurationText value={8100} />                        // 2h 15min
<DurationText value={8100} variant="long" />         // 2 hours 15 minutes
<DurationText value={8100} variant="clock" />        // 02:15:00
<DurationText unit="minutes" value={135} />          // 2h 15min

// A leg of a trip, to the hour
<DurationText maxParts={1} value={flight.durationSeconds} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  O traslado leva cerca de <DurationText inheritColor size="inherit" value={2700} variant="long" />.
</Typography>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					DurationText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A span of time read as a length — the flight is two hours fifteen, not
					fifteen past two.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={durationTextProps} />
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

			<SlotsSection slug="duration-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Short for tables, long for sentences, clock for stopwatches; only
					clock uses no words.
				</p>
				<ComponentPreview title="Two hours and fifteen minutes">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">short</span>
							<DurationText value={8100} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">long</span>
							<DurationText
								value={8100}
								variant="long"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">clock</span>
							<DurationText
								value={8100}
								variant="clock"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								from minutes
							</span>
							<DurationText
								unit="minutes"
								value={135}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How much detail</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					It starts at the first unit that has anything in it and keeps
					`maxParts` of them, so a short span never reads as a padded long one.
				</p>
				<ComponentPreview title="One day, two hours, three minutes, four seconds">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">default (2)</span>
							<DurationText value={93784} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">one part</span>
							<DurationText
								maxParts={1}
								value={93784}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">all four</span>
							<DurationText
								maxParts={4}
								value={93784}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">a delay</span>
							<DurationText value={-900} />
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
							O traslado do aeroporto ao hotel leva cerca de{' '}
							<DurationText
								inheritColor
								size="inherit"
								value={2700}
								variant="long"
								weight="semibold"
							/>{' '}
							fora do horário de pico.
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

export const Route = createFileRoute(
	'/libs/react-web/components/duration-text',
)({
	component: Page,
})
