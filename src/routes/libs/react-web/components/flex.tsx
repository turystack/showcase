import { createFileRoute } from '@tanstack/react-router'
import { Flex } from '@turystack/react-web'
import type { ReactNode } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/flex/flex.types.ts`; the Default
 * column comes from `defaultVariants` in `flex.tsx`, which pins only
 * `direction`, `align` and `gap`.
 */
const flexProps = [
	{
		default: '"row"',
		description: 'flex-direction; the reverse values flip the visual order.',
		name: 'direction',
		type: '"row" | "col" | "row-reverse" | "col-reverse"',
	},
	{
		description: 'justify-content: free space along the main axis.',
		name: 'justify',
		type: '"start" | "end" | "center" | "between" | "around" | "evenly"',
	},
	{
		default: '"stretch"',
		description: 'align-items — how the children line up on the cross axis.',
		name: 'align',
		type: '"start" | "end" | "center" | "baseline" | "stretch"',
	},
	{
		default: '"none"',
		description: 'Gap: xs 4px, sm 8px, md 16px, lg 24px, xl 32px.',
		name: 'gap',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
	},
	{
		description: 'DOM id on the div, an in-page anchor target.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'flex-wrap; without it children squeeze onto one line.',
		name: 'wrap',
		type: '"wrap" | "nowrap" | "wrap-reverse"',
	},
	{
		description: 'Renders inline-flex, sitting in the text flow.',
		name: 'inline',
		type: 'boolean',
	},
	{
		description: 'Min height: sm 8rem, md 12rem, lg 16rem, screen viewport.',
		name: 'minHeight',
		type: '"sm" | "md" | "lg" | "screen"',
	},
	{
		description: 'Stretches it to the parent’s full width.',
		name: 'block',
		type: 'boolean',
	},
	{
		description: 'Hidden (display: none) from this breakpoint up.',
		name: 'hideAbove',
		type: '"sm" | "md" | "lg" | "xl"',
	},
	{
		description: 'Hidden below this breakpoint, a flex row from it on.',
		name: 'hideBelow',
		type: '"sm" | "md" | "lg" | "xl"',
	},
]

const usageCode = `import { Flex } from '@turystack/react-web'

// The everyday toolbar
<Flex align="center" block gap="md" justify="between">
  <h2>Orders</h2>
  <Button>New order</Button>
</Flex>

// A stack
<Flex direction="col" gap="sm">
  <Field label="Name" />
  <Field label="Email" />
</Flex>

// Centring something in a fixed area
<Flex align="center" justify="center" minHeight="md">
  <Loader />
</Flex>

// Wrapping tags
<Flex gap="xs" wrap="wrap">
  {tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
</Flex>

// A section that is also an anchor target (AnchorNav, #pricing links)
<Flex direction="col" gap="lg" id="pricing">
  <PricingTiers />
</Flex>

// Per breakpoint: the links from 768px up, a menu button below it
<Flex gap="md" hideBelow="md">{links}</Flex>
<Box hideAbove="md"><MenuButton /></Box>

// Sitting inside a sentence
Filter by <Flex align="center" gap="xs" inline><Icon /> status</Flex>.`

function Case({ children, label }: { children: ReactNode; label: string }) {
	return (
		<div className="w-full space-y-1.5">
			<code className="text-muted-foreground text-xs">{label}</code>
			<div className="rounded-lg ring-1 ring-border">{children}</div>
		</div>
	)
}

function Item({ children }: { children: ReactNode }) {
	return (
		<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-xs">
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
					Flex
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A flexbox container whose axis, spacing and alignment come from the
					token scale. The workhorse for rows, stacks and toolbars.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Flex takes these eleven props and nothing else — no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					, no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						style
					</code>
					, no event handlers.
				</p>
				<PropsTable props={flexProps} />
			</section>

			<SlotsSection slug="flex" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Direction</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The reverse values change the painted order, not the DOM order — tab
					focus and screen readers still walk one, two, three.
				</p>
				<ComponentPreview title="All four directions">
					<div className="w-full max-w-md space-y-4">
						{(
							[
								'row',
								'col',
								'row-reverse',
								'col-reverse',
							] as const
						).map((direction) => (
							<Case
								key={direction}
								label={`direction="${direction}"`}
							>
								<Flex
									block
									direction={direction}
									gap="sm"
								>
									<Item>one</Item>
									<Item>two</Item>
									<Item>three</Item>
								</Flex>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Justify</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						justify
					</code>{' '}
					only has anything to distribute when the container is wider than its
					children, which is why every row below also sets{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						block
					</code>
					.
				</p>
				<ComponentPreview title="All six distributions">
					<div className="w-full max-w-md space-y-4">
						{(
							[
								'start',
								'end',
								'center',
								'between',
								'around',
								'evenly',
							] as const
						).map((justify) => (
							<Case
								key={justify}
								label={`justify="${justify}"`}
							>
								<Flex
									block
									justify={justify}
								>
									<Item>one</Item>
									<Item>two</Item>
									<Item>three</Item>
								</Flex>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Align</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The default, stretch, pulls every child to the row’s full height —
					which is why unaligned rows look wrong.
				</p>
				<ComponentPreview title="All five alignments">
					<div className="w-full max-w-md space-y-4">
						{(
							[
								'start',
								'end',
								'center',
								'baseline',
								'stretch',
							] as const
						).map((align) => (
							<Case
								key={align}
								label={`align="${align}"`}
							>
								<Flex
									align={align}
									block
									gap="sm"
									minHeight="sm"
								>
									<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-lg">
										large
									</div>
									<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-xs">
										small
									</div>
									<div className="rounded-lg bg-foreground/15 px-3 py-1.5 text-sm">
										medium
									</div>
								</Flex>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Gap</h2>
				<ComponentPreview title="Every gap step">
					<div className="w-full max-w-md space-y-4">
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
							<Case
								key={gap}
								label={`gap="${gap}"`}
							>
								<Flex
									block
									gap={gap}
								>
									<Item>one</Item>
									<Item>two</Item>
									<Item>three</Item>
								</Flex>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Wrap</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Same eight chips, same 18rem column.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						nowrap
					</code>{' '}
					squeezes them;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						wrap-reverse
					</code>{' '}
					wraps upward.
				</p>
				<ComponentPreview title="wrap, nowrap and wrap-reverse">
					<div className="w-full max-w-[18rem] space-y-4">
						{(
							[
								'wrap',
								'nowrap',
								'wrap-reverse',
							] as const
						).map((wrap) => (
							<Case
								key={wrap}
								label={`wrap="${wrap}"`}
							>
								<Flex
									block
									gap="xs"
									wrap={wrap}
								>
									{[
										'one',
										'two',
										'three',
										'four',
										'five',
										'six',
										'seven',
										'eight',
									].map((chip) => (
										<Item key={chip}>{chip}</Item>
									))}
								</Flex>
							</Case>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Block</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A Flex already fills normal flow;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						block
					</code>{' '}
					matters inside a flex or grid parent, where it would shrink.
				</p>
				<ComponentPreview title="A Flex nested in another Flex">
					<div className="w-full max-w-md space-y-4">
						<Case label="without block">
							<Flex block>
								<Flex
									gap="sm"
									justify="between"
								>
									<Item>one</Item>
									<Item>two</Item>
								</Flex>
							</Flex>
						</Case>
						<Case label="with block">
							<Flex block>
								<Flex
									block
									gap="sm"
									justify="between"
								>
									<Item>one</Item>
									<Item>two</Item>
								</Flex>
							</Flex>
						</Case>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Inline</h2>
				<ComponentPreview title="inline-flex inside a sentence">
					<p className="max-w-sm text-sm">
						Showing orders filtered by{' '}
						<Flex
							align="center"
							gap="xs"
							inline
						>
							<span className="rounded-lg bg-foreground/15 px-2 py-0.5 text-xs">
								status
							</span>
							<span className="rounded-lg bg-foreground/15 px-2 py-0.5 text-xs">
								paid
							</span>
						</Flex>{' '}
						for the current month.
					</p>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Show and hide per breakpoint
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						hideBelow
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						hideAbove
					</code>{' '}
					read the window width. The rows below trade places at 768px.
				</p>
				<ComponentPreview title='hideBelow="md" and hideAbove="md"'>
					<div className="w-full max-w-md space-y-3">
						<Case label='hideBelow="md" — from 768px up'>
							<Flex
								gap="sm"
								hideBelow="md"
							>
								<Item>Destinos</Item>
								<Item>Pacotes</Item>
								<Item>Contato</Item>
							</Flex>
						</Case>
						<Case label='hideAbove="md" — below 768px'>
							<Flex
								gap="sm"
								hideAbove="md"
							>
								<Item>Menu</Item>
							</Flex>
						</Case>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Both props on one row show it only between them; hideBelow must be the
					smaller.
				</p>
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
							<div
								className="space-y-1.5"
								key={minHeight}
							>
								<code className="text-muted-foreground text-xs">
									minHeight="{minHeight}"
								</code>
								<div className="w-40 rounded-lg ring-1 ring-border">
									<Flex
										align="center"
										block
										justify="center"
										minHeight={minHeight}
									>
										<Item>{minHeight}</Item>
									</Flex>
								</div>
							</div>
						))}
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The fourth value,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						screen
					</code>
					, is a full viewport tall. It is the real thing below, seen through a
					16rem window you can scroll.
				</p>
				<ComponentPreview title='minHeight="screen", inside a scroll frame'>
					<div className="h-64 w-full max-w-md overflow-auto rounded-lg ring-1 ring-border">
						<Flex
							align="center"
							block
							justify="center"
							minHeight="screen"
						>
							<Item>centred in a viewport-tall row</Item>
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

export const Route = createFileRoute('/libs/react-web/components/flex')({
	component: Page,
})
