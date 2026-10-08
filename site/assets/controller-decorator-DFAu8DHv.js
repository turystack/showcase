import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const r=[{description:"Route path for all endpoints in the controller. Inherited from NestJS ControllerOptions.",name:"path",required:!1,type:"string | string[]"},{description:"Swagger tag name for grouping endpoints.",name:"tag",required:!0,type:"string"},{description:"Route prefix prepended to all routes (e.g. 'ops' → api/v1/ops/...). Core controllers omit it.",name:"prefix",required:!1,type:"string"},{description:"Extra Zod schemas to register as Swagger models (key = model name).",name:"schemas",required:!1,type:"Record<string, { schema: ZodSchema }>"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Controller"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Wraps @Controller with a Swagger tag and optional Zod schema registration as OpenAPI models."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { Controller } from '@turystack/nestjs-server'

@Controller(options: {
  path?: string | string[]
  tag: string
  prefix?: string
  schemas?: Record<string, { schema: ZodSchema }>
})`,filename:"controller.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Controller } from '@turystack/nestjs-server'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

@Controller({
  path: 'users',
  tag: 'Users',
  schemas: { User: { schema: UserSchema } },
})
class UsersController {
  // ...
}`,filename:"users.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"ControllerOptions"}),e.jsx(t,{props:r})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What it does"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Registers the controller route path prefix"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Applies @ApiTags with the provided tag name for Swagger grouping"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Registers Zod schemas as @ApiExtraModels for OpenAPI documentation"})]})]})]})]})}export{c as component};
