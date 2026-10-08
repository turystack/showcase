import { createFileRoute } from '@tanstack/react-router'
import { Textarea } from '@turystack/react-web'
import { MessageSquare, Sparkles } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/textarea/textarea.types.ts` and
 * the `defaultVariants` block of the `tv()` call in `textarea.tsx`. There is
 * no `variant` axis here — only `size`, which mirrors Input's.
 */
const textareaProps = [
	{
		description: 'Controlled text. null renders empty.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'Initial text when uncontrolled. null is empty.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires with the new text, or null when emptied.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
	{
		default: '"md"',
		description: 'Padding size; sm also keeps small text at every width.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Character limit; also shows the counter.',
		name: 'maxLength',
		type: 'number',
	},
	{
		description: 'Content pinned top-left inside the field (36px).',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content pinned top-right inside the field; clickable.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Id of the native textarea.',
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
		description: 'aria-label on the textarea, when no label is visible.',
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
		default: '"textarea-field"',
		description: 'Testing handle on the native textarea.',
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
		description: 'Minimum visible lines; grows past it as text wraps.',
		name: 'rows',
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
		type: 'React.FocusEventHandler<HTMLTextAreaElement>',
	},
	{
		description: 'Fires when the field gains focus.',
		name: 'onFocus',
		type: 'React.FocusEventHandler<HTMLTextAreaElement>',
	},
	{
		description: 'Fires on every key press in the field.',
		name: 'onKeyDown',
		type: 'React.KeyboardEventHandler<HTMLTextAreaElement>',
	},
]

const usageCode = `import { Textarea } from '@turystack/react-web'

// Controlled — and the only shape that renders the counter
const [notes, setNotes] = useState<string | null>(null)
<Textarea
  maxLength={200}
  onChange={setNotes}
  placeholder="Tell us more"
  value={notes}
/>

// Uncontrolled — maxLength still caps the typing, and the counter still tracks it
<Textarea defaultValue="Draft" maxLength={200} onChange={setNotes} />

// Sizes
<Textarea size="sm" />
<Textarea size="md" />
<Textarea size="lg" />

// Sections — pinned to the top of the field, not centred
<Textarea leftSection={<MessageSquare size={16} />} />
<Textarea rightSection={<Sparkles size={16} />} />

// States
<Textarea disabled defaultValue="Locked" />
<Textarea readOnly defaultValue="Read only" />
<Textarea aria-invalid defaultValue="Rejected" />

// Height: rows sets the starting height, the field grows from there
<Textarea rows={6} />

// Form attributes — an explicit list, no className or style
<label htmlFor="notes">Notes</label>
<Textarea
  aria-describedby="notes-hint"
  aria-invalid={Boolean(error)}
  id="notes"
  name="notes"
  required
  rows={4}
/>

// Width is the parent's job — the field fills whatever holds it
<div className="max-w-md">
  <Textarea />
</div>`

const LIMIT = 120

function Page() {
	const [notes, setNotes] = useState<string | null>(null)
	const [uncontrolled, setUncontrolled] = useState<string | null>('Draft')
	const [bio, setBio] = useState<string | null>(
		'Type past 120 characters and the field simply stops accepting them.',
	)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Textarea
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The multi-line field, which grows with its content instead of
					scrolling.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={textareaProps} />
			</section>

			<SlotsSection slug="textarea" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Like{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Input
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					gives the string, and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						null
					</code>{' '}
					when emptied. The field grows and shrinks with the text.
				</p>
				<ComponentPreview title="Controlled — and it auto-grows">
					<div className="w-full max-w-md space-y-2">
						<Textarea
							onChange={setNotes}
							placeholder="Tell us more"
							value={notes}
						/>
						<p className="text-muted-foreground text-xs">
							state: <code>{JSON.stringify(notes)}</code>
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled">
					<div className="w-full max-w-md space-y-2">
						<Textarea
							defaultValue="Draft"
							onChange={setUncontrolled}
						/>
						<p className="text-muted-foreground text-xs">
							last reported: <code>{JSON.stringify(uncontrolled)}</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Character limit</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						maxLength
					</code>{' '}
					does two things: it caps the typing natively, and it renders the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						n/max
					</code>{' '}
					counter.
				</p>
				<ComponentPreview title="Controlled: the counter tracks the value">
					<div className="w-full max-w-md">
						<Textarea
							maxLength={LIMIT}
							onChange={setBio}
							value={bio}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled: same cap, counter still moves">
					<div className="w-full max-w-md">
						<Textarea
							defaultValue="Capped at 120 too — keep typing and the counter keeps up, even with nothing controlled."
							maxLength={LIMIT}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-md space-y-3">
						<Textarea
							placeholder="sm — small text, tight padding"
							size="sm"
						/>
						<Textarea
							placeholder="md"
							size="md"
						/>
						<Textarea
							placeholder="lg"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The field is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						resize-none
					</code>{' '}
					with a 4rem floor and grows from its content, so there is no drag
					handle.
				</p>
				<ComponentPreview title="rows sets the floor, content raises it">
					<div className="w-full max-w-md space-y-3">
						<Textarea placeholder="default height" />
						<Textarea
							placeholder="rows={6}"
							rows={6}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Sections sit at the top, not centred, and are fixed at 36px — no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						sectionWidth
					</code>{' '}
					as on{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Input
					</code>
					.
				</p>
				<ComponentPreview title="Left, right, and both">
					<div className="w-full max-w-md space-y-3">
						<Textarea
							leftSection={<MessageSquare size={16} />}
							placeholder="What happened?"
						/>
						<Textarea
							placeholder="Draft with AI"
							rightSection={<Sparkles size={16} />}
						/>
						<Textarea
							leftSection={<MessageSquare size={16} />}
							placeholder="Both"
							rightSection={<Sparkles size={16} />}
						/>
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
					prop — the destructive border comes from the native{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-invalid
					</code>
					, which is also what a screen reader announces.
				</p>
				<ComponentPreview title="disabled, readOnly, aria-invalid">
					<div className="w-full max-w-md space-y-3">
						<Textarea
							defaultValue="disabled"
							disabled
						/>
						<Textarea
							defaultValue="readOnly — selectable, not editable"
							readOnly
						/>
						<Textarea
							aria-invalid
							defaultValue="aria-invalid"
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

export const Route = createFileRoute('/libs/react-web/components/textarea')({
	component: Page,
})
