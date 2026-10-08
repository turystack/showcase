import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const a=[{description:"bootstrap, CORS, Zod, OpenAPI + Scalar",name:"@turystack/nestjs-server"},{description:"env validated at boot, read through a service",name:"@turystack/nestjs-config"},{description:"the request context every module reads",name:"@turystack/nestjs-context"},{description:"Drizzle on Postgres, audit columns stamped",name:"@turystack/nestjs-database"},{description:"session guard, profile and permission checks",name:"@turystack/nestjs-iam"},{description:"the authorization server: code + PKCE",name:"@turystack/nestjs-oauth"},{description:"Apple and Google sign-in",name:"@turystack/nestjs-social-auth"},{description:"shared field schemas: names, e-mail, ints",name:"@turystack/fields"},{description:"entity, exceptions and query primitives",name:"@turystack/entity · exceptions · query-dsl"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"API — Stack & Structure"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"apps/api is born with every repository create writes. There is no standalone API command: it is one app of the monorepo."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Native libraries"}),e.jsx("p",{className:"text-muted-foreground",children:"These always come in — they are the stack, not options."}),e.jsx("ul",{className:"space-y-2 text-muted-foreground",children:a.map(t=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:t.name})," —"," ",t.description]})]},t.name))})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Folder structure"}),e.jsx("p",{className:"text-muted-foreground",children:"Controllers are the HTTP surface. The rules live in domains/iam, and the schema in libs/database — the API only wires them."}),e.jsx(s,{code:`apps/api/
├── src/
│   ├── controllers/
│   │   ├── auth/            # sign-up, sign-in, codes, providers
│   │   ├── console/         # one organization, from the session
│   │   └── backoffice/      # the operator, across organizations
│   ├── app.module.ts        # config, database, iam, oauth, social auth
│   ├── iam-domain.module.ts # provides the @acme/iam use cases
│   ├── config.schema.ts     # validates the environment at boot
│   ├── seed.ts              # platform organization, roles, permissions
│   └── main.ts              # Server.create — one document per audience
├── vitest.config.ts
├── vitest.e2e.config.ts
└── package.json`,filename:"apps/api",language:"bash"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Scripts"}),e.jsx(s,{code:`{
  "build": "tsc -b tsconfig.build.json && tsc-alias -p tsconfig.build.json",
  "db:seed": "tsx src/seed.ts",
  "dev": "tsx watch src/main.ts",
  "start": "node dist/main.js",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:e2e": "vitest run --config vitest.e2e.config.ts",
  "check": "biome check ."
}`,filename:"apps/api/package.json",language:"json"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Migrations run from the root: pnpm db:generate and pnpm db:migrate point at libs/database; pnpm db:seed runs this seed."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Local infra"}),e.jsx("p",{className:"text-muted-foreground",children:"The root docker-compose.yml brings up Postgres. User, password and database are the project name, as in DATABASE_URL."}),e.jsx(s,{code:`services:
  postgres:
    image: postgres:16-alpine
    ports:
      - '\${DATABASE_PORT:-5432}:5432'
    environment:
      POSTGRES_USER: acme
      POSTGRES_PASSWORD: acme
      POSTGRES_DB: acme`,filename:"docker-compose.yml",language:"yaml"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"API format: multi-audience"}),e.jsx("p",{className:"text-muted-foreground",children:"One app, several API surfaces. Each project gets its own prefix, OpenAPI document and Scalar reference."}),e.jsx(s,{code:`src/controllers/
├── auth/          # sign-in, sign-up, social
│   └── auth.controller.ts
├── console/       # one organization, from the session
│   └── console.controller.ts
└── backoffice/    # the operator, across organizations
    └── backoffice.controller.ts`,filename:"src/controllers",language:"bash"}),e.jsx(s,{code:`await Server.create(AppModule, (config) => ({
  cors: {
    origins: [
      config.get('AUTH_APP_URL'),
      config.get('CONSOLE_ORIGIN'),
      config.get('BACKOFFICE_ORIGIN'),
    ],
  },
  description: 'Acme',
  docs: { provider: 'scalar', theme: 'default' },
  globalPrefix: 'api',
  healthMessage: 'acme is healthy',
  port: config.get('PORT'),
  projects: [
    { name: 'auth', prefix: 'auth', title: 'Auth API' },
    { name: 'console', prefix: 'console', title: 'Console API' },
    { name: 'backoffice', prefix: 'backoffice', title: 'Backoffice API' },
  ],
}))`,filename:"main.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Each app points kubb at its own document — /api/v1/console/openapi — and only sees its surface."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"turystack add audience partner adds a fourth: a controller, a project here, an origin in CORS and apps/partner."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"One spelling"}),e.jsx("p",{className:"text-muted-foreground",children:"Request and response fields carry the column's name: user_id, workspace_mode, is_default. Closed sets are lowercase: active, single."}),e.jsx(s,{code:`const profileResponse = z.object({
  organization: z.object({
    organization_id: z.string(),
    workspace_mode: z.string(),
  }),
  user: z.object({
    user_id: z.string(),
    email_verified: z.boolean(),
  }),
})`,filename:"console.controller.ts",language:"ts"})]})]})}export{c as component};
