import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute(
	'/libs/nestjs-observability/metrics-service',
)({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					MetricsService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Fire-and-forget metric emission — every method is synchronous, returns
					void and never throws.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { MetricsService } from '@turystack/nestjs-observability'

class MetricsService {
  count<Name extends MetricName>(
    name: Name,
    value = 1,
    dimensions?: MetricDimensions<Name>,
  ): void

  gauge<Name extends MetricName>(
    name: Name,
    value: number,
    dimensions?: MetricDimensions<Name>,
  ): void

  duration<Name extends MetricName>(
    name: Name,
    millis: number,
    dimensions?: MetricDimensions<Name>,
  ): void
}`}
					filename="metrics.service.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					count emits unit 'Count' (value defaults to 1), gauge emits a
					point-in-time value with unit 'None', duration emits milliseconds with
					unit 'Milliseconds'.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					tabs={[
						{
							code: `import { Injectable } from '@nestjs/common'
import { MetricsService } from '@turystack/nestjs-observability'

@Injectable()
export class OrderService {
  constructor(private readonly metrics: MetricsService) {}

  async create(input: CreateOrderInput) {
    const startedAt = Date.now()
    const order = await this.repository.save(input)

    this.metrics.count('OrderCreated', 1, { paymentMethod: input.paymentMethod })
    this.metrics.duration('OrderCreate', Date.now() - startedAt)
    this.metrics.gauge('OrderQueueDepth', await this.queue.size())

    return order
  }
}`,
							label: 'emit',
						},
						{
							code: `declare module '@turystack/nestjs-observability' {
  interface MetricMap {
    OrderCreated: { dimensions: { paymentMethod: string } }
  }
}

metrics.count('OrderCreated', 1, { paymentMethod: 'pix' }) // typed
metrics.count('Unknown', 1) // compile error once MetricMap is augmented`,
							label: 'typed names',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Notes</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Fire-and-forget by design: the adapter call is wrapped in
							try/catch and errors are swallowed — a broken metric backend
							cannot break the app or add latency to the request path
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							MetricMap is an empty interface the consumer augments via declare
							module — it types metric names and per-name dimensions on both
							MetricsService and @Measure. Without augmentation any string name
							is accepted and dimensions are Record&lt;string, string&gt;
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Low-cardinality rule: every distinct dimension-value combination
							is a separate CloudWatch metric (and a separate charge).
							Dimensions are for slicing — env, service, domain, operation,
							status — never ids (userId, orderId, requestId). Ids belong in
							logs, not dimensions
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
