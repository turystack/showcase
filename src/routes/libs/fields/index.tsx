import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/fields/')({
	component: Page,
})

const GAPS = [
	{
		fix: 'RequiredStringSchema sanitizes first and reports required, not tooShort',
		gap: 'z.string().min(1) accepts "   "',
	},
	{
		fix: 'NumberSchema reports required — a blank field is not a zero',
		gap: 'z.coerce.number().parse("") returns 0',
	},
	{
		fix: 'MoneySchema assembles minor units from digits, never through a float',
		gap: 'Math.round(value * 100) drops a cent',
	},
	{
		fix: 'DateOnlySchema keeps a calendar date as YYYY-MM-DD, with no instant involved',
		gap: 'new Date("2026-01-01") is 31 December in São Paulo',
	},
	{
		fix: 'UrlSchema pins the protocol and can refuse private hosts',
		gap: 'z.url() accepts javascript: and http://169.254.169.254',
	},
	{
		fix: 'CnpjSchema validates the alphanumeric form as well',
		gap: 'A digits-only CNPJ check rejects every CNPJ issued from 2026',
	},
]

function Page() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/fields
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Zod schemas for entity fields — the ones a request body and a form
					both send. Where <code>@turystack/query-dsl</code> types what arrives
					in the query string, this types what arrives in the payload.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Why it exists</h2>
				<p className="text-muted-foreground">
					Zod validates shapes. It does not know that a whitespace-only name is
					empty, that a blank number field is not a zero, or that a date without
					a time zone is not an instant. Every schema here exists because that
					gap cost someone a bug.
				</p>
				<ul className="space-y-3">
					{GAPS.map((entry) => (
						<li
							className="flex items-start gap-2"
							key={entry.gap}
						>
							<span className="mt-1 text-lib">→</span>
							<span>
								<code>{entry.gap}</code>
								<span className="mt-1 block text-muted-foreground">
									{entry.fix}
								</span>
							</span>
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Installation</h2>
				<CodeBlock
					tabs={[
						{
							code: 'npm install @turystack/fields zod',
							label: 'npm',
						},
						{
							code: 'pnpm add @turystack/fields zod',
							label: 'pnpm',
						},
						{
							code: 'yarn add @turystack/fields zod',
							label: 'yarn',
						},
						{
							code: 'bun add @turystack/fields zod',
							label: 'bun',
						},
					]}
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<p className="text-muted-foreground">
					Every schema is a factory returning a real Zod type, so it composes
					with everything already written in Zod.
				</p>
				<CodeBlock
					code={`import {
  EmailSchema,
  MoneySchema,
  RequiredStringSchema,
  formatErrors,
} from '@turystack/fields'
import { CpfSchema } from '@turystack/fields/br'
import z from 'zod'

const CreateCustomer = z.object({
  document: CpfSchema(),
  email: EmailSchema({ blockDisposable: true }),
  limit_cents: MoneySchema({ maxCents: 1_000_00 }),
  name: RequiredStringSchema({ min: 3, max: 120 }),
})

const result = CreateCustomer.safeParse(input)

if (!result.success) {
  return formatErrors(result.error, (error) => messages[error.code])
  // { name: { code: 'required', message: 'Informe o nome', params: {}, path: 'name' } }
}`}
					filename="create-customer.schema.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">Two entry points</h2>
				<p className="text-muted-foreground">
					Brazilian documents live behind <code>@turystack/fields/br</code>, so
					a bundle that never validates a CPF never carries the code that does.
				</p>
			</div>

			<div className="space-y-3">
				<h2 className="font-display font-semibold text-xl">
					One taxonomy, both sides
				</h2>
				<p className="text-muted-foreground">
					Every failure carries a stable <code>code</code>. The backend maps it
					to an API error and the form maps it to a message, and neither ever
					matches on Zod's English text — which changes with the library version
					and cannot be translated.
				</p>
			</div>
		</div>
	)
}
