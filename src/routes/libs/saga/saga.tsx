import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/saga/saga')({
	component: Page,
})

const methods = [
	{
		description:
			'Registers a compensation function to be executed on rollback. Compensations are executed in reverse order (LIFO).',
		name: 'addCompensation(fn)',
		type: '(fn: () => Promise<unknown> | unknown) => void',
	},
	{
		description:
			'Executes all registered compensations in reverse order. Individual failures are logged but do not stop remaining compensations.',
		name: 'rollback()',
		type: '() => Promise<void>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">Saga</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Register a compensation for each completed step; on failure, rollback
					undoes them in reverse order.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Constructor</h2>
				<CodeBlock
					code="new Saga(name: string, loggerService?: SagaLogger)"
					filename="saga.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Methods</h2>
				<PropsTable props={methods} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Concurrency</h2>
				<p className="text-muted-foreground">
					Concurrent calls to <code>rollback()</code> share the same execution.
					Compensations registered while a rollback is running are preserved for
					the next rollback instead of running in the active batch.
				</p>
			</div>

			<div className="space-y-4">
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

    const shipment = await createShipment(order)
    saga.addCompensation(() => cancelShipment(shipment.id))

    return { order, payment, shipment }
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
