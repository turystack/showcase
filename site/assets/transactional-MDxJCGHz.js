import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{description:"Allows dirty reads. Fastest but least safe.",name:"read uncommitted",type:"IsolationLevel"},{description:"Default PostgreSQL level. Prevents dirty reads.",name:"read committed",type:"IsolationLevel"},{description:"Prevents non-repeatable reads.",name:"repeatable read",type:"IsolationLevel"},{description:"Strictest level. Transactions execute as if they were serial.",name:"serializable",type:"IsolationLevel"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Transactional"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Method decorator that runs the whole call tree in one transaction."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:"Transactional(isolationLevel?: IsolationLevel): MethodDecorator",filename:"transactional.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{filename:"transfer.service.ts",language:"ts",tabs:[{code:`import { Injectable } from '@nestjs/common'
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
}`,label:"PostgreSQL"},{code:`import { Injectable } from '@nestjs/common'
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
}`,label:"DynamoDB"}]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The decorator is the same; what a transaction ",e.jsx("em",{children:"is"})," belongs to the engine. PostgreSQL holds a handle open and every call writes through it. DynamoDB has no handle: the writes are collected and sent as one atomic batch, so three things are refused rather than approximated — a read inside the operation does not see the buffered writes (updateById and deleteById throw there), over 100 writes fails instead of splitting, and an isolation level throws because this engine has none."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["With Isolation Level",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx(t,{code:`@Transactional('serializable')
async criticalUpdate(id: string, data: UpdateInput) {
  await this.db.users.updateById(id, data)
}`,filename:"users.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Nested Transactions"}),e.jsxs("p",{className:"text-muted-foreground",children:["If a ",e.jsx("code",{className:"text-lib",children:"Transactional"})," method calls another ",e.jsx("code",{className:"text-lib",children:"Transactional"})," method, the inner method reuses the existing transaction instead of creating a new one."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["Isolation Levels",e.jsx("span",{className:"ml-2 rounded bg-muted px-2 py-0.5 align-middle font-medium font-normal text-muted-foreground text-xs",children:"PostgreSQL only"})]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"DynamoDB has none, so passing one throws at the call rather than being ignored. A silently different behaviour between two engines is the failure nobody finds until production."}),e.jsx(a,{props:s})]})]})}export{d as component};
