import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import{P as o}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const s=[{default:'"x-correlation-id"',description:"Header carrying an inbound correlation id, so a chain that started upstream keeps its identifier.",name:"header",required:!1,type:"string"},{default:"true",description:"Attaches correlationId, actorId and tenantId to every line logged through @turystack/nestjs-logger. No-op when the logger is not installed.",name:"enrichLogs",required:!1,type:"boolean"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"ContextModule"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Registers the request context for the whole application."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { ContextModule } from '@turystack/nestjs-context'

ContextModule.register(
  options?: ContextModuleOptions | ((config: ConfigService) => ContextModuleOptions),
): DynamicModule`,filename:"context.module.d.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["The factory form injects the ConfigService from @turystack/nestjs-config — requires ConfigModule.register(","{"," schema"," ","}",") in the app."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"ContextModuleOptions"}),e.jsx(o,{props:s})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{tabs:[{code:`import { ContextModule } from '@turystack/nestjs-context'

@Module({
  imports: [ContextModule.register()],
})
export class AppModule {}`,label:"Static"},{code:`import { ContextModule } from '@turystack/nestjs-context'
import { ConfigModule, defineConfigSchema } from '@turystack/nestjs-config'
import { z } from 'zod'

const configSchema = defineConfigSchema({ CORRELATION_HEADER: z.string() })

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    ContextModule.register((config) => ({
      header: config.get('CORRELATION_HEADER'),
    })),
  ],
})
export class AppModule {}`,label:"From config"}]}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"The module is global. Logging, tracing, auditing and publishing all read the context, so requiring every module to import it would be noise."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Logs get the correlation id for free"}),e.jsxs("p",{className:"text-muted-foreground",children:["With ",e.jsx("code",{children:"enrichLogs"})," on, every line written through @turystack/nestjs-logger carries the operation's fields without any caller passing them."]}),e.jsx(t,{code:`logger.info('Order cancelled', { orderId: 'o1' })

// what the adapter receives:
{ correlationId: 'req-42', actorId: 'user-9', orderId: 'o1' }`,filename:"enrichment",language:"ts"}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"An explicit argument always wins a key collision — the caller is more specific than the ambient value. The dependency points one way: the logger knows nothing about this package, and this module pushes the reader into it, so the two never form a cycle."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Who opens the scope"}),e.jsx(t,{code:`@turystack/nestjs-server       HTTP request — honours x-correlation-id, echoes it back
@turystack/nestjs-events       one scope per record or scheduled tick, inheriting the publisher's id
@WithContext()                 anything else — CLI, custom entrypoint`,filename:"entrypoints",language:"bash"}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Each of those declares this package as an ",e.jsx("em",{children:"optional"})," peer: an application without it works the same, only without correlation."]})]})]})}export{c as component};
