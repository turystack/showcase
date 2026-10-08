import { createFileRoute } from '@tanstack/react-router'
import { Accordion, Badge, MoneyText } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/accordion/accordion.types.ts` — a
 * discriminated union on `type` — and the `defaultVariants` in `accordion.tsx`.
 * `collapsible` is single-mode only, defaults to true, and now actually
 * decides whether the open item can close. `onChange` delivers `null` — not
 * `undefined` — once nothing is open.
 */
const rootProps = [
	{
		description: 'One open panel at a time, or many; shapes value, onChange.',
		name: 'type',
		required: true,
		type: '"single" | "multiple"',
	},
	{
		default: 'false',
		description: 'Draws a border around the accordion and pads each item.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: '3',
		description: 'Heading level every trigger sits in.',
		name: 'headingLevel',
		type: '2 | 3 | 4 | 5 | 6',
	},
	{
		default: '"md"',
		description: 'Scales trigger text, padding and panel text.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const singleProps = [
	{
		description: 'Controlled: the open item’s value; empty string is closed.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'Uncontrolled: the item open on first render.',
		name: 'defaultValue',
		type: 'string',
	},
	{
		default: 'true',
		description: 'Whether clicking the open item closes it.',
		name: 'collapsible',
		type: 'boolean',
	},
	{
		default: '"chevron"',
		description: 'What marks the open item: a chevron or a radio circle.',
		name: 'indicator',
		type: '"chevron" | "radio"',
	},
	{
		description: 'Fires with the opened item’s value, or null when none.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
]

const multipleProps = [
	{
		description: 'Controlled: the values of every open item.',
		name: 'value',
		type: 'string[]',
	},
	{
		description: 'Uncontrolled: the items open on the first render.',
		name: 'defaultValue',
		type: 'string[]',
	},
	{
		description: 'Fires with the full list of open values.',
		name: 'onChange',
		type: '(value: string[]) => void',
	},
	{
		default: '"chevron"',
		description: 'Chevron only; the type refuses "radio" here.',
		name: 'indicator',
		type: '"chevron"',
	},
]

const partProps = [
	{
		description: 'Item identifier, used by value and onChange.',
		name: 'Accordion.Item · value',
		required: true,
		type: 'string',
	},
	{
		default: 'false',
		description: 'Dims the item and refuses the click.',
		name: 'Accordion.Item · disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'Accordion.Item · disabledReason',
		type: 'string',
	},
	{
		description: 'The clickable header; its children are the title.',
		name: 'Accordion.Trigger',
		type: 'children',
	},
	{
		description: 'A muted second line under the title; phrasing content.',
		name: 'Accordion.Trigger · description',
		type: 'React.ReactNode',
	},
	{
		description: 'Trailing content before the chevron, e.g. a price.',
		name: 'Accordion.Trigger · rightSection',
		type: 'React.ReactNode',
	},
	{
		default: "the root's, else 3",
		description: 'Heading level of this trigger, over the root’s.',
		name: 'Accordion.Trigger · headingLevel',
		type: '2 | 3 | 4 | 5 | 6',
	},
	{
		description: 'The panel; its height animates.',
		name: 'Accordion.Content',
		type: 'children',
	},
]

const usageCode = `import { Accordion } from '@turystack/react-web'

// Single, uncontrolled
<Accordion defaultValue="shipping" type="single">
  <Accordion.Item value="shipping">
    <Accordion.Trigger>When does it ship?</Accordion.Trigger>
    <Accordion.Content>Within two working days.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="returns">
    <Accordion.Trigger>Can I return it?</Accordion.Trigger>
    <Accordion.Content>Thirty days, no questions.</Accordion.Content>
  </Accordion.Item>
</Accordion>

// Single, controlled — onChange is typed (value: string | null) and hands
// you null when the open item collapses, so ?? '' still lands on empty
const [open, setOpen] = useState('shipping')

<Accordion
  onChange={(value) => setOpen(value ?? '')}
  type="single"
  value={open}
>
  {items}
</Accordion>

// Single, collapsible={false} — the last open item can move to another
// item but never collapses to nothing
<Accordion collapsible={false} defaultValue="shipping" type="single">
  {items}
</Accordion>

// Multiple, controlled
const [open, setOpen] = useState<string[]>(['shipping'])

<Accordion bordered onChange={setOpen} type="multiple" value={open}>
  {items}
</Accordion>

// A marketing FAQ at the large size
<Accordion size="lg" type="multiple">
  {items}
</Accordion>

// An FAQ right under the page's h1: every trigger sits in an h2 (default h3)
<Accordion headingLevel={2} type="multiple">
  {items}
</Accordion>

// Opening an item is choosing it: a payment method picker
<Accordion defaultValue="pix" indicator="radio" onChange={setMethod} type="single">
  <Accordion.Item value="pix">
    <Accordion.Trigger>Pix</Accordion.Trigger>
    <Accordion.Content>Aprovação na hora.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="card">
    <Accordion.Trigger>Cartão de crédito</Accordion.Trigger>
    <Accordion.Content><CardFields /></Accordion.Content>
  </Accordion.Item>
</Accordion>

// A richer trigger: a second line and a trailing slot. Pass them as props —
// never a Flex or a <div> inside the trigger: it is a <button>, and a button
// may only hold phrasing content.
<Accordion.Trigger
  description="Aprovação na hora, sem taxa"
  rightSection={<Badge size="sm" variant="success">5% de desconto</Badge>}
>
  Pix
</Accordion.Trigger>

// A disabled item
<Accordion.Item disabled value="legal">
  <Accordion.Trigger>Not available yet</Accordion.Trigger>
  <Accordion.Content>You will not see this.</Accordion.Content>
</Accordion.Item>

// Blocked, and saying why
<Accordion.Item disabledReason="Add a card first" value="card">…</Accordion.Item>`

function Faq() {
	return (
		<>
			<Accordion.Item value="shipping">
				<Accordion.Trigger>When does my order ship?</Accordion.Trigger>
				<Accordion.Content>
					Within two working days. You get the tracking code by email the moment
					the parcel leaves the warehouse.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="returns">
				<Accordion.Trigger>Can I return it?</Accordion.Trigger>
				<Accordion.Content>
					Thirty days from delivery, unworn, in the original box. Return
					shipping is on us.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="baggage">
				<Accordion.Trigger>What about the baggage allowance?</Accordion.Trigger>
				<Accordion.Content>
					One cabin bag up to 10kg and one personal item. Hold luggage is added
					at checkout.
				</Accordion.Content>
			</Accordion.Item>
		</>
	)
}

function Page() {
	const [single, setSingle] = useState('shipping')
	const [lastSingle, setLastSingle] = useState('nothing yet')
	const [many, setMany] = useState<string[]>([
		'shipping',
	])
	const [method, setMethod] = useState('pix')

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Accordion
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Sections that fold away until they are asked for.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={rootProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Props · type="single"
				</h2>
				<PropsTable props={singleProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Props · type="multiple"
				</h2>
				<PropsTable props={multipleProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Parts</h2>
				<PropsTable props={partProps} />
			</section>

			<SlotsSection slug="accordion" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Single mode</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Opening one item closes the one before it.
				</p>
				<ComponentPreview title="Uncontrolled — defaultValue">
					<div className="w-full max-w-lg">
						<Accordion
							defaultValue="shipping"
							type="single"
						>
							<Faq />
						</Accordion>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Controlled — watch what onChange delivers">
					<div className="w-full max-w-lg space-y-3">
						<Accordion
							onChange={(next) => {
								setLastSingle(next === null ? 'null' : `"${next}"`)
								setSingle(next ?? '')
							}}
							type="single"
							value={single}
						>
							<Faq />
						</Accordion>
						<p className="text-muted-foreground text-xs">
							value: <code className="text-foreground">"{single}"</code> · last
							onChange: <code className="text-foreground">{lastSingle}</code>
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="collapsible={false} — the last item cannot close">
					<div className="w-full max-w-lg">
						<Accordion
							collapsible={false}
							defaultValue="shipping"
							type="single"
						>
							<Faq />
						</Accordion>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Multiple mode</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Items toggle independently;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					hands over the whole list of open values.
				</p>
				<ComponentPreview title="Uncontrolled — two open at once">
					<div className="w-full max-w-lg">
						<Accordion
							defaultValue={[
								'shipping',
								'baggage',
							]}
							type="multiple"
						>
							<Faq />
						</Accordion>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Controlled">
					<div className="w-full max-w-lg space-y-3">
						<Accordion
							onChange={setMany}
							type="multiple"
							value={many}
						>
							<Faq />
						</Accordion>
						<p className="text-muted-foreground text-xs">
							value:{' '}
							<code className="text-foreground">
								[{many.map((item) => `"${item}"`).join(', ')}]
							</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bordered</h2>
				<ComponentPreview title="bordered">
					<div className="w-full max-w-lg">
						<Accordion
							bordered
							defaultValue="shipping"
							type="single"
						>
							<Faq />
						</Accordion>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Size</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">md</code>{' '}
					is the default;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">lg</code>{' '}
					suits a landing-page FAQ.
				</p>
				<ComponentPreview title='A landing-page FAQ — size="lg"'>
					<div className="w-full max-w-2xl">
						<Accordion
							defaultValue={[
								'shipping',
							]}
							size="lg"
							type="multiple"
						>
							<Faq />
						</Accordion>
					</div>
				</ComponentPreview>
				<ComponentPreview title='Dense — size="sm"'>
					<div className="w-full max-w-sm">
						<Accordion
							bordered
							defaultValue="shipping"
							size="sm"
							type="single"
						>
							<Faq />
						</Accordion>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Heading level</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every trigger sits in a heading,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">h3</code>{' '}
					unless{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						headingLevel
					</code>{' '}
					says otherwise.
				</p>
				<ComponentPreview title="An FAQ under the page title — headingLevel={2}">
					<div className="w-full max-w-lg">
						<Accordion
							headingLevel={2}
							type="multiple"
						>
							<Faq />
						</Accordion>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Radio indicator</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						indicator="radio"
					</code>{' '}
					marks the open item as the choice. Single mode only; it turns{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						collapsible
					</code>{' '}
					off.
				</p>
				<ComponentPreview title="Choose a payment method">
					<div className="w-full max-w-lg space-y-3">
						<Accordion
							bordered
							indicator="radio"
							onChange={(next) => setMethod(next ?? '')}
							type="single"
							value={method}
						>
							<Accordion.Item value="pix">
								<Accordion.Trigger>Pix</Accordion.Trigger>
								<Accordion.Content>
									O QR code aparece na próxima etapa. Aprovação na hora, sem
									taxa.
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="card">
								<Accordion.Trigger>Cartão de crédito</Accordion.Trigger>
								<Accordion.Content>
									Em até 10x sem juros no Visa, Mastercard, Elo e Amex.
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="boleto">
								<Accordion.Trigger>Boleto bancário</Accordion.Trigger>
								<Accordion.Content>
									Vence em 3 dias úteis; a reserva fica garantida até a
									compensação.
								</Accordion.Content>
							</Accordion.Item>
						</Accordion>
						<p className="text-muted-foreground text-xs">
							method: <code className="text-foreground">"{method}"</code>
						</p>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The trigger stays a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;button&gt;
					</code>{' '}
					with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-expanded
					</code>
					; the circle is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-hidden
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Description and right section
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						description
					</code>{' '}
					adds a second line,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rightSection
					</code>{' '}
					trailing content; the title alone names it.
				</p>
				<ComponentPreview title="A checkout's payment methods">
					<div className="w-full max-w-lg">
						<Accordion
							bordered
							defaultValue="pix"
							indicator="radio"
							type="single"
						>
							<Accordion.Item value="pix">
								<Accordion.Trigger
									description="Aprovação na hora, sem taxa"
									rightSection={
										<Badge
											size="sm"
											variant="success"
										>
											5% de desconto
										</Badge>
									}
								>
									Pix
								</Accordion.Trigger>
								<Accordion.Content>
									O QR code aparece na próxima etapa e vale por 30 minutos.
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="card">
								<Accordion.Trigger
									description="Em até 10x sem juros"
									rightSection={
										<MoneyText
											value={129000}
											weight="semibold"
										/>
									}
								>
									Cartão de crédito
								</Accordion.Trigger>
								<Accordion.Content>
									Visa, Mastercard, Elo e Amex. A primeira parcela é cobrada
									hoje.
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="boleto">
								<Accordion.Trigger description="Vence em 3 dias úteis">
									Boleto bancário
								</Accordion.Trigger>
								<Accordion.Content>
									A reserva fica garantida até a compensação.
								</Accordion.Content>
							</Accordion.Item>
						</Accordion>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="font-medium text-foreground">
						Never lay the trigger out yourself.
					</strong>{' '}
					Pass text and inline elements as props, nothing interactive.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="font-medium text-foreground">
						Where the chevron sits.
					</strong>{' '}
					Centred on a two-line trigger; on the first line of a wrapped title.
				</p>
				<ComponentPreview title="Chevron by a two-line trigger and a wrapped title">
					<div className="w-full max-w-md">
						<Accordion type="multiple">
							<Accordion.Item value="summary">
								<Accordion.Trigger
									description="Suíte Master · 3 noites"
									rightSection={
										<MoneyText
											value={186000}
											weight="semibold"
										/>
									}
								>
									Resumo do pedido
								</Accordion.Trigger>
								<Accordion.Content>
									Diárias, taxa de serviço e impostos, detalhados.
								</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="faq">
								<Accordion.Trigger>
									Posso cancelar a reserva sem custo até quarenta e oito horas
									antes do check-in, mesmo numa tarifa promocional?
								</Accordion.Trigger>
								<Accordion.Content>
									Sim, exceto nas tarifas marcadas como não reembolsáveis.
								</Accordion.Content>
							</Accordion.Item>
						</Accordion>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Disabled items</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A disabled item keeps its place in the list.
				</p>
				<ComponentPreview title="One item out of reach">
					<div className="w-full max-w-lg">
						<Accordion type="single">
							<Accordion.Item value="shipping">
								<Accordion.Trigger>When does my order ship?</Accordion.Trigger>
								<Accordion.Content>Within two working days.</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item
								disabled
								value="legal"
							>
								<Accordion.Trigger>Terms — not published yet</Accordion.Trigger>
								<Accordion.Content>You will never see this.</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item value="returns">
								<Accordion.Trigger>Can I return it?</Accordion.Trigger>
								<Accordion.Content>
									Thirty days from delivery.
								</Accordion.Content>
							</Accordion.Item>
						</Accordion>
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
					blocks an item but keeps its trigger focusable; hover or focus it to
					read why.
				</p>
				<ComponentPreview title="A payment method waiting on a card">
					<div className="w-full max-w-lg">
						<Accordion
							defaultValue="pix"
							indicator="radio"
							type="single"
						>
							<Accordion.Item value="pix">
								<Accordion.Trigger>Pix</Accordion.Trigger>
								<Accordion.Content>Aprovação na hora.</Accordion.Content>
							</Accordion.Item>
							<Accordion.Item
								disabledReason="Cadastre um cartão primeiro"
								value="card"
							>
								<Accordion.Trigger>Cartão salvo</Accordion.Trigger>
								<Accordion.Content>Nunca aparece.</Accordion.Content>
							</Accordion.Item>
						</Accordion>
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

export const Route = createFileRoute('/libs/react-web/components/accordion')({
	component: Page,
})
