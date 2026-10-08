import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/cross-field')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Cross-field rules
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Rules that involve two fields, reported on the field the user has to
					fix.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Where the error lands
				</h2>
				<p className="text-muted-foreground">
					A bare <code>.refine()</code> on an object puts its issue on the
					object root. No form library can attach that to an input, so the
					message floats above the form instead of sitting under the field that
					is wrong. Every refinement here writes an explicit path.
				</p>
				<CodeBlock
					code={`import {
  AtLeastOneOfRefine,
  DateOrderRefine,
  MatchFieldRefine,
  MutuallyExclusiveRefine,
  RequiredIfRefine,
  SumEqualsRefine,
} from '@turystack/fields'

const Booking = z
  .object({
    contact: z.enum(['email', 'phone']),
    email: OptionalStringSchema(),
    endsOn: DateOnlySchema(),
    phone: OptionalStringSchema(),
    startsOn: DateOnlySchema(),
  })
  .superRefine(RequiredIfRefine('phone', (value) => value.contact === 'phone'))
  .superRefine(AtLeastOneOfRefine(['email', 'phone']))
  .superRefine(DateOrderRefine('startsOn', 'endsOn'))`}
					filename="booking.schema.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Refinements</h2>
				<PropsTable
					props={[
						{
							description:
								'Makes a field required under a condition, reporting on that field instead of forcing a discriminated union.',
							name: 'RequiredIfRefine',
							type: '(field, when) => Refinement',
						},
						{
							description:
								'Requires one of a group, reporting on every field in it so the form can highlight all of them.',
							name: 'AtLeastOneOfRefine',
							type: '(fields) => Refinement',
						},
						{
							description: 'Allows at most one of a group to be filled in.',
							name: 'MutuallyExclusiveRefine',
							type: '(fields) => Refinement',
						},
						{
							description:
								'Requires two fields to match, reporting on the confirmation field.',
							name: 'MatchFieldRefine',
							type: '(field, confirmation, code?) => Refinement',
						},
						{
							description:
								'Requires one date to come no later than another, reporting on the end field. Works on YYYY-MM-DD strings and Date alike.',
							name: 'DateOrderRefine',
							type: '(start, end) => Refinement',
						},
						{
							description:
								'Requires the parts to add up to the declared total, compared as integers so three lines of 33.33 do not quietly fail against 99.99.',
							name: 'SumEqualsRefine',
							type: '(items, total, amountOf) => Refinement',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Password confirmation
				</h2>
				<CodeBlock
					code={`const SignUp = z
  .object({
    password: PasswordSchema({ context: [input.email] }),
    passwordConfirmation: z.string(),
  })
  .superRefine(MatchFieldRefine('password', 'passwordConfirmation'))

// { passwordConfirmation: { code: 'passwordMismatch', ... } }`}
					filename="sign-up.schema.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
