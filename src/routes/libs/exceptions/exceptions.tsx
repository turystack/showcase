import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/exceptions/exceptions')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Exceptions
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Creates application exception classes grouped by HTTP semantics;
					snake_case codes become camelCase class names.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Declaring domain exceptions
				</h2>
				<CodeBlock
					code={`import { createExceptions } from '@turystack/exceptions'

export const OrderExceptions = createExceptions((e) => ({
  order: e.module('order', {
    badRequest: ['invalid_total'],
    conflict: ['already_paid', 'already_cancelled'],
    unprocessableEntity: ['empty_cart'],
    serviceUnavailable: ['payment_provider_unavailable'],
  }),
}))`}
					filename="order.exceptions.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					The keys inside each group are HTTP categories. The generated classes
					inherit the matching status: for example, <code>alreadyPaid</code> is
					a 409 conflict and <code>emptyCart</code> is a 422 unprocessable
					entity.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Throwing from a service
				</h2>
				<CodeBlock
					code={`import { OrderExceptions } from './order.exceptions'

class OrderService {
  constructor(private readonly orders: OrderRepository) {}

  async pay(orderId: string) {
    const order = await this.orders.findById(orderId)

    if (!order) {
      throw new OrderExceptions.order.notFound({ orderId })
    }

    order.markAsPaid()
    await this.orders.save(order)
  }
}`}
					filename="order.service.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					The service handles the missing aggregate; the entity can throw{' '}
					<code>alreadyPaid</code> while protecting its own state transition.
					Metadata keeps diagnostic context separate from the stable public
					error code. Tests can assert the generated class directly with{' '}
					<code>toThrow(OrderExceptions.order.alreadyPaid)</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Documenting an HTTP route
				</h2>
				<CodeBlock
					code={`const payOrderRoute = {
  output: {
    204: null,
    404: [OrderExceptions.order.notFound.code],
    409: [OrderExceptions.order.alreadyPaid.code],
  },
}

OrderExceptions.order.notFound.code
// 'order.not_found'

OrderExceptions.order.alreadyPaid.code
// 'order.already_paid'`}
					filename="pay-order.route.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Use the static <code>.code</code> when a schema, route, or client
					contract needs the stable domain code. Instantiating the class
					produces an <code>AppError</code> with <code>statusCode</code>, HTTP
					category in the instance <code>code</code>, and the supplied{' '}
					<code>metadata</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Available groups</h2>
				<CodeBlock
					code={`badRequest: 400
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
gatewayTimeout: 504`}
					filename="exception-groups.txt"
					language="text"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Public types</h2>
				<CodeBlock
					code={`import type {
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
// the whole catalog: every code the API can return, as a literal union`}
					filename="exception-types.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Declare Exceptions next to the catalog in src/exceptions.ts — it is
					the API's error contract as a type. Routes document their errors by
					passing the exception classes themselves to @Route (responses.
					exceptions) — @turystack/nestjs-server derives status, code, and
					OpenAPI examples from the class, and its global filter shapes every
					error body as {'{'} statusCode, code, message, ...metadata {'}'} — no
					translation dictionary anywhere.
				</p>
			</div>
		</div>
	)
}
