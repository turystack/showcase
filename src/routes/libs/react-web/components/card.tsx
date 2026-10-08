import { createFileRoute } from '@tanstack/react-router'
import { Badge, Button, Card, Grid } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/card/card.types.ts` and the
 * `tv()` call in `card.tsx`. The root has no variant and no default variants —
 * every visual decision here is either a boolean on a part or one of the two
 * enums on the root.
 */
const cardProps = [
	{
		default: '"auto"',
		description: 'full fills its cell (h-full); auto is content height.',
		name: 'height',
		type: '"auto" | "full"',
	},
	{
		description: 'Min height: sm 20rem, md 24rem, lg 30rem, xl 34.375rem.',
		name: 'minHeight',
		type: '"sm" | "md" | "lg" | "xl"',
	},
	{
		description: 'Section placement in spare height; needs minHeight.',
		name: 'verticalAlign',
		type: '"start" | "center"',
	},
	{
		default: '"default"',
		description: 'Padding and gap of every part; sm is a compact list row.',
		name: 'size',
		type: '"default" | "sm"',
	},
	{
		description: 'Makes the card a button; with href, the link click handler.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLElement>',
	},
	{
		description: 'Makes the card a link, named by Card.Title.',
		name: 'href',
		type: 'string',
	},
	{
		description: 'Accessible name when there is no Card.Title.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Picked: primary ring and tint; aria-pressed on buttons.',
		name: 'selected',
		type: 'boolean',
	},
	{
		description: 'Makes the card a toggle button (aria-pressed).',
		name: 'onSelectedChange',
		type: '(selected: boolean) => void',
	},
	{
		default: 'false',
		description: 'Recommended tier: primary ring. Visual only.',
		name: 'highlighted',
		type: 'boolean',
	},
	{
		description: 'Root id, for in-page links and AnchorNav.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'The sections. All of them are optional and freely ordered.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const headerProps = [
	{
		default: 'false',
		description: 'Adds a rule under the header.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		description: 'Usually a Card.Title and a Card.Description.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const footerProps = [
	{
		default: 'false',
		description: 'Footer tray: rule above, muted background, own padding.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		description: 'Usually the actions for the card.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const titleProps = [
	{
		description: 'Renders the title as that heading (h1–h6).',
		name: 'headingLevel',
		type: '1 | 2 | 3 | 4 | 5 | 6',
	},
	{
		description: 'The title text.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const childrenOnlyProps = [
	{
		description: 'The content of the section.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Card } from '@turystack/react-web'

<Card>
  <Card.Header bordered>
    <Card.Title>Plano Pro</Card.Title>
    <Card.Description>Cobrado mensalmente</Card.Description>
  </Card.Header>
  <Card.Content>Tudo incluído, sem limite de reservas.</Card.Content>
  <Card.Separator />
  <Card.Footer bordered>
    <Button>Fazer upgrade</Button>
  </Card.Footer>
</Card>

// Filling its cell: a Grid.Item is a plain block, so the Card inside it
// ends on the row's line only with height="full"
<Grid.Item rowSpan={2}>
  <Card height="full">…</Card>
</Grid.Item>

// A tall card with its content parked in the middle
<Card minHeight="md" verticalAlign="center">
  <Card.Content>Nada por aqui ainda.</Card.Content>
</Card>

// A real link: the title becomes the stretched <a>
<Card href="/plans/pro">
  <Card.Header>
    <Card.Title>Plano Pro</Card.Title>
    <Card.Description>R$ 89/mês</Card.Description>
  </Card.Header>
  <Card.Footer>
    {/* sits above the link: it runs, the card does not navigate */}
    <Button onClick={compare} size="sm" variant="outline">Comparar</Button>
  </Card.Footer>
</Card>

// href + onClick: onClick runs first — preventDefault to route client-side
<Card
  href="/plans/pro"
  onClick={(event) => {
    event.preventDefault()
    navigate({ to: '/plans/pro' })
  }}
>
  …
</Card>

// The title as a real heading — the level is the page's to decide
<Card href="/plans/pro">
  <Card.Header>
    <Card.Title headingLevel={3}>Plano Pro</Card.Title>
  </Card.Header>
</Card>

// No Card.Title: ariaLabel names the link instead
<Card ariaLabel="Abrir reserva 4821" href="/bookings/4821">
  <Card.Content>4821 · 12–19 mar</Card.Content>
</Card>

// The whole surface as one target: a real button (Tab, Enter, Space)
<Card ariaLabel="Abrir reserva 4821" onClick={() => open(reservation)}>
  <Card.Header>
    <Card.Title>Reserva 4821</Card.Title>
  </Card.Header>
</Card>

// Pricing tiers: one recommended, one picked — each card a toggle button
<Card
  highlighted
  id="plano-pro"
  onSelectedChange={() => setPlan('pro')}
  selected={plan === 'pro'}
>
  <Card.Header>
    <Badge>Recomendado</Badge>
    <Card.Title>Pro</Card.Title>
  </Card.Header>
</Card>`

const TIERS = [
	{
		blurb: 'Para começar a vender',
		id: 'basico',
		name: 'Básico',
		price: 'R$ 0',
	},
	{
		blurb: 'Reservas e usuários ilimitados',
		id: 'pro',
		name: 'Pro',
		price: 'R$ 89',
	},
	{
		blurb: 'SSO, SLA e gerente de conta',
		id: 'empresa',
		name: 'Empresa',
		price: 'R$ 349',
	},
]

const minHeights = [
	'sm',
	'md',
	'lg',
	'xl',
] as const

function Page() {
	const [opened, setOpened] = useState(0)
	const [routedTo, setRoutedTo] = useState<string | null>(null)
	const [compared, setCompared] = useState(0)
	const [messaged, setMessaged] = useState(0)
	const [plan, setPlan] = useState<string | null>('pro')

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Card
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A surface with six named sections, all optional, in whatever order the
					content wants.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card
					</code>{' '}
					— the root.
				</p>
				<PropsTable props={cardProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Header
					</code>
				</p>
				<PropsTable props={headerProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Footer
					</code>
				</p>
				<PropsTable props={footerProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Title
					</code>
				</p>
				<PropsTable props={titleProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Description
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Content
					</code>{' '}
					take children and nothing else.
				</p>
				<PropsTable props={childrenOnlyProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Separator
					</code>{' '}
					takes no props at all — it is an{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;hr&gt;
					</code>{' '}
					with the card's rule on it.
				</p>
				<PropsTable props={[]} />
			</section>

			<SlotsSection slug="card" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Anatomy</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Separator
					</code>{' '}
					divides content;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bordered
					</code>{' '}
					closes the header or footer. Do not stack both.
				</p>
				<ComponentPreview title="Every section at once">
					<div className="w-full max-w-sm">
						<Card>
							<Card.Header bordered>
								<Card.Title>Plano Pro</Card.Title>
								<Card.Description>Cobrado mensalmente</Card.Description>
							</Card.Header>
							<Card.Content>
								Tudo incluído, sem limite de reservas nem de usuários.
							</Card.Content>
							<Card.Separator />
							<Card.Content>
								Cancele quando quiser — a cobrança para no fim do ciclo.
							</Card.Content>
							<Card.Footer bordered>
								<Button size="sm">Fazer upgrade</Button>
							</Card.Footer>
						</Card>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Nothing is required. A card with only a content block is a valid card,
					and so is one that is only a header.
				</p>
				<ComponentPreview title="Partial compositions">
					<div className="grid w-full gap-4 sm:grid-cols-3">
						<Card>
							<Card.Content>Content only.</Card.Content>
						</Card>
						<Card>
							<Card.Header>
								<Card.Title>Header only</Card.Title>
								<Card.Description>With a description.</Card.Description>
							</Card.Header>
						</Card>
						<Card>
							<Card.Content>Content and a footer.</Card.Content>
							<Card.Footer>
								<Button
									size="sm"
									variant="outline"
								>
									Ver detalhes
								</Button>
							</Card.Footer>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Borders</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bordered
					</code>{' '}
					on the footer also drops the root's bottom padding, so the tray
					reaches the edge.
				</p>
				<ComponentPreview title="bordered on and off">
					<div className="grid w-full gap-4 sm:grid-cols-2">
						<Card>
							<Card.Header>
								<Card.Title>Plain</Card.Title>
								<Card.Description>No rules anywhere.</Card.Description>
							</Card.Header>
							<Card.Content>Header and footer unbordered.</Card.Content>
							<Card.Footer>
								<Button
									size="sm"
									variant="outline"
								>
									Ação
								</Button>
							</Card.Footer>
						</Card>
						<Card>
							<Card.Header bordered>
								<Card.Title>Bordered</Card.Title>
								<Card.Description>Rules above and below.</Card.Description>
							</Card.Header>
							<Card.Content>Header and footer bordered.</Card.Content>
							<Card.Footer bordered>
								<Button size="sm">Ação</Button>
							</Card.Footer>
						</Card>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Separator
					</code>{' '}
					is the same rule, placed by hand, for dividing content that is not a
					header or a footer.
				</p>
				<ComponentPreview title="Separator between content blocks">
					<div className="w-full max-w-sm">
						<Card>
							<Card.Content>Ida — 12 Mar, 08:40</Card.Content>
							<Card.Separator />
							<Card.Content>Volta — 19 Mar, 17:15</Card.Content>
							<Card.Separator />
							<Card.Content>Bagagem despachada incluída</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Height</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						height="full"
					</code>{' '}
					makes each card fill its cell, so a row shares one bottom edge.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title='height="auto" vs height="full" in Grid.Items'
				>
					<div className="space-y-6">
						{(
							[
								'auto',
								'full',
							] as const
						).map((height) => (
							<div
								className="space-y-2"
								key={height}
							>
								<code className="text-muted-foreground text-xs">
									height="{height}"
								</code>
								<Grid
									cols={{
										base: 1,
										md: 3,
									}}
									gap="md"
								>
									{TIERS.map((tier) => (
										<Grid.Item key={tier.id}>
											<Card height={height}>
												<Card.Header>
													<Card.Title>{tier.name}</Card.Title>
													<Card.Description>{tier.blurb}</Card.Description>
												</Card.Header>
												<Card.Content>
													<span className="font-semibold text-2xl">
														{tier.price}
													</span>
													<span className="text-muted-foreground text-sm">
														/mês
													</span>
													{tier.id === 'empresa' ? (
														<p className="mt-2 text-muted-foreground text-sm">
															Contrato anual, faturamento por nota fiscal e
															onboarding dedicado para a equipe.
														</p>
													) : null}
												</Card.Content>
											</Card>
										</Grid.Item>
									))}
								</Grid>
							</div>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="items-start"
					title="minHeight sm, md, lg, xl"
				>
					<div className="grid w-full gap-4 sm:grid-cols-4">
						{minHeights.map((minHeight) => (
							<Card
								key={minHeight}
								minHeight={minHeight}
							>
								<Card.Header>
									<Card.Title>{minHeight}</Card.Title>
								</Card.Header>
							</Card>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						verticalAlign
					</code>{' '}
					needs spare height, so pair it with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						minHeight
					</code>
					.
				</p>
				<ComponentPreview
					className="items-start"
					title="verticalAlign start and center, at minHeight sm"
				>
					<div className="grid w-full gap-4 sm:grid-cols-2">
						<Card
							minHeight="sm"
							verticalAlign="start"
						>
							<Card.Header>
								<Card.Title>start</Card.Title>
								<Card.Description>Sections stay at the top.</Card.Description>
							</Card.Header>
						</Card>
						<Card
							minHeight="sm"
							verticalAlign="center"
						>
							<Card.Header>
								<Card.Title>center</Card.Title>
								<Card.Description>
									Sections sit in the middle — useful for an empty state.
								</Card.Description>
							</Card.Header>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Clickable</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onClick
					</code>{' '}
					without{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>{' '}
					makes the card a button. Clicks on nested controls stay with them.
				</p>
				<ComponentPreview title="A card as one target: Tab, then Enter or Space">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Card
							ariaLabel="Abrir reserva 4821"
							onClick={() => setOpened((n) => n + 1)}
						>
							<Card.Header>
								<Card.Title>Reserva 4821</Card.Title>
								<Card.Description>
									Ana Souza · 12–19 mar · Quarto duplo
								</Card.Description>
							</Card.Header>
							<Card.Footer>
								<Button
									onClick={() => setMessaged((n) => n + 1)}
									size="sm"
									variant="outline"
								>
									Enviar mensagem
								</Button>
							</Card.Footer>
						</Card>
						<p className="text-center text-muted-foreground text-sm">
							opened {opened} time{opened === 1 ? '' : 's'} · messaged{' '}
							{messaged} time{messaged === 1 ? '' : 's'}
						</p>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Inside a button, nested controls may read as plain text. A card with
					controls reads better with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Linked</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						href
					</code>{' '}
					stretches the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Title
					</code>{' '}
					link over the card. Nested buttons and links keep their own job.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onClick
					</code>
					, it runs first;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						event.preventDefault()
					</code>{' '}
					hands navigation to a client router.
				</p>
				<ComponentPreview title="Title as the link, with a nested button">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Card
							href="/plans/pro"
							onClick={(event) => {
								event.preventDefault()
								setRoutedTo('/plans/pro')
							}}
						>
							<Card.Header>
								<Card.Title>Plano Pro</Card.Title>
								<Card.Description>
									R$ 89/mês · reservas e usuários ilimitados
								</Card.Description>
							</Card.Header>
							<Card.Footer>
								<Button
									onClick={() => setCompared((n) => n + 1)}
									size="sm"
									variant="outline"
								>
									Comparar planos
								</Button>
							</Card.Footer>
						</Card>
						<p className="text-center text-muted-foreground text-sm">
							{routedTo ? `routed to ${routedTo}` : 'not routed yet'} · compared{' '}
							{compared} time{compared === 1 ? '' : 's'}
						</p>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card.Title
					</code>
					, pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					. With neither, no link renders and dev logs an error.
				</p>
				<ComponentPreview title="Named by ariaLabel, no title">
					<div className="w-full max-w-sm">
						<Card
							ariaLabel="Abrir reserva 4821"
							href="/bookings/4821"
							onClick={(event) => {
								event.preventDefault()
								setRoutedTo('/bookings/4821')
							}}
							size="sm"
						>
							<Card.Content>
								<div className="flex items-center justify-between">
									<span className="font-medium">4821 · Ana Souza</span>
									<span className="text-muted-foreground">12–19 mar</span>
								</div>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Selected and highlighted
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						highlighted
					</code>{' '}
					marks the recommended tier (visual only, so say it in text).{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						selected
					</code>{' '}
					marks the pick.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onSelectedChange
					</code>{' '}
					makes each card a toggle. For one-of-several, prefer{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Radio.Group card
					</code>
					.
				</p>
				<ComponentPreview title="Pricing tiers — Pro recommended, click to pick">
					<div className="grid w-full gap-4 sm:grid-cols-3">
						{TIERS.map((tier) => (
							<Card
								highlighted={tier.id === 'pro'}
								id={`plano-${tier.id}`}
								key={tier.id}
								onSelectedChange={(next) => setPlan(next ? tier.id : null)}
								selected={plan === tier.id}
							>
								<Card.Header>
									<div className="flex items-center justify-between gap-2">
										<Card.Title>{tier.name}</Card.Title>
										{tier.id === 'pro' ? (
											<Badge size="sm">Recomendado</Badge>
										) : null}
									</div>
									<Card.Description>{tier.blurb}</Card.Description>
								</Card.Header>
								<Card.Content>
									<p className="font-semibold text-2xl">
										{tier.price}
										<span className="font-normal text-muted-foreground text-sm">
											/mês
										</span>
									</p>
								</Card.Content>
							</Card>
						))}
					</div>
					<p className="mt-3 text-center text-muted-foreground text-sm">
						{plan ? `plano escolhido: ${plan}` : 'nenhum plano escolhido'}
					</p>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Title as a heading
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						headingLevel
					</code>{' '}
					makes Card.Title a real heading; pick the level the page needs.
				</p>
				<ComponentPreview title="A linked card whose title is an h3">
					<div className="w-full max-w-sm">
						<Card
							href="/plans/pro"
							// A docs demo: stay on the page.
							onClick={(event) => event.preventDefault()}
						>
							<Card.Header>
								<Card.Title headingLevel={3}>Plano Pro</Card.Title>
								<Card.Description>R$ 89/mês</Card.Description>
							</Card.Header>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Size</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size="sm"
					</code>{' '}
					is a compact list row; set it on the root and every part follows.
				</p>
				<ComponentPreview title="default and sm">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Card>
							<Card.Content>default — the block card</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>sm — one row of a list</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>sm — the next row</Card.Content>
						</Card>
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

export const Route = createFileRoute('/libs/react-web/components/card')({
	component: Page,
})
