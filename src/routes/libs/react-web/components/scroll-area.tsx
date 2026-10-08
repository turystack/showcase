import { createFileRoute } from '@tanstack/react-router'
import { ScrollArea } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const scrollAreaProps = [
	{
		default: '"vertical"',
		description: 'Which way it scrolls; both suits a wide table.',
		name: 'orientation',
		type: '"vertical" | "horizontal" | "both"',
	},
]

const BOOKINGS = Array.from(
	{
		length: 12,
	},
	(_, index) => `TRY-${1040 + index}`,
)

const usageCode = `import { ScrollArea } from '@turystack/react-web'

// It takes the height it is given — there is no height prop, because a scroll
// region without a bounded parent is a region that never scrolls
<Box height="sm">
  <ScrollArea>
    <ActivityFeed />
  </ScrollArea>
</Box>

<ScrollArea orientation="both">
  <WideTable />
</ScrollArea>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					ScrollArea
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A scrollable region with a scrollbar the design system owns.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={scrollAreaProps} />
			</section>

			<SlotsSection slug="scroll-area" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A bounded parent, and a list too long for it
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					It fills its parent; give the parent a height and the list scrolls.
				</p>
				<ComponentPreview title="Vertical scrolling inside a fixed height">
					<div className="h-40 w-full max-w-sm rounded-md border border-border">
						<ScrollArea>
							<div className="flex flex-col gap-2 p-3 text-sm">
								{BOOKINGS.map((code) => (
									<span key={code}>Booking {code}</span>
								))}
							</div>
						</ScrollArea>
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

export const Route = createFileRoute('/libs/react-web/components/scroll-area')({
	component: Page,
})
