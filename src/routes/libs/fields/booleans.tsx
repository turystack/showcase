import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/booleans')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Booleans and consent
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A browser does not send <code>true</code>. It sends <code>'on'</code>,
					or it sends nothing at all.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					An unchecked box is absent
				</h2>
				<p className="text-muted-foreground">
					An unchecked checkbox is not submitted, so <code>z.boolean()</code>{' '}
					raises <code>required</code> for every box the user left alone.{' '}
					<code>CheckboxSchema</code> reads that absence as <code>false</code>.
				</p>
				<CodeBlock
					code={`import {
  BooleanInputSchema,
  CheckboxSchema,
  MustAcceptSchema,
  TriStateSchema,
} from '@turystack/fields'

Boolean('false')                          // true — the coercion to avoid
BooleanInputSchema().parse('false')       // false
BooleanInputSchema().parse('Sim')         // true
BooleanInputSchema().safeParse('yep')     // invalidValue

CheckboxSchema().parse(undefined)         // false
MustAcceptSchema().safeParse(false)       // mustAccept
TriStateSchema().parse('')                // null`}
					filename="boolean.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Schemas</h2>
				<PropsTable
					props={[
						{
							description:
								"Reads the spellings a browser sends — 'on', '1', 'sim', 'true' — and rejects anything else instead of coercing it.",
							name: 'BooleanInputSchema',
							type: '() => ZodType<boolean>',
						},
						{
							description:
								'Missing or blank means false, which is what an unchecked box means.',
							name: 'CheckboxSchema',
							type: '() => ZodType<boolean>',
						},
						{
							description:
								'Consent that must be granted. Reports mustAccept rather than the invalid_literal of z.literal(true), so the message under the terms checkbox can say what to do.',
							name: 'MustAcceptSchema',
							type: '() => ZodType<true>',
						},
						{
							description:
								'Yes, no, or unanswered. Keeps "unanswered" apart from "no", which a default of false quietly destroys.',
							name: 'TriStateSchema',
							type: '() => ZodType<boolean | null>',
						},
					]}
				/>
			</div>
		</div>
	)
}
