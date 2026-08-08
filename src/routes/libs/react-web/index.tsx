import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-web
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A collection of accessible, customizable UI components.
				</p>
			</div>

			<div className="space-y-3">
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
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Fully accessible components with keyboard navigation and ARIA
							support
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Customizable via CSS variables with built-in dark mode</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							TypeScript-first with full type definitions for all components
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Composable primitives designed to integrate with any styling
							system
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Button } from '@turystack/react-web'

export function App() {
  return <Button>Click me</Button>
}`}
					filename="App.tsx"
					language="tsx"
				/>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/')({
	component: Page,
})
