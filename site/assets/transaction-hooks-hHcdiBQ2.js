import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function r(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Transaction hooks"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Attach work and state to the transaction in flight, without threading the handle through every signature."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The same hooks, a different commit"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The hooks are AsyncLocalStorage, so any engine runs them; what they write against differs."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"On PostgreSQL a before-commit hook writes through the open handle, so a rollback discards it."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"On DynamoDB it appends to the unsent batch, so a throw before the flush sends nothing."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Either way, the hook's write shares the fate of the write that queued it."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"After-commit hooks behave identically on both: they run once the data is durable, and a failure there is reported and swallowed, because it cannot undo a commit that already happened."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import {
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
getCurrentTx(): ResolvedDatabase | undefined`,filename:"transaction-context.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["All of them report ",e.jsx("code",{children:"false"}),"/",e.jsx("code",{children:"undefined"})," outside a transaction, so a caller can fall back to acting immediately instead of guarding first."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"onBeforeCommit"}),e.jsx("p",{className:"text-muted-foreground",children:"Runs on the transaction handle, immediately before the commit. The write lands atomically with everything else the operation did — a rollback discards both."}),e.jsx(t,{code:`@Transactional()
async execute(input: CancelOrderInput) {
  const order = await this.orders.updateById(input.orderId, { status: 'cancelled' })

  onBeforeCommit(async (tx) => {
    await insertAuditRow(tx, toAuditEntry(order))
  })

  return order
}`,filename:"cancel-order.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"A hook that throws fails the transaction: if the audit row cannot be written, the order write does not land either."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"onAfterCommit"}),e.jsx("p",{className:"text-muted-foreground",children:"Runs once the commit succeeded — for effects that need durable data: publishing an event, warming a cache."}),e.jsx(t,{code:`onAfterCommit(() => {
  // Durable now: a consumer that reads the order will find it.
  this.publisher.publish(OrderCancelled, { identifier: order.order_id })
})`,filename:"usage",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"A failure here is reported and swallowed. The data is already committed and the hook cannot undo it, so turning a successful operation into a thrown error would misreport what happened."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"transactionState"}),e.jsx("p",{className:"text-muted-foreground",children:"Scratch space scoped to the transaction, created on first access. Lets a consumer accumulate across an operation and act once."}),e.jsx(t,{code:`const BUFFER = Symbol.for('app.audit.buffer')

const buffer = transactionState(BUFFER, () => {
  const rows = []

  // Registered on first access, so one commit costs one batched insert
  // no matter how many rows the operation produced.
  onBeforeCommit((tx) => insertAll(tx, rows))

  return rows
})

buffer?.push(row)`,filename:"usage",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Instance-level state would be wrong here: two operations run concurrently in the same process and would share the buffer, mixing one transaction's rows into another's."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Ordering"}),e.jsx(t,{code:`operation body
   ↓
before-commit hooks   (on the transaction handle)
   ↓
COMMIT
   ↓
after-commit hooks    (failures reported, never rethrown)`,filename:"lifecycle",language:"bash"})]})]})}export{r as component};
