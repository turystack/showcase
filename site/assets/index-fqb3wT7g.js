import{j as s}from"./index-B7Ig6kNO.js";import{C as e}from"./CodeBlock-jMISp3qZ.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";function r(){return s.jsxs("div",{className:"space-y-10",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/nestjs-logger"}),s.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Structured logging for NestJS on pluggable transport adapters. Pino + Elasticsearch built-in."})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),s.jsx(e,{tabs:[{code:"npm install @turystack/nestjs-logger",label:"npm"},{code:"pnpm add @turystack/nestjs-logger",label:"pnpm"},{code:"yarn add @turystack/nestjs-logger",label:"yarn"},{code:"bun add @turystack/nestjs-logger",label:"bun"}]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),s.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Extends NestJS ConsoleLogger"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Pluggable transports — Pino + Elasticsearch built-in"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Structured JSON logging"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Global module"})]})]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Quick Usage"}),s.jsx(e,{code:`import { ConfigModule } from '@turystack/nestjs-config'
import { LoggerModule } from '@turystack/nestjs-logger'
import { configSchema } from './config.schema'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    LoggerModule.register((config) => ({
      adapter: 'elasticsearch',
      elasticsearch: { node: config.get('ELASTICSEARCH_NODE') },
    })),
  ],
})
export class AppModule {}`,filename:"app.module.ts",language:"ts"})]})]})}export{r as component};
