import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-lock/lock-decorator')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Lock
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Method decorator that wraps the call in a distributed lock.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Lock, type LockOptions } from '@turystack/nestjs-lock'

Lock<T extends unknown[]>(key: CacheKeyResolver<T>, options?: LockOptions): MethodDecorator

// CacheKeyResolver<T> — same engine as @Cache.*:
// a static string, or (args: T) => string | Promise<string>`}
					filename="lock.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Lock } from '@turystack/nestjs-lock'

@Injectable()
export class OrderService {
  @Lock(([orderId]) => \`order:\${orderId}\`, { ttl: 15_000 })
  async processOrder(orderId: string) {
    // automatically locked and unlocked
  }

  // Optionally type the args tuple:
  @Lock<[string]>(([orderId]) => \`order:\${orderId}\`)
  async cancelOrder(orderId: string) {}
}`}
					filename="order.service.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
