import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const a=[{description:"Becomes the EventBridge DetailType. Not empty.",name:"name",required:!0,type:"string"},{description:"Validates on publish and again per record.",name:"schema",required:!0,type:"z.ZodType"}];function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Event contracts"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"An event is declared once. The API publishes it and the workers consume it, from the same constant."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"defineEvent"}),e.jsx(s,{code:`import { defineEvent, type EventPayload } from '@turystack/nestjs-events'
import { z } from 'zod'

export const OrderCreated = defineEvent(
  'order.created', // → EventBridge DetailType
  z.object({
    identifier: z.string(),
    total: z.number(),
    currency: z.string().default('BRL'),
  }),
)

export type OrderCreated = EventPayload<typeof OrderCreated>`,filename:"packages/events/src/order-created.ts",language:"ts"}),e.jsx(t,{props:a}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Events live in a shared ",e.jsx("code",{children:"packages/events"})," module (",e.jsx("code",{children:"@repo/events"}),"), imported by the API and the workers app."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Types"}),e.jsx(s,{code:`// what defineEvent returns, frozen
type EventContract<N extends string, S extends ZodType> = Readonly<{
  name: N
  schema: S
}>

// what a handler receives: the schema's output
type EventPayload<E extends EventContract> = z.infer<E['schema']>`,filename:"event.d.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"A renamed or reshaped event breaks the build of both sides instead of silently never firing."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"What goes on the wire"}),e.jsx("p",{className:"text-muted-foreground",children:"One file encodes and decodes, so publisher and workers never drift. superjson first, then the envelope."}),e.jsx(s,{code:`{
  "turystack": { "v": 1, "correlationId": "req-abc" },
  "data": { "identifier": "123", "total": 10 }
}`,filename:"message body",language:"json"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["superjson keeps ",e.jsx("code",{children:"Date"}),", ",e.jsx("code",{children:"Map"}),","," ",e.jsx("code",{children:"Set"})," and ",e.jsx("code",{children:"bigint"})," intact."]})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The correlation id rides in the payload: EventBridge has no field that reaches every target."})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsxs("span",{children:["The workers unwrap both layers before ",e.jsx("code",{children:"execute"}),". A schedule's payload passes untouched."]})]})]})]})]})}export{l as component};
