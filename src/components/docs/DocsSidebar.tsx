import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

export type SidebarItem = {
	label: string
	to: string
}

export type SidebarSection = {
	title: string
	items: SidebarItem[]
}

type DocsSidebarProps = {
	open: boolean
	onClose: () => void
	sections: SidebarSection[]
}

export function DocsSidebar({ open, onClose, sections }: DocsSidebarProps) {
	const isMobile = useIsMobile()

	return (
		<>
			{isMobile && open && (
				<div
					aria-hidden="true"
					className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
					onClick={onClose}
				/>
			)}

			<aside
				className={cn(
					'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-border border-r bg-background transition-transform duration-300',
					open ? 'translate-x-0' : '-translate-x-full',
				)}
			>
				<div className="flex items-center justify-between p-4 md:hidden">
					<span className="font-medium text-sm">Menu</span>
					<button
						aria-label="Close sidebar"
						className="rounded-md p-1 text-muted-foreground hover:text-foreground"
						onClick={onClose}
						type="button"
					>
						<X size={16} />
					</button>
				</div>

				<nav className="p-4 pt-6">
					{sections.map((section) => (
						<div
							className="mb-6"
							key={section.title}
						>
							<p className="mb-2 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
								{section.title}
							</p>
							<ul className="space-y-0.5">
								{section.items.map((item) => (
									<li key={item.to}>
										<Link
											activeOptions={{
												exact: true,
											}}
											activeProps={{
												className:
													'block rounded-md px-3 py-2 text-sm bg-tury-cyan/10 text-tury-cyan font-medium border-l-2 border-tury-cyan transition-colors',
											}}
											className="block rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground"
											to={item.to}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</aside>
		</>
	)
}
