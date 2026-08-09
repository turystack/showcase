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
			'Optional — declares the workspace (or organization) the route targets, read from the raw (unvalidated) request. Organization-level routes usually omit it.',
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
					code="ACL<T = {}>(permission: string, getContext?: (request: T) => IamAclContext): MethodDecorator"
					filename="acl.decorator.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Method level only. The guard reads the metadata off the route handler,
					so an @ACL on the class is never seen — the route would authenticate
					but skip the permission check entirely. Use @Auth() on the class when
					you want a blanket rule.
				</p>
				<p className="text-muted-foreground text-sm">
					T is the raw request shape passed to getContext. It defaults to{' '}
					<code className="font-mono text-sm">{'{}'}</code>, so annotate it (or
					pass the generic) whenever the callback destructures the request.
				</p>
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
					code={`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
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
    return this.billingService.getBilling(profile.organizationId)
  }

  @Route({ method: 'PATCH', summary: 'Update Billing', description: 'Updates billing info.' })
  @ACL('billing:update')
  updateBilling(
    @AuthenticatedProfile() profile: IamProfile,
    @Request(updateBillingSchema) req: RequestInput<typeof updateBillingSchema>,
  ) {
    return this.billingService.updateBilling(profile.organizationId, req.body)
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
					code={`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { ACL } from '@turystack/nestjs-iam'
import { z } from 'zod'

// getContext reads the raw request, before validation — type it so the
// generic resolves; it defaults to {} and destructuring would not compile.
type WorkspaceRequest = { params: { workspaceId: string } }

const listProductsSchema = createRequestSchema({
  params: z.object({ workspaceId: z.string().uuid() }),
  query: z.object({ limit: z.coerce.number().default(20) }),
})

const createProductSchema = createRequestSchema({
  params: z.object({ workspaceId: z.string().uuid() }),
  body: z.object({ name: z.string(), price: z.number() }),
})

@Controller({ path: 'workspaces/:workspaceId/products', tag: 'Products' })
export class ProductController {
  @Route({ method: 'GET', summary: 'List Products', description: 'Returns paginated products.' })
  @ACL<WorkspaceRequest>('product:read', ({ params }) => ({ workspaceId: params.workspaceId }))
  listProducts(@Request(listProductsSchema) req: RequestInput<typeof listProductsSchema>) {
    return this.productService.getPaginatedProducts({
      ...req.query,
      workspaceId: req.params.workspaceId,
    })
  }

  @Route({ method: 'POST', summary: 'Create Product', description: 'Creates a new product.' })
  @ACL<WorkspaceRequest>('product:create', ({ params }) => ({ workspaceId: params.workspaceId }))
  createProduct(@Request(createProductSchema) req: RequestInput<typeof createProductSchema>) {
    return this.productService.createProduct({
      ...req.body,
      workspaceId: req.params.workspaceId,
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
