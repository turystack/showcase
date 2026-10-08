import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as o}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{default:'"idempotency"',description:"Prefix for every stored key.",name:"prefix",required:!1,type:"string"},{default:"86400",description:"How long a key is remembered, in seconds. Overridable per operation.",name:"ttl",required:!1,type:"number"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"IdempotencyModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Registers idempotency for the whole application."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { IdempotencyModule } from '@turystack/nestjs-idempotency'

IdempotencyModule.register(
  options?:
    | IdempotencyModuleOptions
    | ((config: ConfigService) => IdempotencyModuleOptions),
): DynamicModule`,filename:"idempotency.module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"IdempotencyModuleOptions"}),e.jsx(o,{props:s})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Requirements"}),e.jsx("p",{className:"text-muted-foreground",children:"CacheModule provides the storage and LockModule the mutual exclusion while an execution is in flight. Both must be registered at the root."}),e.jsx(t,{tabs:[{code:`@Module({
  imports: [
    CacheModule.register({ adapter: 'redis', redis: { url } }),
    LockModule.register(),
    IdempotencyModule.register({ ttl: 604_800 }),
  ],
})
export class AppModule {}`,label:"Static"},{code:`import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  IDEMPOTENCY_TTL: z.coerce.number(),
  REDIS_URL: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    CacheModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
    LockModule.register(),
    IdempotencyModule.register((config) => ({
      ttl: config.get('IDEMPOTENCY_TTL'),
    })),
  ],
})
export class AppModule {}`,label:"From config"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Picking a TTL"}),e.jsx("p",{className:"text-muted-foreground",children:"The window has to outlive every retry the caller might make. A payment gateway that retries a webhook for days needs days; an internal request that gives up in a minute does not."})]})]})}export{l as component};
