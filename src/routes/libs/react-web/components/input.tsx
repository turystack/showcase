import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@turystack/react-web'
import { AtSign, Search } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/input/input.types.ts` and the
 * destructuring defaults in `input.tsx`. The `default` column for `size` and
 * `variant` comes from the `defaultVariants` block of the `tv()` call in the
 * same file; the two section widths come from `DEFAULT_SECTION_WIDTH` in
 * `input.shared.ts`.
 */
const inputProps = [
	{
		description: 'Controlled text. null renders an empty field.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'Initial text when uncontrolled. null is empty.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires with the text, or null when emptied. No event.',
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
		description: 'Visual style. ghost drops border and background.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		description: 'Content pinned inside the left edge, usually an icon.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Left section width in px, also the text’s left padding.',
		name: 'leftSectionWidth',
		type: 'number',
	},
	{
		description: 'Content pinned inside the right edge; clickable.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		default: '36',
		description: 'Right section width in px, also the text’s right padding.',
		name: 'rightSectionWidth',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Shows a spinner on the right and disables the field.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Delays onChange 300ms after the last keystroke.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		description: 'Forwarded to the inner input element, not to the wrapper.',
		name: 'ref',
		type: 'React.Ref<HTMLInputElement>',
	},
	{
		description: 'Id of the native input.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Field name submitted with a native form.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Id of a form to join when the field sits outside it.',
		name: 'form',
		type: 'string',
	},
	{
		description: 'Hint shown while the field is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		description: 'aria-label on the input, when no label is visible.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Marks the field invalid and paints the destructive border.',
		name: 'aria-invalid',
		type: 'boolean',
	},
	{
		description: 'Id(s) of the hint or error that describe the field.',
		name: 'aria-describedby',
		type: 'string',
	},
	{
		default: '"input-field"',
		description: 'Testing handle on the native input.',
		name: 'data-testid',
		type: 'string',
	},
	{
		description: 'Browser autofill hint — "email", "name", "one-time-code"…',
		name: 'autoComplete',
		type: 'React.HTMLInputAutoCompleteAttribute',
	},
	{
		default: 'false',
		description: 'Focuses the field on mount.',
		name: 'autoFocus',
		type: 'boolean',
	},
	{
		description: 'Which virtual keyboard a phone opens.',
		name: 'inputMode',
		type: '"none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url"',
	},
	{
		description: 'Maximum number of characters the field accepts.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Minimum number of characters for native form validation.',
		name: 'minLength',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Marks the field required for native form validation.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'The value can be selected and copied but not edited.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Blocks interaction and dims the field.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Fires when the field loses focus.',
		name: 'onBlur',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Fires when the field gains focus.',
		name: 'onFocus',
		type: 'React.FocusEventHandler<HTMLInputElement>',
	},
	{
		description: 'Fires on every key press in the field.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLInputElement>',
	},
	{
		description: 'Fires when the field is clicked.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLInputElement>',
	},
]

/** The closed list of form attributes, grouped as `input.types.ts` groups them. */
const formAttributeGroups = [
	{
		label: 'Identity',
		names: [
			'id',
			'name',
			'form',
		],
	},
	{
		label: 'Text',
		names: [
			'placeholder',
			'autoComplete',
			'inputMode',
			'maxLength',
			'minLength',
		],
	},
	{
		label: 'State',
		names: [
			'required',
			'readOnly',
			'disabled',
			'autoFocus',
		],
	},
	{
		label: 'Accessibility',
		names: [
			'ariaLabel',
			'aria-invalid',
			'aria-describedby',
		],
	},
	{
		label: 'Testing',
		names: [
			'data-testid',
		],
	},
	{
		label: 'Handlers',
		names: [
			'onChange',
			'onBlur',
			'onFocus',
			'onKeyDown',
			'onClick',
		],
	},
]

const usageCode = `import { Input } from '@turystack/react-web'

// Controlled — onChange hands you the value, not an event
const [email, setEmail] = useState<string | null>(null)
<Input value={email} onChange={setEmail} placeholder="you@company.com" />

// Uncontrolled
<Input defaultValue="hello" onChange={(v) => console.log(v)} />

// Sizes
<Input size="sm" />
<Input size="md" />
<Input size="lg" />

// Variants
<Input variant="default" />
<Input variant="ghost" />

// Sections
<Input leftSection={<Search size={16} />} placeholder="Search" />
<Input rightSection={<span className="text-xs">kg</span>} />
<Input
  leftSection={<span className="text-xs">R$</span>}
  leftSectionWidth={48}
  rightSectionWidth={64}
  rightSection={<span className="text-xs">/month</span>}
/>

// Loading — replaces rightSection with a spinner and disables the field
<Input loading value={query} onChange={setQuery} />

// Debounced — onChange lands 300ms after the last keystroke
<Input debounce onChange={runSearch} placeholder="Search as you type" />

// States
<Input disabled defaultValue="Locked" />
<Input readOnly defaultValue="Read only" />
<Input aria-invalid defaultValue="Rejected" />

// Form attributes — an explicit list, no className, style or type
<label htmlFor="email">Email</label>
<Input
  aria-describedby="email-error"
  aria-invalid={Boolean(error)}
  autoComplete="email"
  id="email"
  inputMode="email"
  name="email"
  required
/>

// No visible label: name the field with ariaLabel (camelCase)
<Input ariaLabel="Search the catalogue" leftSection={<Search size={16} />} />

// Width is the parent's job — the field fills whatever holds it
<div className="max-w-xs">
  <Input />
</div>`

function Page() {
	const [email, setEmail] = useState<string | null>(null)
	const [query, setQuery] = useState('')
	const [debounced, setDebounced] = useState<string | null>(null)
	const [debounceCalls, setDebounceCalls] = useState(0)
	const [workEmail, setWorkEmail] = useState<string | null>('ana@')
	const emailInvalid =
		workEmail !== null && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(workEmail)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Input
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The single-line text field every other text control in the library is
					built on.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={inputProps} />
			</section>

			<SlotsSection slug="input" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					gives the string, not a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ChangeEvent
					</code>
					, and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						null
					</code>{' '}
					for an empty field. Clear the field below to see it.
				</p>
				<ComponentPreview title="Controlled">
					<div className="w-full max-w-sm space-y-2">
						<Input
							onChange={setEmail}
							placeholder="you@company.com"
							value={email}
						/>
						<p className="text-muted-foreground text-xs">
							state: <code>{JSON.stringify(email)}</code>
						</p>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						value
					</code>{' '}
					the field keeps its own text and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultValue
					</code>{' '}
					only seeds it. The readout still updates, because{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					fires either way.
				</p>
				<ComponentPreview title="Uncontrolled">
					<div className="w-full max-w-sm space-y-2">
						<Input
							defaultValue="seeded by defaultValue"
							onChange={(next) => setQuery(next ?? '')}
						/>
						<p className="text-muted-foreground text-xs">
							last reported: <code>{JSON.stringify(query)}</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-sm space-y-3">
						<Input
							placeholder="sm — 36px"
							size="sm"
						/>
						<Input
							placeholder="md — 40px"
							size="md"
						/>
						<Input
							placeholder="lg — 44px"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ghost
					</code>{' '}
					removes the border and background and keeps them removed on focus, so
					the only focus cue left is the ring.
				</p>
				<ComponentPreview title="default and ghost">
					<div className="w-full max-w-sm space-y-3">
						<Input
							placeholder="default"
							variant="default"
						/>
						<Input
							placeholder="ghost"
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A section overlays the field; its width is the padding on that side.
					Widen the content, widen{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						*SectionWidth
					</code>{' '}
					too.
				</p>
				<ComponentPreview title="Left, right, and both">
					<div className="w-full max-w-sm space-y-3">
						<Input
							leftSection={<Search size={16} />}
							placeholder="Search"
						/>
						<Input
							placeholder="Weight"
							rightSection={<span className="text-xs">kg</span>}
						/>
						<Input
							leftSection={<AtSign size={16} />}
							placeholder="Handle"
							rightSection={<span className="text-xs">.com</span>}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Custom section widths">
					<div className="w-full max-w-sm space-y-3">
						<Input
							defaultValue="1200"
							leftSection={<span className="text-xs">BRL</span>}
							leftSectionWidth={52}
							rightSection={<span className="text-xs">/month</span>}
							rightSectionWidth={72}
						/>
						<Input
							defaultValue="the same text with default 36px widths"
							leftSection={<span className="text-xs">BRL</span>}
							rightSection={<span className="text-xs">/month</span>}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Loading</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					replaces the right section with a spinner and disables the field.
				</p>
				<ComponentPreview title="Spinner replaces the right section">
					<div className="w-full max-w-sm space-y-3">
						<Input
							defaultValue="typing is blocked while this spins"
							loading
						/>
						<Input
							loading
							placeholder="the kg unit is hidden while loading"
							rightSection={<span className="text-xs">kg</span>}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Debounce</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						debounce
					</code>{' '}
					only{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					waits. Type quickly: the counter goes up once, 300ms after you stop.
				</p>
				<ComponentPreview title="onChange fires 300ms after the last keystroke">
					<div className="w-full max-w-sm space-y-2">
						<Input
							debounce
							leftSection={<Search size={16} />}
							onChange={(next) => {
								setDebounced(next)
								setDebounceCalls((n) => n + 1)
							}}
							placeholder="Search as you type"
						/>
						<p className="text-muted-foreground text-xs">
							onChange calls: <code>{debounceCalls}</code> · last value:{' '}
							<code>{JSON.stringify(debounced)}</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Native states</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					There is no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						error
					</code>{' '}
					prop. Set{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-invalid
					</code>{' '}
					and the destructive border follows.
				</p>
				<ComponentPreview title="disabled, readOnly, aria-invalid">
					<div className="w-full max-w-sm space-y-3">
						<Input
							defaultValue="disabled"
							disabled
						/>
						<Input
							defaultValue="readOnly — selectable, not editable"
							readOnly
						/>
						<Input
							aria-invalid
							defaultValue="aria-invalid"
						/>
						<Input
							aria-invalid
							defaultValue="aria-invalid + disabled"
							disabled
						/>
					</div>
				</ComponentPreview>
			</section>

			<section
				className="space-y-4"
				id="form-attributes"
			>
				<h2 className="font-display font-semibold text-xl">Form attributes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Input takes a closed list of form attributes, not arbitrary HTML.
					Every one is in the props table above:
				</p>
				<ul className="max-w-prose list-disc space-y-1 pl-5 text-muted-foreground text-sm">
					{formAttributeGroups.map((group) => (
						<li key={group.label}>
							<span className="font-medium text-foreground">{group.label}</span>{' '}
							—{' '}
							{group.names.map((name, index) => (
								<span key={name}>
									{index > 0 && ', '}
									<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
										{name}
									</code>
								</span>
							))}
						</li>
					))}
				</ul>
				<p className="max-w-prose text-muted-foreground text-sm">
					Anything else is a type error: no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						style
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						type
					</code>
					. Use{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						inputMode
					</code>{' '}
					for the keyboard and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>{' '}
					for a name.
				</p>
				<ComponentPreview title="Label, hint and error wired by id">
					<div className="w-full max-w-xs space-y-1.5">
						<label
							className="font-medium text-sm"
							htmlFor="input-docs-email"
						>
							Work email
						</label>
						<Input
							aria-describedby="input-docs-email-hint"
							aria-invalid={emailInvalid}
							autoComplete="email"
							id="input-docs-email"
							inputMode="email"
							name="email"
							onChange={setWorkEmail}
							placeholder="you@company.com"
							required
							value={workEmail}
						/>
						<p
							className={
								emailInvalid
									? 'text-destructive text-xs'
									: 'text-muted-foreground text-xs'
							}
							id="input-docs-email-hint"
						>
							{emailInvalid
								? 'That does not look like an email address.'
								: 'We send the invite here.'}
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="No visible label — ariaLabel names the field">
					<div className="w-full max-w-xs">
						<Input
							ariaLabel="Search the catalogue"
							inputMode="search"
							leftSection={<Search size={16} />}
							placeholder="Search"
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

export const Route = createFileRoute('/libs/react-web/components/input')({
	component: Page,
})
