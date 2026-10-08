import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-database/transaction-hooks')(
	{
		component: Page,
	},
)

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Transaction hooks
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Attach work and state to the transaction in flight, without threading
					the handle through every signature.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The same hooks, a different commit
				</h2>
				<p className="text-muted-foreground text-sm">
					The hooks are AsyncLocalStorage, so any engine runs them; what they
					write against differs.
				</p>
				<p className="text-muted-foreground text-sm">
					On PostgreSQL a before-commit hook writes through the open handle, so
					a rollback discards it.
				</p>
				<p className="text-muted-foreground text-sm">
					On DynamoDB it appends to the unsent batch, so a throw before the
					flush sends nothing.
				</p>
				<p className="text-muted-foreground text-sm">
					Either way, the hook's write shares the fate of the write that queued
					it.
				</p>
				<p className="text-muted-foreground text-sm">
					After-commit hooks behave identically on both: they run once the data
					is durable, and a failure there is reported and swallowed, because it
					cannot undo a commit that already happened.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import {
  getCurrentTx,
  onAfterCommit,
  onBeforeCommit,
  transactionState,
  type AfterCommitHook,
  type BeforeCommitHook,
} from '@turystack/nestjs-database'

// BeforeCommitHook — receives the transaction handle in flight
onBeforeCommit(hook: (tx: ResolvedDatabase) => Promise<void> | void): boolean

// AfterCommitHook — takes nothing; the transaction is already gone
onAfterCommit(hook: () => Promise<void> | void): boolean

transactionState<T>(key: symbol, create: () => T): T | undefined
getCurrentTx(): ResolvedDatabase | undefined`}
					filename="transaction-context.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					All of them report <code>false</code>/<code>undefined</code> outside a
					transaction, so a caller can fall back to acting immediately instead
					of guarding first.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">onBeforeCommit</h2>
				<p className="text-muted-foreground">
					Runs on the transaction handle, immediately before the commit. The
					write lands atomically with everything else the operation did — a
					rollback discards both.
				</p>
				<CodeBlock
					code={`@Transactional()
async execute(input: CancelOrderInput) {
  const order = await this.orders.updateById(input.orderId, { status: 'cancelled' })

  onBeforeCommit(async (tx) => {
    await insertAuditRow(tx, toAuditEntry(order))
  })

  return order
}`}
					filename="cancel-order.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					A hook that throws fails the transaction: if the audit row cannot be
					written, the order write does not land either.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">onAfterCommit</h2>
				<p className="text-muted-foreground">
					Runs once the commit succeeded — for effects that need durable data:
					publishing an event, warming a cache.
				</p>
				<CodeBlock
					code={`onAfterCommit(() => {
  // Durable now: a consumer that reads the order will find it.
  this.publisher.publish(OrderCancelled, { identifier: order.order_id })
})`}
					filename="usage"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					A failure here is reported and swallowed. The data is already
					committed and the hook cannot undo it, so turning a successful
					operation into a thrown error would misreport what happened.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">transactionState</h2>
				<p className="text-muted-foreground">
					Scratch space scoped to the transaction, created on first access. Lets
					a consumer accumulate across an operation and act once.
				</p>
				<CodeBlock
					code={`const BUFFER = Symbol.for('app.audit.buffer')

const buffer = transactionState(BUFFER, () => {
  const rows = []

  // Registered on first access, so one commit costs one batched insert
  // no matter how many rows the operation produced.
  onBeforeCommit((tx) => insertAll(tx, rows))

  return rows
})

buffer?.push(row)`}
					filename="usage"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Instance-level state would be wrong here: two operations run
					concurrently in the same process and would share the buffer, mixing
					one transaction's rows into another's.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Ordering</h2>
				<CodeBlock
					code={`operation body
   ↓
before-commit hooks   (on the transaction handle)
   ↓
COMMIT
   ↓
after-commit hooks    (failures reported, never rethrown)`}
					filename="lifecycle"
					language="bash"
				/>
			</div>
		</div>
	)
}
