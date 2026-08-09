import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-storage/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-storage
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Define each upload context once; call sites just pass the context
					name. AWS S3 built-in.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-storage',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-storage',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-storage',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-storage',
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
						<span>Pluggable storage adapters — AWS S3 built-in</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Typed upload contexts — params defined once, typed via
							StorageContextMap
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Presigned POST uploads — content type and max size enforced by
							policy
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Temp → commit flow with one-call resolvers for update inputs
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { ConfigModule } from '@turystack/nestjs-config'
import { StorageModule } from '@turystack/nestjs-storage'
import { configSchema } from './config.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    StorageModule.register((config) => ({
      adapter: 'aws-s3',
      aws: { region: config.get('AWS_REGION') },
      bucket: config.get('STORAGE_BUCKET'),
      publicBaseUrl: config.get('CDN_BASE_URL'),
      contexts: {
        USER_AVATAR: {
          visibility: 'PUBLIC',
          slug: 'user-avatar',
          maxSizeBytes: 5 * 1024 * 1024,
          allowedContentTypes: ['image/png', 'image/jpeg', 'image/webp'],
          buildFinalKey: ({ basename }) => \`public/user-avatar/\${basename}\`,
        },
      },
    })),
  ],
})
export class AppModule {}

// then, in any use case — the user as the commit target:
const avatar = await this.storage.resolvePublicUpload({
  context: 'USER_AVATAR',
  value: input.avatar,
  targetId: userId,
})`}
					filename="app.module.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
