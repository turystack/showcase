import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function l(){return e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/query-dsl"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["Zod-based schemas for query-string parameters: pagination, sort, ranges, date ranges, comma-separated lists, booleans, and free-text filters. Every turystack backend parses the query with them; the frontend writes it with ",e.jsx("code",{children:"rangeToQuery"}),","," ",e.jsx("code",{children:"listToQuery"})," and ",e.jsx("code",{children:"dateRangeToQuery"}),". In a monorepo it lives in the domains lib, so both ends import the same contract."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"npm install @turystack/query-dsl zod",label:"npm"},{code:"pnpm add @turystack/query-dsl zod",label:"pnpm"},{code:"yarn add @turystack/query-dsl zod",label:"yarn"},{code:"bun add @turystack/query-dsl zod",label:"bun"}]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Numeric range parsing with comparison operators (e.g."," ",e.jsx("code",{children:">=10;<=50"}),")"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"ISO date range parsing with the same operator syntax"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Comma-separated list parsing with per-value validation and deduplication"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Boolean coercion from ",e.jsx("code",{children:'"true"'}),"/",e.jsx("code",{children:'"false"'})," ","strings"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Free-text filter schema with OpenAPI metadata generation"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Bidirectional helpers to convert between objects and query strings"})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import {
  RangeSchema,
  DateRangeSchema,
  ListSchema,
  BooleanSchema,
  FilterSchema,
  rangeToQuery,
  queryToRange,
} from '@turystack/query-dsl'

import z from 'zod'

const range = RangeSchema.parse('>=10;<=50')

const dateRange = DateRangeSchema.parse('>=2024-01-01;<=2024-12-31')

const StatusEnum = z.enum(['active', 'inactive'])
const list = ListSchema(StatusEnum, ['active', 'inactive']).parse('active,inactive')

const bool = BooleanSchema.parse('true')

const filter = FilterSchema(['name', 'email'], { example: 'john' })`,filename:"example.ts",language:"ts"})]})]})}export{l as component};
