import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const n=[{description:"One zod validator per environment variable — the single source of truth.",name:"schema",required:!0,type:"ConfigSchemaShape"},{default:"'.env'",description:"Path of the env file merged under process.env (process.env wins). Pass false to read process.env only.",name:"envFilePath",required:!1,type:"string | false"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"ConfigModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"A global NestJS DynamicModule that parses the environment against a zod schema at boot and fails fast when anything is missing or invalid."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { ConfigModule } from '@turystack/nestjs-config'

ConfigModule.register(options: ConfigModuleOptions): DynamicModule`,filename:"config-module.d.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The module is global — register it once at the app root and every provider injects ConfigService without importing anything."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Module } from '@nestjs/common'
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
export class AppModule {}`,filename:"app.module.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"At boot the schema parses process.env with the .env file merged underneath — a value set in the real environment always wins over the same key in the file. Pass envFilePath: false to skip file loading and read process.env only."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"ConfigModuleOptions"}),e.jsx(t,{props:n})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Boot Validation"}),e.jsx("p",{className:"text-muted-foreground",children:"Validation happens once, when the module is registered. On failure the application throws before it starts serving, with every missing and invalid variable aggregated into a single error:"}),e.jsx(s,{code:"[ConfigModule] Invalid environment configuration — API_KEY: Invalid input: expected string, received undefined · PORT: Invalid input: expected number, received NaN",filename:"boot.log",language:"bash"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Environment variables outside the schema are stripped — the parsed config contains only the keys the schema declares."})]})]})}export{d as component};
