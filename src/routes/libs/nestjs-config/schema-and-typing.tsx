import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-config/schema-and-typing')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Schema & Typing
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					defineConfigSchema plus the ConfigSchemaRegistry augmentation type
					get() in every file of the project.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					defineConfigSchema
				</h2>
				<CodeBlock
					code={`import { defineConfigSchema } from '@turystack/nestjs-config'

defineConfigSchema<T extends ConfigSchemaShape>(schema: T): T`}
					filename="config-schema.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					An identity helper: it returns the schema unchanged but preserves its
					exact type, which is what the registry augmentation needs.
					ConfigSchemaShape is one zod validator per environment variable.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					ConfigSchemaRegistry
				</h2>
				<p className="text-muted-foreground">
					ConfigSchemaRegistry is an empty interface the consumer augments via
					declare module — the same global-typing pattern as the database and
					publisher registries. Define the schema once, augment once, and get()
					is typed everywhere without imports:
				</p>
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
				<p className="text-muted-foreground text-sm">
					Without the augmentation, ConfigValues falls back to Record&lt;string,
					unknown&gt; — with it, config.get('PORT') is number,
					config.get('SENTRY_DSN') is string | null, and config.get('TYPO') is a
					compile error.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Schema Recipes</h2>
				<p className="text-muted-foreground">
					Environment values arrive as strings — the schema is where they become
					real types:
				</p>
				<CodeBlock
					code={`PORT: z.coerce.number().default(3000) // '8080' -> 8080

NODE_ENV: z.enum(['development', 'production', 'test']).default('development')

CACHE_ENABLED: z.stringbool().default(false) // 'true'/'1'/'yes'/'on' -> true

SENTRY_DSN: z.string().nullable().default(null) // optional-as-null convention`}
					filename="recipes.ts"
					language="ts"
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Booleans: use z.stringbool() (zod v4) — it parses env-style
							strings like 'true'/'false', '1'/'0', 'yes'/'no', 'on'/'off' and
							rejects anything else. Avoid z.coerce.boolean(): it is
							Boolean(input), so the string 'false' coerces to true
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Optionals: .nullable().default(null) — the value is string | null,
							never undefined, and each call site handles its own null
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Defaults live in the schema, not at call sites — every consumer of
							config.get() sees the same value
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					.env.example Discipline
				</h2>
				<p className="text-muted-foreground">
					Every variable the schema declares is documented in .env.example — the
					schema is the source of truth for validation, the example file is the
					source of truth for humans setting up the project:
				</p>
				<CodeBlock
					code={`# required
DATABASE_URL=postgres://localhost:5432/app

# optional — defaults to 3000
PORT=3000

# optional — defaults to development
NODE_ENV=development

# optional — defaults to false
CACHE_ENABLED=false

# optional — defaults to null (error reporting off)
# SENTRY_DSN=https://key@sentry.io/123`}
					filename=".env.example"
					language="bash"
				/>
			</div>
		</div>
	)
}
