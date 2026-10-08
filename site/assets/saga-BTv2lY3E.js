import{j as e}from"./index-CQ2_D3U_.js";import{C as a}from"./CodeBlock-ftRQod4w.js";import{P as s}from"./PropsTable-CmvKG47z.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";const t=[{description:"Registers a compensation function to be executed on rollback. Compensations are executed in reverse order (LIFO).",name:"addCompensation(fn)",type:"(fn: () => Promise<unknown> | unknown) => void"},{description:"Executes all registered compensations in reverse order. Individual failures are logged but do not stop remaining compensations.",name:"rollback()",type:"() => Promise<void>"}];function c(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Saga"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Register a compensation for each completed step; on failure, rollback undoes them in reverse order."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Constructor"}),e.jsx(a,{code:"new Saga(name: string, loggerService?: SagaLogger)",filename:"saga.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Methods"}),e.jsx(s,{props:t})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Concurrency"}),e.jsxs("p",{className:"text-muted-foreground",children:["Concurrent calls to ",e.jsx("code",{children:"rollback()"})," share the same execution. Compensations registered while a rollback is running are preserved for the next rollback instead of running in the active batch."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),e.jsx(a,{code:`import { Saga } from '@turystack/saga'

async function createOrderWithPayment(data: CreateOrderDto) {
  const saga = new Saga('CreateOrder')

  try {
    const order = await createOrder(data)
    saga.addCompensation(() => deleteOrder(order.id))

    const payment = await chargePayment(order)
    saga.addCompensation(() => refundPayment(payment.id))

    const shipment = await createShipment(order)
    saga.addCompensation(() => cancelShipment(shipment.id))

    return { order, payment, shipment }
  } catch (error) {
    await saga.rollback()
    throw error
  }
}`,filename:"example.ts",language:"ts"})]})]})}export{c as component};
