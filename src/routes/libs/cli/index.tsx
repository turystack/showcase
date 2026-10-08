import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/cli/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/cli
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The CLI builds monorepos, and only monorepos. A new repository already
					signs people in; you grow it one audience or domain at a time.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Local-first usage
				</h2>
				<p className="text-muted-foreground">
					Build the CLI here and point it at this source root. Dependencies
					become local file links, testable before any publish.
				</p>
				<CodeBlock
					code={`$ pnpm --dir cli build
$ node cli/dist/index.js create acme --local-root .

┌  Create a Turystack monorepo
◇  Install the Turystack skills into this repository?
│  Yes
◇  Repository summary
│  Name       acme
│  Location   ~/projects/acme
│  Shape      apps/ · domains/ · libs/
│  Skills     installed
│  Install    pnpm install
◇  Create this repository?
│  Create
✓ Repository created
✓ Source written
✓ Repository formatted
✓ Skills installed
└  cd acme && pnpm docker:up && pnpm build && pnpm db:generate && pnpm db:migrate && pnpm db:seed && pnpm dev`}
					filename="terminal"
					language="bash"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Run the published CLI
				</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npx @turystack/cli create acme',
							label: 'npx',
						},
						{
							code: 'pnpm dlx @turystack/cli create acme',
							label: 'pnpm',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The generated repository is pnpm only: its workspace file is how the
					law detects a Turystack repository.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What create produces
				</h2>
				<CodeBlock
					code={`acme/
├── apps/
│   ├── api          the API, its audiences, the authorization server (:3000)
│   ├── auth         the sign-in app — every auth screen (:3100)
│   ├── console      the customer's app, one organization (:3200)
│   └── backoffice   the operator's app, every organization (:3300)
├── domains/
│   └── iam          people, organizations, memberships, roles
├── libs/
│   ├── database     schema, relations, migrations
│   ├── ui           the design, as one stylesheet
│   └── oauth-clients  who may sign a person in
├── docker-compose.yml
├── .env · .env.example
└── pnpm-workspace.yaml`}
					filename="acme"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Each audience is one API surface, one OpenAPI document and one app. A
					product app holds no auth code: {'<AuthProvider>'} is the integration.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Audiences</h2>
				<CodeBlock
					code={`audience     surface               app              permissions
auth         /api/v1/auth          apps/auth        auth:
console      /api/v1/console       apps/console     console:
backoffice   /api/v1/backoffice    apps/backoffice  backoffice:`}
					filename="audiences"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					console reads one organization from the session. backoffice reads
					across them, so it is a separate app, never a route.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Non-interactive examples
				</h2>
				<CodeBlock
					tabs={[
						{
							code: `node cli/dist/index.js create acme \\
  --yes \\
  --local-root .`,
							label: 'Create',
						},
						{
							code: `node cli/dist/index.js create acme \\
  --yes \\
  --registry`,
							label: 'Registry',
						},
						{
							code: `cd acme
turystack add audience partner --yes --port 3400`,
							label: 'Add audience',
						},
						{
							code: `cd acme
turystack add domain order --yes`,
							label: 'Add domain',
						},
						{
							code: `cd acme
turystack skills --yes --claude --skills harness,proof-mode,backend`,
							label: 'Skills',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					add runs inside the repository. add audience writes /api/v1/partner,
					apps/partner, its OAuth client and PARTNER_ORIGIN.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Options</h2>
				<CodeBlock
					code={`turystack create <name> [options]
turystack add audience <name> [options]
turystack add domain <name> [options]
turystack skills [options]

Audience
  --port <number>       where the app runs in development; its origin

Skills
  --claude              install into .claude/skills
  --codex               install into .codex/skills
  --skills <ids>        harness,proof-mode,architecture,modeling,backend,
                        frontend,frontend-primitives,spec,uiux
  --project <name>      names the project's own skills

Shared
  --local-root <path>   Turystack source root for local file links
  --registry            use published package versions
  --skip-install
  --yes                 use defaults and disable prompts
  --help
  --version`}
					filename="turystack --help"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Every generated package is formatted with Biome before the CLI
					finishes, with --skip-install too.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Command organization
				</h2>
				<p className="text-muted-foreground">
					The entrypoint only routes. Each command owns its parser, prompts,
					runner and tests; workspace/ holds what they share.
				</p>
				<CodeBlock
					code={`src/
├── index.ts
├── commands/
│   ├── create/
│   │   ├── args.ts
│   │   ├── prompts.ts
│   │   ├── create-workspace.ts
│   │   └── templates/     api · web · iam · database · oauth-clients · ui
│   ├── add/
│   │   ├── audience/      args · prompts · add-audience
│   │   └── domain/        args · prompts · add-domain · domain-template
│   └── skills/            args · prompts · skills
└── workspace/             env · oauth-clients · biome · manifest · names`}
					filename="@turystack/cli"
					language="bash"
				/>
			</div>
		</div>
	)
}
