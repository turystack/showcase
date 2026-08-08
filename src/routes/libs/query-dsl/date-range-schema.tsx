import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/query-dsl/date-range-schema')({
	component: Page,
})

const dateRangeProps = [
	{
		description: 'Equal to date',
		name: 'eq',
		type: 'Date',
	},
	{
		description: 'After date',
		name: 'gt',
		type: 'Date',
	},
	{
		description: 'On or after date',
		name: 'gte',
		type: 'Date',
	},
	{
		description: 'Before date',
		name: 'lt',
		type: 'Date',
	},
	{
		description: 'On or before date',
		name: 'lte',
		type: 'Date',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					DateRangeSchema
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Zod schema that parses a semicolon-separated date range string (e.g.{' '}
					<code>{'>=2024-01-01;<=2024-12-31'}</code>) into a{' '}
					<code>DateRange</code> object with <code>Date</code> values.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="const DateRangeSchema: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<DateRange | undefined, string | undefined>>"
					filename="date-range.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { DateRangeSchema } from '@turystack/query-dsl'

DateRangeSchema.parse('>=2024-01-01;<=2024-12-31')
// { gte: Date('2024-01-01'), lte: Date('2024-12-31') }

DateRangeSchema.parse('=2024-06-15')
// { eq: Date('2024-06-15') }

DateRangeSchema.parse('>=2024-06-15T10:30:00.000Z')
// { gte: Date('2024-06-15T10:30:00.000Z') }

DateRangeSchema.parse(undefined) // undefined`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">DateRange object</h2>
				<PropsTable props={dateRangeProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					The schema is optional — <code>undefined</code> passes through. When a
					string is provided, it is validated against a regex, then each segment
					is checked as an ISO date or timezone-qualified ISO datetime.
					Duplicate operators return a <code>dateRangeDuplicatedOperator</code>{' '}
					validation issue and invalid dates return <code>dateInvalid</code>.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Helpers</h2>
				<CodeBlock
					code={`import { dateRangeToQuery, queryToDateRange } from '@turystack/query-dsl'

dateRangeToQuery({ gte: new Date('2024-01-01') })
// '>=2024-01-01T00:00:00.000Z'

queryToDateRange('>=2024-01-01')
// { gte: Date('2024-01-01') }`}
					filename="helpers.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					<code>dateRangeToQuery</code> serializes a <code>DateRange</code>{' '}
					object using ISO 8601 strings. <code>queryToDateRange</code> parses
					without Zod validation, useful on the client side.
				</p>
			</div>
		</div>
	)
}
