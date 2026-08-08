import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute(
	'/libs/nestjs-observability/measure-decorator',
)({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Measure
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Method decorator that measures the wrapped call — a duration and a
					count per invocation, tagged with success or error.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Measure } from '@turystack/nestjs-observability'

Measure<Name extends MetricName>(
  name: Name,
  dimensions?: MetricDimensions<Name>,
): MethodDecorator`}
					filename="measure.decorator.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Names and dimensions are typed by the MetricMap registry when the
					consumer augments it — same registry as MetricsService.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import { Measure } from '@turystack/nestjs-observability'

@Injectable()
export class CheckoutService {
  @Measure('Checkout', { domain: 'orders' })
  async run(input: CheckoutInput) {
    return this.processPayment(input)
  }
}`}
					filename="checkout.service.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Every call to run emits Checkout as a duration (elapsed ms) and as a
					count of 1, both with dimensions {'{'} domain: 'orders', status:
					'success' | 'error' {'}'}.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Notes</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							On completion it emits two metrics under the given name: a
							duration (elapsed milliseconds) and a count (1), with a status
							dimension of 'success' or 'error' merged into the given dimensions
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Errors are RETHROWN untouched — measuring never changes behavior.
							Works for async and sync methods: a returned Promise is observed
							and the metrics are emitted when it settles
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The MetricsService is resolved lazily on each call from the module
							singleton (getMetrics()), so decorated classes need no injection —
							only ObservabilityModule.register() in the app root. Before
							registration, a decorated call throws '[ObservabilityModule]
							metrics not initialized'
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
