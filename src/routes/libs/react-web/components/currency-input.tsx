import { createFileRoute, Link } from '@tanstack/react-router'
import {
	CurrencyInput,
	type CurrencyInputRangeValue,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/currency-input/currency-input.types.ts`. The type
 * is a discriminated union on `mode`, so `value`, `defaultValue` and
 * `onChange` change shape with it — the Type column says which is which.
 */
const currencyInputProps = [
	{
		default: '"single"',
		description: 'single: one amount. range: a popover with two bounds.',
		name: 'mode',
		type: '"single" | "range"',
	},
	{
		default: '"brl"',
		description: 'Currency (symbol, separators, locale); any adds a picker.',
		name: 'variant',
		type: 'single: "brl" | "usd" | "eur" | "any" · range: "brl" | "usd" | "eur"',
	},
	{
		description: 'Controlled amount in integer cents (123456 = R$ 1.234,56).',
		name: 'value',
		type: 'single: number | null · range: { from?: number | null; to?: number | null } | null',
	},
	{
		description: 'Initial amount in integer cents, when uncontrolled.',
		name: 'defaultValue',
		type: 'single: number | null · range: { from?: number | null; to?: number | null } | null',
	},
	{
		description: 'Single: every keystroke and on mount. Range: on apply/clear.',
		name: 'onChange',
		type: 'single: (value: number | null) => void · range: (value: CurrencyInputRangeValue | null) => void',
	},
	{
		default: '"Minimum value"',
		description: 'Placeholder of the lower bound field. Range mode only.',
		name: 'fromPlaceholder',
		type: 'string',
	},
	{
		default: '"Maximum value"',
		description: 'Placeholder of the upper bound field. Range mode only.',
		name: 'toPlaceholder',
		type: 'string',
	},
	{
		default: '"Filter by value" in range mode',
		description: 'Placeholder of the field (read-only one in range mode).',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Height of field, symbol and picker: 36, 40, 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Blocks the field, picker and range buttons.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Inherited. Disables and shows a spinner, in both modes.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: '36',
		description: 'Inherited. Width of the left slot (range symbol button).',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		default: '36',
		description: 'Inherited. Width of the right slot (range clear button).',
		name: 'rightSectionWidth',
		type: 'number',
	},
	{
		description: 'Inherited. Single mode only: extra slot by the symbol.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Inherited. Single mode only: content on the right.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Inherited. Single mode: delays onChange by 300ms.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id of the native input.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Name submitted with a form.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Id of a form the field joins.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'Inherited from Input. aria-label when no label is visible.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Marks the field invalid.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id(s) of the hint or error.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: '"currency-input-field" (single), "input-field" (range)',
		description: 'Inherited from Input. Test id; replaces the default.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Browser autofill hint.',
		name: 'autoComplete',
		type: 'React.HTMLInputAutoCompleteAttribute',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Focuses the field on mount.',
		name: 'autoFocus',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Single mode only; no effect in range.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Inherited from Input. Max length; single mode only.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Inherited from Input. Min length; single mode only.',
		name: 'minLength',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Required for form validation.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Range mode is always read-only.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Fires when the field loses focus.',
		name: 'onBlur',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires when the field gains focus.',
		name: 'onFocus',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires on every key press in the field.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. In range mode, runs before opening.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

const usageCode = `import { CurrencyInput } from '@turystack/react-web'
import type { CurrencyInputRangeValue } from '@turystack/react-web'

// Single amount. Everything is integer cents: 123456 is R$ 1.234,56
const [price, setPrice] = useState<number | null>(null)
// No visible label: name the field (inside a Form.Field the label does it)
<CurrencyInput ariaLabel="Valor da diária" onChange={setPrice} value={price} variant="brl" />

// The three currencies
<CurrencyInput value={123456} variant="brl" />  // R$ 1.234,56
<CurrencyInput value={123456} variant="usd" />  // $ 1,234.56
<CurrencyInput value={123456} variant="eur" />  // € 1.234,56

// Let the reader pick the currency
<CurrencyInput onChange={setPrice} value={price} variant="any" />

// Range. onChange fires when the reader applies or clears, not while typing
const [range, setRange] = useState<CurrencyInputRangeValue | null>(null)
<CurrencyInput ariaLabel="Faixa de preço" mode="range" onChange={setRange} value={range} />

// Naming the two bounds
<CurrencyInput
  fromPlaceholder="De"
  mode="range"
  placeholder="Faixa de preço"
  toPlaceholder="Até"
/>

// Sizes and states
<CurrencyInput size="sm" variant="any" />
<CurrencyInput disabled value={9900} />
<CurrencyInput disabled mode="range" />`

function formatCents(cents: number | null) {
	return cents === null ? 'null' : `${cents} cents`
}

function SinglePreview() {
	const [value, setValue] = useState<number | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<CurrencyInput
				ariaLabel="Valor da diária"
				onChange={setValue}
				placeholder="0,00"
				value={value}
				variant="brl"
			/>
			<p className="text-muted-foreground text-xs">
				onChange: <code>{formatCents(value)}</code>
			</p>
		</div>
	)
}

function AnyCurrencyPreview() {
	const [value, setValue] = useState<number | null>(123456)

	return (
		<div className="w-full max-w-sm space-y-2">
			<CurrencyInput
				ariaLabel="Valor da diária"
				onChange={setValue}
				value={value}
				variant="any"
			/>
			<p className="text-muted-foreground text-xs">
				onChange: <code>{formatCents(value)}</code> — the amount is reformatted
				for the currency you pick, and the cents stay the same.
			</p>
		</div>
	)
}

function SectionsPreview() {
	const [value, setValue] = useState<number | null>(45000)
	const [loading, setLoading] = useState(false)

	return (
		<div className="w-full max-w-sm space-y-2">
			<CurrencyInput
				ariaLabel="Valor da diária"
				leftSection={<span aria-hidden="true">★</span>}
				leftSectionWidth={28}
				loading={loading}
				onChange={setValue}
				rightSection={<span className="text-xs">OK</span>}
				value={value}
			/>
			<label className="flex items-center gap-2 text-muted-foreground text-xs">
				<input
					checked={loading}
					onChange={(e) => setLoading(e.target.checked)}
					type="checkbox"
				/>
				loading — swaps the right section for a spinner and disables the field
			</label>
		</div>
	)
}

function formatRange(range: CurrencyInputRangeValue | null) {
	if (range === null) {
		return 'null'
	}

	return `{ from: ${range.from ?? 'null'}, to: ${range.to ?? 'null'} }`
}

function RangePreview() {
	const [value, setValue] = useState<CurrencyInputRangeValue | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<CurrencyInput
				ariaLabel="Faixa de preço"
				mode="range"
				onChange={setValue}
				value={value}
				variant="brl"
			/>
			<p className="text-muted-foreground text-xs">
				onChange: <code>{formatRange(value)}</code>
			</p>
		</div>
	)
}

function RangeLabelledPreview() {
	const [value, setValue] = useState<CurrencyInputRangeValue | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<CurrencyInput
				ariaLabel="Faixa de preço"
				fromPlaceholder="De"
				mode="range"
				onChange={setValue}
				placeholder="Faixa de preço"
				toPlaceholder="Até"
				value={value}
				variant="usd"
			/>
			<p className="text-muted-foreground text-xs">
				onChange: <code>{formatRange(value)}</code>
			</p>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					CurrencyInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A money field that speaks in integer cents.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={currencyInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows marked “Inherited from Input” are Input’s form attributes; see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					. In range mode they go to the read-only field.
				</p>
			</section>

			<SlotsSection slug="currency-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every amount is{' '}
					<strong className="text-foreground">integer cents</strong>: R$
					1.234,56 is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						123456
					</code>
					. Passing{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						1234.56
					</code>{' '}
					gives R$ 12,35, silently.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					One thing to plan around in single mode:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					fires once on mount.
				</p>
				<ComponentPreview title="Single amount in BRL">
					<SinglePreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Currencies</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same 123456 cents in three currencies; the separators follow each
					locale.
				</p>
				<ComponentPreview title="brl, usd, eur">
					<div className="w-full max-w-sm space-y-3">
						<CurrencyInput
							ariaLabel="Valor da diária"
							value={123456}
							variant="brl"
						/>
						<CurrencyInput
							ariaLabel="Valor da diária"
							value={123456}
							variant="usd"
						/>
						<CurrencyInput
							ariaLabel="Valor da diária"
							value={123456}
							variant="eur"
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">any</code>{' '}
					replaces the fixed symbol block with a dropdown.
				</p>
				<ComponentPreview title="variant=any — the inline currency selector">
					<AnyCurrencyPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Sections and loading
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						leftSection
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rightSection
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					come from InputProps. Range mode refuses the sections by type;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					works in both.
				</p>
				<ComponentPreview title="leftSection, rightSection and loading, single mode">
					<SectionsPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Range mode</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						mode="range"
					</code>{' '}
					makes the field read-only, with a button beside it that opens the
					bounds.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The symbol is a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'<button>'}
					</code>{' '}
					named by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						currencyInput.open
					</code>{' '}
					that opens the bounds; the × is a sibling clear button.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					It reads back as prose: <em>R$ 10,00 ~ R$ 1.000,00</em>,{' '}
					<em>From R$ 10,00</em> or <em>Up to R$ 50,00</em>.
				</p>
				<ComponentPreview title="Range in BRL">
					<RangePreview />
				</ComponentPreview>
				<ComponentPreview title="Range in USD with named bounds">
					<RangeLabelledPreview />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						variant=&quot;any&quot;
					</code>{' '}
					is a compile error in range mode; the currency picker is single-mode
					only.
				</p>
				<ComponentPreview title="Range with an uncontrolled starting range">
					<div className="w-full max-w-sm">
						<CurrencyInput
							ariaLabel="Faixa de preço"
							defaultValue={{
								from: 5000,
								to: 250000,
							}}
							mode="range"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg — with the currency selector">
					<div className="w-full max-w-sm space-y-3">
						<CurrencyInput
							ariaLabel="Valor da diária"
							size="sm"
							variant="any"
						/>
						<CurrencyInput
							ariaLabel="Valor da diária"
							size="md"
							variant="any"
						/>
						<CurrencyInput
							ariaLabel="Valor da diária"
							size="lg"
							variant="any"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="sm, md, lg — range">
					<div className="w-full max-w-sm space-y-3">
						<CurrencyInput
							ariaLabel="Faixa de preço"
							mode="range"
							size="sm"
						/>
						<CurrencyInput
							ariaLabel="Faixa de preço"
							mode="range"
							size="md"
						/>
						<CurrencyInput
							ariaLabel="Faixa de preço"
							mode="range"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<ComponentPreview title="Uncontrolled and disabled, single mode">
					<div className="w-full max-w-sm space-y-3">
						<CurrencyInput
							ariaLabel="Valor da diária"
							defaultValue={5000}
						/>
						<CurrencyInput
							ariaLabel="Valor da diária"
							disabled
							value={9900}
						/>
						<CurrencyInput
							ariaLabel="Valor da diária"
							disabled
							variant="any"
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					In range mode disabled also refuses to open the popover, and loading
					puts a spinner where the clear button sits.
				</p>
				<ComponentPreview title="Disabled and loading, range mode">
					<div className="w-full max-w-sm space-y-3">
						<CurrencyInput
							ariaLabel="Faixa de preço"
							defaultValue={{
								from: 1000,
							}}
							disabled
							mode="range"
						/>
						<CurrencyInput
							ariaLabel="Faixa de preço"
							defaultValue={{
								from: 1000,
							}}
							loading
							mode="range"
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
	'/libs/react-web/components/currency-input',
)({
	component: Page,
})
