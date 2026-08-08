import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-iam/acl-decorator')({
	component: Page,
})

const params = [
	{
		description:
			'The required permission in "subject:action" format (e.g., "user:read").',
		name: 'permission',
		required: true,
		type: 'string',
	},
	{
		description:
			'Optional — declares the workspace (or organization) the route targets. Organization-level routes usually omit it.',
		name: 'getContext',
		required: false,
		type: '(request: T) => IamAclContext',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">@ACL</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Authentication + authorization in one decorator: validates the JWT
					(401), then checks CASL permissions (403).
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="ACL<T = {}>(permission: string, getContext?: (request: T) => IamAclContext): MethodDecorator & ClassDecorator"
					filename="acl.decorator.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Organization-level routes
				</h2>
				<p className="text-muted-foreground">
					No context needed — the organization comes from the authenticated
					profile. Only organization-role grants apply here; workspace grants
					never authorize organization-level routes.
				</p>
				<CodeBlock
					code={`import { Controller, Route, Request } from '@turystack/nestjs-server'
import { ACL, AuthenticatedProfile } from '@turystack/nestjs-iam'
import type { IamProfile } from '@turystack/nestjs-iam'

@Controller({ path: 'billing', tag: 'Billing' })
export class BillingController {
  @Route({ method: 'GET', summary: 'Get Billing', description: 'Returns billing info.' })
  @ACL('billing:read')
  getBilling(@AuthenticatedProfile() profile: IamProfile) {
    return this.billingService.getBilling(profile.organizationId)
  }

  @Route({ method: 'PATCH', summary: 'Update Billing', description: 'Updates billing info.' })
  @ACL('billing:update')
  updateBilling(@AuthenticatedProfile() profile: IamProfile, @Request() { body }) {
    return this.billingService.updateBilling(profile.organizationId, body)
  }
}`}
					filename="billing.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Workspace-level routes
				</h2>
				<p className="text-muted-foreground">
					Declare the workspace from the request. Workspace grants only match
					the workspace their role belongs to; organization grants apply in any
					workspace.
				</p>
				<CodeBlock
					code={`import { Controller, Route, Request } from '@turystack/nestjs-server'
import { ACL } from '@turystack/nestjs-iam'

@Controller({ path: 'workspaces/:workspaceId/products', tag: 'Products' })
export class ProductController {
  @Route({ method: 'GET', summary: 'List Products', description: 'Returns paginated products.' })
  @ACL('product:read', ({ params }) => ({ workspaceId: params.workspaceId }))
  listProducts(@Request() { params, query }) {
    return this.productService.getPaginatedProducts({
      ...query,
      workspaceId: params.workspaceId,
    })
  }

  @Route({ method: 'POST', summary: 'Create Product', description: 'Creates a new product.' })
  @ACL('product:create', ({ params }) => ({ workspaceId: params.workspaceId }))
  createProduct(@Request() { params, body }) {
    return this.productService.createProduct({
      ...body,
      workspaceId: params.workspaceId,
    })
  }
}`}
					filename="product.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Parameters</h2>
				<PropsTable props={params} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Permission resolution
				</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Abilities are the union of the organization role and the workspace
							role from the authenticated profile
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">organization:manage</code>{' '}
							grants everything in the organization, in any context
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">workspace:manage</code> in a
							workspace role grants everything within that workspace only
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">subject:manage</code> (e.g.,
							product:manage) expands to all non-manage actions for that subject
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Specific permissions (e.g.,{' '}
							<code className="font-mono text-sm">user:read</code>) grant
							exactly that action on that subject
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
