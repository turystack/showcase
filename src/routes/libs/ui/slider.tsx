import { createFileRoute } from '@tanstack/react-router'
import { Provider, Slider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const baseProps = [
	{
		description: 'The orientation of the slider track.',
		name: 'orientation',
		required: true,
		type: '"horizontal" | "vertical"',
	},
	{
		default: '"md"',
		description: 'Controls the track thickness and thumb size.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const singleProps = [
	{
		description: 'Mode discriminant.',
		name: 'mode',
		required: true,
		type: '"single"',
	},
	{
		description: 'The controlled value (0–100).',
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
		name: 'onValueChange',
		type: '(value: number) => void',
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
		description: 'Controlled tuple of [min, max] values.',
		name: 'value',
		type: '[number, number]',
	},
	{
		description: 'Default value when uncontrolled.',
		name: 'defaultValue',
		type: '[number, number]',
	},
	{
		description: 'Handler called when either thumb moves.',
		name: 'onValueChange',
		type: '(value: [number, number]) => void',
	},
]

const usageCode = `import { Slider } from '@turystack/ui'

// Horizontal single
<Slider orientation="horizontal" mode="single" defaultValue={40} />

// Horizontal range
<Slider
  orientation="horizontal"
  mode="range"
  defaultValue={[20, 80]}
  onValueChange={([min, max]) => console.log(min, max)}
/>

// Vertical single
<div className="h-40">
  <Slider orientation="vertical" mode="single" defaultValue={60} />
</div>

// Sizes
<Slider orientation="horizontal" mode="single" size="sm" defaultValue={40} />
<Slider orientation="horizontal" mode="single" size="md" defaultValue={40} />
<Slider orientation="horizontal" mode="single" size="lg" defaultValue={40} />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Slider
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						An interactive thumb control for selecting a single value or a range
						along a track. Supports horizontal and vertical orientations, and
						three sizes.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Base props</h2>
					<PropsTable props={baseProps} />
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
					<h2 className="font-display font-semibold text-xl">
						Horizontal single
					</h2>
					<ComponentPreview title="Horizontal single slider">
						<div className="w-full max-w-sm">
							<Slider
								defaultValue={40}
								mode="single"
								orientation="horizontal"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Horizontal range
					</h2>
					<ComponentPreview title="Horizontal range slider (two thumbs)">
						<div className="w-full max-w-sm">
							<Slider
								defaultValue={[
									20,
									80,
								]}
								mode="range"
								orientation="horizontal"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Vertical</h2>
					<ComponentPreview title="Vertical single slider">
						<div className="flex h-40 items-center justify-center">
							<Slider
								defaultValue={60}
								mode="single"
								orientation="vertical"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Slider in sm, md and lg">
						<div className="w-full max-w-sm space-y-6">
							<Slider
								defaultValue={40}
								mode="single"
								orientation="horizontal"
								size="sm"
							/>
							<Slider
								defaultValue={40}
								mode="single"
								orientation="horizontal"
								size="md"
							/>
							<Slider
								defaultValue={40}
								mode="single"
								orientation="horizontal"
								size="lg"
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

export const Route = createFileRoute('/libs/ui/slider')({
	component: Page,
})
