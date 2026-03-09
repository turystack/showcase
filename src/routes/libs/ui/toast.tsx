import { createFileRoute } from '@tanstack/react-router'
import { Button, toast, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const setupProps = [
	{
		description:
			'ToastContainer is included automatically inside Provider — no manual setup needed. Just call toast() from anywhere.',
		name: 'ToastContainer',
		type: 'component (built into Provider)',
	},
]

const usageCode = `import { toast, Provider } from '@turystack/ui'

// Provider already includes ToastContainer internally
function App() {
  return (
    <Provider>
      {/* rest of your app */}
    </Provider>
  )
}

// Trigger toasts from anywhere — no extra setup
toast('File saved successfully')
toast.success('Profile updated')
toast.error('Failed to save changes')
toast.warning('You have unsaved changes')
toast.info('New version available')

// With description
toast.success('Saved', {
  description: 'Your changes have been saved.',
})

// With action
toast('File deleted', {
  action: {
    label: 'Undo',
    onClick: () => restoreFile(),
  },
})

// Promise toast
toast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Saved successfully!',
  error: 'Failed to save.',
})`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Toast
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						Transient notifications powered by Sonner. Add{' '}
						<code className="rounded bg-muted px-1 text-sm">ToastContainer</code>{' '}
						once inside{' '}
						<code className="rounded bg-muted px-1 text-sm">Provider</code>{' '}
						at the root, then trigger toasts from anywhere using the{' '}
						<code className="rounded bg-muted px-1 text-sm">toast</code>{' '}
						function.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Setup</h2>
					<PropsTable props={setupProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Variants</h2>
					<ComponentPreview title="Toast variants">
						<div className="flex flex-wrap gap-3">
							<Button
								variant="outline"
								onClick={() => toast('Default notification')}
							>
								Default
							</Button>
							<Button
								variant="outline"
								onClick={() => toast.success('Operation successful!')}
							>
								Success
							</Button>
							<Button
								variant="outline"
								onClick={() => toast.error('Something went wrong')}
							>
								Error
							</Button>
							<Button
								variant="outline"
								onClick={() => toast.warning('Proceed with caution')}
							>
								Warning
							</Button>
							<Button
								variant="outline"
								onClick={() => toast.info('New version available')}
							>
								Info
							</Button>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With description
					</h2>
					<ComponentPreview title="Toast with description">
						<Button
							variant="outline"
							onClick={() =>
								toast.success('Profile updated', {
									description: 'Your profile information has been saved.',
								})
							}
						>
							Show with description
						</Button>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Promise</h2>
					<ComponentPreview title="Promise toast (loading → success/error)">
						<Button
							variant="outline"
							onClick={() =>
								toast.promise(
									new Promise((resolve) => setTimeout(resolve, 2000)),
									{
										error: 'Failed to save.',
										loading: 'Saving...',
										success: 'Saved successfully!',
									},
								)
							}
						>
							Save with promise
						</Button>
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

export const Route = createFileRoute('/libs/ui/toast')({
	component: Page,
})
