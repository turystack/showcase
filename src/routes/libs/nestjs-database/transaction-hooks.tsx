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
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import {
  onAfterCommit,
  onBeforeCommit,
  transactionState,
  type AfterCommitHook,
  type BeforeCommitHook,
} from '@turystack/nestjs-database'

onBeforeCommit(hook: (tx: unknown) => Promise<void> | void): boolean
onAfterCommit(hook: () => Promise<void> | void): boolean
transactionState<T>(key: symbol, create: () => T): T | undefined`}
					filename="transaction-context.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					All three report <code>false</code>/<code>undefined</code> outside a
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
  const order = await this.orders.updateById(input.orderId, { status: 'CANCELLED' })

  onBeforeCommit(async (tx) => {
    await insertOutboxRow(tx, toEvent(order))
  })

  return order
}`}
					filename="cancel-order.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					A hook that throws fails the transaction: nothing commits. That is the
					point — if the event cannot be recorded, the write must not land
					either.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">onAfterCommit</h2>
				<p className="text-muted-foreground">
					Runs once the commit succeeded — for effects that must not happen
					unless the data is durable, and that cannot undo it either: waking a
					dispatcher, warming a cache, notifying.
				</p>
				<CodeBlock
					code={`onAfterCommit(() => {
  // The rows are durable and visible now. Kicking before the commit
  // would find nothing.
  dispatcher.kick()
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
					code={`const BUFFER = Symbol.for('app.outbox.buffer')

const buffer = transactionState(BUFFER, () => {
  const rows = []

  // Registered on first access, so one commit costs one batched insert
  // no matter how many events the operation produced.
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
