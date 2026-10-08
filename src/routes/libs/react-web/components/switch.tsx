import { createFileRoute } from '@tanstack/react-router'
import { Switch } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/switch/switch.types.ts`, whose
 * `SwitchProps` is `WithLabelProps<{...}>` — so `label` comes from
 * `label.types.ts`. Defaults come from the `defaultVariants` in the `tv()`
 * call in `switch.tsx` (`size: 'md'`); nothing else is defaulted in the
 * destructuring.
 *
 * The row itself is a `<div>`, not a `<label>` — only the control and the
 * rendered `Label` toggle the switch. The description is exposed through
 * `aria-describedby` instead of being part of that clickable surface.
 */
const switchProps = [
	{
		description: 'Text beside the switch: a string or a Label config object.',
		name: 'label',
		type: 'string | (LabelProps & { content?: string })',
	},
	{
		description: 'Helper text under the label.',
		name: 'description',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Track and thumb size.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Value submitted with a form.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'Controlled on/off state.',
		name: 'checked',
		type: 'boolean',
	},
	{
		description: 'Initial state when uncontrolled.',
		name: 'defaultChecked',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Prevents interaction and dims the whole row.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Wraps the switch and its text in a bordered box.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		description: 'Fires on toggle with the new checked state.',
		name: 'onCheckedChange',
		type: '(checked: boolean) => void',
	},
]

/**
 * The object form of `label`. `Switch` now forwards the whole object to
 * `Label` — `htmlFor`, `required`, `optional`, `tooltip` and `disabled` all
 * reach it, on top of `content`, which becomes the label's children. There is
 * no `className`: the label's look belongs to the library.
 */
const switchLabelProps = [
	{
		description: 'The label text itself.',
		name: 'content',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Appends a red asterisk after the text.',
		name: 'required',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Appends the muted hint "(optional)" after the text.',
		name: 'optional',
		type: 'boolean',
	},
	{
		description: 'Info icon after the text; shows this content on hover.',
		name: 'tooltip',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Dims the label text only; does not block the switch.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Id shared by the switch and its Label; generated if omitted.',
		name: 'htmlFor',
		type: 'string',
	},
]

const usageCode = `import { Switch } from '@turystack/react-web'
import { useState } from 'react'

function Preferences() {
  const [dark, setDark] = useState(false)

  return (
    <Switch checked={dark} label="Dark mode" onCheckedChange={setDark} />
  )
}

// Uncontrolled — the switch keeps its own state
<Switch defaultChecked label="Notifications" />

// Sizes
<Switch label="Small" size="sm" />
<Switch label="Medium" size="md" />
<Switch label="Large" size="lg" />

// Description and border
<Switch
  bordered
  description="We will email you when a run finishes."
  label="Email me"
/>

// The object form of label
<Switch label={{ content: 'Two-factor', required: true }} />
<Switch label={{ content: 'Beta features', optional: true }} />
<Switch label={{ content: 'Telemetry', tooltip: 'Anonymous usage only' }} />

// Disabled
<Switch disabled label="Locked" />
<Switch defaultChecked disabled label="Locked on" />

// In a form
<Switch label="Subscribe" value="newsletter" />`

function Page() {
	const [dark, setDark] = useState(false)
	const [sm, setSm] = useState(true)
	const [md, setMd] = useState(true)
	const [lg, setLg] = useState(true)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Switch
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An on/off toggle for a setting that applies immediately.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={switchProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The label object</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Passing a string is shorthand for{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'{ content: "…" }'}
					</code>
					. The object form adds the markers and the tooltip below.
				</p>
				<PropsTable props={switchLabelProps} />
			</section>

			<SlotsSection slug="switch" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md and lg">
					<div className="flex flex-col gap-4">
						<Switch
							checked={sm}
							label="Small"
							onCheckedChange={setSm}
							size="sm"
						/>
						<Switch
							checked={md}
							label="Medium"
							onCheckedChange={setMd}
							size="md"
						/>
						<Switch
							checked={lg}
							label="Large"
							onCheckedChange={setLg}
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">State</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The row is a div, not a label, so only the track and the rendered
					Label text toggle the switch.
				</p>
				<ComponentPreview title="Controlled">
					<div className="flex flex-col items-center gap-3">
						<Switch
							checked={dark}
							label="Dark mode"
							onCheckedChange={setDark}
						/>
						<span className="text-muted-foreground text-sm">
							checked: {String(dark)}
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultChecked">
					<div className="flex flex-col gap-4">
						<Switch label="Starts off" />
						<Switch
							defaultChecked
							label="Starts on"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Disabled">
					<div className="flex flex-col gap-4">
						<Switch
							disabled
							label="Disabled, off"
						/>
						<Switch
							defaultChecked
							disabled
							label="Disabled, on"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Description</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A description shifts the whole row to top alignment and nudges the
					track down a pixel so it lines up with the first line of text.
				</p>
				<ComponentPreview title="With and without">
					<div className="flex max-w-sm flex-col gap-4">
						<Switch label="Weekly digest" />
						<Switch
							description="A summary of everything that ran, sent every Monday morning."
							label="Weekly digest"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bordered</h2>
				<ComponentPreview title="bordered, alone and with a description">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<Switch
							bordered
							label="Email me"
						/>
						<Switch
							bordered
							description="We will email you when a run finishes."
							label="Email me"
						/>
						<Switch
							bordered
							disabled
							label="Locked"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Label markers</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						optional
					</code>{' '}
					prints the hint{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						(optional)
					</code>{' '}
					— sourced from the library's default labels and overridable through{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						TuryProvider
					</code>
					.
				</p>
				<ComponentPreview title="required, optional, tooltip, disabled text">
					<div className="flex flex-col gap-4">
						<Switch
							label={{
								content: 'Two-factor authentication',
								required: true,
							}}
						/>
						<Switch
							label={{
								content: 'Beta features',
								optional: true,
							}}
						/>
						<Switch
							label={{
								content: 'Telemetry',
								tooltip: 'Anonymous usage counts only. No page contents.',
							}}
						/>
						<Switch
							label={{
								content: 'Greyed text, live switch',
								disabled: true,
							}}
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

export const Route = createFileRoute('/libs/react-web/components/switch')({
	component: Page,
})
