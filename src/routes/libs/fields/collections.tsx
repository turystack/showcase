import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/collections')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Collections and identifiers
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Lists and objects that are empty in every sense except the one Zod
					measures.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A list of blanks is an empty list
				</h2>
				<p className="text-muted-foreground">
					A form that renders three inputs submits <code>['a', '', '']</code>,
					and <code>z.array(...).min(1)</code> counts three.
				</p>
				<CodeBlock
					code={`import {
  NonEmptyObjectSchema,
  RequiredArraySchema,
  UniqueArraySchema,
} from '@turystack/fields'

RequiredArraySchema(z.string()).parse(['a', '  ', ''])   // ['a']
RequiredArraySchema(z.string()).safeParse([])            // emptyList

// The duplicate is reported at its own index, so the form highlights that row
UniqueArraySchema(Guest, (guest) => guest.email).safeParse(guests)

// Guards a PATCH: a schema of optional fields accepts {} and the handler
// then issues an UPDATE with nothing to set
NonEmptyObjectSchema(UpdateUser).safeParse({})           // emptyObject`}
					filename="collection.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">IdSchema</h2>
				<p className="text-muted-foreground">
					Beyond the shape it rejects the values that pass a naive regex but can
					never exist: a UUID with an invalid version or variant nibble, a ULID
					above the timestamp ceiling, and a numeric id past{' '}
					<code>MAX_SAFE_INTEGER</code>.
				</p>
				<CodeBlock
					code={`import { IdSchema } from '@turystack/fields'

IdSchema().safeParse('018f6d3c-9f7a-0c3a-8f1e-2b6d5a4c3b2a')  // invalidId (version 0)
IdSchema({ formats: ['numeric'] }).safeParse('9007199254740993')  // invalidId
IdSchema({ formats: ['ulid', 'uuid'] }).parse('01ARZ3NDEKTSV4RRFFQ69G5FAV')`}
					filename="id.ts"
					language="ts"
				/>
				<PropsTable
					props={[
						{
							default: "['uuid']",
							description:
								"Accepted formats: 'uuid', 'ulid' or 'numeric'. The error names what was expected, which matters when several are accepted.",
							name: 'formats',
							type: "readonly ('numeric' | 'ulid' | 'uuid')[]",
						},
					]}
				/>
			</div>
		</div>
	)
}
