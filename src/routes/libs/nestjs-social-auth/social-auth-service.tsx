import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-social-auth/social-auth-service',
)({
	component: Page,
})

const inputProps = [
	{
		description: 'The social provider to verify against.',
		name: 'provider',
		required: true,
		type: "'GOOGLE' | 'FACEBOOK' | 'MICROSOFT' | 'APPLE'",
	},
	{
		description:
			'The OAuth token from the frontend (ID token or access token depending on provider).',
		name: 'token',
		required: true,
		type: 'string',
	},
]

const profileProps = [
	{
		description: 'Discriminant — which provider produced this profile.',
		name: 'provider',
		required: true,
		type: "'GOOGLE' | 'FACEBOOK' | 'MICROSOFT' | 'APPLE'",
	},
	{
		description: 'Unique user identifier from the provider.',
		name: 'id',
		required: true,
		type: 'string',
	},
	{
		description:
			"User's display name. Typed `null` for Apple — the name never comes in the ID token.",
		name: 'name',
		required: true,
		type: 'string | null (APPLE: null)',
	},
	{
		description:
			"User's email address. May be missing (denied scope, phone-only account) or an Apple private-relay address.",
		name: 'email',
		required: true,
		type: 'string | null',
	},
	{
		description:
			'Profile picture URL. Typed `null` for Microsoft and Apple — their tokens never carry a photo.',
		name: 'avatar',
		required: true,
		type: 'string | null (MICROSOFT, APPLE: null)',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					SocialAuthService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Injectable service that verifies an OAuth token via the matching
					provider adapter and returns a normalized user profile.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Methods</h2>
				<CodeBlock
					code={`import { SocialAuthService, type SocialAuthProvider } from '@turystack/nestjs-social-auth'

resolveIdentity<P extends SocialAuthProvider>(provider: P, token: string): Promise<SocialAuthProfileOf<P>>

// The return type narrows per provider:
// resolveIdentity('APPLE', token)  → { provider: 'APPLE'; name: null; avatar: null; ... }
// resolveIdentity('GOOGLE', token) → { provider: 'GOOGLE'; name: string | null; avatar: string | null; ... }`}
					filename="social-auth-service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import {
  SocialAuthService,
  SocialAuthProvider,
} from '@turystack/nestjs-social-auth'

@Injectable()
export class AuthService {
  constructor(private readonly socialAuth: SocialAuthService) {}

  async loginWithSocial(provider: SocialAuthProvider, token: string) {
    const profile = await this.socialAuth.resolveIdentity(provider, token)

    const user = await this.userService.findOrCreate({
      socialId: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
    })

    return this.issueJwt(user)
  }

  // Narrowing via the provider discriminant:
  async handleProfile(profile: SocialAuthProfile) {
    if (profile.provider === 'APPLE') {
      // profile.name and profile.avatar are typed null here
    }
  }
}`}
					filename="auth.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">SocialAuthInput</h2>
				<PropsTable props={inputProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					SocialAuthProfile
				</h2>
				<p className="text-muted-foreground">
					A discriminated union — one member per provider, discriminated by{' '}
					<code className="font-mono text-sm">provider</code>. Fields a provider
					can never return are typed{' '}
					<code className="font-mono text-sm">null</code> (not{' '}
					<code className="font-mono text-sm">string | null</code>), so the
					compiler knows, e.g., that Apple never has a name. Use{' '}
					<code className="font-mono text-sm">
						SocialAuthProfileOf&lt;P&gt;
					</code>{' '}
					for a specific provider's shape.
				</p>
				<PropsTable props={profileProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Provider Details</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<strong>Google</strong> — verifies ID token JWT via Google JWKS.
							Returns id, name, email, avatar.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<strong>Facebook</strong> — calls Graph API{' '}
							<code className="font-mono text-sm">/me</code> with access token.
							Returns id, name, email, avatar.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<strong>Microsoft</strong> — verifies ID token JWT via Azure AD
							JWKS. Returns id, name, email. No avatar.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<strong>Apple</strong> — verifies ID token JWT via Apple JWKS
							(ES256). Returns id and email. Name and avatar are not available
							in the token — name is only sent on the first sign-in via the
							frontend.
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Error Handling</h2>
				<p className="text-muted-foreground">
					Throws{' '}
					<code className="font-mono text-sm">
						SocialAuthUnauthorizedException
					</code>{' '}
					(HTTP 401) when the token is invalid, expired, or the provider is not
					configured. Extends NestJS{' '}
					<code className="font-mono text-sm">UnauthorizedException</code>.
				</p>
				<CodeBlock
					code={`import { SocialAuthUnauthorizedException } from '@turystack/nestjs-social-auth'

try {
  const profile = await this.socialAuth.resolveIdentity(provider, token)
} catch (error) {
  if (error instanceof SocialAuthUnauthorizedException) {
    // Token invalid or provider not configured
  }
}`}
					filename="auth.controller.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
