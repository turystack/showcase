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
					code={`import { Controller, Route, Request } from '@turystack/nestjs-server'
import { Auth, ACL, AuthenticatedProfile } from '@turystack/nestjs-iam'
import type { IamProfile } from '@turystack/nestjs-iam'

@Controller({ path: 'organizations', tag: 'Organizations' })
export class OrganizationController {
  // With @Auth() — access the profile for business logic
  @Route({ method: 'POST', summary: 'Create Organization', description: 'Creates a new organization.' })
  @Auth()
  createOrganization(
    @AuthenticatedProfile() profile: IamProfile,
    @Request() { body },
  ) {
    return this.organizationService.createOrganization(profile.userId, {
      ...body,
      status: 'ACTIVE',
    })
  }

  // With @ACL() — combine permission check + profile access
  @Route({ method: 'PATCH', path: ':organizationId', summary: 'Update Organization', description: 'Updates a organization.' })
  @ACL('organization:update', ({ params }) => ({
    organizationId: params.organizationId,
  }))
  updateOrganization(
    @AuthenticatedProfile() profile: IamProfile,
    @Request() { params, body },
  ) {
    return this.organizationService.updateOrganization(params.organizationId, {
      ...body,
      updatedBy: profile.userId,
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
  userId: string
  organizationId: string
  organizationRole?: IamRole // role in the organization as a whole
  workspaceRole?: IamWorkspaceRole // role in the workspace the token was minted for
}

type IamRole = {
  roleId: string
  name: string
  permissionIds: string[]
}

type IamWorkspaceRole = IamRole & { workspaceId: string }
`}
					filename="iam.types.d.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
