import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function o(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-iam"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"JWT authentication and CASL-based access control for NestJS. Service-agnostic, with reusable decorators for auth and permissions."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"npm install @turystack/nestjs-iam",label:"npm"},{code:"pnpm add @turystack/nestjs-iam",label:"pnpm"},{code:"yarn add @turystack/nestjs-iam",label:"yarn"},{code:"bun add @turystack/nestjs-iam",label:"bun"}]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"JWT authentication with jose — no config framework assumed"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"CASL-based permission engine with organization and workspace scoping"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"@Auth() for authentication-only routes, @ACL() for auth + permission"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"@AuthenticatedProfile() to inject the authenticated user into method params"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"IamTokenService — issue access/refresh token pairs with zero config"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Service-agnostic — no dependency on specific profile or JWT services"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Single register() — the profile resolver is a DI class, the only bridge to your project"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),e.jsx(s,{code:`import { Injectable, Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { IamModule, type IamPermissions, type IamProfile, type IamProfileResolver } from '@turystack/nestjs-iam'
import { type User, UserRepository } from '@/domains/user'
import { configSchema } from './config.schema'

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

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    // factory form: the resolver is built through the module injector, so
    // UserModule has to be global. Use the plain object form with
    // imports: [UserModule] when it is not.
    IamModule.register((config) => ({
      secret: config.get('JWT_SECRET'),
      permissions: PERMISSIONS,
      profileResolver: ProfileResolverService,
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]})]})}export{o as component};
