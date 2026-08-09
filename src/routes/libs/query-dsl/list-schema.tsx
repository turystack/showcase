import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/query-dsl/list-schema')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					ListSchema
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Creates a Zod schema that parses a comma-separated string into a
					deduplicated, validated array.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code={`function ListSchema<T extends string>(
  schema: z.ZodSchema<T>,
  list: readonly T[],
): z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<List<T>, string | undefined>>`}
					filename="list.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { ListSchema } from '@turystack/query-dsl'
import z from 'zod'

const StatusEnum = z.enum(['active', 'inactive', 'pending'])

const schema = ListSchema(StatusEnum, ['active', 'inactive', 'pending'])

schema.parse('active,pending')         // ['active', 'pending']
schema.parse('active,active,pending')  // ['active', 'pending']
schema.parse(undefined)                // []`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					Splits the input string by commas, trims each value, validates every
					item against the provided Zod schema, and deduplicates using a{' '}
					<code>Set</code>. If any value fails validation, a{' '}
					<code>listInvalidValue</code> validation issue is returned with the
					list of allowed values.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Helpers</h2>
				<CodeBlock
					code={`import { queryToList, listToQuery } from '@turystack/query-dsl'

queryToList('active,,inactive,active') // ['active', 'inactive']
queryToList(null)                      // []

listToQuery(['active', 'inactive'])    // 'active,inactive'`}
					filename="helpers.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					<code>queryToList</code> and <code>listToQuery</code> are lightweight
					converters for use on the client side where Zod validation is not
					needed.
				</p>
			</div>
		</div>
	)
}
