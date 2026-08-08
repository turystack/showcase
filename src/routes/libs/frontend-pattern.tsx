import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { frontendPatternSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/frontend-pattern"
			libraryName="@turystack/frontend-pattern"
			sections={frontendPatternSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/frontend-pattern')({
	component: Page,
})
