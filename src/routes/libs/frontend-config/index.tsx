import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/frontend-config/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/frontend-config
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Shared biome + TypeScript config for web and mobile apps — every
					frontend extends it.
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
  "extends": ["@turystack/frontend-config/biome"]
}`,
							label: 'biome.json',
						},
						{
							code: `{
  "extends": "@turystack/frontend-config/tsconfig.web",
  "include": ["src"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,
							label: 'tsconfig (web)',
						},
						{
							code: `{
  "extends": "@turystack/frontend-config/tsconfig.mobile",
  "include": ["src"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,
							label: 'tsconfig (mobile)',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					paths stay in the app — TypeScript resolves them relative to the file
					that declares them, so an alias like #/* cannot live in the shared
					package.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Biome preset</h2>
				<p className="text-muted-foreground">What it enforces:</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Formatter: spaces (2), line width 80, single quotes, double quotes
							in JSX, semicolons only when needed, trailing commas
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Organized imports in groups: node → packages →{' '}
							<code className="text-lib">@turystack/**</code> →{' '}
							<code className="text-lib">@repo/**</code> →{' '}
							<code className="text-lib">#/**</code> → relative
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Sorted object keys, JSX attributes, and tailwind classes (
							<code className="text-lib">useSortedClasses</code> on className
							and tv)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">noConsole</code> as warning —{' '}
							console.warn and console.error stay allowed
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Generated files excluded:{' '}
							<code className="text-lib">routeTree.gen.ts</code>,{' '}
							<code className="text-lib">~sdk/</code>, and{' '}
							<code className="text-lib">*.css</code> (Tailwind v4 owns the css)
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							Covers src/, index.html, vite.config.ts, kubb.config.ts, and
							app.config.ts (expo)
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					TypeScript configs
				</h2>
				<p className="text-muted-foreground">
					Both are strict, noEmit (vite/metro do the emitting), with
					verbatimModuleSyntax, noUnusedLocals/Parameters, and
					noFallthroughCasesInSwitch. The difference is the target platform:
				</p>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">tsconfig.web</code> — bundler
							resolution, DOM + DOM.Iterable libs,{' '}
							<code className="text-lib">types: ["vite/client"]</code>, jsx
							react-jsx
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">tsconfig.mobile</code> — same base
							without DOM libs and vite types (React Native has no DOM)
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
