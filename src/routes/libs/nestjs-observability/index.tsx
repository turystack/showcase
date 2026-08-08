import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-observability/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-observability
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Metrics as logs: fire-and-forget counters, gauges, and durations via
					EMF. CloudWatch built-in, zero latency in the request path.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'pnpm add @turystack/nestjs-observability',
							label: 'pnpm',
						},
						{
							code: 'npm install @turystack/nestjs-observability',
							label: 'npm',
						},
						{
							code: 'yarn add @turystack/nestjs-observability',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-observability',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import {
  Measure,
  MetricsService,
  ObservabilityModule,
} from '@turystack/nestjs-observability'

@Module({
  imports: [
    ObservabilityModule.register((config) => ({
      adapter: 'cloudwatch',
      cloudwatch: { namespace: 'my-api' },
      defaultDimensions: {
        env: config.get('NODE_ENV'),
        service: 'my-api',
      },
    })),
  ],
})
export class AppModule {}

@Injectable()
export class OrderService {
  constructor(private readonly metrics: MetricsService) {}

  @Measure('order.create')
  async create(input: CreateOrder) {
    const order = await this.db.orders.create(input)

    this.metrics.count('OrderCreated', 1, { status: order.status })

    return order
  }
}`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The metric is a log line (EMF — Embedded Metric Format):
							CloudWatch extracts it asynchronously, so there are zero API calls
							and zero latency in the request path
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							count / gauge / duration are void and never throw —
							fire-and-forget like the publisher
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@Measure('name') wraps a method and emits duration + count with
							status success | error automatically
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Dimensions are typed via MetricMap augmentation — and must be low
							cardinality (env, service, domain, operation, status; never ids)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Native in Lambda (stdout → CloudWatch Logs → metric); ECS/EC2
							needs the CloudWatch Agent or Fluent Bit shipping stdout
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							adapter: 'local' logs metrics through nestjs-logger for dev;
							custom vendors via IObservabilityAdapter + OBSERVABILITY_ADAPTER
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
