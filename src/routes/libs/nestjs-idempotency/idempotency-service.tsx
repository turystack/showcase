import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-idempotency/idempotency-service',
)({
	component: Page,
})

const options = [
	{
		default: '"replay"',
		description:
			'What a repeat returns. replay stores and returns the first result; skip stores nothing and resolves to undefined.',
		name: 'mode',
		required: false,
		type: "'replay' | 'skip'",
	},
	{
		default: '86400',
		description: 'How long the key is remembered, in seconds.',
		name: 'ttl',
		required: false,
		type: 'number',
	},
	{
		default: '5000',
		description:
			'How long a concurrent caller waits for the in-flight execution, in milliseconds.',
		name: 'waitTimeout',
		required: false,
		type: 'number',
	},
	{
		default: '30000',
		description:
			'How long the in-flight guard survives a crashed process, in milliseconds. Deliberately unrelated to ttl.',
		name: 'lockTtl',
		required: false,
		type: 'number',
	},
	{
		description:
			'Arguments the key is being used with. Fingerprinted, so the same key with a different payload is reported instead of served the wrong result.',
		name: 'payload',
		required: false,
		type: 'unknown',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					IdempotencyService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Runs an operation at most once per key.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { IdempotencyService } from '@turystack/nestjs-idempotency'

run<T>(
  key: string,
  operation: () => Promise<T>,
  options?: IdempotencyOptions & { payload?: unknown },
): Promise<T | undefined>`}
					filename="idempotency.service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					IdempotencyOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`@Injectable()
export class PaymentsService {
  constructor(private readonly idempotency: IdempotencyService) {}

  async create(key: string, input: CreatePaymentInput) {
    return this.idempotency.run(
      \`payment:\${key}\`,
      () => this.createPaymentUseCase.execute(input),
      { ttl: 604_800, payload: input },
    )
  }
}`}
					filename="payments.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Two timers, two jobs
				</h2>
				<p className="text-muted-foreground">
					<code>ttl</code> is how long the key is remembered.{' '}
					<code>lockTtl</code> is how long the in-flight guard survives a
					crashed process. They are separate on purpose.
				</p>
				<CodeBlock
					code={`ttl:     604_800s (7d)   the key stays known for a week
lockTtl:  30_000ms (30s)  the guard only has to outlast one execution`}
					filename="why"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					A guard held for the whole key window would block every retry of that
					key until it expired — a crashed process would lock the operation out
					for a week.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Guarantees</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A caller that waited on the guard re-reads before running, so it
							never executes a second time
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A failed operation is not remembered — the next call runs it again
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The same key with a different payload raises{' '}
							<code>ConflictError</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>The guard is released even when the operation throws</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
