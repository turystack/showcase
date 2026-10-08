import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as s}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const a=[{description:"Budget for a single call, in milliseconds. Exceeding it rejects with GatewayTimeoutError.",name:"ms",required:!0,type:"number"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Timeout"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Fails a call that has not settled within the budget."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { Timeout } from '@turystack/nestjs-resilience'

Timeout(ms: number): MethodDecorator`,filename:"timeout.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Parameters"}),e.jsx(s,{props:a})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { Timeout } from '@turystack/nestjs-resilience'

@Injectable()
export class PostalCodeAdapter {
  @Timeout(3_000)
  async lookup(postalCode: string) {
    return this.client.get(\`/address/\${postalCode}\`)
  }
}`,filename:"postal-code.adapter.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Failure"}),e.jsx(t,{code:`GatewayTimeoutError  // from @turystack/exceptions — 504

{
  message: 'lookup exceeded 3000ms',
  metadata: { operation: 'lookup', timeoutMs: 3000 },
}`,filename:"error",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The pending work is abandoned, not aborted: the promise is dropped but the underlying request keeps running. Providers that support cancellation should still receive an AbortSignal."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Placement"}),e.jsxs("p",{className:"text-muted-foreground",children:["Keep it closest to the method. Above ",e.jsx("code",{children:"@Retry"})," it would bound the entire retry sequence instead of each attempt."]})]})]})}export{d as component};
