import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/nestjs-server/server-create')({
	component: Page,
})

const options = [
	{
		description: 'The port number to listen on.',
		name: 'port',
		required: true,
		type: 'number',
	},
	{
		description: 'The API title used in OpenAPI metadata.',
		name: 'title',
		required: true,
		type: 'string',
	},
	{
		description: 'The API description used in OpenAPI metadata.',
		name: 'description',
		required: true,
		type: 'string',
	},
	{
		description: 'The API version.',
		name: 'version',
		required: false,
		type: "string (default '1.0')",
	},
	{
		description: 'The global route prefix.',
		name: 'globalPrefix',
		required: false,
		type: "string (default 'api')",
	},
	{
		description: 'Custom message returned by the health endpoint.',
		name: 'healthMessage',
		required: false,
		type: 'string',
	},
	{
		description:
			'API projects — the OpenAPI document is split per prefix, each with its own openapi json and reference UI.',
		name: 'projects',
		required: false,
		type: 'ApiProject[]',
	},
	{
		description:
			'Extra global interceptors registered before the built-in response transforms.',
		name: 'interceptors',
		required: false,
		type: 'NestInterceptor[]',
	},
	{
		description: 'The reference UI provider.',
		name: 'docs.provider',
		required: true,
		type: "'scalar'",
	},
	{
		default: '"moon"',
		description: 'The Scalar UI theme.',
		name: 'docs.theme',
		required: false,
		type: "'default' | 'alternate' | 'moon' | 'purple' | 'solarized' | 'bluePlanet' | 'deepSpace' | 'saturn' | 'kepler' | 'elysiajs' | 'fastify' | 'mars' | 'laserwave' | 'none'",
	},
	{
		description: 'Favicon URL for the docs page.',
		name: 'docs.favicon',
		required: false,
		type: 'string',
	},
	{
		description: 'Custom CSS for the docs page.',
		name: 'docs.customCss',
		required: false,
		type: 'string',
	},
]

const projectOptions = [
	{
		description: 'Project identifier.',
		name: 'name',
		required: true,
		type: 'string',
	},
	{
		description: 'Title displayed in the reference UI of this project.',
		name: 'title',
		required: true,
		type: 'string',
	},
	{
		description:
			'Route prefix that selects the paths of this project. Omit for the default/core project (it takes every path not claimed by other prefixes).',
		name: 'prefix',
		required: false,
		type: 'string',
	},
	{
		description: 'Scalar theme for this project. Falls back to docs.theme.',
		name: 'theme',
		required: false,
		type: "'default' | 'alternate' | 'moon' | 'purple' | 'solarized' | 'bluePlanet' | 'deepSpace' | 'saturn' | 'kepler' | 'elysiajs' | 'fastify' | 'mars' | 'laserwave' | 'none'",
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Factory
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Bootstraps a NestJS app with CORS, versioning, Zod validation,
					response transforms, health check, and OpenAPI docs wired in.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`import { Server } from '@turystack/nestjs-server'

Server.create(
  module: Type<any>,
  options: ServerOptions | ((config: ConfigService) => ServerOptions),
): Promise<INestApplication>`}
					filename="server.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { Server } from '@turystack/nestjs-server'

await Server.create(AppModule, (config) => ({
  port: config.get('PORT'),
  title: 'My API',
  description: 'API description',
  healthMessage: 'my api is healthy',
  docs: {
    provider: 'scalar',
    favicon: 'https://example.com/favicon.svg',
    theme: 'default',
  },
}))`}
					filename="main.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The factory form resolves the typed ConfigService after Nest
					bootstraps. Register ConfigModule with the app config schema; static
					options remain supported for tests and fixed environments.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Multiple projects
				</h2>
				<p className="text-muted-foreground">
					Declare projects to split the generated OpenAPI document by route
					prefix — each project gets its own openapi json and its own reference
					UI, with its own title and theme. The project without a prefix takes
					every path not claimed by the others.
				</p>
				<CodeBlock
					code={`await Server.create(AppModule, (config) => ({
  port: config.get('PORT'),
  title: 'My API',
  description: 'API description',
  docs: { provider: 'scalar', theme: 'default' },
  projects: [
    { name: 'main', title: 'Main API' }, // unprefixed routes
    { name: 'admin', prefix: 'admin', theme: 'moon', title: 'Admin API' },
    { name: 'partner', prefix: 'partner', theme: 'purple', title: 'Partner API' },
  ],
}))

// GET /api/v1/openapi            → Main API spec
// GET /api/v1/reference          → Main API reference
// GET /api/v1/admin/openapi      → Admin API spec (only admin/* routes)
// GET /api/v1/admin/reference    → Admin API reference
// GET /api/v1/partner/openapi    → Partner API spec
// GET /api/v1/partner/reference  → Partner API reference`}
					filename="main.ts"
					language="ts"
				/>
				<PropsTable props={projectOptions} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Built-in Endpoints
				</h2>
				<CodeBlock
					code={`GET /health                        # Health check ({ message, status })
GET /{prefix}/openapi              # OpenAPI JSON spec (single project)
GET /{prefix}/reference            # Reference UI (single project)
GET /{prefix}/v1/{project}/openapi # Per-project OpenAPI JSON (with projects)
GET /{prefix}/v1/{project}/reference # Per-project reference UI`}
					filename="endpoints"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">ServerOptions</h2>
				<PropsTable props={options} />
			</div>
		</div>
	)
}
