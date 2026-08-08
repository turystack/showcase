import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/cli/api')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					API — Stack & Structure
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					What create api always ships: the native libraries, the folder
					pattern, and the two API formats — single audience or multi-audience.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Native libraries</h2>
				<p className="text-muted-foreground">
					These always come in — they are the stack, not options:
				</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@turystack/nestjs-server</code> — the
							bootstrap factory: CORS, versioning, Zod validation, response
							transforms, health check, OpenAPI + Scalar (mandatory)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@turystack/nestjs-config</code> —
							ConfigModule.register({'{'} schema {'}'}) at the root; every
							turystack module registers with the (config) =&gt; factory form
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@turystack/exceptions</code> — typed
							application exceptions with stable domain codes
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@turystack/query-dsl</code> — the query
							primitives every list endpoint composes: pagination (page +
							cursor), sort, list, filter, ranges. Repositories type their
							inputs with them — never hand-rolled shapes
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@turystack/entity</code> — the base
							entity contract used by domains when entities exist
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">zod</code> — request schemas, env
							validation, and OpenAPI models
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">biome</code> + tsconfig extending{' '}
							<code className="text-lib">@turystack/backend-config</code> — one
							tooling source for APIs and handlers
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">vitest</code> — unit tests colocated
							with the domains, plus an e2e config
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Opt-in modules from the prompt — database, logger, cache, lock,
							rate-limit, publisher, storage, iam, observability, scheduler,
							social-auth — all registered at the root
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Scripts</h2>
				<CodeBlock
					code={`{
  "build": "tsc -p tsconfig.build.json && tsc-alias -p tsconfig.build.json",
  "dev": "tsx watch src/main.ts",
  "start": "node dist/main.js",
  "typecheck": "tsc --noEmit",
  "test": "vitest run --passWithNoTests",
  "test:coverage": "vitest run --coverage --passWithNoTests",
  "test:e2e": "vitest run --config vitest.e2e.config.ts --passWithNoTests",
  "lint": "biome lint .",
  "format": "biome format --write .",
  "check": "biome check .",
  "check:fix": "biome check --write ."
}`}
					filename="package.json"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					Database and local-infra scripts are added only when their modules are
					selected:
				</p>
				<CodeBlock
					code={`{
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio",
  "docker:up": "docker compose up -d",
  "docker:down": "docker compose down"
}`}
					filename="package.json"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					The CLI also runs Biome automatically after every create. This step is
					part of project generation and still runs with{' '}
					<code className="text-lib">--skip-install</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Project root</h2>
				<CodeBlock
					code={`my-api/
├── src/                    # application code (below)
├── biome.json
├── tsconfig.json
├── tsconfig.build.json
├── vitest.config.ts
├── vitest.e2e.config.ts
├── .env                    # local Docker values ready; external values use REPLACE
├── .env.example            # safe copy of the generated environment contract
├── docker-compose.yml      # with database, cache, or logger
├── drizzle.config.ts       # only with nestjs-database
├── README.md               # official guide tailored to the selected setup
└── package.json`}
					filename="my-api"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					With nestjs-database, the CLI also adds database.migration.ts,
					drizzle.config.ts, database scripts, and the required local service.
					The drizzle/ directory appears after the first generated migration. It
					does not create a generic scripts/ folder or docker-compose without a
					selected dependency that needs it. Database, cache, and logger receive
					ready local Docker values. Database identifiers and the default
					storage bucket derive from the project name, AWS defaults to
					us-east-1, and IAM receives a random local secret. The committed
					.env.example keeps a safe secret placeholder. The README is generated
					from the same choices and only documents the selected format,
					capabilities, services, environment, endpoints, structure, and
					scripts.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Folder structure</h2>
				<p className="text-muted-foreground">
					Controllers are the HTTP surface; domains hold the business logic —
					entity, schema, repository, and one use-case per operation, tests
					colocated. The CLI does not invent an example domain. It only creates
					a service-free smoke-test controller for each selected API surface;
					real domain folders appear when the application gains business
					behavior.
				</p>
				<CodeBlock
					code={`src/
├── controllers/            # HTTP surface
│   ├── main.controller.ts  # generated single-project smoke-test route
│   └── order/              # real controllers appear with real domains
│       ├── order.controller.ts
│       └── order.schemas.ts
├── domains/                # business logic — one folder per domain
│   └── order/
│       ├── order.entity.ts
│       ├── order.schema.ts
│       ├── order.repository.ts
│       ├── order.types.ts
│       ├── order.mock.ts
│       ├── index.ts        #   public API of the domain
│       └── use-cases/      #   one folder per operation
│           └── create-order/
│               ├── create-order.ts       # CreateOrderUseCase.execute(input)
│               ├── create-order.types.ts # only the Input type
│               └── create-order.test.ts
├── database/               # only when nestjs-database is selected
│   ├── database.schema.ts  #   defineDatabaseSchema + declare module
│   └── database.migration.ts # materialized tables for drizzle-kit
├── adapters/               # only after an uncovered integration exists
│   └── zip-code/           #   (payment gateway, maps...) — infra the
│                           #   turystack libs cover does NOT go here
├── support/                # optional pure cross-domain utilities
├── app.module.ts           # root modules + consumed provider closure
├── config.schema.ts        # defineConfigSchema — validates process.env at boot
├── exceptions.ts           # exception catalog + type Exceptions (@turystack/exceptions)
└── main.ts                 # Server.create(AppModule, (config) => ({ ... }))`}
					filename="src"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Infra concerns (cache, storage, tokens, messaging...) are not folders
					here — they are the turystack lib modules, registered once in
					app.module.ts and injected into the domain services. app.module.ts
					registers the use-cases and repositories actually consumed; there is
					no mandatory module per domain. adapters/ exists only for integrations
					no lib covers. support/ is optional for pure transversal utilities; it
					is never a wrapper or generic dumping folder.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Local infra</h2>
				<p className="text-muted-foreground">
					docker-compose brings up the local dependencies: postgres for
					nestjs-database, one valkey shared by cache, lock, and rate-limit, and
					Elasticsearch when logger is selected.
				</p>
				<CodeBlock
					code={`services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    ports:
      - '\${DATABASE_PORT:-5432}:5432'
    environment:
      POSTGRES_USER: my_api
      POSTGRES_PASSWORD: my_api
      POSTGRES_DB: my_api
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U my_api -d my_api']
      interval: 10s
      timeout: 5s
      retries: 5

  valkey:
    image: valkey/valkey:8-alpine
    restart: unless-stopped
    command: ['valkey-server', '--appendonly', 'yes']
    ports:
      - '\${CACHE_PORT:-6379}:6379'
    volumes:
      - valkey_data:/data
    healthcheck:
      test: ['CMD', 'valkey-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.17.0
    restart: unless-stopped
    ports:
      - '\${ELASTICSEARCH_PORT:-9200}:9200'
    environment:
      discovery.type: single-node
      xpack.security.enabled: 'false'
      ES_JAVA_OPTS: '-Xms512m -Xmx512m'
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    healthcheck:
      test: ['CMD-SHELL', 'curl --fail http://localhost:9200/_cluster/health || exit 1']
      interval: 10s
      timeout: 5s
      retries: 12

volumes:
  elasticsearch_data:
  postgres_data:
  valkey_data:`}
					filename="docker-compose.yml"
					language="yaml"
				/>
				<p className="text-muted-foreground text-sm">
					The compose file only includes what the selected modules need — no
					database module, no postgres service. Postgres user, password, and
					database name are all the project name with hyphens turned into
					underscores (<code className="text-lib">my-api</code> →{' '}
					<code className="text-lib">my_api</code>), and the same value lands in{' '}
					<code className="text-lib">DATABASE_URL</code> inside{' '}
					<code className="text-lib">.env</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					API format: single audience
				</h2>
				<p className="text-muted-foreground">
					One API surface, one OpenAPI document, one Scalar reference. The
					initial smoke-test route lives in controllers/main.controller.ts.
				</p>
				<CodeBlock
					code={`import { Server } from '@turystack/nestjs-server'

import { AppModule } from './app.module'

await Server.create(AppModule, (config) => ({
  description: 'My API',
  docs: { provider: 'scalar', theme: 'default' },
  globalPrefix: 'api',
  healthMessage: 'my api is healthy',
  port: config.get('PORT'),
}))`}
					filename="main.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					API format: multi-audience
				</h2>
				<p className="text-muted-foreground">
					One app, several API surfaces — controllers are grouped per project,
					and each project gets its own prefix, OpenAPI document, and Scalar
					reference.
				</p>
				<CodeBlock
					code={`src/controllers/
├── admin/       # controllers of the admin surface
│   ├── admin.controller.ts # generated smoke-test route
│   └── order/
├── app/         # controllers of the main app surface
│   ├── app.controller.ts   # generated smoke-test route
│   └── order/
└── internal/    # service-to-service surface
    ├── internal.controller.ts # generated smoke-test route
    └── export/`}
					filename="src/controllers"
					language="bash"
				/>
				<CodeBlock
					code={`await Server.create(AppModule, (config) => ({
  description: 'My API',
  docs: { provider: 'scalar', theme: 'default' },
  globalPrefix: 'api',
  healthMessage: 'my api is healthy',
  port: config.get('PORT'),
  projects: [
    { name: 'admin', prefix: 'admin', title: 'Admin API' },
    { name: 'app', prefix: 'app', title: 'App API' },
    { name: 'internal', prefix: 'internal', title: 'Internal API' },
  ],
}))`}
					filename="main.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					Each frontend then points kubb at its own project document —
					/api/admin/openapi, /api/app/openapi — and only sees its surface.
				</p>
			</div>
		</div>
	)
}
