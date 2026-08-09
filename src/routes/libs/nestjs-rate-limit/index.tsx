import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-rate-limit/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-rate-limit
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Distributed rate limiting for NestJS on pluggable cache adapters.
					Redis built-in.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-rate-limit',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-rate-limit',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-rate-limit',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-rate-limit',
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
							Storage-agnostic rate limiting via cache adapters (Redis built-in)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Fixed window: an atomic counter per key, with the window measured
							from the first hit
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Uses @turystack/nestjs-cache under the hood</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { CacheModule } from '@turystack/nestjs-cache'
import { RateLimitModule } from '@turystack/nestjs-rate-limit'

// CacheModule registered once, app-wide; RateLimitModule reuses its connection
@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
    RateLimitModule.register(),
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
