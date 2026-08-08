import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-observability/tracing')({
	component: Page,
})

const methods = [
	{
		description:
			'Runs the operation inside a span. Closes it on both paths and rethrows a failure untouched.',
		name: 'span',
		required: false,
		type: '(name, operation, attributes?) => Promise<T>',
	},
	{
		description: 'The span in flight, when the application configured an SDK.',
		name: 'activeSpan',
		required: false,
		type: '() => Span | undefined',
	},
	{
		description: 'Adds an attribute to the span in flight, when there is one.',
		name: 'setAttribute',
		required: false,
		type: '(key: string, value: string) => void',
	},
	{
		description:
			'Trace id of the operation in flight, for stitching a log line to a trace in the backend.',
		name: 'traceId',
		required: false,
		type: '() => string | undefined',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Tracing
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Distributed tracing over the OpenTelemetry API, with the operation's
					context attached to every span.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					API only, never the SDK
				</h2>
				<p className="text-muted-foreground">
					This library depends on <code>@opentelemetry/api</code> and nothing
					else. That is the contract for an instrumenting library: the
					application installs and configures the SDK and picks the exporter.
				</p>
				<CodeBlock
					code={`no SDK configured   → every call is a no-op, costs nothing
SDK configured      → spans flow to whatever exporter the app chose`}
					filename="behaviour"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					So a service that never enables tracing pays nothing and needs no
					flag, and one that does is not locked to a vendor by this package.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">@Trace</h2>
				<CodeBlock
					code={`import { Trace } from '@turystack/nestjs-observability'

Trace(name: string, attributes?: Record<string, string>): MethodDecorator`}
					filename="trace.decorator.d.ts"
					language="ts"
				/>
				<CodeBlock
					code={`@Injectable()
export class PaymentGatewayAdapter {
  @Trace('charge-payment')
  async charge(input: ChargeInput) {
    return this.client.charge(input)
  }
}`}
					filename="payment-gateway.adapter.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Mirrors <code>@Measure</code>: the service is resolved from the module
					singleton, so decorated classes need no injection — only{' '}
					<code>ObservabilityModule.register()</code> in the app root.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">TracingService</h2>
				<PropsTable props={methods} />
				<CodeBlock
					code={`@Injectable()
export class ChargePaymentUseCase {
  constructor(private readonly tracing: TracingService) {}

  async execute(input: ChargeInput) {
    return this.tracing.span('charge-payment', async (span) => {
      span.setAttribute('gateway', 'stripe')

      return this.gateway.charge(input)
    })
  }
}`}
					filename="charge-payment.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The context rides along
				</h2>
				<p className="text-muted-foreground">
					When @turystack/nestjs-context is registered, every span opened here
					carries the operation's identity. Without it a trace and its log lines
					cannot be joined in the backend.
				</p>
				<CodeBlock
					code={`turystack.correlation_id   the same id every log line of this operation carries
turystack.actor_id         who is acting, once authentication resolved it
turystack.tenant_id        the tenant boundary, when there is one`}
					filename="attributes"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					An attribute passed explicitly wins over the ambient one — the caller
					is more specific.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Tracing never changes behaviour
				</h2>
				<p className="text-muted-foreground">
					A failure is recorded on the span, its status set to error, and then
					rethrown untouched. The span is closed on the success path and the
					failure path alike — same principle as <code>@Measure</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Enabling it in the application
				</h2>
				<p className="text-muted-foreground">
					Install and start an OpenTelemetry SDK in the app — that is the only
					step. Nothing in this package changes.
				</p>
				<CodeBlock
					code={`npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node`}
					filename="terminal"
					language="bash"
				/>
			</div>
		</div>
	)
}
