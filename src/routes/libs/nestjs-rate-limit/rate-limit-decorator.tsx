import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute(
	'/libs/nestjs-rate-limit/rate-limit-decorator',
)({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@RateLimit
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Method decorator that enforces a rate limit on each call.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { RateLimit, type RateLimitOptions } from '@turystack/nestjs-rate-limit'

RateLimit<T extends unknown[]>(key: CacheKeyResolver<T>, options: RateLimitOptions): MethodDecorator

// CacheKeyResolver<T> — same engine as @Cache.*:
// a static string, or (args: T) => string | Promise<string>`}
					filename="rate-limit.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { RateLimit } from '@turystack/nestjs-rate-limit'

@Injectable()
export class PaymentService {
  @RateLimit(([userId]) => \`charge:\${userId}\`, { limit: 5, window: 60_000 })
  async charge(userId: string) {
    // rate-limited operation
  }

  // Optionally type the args tuple:
  @RateLimit<[string]>(([userId]) => \`refund:\${userId}\`, { limit: 1, window: 60_000 })
  async refund(userId: string) {}
}`}
					filename="payment.service.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
