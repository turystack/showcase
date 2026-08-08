import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/backend-config/typescript')({
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
					Two tsconfig bases — tsconfig.api for NestJS services that nest build
					compiles, tsconfig.handler for lambdas where the deploy tool bundles
					and tsc only typechecks.
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
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["node"],
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "declaration": false,
    "removeComments": true,
    "sourceMap": true,
    "incremental": true,
    "skipLibCheck": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react-jsx"
  }
}`,
							label: 'tsconfig.api.json',
						},
						{
							code: `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "types": ["node"],
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "strictPropertyInitialization": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}`,
							label: 'tsconfig.handler.json',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Strict — with one exception
				</h2>
				<p className="text-muted-foreground">
					Both bases are <code className="text-lib">"strict": true</code> with{' '}
					<code className="text-lib">
						"strictPropertyInitialization": false
					</code>
					. NestJS DTOs and entities declare class fields that decorators and
					the runtime populate — never a constructor:
				</p>
				<CodeBlock
					code={`export class CreateBookingDto {
  @IsString()
  propertyId: string

  @IsDateString()
  checkIn: string
}`}
					filename="create-booking.dto.ts"
					language="ts"
				/>
				<p className="text-muted-foreground text-sm">
					With full strictness every field would need a{' '}
					<code className="text-lib">!</code> assertion. Turning off only
					strictPropertyInitialization keeps the rest of strict mode intact.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Decorators and modules
				</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">"experimentalDecorators": true</code>{' '}
							and{' '}
							<code className="text-lib">"emitDecoratorMetadata": true</code> —
							NestJS DI resolves constructor parameter types from the emitted
							metadata
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">"module": "nodenext"</code> +{' '}
							<code className="text-lib">"moduleResolution": "nodenext"</code>{' '}
							with{' '}
							<code className="text-lib">
								"resolvePackageJsonExports": true
							</code>{' '}
							— resolution matches what node actually does at runtime
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							ES2023 target and lib,{' '}
							<code className="text-lib">"types": ["node"]</code>,{' '}
							<code className="text-lib">isolatedModules</code>,{' '}
							<code className="text-lib">esModuleInterop</code>, and{' '}
							<code className="text-lib">allowSyntheticDefaultImports</code>
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">api vs handler</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">tsconfig.api</code> emits — nest build
							runs tsc, so it sets{' '}
							<code className="text-lib">"declaration": false</code>,{' '}
							<code className="text-lib">"removeComments": true</code>,{' '}
							<code className="text-lib">"sourceMap": true</code>,{' '}
							<code className="text-lib">"incremental": true</code>, and{' '}
							<code className="text-lib">"jsx": "react-jsx"</code>
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>
							<code className="text-lib">tsconfig.handler</code> sets{' '}
							<code className="text-lib">"noEmit": true</code> — tsc only
							typechecks, the lambda bundle is the deploy tool's job, so none of
							the emit options exist
						</span>
					</li>
				</ul>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What the app declares
				</h2>
				<p className="text-muted-foreground">
					The bases set no <code className="text-lib">include</code>,{' '}
					<code className="text-lib">outDir</code>, or{' '}
					<code className="text-lib">paths</code> — extends resolves path-like
					options relative to the file that declares them, so those must live in
					the app:
				</p>
				<CodeBlock
					language="json"
					tabs={[
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
							label: 'tsconfig.json (API)',
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
							label: 'tsconfig.json (handler)',
						},
					]}
				/>
				<p className="text-muted-foreground text-sm">
					An API declares <code className="text-lib">outDir</code> because
					tsconfig.api emits; a handler is noEmit, so only include and the{' '}
					<code className="text-lib">@/*</code> alias remain app-side.
				</p>
			</div>
		</div>
	)
}
