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
		default: '"md"',
		description: 'The size of the input.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
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
		description:
			'Additional CSS class name applied to the root wrapper element.',
		name: 'rootClassName',
		type: 'string',
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

// Sizes
<NumberInput mode="single" size="sm" placeholder="Small" />
<NumberInput mode="single" size="md" placeholder="Medium" />
<NumberInput mode="single" size="lg" placeholder="Large" />

// Loading
<NumberInput mode="single" loading placeholder="Loading..." />

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
						<div className="w-80">
							<NumberInput
								mode="single"
								placeholder="0"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Single with step
					</h2>
					<ComponentPreview title="Step of 5">
						<div className="w-80">
							<NumberInput
								defaultValue={0}
								mode="single"
								step={5}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Number input sizes">
						<div className="flex w-80 flex-col gap-3">
							<NumberInput
								mode="single"
								placeholder="Small"
								size="sm"
							/>
							<NumberInput
								mode="single"
								placeholder="Medium"
								size="md"
							/>
							<NumberInput
								mode="single"
								placeholder="Large"
								size="lg"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<div className="w-80">
							<NumberInput
								loading
								mode="single"
								placeholder="Loading..."
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Range</h2>
					<ComponentPreview title="Range (from / to)">
						<div className="w-80">
							<NumberInput
								defaultValue={{
									from: 10,
									to: 100,
								}}
								mode="range"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<NumberInput
								defaultValue={42}
								disabled
								mode="single"
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

export const Route = createFileRoute('/libs/react-web/number-input')({
	component: Page,
})
