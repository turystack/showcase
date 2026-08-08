import { createFileRoute } from '@tanstack/react-router'
import { LoadingOverlay, Provider } from '@turystack/ui'
import { useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const loadingOverlayProps = [
	{
		default: 'false',
		description:
			'When true, displays the overlay with a centered loading spinner over the parent element.',
		name: 'visible',
		type: 'boolean',
	},
]

const usageCode = `import { LoadingOverlay } from '@turystack/ui'

// The parent element must have position: relative
<div className="relative h-40 rounded-md border p-4">
  <LoadingOverlay visible={isLoading} />
  <p>Content underneath the overlay</p>
</div>

// Toggle loading state
const [loading, setLoading] = useState(false)

<div className="relative">
  <LoadingOverlay visible={loading} />
  {/* your content */}
</div>`

function Demo() {
	const [visible, setVisible] = useState(false)

	function toggle() {
		setVisible(true)
		setTimeout(() => setVisible(false), 2000)
	}

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="relative h-32 w-full max-w-sm rounded-md border p-4">
				<LoadingOverlay visible={visible} />
				<p className="text-sm">Content below the overlay</p>
				<p className="mt-1 text-muted-foreground text-xs">
					The overlay covers this area when visible.
				</p>
			</div>
			<button
				className="rounded-md bg-primary px-4 py-2 text-primary-foreground text-sm"
				onClick={toggle}
				type="button"
			>
				Show overlay (2s)
			</button>
		</div>
	)
}

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						LoadingOverlay
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						An absolute-positioned overlay with a spinner that covers the
						nearest relative-positioned parent element during loading.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={loadingOverlayProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Demo</h2>
					<ComponentPreview title="Loading overlay on a container">
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

export const Route = createFileRoute('/libs/react-web/loading-overlay')({
	component: Page,
})
