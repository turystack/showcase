import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-publisher/outbox')({
	component: Page,
})

const options = [
	{
		description:
			'worker runs the drain loop in-process; inline skips the loop for serverless, where the post-commit dispatch is awaited by flush(). Declared, never detected — guessing the runtime fails silently.',
		name: 'mode',
		required: true,
		type: "'worker' | 'inline'",
	},
	{
		description: 'Where rows live. Use createDrizzleOutboxStore for Postgres.',
		name: 'store',
		required: true,
		type: 'IOutboxStore',
	},
	{
		default: '500',
		description: 'Rows claimed per round.',
		name: 'batchSize',
		required: false,
		type: 'number',
	},
	{
		default: '15000',
		description:
			'How long the loop sleeps when the backlog is empty, in milliseconds. A recovery window, not the delivery latency.',
		name: 'idleInterval',
		required: false,
		type: 'number',
	},
	{
		default: '10',
		description:
			'Attempts before a row is given up on. Without a ceiling, a row that always fails blocks every round behind it.',
		name: 'maxAttempts',
		required: false,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Transactional Outbox
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Makes an event and the write that produced it commit together, or not
					at all.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The problem it removes
				</h2>
				<p className="text-muted-foreground">
					Publishing inside a transaction is a race: the transport call can
					succeed and the transaction then roll back, announcing a fact that
					never happened. Publishing after the commit is the mirror race — the
					process can die between the two, and the fact happens silently.
				</p>
				<CodeBlock
					code={`Use Case  @Transactional
  ├── update entity          ─┐
  └── publish() → buffered    │ same transaction
              ↓               │
       insert outbox         ─┘
              ↓
           COMMIT            ← atomic: row and event, or neither
              ↓
   post-commit kick → dispatcher drains → EventBridge / SQS`}
					filename="flow"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Setup</h2>
				<CodeBlock
					code={`import { PublisherModule } from '@turystack/nestjs-publisher'
import {
  createDrizzleOutboxStore,
  createOutboxTable,
} from '@turystack/nestjs-publisher/drizzle'

export const outbox = createOutboxTable()

@Module({
  imports: [
    PublisherModule.register(
      { adapter: 'aws', aws: { region: 'us-east-1' } },
      {
        mode: 'worker',
        store: createDrizzleOutboxStore({ db: () => db, table: outbox }),
      },
    ),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Domain code does not change: <code>publish()</code> stays
					fire-and-forget and never learns the outbox exists. The guarantee is
					infrastructure configuration, not a decision the use-case makes.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">OutboxOptions</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The table is shipped, not yours to write
				</h2>
				<p className="text-muted-foreground">
					<code>createOutboxTable()</code> returns the drizzle table the store
					reads by name. Mount it in your schema and generate the migration from
					it. The partial index is <strong>not optional</strong> — without it
					every claim scans the whole table.
				</p>
				<CodeBlock
					code={`CREATE INDEX outbox_ready_idx ON outbox (available_at, id)
WHERE attempts < 10;`}
					filename="migration.sql"
					language="sql"
				/>
				<p className="text-muted-foreground text-sm">
					The index only contains the backlog, so it shrinks as rows drain — and
					a row that exhausted its attempts leaves it on its own, with no status
					column and no cleanup job.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Claiming without a distributed lock
				</h2>
				<CodeBlock
					code={`DELETE FROM outbox
WHERE id IN (
  SELECT id FROM outbox
  WHERE available_at <= now() AND attempts < 10
  ORDER BY available_at, id
  LIMIT $batchSize
  FOR UPDATE SKIP LOCKED
)
RETURNING ...`}
					filename="claim"
					language="sql"
				/>
				<p className="text-muted-foreground text-sm">
					<code>SKIP LOCKED</code> lets several dispatchers take disjoint
					batches — the database resolves the exclusion, so throughput scales
					with the fleet. Claiming removes the row: a failed delivery puts it
					back with its attempt count raised. That costs a write on the rare
					path and avoids an intermediate state that would need a reaper for
					rows orphaned by a dead worker.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Latency comes from the kick, not the sweep
				</h2>
				<CodeBlock
					code={`commit → kick → drains immediately          milliseconds
                 ↓
        idleInterval (15s) catches what a
        crashed process missed              ← recovery window`}
					filename="timing"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Setting <code>idleInterval</code> to one second in the belief that it
					controls delivery latency costs fifteen times the sweeping for
					nothing. It answers a different question: how long an orphaned event
					waits when a pod dies between the commit and the dispatch.
				</p>
				<p className="text-muted-foreground text-sm">
					The kick is coalesced. A fan-out committing a million rows produces a
					million kicks; at most one pass runs at a time, and the whole burst
					schedules exactly one more.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Serverless: mode inline
				</h2>
				<p className="text-muted-foreground">
					A continuous loop is wrong in a lambda — the process freezes after the
					response and the loop dies mid-batch. The fast path comes free
					instead: the post-commit dispatch is registered as a pending delivery,
					and the <code>flush()</code> the serverless wrapper already calls
					awaits it.
				</p>
				<p className="text-muted-foreground">
					The safety net cannot be automatic there: it needs its own lambda and
					its own schedule, which are infrastructure decisions. The library
					ships <code>drain()</code> bounded by time; the app declares the
					trigger.
				</p>
				<CodeBlock
					code={`@Handler('SCHEDULE')
export class OutboxDispatcherHandler {
  constructor(private readonly dispatcher: OutboxDispatcher) {}

  execute() {
    return this.dispatcher.drain({ maxDuration: 50_000 })
  }
}`}
					filename="outbox-dispatcher.handler.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What it guarantees, and what it does not
				</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							No event survives a rollback, and no committed write loses its
							event
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Delivery is <strong>at-least-once</strong>: the dispatcher can
							publish and die before recording it
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							No ordering — SQS Standard and EventBridge do not provide it, with
							or without the outbox
						</span>
					</li>
				</ul>
				<p className="text-muted-foreground text-sm">
					Consumers therefore have to be idempotent <em>and</em> tolerant of
					reordering. @turystack/nestjs-idempotency is not optional alongside
					the outbox — it is the other half of the contract.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Metrics to watch</h2>
				<CodeBlock
					code={`outbox.pending       backlog size
outbox.oldest_age    ← the signal that matters
outbox.published     throughput
outbox.requeued      broker health
outbox.dead          rows that exhausted their attempts`}
					filename="signals"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Alert on <code>oldest_age</code> growing monotonically, not on
					individual failures: it is the one that says production is outrunning
					the dispatcher.
				</p>
			</div>
		</div>
	)
}
