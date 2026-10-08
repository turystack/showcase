import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getProofModeDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/proof-mode/$section')({
	component: Page,
})

function Page() {
	const { section } = Route.useParams()
	const doc = getProofModeDoc(section)

	if (!doc) {
		return <p className="text-muted-foreground">Section not found: {section}</p>
	}

	return <MarkdownDoc content={doc.content} />
}
