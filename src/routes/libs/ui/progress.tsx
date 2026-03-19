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
			'Label for the progress bar. Pass a string for simple text, or an object to configure additional options like required, optional, disabled, tooltip, and htmlFor.',
		name: 'label',
		type: 'string | { content?: string; required?: boolean; optional?: boolean; disabled?: boolean; tooltip?: React.ReactNode; htmlFor?: string }',
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

// With label (string shorthand)
<Progress label="Upload progress" value={75} />

// With label (object config)
<Progress
  label={{ content: 'Storage used', required: true }}
  value={68}
/>

<Progress
  label={{ content: 'Optional field', optional: true }}
  value={42}
/>

<Progress
  label={{ content: 'Disabled progress', disabled: true }}
  value={30}
/>

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
					<ComponentPreview title="Progress with string label">
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
					<h2 className="font-display font-semibold text-xl">
						Label object config
					</h2>
					<p className="text-muted-foreground text-sm">
						Pass an object to{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							label
						</code>{' '}
						for fine-grained control. The object accepts{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							content
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							required
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							optional
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							disabled
						</code>
						,{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							tooltip
						</code>
						, and{' '}
						<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
							htmlFor
						</code>{' '}
						properties.
					</p>
					<ComponentPreview title="Label with required indicator">
						<div className="w-full max-w-md space-y-4">
							<Progress
								label={{
									content: 'Required field',
									required: true,
								}}
								value={55}
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Label with optional indicator">
						<div className="w-full max-w-md space-y-4">
							<Progress
								label={{
									content: 'Optional field',
									optional: true,
								}}
								value={30}
							/>
						</div>
					</ComponentPreview>
					<ComponentPreview title="Label with disabled state">
						<div className="w-full max-w-md space-y-4">
							<Progress
								label={{
									content: 'Disabled progress',
									disabled: true,
								}}
								value={20}
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
