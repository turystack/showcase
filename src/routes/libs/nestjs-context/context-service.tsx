import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-context/context-service')({
	component: Page,
})

const contextFields = [
	{
		description:
			'Ties every log, span, event and downstream call of this operation together. Generated at the entrypoint when the caller did not provide one.',
		name: 'correlationId',
		required: true,
		type: 'string',
	},
	{
		description:
			'Authenticated principal, populated after authentication resolves.',
		name: 'actor',
		required: false,
		type: 'RequestActor',
	},
	{
		description:
			"Tenant boundary the operation runs under, when distinct from the actor's.",
		name: 'tenantId',
		required: false,
		type: 'string',
	},
	{
		description: 'Extra low-cardinality labels propagated with the operation.',
		name: 'attributes',
		required: false,
		type: 'Record<string, string>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ContextService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Reads and opens the context of the operation in flight.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { ContextService } from '@turystack/nestjs-context'

get(): RequestContext | undefined          // undefined outside an operation
require(): RequestContext                  // throws outside an operation
correlationId(): string | undefined
run<T>(context: Partial<RequestContext>, callback: () => T): T
set(patch: Partial<Omit<RequestContext, 'correlationId'>>): void
setActor(actor: RequestActor): void

// Standalone, for entrypoints that are not Nest providers:
runWithContext<T>(context: Partial<RequestContext>, callback: () => T): T
getCurrentContext(): RequestContext | undefined
createCorrelationId(): string`}
					filename="context.service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">RequestContext</h2>
				<PropsTable props={contextFields} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Reading</h2>
				<CodeBlock
					code={`@Injectable()
export class CancelOrderUseCase {
  constructor(private readonly context: ContextService) {}

  async execute(input: CancelOrderInput) {
    // require() when the operation must have a context
    const { correlationId, actor } = this.context.require()

    // get() when running in both contexts is legitimate
    const tenantId = this.context.get()?.tenantId
  }
}`}
					filename="cancel-order.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Filling it in stages
				</h2>
				<p className="text-muted-foreground">
					The entrypoint knows the correlation id; only authentication later
					knows the actor. <code>set</code> merges into the context in flight
					instead of opening a new one.
				</p>
				<CodeBlock
					code={`// at the edge — correlation id from the header, or generated
context.run({ correlationId: request.headers['x-correlation-id'] }, () => next())

// later, once the token is verified
context.setActor({ id: profile.userId, organizationId: profile.organizationId })`}
					filename="auth.guard.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					<code>set</code> is a no-op outside an operation, so a code path that
					runs both inside and outside a request does not need a guard.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Isolation</h2>
				<p className="text-muted-foreground">
					Backed by AsyncLocalStorage: the context survives <code>await</code>{' '}
					and stays isolated between operations running concurrently in the same
					process.
				</p>
			</div>
		</div>
	)
}
