import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import {
	type KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

import { allSearchItems, type SearchItem } from '@/data/search-items'
import { cn } from '@/lib/utils'

type GroupedResults = {
	key: string
	items: SearchItem[]
}

function groupBySection(items: SearchItem[]): GroupedResults[] {
	const map = new Map<string, SearchItem[]>()

	for (const item of items) {
		const key = `${item.library} > ${item.section}`
		const group = map.get(key)
		if (group) {
			group.push(item)
		} else {
			map.set(key, [
				item,
			])
		}
	}

	return Array.from(map.entries()).map(([key, items]) => ({
		items,
		key,
	}))
}

function highlightMatch(text: string, query: string) {
	if (!query) {
		return text
	}

	const idx = text.toLowerCase().indexOf(query.toLowerCase())
	if (idx === -1) {
		return text
	}

	return (
		<>
			{text.slice(0, idx)}
			<span className="font-medium text-tury-green">
				{text.slice(idx, idx + query.length)}
			</span>
			{text.slice(idx + query.length)}
		</>
	)
}

export function SpotlightSearch() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [selectedIndex, setSelectedIndex] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)
	const listRef = useRef<HTMLDivElement>(null)
	const navigate = useNavigate()

	const filtered = useMemo(() => {
		if (!query.trim()) {
			return allSearchItems
		}

		const q = query.toLowerCase()
		return allSearchItems.filter((item) => item.label.toLowerCase().includes(q))
	}, [
		query,
	])

	const grouped = useMemo(
		() => groupBySection(filtered),
		[
			filtered,
		],
	)

	const flatFiltered = useMemo(
		() => grouped.flatMap((g) => g.items),
		[
			grouped,
		],
	)

	const closeSpotlight = useCallback(() => {
		setOpen(false)
	}, [])

	const selectItem = useCallback(
		(item: SearchItem) => {
			closeSpotlight()
			navigate({
				to: item.to,
			})
		},
		[
			closeSpotlight,
			navigate,
		],
	)

	useEffect(() => {
		function handleKeyDown(e: globalThis.KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault()
				setOpen((prev) => !prev)
				if (!open) {
					setQuery('')
					setSelectedIndex(0)
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [
		open,
	])

	useEffect(() => {
		if (open) {
			requestAnimationFrame(() => inputRef.current?.focus())
		}
	}, [
		open,
	])

	useEffect(() => {
		setSelectedIndex(0)
	}, [
		query,
	])

	useEffect(() => {
		if (!listRef.current) {
			return
		}

		const selected = listRef.current.querySelector('[data-selected="true"]')
		selected?.scrollIntoView({
			block: 'nearest',
		})
	}, [
		selectedIndex,
	])

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				setSelectedIndex((prev) =>
					prev < flatFiltered.length - 1 ? prev + 1 : 0,
				)
				break
			case 'ArrowUp':
				e.preventDefault()
				setSelectedIndex((prev) =>
					prev > 0 ? prev - 1 : flatFiltered.length - 1,
				)
				break
			case 'Enter':
				e.preventDefault()
				if (flatFiltered[selectedIndex]) {
					selectItem(flatFiltered[selectedIndex])
				}
				break
			case 'Escape':
				e.preventDefault()
				closeSpotlight()
				break
		}
	}

	let itemCounter = -1

	if (!open) {
		return null
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
			<div
				aria-hidden="true"
				className="fade-in fixed inset-0 animate-in bg-background/80 backdrop-blur-sm duration-150"
				onClick={closeSpotlight}
			/>

			<div className="fade-in zoom-in-95 relative z-10 mx-4 w-full max-w-lg animate-in duration-150">
				<div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
					<div className="flex items-center gap-3 border-border border-b px-4">
						<Search className="h-4 w-4 shrink-0 text-muted-foreground" />
						<input
							className="flex h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Search components, functions..."
							ref={inputRef}
							type="text"
							value={query}
						/>
						<kbd className="pointer-events-none shrink-0 select-none rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-muted-foreground text-xs">
							ESC
						</kbd>
					</div>

					<div
						className="max-h-80 overflow-y-auto p-2"
						ref={listRef}
					>
						{flatFiltered.length === 0 ? (
							<p className="py-6 text-center text-muted-foreground text-sm">
								No results found.
							</p>
						) : (
							grouped.map((group) => (
								<div
									className="mb-2 last:mb-0"
									key={group.key}
								>
									<p className="px-2 py-1.5 font-medium text-muted-foreground text-xs">
										{group.key}
									</p>
									{group.items.map((item) => {
										itemCounter++
										const idx = itemCounter
										const isSelected = idx === selectedIndex

										return (
											<button
												className={cn(
													'flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors',
													isSelected
														? 'bg-tury-green/10 text-tury-green'
														: 'text-foreground hover:bg-muted',
												)}
												data-selected={isSelected}
												key={item.to}
												onClick={() => selectItem(item)}
												onMouseEnter={() => setSelectedIndex(idx)}
												type="button"
											>
												{highlightMatch(item.label, query)}
											</button>
										)
									})}
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export function SpotlightTrigger({ className }: { className?: string }) {
	return (
		<button
			className={cn(
				'flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground',
				className,
			)}
			onClick={() => {
				document.dispatchEvent(
					new KeyboardEvent('keydown', {
						bubbles: true,
						key: 'k',
						metaKey: true,
					}),
				)
			}}
			type="button"
		>
			<Search className="h-3.5 w-3.5" />
			<span className="hidden sm:inline">Search...</span>
			<kbd className="pointer-events-none ml-auto hidden select-none rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
				⌘K
			</kbd>
		</button>
	)
}
