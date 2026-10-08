import { createFileRoute, Link } from '@tanstack/react-router'
import { PhoneInput, type PhoneValue } from '@turystack/react-web'
import { Check } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/phone-input/phone-input.types.ts`, which is
 * `Omit<InputProps, 'onChange' | 'value' | 'defaultValue' | 'leftSection' |
 * 'leftSectionWidth'>` plus the phone-shaped value and `defaultCountry`. The
 * country picker occupies the left side, so neither left-section prop appears
 * here. Rows marked "Inherited from Input" are Input's closed list of form
 * attributes, forwarded to the number field.
 */
const phoneInputProps = [
	{
		description: 'Controlled value: number, iso and ddi.',
		name: 'value',
		type: '{ iso: string; ddi?: string; number: string } | null',
	},
	{
		description: 'Initial value when uncontrolled; seeds the country too.',
		name: 'defaultValue',
		type: '{ iso: string; ddi?: string; number: string } | null',
	},
	{
		description: 'Fires with iso, ddi and number, or null when emptied.',
		name: 'onChange',
		type: '(value: PhoneValue | null) => void',
	},
	{
		description: 'ISO country the picker starts on, e.g. "BR".',
		name: 'defaultCountry',
		type: 'RPNInput.Country',
	},
	{
		default: '"md"',
		description: 'Height of the field and country trigger: 36, 40, 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'Number field style; ghost drops its border and background.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		description: 'Content pinned inside the right edge of the number field.',
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
		description: 'Blocks the number field and the country picker.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Placeholder of the number field.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Inherited. Spinner on the number field; typing disabled.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Inherited. Delays onChange 300ms, as on Input.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id of the number field.',
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
		description: 'Inherited from Input. Accessible name of the number field.',
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
		default: '"input-field"',
		description: 'Inherited from Input. Testing handle on the native input.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Autofill hint, e.g. "tel-national".',
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
		description: 'Inherited from Input. "tel" opens the phone keypad.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Inherited from Input. Max characters accepted.',
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

const usageCode = `import { PhoneInput } from '@turystack/react-web'
import type { PhoneValue } from '@turystack/react-web'

const [phone, setPhone] = useState<PhoneValue | null>(null)

// A Brazilian number by default; the reader can still change country
<PhoneInput defaultCountry="BR" onChange={setPhone} value={phone} />

// onChange hands back the parts, not one string
// { ddi: '55', iso: 'BR', number: '11987654321' }

// A number you already hold, in national form plus its country
<PhoneInput value={{ ddi: '55', iso: 'BR', number: '11987654321' }} />

// Or already international — passed through untouched
<PhoneInput value={{ iso: 'BR', number: '+5511987654321' }} />

// No default country: the picker starts flagless
<PhoneInput onChange={setPhone} value={phone} />

// Sizes and variants
<PhoneInput defaultCountry="BR" size="sm" />
<PhoneInput defaultCountry="BR" size="lg" />
<PhoneInput defaultCountry="BR" variant="ghost" />

// A right section, and the disabled state
<PhoneInput defaultCountry="BR" rightSection={<Check className="size-4" />} />
<PhoneInput defaultCountry="BR" disabled />`

function ReadOut({ value }: { value: PhoneValue | null }) {
	return (
		<p className="text-muted-foreground text-xs">
			onChange:{' '}
			<code>
				{value === null
					? 'null'
					: `{ ddi: "${value.ddi ?? ''}", iso: "${value.iso}", number: "${value.number}" }`}
			</code>
		</p>
	)
}

function BasicPreview() {
	const [value, setValue] = useState<PhoneValue | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<PhoneInput
				defaultCountry="BR"
				onChange={setValue}
				placeholder="(11) 90000-0000"
				value={value}
			/>
			<ReadOut value={value} />
		</div>
	)
}

function NoCountryPreview() {
	const [value, setValue] = useState<PhoneValue | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<PhoneInput
				onChange={setValue}
				placeholder="+55 11 90000 0000"
				value={value}
			/>
			<ReadOut value={value} />
		</div>
	)
}

function DefaultValuePreview() {
	return (
		<div className="w-full max-w-sm space-y-2">
			<PhoneInput
				defaultCountry="BR"
				defaultValue={{
					ddi: '55',
					iso: 'BR',
					number: '11987654321',
				}}
			/>
			<p className="text-muted-foreground text-xs">
				A full defaultValue seeded the field above — the number and the country
				both took, and it can still be typed into from there.
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
					PhoneInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A phone field with every country in front of it.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={phoneInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows marked “Inherited from Input” are Input’s form attributes; see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					. They land on the number field.
				</p>
			</section>

			<SlotsSection slug="phone-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Country picker</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Click the flag to open the list.
				</p>
				<ComponentPreview title="defaultCountry=BR">
					<BasicPreview />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultCountry
					</code>{' '}
					the flag slot is empty; type{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">+55</code>{' '}
					and the picker catches up.
				</p>
				<ComponentPreview title="No default country">
					<NoCountryPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A controlled value renders as international{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						+55 11 98765 4321
					</code>
					, not the national{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						(11) 98765-4321
					</code>{' '}
					form.
				</p>
				<ComponentPreview title="A controlled value">
					<div className="w-full max-w-sm space-y-3">
						<PhoneInput
							defaultCountry="BR"
							value={{
								ddi: '55',
								iso: 'BR',
								number: '11987654321',
							}}
						/>
						<PhoneInput
							value={{
								iso: 'DE',
								number: '+4915112345678',
							}}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultValue
					</code>{' '}
					seeds the field.
				</p>
				<ComponentPreview title="defaultValue seeds the field">
					<DefaultValuePreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-sm space-y-3">
						<PhoneInput
							defaultCountry="BR"
							placeholder="sm"
							size="sm"
						/>
						<PhoneInput
							defaultCountry="BR"
							placeholder="md"
							size="md"
						/>
						<PhoneInput
							defaultCountry="BR"
							placeholder="lg"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The variant styles the number field only; the country Button keeps its
					outline, so{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ghost
					</code>{' '}
					looks half-bordered.
				</p>
				<ComponentPreview title="default and ghost">
					<div className="w-full max-w-sm space-y-3">
						<PhoneInput
							defaultCountry="BR"
							placeholder="default"
							variant="default"
						/>
						<PhoneInput
							defaultCountry="BR"
							placeholder="ghost"
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					loading goes straight to the inner field, so it behaves exactly as it
					does on Input.
				</p>
				<ComponentPreview title="loading, rightSection, disabled">
					<div className="w-full max-w-sm space-y-3">
						<PhoneInput
							defaultCountry="BR"
							loading
							placeholder="loading — typing is blocked"
						/>
						<PhoneInput
							defaultCountry="BR"
							placeholder="rightSection"
							rightSection={<Check className="size-4" />}
						/>
						<PhoneInput
							defaultCountry="BR"
							disabled
							placeholder="disabled"
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

export const Route = createFileRoute('/libs/react-web/components/phone-input')({
	component: Page,
})
