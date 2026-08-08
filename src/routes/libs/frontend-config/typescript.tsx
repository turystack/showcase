import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/frontend-config/typescript')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					TypeScript bases
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Two tsconfig bases — tsconfig.web for vite apps, tsconfig.mobile for
					React Native. Both are strict and noEmit; the bundler does the
					emitting.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What they set</h2>
				<CodeBlock
					language="json"
					tabs={[
						{
							code: `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "forceConsistentCasingInFileNames": true
  }
}`,
							label: 'tsconfig.web.json',
						},
						{
							code: `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "forceConsistentCasingInFileNames": true
  }
}`,
							label: 'tsconfig.mobile.json',
						},
					]}
				/>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							ES2022 target, <code className="text-lib">react-jsx</code>, and{' '}
							<code className="text-lib">"moduleResolution": "bundler"</code> —
							the compiler only typechecks (
							<code className="text-lib">"noEmit": true</code>), vite or metro
							produce the output
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">verbatimModuleSyntax</code> and{' '}
							<code className="text-lib">allowImportingTsExtensions</code> —
							type imports stay explicit and .ts extensions are allowed in
							import paths
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							strict plus <code className="text-lib">noUnusedLocals</code>,{' '}
							<code className="text-lib">noUnusedParameters</code>,{' '}
							<code className="text-lib">noFallthroughCasesInSwitch</code>, and{' '}
							<code className="text-lib">noUncheckedSideEffectImports</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							The only difference: web adds{' '}
							<code className="text-lib">"DOM"</code> and{' '}
							<code className="text-lib">"DOM.Iterable"</code> to lib and{' '}
							<code className="text-lib">"types": ["vite/client"]</code> —
							mobile has neither, React Native has no DOM
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What the app declares
				</h2>
				<p className="text-muted-foreground">
					The bases set no <code className="text-lib">include</code> and no{' '}
					<code className="text-lib">paths</code> — those are the app's job.
					TypeScript resolves path-like options relative to the file that
					declares them, so an alias declared in the shared package would point
					inside node_modules, not the app:
				</p>
				<CodeBlock
					language="json"
					tabs={[
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
							label: 'tsconfig.json (web)',
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
							label: 'tsconfig.json (mobile)',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					No outDir needed — both bases are noEmit. The app only declares what
					is relative to itself: which files to include and where the{' '}
					<code className="text-lib">#/*</code> alias points.
				</p>
			</div>
		</div>
	)
}
