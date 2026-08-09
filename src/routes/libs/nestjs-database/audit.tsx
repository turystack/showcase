import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-database/audit')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Audit stamping
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Records who performed a write, without the principal being passed down
					through every signature.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Opting in is declaring the column
				</h2>
				<p className="text-muted-foreground">
					There is no configuration. A table that declares{' '}
					<code>createdBy</code> or <code>updatedBy</code> gets them stamped; a
					table that does not is untouched.
				</p>
				<CodeBlock
					code={`import { defineDatabaseSchema } from '@turystack/nestjs-database'

export const databaseSchema = defineDatabaseSchema((schema) => ({
  // stamped
  orders: schema.table({
    id: schema.uuid('id').primaryKey(),
    status: schema.text('status').notNull(),
    createdBy: schema.text('created_by'),  // filled on create / createMany
    updatedBy: schema.text('updated_by'),  // filled on update / updateById
  }),

  // not stamped — nothing changes
  countries: schema.table({
    id: schema.uuid('id').primaryKey(),
    name: schema.text('name').notNull(),
  }),
}))`}
					filename="database.schema.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Only these two columns are supported. Anything else — a{' '}
					<code>deletedBy</code>, a reason, a source — is domain data and is
					passed explicitly from the edge, like any other field.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Where the value comes from
				</h2>
				<CodeBlock
					code={`AuthGuard verifies the JWT
      ↓
publishes the profile into the operation's context   (@turystack/nestjs-iam)
      ↓
createdBy / updatedBy = context.actor.id             (this package)`}
					filename="chain"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					This package never imports @turystack/nestjs-context: it exposes{' '}
					<code>registerAuditActor</code> and the context package pushes the
					reader in. A direct dependency either way would be a cycle.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Overriding a single write
				</h2>
				<p className="text-muted-foreground">
					An explicit value always wins — the caller is more specific than the
					ambient one.
				</p>
				<CodeBlock
					code={`// stamped with the authenticated actor
await this.db.orders.create({ status: 'NEW' })

// stamped with what you passed
await this.db.orders.create({ status: 'NEW', createdBy: 'system' })`}
					filename="orders.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					When nothing is stamped
				</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>The table does not declare the column</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The operation is unauthenticated — a scheduled job, a migration, a
							public endpoint
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@turystack/nestjs-context is not registered in the application
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The write is an <code>upsert</code> — it lands as an insert or an
							update depending on the conflict, so neither column is stamped
						</span>
					</li>
				</ul>
				<p className="text-muted-foreground text-sm">
					In each of these the write proceeds normally; the column is simply
					left alone.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					registerAuditActor
				</h2>
				<p className="text-muted-foreground">
					The seam, for an application that resolves the principal some other
					way.
				</p>
				<CodeBlock
					code={`import { registerAuditActor } from '@turystack/nestjs-database'

registerAuditActor(() => myOwnRequestScope()?.userId)`}
					filename="bootstrap.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
