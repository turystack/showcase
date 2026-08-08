import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { nestjsIamSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/nestjs-iam"
			libraryName="@turystack/nestjs-iam"
			sections={nestjsIamSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/nestjs-iam')({
	component: Page,
})
