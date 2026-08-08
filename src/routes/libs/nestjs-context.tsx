import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { nestjsContextSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/nestjs-context"
			libraryName="@turystack/nestjs-context"
			sections={nestjsContextSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/nestjs-context')({
	component: Page,
})
