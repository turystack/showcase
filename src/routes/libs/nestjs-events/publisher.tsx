import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-events/publisher')({
	component: Page,
})

const options = [
	{
		default: '—',
		description: 'Publishes every event to EventBridge.',
		name: 'adapter',
		required: true,
		type: "'aws'",
	},
	{
		default: '—',
		description: 'The same project the workers app declares.',
		name: 'project',
		required: true,
		type: 'string',
	},
	{
		default: 'project',
		description: 'Event Source; what trigger.sources filters on.',
		name: 'source',
		required: false,
		type: 'string',
	},
	{
		default: 'SDK',
		description: 'AWS_REGION or the profile when unset.',
		name: 'aws.region',
		required: false,
		type: 'string',
	},
	{
		default: 'SDK',
		description: 'The default provider chain when unset.',
		name: 'aws.credentials',
		required: false,
		type: '{ accessKeyId, secretAccessKey }',
	},
]

const publishArgs = [
	{
		description: 'A contract made by defineEvent.',
		name: 'event',
		required: true,
		type: 'EventContract',
	},
	{
		description: 'Payload, typed as z.input of the schema.',
		name: 'data',
		required: true,
		type: 'z.input<typeof event.schema>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Publisher
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The API's side: fire-and-forget publishing of contracts onto the
					project bus.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">PublisherModule</h2>
				<CodeBlock
					code={`import { PublisherModule } from '@turystack/nestjs-events/publisher'

@Module({
  imports: [
    PublisherModule.register({ adapter: 'aws', project: 'acme' }),
  ],
})
export class AppModule {}`}
					filename="apps/api/src/app.module.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Global: register it once in the app root. Domain packages just inject{' '}
					<code>PublisherService</code>.
				</p>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The bus</h2>
				<p className="text-muted-foreground">
					Not an option. The workers stack owns it, named{' '}
					<code>&lt;stage&gt;-&lt;project&gt;-events</code>.
				</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Its name is read from <code>EVENT_BUS_NAME</code>. Boot fails when
							it is unset.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The stack injects it into the lambdas and writes it to SSM for the
							API.
						</span>
					</li>
				</ul>
				<CodeBlock
					code={`EVENT_BUS_NAME=dev-acme-events   # SSM /dev/acme/EVENT_BUS_NAME`}
					filename="apps/api environment"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">PublisherService</h2>
				<CodeBlock
					code={`import { PublisherService } from '@turystack/nestjs-events/publisher'

publish(event: EventContract, data: z.input<typeof event.schema>): void
flush(): Promise<void> // awaits everything in flight`}
					filename="publisher-service.d.ts"
					language="ts"
				/>
				<PropsTable props={publishArgs} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<p className="text-muted-foreground">
					Work, commit the write, then publish. <code>publish()</code> returns{' '}
					<code>void</code>; delivery failures are logged, never thrown.
				</p>
				<CodeBlock
					code={`import { PublisherService } from '@turystack/nestjs-events/publisher'
import { OrderCreated } from '@repo/events'

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orders: OrderRepository,
    private readonly publisher: PublisherService,
  ) {}

  async execute(input: CreateOrderInput) {
    const order = await this.orders.create(input) // committed before the event

    this.publisher.publish(OrderCreated, {
      identifier: order.order_id,
      total: order.total, // currency defaults to 'BRL'
    })

    return order
  }
}`}
					filename="create-order.use-case.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Validation</h2>
				<p className="text-muted-foreground">
					<code>publish()</code> parses <code>data</code> synchronously and
					throws on invalid input, before anything is sent.
				</p>
				<p className="text-muted-foreground">
					The original <code>data</code> is sent. The consumer parses it once,
					so transforms never run twice.
				</p>
				<p className="text-muted-foreground text-sm">
					An entry EventBridge refuses (<code>FailedEntryCount</code>) counts as
					a failed delivery and is logged.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Publish after the commit
				</h2>
				<p className="text-muted-foreground">
					Inside a transaction, an event announces a write that may still roll
					back. Publish once the commit succeeded.
				</p>
				<CodeBlock
					code={`import { onAfterCommit } from '@turystack/nestjs-database'

onAfterCommit(() => this.publisher.publish(OrderCreated, payload))`}
					filename="usage"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Delivery is at-most-once: a crash between commit and publish loses the
					event.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">flush</h2>
				<p className="text-muted-foreground">
					Awaits every delivery still in flight. App code never calls it.
				</p>
				<p className="text-muted-foreground text-sm">
					Serverless.create flushes before the lambda freezes; the service
					flushes itself on shutdown.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Who consumes an event
				</h2>
				<p className="text-muted-foreground">
					A workers handler, never a listener in the publishing process. It
					imports the same contract.
				</p>
				<CodeBlock
					code={`import { Handler } from '@turystack/nestjs-events/workers'
import { OrderCreated } from '@repo/events'

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated }, { queue: { /* … */ } })
export class ReserveStockHandler {
  async execute(event: OrderCreated) {
    // …
  }
}`}
					filename="apps/workers/src/orders/reserve-stock.handler.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
