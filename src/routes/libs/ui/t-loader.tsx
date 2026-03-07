import { createFileRoute } from '@tanstack/react-router'
import { Loader } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const loaderProps = [
	{
		default: '"md"',
		description: 'Controls the size of the spinning icon.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const usageCode = `import { Loader } from '@turystack/ui'

<Loader />
<Loader size="sm" />
<Loader size="lg" />`

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Loader
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A spinning indicator used to communicate that content is loading or an
					action is in progress.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={loaderProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="Loader sizes">
					<div className="flex flex-wrap items-center gap-6">
						<Loader size="sm" />
						<Loader size="md" />
						<Loader size="lg" />
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
	)
}

export const Route = createFileRoute('/libs/ui/t-loader')({
	component: Page,
})
