import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as r}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{description:"The port number to listen on.",name:"port",required:!0,type:"number"},{description:"The API title used in OpenAPI metadata.",name:"title",required:!0,type:"string"},{description:"The API description used in OpenAPI metadata.",name:"description",required:!0,type:"string"},{description:"The API version.",name:"version",required:!1,type:"string (default '1.0')"},{description:"The global route prefix.",name:"globalPrefix",required:!1,type:"string (default 'api')"},{description:"Custom message returned by the health endpoint.",name:"healthMessage",required:!1,type:"string"},{description:"API projects — the OpenAPI document is split per prefix, each with its own openapi json and reference UI.",name:"projects",required:!1,type:"ApiProject[]"},{description:"Extra global interceptors registered before the built-in response transforms.",name:"interceptors",required:!1,type:"NestInterceptor[]"},{description:"The reference UI provider.",name:"docs.provider",required:!0,type:"'scalar'"},{default:'"moon"',description:"The Scalar UI theme.",name:"docs.theme",required:!1,type:"'default' | 'alternate' | 'moon' | 'purple' | 'solarized' | 'bluePlanet' | 'deepSpace' | 'saturn' | 'kepler' | 'elysiajs' | 'fastify' | 'mars' | 'laserwave' | 'none'"},{description:"Favicon URL for the docs page.",name:"docs.favicon",required:!1,type:"string"},{description:"Custom CSS for the docs page.",name:"docs.customCss",required:!1,type:"string"}],i=[{description:"Project identifier.",name:"name",required:!0,type:"string"},{description:"Title displayed in the reference UI of this project.",name:"title",required:!0,type:"string"},{description:"Route prefix that selects the paths of this project. Omit for the default/core project (it takes every path not claimed by other prefixes).",name:"prefix",required:!1,type:"string"},{description:"Scalar theme for this project. Falls back to docs.theme.",name:"theme",required:!1,type:"'default' | 'alternate' | 'moon' | 'purple' | 'solarized' | 'bluePlanet' | 'deepSpace' | 'saturn' | 'kepler' | 'elysiajs' | 'fastify' | 'mars' | 'laserwave' | 'none'"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Factory"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Bootstraps a NestJS app with CORS, versioning, Zod validation, response transforms, health check, and OpenAPI docs wired in."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { Server } from '@turystack/nestjs-server'

Server.create(
  module: Type<any>,
  options: ServerOptions | ((config: ConfigService) => ServerOptions),
): Promise<INestApplication>`,filename:"server.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { Server } from '@turystack/nestjs-server'

await Server.create(AppModule, (config) => ({
  port: config.get('PORT'),
  title: 'My API',
  description: 'API description',
  healthMessage: 'my api is healthy',
  docs: {
    provider: 'scalar',
    favicon: 'https://example.com/favicon.svg',
    theme: 'default',
  },
}))`,filename:"main.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The factory form resolves the typed ConfigService after Nest bootstraps. Register ConfigModule with the app config schema; static options remain supported for tests and fixed environments."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Multiple projects"}),e.jsx("p",{className:"text-muted-foreground",children:"Declare projects to split the generated OpenAPI document by route prefix — each project gets its own openapi json and its own reference UI, with its own title and theme. The project without a prefix takes every path not claimed by the others."}),e.jsx(t,{code:`await Server.create(AppModule, (config) => ({
  port: config.get('PORT'),
  title: 'My API',
  description: 'API description',
  docs: { provider: 'scalar', theme: 'default' },
  projects: [
    { name: 'main', title: 'Main API' }, // unprefixed routes
    { name: 'console', prefix: 'console', theme: 'moon', title: 'Console API' },
    { name: 'partner', prefix: 'partner', theme: 'purple', title: 'Partner API' },
  ],
}))

// GET /api/v1/openapi            → Main API spec
// GET /api/v1/reference          → Main API reference
// GET /api/v1/console/openapi    → Console API spec (only console/* routes)
// GET /api/v1/console/reference  → Console API reference
// GET /api/v1/partner/openapi    → Partner API spec
// GET /api/v1/partner/reference  → Partner API reference`,filename:"main.ts",language:"ts"}),e.jsx(r,{props:i})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Built-in Endpoints"}),e.jsx(t,{code:`GET /health                        # Health check ({ message, status })
GET /{prefix}/openapi              # OpenAPI JSON spec (single project)
GET /{prefix}/reference            # Reference UI (single project)
GET /{prefix}/v1/{project}/openapi # Per-project OpenAPI JSON (with projects)
GET /{prefix}/v1/{project}/reference # Per-project reference UI`,filename:"endpoints",language:"bash"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"ServerOptions"}),e.jsx(r,{props:s})]})]})}export{l as component};
