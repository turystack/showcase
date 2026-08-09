import { createFileRoute } from '@tanstack/react-router'
import type { IconCategory } from '@turystack/react-icons/manifest'
import { iconManifest } from '@turystack/react-icons/manifest'
import * as iconSet from '@turystack/react-icons/web'
import type { ComponentType } from 'react'
import { useDeferredValue, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

type DisplayIcon = ComponentType<{
	accessibilityLabel?: string
	color?: string
	mirrored?: boolean
	size?: number
}>

type IconEntry = {
	name: string
	category: IconCategory
	Component: DisplayIcon
	/** Precomputed so filtering never lowercases the same 605 names again. */
	haystack: string
}

const defaultPlaygroundProps = {
	accessibilityLabel: '{name}',
	color: 'currentColor',
	mirrored: false,
	size: 28,
}

/**
 * Solar's category slugs, written the way a person would read them. Anything
 * missing here falls back to the slug, so a new Solar category shows up in the
 * filter as itself rather than disappearing.
 */
const CATEGORY_LABEL: Partial<Record<IconCategory, string>> = {
	'arrows-action': 'Arrows & actions',
	astronomy: 'Astronomy',
	it: 'Development',
	like: 'Reactions',
	parts: 'Parts',
	school: 'School',
	'text-formatting': 'Text',
	ui: 'Interface',
}

/**
 * The manifest names what exists; the module holds the components. Reading both
 * catches drift in the direction that matters: a name the manifest promises and
 * the bundle does not export would otherwise render an empty cell.
 */
const iconEntries: IconEntry[] = iconManifest
	.map(({ category, name }) => ({
		Component: (iconSet as Record<string, unknown>)[name] as DisplayIcon,
		category,
		haystack: name.toLowerCase(),
		name,
	}))
	.filter((entry) => typeof entry.Component === 'function')

const categoryCounts = iconEntries.reduce<Record<string, number>>(
	(counts, entry) => {
		counts[entry.category] = (counts[entry.category] ?? 0) + 1
		return counts
	},
	{},
)

/**
 * Biggest groups first. Alphabetical would open the filter on `arrows` and
 * `astronomy` — six icons of planets ahead of the ninety-six interface ones
 * people are actually looking for.
 */
const CATEGORIES = Object.keys(categoryCounts).sort(
	(left, right) =>
		categoryCounts[right] - categoryCounts[left] || left.localeCompare(right),
) as IconCategory[]

const labelOf = (category: IconCategory) =>
	CATEGORY_LABEL[category] ??
	category.charAt(0).toUpperCase() + category.slice(1)

export const Route = createFileRoute('/libs/react-icons/playground')({
	component: Page,
})

function Page() {
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState<IconCategory | 'all'>('all')
	const [accessibilityLabel, setAccessibilityLabel] = useState(
		defaultPlaygroundProps.accessibilityLabel,
	)
	const [color, setColor] = useState(defaultPlaygroundProps.color)
	const [mirrored, setMirrored] = useState(defaultPlaygroundProps.mirrored)
	const [size, setSize] = useState(defaultPlaygroundProps.size)

	// Typing stays responsive while the grid catches up behind it — filtering
	// 605 icons on every keystroke is enough to make the field feel stuck.
	const deferredQuery = useDeferredValue(query)
	const deferredCategory = useDeferredValue(category)

	const visibleIcons = useMemo(() => {
		const normalizedQuery = deferredQuery.trim().toLowerCase()

		return iconEntries.filter(
			(entry) =>
				(deferredCategory === 'all' || entry.category === deferredCategory) &&
				(!normalizedQuery || entry.haystack.includes(normalizedQuery)),
		)
	}, [
		deferredCategory,
		deferredQuery,
	])

	const stale = deferredQuery !== query || deferredCategory !== category
	const colorPickerValue = /^#[0-9a-f]{6}$/i.test(color) ? color : '#18181b'

	const resetPlayground = () => {
		setAccessibilityLabel(defaultPlaygroundProps.accessibilityLabel)
		setColor(defaultPlaygroundProps.color)
		setMirrored(defaultPlaygroundProps.mirrored)
		setSize(defaultPlaygroundProps.size)
	}

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-6">
			<div className="shrink-0">
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Playground
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Tune shared props and compare all {iconEntries.length} icons at once.
				</p>
			</div>

			{/*
			 * Rows are sized explicitly, not left to the content: the catalogue
			 * only gets a scrollbar of its own if its track has a height, and
			 * `items-start` would collapse it back to whatever it contains.
			 * Stacked, the controls sit above and the icons take the rest.
			 */}
			<div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:grid-rows-1">
				<section className="flex h-full min-h-0 min-w-0 flex-col gap-4">
					<div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<h2 className="font-display font-semibold text-xl">Catalogue</h2>
							<p className="mt-1 text-muted-foreground text-sm">
								Showing {visibleIcons.length} of {iconEntries.length} icons
							</p>
						</div>
						<label className="block w-full sm:max-w-sm">
							<span className="sr-only">Search icons</span>
							<input
								className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-lib"
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search by component name..."
								type="search"
								value={query}
							/>
						</label>
					</div>

					{/*
					 * One scrolling row rather than a wrapping block: 38 categories
					 * wrapped would take four rows off the top of the catalogue, and
					 * this bar is supposed to stay out of the way.
					 */}
					<div
						className="-mx-1 flex shrink-0 gap-2 overflow-x-auto px-1 pb-1"
						data-testid="icon-category-filter"
					>
						<CategoryChip
							active={category === 'all'}
							count={iconEntries.length}
							label="All"
							onSelect={() => setCategory('all')}
						/>
						{CATEGORIES.map((value) => (
							<CategoryChip
								active={category === value}
								count={categoryCounts[value] ?? 0}
								key={value}
								label={labelOf(value)}
								onSelect={() => setCategory(value)}
							/>
						))}
					</div>

					{/*
					 * The only scrolling region on the page: heading, search and
					 * filters stay put, so the controls you need to narrow 605 icons
					 * are never the thing you scrolled past.
					 */}
					<div
						className={cn(
							'min-h-0 flex-1 overflow-y-auto rounded-lg border border-border transition-opacity',
							stale && 'opacity-60',
						)}
						data-testid="icon-catalogue"
					>
						{visibleIcons.length === 0 ? (
							<p className="p-6 text-center text-muted-foreground text-sm">
								No icons found.
							</p>
						) : (
							<div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
								{visibleIcons.map(({ Component, name }) => {
									const resolvedAccessibilityLabel = accessibilityLabel.trim()
										? accessibilityLabel.replaceAll('{name}', name)
										: undefined

									return (
										<div
											className="flex min-h-36 flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-4 text-center transition-colors [contain-intrinsic-size:auto_9rem] [content-visibility:auto] hover:border-lib/50"
											data-playground-icon={name}
											key={name}
										>
											<Component
												accessibilityLabel={resolvedAccessibilityLabel}
												color={color}
												mirrored={mirrored}
												size={size}
											/>
											<code className="break-all text-muted-foreground text-xs">
												{name}
											</code>
										</div>
									)
								})}
							</div>
						)}
					</div>
				</section>

				<aside className="order-first h-full min-h-0 overflow-y-auto xl:order-last">
					<div
						className="space-y-5 border border-border bg-card p-5"
						data-testid="icon-playground-controls"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="font-display font-semibold text-lg">
									Global props
								</h2>
								<p className="mt-1 text-muted-foreground text-xs">
									Applied to every visible icon.
								</p>
							</div>
							<button
								className="rounded-md bg-background/70 px-2.5 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-lib focus-visible:outline-offset-2"
								onClick={resetPlayground}
								type="button"
							>
								Reset
							</button>
						</div>

						<div className="space-y-2 border-border/60 border-t pt-4">
							<div className="flex items-center justify-between gap-3">
								<label
									className="font-medium text-sm"
									htmlFor="icon-playground-size"
								>
									size
								</label>
								<div className="flex items-center gap-1">
									<input
										aria-label="Icon size value"
										className="h-8 w-16 rounded-md border border-border bg-background px-2 text-right font-mono text-xs outline-none transition-colors focus:border-lib"
										max="64"
										min="12"
										onChange={(event) =>
											setSize(
												Math.min(64, Math.max(12, Number(event.target.value))),
											)
										}
										type="number"
										value={size}
									/>
									<span className="text-muted-foreground text-xs">px</span>
								</div>
							</div>
							<input
								className="w-full accent-[var(--lib-accent)]"
								id="icon-playground-size"
								max="64"
								min="12"
								onChange={(event) => setSize(Number(event.target.value))}
								step="1"
								type="range"
								value={size}
							/>
						</div>

						<div className="space-y-2 border-border/60 border-t pt-4">
							<label
								className="font-medium text-sm"
								htmlFor="icon-playground-color"
							>
								color
							</label>
							<div className="flex gap-2">
								<input
									aria-label="Choose icon color"
									className="h-10 w-11 shrink-0 cursor-pointer rounded-md border border-border bg-background p-1"
									onChange={(event) => setColor(event.target.value)}
									type="color"
									value={colorPickerValue}
								/>
								<input
									className="h-10 min-w-0 flex-1 rounded-md border border-border bg-background px-3 font-mono text-xs outline-none transition-colors focus:border-lib"
									id="icon-playground-color"
									onChange={(event) => setColor(event.target.value)}
									spellCheck={false}
									type="text"
									value={color}
								/>
							</div>
							<p className="text-muted-foreground text-xs">
								Brand marks in their official palette ignore this — that is what
								makes them on-brand.
							</p>
						</div>

						<div className="flex items-center justify-between gap-4 border-border/60 border-t pt-4">
							<div>
								<label
									className="font-medium text-sm"
									htmlFor="icon-playground-mirrored"
								>
									mirrored
								</label>
								<p className="mt-0.5 text-muted-foreground text-xs">
									Flip every icon horizontally.
								</p>
							</div>
							<input
								checked={mirrored}
								className="h-4 w-4 accent-[var(--lib-accent)]"
								id="icon-playground-mirrored"
								onChange={(event) => setMirrored(event.target.checked)}
								type="checkbox"
							/>
						</div>

						<div className="space-y-2 border-border/60 border-t pt-4">
							<label
								className="font-medium text-sm"
								htmlFor="icon-playground-label"
							>
								accessibilityLabel
							</label>
							<input
								className="h-10 w-full rounded-md border border-border bg-background px-3 font-mono text-xs outline-none transition-colors focus:border-lib"
								id="icon-playground-label"
								onChange={(event) => setAccessibilityLabel(event.target.value)}
								placeholder="Leave empty for decorative icons"
								type="text"
								value={accessibilityLabel}
							/>
							<p className="text-muted-foreground text-xs">
								Use <code className="text-lib">&#123;name&#125;</code> to insert
								each component name.
							</p>
						</div>
					</div>
				</aside>
			</div>
		</div>
	)
}

type CategoryChipProps = {
	active: boolean
	count: number
	label: string
	onSelect: () => void
}

function CategoryChip({ active, count, label, onSelect }: CategoryChipProps) {
	return (
		<button
			aria-pressed={active}
			className={cn(
				'shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 font-medium text-xs transition-colors focus-visible:outline-2 focus-visible:outline-lib focus-visible:outline-offset-2',
				active
					? 'border-lib bg-lib/10 text-foreground'
					: 'border-border text-muted-foreground hover:border-lib/50 hover:text-foreground',
			)}
			onClick={onSelect}
			type="button"
		>
			{label}
			<span className="ml-1.5 text-muted-foreground tabular-nums">{count}</span>
		</button>
	)
}
