import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'

type ComponentPreviewProps = PropsWithChildren<{
	className?: string
	title?: string
}>

export function ComponentPreview({ children, className, title }: ComponentPreviewProps) {
	return (
		<div className="overflow-hidden rounded-lg border border-border">
			{title && (
				<div className="border-border border-b px-4 py-2">
					<span className="text-muted-foreground text-xs">{title}</span>
				</div>
			)}

			<div
				className={cn("flex min-h-32 items-center justify-center p-8", className)}
				style={{
					backgroundImage:
						'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
					backgroundSize: '20px 20px',
				}}
			>
				{children}
			</div>
		</div>
	)
}
