import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function o(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-config"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Schema-first typed config: zod validates process.env at boot and get() always returns the exact type the schema declares."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"pnpm add @turystack/nestjs-config zod",label:"pnpm"},{code:"npm install @turystack/nestjs-config zod",label:"npm"},{code:"yarn add @turystack/nestjs-config zod",label:"yarn"},{code:"bun add @turystack/nestjs-config zod",label:"bun"}]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),e.jsx(s,{code:`import { defineConfigSchema } from '@turystack/nestjs-config'
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
}`,filename:"config.schema.ts",language:"ts"}),e.jsx(s,{code:`import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'

import { configSchema } from './config.schema'
import { databaseSchema } from './database.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    DatabaseModule.register((config) => ({
      adapter: 'postgresql',
      postgresql: { url: config.get('DATABASE_URL') },
      schemaResolver: databaseSchema,
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"}),e.jsx(s,{code:`config.get('PORT')        // number — validated at boot
config.get('SENTRY_DSN')  // string | null — each call site handles its null
config.get('TYPO')        // compile error — key is not in the schema`,filename:"anywhere.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["register(","{"," schema ","}",") is global — once at the app root. At boot it parses process.env (with .env merged underneath) and fails fast listing every missing/invalid variable at once"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"No getOrThrow: required vars are guaranteed by the boot validation; optional vars are typed | null in the schema (.nullable().default(null)) and each scenario handles its own"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Typing flows through the ConfigSchemaRegistry augmentation — the same declare module pattern as the database and publisher registries — so get() is typed in any file of the project"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Every turystack lib module injects this ConfigService in its (config) => options factory form — register the modules once at the root and no domain code ever reads process.env"})]})]})]})]})}export{o as component};
