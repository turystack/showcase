import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-events/serverless-create')({
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
					code={`import { Serverless } from '@turystack/nestjs-events/workers'

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
					code={`import { Serverless } from '@turystack/nestjs-events/workers'

export const handler = Serverless.create(HandlerModule)`}
					filename="handler.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Returns the handler synchronously, no top-level await</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Boots the Nest context on the first invocation and caches it for
							warm ones
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							One lambda, one handler: exactly one @Handler class, or the first
							invocation throws
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Runs execute once per record, each in its own context scope
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>An unrecognized event is logged and skipped</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Pending publishes from the handler flush before the lambda freezes
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Failed records</h2>
				<p className="text-muted-foreground">
					A record fails when it throws or its body does not match the schema.
					The rest of the batch still runs.
				</p>
				<CodeBlock
					code={`EVENTBRIDGE-SQS   batchItemFailures   only the failed records are redelivered, then the DLQ
S3                batchItemFailures   only the failed records are redelivered, then the DLQ
EVENTBRIDGE       invocation throws   Lambda retries the event twice, then the DLQ
SCHEDULE          invocation throws   Lambda retries the event twice, then the DLQ`}
					filename="per source"
					language="text"
				/>
				<p className="text-muted-foreground text-sm">
					Queued sources report per record. EVENTBRIDGE and SCHEDULE learn of a
					failure only from a failed invocation.
				</p>
				<p className="text-muted-foreground text-sm">
					A queued record moves to the DLQ after <code>queue.maxReceive</code>{' '}
					deliveries, 3 by default.
				</p>
				<p className="text-muted-foreground text-sm">
					A retry runs the whole invocation again, so keep those handlers
					idempotent.
				</p>
			</div>
		</div>
	)
}
