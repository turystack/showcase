import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-serverless/handler-decorator',
)({
	component: Page,
})

const handlerOptionsProps = [
	{
		description: 'An optional Zod schema to validate the incoming event.',
		name: 'schema',
		required: false,
		type: 'ZodSchema',
	},
]

const transforms = [
	{
		description:
			'AWS SQS. Each record body is JSON-parsed; the handler runs once per record, and failures are reported as batchItemFailures (partial batch).',
		name: 'SQS',
		required: false,
		type: 'record body',
	},
	{
		description:
			'AWS EventBridge → SQS. The SQS body carries the EventBridge envelope; the transform unwraps it and delivers only the detail.',
		name: 'EVENTBRIDGE-SQS',
		required: false,
		type: 'event detail',
	},
	{
		description:
			'AWS SNS → SQS subscription. The SQS body carries the SNS notification envelope; the transform unwraps and JSON-parses the Message.',
		name: 'SNS-SQS',
		required: false,
		type: 'notification Message',
	},
	{
		description:
			'AWS EventBridge → SNS → SQS. Envelopes are unwrapped recursively until the original detail payload.',
		name: 'EVENTBRIDGE-SNS-SQS',
		required: false,
		type: 'event detail',
	},
	{
		description:
			'AWS SQS with a non-JSON body. The raw string is delivered as-is.',
		name: 'SQS (raw body)',
		required: false,
		type: 'string',
	},
	{
		description:
			'AWS SNS. The notification Message is JSON-parsed; nested EventBridge envelopes are unwrapped too.',
		name: 'SNS',
		required: false,
		type: 'notification Message',
	},
	{
		description:
			'AWS EventBridge → SNS. The Message carries the EventBridge envelope; unwrapped to the detail.',
		name: 'EVENTBRIDGE-SNS',
		required: false,
		type: 'event detail',
	},
	{
		description:
			'AWS S3 object events. Each record is normalized to { bucket, key, size, eTag }.',
		name: 'S3',
		required: false,
		type: '{ bucket, key, size, eTag }',
	},
	{
		description: 'AWS EventBridge. The handler receives the event detail.',
		name: 'EVENTBRIDGE',
		required: false,
		type: 'event detail',
	},
	{
		description:
			'AWS EventBridge scheduled rules (source aws.events or aws.scheduler). The handler receives the event detail.',
		name: 'SCHEDULE',
		required: false,
		type: 'event detail',
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
					Marks a class as an auto-discovered serverless event handler. An
					optional Zod <code>schema</code> types <code>execute(event)</code> at
					compile time.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Handler, createHandlerSchema, type HandlerInput, type IHandler, type EventSource, type HandlerOptions } from '@turystack/nestjs-serverless'

@Handler(source: EventSource, options?: HandlerOptions)`}
					filename="handler.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Handler, createHandlerSchema } from '@turystack/nestjs-serverless'
import { z } from 'zod'

const schema = createHandlerSchema(
  z.object({ orderId: z.string(), amount: z.number() })
)

// SQS — plain queue consumer; one execute per record
@Handler('SQS', { schema })
class SqsHandler {
  async execute(event: z.infer<typeof schema>) {}
}

// EVENTBRIDGE-SQS — queue fed by EventBridge; the envelope is unwrapped
// and the schema validates the event detail
@Handler('EVENTBRIDGE-SQS', { schema })
class EventBridgeSqsHandler {
  async execute(event: z.infer<typeof schema>) {}
}

// SNS-SQS — queue subscribed to an SNS topic; the notification envelope
// is unwrapped and the schema validates the Message
@Handler('SNS-SQS', { schema })
class SnsSqsHandler {
  async execute(event: z.infer<typeof schema>) {}
}

// EVENTBRIDGE-SNS-SQS — full chain; both envelopes are unwrapped
@Handler('EVENTBRIDGE-SNS-SQS', { schema })
class ChainHandler {
  async execute(event: z.infer<typeof schema>) {}
}

// SNS — topic subscription straight to the lambda
@Handler('SNS', { schema })
class SnsHandler {
  async execute(event: z.infer<typeof schema>) {}
}

// EVENTBRIDGE-SNS — topic fed by EventBridge
@Handler('EVENTBRIDGE-SNS', { schema })
class EventBridgeSnsHandler {
  async execute(event: z.infer<typeof schema>) {}
}

// S3 — object events, normalized per record
const s3Schema = createHandlerSchema(
  z.object({ bucket: z.string(), key: z.string() })
)

@Handler('S3', { schema: s3Schema })
class S3Handler {
  async execute(event: z.infer<typeof s3Schema>) {}
}

// EVENTBRIDGE — event bus consumer; receives the detail
@Handler('EVENTBRIDGE', { schema })
class EventBridgeHandler {
  async execute(event: z.infer<typeof schema>) {}
}

// SCHEDULE — EventBridge scheduled rules (aws.events / aws.scheduler)
@Handler('SCHEDULE')
class NightlyJobHandler {
  async execute() {}
}`}
					filename="handlers.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Input transforms (AWS context)
				</h2>
				<p className="text-muted-foreground">
					Source names are explicit AWS triggers, defined by the AWS adapter —
					the table lists every transform applied to the raw event before{' '}
					<code>execute</code>. The handler never sees delivery envelopes:
					chains like EventBridge → SQS are unwrapped recursively down to the
					original payload, and the <code>schema</code> always validates the
					final payload.
				</p>
				<PropsTable props={transforms} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">HandlerOptions</h2>
				<p className="text-muted-foreground">
					The event source is the decorator's first positional argument, not an
					option: <code>@Handler(source, options?)</code>.
				</p>
				<PropsTable props={handlerOptionsProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					createHandlerSchema
				</h2>
				<p className="text-muted-foreground">
					Identity helper that preserves the Zod schema type. Use it to define
					handler schemas so that <code>HandlerInput</code> can infer the
					correct types.
				</p>
				<CodeBlock
					code={`const schema = createHandlerSchema(
  z.object({ orderId: z.string() })
)

// HandlerInput<typeof schema> = { orderId: string }`}
					filename="schema.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					HandlerInput{'<T>'}
				</h2>
				<p className="text-muted-foreground">
					Infers the TypeScript type from a Zod handler schema created with{' '}
					<code>createHandlerSchema</code>. Use it to type the{' '}
					<code>execute(event)</code> parameter.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">IHandler{'<T>'}</h2>
				<p className="text-muted-foreground">
					Interface that all <code>@Handler()</code> classes must implement.
					Defines a single <code>execute(event: T)</code> method.
				</p>
				<CodeBlock
					code={`interface IHandler<T = unknown> {
  execute(event: T): Promise<void>
}`}
					filename="serverless.types.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">EventSource</h2>
				<p className="mb-4 text-muted-foreground">
					Explicit trigger names, typed per adapter — the union available in
					@Handler is the union of every installed adapter's source names,
					contributed through the ServerlessSourceMap interface. With only the
					built-in AWS adapter:
				</p>
				<CodeBlock
					code={`type AwsEventSource =
  | 'SQS'                  // Amazon SQS
  | 'EVENTBRIDGE-SQS'      // EventBridge → SQS
  | 'SNS-SQS'              // SNS → SQS subscription
  | 'EVENTBRIDGE-SNS-SQS'  // EventBridge → SNS → SQS
  | 'SNS'                  // Amazon SNS
  | 'EVENTBRIDGE-SNS'      // EventBridge → SNS
  | 'S3'                   // Amazon S3 object events
  | 'EVENTBRIDGE'          // Amazon EventBridge
  | 'SCHEDULE'             // EventBridge scheduled rules (aws.events / aws.scheduler)`}
					filename="serverless.types.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Every record is its own operation
				</h2>
				<p className="text-muted-foreground">
					Each record runs inside its own context scope, inheriting the
					correlation id the publisher travelled with. The chain crossed a
					process boundary here, so generating a new one would break it.
				</p>
				<CodeBlock
					code={`turystack.correlation_id   inherited from the message body
handler                    the handler class name
attempt                    delivery count, when the source reports it`}
					filename="context attributes"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					These ride along on every log line and span of that record, so a
					failure on the fifth delivery is distinguishable from one on the first
					without any extra plumbing.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Delivery attempt</h2>
				<p className="text-muted-foreground">
					SQS reports how many times a message has been delivered. Without it,
					the last attempt before the dead letter queue looks exactly like the
					first — so a handler cannot decide to give up, escalate, or degrade.
				</p>
				<CodeBlock
					code={`type ParsedRecord = {
  attempt?: number   // 1 on first delivery; absent when the source has no counter
  body: unknown
  recordId?: string
}`}
					filename="serverless.adapter.interface.d.ts"
					language="ts"
				/>
				<CodeBlock
					code={`SQS           ApproximateReceiveCount → attempt
*-SQS         same counter — the chain is still delivered by SQS
SNS           no retry counter → attempt is undefined
S3            no retry counter → attempt is undefined
EventBridge   no retry counter → attempt is undefined`}
					filename="per source"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					A handler must not assume the field exists: only the queue-delivered
					sources report it — SQS, EVENTBRIDGE-SQS, SNS-SQS and
					EVENTBRIDGE-SNS-SQS. A handler bound to SNS, S3 or EVENTBRIDGE always
					sees <code>undefined</code>.
				</p>
			</div>
		</div>
	)
}
