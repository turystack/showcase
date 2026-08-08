import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { nestjsLoggerSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/nestjs-logger"
			libraryName="@turystack/nestjs-logger"
			sections={nestjsLoggerSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/nestjs-logger')({
	component: Page,
})
