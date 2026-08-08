import { createFileRoute } from '@tanstack/react-router'
import { CurrencyInput, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const currencyInputProps = [
	{
		default: '"single"',
		description:
			'Input mode. "single" for a single numeric value, "range" for a from/to range.',
		name: 'mode',
		type: '"single" | "range"',
	},
	{
		default: '"brl"',
		description:
			'The currency variant. Use "any" to show an inline currency selector alongside the input.',
		name: 'variant',
		type: '"brl" | "usd" | "eur" | "any"',
	},
	{
		description:
			'The controlled value. A number for single mode, { from?, to? } for range mode.',
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
		description: 'Content rendered on the left side of the input.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content rendered on the right side of the input.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Disables the input, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a loading spinner in the input.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description:
			'Additional CSS class name applied to the root wrapper element.',
		name: 'rootClassName',
		type: 'string',
	},
	{
		description: 'Handler called when the value changes.',
		name: 'onChange',
		type: '(value: number | null) => void | (value: { from?: number | null; to?: number | null }) => void',
	},
]

const usageCode = `import { CurrencyInput } from '@turystack/ui'

// Brazilian Real
<CurrencyInput variant="brl" placeholder="R$ 0,00" />

// US Dollar
<CurrencyInput variant="usd" placeholder="$0.00" />

// Euro
<CurrencyInput variant="eur" placeholder="0,00 €" />

// Any currency (inline selector)
<CurrencyInput variant="any" />

// Sizes
<CurrencyInput variant="brl" size="sm" placeholder="Small" />
<CurrencyInput variant="brl" size="md" placeholder="Medium" />
<CurrencyInput variant="brl" size="lg" placeholder="Large" />

// Loading
<CurrencyInput variant="brl" loading placeholder="Loading..." />

// Range mode
<CurrencyInput
  mode="range"
  variant="brl"
  placeholder="Select price range"
/>

// Controlled
const [price, setPrice] = useState<number | null>(null)

<CurrencyInput
  variant="brl"
  value={price}
  onChange={setPrice}
  placeholder="R$ 0,00"
/>`

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
						<div className="w-80">
							<CurrencyInput
								placeholder="R$ 0,00"
								variant="brl"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						US Dollar (USD)
					</h2>
					<ComponentPreview title="USD format">
						<div className="w-80">
							<CurrencyInput
								placeholder="$0.00"
								variant="usd"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Euro (EUR)</h2>
					<ComponentPreview title="EUR format">
						<div className="w-80">
							<CurrencyInput
								placeholder="0,00 €"
								variant="eur"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Any currency (selector)
					</h2>
					<ComponentPreview title="Inline currency selector">
						<div className="w-80">
							<CurrencyInput variant="any" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Currency input sizes">
						<div className="flex w-80 flex-col gap-3">
							<CurrencyInput
								placeholder="Small"
								size="sm"
								variant="brl"
							/>
							<CurrencyInput
								placeholder="Medium"
								size="md"
								variant="brl"
							/>
							<CurrencyInput
								placeholder="Large"
								size="lg"
								variant="brl"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<div className="w-80">
							<CurrencyInput
								loading
								placeholder="Loading..."
								variant="brl"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<CurrencyInput
								disabled
								placeholder="Disabled"
								variant="brl"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Range mode</h2>
					<ComponentPreview title="From / To range picker">
						<div className="w-80">
							<CurrencyInput
								mode="range"
								placeholder="Select price range"
								variant="brl"
							/>
						</div>
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

export const Route = createFileRoute('/libs/react-web/currency-input')({
	component: Page,
})
