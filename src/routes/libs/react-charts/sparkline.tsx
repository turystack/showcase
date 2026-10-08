import { createFileRoute } from '@tanstack/react-router'
import { Sparkline } from '@turystack/react-charts'
import { Card, MoneyText, NumberText, Stat } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PlatformSlotsTable,
	PropsTable,
} from '@/components/docs'
import {
	sparklineDown,
	sparklineFlat,
	sparklineUp,
} from '@/data/react-charts-samples'
import { sparklineSlots } from '@/data/react-charts-slots'

export const Route = createFileRoute('/libs/react-charts/sparkline')({
	component: Page,
})

/**
 * Read from `react-charts/src/core/sparkline.types.ts` — every key of
 * `SparklineProps`, with the defaults both platforms apply.
 */
const sparklineProps = [
	{
		description: 'The values, oldest first.',
		name: 'data',
		required: true,
		type: 'number[]',
	},
	{
		default: '"line"',
		description: 'How the values are drawn.',
		name: 'variant',
		type: '"line" | "area" | "bar"',
	},
	{
		default: '"neutral"',
		description: 'Colour: success, destructive or muted-foreground.',
		name: 'trend',
		type: '"up" | "down" | "neutral"',
	},
	{
		default: '"xs"',
		description: 'xs is 24 px / pt tall, sm 40.',
		name: 'height',
		type: '"xs" | "sm"',
	},
	{
		description: 'Accessible name. Without it, hidden from AT.',
		name: 'label',
		type: 'string',
	},
]

const platformCode = [
	{
		code: `import { Sparkline } from '@turystack/react-charts' // web build in the browser

// The marks paint with currentColor; trend sets the text colour.
<Sparkline data={weekly} trend="up" />`,
		label: 'Web',
	},
	{
		code: `import { Sparkline } from '@turystack/react-charts/mobile'

// The marks paint with the success, destructive or mutedForeground token.
<Sparkline data={weekly} trend="up" />`,
		label: 'Mobile',
	},
]

const themeCode = [
	{
		code: `/* A rising trend in the brand colour instead of --success */
.sparkline[data-trend="up"] { color: var(--chart-1); }
.sparkline[data-height="sm"] { height: 3rem; }`,
		label: 'Web (CSS)',
	},
	{
		code: `<ChartThemeProvider
  tokens={{ light: { success: '#16a34a' } }}
  styles={{
    sparkline: {
      root: ({ height }) => (height === 'sm' ? { height: 48 } : null),
    },
  }}
>
  <Sparkline data={weekly} trend="up" height="sm" />
</ChartThemeProvider>`,
		label: 'Mobile (provider)',
	},
]

const usageCode = `import { Sparkline } from '@turystack/react-charts'
import { Card, MoneyText, NumberText, Stat } from '@turystack/react-web'

// Decorative: the Stat beside it already says the number
<Card>
  <Card.Content>
    <Stat
      label="Receita"
      value={<MoneyText value={cents} />}
      trend={<NumberText colored signDisplay="always" value={0.12} variant="percent" />}
      hint="Últimos 10 dias"
    />
    <Sparkline data={daily} trend="up" height="sm" variant="area" />
  </Card.Content>
</Card>

// Standing alone: give it a name
<Sparkline data={weekly} variant="bar" label="Reservas, últimas 10 semanas, em alta" />`

const variants = [
	'line',
	'area',
	'bar',
] as const

const trends = [
	{
		data: sparklineUp,
		trend: 'up',
	},
	{
		data: sparklineDown,
		trend: 'down',
	},
	{
		data: sparklineFlat,
		trend: 'neutral',
	},
] as const

function Code({ children }: { children: string }) {
	return (
		<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
			{children}
		</code>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Components
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Sparkline
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An axis-free trend for a KPI tile — the same props on the web and in
					React Native.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Web and mobile</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					No tooltip, axes or animation on either. Only the colour source
					differs.
				</p>
				<CodeBlock
					language="tsx"
					tabs={platformCode}
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={sparklineProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">In a Stat tile</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Under a <Code>Stat</Code>, decorative: the Stat already says the
					number.
				</p>
				<ComponentPreview title="Stat tiles">
					<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
						<Card>
							<Card.Content>
								<div className="space-y-3">
									<Stat
										hint="Últimos 10 dias"
										label="Receita"
										trend={
											<NumberText
												colored
												signDisplay="always"
												value={0.12}
												variant="percent"
											/>
										}
										value={<MoneyText value={12845000} />}
									/>
									<Sparkline
										data={sparklineUp}
										height="sm"
										trend="up"
										variant="area"
									/>
								</div>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<div className="space-y-3">
									<Stat
										hint="Últimos 10 dias"
										label="Ocupação média"
										trend={
											<NumberText
												colored
												signDisplay="always"
												value={-0.08}
												variant="percent"
											/>
										}
										value={
											<NumberText
												value={0.71}
												variant="percent"
											/>
										}
									/>
									<Sparkline
										data={sparklineDown}
										height="sm"
										trend="down"
									/>
								</div>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<div className="space-y-3">
									<Stat
										hint="Últimas 10 semanas"
										label="Reservas por semana"
										value={<NumberText value={20} />}
									/>
									<Sparkline
										data={sparklineFlat}
										height="sm"
										variant="bar"
									/>
								</div>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Bars suit discrete periods.
				</p>
				<ComponentPreview title="line, area, bar">
					<div className="grid w-full max-w-xl gap-6 sm:grid-cols-3">
						{variants.map((variant) => (
							<div
								className="space-y-2"
								key={variant}
							>
								<p className="text-muted-foreground text-xs">{variant}</p>
								<Sparkline
									data={sparklineUp}
									height="sm"
									trend="up"
									variant={variant}
								/>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Trends</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>trend</Code> is set by you, not inferred from the data.
				</p>
				<ComponentPreview title="up, down, neutral">
					<div className="grid w-full max-w-xl gap-6 sm:grid-cols-3">
						{trends.map(({ data, trend }) => (
							<div
								className="space-y-2"
								key={trend}
							>
								<p className="text-muted-foreground text-xs">{trend}</p>
								<Sparkline
									data={data}
									height="sm"
									trend={trend}
								/>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Heights</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>xs</Code> sits beside a figure; <Code>sm</Code> under it.
				</p>
				<ComponentPreview title="xs, sm">
					<div className="grid w-full max-w-md gap-6 sm:grid-cols-2">
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">xs</p>
							<Sparkline
								data={sparklineUp}
								trend="up"
							/>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-xs">sm</p>
							<Sparkline
								data={sparklineUp}
								height="sm"
								trend="up"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Label</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With <Code>label</Code> it is one named image; without, it is hidden
					from assistive tech — <Code>aria-hidden</Code> on the web, hidden
					descendants on mobile.
				</p>
				<ComponentPreview title="Labelled">
					<div className="flex w-full max-w-md items-center gap-4">
						<span className="text-muted-foreground text-sm">Reservas</span>
						<div className="flex-1">
							<Sparkline
								data={sparklineUp}
								label="Reservas, últimas 10 semanas, em alta"
								trend="up"
								variant="bar"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Slots</h2>
				<p className="max-w-3xl text-muted-foreground text-sm">
					One element: the root. Reach a trend or a height through its data
					attributes, or by the variants on mobile.
				</p>
				<PlatformSlotsTable slots={sparklineSlots} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Theming</h2>
				<CodeBlock
					language="tsx"
					tabs={themeCode}
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="sparkline.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}
