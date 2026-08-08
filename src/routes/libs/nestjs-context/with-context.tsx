import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-context/with-context')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@WithContext
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Opens a context around an entrypoint that is not an HTTP request.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { WithContext, type ContextSeed } from '@turystack/nestjs-context'

WithContext(seed?: ContextSeed): MethodDecorator

// ContextSeed — reads the decorated method's own arguments:
// (...args) => Partial<RequestContext> | undefined`}
					filename="with-context.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Queue handler</h2>
				<p className="text-muted-foreground">
					The seed pulls the correlation id out of the envelope, so the chain
					that started at the publisher continues on the consumer.
				</p>
				<CodeBlock
					code={`import { Handler } from '@turystack/nestjs-serverless'
import { WithContext } from '@turystack/nestjs-context'

@Handler('SQS', { schema: paymentRequestedSchema })
export class ProcessPaymentHandler {
  @WithContext((event: PaymentRequested) => ({ correlationId: event.correlationId }))
  async execute(event: PaymentRequested) {
    return this.processPaymentUseCase.execute(event)
  }
}`}
					filename="process-payment.handler.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Scheduled tick</h2>
				<p className="text-muted-foreground">
					Without a seed the decorator generates a correlation id, so each tick
					is traceable on its own.
				</p>
				<CodeBlock
					code={`import { Schedule } from '@turystack/nestjs-scheduler'
import { WithContext } from '@turystack/nestjs-context'

@Schedule('0 * * * *', { lock: true })
export class ExpireReservationsJob {
  @WithContext()
  async execute() {
    return this.expireReservationsUseCase.execute()
  }
}`}
					filename="expire-reservations.job.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Nesting</h2>
				<p className="text-muted-foreground">
					A context already in flight is reused rather than replaced, so a
					decorated method calling another one never severs the chain.
				</p>
			</div>
		</div>
	)
}
