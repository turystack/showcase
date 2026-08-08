import { createFileRoute } from '@tanstack/react-router'
import { Provider, Typography } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const typographyProps = [
	{
		default: '"p"',
		description: 'The HTML element to render as.',
		name: 'component',
		type: '"span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"',
	},
	{
		default: '"base"',
		description: 'The font size of the text.',
		name: 'size',
		type: '"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"',
	},
	{
		default: '"default"',
		description: 'The color variant of the text.',
		name: 'variant',
		type: '"default" | "muted"',
	},
	{
		default: '"normal"',
		description: 'The font weight of the text.',
		name: 'weight',
		type: '"thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"',
	},
	{
		default: 'false',
		description: 'When true, truncates overflowing text with an ellipsis.',
		name: 'truncate',
		type: 'boolean',
	},
]

const usageCode = `import { Typography } from '@turystack/ui'

// Headings
<Typography component="h1" size="4xl" weight="bold">Heading 1</Typography>
<Typography component="h2" size="3xl" weight="semibold">Heading 2</Typography>
<Typography component="h3" size="2xl" weight="medium">Heading 3</Typography>

// Body text
<Typography size="base">Regular paragraph text.</Typography>
<Typography size="sm" variant="muted">Small muted text.</Typography>

// Truncate
<Typography truncate>
  This is a very long text that will be truncated with an ellipsis when it overflows.
</Typography>

// Weights
<Typography weight="bold">Bold text</Typography>
<Typography weight="light">Light text</Typography>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Typography
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A polymorphic text component for rendering styled text with
						consistent sizing, weight, and color variants.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={typographyProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Text sizes">
						<div className="flex flex-col gap-2">
							{(
								[
									'xs',
									'sm',
									'base',
									'lg',
									'xl',
									'2xl',
									'3xl',
									'4xl',
								] as const
							).map((size) => (
								<Typography
									key={size}
									size={size}
								>
									Size {size}
								</Typography>
							))}
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Weights</h2>
					<ComponentPreview title="Font weights">
						<div className="flex flex-col gap-2">
							{(
								[
									'light',
									'normal',
									'medium',
									'semibold',
									'bold',
									'extrabold',
								] as const
							).map((weight) => (
								<Typography
									key={weight}
									weight={weight}
								>
									Weight {weight}
								</Typography>
							))}
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Variants</h2>
					<ComponentPreview title="Color variants">
						<div className="flex flex-col gap-2">
							<Typography variant="default">Default color text</Typography>
							<Typography variant="muted">Muted color text</Typography>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Truncate</h2>
					<ComponentPreview title="Truncated text">
						<div className="w-64">
							<Typography truncate>
								This is a very long text that will be truncated with an ellipsis
								when it overflows its container.
							</Typography>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/typography')({
	component: Page,
})
