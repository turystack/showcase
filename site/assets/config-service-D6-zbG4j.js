import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function o(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"ConfigService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Typed access to the validated environment — get() always returns the exact type the schema declares."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { ConfigService } from '@turystack/nestjs-config'

get<K extends keyof ConfigValues & string>(key: K): ConfigValues[K]`,filename:"config-service.d.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Values were parsed against the schema at boot, so required variables are guaranteed to exist by the time any provider runs. Once the ConfigSchemaRegistry is augmented, an unknown key is a compile error."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Injectable } from '@nestjs/common'
import { ConfigService } from '@turystack/nestjs-config'

@Injectable()
export class CreateReportUseCase {
  constructor(private readonly config: ConfigService) {}

  async execute() {
    const port = this.config.get('PORT') // number — validated at boot
    const dsn = this.config.get('SENTRY_DSN') // string | null

    if (dsn) {
      this.enableErrorReporting(dsn) // this call site decides what null means
    }
  }
}`,filename:"create-report.use-case.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"In Module Factories"}),e.jsx("p",{className:"text-muted-foreground",children:"Every turystack lib module accepts a (config) => options factory that injects this ConfigService — register the modules once at the root and no domain code ever reads process.env:"}),e.jsx(s,{code:`import { Module } from '@nestjs/common'
import { CacheModule } from '@turystack/nestjs-cache'
import { ConfigModule } from '@turystack/nestjs-config'
import { DatabaseModule } from '@turystack/nestjs-database'

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
    CacheModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Notes"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"There is deliberately no getOrThrow — required variables are guaranteed by the boot validation, so get() never needs to throw"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"There is no get(key, default) either — defaults live in the schema (.default(...)), not at the call site, so every consumer sees the same value"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Optionals are | null by schema design (.nullable().default(null)) — each call site handles its own null instead of guessing about undefined"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Without the registry augmentation, ConfigValues falls back to Record<string, unknown> — augment it to get exact types and compile errors on typos"})]})]})]})]})}export{o as component};
