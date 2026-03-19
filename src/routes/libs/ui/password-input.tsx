import { createFileRoute } from '@tanstack/react-router'
import { PasswordInput, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const passwordInputProps = [
	{
		description: 'The controlled value of the input.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'The default value when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Placeholder text displayed when the input is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the input.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'true',
		description:
			'Shows a password strength indicator bar below the input.',
		name: 'showStrength',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Disables the input, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a loading spinner in the input.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description:
			'Handler called when the input value changes. Receives null when empty.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
]

const usageCode = `import { PasswordInput } from '@turystack/ui'

// Basic with strength indicator
<PasswordInput placeholder="Enter your password" />

// Without strength indicator
<PasswordInput showStrength={false} placeholder="Enter your password" />

// Sizes
<PasswordInput size="sm" placeholder="Small" />
<PasswordInput size="md" placeholder="Medium" />
<PasswordInput size="lg" placeholder="Large" />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						PasswordInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A password input with a built-in strength indicator. Shows a
						segmented bar and descriptive label based on password complexity
						rules.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={passwordInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Password with strength indicator">
						<div className="w-80">
							<PasswordInput placeholder="Enter your password" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Without Strength
					</h2>
					<ComponentPreview title="Strength indicator hidden">
						<div className="w-80">
							<PasswordInput
								placeholder="Enter your password"
								showStrength={false}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Password input sizes">
						<div className="flex w-80 flex-col gap-3">
							<PasswordInput
								placeholder="Small"
								size="sm"
							/>
							<PasswordInput
								placeholder="Medium"
								size="md"
							/>
							<PasswordInput
								placeholder="Large"
								size="lg"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<PasswordInput
								disabled
								placeholder="Disabled"
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

export const Route = createFileRoute('/libs/ui/password-input')({
	component: Page,
})
