import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"FilterSchema"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Factory that creates an optional string schema with OpenAPI metadata listing the filterable fields."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`function FilterSchema(
  fields: readonly string[],
  options?: { example: string },
): z.ZodOptional<z.ZodString>`,filename:"filter.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { FilterSchema } from '@turystack/query-dsl'

const schema = FilterSchema(['name', 'email'], { example: 'john' })

schema.parse('john')     // 'john'
schema.parse(undefined)  // undefined`,filename:"example.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsxs("p",{className:"text-muted-foreground",children:["Returns a ",e.jsx("code",{children:"z.string().optional()"})," schema enriched with"," ",e.jsx("code",{children:".meta()"})," containing a description that lists every filterable field and an optional example value. This metadata is picked up by OpenAPI/Swagger generators."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Types"}),e.jsx(s,{code:`type Filter = {
  filter?: string | undefined
}`,filename:"filter.types.ts",language:"ts"})]})]})}export{n as component};
