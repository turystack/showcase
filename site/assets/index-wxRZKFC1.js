import{j as s}from"./index-CQ2_D3U_.js";import{C as e}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function l(){return s.jsxs("div",{className:"space-y-8",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/saga"}),s.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Orchestrator for distributed compensating transactions with LIFO rollback and structured logging."})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),s.jsx(e,{tabs:[{code:"npm install @turystack/saga @turystack/nestjs-logger",label:"npm"},{code:"pnpm add @turystack/saga @turystack/nestjs-logger",label:"pnpm"},{code:"yarn add @turystack/saga @turystack/nestjs-logger",label:"yarn"},{code:"bun add @turystack/saga @turystack/nestjs-logger",label:"bun"}]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),s.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Register compensation functions for multi-step operations"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"LIFO rollback ensures compensations run in reverse order"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Resilient execution — individual failures don't stop remaining compensations"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Concurrent rollback calls share a single execution"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Optional logger injection for testing and integration"})]})]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),s.jsx(e,{code:`import { Saga } from '@turystack/saga'

async function createOrderWithPayment(data: CreateOrderDto) {
  const saga = new Saga('CreateOrder')

  try {
    const order = await createOrder(data)
    saga.addCompensation(() => deleteOrder(order.id))

    const payment = await chargePayment(order)
    saga.addCompensation(() => refundPayment(payment.id))

    return { order, payment }
  } catch (error) {
    await saga.rollback()
    throw error
  }
}`,filename:"example.ts",language:"ts"})]})]})}export{l as component};
