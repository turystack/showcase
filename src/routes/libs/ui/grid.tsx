import { createFileRoute } from '@tanstack/react-router'
import { Grid, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const gridProps = [
	{
		default: '1',
		description: 'Number of columns in the grid.',
		name: 'cols',
		type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12',
	},
	{
		default: '"none"',
		description: 'Gap between grid cells.',
		name: 'gap',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
	},
]

const gridItemProps = [
	{
		default: '1',
		description: 'How many columns this item spans.',
		name: 'span',
		type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "full"',
	},
]

const usageCode = `import { Grid } from '@turystack/ui'

// Basic 3-column grid
<Grid cols={3} gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// With spanning items
<Grid cols={12} gap="md">
  <Grid.Item span={8}>Main content</Grid.Item>
  <Grid.Item span={4}>Sidebar</Grid.Item>
</Grid>

// Full-width item
<Grid cols={3} gap="md">
  <Grid.Item span="full">Full width header</Grid.Item>
  <div>Col 1</div>
  <div>Col 2</div>
  <div>Col 3</div>
</Grid>`

const Cell = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-12 items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
		{children}
	</div>
)

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Grid
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A layout primitive based on CSS Grid for creating column-based
						layouts. Use <code className="rounded bg-muted px-1 text-sm">Grid.Item</code> to control how many columns a child spans.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Grid Props</h2>
					<PropsTable props={gridProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Grid.Item Props
					</h2>
					<PropsTable props={gridItemProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Columns</h2>
					<ComponentPreview title="2, 3, and 4 column grids">
						<div className="w-full space-y-4">
							<div>
								<p className="mb-2 text-muted-foreground text-xs">cols={2}</p>
								<Grid
									cols={2}
									gap="sm"
								>
									<Cell>1</Cell>
									<Cell>2</Cell>
								</Grid>
							</div>
							<div>
								<p className="mb-2 text-muted-foreground text-xs">cols={3}</p>
								<Grid
									cols={3}
									gap="sm"
								>
									<Cell>1</Cell>
									<Cell>2</Cell>
									<Cell>3</Cell>
								</Grid>
							</div>
							<div>
								<p className="mb-2 text-muted-foreground text-xs">cols={4}</p>
								<Grid
									cols={4}
									gap="sm"
								>
									<Cell>1</Cell>
									<Cell>2</Cell>
									<Cell>3</Cell>
									<Cell>4</Cell>
								</Grid>
							</div>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Spanning items</h2>
					<ComponentPreview title="Grid.Item with span">
						<div className="w-full space-y-4">
							<div>
								<p className="mb-2 text-muted-foreground text-xs">
									12-col grid with span=8 + span=4
								</p>
								<Grid
									cols={12}
									gap="sm"
								>
									<Grid.Item span={8}>
										<Cell>Main (8)</Cell>
									</Grid.Item>
									<Grid.Item span={4}>
										<Cell>Sidebar (4)</Cell>
									</Grid.Item>
								</Grid>
							</div>
							<div>
								<p className="mb-2 text-muted-foreground text-xs">
									span="full" → full width
								</p>
								<Grid
									cols={3}
									gap="sm"
								>
									<Grid.Item span="full">
										<Cell>Full width header</Cell>
									</Grid.Item>
									<Cell>Col 1</Cell>
									<Cell>Col 2</Cell>
									<Cell>Col 3</Cell>
								</Grid>
							</div>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/grid')({
	component: Page,
})
