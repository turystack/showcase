import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const r=[{default:"both sides",description:"defineEvent, EventContract, EventPayload.",name:"@turystack/nestjs-events",required:!1,type:"contract"},{default:"the API",description:"PublisherModule and PublisherService.",name:"/publisher",required:!1,type:"publish"},{default:"apps/workers",description:"WorkersModule, @Handler, Serverless.create.",name:"/workers",required:!1,type:"consume"},{default:"apps/workers",description:"The nestjs-events CLI and its programmatic API.",name:"/infra",required:!1,type:"deploy"}];function i(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-events"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Events on one EventBridge bus: shared contracts, a publisher for the API, typed handlers for the workers."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"npm install @turystack/nestjs-events @aws-sdk/client-eventbridge",label:"npm"},{code:"pnpm add @turystack/nestjs-events @aws-sdk/client-eventbridge",label:"pnpm"},{code:"yarn add @turystack/nestjs-events @aws-sdk/client-eventbridge",label:"yarn"},{code:"bun add @turystack/nestjs-events @aws-sdk/client-eventbridge",label:"bun"}]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The CLI also needs ",e.jsx("code",{children:"sst"}),", ",e.jsx("code",{children:"@aws-sdk/client-ssm"})," ","and ",e.jsx("code",{children:"@aws-sdk/client-sts"})," in ",e.jsx("code",{children:"apps/workers"}),"."]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"One lib, one contract"}),e.jsx("p",{className:"text-muted-foreground",children:"A module per role. The API publishes, the workers consume, both import the same event."}),e.jsx(t,{props:r})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Events defined once with ",e.jsx("code",{children:"defineEvent"}),", validated on publish and again per record"]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Fire-and-forget publishing, superjson on the wire, correlation id carried along"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Four sources, all through EventBridge: bus, bus to queue, bucket files and schedules"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"A CLI that generates and deploys the SST stack from the decorators"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["The bus name comes from ",e.jsx("code",{children:"EVENT_BUS_NAME"}),", set by the stack; nothing to configure"]})]})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),e.jsx(s,{tabs:[{code:`// packages/events/src/order-created.ts — imported by both sides
import { defineEvent } from '@turystack/nestjs-events'
import { z } from 'zod'

export const OrderCreated = defineEvent(
  'order.created',
  z.object({ identifier: z.string(), total: z.number() }),
)`,label:"Contract"},{code:`// apps/api/src/app.module.ts
import { PublisherModule } from '@turystack/nestjs-events/publisher'

@Module({
  imports: [PublisherModule.register({ adapter: 'aws', project: 'acme' })],
})
export class AppModule {}

// in a use case, after the commit
this.publisher.publish(OrderCreated, { identifier: order.order_id, total })`,label:"API"},{code:`// apps/workers/src/workers.module.ts — imported by every handler
export const AcmeWorkersModule = WorkersModule.register({
  adapter: 'aws',
  project: 'acme',
  infra: { bucket: 'files' },
})

// apps/workers/src/orders/reserve-stock.handler.ts
import type { EventPayload } from '@turystack/nestjs-events'
import { Handler, Serverless } from '@turystack/nestjs-events/workers'

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated }, { queue: { maxConcurrency: 5 } })
class ReserveStockHandler {
  async execute(event: EventPayload<typeof OrderCreated>) {}
}

@Module({ imports: [AcmeWorkersModule], providers: [ReserveStockHandler] })
class HandlerModule {}

export const handler = Serverless.create(HandlerModule)`,label:"Workers"}]})]})]})}export{i as component};
