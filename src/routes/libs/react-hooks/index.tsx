import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/react-hooks/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/react-hooks
				</h1>
				<div className="mt-3 max-w-3xl space-y-2 text-lg text-muted-foreground">
					<p>
						A collection of reusable, platform-agnostic React hooks for state,
						async work, timing, and lifecycle.
					</p>
					<p>
						It provides shared behavior for web, React Native, and Expo projects
						without coupling application logic to a UI library.
					</p>
				</div>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/react-hooks',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/react-hooks',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/react-hooks',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/react-hooks',
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
							Platform-agnostic APIs shared by web, React Native, and Expo
							applications
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Focused utilities for state, async work, debounce, timing, and
							lifecycle
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>TypeScript-first APIs with complete type definitions</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							UI-independent behavior without browser, router, or styling
							dependencies
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { useDisclosure } from '@turystack/react-hooks'

export function DisclosureExample() {
  const disclosure = useDisclosure()

  return (
    <>
      <button type="button" onClick={disclosure.on}>Open</button>
      {disclosure.value && (
        <button type="button" onClick={disclosure.off}>Close</button>
      )}
    </>
  )
}`}
					filename="disclosure-example.tsx"
					language="tsx"
				/>
			</div>
		</div>
	)
}
