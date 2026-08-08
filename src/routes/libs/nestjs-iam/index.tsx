import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-iam/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-iam
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					JWT authentication and CASL-based access control for NestJS.
					Service-agnostic, with reusable decorators for auth and permissions.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-iam',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-iam',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-iam',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-iam',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							JWT authentication with jose — no config framework assumed
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							CASL-based permission engine with organization and workspace
							scoping
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@Auth() for authentication-only routes, @ACL() for auth +
							permission
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							@AuthenticatedProfile() to inject the authenticated user into
							method params
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							IamTokenService — issue access/refresh token pairs with zero
							config
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Service-agnostic — no dependency on specific profile or JWT
							services
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Single register() — the profile resolver is a DI class, the only
							bridge to your project
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { Injectable, Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { IamModule, type IamPermissions, type IamProfile, type IamProfileResolver } from '@turystack/nestjs-iam'
import { type User, UserRepository } from '@turystack/libs-user'
import { configSchema } from './config.schema'

// everything IAM needs lives here: the permission catalog...
const PERMISSIONS: IamPermissions = {
  user: ['create', 'read', 'update', 'delete'],
  workspace: ['manage', 'create', 'read', 'update', 'delete'],
  organization: ['manage', 'read', 'update'],
}

// ...and the resolver — the single bridge to your libs
@Injectable()
class ProfileResolverService implements IamProfileResolver {
  constructor(private readonly userRepository: UserRepository) {}

  // workspaceId = the workspace the token was minted for
  async resolveProfile(userId: string, workspaceId?: string): Promise<IamProfile | null> {
    const user = await this.userRepository.findById(userId)
    return user ? this.toProfile(user, workspaceId) : null
  }

  // maps your domain user to the shape IAM expects
  private toProfile(user: User, workspaceId?: string): IamProfile {
    const membership = workspaceId
      ? user.memberships.find((m) => m.workspaceId === workspaceId)
      : undefined

    return {
      userId: user.id,
      organizationId: user.organizationId,
      organizationRole: user.organizationRole && {
        roleId: user.organizationRole.id,
        name: user.organizationRole.name,
        permissionIds: user.organizationRole.permissionIds,
      },
      workspaceRole: membership && {
        workspaceId: membership.workspaceId,
        roleId: membership.role.id,
        name: membership.role.name,
        permissionIds: membership.role.permissionIds,
      },
    }
  }
}

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    IamModule.register((config) => ({
      secret: config.get('JWT_SECRET'),
      permissions: PERMISSIONS,
      profileResolver: ProfileResolverService,
    })),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
