import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@RateLimit"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Method decorator that enforces a rate limit on each call."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { RateLimit, type RateLimitOptions } from '@turystack/nestjs-rate-limit'

RateLimit<T extends unknown[]>(key: CacheKeyResolver<T>, options: RateLimitOptions): MethodDecorator

// CacheKeyResolver<T> — same engine as @Cache.*:
// a static string, or (args: T) => string | Promise<string>`,filename:"rate-limit.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { RateLimit } from '@turystack/nestjs-rate-limit'

@Injectable()
export class PaymentService {
  @RateLimit(([userId]) => \`charge:\${userId}\`, { limit: 5, window: 60_000 })
  async charge(userId: string) {
    // rate-limited operation
  }

  // Optionally type the args tuple:
  @RateLimit<[string]>(([userId]) => \`refund:\${userId}\`, { limit: 1, window: 60_000 })
  async refund(userId: string) {}
}`,filename:"payment.service.ts",language:"ts"})]})]})}export{n as component};
