import { createFileRoute } from '@tanstack/react-router'
import { Button, Confirm, Provider } from '@turystack/ui'
import { useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const confirmProps = [
	{
		description: 'Controls the open state of the dialog.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'The title displayed at the top of the confirm dialog.',
		name: 'title',
		required: true,
		type: 'string',
	},
	{
		description: 'The body text describing the action to confirm.',
		name: 'description',
		required: true,
		type: 'string',
	},
	{
		default: '"Confirm"',
		description: 'Label for the confirm action button.',
		name: 'confirmText',
		type: 'string',
	},
	{
		default: '"Cancel"',
		description: 'Label for the cancel action button.',
		name: 'cancelText',
		type: 'string',
	},
	{
		description:
			'Additional props forwarded to the confirm button (excludes loading and onClick).',
		name: 'confirmProps',
		type: 'Omit<ButtonProps, "loading" | "onClick">',
	},
	{
		description:
			'Additional props forwarded to the cancel button (excludes loading and onClick).',
		name: 'cancelProps',
		type: 'Omit<ButtonProps, "loading" | "onClick">',
	},
	{
		description: 'Handler called when the user confirms the action.',
		name: 'onConfirm',
		type: '() => void',
	},
	{
		description: 'Handler called when the user cancels.',
		name: 'onCancel',
		type: '() => void',
	},
	{
		description: 'Handler called when the dialog closes (either way).',
		name: 'onClose',
		type: '() => void',
	},
]

const usageCode = `import { Confirm, Button } from '@turystack/ui'
import { useState } from 'react'

function DeleteButton() {
  const [open, setOpen] = useState(false)

  async function handleConfirm() {
    await deleteItem()
    setOpen(false)
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Confirm
        open={open}
        title="Delete item"
        description="This action cannot be undone. The item will be permanently deleted."
        confirmText="Delete"
        confirmProps={{ variant: 'destructive' }}
        onConfirm={handleConfirm}
        onClose={() => setOpen(false)}
      />
    </>
  )
}`

function Demo() {
	const [open, setOpen] = useState(false)
	const [destructiveOpen, setDestructiveOpen] = useState(false)

	return (
		<div className="flex flex-wrap gap-3">
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
			>
				Open confirm dialog
			</Button>
			<Button
				onClick={() => setDestructiveOpen(true)}
				variant="destructive"
			>
				Delete item
			</Button>

			<Confirm
				description="Are you sure you want to proceed with this action? This may affect your settings."
				onClose={() => setOpen(false)}
				onConfirm={() => setOpen(false)}
				open={open}
				title="Confirm action"
			/>
			<Confirm
				confirmProps={{
					variant: 'destructive',
				}}
				confirmText="Delete"
				description="This action cannot be undone. The item will be permanently deleted from the system."
				onClose={() => setDestructiveOpen(false)}
				onConfirm={() => setDestructiveOpen(false)}
				open={destructiveOpen}
				title="Delete item"
			/>
		</div>
	)
}

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Confirm
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A modal dialog that asks users to confirm an action before
						proceeding. Supports async handlers and destructive variants.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={confirmProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Demo</h2>
					<ComponentPreview title="Confirm dialog variants">
						<Demo />
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

export const Route = createFileRoute('/libs/ui/confirm')({
	component: Page,
})
