import { createFileRoute, Link } from '@tanstack/react-router'

import { audiences } from '@/data/react-web-audiences'

function Page() {
	return (
		<div className="space-y-8">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layouts
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Audiences
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Whole screens built from the library, grouped by who uses them.
				</p>
			</header>

			<div className="grid gap-4 sm:grid-cols-2">
				{audiences.map((audience) => (
					<Link
						className="group rounded-lg border border-border p-5 transition-colors hover:border-lib/50 hover:bg-muted/40"
						key={audience.slug}
						to={audience.to}
					>
						<p className="font-medium text-lib text-xs uppercase tracking-wider">
							{audience.tagline}
						</p>
						<h2 className="mt-2 font-display font-semibold text-lg">
							{audience.title}
						</h2>
						<p className="mt-2 text-muted-foreground text-sm">
							{audience.summary}
						</p>
						<p className="mt-4 text-muted-foreground text-xs">
							{audience.layouts.length > 0
								? `${audience.layouts.length} layout${audience.layouts.length > 1 ? 's' : ''} · ${audience.scenarios.length} scenarios`
								: `No layouts yet · ${audience.scenarios.length} scenarios planned`}
						</p>
					</Link>
				))}
			</div>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/audiences/')({
	component: Page,
})
