import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-config/config-service')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ConfigService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Typed access to the validated environment — get() always returns the
					exact type the schema declares.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { ConfigService } from '@turystack/nestjs-config'

get<K extends keyof ConfigValues & string>(key: K): ConfigValues[K]`}
					filename="config-service.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Values were parsed against the schema at boot, so required variables
					are guaranteed to exist by the time any provider runs. Once the
					ConfigSchemaRegistry is augmented, an unknown key is a compile error.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import { ConfigService } from '@turystack/nestjs-config'

@Injectable()
export class CreateReportUseCase {
  constructor(private readonly config: ConfigService) {}

  async execute() {
    const port = this.config.get('PORT') // number — validated at boot
    const dsn = this.config.get('SENTRY_DSN') // string | null

    if (dsn) {
      this.enableErrorReporting(dsn) // this call site decides what null means
    }
  }
}`}
					filename="create-report.use-case.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					In Module Factories
				</h2>
				<p className="text-muted-foreground">
					Every turystack lib module accepts a (config) =&gt; options factory
					that injects this ConfigService — register the modules once at the
					root and no domain code ever reads process.env:
				</p>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { CacheModule } from '@turystack/nestjs-cache'
import { ConfigModule } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'

import { configSchema } from './config.schema'
import { databaseSchema } from './database.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'postgresql',
      postgresql: { url: config.get('DATABASE_URL') },
      schemaResolver: databaseSchema,
    })),
    CacheModule.register((config) => ({
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
				<h2 className="font-display font-semibold text-xl">Notes</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							There is deliberately no getOrThrow — required variables are
							guaranteed by the boot validation, so get() never needs to throw
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							There is no get(key, default) either — defaults live in the schema
							(.default(...)), not at the call site, so every consumer sees the
							same value
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Optionals are | null by schema design (.nullable().default(null))
							— each call site handles its own null instead of guessing about
							undefined
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Without the registry augmentation, ConfigValues falls back to
							Record&lt;string, unknown&gt; — augment it to get exact types and
							compile errors on typos
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
