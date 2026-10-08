import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-database/transactional')({
	component: Page,
})

const isolationLevels = [
	{
		description: 'Allows dirty reads. Fastest but least safe.',
		name: 'read uncommitted',
		type: 'IsolationLevel',
	},
	{
		description: 'Default PostgreSQL level. Prevents dirty reads.',
		name: 'read committed',
		type: 'IsolationLevel',
	},
	{
		description: 'Prevents non-repeatable reads.',
		name: 'repeatable read',
		type: 'IsolationLevel',
	},
	{
		description:
			'Strictest level. Transactions execute as if they were serial.',
		name: 'serializable',
		type: 'IsolationLevel',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Transactional
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Method decorator that runs the whole call tree in one transaction.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`Transactional(isolationLevel?: IsolationLevel): MethodDecorator`}
					filename="transactional.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					filename="transfer.service.ts"
					language="ts"
					tabs={[
						{
							code: `import { Injectable } from '@nestjs/common'
import {
  DatabaseService,
  Transactional,
} from '@turystack/nestjs-database'

@Injectable()
export class TransferService {
  constructor(private readonly db: DatabaseService) {}

  @Transactional()
  async transfer(fromId: string, toId: string, amount: number) {
    const from = await this.db.accounts.findById(fromId)
    const to = await this.db.accounts.findById(toId)

    await this.db.accounts.updateById(fromId, {
      balance: from.balance - amount,
    })

    await this.db.accounts.updateById(toId, {
      balance: to.balance + amount,
    })
  }
}`,
							label: 'PostgreSQL',
						},
						{
							code: `import { Injectable } from '@nestjs/common'
import {
  DatabaseService,
  Transactional,
} from '@turystack/nestjs-database'

@Injectable()
export class LedgerService {
  constructor(private readonly db: DatabaseService) {}

  // The writes are buffered and sent as one TransactWriteItems before this
  // returns. A throw before the flush sends nothing at all.
  @Transactional()
  async record(userId: string, entries: LedgerEntry[]) {
    for (const entry of entries) {
      await this.db.ledger.create({ user_id: userId, ...entry })
    }
  }
}`,
							label: 'DynamoDB',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The decorator is the same; what a transaction <em>is</em> belongs to
					the engine. PostgreSQL holds a handle open and every call writes
					through it. DynamoDB has no handle: the writes are collected and sent
					as one atomic batch, so three things are refused rather than
					approximated — a read inside the operation does not see the buffered
					writes (updateById and deleteById throw there), over 100 writes fails
					instead of splitting, and an isolation level throws because this
					engine has none.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					With Isolation Level
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<CodeBlock
					code={`@Transactional('serializable')
async criticalUpdate(id: string, data: UpdateInput) {
  await this.db.users.updateById(id, data)
}`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Nested Transactions
				</h2>
				<p className="text-muted-foreground">
					If a <code className="text-lib">Transactional</code> method calls
					another <code className="text-lib">Transactional</code> method, the
					inner method reuses the existing transaction instead of creating a new
					one.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Isolation Levels
					<span className="ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs">
						PostgreSQL only
					</span>
				</h2>
				<p className="text-muted-foreground text-sm">
					DynamoDB has none, so passing one throws at the call rather than being
					ignored. A silently different behaviour between two engines is the
					failure nobody finds until production.
				</p>
				<PropsTable props={isolationLevels} />
			</div>
		</div>
	)
}
