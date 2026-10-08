import { createFileRoute } from '@tanstack/react-router'
import { Badge, MoneyText, Radio, Typography } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/radio/radio.types.ts`. The only
 * default in the component is `variant: 'vertical'` from `defaultVariants` in
 * the group's `tv()` call; the radio itself has no `defaultVariants`, and
 * notably no size scale.
 */
const radioProps = [
	{
		description: 'Content beside the circle; names and selects the radio.',
		name: 'label',
		type: 'React.ReactNode',
	},
	{
		description: 'Helper content under the label.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'Value this radio stands for; standalone default "radio".',
		name: 'value',
		type: 'string',
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
		description: 'Controlled selected state. Standalone only.',
		name: 'checked',
		type: 'boolean',
	},
	{
		description: 'Initial state when uncontrolled. Standalone only.',
		name: 'defaultChecked',
		type: 'boolean',
	},
	{
		description: 'Fires with true when picked. Standalone only.',
		name: 'onChange',
		type: '(checked: boolean) => void',
	},
]

/**
 * `Radio.Group` from the same file. Unlike `Checkbox.Group`, this one does
 * forward `bordered` to every item, and `RadioItem` carries a `description`.
 */
const radioGroupProps = [
	{
		description: 'Options: label, value, description, disabled, badge…',
		name: 'items',
		required: true,
		type: 'RadioItem[]',
	},
	{
		description: 'Per item: blocks it like disabled; a tooltip says why.',
		name: 'items[].disabledReason',
		type: 'string',
	},
	{
		default: '"vertical"',
		description: 'Layout: a stacked column, or a wrapping row with wider gaps.',
		name: 'variant',
		type: '"vertical" | "horizontal"',
	},
	{
		description: 'Controlled selection — the value of the picked item.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'Initial selection when uncontrolled.',
		name: 'defaultValue',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Disables every radio in the group.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Applies the bordered card treatment to every item.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Turns every item into a card that is the radio.',
		name: 'card',
		type: 'boolean',
	},
	{
		description: 'Fires with the value of the newly picked item.',
		name: 'onChange',
		type: '(value: string) => void',
	},
	{
		description: 'Accessible name for a group with no visible legend.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const plans = [
	{
		description: 'One project, community support.',
		label: 'Free',
		value: 'free',
	},
	{
		description: 'Ten projects, email support, custom domains.',
		label: 'Pro',
		value: 'pro',
	},
	{
		description: 'Not available on a personal account.',
		disabled: true,
		label: 'Enterprise',
		value: 'enterprise',
	},
]

const payments = [
	{
		label: 'Pix',
		value: 'pix',
	},
	{
		label: 'Cartão',
		value: 'card',
	},
	{
		disabledReason: 'Boleto só até 3 dias antes do check-in',
		label: 'Boleto',
		value: 'boleto',
	},
]

const sizes = [
	{
		label: 'Small',
		value: 's',
	},
	{
		label: 'Medium',
		value: 'm',
	},
	{
		label: 'Large',
		value: 'l',
	},
]

/**
 * A billing interval is the case `card` exists for: each option carries a
 * price and a badge, which a plain row cannot hold without the price reading
 * as part of the name.
 */
const intervals = [
	{
		label: 'Mensal',
		rightSection: (
			<MoneyText
				value={4990}
				weight="semibold"
			/>
		),
		value: 'monthly',
	},
	{
		badge: (
			<Badge
				size="sm"
				variant="success"
			>
				Economize 15%
			</Badge>
		),
		description: (
			<>
				Cobrado uma vez por ano.
				<br />
				Equivale a{' '}
				<MoneyText
					inheritColor
					size="inherit"
					value={4241}
				/>{' '}
				por mês.
			</>
		),
		label: 'Anual',
		rightSection: (
			<MoneyText
				value={50900}
				weight="semibold"
			/>
		),
		value: 'yearly',
	},
]

const usageCode = `import { Badge, MoneyText, Radio } from '@turystack/react-web'
import { useState } from 'react'

// A group — the normal case
function Plan() {
  const [plan, setPlan] = useState('free')

  return (
    <Radio.Group
      items={[
        { description: 'One project.', label: 'Free', value: 'free' },
        { description: 'Ten projects.', label: 'Pro', value: 'pro' },
        { disabled: true, label: 'Enterprise', value: 'enterprise' },
      ]}
      onChange={setPlan}
      value={plan}
    />
  )
}

// Uncontrolled
<Radio.Group defaultValue="m" items={sizes} />

// Horizontal, and bordered cards
<Radio.Group items={sizes} variant="horizontal" />
<Radio.Group bordered items={plans} />

// The whole group off
<Radio.Group defaultValue="free" disabled items={plans} />

// Card — the whole card is the radio; badge and rightSection are card-only.
// No visible legend names this group, so ariaLabel does.
<Radio.Group
  ariaLabel="Intervalo de cobrança"
  card
  variant="horizontal"
  value={interval}
  onChange={setInterval}
  items={[
    { label: 'Mensal', value: 'monthly', rightSection: <MoneyText value={4990} /> },
    {
      label: 'Anual',
      value: 'yearly',
      badge: <Badge size="sm" variant="success">Economize 15%</Badge>,
      description: 'Cobrado uma vez por ano.',
      rightSection: <MoneyText value={50900} />,
    },
  ]}
/>

// Standalone, controlled — you hold the state yourself
function Confirm() {
  const [agreed, setAgreed] = useState(false)

  return (
    <Radio
      checked={agreed}
      label="Yes, delete it"
      onChange={setAgreed}
      value="yes"
    />
  )
}

// Standalone, uncontrolled — defaultChecked seeds it and it holds its own state
<Radio defaultChecked label="Yes, delete it" value="yes" />`

function Page() {
	const [plan, setPlan] = useState('free')
	const [agreed, setAgreed] = useState(false)
	const [described, setDescribed] = useState(false)
	const [carded, setCarded] = useState(true)
	const [billing, setBilling] = useState('yearly')

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Radio
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One choice out of several, almost always through Radio.Group.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={radioProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Radio.Group props
				</h2>
				<PropsTable props={radioGroupProps} />
			</section>

			<SlotsSection slug="radio" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Group</h2>
				<ComponentPreview title="Controlled — vertical (the default)">
					<div className="flex flex-col items-center gap-3">
						<Radio.Group
							items={plans}
							onChange={setPlan}
							value={plan}
						/>
						<span className="text-muted-foreground text-sm">value: {plan}</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="horizontal">
					<Radio.Group
						defaultValue="m"
						items={sizes}
						variant="horizontal"
					/>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultValue">
					<Radio.Group
						defaultValue="pro"
						items={plans}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bordered</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bordered
					</code>{' '}
					is a group-level prop here, and it stretches every row to the full
					width of the container.
				</p>
				<ComponentPreview title="A bordered group">
					<div className="w-full max-w-sm">
						<Radio.Group
							bordered
							defaultValue="pro"
							items={plans}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Bordered and horizontal">
					<div className="w-full max-w-md">
						<Radio.Group
							bordered
							defaultValue="m"
							items={sizes}
							variant="horizontal"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Card</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						card
					</code>{' '}
					makes each item a clickable card named by its label; give the row an{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>{' '}
					when nothing names it.
				</p>
				<ComponentPreview title="Billing interval — horizontal, sharing the row">
					<div className="flex w-full max-w-2xl flex-col gap-3">
						<Radio.Group
							ariaLabel="Intervalo de cobrança"
							card
							items={intervals}
							onChange={setBilling}
							value={billing}
							variant="horizontal"
						/>
						<Typography
							size="sm"
							variant="muted"
						>
							value: {billing}
						</Typography>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Vertical cards">
					<div className="w-full max-w-sm">
						<Radio.Group
							ariaLabel="Intervalo de cobrança"
							card
							defaultValue="monthly"
							items={intervals}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Disabled</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Disable per item, or the whole group at once.
				</p>
				<ComponentPreview title="The whole group disabled">
					<Radio.Group
						defaultValue="free"
						disabled
						items={plans}
					/>
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
					blocks an item but keeps it reachable by arrows; hover or focus it to
					read why.
				</p>
				<ComponentPreview title="Boleto blocked among payment cards">
					<div className="w-full max-w-lg">
						<Radio.Group
							ariaLabel="Forma de pagamento"
							card
							defaultValue="pix"
							items={payments}
							variant="horizontal"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Standalone</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A standalone radio renders its own one-item group, controlled or
					uncontrolled like Switch and Checkbox.
				</p>
				<ComponentPreview title="Controlled standalone">
					<div className="flex flex-col items-center gap-3">
						<Radio
							checked={agreed}
							label="Yes, delete it"
							onChange={setAgreed}
							value="yes"
						/>
						<span className="text-muted-foreground text-sm">
							checked: {String(agreed)}
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultChecked">
					<Radio
						defaultChecked
						label="Starts checked"
						value="uncontrolled"
					/>
				</ComponentPreview>
				<ComponentPreview title="Description, bordered, disabled">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Radio
							checked={described}
							description="Helper text under the label."
							label="With a description"
							onChange={setDescribed}
							value="a"
						/>
						<Radio
							bordered
							checked={carded}
							description="The border stretches to the container."
							label="Bordered"
							onChange={setCarded}
							value="b"
						/>
						<Radio
							disabled
							label="Disabled"
							value="c"
						/>
						<Radio
							checked
							disabled
							label="Disabled and selected"
							value="d"
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

export const Route = createFileRoute('/libs/react-web/components/radio')({
	component: Page,
})
