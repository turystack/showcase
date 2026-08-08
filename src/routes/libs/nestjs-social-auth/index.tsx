import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-social-auth/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-social-auth
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Social OAuth for NestJS: verifies Google, Facebook, Microsoft, and
					Apple tokens and returns a normalized user profile — or throws 401.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-social-auth',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-social-auth',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-social-auth',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-social-auth',
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
							Verify OAuth tokens from Google, Facebook, Microsoft, and Apple
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Normalized profile output:{' '}
							<code className="font-mono text-sm">
								{'{ id, name, email, avatar }'}
							</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							JWT-based verification for Google, Microsoft, and Apple via{' '}
							<code className="font-mono text-sm">jose</code> — no
							provider-specific SDKs
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Facebook Graph API verification using native{' '}
							<code className="font-mono text-sm">fetch</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Only instantiates adapters for configured providers — no unused
							connections
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Factory-based registration with async config support</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { ConfigModule } from '@turystack/nestjs-config'
import { SocialAuthModule } from '@turystack/nestjs-social-auth'
import { configSchema } from './config.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    SocialAuthModule.register((config) => ({
      google: { clientId: config.get('GOOGLE_CLIENT_ID') },
      facebook: {},
      apple: { clientId: config.get('APPLE_CLIENT_ID') },
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
