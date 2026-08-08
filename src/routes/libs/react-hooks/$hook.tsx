import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { reactHookDocs } from '@/data/react-hooks-docs'

export const Route = createFileRoute('/libs/react-hooks/$hook')({
	component: Page,
})

function Page() {
	const { hook } = Route.useParams()
	const doc = reactHookDocs.find((item) => item.slug === hook)

	if (!doc) {
		return (
			<div className="space-y-3">
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Hook not found
				</h1>
				<p className="text-muted-foreground">
					The requested hook is not part of @turystack/react-hooks.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-10">
			<div>
				<p className="font-medium text-lib text-sm">{doc.category}</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					{doc.name}
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">{doc.description}</p>
			</div>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={doc.signature}
					filename={`${doc.name}.ts`}
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Returns</h2>
				<div className="rounded-lg border border-border bg-card p-5 text-muted-foreground text-sm">
					{doc.returns}
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { ${doc.name} } from '@turystack/react-hooks'

${doc.usage}`}
					filename={`${doc.slug}.tsx`}
					language="tsx"
				/>
			</section>
		</div>
	)
}
