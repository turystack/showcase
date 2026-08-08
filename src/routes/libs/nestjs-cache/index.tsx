import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-cache/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-cache
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					An adapter-based caching module for NestJS with superjson
					serialization and method-level decorators.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-cache',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-cache',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-cache',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-cache',
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
							Pluggable storage adapters — Redis included out of the box
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>NX/XX set modes for conditional writes</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Method-level decorators (@Cache.Get, @Cache.Del)</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>NestJS DynamicModule pattern</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { CacheModule } from '@turystack/nestjs-cache'

@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
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
