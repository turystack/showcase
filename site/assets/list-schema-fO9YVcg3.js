import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"ListSchema"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Creates a Zod schema that parses a comma-separated string into a deduplicated, validated array."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`function ListSchema<T extends string>(
  schema: z.ZodSchema<T>,
  list: readonly T[],
): z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<List<T>, string | undefined>>`,filename:"list.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { ListSchema } from '@turystack/query-dsl'
import z from 'zod'

const StatusEnum = z.enum(['active', 'inactive', 'pending'])

const schema = ListSchema(StatusEnum, ['active', 'inactive', 'pending'])

schema.parse('active,pending')         // ['active', 'pending']
schema.parse('active,active,pending')  // ['active', 'pending']
schema.parse(undefined)                // []`,filename:"example.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsxs("p",{className:"text-muted-foreground",children:["Splits the input string by commas, trims each value, validates every item against the provided Zod schema, and deduplicates using a"," ",e.jsx("code",{children:"Set"}),". If any value fails validation, a"," ",e.jsx("code",{children:"listInvalidValue"})," validation issue is returned with the list of allowed values."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Helpers"}),e.jsx(s,{code:`import { queryToList, listToQuery } from '@turystack/query-dsl'

queryToList('active,,inactive,active') // ['active', 'inactive']
queryToList(null)                      // []

listToQuery(['active', 'inactive'])    // 'active,inactive'`,filename:"helpers.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{children:"queryToList"})," and ",e.jsx("code",{children:"listToQuery"})," are lightweight converters for use on the client side where Zod validation is not needed."]})]})]})}export{d as component};
