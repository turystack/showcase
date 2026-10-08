import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const t=[{description:"Zod schema to validate URL path parameters.",name:"params",required:!1,type:"ZodType"},{description:"Zod schema to validate query string parameters.",name:"query",required:!1,type:"ZodType"},{description:"Zod schema to validate the request body.",name:"body",required:!1,type:"ZodType"},{description:"Zod schema to validate request headers.",name:"headers",required:!1,type:"ZodType"}],r=[{description:"Validated and typed path parameters.",name:"params",required:!1,type:'z.infer<T["params"]>'},{description:"Validated and typed query parameters.",name:"query",required:!1,type:'z.infer<T["query"]>'},{description:"Validated and typed request body.",name:"body",required:!1,type:'z.infer<T["body"]>'},{description:"Validated headers or raw Record<string, string>.",name:"headers",required:!1,type:'z.infer<T["headers"]> | Record<string, string>'},{description:"Client IP resolved from x-forwarded-for, falling back to the socket. Null when neither is available.",name:"ip",required:!0,type:"string | null"},{description:"Raw request body buffer for webhook signature verification.",name:"rawBody",required:!0,type:"Buffer"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Request"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Parameter decorator that validates params, query, body, and headers with Zod. Invalid input throws a structured BadRequestException."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'

const schema = createRequestSchema({
  params?: ZodType,
  query?: ZodType,
  body?: ZodType,
  headers?: ZodType,
})

@Request(schema) req: RequestInput<typeof schema>`,filename:"request.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { z } from 'zod'

const schema = createRequestSchema({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ name: z.string(), email: z.string().email() }),
})

@Controller({ path: 'users', tag: 'Users' })
class UsersController {
  @Route({
    method: 'PUT',
    path: ':id',
    summary: 'Update User',
    description: 'Updates a user by ID',
    parameters: { params: schema.params, body: schema.body },
    responses: { 200: UserResponseSchema },
  })
  async update(@Request(schema) req: RequestInput<typeof schema>) {
    req.params.id    // string (validated UUID)
    req.body.name    // string (validated)
    req.body.email   // string (validated email)
    req.rawBody      // Buffer
  }
}`,filename:"users.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"createRequestSchema"}),e.jsxs("p",{className:"text-muted-foreground",children:["Identity helper that preserves the schema type. Use it to define request schemas so that ",e.jsx("code",{children:"RequestInput"})," can infer the correct types."]}),e.jsx(s,{code:`import { createRequestSchema } from '@turystack/nestjs-server'
import { z } from 'zod'

const schema = createRequestSchema({
  params: z.object({ id: z.string().uuid() }),
  query: z.object({ page: z.coerce.number().default(1) }),
  body: z.object({ name: z.string(), email: z.string().email() }),
})

schema.params
schema.query
schema.body`,filename:"schema.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RequestSchema"}),e.jsx(a,{props:t})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["RequestInput","<T>"]}),e.jsxs("p",{className:"mb-4 text-muted-foreground",children:["The inferred type of a validated request. Each field is typed based on the Zod schemas provided to ",e.jsx("code",{children:"createRequestSchema"}),"."]}),e.jsx(a,{props:r})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What it does"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Validates params, query, body, and headers independently using Zod"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Throws a structured BadRequestException with field-level errors"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Provides ",e.jsx("code",{children:"rawBody"})," Buffer for webhook signature verification"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Returns a fully typed object via ",e.jsxs("code",{children:["RequestInput","<T>"]})]})]})]})]})]})}export{l as component};
