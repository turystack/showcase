import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute(
	'/libs/nestjs-social-auth/social-auth-module',
)({
	component: Page,
})

const providerConfigProps = [
	{
		description:
			'Google configuration. Requires clientId for JWT audience validation.',
		name: 'google',
		required: false,
		type: '{ clientId: string }',
	},
	{
		description:
			'Facebook configuration. No credentials needed — uses access token directly.',
		name: 'facebook',
		required: false,
		type: '{}',
	},
	{
		description:
			'Microsoft configuration. Optional tenantId (defaults to "common" for multi-tenant).',
		name: 'microsoft',
		required: false,
		type: '{ tenantId?: string }',
	},
	{
		description:
			'Apple configuration. Requires clientId (Services ID) for JWT audience validation.',
		name: 'apple',
		required: false,
		type: '{ clientId: string }',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					SocialAuthModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					DynamicModule that registers the social auth adapters. Only the
					providers you configure are instantiated.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { SocialAuthModule } from '@turystack/nestjs-social-auth'

SocialAuthModule.register(
  options: SocialAuthModuleOptions | ((config: ConfigService) => SocialAuthModuleOptions),
): DynamicModule`}
					filename="social-auth.module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form injects the ConfigService from
					@turystack/nestjs-config — requires ConfigModule.register({'{'} schema{' '}
					{'}'}) in the app. register also accepts a plain options object.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { SocialAuthModule } from '@turystack/nestjs-social-auth'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  GOOGLE_CLIENT_ID: z.string(),
  AZURE_TENANT_ID: z.string().nullable().default(null),
  APPLE_CLIENT_ID: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    SocialAuthModule.register((config) => ({
      google: { clientId: config.get('GOOGLE_CLIENT_ID') },
      facebook: {},
      microsoft: { tenantId: config.get('AZURE_TENANT_ID') ?? undefined },
      apple: { clientId: config.get('APPLE_CLIENT_ID') },
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
					SocialAuthModuleOptions
				</h2>
				<p className="text-muted-foreground">
					Each key enables a specific provider. Omit a key to disable it.
				</p>
				<PropsTable props={providerConfigProps} />
			</div>
		</div>
	)
}
