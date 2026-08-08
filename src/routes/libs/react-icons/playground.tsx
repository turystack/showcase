import { createFileRoute } from '@tanstack/react-router'
import * as iconSet from '@turystack/react-icons/web'
import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'

type DisplayIcon = ComponentType<{
	accessibilityLabel?: string
	color?: string
	mirrored?: boolean
	size?: number
}>

const defaultPlaygroundProps = {
	accessibilityLabel: '{name}',
	color: 'currentColor',
	mirrored: false,
	size: 28,
}

const iconEntries = Object.entries(iconSet)
	.filter(
		([name, component]) =>
			name.endsWith('Icon') && typeof component === 'function',
	)
	.sort(([left], [right]) => left.localeCompare(right)) as Array<
	[
		string,
		DisplayIcon,
	]
>

export const Route = createFileRoute('/libs/react-icons/playground')({
	component: Page,
})

function Page() {
	const [query, setQuery] = useState('')
	const [accessibilityLabel, setAccessibilityLabel] = useState(
		defaultPlaygroundProps.accessibilityLabel,
	)
	const [color, setColor] = useState(defaultPlaygroundProps.color)
	const [mirrored, setMirrored] = useState(defaultPlaygroundProps.mirrored)
	const [size, setSize] = useState(defaultPlaygroundProps.size)
	const visibleIcons = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase()

		return normalizedQuery
			? iconEntries.filter(([name]) =>
					name.toLowerCase().includes(normalizedQuery),
				)
			: iconEntries
	}, [
		query,
	])
	const colorPickerValue = /^#[0-9a-f]{6}$/i.test(color) ? color : '#18181b'

	const resetPlayground = () => {
		setAccessibilityLabel(defaultPlaygroundProps.accessibilityLabel)
		setColor(defaultPlaygroundProps.color)
		setMirrored(defaultPlaygroundProps.mirrored)
		setSize(defaultPlaygroundProps.size)
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Playground
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Tune shared props and compare all {iconEntries.length} semantic icons
					at once.
				</p>
			</div>

			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
				<div className="min-w-0">
					<section className="space-y-4">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
							<div>
								<h2 className="font-display font-semibold text-xl">Catalog</h2>
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

						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
							{visibleIcons.map(([name, IconComponent]) => {
								const resolvedAccessibilityLabel = accessibilityLabel.trim()
									? accessibilityLabel.replaceAll('{name}', name)
									: undefined

								return (
									<div
										className="flex min-h-36 flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-lib/50"
										data-playground-icon={name}
										key={name}
									>
										<IconComponent
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

						{visibleIcons.length === 0 && (
							<p className="rounded-lg border border-border p-6 text-center text-muted-foreground text-sm">
								No icons found.
							</p>
						)}
					</section>
				</div>

				<aside className="order-first xl:sticky xl:top-4 xl:order-last">
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
