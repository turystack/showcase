import { createFileRoute } from '@tanstack/react-router'
import { DocumentInput, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const documentInputProps = [
	{
		description:
			'The document type to accept. "any" shows an inline selector and auto-detects mask based on input length.',
		name: 'variant',
		required: true,
		type: '"cpf" | "cnpj" | "any"',
	},
	{
		description: 'Controlled value with type and number fields.',
		name: 'value',
		type: '{ type: "cpf" | "cnpj" | "any"; number: string } | null',
	},
	{
		description: 'Default value when uncontrolled.',
		name: 'defaultValue',
		type: '{ type: "cpf" | "cnpj" | "any"; number: string } | null',
	},
	{
		description:
			'Handler called when the value changes. Receives null when the field is cleared.',
		name: 'onChange',
		type: '(value: { type: string; number: string } | null) => void',
	},
	{
		description: 'Placeholder text displayed when the input is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Disables the input, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
]

const usageCode = `import { DocumentInput } from '@turystack/ui'
import { useState } from 'react'

// CPF only
<DocumentInput variant="cpf" />

// CNPJ only
<DocumentInput variant="cnpj" />

// Auto-detect (CPF or CNPJ based on length)
<DocumentInput variant="any" />

// Controlled
const [doc, setDoc] = useState(null)

<DocumentInput
  variant="any"
  value={doc}
  onChange={(value) => {
    // value = { type: 'cpf', number: '123.456.789-09' } | null
    setDoc(value)
  }}
/>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						DocumentInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A masked input for Brazilian documents (CPF, CNPJ, or both). Applies
						the correct mask automatically and returns the document type along
						with the number.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={documentInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">CPF</h2>
					<ComponentPreview title="CPF input (000.000.000-00)">
						<div className="w-80">
							<DocumentInput
								placeholder="000.000.000-00"
								variant="cpf"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">CNPJ</h2>
					<ComponentPreview title="CNPJ input (00.000.000/0000-00)">
						<div className="w-80">
							<DocumentInput
								placeholder="00.000.000/0000-00"
								variant="cnpj"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Any (CPF or CNPJ selector)
					</h2>
					<ComponentPreview title="Inline selector, auto-detects mask based on input length">
						<div className="w-80">
							<DocumentInput
								placeholder="CPF or CNPJ"
								variant="any"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<DocumentInput
								disabled
								variant="any"
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

export const Route = createFileRoute('/libs/react-web/document-input')({
	component: Page,
})
