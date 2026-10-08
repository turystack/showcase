import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/error-codes')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Error codes
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The half of the contract a form consumes: one stable code per failure,
					never a message to match on.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Why the code is normalized
				</h2>
				<p className="text-muted-foreground">
					Zod carries <code>params</code> only on <code>custom</code> issues. A
					failed <code>.min()</code>, or a missing value, arrives with no code
					at all. <code>issueCode</code> translates those back into the
					taxonomy, so a field that is absent always reads <code>required</code>{' '}
					— the distinction between "missing" and "wrong type" is meaningless to
					whoever is filling the form.
				</p>
				<CodeBlock
					code={`import { formatErrors, issueCode } from '@turystack/fields'

issueCode({ code: 'custom', params: { code: 'invalidCpf' } })  // 'invalidCpf'
issueCode({ code: 'invalid_type', input: undefined })          // 'required'
issueCode({ code: 'too_big', origin: 'number' })               // 'outOfRange'`}
					filename="issue-code.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">formatErrors</h2>
				<p className="text-muted-foreground">
					Flattens a <code>ZodError</code> into one entry per failing field,
					keyed by dotted path — the shape a form library expects.
				</p>
				<CodeBlock
					code={`import { formatErrors } from '@turystack/fields'

const messages: Record<string, string> = {
  invalidCpf: 'CPF inválido',
  required: 'Campo obrigatório',
  tooShort: 'Muito curto',
}

const errors = formatErrors(result.error, (error) => messages[error.code] ?? error.code)

// {
//   'profile.name': {
//     code: 'tooShort', message: 'Muito curto',
//     params: { min: 3 }, path: 'profile.name',
//   },
//   'tags.1': { code: 'required', ... },
// }`}
					filename="format.ts"
					language="ts"
				/>
				<PropsTable
					props={[
						{
							description:
								'One entry per field, first failure wins. Use it to show a single message per input.',
							name: 'formatErrors',
							type: '(error, resolve?) => Record<string, FieldError>',
						},
						{
							description:
								'Every failure of every field — a password field that lists all unmet rules at once.',
							name: 'formatAllErrors',
							type: '(error, resolve?) => Record<string, FieldError[]>',
						},
						{
							description:
								'Resolves one issue to a stable code, falling back from Zod native codes.',
							name: 'issueCode',
							type: '(issue) => FieldIssueCode',
						},
						{
							description:
								'The union of every code this package raises. Type a translation table with it and a missing message becomes a type error.',
							name: 'FieldIssueCode',
							type: 'type',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					An exhaustive table
				</h2>
				<CodeBlock
					code={`import type { FieldIssueCode } from '@turystack/fields'

// Missing a code is a compile error, not a blank message in production
export const messages: Record<FieldIssueCode, string> = {
  ageTooHigh: 'Data de nascimento improvável',
  ageTooLow: 'Idade mínima não atingida',
  required: 'Campo obrigatório',
  // ...
}`}
					filename="messages.pt-BR.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Building your own field
				</h2>
				<p className="text-muted-foreground">
					The sanitizer and the issue builders are exported, so a
					project-specific field joins the same taxonomy.
				</p>
				<CodeBlock
					code={`import { check, isBlank, sanitize } from '@turystack/fields'

const BookingCode = z
  .string()
  .overwrite((value) => sanitize(value).toUpperCase())
  .refine((value) => !isBlank(value), { ...check('required'), abort: true })
  .refine((value) => /^[A-Z]{2}\\d{6}$/.test(value), check('invalidValue'))`}
					filename="booking-code.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
