import { createFileRoute } from '@tanstack/react-router'

import { AudienceStage } from '@/components/audiences/AudienceStage'
import { findAudience } from '@/data/react-web-audiences'

const audience = findAudience('b2b')

function Page() {
	if (!audience) {
		return null
	}

	return <AudienceStage audience={audience} />
}

export const Route = createFileRoute('/libs/react-web/audiences/b2b')({
	component: Page,
})
