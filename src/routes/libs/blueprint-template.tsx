import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { blueprintTemplateSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/blueprint-template"
			libraryName="@turystack/blueprint-template"
			sections={blueprintTemplateSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/blueprint-template')({
	component: Page,
})
