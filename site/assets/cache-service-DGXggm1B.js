import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const i=[{description:"Set mode. 'NX' sets only if key does not exist, 'XX' sets only if key exists.",name:"mode",required:!1,type:"'NX' | 'XX'"},{description:"Time-to-live in seconds. Defaults to 3600 (1 hour).",name:"ttl",required:!1,type:"number"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"CacheService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Injectable service that exposes all cache operations with automatic superjson serialization."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Methods"}),e.jsx(s,{code:`keys(pattern: string): Promise<string[]>

get<T>(key: string): Promise<T | null>

set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean>

exists(key: string): Promise<boolean>

incr(key: string, options?: { ttl?: number; expiry?: 'always' | 'on-create' }): Promise<number>

decr(key: string): Promise<number>

del(keys: string[]): Promise<number>`,filename:"cache-service.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { CacheService } from '@turystack/nestjs-cache'

@Injectable()
export class UserService {
  constructor(private readonly cache: CacheService) {}

  async findById(id: string) {
    const cached = await this.cache.get<User>(\`user:\${id}\`)
    if (cached) return cached

    const user = await this.repository.findById(id)
    await this.cache.set(\`user:\${id}\`, user, { ttl: 60 })
    return user
  }
}`,filename:"user.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"CacheOptions"}),e.jsx(t,{props:i})]})]})}export{l as component};
