import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/openapi-sdk/')({
	component: Page,
})

const features = [
	'Any OpenAPI 3.x or Swagger 2.0 document, from a file or a URL',
	'One call shape: sdk.tag.operation({ body, path, query, headers })',
	'Generated code runs on fetch alone, in the browser and in Node',
	'Return the body and throw, or return a result and never throw',
	'Optional zod validation of requests and responses',
	'Name collisions fail the build instead of being silently dropped',
]

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/openapi-sdk
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Generates a typed SDK from an OpenAPI document. The tag names the
					namespace and the operationId names the method.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install -D @turystack/openapi-sdk',
							label: 'npm',
						},
						{
							code: 'pnpm add -D @turystack/openapi-sdk',
							label: 'pnpm',
						},
						{
							code: 'yarn add -D @turystack/openapi-sdk',
							label: 'yarn',
						},
						{
							code: 'bun add -d @turystack/openapi-sdk',
							label: 'bun',
						},
					]}
				/>
				<p className="text-muted-foreground">
					A dev dependency: the generated SDK imports nothing from it. Add{' '}
					<code>zod</code> only if the config turns on <code>validate</code>.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Quick start</h2>
				<CodeBlock
					code={`import { defineSdk } from '@turystack/openapi-sdk'

export default defineSdk({
  name: 'acme',
  input: process.env.OPENAPI_URL!, // or './openapi.json'
  output: './src/~sdk',
})`}
					filename="openapi-sdk.config.ts"
					language="ts"
				/>
				<CodeBlock
					code={`"scripts": {
  "predev": "openapi-sdk generate",
  "prebuild": "openapi-sdk generate"
}`}
					filename="package.json"
					language="json"
				/>
				<CodeBlock
					code={`import { createAcme } from '@/~sdk'

const acme = createAcme({ baseURL: import.meta.env.VITE_API_URL })

const coupon = await acme.coupon.create({ body: { code: 'X10' } })
const page = await acme.coupon.list({ query: { page: 1 } })
await acme.coupon.delete({ path: { id: coupon.id } })`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Features</h2>
				<ul className="space-y-2 text-muted-foreground">
					{features.map((feature) => (
						<li
							className="flex items-start gap-2"
							key={feature}
						>
							<span className="mt-1 text-lib">→</span>
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">What it writes</h2>
				<CodeBlock
					code={`src/~sdk/
  index.ts     createAcme, AcmeError, AcmeInput, AcmeOutput, every type
  sdk.ts       the tag.operation tree
  client.ts    the fetch runtime, copied in
  types.ts     request and response types (Kubb)
  schemas.ts   zod schemas, only with validate`}
					filename="output"
					language="bash"
				/>
			</div>
		</div>
	)
}
