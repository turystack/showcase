import{j as s}from"./index-CQ2_D3U_.js";import{C as e}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function i(){return s.jsxs("div",{className:"space-y-8",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@turystack/entity"}),s.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Class decorator that registers entities with superjson for type-safe serialization across boundaries."})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Installation"}),s.jsx(e,{tabs:[{code:"npm install @turystack/entity superjson",label:"npm"},{code:"pnpm add @turystack/entity superjson",label:"pnpm"},{code:"yarn add @turystack/entity superjson",label:"yarn"},{code:"bun add @turystack/entity superjson",label:"bun"}]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Features"}),s.jsxs("ul",{className:"space-y-2 text-muted-foreground",children:[s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"@Entity decorator with stable SuperJSON identifiers"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Preserves class instances, Dates, and non-JSON-native types"})]}),s.jsxs("li",{className:"flex items-start gap-2",children:[s.jsx("span",{className:"mt-1 text-lib",children:"→"}),s.jsx("span",{children:"Survives the trip through EventBridge events and queues"})]})]})]}),s.jsxs("div",{className:"space-y-3",children:[s.jsx("h2",{className:"font-display font-semibold text-xl",children:"Usage"}),s.jsx(e,{code:`import { Entity } from '@turystack/entity'

@Entity('orders.order')
class Order {
  id: string
  created_at: Date
}

@Entity('orders.order-item')
class OrderItem {
  product_id: string
  quantity: number
  price: number
}`,filename:"example.ts",language:"ts"})]})]})}export{i as component};
