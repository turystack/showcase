import type { PropsWithChildren } from 'react'
import { useState } from 'react'

import { DocsHeader } from '@/components/docs/DocsHeader'
import type { SidebarSection } from '@/components/docs/DocsSidebar'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

type LibraryLayoutProps = PropsWithChildren<{
	libraryName?: string
	githubUrl: string
	sections: SidebarSection[]
}>

export function LibraryLayout({
	children,
	libraryName,
	githubUrl,
	sections,
}: LibraryLayoutProps) {
	const isMobile = useIsMobile()
	const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

	const handleToggleSidebar = () => setSidebarOpen((prev) => !prev)
	const handleCloseSidebar = () => setSidebarOpen(false)

	return (
		<div className="h-screen overflow-hidden">
			<DocsHeader
				githubUrl={githubUrl}
				libraryName={libraryName}
				onToggleSidebar={handleToggleSidebar}
				sidebarOpen={sidebarOpen}
			/>

			<DocsSidebar
				onClose={handleCloseSidebar}
				open={sidebarOpen}
				sections={sections}
			/>

			<main
				className={cn(
					'fixed top-16 right-0 bottom-0 overflow-y-auto transition-all duration-300',
					sidebarOpen && !isMobile ? 'left-64' : 'left-0',
				)}
			>
				<div className="mx-auto max-w-3xl p-8">{children}</div>
			</main>
		</div>
	)
}
