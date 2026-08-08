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
					The CLI scaffolds standalone NestJS APIs and React web applications,
					and installs the pattern skills into your repository. Mobile, handler,
					and monorepo commands are not available yet.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Local-first usage
				</h2>
				<p className="text-muted-foreground">
					Build the CLI from this repository and point it at the Turystack
					source root. Generated dependencies use local file links, so library
					changes can be tested before any package is published.
				</p>
				<CodeBlock
					code={`$ pnpm --dir cli build
$ node cli/dist/index.js create api my-api --local-root .

┌  Turystack · Create API
◆  How should the API surface be organized?
│  ○ Single audience
│  ● Multi-audience
◇  Audience 1
│  admin
◇  Audiences
│  1. admin
◇  Add another audience?
◇  Audience 2
│  app
◇  Audiences
│  1. admin
│  2. app
◇  Which optional capabilities does this API need?
│  ◻ Access & operations
│  ◻ Data & consistency
│  ◻ Delivery & integrations
◆  Which package manager should this project use?
│  ● pnpm
│  ○ npm / npx
│  ○ Yarn
│  ○ Bun
◇  Install dependencies after creating the project?
◇  API summary
│  Project     my-api
│  Format      Multi-audience (admin, app)
│  Modules     None — minimal API
│  Packages    Local Turystack source
│  Manager     pnpm
│  Install     Yes
◆  Create this API?
│  ● Create
◇  Project formatted
└  Next: cd my-api && pnpm dev`}
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
							code: 'npx @turystack/cli create api my-api',
							label: 'npm / npx',
						},
						{
							code: 'pnpm dlx @turystack/cli create api my-api',
							label: 'pnpm',
						},
						{
							code: 'yarn dlx @turystack/cli create api my-api',
							label: 'Yarn',
						},
						{
							code: 'bunx @turystack/cli create api my-api',
							label: 'Bun',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Non-interactive examples
				</h2>
				<CodeBlock
					tabs={[
						{
							code: `node cli/dist/index.js create api my-api \\
  --yes \\
  --local-root .`,
							label: 'Single audience',
						},
						{
							code: `node cli/dist/index.js create api my-api \\
  --yes \\
  --format multi-audience \\
  --audiences admin,app \\
  --package-manager npm \\
  --modules database,logger,cache,iam \\
  --local-root .`,
							label: 'Multi-audience',
						},
						{
							code: `node cli/dist/index.js create api my-api \\
  --yes \\
  --registry`,
							label: 'Registry',
						},
						{
							code: `node cli/dist/index.js create web my-web \\
  --yes \\
  --local-root .`,
							label: 'Web · Auth API',
						},
						{
							code: `node cli/dist/index.js create web my-web \\
  --yes \\
  --audience admin \\
  --local-root .`,
							label: 'Web · Admin API',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Options</h2>
				<CodeBlock
					code={`--format <single|multi-audience>
--audiences <admin,app>
--modules <database,logger,...>
--package-manager <pnpm|npm|yarn|bun>
--local-root <path>     Turystack source root for local file links
--registry              use published package versions
--skip-install
--yes
--help
--version`}
					filename="turystack create api"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Lock and rate-limit automatically include the cache module they depend
					on. The CLI shows these derived decisions in the confirmation summary.
					No fake domain is generated. The CLI creates only one temporary
					smoke-test controller per selected API surface, without service
					injection. Every project is formatted with Biome before the CLI
					finishes, including when installation is skipped.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Command organization
				</h2>
				<p className="text-muted-foreground">
					The entrypoint only routes execution. Each CLI operation owns its
					parser, prompts, types, template, runner, and tests under its command
					path.
				</p>
				<CodeBlock
					code={`src/
├── index.ts
└── commands/
    ├── create/
    │   ├── api/
    │   │   ├── args.ts
    │   │   ├── prompts.ts
    │   │   ├── api-template.ts
    │   │   └── create-api.ts
    │   └── web/
    │       ├── args.ts
    │       ├── prompts.ts
    │       ├── web-template.ts
    │       └── create-web.ts
    └── skills/
        ├── args.ts
        ├── prompts.ts
        └── skills.ts`}
					filename="@turystack/cli"
					language="bash"
				/>
			</div>
		</div>
	)
}
