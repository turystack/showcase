import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-publisher/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-publisher
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Message publishing for NestJS on pluggable transport adapters. AWS
					EventBridge/SQS built-in.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-publisher',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-publisher',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-publisher',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-publisher',
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
							Pluggable transport adapters — AWS EventBridge/SQS built-in
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Type-safe publishing via <code>declare module</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>superjson serialization</span>
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
					code={`import { ConfigModule } from '@turystack/nestjs-config'
import { PublisherModule } from '@turystack/nestjs-publisher'
import { configSchema } from './config.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    PublisherModule.register((config) => ({
      adapter: 'aws',
      aws: { region: config.get('AWS_REGION') },
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
