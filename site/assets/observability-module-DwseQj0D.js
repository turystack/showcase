import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as t}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const i=[{description:"The metric backend to use.",name:"adapter",required:!0,type:"'cloudwatch' | 'local'"},{description:"CloudWatch metric namespace (e.g. 'MyApp'). Only with adapter: 'cloudwatch'.",name:"cloudwatch.namespace",required:!0,type:"string"},{description:"Dimensions attached to every metric (e.g. env, service). They form the first EMF dimension set.",name:"defaultDimensions",type:"Record<string, string>"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"ObservabilityModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"A global NestJS DynamicModule that registers the metric adapter, the MetricsService and the singleton behind @Measure."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { ObservabilityModule } from '@turystack/nestjs-observability'

ObservabilityModule.register(
  options: ObservabilityModuleOptions | ((config: ConfigService) => ObservabilityModuleOptions),
): DynamicModule`,filename:"observability-module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app. The module is global: register it once in the root module and inject MetricsService anywhere, no imports needed."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{tabs:[{code:`import { Module } from '@nestjs/common'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { ObservabilityModule } from '@turystack/nestjs-observability'
import { z } from 'zod'

const configSchema = defineConfigSchema({
  METRICS_NAMESPACE: z.string(),
  NODE_ENV: z.string(),
})

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    ObservabilityModule.register((config) => ({
      adapter: 'cloudwatch',
      cloudwatch: { namespace: config.get('METRICS_NAMESPACE') },
      defaultDimensions: {
        env: config.get('NODE_ENV'),
        service: 'orders-api',
      },
    })),
  ],
})
export class AppModule {}`,label:"cloudwatch"},{code:`import { Module } from '@nestjs/common'
import { ObservabilityModule } from '@turystack/nestjs-observability'

@Module({
  imports: [
    ObservabilityModule.register({
      adapter: 'local',
      defaultDimensions: { service: 'orders-api' },
    }),
  ],
})
export class AppModule {}`,label:"local"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"ObservabilityModuleOptions"}),e.jsx(t,{props:i})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Notes"}),e.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The 'cloudwatch' adapter uses EMF (Embedded Metric Format): each metric is ONE bare JSON line written straight to process.stdout — never through a logger, which would wrap the line and break EMF parsing. CloudWatch Logs extracts the metric from the envelope, so emitting costs zero API calls, zero SDK and zero request latency"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Dimension sets: defaultDimensions alone form one set; when a metric also carries its own dimensions, a second set combines both — so the metric can be queried at either granularity"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"The 'local' adapter is for dev/standalone runs: metrics are logged through the LoggerService from @turystack/nestjs-logger under the 'Metrics' context instead of being shipped anywhere"})]}),e.jsxs("li",{className:"flex items-start gap-2",children:[e.jsx("span",{className:"mt-1 text-lib",children:"→"}),e.jsx("span",{children:"Custom backends implement IObservabilityAdapter (record(input): void — synchronous, never throws) and bind to the OBSERVABILITY_ADAPTER token"})]})]}),e.jsx(s,{code:`{
  "_aws": {
    "CloudWatchMetrics": [
      {
        "Dimensions": [["env", "service"], ["env", "service", "status"]],
        "Metrics": [{ "Name": "Checkout", "Unit": "Milliseconds" }],
        "Namespace": "MyApp"
      }
    ],
    "Timestamp": 1721400000000
  },
  "env": "production",
  "service": "orders-api",
  "status": "success",
  "Checkout": 412
}`,filename:"stdout — one EMF line, shown expanded",language:"json"})]})]})}export{c as component};
