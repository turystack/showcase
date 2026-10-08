import { createFileRoute } from '@tanstack/react-router'
import { NumberText, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const numberTextProps = [
	{
		description: 'The number to render.',
		name: 'value',
		required: true,
		type: 'number | null',
	},
	{
		default: '"decimal"',
		description: 'decimal, percent or compact.',
		name: 'variant',
		type: 'NumberTextVariant',
	},
	{
		description: 'Fixed decimal places; Intl decides when absent.',
		name: 'fractionDigits',
		type: 'number',
	},
	{
		description: 'Free text written after the number (km, pax, nights).',
		name: 'unit',
		type: 'string',
	},
	{
		default: '"auto"',
		description: 'auto, always, never or exceptZero.',
		name: 'signDisplay',
		type: 'NumberTextSignDisplay',
	},
	{
		description: 'Paints positive green and negative in the error colour.',
		name: 'colored',
		type: 'boolean',
	},
	{
		description: 'A trailing note rendered beside the number.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Overrides the FormatProvider locale for this instance.',
		name: 'locale',
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

const usageCode = `import { NumberText, Typography } from '@turystack/react-web'

<NumberText value={1234567.5} />                                   // 1,234,567.5
<NumberText fractionDigits={1} value={0.153} variant="percent" />  // 15.3%
<NumberText value={1234567} variant="compact" />                   // 1.2M
<NumberText unit="km" value={480} />                               // 480 km

// A delta column
<NumberText colored signDisplay="always" value={-64} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  Restam só <NumberText inheritColor size="inherit" value={3} weight="semibold" /> quartos nesta data.
</Typography>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					NumberText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A plain number in the reader’s number system, grouped, rounded and
					with a unit.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={numberTextProps} />
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

			<SlotsSection slug="number-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Percent reads a ratio, like Intl: 0.15 renders 15%.
				</p>
				<ComponentPreview title="decimal, percent and compact">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">decimal</span>
							<NumberText value={1234567.5} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								percent (a ratio)
							</span>
							<NumberText
								fractionDigits={1}
								value={0.153}
								variant="percent"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">compact</span>
							<NumberText
								value={1234567}
								variant="compact"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								fixed decimals
							</span>
							<NumberText
								fractionDigits={2}
								value={7}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Units and deltas</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A unit is free text, like “pax” or “nights”; colour and sign make it a
					delta column.
				</p>
				<ComponentPreview title="A distance, a headcount and a change">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">distance</span>
							<NumberText
								unit="km"
								value={480}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">headcount</span>
							<NumberText
								unit="pax"
								value={12}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">up</span>
							<NumberText
								colored
								signDisplay="always"
								value={128}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">down</span>
							<NumberText
								colored
								signDisplay="always"
								value={-64}
							/>
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
							Restam só{' '}
							<NumberText
								inheritColor
								size="inherit"
								value={3}
								weight="semibold"
							/>{' '}
							quartos nesta data — a ocupação já está em{' '}
							<NumberText
								inheritColor
								size="inherit"
								value={0.92}
								variant="percent"
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

export const Route = createFileRoute('/libs/react-web/components/number-text')({
	component: Page,
})
