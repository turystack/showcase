import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as o}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Error codes"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The half of the contract a form consumes: one stable code per failure, never a message to match on."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Why the code is normalized"}),e.jsxs("p",{className:"text-muted-foreground",children:["Zod carries ",e.jsx("code",{children:"params"})," only on ",e.jsx("code",{children:"custom"})," issues. A failed ",e.jsx("code",{children:".min()"}),", or a missing value, arrives with no code at all. ",e.jsx("code",{children:"issueCode"})," translates those back into the taxonomy, so a field that is absent always reads ",e.jsx("code",{children:"required"})," ",'— the distinction between "missing" and "wrong type" is meaningless to whoever is filling the form.']}),e.jsx(s,{code:`import { formatErrors, issueCode } from '@turystack/fields'

issueCode({ code: 'custom', params: { code: 'invalidCpf' } })  // 'invalidCpf'
issueCode({ code: 'invalid_type', input: undefined })          // 'required'
issueCode({ code: 'too_big', origin: 'number' })               // 'outOfRange'`,filename:"issue-code.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"formatErrors"}),e.jsxs("p",{className:"text-muted-foreground",children:["Flattens a ",e.jsx("code",{children:"ZodError"})," into one entry per failing field, keyed by dotted path — the shape a form library expects."]}),e.jsx(s,{code:`import { formatErrors } from '@turystack/fields'

const messages: Record<string, string> = {
  invalidCpf: 'CPF inválido',
  required: 'Campo obrigatório',
  tooShort: 'Muito curto',
}

const errors = formatErrors(result.error, (error) => messages[error.code] ?? error.code)

// {
//   'profile.name': {
//     code: 'tooShort', message: 'Muito curto',
//     params: { min: 3 }, path: 'profile.name',
//   },
//   'tags.1': { code: 'required', ... },
// }`,filename:"format.ts",language:"ts"}),e.jsx(o,{props:[{description:"One entry per field, first failure wins. Use it to show a single message per input.",name:"formatErrors",type:"(error, resolve?) => Record<string, FieldError>"},{description:"Every failure of every field — a password field that lists all unmet rules at once.",name:"formatAllErrors",type:"(error, resolve?) => Record<string, FieldError[]>"},{description:"Resolves one issue to a stable code, falling back from Zod native codes.",name:"issueCode",type:"(issue) => FieldIssueCode"},{description:"The union of every code this package raises. Type a translation table with it and a missing message becomes a type error.",name:"FieldIssueCode",type:"type"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"An exhaustive table"}),e.jsx(s,{code:`import type { FieldIssueCode } from '@turystack/fields'

// Missing a code is a compile error, not a blank message in production
export const messages: Record<FieldIssueCode, string> = {
  ageTooHigh: 'Data de nascimento improvável',
  ageTooLow: 'Idade mínima não atingida',
  required: 'Campo obrigatório',
  // ...
}`,filename:"messages.pt-BR.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Building your own field"}),e.jsx("p",{className:"text-muted-foreground",children:"The sanitizer and the issue builders are exported, so a project-specific field joins the same taxonomy."}),e.jsx(s,{code:`import { check, isBlank, sanitize } from '@turystack/fields'

const BookingCode = z
  .string()
  .overwrite((value) => sanitize(value).toUpperCase())
  .refine((value) => !isBlank(value), { ...check('required'), abort: true })
  .refine((value) => /^[A-Z]{2}\\d{6}$/.test(value), check('invalidValue'))`,filename:"booking-code.ts",language:"ts"})]})]})}export{d as component};
