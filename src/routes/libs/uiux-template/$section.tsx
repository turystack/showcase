import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getUiuxTemplateDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/uiux-template/$section')({
	component: Page,
})

function Page() {
	const { section } = Route.useParams()
	const doc = getUiuxTemplateDoc(section)

	if (!doc) {
		return <p className="text-muted-foreground">Section not found: {section}</p>
	}

	return <MarkdownDoc content={doc.content} />
}
