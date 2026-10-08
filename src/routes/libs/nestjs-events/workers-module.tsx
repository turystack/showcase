import { createFileRoute, Link } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-events/workers-module')({
	component: Page,
})

const options = [
	{
		default: '—',
		description: 'Event parsing and the publisher transport.',
		name: 'adapter',
		required: true,
		type: "'aws'",
	},
	{
		default: '—',
		description: 'With the stage, prefixes every name and SSM path.',
		name: 'project',
		required: true,
		type: 'string',
	},
	{
		default: 'project',
		description: 'Source of the events a handler publishes.',
		name: 'source',
		required: false,
		type: 'string',
	},
	{
		default: 'SDK',
		description: 'The publisher client: region, credentials.',
		name: 'aws',
		required: false,
		type: 'PublisherAwsOptions',
	},
	{
		default: '—',
		description: 'Deploy-only. Resources the workers stack creates.',
		name: 'infra',
		required: false,
		type: 'WorkersInfraOptions',
	},
]

const infraOptions = [
	{
		default: "'events'",
		description: 'The project bus: <stage>-<project>-<bus>.',
		name: 'bus',
		required: false,
		type: 'string',
	},
	{
		default: 'unset',
		description: 'Project bucket, <stage>-<project>-<bucket>-<hash6>.',
		name: 'bucket',
		required: false,
		type: 'string',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					WorkersModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The workers app's side: event parsing for every handler, plus the
					publisher.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { WorkersModule } from '@turystack/nestjs-events/workers'

WorkersModule.register(options: WorkersModuleOptions): DynamicModule`}
					filename="workers-module.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<p className="text-muted-foreground">
					Declared once, in a module every handler imports. The infra CLI reads
					it from there.
				</p>
				<CodeBlock
					code={`// apps/workers/src/workers.module.ts
import { WorkersModule } from '@turystack/nestjs-events/workers'

export const AcmeWorkersModule = WorkersModule.register({
  adapter: 'aws',
  project: 'acme',
  infra: { bus: 'events', bucket: 'files' },
})

// apps/workers/src/orders/reserve-stock.handler.ts
@Module({
  imports: [AcmeWorkersModule],
  providers: [ReserveStockHandler],
})
class HandlerModule {}`}
					filename="apps/workers"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					WorkersModuleOptions
				</h2>
				<PropsTable props={options} />
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The same in every handler, or generate fails. Declare it once in{' '}
							<code>workers.module.ts</code>.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code>project</code>, <code>bus</code> and <code>bucket</code>:
							lowercase letters, digits and <code>-</code>.
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					WorkersInfraOptions
				</h2>
				<p className="text-muted-foreground">
					Read by the infra CLI when it imports the handlers. The runtime
					ignores it.
				</p>
				<PropsTable props={infraOptions} />
				<p className="text-muted-foreground text-sm">
					Omit <code>bucket</code> and no bucket is created. S3 handlers need
					it.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Publishing from a handler
				</h2>
				<p className="text-muted-foreground">
					WorkersModule provides <code>PublisherService</code>. A handler that
					reacts and publishes injects it.
				</p>
				<CodeBlock
					code={`import { Handler, PublisherService } from '@turystack/nestjs-events/workers'

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class ReserveStockHandler {
  constructor(private readonly publisher: PublisherService) {}

  async execute(event: EventPayload<typeof OrderCreated>) {
    // …
    this.publisher.publish(StockReserved, { identifier: event.identifier })
  }
}`}
					filename="reserve-stock.handler.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The bus name is <code>EVENT_BUS_NAME</code>, injected by the stack.
					Names and resources:{' '}
					<Link
						className="text-lib underline"
						to="/libs/nestjs-events/infra"
					>
						Infra &amp; CLI
					</Link>
					.
				</p>
			</div>
		</div>
	)
}
