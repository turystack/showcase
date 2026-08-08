import { createFileRoute } from '@tanstack/react-router'
import { Provider, Tabs } from '@turystack/ui'
import { useMemo, useState } from 'react'

import { BlockPreview } from '@/components/blocks/BlockPreview'
import { blocks } from '@/components/blocks/registry'
import type { BlockCategory } from '@/components/blocks/types'

type Category = {
	label: string
	value: BlockCategory
}

const categories: Category[] = [
	{
		label: 'Authentication',
		value: 'authentication',
	},
	{
		label: 'Dashboard',
		value: 'dashboard',
	},
	{
		label: 'Forms',
		value: 'forms',
	},
	{
		label: 'Marketing',
		value: 'marketing',
	},
]

function Page() {
	const [activeCategory, setActiveCategory] =
		useState<BlockCategory>('authentication')

	const filteredBlocks = useMemo(
		() => blocks.filter((b) => b.category === activeCategory),
		[
			activeCategory,
		],
	)

	return (
		<Provider>
			<div className="space-y-8">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Blocks
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						Pre-built pages and sections with @turystack/react-web. Copy and
						adapt them for your project.
					</p>
				</div>

				<Tabs
					onChange={(value) => setActiveCategory(value as BlockCategory)}
					value={activeCategory}
				>
					<Tabs.List justified>
						{categories.map((cat) => (
							<Tabs.Trigger
								key={cat.value}
								value={cat.value}
							>
								{cat.label}
							</Tabs.Trigger>
						))}
					</Tabs.List>
				</Tabs>

				<div className="space-y-8">
					{filteredBlocks.map((block) => (
						<BlockPreview
							block={block}
							key={block.id}
						/>
					))}

					{filteredBlocks.length === 0 && (
						<div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border border-dashed">
							<p className="text-muted-foreground">
								Blocks em breve para esta categoria.
							</p>
						</div>
					)}
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/blocks')({
	component: Page,
})
