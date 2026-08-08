import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { architecturePatternSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/architecture-pattern"
			libraryName="@turystack/architecture-pattern"
			sections={architecturePatternSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/architecture-pattern')({
	component: Page,
})
