import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function r(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Web — Stack & Structure"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"What create web ships: native libraries, complete API infrastructure, the canonical folder tree, and one centered welcome route."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Create a web app"}),e.jsx(s,{tabs:[{code:`node cli/dist/index.js create web my-web \\
  --local-root .`,label:"Interactive"},{code:`node cli/dist/index.js create web my-web \\
  --yes \\
  --audience customer \\
  --openapi-url http://localhost:3000/api/v1/customer/openapi \\
  --api-base-url http://localhost:3000 \\
  --local-root .`,label:"Customer audience"}]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Every web project receives the complete OpenAPI integration. The wizard asks whether it consumes a specific API audience and derives the default OpenAPI and runtime URLs from that answer."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Native libraries"}),e.jsx("p",{className:"text-muted-foreground",children:"The UI, router, API generation, server state, and tooling form the base stack:"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"@turystack/react-web"})," +"," ",e.jsx("code",{className:"text-lib",children:"@turystack/react-hooks"})," +"," ",e.jsx("code",{className:"text-lib",children:"@turystack/react-icons"})," — the UI kit, hook collection and icon set (mandatory)"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"@tanstack/react-router"})," — file-based routing with generated route tree and devtools"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"@tanstack/react-query"})," — server state integrated with generated SDK hooks"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"zod"})," — validation everywhere: forms, env, and the generated schemas"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"kubb"})," — generates the typed SDK from the default auth or selected audience-specific OpenAPI surface"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"react-hook-form"})," +"," ",e.jsx("code",{className:"text-lib",children:"@hookform/resolvers"})," — forms with zod resolvers"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"tailwindcss"})," v4 — styling, via the vite plugin"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"biome"})," + tsconfig extending"," ",e.jsx("code",{className:"text-lib",children:"@turystack/frontend-config"})," — one tooling source for every frontend"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"vite"})," +"," ",e.jsx("code",{className:"text-lib",children:"vitest"})," + Testing Library — build and tests"]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Scripts with API integration"}),e.jsx(s,{code:`{
  "predev": "tsr generate",
  "dev": "vite",
  "prebuild": "kubb generate && tsr generate",
  "build": "tsc --noEmit && vite build",
  "pretypecheck": "tsr generate",
  "typecheck": "tsc --noEmit",
  "lint": "biome lint .",
  "check": "biome check .",
  "check:fix": "biome check --write .",
  "format": "biome format --write .",
  "test": "vitest run --passWithNoTests",
  "test:coverage": "vitest run --coverage --passWithNoTests",
  "routes:generate": "tsr generate",
  "api:generate": "kubb generate"
}`,filename:"package.json",language:"json"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Folder structure"}),e.jsx(s,{code:`src/
├── api/
│   ├── .gitkeep
│   ├── http-client.ts
│   └── query-client.ts
├── auth/.gitkeep
├── features/.gitkeep
├── hooks/.gitkeep
├── layouts/.gitkeep
├── routes/
│   ├── .gitkeep
│   ├── __root.tsx     # providers + Outlet only
│   └── index.tsx      # centered Welcome Turystack
├── support/.gitkeep
├── telemetry/.gitkeep
├── ui/.gitkeep
├── ~sdk/.gitkeep      # replaced by generated Kubb output
├── main.tsx
├── router.tsx
└── styles.css`,filename:"src",language:"bash"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Every canonical folder is tracked with"," ",e.jsx("code",{className:"text-lib",children:".gitkeep"}),". The placeholder is removed when real code enters that folder"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The scaffold does not invent a layout, auth flow, feature, primitive, helper, or telemetry provider. Those folders start empty and explicit"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"api/"})," and"," ",e.jsx("code",{className:"text-lib",children:"~sdk/"})," belong to every web project; the SDK is regenerated before production builds"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Imports use the ",e.jsx("code",{className:"text-lib",children:"@/*"})," alias pointing to ",e.jsx("code",{className:"text-lib",children:"src/*"})]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{className:"text-lib",children:"routes/index.tsx"})," is the only initial product screen and renders Welcome Turystack centered"]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"SDK generation"}),e.jsxs("p",{className:"text-muted-foreground",children:["Kubb points at the default auth or selected audience-specific backend OpenAPI and writes the typed SDK into"," ",e.jsx("code",{className:"text-lib",children:"~sdk/"}),":"]}),e.jsx(s,{code:`import 'dotenv/config'

import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { z } from 'zod'

const openApiUrl = z.string().url().parse(process.env.OPENAPI_URL)

export default defineConfig({
  input: {
    path: openApiUrl,
  },
  output: {
    clean: true,
    format: false,
    path: './src/~sdk',
  },
  plugins: [
    pluginOas({ validate: false }),
    pluginTs({ output: { path: './types' } }),
    pluginZod({ output: { path: './schemas' } }),
    pluginClient({ importPath: '@/api/http-client' }),
    pluginReactQuery({
      client: { importPath: '@/api/http-client' },
      output: { path: './hooks' },
    }),
  ],
})`,filename:"kubb.config.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The CLI generates api/http-client.ts with the Client, RequestConfig and ResponseErrorConfig exports Kubb requires. That client owns base URL, session headers and Exception parsing for every generated hook. OPENAPI_URL is used only by codegen; VITE_API_BASE_URL is the public runtime base URL."})]})]})}export{r as component};
