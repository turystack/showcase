import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-idempotency/idempotency-module',
)({
	component: Page,
})

const options = [
	{
		default: '"idempotency"',
		description: 'Prefix for every stored key.',
		name: 'prefix',
		required: false,
		type: 'string',
	},
	{
		default: '86400',
		description:
			'How long a key is remembered, in seconds. Overridable per operation.',
		name: 'ttl',
		required: false,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					IdempotencyModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Registers idempotency for the whole application.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { IdempotencyModule } from '@turystack/nestjs-idempotency'

IdempotencyModule.register(
  options?:
    | IdempotencyModuleOptions
    | ((config: ConfigService) => IdempotencyModuleOptions),
): DynamicModule`}
					filename="idempotency.module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the app.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					IdempotencyModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Requirements</h2>
				<p className="text-muted-foreground">
					CacheModule provides the storage and LockModule the mutual exclusion
					while an execution is in flight. Both must be registered at the root.
				</p>
				<CodeBlock
					tabs={[
						{
							code: `@Module({
  imports: [
    CacheModule.register({ adapter: 'redis', redis: { url } }),
    LockModule.register(),
    IdempotencyModule.register({ ttl: 604_800 }),
  ],
})
export class AppModule {}`,
							label: 'Static',
						},
						{
							code: `import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  IDEMPOTENCY_TTL: z.coerce.number(),
  REDIS_URL: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    CacheModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
    LockModule.register(),
    IdempotencyModule.register((config) => ({
      ttl: config.get('IDEMPOTENCY_TTL'),
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
				<h2 className="font-display font-semibold text-xl">Picking a TTL</h2>
				<p className="text-muted-foreground">
					The window has to outlive every retry the caller might make. A payment
					gateway that retries a webhook for days needs days; an internal
					request that gives up in a minute does not.
				</p>
			</div>
		</div>
	)
}
