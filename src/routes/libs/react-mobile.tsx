import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { reactMobileSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/react-mobile"
			libraryName="@turystack/react-mobile"
			sections={reactMobileSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/react-mobile')({
	component: Page,
})
