import { createFileRoute } from '@tanstack/react-router'
import { Badge, Card, Flex, Grid, Stat, Typography } from '@turystack/react-web'
import type { ReactNode } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/grid/grid.types.ts`; the Default
 * column comes from `defaultVariants` in `grid.tsx` — `cols: 1`, `gap: 'none'`
 * on the root, nothing on the item.
 */
const gridProps = [
	{
		default: '"stretch"',
		description: 'align-items for every cell; stretch fills the row height.',
		name: 'align',
		type: '"start" | "center" | "end" | "stretch"',
	},
	{
		default: '1',
		description: 'Equal columns: a count, or one per breakpoint, mobile-first.',
		name: 'cols',
		type: '1 | 2 | … | 12 | { base?, sm?, md?, lg?, xl? }',
	},
	{
		default: '"none"',
		description: 'Gap on both axes: xs 4px, sm 8px, md 16px, lg 24px, xl 32px.',
		name: 'gap',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
	},
]

const gridItemProps = [
	{
		description: 'Rows the cell covers (grid-row: span N), or per breakpoint.',
		name: 'rowSpan',
		type: '1 | 2 | 3 | 4 | 5 | 6 | { base?, sm?, md?, lg?, xl? }',
	},
	{
		description: 'Columns the cell covers, or "full"; per breakpoint too.',
		name: 'span',
		type: '1 | 2 | … | 12 | "full" | { base?, sm?, md?, lg?, xl? }',
	},
	{
		description: 'Visual position (CSS order); the DOM order is unchanged.',
		name: 'order',
		type: '1 | 2 | … | 12 | "first" | "last" | "none" | { base?, sm?, md?, lg?, xl? }',
	},
]

const usageCode = `import { Grid } from '@turystack/react-web'

// A plain three-up
<Grid cols={3} gap="md">
  <Grid.Item>One</Grid.Item>
  <Grid.Item>Two</Grid.Item>
  <Grid.Item>Three</Grid.Item>
</Grid>

// A form on a twelve-column field
<Grid cols={12} gap="md">
  <Grid.Item span={8}>Street</Grid.Item>
  <Grid.Item span={4}>Number</Grid.Item>
  <Grid.Item span={6}>City</Grid.Item>
  <Grid.Item span={6}>State</Grid.Item>
  <Grid.Item span="full">Notes</Grid.Item>
</Grid>

// Responsive: one column on a phone, two from 768px, three from 1024px
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">
  {tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
</Grid>

// Bento: a tall tile beside two short ones from 768px, one column on a
// phone. The Card fills its cell with height="full".
<Grid cols={{ base: 1, md: 3 }} gap="md">
  <Grid.Item rowSpan={{ md: 2 }} span={{ md: 2 }}>
    <Card height="full"><Departures /></Card>
  </Grid.Item>
  <StatCard />
  <StatCard />
</Grid>

// Alternating feature rows: copy first on a phone, the image first from
// 768px on the swapped rows. The source stays copy-then-image.
<Grid cols={{ base: 1, md: 2 }} gap="lg">
  <Grid.Item>{copy}</Grid.Item>
  <Grid.Item order={{ base: 'last', md: 'first' }}>{image}</Grid.Item>
</Grid>

// Cells keep their own height, top-aligned
<Grid align="start" cols={3} gap="md">…</Grid>

// Children do not have to be Grid.Item — any element is a cell.
// Grid.Item exists to carry span.
<Grid cols={2} gap="sm">
  <Card />
  <Card />
</Grid>`

function Cell({ children }: { children: ReactNode }) {
	return (
		<div className="rounded-lg bg-foreground/15 px-2 py-1.5 text-center text-xs">
			{children}
		</div>
	)
}

const COLS = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
] as const
const SPANS = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	'full',
] as const

const TOURS = [
	{
		detail: '7 noites · hotel 4★ · city tour',
		price: 'R$ 6.890',
		title: 'Lisboa e Porto',
	},
	{
		detail: '4 noites · fondue incluso',
		price: 'R$ 2.340',
		title: 'Gramado no inverno',
	},
	{
		detail: '5 noites · trem Vistadome',
		price: 'R$ 5.120',
		title: 'Cusco e Machu Picchu',
	},
]

const DEPARTURES = [
	{
		date: 'seg, 29 set',
		trip: 'Bonito ecoturismo — 18 pax',
	},
	{
		date: 'qua, 1 out',
		trip: 'Chapada Diamantina — 12 pax',
	},
	{
		date: 'qui, 2 out',
		trip: 'Foz do Iguaçu — 24 pax',
	},
	{
		date: 'sex, 3 out',
		trip: 'Lençóis Maranhenses — 16 pax',
	},
	{
		date: 'sáb, 4 out',
		trip: 'Jalapão 4x4 — 8 pax',
	},
	{
		date: 'dom, 5 out',
		trip: 'Serra Gaúcha — 30 pax',
	},
]

const FEATURES = [
	{
		body: 'Hotel, aéreo e passeios num carrinho só, com o total sempre à vista.',
		image: 'captura do carrinho',
		title: 'Monte o pacote',
	},
	{
		body: 'Pix, cartão em até 10x ou boleto, e a reserva confirmada na hora.',
		image: 'captura do checkout',
		title: 'Pague como preferir',
	},
]

/** Counted cells, so every key is the cell's own number rather than an index. */
function cells(count: number) {
	return COLS.slice(0, count)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Grid
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A CSS grid of one to twelve equal columns, with <code>Grid.Item</code>{' '}
					to let a single cell straddle several of them.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Always{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						w-full
					</code>
					, no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					. <code>cols</code>, <code>span</code>, <code>rowSpan</code> and{' '}
					<code>order</code> take per-breakpoint objects.
				</p>
				<PropsTable props={gridProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Grid.Item props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Any child is a cell; use{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Grid.Item
					</code>{' '}
					to span or move one.
				</p>
				<PropsTable props={gridItemProps} />
			</section>

			<SlotsSection slug="grid" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Columns</h2>
				<ComponentPreview title="Every column count, one to twelve">
					<div className="w-full max-w-lg space-y-3">
						{COLS.map((cols) => (
							<div
								className="space-y-1.5"
								key={cols}
							>
								<code className="text-muted-foreground text-xs">
									cols={'{'}
									{cols}
									{'}'}
								</code>
								<Grid
									cols={cols}
									gap="xs"
								>
									{cells(cols).map((n) => (
										<Cell key={n}>{n}</Cell>
									))}
								</Grid>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Responsive columns
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One count per window breakpoint: narrow the browser and the tours drop
					to two columns at 1024px, one at 768px.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="cols={{ base: 1, md: 2, lg: 3 }}"
				>
					<Grid
						cols={{
							base: 1,
							lg: 3,
							md: 2,
						}}
						gap="md"
					>
						{TOURS.map((tour) => (
							<Card key={tour.title}>
								<Card.Header>
									<Card.Title>{tour.title}</Card.Title>
									<Card.Description>{tour.detail}</Card.Description>
								</Card.Header>
								<Card.Content>
									<Badge variant="secondary">{tour.price}</Badge>
								</Card.Content>
							</Card>
						))}
					</Grid>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Align</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The default,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						stretch
					</code>
					, makes every cell as tall as its row; the others keep each cell’s own
					height.
				</p>
				<ComponentPreview title="stretch, start, center and end">
					<div className="w-full max-w-lg space-y-4">
						{(
							[
								'stretch',
								'start',
								'center',
								'end',
							] as const
						).map((align) => (
							<div
								className="space-y-1.5"
								key={align}
							>
								<code className="text-muted-foreground text-xs">
									align="{align}"
								</code>
								<Grid
									align={align}
									cols={3}
									gap="xs"
								>
									<Cell>1</Cell>
									<div className="rounded-lg bg-foreground/15 px-2 py-6 text-center text-xs">
										tall
									</div>
									<Cell>3</Cell>
								</Grid>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Gap</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One value drives both axes — there is no separate row and column gap.
				</p>
				<ComponentPreview title="Every gap step">
					<div className="w-full max-w-lg space-y-4">
						{(
							[
								'none',
								'xs',
								'sm',
								'md',
								'lg',
								'xl',
							] as const
						).map((gap) => (
							<div
								className="space-y-1.5"
								key={gap}
							>
								<code className="text-muted-foreground text-xs">
									gap="{gap}"
								</code>
								<Grid
									cols={4}
									gap={gap}
								>
									{cells(8).map((n) => (
										<Cell key={n}>{n}</Cell>
									))}
								</Grid>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Span</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Each row below is a twelve-column grid holding one spanning item
					followed by single-column filler, so you can read the span off the
					width.
				</p>
				<ComponentPreview title="Every span, on a twelve-column grid">
					<div className="w-full max-w-lg space-y-3">
						{SPANS.map((span) => (
							<div
								className="space-y-1.5"
								key={span}
							>
								<code className="text-muted-foreground text-xs">
									span={typeof span === 'number' ? `{${span}}` : `"${span}"`}
								</code>
								<Grid
									cols={12}
									gap="xs"
								>
									<Grid.Item span={span}>
										<Cell>{span}</Cell>
									</Grid.Item>
									{span !== 'full' &&
										cells(12 - span).map((n) => <Cell key={n}>·</Cell>)}
								</Grid>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A form on twelve columns
				</h2>
				<ComponentPreview title="Mixed spans">
					<div className="w-full max-w-lg">
						<Grid
							cols={12}
							gap="sm"
						>
							<Grid.Item span={8}>
								<Cell>Street — span 8</Cell>
							</Grid.Item>
							<Grid.Item span={4}>
								<Cell>Number — 4</Cell>
							</Grid.Item>
							<Grid.Item span={6}>
								<Cell>City — span 6</Cell>
							</Grid.Item>
							<Grid.Item span={3}>
								<Cell>State — 3</Cell>
							</Grid.Item>
							<Grid.Item span={3}>
								<Cell>Zip — 3</Cell>
							</Grid.Item>
							<Grid.Item span="full">
								<Cell>Notes — full</Cell>
							</Grid.Item>
						</Grid>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bento: rowSpan</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rowSpan
					</code>{' '}
					lets one tile take two rows beside two short ones. Narrow the window
					to see them stack.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The Card in the tall Grid.Item needs{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						height="full"
					</code>{' '}
					to fill the stretched cell.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="A two-row, two-column tile beside two short ones"
				>
					<Grid
						cols={{
							base: 1,
							md: 3,
						}}
						gap="md"
					>
						<Grid.Item
							rowSpan={{
								md: 2,
							}}
							span={{
								md: 2,
							}}
						>
							<Card height="full">
								<Card.Header>
									<Card.Title>Próximas saídas</Card.Title>
									<Card.Description>
										Grupos confirmados nesta semana
									</Card.Description>
								</Card.Header>
								<Card.Content>
									<Flex
										direction="col"
										gap="sm"
									>
										{DEPARTURES.map((departure) => (
											<Flex
												align="center"
												gap="md"
												justify="between"
												key={departure.trip}
											>
												<Typography
													size="sm"
													truncate
												>
													{departure.trip}
												</Typography>
												<Typography
													noWrap
													size="sm"
													variant="muted"
												>
													{departure.date}
												</Typography>
											</Flex>
										))}
									</Flex>
								</Card.Content>
							</Card>
						</Grid.Item>
						<Card>
							<Card.Content>
								<Stat
									hint="Últimos 30 dias"
									label="Reservas"
									value="1.284"
								/>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<Stat
									hint="Assentos vendidos / disponíveis"
									label="Ocupação"
									value="87%"
								/>
							</Card.Content>
						</Card>
					</Grid>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Order</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						order
					</code>{' '}
					moves a cell, not its DOM node; write the source in phone order.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Two feature rows, the second swapped from 768px"
				>
					<Flex
						direction="col"
						gap="xl"
					>
						{FEATURES.map((feature, index) => (
							<Grid
								align="center"
								cols={{
									base: 1,
									md: 2,
								}}
								gap="lg"
								key={feature.title}
							>
								<Grid.Item>
									<Flex
										direction="col"
										gap="xs"
									>
										<Typography
											component="h3"
											size="lg"
											weight="semibold"
										>
											{feature.title}
										</Typography>
										<Typography
											component="p"
											size="sm"
											variant="muted"
										>
											{feature.body}
										</Typography>
									</Flex>
								</Grid.Item>
								<Grid.Item
									order={
										index % 2 === 1
											? {
													base: 'last',
													md: 'first',
												}
											: undefined
									}
								>
									<div
										aria-hidden="true"
										className="flex h-32 items-center justify-center rounded-lg bg-muted text-muted-foreground text-xs"
									>
										{feature.image}
									</div>
								</Grid.Item>
							</Grid>
						))}
					</Flex>
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

export const Route = createFileRoute('/libs/react-web/components/grid')({
	component: Page,
})
