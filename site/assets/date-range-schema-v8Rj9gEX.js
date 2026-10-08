import{j as e}from"./index-B7Ig6kNO.js";import{C as a}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{description:"Equal to date",name:"eq",type:"Date"},{description:"After date",name:"gt",type:"Date"},{description:"On or after date",name:"gte",type:"Date"},{description:"Before date",name:"lt",type:"Date"},{description:"On or before date",name:"lte",type:"Date"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"DateRangeSchema"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["Zod schema that parses a semicolon-separated date range string (e.g."," ",e.jsx("code",{children:">=2024-01-01;<=2024-12-31"}),") into a"," ",e.jsx("code",{children:"DateRange"})," object with ",e.jsx("code",{children:"Date"})," values."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(a,{code:"const DateRangeSchema: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<DateRange | undefined, string | undefined>>",filename:"date-range.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(a,{code:`import { DateRangeSchema } from '@turystack/query-dsl'

DateRangeSchema.parse('>=2024-01-01;<=2024-12-31')
// { gte: Date('2024-01-01'), lte: Date('2024-12-31') }

DateRangeSchema.parse('=2024-06-15')
// { eq: Date('2024-06-15') }

DateRangeSchema.parse('>=2024-06-15T10:30:00.000Z')
// { gte: Date('2024-06-15T10:30:00.000Z') }

DateRangeSchema.parse(undefined) // undefined`,filename:"example.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"DateRange object"}),e.jsx(t,{props:s})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsxs("p",{className:"text-muted-foreground",children:["The schema is optional — ",e.jsx("code",{children:"undefined"})," passes through. When a string is provided, it is validated against a regex, then each segment is checked as an ISO date or timezone-qualified ISO datetime. Duplicate operators return a ",e.jsx("code",{children:"dateRangeDuplicatedOperator"})," ","validation issue and invalid dates return ",e.jsx("code",{children:"dateInvalid"}),"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Helpers"}),e.jsx(a,{code:`import { dateRangeToQuery, queryToDateRange } from '@turystack/query-dsl'

dateRangeToQuery({ gte: new Date('2024-01-01') })
// '>=2024-01-01T00:00:00.000Z'

queryToDateRange('>=2024-01-01')
// { gte: Date('2024-01-01') }`,filename:"helpers.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{children:"dateRangeToQuery"})," serializes a ",e.jsx("code",{children:"DateRange"})," ","object using ISO 8601 strings. ",e.jsx("code",{children:"queryToDateRange"})," parses without Zod validation, useful on the client side."]})]})]})}export{l as component};
