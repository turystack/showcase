import { createFileRoute } from '@tanstack/react-router'
import { PhoneInput, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const phoneInputProps = [
	{
		description:
			'The controlled phone value object containing iso, number, and ddi.',
		name: 'value',
		type: '{ iso: string; number: string; ddi?: string } | null',
	},
	{
		description: 'The default phone value when uncontrolled.',
		name: 'defaultValue',
		type: '{ iso: string; number: string; ddi?: string } | null',
	},
	{
		description: 'Placeholder text for the number input.',
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
		description: 'Content rendered on the right side of the input.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Disables the input and country selector.',
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
			'Handler called when the phone value changes. Receives null when empty.',
		name: 'onChange',
		type: '(value: PhoneValue | null) => void',
	},
]

const usageCode = `import { PhoneInput } from '@turystack/ui'

// Basic
<PhoneInput placeholder="Phone number" />

// Sizes
<PhoneInput size="sm" placeholder="Small" />
<PhoneInput size="md" placeholder="Medium" />
<PhoneInput size="lg" placeholder="Large" />

// Loading
<PhoneInput loading placeholder="Loading..." />

// With onChange handler
<PhoneInput
  placeholder="Phone number"
  onChange={(value) => console.log(value)}
  // value: { iso: "BR", number: "11999999999", ddi: "+55" }
/>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						PhoneInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						An international phone input with a searchable country selector
						dropdown. Automatically applies the correct mask for the selected
						country.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={phoneInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Default country is Brazil">
						<div className="w-80">
							<PhoneInput placeholder="Phone number" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Phone input sizes">
						<div className="flex w-80 flex-col gap-3">
							<PhoneInput
								placeholder="Small"
								size="sm"
							/>
							<PhoneInput
								placeholder="Medium"
								size="md"
							/>
							<PhoneInput
								placeholder="Large"
								size="lg"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<PhoneInput
								disabled
								placeholder="Phone number"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<div className="w-80">
							<PhoneInput
								loading
								placeholder="Loading..."
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

export const Route = createFileRoute('/libs/react-web/phone-input')({
	component: Page,
})
