import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-scheduler/schedule-decorator',
)({
	component: Page,
})

const scheduleOptionsProps = [
	{
		description:
			'Runs each tick inside a distributed lock from @turystack/nestjs-lock (optional peer). When the lock is already held by another instance, the tick is skipped silently. Defaults to false.',
		name: 'lock',
		required: false,
		type: 'boolean',
	},
	{
		description:
			'Job name — the log identifier and the lock key (schedule:<name>). Defaults to the class name.',
		name: 'name',
		required: false,
		type: 'string',
	},
	{
		description:
			"IANA timezone for the cron expression (e.g. America/Sao_Paulo). Passed through to the adapter's cron.",
		name: 'timezone',
		required: false,
		type: 'string',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Schedule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Class decorator that registers the class as a scheduled cron job — a
					class with an <code>execute()</code> method, the same shape as
					@Handler and @Subscriber.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Schedule, type ScheduleOptions, type IScheduledJob } from '@turystack/nestjs-scheduler'

@Schedule(cronExpression: string, options?: ScheduleOptions)

interface IScheduledJob {
  execute(): Promise<unknown> | unknown
}`}
					filename="schedule.decorator.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Automatically applies @Injectable(). The class must implement
					IScheduledJob — a missing execute() is a compile error at the
					decorator.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { Schedule, SchedulerModule } from '@turystack/nestjs-scheduler'

@Schedule('*/5 * * * *') // every 5 minutes
export class SyncPricesJob {
  async execute() {}
}

@Schedule('0 3 * * *', { timezone: 'America/Sao_Paulo' }) // daily at 03:00
export class RebuildRankingJob {
  constructor(private readonly rankings: RankingService) {}

  async execute() {
    await this.rankings.rebuild()
  }
}

@Schedule('0 0 * * 1', { lock: true, name: 'weekly-report' }) // Mondays at 00:00
export class WeeklyReportJob {
  async execute() {}
}

@Module({
  imports: [SchedulerModule.register({ adapter: 'local' })],
  providers: [SyncPricesJob, RebuildRankingJob, WeeklyReportJob],
})
export class AppModule {}`}
					filename="jobs.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">ScheduleOptions</h2>
				<PropsTable props={scheduleOptionsProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Distributed lock</h2>
				<p className="text-muted-foreground">
					With <code>lock: true</code>, each tick acquires the lock{' '}
					<code>{'schedule:<name>'}</code> from @turystack/nestjs-lock with a
					single quick attempt: the losing instance skips the tick silently
					instead of queueing, so N instances never run the same tick twice. It
					needs @turystack/nestjs-lock installed and LockModule registered — if
					any job declares lock: true and no LockService is available, bootstrap
					fails with a clear error.
				</p>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { LockModule } from '@turystack/nestjs-lock'
import { Schedule, SchedulerModule } from '@turystack/nestjs-scheduler'

@Schedule('0 3 * * *', { lock: true })
export class SettleInvoicesJob {
  async execute() {}
}

@Module({
  imports: [
    SchedulerModule.register({ adapter: 'local' }),
    LockModule.register(),
  ],
  providers: [SettleInvoicesJob],
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
							The class must be provided in a module's providers — a missing
							provider is a clear bootstrap error
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Jobs start on application bootstrap and stop on shutdown; a
							failing tick is logged, never thrown — a broken job cannot crash
							the app
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Where the cron lives is a deployment decision — standalone
							backends use @Schedule with the 'local' adapter; in monorepos the
							same execute() body becomes @Handler('SCHEDULE') from
							@turystack/nestjs-serverless, with the cron in the infrastructure
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
