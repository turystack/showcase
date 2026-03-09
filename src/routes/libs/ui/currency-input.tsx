import { createFileRoute } from '@tanstack/react-router'
import { CurrencyInput, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const currencyInputProps = [
	{
		default: '"single"',
		description: 'Input mode. "single" for a single numeric value, "range" for a from/to range.',
		name: 'mode',
		type: '"single" | "range"',
	},
	{
		default: '"brl"',
		description: 'The currency to format the value in.',
		name: 'currency',
		type: '"brl" | "usd" | "eur"',
	},
	{
		description: 'The controlled value. A number for single mode, { from?, to? } for range mode.',
		name: 'value',
		type: 'number | null | { from?: number | null; to?: number | null }',
	},
	{
		description: 'The default value when uncontrolled.',
		name: 'defaultValue',
		type: 'number | null | { from?: number | null; to?: number | null }',
	},
	{
		description: 'Placeholder text displayed when the input is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the input.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Makes the input take the full width of its container.',
		name: 'block',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Disables the input, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description:
			'Handler called when the value changes.',
		name: 'onChange',
		type: '(value: number | null) => void | (value: { from?: number | null; to?: number | null }) => void',
	},
]

const usageCode = `import { CurrencyInput } from '@turystack/ui'

// Brazilian Real
<CurrencyInput currency="brl" placeholder="R$ 0,00" />

// US Dollar
<CurrencyInput currency="usd" placeholder="$0.00" />

// Euro
<CurrencyInput currency="eur" placeholder="0,00 €" />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						CurrencyInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A currency input that formats values automatically based on the
						selected currency. Wraps the base Input component.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={currencyInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Brazilian Real (BRL)
					</h2>
					<ComponentPreview title="Default currency">
						<CurrencyInput
							currency="brl"
							placeholder="R$ 0,00"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						US Dollar (USD)
					</h2>
					<ComponentPreview title="USD format">
						<CurrencyInput
							currency="usd"
							placeholder="$0.00"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Euro (EUR)</h2>
					<ComponentPreview title="EUR format">
						<CurrencyInput
							currency="eur"
							placeholder="0,00 €"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<CurrencyInput
							disabled
							currency="brl"
							placeholder="Disabled"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Range mode</h2>
					<ComponentPreview title="From / To range picker">
						<CurrencyInput
							mode="range"
							currency="brl"
							placeholder="Select price range"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/currency-input')({
	component: Page,
})
