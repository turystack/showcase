import{j as e}from"./index-CQ2_D3U_.js";import{C as s}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function l(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-observability"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Metrics as logs: fire-and-forget counters, gauges, and durations via EMF. CloudWatch built-in, zero latency in the request path."})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),e.jsx(s,{tabs:[{code:"pnpm add @turystack/nestjs-observability",label:"pnpm"},{code:"npm install @turystack/nestjs-observability",label:"npm"},{code:"yarn add @turystack/nestjs-observability",label:"yarn"},{code:"bun add @turystack/nestjs-observability",label:"bun"}]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),e.jsx(s,{code:`import {
  Measure,
  MetricsService,
  ObservabilityModule,
} from '@turystack/nestjs-observability'

@Module({
  imports: [
    ObservabilityModule.register((config) => ({
      adapter: 'cloudwatch',
      cloudwatch: { namespace: 'my-api' },
      defaultDimensions: {
        env: config.get('NODE_ENV'),
        service: 'my-api',
      },
    })),
  ],
})
export class AppModule {}

@Injectable()
export class OrderService {
  constructor(private readonly metrics: MetricsService) {}

  @Measure('order.create')
  async create(input: CreateOrder) {
    const order = await this.db.orders.create(input)

    this.metrics.count('OrderCreated', 1, { status: order.status })

    return order
  }
}`,filename:"app.module.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The metric is a log line (EMF — Embedded Metric Format): CloudWatch extracts it asynchronously, so there are zero API calls and zero latency in the request path"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"count / gauge / duration are void and never throw — fire-and-forget like the publisher"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"@Measure('name') wraps a method and emits duration + count with status success | error automatically"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Dimensions are typed via MetricMap augmentation — and must be low cardinality (env, service, domain, operation, status; never ids)"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Native in Lambda (stdout → CloudWatch Logs → metric); ECS/EC2 needs the CloudWatch Agent or Fluent Bit shipping stdout"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"adapter: 'local' logs metrics through nestjs-logger for dev; custom vendors via IObservabilityAdapter + OBSERVABILITY_ADAPTER"})]})]})]})]})}export{l as component};
