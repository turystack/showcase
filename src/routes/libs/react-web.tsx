import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { uiSections } from '@/data/search-items'

function Page() {
	const matchRoute = useMatchRoute()
	const isPlayground = matchRoute({
		to: '/libs/react-web/playground',
	})

	return (
		<LibraryLayout
			contentClassName={
				isPlayground ? 'max-w-none px-6 py-8 lg:px-10' : undefined
			}
			fillViewport={Boolean(isPlayground)}
			githubUrl="https://github.com/turystack/react-web"
			libraryName="@turystack/react-web"
			sections={uiSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/react-web')({
	component: Page,
})
