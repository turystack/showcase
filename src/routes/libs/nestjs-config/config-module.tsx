import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-config/config-module')({
	component: Page,
})

const options = [
	{
		description:
			'One zod validator per environment variable — the single source of truth.',
		name: 'schema',
		required: true,
		type: 'ConfigSchemaShape',
	},
	{
		default: "'.env'",
		description:
			'Path of the env file merged under process.env (process.env wins). Pass false to read process.env only.',
		name: 'envFilePath',
		required: false,
		type: 'string | false',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ConfigModule
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A global NestJS DynamicModule that parses the environment against a
					zod schema at boot and fails fast when anything is missing or invalid.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { ConfigModule } from '@turystack/nestjs-config'

ConfigModule.register(options: ConfigModuleOptions): DynamicModule`}
					filename="config-module.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The module is global — register it once at the app root and every
					provider injects ConfigService without importing anything.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  SENTRY_DSN: z.string().nullable().default(null),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
  ],
})
export class AppModule {}`}
					filename="app.module.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					At boot the schema parses process.env with the .env file merged
					underneath — a value set in the real environment always wins over the
					same key in the file. Pass envFilePath: false to skip file loading and
					read process.env only.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					ConfigModuleOptions
				</h2>
				<PropsTable props={options} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Boot Validation</h2>
				<p className="text-muted-foreground">
					Validation happens once, when the module is registered. On failure the
					application throws before it starts serving, with every missing and
					invalid variable aggregated into a single error:
				</p>
				<CodeBlock
					code={`[ConfigModule] Invalid environment configuration — API_KEY: Invalid input: expected string, received undefined · PORT: Invalid input: expected number, received NaN`}
					filename="boot.log"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Environment variables outside the schema are stripped — the parsed
					config contains only the keys the schema declares.
				</p>
			</div>
		</div>
	)
}
