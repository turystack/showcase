import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-resilience/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-resilience
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Timeout, retry with backoff and circuit breaker for calls that leave
					the process.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-resilience',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-resilience',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-resilience',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-resilience',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@Timeout — a call that never settles fails as GatewayTimeoutError
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@Retry — exponential backoff with full jitter, client errors never
							retried
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@CircuitBreaker — a degraded provider stops cascading into the
							caller
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Errors come from @turystack/exceptions, so they map to HTTP like
							any other
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Composition order is significant
				</h2>
				<p className="text-muted-foreground">
					Decorators apply bottom-up, so the one closest to the method runs
					innermost. Declared in the order below, the breaker fails fast without
					spending the retry budget, and each attempt carries its own timeout.
				</p>
				<CodeBlock
					code={`import {
  CircuitBreaker,
  Retry,
  Timeout,
} from '@turystack/nestjs-resilience'

@Injectable()
export class PaymentGatewayAdapter {
  @CircuitBreaker({ failureThreshold: 5, resetTimeout: 30_000 })
  @Retry({ attempts: 3, backoff: 'exponential' })
  @Timeout(5_000)
  async charge(input: ChargeInput) {
    return this.client.charge(input)
  }
}`}
					filename="payment-gateway.adapter.ts"
					language="ts"
				/>
				<CodeBlock
					code={`CircuitBreaker   outermost — open circuit never reaches the retry loop
  Retry          middle    — repeats while the failure looks transient
    Timeout      innermost — budget per attempt, not per sequence`}
					filename="nesting"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Putting @Timeout on top instead would time out the whole retry
					sequence, which is almost never the intent.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Retry demands idempotency
				</h2>
				<p className="text-muted-foreground">
					A retry cannot tell a lost response from a failed call, so a
					non-idempotent mutation may be applied more than once. Only decorate
					operations that are safe to repeat.
				</p>
			</div>
		</div>
	)
}
