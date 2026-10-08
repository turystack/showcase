import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Handler — Stack & Structure"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"What monorepo:handler ships: a thin delivery app that validates the event and delegates to a shared domain use-case."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Folder structure"}),e.jsx("p",{className:"text-muted-foreground",children:"The business logic lives in the monorepo domains lib — the handler is just the entry point that wires an event source to a use-case."}),e.jsx(s,{code:`apps/process-payment/
├── src/
│   ├── process-payment.handler.ts      # the @Handler class
│   ├── process-payment.module.ts       # HandlerModule wiring
│   ├── process-payment.handler.test.ts # tests colocated
│   ├── config.schema.ts                # validated env owned by this app
│   └── main.ts                         # export const handler
├── package.json
├── tsconfig.json
└── vitest.config.ts`,filename:"apps/process-payment",language:"bash"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The handler file"}),e.jsx(s,{code:`import type { EventPayload } from '@turystack/nestjs-events'
import { Handler } from '@turystack/nestjs-events/workers'
import { ProcessPaymentUseCase } from '@repo/domains'
import { PaymentRequested } from '@repo/events'

@Handler('EVENTBRIDGE-SQS', { event: PaymentRequested })
export class ProcessPaymentHandler {
  constructor(private readonly processPayment: ProcessPaymentUseCase) {}

  async execute(event: EventPayload<typeof PaymentRequested>) {
    await this.processPayment.execute({ paymentId: event.paymentId })
  }
}`,filename:"src/process-payment.handler.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The module file"}),e.jsx(s,{code:`import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { WorkersModule } from '@turystack/nestjs-events/workers'

import { ProcessPaymentUseCase } from '@repo/domains'

import { configSchema } from './config.schema'
import { ProcessPaymentHandler } from './process-payment.handler'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    WorkersModule.register({ adapter: 'aws', project: 'acme' }),
    // global lib modules the domain libs need: logger, database...
  ],
  providers: [
    ProcessPaymentHandler,
    ProcessPaymentUseCase,
    // repository/adapter providers required by ProcessPaymentUseCase
  ],
})
export class HandlerModule {}`,filename:"src/process-payment.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The entry point"}),e.jsx(s,{code:`import { Serverless } from '@turystack/nestjs-events/workers'

import { HandlerModule } from './process-payment.module'

export const handler = Serverless.create(HandlerModule)`,filename:"src/main.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The event"}),e.jsx(s,{code:`import { defineEvent } from '@turystack/nestjs-events'
import { z } from 'zod'

// shared with the producer: the name is the bus rule, the schema validates
export const PaymentRequested = defineEvent(
  'payment.requested',
  z.object({ identifier: z.string(), paymentId: z.string() }),
)`,filename:"packages/events/src/payment-requested.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Serverless.create is synchronous — no top-level await. The context boots lazily on the first invocation and is cached for warm ones."})]})]})}export{n as component};
