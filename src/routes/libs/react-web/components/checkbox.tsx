import { createFileRoute } from '@tanstack/react-router'
import { Checkbox } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/checkbox/checkbox.types.ts`.
 * Defaults come from `defaultVariants` in the two `tv()` calls in
 * `checkbox.tsx` — `size: 'md'` for the box, `variant: 'vertical'` for the
 * group — plus `defaultValue = []` in the group's destructuring.
 */
const checkboxProps = [
	{
		description: 'Text beside the box. Clicking it toggles the checkbox.',
		name: 'label',
		type: 'string',
	},
	{
		description: 'Accessible name for a box with no visible label.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Helper text under the label.',
		name: 'description',
		type: 'string',
	},
	{
		description: 'Value submitted with a form.',
		name: 'value',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Box size: 12px, 16px or 20px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Prevents interaction and dims the whole row.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Wraps the row in a full-width bordered card.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Marks the box invalid, with a destructive border and ring.',
		name: 'error',
		type: 'boolean',
	},
	{
		description: 'Error text under the label; implies error.',
		name: 'errorMessage',
		type: 'React.ReactNode',
	},
	{
		description: 'Controlled checked state.',
		name: 'checked',
		type: 'boolean',
	},
	{
		description: 'Initial state when uncontrolled.',
		name: 'defaultChecked',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Mixed state: shows a dash; wins over checked.',
		name: 'indeterminate',
		type: 'boolean',
	},
	{
		description: 'Fires with the new state on every toggle.',
		name: 'onChange',
		type: '(checked: boolean) => void',
	},
]

/**
 * `Checkbox.Group` from the same file. It now forwards `size`, `bordered`,
 * each item's `description` and each item's `value` down to every
 * `CheckboxRoot` it renders, on top of the label and the per-item `disabled`
 * it always passed.
 */
const checkboxGroupProps = [
	{
		description: 'Accessible name of the group (a fieldset).',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Options: label, value, optional description and disabled.',
		name: 'items',
		required: true,
		type: 'CheckboxItem[]',
	},
	{
		description: 'Per item: blocks it like disabled; a tooltip says why.',
		name: 'items[].disabledReason',
		type: 'string',
	},
	{
		description: 'Controlled selection, as an array of item values.',
		name: 'value',
		type: 'string[]',
	},
	{
		default: '[]',
		description: 'Initial selection when uncontrolled.',
		name: 'defaultValue',
		type: 'string[]',
	},
	{
		default: '"md"',
		description: 'Size applied to every checkbox in the group.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Disables every checkbox in the group.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Applies the bordered card to every item.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: '"vertical"',
		description: 'Layout: a stacked column, or a wrapping row with wider gaps.',
		name: 'variant',
		type: '"vertical" | "horizontal"',
	},
	{
		default: 'false',
		description: 'Marks the group and every box invalid.',
		name: 'error',
		type: 'boolean',
	},
	{
		description: 'Error text under the group; implies error.',
		name: 'errorMessage',
		type: 'React.ReactNode',
	},
	{
		description: 'Fires with the whole selection after a toggle.',
		name: 'onChange',
		type: '(value: string[]) => void',
	},
]

const fruits = [
	{
		description: 'Crisp and light.',
		label: 'Apple',
		value: 'apple',
	},
	{
		description: 'Naturally wrapped.',
		label: 'Banana',
		value: 'banana',
	},
	{
		description: 'Small and tart.',
		label: 'Cherry',
		value: 'cherry',
	},
	{
		description: 'Notoriously pungent.',
		disabled: true,
		label: 'Durian (out of stock)',
		value: 'durian',
	},
]

const extras = [
	{
		label: 'Café da manhã',
		value: 'breakfast',
	},
	{
		label: 'Late checkout',
		value: 'late-checkout',
	},
	{
		disabledReason: 'Disponível no plano Pro',
		label: 'Traslado do aeroporto',
		value: 'transfer',
	},
]

const channels = [
	{
		label: 'E-mail',
		value: 'email',
	},
	{
		label: 'WhatsApp',
		value: 'whatsapp',
	},
	{
		label: 'SMS',
		value: 'sms',
	},
]

const usageCode = `import { Checkbox } from '@turystack/react-web'
import { useState } from 'react'

// Single, controlled
function Terms() {
  const [accepted, setAccepted] = useState(false)

  return (
    <Checkbox
      checked={accepted}
      label="I accept the terms"
      onChange={setAccepted}
    />
  )
}

// Single, uncontrolled
<Checkbox defaultChecked label="Remember me" />

// Sizes
<Checkbox label="Small" size="sm" />
<Checkbox label="Medium" size="md" />
<Checkbox label="Large" size="lg" />

// Description, border, disabled
<Checkbox description="Sent once a week." label="Newsletter" />
<Checkbox bordered description="Sent once a week." label="Newsletter" />
<Checkbox disabled label="Locked" />

// A group — onChange receives the whole selection
function Basket() {
  const [picked, setPicked] = useState<string[]>(['apple'])

  return (
    <Checkbox.Group
      items={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { disabled: true, label: 'Durian', value: 'durian' },
      ]}
      onChange={setPicked}
      value={picked}
    />
  )
}

// Horizontal layout
<Checkbox.Group items={items} variant="horizontal" />

// Uncontrolled group
<Checkbox.Group defaultValue={['apple']} items={items} />

// size and bordered reach every item; description is per item
<Checkbox.Group bordered items={items} size="lg" />

// Select-all: a box with no visible label, mixed while some are ticked
<Checkbox
  ariaLabel="Selecionar todos os hóspedes"
  checked={all}
  indeterminate={some && !all}
  onChange={(next) => setSelected(next ? guests.map((g) => g.id) : [])}
/>

// Validation — errorMessage implies error and is the box's description
<Checkbox label="I accept the terms" errorMessage={errors.terms} />

// An invalid group: name it, and the message renders once under it
<Checkbox.Group
  ariaLabel="Canais de aviso"
  errorMessage="Escolha pelo menos um canal."
  items={channels}
/>`

const GUESTS = [
	{
		id: 'ana',
		name: 'Ana Silva',
	},
	{
		id: 'bruno',
		name: 'Bruno Costa',
	},
	{
		id: 'carla',
		name: 'Carla Mendes',
	},
]

function SelectAllExample() {
	const [selected, setSelected] = useState<string[]>([
		'bruno',
	])
	const all = selected.length === GUESTS.length
	const some = selected.length > 0

	return (
		<div className="w-full max-w-xs rounded-lg border border-border">
			<div className="flex items-center gap-3 border-border border-b px-4 py-2.5">
				<Checkbox
					ariaLabel="Selecionar todos os hóspedes"
					checked={all}
					indeterminate={some && !all}
					onChange={(next) =>
						setSelected(next ? GUESTS.map((guest) => guest.id) : [])
					}
				/>
				<span className="font-medium text-sm">
					Hóspedes · {selected.length} de {GUESTS.length}
				</span>
			</div>
			{GUESTS.map((guest) => (
				<div
					className="flex items-center gap-3 px-4 py-2.5"
					key={guest.id}
				>
					<Checkbox
						ariaLabel={`Selecionar ${guest.name}`}
						checked={selected.includes(guest.id)}
						onChange={(next) =>
							setSelected((current) =>
								next
									? [
											...current,
											guest.id,
										]
									: current.filter((id) => id !== guest.id),
							)
						}
					/>
					<span className="text-sm">{guest.name}</span>
				</div>
			))}
		</div>
	)
}

function Page() {
	const [accepted, setAccepted] = useState(false)
	const [picked, setPicked] = useState<string[]>([
		'apple',
	])
	const [terms, setTerms] = useState(false)
	const [notify, setNotify] = useState<string[]>([])

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Checkbox
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A boolean field; as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-sm">
						Checkbox.Group
					</code>{' '}
					it is a multi-select.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={checkboxProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Checkbox.Group props
				</h2>
				<PropsTable props={checkboxGroupProps} />
			</section>

			<SlotsSection slug="checkbox" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md and lg">
					<div className="flex flex-col gap-4">
						<Checkbox
							defaultChecked
							label="Small"
							size="sm"
						/>
						<Checkbox
							defaultChecked
							label="Medium"
							size="md"
						/>
						<Checkbox
							defaultChecked
							label="Large"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">State</h2>
				<ComponentPreview title="Controlled">
					<div className="flex flex-col items-center gap-3">
						<Checkbox
							checked={accepted}
							label="I accept the terms"
							onChange={setAccepted}
						/>
						<span className="text-muted-foreground text-sm">
							checked: {String(accepted)}
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultChecked">
					<div className="flex flex-col gap-4">
						<Checkbox label="Starts empty" />
						<Checkbox
							defaultChecked
							label="Starts ticked"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Disabled">
					<div className="flex flex-col gap-4">
						<Checkbox
							disabled
							label="Disabled, empty"
						/>
						<Checkbox
							defaultChecked
							disabled
							label="Disabled, ticked"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabledReason
					</code>{' '}
					blocks a box but keeps it focusable; hover or focus it to read why.
				</p>
				<ComponentPreview title="One extra locked by the plan">
					<Checkbox.Group
						ariaLabel="Extras da reserva"
						defaultValue={[
							'breakfast',
						]}
						items={extras}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Mixed state, and a box without a label
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						indeterminate
					</code>{' '}
					draws a dash and wins over{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						checked
					</code>
					; label-less boxes take{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					.
				</p>
				<ComponentPreview title="A select-all with indeterminate and ariaLabel">
					<SelectAllExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Description</h2>
				<ComponentPreview title="With and without">
					<div className="flex max-w-sm flex-col gap-4">
						<Checkbox label="Newsletter" />
						<Checkbox
							description="One email a week, and nothing else. Unsubscribe any time."
							label="Newsletter"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bordered</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bordered
					</code>{' '}
					also stretches the row to the full width of its container, so give it
					a parent with a width you want.
				</p>
				<ComponentPreview title="bordered, alone and with a description">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Checkbox
							bordered
							label="Standard delivery"
						/>
						<Checkbox
							bordered
							defaultChecked
							description="Arrives tomorrow before noon."
							label="Express delivery"
						/>
						<Checkbox
							bordered
							description="Not available for this address."
							disabled
							label="Same-day delivery"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Group</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bordered
					</code>{' '}
					reach every item; description and disabled are per item.
				</p>
				<ComponentPreview title="Controlled — vertical (the default)">
					<div className="flex flex-col items-center gap-3">
						<Checkbox.Group
							items={fruits}
							onChange={setPicked}
							value={picked}
						/>
						<span className="text-muted-foreground text-sm">
							value: [{picked.join(', ')}]
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="horizontal">
					<Checkbox.Group
						defaultValue={[
							'banana',
						]}
						items={fruits}
						variant="horizontal"
					/>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultValue">
					<Checkbox.Group
						defaultValue={[
							'apple',
							'cherry',
						]}
						items={fruits}
					/>
				</ComponentPreview>
				<ComponentPreview title="size, forwarded to every item">
					<Checkbox.Group
						items={fruits}
						size="lg"
					/>
				</ComponentPreview>
				<ComponentPreview title="bordered, forwarded to every item">
					<div className="w-full max-w-sm">
						<Checkbox.Group
							bordered
							items={fruits}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="The whole group disabled">
					<Checkbox.Group
						defaultValue={[
							'apple',
						]}
						disabled
						items={fruits}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Validation</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						errorMessage
					</code>{' '}
					implies{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						error
					</code>
					; it renders under the box, or once under a group.
				</p>
				<ComponentPreview title="A required checkbox">
					<Checkbox
						checked={terms}
						errorMessage={
							terms ? undefined : 'Aceite os termos para continuar.'
						}
						label="Li e aceito os termos de uso"
						onChange={setTerms}
					/>
				</ComponentPreview>
				<ComponentPreview title="An invalid group — named with ariaLabel">
					<div className="flex flex-col gap-2">
						<span className="font-medium text-sm">Canais de aviso</span>
						<Checkbox.Group
							ariaLabel="Canais de aviso"
							errorMessage={
								notify.length === 0 ? 'Escolha pelo menos um canal.' : undefined
							}
							items={channels}
							onChange={setNotify}
							value={notify}
							variant="horizontal"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="error without a message">
					<Checkbox
						error
						label="Only the border and ring turn destructive"
					/>
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

export const Route = createFileRoute('/libs/react-web/components/checkbox')({
	component: Page,
})
