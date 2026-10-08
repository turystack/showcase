import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Booleans and consent"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["A browser does not send ",e.jsx("code",{children:"true"}),". It sends ",e.jsx("code",{children:"'on'"}),", or it sends nothing at all."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"An unchecked box is absent"}),e.jsxs("p",{className:"text-muted-foreground",children:["An unchecked checkbox is not submitted, so ",e.jsx("code",{children:"z.boolean()"})," ","raises ",e.jsx("code",{children:"required"})," for every box the user left alone."," ",e.jsx("code",{children:"CheckboxSchema"})," reads that absence as ",e.jsx("code",{children:"false"}),"."]}),e.jsx(s,{code:`import {
  BooleanInputSchema,
  CheckboxSchema,
  MustAcceptSchema,
  TriStateSchema,
} from '@turystack/fields'

Boolean('false')                          // true — the coercion to avoid
BooleanInputSchema().parse('false')       // false
BooleanInputSchema().parse('Sim')         // true
BooleanInputSchema().safeParse('yep')     // invalidValue

CheckboxSchema().parse(undefined)         // false
MustAcceptSchema().safeParse(false)       // mustAccept
TriStateSchema().parse('')                // null`,filename:"boolean.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Schemas"}),e.jsx(a,{props:[{description:"Reads the spellings a browser sends — 'on', '1', 'sim', 'true' — and rejects anything else instead of coercing it.",name:"BooleanInputSchema",type:"() => ZodType<boolean>"},{description:"Missing or blank means false, which is what an unchecked box means.",name:"CheckboxSchema",type:"() => ZodType<boolean>"},{description:"Consent that must be granted. Reports mustAccept rather than the invalid_literal of z.literal(true), so the message under the terms checkbox can say what to do.",name:"MustAcceptSchema",type:"() => ZodType<true>"},{description:'Yes, no, or unanswered. Keeps "unanswered" apart from "no", which a default of false quietly destroys.',name:"TriStateSchema",type:"() => ZodType<boolean | null>"}]})]})]})}export{l as component};
