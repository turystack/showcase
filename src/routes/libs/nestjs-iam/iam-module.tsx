import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-iam/iam-module')({
	component: Page,
})

const moduleOptions = [
	{
		description: 'HS256 secret used to sign and verify tokens.',
		name: 'secret',
		required: true,
		type: 'string',
	},
	{
		description:
			'Map of actions per subject. Key is the subject, value is an array of action strings.',
		name: 'permissions',
		required: true,
		type: 'Record<string, string[]>',
	},
	{
		description:
			'Class implementing IamProfileResolver — instantiated via DI; its dependencies come from global lib modules or from imports.',
		name: 'profileResolver',
		required: true,
		type: 'Type<IamProfileResolver>',
	},
	{
		description:
			"Modules providing the resolver's dependencies, when they are not global.",
		name: 'imports',
		required: false,
		type: "ModuleMetadata['imports']",
	},
	{
		default: '"15m"',
		description:
			'Access token TTL. Supports s, m, h, d units (e.g. "30m", "1h").',
		name: 'accessExpiresIn',
		required: false,
		type: 'string',
	},
	{
		default: '"7d"',
		description:
			'Refresh token TTL. Supports s, m, h, d units (e.g. "14d", "720h").',
		name: 'refreshExpiresIn',
		required: false,
		type: 'string',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					IamModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Registers the guards, the token service, and the ACL engine — once, in
					the app root. Everything is injectable anywhere.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { IamModule } from '@turystack/nestjs-iam'

IamModule.register(
  options: IamModuleOptions | ((config: ConfigService) => IamModuleFactoryOptions),
): DynamicModule`}
					filename="iam.module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the app. IamModuleFactoryOptions excludes imports: in the
					factory form the resolver's dependencies must come from global
					modules. register also accepts a plain options object.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Injectable, Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { IamModule, type IamPermissions, type IamProfile, type IamProfileResolver } from '@turystack/nestjs-iam'
import { type User, UserRepository } from '@/domains/user'
import { z } from 'zod'

// everything IAM needs lives here: the permission catalog...
const PERMISSIONS: IamPermissions = {
  user: ['create', 'read', 'update', 'delete'],
  workspace: ['manage', 'create', 'read', 'update', 'delete'],
  organization: ['manage', 'read', 'update'],
}

// ...and the resolver — the single bridge to your application.
// UserRepository is your own; IAM never ships a user model.
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

const configSchema = defineConfigSchema({ JWT_SECRET: z.string() })

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

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Plain options form
				</h2>
				<p className="text-muted-foreground">
					<code className="font-mono text-sm">register</code> also takes the
					options object directly. This is the only form that accepts{' '}
					<code className="font-mono text-sm">imports</code>: the class is known
					at register time and bound with{' '}
					<code className="font-mono text-sm">useClass</code>, so the listed
					modules can provide the resolver's dependencies.
				</p>
				<CodeBlock
					code={`@Module({
  imports: [
    IamModule.register({
      secret: process.env.JWT_SECRET!,
      permissions: PERMISSIONS,
      profileResolver: ProfileResolverService,
      imports: [UserModule], // provides UserRepository to the resolver
    }),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					In the factory form the module structure is built before the
					ConfigService exists, so the resolver is created through the module
					injector and its dependencies must come from global modules.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">IamModuleOptions</h2>
				<p className="text-muted-foreground">
					The resolver is the only bridge to your project: a class implementing{' '}
					<code className="font-mono text-sm">IamProfileResolver</code>,
					typically a project-level ProfileResolverService backed by a lib
					UserRepository or UserService.
				</p>
				<PropsTable props={moduleOptions} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Permissions Map</h2>
				<p className="text-muted-foreground">
					The permissions map defines available actions per subject — just the
					action names. The subject is inferred from the key. The ACL engine
					uses this to expand <code className="font-mono text-sm">manage</code>{' '}
					into individual actions.
				</p>
				<CodeBlock
					code={`import type { IamPermissions } from '@turystack/nestjs-iam'

export const PERMISSIONS: IamPermissions = {
  user: ['create', 'read', 'update', 'delete'],
  workspace: ['manage', 'create', 'read', 'update', 'delete'],
  organization: ['manage', 'read', 'update'],
}`}
					filename="permissions.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					The ACL engine combines{' '}
					<code className="font-mono text-sm">key + action</code> to generate
					the permission IDs used throughout the system:
				</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">user</code>: generates{' '}
							<code className="font-mono text-sm">user:create</code>,{' '}
							<code className="font-mono text-sm">user:read</code>,{' '}
							<code className="font-mono text-sm">user:update</code>,{' '}
							<code className="font-mono text-sm">user:delete</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">workspace</code>: generates{' '}
							<code className="font-mono text-sm">workspace:manage</code>,{' '}
							<code className="font-mono text-sm">workspace:create</code>,{' '}
							<code className="font-mono text-sm">workspace:read</code>, ...
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">organization</code>: generates{' '}
							<code className="font-mono text-sm">organization:manage</code>,{' '}
							<code className="font-mono text-sm">organization:read</code>,{' '}
							<code className="font-mono text-sm">organization:update</code>
						</span>
					</li>
				</ul>
				<p className="text-muted-foreground">
					These are the same IDs stored in{' '}
					<code className="font-mono text-sm">
						the role permissionIds (organizationRole / workspaceRole)
					</code>{' '}
					and used in{' '}
					<code className="font-mono text-sm">@ACL('user:read', ...)</code>{' '}
					decorators.
				</p>
			</div>
		</div>
	)
}
