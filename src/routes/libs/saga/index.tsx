import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/saga/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/saga
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Orchestrator for distributed compensating transactions with LIFO
					rollback and structured logging.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/saga @turystack/nestjs-logger',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/saga @turystack/nestjs-logger',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/saga @turystack/nestjs-logger',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/saga @turystack/nestjs-logger',
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
							Register compensation functions for multi-step operations
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							LIFO rollback ensures compensations run in reverse order
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Resilient execution — individual failures don't stop remaining
							compensations
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Concurrent rollback calls share a single execution</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Optional logger injection for testing and integration</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Saga } from '@turystack/saga'

async function createOrderWithPayment(data: CreateOrderDto) {
  const saga = new Saga('CreateOrder')

  try {
    const order = await createOrder(data)
    saga.addCompensation(() => deleteOrder(order.id))

    const payment = await chargePayment(order)
    saga.addCompensation(() => refundPayment(payment.id))

    return { order, payment }
  } catch (error) {
    await saga.rollback()
    throw error
  }
}`}
					filename="example.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
