import { createFileRoute } from '@tanstack/react-router'
import { Toggle } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const toggleProps = [
	{
		description: 'Controlled state.',
		name: 'pressed',
		type: 'boolean',
	},
	{
		description: 'Uncontrolled initial state.',
		name: 'defaultPressed',
		type: 'boolean',
	},
	{
		description: 'Fires with the new state.',
		name: 'onChange',
		type: '(pressed: boolean) => void',
	},
	{
		description: 'Accessible name; needed on an icon-only toggle.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Identifies this toggle inside a group.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'Prevents interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Visual size. Inside a group, the group decides.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'Visual style. Inside a group, the group decides.',
		name: 'variant',
		type: '"default" | "outline"',
	},
	{
		default: '"multiple"',
		description: 'Toggle.Group only: one pressed at a time, or many.',
		name: 'mode',
		type: '"single" | "multiple"',
	},
]

const usageCode = `import { Toggle } from '@turystack/react-web'

// On its own
<Toggle ariaLabel="Bold" onChange={setBold} pressed={bold}>
  <Bold />
</Toggle>

// A toolbar: several pressed at once
<Toggle.Group ariaLabel="Marks" mode="multiple" onChange={setMarks} value={marks}>
  <Toggle ariaLabel="Bold" value="bold"><Bold /></Toggle>
  <Toggle ariaLabel="Italic" value="italic"><Italic /></Toggle>
</Toggle.Group>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Toggle
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A button that stays pressed, and a group of them.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Above <code>mode</code> is Toggle; Toggle.Group takes{' '}
					<code>value</code>, <code>defaultValue</code>, <code>onChange</code>,{' '}
					<code>mode</code>, <code>size</code>, <code>variant</code>,{' '}
					<code>disabled</code> and <code>ariaLabel</code>.
				</p>
				<PropsTable props={toggleProps} />
			</section>

			<SlotsSection slug="toggle" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Alone, and in a group
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Pressed is a state the button reports through{' '}
					<code>aria-pressed</code>, not only a colour.
				</p>
				<ComponentPreview title="One toggle, then a toolbar">
					<div className="flex flex-col items-center gap-6">
						<Toggle ariaLabel="Bold">B</Toggle>
						<Toggle.Group
							ariaLabel="Marks"
							defaultValue={[
								'bold',
							]}
							variant="outline"
						>
							<Toggle
								ariaLabel="Bold"
								value="bold"
							>
								B
							</Toggle>
							<Toggle
								ariaLabel="Italic"
								value="italic"
							>
								I
							</Toggle>
							<Toggle
								ariaLabel="Underline"
								value="underline"
							>
								U
							</Toggle>
						</Toggle.Group>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code>disabledReason</code> blocks the toggle but keeps it focusable;
					hover or focus it to read why.
				</p>
				<ComponentPreview title="A blocked mark next to a free one">
					<Toggle.Group
						ariaLabel="Marcas"
						variant="outline"
					>
						<Toggle
							ariaLabel="Negrito"
							value="bold"
						>
							B
						</Toggle>
						<Toggle
							ariaLabel="Destaque"
							disabledReason="Disponível no plano Pro"
							value="highlight"
						>
							H
						</Toggle>
					</Toggle.Group>
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

export const Route = createFileRoute('/libs/react-web/components/toggle')({
	component: Page,
})
