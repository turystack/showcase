import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-scheduler/scheduler-module')(
	{
		component: Page,
	},
)

const options = [
	{
		description: 'The scheduler adapter to use.',
		name: 'adapter',
		required: true,
		type: "'local'",
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					SchedulerModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A global DynamicModule that resolves every @Schedule class from DI on
					bootstrap, starts the cron jobs and stops them on shutdown.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { SchedulerModule } from '@turystack/nestjs-scheduler'

SchedulerModule.register(
  options: SchedulerModuleOptions | ((config: ConfigService) => SchedulerModuleOptions),
): DynamicModule`}
					filename="scheduler-module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Registration is global — register it once in the root module. The
					factory form injects the ConfigService from @turystack/nestjs-config
					at boot — requires ConfigModule.register({'{'} schema {'}'}) in the
					app.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { Schedule, SchedulerModule } from '@turystack/nestjs-scheduler'

@Schedule('0 3 * * *')
class RebuildRankingJob {
  constructor(private readonly rankings: RankingService) {}

  async execute() {
    await this.rankings.rebuild()
  }
}

@Module({
  imports: [SchedulerModule.register({ adapter: 'local' })],
  providers: [RebuildRankingJob],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
				<CodeBlock
					code={`import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { SchedulerModule } from '@turystack/nestjs-scheduler'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  SCHEDULER_ADAPTER: z.enum(['local']).default('local'),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    SchedulerModule.register((config) => ({
      adapter: config.get('SCHEDULER_ADAPTER'),
    })),
  ],
})
export class AppModule {}`}
					filename="app.module.factory.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					SchedulerModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Custom adapters</h2>
				<p className="text-muted-foreground">
					Scheduling is abstracted behind <code>ISchedulerAdapter</code> —{' '}
					<code>register</code> receives each job plus its metadata,{' '}
					<code>start</code> and <code>stop</code> drive the lifecycle. The
					orchestrator only ever talks to this interface, resolved through the{' '}
					<code>SCHEDULER_ADAPTER</code> token the module exports. Today{' '}
					<code>register</code> ships one implementation,{' '}
					<code>adapter: 'local'</code>; a new backend is a new value of that
					option, not a provider a consumer overrides.
				</p>
				<CodeBlock
					code={`type ScheduleMetadata = {
  cron: string
  lock: boolean
  name: string
  timezone?: string
}

type RegisteredJob = {
  execute: () => Promise<unknown> | unknown
  metadata: ScheduleMetadata
}

interface ISchedulerAdapter {
  register(job: RegisteredJob): void // once per @Schedule class at bootstrap
  start(): void // once after registration
  stop(): Promise<void> | void // on application shutdown
}`}
					filename="scheduler.adapter.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Notes</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Every @Schedule class must be provided in a module — a missing
							provider is a clear bootstrap error
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							On bootstrap each class is resolved from DI, registered with the
							adapter and started; on shutdown all jobs are stopped
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A failing tick is logged, never thrown — a broken job cannot crash
							the app
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							If any job declares lock: true and no LockService from
							@turystack/nestjs-lock is registered, bootstrap fails with a clear
							error
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The 'local' adapter runs the cron in-process (built on the cron
							package) — for monorepos the same class becomes a serverless
							handler with @Handler('SCHEDULE') from
							@turystack/nestjs-serverless
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
