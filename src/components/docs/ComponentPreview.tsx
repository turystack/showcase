import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type ComponentPreviewProps = PropsWithChildren<{
	className?: string
	title?: string
}>

/**
 * A component from the library, shown in the library's own colours.
 *
 * The frame — border, title, dot grid — belongs to this site and keeps the
 * site's palette. The content area wears `react-web-surface`, which restores
 * react-web's tokens for everything inside it. Without that the previews were
 * quietly wrong: both stylesheets declare the same tokens at `:root`, this
 * site's is imported second, and a `<Button variant="default">` rendered in the
 * showcase's green instead of the library's near-black. Nothing looked broken,
 * which is why it survived — a component library whose demos show the wrong
 * colours is documenting a product nobody ships.
 */
export function ComponentPreview({
	children,
	className,
	title,
}: ComponentPreviewProps) {
	return (
		<div className="overflow-hidden rounded-lg border border-border">
			{title && (
				<div className="border-border border-b px-4 py-2">
					<span className="text-muted-foreground text-xs">{title}</span>
				</div>
			)}

			<div
				className={cn(
					'react-web-surface flex min-h-32 items-center justify-center bg-background p-8',
					className,
				)}
				style={{
					// `hsl(var(--border))` was left over from a palette that stored bare
					// HSL channels. react-web ships `oklch(...)`, so the function call
					// was invalid and the dot grid had silently stopped rendering.
					// Mixed down, so a theme with an ink --border (the Example) does not
					// turn the backdrop into a grid of black dots behind every preview.
					backgroundImage:
						'radial-gradient(circle, color-mix(in oklch, var(--border) 50%, transparent) 1px, transparent 1px)',
					backgroundSize: '20px 20px',
				}}
			>
				{children}
			</div>
		</div>
	)
}
