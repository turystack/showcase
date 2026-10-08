import { createFileRoute, Link } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { audiences } from '@/data/react-web-audiences'
import { allComponents } from '@/data/react-web-components'

const layoutCount = audiences.reduce(
	(total, audience) => total + audience.layouts.length,
	0,
)

const LAYERS = [
	{
		answers: 'How do we build real apps with this?',
		body: 'Whole screens, grouped by audience, each with comparable variants of the same layout. This is where product decisions get made, not documented.',
		scale: 'Layouts',
		status: `${layoutCount} layouts across ${audiences.length} audiences`,
		title: 'Audiences',
		to: '/libs/react-web/audiences',
	},
	{
		answers: 'What does the library have?',
		body: 'Every primitive the package exports, one page each, written against the real types. The list comes from the built entry point, so it cannot drift.',
		scale: 'Atoms',
		status: `${allComponents.length} exported`,
		title: 'Components',
		to: '/libs/react-web/components',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-web
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The web component library, and the reference screens that prove it
					holds up in a real product.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Two layers</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Separate layers: component demos live in Components, whole screens in
					Audiences.
				</p>

				<div className="grid gap-4">
					{LAYERS.map((layer) => (
						<Link
							className="group rounded-lg border border-border p-5 transition-colors hover:border-lib/50 hover:bg-muted/40"
							key={layer.title}
							to={layer.to}
						>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<div className="flex items-baseline gap-3">
									<h3 className="font-display font-semibold text-lg">
										{layer.title}
									</h3>
									<span className="text-muted-foreground text-xs uppercase tracking-wider">
										{layer.scale}
									</span>
								</div>
								<span className="rounded-lg border border-border px-3 py-0.5 text-muted-foreground text-xs">
									{layer.status}
								</span>
							</div>
							<p className="mt-2 font-medium text-lib text-sm">
								{layer.answers}
							</p>
							<p className="mt-2 max-w-prose text-muted-foreground text-sm">
								{layer.body}
							</p>
						</Link>
					))}
				</div>
			</section>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/react-web',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/react-web',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/react-web',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/react-web',
							label: 'bun',
						},
					]}
				/>
			</section>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Wrap the app once in{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						TuryProvider
					</code>{' '}
					— it installs the colour scheme, the toast queue and the portal root.
				</p>
				<CodeBlock
					code={`import { Button, TuryProvider } from '@turystack/react-web'
import '@turystack/react-web/styles.css'

export function App() {
  return (
    <TuryProvider defaultColorScheme="system">
      <Button>Click me</Button>
    </TuryProvider>
  )
}`}
					filename="App.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Accessible by construction — keyboard navigation and ARIA are part
							of each primitive, not an afterthought
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Themed through CSS variables, with light and dark handled together
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							TypeScript-first: every prop is typed, and these pages are written
							against those types
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Compound components — Card.Header, Modal.Title,
							Layout.Sidebar.Menu.Item — so composition stays explicit
						</span>
					</li>
				</ul>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/')({
	component: Page,
})
