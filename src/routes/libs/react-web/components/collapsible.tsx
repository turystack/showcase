import { createFileRoute } from '@tanstack/react-router'
import { Button, Collapsible, MoneyText } from '@turystack/react-web'
import { ChevronDown, ShoppingBag } from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const collapsibleProps = [
	{
		description: 'Controlled state.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Uncontrolled initial state.',
		name: 'defaultOpen',
		type: 'boolean',
	},
	{
		description: 'Fires when it opens or closes.',
		name: 'onChange',
		type: '(open: boolean) => void',
	},
	{
		description: 'Refuses to open or close.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Trigger only: the child becomes the trigger, own look kept.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Trigger only: a muted second line under the title.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'Trigger only: a leading element, typically an icon.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Trigger only: a right-aligned element, typically a price.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Trigger only: a chevron that turns over while open.',
		name: 'indicator',
		type: 'boolean',
	},
	{
		description: 'Panel only: keeps the content in the document while closed.',
		name: 'keepMounted',
		type: 'boolean',
	},
]

const usageCode = `import { Button, Collapsible, MoneyText } from '@turystack/react-web'
import { ChevronDown, ShoppingBag } from 'lucide-react'

<Collapsible defaultOpen>
  <Collapsible.Trigger indicator>Advanced options</Collapsible.Trigger>
  <Collapsible.Panel>
    <FilterFields />
  </Collapsible.Panel>
</Collapsible>

// A two-line trigger: title, muted second line, a price and the chevron
<Collapsible>
  <Collapsible.Trigger
    description="Suíte Master · 3 noites"
    indicator
    leftSection={<ShoppingBag aria-hidden size={18} />}
    rightSection={<MoneyText value={186000} weight="semibold" />}
  >
    Resumo do pedido
  </Collapsible.Trigger>
  <Collapsible.Panel>…</Collapsible.Panel>
</Collapsible>

// A form field the browser has to be able to reach while closed
<Collapsible.Panel keepMounted>
  <Input name="code" />
</Collapsible.Panel>

// Your own control as the trigger, keeping its own look.
// description / leftSection / rightSection / indicator are typed never here.
<Collapsible>
  <Collapsible.Trigger asChild>
    <Button size="sm" variant="ghost">Ver mais 4 comodidades</Button>
  </Collapsible.Trigger>
  <Collapsible.Panel>…</Collapsible.Panel>
</Collapsible>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Collapsible
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One section that opens and closes.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The table covers the root, Trigger and Panel.
				</p>
				<PropsTable props={collapsibleProps} />
			</section>

			<SlotsSection slug="collapsible" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Open and closed</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The trigger carries <code>aria-expanded</code> and{' '}
					<code>aria-controls</code>, which is the whole reason to reach for the
					primitive rather than a div and a boolean.
				</p>
				<ComponentPreview title="Two sections, one already open">
					<div className="flex w-full max-w-md flex-col gap-2">
						<Collapsible defaultOpen>
							<Collapsible.Trigger indicator>
								Advanced options
							</Collapsible.Trigger>
							<Collapsible.Panel>
								<p className="pb-2 text-muted-foreground text-sm">
									Rates, taxes and the cancellation window.
								</p>
							</Collapsible.Panel>
						</Collapsible>
						<Collapsible>
							<Collapsible.Trigger indicator>Guest notes</Collapsible.Trigger>
							<Collapsible.Panel>
								<p className="pb-2 text-muted-foreground text-sm">
									Arriving late, needs a cot.
								</p>
							</Collapsible.Panel>
						</Collapsible>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A two-line trigger
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code>description</code>, <code>leftSection</code>,{' '}
					<code>rightSection</code> and <code>indicator</code> build a two-line
					trigger like this order summary.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					They render as spans, since the trigger is a{' '}
					<code>&lt;button&gt;</code>; the title alone names it.
				</p>
				<ComponentPreview title="A checkout's order summary, folded on mobile">
					<div className="w-full max-w-sm rounded-lg border px-4">
						<Collapsible>
							<Collapsible.Trigger
								description="Suíte Master · 3 noites"
								indicator
								leftSection={
									<ShoppingBag
										aria-hidden
										size={18}
									/>
								}
								rightSection={
									<MoneyText
										value={186000}
										weight="semibold"
									/>
								}
							>
								Resumo do pedido
							</Collapsible.Trigger>
							<Collapsible.Panel>
								<dl className="grid grid-cols-[1fr_auto] gap-y-1 pb-3 text-muted-foreground text-sm">
									<dt>3 diárias</dt>
									<dd className="text-right">
										<MoneyText value={165000} />
									</dd>
									<dt>Taxa de serviço</dt>
									<dd className="text-right">
										<MoneyText value={21000} />
									</dd>
								</dl>
							</Collapsible.Panel>
						</Collapsible>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Your own trigger</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code>asChild</code> makes the child the trigger with its own look;
					the layout props are then typed <code>never</code>.
				</p>
				<ComponentPreview title="A ghost Button that reveals the rest of a list">
					<div className="flex w-full max-w-md flex-col items-start gap-2 text-sm">
						<ul className="list-disc space-y-1 pl-5">
							<li>Wi-Fi gratuito</li>
							<li>Café da manhã incluso</li>
						</ul>
						<Collapsible>
							<Collapsible.Panel>
								<ul className="list-disc space-y-1 pb-2 pl-5">
									<li>Piscina aquecida</li>
									<li>Estacionamento</li>
									<li>Academia 24h</li>
									<li>Aceita pets</li>
								</ul>
							</Collapsible.Panel>
							<Collapsible.Trigger asChild>
								<Button
									rightSection={<ChevronDown />}
									size="sm"
									variant="ghost"
								>
									Ver mais 4 comodidades
								</Button>
							</Collapsible.Trigger>
						</Collapsible>
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

export const Route = createFileRoute('/libs/react-web/components/collapsible')({
	component: Page,
})
