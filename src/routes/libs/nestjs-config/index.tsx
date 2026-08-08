import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-config/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-config
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Schema-first typed config: zod validates process.env at boot and get()
					always returns the exact type the schema declares.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'pnpm add @turystack/nestjs-config zod',
							label: 'pnpm',
						},
						{
							code: 'npm install @turystack/nestjs-config zod',
							label: 'npm',
						},
						{
							code: 'yarn add @turystack/nestjs-config zod',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-config zod',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

export const configSchema = defineConfigSchema({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  SENTRY_DSN: z.string().nullable().default(null),
})

declare module '@turystack/nestjs-config' {
  interface ConfigSchemaRegistry {
    schema: typeof configSchema
  }
}`}
					filename="config.schema.ts"
					language="ts"
				/>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'

import { configSchema } from './config.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'postgresql',
      postgresql: { url: config.get('DATABASE_URL') },
    })),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
				<CodeBlock
					code={`config.get('PORT')        // number — validated at boot
config.get('SENTRY_DSN')  // string | null — each call site handles its null
config.get('TYPO')        // compile error — key is not in the schema`}
					filename="anywhere.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							register({'{'} schema {'}'}) is global — once at the app root. At
							boot it parses process.env (with .env merged underneath) and fails
							fast listing every missing/invalid variable at once
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							No getOrThrow: required vars are guaranteed by the boot
							validation; optional vars are typed | null in the schema
							(.nullable().default(null)) and each scenario handles its own
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Typing flows through the ConfigSchemaRegistry augmentation — the
							same declare module pattern as the database and publisher
							registries — so get() is typed in any file of the project
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Every turystack lib module injects this ConfigService in its
							(config) =&gt; options factory form — register the modules once at
							the root and no domain code ever reads process.env
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
