import { createFileRoute, Link } from '@tanstack/react-router'
import { LabelsProvider, PasswordInput } from '@turystack/react-web'
import { KeyRound } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/password-input/
 * password-input.types.ts`, which is `InputProps & { showStrength?: boolean }`
 * — the field's masked/readable `type` is the component's own, reached through
 * the internal `ComposedInput`, never a prop. Everything after `showStrength`
 * is Input's surface, forwarded through; `rightSection` renders before the
 * visibility toggle. Rows marked "Inherited from Input" are Input's closed
 * list of form attributes.
 */
const passwordInputProps = [
	{
		default: 'false',
		description: 'Shows the five-bar strength meter under the field.',
		name: 'showStrength',
		type: 'boolean',
	},
	{
		description: 'Controlled text; the meter follows it.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'Initial text when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires with the text, or null when emptied.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
	{
		default: '"md"',
		description: 'Height of the field: sm is 36px, md 40px, lg 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'Visual style. ghost drops the border and background.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		description: 'Content pinned to the left inside the field.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Width in px of the left section, and the left text padding.',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		description: 'Inherited. Renders before the eye toggle on the right.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Right-side width in px, where the eye toggle sits.',
		name: 'rightSectionWidth',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Spinner replaces the toggle; typing and reveal are blocked.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Delays onChange by 300ms after the last keystroke.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id of the native input.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Name submitted with a form.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Id of a form the field joins.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Hint shown while the field is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		description: 'Inherited from Input. aria-label when no label is visible.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Inherited from Input. Marks the field invalid.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Id(s) of the hint or error.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: '"input-field"',
		description: 'Inherited from Input. Testing handle on the native input.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Inherited from Input. "current-password" or "new-password".',
		name: 'autoComplete',
		type: 'React.HTMLInputAutoCompleteAttribute',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Focuses the field on mount.',
		name: 'autoFocus',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Leave unset for passwords.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Inherited from Input. Max characters accepted.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Inherited from Input. Min characters for validation.',
		name: 'minLength',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Required for form validation.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Selectable and copyable, not editable.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Inherited from Input. Blocks interaction and dims the field.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Inherited from Input. Fires when the field loses focus.',
		name: 'onBlur',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires when the field gains focus.',
		name: 'onFocus',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires on every key press in the field.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLInputElement>',
	},
	{
		description: 'Inherited from Input. Fires when the field is clicked.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

const usageCode = `import { LabelsProvider, PasswordInput } from '@turystack/react-web'

// Uncontrolled — the eye toggle still works
<PasswordInput defaultValue="hunter2" placeholder="Password" />

// Controlled, with the strength meter
const [password, setPassword] = useState<string | null>(null)
<PasswordInput
  onChange={setPassword}
  placeholder="Choose a password"
  showStrength
  value={password}
/>

// Sizes and variants come straight from Input
<PasswordInput size="sm" />
<PasswordInput size="lg" />
<PasswordInput variant="ghost" />

// Sections — rightSection renders beside the eye toggle
<PasswordInput leftSection={<KeyRound size={16} />} />
<PasswordInput rightSection={<span className="text-xs">hint</span>} />

// States
<PasswordInput disabled defaultValue="locked" />
<PasswordInput aria-invalid defaultValue="wrong" />
<PasswordInput loading value={password} onChange={setPassword} />

// The strength words and the eye's name are passwordInput labels
<LabelsProvider
  labels={{
    passwordInput: {
      hide: 'Ocultar senha do cartão',
      show: 'Mostrar senha do cartão',
      veryWeak: 'Fraquíssima',
      weak: 'Fraca',
      medium: 'Razoável',
      strong: 'Boa',
      veryStrong: 'Excelente',
    },
  }}
>
  <PasswordInput showStrength />
</LabelsProvider>`

/** The five levels, with a value that scores exactly that. */
const strengthSamples = [
	{
		label: 'Very weak — one rule met',
		value: 'abc',
	},
	{
		label: 'Weak — two rules',
		value: 'Abc',
	},
	{
		label: 'Medium — three rules',
		value: 'ABC12345',
	},
	{
		label: 'Strong — four rules',
		value: 'Abcdefg1',
	},
	{
		label: 'Very strong — all five',
		value: 'Abcdef1!',
	},
]

function Page() {
	const [password, setPassword] = useState<string | null>(null)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					PasswordInput
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An <code>Input</code> that masks its value, with a reveal toggle and
					an optional strength meter.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={passwordInputProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows marked “Inherited from Input” are Input’s form attributes; see{' '}
					<Link
						className="text-lib hover:underline"
						hash="form-attributes"
						to="/libs/react-web/components/input"
					>
						Input › Form attributes
					</Link>
					.
				</p>
			</section>

			<SlotsSection slug="password-input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Reveal toggle</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The eye button is always present, after the right section. Its names
					come from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						passwordInput.show
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						passwordInput.hide
					</code>
					.
				</p>
				<ComponentPreview title="Click the eye to reveal, click again to mask">
					<div className="w-full max-w-sm space-y-2">
						<PasswordInput
							onChange={setPassword}
							placeholder="Choose a password"
							value={password}
						/>
						<p className="text-muted-foreground text-xs">
							state: <code>{JSON.stringify(password)}</code>
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultValue seeds it">
					<div className="w-full max-w-sm">
						<PasswordInput defaultValue="hunter2" />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Strength meter</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Five rules score it: 8+ characters, an uppercase, a lowercase, a digit
					and a symbol, mapped onto five levels.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Bars use the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--destructive
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--warning
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--success
					</code>{' '}
					tokens; the word comes from the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						passwordInput
					</code>{' '}
					labels.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The score tracks whatever is currently in the field, not only a
					controlled{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						value
					</code>{' '}
					prop.
				</p>
				<ComponentPreview title="Controlled: type and watch the bars fill">
					<div className="w-full max-w-sm">
						<PasswordInput
							onChange={setPassword}
							placeholder="Try Abcdef1!"
							showStrength
							value={password}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled: the meter moves too">
					<div className="w-full max-w-sm space-y-2">
						<PasswordInput
							defaultValue="Abcdef1!"
							showStrength
						/>
						<p className="text-muted-foreground text-xs">
							Scored from defaultValue and as you type, though nothing outside
							sees the value.
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Your own words — LabelsProvider over passwordInput">
					<div className="w-full max-w-sm">
						<LabelsProvider
							labels={{
								passwordInput: {
									hide: 'Ocultar senha do cartão',
									medium: 'Razoável',
									show: 'Mostrar senha do cartão',
									strong: 'Boa',
									veryStrong: 'Excelente',
									veryWeak: 'Fraquíssima',
									weak: 'Fraca',
								},
							}}
						>
							<PasswordInput
								defaultValue="cartao2026"
								placeholder="Senha do cartão"
								showStrength
							/>
						</LabelsProvider>
					</div>
				</ComponentPreview>
				<ComponentPreview title="All five levels">
					<div className="w-full max-w-sm space-y-5">
						{strengthSamples.map((sample) => (
							<div
								className="space-y-1.5"
								key={sample.value}
							>
								<p className="text-muted-foreground text-xs">{sample.label}</p>
								<PasswordInput
									readOnly
									showStrength
									value={sample.value}
								/>
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-sm space-y-3">
						<PasswordInput
							placeholder="sm"
							size="sm"
						/>
						<PasswordInput
							placeholder="md"
							size="md"
						/>
						<PasswordInput
							placeholder="lg"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="default and ghost">
					<div className="w-full max-w-sm space-y-3">
						<PasswordInput
							placeholder="default"
							variant="default"
						/>
						<PasswordInput
							placeholder="ghost"
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Sections and states
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					swaps the whole right section for a spinner and disables the field.
				</p>
				<ComponentPreview title="leftSection, disabled, aria-invalid, loading">
					<div className="w-full max-w-sm space-y-3">
						<PasswordInput
							defaultValue="hunter2"
							leftSection={<KeyRound size={16} />}
						/>
						<PasswordInput
							defaultValue="hunter2"
							disabled
						/>
						<PasswordInput
							aria-invalid
							defaultValue="hunter2"
						/>
						<PasswordInput
							defaultValue="hunter2"
							loading
						/>
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

export const Route = createFileRoute(
	'/libs/react-web/components/password-input',
)({
	component: Page,
})
