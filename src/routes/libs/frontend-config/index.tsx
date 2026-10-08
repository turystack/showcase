import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/frontend-config/')({
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

const exportsRows = [
	[
		'./biome',
		'biome.json',
		'Lint + format preset, web and Expo',
	],
	[
		'./tsconfig.web',
		'tsconfig.web.json',
		'Vite apps: DOM libs + vite/client types',
	],
	[
		'./tsconfig.web.json',
		'tsconfig.web.json',
		'Same file, with the extension',
	],
	[
		'./tsconfig.mobile',
		'tsconfig.mobile.json',
		'Expo / React Native: ES2022 lib only',
	],
	[
		'./tsconfig.mobile.json',
		'tsconfig.mobile.json',
		'Same file, with the extension',
	],
	[
		'./vitest',
		'vitest.base.js (+ .d.ts)',
		'web(), mobile, FLOOR, WebTestOverrides',
	],
]

const vitestExportsRows = [
	[
		'web(overrides?)',
		'(WebTestOverrides) => ViteUserConfig',
		'Default test config for a web app',
	],
	[
		'mobile',
		'typeof web',
		'The same function, named for Expo apps',
	],
	[
		'FLOOR',
		'number',
		'Coverage floor, 85, from @turystack/config',
	],
	[
		'WebTestOverrides',
		'type',
		'Vitest `test` options plus `plugins`',
	],
]

const vitestDefaults = [
	{
		default: "'jsdom'",
		description: 'Same DOM environment for web and mobile',
		name: 'environment',
		type: 'string',
	},
	{
		default: 'false',
		description: 'A suite with no tests fails',
		name: 'passWithNoTests',
		type: 'boolean',
	},
	{
		default: "'v8'",
		description: 'Coverage provider',
		name: 'coverage.provider',
		type: 'string',
	},
	{
		default: "['src/**/*.{ts,tsx}']",
		description: 'Untested files report 0% instead of vanishing',
		name: 'coverage.include',
		type: 'string[]',
	},
	{
		default: "['text', 'json-summary', 'json']",
		description: 'Coverage reporters',
		name: 'coverage.reporter',
		type: 'string[]',
	},
	{
		default: '85',
		description: 'branches, functions, lines, statements',
		name: 'coverage.thresholds',
		type: '{ branches, functions, lines, statements }',
	},
	{
		default: 'true',
		description: 'Floor applies per file, not project average',
		name: 'coverage.thresholds.perFile',
		type: 'boolean',
	},
	{
		default: 'see below',
		description: 'Files with nothing to cover',
		name: 'coverage.exclude',
		type: 'string[]',
	},
]

const overrideProps = [
	{
		description: 'Hoisted to the Vite config root, not `test`',
		name: 'plugins',
		type: "ViteUserConfig['plugins']",
	},
	{
		description: 'Any Vitest `test` option, spread last',
		name: '...test options',
		type: "ViteUserConfig['test']",
	},
]

const inheritedRows = [
	[
		'tsconfig',
		'extends tsconfig.base.json',
		'strict, skipLibCheck, two safety flags',
	],
	[
		'biome',
		'restated, not extended',
		'Biome ignores a nested extends',
	],
	[
		'vitest',
		'imports coverage() and FLOOR',
		'One coverage floor for backend and frontend',
	],
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/frontend-config
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Biome, TypeScript and Vitest presets for web and Expo / React Native
					apps.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Exports</h2>
				<RefTable
					head={[
						'Specifier',
						'File',
						'Use',
					]}
					rows={exportsRows}
				/>
				<p className="text-muted-foreground text-sm">
					One Biome preset serves both platforms. TypeScript and Vitest have a
					web and a mobile entry.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Install</h2>
				<CodeBlock
					code="pnpm add -D @turystack/frontend-config"
					language="bash"
				/>
				<p className="text-muted-foreground text-sm">
					Its only dependency is @turystack/config. The app installs biome,
					typescript, vitest, jsdom and @vitest/coverage-v8 itself.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Web app (Vite)</h2>
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
  "include": ["src", "vite.config.ts", "vitest.config.ts"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,
							label: 'tsconfig.json',
						},
						{
							code: `import react from '@vitejs/plugin-react'
import { web } from '@turystack/frontend-config/vitest'

export default web({
  include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  plugins: [react()],
})`,
							label: 'vitest.config.ts',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Mobile app (Expo / React Native)
				</h2>
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
  "extends": "@turystack/frontend-config/tsconfig.mobile",
  "include": ["src", "app.config.ts"],
  "compilerOptions": {
    "paths": {
      "#/*": ["./src/*"]
    }
  }
}`,
							label: 'tsconfig.json',
						},
						{
							code: `import { mobile } from '@turystack/frontend-config/vitest'

export default mobile({
  include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
})`,
							label: 'vitest.config.ts',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					The Biome preset already lints app.config.ts. tsconfig.mobile drops
					DOM and vite/client.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Vitest preset</h2>
				<RefTable
					head={[
						'Export',
						'Type',
						'Description',
					]}
					rows={vitestExportsRows}
				/>
				<h3 className="font-display font-semibold text-lg">Defaults</h3>
				<PropsTable props={vitestDefaults} />
				<CodeBlock
					code={`// from @turystack/config (UNCOVERED)
'**/*.d.ts', '**/*.mock.ts', '**/*.schema.ts',
'**/*.types.ts', '**/index.ts',
// added by frontend-config (composition roots)
'**/*.config.ts', '**/*.types.ts', '**/~sdk/**',
'**/main.tsx', '**/query-client.ts', '**/routeTree.gen.ts',
'**/router.tsx', '**/routes/__root.tsx'`}
					filename="coverage.exclude"
					language="ts"
				/>
				<h3 className="font-display font-semibold text-lg">WebTestOverrides</h3>
				<PropsTable props={overrideProps} />
				<p className="text-muted-foreground text-sm">
					Overrides replace whole keys. Passing coverage drops the floor;
					passing environment replaces jsdom.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Built on @turystack/config
				</h2>
				<RefTable
					head={[
						'Preset',
						'How',
						'Why',
					]}
					rows={inheritedRows}
				/>
				<p className="text-muted-foreground text-sm">
					Biome's shared blocks are copied from the baseline. A check:baseline
					gate fails if they drift.
				</p>
			</div>
		</div>
	)
}
