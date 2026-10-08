import { createFileRoute } from '@tanstack/react-router'
import { Slider } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/slider/slider.types.ts`.
 * `SliderProps` is `BaseSliderProps & (SliderSingleProps | SliderRangeProps)`,
 * so `mode` and `orientation` are both required and `value` changes shape with
 * the mode. The only default is `size: 'md'` from `defaultVariants` in the
 * `tv()` call in `slider.tsx`.
 */
const sliderProps = [
	{
		description: 'One thumb (a number) or two thumbs (a [min, max] tuple).',
		name: 'mode',
		required: true,
		type: '"single" | "range"',
	},
	{
		description: 'Which way the track runs; vertical needs a sized parent.',
		name: 'orientation',
		required: true,
		type: '"horizontal" | "vertical"',
	},
	{
		default: '"md"',
		description: 'Thickness of the track and diameter of the thumb.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Prevents dragging and keyboard changes, and dims the track.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Names the thumb (single) or the group (range).',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		default: '0',
		description: 'Lower bound of the scale.',
		name: 'min',
		type: 'number',
	},
	{
		default: '100',
		description: 'Upper bound of the scale.',
		name: 'max',
		type: 'number',
	},
	{
		default: '1',
		description: 'Increment per arrow-key press, and the grid a drag snaps to.',
		name: 'step',
		type: 'number',
	},
	{
		description: 'Formats a value as its spoken text (aria-valuetext).',
		name: 'formatValue',
		type: '(value: number) => string',
	},
	{
		default: 'false',
		description: 'Prints the formatted value above the track.',
		name: 'showValue',
		type: 'boolean',
	},
	{
		description: 'Controlled position. A number in single mode.',
		name: 'value',
		type: 'number (single) | [number, number] (range)',
	},
	{
		description: 'Initial position when uncontrolled.',
		name: 'defaultValue',
		type: 'number (single) | [number, number] (range)',
	},
	{
		description: 'Fires on drag and arrow keys with the new value.',
		name: 'onValueChange',
		type: '(value: number) => void (single) | (value: [number, number]) => void (range)',
	},
]

const usageCode = `import { Slider } from '@turystack/react-web'
import { useState } from 'react'

// A price filter — the scale, the unit, and a name
const brl = (value: number) => \`R$ \${value.toLocaleString('pt-BR')}\`

function PriceRange() {
  const [price, setPrice] = useState<[number, number]>([300, 1200])

  return (
    <Slider
      ariaLabel="Faixa de preço por noite"
      formatValue={brl}
      max={2000}
      min={0}
      mode="range"
      onValueChange={setPrice}
      orientation="horizontal"
      showValue
      step={50}
      value={price}
    />
  )
}

function Volume() {
  const [level, setLevel] = useState(40)

  return (
    <Slider
      mode="single"
      onValueChange={setLevel}
      orientation="horizontal"
      value={level}
    />
  )
}

function PriceFilter() {
  const [range, setRange] = useState<[number, number]>([20, 80])

  return (
    <Slider
      mode="range"
      onValueChange={setRange}
      orientation="horizontal"
      value={range}
    />
  )
}

// Uncontrolled
<Slider defaultValue={30} mode="single" orientation="horizontal" />
<Slider defaultValue={[10, 60]} mode="range" orientation="horizontal" />

// Sizes
<Slider defaultValue={50} mode="single" orientation="horizontal" size="sm" />
<Slider defaultValue={50} mode="single" orientation="horizontal" size="md" />
<Slider defaultValue={50} mode="single" orientation="horizontal" size="lg" />

// Vertical — the parent has to give it a height
<div className="h-56">
  <Slider defaultValue={40} mode="single" orientation="vertical" />
</div>

// Disabled
<Slider defaultValue={30} disabled mode="single" orientation="horizontal" />`

/** What a reader and a screen reader both see: the price with its unit. */
const brl = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`

function Page() {
	const [level, setLevel] = useState(40)
	const [price, setPrice] = useState<
		[
			number,
			number,
		]
	>([
		300,
		1200,
	])
	const [budget, setBudget] = useState(800)
	const [range, setRange] = useState<
		[
			number,
			number,
		]
	>([
		20,
		80,
	])
	const [vertical, setVertical] = useState(60)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Slider
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A draggable track for picking a number, or a pair of numbers.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={sliderProps} />
			</section>

			<SlotsSection slug="slider" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Modes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The mode decides the shape of the value and nothing else about the
					call.
				</p>
				<ComponentPreview title="single — one thumb, one number">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Slider
							mode="single"
							onValueChange={setLevel}
							orientation="horizontal"
							value={level}
						/>
						<span className="text-center text-muted-foreground text-sm">
							value: {level}
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="range — two thumbs, a tuple">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Slider
							mode="range"
							onValueChange={setRange}
							orientation="horizontal"
							value={range}
						/>
						<span className="text-center text-muted-foreground text-sm">
							value: [{range[0]}, {range[1]}]
						</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Scale, unit and name
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">min</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">max</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						step
					</code>{' '}
					set the scale;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						formatValue
					</code>{' '}
					sets the spoken and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						showValue
					</code>{' '}
					the printed value.
				</p>
				<ComponentPreview title="Price range per night — R$ 0 to R$ 2.000, step 50">
					<div className="flex w-full max-w-sm flex-col gap-2">
						<span className="font-medium text-sm">Preço por noite</span>
						<Slider
							ariaLabel="Faixa de preço por noite"
							formatValue={brl}
							max={2000}
							min={0}
							mode="range"
							onValueChange={setPrice}
							orientation="horizontal"
							showValue
							step={50}
							value={price}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Single — a maximum budget">
					<div className="flex w-full max-w-sm flex-col gap-2">
						<span className="font-medium text-sm">Orçamento máximo</span>
						<Slider
							ariaLabel="Orçamento máximo"
							formatValue={brl}
							max={2000}
							min={100}
							mode="single"
							onValueChange={setBudget}
							orientation="horizontal"
							showValue
							step={100}
							value={budget}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md and lg — single">
					<div className="flex w-full max-w-sm flex-col gap-8">
						<Slider
							defaultValue={30}
							mode="single"
							orientation="horizontal"
							size="sm"
						/>
						<Slider
							defaultValue={50}
							mode="single"
							orientation="horizontal"
							size="md"
						/>
						<Slider
							defaultValue={70}
							mode="single"
							orientation="horizontal"
							size="lg"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="sm, md and lg — range">
					<div className="flex w-full max-w-sm flex-col gap-8">
						<Slider
							defaultValue={[
								10,
								40,
							]}
							mode="range"
							orientation="horizontal"
							size="sm"
						/>
						<Slider
							defaultValue={[
								20,
								60,
							]}
							mode="range"
							orientation="horizontal"
							size="md"
						/>
						<Slider
							defaultValue={[
								30,
								80,
							]}
							mode="range"
							orientation="horizontal"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Orientation</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A vertical slider fills its parent's height, so wrap it in something
					sized.
				</p>
				<ComponentPreview title="vertical — single and range">
					<div className="flex h-56 items-stretch gap-16">
						<Slider
							mode="single"
							onValueChange={setVertical}
							orientation="vertical"
							value={vertical}
						/>
						<Slider
							defaultValue={[
								25,
								75,
							]}
							mode="range"
							orientation="vertical"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Uncontrolled</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Drop{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						value
					</code>{' '}
					and the slider keeps its own position from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultValue
					</code>
					. These two still move even though nothing on this page is listening.
				</p>
				<ComponentPreview title="defaultValue only">
					<div className="flex w-full max-w-sm flex-col gap-8">
						<Slider
							defaultValue={30}
							mode="single"
							orientation="horizontal"
						/>
						<Slider
							defaultValue={[
								10,
								60,
							]}
							mode="range"
							orientation="horizontal"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Disabled</h2>
				<ComponentPreview title="disabled — single and range">
					<div className="flex w-full max-w-sm flex-col gap-8">
						<Slider
							defaultValue={30}
							disabled
							mode="single"
							orientation="horizontal"
						/>
						<Slider
							defaultValue={[
								20,
								70,
							]}
							disabled
							mode="range"
							orientation="horizontal"
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

export const Route = createFileRoute('/libs/react-web/components/slider')({
	component: Page,
})
