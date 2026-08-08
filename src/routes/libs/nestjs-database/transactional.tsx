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
					code={`import { Injectable } from '@nestjs/common'
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
}`}
					filename="transfer.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					With Isolation Level
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
				<h2 className="font-display font-semibold text-xl">Isolation Levels</h2>
				<PropsTable props={isolationLevels} />
			</div>
		</div>
	)
}
