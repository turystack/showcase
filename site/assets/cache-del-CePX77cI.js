import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const r=[{description:"A static string, array of strings, or a function that receives the method arguments array and returns the cache key(s) to delete.",name:"key",required:!0,type:"CacheDelKeyResolver"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Cache.Del"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Method decorator that deletes the resolved cache key(s) after the method runs. Deletion errors are logged, not propagated."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:"Cache.Del(key: string | string[] | ((args: unknown[]) => string | string[] | Promise<string | string[]>)): MethodDecorator",filename:"cache.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Cache } from '@turystack/nestjs-cache'

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  @Cache.Del((args) => \`user:\${args[0]}\`)
  async remove(id: string) {
    return this.repository.delete(id)
  }

  @Cache.Del((args) => [\`user:\${args[0]}\`, 'users:all'])
  async update(id: string, data: UpdateUserDto) {
    return this.repository.update(id, data)
  }
}`,filename:"user.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Parameters"}),e.jsx(t,{props:r})]})]})}export{l as component};
