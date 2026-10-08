import { createFileRoute } from '@tanstack/react-router'
import { Form, OTPInput } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/otp-input/otp-input.types.ts` and
 * the destructuring defaults in `otp-input.tsx`. `OTPInputProps` is a closed
 * object — seven props, no native attribute spread — so what is below is the
 * whole surface.
 */
const otpInputProps = [
	{
		description: 'Accessible name when no visible label names the code.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Id of the underlying input. Form.Field supplies it.',
		name: 'id',
		type: 'string',
	},
	{
		default: '[6]',
		description: 'Cells per group, split by a dash. The sum is the length.',
		name: 'pattern',
		type: 'number[]',
	},
	{
		default: '"md"',
		description: 'Cell size: sm 36px, md 40px, lg 44px (larger text).',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Controlled code, digits only. null is empty.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'Initial code when uncontrolled. null is empty.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires on every keystroke with the code, or null when empty.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
]

const usageCode = `import { Form, OTPInput } from '@turystack/react-web'

// Named by a visible label: Form.Field wires the id — nothing to pair
<Form.Field label="Código de verificação">
  <OTPInput onChange={setCode} value={code} />
</Form.Field>

// No visible label: name it
<OTPInput ariaLabel="Código de verificação" onChange={setCode} value={code} />

// Default — one group of six
<OTPInput ariaLabel="Código de verificação" onChange={setCode} value={code} />

// Grouped: three and three, with a dash between
<OTPInput ariaLabel="Código de verificação" pattern={[3, 3]} onChange={setCode} value={code} />

// Any grouping — the sum is the code length
<OTPInput ariaLabel="PIN do cartão" pattern={[4]} />
<OTPInput ariaLabel="Código de recuperação" pattern={[2, 2, 4]} />

// Sizes
<OTPInput ariaLabel="Código de verificação" size="sm" />
<OTPInput ariaLabel="Código de verificação" size="md" />
<OTPInput ariaLabel="Código de verificação" size="lg" />

// Uncontrolled
<OTPInput ariaLabel="Código de verificação" defaultValue="12" />

// Submitting when it is complete
const [code, setCode] = useState<string | null>(null)
useEffect(() => {
  if (code?.length === 6) {
    verify(code)
  }
}, [code])`

function Page() {
	const [code, setCode] = useState<string | null>(null)
	const [grouped, setGrouped] = useState<string | null>(null)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					OTPInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A one-time code split across individual cells.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={otpInputProps} />
			</section>

			<SlotsSection slug="otp-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Naming the field</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The cells overlay one real input that needs a name. Inside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					the label names it; with no visible label, pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					.
				</p>
				<ComponentPreview title="Inside Form.Field — wired without an id">
					<div className="w-full max-w-xs">
						<Form.Field
							description="Enviamos 6 dígitos por SMS para (11) 9••••-4821."
							label="Código de verificação"
						>
							<OTPInput />
						</Form.Field>
					</div>
				</ComponentPreview>
				<ComponentPreview title='ariaLabel="Código de verificação"'>
					<OTPInput
						ariaLabel="Código de verificação"
						pattern={[
							3,
							3,
						]}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					fires on every keystroke, not only when complete; an emptied code
					arrives as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						null
					</code>
					.
				</p>
				<ComponentPreview title="Controlled">
					<div className="space-y-3 text-center">
						<OTPInput
							ariaLabel="Verification code"
							onChange={setCode}
							value={code}
						/>
						<p className="text-muted-foreground text-xs">
							state: <code>{JSON.stringify(code)}</code> · complete:{' '}
							<code>{String(code?.length === 6)}</code>
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled">
					<div className="space-y-3 text-center">
						<OTPInput
							ariaLabel="Verification code"
							defaultValue="12"
						/>
						<p className="text-muted-foreground text-xs">
							defaultValue seeds the first two cells and the field owns it from
							there
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Pattern</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						pattern
					</code>{' '}
					is the shape, not just the length: each entry is a group of cells, and
					a dash is drawn between neighbouring groups.
				</p>
				<ComponentPreview title="[6] — the default, no separator">
					<OTPInput ariaLabel="Código de verificação" />
				</ComponentPreview>
				<ComponentPreview title="[3, 3] — one separator">
					<div className="space-y-3 text-center">
						<OTPInput
							ariaLabel="Código de verificação"
							onChange={setGrouped}
							pattern={[
								3,
								3,
							]}
							value={grouped}
						/>
						<p className="text-muted-foreground text-xs">
							state: <code>{JSON.stringify(grouped)}</code> — the dash is not in
							it
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="[4] — a four-digit code">
					<OTPInput
						ariaLabel="PIN do cartão"
						pattern={[
							4,
						]}
					/>
				</ComponentPreview>
				<ComponentPreview title="[2, 2, 4] — eight characters, two separators">
					<OTPInput
						ariaLabel="Código de recuperação"
						pattern={[
							2,
							2,
							4,
						]}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="flex flex-col items-center gap-5">
						<OTPInput
							ariaLabel="Código de verificação, tamanho sm"
							pattern={[
								3,
								3,
							]}
							size="sm"
						/>
						<OTPInput
							ariaLabel="Código de verificação, tamanho md"
							pattern={[
								3,
								3,
							]}
							size="md"
						/>
						<OTPInput
							ariaLabel="Código de verificação, tamanho lg"
							pattern={[
								3,
								3,
							]}
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What it does not take
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The props table above is exhaustive.
				</p>
				<ComponentPreview title="An error shown alongside, not through a prop">
					<div className="space-y-3 text-center">
						<p className="font-medium text-sm">
							Enter the code we sent to your phone
						</p>
						<OTPInput
							ariaLabel="Enter the code we sent to your phone"
							pattern={[
								3,
								3,
							]}
						/>
						<p className="text-destructive text-sm">
							That code has expired. Request a new one.
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/otp-input')({
	component: Page,
})
