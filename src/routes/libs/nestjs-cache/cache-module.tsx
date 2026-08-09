import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-cache/cache-module')({
	component: Page,
})

const options = [
	{
		description: 'The cache adapter to use.',
		name: 'adapter',
		required: true,
		type: "'redis'",
	},
	{
		description: 'The Redis connection URL.',
		name: 'redis.url',
		required: true,
		type: 'string',
	},
	{
		default: '"fail-open"',
		description:
			'Behaviour when the storage is unavailable. fail-open degrades keys, get, exists, set and del to a cache miss; fail-closed propagates every failure. incr and decr always propagate, on both settings.',
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
					CacheModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A NestJS DynamicModule that registers the cache service and its Redis
					connection.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { CacheModule } from '@turystack/nestjs-cache'

CacheModule.register(
  options: CacheModuleOptions | ((config: ConfigService) => CacheModuleOptions),
): DynamicModule`}
					filename="cache-module.d.ts"
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
							code: `import { CacheModule } from '@turystack/nestjs-cache'

@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
  ],
})
export class AppModule {}`,
							label: 'Static',
						},
						{
							code: `import { CacheModule } from '@turystack/nestjs-cache'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({ REDIS_URL: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    CacheModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
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
					CacheModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Behaviour when the storage is down
				</h2>
				<p className="text-muted-foreground">
					Under the default <code>fail-open</code>, a Redis outage degrades the
					cache instead of taking the route down with it. The fallback is chosen
					per operation, because the same call means different things to
					different callers.
				</p>
				<CodeBlock
					code={`keys, get, exists   →  served as a miss ([], null, false)
del                 →  reports 0 keys removed
set                 →  reports false — not written
incr, decr          →  always throws, even under fail-open`}
					filename="fallbacks"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					<code>set</code> reporting <code>false</code> is what keeps{' '}
					@turystack/nestjs-lock safe: it reads that return as "lock acquired",
					so an outage denies the lock instead of granting it to every instance
					at once.
				</p>
				<p className="text-muted-foreground text-sm">
					<code>incr</code> and <code>decr</code> are excluded on purpose. They
					back the counters of @turystack/nestjs-rate-limit, and a silent
					fallback there would stop enforcing a limit rather than degrade a
					cache — an availability setting must not turn into a security hole.
				</p>
			</div>
		</div>
	)
}
