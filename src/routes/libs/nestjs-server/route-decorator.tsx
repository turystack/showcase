import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-server/route-decorator')({
	component: Page,
})

const routeOptionsProps = [
	{
		description: 'HTTP method for the route.',
		name: 'method',
		required: true,
		type: "'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'",
	},
	{
		description: 'Route path appended to the controller prefix.',
		name: 'path',
		required: false,
		type: 'string',
	},
	{
		description: 'Swagger operation summary.',
		name: 'summary',
		required: true,
		type: 'string',
	},
	{
		description: 'Swagger operation description.',
		name: 'description',
		required: true,
		type: 'string',
	},
	{
		description: 'API version number.',
		name: 'version',
		required: false,
		type: 'number (default 1)',
	},
	{
		description: 'Request validation schemas (RouteParameters).',
		name: 'parameters',
		required: false,
		type: 'RouteParameters',
	},
	{
		description: 'Response schemas by HTTP status code (RouteResponses).',
		name: 'responses',
		required: false,
		type: 'RouteResponses',
	},
]

const routeParametersProps = [
	{
		description: 'Zod schema for URL path parameters.',
		name: 'params',
		required: false,
		type: 'ZodObject',
	},
	{
		description: 'Zod schema for query string. Supports intersections.',
		name: 'query',
		required: false,
		type: 'ZodObject | ZodIntersection',
	},
	{
		description: 'Zod schema for the request body.',
		name: 'body',
		required: false,
		type: 'ZodSchema',
	},
	{
		description: 'Zod schema for request headers.',
		name: 'headers',
		required: false,
		type: 'ZodObject',
	},
]

const routeResponsesProps = [
	{
		description: 'Success response schema.',
		name: '200',
		required: false,
		type: 'ZodSchema',
	},
	{
		description: 'Created response schema.',
		name: '201',
		required: false,
		type: 'ZodSchema',
	},
	{
		description: 'No Content response.',
		name: '204',
		required: false,
		type: '{ description: string }',
	},
	{
		description:
			'Exception classes from the @turystack/exceptions catalog this route can return — status, code, and OpenAPI examples are derived from the classes; every error response references the named Exception model in components.schemas, so the SDK generates a single Exception type.',
		name: 'exceptions',
		required: false,
		type: 'RouteExceptionClass[]',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@Route
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Method decorator that merges HTTP method, Swagger docs, and Zod
					validation into one declaration.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Route, type RouteParameters, type RouteResponses } from '@turystack/nestjs-server'

@Route(options: {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  path?: string
  summary: string
  description: string
  version?: number
  parameters?: RouteParameters
  responses?: RouteResponses
})`}
					filename="route.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Controller, Route, Request, createRequestSchema, type RequestInput } from '@turystack/nestjs-server'
import { z } from 'zod'

import { exceptions } from './exceptions'

const UserResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
})

const schema = createRequestSchema({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ name: z.string() }),
})

@Controller({ path: 'users', tag: 'Users' })
class UsersController {
  @Route({
    method: 'PUT',
    path: ':id',
    summary: 'Update User',
    description: 'Updates a user by ID',
    parameters: { params: schema.params, body: schema.body },
    responses: {
      200: UserResponse,
      exceptions: [exceptions.user.notFound],
    },
  })
  async update(@Request(schema) req: RequestInput<typeof schema>) {
    // req.params.id is a validated UUID
    // req.body.name is a validated string
  }
}`}
					filename="users.controller.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Custom methods — actions use ::verb
				</h2>
				<p className="text-muted-foreground">
					A business action on a resource is never a path segment — it is a
					custom method, always POST. Declare it with the turystack syntax{' '}
					<code>::verb</code>: the decorator converts it internally to the
					escaped form the Express 5 path matcher requires (the pattern NestJS
					documents for reserved characters), so no escape ever appears in
					project code. The final URL keeps a single colon.
				</p>
				<CodeBlock
					code={`import { exceptions } from './exceptions'

@Route({
  method: 'POST',
  path: ':invoiceId::pay',   // matches POST /invoices/inv-123:pay
  summary: 'Pay Invoice',
  description: 'Pays an invoice.',
  parameters: { params: schema.params },
  responses: { 200: InvoiceResponse, exceptions: [exceptions.invoice.notFound] },
})
async pay(@Request(schema) req: RequestInput<typeof schema>) {}

@Route({
  method: 'POST',
  path: 'reports::generate',   // collection-level: POST /invoices/reports:generate
  summary: 'Generate Report',
  description: 'Generates a report.',
})
async generate() {}`}
					filename="invoices.controller.ts"
					language="ts"
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Never <code>path: ':invoiceId/pay'</code> — a verb is not a path
							segment; segments are resources and relationships
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							A <code>::verb</code> on anything other than POST throws at boot:
							[Route] custom method path ':invoiceId::pay' requires method POST
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">RouteOptions</h2>
				<PropsTable props={routeOptionsProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">RouteParameters</h2>
				<p className="mb-4 text-muted-foreground">
					Zod schemas for request validation, passed via the{' '}
					<code>parameters</code> option.
				</p>
				<PropsTable props={routeParametersProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">RouteResponses</h2>
				<p className="mb-4 text-muted-foreground">
					Response schemas keyed by HTTP status code, passed via the{' '}
					<code>responses</code> option. Default 400 and 500 error responses are
					always included automatically.
				</p>
				<PropsTable props={routeResponsesProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What it does</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Applies the correct HTTP method decorator (@Get, @Post, etc.)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Generates @ApiParam, @ApiQuery, @ApiHeader, @ApiBody, and
							@ApiResponse from Zod schemas
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Sets @ApiOperation with summary and description</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Adds default 400 and 500 error response schemas</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Applies URI versioning (default v1)</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
