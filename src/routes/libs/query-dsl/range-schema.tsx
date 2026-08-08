import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/query-dsl/range-schema')({
	component: Page,
})

const rangeProps = [
	{
		description: 'Equal to value',
		name: 'eq',
		type: 'number',
	},
	{
		description: 'Greater than value',
		name: 'gt',
		type: 'number',
	},
	{
		description: 'Greater than or equal to value',
		name: 'gte',
		type: 'number',
	},
	{
		description: 'Less than value',
		name: 'lt',
		type: 'number',
	},
	{
		description: 'Less than or equal to value',
		name: 'lte',
		type: 'number',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					RangeSchema
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Zod schema that parses a semicolon-separated range string (e.g.{' '}
					<code>{'>=10;<=50'}</code>) into a <code>Range</code> object with
					numeric comparison operators.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="const RangeSchema: z.ZodPipe<z.ZodString, z.ZodTransform<Range, string>>"
					filename="number-range.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { RangeSchema } from '@turystack/query-dsl'

RangeSchema.parse('>=10;<=50')  // { gte: 10, lte: 50 }
RangeSchema.parse('=42')        // { eq: 42 }
RangeSchema.parse('>0;<100')    // { gt: 0, lt: 100 }`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Range object</h2>
				<PropsTable props={rangeProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					The input string is first validated against a regex, then split by{' '}
					<code>;</code>. Each segment is matched for an operator (
					<code>{'>=, <=, >, <, ='}</code>) and a numeric value. Duplicate
					operators return a <code>rangeDuplicatedOperator</code> validation
					issue.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Helpers</h2>
				<CodeBlock
					code={`import { rangeToQuery, queryToRange } from '@turystack/query-dsl'

rangeToQuery({ gte: 10, lte: 50 })  // '>=10;<=50'

queryToRange('>=10;<=50')            // { gte: 10, lte: 50 }`}
					filename="helpers.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					<code>rangeToQuery</code> serializes a <code>Range</code> object back
					to the query-string format. <code>queryToRange</code> parses the
					string without Zod validation, useful on the client side.
				</p>
			</div>
		</div>
	)
}
