import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-lock/lock-module')({
	component: Page,
})

const props = [
	{
		description: 'The cache adapter to use.',
		name: 'adapter',
		required: true,
		type: "'redis'",
	},
	{
		description: 'Redis connection URL.',
		name: 'redis.url',
		required: true,
		type: 'string',
	},
	{
		default: '"fail-open"',
		description:
			'Behaviour when the storage is unavailable, passed through to the CacheModule this registers. Under fail-open a failed write reports false, so an outage denies the lock instead of granting it.',
		name: 'onError',
		required: false,
		type: "'fail-open' | 'fail-closed'",
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					LockModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Dynamic module that registers the LockService, using its own Redis
					connection or the existing CacheModule.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { CacheModule } from '@turystack/nestjs-cache'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { LockModule } from '@turystack/nestjs-lock'
import { z } from 'zod'

const configSchema = defineConfigSchema({ REDIS_URL: z.string() })

// Preferred: reuse the app-wide connection from CacheModule
// (registrations are global — one connection shared by cache, lock, and rate-limit)
@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    CacheModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
    LockModule.register(),
  ],
})
export class AppModule {}

// Standalone: dedicated connection (only when isolation is intentional)
// register also accepts a plain options object
@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    LockModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Options</h2>
				<p className="text-muted-foreground">
					The entire <code className="text-sm">options</code> object is
					optional. When omitted, the module reuses the existing CacheModule
					from DI. When provided, it mirrors CacheModuleOptions — adapter and
					redis.url are required.
				</p>
				<PropsTable props={props} />
			</div>
		</div>
	)
}
