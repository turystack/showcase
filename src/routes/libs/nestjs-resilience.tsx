import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { nestjsResilienceSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/nestjs-resilience"
			libraryName="@turystack/nestjs-resilience"
			sections={nestjsResilienceSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/nestjs-resilience')({
	component: Page,
})
