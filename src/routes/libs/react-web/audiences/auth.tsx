import { createFileRoute } from '@tanstack/react-router'

import { AudienceStage } from '@/components/audiences/AudienceStage'
import { findAudience } from '@/data/react-web-audiences'

const audience = findAudience('auth')

/**
 * Auth is the first audience on the one-screen-at-a-time stage.
 *
 * The other audiences still stack their layouts. Both shapes exist on purpose
 * while this one is being judged — swapping all four at once would leave
 * nothing to compare the new one against.
 */
function Page() {
	if (!audience) {
		return null
	}

	return <AudienceStage audience={audience} />
}

export const Route = createFileRoute('/libs/react-web/audiences/auth')({
	component: Page,
})
