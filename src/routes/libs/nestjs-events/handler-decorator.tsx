import { createFileRoute, Link } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-events/handler-decorator')({
	component: Page,
})

const eventOptionsProps = [
	{
		description: 'From defineEvent. Validates records, names the rule.',
		name: 'event',
		required: true,
		type: 'EventContract',
	},
]

const handlerOptionsProps = [
	{
		description: 'Validates each record before execute.',
		name: 'schema',
		required: false,
		type: 'ZodSchema',
	},
]

const transforms = [
	{
		description: 'Bus rule straight to the lambda.',
		name: 'EVENTBRIDGE',
		required: false,
		type: 'event detail',
	},
	{
		description: 'Bus rule → own queue + DLQ → lambda.',
		name: 'EVENTBRIDGE-SQS',
		required: false,
		type: 'event detail',
	},
	{
		description: 'Bucket file → default bus → own queue → lambda.',
		name: 'S3',
		required: false,
		type: 'S3Object',
	},
	{
		description: 'EventBridge Scheduler → lambda.',
		name: 'SCHEDULE',
		required: false,
		type: 'event detail',
	},
]

const infraSettings = [
	{
		default: "'512 MB'",
		description: '128 MB to 10240 MB.',
		name: 'function.memory',
		required: false,
		type: 'InfraSize',
	},
	{
		default: "'30 seconds'",
		description: 'Up to 15 minutes.',
		name: 'function.timeout',
		required: false,
		type: 'InfraDuration',
	},
	{
		default: "'arm64'",
		description: 'Lambda CPU architecture.',
		name: 'function.architecture',
		required: false,
		type: "'arm64' | 'x86_64'",
	},
	{
		default: 'unset',
		description: 'reserved must be ≥ queue.maxConcurrency.',
		name: 'function.concurrency',
		required: false,
		type: '{ reserved?, provisioned? }',
	},
	{
		default: '10',
		description: 'Queued sources. Above 10 needs batchWindow ≥ 1 s.',
		name: 'queue.batchSize',
		required: false,
		type: 'number',
	},
	{
		default: 'unset',
		description: 'Up to 5 minutes.',
		name: 'queue.batchWindow',
		required: false,
		type: 'InfraDuration',
	},
	{
		default: '3',
		description: 'Deliveries before the DLQ.',
		name: 'queue.maxReceive',
		required: false,
		type: 'number',
	},
	{
		default: 'unset',
		description: '2 to 1000. Caps the SQS to lambda fan-out.',
		name: 'queue.maxConcurrency',
		required: false,
		type: 'number',
	},
	{
		default: '6× timeout',
		description: 'Never below the function timeout.',
		name: 'queue.visibilityTimeout',
		required: false,
		type: 'InfraLongDuration',
	},
	{
		default: '—',
		description: 'SCHEDULE only. rate(...) or cron(...).',
		name: 'trigger.schedule',
		required: true,
		type: 'string',
	},
	{
		default: 'UTC',
		description: 'SCHEDULE only. IANA timezone of the cron.',
		name: 'trigger.timezone',
		required: false,
		type: 'string',
	},
	{
		default: '{}',
		description: 'SCHEDULE only. Plain JSON, the record body.',
		name: 'trigger.payload',
		required: false,
		type: 'unknown',
	},
	{
		default: 'unset',
		description: 'Bus sources only. Filters on the event Source.',
		name: 'trigger.sources',
		required: false,
		type: '[string, ...string[]]',
	},
	{
		default: '—',
		description: "S3 only. Key prefix in the bucket, e.g. 'avatars/'.",
		name: 'trigger.path',
		required: true,
		type: 'string',
	},
	{
		default: 'unset',
		description: "S3 only. Key suffix, e.g. '.png'.",
		name: 'trigger.suffix',
		required: false,
		type: 'string',
	},
	{
		default: "['Object Created']",
		description: "S3 only. Also 'Object Deleted'.",
		name: 'trigger.events',
		required: false,
		type: 'S3EventName[]',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Handler
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Registers a class as the lambda's handler. The options type{' '}
					<code>execute(event)</code> at compile time.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import type { EventContract } from '@turystack/nestjs-events'
import { Handler, type HandlerInfra } from '@turystack/nestjs-events/workers'

// EVENTBRIDGE, EVENTBRIDGE-SQS
@Handler(source, options: { event: EventContract }, infra?: HandlerInfra<Source>)

// S3, SCHEDULE — infra holds their trigger, so it is required
@Handler(source, options: { schema?: ZodSchema } | undefined, infra: HandlerInfra<Source>)`}
					filename="handler.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<p className="text-muted-foreground">
					Bus sources take the event from <code>defineEvent</code>, the contract
					the producer publishes with.
				</p>
				<CodeBlock
					code={`import type { EventPayload } from '@turystack/nestjs-events'
import { type S3Object, Handler } from '@turystack/nestjs-events/workers'
import { OrderCreated } from '@repo/events' // defineEvent(...)
import { z } from 'zod'

// EVENTBRIDGE-SQS — bus rule → own queue + DLQ → lambda
@Handler('EVENTBRIDGE-SQS', { event: OrderCreated }, {
  queue: { maxConcurrency: 5, maxReceive: 4 },
  function: { timeout: '1 minute', concurrency: { reserved: 5 } },
})
class ReserveStockHandler {
  async execute(event: EventPayload<typeof OrderCreated>) {}
}

// EVENTBRIDGE — bus rule → lambda, filtered by Source
@Handler('EVENTBRIDGE', { event: OrderCreated }, {
  trigger: { sources: ['orders-api'] },
})
class AuditOrderHandler {
  async execute(event: EventPayload<typeof OrderCreated>) {}
}

// SCHEDULE — takes { schema }; the trigger is required to deploy
const nightly = z.object({ kind: z.literal('nightly') })

@Handler('SCHEDULE', { schema: nightly }, {
  trigger: { schedule: 'cron(0 3 * * ? *)', timezone: 'America/Sao_Paulo', payload: { kind: 'nightly' } },
  function: { timeout: '5 minutes' },
})
class NightlyReportHandler {
  async execute(event: z.infer<typeof nightly>) {}
}

// S3 — a .png saved under avatars/ in the project bucket → own queue → lambda
@Handler('S3', {}, {
  trigger: { path: 'avatars/', suffix: '.png', events: ['Object Created'] },
  queue: { maxReceive: 5 },
})
class ResizeAvatarHandler {
  async execute(file: S3Object) {} // { bucket, key, size, eTag }
}`}
					filename="handlers.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					One event per handler
				</h2>
				<p className="text-muted-foreground">
					The option is <code>event</code>, singular. A list would give{' '}
					<code>execute</code> a union with no way to tell which event came.
				</p>
				<p className="text-muted-foreground">
					An event can have many handlers. Each gets its own bus rule, queue and
					DLQ.
				</p>
				<CodeBlock
					code={`// 1 event → 3 handlers: three rules, three queues, three DLQs
@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class ReserveStockHandler {
  async execute(event: OrderCreated) {}
}

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class SendReceiptHandler {
  async execute(event: OrderCreated) {}
}

@Handler('EVENTBRIDGE', { event: OrderCreated })
class AuditOrderHandler {
  async execute(event: OrderCreated) {}
}`}
					filename="fan-out.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Two events with the same reaction are two thin handlers calling one
					use case.
				</p>
				<CodeBlock
					code={`@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class NotifyOnCreatedHandler {
  constructor(private readonly notify: NotifyCustomerUseCase) {}
  async execute(event: EventPayload<typeof OrderCreated>) {
    await this.notify.execute(event.identifier)
  }
}

@Handler('EVENTBRIDGE-SQS', { event: OrderCancelled })
class NotifyOnCancelledHandler {
  constructor(private readonly notify: NotifyCustomerUseCase) {}
  async execute(event: EventPayload<typeof OrderCancelled>) {
    await this.notify.execute(event.identifier)
  }
}`}
					filename="same-reaction.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Input transforms (AWS context)
				</h2>
				<p className="text-muted-foreground">
					Every source goes through EventBridge, and each one gets generated
					infra.
				</p>
				<PropsTable props={transforms} />
				<p className="text-muted-foreground text-sm">
					SQS and EventBridge envelopes are unwrapped. The schema validates the
					final payload.
				</p>
				<p className="text-muted-foreground text-sm">
					Every source goes through EventBridge: a queue only sits behind a
					rule.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Options</h2>
				<p className="text-muted-foreground">
					EVENTBRIDGE and EVENTBRIDGE-SQS take <code>{'{ event }'}</code>. A
					missing event throws at decoration.
				</p>
				<PropsTable props={eventOptionsProps} />
				<p className="text-muted-foreground">
					S3 and SCHEDULE take an optional <code>{'{ schema }'}</code>. S3 has
					no defineEvent: S3 is the producer.
				</p>
				<PropsTable props={handlerOptionsProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Infra (third argument)
				</h2>
				<p className="text-muted-foreground">
					Deploy-only: it never changes runtime behaviour. Optional for the bus
					sources; S3 and SCHEDULE need it for their trigger.
				</p>
				<PropsTable props={infraSettings} />
				<p className="text-muted-foreground text-sm">
					<code>queue</code> applies to EVENTBRIDGE-SQS and S3, the two sources
					delivered through a queue.
				</p>
				<p className="text-muted-foreground">
					<code>reserved</code> caps the lambda for every trigger.{' '}
					<code>maxConcurrency</code> caps only how many invocations SQS starts.
				</p>
				<p className="text-muted-foreground text-sm">
					A <code>reserved</code> below <code>maxConcurrency</code> throttles
					and bounces messages, so generate rejects it.
				</p>
				<p className="text-muted-foreground text-sm">
					How it is generated and deployed:{' '}
					<Link
						className="text-lib underline"
						to="/libs/nestjs-events/infra"
					>
						Infra &amp; CLI
					</Link>
					.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Types</h2>
				<CodeBlock
					code={`// @turystack/nestjs-events — what defineEvent returns
type EventContract<N extends string, S extends ZodType> = Readonly<{
  name: N   // the bus rule DetailType
  schema: S // validated again per record
}>

type EventPayload<E extends EventContract> = z.infer<E['schema']>

// @turystack/nestjs-events/workers

// what an S3 handler receives, per file
type S3Object = { bucket: string; key: string; size?: number; eTag?: string }

// the third argument; never when the source has no infra
type HandlerInfra<Source> = Source extends InfraSource ? InfraSourceMap[Source] : never`}
					filename="workers.types.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">IHandler{'<T>'}</h2>
				<p className="text-muted-foreground">
					The shape every <code>@Handler()</code> class has: one{' '}
					<code>execute(event: T)</code> method.
				</p>
				<CodeBlock
					code={`interface IHandler<T = unknown> {
  execute(event: T): Promise<void>
}`}
					filename="workers.types.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">EventSource</h2>
				<p className="mb-4 text-muted-foreground">
					Trigger names, typed per adapter through ServerlessSourceMap. With
					only the built-in AWS adapter:
				</p>
				<CodeBlock
					code={`type AwsEventSource =
  | 'EVENTBRIDGE'      // project bus rule → lambda
  | 'EVENTBRIDGE-SQS'  // project bus rule → handler queue → lambda
  | 'S3'               // project bucket file → default bus → handler queue → lambda
  | 'SCHEDULE'         // EventBridge Scheduler → lambda`}
					filename="workers.types.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Every record is its own operation
				</h2>
				<p className="text-muted-foreground">
					Each record runs in its own context scope and inherits the correlation
					id the publisher sent.
				</p>
				<CodeBlock
					code={`turystack.correlation_id   inherited from the message body
handler                    the handler class name
attempt                    delivery count, when the source reports it`}
					filename="context attributes"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					They ride on every log line and span of that record, so a fifth
					delivery reads differently from the first.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Delivery attempt</h2>
				<p className="text-muted-foreground">
					SQS reports the delivery count, so a handler can tell the last try
					before the DLQ from the first.
				</p>
				<CodeBlock
					code={`type ParsedRecord = {
  attempt?: number   // 1 on first delivery; absent when the source has no counter
  body: unknown
  recordId?: string
}`}
					filename="workers.adapter.interface.d.ts"
					language="ts"
				/>
				<CodeBlock
					code={`EVENTBRIDGE-SQS   ApproximateReceiveCount → attempt
S3                same counter — delivered by the handler's queue
EVENTBRIDGE       no retry counter → attempt is undefined
SCHEDULE          no retry counter → attempt is undefined`}
					filename="per source"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Only the queued sources report it. EVENTBRIDGE and SCHEDULE always see{' '}
					<code>undefined</code>.
				</p>
			</div>
		</div>
	)
}
