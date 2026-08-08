import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-lock/lock-service')({
	component: Page,
})

const lockOptions = [
	{
		default: '10000',
		description: 'Time-to-live for the lock in milliseconds.',
		name: 'ttl',
		required: false,
		type: 'number',
	},
	{
		default: '5000',
		description:
			'Maximum time in milliseconds to wait for the lock to become available.',
		name: 'waitTimeout',
		required: false,
		type: 'number',
	},
	{
		default: '100',
		description:
			'Interval in milliseconds between retry attempts to acquire the lock.',
		name: 'retryInterval',
		required: false,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					LockService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Injectable service that acquires and releases distributed locks.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { LockService, LockError, type LockOptions } from '@turystack/nestjs-lock'

lock(key: string, options?: LockOptions): Promise<{ unlock: () => Promise<void> }>`}
					filename="lock-service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { LockService } from '@turystack/nestjs-lock'

@Injectable()
export class OrderService {
  constructor(private readonly lockService: LockService) {}

  async processOrder(orderId: string) {
    const { unlock } = await this.lockService.lock(\`order:\${orderId}\`)
    try {
      // critical section
    } finally {
      await unlock()
    }
  }
}`}
					filename="order.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">LockOptions</h2>
				<PropsTable props={lockOptions} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">LockError</h2>
				<p className="text-muted-foreground">
					Extends <code className="text-sm">ConflictException</code> (HTTP 409).
					Thrown when the lock cannot be acquired within the configured wait
					timeout.
				</p>
				<CodeBlock
					code={`import { LockError, LockService } from '@turystack/nestjs-lock'

async processOrder(orderId: string) {
  try {
    const { unlock } = await this.lockService.lock(\`order:\${orderId}\`)
    try {
      // critical section
    } finally {
      await unlock()
    }
  } catch (error) {
    if (error instanceof LockError) {
      // lock timeout — 409 Conflict
    }
  }
}`}
					filename="order.service.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
