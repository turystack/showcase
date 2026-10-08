import { createFileRoute } from '@tanstack/react-router'
import { Container, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/container/container.types.ts`.
 * `centered: true` is the only entry in `defaultVariants`; `maxWidth` has no
 * default, so an unset container is `w-full` with no cap at all.
 *
 * The pixel figures below were taken from the Tailwind classes in
 * `container.tsx`, not from the doc comment in the types file — the comment
 * says "sm (640px)" and the class is `max-w-sm`, which is 384px.
 */
const containerProps = [
	{
		default: 'true',
		description: 'Applies mx-auto; off pins it to the left.',
		name: 'centered',
		type: 'boolean',
	},
	{
		description: 'DOM id on the div, an in-page anchor target.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Width cap; unset or full means no cap.',
		name: 'maxWidth',
		type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"',
	},
	{
		default: '"none"',
		description: 'Horizontal gutter inside the cap: sm 16px, md 24px, lg 32px.',
		name: 'paddingX',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		description: 'Text alignment for everything inside the container.',
		name: 'textAlign',
		type: '"left" | "center" | "right"',
	},
]

const usageCode = `import { Container } from '@turystack/react-web'

// The usual page wrapper
<Container maxWidth="lg">
  <PageHeader />
  <OrdersTable />
</Container>

// A narrow reading column
<Container maxWidth="md">
  <Article />
</Container>

// A centred empty state
<Container maxWidth="sm" textAlign="center">
  <EmptyState />
</Container>

// Left-aligned instead of centred
<Container centered={false} maxWidth="md">
  <Sidebar />
</Container>

// A landing section: gutter on phones, anchor target for #pricing
<Container id="pricing" maxWidth="lg" paddingX="sm">
  <PricingTiers />
</Container>

// Edge to edge — full removes the cap without removing the wrapper
<Container maxWidth="full">
  <HeroBanner />
</Container>`

const WIDTHS = [
	'xs',
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'full',
] as const

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Container
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Full width up to a cap, then centred, with an optional gutter inside.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Five props, no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					, no vertical padding; wrap it in a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">Box</code>{' '}
					for rhythm.
				</p>
				<PropsTable props={containerProps} />
			</section>

			<SlotsSection slug="container" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Max width</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Names don’t follow Tailwind breakpoints:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">sm</code>{' '}
					is 384px,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">md</code>{' '}
					768px. Read the pixels.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					A fixed 1600px canvas you scroll sideways, so all seven widths differ.
				</p>
				<ComponentPreview
					className="block items-stretch p-0"
					title="Every cap, on a 1600px canvas"
				>
					<div className="w-full overflow-x-auto p-6">
						<div className="w-[1600px] space-y-3">
							{WIDTHS.map((maxWidth) => (
								<Container
									key={maxWidth}
									maxWidth={maxWidth}
								>
									<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-center text-xs ring-1 ring-border">
										maxWidth="{maxWidth}"
									</div>
								</Container>
							))}
							<Container>
								<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-center text-xs ring-1 ring-border">
									no maxWidth — uncapped, same as "full"
								</div>
							</Container>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Centred</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						centered
					</code>{' '}
					is on unless you turn it off, and it only shows once a cap leaves
					spare room — an uncapped container has nothing to centre inside.
				</p>
				<ComponentPreview
					className="block items-stretch p-0"
					title="centered on and off"
				>
					<div className="w-full space-y-4 p-6">
						<div className="space-y-1.5">
							<code className="text-muted-foreground text-xs">
								centered (default)
							</code>
							<div className="rounded-lg ring-1 ring-border">
								<Container maxWidth="xs">
									<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-center text-xs">
										centred
									</div>
								</Container>
							</div>
						</div>
						<div className="space-y-1.5">
							<code className="text-muted-foreground text-xs">
								centered={'{false}'}
							</code>
							<div className="rounded-lg ring-1 ring-border">
								<Container
									centered={false}
									maxWidth="xs"
								>
									<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-center text-xs">
										pinned left
									</div>
								</Container>
							</div>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Gutter</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						paddingX
					</code>{' '}
					keeps text off the edge where the cap is wider than the screen. Frames
					are 360px wide.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="A 360px landing band, without and with paddingX"
				>
					<div className="flex flex-wrap justify-center gap-6">
						{(
							[
								'none',
								'sm',
							] as const
						).map((paddingX) => (
							<div
								className="flex w-full max-w-[360px] flex-col items-center gap-2"
								key={paddingX}
							>
								<div className="w-full overflow-hidden rounded-lg bg-muted py-8 ring-1 ring-border">
									<Container
										maxWidth="lg"
										paddingX={paddingX}
									>
										<Typography
											component="h3"
											size="xl"
											weight="bold"
										>
											Viaje sem planilhas
										</Typography>
										<Typography
											component="p"
											size="sm"
											variant="muted"
										>
											Reservas, pagamentos e vouchers da sua agência em um só
											lugar.
										</Typography>
									</Container>
								</div>
								<code className="text-muted-foreground text-xs">
									paddingX="{paddingX}"
								</code>
							</div>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Steps match <code>Layout</code>’s gutter, so it lines up with the
					header above a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'<Layout.Content padding="none">'}
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Text alignment</h2>
				<ComponentPreview
					className="block items-stretch p-0"
					title="left, center and right"
				>
					<div className="w-full space-y-3 p-6">
						{(
							[
								'left',
								'center',
								'right',
							] as const
						).map((textAlign) => (
							<div
								className="rounded-lg ring-1 ring-border"
								key={textAlign}
							>
								<Container
									maxWidth="md"
									textAlign={textAlign}
								>
									<p className="px-3 py-1.5 text-sm">textAlign="{textAlign}"</p>
								</Container>
							</div>
						))}
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

export const Route = createFileRoute('/libs/react-web/components/container')({
	component: Page,
})
