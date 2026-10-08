import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/openapi-sdk/config')({
	component: Page,
})

const configProps = [
	{
		description: 'Names the factory and types: createAcme, AcmeError',
		name: 'name',
		required: true,
		type: 'string',
	},
	{
		description: 'File path, http(s) URL, or the parsed document',
		name: 'input',
		required: true,
		type: 'string | object',
	},
	{
		description: 'Directory to write; must be new, empty, or ours',
		name: 'output',
		required: true,
		type: 'string',
	},
	{
		default: 'false',
		description: 'zod checks: request bodies, success bodies, or both',
		name: 'validate',
		type: "boolean | 'request' | 'response'",
	},
	{
		description: 'Sent when fetching a URL input',
		name: 'headers',
		type: 'Record<string, string>',
	},
	{
		description: 'Overrides for namespace and method names',
		name: 'naming',
		type: 'Naming',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Config & CLI
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					One config file declares every SDK; one command writes them all.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">defineSdk</h2>
				<PropsTable props={configProps} />
				<CodeBlock
					code={`import { defineSdk } from '@turystack/openapi-sdk'

export default defineSdk([
  { name: 'acme', input: process.env.OPENAPI_URL!, output: './src/~sdk' },
  {
    name: 'billing',
    input: 'https://billing.internal/openapi.json',
    headers: { authorization: \`Bearer \${process.env.SPEC_TOKEN}\` },
    output: './src/~billing',
    validate: 'response',
  },
])`}
					filename="openapi-sdk.config.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Relative paths resolve from the config file. TypeScript configs load
					without a build step.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">CLI</h2>
				<CodeBlock
					code={`openapi-sdk generate                      # openapi-sdk.config.{ts,mts,js,mjs}
openapi-sdk generate --config sdk.config.ts`}
					filename="terminal"
					language="bash"
				/>
				<p className="text-muted-foreground">
					Exits 1 with every problem listed when the document cannot become an
					SDK.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Output directory</h2>
				<p className="text-muted-foreground">
					Each run replaces it whole, only once generation succeeds. A directory
					holding other files, or another SDK, is refused.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Programmatic</h2>
				<CodeBlock
					code={`import { generate } from '@turystack/openapi-sdk'

const { files, operations } = await generate(
  { name: 'acme', input: spec, output: 'src/~sdk' },
  { cwd: process.cwd() },
)`}
					filename="build.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
