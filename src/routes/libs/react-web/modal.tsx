import { createFileRoute } from '@tanstack/react-router'
import { Button, Modal, Provider } from '@turystack/ui'
import { useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const modalProps = [
	{
		description: 'Controls the open state of the modal.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Handler called when the open state changes.',
		name: 'onChange',
		type: '(open: boolean) => void',
	},
]

const headerProps = [
	{
		default: 'false',
		description: 'Renders a close (×) button in the top-right corner.',
		name: 'closable',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Adds a bottom border to the header.',
		name: 'bordered',
		type: 'boolean',
	},
]

const footerProps = [
	{
		default: 'false',
		description: 'Adds a top border to the footer.',
		name: 'bordered',
		type: 'boolean',
	},
]

const usageCode = `import { Modal, Button } from '@turystack/ui'
import { useState } from 'react'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>

      <Modal open={open} onChange={setOpen}>
        <Modal.Content>
          <Modal.Header closable bordered>
            <Modal.Header.Title>Modal title</Modal.Header.Title>
            <Modal.Header.Description>
              A brief description of what this modal is for.
            </Modal.Header.Description>
          </Modal.Header>

          <Modal.Body>
            <p>Your modal content goes here.</p>
          </Modal.Body>

          <Modal.Footer bordered>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  )
}

// Using Modal.Trigger (uncontrolled — no external state)
<Modal>
  <Modal.Trigger asChild>
    <Button>Open modal</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header closable>
      <Modal.Header.Title>Title</Modal.Header.Title>
    </Modal.Header>
    <Modal.Body>Content</Modal.Body>
  </Modal.Content>
</Modal>

// Body scrolling — long content scrolls inside Modal.Body
<Modal open={open} onChange={setOpen}>
  <Modal.Content>
    <Modal.Header closable bordered>
      <Modal.Header.Title>Long content</Modal.Header.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Modal.Body has overflow-y-auto — only the body scrolls */}
      {Array.from({ length: 30 }).map((_, i) => (
        <p key={i} className="mb-3 text-sm">Paragraph {i + 1}</p>
      ))}
    </Modal.Body>
    <Modal.Footer bordered>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>`

function BasicDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open modal</Button>
			<Modal
				onChange={setOpen}
				open={open}
			>
				<Modal.Content>
					<Modal.Header
						bordered
						closable
					>
						<Modal.Header.Title>Modal title</Modal.Header.Title>
					</Modal.Header>
					<Modal.Body>
						<p className="text-sm">
							This is the modal body. You can put any content here — forms,
							images, tables, or anything else.
						</p>
					</Modal.Body>
					<Modal.Footer bordered>
						<Button
							onClick={() => setOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button onClick={() => setOpen(false)}>Save changes</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</>
	)
}

function TriggerDemo() {
	return (
		<Modal>
			<Modal.Trigger asChild>
				<Button variant="outline">Open with Trigger</Button>
			</Modal.Trigger>
			<Modal.Content>
				<Modal.Header closable>
					<Modal.Header.Title>Uncontrolled modal</Modal.Header.Title>
					<Modal.Header.Description>
						Using Modal.Trigger — no external state needed.
					</Modal.Header.Description>
				</Modal.Header>
				<Modal.Body>
					<p className="text-sm">
						This modal opens and closes via Modal.Trigger and the built-in close
						button, without any external state.
					</p>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	)
}

function ScrollingDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				Open with long content
			</Button>
			<Modal
				onChange={setOpen}
				open={open}
			>
				<Modal.Content>
					<Modal.Header
						bordered
						closable
					>
						<Modal.Header.Title>Body scrolling</Modal.Header.Title>
						<Modal.Header.Description>
							The header and footer stay fixed — only the body scrolls.
						</Modal.Header.Description>
					</Modal.Header>
					<Modal.Body>
						{Array.from({
							length: 20,
						}).map((_, i) => (
							<p
								className="mb-3 text-sm"
								key={i}
							>
								Paragraph {i + 1} — Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua.
							</p>
						))}
					</Modal.Body>
					<Modal.Footer bordered>
						<Button
							onClick={() => setOpen(false)}
							variant="outline"
						>
							Cancel
						</Button>
						<Button onClick={() => setOpen(false)}>Confirm</Button>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</>
	)
}

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Modal
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A dialog that overlays the page. Wrap content inside{' '}
						<code className="rounded bg-muted px-1 text-sm">Modal.Content</code>
						.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Modal Props</h2>
					<PropsTable props={modalProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Modal.Header Props
					</h2>
					<PropsTable props={headerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Modal.Footer Props
					</h2>
					<PropsTable props={footerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Controlled (open state)
					</h2>
					<ComponentPreview title="Modal controlled via external state">
						<BasicDemo />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Uncontrolled (Modal.Trigger)
					</h2>
					<ComponentPreview title="Modal opened via Modal.Trigger">
						<TriggerDemo />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Body scrolling</h2>
					<ComponentPreview title="Header and footer fixed — only body scrolls">
						<ScrollingDemo />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/modal')({
	component: Page,
})
