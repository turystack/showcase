import { useState } from 'react'

import type { BlockDefinition } from './types'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { cn } from '@/lib/utils'

type BlockPreviewProps = {
	block: BlockDefinition
}

export function BlockPreview({ block }: BlockPreviewProps) {
	const [mode, setMode] = useState<'preview' | 'code'>('preview')
	const Component = block.component

	return (
		<div className="overflow-hidden rounded-lg border border-border">
			<div className="flex items-center justify-between border-border border-b px-4 py-3">
				<div>
					<h3 className="font-medium text-sm">{block.name}</h3>
					<p className="text-muted-foreground text-xs">{block.description}</p>
				</div>
				<div className="flex items-center gap-1 rounded-md border border-border p-0.5">
					<button
						className={cn(
							'rounded px-3 py-1 font-medium text-xs transition-colors',
							mode === 'preview'
								? 'bg-primary text-primary-foreground'
								: 'text-muted-foreground hover:text-foreground',
						)}
						onClick={() => setMode('preview')}
						type="button"
					>
						Preview
					</button>
					<button
						className={cn(
							'rounded px-3 py-1 font-medium text-xs transition-colors',
							mode === 'code'
								? 'bg-primary text-primary-foreground'
								: 'text-muted-foreground hover:text-foreground',
						)}
						onClick={() => setMode('code')}
						type="button"
					>
						Code
					</button>
				</div>
			</div>

			{mode === 'preview' ? (
				<div
					className={cn(
						'overflow-auto',
						block.fullPage
							? 'min-h-[600px] bg-background'
							: 'min-h-[400px] p-8',
					)}
					style={
						block.fullPage
							? undefined
							: {
									backgroundImage:
										'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
									backgroundSize: '20px 20px',
								}
					}
				>
					<Component />
				</div>
			) : (
				<CodeBlock
					code={block.code}
					language="tsx"
				/>
			)}
		</div>
	)
}
