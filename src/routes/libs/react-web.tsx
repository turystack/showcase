import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { uiSections } from '@/data/search-items'

function Page() {
	const matchRoute = useMatchRoute()

	/**
	 * Every audience is a stage now.
	 *
	 * These are screens, not prose: they need the full width the docs column
	 * deliberately withholds, and the stage only fills the window if the shell
	 * hands it the leftover height instead of letting the page scroll. The
	 * overview at `/audiences` is prose about them, so it keeps the reading
	 * column.
	 */
	const isAudienceStage = Boolean(
		matchRoute({
			fuzzy: true,
			to: '/libs/react-web/audiences',
		}) &&
			!matchRoute({
				to: '/libs/react-web/audiences',
			}),
	)

	return (
		<LibraryLayout
			contentClassName={
				isAudienceStage ? 'max-w-none px-4 py-4 lg:px-6' : undefined
			}
			fillViewport={isAudienceStage}
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
