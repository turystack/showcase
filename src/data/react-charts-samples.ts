/**
 * Sample figures for the react-charts pages.
 *
 * Deterministic on purpose: a preview that reshuffles on every render makes a
 * screenshot diff meaningless and a reader wonder whether the chart is live.
 */

/** A smooth-ish series: a base, a slope and a weekly wave, no randomness. */
function wave(index: number, base: number, slope: number, swing: number) {
	return Math.round(
		base + slope * index + swing * Math.sin((index / 7) * Math.PI * 2),
	)
}

/** Gross volume per day, this month against last month, in reais. */
export const grossVolumeByDay = Array.from(
	{
		length: 30,
	},
	(_, index) => ({
		current: wave(index, 18_000, 420, 3_200),
		day: `${String(index + 1).padStart(2, '0')}/09`,
		previous: wave(index, 16_500, 260, 2_600),
	}),
)

/** Bookings per week, split by the channel they came through. */
export const bookingsByWeek = [
	{
		agency: 38,
		app: 64,
		web: 120,
		week: 'S1',
	},
	{
		agency: 41,
		app: 72,
		web: 131,
		week: 'S2',
	},
	{
		agency: 35,
		app: 80,
		web: 118,
		week: 'S3',
	},
	{
		agency: 44,
		app: 91,
		web: 142,
		week: 'S4',
	},
	{
		agency: 47,
		app: 97,
		web: 150,
		week: 'S5',
	},
	{
		agency: 43,
		app: 104,
		web: 139,
		week: 'S6',
	},
]

/** Five series, one per chart token, for the colour sampler. */
export const fiveSeriesByMonth = [
	'Jan',
	'Fev',
	'Mar',
	'Abr',
	'Mai',
	'Jun',
].map((month, index) => ({
	month,
	s1: 40 + index * 6,
	s2: 32 + index * 5,
	s3: 26 + index * 4,
	s4: 18 + index * 3,
	s5: 10 + index * 2,
}))

export const brl = new Intl.NumberFormat('pt-BR', {
	currency: 'BRL',
	maximumFractionDigits: 0,
	style: 'currency',
})

/** Compact reais for a Y axis: "R$ 18 mil" instead of "R$ 18.000". */
export const brlCompact = new Intl.NumberFormat('pt-BR', {
	currency: 'BRL',
	maximumFractionDigits: 1,
	notation: 'compact',
	style: 'currency',
})

export const sparklineUp = [
	12,
	14,
	13,
	17,
	16,
	19,
	22,
	21,
	25,
	28,
]

export const sparklineDown = [
	31,
	29,
	30,
	26,
	27,
	23,
	21,
	22,
	18,
	16,
]

export const sparklineFlat = [
	20,
	22,
	19,
	21,
	20,
	22,
	21,
	19,
	21,
	20,
]
