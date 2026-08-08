import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/backend-config/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/backend-config
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Shared biome + TypeScript config for APIs and handlers — every backend
					extends it.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<p className="text-muted-foreground">
					JSON-only package — no build, nothing to import at runtime. Extend it
					from the app configs:
				</p>
				<CodeBlock
					tabs={[
						{
							code: `{
  "extends": ["@turystack/backend-config/biome"]
}`,
							label: 'biome.json',
						},
						{
							code: `{
  "extends": "@turystack/backend-config/tsconfig.api.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "./dist",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
							label: 'tsconfig (API)',
						},
						{
							code: `{
  "extends": "@turystack/backend-config/tsconfig.handler.json",
  "include": ["src"],
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
							label: 'tsconfig (handler)',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					paths and outDir stay in the app — TypeScript resolves path-like
					options relative to the file that declares them, so they cannot live
					in the shared package.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Biome preset</h2>
				<p className="text-muted-foreground">What it enforces:</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Formatter: spaces (2), line width 80, single quotes, semicolons
							only when needed, trailing commas; parameter decorators enabled
							for NestJS DI
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Organized imports in groups: node → packages →{' '}
							<code className="text-lib">@turystack/**</code> →{' '}
							<code className="text-lib">@repo/**</code> →{' '}
							<code className="text-lib">@/database</code> →{' '}
							<code className="text-lib">@/support</code> →{' '}
							<code className="text-lib">@/adapters</code> →{' '}
							<code className="text-lib">@/domains</code> →{' '}
							<code className="text-lib">@/controllers</code> → exceptions/env →
							relative
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Sorted object keys and properties — except in{' '}
							<code className="text-lib">*.schema.ts</code>,{' '}
							<code className="text-lib">*.schemas.ts</code>,{' '}
							<code className="text-lib">*.entity.ts</code>, and{' '}
							<code className="text-lib">*.types.ts</code>, where field order
							matters
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">useBlockStatements</code> error,{' '}
							<code className="text-lib">noNonNullAssertion</code> warn,{' '}
							<code className="text-lib">noStaticOnlyClass</code> off (the
							module register pattern)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Generated and build output excluded:{' '}
							<code className="text-lib">drizzle/</code> (migrations),{' '}
							<code className="text-lib">dist</code>,{' '}
							<code className="text-lib">coverage</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Covers src/, scripts/, vitest configs, and drizzle.config.ts
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					TypeScript configs
				</h2>
				<p className="text-muted-foreground">
					Both are ES2023 + nodenext and strict, with decorator metadata for
					NestJS DI — strictPropertyInitialization stays off so DTO and entity
					classes declare fields without initializers. The difference is what
					happens at build time:
				</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">tsconfig.api</code> — emitting config
							(nest build) with sourceMap and incremental; the app sets outDir
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">tsconfig.handler</code> — noEmit:
							typecheck only, the lambda bundle is the deploy tool's job
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
