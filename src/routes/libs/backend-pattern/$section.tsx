import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getBackendPatternDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/backend-pattern/$section')({
	component: Page,
})

function Page() {
	const { section } = Route.useParams()
	const doc = getBackendPatternDoc(section)

	if (!doc) {
		return <p className="text-muted-foreground">Section not found: {section}</p>
	}

	return <MarkdownDoc content={doc.content} />
}
