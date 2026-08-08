import { Link } from '@tanstack/react-router'
import { DropdownMenu } from '@turystack/ui'
import { Check, ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'

import { colorMap } from './LibraryCard'

import { categories, libraries } from '@/data/libraries'

type LibrarySwitcherProps = {
	current: string
}

export function LibrarySwitcher({ current }: LibrarySwitcherProps) {
	const [query, setQuery] = useState('')
	const term = query.trim().toLowerCase()

	const groups = categories
		.map((category) => ({
			category,
			items: libraries.filter(
				(lib) =>
					lib.category === category && lib.name.toLowerCase().includes(term),
			),
		}))
		.filter((group) => group.items.length > 0)

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<button
					className="flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-foreground text-sm transition-colors hover:bg-muted"
					type="button"
				>
					{current}
					<ChevronDown
						className="text-muted-foreground"
						size={14}
					/>
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content width={288}>
				<div className="border-border border-b p-2">
					<div className="flex items-center gap-2 rounded-md bg-muted px-2">
						<Search
							className="shrink-0 text-muted-foreground"
							size={14}
						/>
						<input
							className="w-full bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground"
							onChange={(event) => setQuery(event.target.value)}
							onKeyDown={(event) => event.stopPropagation()}
							placeholder="Search libraries..."
							value={query}
						/>
					</div>
				</div>
				<div className="max-h-[60vh] overflow-y-auto">
					{groups.length === 0 && (
						<p className="px-3 py-4 text-muted-foreground text-sm">
							No libraries found
						</p>
					)}
					{groups.map((group, index) => (
						<div key={group.category}>
							{index > 0 && <DropdownMenu.Separator />}
							<DropdownMenu.Label>{group.category}</DropdownMenu.Label>
							{group.items.map((lib) => (
								<DropdownMenu.Item
									asChild
									key={lib.name}
								>
									<Link to={lib.href}>
										<span
											className={`h-2 w-2 shrink-0 rounded-full ${colorMap[lib.color].dot}`}
										/>
										<span className="flex-1 truncate font-mono text-xs">
											{lib.name}
										</span>
										{lib.name === current && (
											<Check
												className="shrink-0 text-muted-foreground"
												size={14}
											/>
										)}
									</Link>
								</DropdownMenu.Item>
							))}
						</div>
					))}
				</div>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}
