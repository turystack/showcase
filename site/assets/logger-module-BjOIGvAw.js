import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as r}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const o=[{description:"The logger adapter to use.",name:"adapter",required:!0,type:"'elasticsearch'"},{description:"The Elasticsearch node URL.",name:"elasticsearch.node",required:!1,type:"string"},{description:"The Elasticsearch Cloud ID.",name:"elasticsearch.cloudId",required:!1,type:"string"},{description:"The Elasticsearch username.",name:"elasticsearch.username",required:!1,type:"string"},{description:"The Elasticsearch password.",name:"elasticsearch.password",required:!1,type:"string"},{description:"The Elasticsearch API key. Takes precedence over username/password.",name:"elasticsearch.apiKey",required:!1,type:"string"},{description:"The minimum log level.",name:"level",required:!1,type:"'debug' | 'info' | 'warn' | 'error'"}];function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"LoggerModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"A NestJS DynamicModule that registers the logger service and its Elasticsearch connection."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(s,{code:`import { LoggerModule } from '@turystack/nestjs-logger'

LoggerModule.register(
  options: LoggerModuleOptions | ((config: ConfigService) => LoggerModuleOptions),
): DynamicModule`,filename:"logger-module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{tabs:[{code:`import { LoggerModule } from '@turystack/nestjs-logger'

@Module({
  imports: [
    LoggerModule.register({
      adapter: 'elasticsearch',
      elasticsearch: { node: 'http://localhost:9200' },
    }),
  ],
})
export class AppModule {}`,label:"Static"},{code:`import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { LoggerModule } from '@turystack/nestjs-logger'
import { z } from 'zod'

const configSchema = defineConfigSchema({ ELASTICSEARCH_NODE: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    LoggerModule.register((config) => ({
      adapter: 'elasticsearch',
      elasticsearch: { node: config.get('ELASTICSEARCH_NODE') },
    })),
  ],
})
export class AppModule {}`,label:"From config"}]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"LoggerModuleOptions"}),e.jsx(r,{props:o})]})]})}export{n as component};
