import { createFileRoute, Link } from '@tanstack/react-router'
import { DocumentInput, type DocumentValue } from '@turystack/react-web'
import { IdCard } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/document-input/document-input.types.ts`. It omits
 * `mask` and the visual `variant` from MaskInputProps, so neither belongs
 * here — `variant` on DocumentInput names the document type instead.
 */
const documentInputProps = [
	{
		description: 'Accepted document: cpf, cnpj, or any with a picker.',
		name: 'variant',
		required: true,
		type: '"cpf" | "cnpj" | "any"',
	},
	{
		description: 'Controlled { number, type }; number is formatted.',
		name: 'value',
		type: '{ type: "cpf" | "cnpj" | "any"; number: string } | null',
	},
	{
		description: 'Initial value when uncontrolled; seeds field and picker.',
		name: 'defaultValue',
		type: '{ type: "cpf" | "cnpj" | "any"; number: string } | null',
	},
	{
		description: 'Fires with number and type; null on empty or type switch.',
		name: 'onChange',
		type: '(value: DocumentValue | null) => void',
	},
	{
		default: '"md"',
		description: 'Height of field and picker: 36, 40, 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'the mask of the active type',
		description: 'Placeholder; defaults to the expected pattern.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Disables the field and, in any mode, the type dropdown too.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Content pinned inside the left edge of the field.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Width of the left section in px.',
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
		description: 'Shows a spinner, sets aria-busy and disables the field.',
		name: 'loading',
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
		description: 'Inherited from Input. "numeric" opens the digit keypad.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Inherited from Input. The mask already caps the length.',
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

const usageCode = `import { DocumentInput } from '@turystack/react-web'
import type { DocumentValue } from '@turystack/react-web'

const [doc, setDoc] = useState<DocumentValue | null>(null)

// A CPF and nothing else — mask 000.000.000-00
<DocumentInput onChange={setDoc} value={doc} variant="cpf" />

// A CNPJ and nothing else — mask 00.000.000/0000-00
<DocumentInput onChange={setDoc} value={doc} variant="cnpj" />

// Let the reader choose; the dropdown swaps the mask and clears the field
<DocumentInput onChange={setDoc} value={doc} variant="any" />

// onChange carries the type alongside the number
// { number: '123.456.789-00', type: 'cpf' }

// Sizes
<DocumentInput size="sm" variant="any" />
<DocumentInput size="lg" variant="any" />

// A placeholder of your own replaces the mask hint
<DocumentInput placeholder="Documento do titular" variant="cpf" />

// States
<DocumentInput disabled variant="any" />
<DocumentInput loading variant="cpf" />
<DocumentInput aria-invalid variant="cpf" />`

function ReadOut({ value }: { value: DocumentValue | null }) {
	return (
		<p className="text-muted-foreground text-xs">
			onChange:{' '}
			<code>
				{value === null
					? 'null'
					: `{ number: "${value.number}", type: "${value.type}" }`}
			</code>
		</p>
	)
}

function CpfPreview() {
	const [value, setValue] = useState<DocumentValue | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<DocumentInput
				onChange={setValue}
				value={value}
				variant="cpf"
			/>
			<ReadOut value={value} />
		</div>
	)
}

function CnpjPreview() {
	const [value, setValue] = useState<DocumentValue | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<DocumentInput
				onChange={setValue}
				value={value}
				variant="cnpj"
			/>
			<ReadOut value={value} />
		</div>
	)
}

function AnyPreview() {
	const [value, setValue] = useState<DocumentValue | null>(null)

	return (
		<div className="w-full max-w-sm space-y-2">
			<DocumentInput
				onChange={setValue}
				value={value}
				variant="any"
			/>
			<ReadOut value={value} />
		</div>
	)
}

function DefaultValuePreview() {
	return (
		<div className="w-full max-w-sm space-y-2">
			<DocumentInput
				defaultValue={{
					number: '12.345.678/0001-90',
					type: 'cnpj',
				}}
				variant="any"
			/>
			<p className="text-muted-foreground text-xs">
				The dropdown opened on CNPJ because the defaultValue said so, and the
				field beside it starts filled in with the number too.
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
					DocumentInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A MaskInput bound to the two Brazilian document numbers.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={documentInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows marked “Inherited from Input” are Input’s form attributes; see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					. They pass through MaskInput to the field.
				</p>
			</section>

			<SlotsSection slug="document-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Types</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Each variant carries its own mask and its own placeholder:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						000.000.000-00
					</code>{' '}
					for a CPF,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						00.000.000/0000-00
					</code>{' '}
					for a CNPJ.
				</p>
				<ComponentPreview title="variant=cpf">
					<CpfPreview />
				</ComponentPreview>
				<ComponentPreview title="variant=cnpj">
					<CnpjPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Auto-detect</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">any</code>{' '}
					puts a dropdown in front of the field and starts on CPF.
				</p>
				<ComponentPreview title="variant=any">
					<AnyPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					returns the number as shown, tagged with its document type.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultValue
					</code>{' '}
					seeds both the type and the number.
				</p>
				<ComponentPreview title="defaultValue seeds both the type and the number">
					<DefaultValuePreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-sm space-y-3">
						<DocumentInput
							size="sm"
							variant="any"
						/>
						<DocumentInput
							size="md"
							variant="any"
						/>
						<DocumentInput
							size="lg"
							variant="any"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Placeholder and sections
				</h2>
				<ComponentPreview title="A placeholder and a left section">
					<div className="w-full max-w-sm space-y-3">
						<DocumentInput
							placeholder="Documento do titular"
							variant="cpf"
						/>
						<DocumentInput
							leftSection={<IdCard className="size-4" />}
							variant="cpf"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					greys out both halves.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					adds a spinner and disables the field too.
				</p>
				<ComponentPreview title="disabled, loading, invalid">
					<div className="w-full max-w-sm space-y-3">
						<DocumentInput
							disabled
							variant="any"
						/>
						<DocumentInput
							loading
							variant="cpf"
						/>
						<DocumentInput
							aria-invalid
							variant="cpf"
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
	'/libs/react-web/components/document-input',
)({
	component: Page,
})
