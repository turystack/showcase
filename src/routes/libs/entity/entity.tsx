import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/entity/entity')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Entity
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Class decorator that registers a class with superjson so types survive
					serialization across messaging boundaries.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="function Entity(identifier?: string): (Constructor: Class) => void"
					filename="entity.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Creating a domain entity
				</h2>
				<CodeBlock
					code={`import { Entity } from '@turystack/entity'
import { OrderExceptions } from './order.exceptions'

@Entity('orders.order')
class Order {
  constructor(
    readonly id: string,
    readonly customer_id: string,
    readonly total: number,
    readonly created_at: Date,
    private status: 'pending' | 'paid' = 'pending',
  ) {}

  markAsPaid() {
    if (this.status === 'paid') {
      throw new OrderExceptions.order.alreadyPaid({ orderId: this.id })
    }

    this.status = 'paid'
  }

  isPaid() {
    return this.status === 'paid'
  }

  canBeCancelled() {
    return this.status === 'pending'
  }
}`}
					filename="order.entity.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					The decorator registers the class, while the entity remains a regular
					TypeScript class with constructors, invariants, private state, and
					domain methods.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Using the entity in a use case
				</h2>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import { onAfterCommit, Transactional } from '@turystack/nestjs-database'
import { defineEvent } from '@turystack/nestjs-events'
import { PublisherService } from '@turystack/nestjs-events/publisher'
import { z } from 'zod'

// In @repo/events. z.instanceof survives the consumer's parse; z.object strips the class.
export const OrderPaid = defineEvent('order.paid', z.instanceof(Order))

export type PayOrderInput = {
  orderId: Order['id']
}

@Injectable()
export class PayOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly publisher: PublisherService,
  ) {}

  @Transactional()
  async execute(input: PayOrderInput) {
    const order = await this.orderRepository.findById(input.orderId)

    // The invariant lives in the entity, never here.
    order.markAsPaid()

    const updated = await this.orderRepository.updateById(order.id, order)

    // After the commit, never inside the transaction: a consumer must not
    // react to a payment a rollback can still erase. No await.
    onAfterCommit(() => this.publisher.publish(OrderPaid, updated))

    return updated
  }
}`}
					filename="pay-order.use-case.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					The use case only works with the domain object — the invariant stays
					in <code className="text-lib">markAsPaid()</code>, not in the caller.
					The publisher owns serialization; application code never calls
					SuperJSON directly. Load the entity module in producer and consumer
					processes so the transport layer knows the same stable identifier on
					both sides.
				</p>
				<p className="text-muted-foreground text-sm">
					Two rules the example follows on purpose:{' '}
					<code className="text-lib">publish()</code> returns{' '}
					<code className="text-lib">void</code> and is fire-and-forget, so
					awaiting it buys nothing and suggests a delivery guarantee that does
					not exist; and the event leaves only after the write has committed —
					publishing first announces a fact that a rollback can still erase.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					Decorating a class calls{' '}
					<code>superjson.registerClass(Constructor, identifier)</code> under
					the hood.
				</p>
				<p className="text-muted-foreground">
					Class instances, Dates and other non-JSON types survive the trip
					through EventBridge events and queues.
				</p>
				<p className="text-muted-foreground text-sm">
					Use a stable, namespaced identifier when class names may be minified
					or duplicated.
				</p>
			</div>
		</div>
	)
}
