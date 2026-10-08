import { createFileRoute } from '@tanstack/react-router'
import { Button, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/typography/typography.types.ts`
 * and the `defaultVariants` in `typography.tsx`.
 *
 * `destructive` is a compound variant rather than an ordinary one, which is
 * what makes it work: `variant` always has a value, so an error colour emitted
 * from `variants` would land before `variant`'s own colour and tailwind-merge
 * would keep the later one. Emitted from `compoundVariants` it comes last.
 */
const typographyProps = [
	{
		default: '"span"',
		description: 'Rendered element; size never implies a heading level.',
		name: 'component',
		type: '"span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"',
	},
	{
		default: '"base"',
		description: 'Font size on the Tailwind scale; inherit sets none.',
		name: 'size',
		type: '"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | "inherit"',
	},
	{
		default: '"normal"',
		description: 'Font weight, nine steps; inherit sets none.',
		name: 'weight',
		type: '"thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black" | "inherit"',
	},
	{
		default: '"default"',
		description: 'Colour: foreground, muted, or inherit (paints none).',
		name: 'variant',
		type: '"default" | "muted" | "inherit"',
	},
	{
		description: 'Text alignment; needs a block-level component.',
		name: 'align',
		type: '"left" | "center" | "right"',
	},
	{
		description: 'Max width: xs 20rem, sm 24rem, md 28rem, lg 32rem.',
		name: 'maxWidth',
		type: '"xs" | "sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Centres the block (mx-auto), not the text.',
		name: 'centered',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'One line with an ellipsis; the parent sets the width.',
		name: 'truncate',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Keeps the text on one line without clipping it.',
		name: 'noWrap',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Error colour; wins over variant.',
		name: 'destructive',
		type: 'boolean',
	},
	{
		description: 'The text, or any nodes to wrap.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Typography } from '@turystack/react-web'

// A real heading — component is what the outline reads
<Typography component="h1" size="4xl" weight="bold">Reservas</Typography>

// Body copy at a readable measure
<Typography component="p" maxWidth="md" variant="muted">
  Cada reserva guarda o histórico completo de alterações.
</Typography>

// Centred block, centred text — two different props
<Typography align="center" centered component="p" maxWidth="sm">
  Centralizado dentro do container e alinhado ao centro.
</Typography>

// One line, ellipsis at the end
<div className="w-48">
  <Typography truncate>
    Um título longo demais para a coluna em que ele vive
  </Typography>
</div>

// Inside a control that already styles its text: inherit all three, so the
// button's size, weight and colour (hover and disabled included) reach it
<Button size="lg">
  <Typography size="inherit" variant="inherit" weight="inherit">
    Pagar agora
  </Typography>
</Button>`

const sizes = [
	'xs',
	'sm',
	'base',
	'lg',
	'xl',
	'2xl',
	'3xl',
	'4xl',
	'5xl',
	'6xl',
	'7xl',
	'8xl',
	'9xl',
] as const

const weights = [
	'thin',
	'extralight',
	'light',
	'normal',
	'medium',
	'semibold',
	'bold',
	'extrabold',
	'black',
] as const

const headings = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
] as const

const maxWidths = [
	'xs',
	'sm',
	'md',
	'lg',
] as const

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Typography
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One text primitive carrying the whole type scale.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={typographyProps} />
			</section>

			<SlotsSection slug="typography" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Thirteen steps. The top of the scale is display type — the last three
					are shown at a smaller sample so the preview stays readable.
				</p>
				<ComponentPreview title="xs through 3xl">
					<div className="flex w-full flex-col items-start gap-2">
						{sizes.slice(0, 7).map((size) => (
							<Typography
								key={size}
								size={size}
							>
								{size} — Reservas confirmadas
							</Typography>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="overflow-x-auto"
					title="4xl through 9xl"
				>
					<div className="flex w-full flex-col items-start gap-2">
						{sizes.slice(7).map((size) => (
							<Typography
								key={size}
								size={size}
							>
								{size}
							</Typography>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size="inherit"
					</code>{' '}
					takes the container's size; with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						variant
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						weight
					</code>{' '}
					inherit too, the control styles the words.
				</p>
				<ComponentPreview title="A label in a large button: default vs inherit">
					<div className="flex flex-wrap items-center gap-3">
						<Button size="lg">
							<Typography>Pagar agora</Typography>
						</Button>
						<Button size="lg">
							<Typography
								size="inherit"
								variant="inherit"
								weight="inherit"
							>
								Pagar agora
							</Typography>
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Weights</h2>
				<ComponentPreview title="All nine weights">
					<div className="flex w-full flex-col items-start gap-1">
						{weights.map((weight) => (
							<Typography
								key={weight}
								size="lg"
								weight={weight}
							>
								{weight} — Reservas confirmadas
							</Typography>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Colour</h2>
				<ComponentPreview title="default and muted">
					<div className="flex w-full flex-col items-start gap-1">
						<Typography
							size="lg"
							variant="default"
						>
							default — the foreground token
						</Typography>
						<Typography
							size="lg"
							variant="muted"
						>
							muted — the secondary token
						</Typography>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="text-foreground">Worth knowing:</strong>{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						destructive
					</code>{' '}
					wins over{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						variant
					</code>
					.
				</p>
				<ComponentPreview title="destructive, on its own and over a variant">
					<div className="flex w-full flex-col items-start gap-1">
						<Typography size="lg">default — the foreground colour</Typography>
						<Typography
							destructive
							size="lg"
						>
							destructive — the error colour
						</Typography>
						<Typography
							destructive
							size="lg"
							variant="muted"
						>
							destructive + muted — still the error colour
						</Typography>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Element</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						component
					</code>{' '}
					decides the tag and nothing else — every heading below renders at the
					same size, and a screen reader still walks them as h1 to h6.
				</p>
				<ComponentPreview title="h1 to h6, plus p, span and div">
					<div className="flex w-full flex-col items-start gap-1">
						{headings.map((heading) => (
							<Typography
								component={heading}
								key={heading}
								size="lg"
								weight="semibold"
							>
								&lt;{heading}&gt; at size lg
							</Typography>
						))}
						<Typography
							component="p"
							size="lg"
						>
							&lt;p&gt; — block, so align and maxWidth work on it
						</Typography>
						<Typography
							component="div"
							size="lg"
						>
							&lt;div&gt; — block, and takes any children
						</Typography>
						<Typography
							component="span"
							size="lg"
						>
							&lt;span&gt; — the default, inline
						</Typography>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Measure</h2>
				<ComponentPreview title="maxWidth, on a paragraph">
					<div className="flex w-full flex-col items-start gap-4">
						{maxWidths.map((maxWidth) => (
							<Typography
								component="p"
								key={maxWidth}
								maxWidth={maxWidth}
								variant="muted"
							>
								<span className="text-foreground">{maxWidth}</span> — cada
								reserva guarda o histórico completo de alterações, incluindo
								quem alterou e quando.
							</Typography>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						align
					</code>{' '}
					moves the text inside the box;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						centered
					</code>{' '}
					moves the box inside its container. The dashed outline below is the
					box.
				</p>
				<ComponentPreview title="align against centered">
					<div className="flex w-full flex-col gap-3">
						<Typography
							align="left"
							component="p"
							maxWidth="xs"
						>
							<span className="block border border-border border-dashed">
								align="left"
							</span>
						</Typography>
						<Typography
							align="center"
							component="p"
							maxWidth="xs"
						>
							<span className="block border border-border border-dashed">
								align="center"
							</span>
						</Typography>
						<Typography
							align="right"
							component="p"
							maxWidth="xs"
						>
							<span className="block border border-border border-dashed">
								align="right"
							</span>
						</Typography>
						<Typography
							align="center"
							centered
							component="p"
							maxWidth="xs"
						>
							<span className="block border border-border border-dashed">
								centered — the box itself moved
							</span>
						</Typography>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Truncation</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						truncate
					</code>{' '}
					clips to one line. The parent needs a width, or nothing gets clipped.
				</p>
				<ComponentPreview title="Bounded and unbounded">
					<div className="flex w-full flex-col gap-4">
						<div className="w-56 rounded-lg border border-border border-dashed p-2">
							<Typography truncate>
								Reserva 4821 — João Gabriel da Silva, ida e volta
							</Typography>
						</div>
						<div className="rounded-lg border border-border border-dashed p-2">
							<Typography truncate>
								Reserva 4821 — João Gabriel da Silva, ida e volta. Same prop, no
								width to clip against, so nothing happens.
							</Typography>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">noWrap</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One line, nothing hidden. Where truncate trades the end of the text
					for the line, noWrap keeps all of it and lets the row make room.
				</p>
				<ComponentPreview title="Wrapping against noWrap, in a narrow box">
					<div className="flex w-full flex-col gap-4">
						<div className="w-24 rounded-lg border border-border border-dashed p-2">
							<Typography size="sm">128 members</Typography>
						</div>
						<div className="w-24 rounded-lg border border-border border-dashed p-2">
							<Typography
								noWrap
								size="sm"
							>
								128 members
							</Typography>
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

export const Route = createFileRoute('/libs/react-web/components/typography')({
	component: Page,
})
