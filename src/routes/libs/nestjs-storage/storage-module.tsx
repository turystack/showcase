import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-storage/storage-module')({
	component: Page,
})

const options = [
	{
		description: 'Storage adapter. AWS S3 is the built-in option.',
		name: 'adapter',
		required: true,
		type: "'aws-s3'",
	},
	{
		description: 'The AWS region.',
		name: 'aws.region',
		required: true,
		type: 'string',
	},
	{
		description:
			'AWS credentials. Optional — falls back to the default provider chain.',
		name: 'aws.credentials',
		required: false,
		type: '{ accessKeyId, secretAccessKey }',
	},
	{
		description: 'The app bucket. All context operations use it.',
		name: 'bucket',
		required: true,
		type: 'string',
	},
	{
		description:
			'Base URL for PUBLIC objects (e.g. the CDN). Required if any context is PUBLIC.',
		name: 'publicBaseUrl',
		required: false,
		type: 'string',
	},
	{
		description: 'Default presigned-upload TTL in seconds. Default: 300.',
		name: 'uploadTtlSeconds',
		required: false,
		type: 'number',
	},
	{
		description: 'Default presigned-download TTL in seconds. Default: 60.',
		name: 'downloadTtlSeconds',
		required: false,
		type: 'number',
	},
	{
		description:
			'Upload contexts — visibility, size, content types, and key layout per context.',
		name: 'contexts',
		required: false,
		type: 'Record<string, StorageContextDefinition>',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					StorageModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Registers the bucket, the adapter, and the upload contexts — once, in
					the app root. StorageService is then injectable anywhere.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { StorageModule } from '@turystack/nestjs-storage'

StorageModule.register(
  options: StorageModuleOptions | ((config: ConfigService) => StorageModuleOptions),
): DynamicModule`}
					filename="storage-module.d.ts"
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
					code={`// storage.contexts.ts — one object: runtime config AND source of the types
import { defineStorageContexts, type InferStorageContexts } from '@turystack/nestjs-storage'

export const storageContexts = defineStorageContexts({
  USER_AVATAR: {
    visibility: 'PUBLIC',
    slug: 'user-avatar',
    maxSizeBytes: 5 * 1024 * 1024,
    allowedContentTypes: ['image/png', 'image/jpeg', 'image/webp'],
    buildFinalKey: ({ basename }) => \`public/user-avatar/\${basename}\`,
  },
  USER_DOCUMENT: {
    visibility: 'PRIVATE',
    slug: 'user-document',
    maxSizeBytes: 10 * 1024 * 1024,
    allowedContentTypes: ['application/pdf'],
    buildFinalKey: ({ basename, targetId }) =>
      \`private/users/\${targetId}/user-document/\${basename}\`,
  },
})

// derived, never written by hand:
declare module '@turystack/nestjs-storage' {
  interface StorageContextMap extends InferStorageContexts<typeof storageContexts> {}
}

// app.module.ts
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { StorageModule } from '@turystack/nestjs-storage'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  AWS_REGION: z.string(),
  STORAGE_BUCKET: z.string(),
  CDN_BASE_URL: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    StorageModule.register((config) => ({
      adapter: 'aws-s3',
      aws: { region: config.get('AWS_REGION') },
      bucket: config.get('STORAGE_BUCKET'),
      publicBaseUrl: config.get('CDN_BASE_URL'),
      contexts: storageContexts,
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
					StorageModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>
		</div>
	)
}
