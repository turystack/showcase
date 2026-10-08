import { createFileRoute } from '@tanstack/react-router'
import type { PopoverAlign, PopoverSide } from '@turystack/react-web'
import { Button, Input, Popover } from '@turystack/react-web'
import { Info } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/popover/popover.types.ts` and the
 * destructuring defaults in `popover.tsx`.
 */
const popoverProps = [
	{
		description: 'What the panel shows; a node, built on every render.',
		name: 'content',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: 'undefined',
		description: 'Controlled open state; left off, it manages itself.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Fires with the requested state: trigger, outside, Escape.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
	{
		default: '"bottom"',
		description: 'Preferred side; flips when there is no room.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '4',
		description: 'Gap between the trigger and the panel, in pixels.',
		name: 'sideOffset',
		type: 'number',
	},
	{
		default: '"center"',
		description: 'Alignment along the chosen side.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
	{
		default: '"auto"',
		description: "Panel width: content, 14/18/24rem presets, or the anchor's.",
		name: 'width',
		type: '"auto" | "sm" | "md" | "lg" | "trigger"',
	},
	{
		default: 'false',
		description: 'The single element child becomes the trigger itself.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Name of the wrapper trigger; unused with asChild.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const usageCode = `import { Button, Input, Popover } from '@turystack/react-web'
import { useState } from 'react'

// Uncontrolled — the popover owns its open state. asChild makes the
// Button the trigger itself: one control, one accessible name.
<Popover asChild content={<p>Anything you like in here.</p>}>
  <Button variant="outline">Open</Button>
</Popover>

// Placed, with a fixed panel width from the shared scale
<Popover
  align="start"
  asChild
  content={<AccountForm />}
  side="right"
  sideOffset={12}
  width="md"
>
  <Button variant="outline">Account</Button>
</Popover>

// Controlled — you decide when it closes
const [open, setOpen] = useState(false)

<Popover
  asChild
  content={
    <Button onClick={() => setOpen(false)}>Done</Button>
  }
  onOpenChange={setOpen}
  open={open}
>
  <Button variant="outline">Open</Button>
</Popover>

// Wrapping something that is not a control: the wrapper needs a name
<Popover ariaLabel="Escolher período" content={<PeriodPicker />} width="trigger">
  <Input readOnly value={period} />
</Popover>`

const SIDES: PopoverSide[] = [
	'top',
	'right',
	'bottom',
	'left',
]

const ALIGNS: PopoverAlign[] = [
	'start',
	'center',
	'end',
]

function ControlledPopover() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<Popover
				asChild
				content={
					<div className="space-y-3">
						<p className="text-sm">
							The page owns this open state, so the panel can close itself from
							the inside.
						</p>
						<Button
							onClick={() => setOpen(false)}
							size="sm"
						>
							Done
						</Button>
					</div>
				}
				onOpenChange={setOpen}
				open={open}
				width="md"
			>
				<Button variant="outline">Controlled popover</Button>
			</Popover>
			<p className="text-muted-foreground text-xs">
				open: <code className="text-foreground">{String(open)}</code>
			</p>
		</div>
	)
}

function FormPopover() {
	const [name, setName] = useState('Untitled view')

	return (
		<Popover
			asChild
			content={
				<div className="space-y-3">
					<p className="font-medium text-sm">Rename view</p>
					<Input
						onChange={(next) => setName(next ?? '')}
						size="sm"
						value={name}
					/>
					<p className="text-muted-foreground text-xs">
						Focus moves into the panel when it opens, so a field inside it is
						usable straight away.
					</p>
				</div>
			}
			width="md"
		>
			<Button variant="outline">{name}</Button>
		</Popover>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Overlays
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Popover
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An anchored panel for interactive content — a form, a filter, a
					summary.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={popoverProps} />
			</section>

			<SlotsSection slug="popover" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Placement</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						side
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						align
					</code>{' '}
					are preferences: the panel flips or shifts away from viewport edges.
				</p>
				<ComponentPreview title="All four sides">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{SIDES.map((side) => (
							<Popover
								asChild
								content={
									<p className="text-sm">
										side=<code>"{side}"</code>
									</p>
								}
								key={side}
								side={side}
								sideOffset={8}
							>
								<Button variant="outline">{side}</Button>
							</Popover>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview title="All three alignments, on the bottom">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{ALIGNS.map((align) => (
							<Popover
								align={align}
								asChild
								content={
									<p className="text-sm">
										align=<code>"{align}"</code>
									</p>
								}
								key={align}
								width="sm"
							>
								<Button variant="outline">{align}</Button>
							</Popover>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview title="sideOffset — 0, 4 (default) and 24 px">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{[
							0,
							4,
							24,
						].map((offset) => (
							<Popover
								asChild
								content={
									<p className="text-sm">
										sideOffset=<code>{offset}</code>
									</p>
								}
								key={offset}
								sideOffset={offset}
							>
								<Button variant="outline">{offset} px</Button>
							</Popover>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Panel</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						auto
					</code>{' '}
					fits the content, uncapped;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">sm</code>,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">md</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">lg</code>{' '}
					are 14, 18 and 24rem;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						trigger
					</code>{' '}
					matches the anchor.
				</p>
				<ComponentPreview title="auto, sm and trigger">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Popover
							asChild
							content={
								<p className="text-sm">
									Without a width class this sentence decides how wide the panel
									is, and it goes on for long enough to make the point.
								</p>
							}
						>
							<Button variant="outline">Unconstrained</Button>
						</Popover>
						<Popover
							asChild
							content={
								<p className="text-sm">
									Same sentence, with width="sm" — it wraps at 14rem instead of
									stretching.
								</p>
							}
							width="sm"
						>
							<Button variant="outline">width="sm"</Button>
						</Popover>
						<Popover
							asChild
							content={
								<p className="text-sm">
									width="trigger" — exactly as wide as the button that opened
									it.
								</p>
							}
							width="trigger"
						>
							<Button variant="outline">
								A deliberately wide trigger button
							</Button>
						</Popover>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Interactive content">
					<FormPopover />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">State</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						open
					</code>{' '}
					and the popover stops managing itself; every request goes to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onOpenChange
					</code>
					.
				</p>
				<ComponentPreview title="Controlled">
					<ControlledPopover />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The trigger</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						asChild
					</code>{' '}
					the child Button is the trigger, with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-expanded
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-haspopup
					</code>{' '}
					and its own name.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without it, the children are wrapped in a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;span role="button"&gt;
					</code>
					; name it with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The date and range pickers open from a named{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'<button>'}
					</code>{' '}
					beside the field, but anchor to the whole field.
				</p>
				<ComponentPreview title="asChild on a Button — the trigger is the Button">
					<Popover
						asChild
						content={
							<div className="space-y-1 text-sm">
								<p className="font-medium">Reserva RSV-2026-04821</p>
								<p className="text-muted-foreground">
									Check-in 12/10 · 3 noites · 2 hóspedes
								</p>
							</div>
						}
						width="md"
					>
						<Button
							leftSection={<Info />}
							variant="outline"
						>
							Detalhes da reserva
						</Button>
					</Popover>
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

export const Route = createFileRoute('/libs/react-web/components/popover')({
	component: Page,
})
