import { createFileRoute, Link, useParams } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs'
import { findHook, findHookGroup } from '@/data/react-web-hooks'

/**
 * A documented page for every exported hook.
 *
 * Signature, parameters, return shape and a worked example — the same four
 * things the component pages carry, because a hook is API the same way a prop
 * is. The types come from the package's own declarations, so a page is never a
 * paraphrase of what the hook used to do.
 */
function Page() {
	const { hook: slug } = useParams({
		from: '/libs/react-web/hooks/$hook',
	})

	const hook = findHook(slug)
	const group = findHookGroup(slug)

	if (!hook) {
		return (
			<div className="space-y-4">
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Not a hook
				</h1>
				<p className="text-lg text-muted-foreground">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-sm">
						{slug}
					</code>{' '}
					is not exported by <code>@turystack/react-web</code>.
				</p>
				<Link
					className="inline-block text-lib text-sm hover:underline"
					to="/libs/react-web/hooks"
				>
					← Back to the hooks
				</Link>
			</div>
		)
	}

	return (
		<div className="space-y-10">
			<header>
				{group && (
					<p className="font-medium text-lib text-xs uppercase tracking-wider">
						{group}
					</p>
				)}
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					{hook.name}
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					{hook.description}
				</p>
			</header>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={hook.signature}
					language="ts"
				/>
			</section>

			{hook.params && hook.params.length > 0 && (
				<section className="space-y-3">
					<h2 className="font-display font-semibold text-xl">Parameters</h2>
					<div className="overflow-x-auto rounded-lg border border-border">
						<table className="w-full text-sm">
							<thead className="border-border border-b bg-muted/40">
								<tr>
									<th className="px-4 py-2 text-left font-medium">Name</th>
									<th className="px-4 py-2 text-left font-medium">Type</th>
									<th className="px-4 py-2 text-left font-medium">
										Description
									</th>
								</tr>
							</thead>
							<tbody>
								{hook.params.map((param) => (
									<tr
										className="border-border border-b last:border-0"
										key={param.name}
									>
										<td className="px-4 py-2 align-top">
											<code className="font-medium text-xs">{param.name}</code>
										</td>
										<td className="px-4 py-2 align-top">
											<code className="text-muted-foreground text-xs">
												{param.type}
											</code>
										</td>
										<td className="px-4 py-2 align-top text-muted-foreground">
											{param.description}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			)}

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Returns</h2>
				<CodeBlock
					code={hook.returns}
					language="ts"
				/>
			</section>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Example</h2>
				<CodeBlock
					code={hook.example}
					language="tsx"
				/>
			</section>

			{hook.notes && (
				<section className="space-y-3">
					<h2 className="font-display font-semibold text-xl">Notes</h2>
					<p className="max-w-prose text-muted-foreground">{hook.notes}</p>
				</section>
			)}

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Import</h2>
				<CodeBlock
					code={`import { ${hook.name} } from '@turystack/react-web'`}
					language="ts"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/hooks/$hook')({
	component: Page,
})
