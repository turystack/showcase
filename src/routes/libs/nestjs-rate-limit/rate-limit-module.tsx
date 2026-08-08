import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-rate-limit/rate-limit-module',
)({
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
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					RateLimitModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Dynamic module that registers the RateLimitService, using its own
					Redis connection or the existing CacheModule.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { RateLimitModule } from '@turystack/nestjs-rate-limit'
import { z } from 'zod'

// Preferred: reuse the app-wide connection from CacheModule
// (registrations are global — one connection shared by cache, lock, and rate-limit)
@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
    RateLimitModule.register(),
  ],
})
export class AppModule {}

// Standalone: dedicated connection (only when isolation is intentional)
// register also accepts a plain options object
const configSchema = defineConfigSchema({ REDIS_URL: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    RateLimitModule.register((config) => ({
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
					from DI. When provided, all fields are required.
				</p>
				<PropsTable props={props} />
			</div>
		</div>
	)
}
