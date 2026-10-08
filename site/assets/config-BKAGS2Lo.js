import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const n=[{description:"Names the factory and types: createAcme, AcmeError",name:"name",required:!0,type:"string"},{description:"File path, http(s) URL, or the parsed document",name:"input",required:!0,type:"string | object"},{description:"Directory to write; must be new, empty, or ours",name:"output",required:!0,type:"string"},{default:"false",description:"zod checks: request bodies, success bodies, or both",name:"validate",type:"boolean | 'request' | 'response'"},{description:"Sent when fetching a URL input",name:"headers",type:"Record<string, string>"},{description:"Overrides for namespace and method names",name:"naming",type:"Naming"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Config & CLI"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"One config file declares every SDK; one command writes them all."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"defineSdk"}),e.jsx(t,{props:n}),e.jsx(s,{code:`import { defineSdk } from '@turystack/openapi-sdk'

export default defineSdk([
  { name: 'acme', input: process.env.OPENAPI_URL!, output: './src/~sdk' },
  {
    name: 'billing',
    input: 'https://billing.internal/openapi.json',
    headers: { authorization: \`Bearer \${process.env.SPEC_TOKEN}\` },
    output: './src/~billing',
    validate: 'response',
  },
])`,filename:"openapi-sdk.config.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground",children:"Relative paths resolve from the config file. TypeScript configs load without a build step."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"CLI"}),e.jsx(s,{code:`openapi-sdk generate                      # openapi-sdk.config.{ts,mts,js,mjs}
openapi-sdk generate --config sdk.config.ts`,filename:"terminal",language:"bash"}),e.jsx("p",{className:"text-muted-foreground",children:"Exits 1 with every problem listed when the document cannot become an SDK."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Output directory"}),e.jsx("p",{className:"text-muted-foreground",children:"Each run replaces it whole, only once generation succeeds. A directory holding other files, or another SDK, is refused."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Programmatic"}),e.jsx(s,{code:`import { generate } from '@turystack/openapi-sdk'

const { files, operations } = await generate(
  { name: 'acme', input: spec, output: 'src/~sdk' },
  { cwd: process.cwd() },
)`,filename:"build.ts",language:"ts"})]})]})}export{d as component};
