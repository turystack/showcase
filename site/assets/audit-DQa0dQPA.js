import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function r(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Audit stamping"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Records who performed a write, without the principal being passed down through every signature."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Opting in is declaring the column"}),e.jsxs("p",{className:"text-muted-foreground",children:["There is no configuration. A table that declares"," ",e.jsx("code",{children:"created_by"})," or ",e.jsx("code",{children:"updated_by"})," gets them stamped; a table that does not is untouched."]}),e.jsx(t,{filename:"database.schema.ts",language:"ts",tabs:[{code:`import { defineDatabaseSchema } from '@turystack/nestjs-database'

export const databaseSchema = defineDatabaseSchema((schema) => ({
  // stamped
  orders: schema.table({
    id: schema.uuid('id').primaryKey(),
    status: schema.text('status').notNull(),
    created_by: schema.text('created_by'),  // filled on create / createMany
    updated_by: schema.text('updated_by'),  // filled on update / updateById
  }),

  // not stamped — nothing changes
  countries: schema.table({
    id: schema.uuid('id').primaryKey(),
    name: schema.text('name').notNull(),
  }),
}))`,label:"PostgreSQL"},{code:`import { defineDynamoDatabaseSchema } from '@turystack/nestjs-database'

export const databaseSchema = defineDynamoDatabaseSchema((t) => ({
  // stamped
  orders: t.table({
    attributes: {
      user_id: t.string(),
      order_id: t.string(),
      status: t.string(),
      created_by: t.string().optional(),  // filled on create / createMany / upsert
      updated_by: t.string().optional(),  // filled on updateById
    },
    key: { partition: 'user_id', sort: 'order_id' },
  }),

  // not stamped — nothing changes
  countries: t.table({
    attributes: { code: t.string(), name: t.string() },
    key: { partition: 'code' },
  }),
}))`,label:"DynamoDB"}]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The rule is the same on both engines, because the stamping is record work rather than engine work: a table that declared the attribute gets it filled, a table that did not is untouched, and an explicit value always wins."}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Only these two columns are supported. Anything else — a"," ",e.jsx("code",{children:"deleted_by"}),", a reason, a source — is domain data and is passed explicitly from the edge, like any other field."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Where the value comes from"}),e.jsx(t,{code:`AuthGuard verifies the JWT
      ↓
publishes the profile into the operation's context   (@turystack/nestjs-iam)
      ↓
created_by / updated_by = context.actor.id             (this package)`,filename:"chain",language:"bash"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["This package never imports @turystack/nestjs-context: it exposes"," ",e.jsx("code",{children:"registerAuditActor"})," and the context package pushes the reader in. A direct dependency either way would be a cycle."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Overriding a single write"}),e.jsx("p",{className:"text-muted-foreground",children:"An explicit value always wins — the caller is more specific than the ambient one."}),e.jsx(t,{code:`// stamped with the authenticated actor
await this.db.orders.create({ status: 'new' })

// stamped with what you passed
await this.db.orders.create({ status: 'new', created_by: 'system' })`,filename:"orders.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"When nothing is stamped"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The table does not declare the column"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The operation is unauthenticated — a scheduled job, a migration, a public endpoint"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"@turystack/nestjs-context is not registered in the application"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["The write is an ",e.jsx("code",{children:"upsert"})," — it lands as an insert or an update depending on the conflict, so neither column is stamped"]})]})]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"In each of these the write proceeds normally; the column is simply left alone."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"registerAuditActor"}),e.jsx("p",{className:"text-muted-foreground",children:"The seam, for an application that resolves the principal some other way."}),e.jsx(t,{code:`import { registerAuditActor } from '@turystack/nestjs-database'

registerAuditActor(() => myOwnRequestScope()?.userId)`,filename:"bootstrap.ts",language:"ts"})]})]})}export{r as component};
