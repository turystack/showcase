import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as o}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const i=[{description:"The cache adapter to use.",name:"adapter",required:!0,type:"'redis'"},{description:"Redis connection URL.",name:"redis.url",required:!0,type:"string"},{default:'"fail-open"',description:"Behaviour when the storage is unavailable, passed through to the CacheModule this registers. It does not affect enforcement: the counters behind consume always propagate a storage failure.",name:"onError",required:!1,type:"'fail-open' | 'fail-closed'"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"RateLimitModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Dynamic module that registers the RateLimitService, using its own Redis connection or the existing CacheModule."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { CacheModule } from '@turystack/nestjs-cache'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { RateLimitModule } from '@turystack/nestjs-rate-limit'
import { z } from 'zod'

// Preferred: reuse the app-wide connection from CacheModule
// (registrations are global — one connection shared by cache, lock, and rate-limit)
@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
    RateLimitModule.register(),
  ],
})
export class AppModule {}

// Standalone: dedicated connection (only when isolation is intentional)
// register also accepts a plain options object
const configSchema = defineConfigSchema({ REDIS_URL: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    RateLimitModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Options"}),e.jsxs("p",{className:"text-muted-foreground",children:["The entire ",e.jsx("code",{className:"text-sm",children:"options"})," object is optional. When omitted, the module reuses the existing CacheModule from DI. When provided, it mirrors CacheModuleOptions — adapter and redis.url are required."]}),e.jsx(o,{props:i})]})]})}export{c as component};
