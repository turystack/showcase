import{j as e}from"./index-B7Ig6kNO.js";import{C as a}from"./CodeBlock-jMISp3qZ.js";import{P as s}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Collections and identifiers"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Lists and objects that are empty in every sense except the one Zod measures."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"A list of blanks is an empty list"}),e.jsxs("p",{className:"text-muted-foreground",children:["A form that renders three inputs submits ",e.jsx("code",{children:"['a', '', '']"}),", and ",e.jsx("code",{children:"z.array(...).min(1)"})," counts three."]}),e.jsx(a,{code:`import {
  NonEmptyObjectSchema,
  RequiredArraySchema,
  UniqueArraySchema,
} from '@turystack/fields'

RequiredArraySchema(z.string()).parse(['a', '  ', ''])   // ['a']
RequiredArraySchema(z.string()).safeParse([])            // emptyList

// The duplicate is reported at its own index, so the form highlights that row
UniqueArraySchema(Guest, (guest) => guest.email).safeParse(guests)

// Guards a PATCH: a schema of optional fields accepts {} and the handler
// then issues an UPDATE with nothing to set
NonEmptyObjectSchema(UpdateUser).safeParse({})           // emptyObject`,filename:"collection.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"IdSchema"}),e.jsxs("p",{className:"text-muted-foreground",children:["Beyond the shape it rejects the values that pass a naive regex but can never exist: a UUID with an invalid version or variant nibble, a ULID above the timestamp ceiling, and a numeric id past"," ",e.jsx("code",{children:"MAX_SAFE_INTEGER"}),"."]}),e.jsx(a,{code:`import { IdSchema } from '@turystack/fields'

IdSchema().safeParse('018f6d3c-9f7a-0c3a-8f1e-2b6d5a4c3b2a')  // invalidId (version 0)
IdSchema({ formats: ['numeric'] }).safeParse('9007199254740993')  // invalidId
IdSchema({ formats: ['ulid', 'uuid'] }).parse('01ARZ3NDEKTSV4RRFFQ69G5FAV')`,filename:"id.ts",language:"ts"}),e.jsx(s,{props:[{default:"['uuid']",description:"Accepted formats: 'uuid', 'ulid' or 'numeric'. The error names what was expected, which matters when several are accepted.",name:"formats",type:"readonly ('numeric' | 'ulid' | 'uuid')[]"}]})]})]})}export{c as component};
