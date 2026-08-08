import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute(
	'/libs/nestjs-idempotency/idempotent-decorator',
)({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Idempotent
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Runs the decorated method at most once per resolved key.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import {
  Idempotent,
  type IdempotencyKeyResolver,
  type IdempotencyOptions,
} from '@turystack/nestjs-idempotency'

Idempotent<T extends unknown[]>(
  key: IdempotencyKeyResolver<T>,
  options?: IdempotencyOptions,
): MethodDecorator

// IdempotencyKeyResolver<T> — same engine as @Cache.* and @Lock:
// a static string, or (args: T) => string | Promise<string>`}
					filename="idempotent.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					HTTP — the caller waits for a body
				</h2>
				<p className="text-muted-foreground">
					The client sends an <code>Idempotency-Key</code> and retries with the
					same one. <code>replay</code> — the default — returns the first
					result, so the retry gets the response it lost.
				</p>
				<CodeBlock
					code={`@Controller({ path: 'payments', tag: 'Payments' })
export class PaymentController {
  constructor(private readonly idempotency: IdempotencyService) {}

  @Route({ method: 'POST', summary: 'Create Payment', description: 'Creates a payment.' })
  @Idempotent(([{ headers }]) => \`payment:\${headers['idempotency-key']}\`, {
    ttl: 604_800,
  })
  createPayment(@Request() { body, headers }) {
    return this.createPaymentUseCase.execute(body)
  }
}`}
					filename="payment.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Queue handler — nobody is waiting
				</h2>
				<p className="text-muted-foreground">
					Delivery is at-least-once, so the same event arrives twice.{' '}
					<code>skip</code> records that the work happened without storing a
					result nobody will read.
				</p>
				<CodeBlock
					code={`@Handler('SQS', { schema: paymentRequestedSchema })
export class ProcessPaymentHandler {
  constructor(private readonly idempotency: IdempotencyService) {}

  @Idempotent(([event]) => \`payment:\${event.identifier}\`, { mode: 'skip' })
  async execute(event: PaymentRequested) {
    return this.processPaymentUseCase.execute(event)
  }
}`}
					filename="process-payment.handler.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The key comes from the event's own stable identifier — the{' '}
					<code>identifier</code> every published payload carries — not from
					something generated on arrival.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Injection</h2>
				<p className="text-muted-foreground">
					The decorator reads <code>IdempotencyService</code> off the instance,
					so the host has to inject it as <code>idempotency</code> or{' '}
					<code>idempotencyService</code>. A missing injection fails with a
					message naming the method rather than an undefined access.
				</p>
			</div>
		</div>
	)
}
