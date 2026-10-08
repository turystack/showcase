import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import{P as t}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const r=[{default:"—",description:"Publishes every event to EventBridge.",name:"adapter",required:!0,type:"'aws'"},{default:"—",description:"The same project the workers app declares.",name:"project",required:!0,type:"string"},{default:"project",description:"Event Source; what trigger.sources filters on.",name:"source",required:!1,type:"string"},{default:"SDK",description:"AWS_REGION or the profile when unset.",name:"aws.region",required:!1,type:"string"},{default:"SDK",description:"The default provider chain when unset.",name:"aws.credentials",required:!1,type:"{ accessKeyId, secretAccessKey }"}],a=[{description:"A contract made by defineEvent.",name:"event",required:!0,type:"EventContract"},{description:"Payload, typed as z.input of the schema.",name:"data",required:!0,type:"z.input<typeof event.schema>"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Publisher"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The API's side: fire-and-forget publishing of contracts onto the project bus."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"PublisherModule"}),e.jsx(s,{code:`import { PublisherModule } from '@turystack/nestjs-events/publisher'

@Module({
  imports: [
    PublisherModule.register({ adapter: 'aws', project: 'acme' }),
  ],
})
export class AppModule {}`,filename:"apps/api/src/app.module.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Global: register it once in the app root. Domain packages just inject"," ",e.jsx("code",{children:"PublisherService"}),"."]}),e.jsx(t,{props:r})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"The bus"}),e.jsxs("p",{className:"text-muted-foreground",children:["Not an option. The workers stack owns it, named"," ",e.jsx("code",{children:"<stage>-<project>-events"}),"."]}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["Its name is read from ",e.jsx("code",{children:"EVENT_BUS_NAME"}),". Boot fails when it is unset."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The stack injects it into the lambdas and writes it to SSM for the API."})]})]}),e.jsx(s,{code:"EVENT_BUS_NAME=dev-acme-events   # SSM /dev/acme/EVENT_BUS_NAME",filename:"apps/api environment",language:"bash"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"PublisherService"}),e.jsx(s,{code:`import { PublisherService } from '@turystack/nestjs-events/publisher'

publish(event: EventContract, data: z.input<typeof event.schema>): void
flush(): Promise<void> // awaits everything in flight`,filename:"publisher-service.d.ts",language:"ts"}),e.jsx(t,{props:a})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsxs("p",{className:"text-muted-foreground",children:["Work, commit the write, then publish. ",e.jsx("code",{children:"publish()"})," returns"," ",e.jsx("code",{children:"void"}),"; delivery failures are logged, never thrown."]}),e.jsx(s,{code:`import { PublisherService } from '@turystack/nestjs-events/publisher'
import { OrderCreated } from '@repo/events'

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private readonly orders: OrderRepository,
    private readonly publisher: PublisherService,
  ) {}

  async execute(input: CreateOrderInput) {
    const order = await this.orders.create(input) // committed before the event

    this.publisher.publish(OrderCreated, {
      identifier: order.order_id,
      total: order.total, // currency defaults to 'BRL'
    })

    return order
  }
}`,filename:"create-order.use-case.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Validation"}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{children:"publish()"})," parses ",e.jsx("code",{children:"data"})," synchronously and throws on invalid input, before anything is sent."]}),e.jsxs("p",{className:"text-muted-foreground",children:["The original ",e.jsx("code",{children:"data"})," is sent. The consumer parses it once, so transforms never run twice."]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["An entry EventBridge refuses (",e.jsx("code",{children:"FailedEntryCount"}),") counts as a failed delivery and is logged."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Publish after the commit"}),e.jsx("p",{className:"text-muted-foreground",children:"Inside a transaction, an event announces a write that may still roll back. Publish once the commit succeeded."}),e.jsx(s,{code:`import { onAfterCommit } from '@turystack/nestjs-database'

onAfterCommit(() => this.publisher.publish(OrderCreated, payload))`,filename:"usage",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Delivery is at-most-once: a crash between commit and publish loses the event."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"flush"}),e.jsx("p",{className:"text-muted-foreground",children:"Awaits every delivery still in flight. App code never calls it."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Serverless.create flushes before the lambda freezes; the service flushes itself on shutdown."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Who consumes an event"}),e.jsx("p",{className:"text-muted-foreground",children:"A workers handler, never a listener in the publishing process. It imports the same contract."}),e.jsx(s,{code:`import { Handler } from '@turystack/nestjs-events/workers'
import { OrderCreated } from '@repo/events'

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated }, { queue: { /* … */ } })
export class ReserveStockHandler {
  async execute(event: OrderCreated) {
    // …
  }
}`,filename:"apps/workers/src/orders/reserve-stock.handler.ts",language:"ts"})]})]})}export{c as component};
