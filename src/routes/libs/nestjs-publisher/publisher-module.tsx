import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-publisher/publisher-module')(
	{
		component: Page,
	},
)

const options = [
	{
		description:
			'Remote transport (aws) or in-process delivery to @Subscriber classes (event-emitter, for standalone apps).',
		name: 'adapter',
		required: true,
		type: "'aws' | 'event-emitter'",
	},
	{
		description: 'The AWS region (aws adapter only).',
		name: 'aws.region',
		required: true,
		type: 'string',
	},
	{
		description:
			"Event bus name or ARN for TOPIC publishes. Defaults to 'default'.",
		name: 'aws.eventBridge.busName',
		required: false,
		type: 'string',
	},
	{
		description:
			"Source field of emitted EventBridge events. Defaults to 'app'.",
		name: 'aws.eventBridge.source',
		required: false,
		type: 'string',
	},
	{
		description:
			'The AWS access key ID. aws.credentials is optional, but required once the object is provided.',
		name: 'aws.credentials.accessKeyId',
		required: false,
		type: 'string',
	},
	{
		description:
			'The AWS secret access key. aws.credentials is optional, but required once the object is provided.',
		name: 'aws.credentials.secretAccessKey',
		required: false,
		type: 'string',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					PublisherModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A NestJS DynamicModule that registers the publisher service and its
					transport adapter. AWS EventBridge/SQS built-in.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { PublisherModule } from '@turystack/nestjs-publisher'

PublisherModule.register(
  options: PublisherModuleOptions | ((config: ConfigService) => PublisherModuleOptions),
): DynamicModule`}
					filename="publisher-module.d.ts"
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
					code={`import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { PublisherModule } from '@turystack/nestjs-publisher'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  AWS_REGION: z.string(),
  EVENT_BUS_NAME: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    PublisherModule.register((config) => ({
      adapter: 'aws',
      aws: {
        region: config.get('AWS_REGION'),
        eventBridge: {
          busName: config.get('EVENT_BUS_NAME'), // defaults to 'default'
          source: 'orders-api', // defaults to 'app'
        },
      },
    })),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					PublisherModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>
		</div>
	)
}
