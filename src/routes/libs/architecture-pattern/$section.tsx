import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getArchitecturePatternDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/architecture-pattern/$section')({
	component: Page,
})

function Page() {
	const { section } = Route.useParams()
	const doc = getArchitecturePatternDoc(section)

	if (!doc) {
		return <p className="text-muted-foreground">Section not found: {section}</p>
	}

	return <MarkdownDoc content={doc.content} />
}
