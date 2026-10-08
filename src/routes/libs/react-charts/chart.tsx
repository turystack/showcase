import { createFileRoute } from '@tanstack/react-router'
import { Chart } from '@turystack/react-charts'
import { Button } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PlatformSlotsTable,
	PropsTable,
} from '@/components/docs'
import {
	bookingsByWeek,
	brl,
	brlCompact,
	fiveSeriesByMonth,
	grossVolumeByDay,
} from '@/data/react-charts-samples'
import { chartSlots } from '@/data/react-charts-slots'

export const Route = createFileRoute('/libs/react-charts/chart')({
	component: Page,
})

/**
 * Read from `react-charts/src/core/chart.types.ts` — the one contract both
 * platforms implement. Every key of `ChartProps`, `ChartSeries` and
 * `ChartCompare`, nothing more; the defaults are the ones `web/chart.tsx` and
 * `mobile/chart.tsx` apply, not ones this page invents.
 */
const chartProps = [
	{
		description: 'Names the figure for assistive tech.',
		name: 'title',
		required: true,
		type: 'string',
	},
	{
		description: 'How the series are drawn.',
		name: 'type',
		required: true,
		type: '"line" | "area" | "bar"',
	},
	{
		description: 'One row per point on the X axis.',
		name: 'data',
		required: true,
		type: 'Record<string, unknown>[]',
	},
	{
		description: 'The field of each data row on the X axis.',
		name: 'xKey',
		required: true,
		type: 'string',
	},
	{
		description: 'What is drawn, in order.',
		name: 'series',
		required: true,
		type: 'ChartSeries[]',
	},
	{
		description: 'The previous period, drawn muted underneath.',
		name: 'compare',
		type: 'ChartCompare',
	},
	{
		description: 'Stacks the series. Area and bar only.',
		name: 'stacked',
		type: 'boolean',
	},
	{
		description: 'Formats Y ticks and tooltip values.',
		name: 'valueFormat',
		type: '(value: number) => string',
	},
	{
		default: '<html lang> · device',
		description: 'Locale for grouping when valueFormat is unset.',
		name: 'locale',
		type: 'string',
	},
	{
		description: 'Shows a legend under the plot.',
		name: 'legend',
		type: 'boolean',
	},
	{
		default: '"md"',
		description: 'Plot height: 160, 256 or 320 px / pt.',
		name: 'height',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Shows a placeholder the size of the plot.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Announced while loading. Required.',
		name: 'loadingText',
		required: true,
		type: 'string',
	},
	{
		description: 'Shown when data is empty. Required.',
		name: 'emptyText',
		required: true,
		type: 'string',
	},
	{
		description: 'Longer text alternative for the figure.',
		name: 'description',
		type: 'string',
	},
]

const seriesProps = [
	{
		description: 'The field of each data row this series reads.',
		name: 'key',
		required: true,
		type: 'string',
	},
	{
		description: 'Name in the tooltip and legend.',
		name: 'label',
		required: true,
		type: 'string',
	},
	{
		description: 'Token: --chart-N on web, chartN on mobile.',
		name: 'color',
		type: '1 | 2 | 3 | 4 | 5',
	},
]

const compareProps = [
	{
		description: "The field holding the previous period's value.",
		name: 'key',
		required: true,
		type: 'string',
	},
	{
		description: 'Name in the tooltip and legend.',
		name: 'label',
		required: true,
		type: 'string',
	},
]

const platformCode = [
	{
		code: `// main.tsx — after react-web's stylesheet, which defines the tokens
import '@turystack/react-web/styles.css'
import '@turystack/react-charts/styles.css'

import { Chart } from '@turystack/react-charts' // or '@turystack/react-charts/web'`,
		label: 'Web',
	},
	{
		code: `// No stylesheet: colours are hex tokens, restyling is ChartThemeProvider
import { Chart } from '@turystack/react-charts/mobile'
// '@turystack/react-charts' resolves here too, under Metro's react-native condition`,
		label: 'Mobile',
	},
]

/** Where the two builds differ — every prop means the same on both. */
const differences = [
	[
		'Draws with',
		'ECharts, SVG in the DOM',
		'ECharts, react-native-svg',
	],
	[
		'Colours',
		'var(--chart-1…5) from your CSS',
		'chart1…5 hex tokens',
	],
	[
		'Dark mode',
		'Follows .dark on the page',
		'Follows the device, or colorScheme',
	],
	[
		'Tooltip',
		'Pointer and keyboard',
		'None',
	],
	[
		'Animation',
		'Draws in; off for reduced motion',
		'None',
	],
	[
		'Default locale',
		'<html lang>',
		'The device’s',
	],
	[
		'Restyle',
		'.chart-* classes, [data-height]',
		'ChartThemeProvider styles',
	],
] as const

const themeCode = [
	{
		code: `/* Your theme stylesheet — or paste into the Theme lab in the header */
:root {
  --chart-1: oklch(55% 0.2 280);
  --chart-2: oklch(70% 0.15 160);
}

.chart-legend-item { font-weight: 500; }
.chart-tooltip { border-width: 2px; box-shadow: none; }
.chart[data-height="lg"] :is(.chart-frame, .chart-skeleton, .chart-empty) {
  height: 28rem; /* all three, so loading and empty keep the plot size */
}`,
		label: 'Web (CSS)',
	},
	{
		code: `import { Chart, ChartThemeProvider } from '@turystack/react-charts/mobile'

<ChartThemeProvider
  tokens={{ light: { chart1: '#7c3aed' }, dark: { chart1: '#a78bfa' } }}
  styles={{
    chart: {
      legendText: { fontWeight: '500' },
      // all three, so loading and empty keep the plot size
      frame: ({ height }) => (height === 'lg' ? { height: 448 } : null),
      skeleton: ({ height }) => (height === 'lg' ? { height: 448 } : null),
      empty: ({ height }) => (height === 'lg' ? { height: 448 } : null),
    },
  }}
>
  <Chart … />
</ChartThemeProvider>`,
		label: 'Mobile (provider)',
	},
]

const usageCode = `import { Chart } from '@turystack/react-charts' // the same on web and mobile

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// This period over the previous one
<Chart
  title="Volume bruto"
  type="area"
  data={days}
  xKey="day"
  series={[{ key: 'current', label: 'Este mês' }]}
  compare={{ key: 'previous', label: 'Mês passado' }}
  valueFormat={(value) => money.format(value)}
  legend
  emptyText="Sem vendas no período"
  loadingText="Carregando o volume bruto"
/>

// Stacked bars, explicit colours
<Chart
  title="Reservas por canal"
  type="bar"
  stacked
  legend
  data={weeks}
  xKey="week"
  series={[
    { key: 'web', label: 'Web', color: 1 },
    { key: 'app', label: 'App', color: 2 },
    { key: 'agency', label: 'Agência', color: 3 },
  ]}
  locale="pt-BR"
  emptyText="Nenhuma reserva no período"
  loadingText="Carregando reservas por canal"
/>

// While the query runs, and when it returns nothing
<Chart title="Volume bruto" type="line" data={[]} xKey="day" series={series} loading={isLoading} emptyText="Sem vendas no período" loadingText="Carregando o volume bruto" />`

const channelSeries = [
	{
		key: 'web',
		label: 'Web',
	},
	{
		key: 'app',
		label: 'App',
	},
	{
		key: 'agency',
		label: 'Agência',
	},
]

const currentSeries = [
	{
		key: 'current',
		label: 'Este mês',
	},
]

const previousPeriod = {
	key: 'previous',
	label: 'Mês passado',
}

const types = [
	'line',
	'area',
	'bar',
] as const

const heights = [
	'sm',
	'md',
	'lg',
] as const

const colours = [
	1,
	2,
	3,
	4,
	5,
] as const

function Code({ children }: { children: string }) {
	return (
		<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
			{children}
		</code>
	)
}

function Page() {
	const [loading, setLoading] = useState(true)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Components
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Chart
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Line, area or bar chart over time — the same props on the web and in
					React Native.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Web and mobile</h2>
				<CodeBlock
					language="tsx"
					tabs={platformCode}
				/>
				<div className="overflow-x-auto rounded-lg border border-border">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-border border-b bg-muted/50">
								<th className="px-4 py-3 text-left font-medium text-muted-foreground">
									<span className="sr-only">Aspect</span>
								</th>
								<th className="px-4 py-3 text-left font-medium text-muted-foreground">
									Web
								</th>
								<th className="px-4 py-3 text-left font-medium text-muted-foreground">
									Mobile
								</th>
							</tr>
						</thead>
						<tbody>
							{differences.map(([aspect, web, mobile], index) => (
								<tr
									className={
										index < differences.length - 1
											? 'border-border border-b'
											: ''
									}
									key={aspect}
								>
									<td className="px-4 py-3 align-top font-medium">{aspect}</td>
									<td className="px-4 py-3 align-top text-muted-foreground">
										{web}
									</td>
									<td className="px-4 py-3 align-top text-muted-foreground">
										{mobile}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={chartProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>ChartSeries</Code> — one entry of <Code>series</Code>.
				</p>
				<PropsTable props={seriesProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>ChartCompare</Code> — the <Code>compare</Code> prop.
				</p>
				<PropsTable props={compareProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Line, area, bar</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same data, three ways.
				</p>
				<div className="space-y-4">
					{types.map((type) => (
						<ComponentPreview
							key={type}
							title={`type="${type}"`}
						>
							<div className="w-full max-w-3xl">
								<Chart
									data={bookingsByWeek}
									emptyText="Nenhuma reserva no período"
									loadingText="Carregando reservas por canal"
									series={channelSeries}
									title={`Reservas por canal — ${type}`}
									type={type}
									xKey="week"
								/>
							</div>
						</ComponentPreview>
					))}
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Stacked</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Area and bar only; a line chart ignores it.
				</p>
				<ComponentPreview title="Stacked bar">
					<div className="w-full max-w-3xl">
						<Chart
							data={bookingsByWeek}
							emptyText="Nenhuma reserva no período"
							legend
							loadingText="Carregando reservas por canal"
							series={channelSeries}
							stacked
							title="Reservas por canal, empilhadas"
							type="bar"
							xKey="week"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Stacked area">
					<div className="w-full max-w-3xl">
						<Chart
							data={bookingsByWeek}
							emptyText="Nenhuma reserva no período"
							legend
							loadingText="Carregando reservas por canal"
							series={channelSeries}
							stacked
							title="Reservas por canal, área empilhada"
							type="area"
							xKey="week"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Compare</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>compare</Code> adds the previous period, dashed or faint.
				</p>
				<ComponentPreview title="Line">
					<div className="w-full max-w-3xl">
						<Chart
							compare={previousPeriod}
							data={grossVolumeByDay}
							emptyText="Nenhuma venda no período"
							legend
							loadingText="Carregando o volume bruto"
							series={currentSeries}
							title="Volume bruto por dia, linha"
							type="line"
							valueFormat={(value) => brl.format(value)}
							xKey="day"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Bar">
					<div className="w-full max-w-3xl">
						<Chart
							compare={previousPeriod}
							data={grossVolumeByDay.slice(0, 10)}
							emptyText="Nenhuma venda no período"
							legend
							loadingText="Carregando o volume bruto"
							series={currentSeries}
							title="Volume bruto, primeiros dez dias"
							type="bar"
							valueFormat={(value) => brl.format(value)}
							xKey="day"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Formatting values
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>valueFormat</Code> formats ticks and tooltips. Without it,
					numbers follow <Code>locale</Code>, which defaults to{' '}
					<Code>&lt;html lang&gt;</Code>.
				</p>
				<div className="grid gap-4 lg:grid-cols-2">
					<ComponentPreview title="BRL">
						<div className="w-full">
							<Chart
								data={grossVolumeByDay}
								emptyText="Nenhuma venda no período"
								height="sm"
								loadingText="Carregando o volume bruto"
								series={currentSeries}
								title="Volume bruto em reais"
								type="area"
								valueFormat={(value) => brl.format(value)}
								xKey="day"
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Compact">
						<div className="w-full">
							<Chart
								data={grossVolumeByDay}
								emptyText="Nenhuma venda no período"
								height="sm"
								loadingText="Carregando o volume bruto"
								series={currentSeries}
								title="Volume bruto em reais, compacto"
								type="area"
								valueFormat={(value) => brlCompact.format(value)}
								xKey="day"
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title='locale="pt-BR"'>
						<div className="w-full">
							<Chart
								data={grossVolumeByDay}
								emptyText="Nenhuma venda no período"
								height="sm"
								loadingText="Carregando o volume bruto"
								locale="pt-BR"
								series={currentSeries}
								title="Volume bruto, agrupado em pt-BR"
								type="area"
								xKey="day"
							/>
						</div>
					</ComponentPreview>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Loading and empty
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Both keep the plot size. <Code>loadingText</Code> and{' '}
					<Code>emptyText</Code> are required.
				</p>
				<ComponentPreview title="Loading">
					<div className="w-full max-w-3xl space-y-4">
						<Button onClick={() => setLoading((value) => !value)}>
							{loading ? 'Carregar dados' : 'Voltar a carregar'}
						</Button>
						<Chart
							data={bookingsByWeek}
							emptyText="Nenhuma reserva no período"
							legend
							loading={loading}
							loadingText="Carregando reservas por canal"
							series={channelSeries}
							title="Reservas por canal"
							type="line"
							xKey="week"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Empty">
					<div className="w-full max-w-3xl">
						<Chart
							data={[]}
							emptyText="Nenhuma venda no período selecionado"
							legend
							loadingText="Carregando o volume bruto"
							series={currentSeries}
							title="Volume bruto"
							type="area"
							xKey="day"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Heights</h2>
				<div className="space-y-4">
					{heights.map((height) => (
						<ComponentPreview
							key={height}
							title={`height="${height}"`}
						>
							<div className="w-full max-w-3xl">
								<Chart
									data={grossVolumeByDay}
									emptyText="Nenhuma venda no período"
									height={height}
									loadingText="Carregando o volume bruto"
									series={currentSeries}
									title={`Volume bruto, altura ${height}`}
									type="line"
									valueFormat={(value) => brlCompact.format(value)}
									xKey="day"
								/>
							</div>
						</ComponentPreview>
					))}
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Colours 1–5</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>color: 3</Code> paints with <Code>var(--chart-3)</Code>. Unset,
					series take 1, 2, 3… in order.
				</p>
				<ComponentPreview title="Colours 1–5">
					<div className="w-full max-w-3xl">
						<Chart
							data={fiveSeriesByMonth}
							emptyText="Sem dados para mostrar"
							legend
							loadingText="Carregando as cores de gráfico"
							series={colours.map((color) => ({
								color,
								key: `s${color}`,
								label: `--chart-${color}`,
							}))}
							title="As cinco cores de gráfico"
							type="bar"
							xKey="month"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Accessibility</h2>
				<p className="max-w-prose font-medium text-sm">Web</p>
				<ul className="max-w-prose list-disc space-y-2 pl-5 text-muted-foreground text-sm">
					<li>
						A <Code>figure</Code> named by <Code>title</Code>, described by{' '}
						<Code>description</Code>.
					</li>
					<li>Tab into the plot: the tooltip opens on the first point.</li>
					<li>Left and right walk the points and stop at the ends.</li>
					<li>
						<Code>Enter</Code> hides and shows the tooltip; leaving hides it.
					</li>
					<li>
						<Code>loadingText</Code> is a status, read while loading.
					</li>
				</ul>
				<p className="max-w-prose font-medium text-sm">Mobile</p>
				<ul className="max-w-prose list-disc space-y-2 pl-5 text-muted-foreground text-sm">
					<li>
						The plot is one image: <Code>title</Code> its label,{' '}
						<Code>description</Code> its hint.
					</li>
					<li>
						Loading is a progress bar; iOS announces <Code>loadingText</Code>.
					</li>
					<li>The empty frame reads its text, hinted by the title.</li>
				</ul>
				<p className="max-w-prose text-muted-foreground text-sm">
					On both, the previous period is dashed or faint, not only recoloured.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Slots</h2>
				<p className="max-w-3xl text-muted-foreground text-sm">
					One set of names: a class on the web, a style key on mobile. Try them
					live in the <strong className="text-foreground">Theme lab</strong> in
					the header.
				</p>
				<PlatformSlotsTable slots={chartSlots} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Theming</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Tokens first, slots for what a token cannot say. The marks follow the
					tokens only: ECharts draws them.
				</p>
				<CodeBlock
					language="tsx"
					tabs={themeCode}
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="chart.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}
