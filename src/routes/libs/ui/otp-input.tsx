import { createFileRoute } from '@tanstack/react-router'
import { OTPInput, TuryStackProvider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const otpInputProps = [
	{
		default: '[]',
		description:
			'Array of numbers defining group sizes. E.g. [3, 3] creates two groups of 3 slots with a separator.',
		name: 'pattern',
		type: 'number[]',
	},
	{
		description: 'The controlled value of the OTP.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'The default value when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description:
			'Handler called when the OTP value changes. Receives null when empty.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
]

const usageCode = `import { OTPInput } from '@turystack/ui'

// 6-digit code in two groups of 3
<OTPInput pattern={[3, 3]} />

// 4-digit code in one group
<OTPInput pattern={[4]} />

// Custom grouping: 2-2-2
<OTPInput pattern={[2, 2, 2]} />`

function Page() {
	return (
		<TuryStackProvider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						OTPInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A one-time password input with configurable group patterns and
						separator dots. Built on top of input-otp.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={otpInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Two Groups (3-3)
					</h2>
					<ComponentPreview title="6-digit OTP with separator">
						<OTPInput
							pattern={[
								3,
								3,
							]}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Single Group (4)
					</h2>
					<ComponentPreview title="4-digit OTP">
						<OTPInput
							pattern={[
								4,
							]}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Three Groups (2-2-2)
					</h2>
					<ComponentPreview title="6-digit OTP with two separators">
						<OTPInput
							pattern={[
								2,
								2,
								2,
							]}
						/>
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
		</TuryStackProvider>
	)
}

export const Route = createFileRoute('/libs/ui/otp-input')({
	component: Page,
})
