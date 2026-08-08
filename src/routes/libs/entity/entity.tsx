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
    readonly customerId: string,
    readonly total: number,
    readonly createdAt: Date,
    private status: 'PENDING' | 'PAID' = 'PENDING',
  ) {}

  markAsPaid() {
    if (this.status === 'PAID') {
      throw new OrderExceptions.order.alreadyPaid({ orderId: this.id })
    }

    this.status = 'PAID'
  }

  isPaid() {
    return this.status === 'PAID'
  }

  canBeCancelled() {
    return this.status === 'PENDING'
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
					Using the entity in a service
				</h2>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import { PublisherService } from '@turystack/nestjs-publisher'

@Injectable()
class OrderService {
  constructor(private readonly publisher: PublisherService) {}

  async create(customerId: string, total: number) {
    const order = new Order(
      crypto.randomUUID(),
      customerId,
      total,
      new Date(),
    )

    await this.publisher.publish({
      name: 'order-created',
      destination: 'TOPIC',
      data: order,
    })

    return order
  }

  async pay(order: Order) {
    order.markAsPaid()

    await this.publisher.publish({
      name: 'order-paid',
      destination: 'TOPIC',
      data: order,
    })
  }
}`}
					filename="order.service.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					The service only works with the domain object. The publisher owns
					serialization; application services should never call SuperJSON
					directly. Load the entity module in producer and consumer processes so
					the transport layer knows the same stable identifier on both sides.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					When a class is decorated, it calls{' '}
					<code>superjson.registerClass(Constructor, identifier)</code> under
					the hood. A stable, namespaced identifier is recommended when class
					names may be minified or duplicated. This allows superjson to preserve
					class instances, Dates, and other non-JSON-native types when
					serializing/deserializing data through messaging systems like SNS/SQS.
				</p>
			</div>
		</div>
	)
}
