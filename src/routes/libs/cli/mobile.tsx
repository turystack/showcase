import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/cli/mobile')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Mobile — Stack & Structure
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					What create mobile ships: the same ownership rules as web, with Expo
					Router and required product layouts composed from react-mobile.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Native libraries</h2>
				<p className="text-muted-foreground">
					The mobile kit, router and tooling are the base stack. API generation
					and server-state packages are conditional:
				</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">@turystack/react-mobile</code> +{' '}
							<code className="text-lib">@turystack/react-hooks</code> — the
							mobile kit and hook collection (mandatory)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">expo</code> +{' '}
							<code className="text-lib">expo-router</code> — file-based routing
							with typed routes, the mobile mirror of TanStack Router
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
							<code className="text-lib">kubb</code> — typed SDK generation from
							backend OpenAPI
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
							<code className="text-lib">biome</code> + tsconfig extending{' '}
							<code className="text-lib">@turystack/frontend-config</code> — one
							tooling source for every frontend
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
  "predev": "kubb generate",
  "dev": "expo start",
  "android": "expo run:android",
  "ios": "expo run:ios",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:coverage": "vitest run --coverage",
  "lint": "biome lint",
  "format": "biome format --write ./src",
  "check": "biome check ./src",
  "check:fix": "biome check --write ./src",
  "api:generate": "kubb generate"
}`}
					filename="package.json"
					language="json"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Folder structure</h2>
				<p className="text-muted-foreground">
					The web structure translated to Expo Router: src/app/ holds routes
					only. _layout.tsx selects a shell from src/layouts/ and owns the
					navigation boundary.
				</p>
				<CodeBlock
					code={`src/
├── app/               # file-based routes (Expo Router) — routes ONLY
│   ├── _layout.tsx    #   root layout: providers, fonts, splash screen
│   ├── (app)/         #   authenticated group (mirror of web _app/)
│   │   ├── _layout.tsx#     session guard: Redirect to /sign-in + Stack
│   │   ├── (tabs)/    #     tab navigation
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   └── orders.tsx
│   │   └── orders/
│   │       └── [id].tsx   # dynamic route, typed params
│   └── (auth)/        #   public group (mirror of web _auth/)
│       ├── _layout.tsx
│       └── sign-in.tsx
├── features/          # one boundary per product feature
│   └── orders/
│       ├── components/
│       ├── support/   # optional private helpers for orders
│       └── index.ts   # only public API of the feature
├── layouts/           # REQUIRED: product shells built with react-mobile Layout
│   ├── auth-layout/
│   └── default-layout/
├── api/               # required: HTTP client + QueryClient for the SDK
├── auth/              # session and permissions, when auth is selected
├── ui/                # app-local primitives that arise in the project
├── hooks/             # optional cross-feature hooks
├── support/           # optional pure cross-feature utilities
├── telemetry/         # optional provider integration
└── ~sdk/              # required: GENERATED by kubb, never edited
    ├── types/         #   TypeScript types from the OpenAPI
    ├── schemas/       #   zod schemas
    └── hooks/         #   react-query hooks`}
					filename="src"
					language="bash"
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							src/app/ is reserved for routes — Expo Router treats every file
							there as a screen; everything else lives in the sibling folders
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							layouts/ is required and builds the visual shells with
							react-mobile; Expo _layout.tsx selects the shell and keeps route
							guards/navigation
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							api/ and ~sdk/ belong to every frontend. OPENAPI_URL feeds
							codegen; EXPO_PUBLIC_API_BASE_URL is used by the runtime HTTP
							client
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Each feature owns components/ plus optional private support/ and
							exposes only its root index.ts to routes and other features
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							api/, ~sdk/, hooks/, support/, auth/, ui/ and telemetry/ are
							canonical but conditional — no empty placeholders
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
