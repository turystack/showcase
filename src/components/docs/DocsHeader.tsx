import { Link } from '@tanstack/react-router'
import { ChevronRight, Github, Menu, X } from 'lucide-react'

import { LibrarySwitcher } from './LibrarySwitcher'

import { TuryMark } from '@/components/Logo'
import { SpotlightTrigger } from '@/components/SpotlightSearch'
import { ThemeToggle } from '@/components/ThemeToggle'

type DocsHeaderProps = {
	sidebarOpen: boolean
	libraryName?: string
	githubUrl: string
	onToggleSidebar: () => void
}

export function DocsHeader({
	sidebarOpen,
	libraryName,
	githubUrl,
	onToggleSidebar,
}: DocsHeaderProps) {
	return (
		<header className="fixed inset-x-0 top-0 z-50 border-border/50 border-b bg-background/80 backdrop-blur-xl">
			<div className="flex h-16 items-center gap-4 px-4 md:px-6">
				<button
					aria-label="Toggle sidebar"
					className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
					onClick={onToggleSidebar}
					type="button"
				>
					{sidebarOpen ? <X size={20} /> : <Menu size={20} />}
				</button>

				<div className="flex items-center gap-2">
					<Link
						className="flex items-center gap-2 hover:opacity-80"
						to="/"
					>
						<TuryMark size={20} />
						<span className="font-bold font-display text-sm tracking-tight">
							tury<span className="text-tury-green">.dev</span>
						</span>
					</Link>

					{libraryName && (
						<>
							<ChevronRight
								className="text-muted-foreground"
								size={14}
							/>
							<LibrarySwitcher current={libraryName} />
						</>
					)}
				</div>

				<div className="mx-auto hidden md:block">
					<SpotlightTrigger className="w-[600px]" />
				</div>

				<div className="ml-auto flex items-center gap-3 md:ml-0">
					<div className="md:hidden">
						<SpotlightTrigger />
					</div>

					<div className="flex items-center gap-1">
						<a
							className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
							href={githubUrl}
							rel="noreferrer"
							target="_blank"
						>
							<Github size={18} />
						</a>

						<ThemeToggle />
					</div>
				</div>
			</div>
		</header>
	)
}
