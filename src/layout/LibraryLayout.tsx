import type { CSSProperties, PropsWithChildren } from 'react'
import { useState } from 'react'

import { DocsHeader } from '@/components/docs/DocsHeader'
import type { SidebarSection } from '@/components/docs/DocsSidebar'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { libraries } from '@/data/libraries'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

type LibraryLayoutProps = PropsWithChildren<{
	libraryName?: string
	githubUrl: string
	sections: SidebarSection[]
	contentClassName?: string
	/**
	 * Hand the page the exact height left over and let it scroll its own parts.
	 * A catalogue that scrolls as one document drags its search field off the
	 * top the moment you start reading, which is the one control you still need.
	 */
	fillViewport?: boolean
}>

export function LibraryLayout({
	children,
	contentClassName,
	fillViewport,
	libraryName,
	githubUrl,
	sections,
}: LibraryLayoutProps) {
	const isMobile = useIsMobile()
	const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

	const handleToggleSidebar = () => setSidebarOpen((prev) => !prev)
	const handleCloseSidebar = () => setSidebarOpen(false)

	const accent = libraries.find((lib) => lib.name === libraryName)?.color

	return (
		<div
			className="h-screen overflow-hidden"
			style={
				accent
					? ({
							'--lib-accent': `var(--tury-${accent})`,
						} as CSSProperties)
					: undefined
			}
		>
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
					'fixed top-16 right-0 bottom-0 transition-all duration-300',
					fillViewport ? 'overflow-hidden' : 'overflow-y-auto',
					sidebarOpen && !isMobile ? 'left-64' : 'left-0',
				)}
			>
				<div
					className={cn(
						'mx-auto max-w-6xl p-8',
						fillViewport && 'flex h-full min-h-0 flex-col',
						contentClassName,
					)}
				>
					{children}
				</div>
			</main>
		</div>
	)
}
