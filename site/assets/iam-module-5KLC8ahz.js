import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as o}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const r=[{description:"HS256 secret used to sign and verify tokens.",name:"secret",required:!0,type:"string"},{description:"Map of actions per subject. Key is the subject, value is an array of action strings.",name:"permissions",required:!0,type:"Record<string, string[]>"},{description:"Class implementing IamProfileResolver — instantiated via DI; its dependencies come from global lib modules or from imports.",name:"profileResolver",required:!0,type:"Type<IamProfileResolver>"},{description:"Modules providing the resolver's dependencies, when they are not global.",name:"imports",required:!1,type:"ModuleMetadata['imports']"},{default:'"15m"',description:'Access token TTL. Supports s, m, h, d units (e.g. "30m", "1h").',name:"accessExpiresIn",required:!1,type:"string"},{default:'"7d"',description:'Refresh token TTL. Supports s, m, h, d units (e.g. "14d", "720h").',name:"refreshExpiresIn",required:!1,type:"string"}];function m(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"IamModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Registers the guards, the token service, and the ACL engine — once, in the app root. Everything is injectable anywhere."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { IamModule } from '@turystack/nestjs-iam'

IamModule.register(
  options: IamModuleOptions | ((config: ConfigService) => IamModuleFactoryOptions),
): DynamicModule`,filename:"iam.module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app. IamModuleFactoryOptions excludes imports: in the factory form the resolver's dependencies must come from global modules. register also accepts a plain options object."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Injectable, Module } from '@nestjs/common'
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
      ? user.memberships.find((m) => m.workspace_id === workspaceId)
      : undefined

    return {
      user_id: user.id,
      organization_id: user.organization_id,
      organization_role: user.organization_role && {
        role_id: user.organization_role.id,
        name: user.organization_role.name,
        permission_ids: user.organization_role.permission_ids,
      },
      workspace_role: membership && {
        workspace_id: membership.workspace_id,
        role_id: membership.role.id,
        name: membership.role.name,
        permission_ids: membership.role.permission_ids,
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
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Plain options form"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{className:"font-mono text-sm",children:"register"})," also takes the options object directly. This is the only form that accepts"," ",e.jsx("code",{className:"font-mono text-sm",children:"imports"}),": the class is known at register time and bound with"," ",e.jsx("code",{className:"font-mono text-sm",children:"useClass"}),", so the listed modules can provide the resolver's dependencies."]}),e.jsx(s,{code:`@Module({
  imports: [
    IamModule.register({
      secret: process.env.JWT_SECRET!,
      permissions: PERMISSIONS,
      profileResolver: ProfileResolverService,
      imports: [UserModule], // provides UserRepository to the resolver
    }),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"In the factory form the module structure is built before the ConfigService exists, so the resolver is created through the module injector and its dependencies must come from global modules."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"IamModuleOptions"}),e.jsxs("p",{className:"text-muted-foreground",children:["The resolver is the only bridge to your project: a class implementing"," ",e.jsx("code",{className:"font-mono text-sm",children:"IamProfileResolver"}),", typically a project-level ProfileResolverService backed by a lib UserRepository or UserService."]}),e.jsx(o,{props:r})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Permissions Map"}),e.jsxs("p",{className:"text-muted-foreground",children:["The permissions map defines available actions per subject — just the action names. The subject is inferred from the key. The ACL engine uses this to expand ",e.jsx("code",{className:"font-mono text-sm",children:"manage"})," ","into individual actions."]}),e.jsx(s,{code:`import type { IamPermissions } from '@turystack/nestjs-iam'

export const PERMISSIONS: IamPermissions = {
  user: ['create', 'read', 'update', 'delete'],
  workspace: ['manage', 'create', 'read', 'update', 'delete'],
  organization: ['manage', 'read', 'update'],
}`,filename:"permissions.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["The ACL engine combines"," ",e.jsx("code",{className:"font-mono text-sm",children:"key + action"})," to generate the permission IDs used throughout the system:"]}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"user"}),": generates"," ",e.jsx("code",{className:"font-mono text-sm",children:"user:create"}),","," ",e.jsx("code",{className:"font-mono text-sm",children:"user:read"}),","," ",e.jsx("code",{className:"font-mono text-sm",children:"user:update"}),","," ",e.jsx("code",{className:"font-mono text-sm",children:"user:delete"})]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"workspace"}),": generates"," ",e.jsx("code",{className:"font-mono text-sm",children:"workspace:manage"}),","," ",e.jsx("code",{className:"font-mono text-sm",children:"workspace:create"}),","," ",e.jsx("code",{className:"font-mono text-sm",children:"workspace:read"}),", ..."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"font-mono text-sm",children:"organization"}),": generates"," ",e.jsx("code",{className:"font-mono text-sm",children:"organization:manage"}),","," ",e.jsx("code",{className:"font-mono text-sm",children:"organization:read"}),","," ",e.jsx("code",{className:"font-mono text-sm",children:"organization:update"})]})]})]}),e.jsxs("p",{className:"text-muted-foreground",children:["These are the same IDs stored in"," ",e.jsx("code",{className:"font-mono text-sm",children:"the role permission_ids (organization_role / workspace_role)"})," ","and used in"," ",e.jsx("code",{className:"font-mono text-sm",children:"@ACL('user:read', ...)"})," ","decorators."]})]})]})}export{m as component};
