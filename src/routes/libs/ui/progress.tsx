import { createFileRoute } from '@tanstack/react-router'
import { Progress, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const progressProps = [
	{
		description: 'Controlled progress value between 0 and 100.',
		name: 'value',
		type: 'number',
	},
	{
		description: 'Default value when uncontrolled.',
		name: 'defaultValue',
		type: 'number',
	},
	{
		description:
			'Label text or a label config object with content, required, optional, and disabled.',
		name: 'label',
		type: 'string | { content?: string; required?: boolean; optional?: boolean; disabled?: boolean }',
	},
	{
		default: '"md"',
		description: 'Controls the height of the progress track.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const usageCode = `import { Progress } from '@turystack/ui'

// Basic
<Progress value={60} />

// With label
<Progress label="Upload progress" value={75} />

// Sizes
<Progress size="sm" value={60} />
<Progress size="md" value={60} />
<Progress size="lg" value={60} />

// Uncontrolled
<Progress defaultValue={30} />

// Indeterminate (no value)
<Progress />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Progress
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A progress bar that visualizes completion percentage. Supports a
						label, three sizes, and an indeterminate state.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={progressProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Values</h2>
					<ComponentPreview title="Progress at various values">
						<div className="w-full max-w-md space-y-4">
							<Progress value={0} />
							<Progress value={25} />
							<Progress value={50} />
							<Progress value={75} />
							<Progress value={100} />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With label</h2>
					<ComponentPreview title="Progress with label and percentage">
						<div className="w-full max-w-md space-y-4">
							<Progress
								label="Storage used"
								value={68}
							/>
							<Progress
								label="Upload progress"
								value={42}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Progress in sm, md and lg">
						<div className="w-full max-w-md space-y-4">
							<Progress
								size="sm"
								value={60}
							/>
							<Progress
								size="md"
								value={60}
							/>
							<Progress
								size="lg"
								value={60}
							/>
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

export const Route = createFileRoute('/libs/ui/progress')({
	component: Page,
})
