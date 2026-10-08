import{j as e}from"./index-B7Ig6kNO.js";import{C as i}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{description:"The social provider to verify against.",name:"provider",required:!0,type:"'google' | 'facebook' | 'microsoft' | 'apple'"},{description:"The OAuth token from the frontend (ID token or access token depending on provider).",name:"token",required:!0,type:"string"}],r=[{description:"Discriminant — which provider produced this profile.",name:"provider",required:!0,type:"'google' | 'facebook' | 'microsoft' | 'apple'"},{description:"Unique user identifier from the provider.",name:"id",required:!0,type:"string"},{description:"User's display name. Typed `null` for Apple — the name never comes in the ID token.",name:"name",required:!0,type:"string | null (apple: null)"},{description:"User's email address. May be missing (denied scope, phone-only account) or an Apple private-relay address.",name:"email",required:!0,type:"string | null"},{description:"Profile picture URL. Typed `null` for Microsoft and Apple — their tokens never carry a photo.",name:"avatar",required:!0,type:"string | null (microsoft, apple: null)"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"SocialAuthService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Injectable service that verifies an OAuth token via the matching provider adapter and returns a normalized user profile."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Methods"}),e.jsx(i,{code:`import { SocialAuthService, type SocialAuthProvider } from '@turystack/nestjs-social-auth'

resolveIdentity<P extends SocialAuthProvider>(provider: P, token: string): Promise<SocialAuthProfileOf<P>>

// The return type narrows per provider:
// resolveIdentity('apple', token)  → { provider: 'apple'; name: null; avatar: null; ... }
// resolveIdentity('google', token) → { provider: 'google'; name: string | null; avatar: string | null; ... }`,filename:"social-auth-service.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(i,{code:`import { Injectable } from '@nestjs/common'
import {
  SocialAuthService,
  type SocialAuthProfile,
  type SocialAuthProvider,
} from '@turystack/nestjs-social-auth'

export type LoginWithSocialInput = {
  provider: SocialAuthProvider
  token: string
}

@Injectable()
export class LoginWithSocialUseCase {
  constructor(
    private readonly socialAuth: SocialAuthService,
    private readonly users: UserRepository,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: LoginWithSocialInput) {
    // Invalid, expired, or unconfigured provider → SocialAuthUnauthorizedException
    const profile = await this.socialAuth.resolveIdentity(
      input.provider,
      input.token,
    )

    const user = await this.users.findOrCreate({
      socialId: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
    })

    return this.tokens.issue(user)
  }
}

// Narrowing via the provider discriminant:
function describe(profile: SocialAuthProfile) {
  if (profile.provider === 'apple') {
    // profile.name and profile.avatar are typed null here
  }
}`,filename:"login-with-social.use-case.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"resolveIdentity parameters"}),e.jsx("p",{className:"text-muted-foreground",children:"Two positional arguments — there is no options object."}),e.jsx(t,{props:s})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"SocialAuthProfile"}),e.jsxs("p",{className:"text-muted-foreground",children:["A discriminated union — one member per provider, discriminated by"," ",e.jsx("code",{className:"font-mono text-sm",children:"provider"}),". Fields a provider can never return are typed"," ",e.jsx("code",{className:"font-mono text-sm",children:"null"})," (not"," ",e.jsx("code",{className:"font-mono text-sm",children:"string | null"}),"), so the compiler knows, e.g., that Apple never has a name. Use"," ",e.jsx("code",{className:"font-mono text-sm",children:"SocialAuthProfileOf<P>"})," ","for a specific provider's shape."]}),e.jsx(t,{props:r})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Provider Details"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Google"})," — verifies ID token JWT via Google JWKS. Returns id, name, email, avatar."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Facebook"})," — calls Graph API"," ",e.jsx("code",{className:"font-mono text-sm",children:"/me"})," with access token. Returns id, name, email, avatar."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Microsoft"})," — verifies ID token JWT via Azure AD JWKS. Returns id, name, email. No avatar."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("strong",{children:"Apple"})," — verifies ID token JWT via Apple JWKS, checking issuer and audience. Returns id and email. Name and avatar are not available in the token — name is only sent on the first sign-in via the frontend."]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Error Handling"}),e.jsxs("p",{className:"text-muted-foreground",children:["Throws"," ",e.jsx("code",{className:"font-mono text-sm",children:"SocialAuthUnauthorizedException"})," ","(HTTP 401) when the token is invalid, expired, or the provider is not configured. Extends NestJS"," ",e.jsx("code",{className:"font-mono text-sm",children:"UnauthorizedException"}),"."]}),e.jsx(i,{code:`import { SocialAuthUnauthorizedException } from '@turystack/nestjs-social-auth'

try {
  const profile = await this.socialAuth.resolveIdentity(provider, token)
} catch (error) {
  if (error instanceof SocialAuthUnauthorizedException) {
    // Token invalid or provider not configured
  }
}`,filename:"auth.controller.ts",language:"ts"})]})]})}export{d as component};
