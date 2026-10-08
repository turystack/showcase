import { createFileRoute } from '@tanstack/react-router'

import { AudienceStage } from '@/components/audiences/AudienceStage'
import { findAudience } from '@/data/react-web-audiences'

const audience = findAudience('landing-page')

function Page() {
	if (!audience) {
		return null
	}

	return <AudienceStage audience={audience} />
}

export const Route = createFileRoute('/libs/react-web/audiences/landing-page')({
	component: Page,
})
