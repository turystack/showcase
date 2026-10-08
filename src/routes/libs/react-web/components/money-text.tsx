import { createFileRoute } from '@tanstack/react-router'
import { FormatProvider, MoneyText, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const moneyTextProps = [
	{
		description: 'Amount in integer cents, or a from/to pair in range mode.',
		name: 'value',
		required: true,
		type: 'number | null',
	},
	{
		default: '"standard"',
		description: 'standard, compact, accounting (debits in parens) or code.',
		name: 'variant',
		type: 'MoneyTextVariant',
	},
	{
		default: '"single"',
		description: 'Range mode reads a from/to pair; one bound may be missing.',
		name: 'mode',
		type: '"single" | "range"',
	},
	{
		description: 'Overrides the FormatProvider currency for this instance.',
		name: 'currency',
		type: 'Currency',
	},
	{
		description: 'Overrides the FormatProvider locale for this instance.',
		name: 'locale',
		type: 'string',
	},
	{
		default: '2',
		description: 'Decimal places. Compact starts at 1.',
		name: 'fractionDigits',
		type: 'number',
	},
	{
		description: 'Renders the number without the currency symbol.',
		name: 'hideSymbol',
		type: 'boolean',
	},
	{
		default: '"auto"',
		description: 'auto, always, never or exceptZero.',
		name: 'signDisplay',
		type: 'MoneyTextSignDisplay',
	},
	{
		description: 'Paints a credit green and a debit in the error colour.',
		name: 'colored',
		type: 'boolean',
	},
	{
		description: 'A trailing note beside the amount, such as "/ night".',
		name: 'rightSection',
		type: 'React.ReactNode',
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

const usageCode = `import { FormatProvider, MoneyText, Typography } from '@turystack/react-web'

// The renderings below assume a pt-BR / BRL provider at the root
<FormatProvider format={{ currency: 'brl', locale: 'pt-BR' }}>
  <App />
</FormatProvider>

// Cents in, money out — the same unit CurrencyInput writes
<MoneyText value={123456} />                       // R$ 1.234,56
<MoneyText value={123456789} variant="compact" />  // R$ 1,2 mi
<MoneyText colored value={-2500} />                // debit, in the error colour
<MoneyText hideSymbol value={123456} />            // 1.234,56

// A nightly rate
<MoneyText rightSection={<span>/ night</span>} value={39900} />

// A price filter
<MoneyText mode="range" value={{ from: 10000, to: 50000 }} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  Pague no Pix e economize <MoneyText inheritColor size="inherit" value={4990} weight="semibold" />.
</Typography>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					MoneyText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An amount stored in cents, rendered as money the reader can judge —
					with the shapes a finance screen needs and the wording a filter needs.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={moneyTextProps} />
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

			<SlotsSection slug="money-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Four shapes of the same amount; accounting writes debits in
					parentheses.
				</p>
				<ComponentPreview title="$1,234.56 in four shapes">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">standard</span>
							<MoneyText value={123456} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">compact</span>
							<MoneyText
								value={123456789}
								variant="compact"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">accounting</span>
							<MoneyText
								value={-2500}
								variant="accounting"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">code</span>
							<MoneyText
								value={123456}
								variant="code"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Sign, colour and symbol
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A delta column wants the sign and the colour; a total column wants
					neither. Both are props rather than two components.
				</p>
				<ComponentPreview title="The same value, read for different jobs">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">plain</span>
							<MoneyText value={-2500} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">coloured</span>
							<MoneyText
								colored
								value={2500}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								coloured debit
							</span>
							<MoneyText
								colored
								value={-2500}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">sign always</span>
							<MoneyText
								signDisplay="always"
								value={2500}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">no symbol</span>
							<MoneyText
								hideSymbol
								value={123456}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">with a note</span>
							<MoneyText
								rightSection={
									<span className="text-muted-foreground text-xs">/ night</span>
								}
								value={39900}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The currency is the amount’s, the locale is the reader’s
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A Brazilian price for an American reader keeps R$ and takes US
					separators.
				</p>
				<ComponentPreview title="One amount, two readers">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								pt-BR reader
							</span>
							<FormatProvider
								format={{
									currency: 'brl',
									locale: 'pt-BR',
								}}
							>
								<MoneyText value={123456} />
							</FormatProvider>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								en-US reader
							</span>
							<FormatProvider
								format={{
									currency: 'brl',
									locale: 'en-US',
								}}
							>
								<MoneyText value={123456} />
							</FormatProvider>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Ranges</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same wording DateText and CurrencyInput use, from the same labels.
				</p>
				<ComponentPreview title="A price filter">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">from and to</span>
							<MoneyText
								mode="range"
								value={{
									from: 10000,
									to: 50000,
								}}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">from only</span>
							<MoneyText
								mode="range"
								value={{
									from: 10000,
								}}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">to only</span>
							<MoneyText
								mode="range"
								value={{
									to: 50000,
								}}
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
							Pague no Pix e economize{' '}
							<MoneyText
								inheritColor
								size="inherit"
								value={4990}
								weight="semibold"
							/>{' '}
							— o total cai para{' '}
							<MoneyText
								inheritColor
								size="inherit"
								value={94810}
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

export const Route = createFileRoute('/libs/react-web/components/money-text')({
	component: Page,
})
