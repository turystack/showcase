import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-logger/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-logger
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Structured logging for NestJS on pluggable transport adapters. Pino +
					Elasticsearch built-in.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-logger',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-logger',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-logger',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-logger',
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
						<span>Extends NestJS ConsoleLogger</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Pluggable transports — Pino + Elasticsearch built-in</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Structured JSON logging</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Global module</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { ConfigModule } from '@turystack/nestjs-config'
import { LoggerModule } from '@turystack/nestjs-logger'
import { configSchema } from './config.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    LoggerModule.register((config) => ({
      adapter: 'elasticsearch',
      elasticsearch: { node: config.get('ELASTICSEARCH_NODE') },
    })),
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
