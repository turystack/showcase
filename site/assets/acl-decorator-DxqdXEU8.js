import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as s}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const a=[{description:'The required permission in "subject:action" format (e.g., "user:read").',name:"permission",required:!0,type:"string"},{description:"Optional — declares the workspace (or organization) the route targets, read from the raw (unvalidated) request. Organization-level routes usually omit it.",name:"getContext",required:!1,type:"(request: T) => IamAclContext"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@ACL"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Authentication + authorization in one decorator: validates the JWT (401), then checks CASL permissions (403)."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:"ACL<T = {}>(permission: string, getContext?: (request: T) => IamAclContext): MethodDecorator",filename:"acl.decorator.d.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Method level only. The guard reads the metadata off the route handler, so an @ACL on the class is never seen — the route would authenticate but skip the permission check entirely. Use @Auth() on the class when you want a blanket rule."}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["T is the raw request shape passed to getContext. It defaults to"," ",e.jsx("code",{className:"font-mono text-sm",children:"{}"}),", so annotate it (or pass the generic) whenever the callback destructures the request."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Organization-level routes"}),e.jsx("p",{className:"text-muted-foreground",children:"No context needed — the organization comes from the authenticated profile. Only organization-role grants apply here; workspace grants never authorize organization-level routes."}),e.jsx(t,{code:`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { ACL, AuthenticatedProfile } from '@turystack/nestjs-iam'
import type { IamProfile } from '@turystack/nestjs-iam'
import { z } from 'zod'

const updateBillingSchema = createRequestSchema({
  body: z.object({ plan: z.string() }),
})

@Controller({ path: 'billing', tag: 'Billing' })
export class BillingController {
  @Route({ method: 'GET', summary: 'Get Billing', description: 'Returns billing info.' })
  @ACL('billing:read')
  getBilling(@AuthenticatedProfile() profile: IamProfile) {
    return this.billingService.getBilling(profile.organization_id)
  }

  @Route({ method: 'PATCH', summary: 'Update Billing', description: 'Updates billing info.' })
  @ACL('billing:update')
  updateBilling(
    @AuthenticatedProfile() profile: IamProfile,
    @Request(updateBillingSchema) req: RequestInput<typeof updateBillingSchema>,
  ) {
    return this.billingService.updateBilling(profile.organization_id, req.body)
  }
}`,filename:"billing.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Workspace-level routes"}),e.jsx("p",{className:"text-muted-foreground",children:"Declare the workspace from the request. Workspace grants only match the workspace their role belongs to; organization grants apply in any workspace."}),e.jsx(t,{code:`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { ACL } from '@turystack/nestjs-iam'
import { z } from 'zod'

// getContext reads the raw request, before validation — type it so the
// generic resolves; it defaults to {} and destructuring would not compile.
type WorkspaceRequest = { params: { workspace_id: string } }

const listProductsSchema = createRequestSchema({
  params: z.object({ workspace_id: z.string().uuid() }),
  query: z.object({ limit: z.coerce.number().default(20) }),
})

const createProductSchema = createRequestSchema({
  params: z.object({ workspace_id: z.string().uuid() }),
  body: z.object({ name: z.string(), price: z.number() }),
})

@Controller({ path: 'workspaces/:workspace_id/products', tag: 'Products' })
export class ProductController {
  @Route({ method: 'GET', summary: 'List Products', description: 'Returns paginated products.' })
  @ACL<WorkspaceRequest>('product:read', ({ params }) => ({ workspace_id: params.workspace_id }))
  listProducts(@Request(listProductsSchema) req: RequestInput<typeof listProductsSchema>) {
    return this.productService.getPaginatedProducts({
      ...req.query,
      workspace_id: req.params.workspace_id,
    })
  }

  @Route({ method: 'POST', summary: 'Create Product', description: 'Creates a new product.' })
  @ACL<WorkspaceRequest>('product:create', ({ params }) => ({ workspace_id: params.workspace_id }))
  createProduct(@Request(createProductSchema) req: RequestInput<typeof createProductSchema>) {
    return this.productService.createProduct({
      ...req.body,
      workspace_id: req.params.workspace_id,
    })
  }
}`,filename:"product.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Parameters"}),e.jsx(s,{props:a})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Permission resolution"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Abilities are the union of the organization role and the workspace role from the authenticated profile"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"organization:manage"})," ","grants everything in the organization, in any context"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"workspace:manage"})," in a workspace role grants everything within that workspace only"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"subject:manage"})," (e.g., product:manage) expands to all non-manage actions for that subject"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Specific permissions (e.g.,"," ",e.jsx("code",{className:"font-mono text-sm",children:"user:read"}),") grant exactly that action on that subject"]})]})]})]})]})}export{c as component};
