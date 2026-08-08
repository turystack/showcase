import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-serverless/serverless-module',
)({
	component: Page,
})

const options = [
	{
		description: 'The serverless adapter to use.',
		name: 'adapter',
		required: true,
		type: "'aws'",
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ServerlessModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A NestJS DynamicModule that registers the serverless adapter and
					handler discovery service.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { ServerlessModule } from '@turystack/nestjs-serverless'

ServerlessModule.register(
  options: ServerlessModuleOptions | ((config: ConfigService) => ServerlessModuleOptions),
): DynamicModule`}
					filename="serverless-module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the module.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					tabs={[
						{
							code: `import { ServerlessModule } from '@turystack/nestjs-serverless'

@Module({
  imports: [ServerlessModule.register({ adapter: 'aws' })],
  providers: [OrderHandler],
})
class AppModule {}`,
							label: 'Static',
						},
						{
							code: `import { ServerlessModule } from '@turystack/nestjs-serverless'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  SERVERLESS_ADAPTER: z.enum(['aws']),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    ServerlessModule.register((config) => ({
      adapter: config.get('SERVERLESS_ADAPTER'),
    })),
  ],
  providers: [OrderHandler],
})
class AppModule {}`,
							label: 'From config',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					ServerlessModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>
		</div>
	)
}
