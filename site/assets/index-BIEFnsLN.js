import{j as e}from"./index-B7Ig6kNO.js";import{C as a}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const t=[{fix:"RequiredStringSchema sanitizes first and reports required, not tooShort",gap:'z.string().min(1) accepts "   "'},{fix:"NumberSchema reports required — a blank field is not a zero",gap:'z.coerce.number().parse("") returns 0'},{fix:"MoneySchema assembles minor units from digits, never through a float",gap:"Math.round(value * 100) drops a cent"},{fix:"DateOnlySchema keeps a calendar date as YYYY-MM-DD, with no instant involved",gap:'new Date("2026-01-01") is 31 December in São Paulo'},{fix:"UrlSchema pins the protocol and can refuse private hosts",gap:"z.url() accepts javascript: and http://169.254.169.254"},{fix:"CnpjSchema validates the alphanumeric form as well",gap:"A digits-only CNPJ check rejects every CNPJ issued from 2026"}];function c(){return e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/fields"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["Zod schemas for entity fields — the ones a request body and a form both send. Where ",e.jsx("code",{children:"@turystack/query-dsl"})," types what arrives in the query string, this types what arrives in the payload."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Why it exists"}),e.jsx("p",{className:"text-muted-foreground",children:"Zod validates shapes. It does not know that a whitespace-only name is empty, that a blank number field is not a zero, or that a date without a time zone is not an instant. Every schema here exists because that gap cost someone a bug."}),e.jsx("ul",{className:"space-y-3",children:t.map(s=>e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{children:s.gap}),e.jsx("span",{className:"mt-1 block text-muted-foreground",children:s.fix})]})]},s.gap))})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(a,{tabs:[{code:"npm install @turystack/fields zod",label:"npm"},{code:"pnpm add @turystack/fields zod",label:"pnpm"},{code:"yarn add @turystack/fields zod",label:"yarn"},{code:"bun add @turystack/fields zod",label:"bun"}]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx("p",{className:"text-muted-foreground",children:"Every schema is a factory returning a real Zod type, so it composes with everything already written in Zod."}),e.jsx(a,{code:`import {
  EmailSchema,
  MoneySchema,
  RequiredStringSchema,
  formatErrors,
} from '@turystack/fields'
import { CpfSchema } from '@turystack/fields/br'
import z from 'zod'

const CreateCustomer = z.object({
  document: CpfSchema(),
  email: EmailSchema({ blockDisposable: true }),
  limit_cents: MoneySchema({ maxCents: 1_000_00 }),
  name: RequiredStringSchema({ min: 3, max: 120 }),
})

const result = CreateCustomer.safeParse(input)

if (!result.success) {
  return formatErrors(result.error, (error) => messages[error.code])
  // { name: { code: 'required', message: 'Informe o nome', params: {}, path: 'name' } }
}`,filename:"create-customer.schema.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Two entry points"}),e.jsxs("p",{className:"text-muted-foreground",children:["Brazilian documents live behind ",e.jsx("code",{children:"@turystack/fields/br"}),", so a bundle that never validates a CPF never carries the code that does."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"One taxonomy, both sides"}),e.jsxs("p",{className:"text-muted-foreground",children:["Every failure carries a stable ",e.jsx("code",{children:"code"}),". The backend maps it to an API error and the form maps it to a message, and neither ever matches on Zod's English text — which changes with the library version and cannot be translated."]})]})]})}export{c as component};
