import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-iam/token-service')({
	component: Page,
})

const issueTokensParams = [
	{
		description: 'The authenticated user ID to encode in both tokens.',
		name: 'userId',
		required: true,
		type: 'string',
	},
	{
		description:
			'The workspace the pair is minted for. Omit it for organization-only sessions — switching workspaces means issuing a new pair.',
		name: 'options.workspaceId',
		required: false,
		type: 'string',
	},
]

const verifyRefreshTokenParams = [
	{
		description: 'The refresh token string to verify.',
		name: 'token',
		required: true,
		type: 'string',
	},
]

const tokenPairProps = [
	{
		description: 'The signed JWT access token.',
		name: 'accessToken',
		required: true,
		type: 'string',
	},
	{
		description: 'The signed JWT refresh token (contains rt: true flag).',
		name: 'refreshToken',
		required: true,
		type: 'string',
	},
	{
		description: 'Access token TTL in seconds, derived from accessExpiresIn.',
		name: 'expiresIn',
		required: true,
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					IamTokenService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					JWT generation and refresh verification, using the secret and
					expiration options from the module configuration.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { IamTokenService } from '@turystack/nestjs-iam'

issueTokens(userId: string, options?: { workspaceId?: string }): Promise<TokenPair>
verifyRefreshToken(token: string): Promise<{ userId: string; workspaceId?: string }>

// tokens are minted for at most one workspace — omit workspaceId for
// organization-only sessions; switching workspaces issues new tokens`}
					filename="iam-token.service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Issuing tokens</h2>
				<CodeBlock
					code={`import { Injectable } from '@nestjs/common'
import { IamTokenService } from '@turystack/nestjs-iam'
import type { TokenPair } from '@turystack/nestjs-iam'

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: IamTokenService) {}

  // the frontend picks a workspace (or an organization-only session)
  async login(userId: string, workspaceId?: string): Promise<TokenPair> {
    return this.tokenService.issueTokens(userId, { workspaceId })
  }
}`}
					filename="auth.service.ts"
					language="ts"
				/>
				<h3 className="font-display font-medium text-lg">Parameters</h3>
				<PropsTable props={issueTokensParams} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Refreshing tokens
				</h2>
				<CodeBlock
					code={`async refresh(refreshToken: string): Promise<TokenPair> {
  const { userId, workspaceId } = await this.tokenService.verifyRefreshToken(refreshToken)
  return this.tokenService.issueTokens(userId, { workspaceId })
}`}
					filename="auth.service.ts"
					language="ts"
				/>
				<h3 className="font-display font-medium text-lg">Parameters</h3>
				<PropsTable props={verifyRefreshTokenParams} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">TokenPair</h2>
				<PropsTable props={tokenPairProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Secret and expiration options come from{' '}
							<code className="font-mono text-sm">IamModule.register()</code> —
							no need to pass them on every call
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Both tokens are signed with HS256 using the configured secret
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Both tokens carry{' '}
							<code className="font-mono text-sm">userId</code>, plus
							workspaceId when the pair was minted for one — the refresh token
							adds an <code className="font-mono text-sm">rt: true</code> flag
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">verifyRefreshToken</code>{' '}
							rejects access tokens (missing rt flag) and tokens signed with a
							different secret
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="font-mono text-sm">expiresIn</code> is parsed
							from the duration string — supports{' '}
							<code className="font-mono text-sm">s</code>,{' '}
							<code className="font-mono text-sm">m</code>,{' '}
							<code className="font-mono text-sm">h</code>,{' '}
							<code className="font-mono text-sm">d</code> units
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
