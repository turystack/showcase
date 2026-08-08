import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-database/types-and-errors')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Types & Errors
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Exported utility types and the repository errors.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					RecordNotFoundError
				</h2>
				<p className="text-muted-foreground">
					Thrown by <code className="text-lib">updateById</code> and{' '}
					<code className="text-lib">deleteById</code> when the record does not
					exist.
				</p>
				<CodeBlock
					code={`import { RecordNotFoundError } from '@turystack/nestjs-database'

try {
  await this.db.users.deleteById(id)
} catch (error) {
  if (error instanceof RecordNotFoundError) {
    throw new NotFoundException(error.message)
  }
  throw error
}`}
					filename="users.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					RecordNotCreatedError
				</h2>
				<p className="text-muted-foreground">
					Thrown by <code className="text-lib">create</code> and{' '}
					<code className="text-lib">upsert</code> when the insert returns no
					rows.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">WhereCallback</h2>
				<p className="text-muted-foreground">
					The where parameter accepts a callback with typed column fields and
					Drizzle SQL operators:
				</p>
				<CodeBlock
					code={`type WhereCallback<TTable> = (
  fields: TableColumns<TTable>,
  operators: WhereOperators,
) => SQL | undefined`}
					filename="types.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">Available operators:</p>
				<CodeBlock
					code={`eq, ne, gt, gte, lt, lte,
and, or, not,
inArray, notInArray,
isNull, isNotNull,
exists, notExists,
between, notBetween,
like, notLike, ilike, notIlike,
sql`}
					filename="operators.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					InferDatabaseConfig
				</h2>
				<p className="text-muted-foreground">
					Convenience type for augmenting{' '}
					<code className="text-lib">DatabaseServiceRegistry</code> to get fully
					typed repositories:
				</p>
				<CodeBlock
					code={`import type { InferDatabaseConfig } from '@turystack/nestjs-database'

declare module '@turystack/nestjs-database' {
  interface DatabaseServiceRegistry
    extends InferDatabaseConfig<
      ReturnType<typeof databaseSchema>,
      ReturnType<typeof databaseRelations>
    > {}
}`}
					filename="database.schema.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Utility Types</h2>
				<CodeBlock
					code={`CreateInput<TTable>
UpdateInput<TTable>
PrimaryKeyInput<TTable>
ReturningColumns<TTable>
InferReturning<TTable, TReturning>
FindByIdOptions<TTable>
CreateOptions<TTable>
UpdateOptions<TTable>
UpdateByIdOptions<TTable>
DeleteOptions<TTable>
CountOptions<TTable>
ExistsOptions<TTable>
UpsertOptions<TTable>`}
					filename="types.d.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
