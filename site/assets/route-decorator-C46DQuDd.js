import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const a=[{description:"HTTP method for the route.",name:"method",required:!0,type:"'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'"},{description:"Route path appended to the controller prefix.",name:"path",required:!1,type:"string"},{description:"Swagger operation summary.",name:"summary",required:!0,type:"string"},{description:"Swagger operation description.",name:"description",required:!0,type:"string"},{description:"API version number.",name:"version",required:!1,type:"number (default 1)"},{description:"Request validation schemas (RouteParameters).",name:"parameters",required:!1,type:"RouteParameters"},{description:"Response schemas by HTTP status code (RouteResponses).",name:"responses",required:!1,type:"RouteResponses"}],r=[{description:"Zod schema for URL path parameters.",name:"params",required:!1,type:"ZodObject"},{description:"Zod schema for query string. Supports intersections.",name:"query",required:!1,type:"ZodObject | ZodIntersection"},{description:"Zod schema for the request body.",name:"body",required:!1,type:"ZodSchema"},{description:"Zod schema for request headers.",name:"headers",required:!1,type:"ZodObject"}],o=[{description:"Success response schema.",name:"200",required:!1,type:"ZodSchema"},{description:"Created response schema.",name:"201",required:!1,type:"ZodSchema"},{description:"No Content response.",name:"204",required:!1,type:"{ description: string }"},{description:"Exception classes from the @turystack/exceptions catalog this route can return — status, code, and OpenAPI examples are derived from the classes; every error response references the named Exception model in components.schemas, so the SDK generates a single Exception type.",name:"exceptions",required:!1,type:"RouteExceptionClass[]"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Route"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Method decorator that merges HTTP method, Swagger docs, and Zod validation into one declaration."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { Route, type RouteParameters, type RouteResponses } from '@turystack/nestjs-server'

@Route(options: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path?: string
  summary: string
  description: string
  version?: number
  parameters?: RouteParameters
  responses?: RouteResponses
})`,filename:"route.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { z } from 'zod'

import { exceptions } from './exceptions'

const UserResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

const schema = createRequestSchema({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ name: z.string() }),
})

@Controller({ path: 'users', tag: 'Users' })
class UsersController {
  @Route({
    method: 'PUT',
    path: ':id',
    summary: 'Update User',
    description: 'Updates a user by ID',
    parameters: { params: schema.params, body: schema.body },
    responses: {
      200: UserResponse,
      exceptions: [exceptions.user.notFound],
    },
  })
  async update(@Request(schema) req: RequestInput<typeof schema>) {
    // req.params.id is a validated UUID
    // req.body.name is a validated string
  }
}`,filename:"users.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Custom methods — actions use ::verb"}),e.jsxs("p",{className:"text-muted-foreground",children:["A business action on a resource is never a path segment — it is a custom method, always POST. Declare it with the turystack syntax"," ",e.jsx("code",{children:"::verb"}),": the decorator converts it internally to the escaped form the Express 5 path matcher requires (the pattern NestJS documents for reserved characters), so no escape ever appears in project code. The final URL keeps a single colon."]}),e.jsx(s,{code:`import { exceptions } from './exceptions'

@Route({
  method: 'POST',
  path: ':invoice_id::pay',   // matches POST /invoices/inv-123:pay
  summary: 'Pay Invoice',
  description: 'Pays an invoice.',
  parameters: { params: schema.params },
  responses: { 200: InvoiceResponse, exceptions: [exceptions.invoice.notFound] },
})
async pay(@Request(schema) req: RequestInput<typeof schema>) {}

@Route({
  method: 'POST',
  path: 'reports::generate',   // collection-level: POST /invoices/reports:generate
  summary: 'Generate Report',
  description: 'Generates a report.',
})
async generate() {}`,filename:"invoices.controller.ts",language:"ts"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Never ",e.jsx("code",{children:"path: ':invoice_id/pay'"})," — a verb is not a path segment; segments are resources and relationships"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["A ",e.jsx("code",{children:"::verb"})," on anything other than POST throws at boot: [Route] custom method path ':invoice_id::pay' requires method POST"]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RouteOptions"}),e.jsx(t,{props:a})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RouteParameters"}),e.jsxs("p",{className:"mb-4 text-muted-foreground",children:["Zod schemas for request validation, passed via the"," ",e.jsx("code",{children:"parameters"})," option."]}),e.jsx(t,{props:r})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RouteResponses"}),e.jsxs("p",{className:"mb-4 text-muted-foreground",children:["Response schemas keyed by HTTP status code, passed via the"," ",e.jsx("code",{children:"responses"})," option. Default 400 and 500 error responses are always included automatically."]}),e.jsx(t,{props:o})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What it does"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Applies the correct HTTP method decorator (@Get, @Post, etc.)"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Generates @ApiParam, @ApiQuery, @ApiHeader, @ApiBody, and @ApiResponse from Zod schemas"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Sets @ApiOperation with summary and description"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Adds default 400 and 500 error response schemas"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Applies URI versioning (default v1)"})]})]})]})]})}export{l as component};
