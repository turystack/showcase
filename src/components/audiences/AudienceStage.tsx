import { Maximize2Icon, Minimize2Icon } from '@turystack/react-icons'
import { PortalProvider } from '@turystack/react-web'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { CodeBlock } from '@/components/docs/CodeBlock'
import type { Audience } from '@/data/react-web-audiences'
import { cn } from '@/lib/utils'

/**
 * One screen at a time, on the biggest stage the page can give it.
 *
 * The stacked version showed every layout at once, each in a box a few hundred
 * pixels tall. That is a fine way to compare two cards and a poor way to judge
 * a sign-in screen: a screen is a whole viewport, and one shown at a third of
 * one is being judged at a size it will never ship at.
 *
 * So the scenarios become a list you pick from, and whatever is picked gets
 * every pixel left over. The chrome is deliberately two thin rows — anything
 * taller is stage the screen does not get.
 *
 * The expanded and inline states share one render path rather than two. An
 * earlier draft mounted the stage in both and left the hidden copy running:
 * two of every screen, two of every effect, and a form whose state depended on
 * which copy you had typed into.
 */
const ROW = 'flex flex-wrap items-center gap-2'

/**
 * A bar whose left side wraps and whose right side does not move. The bar
 * itself never wraps: with `flex-wrap` on it, an audience with many variants
 * pushed Preview/Code onto a row of its own, on the left. The controls sit on
 * the right, centred on the bar however many lines the buttons take.
 */
const BAR = 'flex shrink-0 items-center justify-between gap-4'

export function AudienceStage({ audience }: { audience: Audience }) {
	const [layoutId, setLayoutId] = useState(audience.layouts[0]?.id)
	const [group, setGroup] = useState(audience.layouts[0]?.group ?? 'Screens')
	const [variant, setVariant] = useState<string>(
		audience.layouts[0]?.variants[0]?.id ?? 'default',
	)
	const [variantGroup, setVariantGroup] = useState(
		audience.layouts[0]?.variants[0]?.group ?? 'Variants',
	)
	const [mode, setMode] = useState<'preview' | 'code'>('preview')
	// A state ref, so the portal provider re-renders once the host exists.
	// Until then its container is null, which holds every portal back rather
	// than sending it to the body.
	const [overlayHost, setOverlayHost] = useState<HTMLDivElement | null>(null)
	const [expanded, setExpanded] = useState(false)

	/**
	 * The library accent, carried across the portal.
	 *
	 * `--lib-accent` is set by inline style on the docs shell and `--color-lib`
	 * is an inline theme token, so `bg-lib` resolves it at the element. Portalled
	 * onto `document.body` the overlay is outside that shell, and every accented
	 * control would silently fall back to the brand green. So the value is read
	 * off the mounted tree on the way out and re-declared on the overlay.
	 */
	const rootRef = useRef<HTMLDivElement>(null)
	const [accent, setAccent] = useState<string>()

	const expand = () => {
		const value = rootRef.current
			? getComputedStyle(rootRef.current)
					.getPropertyValue('--lib-accent')
					.trim()
			: ''

		setAccent(value || undefined)
		setExpanded(true)
	}

	const layout = audience.layouts.find((item) => item.id === layoutId)
	const groups = Array.from(
		new Set(audience.layouts.map((item) => item.group ?? 'Screens')),
	)
	const variantGroups = Array.from(
		new Set(layout?.variants.map((item) => item.group ?? 'Variants') ?? []),
	)

	// Escape leaves the expanded stage, and the body stops scrolling underneath
	// it. A surface that covers the window has to answer the key everyone
	// presses first, and must not leave a second scrollbar behind it.
	useEffect(() => {
		if (!expanded) {
			return
		}

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setExpanded(false)
			}
		}

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		document.addEventListener('keydown', onKey)

		return () => {
			document.body.style.overflow = previousOverflow
			document.removeEventListener('keydown', onKey)
		}
	}, [
		expanded,
	])

	/**
	 * An audience with nothing built says so, and says what it owes.
	 *
	 * Returning `null` here — which this did — hands a blank page to the two
	 * audiences that are defined and empty, and would have done the same to the
	 * two being added. A stand-in screen would be worse: it looks finished. The
	 * scenario list is the honest middle, and it is the only place that names
	 * what is still missing.
	 */
	if (!layout) {
		if (audience.slug === 'backoffice') {
			return <div className="h-full" />
		}

		return (
			<div className="flex h-full min-h-0 flex-col gap-6 overflow-y-auto">
				<header className="shrink-0">
					<p className="font-medium text-lib text-xs uppercase tracking-wider">
						{audience.tagline}
					</p>
					<h1 className="mt-1 font-bold font-display text-2xl tracking-tight">
						{audience.title}
					</h1>
					<p className="mt-3 max-w-prose text-muted-foreground">
						{audience.summary}
					</p>
				</header>

				<div className="rounded-lg border border-border border-dashed px-6 py-10 text-center">
					<p className="font-display font-semibold text-base">
						No screens here yet
					</p>
					<p className="mx-auto mt-2 max-w-prose text-muted-foreground text-sm">
						This audience is defined and not built. The scenarios below are what
						it will cover — nothing renders until a real screen exists.
					</p>
				</div>

				<section className="space-y-3">
					<h2 className="font-display font-semibold text-lg">Scenarios</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						Each one becomes a screen with its own comparable variants.
					</p>
					<ul className="flex flex-wrap gap-2">
						{audience.scenarios.map((scenario) => (
							<li
								className="rounded-full border border-border px-3 py-1 text-muted-foreground text-xs"
								key={scenario}
							>
								{scenario}
							</li>
						))}
					</ul>
				</section>
			</div>
		)
	}

	const activeVariant = layout.variants.find((item) => item.id === variant)

	// Variant ids are per layout — `split` and `social` exist on both sign-in and
	// sign-up — so carrying one across would land on a variant the new screen
	// does not have, and render its fallback.
	const selectLayout = (id: string) => {
		const next = audience.layouts.find((item) => item.id === id)
		setLayoutId(id)
		setVariant(next?.variants[0]?.id ?? 'default')
		setVariantGroup(next?.variants[0]?.group ?? 'Variants')
	}

	const selectGroup = (nextGroup: string) => {
		const firstLayout = audience.layouts.find(
			(item) => (item.group ?? 'Screens') === nextGroup,
		)
		setGroup(nextGroup)
		if (firstLayout) {
			selectLayout(firstLayout.id)
		}
	}

	const groupButtons =
		groups.length > 1 &&
		groups.map((item) => (
			<button
				className={cn(
					'rounded-md px-3 py-1.5 font-medium text-sm transition-colors',
					item === group
						? 'bg-lib text-white'
						: 'text-muted-foreground hover:bg-muted hover:text-foreground',
				)}
				key={item}
				onClick={() => selectGroup(item)}
				type="button"
			>
				{item}
			</button>
		))

	const scenarioButtons = audience.layouts
		.filter((item) => (item.group ?? 'Screens') === group)
		.map((item) => (
			<button
				className={cn(
					'rounded-md px-3 py-1.5 font-medium text-sm transition-colors',
					item.id === layoutId
						? 'bg-lib text-white'
						: 'text-muted-foreground hover:bg-muted hover:text-foreground',
				)}
				key={item.id}
				onClick={() => selectLayout(item.id)}
				type="button"
			>
				{item.name}
			</button>
		))

	const variantGroupButtons =
		variantGroups.length > 1 &&
		variantGroups.map((item) => (
			<button
				className={cn(
					'rounded-md px-2.5 py-1 font-medium text-xs transition-colors',
					item === variantGroup
						? 'bg-muted text-foreground'
						: 'text-muted-foreground hover:text-foreground',
				)}
				key={item}
				onClick={() => {
					const next = layout.variants.find(
						(variant) => (variant.group ?? 'Variants') === item,
					)
					setVariantGroup(item)
					if (next) {
						setVariant(next.id)
					}
				}}
				type="button"
			>
				{item}
			</button>
		))

	const variantButtons = layout.variants
		.filter((item) => (item.group ?? 'Variants') === variantGroup)
		.map((item) => (
			<button
				className={cn(
					'rounded-full border px-3 py-1 font-medium text-xs transition-colors',
					item.id === variant
						? 'border-lib bg-lib/10 text-lib'
						: 'border-border text-muted-foreground hover:text-foreground',
				)}
				key={item.id}
				onClick={() => setVariant(item.id)}
				type="button"
			>
				{item.label}
			</button>
		))

	const expandButton = (
		<button
			aria-label={expanded ? 'Leave full screen' : 'Fill the screen'}
			className="shrink-0 rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
			onClick={() => (expanded ? setExpanded(false) : expand())}
			type="button"
		>
			{expanded ? <Minimize2Icon size={14} /> : <Maximize2Icon size={14} />}
		</button>
	)

	/**
	 * The screen gets the leftover height the way it asked for it.
	 *
	 * A screen that is a whole shell — every auth screen is a `<Layout
	 * variant="centered" height="fill">` — asks for `fill`: it takes the
	 * stage's full height and centres its own content inside it, the way it
	 * would centre it in a browser window. A split screen stretched this way is
	 * two full-height panes, not a branded band with dead ground around it.
	 *
	 * A screen that is only a block asks for `center` and is centred here. The
	 * choice can be made per variant as well as per layout, for a layout whose
	 * variants are different kinds of thing.
	 *
	 * For the centred case, `m-auto` rather than `justify-center`: flex and grid
	 * centring push overflow past the top of the scroll box and make it
	 * unreachable, while auto margins never resolve negative.
	 */
	const fit = activeVariant?.stage ?? layout.stage ?? 'center'

	const body =
		mode === 'preview' ? (
			/*
			  The stage is the screen's window, and that includes its overlays. A
			  modal, a sheet or a popover a screen opens portals into the host at
			  the end of this box instead of `document.body`, and the transform
			  makes the box the containing block of their `position: fixed` — so a
			  sheet slides in from the stage's edge, its backdrop covers the stage
			  and not the docs, and the scenario buttons above stay clickable.
			  `overflow-clip` rather than `overflow-hidden`: a clipped box cannot
			  be scrolled sideways by a popup that opens past its edge.
			*/
			<div
				className="react-web-surface relative min-h-0 flex-1 overflow-clip bg-background"
				style={{
					transform: 'translate(0)',
				}}
			>
				<div className="h-full overflow-auto">
					{/*
					  `fill` is a height, not a floor: a screen that is a whole shell is
					  given the stage the way a browser gives it a window, so its own
					  content pane scrolls and its `h-full` resolves against something.
					  With only `min-h-full` here the shell's height was indefinite and
					  a centred Layout.Content sat at the top of the stage.
					*/}
					<PortalProvider container={overlayHost}>
						<div
							className={cn(
								'flex',
								fit === 'fill' ? 'h-full [&>*]:w-full' : 'min-h-full',
							)}
						>
							{fit === 'fill' ? (
								layout.render(variant)
							) : (
								<div className="m-auto w-full">{layout.render(variant)}</div>
							)}
						</div>
					</PortalProvider>
				</div>
				<div ref={setOverlayHost} />
			</div>
		) : (
			<div className="min-h-0 flex-1 overflow-auto">
				<CodeBlock
					code={activeVariant?.source ?? layout.source}
					language="tsx"
				/>
			</div>
		)

	/**
	 * The expanded stage is portalled onto `document.body`.
	 *
	 * It used to render in place, inside `main` — which is itself `fixed`, sits
	 * under a `fixed z-50` site header, and is wrapped in `overflow-hidden`. A
	 * full-window overlay nested in that has too many ways to end up clipped or
	 * painted under something, and when it does, the control that leaves it goes
	 * with it: you can enter full screen and not get out.
	 *
	 * A portal removes the whole class of problem rather than the one instance
	 * of it — nothing above this node can clip it, and `z-[100]` clears every
	 * z-index the site uses (50 for the header, 40 for the sidebar).
	 */
	if (expanded) {
		return createPortal(
			<div
				className="fixed inset-0 z-[100] flex flex-col bg-background"
				style={
					accent
						? ({
								'--lib-accent': accent,
							} as CSSProperties)
						: undefined
				}
			>
				<div className={cn(BAR, 'border-border border-b px-4 py-2')}>
					<div className={cn(ROW, 'min-w-0 flex-1')}>
						{groupButtons}
						{groups.length > 1 && (
							<span
								aria-hidden="true"
								className="mx-1 h-4 w-px bg-border"
							/>
						)}
						{scenarioButtons}
						{layout.variants.length > 0 && (
							<span
								aria-hidden="true"
								className="mx-1 h-4 w-px bg-border"
							/>
						)}
						{variantGroupButtons}
						{variantGroups.length > 1 && (
							<span
								aria-hidden="true"
								className="mx-1 h-4 w-px bg-border"
							/>
						)}
						{variantButtons}
					</div>

					<div className="flex shrink-0 items-center gap-2">
						{/* Two ways out, both visible. One of them is a keyboard key,
						    which is the one people try before looking for a button. */}
						<kbd className="hidden rounded-lg border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
							Esc
						</kbd>
						{expandButton}
					</div>
				</div>

				{body}
			</div>,
			document.body,
		)
	}

	return (
		<div
			className="flex h-full min-h-0 flex-col gap-4"
			ref={rootRef}
		>
			<header className="shrink-0">
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					{audience.tagline}
				</p>
				<h1 className="mt-1 font-bold font-display text-2xl tracking-tight">
					{audience.title}
				</h1>
			</header>

			<div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border">
				{/* Group first, then the small set of scenarios within it. */}
				<div className={cn(ROW, 'shrink-0 border-border border-b px-4 py-2.5')}>
					{groupButtons}
					{groups.length > 1 && (
						<span
							aria-hidden="true"
							className="mx-1 h-4 w-px bg-border"
						/>
					)}
					{scenarioButtons}
				</div>

				{/* Row two: which variant of it, and how to look at it. */}
				<div
					className={cn(BAR, 'border-border border-b bg-muted/30 px-4 py-2')}
				>
					<div className={cn(ROW, 'min-w-0 flex-1')}>
						{variantGroupButtons}
						{variantGroups.length > 1 && (
							<span
								aria-hidden="true"
								className="mx-1 h-4 w-px bg-border"
							/>
						)}
						{variantButtons}
						{/* One line of its own, cut with an ellipsis: a longer description
						    used to wrap and grow the bar, so picking a chip moved the stage. */}
						<span
							className="block basis-full truncate text-muted-foreground text-xs"
							title={activeVariant?.description ?? layout.description}
						>
							{activeVariant?.description ?? layout.description}
						</span>
					</div>

					<div className="flex shrink-0 items-center gap-1">
						<div className="flex items-center gap-1 rounded-md border border-border p-0.5">
							{(
								[
									'preview',
									'code',
								] as const
							).map((value) => (
								<button
									className={cn(
										'rounded-lg px-2.5 py-1 font-medium text-xs capitalize transition-colors',
										mode === value
											? 'bg-lib text-white'
											: 'text-muted-foreground hover:text-foreground',
									)}
									key={value}
									onClick={() => setMode(value)}
									type="button"
								>
									{value}
								</button>
							))}
						</div>

						{expandButton}
					</div>
				</div>

				{body}
			</div>
		</div>
	)
}
