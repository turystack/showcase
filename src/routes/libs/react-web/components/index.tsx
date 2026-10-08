import { createFileRoute, Link } from '@tanstack/react-router'

import { allComponents, componentGroups } from '@/data/react-web-components'

const documentedCount = allComponents.filter(
	(component) => component.documented,
).length

function Page() {
	return (
		<div className="space-y-8">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Atoms
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Components
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Every primitive the package exports, read from the built entry point.
				</p>
				<p className="mt-3 text-muted-foreground text-sm">
					{allComponents.length} components · {documentedCount} documented so
					far.
				</p>
			</header>

			{componentGroups.map((group) => (
				<section
					className="space-y-3"
					key={group.title}
				>
					<h2 className="font-display font-semibold text-xl">
						{group.title}
						<span className="ml-2 font-normal text-muted-foreground text-sm">
							{group.components.length}
						</span>
					</h2>

					<div className="grid gap-3 sm:grid-cols-2">
						{group.components.map((component) => (
							<Link
								className="rounded-lg border border-border px-4 py-3 transition-colors hover:border-lib/50 hover:bg-muted/40"
								key={component.slug}
								params={{
									component: component.slug,
								}}
								to="/libs/react-web/components/$component"
							>
								<div className="flex items-center justify-between gap-2">
									<span className="font-medium text-sm">{component.name}</span>
									{component.documented ? (
										<span className="rounded-lg bg-lib/10 px-2 py-0.5 font-medium text-[0.6875rem] text-lib">
											Documented
										</span>
									) : (
										<span className="rounded-lg border border-border px-2 py-0.5 text-[0.6875rem] text-muted-foreground">
											Soon
										</span>
									)}
								</div>
								<p className="mt-1 text-muted-foreground text-xs">
									{component.description}
								</p>
							</Link>
						))}
					</div>
				</section>
			))}
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/')({
	component: Page,
})
