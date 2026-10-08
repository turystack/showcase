import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import { SlotsSection } from '@/components/docs'
import { findComponent, findComponentGroup } from '@/data/react-web-components'

/**
 * Placeholder for every component that has no page of its own yet.
 *
 * A static route wins over this one, so adding `components/<slug>.tsx` is all
 * it takes to promote a component out of here. Button is the reference.
 */
function Page() {
	const { component: slug } = useParams({
		from: '/libs/react-web/components/$component',
	})

	const component = findComponent(slug)
	const group = findComponentGroup(slug)

	if (!component) {
		return (
			<div className="space-y-4">
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Not a component
				</h1>
				<p className="text-lg text-muted-foreground">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-sm">
						{slug}
					</code>{' '}
					is not exported by <code>@turystack/react-web</code>.
				</p>
				<Link
					className="inline-block text-lib text-sm hover:underline"
					to="/libs/react-web/components"
				>
					← Back to the catalogue
				</Link>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			<header>
				{group && (
					<p className="font-medium text-lib text-xs uppercase tracking-wider">
						{group}
					</p>
				)}
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					{component.name}
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					{component.description}
				</p>
			</header>

			<div className="rounded-lg border border-border border-dashed px-6 py-12 text-center">
				<p className="font-display font-semibold text-base">
					Not documented yet
				</p>
				<p className="mx-auto mt-3 max-w-prose text-muted-foreground text-sm">
					{component.name} is exported and usable; its page is not written yet.
				</p>
				<Link
					className="mt-5 inline-block text-lib text-sm hover:underline"
					to="/libs/react-web/components/button"
				>
					See Button for the shape these pages take →
				</Link>
			</div>

			<SlotsSection slug={slug} />

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Import</h2>
				<pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm">
					<code>{`import { ${component.name} } from '@turystack/react-web'`}</code>
				</pre>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/$component')({
	component: Page,
})
