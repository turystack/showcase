import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getFrontendPrimitivesPatternDoc } from '@/lib/skill-docs'

export const Route = createFileRoute(
	'/libs/frontend-primitives-pattern/$section',
)({
	component: Page,
})

function Page() {
	const { section } = Route.useParams()
	const doc = getFrontendPrimitivesPatternDoc(section)

	if (!doc) {
		return <p className="text-muted-foreground">Section not found: {section}</p>
	}

	return <MarkdownDoc content={doc.content} />
}
