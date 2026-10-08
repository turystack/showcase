import{j as e}from"./index-B7Ig6kNO.js";import{C as o}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{description:"The cache adapter to use.",name:"adapter",required:!0,type:"'redis'"},{description:"Redis connection URL.",name:"redis.url",required:!0,type:"string"},{default:'"fail-open"',description:"Behaviour when the storage is unavailable, passed through to the CacheModule this registers. Under fail-open a failed write reports false, so an outage denies the lock instead of granting it.",name:"onError",required:!1,type:"'fail-open' | 'fail-closed'"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"LockModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Dynamic module that registers the LockService, using its own Redis connection or the existing CacheModule."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(o,{code:`import { CacheModule } from '@turystack/nestjs-cache'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { LockModule } from '@turystack/nestjs-lock'
import { z } from 'zod'

const configSchema = defineConfigSchema({ REDIS_URL: z.string() })

// Preferred: reuse the app-wide connection from CacheModule
// (registrations are global — one connection shared by cache, lock, and rate-limit)
@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    CacheModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
    LockModule.register(),
  ],
})
export class AppModule {}

// Standalone: dedicated connection (only when isolation is intentional)
// register also accepts a plain options object
@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    LockModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Options"}),e.jsxs("p",{className:"text-muted-foreground",children:["The entire ",e.jsx("code",{className:"text-sm",children:"options"})," object is optional. When omitted, the module reuses the existing CacheModule from DI. When provided, it mirrors CacheModuleOptions — adapter and redis.url are required."]}),e.jsx(t,{props:s})]})]})}export{d as component};
