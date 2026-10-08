import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as s}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const a=[{description:"Prefixed to every path in the document",name:"baseURL",required:!0,type:"string"},{default:"'data'",description:"Return the body and throw, or return a result",name:"returns",type:"'data' | 'result'"},{description:"Sent on every request; a function runs per call",name:"headers",type:"HeadersInit | () => Promise<HeadersInit>"},{description:"Passed to fetch, e.g. 'include' for cookies",name:"credentials",type:"RequestCredentials"},{description:"Replaces the global fetch",name:"fetch",type:"typeof fetch"}],r=[{description:"Request body; multipart and form bodies built for you",name:"body",type:"per operation"},{description:"Path parameters, URL-encoded",name:"path",type:"per operation"},{description:"Query parameters, serialized per the document",name:"query",type:"per operation"},{description:"Header parameters the operation declares",name:"headers",type:"per operation"}];function p(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Client"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The generated factory and how its operations are called."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"createAcme"}),e.jsx(s,{props:a}),e.jsx(t,{code:`import { createAcme } from '@/~sdk'

export const acme = createAcme({
  baseURL: import.meta.env.VITE_API_URL,
  credentials: 'include',
  headers: async () => ({ authorization: \`Bearer \${await getToken()}\` }),
})`,filename:"api.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Calling"}),e.jsx(s,{props:r}),e.jsx(t,{code:`await acme.coupon.get({ path: { id } })
await acme.coupon.list({ query: { page: 1, status: ['active'] } })
await acme.coupon.uploadImage({ path: { id }, body: { file } })

// fetch options go second
await acme.coupon.delete({ path: { id } }, { signal })

await acme.health() // nothing required, nothing passed`,filename:"example.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"returns: 'data'"}),e.jsx(t,{code:`import { AcmeError } from '@/~sdk'

try {
  const coupon = await acme.coupon.create({ body })
} catch (error) {
  if (error instanceof AcmeError) {
    error.status // 409
    error.body   // what the API sent
  }
}`,filename:"data.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["Resolves the 2xx body. Any other status throws ",e.jsx("code",{children:"AcmeError"}),"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"returns: 'result'"}),e.jsx(t,{code:`const acme = createAcme({ baseURL, returns: 'result' })

const res = await acme.coupon.get({ path: { id } })

if (res.ok) {
  res.data // Coupon
} else if (res.status === 404) {
  res.error // the 404 body the document declares
}`,filename:"result.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground",children:"Resolves every status the document declares. Any other status, a network failure or an abort throws."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Types"}),e.jsx(t,{code:`import type { AcmeErrorBody, AcmeInput, AcmeOutput, Coupon } from '@/~sdk'

type CreateBody = AcmeInput<'coupon.create'>['body']
type Listed = AcmeOutput<'coupon.list'>     // Coupon[]
type Conflict = AcmeErrorBody<'coupon.create'>`,filename:"types.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["Error types come from the document. A status it does not declare throws ",e.jsx("code",{children:"AcmeError"})," in both modes."]})]})]})}export{p as component};
