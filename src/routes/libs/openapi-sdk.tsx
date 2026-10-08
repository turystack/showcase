import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { openapiSdkSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/openapi-sdk"
			libraryName="@turystack/openapi-sdk"
			sections={openapiSdkSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/openapi-sdk')({
	component: Page,
})
