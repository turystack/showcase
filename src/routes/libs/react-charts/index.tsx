import { createFileRoute, Link } from '@tanstack/react-router'
import { Chart } from '@turystack/react-charts'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components/docs'
import { brl, grossVolumeByDay } from '@/data/react-charts-samples'

export const Route = createFileRoute('/libs/react-charts/')({
	component: Page,
})

const usageCode = `import { Chart, Sparkline } from '@turystack/react-charts'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function GrossVolume({ days }: { days: { day: string; current: number; previous: number }[] }) {
  return (
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
  )
}

export function BookingsTrend({ weekly }: { weekly: number[] }) {
  return <Sparkline data={weekly} trend="up" />
}`

const mobileInstallCode = `npx expo install react-native-svg
npm install @turystack/react-charts @wuba/react-native-echarts zrender@6.1.0`

const mobileCode = `// '@turystack/react-charts' also resolves here under Metro; /mobile carries the types everywhere
import { Chart, ChartThemeProvider } from '@turystack/react-charts/mobile'

export function Revenue({ days }: { days: { day: string; current: number }[] }) {
  return (
    <ChartThemeProvider styles={{ chart: { legendText: { fontSize: 13 } } }}>
      <Chart
        title="Receita"
        type="line"
        data={days}
        xKey="day"
        series={[{ key: 'current', label: 'Este mês' }]}
        emptyText="Sem vendas no período"
        loadingText="Carregando a receita"
      />
    </ChartThemeProvider>
  )
}`

const metroCode = `// metro.config.js — ECharts imports tslib, which Metro resolves to a
// wrapper with no default export
const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')

const config = getDefaultConfig(__dirname)
const resolveRequest = config.resolver.resolveRequest

config.resolver.resolveRequest = (context, moduleName, platform) =>
  moduleName === 'tslib'
    ? { type: 'sourceFile', filePath: path.join(__dirname, 'node_modules/tslib/tslib.es6.js') }
    : (resolveRequest ?? context.resolveRequest)(context, moduleName, platform)

module.exports = config`

const stylesCode = `// main.tsx — the order matters
import '@turystack/react-web/styles.css'
import '@turystack/react-charts/styles.css'`

/** Every specifier package.json exports, and what it resolves to. */
const entryPoints = [
	[
		'@turystack/react-charts',
		'Web build; mobile under Metro with exports on (RN 0.79+)',
	],
	[
		'@turystack/react-charts/web',
		'Chart, Sparkline and the slot lists, for the DOM',
	],
	[
		'@turystack/react-charts/mobile',
		'Chart, Sparkline, ChartThemeProvider, mobile slot lists',
	],
	[
		'@turystack/react-charts/styles.css',
		'The web utilities. Import after react-web’s stylesheet',
	],
] as const

/**
 * `ChartTokens` in `react-charts/src/core/tokens.ts`: the mobile key, the
 * web custom property it mirrors, and what it paints.
 */
const tokens = [
	[
		'chart1 … chart5',
		'--chart-1 … --chart-5',
		'The series, in order or by color',
	],
	[
		'mutedForeground',
		'--muted-foreground',
		'Axis text, previous period, neutral trend',
	],
	[
		'border',
		'--border',
		'Grid lines, the empty frame',
	],
	[
		'muted',
		'--muted',
		'Loading placeholder; bar hover band (web)',
	],
	[
		'background',
		'--background',
		'Ring on the point under the pointer (web)',
	],
	[
		'—',
		'--popover, --popover-foreground',
		'The tooltip (web only)',
	],
	[
		'—',
		'--radius',
		'Corners of the tooltip, frames, swatches (web only)',
	],
	[
		'success',
		'--success',
		'A rising sparkline',
	],
	[
		'destructive',
		'--destructive',
		'A falling sparkline',
	],
] as const

/** `ChartThemeProviderProps` in `react-charts/src/mobile/theme.tsx`. */
const providerProps = [
	{
		description: 'Hex per scheme, merged over react-web’s values.',
		name: 'tokens',
		type: '{ light?: Partial<ChartTokens>; dark?: … }',
	},
	{
		description: 'A style, or a function of the variants, per slot.',
		name: 'styles',
		type: '{ chart?: ChartSlotStyles; sparkline?: … }',
	},
	{
		default: 'the device',
		description: 'Forces light or dark.',
		name: 'colorScheme',
		type: '"light" | "dark"',
	},
	{
		description: 'The charts it themes.',
		name: 'children',
		required: true,
		type: 'ReactNode',
	},
]

const slotListsCode = `import { CHART_SLOTS, CHART_WEB_SLOTS, CHART_MOBILE_SLOTS, SPARKLINE_SLOTS, slotClass } from '@turystack/react-charts/web'

CHART_SLOTS          // painted on both: root, frame, skeleton, empty, legend…
CHART_WEB_SLOTS      // web only: caption, loadingText, tooltip…
CHART_MOBILE_SLOTS   // mobile only: emptyText, legendText
slotClass('chart', 'legendItem') // → 'chart-legend-item'`

function TextTable({
	head,
	rows,
}: {
	head: readonly string[]
	rows: readonly (readonly string[])[]
}) {
	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-border border-b bg-muted/50">
						{head.map((cell) => (
							<th
								className="px-4 py-3 text-left font-medium text-muted-foreground"
								key={cell}
							>
								{cell}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr
							className={
								index < rows.length - 1 ? 'border-border border-b' : ''
							}
							key={row[0]}
						>
							{row.map((cell, column) => (
								<td
									className={
										column === 0
											? 'px-4 py-3 align-top'
											: 'px-4 py-3 align-top text-muted-foreground'
									}
									key={cell}
								>
									{column < row.length - 1 ? (
										<code className="whitespace-nowrap rounded-lg bg-muted px-1.5 py-0.5 text-xs">
											{cell}
										</code>
									) : (
										cell
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

const features = [
	'Chart: line, area or bar, stacked or compared',
	'Sparkline: an axis-free trend for a KPI tile',
	"Painted only with react-web's tokens; follows light and dark",
	'Accessible: titled, keyboard-walkable charts',
	'React Native: same props, themed per slot',
	'Loading and empty states keep the plot size',
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-charts
				</h1>
				<div className="mt-3 max-w-3xl space-y-2 text-lg text-muted-foreground">
					<p>
						Charts and sparklines on ECharts, painted with react-web tokens, for
						the web and React Native.
					</p>
				</div>
			</div>

			<ComponentPreview title="Gross volume">
				<div className="w-full max-w-3xl">
					<Chart
						compare={{
							key: 'previous',
							label: 'Mês passado',
						}}
						data={grossVolumeByDay}
						emptyText="Nenhuma venda no período"
						legend
						loadingText="Carregando o volume bruto"
						series={[
							{
								key: 'current',
								label: 'Este mês',
							},
						]}
						title="Volume bruto por dia"
						type="area"
						valueFormat={(value) => brl.format(value)}
						xKey="day"
					/>
				</div>
			</ComponentPreview>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/react-charts',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/react-charts',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/react-charts',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/react-charts',
							label: 'bun',
						},
					]}
				/>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						echarts
					</code>{' '}
					is installed with it;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						react
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						react-dom
					</code>{' '}
					19+ are peers on the web.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Styles</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Import it after react-web&apos;s; it reads react-web&apos;s tokens.
				</p>
				<CodeBlock
					code={stylesCode}
					filename="main.tsx"
					language="tsx"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Mobile</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Same props in React Native, drawn with react-native-svg. No tooltip;
					colours are react-web&apos;s tokens as hex.
				</p>
				<CodeBlock
					code={mobileInstallCode}
					language="bash"
				/>
				<CodeBlock
					code={mobileCode}
					filename="revenue.tsx"
					language="tsx"
				/>
				<p className="max-w-prose text-muted-foreground text-sm">
					ChartThemeProvider takes tokens and a style per slot, under the names
					the web publishes as classes.
				</p>
				<CodeBlock
					code={metroCode}
					filename="metro.config.js"
					language="js"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Entry points</h2>
				<TextTable
					head={[
						'Import',
						'What it is',
					]}
					rows={entryPoints}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Tokens</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The web reads the custom property; mobile takes the key, as hex,
					react-web’s values by default.
				</p>
				<TextTable
					head={[
						'Mobile key',
						'Web property',
						'Paints',
					]}
					rows={tokens}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">
					ChartThemeProvider (mobile)
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					What a web theme does with CSS: tokens, and a style per slot under the
					web’s slot names.
				</p>
				<PropsTable props={providerProps} />
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Slot lists</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Exported for tooling — the Theme lab is built from them. Each
					component page has the full table.
				</p>
				<CodeBlock
					code={slotListsCode}
					language="ts"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					{features.map((feature) => (
						<li
							className="flex items-start gap-2"
							key={feature}
						>
							<span className="mt-1 text-lib">→</span>
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Components</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					<Link
						className="rounded-lg border border-border p-4 transition-colors hover:border-lib/50"
						to="/libs/react-charts/chart"
					>
						<p className="font-display font-semibold">Chart</p>
						<p className="mt-1 text-muted-foreground text-sm">
							Line, area or bar chart over time.
						</p>
					</Link>
					<Link
						className="rounded-lg border border-border p-4 transition-colors hover:border-lib/50"
						to="/libs/react-charts/sparkline"
					>
						<p className="font-display font-semibold">Sparkline</p>
						<p className="mt-1 text-muted-foreground text-sm">
							An axis-free trend for a KPI tile.
						</p>
					</Link>
				</div>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="gross-volume.tsx"
					language="tsx"
				/>
			</div>
		</div>
	)
}
