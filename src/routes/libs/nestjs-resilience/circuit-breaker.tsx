import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-resilience/circuit-breaker')(
	{
		component: Page,
	},
)

const options = [
	{
		default: '5',
		description: 'Consecutive failures that open the circuit.',
		name: 'failureThreshold',
		required: false,
		type: 'number',
	},
	{
		default: '30000',
		description:
			'Time the circuit stays open before allowing a trial call, in milliseconds.',
		name: 'resetTimeout',
		required: false,
		type: 'number',
	},
	{
		default: '1',
		description:
			'Trial calls allowed while half-open. A single failure re-opens the circuit.',
		name: 'halfOpenAttempts',
		required: false,
		type: 'number',
	},
	{
		default: 'ClassName.methodName',
		description:
			'Identifier for the circuit, reported in the thrown error and usable in metrics.',
		name: 'name',
		required: false,
		type: 'string',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@CircuitBreaker
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Stops calling a dependency that is already failing, so a degraded
					provider does not cascade into the caller.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import {
  CircuitBreaker,
  circuitState,
  resetCircuits,
  type CircuitBreakerOptions,
  type CircuitState,
} from '@turystack/nestjs-resilience'

CircuitBreaker(options?: CircuitBreakerOptions): MethodDecorator

circuitState(name: string): CircuitState | undefined   // 'closed' | 'half-open' | 'open'
resetCircuits(): void                                  // test seam`}
					filename="circuit-breaker.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					CircuitBreakerOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<CodeBlock
					code={`closed      calls pass through; consecutive failures are counted
   │        failureThreshold reached
   ▼
open        every call fails fast with ServiceUnavailableError
   │        resetTimeout elapsed
   ▼
half-open   one trial call is allowed
   │            ├── succeeds → closed, counter reset
   │            └── fails    → open again, immediately`}
					filename="state machine"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					A failed trial call re-opens the circuit at once rather than waiting
					for the threshold again — the dependency just proved it is still down.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import {
  CircuitBreaker,
  Retry,
  Timeout,
} from '@turystack/nestjs-resilience'

@Injectable()
export class PaymentGatewayAdapter {
  @CircuitBreaker({ failureThreshold: 5, resetTimeout: 30_000 })
  @Retry({ attempts: 3 })
  @Timeout(5_000)
  async charge(input: ChargeInput) {
    return this.client.charge(input)
  }
}`}
					filename="payment-gateway.adapter.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Failure</h2>
				<CodeBlock
					code={`ServiceUnavailableError  // from @turystack/exceptions — 503

{
  message: 'Circuit PaymentGatewayAdapter.charge is open',
  metadata: { circuit: 'PaymentGatewayAdapter.charge', retryAfterMs: 24_310 },
}`}
					filename="error"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					State lives in this process
				</h2>
				<p className="text-muted-foreground">
					One circuit per decorated method, held in memory. The breaker exists
					to stop <em>this</em> process from spending threads and connections on
					a dependency it already knows is down — each instance paying a few
					calls to learn that is cheaper than coupling every instance to a
					shared store.
				</p>
			</div>
		</div>
	)
}
