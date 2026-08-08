import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/query-dsl/boolean-schema')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					BooleanSchema
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Zod schema that coerces <code>"true"</code> and <code>"false"</code>{' '}
					query-string values into native booleans.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Signature</h2>
				<CodeBlock
					code="const BooleanSchema: z.ZodPreprocess<z.ZodBoolean>"
					filename="boolean.d.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={`import { BooleanSchema } from '@turystack/query-dsl'

BooleanSchema.parse('true')   // true
BooleanSchema.parse('false')  // false
BooleanSchema.parse(true)     // true`}
					filename="example.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">How it works</h2>
				<p className="text-muted-foreground">
					Uses <code>z.preprocess</code> to convert the string literals{' '}
					<code>"true"</code> and <code>"false"</code> into their boolean
					equivalents before passing the value through <code>z.boolean()</code>.
					Any other value is forwarded as-is, so non-boolean inputs will fail
					validation.
				</p>
			</div>
		</div>
	)
}
