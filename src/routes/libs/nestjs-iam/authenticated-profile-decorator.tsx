import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute(
	'/libs/nestjs-iam/authenticated-profile-decorator',
)({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@AuthenticatedProfile
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Parameter decorator that injects the authenticated profile from{' '}
					<code className="font-mono text-sm">request.user</code>. Requires{' '}
					<code className="font-mono text-sm">@Auth()</code> or{' '}
					<code className="font-mono text-sm">@ACL()</code> on the route.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="AuthenticatedProfile(): ParameterDecorator"
					filename="authenticated-profile.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
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
}`}
					filename="organization.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">IamProfile type</h2>
				<CodeBlock
					code={`type IamProfile = {
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
`}
					filename="iam.types.d.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
