import { Link, useRouterState } from '@tanstack/react-router'
import { ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

export type SidebarItem = {
	label: string
	to: string
}

export type SidebarSubsection = {
	title: string
	items: SidebarItem[]
}

export type SidebarSection = {
	title: string
	items?: SidebarItem[]
	subsections?: SidebarSubsection[]
}

type DocsSidebarProps = {
	open: boolean
	onClose: () => void
	sections: SidebarSection[]
}

/**
 * Three levels, told apart by three different things.
 *
 * The previous version separated a group from the links inside it by eight
 * pixels of padding and a little opacity. On the react-web sidebar that meant
 * sixty three component links under seven groups, all reading as one flat list
 * — the nesting was in the markup and nowhere on the screen.
 *
 * So each level now carries its own signal rather than a smaller amount of the
 * same one:
 *
 *   section      an uppercase micro-label, letter-spaced, with a rule beside it
 *   group        a row you can press, with a chevron and a count
 *   item         indented against a vertical guide, with a marker when active
 *
 * The groups collapse because sixty three links do not fit on a screen and a
 * list nobody can scan is not navigation. The group holding the current page
 * opens itself, so arriving from a search result never lands you in a closed
 * drawer.
 */

/** The item link, at either depth. `nested` draws it against the guide rail. */
function ItemLink({
	item,
	nested,
	onNavigate,
}: {
	item: SidebarItem
	nested?: boolean
	onNavigate: () => void
}) {
	return (
		<li className={cn(nested && 'relative')}>
			<Link
				activeOptions={{
					exact: true,
				}}
				activeProps={{
					className: cn(
						'font-medium text-lib',
						nested
							? 'before:absolute before:top-1/2 before:-left-px before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-lib'
							: 'bg-lib/10 border-l-2 border-lib',
					),
				}}
				className={cn(
					'block rounded-md py-1.5 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground',
					nested ? 'pr-3 pl-4' : 'px-3',
				)}
				onClick={onNavigate}
				to={item.to}
			>
				{item.label}
			</Link>
		</li>
	)
}

function Group({
	onNavigate,
	pathname,
	subsection,
}: {
	onNavigate: () => void
	pathname: string
	subsection: SidebarSubsection
}) {
	const holdsCurrentPage = subsection.items.some((item) => item.to === pathname)
	const [expanded, setExpanded] = useState(holdsCurrentPage)

	// Arriving from search or a direct link can land inside a collapsed group;
	// the group that holds the page always opens itself.
	useEffect(() => {
		if (holdsCurrentPage) {
			setExpanded(true)
		}
	}, [
		holdsCurrentPage,
	])

	const region = `sidebar-${subsection.title.toLowerCase().replace(/\W+/g, '-')}`

	return (
		<div className="mt-1">
			<button
				aria-controls={region}
				aria-expanded={expanded}
				className={cn(
					'flex w-full items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-sm transition-colors hover:bg-muted',
					holdsCurrentPage
						? 'font-semibold text-foreground'
						: 'font-medium text-foreground/80',
				)}
				onClick={() => setExpanded((previous) => !previous)}
				type="button"
			>
				<ChevronRight
					aria-hidden="true"
					className={cn(
						'shrink-0 text-muted-foreground transition-transform duration-200',
						expanded && 'rotate-90',
					)}
					size={14}
				/>
				<span className="flex-1 truncate">{subsection.title}</span>
				<span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
					{subsection.items.length}
				</span>
			</button>

			{expanded && (
				<ul
					className="mt-0.5 ml-[1.375rem] space-y-px border-border border-l pl-0"
					id={region}
				>
					{subsection.items.map((item) => (
						<ItemLink
							item={item}
							key={item.to}
							nested
							onNavigate={onNavigate}
						/>
					))}
				</ul>
			)}
		</div>
	)
}

export function DocsSidebar({ open, onClose, sections }: DocsSidebarProps) {
	const isMobile = useIsMobile()
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	})
	const onNavigate = () => {
		if (isMobile) {
			onClose()
		}
	}

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
							className="mb-7"
							key={section.title}
						>
							<div className="mb-2 flex items-center gap-2 px-3">
								<span className="font-semibold text-[10px] text-muted-foreground uppercase tracking-[0.12em]">
									{section.title}
								</span>
								<span
									aria-hidden="true"
									className="h-px flex-1 bg-border"
								/>
							</div>

							{section.items && (
								<ul className="space-y-px">
									{section.items.map((item) => (
										<ItemLink
											item={item}
											key={item.to}
											onNavigate={onNavigate}
										/>
									))}
								</ul>
							)}

							{section.subsections?.map((subsection) => (
								<Group
									key={subsection.title}
									onNavigate={onNavigate}
									pathname={pathname}
									subsection={subsection}
								/>
							))}
						</div>
					))}
				</nav>
			</aside>
		</>
	)
}
