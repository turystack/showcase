import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'

import { CodeBlock } from '@/components/docs/CodeBlock'
import exampleTheme from '../../../../../uiux-template-skill/theme/example.css?raw'
import themeTemplate from '../../../../../uiux-template-skill/theme/template.css?raw'

export const Route = createFileRoute('/libs/uiux-template/theme')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					The theme
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The component library ships project-agnostic. One file per design
					system turns it into this product, by overriding the class each slot
					publishes — never by reaching through the markup around it.
				</p>
			</div>

			<div className="rounded-lg border border-border bg-card">
				<div className="flex items-center justify-between border-border border-b px-4 py-2">
					<span className="font-mono text-muted-foreground text-xs">
						acme-uiux/theme/example.html
					</span>
					<a
						className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
						href="/examples/theme/index.html"
						rel="noreferrer"
						target="_blank"
					>
						Open in a new tab <ExternalLink size={12} />
					</a>
				</div>
				<iframe
					className="h-[30rem] w-full rounded-b-lg bg-background"
					src="/examples/theme/index.html"
					title="The same components with and without acme's theme"
				/>
			</div>

			<p className="text-muted-foreground">
				Same markup on both sides, same classes, same <code>data-slot</code>s.
				One stylesheet of difference — and that stylesheet is the only place a
				project-specific visual value is allowed to exist.
			</p>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The stylesheet behind it
				</h2>
				<p className="text-muted-foreground">
					Three layers, in the order they are reached for: tokens, then the slot
					when the design differs in shape, then a variant the design treats
					differently. Resolving at the first layer and stopping is the whole
					discipline — descending when a token would have done it is what turns
					a theme into a second implementation of the library.
				</p>
				<CodeBlock
					language="css"
					tabs={[
						{
							code: exampleTheme,
							label: 'example.css',
						},
						{
							code: themeTemplate,
							label: 'template.css',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What is checked</h2>
				<p className="text-muted-foreground">
					<code>gate:theme-override-shape</code> reads every theme file and
					fails on <code>!important</code> and on any selector that reaches
					through a component's markup — including these two, because an example
					that breaks the rule it illustrates is worse than no example.{' '}
					<code>gate:theme-per-system</code> keeps the index and the files in
					agreement, and <code>gate:theme-in-sync</code> compares an
					application's copy against the one this skill holds.
				</p>
			</div>
		</div>
	)
}
