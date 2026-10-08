import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as n}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const o=[{description:"Ties every log, span, event and downstream call of this operation together. Generated at the entrypoint when the caller did not provide one.",name:"correlationId",required:!0,type:"string"},{description:"Authenticated principal, populated after authentication resolves.",name:"actor",required:!1,type:"RequestActor"},{description:"Tenant boundary the operation runs under, when distinct from the actor's.",name:"tenantId",required:!1,type:"string"},{description:"Extra low-cardinality labels propagated with the operation.",name:"attributes",required:!1,type:"Record<string, string>"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"ContextService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Reads and opens the context of the operation in flight."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { ContextService } from '@turystack/nestjs-context'

get(): RequestContext | undefined          // undefined outside an operation
require(): RequestContext                  // throws outside an operation
correlationId(): string | undefined
run<T>(context: Partial<RequestContext>, callback: () => T): T
set(patch: Partial<Omit<RequestContext, 'correlationId'>>): void
setActor(actor: RequestActor): void

// Standalone, for entrypoints that are not Nest providers:
runWithContext<T>(context: Partial<RequestContext>, callback: () => T): T
getCurrentContext(): RequestContext | undefined
createCorrelationId(): string`,filename:"context.service.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RequestContext"}),e.jsx(n,{props:o})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Reading"}),e.jsx(t,{code:`@Injectable()
export class CancelOrderUseCase {
  constructor(private readonly context: ContextService) {}

  async execute(input: CancelOrderInput) {
    // require() when the operation must have a context
    const { correlationId, actor } = this.context.require()

    // get() when running in both contexts is legitimate
    const tenantId = this.context.get()?.tenantId
  }
}`,filename:"cancel-order.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Filling it in stages"}),e.jsxs("p",{className:"text-muted-foreground",children:["The entrypoint knows the correlation id; only authentication later knows the actor. ",e.jsx("code",{children:"set"})," merges into the context in flight instead of opening a new one."]}),e.jsx(t,{code:`// at the edge — correlation id from the header, or generated
context.run({ correlationId: request.headers['x-correlation-id'] }, () => next())

// later, once the token is verified
context.setActor({ id: profile.user_id, organizationId: profile.organization_id })`,filename:"auth.guard.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[e.jsx("code",{children:"set"})," is a no-op outside an operation, so a code path that runs both inside and outside a request does not need a guard."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Isolation"}),e.jsxs("p",{className:"text-muted-foreground",children:["Backed by AsyncLocalStorage: the context survives ",e.jsx("code",{children:"await"})," ","and stays isolated between operations running concurrently in the same process."]})]})]})}export{c as component};
