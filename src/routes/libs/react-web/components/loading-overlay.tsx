import { createFileRoute } from '@tanstack/react-router'
import { Button, LoadingOverlay } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/loading-overlay/loading-overlay.types.ts` and the
 * destructuring default in `loading-overlay.tsx`. `visible` is the entire API;
 * the spinner inside is a Loader fixed at `size="md"`, and the fade of the
 * content around it is a rule in react-web's `index.css`, not a prop.
 */
const loadingOverlayProps = [
	{
		default: 'false',
		description: 'Shows the overlay; when false it stays mounted, hidden.',
		name: 'visible',
		type: 'boolean',
	},
]

const usageCode = `import { LoadingOverlay } from '@turystack/react-web'

// The overlay is absolutely positioned — the box it should cover must be
// relative, or it climbs to the nearest ancestor that is. It fades its
// siblings, so it sits directly beside the content, not wrapped on its own
<div className="relative">
  <LoadingOverlay visible={isLoading} />
  <BookingsTable rows={rows} />
</div>

// Around an async action
async function save() {
  setSaving(true)
  try {
    await api.save(draft)
  } finally {
    setSaving(false)
  }
}

<div className="relative rounded-lg border p-4">
  <LoadingOverlay visible={saving} />
  <Form onSubmit={save} />
</div>`

function Page() {
	const [visible, setVisible] = useState(false)
	const [saving, setSaving] = useState(false)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					LoadingOverlay
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A spinner over a busy region, which fades the region’s own content
					instead of painting over it.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={loadingOverlayProps} />
			</section>

			<SlotsSection slug="loading-overlay" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Positioning</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The overlay is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						absolute inset-0
					</code>{' '}
					with no positioning context of its own, so it fills the nearest
					positioned ancestor.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">No veil, a fade</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The overlay paints no background. While busy, the host's other
					children drop to half opacity; the spinner stays at full strength.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The fade needs the overlay as a <em>direct</em> child of the host: put
					it beside the content, not in a wrapper.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Visibility</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Flip it by hand. Hidden, it stays in the DOM with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-hidden="true"
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-busy="false"
					</code>
					.
				</p>
				<ComponentPreview title="Toggled">
					<div className="flex w-full max-w-md flex-col items-center gap-4">
						<div className="relative w-full rounded-lg border border-border p-4">
							<LoadingOverlay visible={visible} />
							<p className="font-medium text-sm">Lisbon → Porto</p>
							<p className="text-muted-foreground text-sm">
								Two adults, one child. Departing 14 March, returning 21 March.
							</p>
							<p className="mt-2 text-muted-foreground text-sm">
								The content stays where it is — it fades to half rather than
								being covered or replaced.
							</p>
						</div>
						<Button
							onClick={() => setVisible((current) => !current)}
							variant="outline"
						>
							{visible ? 'Hide the overlay' : 'Show the overlay'}
						</Button>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Around an action</h2>
				<ComponentPreview title="Covers the region while the work runs">
					<div className="relative w-full max-w-md rounded-lg border border-border p-4">
						<LoadingOverlay visible={saving} />
						<p className="font-medium text-sm">Passenger details</p>
						<p className="mt-1 mb-3 text-muted-foreground text-sm">
							Saving takes a second and a half. The button underneath is
							unreachable while it does.
						</p>
						<Button
							onClick={async () => {
								setSaving(true)
								try {
									await new Promise((resolve) => setTimeout(resolve, 1500))
								} finally {
									setSaving(false)
								}
							}}
							size="sm"
						>
							Save
						</Button>
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

export const Route = createFileRoute(
	'/libs/react-web/components/loading-overlay',
)({
	component: Page,
})
