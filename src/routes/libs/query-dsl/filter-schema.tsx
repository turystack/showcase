import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/query-dsl/filter-schema')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					FilterSchema
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Factory that creates an optional string schema with OpenAPI metadata
					listing the filterable fields.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`function FilterSchema(
  fields: readonly string[],
  options?: { example: string },
): z.ZodOptional<z.ZodString>`}
					filename="filter.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { FilterSchema } from '@turystack/query-dsl'

const schema = FilterSchema(['name', 'email'], { example: 'john' })

schema.parse('john')     // 'john'
schema.parse(undefined)  // undefined`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					Returns a <code>z.string().optional()</code> schema enriched with{' '}
					<code>.meta()</code> containing a description that lists every
					filterable field and an optional example value. This metadata is
					picked up by OpenAPI/Swagger generators.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Types</h2>
				<CodeBlock
					code={`type Filter = {
  filter?: string | undefined
}`}
					filename="filter.types.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
