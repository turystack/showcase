import { createFileRoute } from '@tanstack/react-router'
import { Button, Provider, Sheet } from '@turystack/ui'
import { useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const sheetProps = [
	{
		description: 'Controls the open state of the sheet.',
		name: 'open',
		type: 'boolean',
	},
	{
		default: '"right"',
		description: 'The side from which the sheet slides in.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
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
		description: 'When true, renders a close (×) button.',
		name: 'closable',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'When true, adds a bottom border to the header.',
		name: 'bordered',
		type: 'boolean',
	},
]

const usageCode = `import { Sheet, Button } from '@turystack/ui'
import { useState } from 'react'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>

      <Sheet open={open} side="right" onChange={setOpen}>
        <Sheet.Header closable bordered>
          <Sheet.Title>Sheet title</Sheet.Title>
          <Sheet.Description>Optional description text.</Sheet.Description>
        </Sheet.Header>

        <Sheet.Body>
          <p>Content goes here.</p>
        </Sheet.Body>

        <Sheet.Footer bordered>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Apply</Button>
        </Sheet.Footer>
      </Sheet>
    </>
  )
}`

function Demo({ side }: { side: 'top' | 'right' | 'bottom' | 'left' }) {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				{side}
			</Button>
			<Sheet
				onChange={setOpen}
				open={open}
				side={side}
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Title>Sheet — {side}</Sheet.Title>
				</Sheet.Header>
				<Sheet.Body>
					<p className="text-sm">
						This is the sheet content area. It slides in from the {side} edge of
						the screen.
					</p>
				</Sheet.Body>
				<Sheet.Footer bordered>
					<Button
						onClick={() => setOpen(false)}
						variant="outline"
					>
						Cancel
					</Button>
					<Button onClick={() => setOpen(false)}>Apply</Button>
				</Sheet.Footer>
			</Sheet>
		</>
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
			<Sheet
				onChange={setOpen}
				open={open}
				side="right"
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Title>Body scrolling</Sheet.Title>
					<Sheet.Description>
						Header and footer are fixed — only the body scrolls.
					</Sheet.Description>
				</Sheet.Header>
				<Sheet.Body>
					{Array.from({
						length: 20,
					}).map((_, i) => (
						<p
							className="mb-3 text-sm"
							key={i}
						>
							Item {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
							aliqua.
						</p>
					))}
				</Sheet.Body>
				<Sheet.Footer bordered>
					<Button
						onClick={() => setOpen(false)}
						variant="outline"
					>
						Cancel
					</Button>
					<Button onClick={() => setOpen(false)}>Apply</Button>
				</Sheet.Footer>
			</Sheet>
		</>
	)
}

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Sheet
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A panel that slides in from the edge of the screen (drawer). Useful
						for navigation menus, filters, or detail views.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sheet Props</h2>
					<PropsTable props={sheetProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Sheet.Header Props
					</h2>
					<PropsTable props={headerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sides</h2>
					<ComponentPreview title="Sheet on different sides">
						<div className="flex flex-wrap gap-3">
							<Demo side="right" />
							<Demo side="left" />
							<Demo side="top" />
							<Demo side="bottom" />
						</div>
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

export const Route = createFileRoute('/libs/ui/sheet')({
	component: Page,
})
