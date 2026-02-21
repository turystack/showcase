import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import type { SidebarSection } from '@/components/docs/DocsSidebar'

const sections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/common',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'sum',
				to: '/libs/common/sum',
			},
			{
				label: 'subtract',
				to: '/libs/common/subtract',
			},
			{
				label: 'multiply',
				to: '/libs/common/multiply',
			},
		],
		title: 'Functions',
	},
]

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/common"
			libraryName="@tury/common"
			sections={sections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/common')({
	component: Page,
})
