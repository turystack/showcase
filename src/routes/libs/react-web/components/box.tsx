import { createFileRoute } from '@tanstack/react-router'
import { MenuIcon } from '@turystack/react-icons'
import {
	Badge,
	Box,
	Button,
	Container,
	Flex,
	Layout,
	SegmentedControl,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/box/box.types.ts`. The `tv()` call
 * in `box.tsx` declares no `defaultVariants`, so every prop is genuinely
 * optional and the Default column is empty on purpose — an unset prop emits no
 * class at all rather than falling back to a neutral one.
 */
const boxProps = [
	{
		description: 'Background colour from the theme tokens.',
		name: 'bg',
		type: '"background" | "muted" | "card"',
	},
	{
		description: 'flex-grow: 1; takes a flex parent’s free space.',
		name: 'grow',
		type: 'boolean',
	},
	{
		description: 'Hidden (display: none) from this breakpoint up.',
		name: 'hideAbove',
		type: '"sm" | "md" | "lg" | "xl"',
	},
	{
		description: 'Hidden below this breakpoint, a block from it on.',
		name: 'hideBelow',
		type: '"sm" | "md" | "lg" | "xl"',
	},
	{
		description: 'DOM id on the div, an in-page anchor target.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Min height: sm 8rem, md 12rem, lg 16rem, screen viewport.',
		name: 'minHeight',
		type: '"sm" | "md" | "lg" | "screen"',
	},
	{
		description: 'CSS overflow; visible once something caps the size.',
		name: 'overflow',
		type: '"hidden" | "visible" | "auto"',
	},
	{
		default: '"none" (when sticky)',
		description: 'Where a sticky box pins: container top, or under the header.',
		name: 'offset',
		type: '"none" | "header"',
	},
	{
		description: 'Padding on all sides, none 0 to 3xl 96px.',
		name: 'padding',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"',
	},
	{
		description: 'Horizontal padding; overrides padding on the x axis.',
		name: 'paddingX',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"',
	},
	{
		description: 'Vertical padding; overrides padding on the y axis.',
		name: 'paddingY',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"',
	},
	{
		description: 'CSS position; sticky pins a bar above the content (z-30).',
		name: 'position',
		type: '"static" | "relative" | "absolute" | "sticky"',
	},
	{
		description: 'Corner radius from the theme’s --radius; full is a pill.',
		name: 'rounded',
		type: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
	},
	{
		description: 'Text alignment for everything inside the box.',
		name: 'textAlign',
		type: '"left" | "center" | "right"',
	},
	{
		description: 'Width: auto shrinks to content, full fills the parent.',
		name: 'width',
		type: '"auto" | "full"',
	},
]

const usageCode = `import { Box } from '@turystack/react-web'

// Spacing
<Box padding="md">Even padding on all sides</Box>
<Box padding="md" paddingX="xl">Wider on the x axis</Box>
<Box paddingY="lg">Vertical only</Box>

// Surface
<Box bg="card" padding="lg" rounded="lg">A card-coloured panel</Box>
<Box bg="muted" padding="md" rounded="full">A pill</Box>

// Sizing
<Box minHeight="md" width="full">At least 12rem tall</Box>
<Box overflow="auto" width="full">Scrolls when it is capped</Box>

// Positioning — relative parent, absolute child
<Box position="relative" minHeight="sm" width="full">
  <Box position="absolute" padding="sm">Pinned to the corner</Box>
</Box>

// Inside a flex parent
<Flex gap="md">
  <Box padding="md">Natural width</Box>
  <Box grow padding="md">Takes the rest</Box>
</Flex>

// Text
<Box padding="md" textAlign="center">Centred</Box>

// A landing band that is also an anchor target
<Box bg="muted" id="pricing" paddingY="3xl">
  <Container maxWidth="lg" paddingX="sm">…</Container>
</Box>

// A sticky filter bar below a sticky app header
<Box bg="background" offset="header" paddingY="sm" position="sticky">
  <Filters />
</Box>

// Per breakpoint: links from 768px up, a menu button below it
<Flex gap="md" hideBelow="md">{links}</Flex>
<Box hideAbove="md">
  <Button ariaLabel="Abrir menu" size="icon-md" variant="ghost">
    <MenuIcon />
  </Button>
</Box>`

const stickyHeaderCode = `import { Box, Layout } from '@turystack/react-web'

// A window-scrolled page: the header is sticky, the bar pins below it
<Layout.Header sticky condenseOnScroll>Checkout</Layout.Header>
<Box bg="background" offset="header" paddingY="sm" position="sticky">
  <OrderSummary />
</Box>
<Rows />

// Inside a Layout shell: Layout.Content scrolls, the header is outside it,
// so the default offset already pins the bar right under it
<Layout.Content>
  <Box bg="background" paddingY="sm" position="sticky">
    <Filters />
  </Box>
  <Rows />
</Layout.Content>`

type OrderStatus = 'todos' | 'pagos' | 'pendentes'

const ORDER_STATUSES: {
	label: string
	value: OrderStatus
}[] = [
	{
		label: 'Todos',
		value: 'todos',
	},
	{
		label: 'Pagos',
		value: 'pagos',
	},
	{
		label: 'Pendentes',
		value: 'pendentes',
	},
]

const ORDERS = [
	'Lisboa e Porto — 7 noites',
	'Gramado no inverno',
	'Buenos Aires gastronômico',
	'Fernando de Noronha',
	'Santiago e Valle Nevado',
	'Jericoacoara — pacote casal',
	'Cusco e Machu Picchu',
	'Bonito ecoturismo',
	'Chapada Diamantina',
	'Foz do Iguaçu — família',
	'Lençóis Maranhenses',
	'Salvador e Morro de São Paulo',
].map((trip, index) => ({
	id: `#${4810 + index}`,
	paid: index % 3 !== 1,
	trip,
}))

/**
 * A Layout shell in a frame (docs chrome). height="fill" makes the shell as
 * tall as the frame; Layout.Content is the pane that scrolls, so the sticky
 * Box pins at its top, directly under the header that sits outside it.
 */
function StickyFilterShell() {
	const [status, setStatus] = useState<OrderStatus>('todos')
	const rows = ORDERS.filter((order) =>
		status === 'todos' ? true : (status === 'pagos') === order.paid,
	)

	return (
		<div className="h-96 overflow-clip rounded-lg border border-border">
			<Layout height="fill">
				<Layout.Header bordered>
					<Typography weight="semibold">Pedidos</Typography>
				</Layout.Header>
				<Layout.Main>
					<Layout.Content paddingVertical="none">
						<Box
							bg="background"
							paddingY="sm"
							position="sticky"
						>
							<SegmentedControl
								ariaLabel="Situação do pagamento"
								onChange={setStatus}
								optionLabel="label"
								options={ORDER_STATUSES}
								optionValue="value"
								size="sm"
								value={status}
							/>
						</Box>
						<Flex
							direction="col"
							gap="sm"
						>
							{rows.map((order) => (
								<Box
									bg="muted"
									key={order.id}
									padding="md"
									rounded="md"
									width="full"
								>
									<Flex
										align="center"
										gap="md"
										justify="between"
									>
										<Typography
											size="sm"
											truncate
										>
											{order.id} · {order.trip}
										</Typography>
										<Badge variant={order.paid ? 'success' : 'warning'}>
											{order.paid ? 'Pago' : 'Pendente'}
										</Badge>
									</Flex>
								</Box>
							))}
						</Flex>
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</div>
	)
}

function Case({ children, label }: { children: ReactNode; label: string }) {
	return (
		<div className="flex flex-col items-center gap-2">
			{children}
			<code className="text-muted-foreground text-xs">{label}</code>
		</div>
	)
}

function Fill({ children = 'content' }: { children?: ReactNode }) {
	return (
		<div className="rounded-lg bg-foreground/15 px-3 py-1 text-xs">
			{children}
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Box
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A plain <code>div</code> whose spacing, surface, radius and
					positioning are chosen from design tokens instead of written as
					arbitrary CSS.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Fifteen props: no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					, no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						style
					</code>
					, no event handlers.
				</p>
				<PropsTable props={boxProps} />
			</section>

			<SlotsSection slug="box" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Padding</h2>
				<ComponentPreview title="Every padding step">
					<div className="flex flex-wrap items-end justify-center gap-4">
						{(
							[
								'none',
								'xs',
								'sm',
								'md',
								'lg',
								'xl',
								'2xl',
								'3xl',
							] as const
						).map((step) => (
							<Case
								key={step}
								label={step}
							>
								<Box
									bg="muted"
									padding={step}
									rounded="md"
								>
									<Fill />
								</Box>
							</Case>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						paddingX
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						paddingY
					</code>{' '}
					replace{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						padding
					</code>{' '}
					on their axis.
				</p>
				<ComponentPreview title="Axis overrides">
					<div className="flex flex-wrap items-end justify-center gap-4">
						<Case label='padding="md"'>
							<Box
								bg="muted"
								padding="md"
								rounded="md"
							>
								<Fill />
							</Box>
						</Case>
						<Case label='padding="md" paddingX="xl" paddingY="xs"'>
							<Box
								bg="muted"
								padding="md"
								paddingX="xl"
								paddingY="xs"
								rounded="md"
							>
								<Fill />
							</Box>
						</Case>
						<Case label='paddingY="lg"'>
							<Box
								bg="muted"
								paddingY="lg"
								rounded="md"
							>
								<Fill />
							</Box>
						</Case>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Background</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						background
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						card
					</code>{' '}
					match in light theme; the outline keeps them visible.
				</p>
				<ComponentPreview title="All three surfaces">
					<div className="flex flex-wrap items-end justify-center gap-4">
						{(
							[
								'background',
								'muted',
								'card',
							] as const
						).map((bg) => (
							<Case
								key={bg}
								label={bg}
							>
								<div className="rounded-md ring-1 ring-border">
									<Box
										bg={bg}
										padding="lg"
										rounded="md"
									>
										<Fill>{bg}</Fill>
									</Box>
								</div>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Radius</h2>
				<ComponentPreview title="Every radius step">
					<div className="flex flex-wrap items-end justify-center gap-4">
						{(
							[
								'none',
								'sm',
								'md',
								'lg',
								'xl',
								'full',
							] as const
						).map((rounded) => (
							<Case
								key={rounded}
								label={rounded}
							>
								<Box
									bg="muted"
									padding="lg"
									rounded={rounded}
								>
									<Fill>{rounded}</Fill>
								</Box>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Width</h2>
				<ComponentPreview title="auto and full">
					<div className="w-full max-w-md space-y-4">
						<div className="rounded-lg ring-1 ring-border">
							<Box
								bg="muted"
								padding="md"
								rounded="md"
								width="auto"
							>
								<Fill>width="auto" — shrinks to its content</Fill>
							</Box>
						</div>
						<div className="rounded-lg ring-1 ring-border">
							<Box
								bg="muted"
								padding="md"
								rounded="md"
								width="full"
							>
								<Fill>width="full" — fills the parent</Fill>
							</Box>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Minimum height</h2>
				<ComponentPreview title="sm, md and lg">
					<div className="flex flex-wrap items-start justify-center gap-4">
						{(
							[
								'sm',
								'md',
								'lg',
							] as const
						).map((minHeight) => (
							<Case
								key={minHeight}
								label={minHeight}
							>
								<Box
									bg="muted"
									minHeight={minHeight}
									padding="md"
									rounded="md"
								>
									<Fill>{minHeight}</Fill>
								</Box>
							</Case>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						screen
					</code>{' '}
					is a full viewport tall, seen here through a scrollable 16rem window.
				</p>
				<ComponentPreview title='minHeight="screen", inside a scroll frame'>
					<div className="h-64 w-full max-w-md overflow-auto rounded-lg ring-1 ring-border">
						<Box
							bg="muted"
							minHeight="screen"
							padding="md"
							width="full"
						>
							<Fill>the top of a viewport-tall box</Fill>
						</Box>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Overflow</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						overflow
					</code>{' '}
					shows once a parent constrains the box: same 14rem column, same
					over-wide child.
				</p>
				<ComponentPreview title="hidden, visible and auto against a narrow parent">
					<div className="flex flex-wrap items-start justify-center gap-6">
						{(
							[
								'hidden',
								'visible',
								'auto',
							] as const
						).map((overflow) => (
							<Case
								key={overflow}
								label={overflow}
							>
								<div className="w-56 rounded-lg ring-1 ring-border">
									<Box
										bg="muted"
										overflow={overflow}
										padding="sm"
										rounded="md"
										width="full"
									>
										<div className="w-96 rounded-lg bg-foreground/15 px-3 py-1 text-xs">
											a child that is far wider than its column
										</div>
									</Box>
								</div>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Position</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						static
					</code>{' '}
					is what a div does anyway; it exists so a nested box can opt back out
					of a positioned ancestor.
				</p>
				<ComponentPreview title="An absolute box inside a relative one">
					<div className="w-full max-w-md">
						<Box
							bg="muted"
							minHeight="sm"
							padding="md"
							position="relative"
							rounded="lg"
							width="full"
						>
							<Fill>position="relative" — the anchor</Fill>
							<Box
								bg="card"
								padding="sm"
								position="absolute"
								rounded="md"
							>
								<span className="text-xs">position="absolute"</span>
							</Box>
						</Box>
					</div>
				</ComponentPreview>
				<ComponentPreview title='position="static"'>
					<Box
						bg="muted"
						padding="md"
						position="static"
						rounded="md"
					>
						<Fill>static — normal flow</Fill>
					</Box>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sticky surfaces</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						position="sticky"
					</code>{' '}
					pins a bar above the rows (z-30). Give it a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">bg</code>,
					or rows show through.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Inside a <code>Layout</code>, the default{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						offset="none"
					</code>{' '}
					pins under the header. Scroll the orders.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="A sticky filter bar under the Layout.Header"
				>
					<StickyFilterShell />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					When the window scrolls,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						offset="header"
					</code>{' '}
					pins below the sticky header. It can’t run in a preview here.
				</p>
				<CodeBlock
					code={stickyHeaderCode}
					filename="checkout.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Show and hide per breakpoint
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The pair swaps a header’s links for a menu button. Narrow the window
					below 768px to see them trade places.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Header links and menu button swap at md"
				>
					<div className="rounded-lg border border-border">
						<Flex
							align="center"
							justify="between"
						>
							<Box padding="md">
								<Typography weight="semibold">Turystack Viagens</Typography>
							</Box>
							<Box paddingX="md">
								<Flex
									gap="xs"
									hideBelow="md"
								>
									<Button variant="ghost">Destinos</Button>
									<Button variant="ghost">Pacotes</Button>
									<Button variant="ghost">Contato</Button>
								</Flex>
								<Box hideAbove="md">
									<Button
										ariaLabel="Abrir menu"
										size="icon-md"
										variant="ghost"
									>
										<MenuIcon />
									</Button>
								</Box>
							</Box>
						</Flex>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						hideBelow="sm" hideAbove="lg"
					</code>{' '}
					is a tablet-only box; hideBelow must be smaller.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Section rhythm and anchors
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">2xl</code>{' '}
					(64px) and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">3xl</code>{' '}
					(96px) are landing-page rhythm. The band’s{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					is an anchor target.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title={'A landing band: bg="muted" paddingY="3xl"'}
				>
					<Box
						bg="muted"
						id="box-demo-precos"
						paddingY="3xl"
						rounded="lg"
						textAlign="center"
						width="full"
					>
						<Container
							maxWidth="sm"
							paddingX="sm"
						>
							<Flex
								align="center"
								direction="col"
								gap="md"
							>
								<Typography
									component="h3"
									size="3xl"
									weight="bold"
								>
									Um plano para cada tamanho de agência
								</Typography>
								<Typography
									component="p"
									variant="muted"
								>
									Comece grátis com até 50 reservas por mês. Pague só quando o
									seu volume crescer.
								</Typography>
								<Button>Ver planos</Button>
							</Flex>
						</Container>
					</Box>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Text alignment</h2>
				<ComponentPreview title="left, center and right">
					<div className="w-full max-w-md space-y-3">
						{(
							[
								'left',
								'center',
								'right',
							] as const
						).map((textAlign) => (
							<Box
								bg="muted"
								key={textAlign}
								padding="md"
								rounded="md"
								textAlign={textAlign}
								width="full"
							>
								<span className="text-sm">textAlign="{textAlign}"</span>
							</Box>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Grow</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						grow
					</code>{' '}
					needs a flex parent; only the second box claims the leftover room.
				</p>
				<ComponentPreview title="Without and with grow">
					<div className="w-full max-w-md space-y-4">
						<Flex
							block
							gap="sm"
						>
							<Box
								bg="muted"
								padding="md"
								rounded="md"
							>
								<Fill>plain</Fill>
							</Box>
							<Box
								bg="muted"
								padding="md"
								rounded="md"
							>
								<Fill>plain</Fill>
							</Box>
						</Flex>
						<Flex
							block
							gap="sm"
						>
							<Box
								bg="muted"
								padding="md"
								rounded="md"
							>
								<Fill>plain</Fill>
							</Box>
							<Box
								bg="muted"
								grow
								padding="md"
								rounded="md"
							>
								<Fill>grow</Fill>
							</Box>
						</Flex>
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

export const Route = createFileRoute('/libs/react-web/components/box')({
	component: Page,
})
