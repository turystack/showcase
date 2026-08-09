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

Serverless.create(
  module: new (...args: unknown[]) => unknown,
): (event: unknown, context: unknown) => Promise<unknown>`}
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
							One lambda, one handler — the app must declare exactly one
							@Handler class, and the cold start throws otherwise
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Parses the incoming event into records and runs execute once per
							record, each in its own context scope; an unrecognized event is
							logged and skipped
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A record that throws is logged and — on the SQS-delivered sources
							— returned as a batchItemFailure, so only it is redelivered; the
							rest of the batch still runs
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
