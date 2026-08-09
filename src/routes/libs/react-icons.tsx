import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { reactIconsSections } from '@/data/search-items'

function Page() {
	const matchRoute = useMatchRoute()
	const isPlayground = matchRoute({
		to: '/libs/react-icons/playground',
	})

	return (
		<LibraryLayout
			contentClassName={
				isPlayground ? 'max-w-none px-6 py-8 lg:px-10' : undefined
			}
			fillViewport={Boolean(isPlayground)}
			githubUrl="https://github.com/turystack/react-icons"
			libraryName="@turystack/react-icons"
			sections={reactIconsSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/react-icons')({
	component: Page,
})
