import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"@Entity"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Class decorator that registers a class with superjson so types survive serialization across messaging boundaries."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Signature"}),e.jsx(t,{code:"function Entity(identifier?: string): (Constructor: Class) => void",filename:"entity.d.ts",language:"ts"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Creating a domain entity"}),e.jsx(t,{code:`import { Entity } from '@turystack/entity'
import { OrderExceptions } from './order.exceptions'

@Entity('orders.order')
class Order {
  constructor(
    readonly id: string,
    readonly customer_id: string,
    readonly total: number,
    readonly created_at: Date,
    private status: 'pending' | 'paid' = 'pending',
  ) {}

  markAsPaid() {
    if (this.status === 'paid') {
      throw new OrderExceptions.order.alreadyPaid({ orderId: this.id })
    }

    this.status = 'paid'
  }

  isPaid() {
    return this.status === 'paid'
  }

  canBeCancelled() {
    return this.status === 'pending'
  }
}`,filename:"order.entity.ts",language:"ts"}),e.jsx("p",{className:"text-muted-foreground",children:"The decorator registers the class, while the entity remains a regular TypeScript class with constructors, invariants, private state, and domain methods."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Using the entity in a use case"}),e.jsx(t,{code:`import { Injectable } from '@nestjs/common'
import { onAfterCommit, Transactional } from '@turystack/nestjs-database'
import { defineEvent } from '@turystack/nestjs-events'
import { PublisherService } from '@turystack/nestjs-events/publisher'
import { z } from 'zod'

// In @repo/events. z.instanceof survives the consumer's parse; z.object strips the class.
export const OrderPaid = defineEvent('order.paid', z.instanceof(Order))

export type PayOrderInput = {
  orderId: Order['id']
}

@Injectable()
export class PayOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly publisher: PublisherService,
  ) {}

  @Transactional()
  async execute(input: PayOrderInput) {
    const order = await this.orderRepository.findById(input.orderId)

    // The invariant lives in the entity, never here.
    order.markAsPaid()

    const updated = await this.orderRepository.updateById(order.id, order)

    // After the commit, never inside the transaction: a consumer must not
    // react to a payment a rollback can still erase. No await.
    onAfterCommit(() => this.publisher.publish(OrderPaid, updated))

    return updated
  }
}`,filename:"pay-order.use-case.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["The use case only works with the domain object — the invariant stays in ",e.jsx("code",{className:"text-lib",children:"markAsPaid()"}),", not in the caller. The publisher owns serialization; application code never calls SuperJSON directly. Load the entity module in producer and consumer processes so the transport layer knows the same stable identifier on both sides."]}),e.jsxs("p",{className:"text-muted-foreground text-sm",children:["Two rules the example follows on purpose:"," ",e.jsx("code",{className:"text-lib",children:"publish()"})," returns"," ",e.jsx("code",{className:"text-lib",children:"void"})," and is fire-and-forget, so awaiting it buys nothing and suggests a delivery guarantee that does not exist; and the event leaves only after the write has committed — publishing first announces a fact that a rollback can still erase."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"How it works"}),e.jsxs("p",{className:"text-muted-foreground",children:["Decorating a class calls"," ",e.jsx("code",{children:"superjson.registerClass(Constructor, identifier)"})," under the hood."]}),e.jsx("p",{className:"text-muted-foreground",children:"Class instances, Dates and other non-JSON types survive the trip through EventBridge events and queues."}),e.jsx("p",{className:"text-muted-foreground text-sm",children:"Use a stable, namespaced identifier when class names may be minified or duplicated."})]})]})}export{n as component};
