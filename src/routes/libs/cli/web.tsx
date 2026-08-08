import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/cli/web')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Web — Stack & Structure
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					What create web ships: native libraries, complete API infrastructure,
					the canonical folder tree, and one centered welcome route.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Create a web app</h2>
				<CodeBlock
					tabs={[
						{
							code: `node cli/dist/index.js create web my-web \\
  --local-root .`,
							label: 'Interactive',
						},
						{
							code: `node cli/dist/index.js create web my-web \\
  --yes \\
  --audience customer \\
  --openapi-url http://localhost:3000/api/v1/customer/openapi \\
  --api-base-url http://localhost:3000 \\
  --local-root .`,
							label: 'Customer audience',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					Every web project receives the complete OpenAPI integration. The
					wizard asks whether it consumes a specific API audience and derives
					the default OpenAPI and runtime URLs from that answer.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Native libraries</h2>
				<p className="text-muted-foreground">
					The UI, router, API generation, server state, and tooling form the
					base stack:
				</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@turystack/react-web</code> +{' '}
							<code className="text-lib">@turystack/react-hooks</code> +{' '}
							<code className="text-lib">@turystack/react-icons</code> — the UI
							kit, hook collection and icon set (mandatory)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@tanstack/react-router</code> —
							file-based routing with generated route tree and devtools
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@tanstack/react-query</code> — server
							state integrated with generated SDK hooks
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">zod</code> — validation everywhere:
							forms, env, and the generated schemas
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">kubb</code> — generates the typed SDK
							from the default auth or selected audience-specific OpenAPI
							surface
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">react-hook-form</code> +{' '}
							<code className="text-lib">@hookform/resolvers</code> — forms with
							zod resolvers
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">tailwindcss</code> v4 — styling, via
							the vite plugin
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">biome</code> + tsconfig extending{' '}
							<code className="text-lib">@turystack/frontend-config</code> — one
							tooling source for every frontend
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">vite</code> +{' '}
							<code className="text-lib">vitest</code> + Testing Library — build
							and tests
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Scripts with API integration
				</h2>
				<CodeBlock
					code={`{
  "predev": "tsr generate",
  "dev": "vite",
  "prebuild": "kubb generate && tsr generate",
  "build": "tsc --noEmit && vite build",
  "pretypecheck": "tsr generate",
  "typecheck": "tsc --noEmit",
  "lint": "biome lint .",
  "check": "biome check .",
  "check:fix": "biome check --write .",
  "format": "biome format --write .",
  "test": "vitest run --passWithNoTests",
  "test:coverage": "vitest run --coverage --passWithNoTests",
  "routes:generate": "tsr generate",
  "api:generate": "kubb generate"
}`}
					filename="package.json"
					language="json"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Folder structure</h2>
				<CodeBlock
					code={`src/
├── api/
│   ├── .gitkeep
│   ├── http-client.ts
│   └── query-client.ts
├── auth/.gitkeep
├── features/.gitkeep
├── hooks/.gitkeep
├── layouts/.gitkeep
├── routes/
│   ├── .gitkeep
│   ├── __root.tsx     # providers + Outlet only
│   └── index.tsx      # centered Welcome Turystack
├── support/.gitkeep
├── telemetry/.gitkeep
├── ui/.gitkeep
├── ~sdk/.gitkeep      # replaced by generated Kubb output
├── main.tsx
├── router.tsx
└── styles.css`}
					filename="src"
					language="bash"
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Every canonical folder is tracked with{' '}
							<code className="text-lib">.gitkeep</code>. The placeholder is
							removed when real code enters that folder
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The scaffold does not invent a layout, auth flow, feature,
							primitive, helper, or telemetry provider. Those folders start
							empty and explicit
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">api/</code> and{' '}
							<code className="text-lib">~sdk/</code> belong to every web
							project; the SDK is regenerated before production builds
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Imports use the <code className="text-lib">@/*</code> alias
							pointing to <code className="text-lib">src/*</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">routes/index.tsx</code> is the only
							initial product screen and renders Welcome Turystack centered
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">SDK generation</h2>
				<p className="text-muted-foreground">
					Kubb points at the default auth or selected audience-specific backend
					OpenAPI and writes the typed SDK into{' '}
					<code className="text-lib">~sdk/</code>:
				</p>
				<CodeBlock
					code={`import 'dotenv/config'

import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { z } from 'zod'

const openApiUrl = z.string().url().parse(process.env.OPENAPI_URL)

export default defineConfig({
  input: {
    path: openApiUrl,
  },
  output: {
    clean: true,
    format: false,
    path: './src/~sdk',
  },
  plugins: [
    pluginOas({ validate: false }),
    pluginTs({ output: { path: './types' } }),
    pluginZod({ output: { path: './schemas' } }),
    pluginClient({ importPath: '@/api/http-client' }),
    pluginReactQuery({
      client: { importPath: '@/api/http-client' },
      output: { path: './hooks' },
    }),
  ],
})`}
					filename="kubb.config.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					The CLI generates api/http-client.ts with the Client, RequestConfig
					and ResponseErrorConfig exports Kubb requires. That client owns base
					URL, session headers and Exception parsing for every generated hook.
					OPENAPI_URL is used only by codegen; VITE_API_BASE_URL is the public
					runtime base URL.
				</p>
			</div>
		</div>
	)
}
