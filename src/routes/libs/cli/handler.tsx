import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/cli/handler')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Handler — Stack & Structure
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					What monorepo:handler ships: a thin delivery app that validates the
					event and delegates to a shared domain use-case.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Folder structure</h2>
				<p className="text-muted-foreground">
					The business logic lives in the monorepo domains lib — the handler is
					just the entry point that wires an event source to a use-case.
				</p>
				<CodeBlock
					code={`apps/process-payment/
├── src/
│   ├── process-payment.handler.ts      # the @Handler class
│   ├── process-payment.module.ts       # HandlerModule wiring
│   ├── process-payment.schemas.ts      # event schema + inferred types
│   ├── process-payment.handler.test.ts # tests colocated
│   ├── config.schema.ts                # validated env owned by this app
│   └── main.ts                         # export const handler
├── package.json
├── tsconfig.json
└── vitest.config.ts`}
					filename="apps/process-payment"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The handler file</h2>
				<CodeBlock
					code={`import { Handler } from '@turystack/nestjs-serverless'
import { ProcessPaymentUseCase } from '@repo/domains'

import {
  type ProcessPaymentEvent,
  processPaymentSchema,
} from './process-payment.schemas'

@Handler('SQS', { schema: processPaymentSchema })
export class ProcessPaymentHandler {
  constructor(private readonly processPayment: ProcessPaymentUseCase) {}

  async execute(event: ProcessPaymentEvent) {
    await this.processPayment.execute({ paymentId: event.paymentId })
  }
}`}
					filename="src/process-payment.handler.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The module file</h2>
				<CodeBlock
					code={`import { Module } from '@nestjs/common'
import { ConfigModule } from '@turystack/nestjs-config'
import { ServerlessModule } from '@turystack/nestjs-serverless'

import { ProcessPaymentUseCase } from '@repo/domains'

import { configSchema } from './config.schema'
import { ProcessPaymentHandler } from './process-payment.handler'

@Module({
  imports: [
    ConfigModule.register({ schema: configSchema }),
    ServerlessModule.register({ adapter: 'aws' }),
    // global lib modules the domain libs need: logger, database...
  ],
  providers: [
    ProcessPaymentHandler,
    ProcessPaymentUseCase,
    // repository/adapter providers required by ProcessPaymentUseCase
  ],
})
export class HandlerModule {}`}
					filename="src/process-payment.module.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The entry point</h2>
				<CodeBlock
					code={`import { Serverless } from '@turystack/nestjs-serverless'

import { HandlerModule } from './process-payment.module'

export const handler = Serverless.create(HandlerModule)`}
					filename="src/main.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The types file</h2>
				<CodeBlock
					code={`import { createHandlerSchema } from '@turystack/nestjs-serverless'
import { z } from 'zod'

export const processPaymentSchema = createHandlerSchema(
  z.object({
    paymentId: z.string(),
  }),
)

export type ProcessPaymentEvent = z.infer<typeof processPaymentSchema>`}
					filename="src/process-payment.schemas.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Serverless.create is synchronous — no top-level await. The context
					boots lazily on the first invocation and is cached for warm ones.
				</p>
			</div>
		</div>
	)
}
