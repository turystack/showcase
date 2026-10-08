import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const i=[{description:"The authenticated user profile (organization and workspace roles).",name:"user",required:!0,type:"IamProfile"},{description:'The required permission in "subject:action" format.',name:"permission",required:!0,type:"string"},{description:"Resource context with optional organization_id and workspace_id.",name:"context",required:!1,type:"IamAclContext"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"IamAclService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The CASL permission engine behind the AclGuard; inject it directly for programmatic checks."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { IamAclService } from '@turystack/nestjs-iam'

iamAclService.canPerformAction(
  user: IamProfile,
  permission: string,
  context?: IamAclContext,
): void // throws IamForbiddenException if not authorized`,filename:"acl.service.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Injectable, Inject } from '@nestjs/common'
import { IamAclService } from '@turystack/nestjs-iam'
import type { IamProfile } from '@turystack/nestjs-iam'

@Injectable()
export class OrderService {
  constructor(
    @Inject(IamAclService) private readonly iamAclService: IamAclService,
  ) {}

  async cancelOrder(profile: IamProfile, orderId: string) {
    const order = await this.orderRepository.findById(orderId)

    // Programmatic check — throws IamForbiddenException if denied
    this.iamAclService.canPerformAction(profile, 'order:cancel', {
      organization_id: order.organization_id,
    })

    return this.orderRepository.cancel(orderId)
  }
}`,filename:"order.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Parameters"}),e.jsx(a,{props:i})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How permissions are resolved"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Builds a CASL Ability from the union of the user's roles, scoped to their organization_id"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"organization:manage"})," ","grants ",e.jsx("code",{className:"font-mono text-sm",children:"manage"})," on all subjects (admin override)"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"subject:manage"})," expands to all non-manage actions defined in the permissions map"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"workspace:manage"})," held in a workspace role grants everything inside that workspace — the grant carries the role's own workspace_id, so it never matches another workspace, and never authorizes an organization-level check"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["The checked resource is the profile's"," ",e.jsx("code",{className:"font-mono text-sm",children:"organization_id"})," merged with whatever the caller passes — a mismatched id simply fails the ability conditions"]})]})]})]})]})}export{l as component};
