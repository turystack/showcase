import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@AuthenticatedProfile"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["Parameter decorator that injects the authenticated profile from"," ",e.jsx("code",{className:"font-mono text-sm",children:"request.user"}),". Requires"," ",e.jsx("code",{className:"font-mono text-sm",children:"@Auth()"})," or"," ",e.jsx("code",{className:"font-mono text-sm",children:"@ACL()"})," on the route."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:"AuthenticatedProfile(): ParameterDecorator",filename:"authenticated-profile.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { Auth, ACL, AuthenticatedProfile } from '@turystack/nestjs-iam'
import type { IamProfile } from '@turystack/nestjs-iam'
import { z } from 'zod'

type OrganizationRequest = { params: { organization_id: string } }

const createOrganizationSchema = createRequestSchema({
  body: z.object({ name: z.string() }),
})

const updateOrganizationSchema = createRequestSchema({
  params: z.object({ organization_id: z.string().uuid() }),
  body: z.object({ name: z.string().optional() }),
})

@Controller({ path: 'organizations', tag: 'Organizations' })
export class OrganizationController {
  // With @Auth() — access the profile for business logic
  @Route({ method: 'POST', summary: 'Create Organization', description: 'Creates a new organization.' })
  @Auth()
  createOrganization(
    @AuthenticatedProfile() profile: IamProfile,
    @Request(createOrganizationSchema) req: RequestInput<typeof createOrganizationSchema>,
  ) {
    return this.organizationService.createOrganization(profile.user_id, {
      ...req.body,
      status: 'active',
    })
  }

  // With @ACL() — combine permission check + profile access
  @Route({ method: 'PATCH', path: ':organization_id', summary: 'Update Organization', description: 'Updates a organization.' })
  @ACL<OrganizationRequest>('organization:update', ({ params }) => ({
    organization_id: params.organization_id,
  }))
  updateOrganization(
    @AuthenticatedProfile() profile: IamProfile,
    @Request(updateOrganizationSchema) req: RequestInput<typeof updateOrganizationSchema>,
  ) {
    return this.organizationService.updateOrganization(req.params.organization_id, {
      ...req.body,
      updated_by: profile.user_id,
    })
  }
}`,filename:"organization.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"IamProfile type"}),e.jsx(t,{code:`type IamProfile = {
  user_id: string
  organization_id: string
  organization_role?: IamRole // role in the organization as a whole
  workspace_role?: IamWorkspaceRole // role in the workspace the token was minted for
}

type IamRole = {
  role_id: string
  name: string
  permission_ids: string[]
}

type IamWorkspaceRole = IamRole & { workspace_id: string }
`,filename:"iam.types.d.ts",language:"ts"})]})]})}export{n as component};
