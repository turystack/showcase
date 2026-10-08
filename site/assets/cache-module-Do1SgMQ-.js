import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const a=[{description:"The cache adapter to use.",name:"adapter",required:!0,type:"'redis'"},{description:"The Redis connection URL.",name:"redis.url",required:!0,type:"string"},{default:'"fail-open"',description:"Behaviour when the storage is unavailable. fail-open degrades keys, get, exists, set and del to a cache miss; fail-closed propagates every failure. incr and decr always propagate, on both settings.",name:"onError",required:!1,type:"'fail-open' | 'fail-closed'"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"CacheModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"A NestJS DynamicModule that registers the cache service and its Redis connection."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { CacheModule } from '@turystack/nestjs-cache'

CacheModule.register(
  options: CacheModuleOptions | ((config: ConfigService) => CacheModuleOptions),
): DynamicModule`,filename:"cache-module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{tabs:[{code:`import { CacheModule } from '@turystack/nestjs-cache'

@Module({
  imports: [
    CacheModule.register({
      adapter: 'redis',
      redis: { url: 'redis://localhost:6379' },
    }),
  ],
})
export class AppModule {}`,label:"Static"},{code:`import { CacheModule } from '@turystack/nestjs-cache'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({ REDIS_URL: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    CacheModule.register((config) => ({
      adapter: 'redis',
      redis: { url: config.get('REDIS_URL') },
    })),
  ],
})
export class AppModule {}`,label:"From config"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"CacheModuleOptions"}),e.jsx(t,{props:a})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Behaviour when the storage is down"}),e.jsxs("p",{className:"text-muted-foreground",children:["Under the default ",e.jsx("code",{children:"fail-open"}),", a Redis outage degrades the cache instead of taking the route down with it. The fallback is chosen per operation, because the same call means different things to different callers."]}),e.jsx(s,{code:`keys, get, exists   →  served as a miss ([], null, false)
del                 →  reports 0 keys removed
set                 →  reports false — not written
incr, decr          →  always throws, even under fail-open`,filename:"fallbacks",language:"bash"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[e.jsx("code",{children:"set"})," reporting ",e.jsx("code",{children:"false"})," is what keeps"," ",'@turystack/nestjs-lock safe: it reads that return as "lock acquired", so an outage denies the lock instead of granting it to every instance at once.']}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[e.jsx("code",{children:"incr"})," and ",e.jsx("code",{children:"decr"})," are excluded on purpose. They back the counters of @turystack/nestjs-rate-limit, and a silent fallback there would stop enforcing a limit rather than degrade a cache — an availability setting must not turn into a security hole."]})]})]})}export{d as component};
