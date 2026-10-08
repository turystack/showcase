import { createFileRoute } from '@tanstack/react-router'
import type { ModalProps } from '@turystack/react-web'
import { Button, Modal } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

type ModalSize = NonNullable<ModalProps['size']>

/**
 * Props read from `react-web/src/components/modal/modal.types.ts` and the
 * `defaultVariants` in `modal.tsx`.
 */
const modalProps = [
	{
		default: 'undefined',
		description: 'Controlled open state; there is no defaultOpen.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Fires on open/close requests: backdrop, Escape, close.',
		name: 'onChange',
		type: '(open: boolean) => void',
	},
	{
		default: '"md"',
		description: 'Max width of the popup; "full" fills the viewport.',
		name: 'size',
		type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
	},
]

const modalHeaderProps = [
	{
		default: 'false',
		description: 'Adds a close button on the right of the header.',
		name: 'closable',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Adds a rule under the header and tightens body padding.',
		name: 'bordered',
		type: 'boolean',
	},
]

const modalFooterProps = [
	{
		default: 'false',
		description: 'Adds a top rule above the footer.',
		name: 'bordered',
		type: 'boolean',
	},
]

const emptyProps: never[] = []

const usageCode = `import { Button, Modal } from '@turystack/react-web'
import { useState } from 'react'

const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Edit profile</Button>

<Modal onChange={setOpen} open={open} size="md">
  <Modal.Header bordered closable>
    <Modal.Header.Title>Edit profile</Modal.Header.Title>
    <Modal.Header.Description>
      Update the name teammates see.
    </Modal.Header.Description>
  </Modal.Header>
  <Modal.Body>
    …form fields…
  </Modal.Body>
  <Modal.Footer bordered>
    <Button onClick={() => setOpen(false)}>Save</Button>
    <Button onClick={() => setOpen(false)} variant="outline">
      Cancel
    </Button>
  </Modal.Footer>
</Modal>`

const SIZES: ModalSize[] = [
	'sm',
	'md',
	'lg',
	'xl',
	'2xl',
	'full',
]

function SizeGallery() {
	// The size is kept after closing so the popup does not resize halfway
	// through its own exit animation.
	const [size, setSize] = useState<ModalSize>('md')
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
			<Modal
				onChange={setOpen}
				open={open}
				size={size}
			>
				<Modal.Header
					bordered
					closable
				>
					<Modal.Header.Title>size="{size}"</Modal.Header.Title>
					<Modal.Header.Description>
						Escape, the backdrop and the close button all report the same thing.
					</Modal.Header.Description>
				</Modal.Header>
				<Modal.Body>
					<p className="text-muted-foreground text-sm">
						Every size but <code>full</code> is a max-width on a centred popup
						capped at 90vh. <code>full</code> drops the centring and the
						rounding and takes the whole viewport.
					</p>
				</Modal.Body>
				<Modal.Footer bordered>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

function PlainModal() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button onClick={() => setOpen(true)}>Open a bare modal</Button>
			<Modal
				onChange={setOpen}
				open={open}
			>
				<Modal.Body>
					<p className="text-sm">
						A body on its own. No header means the dialog has no accessible name
						— press Escape or click the backdrop to leave.
					</p>
				</Modal.Body>
			</Modal>
		</>
	)
}

function BorderedModal({ bordered }: { bordered: boolean }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				{bordered ? 'bordered' : 'not bordered'}
			</Button>
			<Modal
				onChange={setOpen}
				open={open}
			>
				<Modal.Header
					bordered={bordered}
					closable
				>
					<Modal.Header.Title>Delete workspace</Modal.Header.Title>
					<Modal.Header.Description>
						Everything in it goes with it.
					</Modal.Header.Description>
				</Modal.Header>
				<Modal.Body>
					<p className="text-muted-foreground text-sm">
						With <code>bordered</code>, rules split header, body and footer into
						bands.
					</p>
				</Modal.Body>
				<Modal.Footer bordered={bordered}>
					<Button
						onClick={() => setOpen(false)}
						variant="destructive"
					>
						Delete
					</Button>
					<Button
						onClick={() => setOpen(false)}
						variant="outline"
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

function ClosableModal({ closable }: { closable: boolean }) {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				{closable ? 'closable header' : 'header without a close button'}
			</Button>
			<Modal
				onChange={setOpen}
				open={open}
				size="sm"
			>
				<Modal.Header closable={closable}>
					<Modal.Header.Title>Session expiring</Modal.Header.Title>
				</Modal.Header>
				<Modal.Body>
					<p className="text-muted-foreground text-sm">
						{closable
							? 'The × in the corner closes the dialog through onChange.'
							: 'No × — Escape and the backdrop are the only ways out.'}
					</p>
				</Modal.Body>
			</Modal>
		</>
	)
}

function ScrollingModal() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="secondary"
			>
				Open a long modal
			</Button>
			<Modal
				onChange={setOpen}
				open={open}
			>
				<Modal.Header
					bordered
					closable
				>
					<Modal.Header.Title>Terms</Modal.Header.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="space-y-3 text-muted-foreground text-sm">
						{Array.from({
							length: 24,
						}).map((_, index) => (
							<p
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length filler
								key={index}
							>
								Paragraph {index + 1}. The popup is capped at 90vh and the body
								is the only part that scrolls, so the header and the footer stay
								put.
							</p>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer bordered>
					<Button onClick={() => setOpen(false)}>Accept</Button>
				</Modal.Footer>
			</Modal>
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
					Modal
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A centred dialog in six sizes, assembled from a header, a body and a
					footer.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<h3 className="font-medium text-sm">Modal</h3>
				<PropsTable props={modalProps} />
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
				<h3 className="font-medium text-sm">Modal.Header</h3>
				<PropsTable props={modalHeaderProps} />
				<h3 className="font-medium text-sm">Modal.Footer</h3>
				<PropsTable props={modalFooterProps} />
				<h3 className="font-medium text-sm">
					Modal.Body · Modal.Header.Title · Modal.Header.Description
				</h3>
				<p className="max-w-prose text-muted-foreground text-sm">
					These take only children. Title and Description name the dialog;
					without them it opens unnamed.
				</p>
				<PropsTable props={emptyProps} />
			</section>

			<SlotsSection slug="modal" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="All six sizes">
					<SizeGallery />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The footer lays its children out in reverse, so the first child you
					write ends up on the right. Put the primary action first.
				</p>
				<ComponentPreview title="Bordered and not">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<BorderedModal bordered />
						<BorderedModal bordered={false} />
					</div>
				</ComponentPreview>
				<ComponentPreview title="Closable header">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<ClosableModal closable />
						<ClosableModal closable={false} />
					</div>
				</ComponentPreview>
				<ComponentPreview title="Body only">
					<PlainModal />
				</ComponentPreview>
				<ComponentPreview title="A body that scrolls">
					<ScrollingModal />
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

export const Route = createFileRoute('/libs/react-web/components/modal')({
	component: Page,
})
