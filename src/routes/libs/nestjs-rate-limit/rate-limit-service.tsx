import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-rate-limit/rate-limit-service',
)({
	component: Page,
})

const rateLimitOptions = [
	{
		description: 'Maximum number of allowed requests within the window.',
		name: 'limit',
		required: true,
		type: 'number',
	},
	{
		description: 'Time window in milliseconds.',
		name: 'window',
		required: true,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					RateLimitService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Injectable service that enforces distributed rate limits with an
					atomic counter per key.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { RateLimitService, RateLimitExceededError, type RateLimitOptions } from '@turystack/nestjs-rate-limit'

consume(key: string, options: RateLimitOptions): Promise<void>`}
					filename="rate-limit-service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { RateLimitService } from '@turystack/nestjs-rate-limit'

@Injectable()
export class PaymentService {
  constructor(private readonly rateLimitService: RateLimitService) {}

  async charge(userId: string) {
    await this.rateLimitService.consume(\`charge:\${userId}\`, {
      limit: 5,
      window: 60_000,
    })
    // proceed with charge
  }
}`}
					filename="payment.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">RateLimitOptions</h2>
				<PropsTable props={rateLimitOptions} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					RateLimitExceededError
				</h2>
				<p className="text-muted-foreground">
					Extends <code className="text-sm">HttpException</code> (HTTP 429).
					Thrown when the number of requests exceeds the configured limit within
					the window.
				</p>
				<CodeBlock
					code={`import { RateLimitExceededError, RateLimitService } from '@turystack/nestjs-rate-limit'

async charge(userId: string) {
  try {
    await this.rateLimitService.consume(\`charge:\${userId}\`, {
      limit: 5,
      window: 60_000,
    })
    // proceed with charge
  } catch (error) {
    if (error instanceof RateLimitExceededError) {
      // rate limit exceeded — 429 Too Many Requests
    }
  }
}`}
					filename="payment.service.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
