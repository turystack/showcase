import { createFileRoute } from '@tanstack/react-router'
import type { TooltipSide } from '@turystack/react-web'
import { Button, Tooltip } from '@turystack/react-web'
import { Bold, Info, Italic, Trash2, Underline } from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/tooltip/tooltip.types.ts` and the
 * destructuring defaults in `tooltip.tsx`.
 */
const tooltipProps = [
	{
		description: 'What the hint says; any node, markup included.',
		name: 'content',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: '"top"',
		description: 'Preferred side; flips when there is no room.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '4',
		description: 'Gap between the trigger and the hint, in pixels.',
		name: 'sideOffset',
		type: 'number',
	},
	{
		default: '200',
		description: 'Hover delay in ms; focus shows it at once.',
		name: 'delayDuration',
		type: 'number',
	},
]

const usageCode = `import { Button, Tooltip } from '@turystack/react-web'

<Tooltip content="Save changes">
  <Button ariaLabel="Save" size="icon-md"><Save /></Button>
</Tooltip>

// Placed, offset and instant
<Tooltip content="Delete" delayDuration={0} side="right" sideOffset={12}>
  <Button ariaLabel="Delete" size="icon-md" variant="ghost">
    <Trash2 />
  </Button>
</Tooltip>

// A node, not just a string
<Tooltip
  content={
    <span>
      Search · <kbd>⌘K</kbd>
    </span>
  }
>
  <Button variant="outline">Search</Button>
</Tooltip>

// A long, structured hint. The popup ships no prose styles — every gap,
// bullet and rule below is one this markup put there.
<Tooltip
  content={
    <div className="space-y-2 py-1">
      <p className="font-semibold text-sm">Rate limit — 1,000 requests/hour</p>
      <p className="leading-relaxed">
        Counted per API key over a rolling window. Anything over the limit
        is answered with 429 and a Retry-After header.
      </p>
      <p className="leading-relaxed">
        Bursts are tolerated:
        <br />
        up to 50 requests in any one second.
      </p>
      <ul className="list-disc space-y-0.5 pl-4 leading-relaxed">
        <li>Reads and writes share the budget.</li>
        <li>Webhook deliveries are not counted.</li>
      </ul>
    </div>
  }
  side="right"
>
  <Button variant="outline">Rate limits</Button>
</Tooltip>`

const SIDES: TooltipSide[] = [
	'top',
	'right',
	'bottom',
	'left',
]

/**
 * A deliberately heavy hint: a heading, two paragraphs, a hard line break, a
 * list and a footer rule.
 *
 * `content` is a `React.ReactNode`, so all of this is legal — but the popup
 * is styled for one line (`max-w-xs`, `text-xs`, `px-3 py-1.5`) and Tailwind's
 * preflight has already stripped the margins off `p` and the markers off `ul`.
 * Every gap here is one this markup put in; drop the classes and the whole
 * thing renders as a single undifferentiated block.
 */
function RateLimitNote() {
	return (
		<div className="space-y-2 py-1">
			<p className="font-semibold text-sm">Rate limit — 1,000 requests/hour</p>
			<p className="leading-relaxed">
				Counted per API key over a rolling window. Over the limit:{' '}
				<code className="rounded-lg bg-background/20 px-1">429</code> and a{' '}
				<code className="rounded-lg bg-background/20 px-1">Retry-After</code>{' '}
				header.
			</p>
			<p className="leading-relaxed">
				Bursts are tolerated:
				<br />
				up to 50 requests in any single second, as long as the hourly total
				still holds.
			</p>
			<ul className="list-disc space-y-0.5 pl-4 leading-relaxed">
				<li>Reads and writes share one budget.</li>
				<li>Webhook deliveries are not counted.</li>
				<li>
					A <code className="rounded-lg bg-background/20 px-1">429</code> does
					not consume quota.
				</li>
			</ul>
			<div className="flex items-center justify-between gap-2 border-background/25 border-t pt-2">
				<span className="opacity-70">Raise it in Settings</span>
				<kbd className="rounded-lg bg-background/20 px-1">⌘,</kbd>
			</div>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Overlays
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Tooltip
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A hint shown on hover or keyboard focus.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={tooltipProps} />
			</section>

			<SlotsSection slug="tooltip" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Placement</h2>
				<ComponentPreview title="All four sides">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{SIDES.map((side) => (
							<Tooltip
								content={`side="${side}"`}
								key={side}
								side={side}
								sideOffset={8}
							>
								<Button variant="outline">{side}</Button>
							</Tooltip>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview title="sideOffset — 0, 4 (default) and 20 px">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{[
							0,
							4,
							20,
						].map((offset) => (
							<Tooltip
								content={`${offset} px from the trigger`}
								key={offset}
								sideOffset={offset}
							>
								<Button variant="outline">{offset} px</Button>
							</Tooltip>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Delay</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The delay applies to hover only; tabbing to the trigger shows the hint
					at once.
				</p>
				<ComponentPreview title="0 ms, 200 ms (default) and 1000 ms">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{[
							0,
							200,
							1000,
						].map((delay) => (
							<Tooltip
								content={`Appeared after ${delay} ms`}
								delayDuration={delay}
								key={delay}
							>
								<Button variant="outline">{delay} ms</Button>
							</Tooltip>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Content</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The hint is capped at{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						max-w-xs
					</code>{' '}
					and wraps. It describes, not names: an icon-only button still needs{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					.
				</p>
				<ComponentPreview title="A string, a node, and a long one">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Tooltip content="Delete permanently">
							<Button
								ariaLabel="Delete"
								size="icon-md"
								variant="ghost"
							>
								<Trash2 />
							</Button>
						</Tooltip>
						<Tooltip
							content={
								<span>
									Bold ·{' '}
									<kbd className="rounded-lg bg-background/20 px-1">⌘B</kbd>
								</span>
							}
						>
							<Button
								ariaLabel="Bold"
								size="icon-md"
								variant="outline"
							>
								<Bold />
							</Button>
						</Tooltip>
						<Tooltip content="A hint long enough to reach the max width and wrap onto a second and then a third line.">
							<Button variant="outline">Long hint</Button>
						</Tooltip>
					</div>
				</ComponentPreview>
				<ComponentPreview title="A toolbar of icon buttons">
					<div className="flex items-center gap-1">
						<Tooltip content="Bold">
							<Button
								ariaLabel="Bold"
								size="icon-sm"
								variant="ghost"
							>
								<Bold />
							</Button>
						</Tooltip>
						<Tooltip content="Italic">
							<Button
								ariaLabel="Italic"
								size="icon-sm"
								variant="ghost"
							>
								<Italic />
							</Button>
						</Tooltip>
						<Tooltip content="Underline">
							<Button
								ariaLabel="Underline"
								size="icon-sm"
								variant="ghost"
							>
								<Underline />
							</Button>
						</Tooltip>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A large, structured hint
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Nothing stops you passing a whole document:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						content
					</code>{' '}
					is a node.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					What it does not do is help you.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The harder limit is not visual.
				</p>
				<ComponentPreview title="Heading, paragraphs, break, list and rule">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Tooltip
							content={<RateLimitNote />}
							side="right"
							sideOffset={8}
						>
							<Button variant="outline">Rate limits</Button>
						</Tooltip>
						<Tooltip
							content={<RateLimitNote />}
							delayDuration={0}
						>
							<Button variant="secondary">Same hint, on top, no delay</Button>
						</Tooltip>
						<Tooltip
							content={<RateLimitNote />}
							side="bottom"
						>
							<Button
								ariaLabel="About rate limits"
								size="icon-md"
								variant="ghost"
							>
								<Info />
							</Button>
						</Tooltip>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Notes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Each Tooltip installs a provider of its own, so{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						delayDuration
					</code>{' '}
					is per tooltip; a second hint in a row does not open instantly.
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

export const Route = createFileRoute('/libs/react-web/components/tooltip')({
	component: Page,
})
