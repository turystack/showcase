import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-idempotency/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-idempotency
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Runs an operation at most once per key — for repeatable requests and
					redeliverable events.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-idempotency',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-idempotency',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-idempotency',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-idempotency',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Replay the first result for an HTTP caller, or skip silently for a
							queue handler
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Concurrent callers of the same key wait instead of running twice
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A key reused with a different payload is reported, not served the
							wrong result
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Built on @turystack/nestjs-cache storage and
							@turystack/nestjs-lock mutual exclusion
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Why it is needed</h2>
				<p className="text-muted-foreground">
					Delivery is at-least-once. A queue redelivers, a client retries a
					timed-out request, a lambda is invoked again — none of them can tell a
					lost response from a failed call. Without a key, the effect is applied
					twice.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { CacheModule } from '@turystack/nestjs-cache'
import { LockModule } from '@turystack/nestjs-lock'
import { IdempotencyModule } from '@turystack/nestjs-idempotency'

@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
    LockModule.register(),
    IdempotencyModule.register({ ttl: 604_800 }),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
