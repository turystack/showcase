import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-iam/acl-service')({
	component: Page,
})

const params = [
	{
		description:
			'The authenticated user profile (organization and workspace roles).',
		name: 'user',
		required: true,
		type: 'IamProfile',
	},
	{
		description: 'The required permission in "subject:action" format.',
		name: 'permission',
		required: true,
		type: 'string',
	},
	{
		description:
			'Resource context with organizationId and optional workspaceId.',
		name: 'resource',
		required: false,
		type: 'IamAclContext',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					IamAclService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The CASL permission engine behind the AclGuard; inject it directly for
					programmatic checks.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { IamAclService } from '@turystack/nestjs-iam'

iamAclService.canPerformAction(
  user: IamProfile,
  permission: string,
  resource?: IamAclContext,
): void // throws IamForbiddenException if not authorized`}
					filename="acl.service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Injectable, Inject } from '@nestjs/common'
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
      organizationId: order.organizationId,
    })

    return this.orderRepository.cancel(orderId)
  }
}`}
					filename="order.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Parameters</h2>
				<PropsTable props={params} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					How permissions are resolved
				</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Builds a CASL Ability from the union of the user's roles, scoped
							to their organizationId
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">organization:manage</code>{' '}
							grants <code className="font-mono text-sm">manage</code> on all
							subjects (admin override)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">subject:manage</code> expands
							to all non-manage actions defined in the permissions map
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">workspace:manage</code> held
							in a workspace role grants everything inside that workspace — the
							grant carries the role's own workspaceId, so it never matches
							another workspace, and never authorizes an organization-level
							check
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The checked resource is the profile's{' '}
							<code className="font-mono text-sm">organizationId</code> merged
							with whatever the caller passes — a mismatched id simply fails the
							ability conditions
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
