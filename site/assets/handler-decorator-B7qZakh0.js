import{j as e,L as s}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import{P as r}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const n=[{description:"From defineEvent. Validates records, names the rule.",name:"event",required:!0,type:"EventContract"}],a=[{description:"Validates each record before execute.",name:"schema",required:!1,type:"ZodSchema"}],d=[{description:"Bus rule straight to the lambda.",name:"EVENTBRIDGE",required:!1,type:"event detail"},{description:"Bus rule → own queue + DLQ → lambda.",name:"EVENTBRIDGE-SQS",required:!1,type:"event detail"},{description:"Bucket file → default bus → own queue → lambda.",name:"S3",required:!1,type:"S3Object"},{description:"EventBridge Scheduler → lambda.",name:"SCHEDULE",required:!1,type:"event detail"}],i=[{default:"'512 MB'",description:"128 MB to 10240 MB.",name:"function.memory",required:!1,type:"InfraSize"},{default:"'30 seconds'",description:"Up to 15 minutes.",name:"function.timeout",required:!1,type:"InfraDuration"},{default:"'arm64'",description:"Lambda CPU architecture.",name:"function.architecture",required:!1,type:"'arm64' | 'x86_64'"},{default:"unset",description:"reserved must be ≥ queue.maxConcurrency.",name:"function.concurrency",required:!1,type:"{ reserved?, provisioned? }"},{default:"10",description:"Queued sources. Above 10 needs batchWindow ≥ 1 s.",name:"queue.batchSize",required:!1,type:"number"},{default:"unset",description:"Up to 5 minutes.",name:"queue.batchWindow",required:!1,type:"InfraDuration"},{default:"3",description:"Deliveries before the DLQ.",name:"queue.maxReceive",required:!1,type:"number"},{default:"unset",description:"2 to 1000. Caps the SQS to lambda fan-out.",name:"queue.maxConcurrency",required:!1,type:"number"},{default:"6× timeout",description:"Never below the function timeout.",name:"queue.visibilityTimeout",required:!1,type:"InfraLongDuration"},{default:"—",description:"SCHEDULE only. rate(...) or cron(...).",name:"trigger.schedule",required:!0,type:"string"},{default:"UTC",description:"SCHEDULE only. IANA timezone of the cron.",name:"trigger.timezone",required:!1,type:"string"},{default:"{}",description:"SCHEDULE only. Plain JSON, the record body.",name:"trigger.payload",required:!1,type:"unknown"},{default:"unset",description:"Bus sources only. Filters on the event Source.",name:"trigger.sources",required:!1,type:"[string, ...string[]]"},{default:"—",description:"S3 only. Key prefix in the bucket, e.g. 'avatars/'.",name:"trigger.path",required:!0,type:"string"},{default:"unset",description:"S3 only. Key suffix, e.g. '.png'.",name:"trigger.suffix",required:!1,type:"string"},{default:"['Object Created']",description:"S3 only. Also 'Object Deleted'.",name:"trigger.events",required:!1,type:"S3EventName[]"}];function h(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Handler"}),e.jsxs("p",{className:"mt-3 text-lg text-muted-foreground",children:["Registers a class as the lambda's handler. The options type"," ",e.jsx("code",{children:"execute(event)"})," at compile time."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import type { EventContract } from '@turystack/nestjs-events'
import { Handler, type HandlerInfra } from '@turystack/nestjs-events/workers'

// EVENTBRIDGE, EVENTBRIDGE-SQS
@Handler(source, options: { event: EventContract }, infra?: HandlerInfra<Source>)

// S3, SCHEDULE — infra holds their trigger, so it is required
@Handler(source, options: { schema?: ZodSchema } | undefined, infra: HandlerInfra<Source>)`,filename:"handler.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsxs("p",{className:"text-muted-foreground",children:["Bus sources take the event from ",e.jsx("code",{children:"defineEvent"}),", the contract the producer publishes with."]}),e.jsx(t,{code:`import type { EventPayload } from '@turystack/nestjs-events'
import { type S3Object, Handler } from '@turystack/nestjs-events/workers'
import { OrderCreated } from '@repo/events' // defineEvent(...)
import { z } from 'zod'

// EVENTBRIDGE-SQS — bus rule → own queue + DLQ → lambda
@Handler('EVENTBRIDGE-SQS', { event: OrderCreated }, {
  queue: { maxConcurrency: 5, maxReceive: 4 },
  function: { timeout: '1 minute', concurrency: { reserved: 5 } },
})
class ReserveStockHandler {
  async execute(event: EventPayload<typeof OrderCreated>) {}
}

// EVENTBRIDGE — bus rule → lambda, filtered by Source
@Handler('EVENTBRIDGE', { event: OrderCreated }, {
  trigger: { sources: ['orders-api'] },
})
class AuditOrderHandler {
  async execute(event: EventPayload<typeof OrderCreated>) {}
}

// SCHEDULE — takes { schema }; the trigger is required to deploy
const nightly = z.object({ kind: z.literal('nightly') })

@Handler('SCHEDULE', { schema: nightly }, {
  trigger: { schedule: 'cron(0 3 * * ? *)', timezone: 'America/Sao_Paulo', payload: { kind: 'nightly' } },
  function: { timeout: '5 minutes' },
})
class NightlyReportHandler {
  async execute(event: z.infer<typeof nightly>) {}
}

// S3 — a .png saved under avatars/ in the project bucket → own queue → lambda
@Handler('S3', {}, {
  trigger: { path: 'avatars/', suffix: '.png', events: ['Object Created'] },
  queue: { maxReceive: 5 },
})
class ResizeAvatarHandler {
  async execute(file: S3Object) {} // { bucket, key, size, eTag }
}`,filename:"handlers.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"One event per handler"}),e.jsxs("p",{className:"text-muted-foreground",children:["The option is ",e.jsx("code",{children:"event"}),", singular. A list would give"," ",e.jsx("code",{children:"execute"})," a union with no way to tell which event came."]}),e.jsx("p",{className:"text-muted-foreground",children:"An event can have many handlers. Each gets its own bus rule, queue and DLQ."}),e.jsx(t,{code:`// 1 event → 3 handlers: three rules, three queues, three DLQs
@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class ReserveStockHandler {
  async execute(event: OrderCreated) {}
}

@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class SendReceiptHandler {
  async execute(event: OrderCreated) {}
}

@Handler('EVENTBRIDGE', { event: OrderCreated })
class AuditOrderHandler {
  async execute(event: OrderCreated) {}
}`,filename:"fan-out.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground",children:"Two events with the same reaction are two thin handlers calling one use case."}),e.jsx(t,{code:`@Handler('EVENTBRIDGE-SQS', { event: OrderCreated })
class NotifyOnCreatedHandler {
  constructor(private readonly notify: NotifyCustomerUseCase) {}
  async execute(event: EventPayload<typeof OrderCreated>) {
    await this.notify.execute(event.identifier)
  }
}

@Handler('EVENTBRIDGE-SQS', { event: OrderCancelled })
class NotifyOnCancelledHandler {
  constructor(private readonly notify: NotifyCustomerUseCase) {}
  async execute(event: EventPayload<typeof OrderCancelled>) {
    await this.notify.execute(event.identifier)
  }
}`,filename:"same-reaction.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Input transforms (AWS context)"}),e.jsx("p",{className:"text-muted-foreground",children:"Every source goes through EventBridge, and each one gets generated infra."}),e.jsx(r,{props:d}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"SQS and EventBridge envelopes are unwrapped. The schema validates the final payload."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Every source goes through EventBridge: a queue only sits behind a rule."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Options"}),e.jsxs("p",{className:"text-muted-foreground",children:["EVENTBRIDGE and EVENTBRIDGE-SQS take ",e.jsx("code",{children:"{ event }"}),". A missing event throws at decoration."]}),e.jsx(r,{props:n}),e.jsxs("p",{className:"text-muted-foreground",children:["S3 and SCHEDULE take an optional ",e.jsx("code",{children:"{ schema }"}),". S3 has no defineEvent: S3 is the producer."]}),e.jsx(r,{props:a})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Infra (third argument)"}),e.jsx("p",{className:"text-muted-foreground",children:"Deploy-only: it never changes runtime behaviour. Optional for the bus sources; S3 and SCHEDULE need it for their trigger."}),e.jsx(r,{props:i}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:[e.jsx("code",{children:"queue"})," applies to EVENTBRIDGE-SQS and S3, the two sources delivered through a queue."]}),e.jsxs("p",{className:"text-muted-foreground",children:[e.jsx("code",{children:"reserved"})," caps the lambda for every trigger."," ",e.jsx("code",{children:"maxConcurrency"})," caps only how many invocations SQS starts."]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["A ",e.jsx("code",{children:"reserved"})," below ",e.jsx("code",{children:"maxConcurrency"})," throttles and bounces messages, so generate rejects it."]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["How it is generated and deployed:"," ",e.jsx(s,{className:"text-lib underline",to:"/libs/nestjs-events/infra",children:"Infra & CLI"}),"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Types"}),e.jsx(t,{code:`// @turystack/nestjs-events — what defineEvent returns
type EventContract<N extends string, S extends ZodType> = Readonly<{
  name: N   // the bus rule DetailType
  schema: S // validated again per record
}>

type EventPayload<E extends EventContract> = z.infer<E['schema']>

// @turystack/nestjs-events/workers

// what an S3 handler receives, per file
type S3Object = { bucket: string; key: string; size?: number; eTag?: string }

// the third argument; never when the source has no infra
type HandlerInfra<Source> = Source extends InfraSource ? InfraSourceMap[Source] : never`,filename:"workers.types.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("h2",{className:"font-display font-semibold text-xl",children:["IHandler","<T>"]}),e.jsxs("p",{className:"text-muted-foreground",children:["The shape every ",e.jsx("code",{children:"@Handler()"})," class has: one"," ",e.jsx("code",{children:"execute(event: T)"})," method."]}),e.jsx(t,{code:`interface IHandler<T = unknown> {
  execute(event: T): Promise<void>
}`,filename:"workers.types.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"EventSource"}),e.jsx("p",{className:"mb-4 text-muted-foreground",children:"Trigger names, typed per adapter through ServerlessSourceMap. With only the built-in AWS adapter:"}),e.jsx(t,{code:`type AwsEventSource =
  | 'EVENTBRIDGE'      // project bus rule → lambda
  | 'EVENTBRIDGE-SQS'  // project bus rule → handler queue → lambda
  | 'S3'               // project bucket file → default bus → handler queue → lambda
  | 'SCHEDULE'         // EventBridge Scheduler → lambda`,filename:"workers.types.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Every record is its own operation"}),e.jsx("p",{className:"text-muted-foreground",children:"Each record runs in its own context scope and inherits the correlation id the publisher sent."}),e.jsx(t,{code:`turystack.correlation_id   inherited from the message body
handler                    the handler class name
attempt                    delivery count, when the source reports it`,filename:"context attributes",language:"bash"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"They ride on every log line and span of that record, so a fifth delivery reads differently from the first."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Delivery attempt"}),e.jsx("p",{className:"text-muted-foreground",children:"SQS reports the delivery count, so a handler can tell the last try before the DLQ from the first."}),e.jsx(t,{code:`type ParsedRecord = {
  attempt?: number   // 1 on first delivery; absent when the source has no counter
  body: unknown
  recordId?: string
}`,filename:"workers.adapter.interface.d.ts",language:"ts"}),e.jsx(t,{code:`EVENTBRIDGE-SQS   ApproximateReceiveCount → attempt
S3                same counter — delivered by the handler's queue
EVENTBRIDGE       no retry counter → attempt is undefined
SCHEDULE          no retry counter → attempt is undefined`,filename:"per source",language:"bash"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Only the queued sources report it. EVENTBRIDGE and SCHEDULE always see"," ",e.jsx("code",{children:"undefined"}),"."]})]})]})}export{h as component};
