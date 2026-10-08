import {
	CHART_MOBILE_SLOTS,
	CHART_SLOTS,
	CHART_WEB_SLOTS,
	type ChartMobileSlot,
	type ChartWebSlot,
	SPARKLINE_SLOTS,
	type SparklineSlot,
	slotClass,
} from '@turystack/react-charts'

/**
 * The slots react-charts paints, on each platform.
 *
 * The names are the package's own exports — `CHART_SLOTS` and friends — so a
 * slot it grows or drops reaches this table, the Theme lab's scaffold and the
 * theme prompt without anyone remembering. What cannot be derived — where a
 * slot lands and what it is for — is written here, and the `Record` types make
 * a slot without a description a type error rather than a silent gap.
 */

export type PlatformSlot = {
	/** The class a theme targets on the web, or null when mobile-only. */
	className: string | null
	description: string
	/** What it is on the web and on mobile. */
	element: {
		mobile: string | null
		web: string | null
	}
	/** The key ChartThemeProvider takes a style under. */
	key: string
}

type Detail = {
	description: string
	mobile: string | null
	web: string | null
}

const CHART: Record<ChartMobileSlot | ChartWebSlot, Detail> = {
	caption: {
		description: 'The visually hidden title and summary of the figure.',
		mobile: null,
		web: 'figcaption',
	},
	empty: {
		description: 'The dashed frame shown instead of the plot when empty.',
		mobile: 'View',
		web: 'div',
	},
	emptyText: {
		description: 'The words inside the empty frame.',
		mobile: 'Text',
		web: null,
	},
	frame: {
		description: 'The plot ECharts draws into; its height is the plot’s.',
		mobile: 'View',
		web: 'div',
	},
	legend: {
		description: 'The row of series under the plot.',
		mobile: 'View',
		web: 'ul',
	},
	legendItem: {
		description: 'One series in the legend: swatch and name.',
		mobile: 'View',
		web: 'li',
	},
	legendText: {
		description: 'The name of a series in the legend.',
		mobile: 'Text',
		web: null,
	},
	loadingText: {
		description: 'The visually hidden status read while loading.',
		mobile: null,
		web: 'span',
	},
	root: {
		description: 'The figure. Carries data-height on the web.',
		mobile: 'View',
		web: 'figure',
	},
	skeleton: {
		description: 'The pulsing placeholder the size of the plot.',
		mobile: 'Animated.View',
		web: 'div',
	},
	swatch: {
		description: 'The colour square of a series: legend; tooltip on web.',
		mobile: 'View',
		web: 'span',
	},
	swatchCompare: {
		description: 'The dashed mark of the previous period.',
		mobile: 'View',
		web: 'span',
	},
	tooltip: {
		description: 'The box that follows the pointer or the arrow keys.',
		mobile: null,
		web: 'div',
	},
	tooltipLabel: {
		description: 'The X value at the top of the tooltip.',
		mobile: null,
		web: 'span',
	},
	tooltipName: {
		description: 'A series name inside the tooltip.',
		mobile: null,
		web: 'span',
	},
	tooltipRow: {
		description: 'One series in the tooltip: swatch, name and value.',
		mobile: null,
		web: 'div',
	},
	tooltipValue: {
		description: 'A formatted value inside the tooltip.',
		mobile: null,
		web: 'span',
	},
}

const SPARKLINE: Record<SparklineSlot, Detail> = {
	root: {
		description: 'The trend. Carries data-height and data-trend on the web.',
		mobile: 'View',
		web: 'div',
	},
}

function rows<Slot extends string>(
	component: string,
	slots: readonly Slot[],
	details: Record<Slot, Detail>,
): PlatformSlot[] {
	return slots.map((slot) => {
		const detail = details[slot]

		return {
			className: detail.web ? slotClass(component, slot) : null,
			description: detail.description,
			element: {
				mobile: detail.mobile,
				web: detail.web,
			},
			key: slot,
		}
	})
}

export const chartSlots: PlatformSlot[] = rows(
	'chart',
	[
		...CHART_SLOTS,
		...CHART_WEB_SLOTS,
		...CHART_MOBILE_SLOTS,
	],
	CHART,
)

export const sparklineSlots: PlatformSlot[] = rows(
	'sparkline',
	SPARKLINE_SLOTS,
	SPARKLINE,
)

/** Every class a web theme can target, by component, for the Theme lab. */
export const reactChartsWebClasses: {
	slots: string[]
	slug: string
}[] = [
	{
		slots: chartSlots.flatMap((slot) =>
			slot.className
				? [
						slot.className,
					]
				: [],
		),
		slug: 'chart',
	},
	{
		slots: sparklineSlots.flatMap((slot) =>
			slot.className
				? [
						slot.className,
					]
				: [],
		),
		slug: 'sparkline',
	},
]
