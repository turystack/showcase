import{j as e}from"./index-CQ2_D3U_.js";import{C as t}from"./CodeBlock-ftRQod4w.js";import"./highlight-C4-SKK4T.js";import"./copy-uXspHRur.js";function n(){return e.jsxs("div",{className:"space-y-10",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"Exceptions"}),e.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"Creates application exception classes grouped by HTTP semantics; snake_case codes become camelCase class names."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Declaring domain exceptions"}),e.jsx(t,{code:`import { createExceptions } from '@turystack/exceptions'

export const OrderExceptions = createExceptions((e) => ({
  order: e.module('order', {
    badRequest: ['invalid_total'],
    conflict: ['already_paid', 'already_cancelled'],
    unprocessableEntity: ['empty_cart'],
    serviceUnavailable: ['payment_provider_unavailable'],
  }),
}))`,filename:"order.exceptions.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["The keys inside each group are HTTP categories. The generated classes inherit the matching status: for example, ",e.jsx("code",{children:"alreadyPaid"})," is a 409 conflict and ",e.jsx("code",{children:"emptyCart"})," is a 422 unprocessable entity."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Throwing from a use case"}),e.jsx(t,{code:`import { Injectable } from '@nestjs/common'

import { OrderExceptions } from './order.exceptions'

export type PayOrderInput = {
  orderId: string
}

@Injectable()
export class PayOrderUseCase {
  constructor(private readonly orders: OrderRepository) {}

  async execute(input: PayOrderInput) {
    const order = await this.orders.findById(input.orderId)

    // Existence is proven before the rule runs.
    if (!order) {
      throw new OrderExceptions.order.notFound({ orderId: input.orderId })
    }

    order.markAsPaid()

    return this.orders.save(order)
  }
}`,filename:"pay-order.use-case.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["The use case handles the missing aggregate; the entity throws"," ",e.jsx("code",{children:"alreadyPaid"})," while protecting its own state transition — the rule never becomes a duplicated ",e.jsx("code",{children:"if"})," in the caller. Metadata keeps diagnostic context separate from the stable public error code. Tests can assert the generated class directly with"," ",e.jsx("code",{children:"toThrow(OrderExceptions.order.alreadyPaid)"}),"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Documenting an HTTP route"}),e.jsx(t,{code:`import { Route } from '@turystack/nestjs-server'

import { OrderExceptions } from './order.exceptions'

@Route({
  method: 'POST',
  path: ':order_id::pay',
  summary: 'Pay Order',
  description: 'Pays a pending order.',
  responses: {
    204: { description: 'Order paid' },
    exceptions: [
      OrderExceptions.order.notFound,
      OrderExceptions.order.alreadyPaid,
    ],
  },
})
async pay() {}

// The static .code is the stable domain code, for schemas and client contracts:
OrderExceptions.order.notFound.code
// 'order.not_found'

OrderExceptions.order.alreadyPaid.code
// 'order.already_paid'`,filename:"orders.controller.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["The route lists the exception ",e.jsx("em",{children:"classes"}),", not codes —"," ",e.jsx("code",{children:"@turystack/nestjs-server"})," derives the status, the code and the OpenAPI example from each class. Use the static ",e.jsx("code",{children:".code"})," ","when a schema or client contract needs the domain code as a value. Instantiating the class produces an ",e.jsx("code",{children:"AppError"})," with"," ",e.jsx("code",{children:"statusCode"}),", the HTTP category in the instance"," ",e.jsx("code",{children:"code"}),", and the supplied ",e.jsx("code",{children:"metadata"}),"."]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Available groups"}),e.jsx(t,{code:`badRequest: 400
unauthorized: 401
forbidden: 403
notFound: 404
methodNotAllowed: 405
conflict: 409
gone: 410
unprocessableEntity: 422
tooManyRequests: 429
internalServerError: 500
badGateway: 502
serviceUnavailable: 503
gatewayTimeout: 504`,filename:"exception-groups.txt",language:"text"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"font-display font-semibold text-xl",children:"Public types"}),e.jsx(t,{code:`import type {
  ExceptionClass,
  ExceptionGroup,
  ExceptionGroupedModule,
  InferCreateExceptions,
  InferExceptionCodes,
} from '@turystack/exceptions'

type OrderExceptionCode = InferCreateExceptions<
  typeof OrderExceptions.order
>
// 'order.not_found' | 'order.invalid_total' | 'order.already_paid' | ...

export type Exceptions = InferExceptionCodes<typeof exceptions>
// the whole catalog: every code the API can return, as a literal union`,filename:"exception-types.ts",language:"ts"}),e.jsxs("p",{className:"text-muted-foreground",children:["Declare Exceptions next to the catalog in src/exceptions.ts — it is the API's error contract as a type. Routes document their errors by passing the exception classes themselves to @Route (responses. exceptions) — @turystack/nestjs-server derives status, code, and OpenAPI examples from the class, and its global filter shapes every error body as ","{"," statusCode, code, message, ...metadata ","}"," — no translation dictionary anywhere."]})]})]})}export{n as component};
