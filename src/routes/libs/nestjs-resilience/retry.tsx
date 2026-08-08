import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-resilience/retry')({
	component: Page,
})

const options = [
	{
		default: '3',
		description: 'Total attempts, first one included.',
		name: 'attempts',
		required: false,
		type: 'number',
	},
	{
		default: '"exponential"',
		description: 'Delay growth between attempts.',
		name: 'backoff',
		required: false,
		type: "'exponential' | 'fixed'",
	},
	{
		default: '100',
		description: 'Delay before the second attempt, in milliseconds.',
		name: 'baseDelay',
		required: false,
		type: 'number',
	},
	{
		default: '5000',
		description: 'Ceiling for a single delay, in milliseconds.',
		name: 'maxDelay',
		required: false,
		type: 'number',
	},
	{
		default: 'true',
		description:
			'Randomises the delay so a fleet that failed together does not retry in lockstep.',
		name: 'jitter',
		required: false,
		type: 'boolean',
	},
	{
		description:
			'Overrides which failures are retried. The default retries anything that is not a 4xx AppError.',
		name: 'retryOn',
		required: false,
		type: '(error: unknown, attempt: number) => boolean',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Retry
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Repeats a failed call while the failure looks transient.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Retry, type RetryOptions } from '@turystack/nestjs-resilience'

Retry(options?: RetryOptions): MethodDecorator`}
					filename="retry.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">RetryOptions</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What counts as transient
				</h2>
				<p className="text-muted-foreground">
					A client error will not start succeeding because it was sent again, so
					the default predicate reads the status code of an{' '}
					<code>AppError</code>.
				</p>
				<CodeBlock
					code={`AppError with statusCode >= 500   → retried
AppError with statusCode  < 500   → thrown immediately
anything else (ECONNRESET, …)     → retried, assumed to be transport`}
					filename="default predicate"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Retry, Timeout } from '@turystack/nestjs-resilience'

@Injectable()
export class ShippingAdapter {
  @Retry({ attempts: 3, backoff: 'exponential' })
  @Timeout(5_000)
  async quote(input: QuoteInput) {
    return this.client.quote(input)
  }
}`}
					filename="shipping.adapter.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The operation must be idempotent
				</h2>
				<p className="text-muted-foreground">
					A retry cannot distinguish a lost response from a failed call. Without
					idempotency, a repeated mutation may be applied twice — charge a card
					twice, create two orders. Decorate reads and idempotent writes only.
				</p>
			</div>
		</div>
	)
}
