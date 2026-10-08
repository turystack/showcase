import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function o(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@WithContext"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Opens a context around an entrypoint that is not an HTTP request."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { WithContext, type ContextSeed } from '@turystack/nestjs-context'

WithContext(seed?: ContextSeed): MethodDecorator

// ContextSeed — reads the decorated method's own arguments:
// (...args) => Partial<RequestContext> | undefined`,filename:"with-context.decorator.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Queue handler"}),e.jsx("p",{className:"text-muted-foreground",children:"The seed pulls the correlation id out of the envelope, so the chain that started at the publisher continues on the consumer."}),e.jsx(t,{code:`import { Handler } from '@turystack/nestjs-events/workers'
import { WithContext } from '@turystack/nestjs-context'

@Handler('EVENTBRIDGE-SQS', { event: PaymentRequested })
export class ProcessPaymentHandler {
  @WithContext((event: PaymentRequested) => ({ correlationId: event.correlationId }))
  async execute(event: PaymentRequested) {
    return this.processPaymentUseCase.execute(event)
  }
}`,filename:"process-payment.handler.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Scheduled tick"}),e.jsx("p",{className:"text-muted-foreground",children:"Without a seed the decorator generates a correlation id, so each tick is traceable on its own."}),e.jsx(t,{code:`import { WithContext } from '@turystack/nestjs-context'
import { Handler } from '@turystack/nestjs-events/workers'

@Handler('SCHEDULE', {}, {
  trigger: { schedule: 'rate(15 minutes)' },
})
export class ExpireReservationsHandler {
  @WithContext()
  async execute() {
    return this.expireReservationsUseCase.execute()
  }
}`,filename:"expire-reservations.handler.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Nesting"}),e.jsx("p",{className:"text-muted-foreground",children:"A context already in flight is reused rather than replaced, so a decorated method calling another one never severs the chain."})]})]})}export{o as component};
