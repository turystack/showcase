import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/badge/badge.types.ts` and the
 * `defaultVariants` in `badge.tsx`.
 *
 * `onClick` makes the badge a real `<button>` — see the Clickable section.
 * `asChild` clones the badge's classes and click handling onto its single
 * child element instead of wrapping it in a span or button.
 */
const badgeProps = [
	{
		default: '"default"',
		description: 'Style: semantic, status tints, solid fills or named hues.',
		name: 'variant',
		type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "solid" | "solid-destructive" | "solid-success" | "solid-info" | "purple" | "pink" | "teal" | "orange"',
	},
	{
		default: '"md"',
		description: 'Height, padding, type scale, gap and spinner size.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"center"',
		description: 'Content alignment; visible only with block.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
	{
		default: 'false',
		description: 'Fills the container width; otherwise w-fit.',
		name: 'block',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Centred spinner, hidden content and aria-busy.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Styles its single child element instead of a wrapper.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Click handler; renders a real <button type="button">.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLElement>',
	},
	{
		description: 'The label, and any icon you put beside it.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Badge } from '@turystack/react-web'

// Semantic variants
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>

// Status tints
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>

// Solid fills
<Badge variant="solid">Solid</Badge>
<Badge variant="solid-destructive">Solid destructive</Badge>
<Badge variant="solid-success">Solid success</Badge>
<Badge variant="solid-info">Solid info</Badge>

// Named hues
<Badge variant="purple">Purple</Badge>
<Badge variant="pink">Pink</Badge>
<Badge variant="teal">Teal</Badge>
<Badge variant="orange">Orange</Badge>

// Sizes — 16px, 20px and 24px tall
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// Full width, with the content pushed to one side
<Badge align="start" block>Start</Badge>
<Badge align="center" block>Center</Badge>
<Badge align="end" block>End</Badge>

// Loading — the label stays in the DOM, just invisible under the spinner
<Badge loading>Syncing</Badge>

// Clickable
<Badge onClick={() => setCount((n) => n + 1)}>Click me</Badge>`

const variants = [
	'default',
	'secondary',
	'destructive',
	'outline',
	'success',
	'warning',
	'info',
	'solid',
	'solid-destructive',
	'solid-success',
	'solid-info',
	'purple',
	'pink',
	'teal',
	'orange',
] as const

const sizes = [
	'sm',
	'md',
	'lg',
] as const

function Page() {
	const [count, setCount] = useState(0)
	const [busyCount, setBusyCount] = useState(0)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Badge
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A small rounded-lg label for a status, a count or a category.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={badgeProps} />
			</section>

			<SlotsSection slug="badge" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Semantic, status tints, solid fills and four named hues. Status
					variants use theme tokens; only the named hues are fixed colours.
				</p>
				<ComponentPreview title="All fifteen variants">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{variants.map((variant) => (
							<Badge
								key={variant}
								variant={variant}
							>
								{variant}
							</Badge>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Three fixed heights — 16px, 20px and 24px — each with its own padding
					and type scale, so a badge beside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">sm</code>{' '}
					button does not tower over it.
				</p>
				<ComponentPreview title="sm, md and lg">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{sizes.map((size) => (
							<Badge
								key={size}
								size={size}
							>
								{size}
							</Badge>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview title="The spinner scales with the badge">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{sizes.map((size) => (
							<Badge
								key={size}
								loading
								size={size}
								variant="outline"
							>
								Syncing
							</Badge>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="text-foreground">Worth knowing:</strong> an icon
					you pass as a child keeps whatever size it came with.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Layout</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A badge is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						w-fit
					</code>
					, so{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						align
					</code>{' '}
					shows only with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						block
					</code>
					.
				</p>
				<ComponentPreview title="align, with block">
					<div className="w-full max-w-sm space-y-2">
						<Badge
							align="start"
							block
							variant="outline"
						>
							start
						</Badge>
						<Badge
							align="center"
							block
							variant="outline"
						>
							center
						</Badge>
						<Badge
							align="end"
							block
							variant="outline"
						>
							end
						</Badge>
					</div>
				</ComponentPreview>
				<ComponentPreview title="align, without block — no visible difference">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Badge align="start">start</Badge>
						<Badge align="center">center</Badge>
						<Badge align="end">end</Badge>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Loading</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					loading hides the label and lays a spinner over it, so the badge keeps
					its width.
				</p>
				<ComponentPreview title="Loading, across variants">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Badge loading>Syncing</Badge>
						<Badge
							loading
							variant="secondary"
						>
							A much longer label
						</Badge>
						<Badge
							loading
							variant="outline"
						>
							Outline
						</Badge>
						<Badge
							loading
							variant="solid-success"
						>
							Solid
						</Badge>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Clickable</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onClick
					</code>{' '}
					renders a real{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;button type="button"&gt;
					</code>
					; without it, a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;span&gt;
					</code>
					.
				</p>
				<ComponentPreview title="onClick">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Badge onClick={() => setCount((n) => n + 1)}>Add one</Badge>
						<span className="text-muted-foreground text-sm">
							clicked {count} time{count === 1 ? '' : 's'}
						</span>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="text-foreground">Worth knowing:</strong>{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					hides the label and disables the button.
				</p>
				<ComponentPreview title="loading disables the button">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Badge
							loading
							onClick={() => setBusyCount((n) => n + 1)}
						>
							Add one
						</Badge>
						<span className="text-muted-foreground text-sm">
							clicked {busyCount} time{busyCount === 1 ? '' : 's'} while busy
						</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">asChild</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						asChild
					</code>{' '}
					puts the badge classes on its single child: here a real{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;a&gt;
					</code>
					.
				</p>
				<ComponentPreview title="asChild, onto a link">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Badge
							asChild
							variant="outline"
						>
							<a href="/orders">Go to orders</a>
						</Badge>
					</div>
				</ComponentPreview>
				<ComponentPreview title="asChild, loading">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Badge
							asChild
							loading
							variant="outline"
						>
							<a href="/orders">Go to orders</a>
						</Badge>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Removable? Use Tag
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A badge has no ×; with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onClick
					</code>{' '}
					it is already a button. For a removable chip, use{' '}
					<Link
						className="font-medium text-foreground underline underline-offset-4"
						to="/libs/react-web/components/tag"
					>
						Tag
					</Link>
					.
				</p>
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

export const Route = createFileRoute('/libs/react-web/components/badge')({
	component: Page,
})
