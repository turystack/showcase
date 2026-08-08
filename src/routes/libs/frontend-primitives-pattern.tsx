import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { frontendPrimitivesPatternSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/frontend-primitives-pattern"
			libraryName="@turystack/frontend-primitives-pattern"
			sections={frontendPrimitivesPatternSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/frontend-primitives-pattern')({
	component: Page,
})
