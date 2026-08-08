import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/nestjs-server/')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/nestjs-server
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					NestJS bootstrap factory with OpenAPI generation, Scalar reference UI,
					and Zod validation.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/nestjs-server',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/nestjs-server',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/nestjs-server',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/nestjs-server',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>NestJS bootstrap factory</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Automatic Swagger/OpenAPI generation</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Scalar API reference UI</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Zod validation transform</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>URI versioning</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-lib">→</span>
						<span>Health check endpoint</span>
					</li>
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick Usage</h2>
				<CodeBlock
					code={`import { Server } from '@turystack/nestjs-server'

await Server.create(AppModule, (config) => ({
  port: config.get('PORT'),
  title: 'My API',
  description: 'API description',
  docs: {
    provider: 'scalar',
    favicon: 'https://example.com/favicon.ico',
  },
}))`}
					filename="main.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
