import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-resilience/timeout')({
	component: Page,
})

const params = [
	{
		description:
			'Budget for a single call, in milliseconds. Exceeding it rejects with GatewayTimeoutError.',
		name: 'ms',
		required: true,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Timeout
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Fails a call that has not settled within the budget.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Timeout } from '@turystack/nestjs-resilience'

Timeout(ms: number): MethodDecorator`}
					filename="timeout.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Parameters</h2>
				<PropsTable props={params} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Timeout } from '@turystack/nestjs-resilience'

@Injectable()
export class PostalCodeAdapter {
  @Timeout(3_000)
  async lookup(postalCode: string) {
    return this.client.get(\`/address/\${postalCode}\`)
  }
}`}
					filename="postal-code.adapter.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Failure</h2>
				<CodeBlock
					code={`GatewayTimeoutError  // from @turystack/exceptions — 504

{
  message: 'lookup exceeded 3000ms',
  metadata: { operation: 'lookup', timeoutMs: 3000 },
}`}
					filename="error"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The pending work is abandoned, not aborted: the promise is dropped but
					the underlying request keeps running. Providers that support
					cancellation should still receive an AbortSignal.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Placement</h2>
				<p className="text-muted-foreground">
					Keep it closest to the method. Above <code>@Retry</code> it would
					bound the entire retry sequence instead of each attempt.
				</p>
			</div>
		</div>
	)
}
