import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { uiSections } from '@/data/search-items'

function Page() {
	const matchRoute = useMatchRoute()
	const isPlayground = matchRoute({
		to: '/libs/react-web/playground',
	})
	const isBlocks = matchRoute({
		to: '/libs/react-web/blocks',
	})

	return (
		<LibraryLayout
			contentClassName={
				isPlayground || isBlocks ? 'max-w-none py-8 px-10' : undefined
			}
			githubUrl="https://github.com/turystack/ui"
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
