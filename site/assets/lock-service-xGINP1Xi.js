import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import{P as r}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const s=[{default:"10000",description:"Time-to-live for the lock in milliseconds.",name:"ttl",required:!1,type:"number"},{default:"5000",description:"Maximum time in milliseconds to wait for the lock to become available.",name:"waitTimeout",required:!1,type:"number"},{default:"100",description:"Interval in milliseconds between retry attempts to acquire the lock.",name:"retryInterval",required:!1,type:"number"}];function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"LockService"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Injectable service that acquires and releases distributed locks."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:`import { LockService, LockError, type LockOptions } from '@turystack/nestjs-lock'

lock(key: string, options?: LockOptions): Promise<{ unlock: () => Promise<void> }>`,filename:"lock-service.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(t,{code:`import { LockService } from '@turystack/nestjs-lock'

@Injectable()
export class OrderService {
  constructor(private readonly lockService: LockService) {}

  async processOrder(orderId: string) {
    const { unlock } = await this.lockService.lock(\`order:\${orderId}\`)
    try {
      // critical section
    } finally {
      await unlock()
    }
  }
}`,filename:"order.service.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"LockOptions"}),e.jsx(r,{props:s})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"LockError"}),e.jsxs("p",{className:"text-muted-foreground",children:["Extends ",e.jsx("code",{className:"text-sm",children:"ConflictException"})," (HTTP 409). Thrown when the lock cannot be acquired within the configured wait timeout."]}),e.jsx(t,{code:`import { LockError, LockService } from '@turystack/nestjs-lock'

async processOrder(orderId: string) {
  try {
    const { unlock } = await this.lockService.lock(\`order:\${orderId}\`)
    try {
      // critical section
    } finally {
      await unlock()
    }
  } catch (error) {
    if (error instanceof LockError) {
      // lock timeout — 409 Conflict
    }
  }
}`,filename:"order.service.ts",language:"ts"})]})]})}export{n as component};
