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
					The repository errors, the registry contract, and what the package
					deliberately does not let you name.
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
				<h2 className="font-display font-semibold text-xl">
					The where callback
				</h2>
				<p className="text-muted-foreground">
					The where parameter takes a callback with typed column fields and
					Drizzle SQL operators. Its type is inferred at the call site and is
					not exported — writing a signature against it would couple your code
					to how this package models a predicate today:
				</p>
				<CodeBlock
					filename="conditions.d.ts"
					language="ts"
					tabs={[
						{
							code: `type WhereCallback<TTable> = (
  fields: TableColumns<TTable>,
  operators: WhereOperators,
) => SQL | undefined`,
							label: 'PostgreSQL',
						},
						{
							code: `// DynamoDB has no where callback: a read walks a key path, and the
// only condition it takes is on the sort key.
type SortCondition =
  | { beginsWith: string }
  | { between: [number | string, number | string] }
  | { eq: number | string }
  | { gt: number | string }
  | { gte: number | string }
  | { lt: number | string }
  | { lte: number | string }

await this.db.orders.query({
  partition: userId,
  sort: { beginsWith: 'paid#' },
})`,
							label: 'DynamoDB',
						},
					]}
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
				<p className="text-muted-foreground text-sm">
					The DynamoDB counterpart is{' '}
					<code className="text-lib">InferDynamoDatabaseConfig</code>, which
					carries only <code className="text-lib">schema</code>: that engine's
					registry exposes no <code className="text-lib">raw</code>, because its
					client is a command bus rather than a query builder.
				</p>
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
				<h2 className="font-display font-semibold text-xl">
					What is not exported
				</h2>
				<p className="text-muted-foreground">
					The type machinery exists and types every call — it is simply not
					nameable through an import. Inference does not need a name:{' '}
					<code className="text-lib">db.users.findById(id)</code> returns
					exactly the row the schema describes.
				</p>
				<CodeBlock
					code={`CreateInput · UpdateInput · PrimaryKeyInput · ReturningColumns
InferReturning · FindByIdOptions · CreateOptions · UpdateOptions
UpdateByIdOptions · DeleteOptions · CountOptions · ExistsOptions
UpsertOptions · WhereCallback · WhereOperators · TableRepositoryMethods

PgSchemaBuilder · ColumnMap · SchemaResolverResult · RelationsHelpers

DynamoKeyInput · DynamoQueryInput · DynamoPage · SortCondition
DynamoTableDefinition · DynamoAttributes · InferRow`}
					filename="internal"
					language="text"
				/>
				<p className="text-muted-foreground text-sm">
					A repository whose signature mentions{' '}
					<code className="text-lib">WhereCallback&lt;TTable&gt;</code> is
					coupled to this package's internals rather than to its own domain.
					Keeping these unnameable is what prevents that coupling from forming
					by accident.
				</p>
			</div>
		</div>
	)
}
