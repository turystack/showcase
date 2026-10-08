import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import{P as i}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const s=[{description:"Maximum number of allowed requests within the window.",name:"limit",required:!0,type:"number"},{description:"Time window in milliseconds.",name:"window",required:!0,type:"number"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"RateLimitService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Injectable service that enforces distributed rate limits with an atomic counter per key."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { RateLimitService, RateLimitExceededError, type RateLimitOptions } from '@turystack/nestjs-rate-limit'

consume(key: string, options: RateLimitOptions): Promise<void>`,filename:"rate-limit-service.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { RateLimitService } from '@turystack/nestjs-rate-limit'

@Injectable()
export class PaymentService {
  constructor(private readonly rateLimitService: RateLimitService) {}

  async charge(userId: string) {
    await this.rateLimitService.consume(\`charge:\${userId}\`, {
      limit: 5,
      window: 60_000,
    })
    // proceed with charge
  }
}`,filename:"payment.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RateLimitOptions"}),e.jsx(i,{props:s})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How the window behaves"}),e.jsxs("p",{className:"text-muted-foreground",children:["Fixed window. The window opens on the first request for a key and closes ",e.jsx("code",{className:"text-sm",children:"window"})," milliseconds later — requests in between, ",e.jsx("strong",{children:"including the rejected ones"}),", do not push it further away. A caller that keeps retrying while throttled is let back in when the original window ends, not after they fall silent for a full window."]}),e.jsx(t,{code:`limit: 2, window: 60_000

t=0s    request 1   allowed     window opens, closes at t=60s
t=10s   request 2   allowed
t=20s   request 3   rejected    the window still closes at t=60s
t=50s   request 4   rejected
t=61s   request 5   allowed     new window`,filename:"fixed window",language:"bash"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The counter is a single key incremented atomically, and the expiry is applied by the same operation that creates it — so two concurrent first requests cannot produce a counter that never expires."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"RateLimitExceededError"}),e.jsxs("p",{className:"text-muted-foreground",children:["Extends ",e.jsx("code",{className:"text-sm",children:"HttpException"})," (HTTP 429). Thrown when the number of requests exceeds the configured limit within the window."]}),e.jsx(t,{code:`import { RateLimitExceededError, RateLimitService } from '@turystack/nestjs-rate-limit'

async charge(userId: string) {
  try {
    await this.rateLimitService.consume(\`charge:\${userId}\`, {
      limit: 5,
      window: 60_000,
    })
    // proceed with charge
  } catch (error) {
    if (error instanceof RateLimitExceededError) {
      // rate limit exceeded — 429 Too Many Requests
    }
  }
}`,filename:"payment.service.ts",language:"ts"})]})]})}export{d as component};
