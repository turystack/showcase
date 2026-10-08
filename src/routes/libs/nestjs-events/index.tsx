import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-events/')({
	component: Page,
})

const entryPoints = [
	{
		default: 'both sides',
		description: 'defineEvent, EventContract, EventPayload.',
		name: '@turystack/nestjs-events',
		required: false,
		type: 'contract',
	},
	{
		default: 'the API',
		description: 'PublisherModule and PublisherService.',
		name: '/publisher',
		required: false,
		type: 'publish',
	},
	{
		default: 'apps/workers',
		description: 'WorkersModule, @Handler, Serverless.create.',
		name: '/workers',
		required: false,
		type: 'consume',
	},
	{
		default: 'apps/workers',
		description: 'The nestjs-events CLI and its programmatic API.',
		name: '/infra',
		required: false,
		type: 'deploy',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-events
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Events on one EventBridge bus: shared contracts, a publisher for the
					API, typed handlers for the workers.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-events @aws-sdk/client-eventbridge',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-events @aws-sdk/client-eventbridge',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-events @aws-sdk/client-eventbridge',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-events @aws-sdk/client-eventbridge',
							label: 'bun',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The CLI also needs <code>sst</code>, <code>@aws-sdk/client-ssm</code>{' '}
					and <code>@aws-sdk/client-sts</code> in <code>apps/workers</code>.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">
					One lib, one contract
				</h2>
				<p className="text-muted-foreground">
					A module per role. The API publishes, the workers consume, both import
					the same event.
				</p>
				<PropsTable props={entryPoints} />
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Events defined once with <code>defineEvent</code>, validated on
							publish and again per record
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Fire-and-forget publishing, superjson on the wire, correlation id
							carried along
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Four sources, all through EventBridge: bus, bus to queue, bucket
							files and schedules
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A CLI that generates and deploys the SST stack from the decorators
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The bus name comes from <code>EVENT_BUS_NAME</code>, set by the
							stack; nothing to configure
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					tabs={[
						{
							code: `// packages/events/src/order-created.ts — imported by both sides
import { defineEvent } from '@turystack/nestjs-events'
import { z } from 'zod'

export const OrderCreated = defineEvent(
  'order.created',
  z.object({ identifier: z.string(), total: z.number() }),
)`,
							label: 'Contract',
						},
						{
							code: `// apps/api/src/app.module.ts
import { PublisherModule } from '@turystack/nestjs-events/publisher'

@Module({
  imports: [PublisherModule.register({ adapter: 'aws', project: 'acme' })],
})
export class AppModule {}

// in a use case, after the commit
this.publisher.publish(OrderCreated, { identifier: order.order_id, total })`,
							label: 'API',
						},
						{
							code: `// apps/workers/src/workers.module.ts — imported by every handler
export const AcmeWorkersModule = WorkersModule.register({
  adapter: 'aws',
  project: 'acme',
  infra: { bucket: 'files' },
})

// apps/workers/src/orders/reserve-stock.handler.ts
import type { EventPayload } from '@turystack/nestjs-events'
import { Handler, Serverless } from '@turystack/nestjs-events/workers'

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated }, { queue: { maxConcurrency: 5 } })
class ReserveStockHandler {
  async execute(event: EventPayload<typeof OrderCreated>) {}
}

@Module({ imports: [AcmeWorkersModule], providers: [ReserveStockHandler] })
class HandlerModule {}

export const handler = Serverless.create(HandlerModule)`,
							label: 'Workers',
						},
					]}
				/>
			</div>
		</div>
	)
}
