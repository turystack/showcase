import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-logger/logger-module')({
	component: Page,
})

const options = [
	{
		description: 'The logger adapter to use.',
		name: 'adapter',
		required: true,
		type: "'elasticsearch'",
	},
	{
		description: 'The Elasticsearch node URL.',
		name: 'elasticsearch.node',
		required: false,
		type: 'string',
	},
	{
		description: 'The Elasticsearch Cloud ID.',
		name: 'elasticsearch.cloudId',
		required: false,
		type: 'string',
	},
	{
		description: 'The Elasticsearch username.',
		name: 'elasticsearch.username',
		required: false,
		type: 'string',
	},
	{
		description: 'The Elasticsearch password.',
		name: 'elasticsearch.password',
		required: false,
		type: 'string',
	},
	{
		description:
			'The Elasticsearch API key. Takes precedence over username/password.',
		name: 'elasticsearch.apiKey',
		required: false,
		type: 'string',
	},
	{
		description: 'The minimum log level.',
		name: 'level',
		required: false,
		type: "'debug' | 'info' | 'warn' | 'error'",
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					LoggerModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A NestJS DynamicModule that registers the logger service and its
					Elasticsearch connection.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { LoggerModule } from '@turystack/nestjs-logger'

LoggerModule.register(
  options: LoggerModuleOptions | ((config: ConfigService) => LoggerModuleOptions),
): DynamicModule`}
					filename="logger-module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the app.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					tabs={[
						{
							code: `import { LoggerModule } from '@turystack/nestjs-logger'

@Module({
  imports: [
    LoggerModule.register({
      adapter: 'elasticsearch',
      elasticsearch: { node: 'http://localhost:9200' },
    }),
  ],
})
export class AppModule {}`,
							label: 'Static',
						},
						{
							code: `import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { LoggerModule } from '@turystack/nestjs-logger'
import { z } from 'zod'

const configSchema = defineConfigSchema({ ELASTICSEARCH_NODE: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    LoggerModule.register((config) => ({
      adapter: 'elasticsearch',
      elasticsearch: { node: config.get('ELASTICSEARCH_NODE') },
    })),
  ],
})
export class AppModule {}`,
							label: 'From config',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					LoggerModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>
		</div>
	)
}
