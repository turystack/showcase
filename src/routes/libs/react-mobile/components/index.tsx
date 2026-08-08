import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { reactMobileDocGroups, reactMobileDocs } from '@/data/react-mobile-docs'

export const Route = createFileRoute('/libs/react-mobile/components/')({
	component: MobileComponentsPage,
})

function MobileComponentsPage() {
	return (
		<div className="space-y-10">
			<header>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Components
				</h1>
				<p className="mt-3 max-w-3xl text-lg text-muted-foreground">
					All {reactMobileDocs.length} components exported by{' '}
					<code className="text-lib">@turystack/react-mobile</code>. Each page
					documents its props, variants, compound API, usage, and native
					behavior.
				</p>
			</header>

			{reactMobileDocGroups.map((category) => {
				const components = reactMobileDocs.filter(
					(component) => component.category === category,
				)

				return (
					<section
						className="space-y-4"
						key={category}
					>
						<div className="flex items-end justify-between border-border border-b pb-3">
							<h2 className="font-display font-semibold text-xl">{category}</h2>
							<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
								{components.length} components
							</span>
						</div>
						<div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
							{components.map((component) => (
								<Link
									className="group flex min-h-32 flex-col bg-card p-4 transition-colors hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-lib focus-visible:-outline-offset-2"
									key={component.slug}
									params={{
										component: component.slug,
									}}
									to="/libs/react-mobile/components/$component"
								>
									<div className="flex items-center justify-between gap-3">
										<h3 className="font-semibold">{component.name}</h3>
										<ArrowRight
											className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-lib"
											size={14}
										/>
									</div>
									<p className="mt-2 text-muted-foreground text-xs leading-relaxed">
										{component.description}
									</p>
									<p className="mt-auto pt-3 font-mono text-[9px] text-lib uppercase tracking-wider">
										Props · options · usage
									</p>
								</Link>
							))}
						</div>
					</section>
				)
			})}
		</div>
	)
}
