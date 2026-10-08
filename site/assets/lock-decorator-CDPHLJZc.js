import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Lock"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Method decorator that wraps the call in a distributed lock."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { Lock, type LockOptions } from '@turystack/nestjs-lock'

Lock<T extends unknown[]>(key: CacheKeyResolver<T>, options?: LockOptions): MethodDecorator

// CacheKeyResolver<T> — same engine as @Cache.*:
// a static string, or (args: T) => string | Promise<string>`,filename:"lock.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`import { Lock } from '@turystack/nestjs-lock'

@Injectable()
export class OrderService {
  @Lock(([orderId]) => \`order:\${orderId}\`, { ttl: 15_000 })
  async processOrder(orderId: string) {
    // automatically locked and unlocked
  }

  // Optionally type the args tuple:
  @Lock<[string]>(([orderId]) => \`order:\${orderId}\`)
  async cancelOrder(orderId: string) {}
}`,filename:"order.service.ts",language:"ts"})]})]})}export{c as component};
