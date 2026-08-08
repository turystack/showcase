import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-logger/logger-service')({
	component: Page,
})

const methods = [
	{
		description: 'Logs a debug-level message.',
		name: 'debug',
		required: false,
		type: '(message: string, args?: unknown): void',
	},
	{
		description: 'Logs an info-level message.',
		name: 'info',
		required: false,
		type: '(message: string, args?: unknown): void',
	},
	{
		description: 'Logs a message (default level).',
		name: 'log',
		required: false,
		type: '(message: string, args?: unknown): void',
	},
	{
		description: 'Logs a warn-level message.',
		name: 'warn',
		required: false,
		type: '(message: string, args?: unknown): void',
	},
	{
		description: 'Logs an error-level message.',
		name: 'error',
		required: false,
		type: '(message: string, args?: unknown): void',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					LoggerService
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Injectable service that extends NestJS ConsoleLogger with structured
					logging support.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Methods</h2>
				<CodeBlock
					code={`debug(message: string, args?: unknown): void

info(message: string, args?: unknown): void

log(message: string, args?: unknown): void

warn(message: string, args?: unknown): void

error(message: string, args?: unknown): void`}
					filename="logger-service.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`@Injectable()
class OrdersService {
  private readonly logger = new LoggerService(OrdersService.name)

  async create(data: CreateOrderDto) {
    this.logger.info('Creating order', { data })
  }
}`}
					filename="orders.service.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<PropsTable props={methods} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">LogMetadata</h2>
				<p className="text-muted-foreground">
					A key-value record type for structured log metadata. Pass as the
					second argument to any log method.
				</p>
				<CodeBlock
					code={`interface LogMetadata {
  [key: string]: unknown
}`}
					filename="logger.types.d.ts"
					language="ts"
				/>
				<CodeBlock
					code={`this.logger.info('Order created', { orderId: '123', total: 99.9 })`}
					filename="orders.service.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
