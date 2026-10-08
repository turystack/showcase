import{j as e}from"./index-B7Ig6kNO.js";import{C as t}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function r(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Idempotent"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Runs the decorated method at most once per resolved key."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import {
  Idempotent,
  type IdempotencyKeyResolver,
  type IdempotencyOptions,
} from '@turystack/nestjs-idempotency'

Idempotent<T extends unknown[]>(
  key: IdempotencyKeyResolver<T>,
  options?: IdempotencyOptions,
): MethodDecorator

// IdempotencyKeyResolver<T> — same engine as @Cache.* and @Lock:
// a static string, or (args: T) => string | Promise<string>`,filename:"idempotent.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"HTTP — the caller waits for a body"}),e.jsxs("p",{className:"text-muted-foreground",children:["The client sends an ",e.jsx("code",{children:"Idempotency-Key"})," and retries with the same one. ",e.jsx("code",{children:"replay"})," — the default — returns the first result, so the retry gets the response it lost."]}),e.jsx(t,{code:`@Controller({ path: 'payments', tag: 'Payments' })
export class PaymentController {
  constructor(private readonly idempotency: IdempotencyService) {}

  @Route({ method: 'POST', summary: 'Create Payment', description: 'Creates a payment.' })
  @Idempotent(([{ headers }]) => \`payment:\${headers['idempotency-key']}\`, {
    ttl: 604_800,
  })
  createPayment(@Request() { body, headers }) {
    return this.createPaymentUseCase.execute(body)
  }
}`,filename:"payment.controller.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Queue handler — nobody is waiting"}),e.jsxs("p",{className:"text-muted-foreground",children:["Delivery is at-least-once, so the same event arrives twice."," ",e.jsx("code",{children:"skip"})," records that the work happened without storing a result nobody will read."]}),e.jsx(t,{code:`@Handler('EVENTBRIDGE-SQS', { event: PaymentRequested })
export class ProcessPaymentHandler {
  constructor(private readonly idempotency: IdempotencyService) {}

  @Idempotent(([event]) => \`payment:\${event.identifier}\`, { mode: 'skip' })
  async execute(event: PaymentRequested) {
    return this.processPaymentUseCase.execute(event)
  }
}`,filename:"process-payment.handler.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The key comes from the event's own stable identifier — the"," ",e.jsx("code",{children:"identifier"})," every published payload carries — not from something generated on arrival."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Injection"}),e.jsxs("p",{className:"text-muted-foreground",children:["The decorator reads ",e.jsx("code",{children:"IdempotencyService"})," off the instance, so the host has to inject it as ",e.jsx("code",{children:"idempotency"})," or"," ",e.jsx("code",{children:"idempotencyService"}),". A missing injection fails with a message naming the method rather than an undefined access."]})]})]})}export{r as component};
