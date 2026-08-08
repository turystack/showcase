import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-iam/auth-decorator')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Auth
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Authentication-only decorator: validates the JWT, populates{' '}
					<code className="font-mono text-sm">request.user</code>, and returns
					401 on a missing or invalid token.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="Auth(): ClassDecorator & MethodDecorator"
					filename="auth.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Usage — Controller level
				</h2>
				<p className="text-muted-foreground">
					Apply <code className="font-mono text-sm">@Auth()</code> on the
					controller to protect all routes.
				</p>
				<CodeBlock
					code={`import { Controller, Route, Request } from '@turystack/nestjs-server'
import { Auth, AuthenticatedProfile } from '@turystack/nestjs-iam'

@Controller({ path: 'organizations', tag: 'Organizations' })
@Auth()
export class OrganizationController {
  @Route({ method: 'GET', path: ':organizationId', summary: 'Get Organization', description: 'Returns a organization by ID.' })
  getOrganization(@Request() { params }) {
    return this.organizationService.getOrganization(params.organizationId)
  }

  @Route({ method: 'POST', summary: 'Create Organization', description: 'Creates a new organization.' })
  createOrganization(
    @AuthenticatedProfile() profile,
    @Request() { body },
  ) {
    return this.organizationService.createOrganization(profile.userId, body)
  }
}`}
					filename="organization.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Usage — Method level
				</h2>
				<p className="text-muted-foreground">
					Apply <code className="font-mono text-sm">@Auth()</code> on individual
					methods for controllers that mix public and private routes.
				</p>
				<CodeBlock
					code={`import { Controller, Route, Request } from '@turystack/nestjs-server'
import { Auth, AuthenticatedProfile } from '@turystack/nestjs-iam'

@Controller({ path: 'organizations', tag: 'Organizations' })
export class OrganizationController {
  // Public — no decorator
  @Route({ method: 'GET', path: ':organizationId/public-info', summary: 'Get Public Info', description: 'Returns public organization info.' })
  getPublicInfo(@Request() { params }) {
    return this.organizationService.getPublicInfo(params.organizationId)
  }

  // Private — requires valid JWT
  @Route({ method: 'POST', summary: 'Create Organization', description: 'Creates a new organization.' })
  @Auth()
  createOrganization(
    @AuthenticatedProfile() profile,
    @Request() { body },
  ) {
    return this.organizationService.createOrganization(profile.userId, body)
  }
}`}
					filename="organization.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The profile is published to the operation's context
				</h2>
				<p className="text-muted-foreground">
					Once the token verifies, the guard puts the principal on the request{' '}
					<em>and</em> into the context — so code that never receives the
					profile still knows who is acting.
				</p>
				<CodeBlock
					code={`AuthGuard verifies the JWT
      ↓
request.user     = profile        @AuthenticatedProfile() reads this
context.actor    = { id, organizationId }
context.tenantId = organizationId
      ↓
├── nestjs-logger        every log line carries actorId
├── nestjs-database      createdBy / updatedBy stamped
└── nestjs-observability spans carry turystack.actor_id`}
					filename="propagation"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					The guard mutates the context rather than opening a new one: the
					entrypoint already opened it with the correlation id, and a fresh
					scope here would sever the chain that started at the edge.
				</p>
				<p className="text-muted-foreground text-sm">
					@turystack/nestjs-context is an optional peer — an application without
					it authenticates exactly the same, it simply does not propagate the
					actor.
				</p>
			</div>
		</div>
	)
}
