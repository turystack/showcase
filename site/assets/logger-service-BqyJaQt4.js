import{j as e}from"./index-B7Ig6kNO.js";import{C as s}from"./CodeBlock-jMISp3qZ.js";import{P as a}from"./PropsTable-r9MRwph6.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const r=[{description:"Logs a debug-level message.",name:"debug",required:!1,type:"(message: string, args?: unknown): void"},{description:"Logs an info-level message.",name:"info",required:!1,type:"(message: string, args?: unknown): void"},{description:"Logs a message (default level).",name:"log",required:!1,type:"(message: string, args?: unknown): void"},{description:"Logs a warn-level message.",name:"warn",required:!1,type:"(message: string, args?: unknown): void"},{description:"Logs an error-level message.",name:"error",required:!1,type:"(message: string, args?: unknown): void"}];function d(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"LoggerService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Injectable service that extends NestJS ConsoleLogger with structured logging support."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Methods"}),e.jsx(s,{code:`debug(message: string, args?: unknown): void

info(message: string, args?: unknown): void

log(message: string, args?: unknown): void

warn(message: string, args?: unknown): void

error(message: string, args?: unknown): void`,filename:"logger-service.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(s,{code:`@Injectable()
class OrdersService {
  private readonly logger = new LoggerService(OrdersService.name)

  async create(data: CreateOrderDto) {
    this.logger.info('Creating order', { data })
  }
}`,filename:"orders.service.ts",language:"ts"})]}),e.jsx("div",{className:"space-y-4",children:e.jsx(a,{props:r})}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"LogMetadata"}),e.jsx("p",{className:"text-muted-foreground",children:"A key-value record type for structured log metadata. Pass as the second argument to any log method."}),e.jsx(s,{code:`interface LogMetadata {
  [key: string]: unknown
}`,filename:"logger.types.d.ts",language:"ts"}),e.jsx(s,{code:"this.logger.info('Order created', { orderId: '123', total: 99.9 })",filename:"orders.service.ts",language:"ts"})]})]})}export{d as component};
