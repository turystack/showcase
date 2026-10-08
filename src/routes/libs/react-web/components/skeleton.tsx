import { createFileRoute } from '@tanstack/react-router'
import { Skeleton } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/skeleton/skeleton.types.ts`. There
 * are three, and all three are tokens — the component takes no `className` and
 * no `style`, so the size scale below is the whole interface.
 */
const skeletonProps = [
	{
		default: `'sm'`,
		description: 'Height: xs 8, sm 16, md 24, lg 40, xl 80px, or full.',
		name: 'height',
		type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'`,
	},
	{
		default: `'rectangle'`,
		description: 'Corners: rectangle, text line, or a 1:1 circle.',
		name: 'shape',
		type: `'rectangle' | 'circle' | 'text'`,
	},
	{
		default: `'full'`,
		description: 'Width: xs 16, sm 64, md 128, lg 192, xl 256px, or full.',
		name: 'width',
		type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'`,
	},
]

const usageCode = `import { Skeleton } from '@turystack/react-web'

// A default skeleton is already visible: 16px tall, full width
<Skeleton />

// A line of text
<Skeleton shape="text" width="lg" />

// A circular avatar — width comes from the height
<Skeleton height="lg" shape="circle" />

// A block
<Skeleton height="xl" />

// A row of a list, announced as one busy region
<div aria-busy="true" className="flex items-center gap-3" role="status">
  <Skeleton height="lg" shape="circle" />
  <div className="w-full space-y-2">
    <Skeleton shape="text" width="lg" />
    <Skeleton height="xs" shape="text" width="md" />
  </div>
</div>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Skeleton
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A pulsing grey box that stands in for content that has not arrived.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={skeletonProps} />
			</section>

			<SlotsSection slug="skeleton" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Shaping it</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The placeholder is sized through{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						height
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width
					</code>
					, both of which take one of six tokens.
				</p>
				<ComponentPreview title="The height scale">
					<div className="flex w-full max-w-md flex-col items-start gap-4">
						<Skeleton height="xs" />
						<Skeleton height="sm" />
						<Skeleton height="md" />
						<Skeleton height="lg" />
						<Skeleton height="xl" />
					</div>
				</ComponentPreview>
				<ComponentPreview title="The width scale">
					<div className="flex w-full max-w-md flex-col items-start gap-4">
						<Skeleton width="xs" />
						<Skeleton width="sm" />
						<Skeleton width="md" />
						<Skeleton width="lg" />
						<Skeleton width="xl" />
						<Skeleton width="full" />
					</div>
				</ComponentPreview>
				<ComponentPreview title="Shapes">
					<div className="flex w-full max-w-md flex-col items-start gap-4">
						<Skeleton
							shape="rectangle"
							width="lg"
						/>
						<Skeleton
							shape="text"
							width="md"
						/>
						<Skeleton
							height="lg"
							shape="circle"
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						circle
					</code>{' '}
					takes its diameter from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						height
					</code>{' '}
					and holds a 1:1 ratio, so any{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width
					</code>{' '}
					passed alongside it is ignored.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					In place of content
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A skeleton is worth more when it matches the layout it replaces — same
					widths, same gaps, so nothing jumps when the data lands.
				</p>
				<ComponentPreview title="A list row and a card">
					<div className="w-full max-w-md space-y-6">
						<div
							aria-busy="true"
							className="flex items-center gap-3"
							role="status"
						>
							<Skeleton
								height="lg"
								shape="circle"
							/>
							<div className="w-full space-y-2">
								<Skeleton
									shape="text"
									width="lg"
								/>
								<Skeleton
									height="xs"
									shape="text"
									width="md"
								/>
							</div>
						</div>
						<div
							aria-busy="true"
							className="space-y-3 rounded-lg border border-border p-4"
							role="status"
						>
							<Skeleton height="xl" />
							<Skeleton
								shape="text"
								width="lg"
							/>
							<Skeleton
								height="xs"
								shape="text"
								width="md"
							/>
							<div className="flex gap-2 pt-1">
								<Skeleton
									height="md"
									width="sm"
								/>
								<Skeleton
									height="md"
									width="sm"
								/>
							</div>
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

export const Route = createFileRoute('/libs/react-web/components/skeleton')({
	component: Page,
})
