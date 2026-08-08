import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/frontend-config/biome')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Biome preset
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The frontend lint + format ruleset — extend it from an app's
					biome.json and every web and mobile app formats the same way.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Extending it</h2>
				<CodeBlock
					code={`{
  "extends": ["@turystack/frontend-config/biome"]
}`}
					filename="biome.json"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					The package exports ./biome straight to its biome.json — no build
					step. Anything the app adds after extends overrides the preset.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Import organization
				</h2>
				<p className="text-muted-foreground">
					organizeImports runs as an assist action with fixed groups, each
					separated by a blank line:
				</p>
				<CodeBlock
					code={`"organizeImports": {
  "level": "on",
  "options": {
    "groups": [
      [":NODE:"],
      ":BLANK_LINE:",
      [":PACKAGE:", "!@turystack/**", "!@repo/**"],
      ":BLANK_LINE:",
      ["@turystack/**"],
      ":BLANK_LINE:",
      ["@repo/**"],
      ":BLANK_LINE:",
      ["#/**"],
      ":BLANK_LINE:",
      [":PATH:"]
    ]
  }
}`}
					filename="biome.json (preset)"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					Node builtins first, then external packages (with{' '}
					<code className="text-lib">!@turystack/**</code> and{' '}
					<code className="text-lib">!@repo/**</code> excluded so they get their
					own groups), then <code className="text-lib">@turystack/**</code>,{' '}
					<code className="text-lib">@repo/**</code>, the app alias{' '}
					<code className="text-lib">#/**</code>, and relative paths last.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Sorted keys, attributes, and classes
				</h2>
				<p className="text-muted-foreground">
					Three assist actions keep everything alphabetical —{' '}
					<code className="text-lib">useSortedKeys</code>,{' '}
					<code className="text-lib">useSortedAttributes</code>, and{' '}
					<code className="text-lib">useSortedProperties</code> are all{' '}
					<code className="text-lib">"level": "on"</code>. Tailwind classes get
					the nursery lint rule on top:
				</p>
				<CodeBlock
					code={`"nursery": {
  "useSortedClasses": {
    "fix": "safe",
    "level": "error",
    "options": {
      "attributes": ["className"],
      "functions": ["tv"]
    }
  }
}`}
					filename="biome.json (preset)"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					className attributes and tv() calls are sorted with a safe autofix. An
					override turns both <code className="text-lib">useSortedKeys</code>{' '}
					and <code className="text-lib">useSortedProperties</code> off for{' '}
					<code className="text-lib">**/*.json</code> — package.json field order
					stays meaningful.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Lint rules</h2>
				<p className="text-muted-foreground">
					Biome's <code className="text-lib">recommended</code> set, plus:
				</p>
				<CodeBlock
					code={`"style": {
  "useBlockStatements": "error"
},
"suspicious": {
  "noConsole": {
    "level": "warn",
    "options": {
      "allow": ["warn", "error"]
    }
  }
}`}
					filename="biome.json (preset)"
					language="json"
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">useBlockStatements</code> as error — no
							braceless if/else
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">noConsole</code> as warn — console.log
							flags, console.warn and console.error stay allowed
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What it covers — and skips
				</h2>
				<CodeBlock
					code={`"files": {
  "ignoreUnknown": false,
  "includes": [
    "**/src/**/*",
    "**/index.html",
    "**/vite.config.ts",
    "**/kubb.config.ts",
    "**/app.config.ts",
    "!**/src/routeTree.gen.ts",
    "!**/src/~sdk",
    "!**/*.css"
  ]
}`}
					filename="biome.json (preset)"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					Generated files are excluded with negated globs:{' '}
					<code className="text-lib">routeTree.gen.ts</code> (TanStack Router),{' '}
					<code className="text-lib">src/~sdk</code> (kubb-generated API
					client), and <code className="text-lib">*.css</code>. Everything else
					under src/ plus the vite, kubb, and expo config files is checked.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Formatter</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							2-space indent, <code className="text-lib">"lineWidth": 80</code>,
							lf line endings
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">"quoteStyle": "single"</code> with{' '}
							<code className="text-lib">"jsxQuoteStyle": "double"</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">"semicolons": "asNeeded"</code> and{' '}
							<code className="text-lib">"trailingCommas": "all"</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">"attributePosition": "multiline"</code>{' '}
							and <code className="text-lib">"expand": "always"</code> — one JSX
							attribute per line, objects always expanded
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
