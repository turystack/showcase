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
		description: 'The currency to format the value in.',
		name: 'currency',
		type: '"brl" | "usd" | "eur"',
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
<CurrencyInput currency="brl" placeholder="R$ 0,00" />

// US Dollar
<CurrencyInput currency="usd" placeholder="$0.00" />

// Euro
<CurrencyInput currency="eur" placeholder="0,00 €" />

// Sizes
<CurrencyInput currency="brl" size="sm" placeholder="Small" />
<CurrencyInput currency="brl" size="md" placeholder="Medium" />
<CurrencyInput currency="brl" size="lg" placeholder="Large" />

// Block (full width)
<CurrencyInput currency="brl" block placeholder="R$ 0,00" />

// Loading
<CurrencyInput currency="brl" loading placeholder="Loading..." />

// Range mode
<CurrencyInput
  mode="range"
  currency="brl"
  placeholder="Select price range"
/>

// Controlled
const [price, setPrice] = useState<number | null>(null)

<CurrencyInput
  currency="brl"
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
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Currency input sizes">
						<div className="flex flex-col gap-3">
							<CurrencyInput
								currency="brl"
								placeholder="Small"
								size="sm"
							/>
							<CurrencyInput
								currency="brl"
								placeholder="Medium"
								size="md"
							/>
							<CurrencyInput
								currency="brl"
								placeholder="Large"
								size="lg"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Block</h2>
					<ComponentPreview
						className="w-80"
						title="Full width"
					>
						<CurrencyInput
							block
							currency="brl"
							placeholder="R$ 0,00"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<CurrencyInput
							currency="brl"
							loading
							placeholder="Loading..."
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<CurrencyInput
							currency="brl"
							disabled
							placeholder="Disabled"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Range mode</h2>
					<ComponentPreview title="From / To range picker">
						<CurrencyInput
							currency="brl"
							mode="range"
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
