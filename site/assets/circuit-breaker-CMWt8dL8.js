import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{default:"5",description:"Consecutive failures that open the circuit.",name:"failureThreshold",required:!1,type:"number"},{default:"30000",description:"Time the circuit stays open before allowing a trial call, in milliseconds.",name:"resetTimeout",required:!1,type:"number"},{default:"1",description:"Trial calls allowed while half-open. A single failure re-opens the circuit.",name:"halfOpenAttempts",required:!1,type:"number"},{default:"ClassName.methodName",description:"Identifier for the circuit, reported in the thrown error and usable in metrics.",name:"name",required:!1,type:"string"}];function o(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@CircuitBreaker"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Stops calling a dependency that is already failing, so a degraded provider does not cascade into the caller."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import {
  CircuitBreaker,
  circuitState,
  resetCircuits,
  type CircuitBreakerOptions,
  type CircuitState,
} from '@turystack/nestjs-resilience'

CircuitBreaker(options?: CircuitBreakerOptions): MethodDecorator

circuitState(name: string): CircuitState | undefined   // 'closed' | 'half-open' | 'open'
resetCircuits(): void                                  // test seam`,filename:"circuit-breaker.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"CircuitBreakerOptions"}),e.jsx(a,{props:s})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"States"}),e.jsx(t,{code:`closed      calls pass through; consecutive failures are counted
   │        failureThreshold reached
   ▼
open        every call fails fast with ServiceUnavailableError
   │        resetTimeout elapsed
   ▼
half-open   one trial call is allowed
   │            ├── succeeds → closed, counter reset
   │            └── fails    → open again, immediately`,filename:"state machine",language:"bash"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"A failed trial call re-opens the circuit at once rather than waiting for the threshold again — the dependency just proved it is still down."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import {
  CircuitBreaker,
  Retry,
  Timeout,
} from '@turystack/nestjs-resilience'

@Injectable()
export class PaymentGatewayAdapter {
  @CircuitBreaker({ failureThreshold: 5, resetTimeout: 30_000 })
  @Retry({ attempts: 3 })
  @Timeout(5_000)
  async charge(input: ChargeInput) {
    return this.client.charge(input)
  }
}`,filename:"payment-gateway.adapter.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Failure"}),e.jsx(t,{code:`ServiceUnavailableError  // from @turystack/exceptions — 503

{
  message: 'Circuit PaymentGatewayAdapter.charge is open',
  metadata: { circuit: 'PaymentGatewayAdapter.charge', retryAfterMs: 24_310 },
}`,filename:"error",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"State lives in this process"}),e.jsxs("p",{className:"text-muted-foreground",children:["One circuit per decorated method, held in memory. The breaker exists to stop ",e.jsx("em",{children:"this"})," process from spending threads and connections on a dependency it already knows is down — each instance paying a few calls to learn that is cheaper than coupling every instance to a shared store."]})]})]})}export{o as component};
