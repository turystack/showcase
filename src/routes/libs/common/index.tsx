import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/common/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@tury/common
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A collection of type-safe utility functions for common operations.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							label: 'npm',
							code: 'npm install @tury/common',
						},
						{
							label: 'pnpm',
							code: 'pnpm add @tury/common',
						},
						{
							label: 'yarn',
							code: 'yarn add @tury/common',
						},
						{
							label: 'bun',
							code: 'bun add @tury/common',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-tury-cyan">→</span>
						<span>
							TypeScript-first with precise overloads and return types
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-tury-cyan">→</span>
						<span>Zero dependencies and tree-shakeable by design</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-tury-cyan">→</span>
						<span>Fully tested with edge cases covered</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-tury-cyan">→</span>
						<span>Works in Node.js, browsers, and edge runtimes</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { sum, subtract, multiply } from '@tury/common'

sum(2, 3)        // 5
subtract(10, 4)  // 6
multiply(3, 7)   // 21`}
					filename="example.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
