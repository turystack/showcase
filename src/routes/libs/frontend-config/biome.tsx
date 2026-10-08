import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/frontend-config/biome')({
	component: Page,
})

type RefTableProps = {
	head: string[]
	rows: string[][]
}

function RefTable({ head, rows }: RefTableProps) {
	return (
		<div className="overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-border border-b bg-muted/50">
						{head.map((cell) => (
							<th
								className="px-4 py-3 text-left font-medium text-muted-foreground"
								key={cell}
							>
								{cell}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr
							className={
								index < rows.length - 1 ? 'border-border border-b' : ''
							}
							key={row.join('|')}
						>
							{head.map((label) => (
								<td
									className="px-4 py-3 align-top text-muted-foreground"
									key={label}
								>
									{label === head[0] ? (
										<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
											{row[head.indexOf(label)]}
										</code>
									) : (
										row[head.indexOf(label)]
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

const scopeRows = [
	[
		'**/src/**/*',
		'linted',
		'All app source',
	],
	[
		'**/index.html',
		'linted',
		'Vite entry (web)',
	],
	[
		'**/vite.config.ts',
		'linted',
		'Vite config (web)',
	],
	[
		'**/kubb.config.ts',
		'linted',
		'SDK generator config',
	],
	[
		'**/app.config.ts',
		'linted',
		'Expo config (mobile)',
	],
	[
		'!**/dist',
		'skipped',
		'Build output',
	],
	[
		'!**/coverage*',
		'skipped',
		'Coverage reports',
	],
	[
		'!**/src/routeTree.gen.ts',
		'skipped',
		'TanStack Router, generated',
	],
	[
		'!**/src/~sdk',
		'skipped',
		'Kubb SDK, generated',
	],
	[
		'!**/*.css',
		'skipped',
		'Stylesheets',
	],
]

const formatterRows = [
	[
		'indentStyle / indentWidth',
		'space / 2',
	],
	[
		'lineWidth',
		'80',
	],
	[
		'lineEnding',
		'lf',
	],
	[
		'formatWithErrors',
		'false',
	],
	[
		'quoteStyle / jsxQuoteStyle',
		'single / double',
	],
	[
		'semicolons',
		'asNeeded',
	],
	[
		'arrowParentheses',
		'always',
	],
	[
		'trailingCommas',
		'all',
	],
	[
		'bracketSpacing / bracketSameLine',
		'true / false',
	],
	[
		'attributePosition',
		'multiline',
	],
	[
		'expand',
		'always',
	],
	[
		'json.parser',
		'allowComments, allowTrailingCommas',
	],
]

const assistRows = [
	[
		'organizeImports',
		'on',
		'Fixed import groups, see below',
	],
	[
		'useSortedAttributes',
		'on',
		'JSX attributes in order',
	],
	[
		'useSortedKeys',
		'on (off in *.json)',
		'Object keys in order',
	],
	[
		'useSortedProperties',
		'on (off in *.json)',
		'Properties in order',
	],
]

const lintRows = [
	[
		'recommended',
		'on',
		"Biome's recommended set",
	],
	[
		'style.useBlockStatements',
		'error',
		'No braceless if / else / loops',
	],
	[
		'suspicious.noConsole',
		'warn',
		'console.warn and console.error allowed',
	],
	[
		'nursery.useSortedClasses',
		'error, safe fix',
		'Sorts className and tv() classes',
	],
]

const restrictionRows = [
	[
		'**/src/features/**',
		'@/routes, #/routes',
		'COM-3 / RTE-1',
	],
	[
		'**/src/routes/**, **/src/app/**',
		'@/features/*/components|support/**',
		'STR-2 / ARC-LAY-5',
	],
	[
		'**/src/ui/**, **/src/components/**',
		'~sdk, @/features, @/routes',
		'CPS-5',
	],
]

const pluginRows = [
	[
		'no-as-prop',
		'CPS-3',
		'An as= prop; use asChild',
	],
	[
		'no-classname-prop',
		'PROP-1',
		'className?: in a props type',
	],
	[
		'no-conditional-class',
		'STY-2',
		'Ternary or + inside className={}',
	],
	[
		'no-data-fallback',
		'UST-11',
		'query.data ?? []',
	],
	[
		'no-default-export',
		'CMP-L1',
		'export default',
	],
	[
		'no-external-class-merge',
		'STY-L3',
		'cn() merging an incoming className',
	],
	[
		'no-hardcoded-brand',
		'STY-8',
		'A 3- or 6-digit hex colour',
	],
	[
		'no-icon-name-prop',
		'PROP-11',
		'icon: string prop; pass a node',
	],
	[
		'no-implementation-query',
		'TST-5',
		'container.querySelector() in tests',
	],
	[
		'no-inline-handler',
		'COM-L1',
		'Inline arrow in onClick={}',
	],
	[
		'no-inline-permission-check',
		'PRM-1',
		'permissions.includes(id); use Protected',
	],
	[
		'no-inline-union',
		'PROP-2',
		"Inline 'a' | 'b' union on a prop",
	],
	[
		'no-layout-scaled-media',
		'PRF-3',
		'<img /> without width',
	],
	[
		'no-literal-visual-value',
		'UIX-1',
		'String literal hex colour or px value',
	],
	[
		'no-manual-focus',
		'AXS-4',
		'ref.current.focus()',
	],
	[
		'no-navigable-state-in-memory',
		'ARC-DEL-8',
		'useState for page, filters, sort, tab, query',
	],
	[
		'no-navigate-in-form',
		'FRM-10',
		'navigate / router.push in a submit handler',
	],
	[
		'no-outline-none',
		'AXS-3',
		'focus:outline-none class',
	],
	[
		'no-raw-breakpoint',
		'RSP-2',
		'min-width: <n>px',
	],
	[
		'no-raw-interactive',
		'CPS-1',
		'<div onClick={…}>',
	],
	[
		'no-redundant-fallback',
		'COM-L2',
		'value ?? false',
	],
	[
		'no-reset-effect',
		'FRM-5',
		'form.reset() inside useEffect',
	],
	[
		'no-rewrite-api-message',
		'ERR-2',
		'Literal toast / setError text in a catch',
	],
	[
		'no-route-loader-data',
		'RTE-4',
		'useLoaderData()',
	],
	[
		'no-scheme-branch',
		'STY-9',
		'colorScheme === value',
	],
	[
		'no-selected-row-state',
		'TBL-8',
		'useState holding a selectedRow',
	],
	[
		'no-server-state-copy',
		'ARC-CTR-7',
		'useState(query.data)',
	],
	[
		'no-synthetic-event',
		'TST-6',
		'fireEvent.*; use user-event',
	],
	[
		'no-unsafe-output',
		'ARC-SEC-10',
		'dangerouslySetInnerHTML, .innerHTML =',
	],
	[
		'onchange-delivers-value',
		'PROP-7',
		'on*(event: ChangeEvent…) prop types',
	],
	[
		'optimistic-write-shape',
		'ARC-CON-10',
		'useMutation onMutate without onError',
	],
]

const extendsRows = [
	[
		'files.includes, overrides',
		'Concatenated with the preset',
	],
	[
		'organizeImports groups',
		'Replaced entirely by the app',
	],
	[
		'everything else',
		'Deep-merged, the app wins',
	],
	[
		'nested extends',
		'Ignored silently by Biome',
	],
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Biome preset
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					One lint + format preset for web and Expo apps, plus 31 GritQL rules
					the app opts into.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Extending it</h2>
				<CodeBlock
					code={`{
  "root": false,
  "extends": ["@turystack/frontend-config/biome"],
  "plugins": [
    "./node_modules/@turystack/frontend-config/plugins/no-as-prop.grit",
    "./node_modules/@turystack/frontend-config/plugins/no-default-export.grit"
  ]
}`}
					filename="biome.json"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					The preset lists no plugins: a plugin path in an extended config
					resolves against the app&apos;s, not the preset&apos;s. List them in
					the app.
				</p>
				<p className="text-muted-foreground text-sm">
					"root": false only for a config nested in a monorepo. Same file for
					web and mobile.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Files in scope</h2>
				<RefTable
					head={[
						'Glob',
						'Status',
						'What',
					]}
					rows={scopeRows}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Formatter</h2>
				<RefTable
					head={[
						'Option',
						'Value',
					]}
					rows={formatterRows}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Assist actions</h2>
				<RefTable
					head={[
						'Action',
						'Level',
						'Effect',
					]}
					rows={assistRows}
				/>
				<CodeBlock
					code={`"groups": [
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
]`}
					filename="organizeImports (preset)"
					language="json"
				/>
				<p className="text-muted-foreground text-sm">
					A repo scoped other than @repo restates groups; the app's array
					replaces this one.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Lint rules</h2>
				<RefTable
					head={[
						'Rule',
						'Level',
						'Effect',
					]}
					rows={lintRows}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Import restrictions
				</h2>
				<RefTable
					head={[
						'Files',
						'May not import',
						'Law',
					]}
					rows={restrictionRows}
				/>
				<p className="text-muted-foreground text-sm">
					All three use noRestrictedImports at error level.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">GritQL plugins</h2>
				<RefTable
					head={[
						'Plugin',
						'Law',
						'Flags',
					]}
					rows={pluginRows}
				/>
				<p className="text-muted-foreground text-sm">
					Each ships as plugins/&lt;name&gt;.grit with a fail and a pass fixture
					checked in CI.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					How extends merges
				</h2>
				<RefTable
					head={[
						'Key',
						'Through extends',
					]}
					rows={extendsRows}
				/>
				<p className="text-muted-foreground text-sm">
					So this preset restates @turystack/config instead of extending it.
				</p>
			</div>
		</div>
	)
}
