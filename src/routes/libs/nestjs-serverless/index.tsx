import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-serverless/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-serverless
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					NestJS module for building AWS Lambda handlers with event source
					parsing and Zod validation.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-serverless',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-serverless',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-serverless',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-serverless',
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
						<span>AWS Lambda handler factory</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Normalizes any event source: SQS, SNS, S3, EventBridge, and
							scheduled rules
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>@Handler decorator for auto-discovery</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Zod schema validation for events</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Recursive envelope unwrapping — EventBridge → SQS, SNS → SQS,
							EventBridge → SNS → SQS all deliver the original payload
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { Serverless, ServerlessModule, Handler, type IHandler } from '@turystack/nestjs-serverless'

@Handler('SQS')
class OrderHandler implements IHandler {
  async execute(event: unknown) {
    // process SQS message
  }
}

@Module({
  imports: [ServerlessModule.register({ adapter: 'aws' })],
  providers: [OrderHandler],
})
class AppModule {}

export const handler = Serverless.create(AppModule)`}
					filename="handler.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
