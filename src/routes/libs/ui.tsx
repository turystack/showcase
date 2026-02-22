import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import type { SidebarSection } from '@/components/docs/DocsSidebar'

const sections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/ui',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'TuryStackProvider',
				to: '/libs/ui/provider',
			},
		],
		title: 'Core',
	},
	{
		items: [
			{
				label: 'Button',
				to: '/libs/ui/button',
			},
			{
				label: 'Loader',
				to: '/libs/ui/t-loader',
			},
		],
		title: 'Components',
	},
]

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/ui"
			libraryName="@tury/ui"
			sections={sections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/ui')({
	component: Page,
})
