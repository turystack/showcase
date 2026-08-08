import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-lock/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-lock
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Distributed locks for NestJS on pluggable cache adapters. Redis
					built-in.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-lock',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-lock',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-lock',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-lock',
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
							Storage-agnostic locking via cache adapters (Redis built-in)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Configurable TTL, wait timeout, and retry interval</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Method-level @Lock decorator</span>
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
import { LockModule } from '@turystack/nestjs-lock'

// CacheModule registered once, app-wide; LockModule reuses its connection
@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
    LockModule.register(),
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
