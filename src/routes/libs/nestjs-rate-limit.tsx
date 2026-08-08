import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { nestjsRateLimitSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/nestjs-rate-limit"
			libraryName="@turystack/nestjs-rate-limit"
			sections={nestjsRateLimitSections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/nestjs-rate-limit')({
	component: Page,
})
