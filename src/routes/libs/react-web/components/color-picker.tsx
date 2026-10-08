import { createFileRoute } from '@tanstack/react-router'
import { Button, ColorPicker, DEFAULT_COLORS } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/color-picker/color-picker.types.ts` and the
 * destructuring defaults in `color-picker.tsx`. This component takes no
 * InputProps — its whole surface is the list below.
 */
const colorPickerProps = [
	{
		description: 'Controlled HEX (#rrggbb); null shows the placeholder.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'Uncontrolled initial HEX. Read once, on mount.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires with #rrggbb, or "transparent".',
		name: 'onChange',
		type: '(hex: string | null) => void',
	},
	{
		default: 'DEFAULT_COLORS',
		description: 'Swatches in the four-column grid.',
		name: 'colors',
		type: 'readonly string[]',
	},
	{
		default: 'true',
		description: 'Shows the HEX field under the grid.',
		name: 'allowCustom',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Adds a swatch that yields "transparent".',
		name: 'allowTransparent',
		type: 'boolean',
	},
	{
		default: '"md"',
		description: 'Trigger height: 36px, 40px or 44px, like Input.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'labels.colorPicker.selectColor — "Select colour"',
		description: 'Trigger text while no colour is selected.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Blocks the trigger, so the popover cannot be opened.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Marks the trigger invalid, with a destructive border.',
		name: 'invalid',
		type: 'boolean',
	},
	{
		description: 'name attribute on the trigger button, for form integration.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'id attribute on the trigger button, to pair it with a Label.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Controlled open state; pair with onOpenChange.',
		name: 'open',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Opens the popover on mount, then leaves it to the reader.',
		name: 'defaultOpen',
		type: 'boolean',
	},
	{
		description: 'Fires when the popover opens or closes.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
	{
		default: '"bottom"',
		description: 'Preferred side of the trigger for the popover.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '4',
		description: 'Gap in px between the trigger and the popover.',
		name: 'sideOffset',
		type: 'number',
	},
	{
		default: '"start"',
		description: 'Alignment of the popover against the trigger edge.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
	{
		description: 'Replaces the trigger content; gets value and open.',
		name: 'renderTrigger',
		type: '(ctx: { value: string | null; open: boolean }) => ReactNode',
	},
	{
		default: '"bare" with renderTrigger, "input" otherwise',
		description: 'Input chrome on the trigger, or bare with focus ring only.',
		name: 'triggerVariant',
		type: '"input" | "bare"',
	},
	{
		description: 'Accessible name of the trigger; set it with renderTrigger.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const usageCode = `import { ColorPicker, DEFAULT_COLORS } from '@turystack/react-web'

const [color, setColor] = useState<string | null>(null)

// The default: sixteen swatches and a HEX field
<ColorPicker onChange={setColor} value={color} />

// A palette of your own
<ColorPicker
  colors={['#0f172a', '#334155', '#64748b', '#e2e8f0']}
  onChange={setColor}
  value={color}
/>

// Palette only, no free-form HEX
<ColorPicker allowCustom={false} onChange={setColor} value={color} />

// Add a transparent option — onChange gives you the string 'transparent'
<ColorPicker allowTransparent onChange={setColor} value={color} />

// Sizes
<ColorPicker size="sm" />
<ColorPicker size="lg" />

// Placement
<ColorPicker align="end" side="right" sideOffset={12} />

// Open state under your control
<ColorPicker onOpenChange={setOpen} open={open} />
<ColorPicker defaultOpen />

// A trigger of your own; the button and the popover stay
// It is bare by default: only the focus ring stays
<ColorPicker
  ariaLabel="Brand colour"
  renderTrigger={({ open, value }) => (
    <span>{value ?? 'none'} {open ? '▲' : '▼'}</span>
  )}
/>

// ...or keep the Input chrome around your content
<ColorPicker
  ariaLabel="Cor da etiqueta"
  renderTrigger={({ value }) => <Swatch color={value} />}
  triggerVariant="input"
/>

// States
<ColorPicker disabled value="#3b82f6" />
<ColorPicker invalid />`

function ReadOut({ value }: { value: string | null }) {
	return (
		<p className="text-muted-foreground text-xs">
			onChange: <code>{value === null ? 'null' : `"${value}"`}</code>
		</p>
	)
}

function BasicPreview() {
	const [value, setValue] = useState<string | null>(null)

	return (
		<div className="w-full max-w-56 space-y-2">
			<ColorPicker
				onChange={setValue}
				value={value}
			/>
			<ReadOut value={value} />
		</div>
	)
}

function CustomColorsPreview() {
	const [value, setValue] = useState<string | null>('#334155')

	return (
		<div className="w-full max-w-56 space-y-2">
			<ColorPicker
				colors={[
					'#0f172a',
					'#334155',
					'#64748b',
					'#e2e8f0',
				]}
				onChange={setValue}
				value={value}
			/>
			<ReadOut value={value} />
		</div>
	)
}

function TransparentPreview() {
	const [value, setValue] = useState<string | null>(null)

	return (
		<div className="w-full max-w-56 space-y-2">
			<ColorPicker
				allowTransparent
				onChange={setValue}
				value={value}
			/>
			<ReadOut value={value} />
		</div>
	)
}

function ControlledOpenPreview() {
	const [open, setOpen] = useState(false)

	return (
		<div className="w-full max-w-56 space-y-2">
			<ColorPicker
				onOpenChange={setOpen}
				open={open}
			/>
			<Button
				onClick={() => setOpen((current) => !current)}
				size="sm"
				variant="outline"
			>
				{open ? 'Close from outside' : 'Open from outside'}
			</Button>
		</div>
	)
}

function InputChromeTriggerPreview() {
	const [value, setValue] = useState<string | null>('#22c55e')

	return (
		<div className="w-full max-w-56 space-y-2">
			<ColorPicker
				ariaLabel="Cor da etiqueta"
				onChange={setValue}
				renderTrigger={({ value: current }) => (
					<span className="flex items-center gap-2 text-sm">
						<span
							className="size-4 rounded-sm ring-1 ring-foreground/20"
							style={{
								background: current ?? 'transparent',
							}}
						/>
						{current ? 'Etiqueta colorida' : 'Sem cor'}
					</span>
				)}
				triggerVariant="input"
				value={value}
			/>
			<ReadOut value={value} />
		</div>
	)
}

function RenderTriggerPreview() {
	const [value, setValue] = useState<string | null>('#ec4899')

	return (
		<div className="w-full max-w-56 space-y-2">
			<ColorPicker
				ariaLabel="Brand colour"
				onChange={setValue}
				renderTrigger={({ open, value: current }) => (
					<span className="flex items-center gap-2 text-sm">
						<span
							className="size-6 rounded-full ring-1 ring-foreground/20"
							style={{
								background: current ?? 'transparent',
							}}
						/>
						{current ?? 'none'}
						{open ? ' ▲' : ' ▼'}
					</span>
				)}
				value={value}
			/>
			<ReadOut value={value} />
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					ColorPicker
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An Input-shaped trigger that opens a swatch grid and an optional HEX
					field.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={colorPickerProps} />
			</section>

			<SlotsSection slug="color-picker" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Choosing a colour
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Clicking a swatch commits it and closes the popover.
				</p>
				<ComponentPreview title="Default — sixteen swatches and a HEX field">
					<BasicPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The palette</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The default {DEFAULT_COLORS.length} colours are exported as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						DEFAULT_COLORS
					</code>{' '}
					to extend; the grid is always four columns.
				</p>
				<ComponentPreview title="A palette of four">
					<CustomColorsPreview />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						allowTransparent
					</code>{' '}
					adds a swatch that yields{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						transparent
					</code>
					; handle it in{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>
					.
				</p>
				<ComponentPreview title="allowTransparent">
					<TransparentPreview />
				</ComponentPreview>
				<ComponentPreview title="allowCustom={false} — palette only">
					<div className="w-full max-w-56">
						<ColorPicker
							allowCustom={false}
							defaultValue="#22c55e"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-56 space-y-3">
						<ColorPicker
							defaultValue="#ef4444"
							size="sm"
						/>
						<ColorPicker
							defaultValue="#ef4444"
							size="md"
						/>
						<ColorPicker
							defaultValue="#ef4444"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Placement</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						side
					</code>{' '}
					is a preference; the popover flips when there is no room.
				</p>
				<ComponentPreview title="side: top, right, bottom, left">
					<div className="grid w-full max-w-lg grid-cols-2 gap-3">
						<ColorPicker
							defaultValue="#3b82f6"
							placeholder="top"
							side="top"
						/>
						<ColorPicker
							defaultValue="#3b82f6"
							placeholder="right"
							side="right"
						/>
						<ColorPicker
							defaultValue="#3b82f6"
							placeholder="bottom"
							side="bottom"
						/>
						<ColorPicker
							defaultValue="#3b82f6"
							placeholder="left"
							side="left"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="align: start, center, end — with a wider offset">
					<div className="grid w-full max-w-lg grid-cols-3 gap-3">
						<ColorPicker
							align="start"
							placeholder="start"
							sideOffset={12}
						/>
						<ColorPicker
							align="center"
							placeholder="center"
							sideOffset={12}
						/>
						<ColorPicker
							align="end"
							placeholder="end"
							sideOffset={12}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Open state</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						open
					</code>{' '}
					you own the popover; it closes only through{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onOpenChange
					</code>
					.
				</p>
				<ComponentPreview title="Controlled open">
					<ControlledOpenPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A trigger of your own
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						renderTrigger
					</code>{' '}
					replaces the trigger content and makes it bare; pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>{' '}
					with it.
				</p>
				<ComponentPreview title="renderTrigger — bare by default">
					<RenderTriggerPreview />
				</ComponentPreview>
				<ComponentPreview title='renderTrigger with triggerVariant="input"'>
					<InputChromeTriggerPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<ComponentPreview title="disabled and invalid">
					<div className="w-full max-w-56 space-y-3">
						<ColorPicker
							disabled
							value="#3b82f6"
						/>
						<ColorPicker
							invalid
							placeholder="Pick a colour"
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

export const Route = createFileRoute('/libs/react-web/components/color-picker')(
	{
		component: Page,
	},
)
