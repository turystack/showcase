import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Auth"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["Authentication-only decorator: validates the JWT, populates"," ",e.jsx("code",{className:"font-mono text-sm",children:"request.user"}),", and returns 401 on a missing or invalid token."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:"Auth(): ClassDecorator & MethodDecorator",filename:"auth.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage — Controller level"}),e.jsxs("p",{className:"text-muted-foreground",children:["Apply ",e.jsx("code",{className:"font-mono text-sm",children:"@Auth()"})," on the controller to protect all routes."]}),e.jsx(t,{code:`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { Auth, AuthenticatedProfile } from '@turystack/nestjs-iam'
import type { IamProfile } from '@turystack/nestjs-iam'
import { z } from 'zod'

const getOrganizationSchema = createRequestSchema({
  params: z.object({ organization_id: z.string().uuid() }),
})

const createOrganizationSchema = createRequestSchema({
  body: z.object({ name: z.string() }),
})

@Controller({ path: 'organizations', tag: 'Organizations' })
@Auth()
export class OrganizationController {
  @Route({ method: 'GET', path: ':organization_id', summary: 'Get Organization', description: 'Returns a organization by ID.' })
  getOrganization(@Request(getOrganizationSchema) req: RequestInput<typeof getOrganizationSchema>) {
    return this.organizationService.getOrganization(req.params.organization_id)
  }

  @Route({ method: 'POST', summary: 'Create Organization', description: 'Creates a new organization.' })
  createOrganization(
    @AuthenticatedProfile() profile: IamProfile,
    @Request(createOrganizationSchema) req: RequestInput<typeof createOrganizationSchema>,
  ) {
    return this.organizationService.createOrganization(profile.user_id, req.body)
  }
}`,filename:"organization.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage — Method level"}),e.jsxs("p",{className:"text-muted-foreground",children:["Apply ",e.jsx("code",{className:"font-mono text-sm",children:"@Auth()"})," on individual methods for controllers that mix public and private routes."]}),e.jsx(t,{code:`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { Auth, AuthenticatedProfile } from '@turystack/nestjs-iam'
import type { IamProfile } from '@turystack/nestjs-iam'
import { z } from 'zod'

const getPublicInfoSchema = createRequestSchema({
  params: z.object({ organization_id: z.string().uuid() }),
})

const createOrganizationSchema = createRequestSchema({
  body: z.object({ name: z.string() }),
})

@Controller({ path: 'organizations', tag: 'Organizations' })
export class OrganizationController {
  // Public — no decorator
  @Route({ method: 'GET', path: ':organization_id/public-info', summary: 'Get Public Info', description: 'Returns public organization info.' })
  getPublicInfo(@Request(getPublicInfoSchema) req: RequestInput<typeof getPublicInfoSchema>) {
    return this.organizationService.getPublicInfo(req.params.organization_id)
  }

  // Private — requires valid JWT
  @Route({ method: 'POST', summary: 'Create Organization', description: 'Creates a new organization.' })
  @Auth()
  createOrganization(
    @AuthenticatedProfile() profile: IamProfile,
    @Request(createOrganizationSchema) req: RequestInput<typeof createOrganizationSchema>,
  ) {
    return this.organizationService.createOrganization(profile.user_id, req.body)
  }
}`,filename:"organization.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The profile is published to the operation's context"}),e.jsxs("p",{className:"text-muted-foreground",children:["Once the token verifies, the guard puts the principal on the request"," ",e.jsx("em",{children:"and"})," into the context — so code that never receives the profile still knows who is acting."]}),e.jsx(t,{code:`AuthGuard verifies the JWT
      ↓
request.user     = profile        @AuthenticatedProfile() reads this
context.actor    = { id, organizationId }
context.tenantId = organizationId
      ↓
├── nestjs-logger        every log line carries actorId
├── nestjs-database      created_by / updated_by stamped
└── nestjs-observability spans carry turystack.actor_id`,filename:"propagation",language:"bash"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The guard mutates the context rather than opening a new one: the entrypoint already opened it with the correlation id, and a fresh scope here would sever the chain that started at the edge."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"@turystack/nestjs-context is an optional peer — an application without it authenticates exactly the same, it simply does not propagate the actor."})]})]})}export{n as component};
