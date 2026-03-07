import { createFileRoute } from '@tanstack/react-router'
import { MaskInput, TuryStackProvider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const maskInputProps = [
	{
		description: 'The mask pattern. Use "0" for digits and "a" for letters.',
		name: 'mask',
		required: true,
		type: 'string | string[]',
	},
	{
		description: 'The controlled value of the input.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'The default value when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
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
			'Handler called when the input value changes. Receives null when empty.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
]

const usageCode = `import { MaskInput } from '@turystack/ui'

// CPF mask
<MaskInput mask="000.000.000-00" placeholder="000.000.000-00" />

// Phone mask
<MaskInput mask="(00) 00000-0000" placeholder="(00) 00000-0000" />

// Multiple masks (auto-detect)
<MaskInput mask={["(00) 0000-0000", "(00) 00000-0000"]} placeholder="Phone" />`

function Page() {
	return (
		<TuryStackProvider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						MaskInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A masked input field that enforces a specific format using pattern
						masks. Built on top of react-imask.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={maskInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">CPF Mask</h2>
					<ComponentPreview title="Brazilian CPF format">
						<MaskInput
							mask="000.000.000-00"
							placeholder="000.000.000-00"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Phone Mask</h2>
					<ComponentPreview title="Brazilian phone format">
						<MaskInput
							mask="(00) 00000-0000"
							placeholder="(00) 00000-0000"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Multiple Masks</h2>
					<ComponentPreview title="Auto-detect between landline and mobile">
						<MaskInput
							mask={[
								'(00) 0000-0000',
								'(00) 00000-0000',
							]}
							placeholder="Phone"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<MaskInput
							disabled
							mask="000.000.000-00"
							placeholder="Disabled"
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
		</TuryStackProvider>
	)
}

export const Route = createFileRoute('/libs/ui/mask-input')({
	component: Page,
})
