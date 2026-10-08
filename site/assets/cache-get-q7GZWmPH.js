import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const r=[{description:"A static string or a function that receives the method arguments array and returns the cache key.",name:"key",required:!0,type:"CacheKeyResolver"},{description:"Optional cache options (ttl in seconds, mode).",name:"options",required:!1,type:"CacheOptions"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Cache.Get"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Cache-aside (read-through) decorator: serves the cached value or runs the method and caches the result."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:"Cache.Get(key: string | ((args: unknown[]) => string | Promise<string>), options?: CacheOptions): MethodDecorator",filename:"cache.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Cache } from '@turystack/nestjs-cache'

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  @Cache.Get((args) => \`user:\${args[0]}\`, { ttl: 60 })
  async findById(id: string) {
    return this.repository.findById(id)
  }

  @Cache.Get('users:all', { ttl: 300 })
  async findAll() {
    return this.repository.findAll()
  }
}`,filename:"user.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Parameters"}),e.jsx(t,{props:r})]})]})}export{l as component};
