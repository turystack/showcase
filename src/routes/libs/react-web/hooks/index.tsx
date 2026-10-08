import { createFileRoute, Link } from '@tanstack/react-router'

import { allHooks, hookGroups, OTHER_EXPORTS } from '@/data/react-web-hooks'

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Hooks
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					{allHooks.length} hooks
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Everything <code>@turystack/react-web</code> exports besides
					components.
				</p>
			</header>

			{hookGroups.map((group) => (
				<section
					className="space-y-3"
					key={group.title}
				>
					<h2 className="font-display font-semibold text-xl">{group.title}</h2>

					<ul className="grid gap-3 sm:grid-cols-2">
						{group.hooks.map((hook) => (
							<li key={hook.slug}>
								<Link
									className="block h-full rounded-lg border border-border p-4 transition-colors hover:border-lib/50 hover:bg-muted/40"
									params={{
										hook: hook.slug,
									}}
									to="/libs/react-web/hooks/$hook"
								>
									<code className="font-medium text-sm">{hook.name}</code>
									<p className="mt-2 text-muted-foreground text-sm">
										{hook.description}
									</p>
								</Link>
							</li>
						))}
					</ul>
				</section>
			))}

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Also exported</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Neither components nor hooks, listed so nothing the package exports is
					findable only by reading the bundle.
				</p>
				<ul className="space-y-2">
					{OTHER_EXPORTS.map((entry) => (
						<li
							className="rounded-lg border border-border px-4 py-3"
							key={entry.name}
						>
							<code className="font-medium text-sm">{entry.name}</code>
							<p className="mt-1 text-muted-foreground text-sm">{entry.note}</p>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/hooks/')({
	component: Page,
})
