import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute(
	'/libs/nestjs-publisher/subscriber-decorator',
)({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Subscriber
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					In-process consumer of a published event — as a class or as a provider
					method.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Subscriber } from '@turystack/nestjs-publisher'

@Subscriber(name: PublishName, options?: { schema?: ZodSchema })
// class decorator: the class needs execute(payload)
// method decorator: any provider method`}
					filename="subscriber.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Only active with adapter: 'event-emitter'. The class (or the method's
					host class) must be in some module's providers — it is resolved via
					DI.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					tabs={[
						{
							code: `import {
  Subscriber,
  type SubscriberPayload,
} from '@turystack/nestjs-publisher'

@Subscriber('order.created')
export class OrderCreatedSubscriber {
  constructor(private readonly billing: BillingService) {}

  async execute(payload: SubscriberPayload<'order.created'>) {
    await this.billing.charge(payload.orderId)
  }
}`,
							label: 'class',
						},
						{
							code: `import { Injectable } from '@nestjs/common'
import {
  Subscriber,
  type SubscriberPayload,
} from '@turystack/nestjs-publisher'

@Injectable()
export class BillingService {
  @Subscriber('order.created')
  async onOrderCreated(payload: SubscriberPayload<'order.created'>) {
    await this.charge(payload.orderId)
  }
}`,
							label: 'method',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Delivery is asynchronous and goes through the same superjson
							pipeline as the remote adapters — the payload behaves exactly like
							a message that crossed the wire
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Subscriber failures are logged and isolated — they never propagate
							to the publisher
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							With a schema, the payload is validated before execute — invalid
							events are logged and dropped
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							With an augmented PublisherEventMap, the execute payload type is
							checked against the event name at compile time
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
