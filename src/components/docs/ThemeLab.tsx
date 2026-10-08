import { Check, Copy, Palette, RotateCcw, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { buildThemePrompt } from '@/data/react-web-theme-prompt'
import { THEME_MODES } from '@/data/react-web-themes'
import { useThemeLab } from '@/lib/theme-lab'
import { cn } from '@/lib/utils'

/**
 * The panel is built from this site's own markup, never from react-web.
 *
 * It edits the CSS that reskins react-web, so a panel built out of react-web
 * would deform itself as you typed — a radius of 0 and a 3px offset shadow
 * would land on the very textarea you were writing them in. Staying outside the
 * scope keeps the editor readable no matter how far the theme goes.
 */
export function ThemeLabTrigger() {
	const [open, setOpen] = useState(false)
	const { mode } = useThemeLab()

	return (
		<>
			<button
				aria-label="Theme lab"
				className={cn(
					'relative cursor-pointer rounded-lg p-2 transition-colors',
					'text-muted-foreground hover:bg-secondary hover:text-foreground',
					mode !== 'default' && 'text-tury-green',
				)}
				onClick={() => setOpen(true)}
				title="Theme lab — custom CSS over react-web"
				type="button"
			>
				<Palette size={18} />
				{mode !== 'default' ? (
					<span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-tury-green" />
				) : null}
			</button>

			<ThemeLabPanel
				onClose={() => setOpen(false)}
				open={open}
			/>
		</>
	)
}

function ThemeLabPanel({
	onClose,
	open,
}: {
	onClose: () => void
	open: boolean
}) {
	const { customCss, activeCss, mode, reset, setCustomCss, setMode } =
		useThemeLab()

	useEffect(() => {
		if (!open) {
			return
		}

		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [
		onClose,
		open,
	])

	useEffect(() => {
		if (!open) {
			return
		}

		const previous = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = previous
		}
	}, [
		open,
	])

	if (!open) {
		return null
	}

	/**
	 * Portalled to `document.body` on purpose. Both headers wear
	 * `backdrop-blur-xl`, and a backdrop-filter turns its element into the
	 * containing block for `position: fixed` descendants. Rendered in place, this
	 * overlay resolved `inset-0` against the 64px header strip instead of the
	 * viewport — the panel came out one header tall, so nothing scrolled and the
	 * page below stayed unblurred.
	 */
	return createPortal(
		<div className="fixed inset-0 z-[100]">
			<button
				aria-label="Close theme lab"
				className="fade-in absolute inset-0 animate-in bg-background/70 backdrop-blur-sm duration-150"
				onClick={onClose}
				type="button"
			/>

			<aside className="slide-in-from-right-full absolute inset-y-0 right-0 flex w-full max-w-md animate-in flex-col border-border border-l bg-background shadow-2xl duration-200">
				<header className="flex shrink-0 items-start justify-between gap-4 border-border border-b px-5 py-4">
					<div>
						<h2 className="font-display font-semibold text-base">Theme lab</h2>
						<p className="mt-1 text-muted-foreground text-xs">
							Custom CSS over react-web. Applies to every component, on every
							page.
						</p>
					</div>
					<button
						aria-label="Close"
						className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						onClick={onClose}
						type="button"
					>
						<X size={18} />
					</button>
				</header>

				<div className="flex shrink-0 flex-col gap-2 border-border border-b px-5 py-4">
					{THEME_MODES.map((option) => (
						<button
							className={cn(
								'rounded-lg border px-3 py-2 text-left transition-colors',
								mode === option.id
									? 'border-tury-green bg-tury-green/10'
									: 'border-border hover:bg-muted',
							)}
							key={option.id}
							onClick={() => setMode(option.id)}
							type="button"
						>
							<span
								className={cn(
									'font-medium text-sm',
									mode === option.id && 'text-tury-green',
								)}
							>
								{option.name}
							</span>
							<span className="mt-0.5 block text-muted-foreground text-xs">
								{option.description}
							</span>
						</button>
					))}
				</div>

				<div className="flex min-h-0 flex-1 flex-col gap-3 px-5 py-4">
					{mode === 'default' ? (
						<p className="text-muted-foreground text-sm">
							Nothing is overridden. Pick{' '}
							<strong className="text-foreground">Graphite</strong>,{' '}
							<strong className="text-foreground">Pebble</strong> or{' '}
							<strong className="text-foreground">Slate</strong> to see what a
							theme can reach, or{' '}
							<strong className="text-foreground">Custom</strong> to write your
							own.
						</p>
					) : (
						<>
							<p className="text-muted-foreground text-xs">
								Bare declarations land on the react-web scope; nested rules
								target the library's component classes —{' '}
								<code className="rounded bg-muted px-1 py-0.5">.button</code>,{' '}
								<code className="rounded bg-muted px-1 py-0.5">.card-root</code>
								,{' '}
								<code className="rounded bg-muted px-1 py-0.5">
									.select-trigger
								</code>
								. Write each token twice:{' '}
								<code className="rounded bg-muted px-1 py-0.5">--x</code> and{' '}
								<code className="rounded bg-muted px-1 py-0.5">--color-x</code>.
							</p>

							{mode === 'custom' ? (
								<textarea
									aria-label="Custom CSS"
									className={cn(
										'min-h-0 flex-1 resize-none rounded-lg border border-border bg-muted/40 p-3',
										'font-mono text-xs leading-relaxed outline-none',
										'focus-visible:border-tury-green focus-visible:ring-2 focus-visible:ring-tury-green/30',
									)}
									onChange={(event) => setCustomCss(event.target.value)}
									spellCheck={false}
									value={customCss}
								/>
							) : (
								<pre className="min-h-0 flex-1 overflow-auto rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
									{activeCss}
								</pre>
							)}
						</>
					)}
				</div>

				<footer className="flex shrink-0 items-center justify-between gap-3 border-border border-t px-5 py-4">
					<span className="text-muted-foreground text-xs">
						Saved in this browser.
					</span>
					<div className="flex items-center gap-2">
						<CopyPromptButton />
						{mode !== 'default' && mode !== 'custom' ? (
							<button
								className="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
								onClick={() => {
									setCustomCss(activeCss)
									setMode('custom')
								}}
								type="button"
							>
								Copy to Custom
							</button>
						) : null}
						<button
							className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
							onClick={reset}
							type="button"
						>
							<RotateCcw size={13} />
							Reset
						</button>
					</div>
				</footer>
			</aside>
		</div>,
		document.body,
	)
}

/**
 * Hands the reader a prompt instead of a blank textarea.
 *
 * The Custom tab opens with every slot react-web publishes and no values, which
 * is the right starting point and still a great many empty rules to fill by
 * hand. The prompt carries that same surface inline and asks the model for the
 * one thing it cannot derive — where the design system lives — before it writes
 * a line. What comes back is pasted straight back into this panel.
 */
function CopyPromptButton() {
	const [copied, setCopied] = useState(false)

	return (
		<button
			className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs transition-colors hover:bg-muted"
			onClick={async () => {
				await navigator.clipboard.writeText(buildThemePrompt())
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			}}
			title="Copy a prompt that turns your design system into this CSS"
			type="button"
		>
			{copied ? (
				<>
					<Check
						className="text-tury-green"
						size={13}
					/>
					Copied
				</>
			) : (
				<>
					<Copy size={13} />
					Copy AI prompt
				</>
			)}
		</button>
	)
}
