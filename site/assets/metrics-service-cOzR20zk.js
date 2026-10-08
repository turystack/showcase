import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"MetricsService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Fire-and-forget metric emission — every method is synchronous, returns void and never throws."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { MetricsService } from '@turystack/nestjs-observability'

class MetricsService {
  count<Name extends MetricName>(
    name: Name,
    value = 1,
    dimensions?: MetricDimensions<Name>,
  ): void

  gauge<Name extends MetricName>(
    name: Name,
    value: number,
    dimensions?: MetricDimensions<Name>,
  ): void

  duration<Name extends MetricName>(
    name: Name,
    millis: number,
    dimensions?: MetricDimensions<Name>,
  ): void
}`,filename:"metrics.service.d.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"count emits unit 'Count' (value defaults to 1), gauge emits a point-in-time value with unit 'None', duration emits milliseconds with unit 'Milliseconds'."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{tabs:[{code:`import { Injectable } from '@nestjs/common'
import { MetricsService } from '@turystack/nestjs-observability'

@Injectable()
export class OrderService {
  constructor(private readonly metrics: MetricsService) {}

  async create(input: CreateOrderInput) {
    const startedAt = Date.now()
    const order = await this.repository.save(input)

    this.metrics.count('OrderCreated', 1, { paymentMethod: input.paymentMethod })
    this.metrics.duration('OrderCreate', Date.now() - startedAt)
    this.metrics.gauge('OrderQueueDepth', await this.queue.size())

    return order
  }
}`,label:"emit"},{code:`declare module '@turystack/nestjs-observability' {
  interface MetricMap {
    OrderCreated: { dimensions: { paymentMethod: string } }
  }
}

metrics.count('OrderCreated', 1, { paymentMethod: 'pix' }) // typed
metrics.count('Unknown', 1) // compile error once MetricMap is augmented`,label:"typed names"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Notes"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Fire-and-forget by design: the adapter call is wrapped in try/catch and errors are swallowed — a broken metric backend cannot break the app or add latency to the request path"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"MetricMap is an empty interface the consumer augments via declare module — it types metric names and per-name dimensions on both MetricsService and @Measure. Without augmentation any string name is accepted and dimensions are Record<string, string>"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Low-cardinality rule: every distinct dimension-value combination is a separate CloudWatch metric (and a separate charge). Dimensions are for slicing — env, service, domain, operation, status — never ids (userId, orderId, requestId). Ids belong in logs, not dimensions"})]})]})]})]})}export{n as component};
