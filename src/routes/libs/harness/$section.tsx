import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getHarnessDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/harness/$section')({
	component: Page,
})

function Page() {
	const { section } = Route.useParams()
	const doc = getHarnessDoc(section)

	if (!doc) {
		return <p className="text-muted-foreground">Section not found: {section}</p>
	}

	return <MarkdownDoc content={doc.content} />
}
