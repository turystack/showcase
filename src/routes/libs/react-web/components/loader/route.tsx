import { createFileRoute } from '@tanstack/react-router'
import { Loader } from '@turystack/react-web'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components/docs'

/**
 * Props read from `react-web/src/components/loader/loader.types.ts` and the
 * `defaultVariants` in `loader.tsx`. There is no `className`, so the colour
 * comes from the component and nowhere else.
 */
const loaderProps = [
	{
		default: 'false',
		description: 'Hides it from assistive tech, for self-reporting hosts.',
		name: 'decorative',
		type: 'boolean',
	},
	{
		default: '"Loading"',
		description: 'What the status region announces; ignored if decorative.',
		name: 'label',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Diameter of the spinner: sm is 16px, md is 24px, lg is 32px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const usageCode = `import { Loader } from '@turystack/react-web'

<Loader />
<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />

// Announces "Loading" via its own role="status" live region
<Loader label="Uploading photos" />

// Drops the live region — for a host that already reports its own busy state
<Loader decorative />`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Loader
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The library's spinning icon, which announces itself by default.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={loaderProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="flex flex-wrap items-end justify-center gap-8">
						<div className="flex flex-col items-center gap-2">
							<Loader size="sm" />
							<span className="text-muted-foreground text-xs">sm · 16px</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Loader size="md" />
							<span className="text-muted-foreground text-xs">md · 24px</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Loader size="lg" />
							<span className="text-muted-foreground text-xs">lg · 32px</span>
						</div>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Default">
					<Loader />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">In context</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A Loader is its own live region: the wrapper carries{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="status"
					</code>{' '}
					and announces{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						label
					</code>{' '}
					— the provider's{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loader.loading
					</code>{' '}
					by default.
				</p>
				<ComponentPreview title="Default label, and one of your own">
					<div className="flex flex-wrap items-center justify-center gap-8">
						<div className="flex flex-col items-center gap-2">
							<Loader size="sm" />
							<span className="text-muted-foreground text-xs">
								label omitted — announces "Loading"
							</span>
						</div>
						<div className="flex flex-col items-center gap-2">
							<Loader
								label="Uploading photos"
								size="sm"
							/>
							<span className="text-muted-foreground text-xs">
								label="Uploading photos"
							</span>
						</div>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						decorative
					</code>{' '}
					drops{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="status"
					</code>{' '}
					and the label and goes{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-hidden
					</code>
					, for a host that reports its own busy state.
				</p>
				<ComponentPreview title="decorative — no live region of its own">
					<div className="flex h-28 w-64 items-center justify-center rounded-lg border border-border">
						<Loader
							decorative
							size="lg"
						/>
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

export const Route = createFileRoute('/libs/react-web/components/loader')({
	component: Page,
})
