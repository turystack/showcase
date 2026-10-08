import { createFileRoute } from '@tanstack/react-router'
import type { SheetSide, SheetSize } from '@turystack/react-web'
import { Button, Sheet } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/sheet/sheet.types.ts` and the
 * `defaultVariants` plus compound variants in `sheet.tsx`.
 */
const sheetProps = [
	{
		default: 'undefined',
		description: 'Controlled open state; there is no defaultOpen.',
		name: 'open',
		type: 'boolean',
	},
	{
		default: '"right"',
		description: 'Which edge the panel is anchored to and slides in from.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: 'undefined',
		description: 'Max panel width for left/right sides, from sm up.',
		name: 'size',
		type: '"sm" | "md" | "lg" | "xl" | "2xl"',
	},
	{
		default: '"default"',
		description: 'default fills its edge; floating is an inset, rounded bar.',
		name: 'variant',
		type: '"default" | "floating"',
	},
	{
		default: 'true',
		description: 'Traps focus with a backdrop; false leaves the page usable.',
		name: 'modal',
		type: 'boolean',
	},
	{
		default: 'true',
		description: 'Whether an outside press closes it; Escape always does.',
		name: 'dismissible',
		type: 'boolean',
	},
	{
		description: 'Fires on open/close requests: backdrop, Escape, close.',
		name: 'onChange',
		type: '(open: boolean) => void',
	},
]

const sheetHeaderProps = [
	{
		default: 'false',
		description: 'Adds a close button to the header’s top-right corner.',
		name: 'closable',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Adds a bottom rule under the header.',
		name: 'bordered',
		type: 'boolean',
	},
]

const sheetBodyProps = [
	{
		description: 'Min height of the scroll area, e.g. for top/bottom sheets.',
		name: 'minHeight',
		type: 'string | number',
	},
]

const sheetFooterProps = [
	{
		default: 'false',
		description: 'Adds a top rule above the footer.',
		name: 'bordered',
		type: 'boolean',
	},
]

const emptyProps: never[] = []

const usageCode = `import { Button, Sheet } from '@turystack/react-web'
import { useState } from 'react'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Filters</Button>

<Sheet onChange={setOpen} open={open} side="right" size="md">
  <Sheet.Header bordered closable>
    <Sheet.Header.Title>Filters</Sheet.Header.Title>
    <Sheet.Header.Description>
      Narrow the result set.
    </Sheet.Header.Description>
  </Sheet.Header>
  <Sheet.Body>
    …filter controls…
  </Sheet.Body>
  <Sheet.Footer bordered>
    <Button onClick={() => setOpen(false)}>Apply</Button>
    <Button onClick={() => setOpen(false)} variant="outline">
      Reset
    </Button>
  </Sheet.Footer>
</Sheet>

// A bottom sheet needs a body height of its own
<Sheet onChange={setOpen} open={open} side="bottom">
  <Sheet.Body minHeight="18rem">…</Sheet.Body>
</Sheet>`

const SIDES: SheetSide[] = [
	'top',
	'right',
	'bottom',
	'left',
]

const SIZES: SheetSize[] = [
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
]

function SideGallery() {
	// The side is kept after closing so the panel does not jump to another edge
	// halfway through its own exit animation.
	const [side, setSide] = useState<SheetSide>('right')
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			{SIDES.map((value) => (
				<Button
					key={value}
					onClick={() => {
						setSide(value)
						setOpen(true)
					}}
					variant="outline"
				>
					{value}
				</Button>
			))}
			<Sheet
				onChange={setOpen}
				open={open}
				side={side}
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Header.Title>side="{side}"</Sheet.Header.Title>
					<Sheet.Header.Description>
						Left and right fill the height; top and bottom are only as tall as
						their content.
					</Sheet.Header.Description>
				</Sheet.Header>
				<Sheet.Body>
					<p className="text-muted-foreground text-sm">
						The panel slides in from the edge it is anchored to, and the
						backdrop fades with it.
					</p>
				</Sheet.Body>
				<Sheet.Footer bordered>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</Sheet.Footer>
			</Sheet>
		</div>
	)
}

function SizeGallery() {
	const [size, setSize] = useState<SheetSize>('sm')
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			{SIZES.map((value) => (
				<Button
					key={value}
					onClick={() => {
						setSize(value)
						setOpen(true)
					}}
					variant="outline"
				>
					{value}
				</Button>
			))}
			<Sheet
				onChange={setOpen}
				open={open}
				side="right"
				size={size}
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Header.Title>size="{size}"</Sheet.Header.Title>
				</Sheet.Header>
				<Sheet.Body>
					<p className="text-muted-foreground text-sm">
						On a narrow viewport every size looks the same — 75% of the width.
						The cap only applies from the sm breakpoint up.
					</p>
				</Sheet.Body>
			</Sheet>
		</div>
	)
}

function SizeOnBottomSheet() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				side="bottom" size="2xl"
			</Button>
			<Sheet
				onChange={setOpen}
				open={open}
				side="bottom"
				size="2xl"
			>
				<Sheet.Header closable>
					<Sheet.Header.Title>size does nothing here</Sheet.Header.Title>
				</Sheet.Header>
				<Sheet.Body minHeight="12rem">
					<p className="text-muted-foreground text-sm">
						size only applies to left and right; a top or bottom sheet spans the
						full width.
					</p>
				</Sheet.Body>
			</Sheet>
		</>
	)
}

function MinHeightSheet({ minHeight }: { minHeight?: string }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				{minHeight ? `minHeight="${minHeight}"` : 'no minHeight'}
			</Button>
			<Sheet
				onChange={setOpen}
				open={open}
				side="bottom"
			>
				<Sheet.Header closable>
					<Sheet.Header.Title>Quick actions</Sheet.Header.Title>
				</Sheet.Header>
				<Sheet.Body minHeight={minHeight}>
					<p className="text-muted-foreground text-sm">
						One short line of body copy.
					</p>
				</Sheet.Body>
			</Sheet>
		</>
	)
}

function SectionsSheet({ bordered }: { bordered: boolean }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				{bordered ? 'bordered' : 'not bordered'}
			</Button>
			<Sheet
				onChange={setOpen}
				open={open}
				size="md"
			>
				<Sheet.Header
					bordered={bordered}
					closable
				>
					<Sheet.Header.Title>Filters</Sheet.Header.Title>
					<Sheet.Header.Description>
						Narrow the result set.
					</Sheet.Header.Description>
				</Sheet.Header>
				<Sheet.Body>
					<div className="space-y-3 text-muted-foreground text-sm">
						{Array.from({
							length: 18,
						}).map((_, index) => (
							<p
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length filler
								key={index}
							>
								Filter row {index + 1}. Only the body scrolls — the header and
								footer stay where they are.
							</p>
						))}
					</div>
				</Sheet.Body>
				<Sheet.Footer bordered={bordered}>
					<Button onClick={() => setOpen(false)}>Apply</Button>
					<Button
						onClick={() => setOpen(false)}
						variant="outline"
					>
						Reset
					</Button>
				</Sheet.Footer>
			</Sheet>
		</>
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
					Sheet
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Modal's header / body / footer, anchored to a viewport edge.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<h3 className="font-medium text-sm">Sheet</h3>
				<PropsTable props={sheetProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					The backdrop is the shared{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bg-overlay
					</code>{' '}
					scrim, blurred by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--overlay-blur
					</code>
					; theme it via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--overlay
					</code>
					.
				</p>
				<h3 className="font-medium text-sm">Sheet.Header</h3>
				<PropsTable props={sheetHeaderProps} />
				<h3 className="font-medium text-sm">Sheet.Body</h3>
				<PropsTable props={sheetBodyProps} />
				<h3 className="font-medium text-sm">Sheet.Footer</h3>
				<PropsTable props={sheetFooterProps} />
				<h3 className="font-medium text-sm">
					Sheet.Header.Title · Sheet.Header.Description
				</h3>
				<p className="max-w-prose text-muted-foreground text-sm">
					Children only. They are what names and describes the dialog for
					assistive technology.
				</p>
				<PropsTable props={emptyProps} />
			</section>

			<SlotsSection slug="sheet" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sides</h2>
				<ComponentPreview title="All four edges">
					<SideGallery />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size
					</code>{' '}
					is a horizontal cap, so it is meaningful on a left or right sheet and
					inert on a top or bottom one — the type accepts it either way.
				</p>
				<ComponentPreview title="All five sizes, on the right">
					<SizeGallery />
				</ComponentPreview>
				<ComponentPreview title="size on a bottom sheet — accepted, ignored">
					<SizeOnBottomSheet />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<ComponentPreview title="Bordered and not">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<SectionsSheet bordered />
						<SectionsSheet bordered={false} />
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					A top or bottom sheet is only as tall as what is inside it.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						minHeight
					</code>{' '}
					on the body is how you stop a one-line sheet from being a sliver.
				</p>
				<ComponentPreview title="Body minHeight">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<MinHeightSheet minHeight="16rem" />
						<MinHeightSheet />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What onChange receives
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>{' '}
					is typed{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						(open: boolean) =&gt; void
					</code>{' '}
					and is called with exactly that.
				</p>
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

export const Route = createFileRoute('/libs/react-web/components/sheet')({
	component: Page,
})
