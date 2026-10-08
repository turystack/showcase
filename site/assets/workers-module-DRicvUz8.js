import{j as e,L as t}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as r}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const a=[{default:"—",description:"Event parsing and the publisher transport.",name:"adapter",required:!0,type:"'aws'"},{default:"—",description:"With the stage, prefixes every name and SSM path.",name:"project",required:!0,type:"string"},{default:"project",description:"Source of the events a handler publishes.",name:"source",required:!1,type:"string"},{default:"SDK",description:"The publisher client: region, credentials.",name:"aws",required:!1,type:"PublisherAwsOptions"},{default:"—",description:"Deploy-only. Resources the workers stack creates.",name:"infra",required:!1,type:"WorkersInfraOptions"}],n=[{default:"'events'",description:"The project bus: <stage>-<project>-<bus>.",name:"bus",required:!1,type:"string"},{default:"unset",description:"Project bucket, <stage>-<project>-<bucket>-<hash6>.",name:"bucket",required:!1,type:"string"}];function p(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"WorkersModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The workers app's side: event parsing for every handler, plus the publisher."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { WorkersModule } from '@turystack/nestjs-events/workers'

WorkersModule.register(options: WorkersModuleOptions): DynamicModule`,filename:"workers-module.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx("p",{className:"text-muted-foreground",children:"Declared once, in a module every handler imports. The infra CLI reads it from there."}),e.jsx(s,{code:`// apps/workers/src/workers.module.ts
import { WorkersModule } from '@turystack/nestjs-events/workers'

export const AcmeWorkersModule = WorkersModule.register({
  adapter: 'aws',
  project: 'acme',
  infra: { bus: 'events', bucket: 'files' },
})

// apps/workers/src/orders/reserve-stock.handler.ts
@Module({
  imports: [AcmeWorkersModule],
  providers: [ReserveStockHandler],
})
class HandlerModule {}`,filename:"apps/workers",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"WorkersModuleOptions"}),e.jsx(r,{props:a}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["The same in every handler, or generate fails. Declare it once in"," ",e.jsx("code",{children:"workers.module.ts"}),"."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:[e.jsx("code",{children:"project"}),", ",e.jsx("code",{children:"bus"})," and ",e.jsx("code",{children:"bucket"}),": lowercase letters, digits and ",e.jsx("code",{children:"-"}),"."]})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"WorkersInfraOptions"}),e.jsx("p",{className:"text-muted-foreground",children:"Read by the infra CLI when it imports the handlers. The runtime ignores it."}),e.jsx(r,{props:n}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Omit ",e.jsx("code",{children:"bucket"})," and no bucket is created. S3 handlers need it."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Publishing from a handler"}),e.jsxs("p",{className:"text-muted-foreground",children:["WorkersModule provides ",e.jsx("code",{children:"PublisherService"}),". A handler that reacts and publishes injects it."]}),e.jsx(s,{code:`import { Handler, PublisherService } from '@turystack/nestjs-events/workers'

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class ReserveStockHandler {
  constructor(private readonly publisher: PublisherService) {}

  async execute(event: EventPayload<typeof OrderCreated>) {
    // …
    this.publisher.publish(StockReserved, { identifier: event.identifier })
  }
}`,filename:"reserve-stock.handler.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The bus name is ",e.jsx("code",{children:"EVENT_BUS_NAME"}),", injected by the stack. Names and resources:"," ",e.jsx(t,{className:"text-lib underline",to:"/libs/nestjs-events/infra",children:"Infra & CLI"}),"."]})]})]})}export{p as component};
