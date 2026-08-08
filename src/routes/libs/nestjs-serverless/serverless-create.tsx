import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute(
	'/libs/nestjs-serverless/serverless-create',
)({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Factory
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Bootstraps a NestJS application and returns an AWS Lambda handler.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Serverless } from '@turystack/nestjs-serverless'

Serverless.create(module: Type<any>): (event: unknown, context: unknown) => Promise<unknown>`}
					filename="serverless.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Serverless } from '@turystack/nestjs-serverless'

export const handler = Serverless.create(AppModule)`}
					filename="handler.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Returns the handler synchronously — no top-level await needed
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Bootstraps the NestJS application context lazily on the first
							invocation (cold start) and caches it for warm invocations
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Returns a function compatible with the AWS Lambda handler
							signature (event, context) =&gt; Promise&lt;unknown&gt;
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Parses incoming events and routes them to the correct handler
							based on event source
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							When the app registers @turystack/nestjs-publisher, pending
							fire-and-forget publishes are flushed before the lambda freezes
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
