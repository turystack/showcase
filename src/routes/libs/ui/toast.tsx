import { createFileRoute } from '@tanstack/react-router'
import { Button, Provider, toast } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const setupProps = [
	{
		description:
			'ToastContainer is included automatically inside Provider — no manual setup needed. Just call toast() from anywhere.',
		name: 'ToastContainer',
		type: 'component (built into Provider)',
	},
]

const toastMethodsProps = [
	{
		description: 'Shows a default toast notification.',
		name: 'toast(message, options?)',
		type: '(message: string, options?: ToastOptions) => void',
	},
	{
		description: 'Shows a success toast with a checkmark icon.',
		name: 'toast.success(message, options?)',
		type: '(message: string, options?: ToastOptions) => void',
	},
	{
		description: 'Shows an error toast with an error icon.',
		name: 'toast.error(message, options?)',
		type: '(message: string, options?: ToastOptions) => void',
	},
	{
		description: 'Shows a warning toast with a warning icon.',
		name: 'toast.warning(message, options?)',
		type: '(message: string, options?: ToastOptions) => void',
	},
	{
		description: 'Shows an informational toast with an info icon.',
		name: 'toast.info(message, options?)',
		type: '(message: string, options?: ToastOptions) => void',
	},
	{
		description:
			'Shows a loading toast that resolves to success or error based on the promise outcome.',
		name: 'toast.promise(promise, options)',
		type: '(promise: Promise, options: { loading: string; success: string; error: string }) => void',
	},
]

const toastOptionsProps = [
	{
		description: 'Secondary text displayed below the main message.',
		name: 'description',
		type: 'string',
	},
	{
		description:
			'An action button rendered inside the toast with a label and click handler.',
		name: 'action',
		type: '{ label: string; onClick: () => void }',
	},
	{
		default: '4000',
		description: 'Duration in milliseconds before the toast auto-dismisses.',
		name: 'duration',
		type: 'number',
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
						<code className="rounded bg-muted px-1 text-sm">
							ToastContainer
						</code>{' '}
						once inside{' '}
						<code className="rounded bg-muted px-1 text-sm">Provider</code> at
						the root, then trigger toasts from anywhere using the{' '}
						<code className="rounded bg-muted px-1 text-sm">toast</code>{' '}
						function.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Setup</h2>
					<PropsTable props={setupProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">API Methods</h2>
					<PropsTable props={toastMethodsProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Toast Options</h2>
					<PropsTable props={toastOptionsProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Variants</h2>
					<ComponentPreview title="Toast variants">
						<div className="flex flex-wrap gap-3">
							<Button
								onClick={() => toast('Default notification')}
								variant="outline"
							>
								Default
							</Button>
							<Button
								onClick={() => toast.success('Operation successful!')}
								variant="outline"
							>
								Success
							</Button>
							<Button
								onClick={() => toast.error('Something went wrong')}
								variant="outline"
							>
								Error
							</Button>
							<Button
								onClick={() => toast.warning('Proceed with caution')}
								variant="outline"
							>
								Warning
							</Button>
							<Button
								onClick={() => toast.info('New version available')}
								variant="outline"
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
							onClick={() =>
								toast.success('Profile updated', {
									description: 'Your profile information has been saved.',
								})
							}
							variant="outline"
						>
							Show with description
						</Button>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With action</h2>
					<ComponentPreview title="Toast with an action button">
						<Button
							onClick={() =>
								toast('File deleted', {
									action: {
										label: 'Undo',
										onClick: () => toast.success('File restored'),
									},
								})
							}
							variant="outline"
						>
							Show with action
						</Button>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Promise</h2>
					<ComponentPreview title="Promise toast (loading → success/error)">
						<Button
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
							variant="outline"
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
