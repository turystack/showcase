import { createFileRoute } from '@tanstack/react-router'
import { NumberInput, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const singleProps = [
	{
		description: 'Mode discriminant.',
		name: 'mode',
		required: true,
		type: '"single"',
	},
	{
		description: 'The controlled numeric value.',
		name: 'value',
		type: 'number',
	},
	{
		description: 'The default value when uncontrolled.',
		name: 'defaultValue',
		type: 'number',
	},
	{
		description: 'Handler called when the value changes.',
		name: 'onChange',
		type: '(value: number) => void',
	},
	{
		default: '1',
		description: 'Amount to increment or decrement on each step.',
		name: 'step',
		type: 'number',
	},
	{
		description: 'Placeholder text.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Disables the input.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Makes the input full-width.',
		name: 'block',
		type: 'boolean',
	},
]

const rangeProps = [
	{
		description: 'Mode discriminant.',
		name: 'mode',
		required: true,
		type: '"range"',
	},
	{
		description: 'Controlled value with from and to fields.',
		name: 'value',
		type: '{ from?: number; to?: number }',
	},
	{
		description: 'Default value when uncontrolled.',
		name: 'defaultValue',
		type: '{ from?: number; to?: number }',
	},
	{
		description: 'Handler called when from or to changes.',
		name: 'onChange',
		type: '(value: { from?: number; to?: number }) => void',
	},
]

const usageCode = `import { NumberInput } from '@turystack/ui'

// Single value
<NumberInput mode="single" placeholder="0" />

// With step
<NumberInput mode="single" step={5} defaultValue={10} />

// Controlled single
const [qty, setQty] = useState(1)

<NumberInput
  mode="single"
  value={qty}
  onChange={setQty}
/>

// Range (from/to)
<NumberInput
  mode="range"
  defaultValue={{ from: 10, to: 100 }}
  onChange={(v) => console.log(v.from, v.to)}
/>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						NumberInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A numeric input with increment and decrement controls. Supports
						single value and from/to range modes.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Single mode props
					</h2>
					<PropsTable props={singleProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Range mode props
					</h2>
					<PropsTable props={rangeProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Single</h2>
					<ComponentPreview title="Single number input">
						<NumberInput
							mode="single"
							placeholder="0"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Single with step
					</h2>
					<ComponentPreview title="Step of 5">
						<NumberInput
							defaultValue={0}
							mode="single"
							step={5}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Range</h2>
					<ComponentPreview title="Range (from → to)">
						<NumberInput
							defaultValue={{ from: 10, to: 100 }}
							mode="range"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<NumberInput
							defaultValue={42}
							disabled
							mode="single"
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

export const Route = createFileRoute('/libs/ui/number-input')({
	component: Page,
})
