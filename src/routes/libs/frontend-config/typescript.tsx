import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/frontend-config/typescript')({
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

const optionRows = [
	[
		'target',
		'ES2022',
		'ES2022',
	],
	[
		'jsx',
		'react-jsx',
		'react-jsx',
	],
	[
		'module',
		'ESNext',
		'ESNext',
	],
	[
		'lib',
		'ES2022, DOM, DOM.Iterable',
		'ES2022',
	],
	[
		'types',
		'["vite/client"]',
		'not set',
	],
	[
		'moduleResolution',
		'bundler',
		'bundler',
	],
	[
		'allowImportingTsExtensions',
		'true',
		'true',
	],
	[
		'verbatimModuleSyntax',
		'true',
		'true',
	],
	[
		'noEmit',
		'true',
		'true',
	],
	[
		'noUnusedLocals',
		'true',
		'true',
	],
	[
		'noUnusedParameters',
		'true',
		'true',
	],
	[
		'noUncheckedSideEffectImports',
		'true',
		'true',
	],
]

const inheritedRows = [
	[
		'strict',
		'true',
		'All strict-family checks',
	],
	[
		'skipLibCheck',
		'true',
		'Skip type checks inside .d.ts files',
	],
	[
		'noFallthroughCasesInSwitch',
		'true',
		'No implicit switch fallthrough',
	],
	[
		'forceConsistentCasingInFileNames',
		'true',
		'Import casing must match the file',
	],
]

const appRows = [
	[
		'include',
		'Which files the app checks',
	],
	[
		'paths',
		'Aliases like #/*, relative to the app',
	],
	[
		'types',
		'Replaces the preset list; re-add vite/client',
	],
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					TypeScript presets
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					tsconfig.web for Vite apps, tsconfig.mobile for Expo / React Native.
					Both typecheck only.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Web vs mobile</h2>
				<RefTable
					head={[
						'Option',
						'tsconfig.web',
						'tsconfig.mobile',
					]}
					rows={optionRows}
				/>
				<p className="text-muted-foreground text-sm">
					Only lib and types differ. Mobile has no DOM globals and no Vite
					client types.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Inherited from @turystack/config
				</h2>
				<RefTable
					head={[
						'Option',
						'Value',
						'Effect',
					]}
					rows={inheritedRows}
				/>
				<p className="text-muted-foreground text-sm">
					Both presets extend @turystack/config/tsconfig.base.json.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Extending</h2>
				<CodeBlock
					tabs={[
						{
							code: `{
  "extends": "@turystack/frontend-config/tsconfig.web",
  "include": ["src", "vite.config.ts", "vitest.config.ts"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,
							label: 'Web app',
						},
						{
							code: `{
  "extends": "@turystack/frontend-config/tsconfig.mobile",
  "include": ["src", "app.config.ts"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,
							label: 'Mobile app',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					Both specifiers work, with or without .json. No outDir: the bundler
					emits, tsc only checks.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What the app declares
				</h2>
				<RefTable
					head={[
						'Option',
						'Why it stays in the app',
					]}
					rows={appRows}
				/>
				<p className="text-muted-foreground text-sm">
					TypeScript resolves paths against the file that declares them. In the
					preset they would point into node_modules.
				</p>
			</div>
		</div>
	)
}
