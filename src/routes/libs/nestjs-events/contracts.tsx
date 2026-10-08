import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-events/contracts')({
	component: Page,
})

const defineEventArgs = [
	{
		description: 'Becomes the EventBridge DetailType. Not empty.',
		name: 'name',
		required: true,
		type: 'string',
	},
	{
		description: 'Validates on publish and again per record.',
		name: 'schema',
		required: true,
		type: 'z.ZodType',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Event contracts
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					An event is declared once. The API publishes it and the workers
					consume it, from the same constant.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">defineEvent</h2>
				<CodeBlock
					code={`import { defineEvent, type EventPayload } from '@turystack/nestjs-events'
import { z } from 'zod'

export const OrderCreated = defineEvent(
  'order.created', // → EventBridge DetailType
  z.object({
    identifier: z.string(),
    total: z.number(),
    currency: z.string().default('BRL'),
  }),
)

export type OrderCreated = EventPayload<typeof OrderCreated>`}
					filename="packages/events/src/order-created.ts"
					language="ts"
				/>
				<PropsTable props={defineEventArgs} />
				<p className="text-muted-foreground text-sm">
					Events live in a shared <code>packages/events</code> module (
					<code>@repo/events</code>), imported by the API and the workers app.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Types</h2>
				<CodeBlock
					code={`// what defineEvent returns, frozen
type EventContract<N extends string, S extends ZodType> = Readonly<{
  name: N
  schema: S
}>

// what a handler receives: the schema's output
type EventPayload<E extends EventContract> = z.infer<E['schema']>`}
					filename="event.d.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					A renamed or reshaped event breaks the build of both sides instead of
					silently never firing.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What goes on the wire
				</h2>
				<p className="text-muted-foreground">
					One file encodes and decodes, so publisher and workers never drift.
					superjson first, then the envelope.
				</p>
				<CodeBlock
					code={`{
  "turystack": { "v": 1, "correlationId": "req-abc" },
  "data": { "identifier": "123", "total": 10 }
}`}
					filename="message body"
					language="json"
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							superjson keeps <code>Date</code>, <code>Map</code>,{' '}
							<code>Set</code> and <code>bigint</code> intact.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The correlation id rides in the payload: EventBridge has no field
							that reaches every target.
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The workers unwrap both layers before <code>execute</code>. A
							schedule's payload passes untouched.
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
