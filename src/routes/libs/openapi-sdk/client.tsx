import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/openapi-sdk/client')({
	component: Page,
})

const clientProps = [
	{
		description: 'Prefixed to every path in the document',
		name: 'baseURL',
		required: true,
		type: 'string',
	},
	{
		default: "'data'",
		description: 'Return the body and throw, or return a result',
		name: 'returns',
		type: "'data' | 'result'",
	},
	{
		description: 'Sent on every request; a function runs per call',
		name: 'headers',
		type: 'HeadersInit | () => Promise<HeadersInit>',
	},
	{
		description: "Passed to fetch, e.g. 'include' for cookies",
		name: 'credentials',
		type: 'RequestCredentials',
	},
	{
		description: 'Replaces the global fetch',
		name: 'fetch',
		type: 'typeof fetch',
	},
]

const inputProps = [
	{
		description: 'Request body; multipart and form bodies built for you',
		name: 'body',
		type: 'per operation',
	},
	{
		description: 'Path parameters, URL-encoded',
		name: 'path',
		type: 'per operation',
	},
	{
		description: 'Query parameters, serialized per the document',
		name: 'query',
		type: 'per operation',
	},
	{
		description: 'Header parameters the operation declares',
		name: 'headers',
		type: 'per operation',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Client
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The generated factory and how its operations are called.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">createAcme</h2>
				<PropsTable props={clientProps} />
				<CodeBlock
					code={`import { createAcme } from '@/~sdk'

export const acme = createAcme({
  baseURL: import.meta.env.VITE_API_URL,
  credentials: 'include',
  headers: async () => ({ authorization: \`Bearer \${await getToken()}\` }),
})`}
					filename="api.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Calling</h2>
				<PropsTable props={inputProps} />
				<CodeBlock
					code={`await acme.coupon.get({ path: { id } })
await acme.coupon.list({ query: { page: 1, status: ['active'] } })
await acme.coupon.uploadImage({ path: { id }, body: { file } })

// fetch options go second
await acme.coupon.delete({ path: { id } }, { signal })

await acme.health() // nothing required, nothing passed`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">returns: 'data'</h2>
				<CodeBlock
					code={`import { AcmeError } from '@/~sdk'

try {
  const coupon = await acme.coupon.create({ body })
} catch (error) {
  if (error instanceof AcmeError) {
    error.status // 409
    error.body   // what the API sent
  }
}`}
					filename="data.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Resolves the 2xx body. Any other status throws <code>AcmeError</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					returns: 'result'
				</h2>
				<CodeBlock
					code={`const acme = createAcme({ baseURL, returns: 'result' })

const res = await acme.coupon.get({ path: { id } })

if (res.ok) {
  res.data // Coupon
} else if (res.status === 404) {
  res.error // the 404 body the document declares
}`}
					filename="result.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Resolves every status the document declares. Any other status, a
					network failure or an abort throws.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Types</h2>
				<CodeBlock
					code={`import type { AcmeErrorBody, AcmeInput, AcmeOutput, Coupon } from '@/~sdk'

type CreateBody = AcmeInput<'coupon.create'>['body']
type Listed = AcmeOutput<'coupon.list'>     // Coupon[]
type Conflict = AcmeErrorBody<'coupon.create'>`}
					filename="types.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Error types come from the document. A status it does not declare
					throws <code>AcmeError</code> in both modes.
				</p>
			</div>
		</div>
	)
}
