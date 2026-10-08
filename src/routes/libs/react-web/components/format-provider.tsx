import { createFileRoute } from '@tanstack/react-router'
import {
	DateText,
	FormatProvider,
	MoneyText,
	NumberText,
} from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const formatProviderProps = [
	{
		description: 'Locale, zone, currency and patterns, merged over defaults.',
		name: 'format',
		type: 'FormatDefaults',
	},
]

const formatValuesProps = [
	{
		default: '"en-US"',
		description: 'BCP 47 tag driving every Intl call.',
		name: 'locale',
		type: 'string',
	},
	{
		default: '"usd"',
		description: 'Currency MoneyText uses when given none.',
		name: 'currency',
		type: 'Currency',
	},
	{
		description: 'IANA zone; absent means the runtime’s own zone.',
		name: 'timeZone',
		type: 'string',
	},
	{
		description: 'A date-fns pattern replacing the locale’s date shape.',
		name: 'dateFormat',
		type: 'string',
	},
	{
		description: 'The same, for the time alone.',
		name: 'timeFormat',
		type: 'string',
	},
	{
		description: 'The same, for date and time together.',
		name: 'dateTimeFormat',
		type: 'string',
	},
]

const usageCode = `import { FormatProvider, TuryProvider } from '@turystack/react-web'

// Usually one line inside TuryProvider, at the root
<TuryProvider
  format={{ currency: 'brl', locale: 'pt-BR', timeZone: 'America/Sao_Paulo' }}
  labels={ptBR}
>
  <App />
</TuryProvider>

// Or on its own, for a subtree that formats differently — a report
// rendered for a partner in another country
<FormatProvider format={{ currency: 'usd', locale: 'en-US' }}>
  <PartnerInvoice />
</FormatProvider>

// Reading the resolved values, for a format the library does not ship
const { currency, locale, timeZone } = useFormat()`

const INSTANT = new Date('2026-08-24T15:30:00.000Z')

function Row({ locale, timeZone }: { locale: string; timeZone: string }) {
	return (
		<div className="flex items-center justify-between gap-6">
			<span className="text-muted-foreground text-xs">{locale}</span>
			<FormatProvider
				format={{
					currency: 'brl',
					locale,
					timeZone,
				}}
			>
				<span className="flex items-center gap-4">
					<DateText
						value={INSTANT}
						variant="dateTime"
					/>
					<MoneyText value={123456} />
					<NumberText value={1234.5} />
				</span>
			</FormatProvider>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Core
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					FormatProvider
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One place that says where the reader is: the locale, the time zone and
					the currency every formatter in the library renders with.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={formatProviderProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">FormatDefaults</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Defaults are en-US and usd; the package never reads the runtime.
				</p>
				<PropsTable props={formatValuesProps} />
			</section>

			<SlotsSection slug="format-provider" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					One provider, every formatter
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same three values under three providers; only the provider knows
					the country.
				</p>
				<ComponentPreview title="Date, money and number, three ways">
					<div className="flex w-full max-w-lg flex-col gap-3 text-sm">
						<Row
							locale="pt-BR"
							timeZone="America/Sao_Paulo"
						/>
						<Row
							locale="en-US"
							timeZone="UTC"
						/>
						<Row
							locale="de-DE"
							timeZone="Europe/Berlin"
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

export const Route = createFileRoute(
	'/libs/react-web/components/format-provider',
)({
	component: Page,
})
