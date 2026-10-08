import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Schema & Typing"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"defineConfigSchema plus the ConfigSchemaRegistry augmentation type get() in every file of the project."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"defineConfigSchema"}),e.jsx(s,{code:`import { defineConfigSchema } from '@turystack/nestjs-config'

defineConfigSchema<T extends ConfigSchemaShape>(schema: T): T`,filename:"config-schema.d.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"An identity helper: it returns the schema unchanged but preserves its exact type, which is what the registry augmentation needs. ConfigSchemaShape is one zod validator per environment variable."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"ConfigSchemaRegistry"}),e.jsx("p",{className:"text-muted-foreground",children:"ConfigSchemaRegistry is an empty interface the consumer augments via declare module — the same global-typing pattern as the database and publisher registries. Define the schema once, augment once, and get() is typed everywhere without imports:"}),e.jsx(s,{code:`import { defineConfigSchema } from '@turystack/nestjs-config'
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
}`,filename:"config.schema.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Without the augmentation, ConfigValues falls back to Record<string, unknown> — with it, config.get('PORT') is number, config.get('SENTRY_DSN') is string | null, and config.get('TYPO') is a compile error."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Schema Recipes"}),e.jsx("p",{className:"text-muted-foreground",children:"Environment values arrive as strings — the schema is where they become real types:"}),e.jsx(s,{code:`PORT: z.coerce.number().default(3000) // '8080' -> 8080

NODE_ENV: z.enum(['development', 'production', 'test']).default('development')

CACHE_ENABLED: z.stringbool().default(false) // 'true'/'1'/'yes'/'on' -> true

SENTRY_DSN: z.string().nullable().default(null) // optional-as-null convention`,filename:"recipes.ts",language:"ts"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Booleans: use z.stringbool() (zod v4) — it parses env-style strings like 'true'/'false', '1'/'0', 'yes'/'no', 'on'/'off' and rejects anything else. Avoid z.coerce.boolean(): it is Boolean(input), so the string 'false' coerces to true"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Optionals: .nullable().default(null) — the value is string | null, never undefined, and each call site handles its own null"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Defaults live in the schema, not at call sites — every consumer of config.get() sees the same value"})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:".env.example Discipline"}),e.jsx("p",{className:"text-muted-foreground",children:"Every variable the schema declares is documented in .env.example — the schema is the source of truth for validation, the example file is the source of truth for humans setting up the project:"}),e.jsx(s,{code:`# required
DATABASE_URL=postgres://localhost:5432/app

# optional — defaults to 3000
PORT=3000

# optional — defaults to development
NODE_ENV=development

# optional — defaults to false
CACHE_ENABLED=false

# optional — defaults to null (error reporting off)
# SENTRY_DSN=https://key@sentry.io/123`,filename:".env.example",language:"bash"})]})]})}export{l as component};
