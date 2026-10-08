import { createFileRoute } from '@tanstack/react-router'
import { Form, NumberInput } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/number-input/
 * number-input.types.ts` and the destructuring defaults in
 * `number-input.tsx`. `NumberInputProps` is a closed object — it picks
 * Input's form attributes (id, name, form, ariaLabel, aria-invalid,
 * aria-describedby, required, readOnly) and spreads nothing else, so what is
 * in this table is the whole surface.
 */
const numberInputProps = [
	{
		description: 'Controlled number. null is an empty field.',
		name: 'value',
		type: 'number | null',
	},
	{
		description: 'Initial number when uncontrolled. null is empty.',
		name: 'defaultValue',
		type: 'number | null',
	},
	{
		description: 'Fires with the parsed number, or null when emptied.',
		name: 'onChange',
		type: '(value: number | null) => void',
	},
	{
		default: '1',
		description: 'Amount each stepper press adds or subtracts.',
		name: 'step',
		type: 'number',
	},
	{
		description: 'Lower bound; decrement stops here.',
		name: 'min',
		type: 'number',
	},
	{
		description: 'Upper bound; increment stops here.',
		name: 'max',
		type: 'number',
	},
	{
		default: '"md"',
		description: 'Height of the control: sm is 36px, md 40px, lg 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Blocks typing and both stepper buttons, and dims the group.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Placeholder shown while the field is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'true',
		description: 'Thousands separator on commit. Turn off for ids or years.',
		name: 'grouping',
		type: 'boolean',
	},
	{
		description: 'Id of the text field. Form.Field supplies it.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Field name submitted with a native form.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Id of a form to join when the field sits outside it.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'aria-label on the text field, when no label is visible.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Marks the field invalid and paints the destructive border.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Id(s) of the hint or error that describe the field.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Marks the field required for native form validation.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'The value can be read and copied but not edited.',
		name: 'readOnly',
		type: 'boolean',
	},
]

const usageCode = `import { NumberInput } from '@turystack/react-web'

// Controlled
const [quantity, setQuantity] = useState<number | null>(1)
<NumberInput onChange={setQuantity} value={quantity} />

// Uncontrolled
<NumberInput defaultValue={1} onChange={(n) => console.log(n)} />

// Step and bounds — the buttons stop at the edges
<NumberInput defaultValue={0} max={100} min={0} step={5} />

// Sizes
<NumberInput size="sm" />
<NumberInput size="md" />
<NumberInput size="lg" />

// A year is not a quantity — drop the thousands separator
<NumberInput defaultValue={2026} grouping={false} />

// Placeholder and disabled
<NumberInput placeholder="How many?" />
<NumberInput defaultValue={5} disabled />

// There is no range mode — compose two fields
<NumberInput ariaLabel="Mínimo" onChange={setFrom} value={from} />
<NumberInput ariaLabel="Máximo" min={from ?? undefined} onChange={setTo} value={to} />

// A labelled form field: Form.Field wires the id — name is only the submitted key
<Form.Field label="Hóspedes">
  <NumberInput max={8} min={1} name="guests" required />
</Form.Field>

// No visible label: name it
<NumberInput ariaLabel="Quantidade de diárias" defaultValue={1} />

// The root is always w-full — constrain it from outside
<div className="max-w-[9rem]">
  <NumberInput ariaLabel="Quantidade" defaultValue={1} />
</div>`

function Page() {
	const [quantity, setQuantity] = useState<number | null>(1)
	const [from, setFrom] = useState<number | null>(10)
	const [to, setTo] = useState<number | null>(50)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					NumberInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A numeric field flanked by a minus and a plus button.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={numberInputProps} />
			</section>

			<SlotsSection slug="number-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					gives you a number, not a string, and an emptied field arrives as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						null
					</code>
					.
				</p>
				<ComponentPreview title="Controlled">
					<div className="w-full max-w-[12rem] space-y-2">
						<NumberInput
							ariaLabel="Quantidade"
							onChange={setQuantity}
							value={quantity}
						/>
						<p className="text-muted-foreground text-xs">
							state: <code>{JSON.stringify(quantity)}</code>
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled">
					<div className="w-full max-w-[12rem]">
						<NumberInput
							ariaLabel="Quantidade"
							defaultValue={3}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Step and bounds</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">min</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">max</code>{' '}
					constrain the steppers: press minus at the floor and the value stays
					put rather than going negative.
				</p>
				<ComponentPreview title="step, min and max">
					<div className="flex w-full max-w-md flex-wrap gap-6">
						<div className="w-[12rem] space-y-2">
							<p className="text-muted-foreground text-xs">step 1 (default)</p>
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={0}
							/>
						</div>
						<div className="w-[12rem] space-y-2">
							<p className="text-muted-foreground text-xs">step 5</p>
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={10}
								step={5}
							/>
						</div>
						<div className="w-[12rem] space-y-2">
							<p className="text-muted-foreground text-xs">
								step 0.5, min 0, max 5
							</p>
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={2.5}
								max={5}
								min={0}
								step={0.5}
							/>
						</div>
						<div className="w-[12rem] space-y-2">
							<p className="text-muted-foreground text-xs">
								already at min 0 — minus does nothing
							</p>
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={0}
								min={0}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Grouping</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Formatting applies on commit. Type{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						1234
					</code>{' '}
					in both and press Tab: the first shows{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						1,234
					</code>
					, the second{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						1234
					</code>
					.
				</p>
				<ComponentPreview title="grouping on and off">
					<div className="flex w-full max-w-md flex-wrap gap-6">
						<div className="w-[12rem] space-y-2">
							<p className="text-muted-foreground text-xs">
								grouping (default)
							</p>
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={1234}
							/>
						</div>
						<div className="w-[12rem] space-y-2">
							<p className="text-muted-foreground text-xs">grouping=false</p>
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={2026}
								grouping={false}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-[12rem] space-y-3">
						<NumberInput
							ariaLabel="Quantidade"
							defaultValue={1}
							size="sm"
						/>
						<NumberInput
							ariaLabel="Quantidade"
							defaultValue={1}
							size="md"
						/>
						<NumberInput
							ariaLabel="Quantidade"
							defaultValue={1}
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Placeholder and disabled
				</h2>
				<ComponentPreview title="Empty with a placeholder, and disabled">
					<div className="w-full max-w-[14rem] space-y-3">
						<NumberInput
							ariaLabel="Quantidade"
							placeholder="How many?"
						/>
						<NumberInput
							ariaLabel="Quantidade"
							defaultValue={5}
							disabled
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Range</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					There is no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						mode=&quot;range&quot;
					</code>
					. A from/to pair is two fields, each bounding the other, each with a
					name of its own.
				</p>
				<ComponentPreview title="A from/to pair composed by hand">
					<div className="w-full max-w-md space-y-2">
						<div className="flex items-center gap-3">
							<div className="w-[10rem]">
								<NumberInput
									ariaLabel="Mínimo de hóspedes"
									max={to ?? undefined}
									onChange={setFrom}
									placeholder="From"
									value={from}
								/>
							</div>
							<span className="text-muted-foreground text-sm">to</span>
							<div className="w-[10rem]">
								<NumberInput
									ariaLabel="Máximo de hóspedes"
									min={from ?? undefined}
									onChange={setTo}
									placeholder="To"
									value={to}
								/>
							</div>
						</div>
						<p className="text-muted-foreground text-xs">
							range:{' '}
							<code>
								{JSON.stringify([
									from,
									to,
								])}
							</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Labels and form wiring
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Takes Input’s closed list of field attributes.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					lands on the text field; inside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					the field sets it for you.
				</p>
				<ComponentPreview title="Inside Form.Field — wired without an id">
					<div className="w-full max-w-[16rem] space-y-4">
						<Form.Field
							description="Até 8 por quarto."
							label="Hóspedes"
						>
							<NumberInput
								defaultValue={2}
								max={8}
								min={1}
								name="guests"
								required
							/>
						</Form.Field>
						<Form.Field
							error="O quarto aceita no máximo 8 hóspedes."
							label="Hóspedes no quarto 2"
						>
							<NumberInput
								defaultValue={9}
								name="guests_2"
							/>
						</Form.Field>
						<Form.Field label="Diárias (definidas pela reserva)">
							<NumberInput
								defaultValue={4}
								readOnly
							/>
						</Form.Field>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The wrapper becomes a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role=&quot;group&quot;
					</code>{' '}
					only when named, by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>{' '}
					or the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					label; otherwise it is a plain box.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					There is no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					: the root is always full width, so the wrapper sets the width.
				</p>
				<ComponentPreview title="Width set by the wrapper">
					<div className="w-full max-w-md space-y-3">
						<div className="max-w-[8rem]">
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={1}
							/>
						</div>
						<div className="max-w-[16rem]">
							<NumberInput
								ariaLabel="Quantidade"
								defaultValue={1}
							/>
						</div>
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

export const Route = createFileRoute('/libs/react-web/components/number-input')(
	{
		component: Page,
	},
)
