import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const t=["Any OpenAPI 3.x or Swagger 2.0 document, from a file or a URL","One call shape: sdk.tag.operation({ body, path, query, headers })","Generated code runs on fetch alone, in the browser and in Node","Return the body and throw, or return a result and never throw","Optional zod validation of requests and responses","Name collisions fail the build instead of being silently dropped"];function c(){return e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/openapi-sdk"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Generates a typed SDK from an OpenAPI document. The tag names the namespace and the operationId names the method."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"npm install -D @turystack/openapi-sdk",label:"npm"},{code:"pnpm add -D @turystack/openapi-sdk",label:"pnpm"},{code:"yarn add -D @turystack/openapi-sdk",label:"yarn"},{code:"bun add -d @turystack/openapi-sdk",label:"bun"}]}),e.jsxs("p",{className:"text-muted-foreground",children:["A dev dependency: the generated SDK imports nothing from it. Add"," ",e.jsx("code",{children:"zod"})," only if the config turns on ",e.jsx("code",{children:"validate"}),"."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick start"}),e.jsx(s,{code:`import { defineSdk } from '@turystack/openapi-sdk'

export default defineSdk({
  name: 'acme',
  input: process.env.OPENAPI_URL!, // or './openapi.json'
  output: './src/~sdk',
})`,filename:"openapi-sdk.config.ts",language:"ts"}),e.jsx(s,{code:`"scripts": {
  "predev": "openapi-sdk generate",
  "prebuild": "openapi-sdk generate"
}`,filename:"package.json",language:"json"}),e.jsx(s,{code:`import { createAcme } from '@/~sdk'

const acme = createAcme({ baseURL: import.meta.env.VITE_API_URL })

const coupon = await acme.coupon.create({ body: { code: 'X10' } })
const page = await acme.coupon.list({ query: { page: 1 } })
await acme.coupon.delete({ path: { id: coupon.id } })`,filename:"example.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsx("ul",{className:"space-y-2 text-muted-foreground",children:t.map(a=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:a})]},a))})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What it writes"}),e.jsx(s,{code:`src/~sdk/
  index.ts     createAcme, AcmeError, AcmeInput, AcmeOutput, every type
  sdk.ts       the tag.operation tree
  client.ts    the fetch runtime, copied in
  types.ts     request and response types (Kubb)
  schemas.ts   zod schemas, only with validate`,filename:"output",language:"bash"})]})]})}export{c as component};
