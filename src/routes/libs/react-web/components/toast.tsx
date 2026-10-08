import { createFileRoute } from '@tanstack/react-router'
import { Button, toast } from '@turystack/react-web'
import { useRef } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/toast/toast.types.ts` and the
 * destructuring defaults in `toast.tsx`. The `toast` function below is Sonner's
 * own, re-exported unchanged by the package — its options come from Sonner's
 * `ExternalToast`.
 */
const toastProps = [
	{
		default: '"top-center"',
		description: 'Corner of the viewport the toaster stacks its toasts in.',
		name: 'position',
		type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
	},
	{
		default: '"system"',
		description: 'Colour scheme; "system" follows the OS preference.',
		name: 'theme',
		type: '"dark" | "light" | "system"',
	},
]

const toastMethods = [
	{
		description: 'Plain toast, no icon or border. Returns its id.',
		name: 'toast(message, options?)',
		type: '(message: ReactNode, options?: ExternalToast) => string | number',
	},
	{
		description: 'Same as calling toast directly.',
		name: 'toast.message',
		type: '(message: ReactNode, options?: ExternalToast) => string | number',
	},
	{
		description: 'Check icon, success left border.',
		name: 'toast.success',
		type: '(message: ReactNode, options?: ExternalToast) => string | number',
	},
	{
		description: 'Octagon icon, destructive left border.',
		name: 'toast.error',
		type: '(message: ReactNode, options?: ExternalToast) => string | number',
	},
	{
		description: 'Triangle icon, warning left border.',
		name: 'toast.warning',
		type: '(message: ReactNode, options?: ExternalToast) => string | number',
	},
	{
		description: 'Info icon, info left border.',
		name: 'toast.info',
		type: '(message: ReactNode, options?: ExternalToast) => string | number',
	},
	{
		description: 'Spinner icon; stays until a toast reuses its id.',
		name: 'toast.loading',
		type: '(message: ReactNode, options?: ExternalToast) => string | number',
	},
	{
		description: 'Loading message, then success or error on settle.',
		name: 'toast.promise',
		type: '(promise: Promise<T>, data: { loading, success, error }) => …',
	},
	{
		description: 'Renders your own element in place of the toast body.',
		name: 'toast.custom',
		type: '(jsx: (id) => ReactElement, options?: ExternalToast) => string | number',
	},
	{
		description: 'Dismisses one toast by id, or every toast when called bare.',
		name: 'toast.dismiss',
		type: '(id?: string | number) => string | number',
	},
	{
		description: 'The toasts currently on screen, and everything ever queued.',
		name: 'toast.getToasts / toast.getHistory',
		type: '() => ToastT[]',
	},
]

const toastOptions = [
	{
		description: 'Second line under the message.',
		name: 'description',
		type: 'ReactNode',
	},
	{
		description: 'Primary control rendered inside the toast.',
		name: 'action',
		type: '{ label: ReactNode; onClick: (e) => void }',
	},
	{
		description: 'Secondary control, styled quieter than the action.',
		name: 'cancel',
		type: '{ label: ReactNode; onClick: (e) => void }',
	},
	{
		default: '4000',
		description: 'Ms before auto-dismiss; Infinity keeps it up.',
		name: 'duration',
		type: 'number',
	},
	{
		description: 'Position for this toast alone, in its own stack.',
		name: 'position',
		type: 'Position',
	},
	{
		description: 'Reuse an id to replace a toast already on screen.',
		name: 'id',
		type: 'string | number',
	},
	{
		default: 'false',
		description: 'Adds an X in the corner of this toast.',
		name: 'closeButton',
		type: 'boolean',
	},
	{
		description: 'Replaces the icon for this toast.',
		name: 'icon',
		type: 'ReactNode',
	},
	{
		description: 'Fire on swipe/dismiss, and on timeout.',
		name: 'onDismiss / onAutoClose',
		type: '(toast: ToastT) => void',
	},
]

const positions = [
	'top-left',
	'top-center',
	'top-right',
	'bottom-left',
	'bottom-center',
	'bottom-right',
] as const

const usageCode = `import { Toast, toast } from '@turystack/react-web'

// Mount the toaster once. TuryProvider already does this for you, with the
// defaults — mount your own only when you need another position or theme.
<Toast position="bottom-right" theme="dark" />

// Fire from anywhere: an event handler, a mutation callback, a router hook
toast('Draft saved')
toast.success('Booking confirmed')
toast.error('The card was declined')
toast.warning('Two seats left')
toast.info('Check-in opens at 14:00')

// A second line
toast.success('Booking confirmed', {
  description: 'The voucher is on its way to your inbox.',
})

// Controls inside the toast
toast('Booking deleted', {
  action: { label: 'Undo', onClick: () => restore() },
  cancel: { label: 'Dismiss', onClick: () => {} },
})

// Tie a toast to a promise
toast.promise(save(), {
  loading: 'Saving…',
  success: 'Saved',
  error: 'Could not save',
})

// Or drive it by hand through the id
const id = toast.loading('Uploading…')
await upload()
toast.success('Uploaded', { id })

// Keep it up until the reader acts
toast.error('Connection lost', {
  closeButton: true,
  duration: Number.POSITIVE_INFINITY,
})

// Dismiss
toast.dismiss(id)
toast.dismiss()`

function Page() {
	const stickyId = useRef<string | number | null>(null)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Toast
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A transient notification queue built on Sonner.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					These belong to the Toast component, not to a toast. TuryProvider
					mounts it with no props.
				</p>
				<PropsTable props={toastProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The toast function
				</h2>
				<PropsTable props={toastMethods} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Toast options</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The second argument of every method. These are the ones worth knowing;
					the full set is Sonner's{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ExternalToast
					</code>
					.
				</p>
				<PropsTable props={toastOptions} />
			</section>

			<SlotsSection slug="toast" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Types</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every button fires a real toast. Each status edge uses its theme token
					(
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--success
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--warning
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--info
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--destructive
					</code>
					).
				</p>
				<ComponentPreview title="One per type">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button
							onClick={() => toast('Draft saved')}
							variant="outline"
						>
							toast
						</Button>
						<Button
							onClick={() => toast.message('Draft saved')}
							variant="outline"
						>
							message
						</Button>
						<Button
							onClick={() => toast.success('Booking confirmed')}
							variant="outline"
						>
							success
						</Button>
						<Button
							onClick={() => toast.error('The card was declined')}
							variant="outline"
						>
							error
						</Button>
						<Button
							onClick={() => toast.warning('Two seats left')}
							variant="outline"
						>
							warning
						</Button>
						<Button
							onClick={() => toast.info('Check-in opens at 14:00')}
							variant="outline"
						>
							info
						</Button>
						<Button
							onClick={() =>
								toast.loading('Uploading…', {
									duration: 2500,
								})
							}
							variant="outline"
						>
							loading
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Content</h2>
				<ComponentPreview title="Description, action, cancel, custom icon">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button
							onClick={() =>
								toast.success('Booking confirmed', {
									description: 'The voucher is on its way to your inbox.',
								})
							}
							variant="outline"
						>
							With description
						</Button>
						<Button
							onClick={() =>
								toast('Booking deleted', {
									action: {
										label: 'Undo',
										onClick: () => toast.success('Booking restored'),
									},
								})
							}
							variant="outline"
						>
							With action
						</Button>
						<Button
							onClick={() =>
								toast('Leaving without saving?', {
									action: {
										label: 'Leave',
										onClick: () => toast.info('Left'),
									},
									cancel: {
										label: 'Stay',
										onClick: () => {},
									},
								})
							}
							variant="outline"
						>
							Action and cancel
						</Button>
						<Button
							onClick={() =>
								toast('Ticket issued', {
									icon: '🎟️',
								})
							}
							variant="outline"
						>
							Custom icon
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Lifecycle</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A loading toast never times out. Give the next call the same{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					and it replaces the toast in place, as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						toast.promise
					</code>{' '}
					does.
				</p>
				<ComponentPreview title="Promise, manual update, persistence, dismissal">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button
							onClick={() =>
								toast.promise(
									new Promise((resolve) => setTimeout(resolve, 2000)),
									{
										error: 'Could not save',
										loading: 'Saving…',
										success: 'Saved',
									},
								)
							}
							variant="outline"
						>
							promise (resolves)
						</Button>
						<Button
							onClick={() =>
								toast.promise(
									new Promise((_, reject) => setTimeout(reject, 2000)),
									{
										error: 'Could not save',
										loading: 'Saving…',
										success: 'Saved',
									},
								)
							}
							variant="outline"
						>
							promise (rejects)
						</Button>
						<Button
							onClick={() => {
								const id = toast.loading('Uploading…')
								setTimeout(
									() =>
										toast.success('Uploaded', {
											id,
										}),
									2000,
								)
							}}
							variant="outline"
						>
							Update by id
						</Button>
						<Button
							onClick={() => {
								stickyId.current = toast.error('Connection lost', {
									closeButton: true,
									duration: Number.POSITIVE_INFINITY,
								})
							}}
							variant="outline"
						>
							Persistent
						</Button>
						<Button
							onClick={() => {
								if (stickyId.current !== null) {
									toast.dismiss(stickyId.current)
									stickyId.current = null
								}
							}}
							variant="outline"
						>
							Dismiss that one
						</Button>
						<Button
							onClick={() => toast.dismiss()}
							variant="outline"
						>
							Dismiss all
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Position</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The toaster on this page sits at{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						top-center
					</code>
					, so these buttons pass a per-toast{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						position
					</code>{' '}
					to open a stack in another corner.
				</p>
				<ComponentPreview title="All six corners">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{positions.map((position) => (
							<Button
								key={position}
								onClick={() =>
									toast(position, {
										position,
									})
								}
								variant="outline"
							>
								{position}
							</Button>
						))}
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

export const Route = createFileRoute('/libs/react-web/components/toast')({
	component: Page,
})
