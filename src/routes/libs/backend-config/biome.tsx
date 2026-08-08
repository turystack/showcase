import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/backend-config/biome')({
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
					The backend lint + format ruleset — extend it from an app's biome.json
					and every API and handler formats the same way, NestJS decorators
					included.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Extending it</h2>
				<CodeBlock
					code={`{
  "extends": ["@turystack/backend-config/biome"]
}`}
					filename="biome.json"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					The package exports ./biome straight to its biome.json. The preset
					also sets{' '}
					<code className="text-lib">
						"unsafeParameterDecoratorsEnabled": true
					</code>{' '}
					in the javascript parser — NestJS constructor injection parses without
					it erroring.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Import organization
				</h2>
				<p className="text-muted-foreground">
					organizeImports runs with fixed groups, each separated by a blank line
					— external code first, then the app's own layers in dependency order:
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
      ["@/database/**"],
      ":BLANK_LINE:",
      ["@/support/**"],
      ":BLANK_LINE:",
      ["@/adapters/**"],
      ":BLANK_LINE:",
      ["@/domains/**"],
      ":BLANK_LINE:",
      ["@/controllers/**"],
      ":BLANK_LINE:",
      ["@/exceptions", "@/env.schema"],
      ":BLANK_LINE:",
      [":PATH:"]
    ]
  }
}`}
					filename="biome.json (preset)"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					Node builtins, external packages (with{' '}
					<code className="text-lib">!@turystack/**</code> and{' '}
					<code className="text-lib">!@repo/**</code> carved out into their own
					groups), then the internal layers:{' '}
					<code className="text-lib">@/database</code> →{' '}
					<code className="text-lib">@/support</code> →{' '}
					<code className="text-lib">@/adapters</code> →{' '}
					<code className="text-lib">@/domains</code> →{' '}
					<code className="text-lib">@/controllers</code> →{' '}
					<code className="text-lib">@/exceptions</code> +{' '}
					<code className="text-lib">@/env.schema</code>, and relative paths
					last.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Sorted keys — with exceptions
				</h2>
				<p className="text-muted-foreground">
					<code className="text-lib">useSortedKeys</code> and{' '}
					<code className="text-lib">useSortedProperties</code> are{' '}
					<code className="text-lib">"level": "on"</code> globally, then
					switched off where declaration order carries meaning:
				</p>
				<CodeBlock
					code={`"overrides": [
  {
    "includes": ["**/*.json"],
    "assist": {
      "actions": {
        "source": {
          "useSortedKeys": { "level": "off", "options": {} },
          "useSortedProperties": { "level": "off", "options": {} }
        }
      }
    }
  },
  {
    "includes": [
      "**/*.schema.ts",
      "**/*.schemas.ts",
      "**/*.entity.ts",
      "**/*.types.ts"
    ],
    "assist": {
      "actions": {
        "source": {
          "useSortedKeys": { "level": "off", "options": {} },
          "useSortedProperties": { "level": "off", "options": {} }
        }
      }
    }
  }
]`}
					filename="biome.json (preset)"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					Drizzle schemas mirror column order, entities mirror table shape, and
					type files read top-down — alphabetizing those would destroy
					information. Everywhere else, sorted keys kill diff noise.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Lint rules</h2>
				<p className="text-muted-foreground">
					Biome's <code className="text-lib">recommended</code> set, tuned for
					NestJS:
				</p>
				<CodeBlock
					code={`"style": {
  "useBlockStatements": "error",
  "noNonNullAssertion": "warn"
},
"complexity": {
  "noStaticOnlyClass": "off",
  "noBannedTypes": "off"
},
"correctness": {
  "noUnusedFunctionParameters": "warn"
}`}
					filename="biome.json (preset)"
					language="json"
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">noStaticOnlyClass</code> off — the
							DynamicModule register() pattern is a static-only class by design
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">noNonNullAssertion</code> and{' '}
							<code className="text-lib">noUnusedFunctionParameters</code>{' '}
							downgraded to warn — visible, not blocking
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">useBlockStatements</code> as error — no
							braceless if/else
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
    "**/scripts/**/*",
    "**/vitest.config.ts",
    "**/vitest.e2e.config.ts",
    "**/drizzle.config.ts",
    "!**/dist",
    "!**/coverage*",
    "!**/drizzle"
  ]
}`}
					filename="biome.json (preset)"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					src/, scripts/, the vitest configs, and drizzle.config.ts are checked;
					build output (<code className="text-lib">dist</code>), coverage
					reports, and generated drizzle migrations (
					<code className="text-lib">drizzle/</code>) are excluded. Formatting
					matches the frontend preset: 2-space indent,{' '}
					<code className="text-lib">"lineWidth": 80</code>,{' '}
					<code className="text-lib">"quoteStyle": "single"</code>,{' '}
					<code className="text-lib">"semicolons": "asNeeded"</code>,{' '}
					<code className="text-lib">"trailingCommas": "all"</code>, and{' '}
					<code className="text-lib">"expand": "always"</code>.
				</p>
			</div>
		</div>
	)
}
