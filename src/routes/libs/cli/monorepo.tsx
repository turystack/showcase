import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/cli/monorepo')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Monorepo — Stack & Structure
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					What create monorepo always ships: a pnpm workspace with your apps and
					one domains lib they all share.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Folder structure</h2>
				<CodeBlock
					code={`my-product/
├── apps/
│   ├── backoffice/          # web app (create web structure)
│   ├── app/                 # mobile app (create mobile structure)
│   ├── api/                 # API app (create api structure)
│   ├── create-subscription/ # handler (create handler structure)
│   └── process-payment/     # handler (create handler structure)
├── libs/
│   ├── domains/             # backend rules — used by api + handlers
│   │   └── src/
│   │       ├── subscription/#   entity, schema, repository when needed,
│   │       └── payment/     #   use-cases, types + tests
│   ├── database/            # only when nestjs-database is selected
│   │   ├── src/             # schema, relations + DatabaseService typing
│   │   ├── drizzle/         # versioned migrations
│   │   └── drizzle.config.ts
│   └── support/             # optional package when utilities are truly cross-app
├── pnpm-workspace.yaml
├── biome.json               # apps extend @turystack/frontend-config
│                            #   or @turystack/backend-config
├── docker-compose.yml       # only when selected modules need local services
└── package.json`}
					filename="my-product"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it wires</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Each app keeps the structure of its own create command — the
							monorepo just composes them under apps/; handlers sit at the root
							of apps/ like any other app
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Every web/mobile app owns required layouts/ and feature
							boundaries. api/ and its SDK target exist only for apps with API
							integration; ui/, hooks/, support/, auth/ and telemetry/ are also
							conditional
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The monorepo grows with the monorepo-only commands: monorepo:api
							adds an API under apps/, monorepo:handler adds a lambda under
							apps/
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							libs/domains holds every backend domain — the api's src/domains
							moves here, and api + handlers import from @repo/domains.
							@turystack/query-dsl is a dependency of the domains lib itself:
							its primitives (pagination, sort, list, filter) type the
							persistence contracts. Each app root registers its global lib
							modules and only the provider closure its controllers or handlers
							consume
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							libs/database is conditional and owns schema, relations and
							migrations. A database-free product does not receive that lib,
							drizzle scripts or postgres infrastructure
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Web and mobile with API integration point kubb at the API OpenAPI
							(per audience prefix in multi-audience format) — the contract
							stays in sync end to end
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
