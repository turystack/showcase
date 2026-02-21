import { createFileRoute } from '@tanstack/react-router'

import { HeroSection, LibrariesSection } from '@/components'

function Page() {
	return (
		<>
			<HeroSection />
			<LibrariesSection />
		</>
	)
}

export const Route = createFileRoute('/_main/')({
	component: Page,
})
