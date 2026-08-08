import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/exceptions/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/exceptions
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Type-safe application exception classes with stable domain codes,
					metadata, and explicit HTTP semantics.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/exceptions',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/exceptions',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/exceptions',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/exceptions',
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
						<span>Generated exception classes with camelCase keys</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Stable domain codes and structured metadata</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>HTTP status mapping without a framework dependency</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Typed AppError hierarchy and isAppError guard</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { createExceptions } from '@turystack/exceptions'

const OrderExceptions = createExceptions((e) => ({
  order: e.module('order', {
    conflict: ['already_paid'],
  }),
}))

throw new OrderExceptions.order.alreadyPaid({ orderId })`}
					filename="order.exceptions.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
