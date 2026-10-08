import { createFileRoute } from '@tanstack/react-router'
import { Button, Input, Label, PasswordInput } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/label/label.types.ts` and the
 * destructuring in `label.tsx`. `LabelProps` has no variants and no
 * `defaultVariants` block — the only `tv` variant is `disabled`, and it has no
 * default, so every boolean here is simply absent unless you pass it.
 */
const labelProps = [
	{
		description: 'The label text. Everything else renders after it.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'Id of the control this label names (native for).',
		name: 'htmlFor',
		type: 'string',
	},
	{
		description: 'Id of the label itself, for a group’s aria-labelledby.',
		name: 'id',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Adds a destructive asterisk; does not make it required.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Adds the translated “(optional)” hint after the text.',
		name: 'optional',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Dims the label only; the control stays enabled.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Tooltip content, shown from an info icon after the text.',
		name: 'tooltip',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Button, Input, Label } from '@turystack/react-web'

// htmlFor points at the control's id — clicking the label focuses it
<Label htmlFor="email">Email</Label>
<Input id="email" value={email} onChange={setEmail} />

// id — a group is not labelable, so it points aria-labelledby at the label
<Label id="align-label">Alinhamento</Label>
<fieldset aria-labelledby="align-label">
  <Button variant="outline">Esquerda</Button>
  <Button variant="outline">Centro</Button>
</fieldset>

// Inside Form.Field you pass neither: the field wires htmlFor, or the
// label's id for a group (Radio.Group, Checkbox.Group, SegmentedControl…)

// Indicators
<Label required>Email</Label>
<Label optional>Company</Label>
<Label optional required>Both at once</Label>

// A tooltip becomes an info icon after the text
<Label tooltip="We only use it to send the receipt">Email</Label>

// Dimmed — the label only, not the control
<Label disabled htmlFor="email">Email</Label>

// Everything at once
<Label
  htmlFor="email"
  optional
  required
  tooltip="We only use it to send the receipt"
>
  Email
</Label>`

function Page() {
	const [email, setEmail] = useState<string | null>('')
	const [focused, setFocused] = useState(false)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Label
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The name of a control, with a required marker, an optional hint and a
					tooltip.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={labelProps} />
			</section>

			<SlotsSection slug="label" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Naming a control</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						htmlFor
					</code>{' '}
					must match the control’s{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>,
					not its{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						name
					</code>
					. Click “Email” below: focus jumps into the field.
				</p>
				<ComponentPreview title="htmlFor moves focus into the field">
					<div className="w-full max-w-sm space-y-2">
						<Label htmlFor="label-demo-email">Email</Label>
						<Input
							id="label-demo-email"
							onBlur={() => setFocused(false)}
							onChange={setEmail}
							onFocus={() => setFocused(true)}
							placeholder="you@company.com"
							value={email}
						/>
						<p className="text-muted-foreground text-xs">
							value: <code>{JSON.stringify(email)}</code> · focused:{' '}
							<code>{String(focused)}</code>
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Naming a group</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;label for&gt;
					</code>{' '}
					can’t reach a group, so the label gets an{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					and the group points{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-labelledby
					</code>{' '}
					at it.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Inside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					both sides are wired for you. Set{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					by hand only for a group you build yourself, as here.
				</p>
				<ComponentPreview title="id named by aria-labelledby on a hand-built group">
					<div className="flex w-full max-w-sm flex-col gap-2">
						<Label id="label-demo-align">Alinhamento</Label>
						<fieldset
							aria-labelledby="label-demo-align"
							className="flex gap-2"
						>
							<Button
								size="sm"
								variant="outline"
							>
								Esquerda
							</Button>
							<Button
								size="sm"
								variant="outline"
							>
								Centro
							</Button>
							<Button
								size="sm"
								variant="outline"
							>
								Direita
							</Button>
						</fieldset>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Indicators</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Both indicators are real text nodes inside the label, so a screen
					reader announces the field as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Email*
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Email(optional)
					</code>
					.
				</p>
				<ComponentPreview title="Required, optional, and both">
					<div className="w-full max-w-sm space-y-4">
						<div className="space-y-2">
							<Label htmlFor="label-demo-plain">Plain</Label>
							<Input
								id="label-demo-plain"
								placeholder="Ada Lovelace"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="label-demo-required"
								required
							>
								Required
							</Label>
							<Input
								id="label-demo-required"
								placeholder="you@company.com"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="label-demo-optional"
								optional
							>
								Optional
							</Label>
							<Input
								id="label-demo-optional"
								placeholder="Acme Inc."
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="label-demo-both-indicators"
								optional
								required
							>
								Both at once
							</Label>
							<Input
								id="label-demo-both-indicators"
								placeholder="+55 11 90000-0000"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Tooltip</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Hover the info icon. The prop takes any node, not just a string, so a
					longer explanation can carry its own markup.
				</p>
				<ComponentPreview title="Hover the info icon">
					<div className="w-full max-w-sm space-y-4">
						<div className="space-y-2">
							<Label
								htmlFor="label-demo-tooltip-email"
								tooltip="We only use it to send the receipt"
							>
								Email
							</Label>
							<Input
								id="label-demo-tooltip-email"
								placeholder="you@company.com"
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="label-demo-tooltip-password"
								required
								tooltip={
									<span>
										Between 8 and 64 characters, with at least one digit.
									</span>
								}
							>
								Password
							</Label>
							<PasswordInput
								id="label-demo-tooltip-password"
								placeholder="At least 8 characters"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Disabled</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					dims the label and blocks clicks on it, but leaves the control
					enabled. Pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					to the control too.
				</p>
				<ComponentPreview title="Label only, then label and field">
					<div className="w-full max-w-sm space-y-6">
						<div className="space-y-2">
							<Label
								disabled
								htmlFor="label-demo-half"
							>
								Dimmed label, live field
							</Label>
							<Input
								defaultValue="still editable"
								id="label-demo-half"
							/>
						</div>
						<div className="space-y-2">
							<Label
								disabled
								htmlFor="label-demo-both"
							>
								Dimmed label, disabled field
							</Label>
							<Input
								defaultValue="not editable"
								disabled
								id="label-demo-both"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Everything at once
				</h2>
				<ComponentPreview title="All adornments on one label">
					<div className="w-full max-w-sm space-y-2">
						<Label
							htmlFor="label-demo-all"
							optional
							required
							tooltip="Yes, both indicators can be on at the same time"
						>
							Email
						</Label>
						<Input
							id="label-demo-all"
							placeholder="you@company.com"
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

export const Route = createFileRoute('/libs/react-web/components/label')({
	component: Page,
})
