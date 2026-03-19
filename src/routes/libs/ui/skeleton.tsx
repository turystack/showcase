import { createFileRoute } from '@tanstack/react-router'
import { Provider, Skeleton } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const skeletonProps = [
	{
		description:
			'Additional CSS classes applied to the skeleton element. Use this to set size (e.g. h-4 w-48, h-12 w-12 rounded-full).',
		name: 'className',
		type: 'string',
	},
	{
		description: 'Optional children rendered inside the skeleton element.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Skeleton } from '@turystack/ui'

// Basic skeleton line
<Skeleton className="h-4 w-48" />

// Avatar placeholder
<Skeleton className="h-12 w-12 rounded-full" />

// Card skeleton
<div className="space-y-3 rounded-md border p-4">
  <div className="flex items-center gap-3">
    <Skeleton className="h-10 w-10 rounded-full shrink-0" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-3 w-24" />
    </div>
  </div>
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Skeleton
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A pulsing placeholder used to represent loading content. Pass sizing
						classes directly via <code>className</code>.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={skeletonProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Lines</h2>
					<ComponentPreview title="Text line skeletons">
						<div className="space-y-2">
							<Skeleton className="h-5 w-64" />
							<Skeleton className="h-4 w-48" />
							<Skeleton className="h-4 w-56" />
							<Skeleton className="h-4 w-40" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Card skeleton</h2>
					<ComponentPreview title="Profile card loading state">
						<div className="w-full max-w-sm space-y-3 rounded-md border p-4">
							<div className="flex items-center gap-3">
								<Skeleton className="h-12 w-12 shrink-0 rounded-full" />
								<div className="flex-1 space-y-2">
									<Skeleton className="h-4 w-28" />
									<Skeleton className="h-3 w-20" />
								</div>
							</div>
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Table skeleton</h2>
					<ComponentPreview title="Table rows loading state">
						<div className="w-full max-w-md space-y-2">
							{Array.from({
								length: 4,
							}).map((_, i) => (
								<div
									className="flex gap-4"
									key={i}
								>
									<Skeleton className="h-5 w-1/4" />
									<Skeleton className="h-5 w-1/3" />
									<Skeleton className="h-5 w-1/6" />
								</div>
							))}
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

export const Route = createFileRoute('/libs/ui/skeleton')({
	component: Page,
})
