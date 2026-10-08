import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function o(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Types & Errors"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The repository errors, the registry contract, and what the package deliberately does not let you name."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RecordNotFoundError"}),e.jsxs("p",{className:"text-muted-foreground",children:["Thrown by ",e.jsx("code",{className:"text-lib",children:"updateById"})," and"," ",e.jsx("code",{className:"text-lib",children:"deleteById"})," when the record does not exist."]}),e.jsx(t,{code:`import { RecordNotFoundError } from '@turystack/nestjs-database'

try {
  await this.db.users.deleteById(id)
} catch (error) {
  if (error instanceof RecordNotFoundError) {
    throw new NotFoundException(error.message)
  }
  throw error
}`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RecordNotCreatedError"}),e.jsxs("p",{className:"text-muted-foreground",children:["Thrown by ",e.jsx("code",{className:"text-lib",children:"create"})," and"," ",e.jsx("code",{className:"text-lib",children:"upsert"})," when the insert returns no rows."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The where callback"}),e.jsx("p",{className:"text-muted-foreground",children:"The where parameter takes a callback with typed column fields and Drizzle SQL operators. Its type is inferred at the call site and is not exported — writing a signature against it would couple your code to how this package models a predicate today:"}),e.jsx(t,{filename:"conditions.d.ts",language:"ts",tabs:[{code:`type WhereCallback<TTable> = (
  fields: TableColumns<TTable>,
  operators: WhereOperators,
) => SQL | undefined`,label:"PostgreSQL"},{code:`// DynamoDB has no where callback: a read walks a key path, and the
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
})`,label:"DynamoDB"}]}),e.jsx("p",{className:"text-muted-foreground",children:"Available operators:"}),e.jsx(t,{code:`eq, ne, gt, gte, lt, lte,
and, or, not,
inArray, notInArray,
isNull, isNotNull,
exists, notExists,
between, notBetween,
like, notLike, ilike, notIlike,
sql`,filename:"operators.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"InferDatabaseConfig"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The DynamoDB counterpart is"," ",e.jsx("code",{className:"text-lib",children:"InferDynamoDatabaseConfig"}),", which carries only ",e.jsx("code",{className:"text-lib",children:"schema"}),": that engine's registry exposes no ",e.jsx("code",{className:"text-lib",children:"raw"}),", because its client is a command bus rather than a query builder."]}),e.jsxs("p",{className:"text-muted-foreground",children:["Convenience type for augmenting"," ",e.jsx("code",{className:"text-lib",children:"DatabaseServiceRegistry"})," to get fully typed repositories:"]}),e.jsx(t,{code:`import type { InferDatabaseConfig } from '@turystack/nestjs-database'

declare module '@turystack/nestjs-database' {
  interface DatabaseServiceRegistry
    extends InferDatabaseConfig<
      ReturnType<typeof databaseSchema>,
      ReturnType<typeof databaseRelations>
    > {}
}`,filename:"database.schema.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What is not exported"}),e.jsxs("p",{className:"text-muted-foreground",children:["The type machinery exists and types every call — it is simply not nameable through an import. Inference does not need a name:"," ",e.jsx("code",{className:"text-lib",children:"db.users.findById(id)"})," returns exactly the row the schema describes."]}),e.jsx(t,{code:`CreateInput · UpdateInput · PrimaryKeyInput · ReturningColumns
InferReturning · FindByIdOptions · CreateOptions · UpdateOptions
UpdateByIdOptions · DeleteOptions · CountOptions · ExistsOptions
UpsertOptions · WhereCallback · WhereOperators · TableRepositoryMethods

PgSchemaBuilder · ColumnMap · SchemaResolverResult · RelationsHelpers

DynamoKeyInput · DynamoQueryInput · DynamoPage · SortCondition
DynamoTableDefinition · DynamoAttributes · InferRow`,filename:"internal",language:"text"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["A repository whose signature mentions"," ",e.jsx("code",{className:"text-lib",children:"WhereCallback<TTable>"})," is coupled to this package's internals rather than to its own domain. Keeping these unnameable is what prevents that coupling from forming by accident."]})]})]})}export{o as component};
