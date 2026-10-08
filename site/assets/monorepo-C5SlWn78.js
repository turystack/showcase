import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function i(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Monorepo — Stack & Structure"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"What create monorepo always ships: a pnpm workspace with your apps and one domains lib they all share."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Folder structure"}),e.jsx(s,{code:`my-product/
├── apps/
│   ├── backoffice/          # web app (create web structure)
│   ├── api/                 # API app (create api structure)
│   ├── create-subscription/ # handler (create handler structure)
│   └── process-payment/     # handler (create handler structure)
├── libs/
│   ├── domains/             # backend rules — used by api + handlers
│   │   └── src/
│   │       ├── subscription/#   entity, schema, repository when needed,
│   │       └── payment/     #   use-cases, types + tests
│   ├── database/            # only when nestjs-database is selected
│   │   ├── src/             # schema, relations + DatabaseService typing
│   │   ├── drizzle/         # versioned migrations
│   │   └── drizzle.config.ts
│   └── support/             # optional package when utilities are truly cross-app
├── pnpm-workspace.yaml
├── biome.json               # apps extend @turystack/frontend-config
│                            #   or @turystack/backend-config
├── docker-compose.yml       # only when selected modules need local services
└── package.json`,filename:"my-product",language:"bash"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it wires"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Each app keeps the structure of its own create command — the monorepo just composes them under apps/; handlers sit at the root of apps/ like any other app"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Every web app owns required layouts/ and feature boundaries. api/ and its SDK target exist only for apps with API integration; ui/, hooks/, support/, auth/ and telemetry/ are also conditional"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The monorepo grows with the monorepo-only commands: monorepo:api adds an API under apps/, monorepo:handler adds a lambda under apps/"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"libs/domains holds every backend domain — the api's src/domains moves here, and api + handlers import from @repo/domains. @turystack/query-dsl is a dependency of the domains lib itself: its primitives (pagination, sort, list, filter) type the persistence contracts. Each app root registers its global lib modules and only the provider closure its controllers or handlers consume"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"libs/database is conditional and owns schema, relations and migrations. A database-free product does not receive that lib, drizzle scripts or postgres infrastructure"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Web apps with API integration point kubb at the API OpenAPI (per audience prefix in multi-audience format) — the contract stays in sync end to end"})]})]})]})]})}export{i as component};
