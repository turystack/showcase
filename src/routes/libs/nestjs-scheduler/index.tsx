import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-scheduler/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-scheduler
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Declare cron jobs as classes. Local (in-process) adapter built-in.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'pnpm add @turystack/nestjs-scheduler cron',
							label: 'pnpm',
						},
						{
							code: 'npm install @turystack/nestjs-scheduler cron',
							label: 'npm',
						},
						{
							code: 'yarn add @turystack/nestjs-scheduler cron',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-scheduler cron',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import {
  Schedule,
  SchedulerModule,
} from '@turystack/nestjs-scheduler'

@Schedule('0 3 * * *', { lock: true })
export class SettleInvoicesJob {
  constructor(private readonly invoices: InvoiceService) {}

  async execute() {
    await this.invoices.settlePending()
  }
}

@Module({
  imports: [SchedulerModule.register({ adapter: 'local' })],
  providers: [SettleInvoicesJob],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@Schedule(cron, {'{'} name?, timezone?, lock? {'}'}) — class
							decorator + execute(), the same shape as @Handler and @Subscriber
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Jobs start on application bootstrap and stop on shutdown; a
							failing tick is logged, never crashes the app
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							lock: true uses @turystack/nestjs-lock (optional peer) so N API
							instances never run the same tick twice — the losing instance
							skips silently
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Backends sit behind ISchedulerAdapter, resolved through the
							SCHEDULER_ADAPTER token — 'local' is the one that ships
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
