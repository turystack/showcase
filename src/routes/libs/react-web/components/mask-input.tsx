import { createFileRoute, Link } from '@tanstack/react-router'
import { MaskInput } from '@turystack/react-web'
import { CreditCard, Hash } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/mask-input/mask-input.types.ts`,
 * which is `Omit<InputProps, 'onChange' | 'debounce'>` plus `mask`.
 * `debounce` is omitted by the type and so is absent here on purpose. Rows
 * marked "Inherited from Input" are Input's closed list of form attributes.
 */
const maskInputProps = [
	{
		description: 'Mask pattern: 0 digit, a letter, * either. Arrays grow.',
		name: 'mask',
		required: true,
		type: 'string | string[]',
	},
	{
		description: 'Controlled masked value. null is empty.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'Initial value when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires with the masked text, or null when emptied.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
	{
		default: '"md"',
		description: 'Field height — 36px, 40px, 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'ghost drops border and background, for embedded fields.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		description: 'Content pinned inside the left edge; clickable.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Left section width in px, also the left padding.',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		description: 'Content pinned inside the right edge; loading replaces it.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Width of the right section in px.',
		name: 'rightSectionWidth',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Shows a spinner on the right and disables the field.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Placeholder shown while the field is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Prevents interaction.',
		name: 'disabled',
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
		default: '"mask-input-field"',
		description: 'Inherited from Input. Test id on the masked field.',
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
		description: 'Inherited from Input. Phone keyboard, e.g. "numeric".',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Inherited from Input. Max length; the mask caps it already.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Inherited from Input. Min characters for validation.',
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
		description: 'Inherited from Input. Selectable and copyable, not editable.',
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
		description: 'Inherited from Input. Fires when the field is clicked.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

const usageCode = `import { MaskInput } from '@turystack/react-web'

// One pattern — 0 is a digit, everything else is a literal
<MaskInput mask="000.000.000-00" onChange={setCpf} value={cpf} />

// Several patterns — the mask grows as the digits arrive
<MaskInput
  mask={['(00) 0000-0000', '(00) 00000-0000']}
  onChange={setPhone}
  value={phone}
/>

// Letters and digits together: a Brazilian plate, old and Mercosul
<MaskInput mask={['aaa-0000', 'aaa0a00']} onChange={setPlate} value={plate} />

// Sizes and variants
<MaskInput mask="00/00" size="sm" />
<MaskInput mask="00/00" size="lg" />
<MaskInput mask="00/00" variant="ghost" />

// Sections
<MaskInput
  leftSection={<CreditCard className="size-4" />}
  mask="0000 0000 0000 0000"
  rightSection={<span className="text-xs">VISA</span>}
/>

// States
<MaskInput loading mask="000.000.000-00" />
<MaskInput disabled mask="000.000.000-00" />
<MaskInput aria-invalid mask="000.000.000-00" />`

function ControlledPreview() {
	const [value, setValue] = useState<string | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<MaskInput
				mask="000.000.000-00"
				onChange={setValue}
				placeholder="000.000.000-00"
				value={value}
			/>
			<p className="text-muted-foreground text-xs">
				onChange: <code>{value === null ? 'null' : `"${value}"`}</code>
			</p>
		</div>
	)
}

function GrowingMaskPreview() {
	const [value, setValue] = useState<string | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<MaskInput
				mask={[
					'(00) 0000-0000',
					'(00) 00000-0000',
				]}
				onChange={setValue}
				placeholder="(00) 00000-0000"
				value={value}
			/>
			<p className="text-muted-foreground text-xs">
				Type eight digits, then a ninth: the mask switches pattern under the
				caret.
			</p>
		</div>
	)
}

function LettersPreview() {
	const [value, setValue] = useState<string | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<MaskInput
				mask={[
					'aaa-0000',
					'aaa0a00',
				]}
				onChange={setValue}
				placeholder="ABC-1234"
				value={value}
			/>
			<p className="text-muted-foreground text-xs">
				onChange: <code>{value === null ? 'null' : `"${value}"`}</code>
			</p>
		</div>
	)
}

function DefaultValuePreview() {
	return (
		<div className="w-full max-w-sm space-y-2">
			<MaskInput
				defaultValue="123.456.789-00"
				mask="000.000.000-00"
				placeholder="000.000.000-00"
			/>
			<p className="text-muted-foreground text-xs">
				The field above was seeded from defaultValue and can be typed into like
				any other uncontrolled field.
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
					MaskInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A text field that only accepts what the pattern allows.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={maskInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows marked “Inherited from Input” are Input’s form attributes; see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					.
				</p>
			</section>

			<SlotsSection slug="mask-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Mask</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					In a pattern{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">0</code>{' '}
					is a digit,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">a</code> a
					letter,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">*</code>{' '}
					either; other characters are inserted literals. Rejected keys do
					nothing.
				</p>
				<ComponentPreview title="A single pattern">
					<ControlledPreview />
				</ComponentPreview>
				<ComponentPreview title="An array of patterns">
					<GrowingMaskPreview />
				</ComponentPreview>
				<ComponentPreview title="Letters and digits in one pattern">
					<LettersPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					hands you the <em>masked</em> string — the dots and dashes included —
					not the raw digits. Strip them yourself if your API wants them gone.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultValue
					</code>{' '}
					seeds the field once, as on a plain{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						input
					</code>
					; passing{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						value
					</code>{' '}
					makes it controlled.
				</p>
				<ComponentPreview title="defaultValue seeds the field">
					<DefaultValuePreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-sm space-y-3">
						<MaskInput
							mask="00/00"
							placeholder="sm"
							size="sm"
						/>
						<MaskInput
							mask="00/00"
							placeholder="md"
							size="md"
						/>
						<MaskInput
							mask="00/00"
							placeholder="lg"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="default and ghost">
					<div className="w-full max-w-sm space-y-3">
						<MaskInput
							mask="00/00"
							placeholder="default"
							variant="default"
						/>
						<MaskInput
							mask="00/00"
							placeholder="ghost"
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<ComponentPreview title="Left and right">
					<div className="w-full max-w-sm space-y-3">
						<MaskInput
							leftSection={<CreditCard className="size-4" />}
							mask="0000 0000 0000 0000"
							placeholder="0000 0000 0000 0000"
						/>
						<MaskInput
							mask="000.000"
							placeholder="000.000"
							rightSection={<Hash className="size-4" />}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Custom section widths">
					<div className="w-full max-w-sm">
						<MaskInput
							leftSection={<span className="text-xs">BRL</span>}
							leftSectionWidth={52}
							mask="000.000"
							placeholder="000.000"
							rightSection={<span className="text-xs">,00</span>}
							rightSectionWidth={52}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					swaps the right section for a spinner, sets{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-busy
					</code>{' '}
					and disables the field.
				</p>
				<ComponentPreview title="loading, disabled, invalid">
					<div className="w-full max-w-sm space-y-3">
						<MaskInput
							loading
							mask="000.000.000-00"
							placeholder="typing blocked while loading"
							rightSection={<Hash className="size-4" />}
						/>
						<MaskInput
							disabled
							mask="000.000.000-00"
							placeholder="disabled"
						/>
						<MaskInput
							aria-invalid
							mask="000.000.000-00"
							placeholder="invalid"
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

export const Route = createFileRoute('/libs/react-web/components/mask-input')({
	component: Page,
})
