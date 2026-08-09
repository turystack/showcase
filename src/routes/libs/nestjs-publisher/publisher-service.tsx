import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-publisher/publisher-service',
)({
	component: Page,
})

const publishInputProps = [
	{
		description:
			"For TOPIC, the event name — it becomes the EventBridge event's DetailType. For QUEUE, the queue URL.",
		name: 'name',
		required: true,
		type: 'string',
	},
	{
		description: 'The destination type.',
		name: 'destination',
		required: true,
		type: "'TOPIC' | 'QUEUE'",
	},
	{
		description: 'The data to publish. Serialized with superjson.',
		name: 'data',
		required: true,
		type: 'unknown',
	},
]

const eventMapEntryProps = [
	{
		description: 'The destination type for this event.',
		name: 'destination',
		required: true,
		type: "'TOPIC' | 'QUEUE'",
	},
	{
		description: 'The TypeScript type of the event payload.',
		name: 'data',
		required: true,
		type: 'T',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					PublisherService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Fire-and-forget publishing through the configured adapter — publish
					never blocks the request. Typed via module augmentation.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Methods</h2>
				<CodeBlock
					code={`import { PublisherService, type PublishInput } from '@turystack/nestjs-publisher'

publish(input: PublishInput): void       // enqueues and returns — no await
flush(): Promise<void>                   // awaits everything in flight`}
					filename="publisher-service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<p className="text-muted-foreground">
					The use case does the simple thing — work, commit the write, then
					publish the event. <code>publish()</code> returns <code>void</code>,
					so there is nothing to await: delivery happens in the background and
					failures are logged, never thrown to the caller.
				</p>
				<p className="text-muted-foreground">
					What <code>name</code> means depends on the destination. For{' '}
					<code>'TOPIC'</code> it is the event name —{' '}
					<code>{'<domain>.<action>'}</code> in the past, like{' '}
					<code>order.created</code> — and it becomes the EventBridge event's{' '}
					<code>DetailType</code>. For <code>'QUEUE'</code> it is the queue URL
					the SQS message is sent to.
				</p>
				<CodeBlock
					code={`@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orders: OrderRepository,
    private readonly publisher: PublisherService,
  ) {}

  async execute(input: CreateOrderInput) {
    const order = await this.orders.create(input) // committed before the event

    this.publisher.publish({
      name: 'order.created', // → EventBridge DetailType
      destination: 'TOPIC',
      data: { orderId: order.id, total: order.total },
    })

    this.publisher.publish({
      name: 'https://sqs.us-east-1.amazonaws.com/123456/orders', // → SQS QueueUrl
      destination: 'QUEUE',
      data: { orderId: order.id },
    })

    return order
  }
}`}
					filename="create-order.use-case.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">flush</h2>
				<p className="text-muted-foreground">
					Awaits every delivery still in flight. App code never calls it: the
					Serverless.create wrapper flushes before the lambda freezes, and the
					service flushes itself on application shutdown. APIs never need it.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">PublishInput</h2>
				<p className="text-muted-foreground">
					The input object for <code>publish()</code>. Without module
					augmentation, all fields are untyped. With{' '}
					<code>PublisherEventMap</code>, each <code>name</code> maps to a
					specific <code>destination</code> and typed <code>data</code>.
				</p>
				<PropsTable props={publishInputProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Type-Safe Publishing
				</h2>
				<p className="text-muted-foreground">
					Augment <code>PublisherEventMap</code> via <code>declare module</code>{' '}
					to get full type inference on <code>publish()</code> — no generics or
					schema arguments needed.
				</p>
				<p className="text-muted-foreground">
					Each key is a <code>name</code>, so a <code>'TOPIC'</code> entry is
					keyed by the event name and a <code>'QUEUE'</code> entry by the queue
					URL.
				</p>
				<CodeBlock
					code={`import '@turystack/nestjs-publisher'

declare module '@turystack/nestjs-publisher' {
  interface PublisherEventMap {
    'order.created': { destination: 'TOPIC'; data: { orderId: string; total: number } }
    'https://sqs.us-east-1.amazonaws.com/123456/orders': {
      destination: 'QUEUE'
      data: { orderId: string }
    }
  }
}`}
					filename="publisher.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Now <code>publish()</code> infers <code>name</code>,{' '}
					<code>destination</code>, and <code>data</code> automatically —{' '}
					<code>name</code> autocompletes to every key of the map,{' '}
					<code>destination</code> is restricted by the name, and{' '}
					<code>data</code> is typed per name:
				</p>
				<CodeBlock
					code={`this.publisher.publish({
  name: 'order.created',
  destination: 'TOPIC',
  data: { orderId: '123', total: 99.9 }, // { orderId: string; total: number }
})

this.publisher.publish({
  name: 'https://sqs.us-east-1.amazonaws.com/123456/orders',
  destination: 'QUEUE',
  data: { orderId: '123' }, // { orderId: string }
})`}
					filename="create-order.use-case.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					PublisherEventMap
				</h2>
				<p className="text-muted-foreground">
					Empty interface exported by the library. Each key is a{' '}
					<code>name</code> — an event name for TOPIC, a queue URL for QUEUE —
					and the value describes its destination and data type.
				</p>
				<PropsTable props={eventMapEntryProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					PublishDestination
				</h2>
				<p className="text-muted-foreground">
					The destination type — resolved by the configured transport adapter.
					With the AWS adapter, <code>'TOPIC'</code> puts an event on
					EventBridge and <code>'QUEUE'</code> sends to SQS.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">MessageMetadata</h2>
				<p className="text-muted-foreground">
					Metadata attached to published messages.
				</p>
				<PropsTable
					props={[
						{
							description: 'Unique message identifier.',
							name: 'messageId',
							required: true,
							type: 'string',
						},
						{
							description: 'When the message was published.',
							name: 'timestamp',
							required: true,
							type: 'Date',
						},
						{
							description: 'Optional key-value attributes.',
							name: 'attributes',
							required: false,
							type: 'Record<string, string>',
						},
					]}
				/>
			</div>
		</div>
	)
}
