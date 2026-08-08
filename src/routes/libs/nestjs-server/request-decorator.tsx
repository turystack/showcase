import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-server/request-decorator')({
	component: Page,
})

const requestSchemaProps = [
	{
		description: 'Zod schema to validate URL path parameters.',
		name: 'params',
		required: false,
		type: 'ZodType',
	},
	{
		description: 'Zod schema to validate query string parameters.',
		name: 'query',
		required: false,
		type: 'ZodType',
	},
	{
		description: 'Zod schema to validate the request body.',
		name: 'body',
		required: false,
		type: 'ZodType',
	},
	{
		description: 'Zod schema to validate request headers.',
		name: 'headers',
		required: false,
		type: 'ZodType',
	},
]

const requestInputProps = [
	{
		description: 'Validated and typed path parameters.',
		name: 'params',
		required: false,
		type: 'z.infer<T["params"]>',
	},
	{
		description: 'Validated and typed query parameters.',
		name: 'query',
		required: false,
		type: 'z.infer<T["query"]>',
	},
	{
		description: 'Validated and typed request body.',
		name: 'body',
		required: false,
		type: 'z.infer<T["body"]>',
	},
	{
		description: 'Validated headers or raw Record<string, string>.',
		name: 'headers',
		required: false,
		type: 'z.infer<T["headers"]> | Record<string, string>',
	},
	{
		description:
			'Client IP resolved from x-forwarded-for, falling back to the socket. Null when neither is available.',
		name: 'ip',
		required: true,
		type: 'string | null',
	},
	{
		description: 'Raw request body buffer for webhook signature verification.',
		name: 'rawBody',
		required: true,
		type: 'Buffer',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Request
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Parameter decorator that validates params, query, body, and headers
					with Zod. Invalid input throws a structured BadRequestException.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'

const schema = createRequestSchema({
  params?: ZodType,
  query?: ZodType,
  body?: ZodType,
  headers?: ZodType,
})

@Request(schema) req: RequestInput<typeof schema>`}
					filename="request.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { z } from 'zod'

const schema = createRequestSchema({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ name: z.string(), email: z.string().email() }),
})

@Controller({ path: 'users', tag: 'Users' })
class UsersController {
  @Route({
    method: 'PUT',
    path: ':id',
    summary: 'Update User',
    description: 'Updates a user by ID',
    parameters: { params: schema.params, body: schema.body },
    responses: { 200: UserResponseSchema },
  })
  async update(@Request(schema) req: RequestInput<typeof schema>) {
    req.params.id    // string (validated UUID)
    req.body.name    // string (validated)
    req.body.email   // string (validated email)
    req.rawBody      // Buffer
  }
}`}
					filename="users.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					createRequestSchema
				</h2>
				<p className="text-muted-foreground">
					Identity helper that preserves the schema type. Use it to define
					request schemas so that <code>RequestInput</code> can infer the
					correct types.
				</p>
				<CodeBlock
					code={`import { createRequestSchema } from '@turystack/nestjs-server'
import { z } from 'zod'

const schema = createRequestSchema({
  params: z.object({ id: z.string().uuid() }),
  query: z.object({ page: z.coerce.number().default(1) }),
  body: z.object({ name: z.string(), email: z.string().email() }),
})

schema.params
schema.query
schema.body`}
					filename="schema.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">RequestSchema</h2>
				<PropsTable props={requestSchemaProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					RequestInput{'<T>'}
				</h2>
				<p className="mb-4 text-muted-foreground">
					The inferred type of a validated request. Each field is typed based on
					the Zod schemas provided to <code>createRequestSchema</code>.
				</p>
				<PropsTable props={requestInputProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What it does</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Validates params, query, body, and headers independently using Zod
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Throws a structured BadRequestException with field-level errors
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Provides <code>rawBody</code> Buffer for webhook signature
							verification
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Returns a fully typed object via <code>RequestInput{'<T>'}</code>
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
