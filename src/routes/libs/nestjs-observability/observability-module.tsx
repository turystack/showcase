import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-observability/observability-module',
)({
	component: Page,
})

const options = [
	{
		description: 'The metric backend to use.',
		name: 'adapter',
		required: true,
		type: "'cloudwatch' | 'local'",
	},
	{
		description:
			"CloudWatch metric namespace (e.g. 'MyApp'). Only with adapter: 'cloudwatch'.",
		name: 'cloudwatch.namespace',
		required: true,
		type: 'string',
	},
	{
		description:
			'Dimensions attached to every metric (e.g. env, service). They form the first EMF dimension set.',
		name: 'defaultDimensions',
		type: 'Record<string, string>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ObservabilityModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A global NestJS DynamicModule that registers the metric adapter, the
					MetricsService and the singleton behind @Measure.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { ObservabilityModule } from '@turystack/nestjs-observability'

ObservabilityModule.register(
  options: ObservabilityModuleOptions | ((config: ConfigService) => ObservabilityModuleOptions),
): DynamicModule`}
					filename="observability-module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the app. The module is global: register it once in the root
					module and inject MetricsService anywhere, no imports needed.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					tabs={[
						{
							code: `import { Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { ObservabilityModule } from '@turystack/nestjs-observability'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  METRICS_NAMESPACE: z.string(),
  NODE_ENV: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    ObservabilityModule.register((config) => ({
      adapter: 'cloudwatch',
      cloudwatch: { namespace: config.get('METRICS_NAMESPACE') },
      defaultDimensions: {
        env: config.get('NODE_ENV'),
        service: 'orders-api',
      },
    })),
  ],
})
export class AppModule {}`,
							label: 'cloudwatch',
						},
						{
							code: `import { Module } from '@nestjs/common'
import { ObservabilityModule } from '@turystack/nestjs-observability'

@Module({
  imports: [
    ObservabilityModule.register({
      adapter: 'local',
      defaultDimensions: { service: 'orders-api' },
    }),
  ],
})
export class AppModule {}`,
							label: 'local',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					ObservabilityModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Notes</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The 'cloudwatch' adapter uses EMF (Embedded Metric Format): each
							metric is ONE bare JSON line written straight to process.stdout —
							never through a logger, which would wrap the line and break EMF
							parsing. CloudWatch Logs extracts the metric from the envelope, so
							emitting costs zero API calls, zero SDK and zero request latency
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Dimension sets: defaultDimensions alone form one set; when a
							metric also carries its own dimensions, a second set combines both
							— so the metric can be queried at either granularity
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The 'local' adapter is for dev/standalone runs: metrics are logged
							through the LoggerService from @turystack/nestjs-logger under the
							'Metrics' context instead of being shipped anywhere
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Custom backends implement IObservabilityAdapter (record(input):
							void — synchronous, never throws) and bind to the
							OBSERVABILITY_ADAPTER token
						</span>
					</li>
				</ul>
				<CodeBlock
					code={`{
  "_aws": {
    "CloudWatchMetrics": [
      {
        "Dimensions": [["env", "service"], ["env", "service", "status"]],
        "Metrics": [{ "Name": "Checkout", "Unit": "Milliseconds" }],
        "Namespace": "MyApp"
      }
    ],
    "Timestamp": 1721400000000
  },
  "env": "production",
  "service": "orders-api",
  "status": "success",
  "Checkout": 412
}`}
					filename="stdout — one EMF line, shown expanded"
					language="json"
				/>
			</div>
		</div>
	)
}
