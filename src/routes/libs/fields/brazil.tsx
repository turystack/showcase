import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/brazil')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Brazilian documents
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Behind <code>@turystack/fields/br</code>, so a bundle that never
					validates a CPF never carries the code that does.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A regex is not a validation
				</h2>
				<p className="text-muted-foreground">
					<code>111.111.111-11</code> matches every CPF pattern ever written and
					is invalid. Each schema here checks the actual check digits, accepts
					the value masked or bare, and returns one canonical form so the same
					person cannot be stored twice under two spellings.
				</p>
				<CodeBlock
					code={`import { CpfSchema, CnpjSchema, PhoneSchema } from '@turystack/fields/br'

CpfSchema().parse('529.982.247-25')        // '52998224725'
CpfSchema().safeParse('111.111.111-11')    // invalidCpf

// Alphanumeric CNPJ, issued from 2026 — a digits-only validator rejects it
CnpjSchema().parse('12.ABC.345/01DE-35')   // '12ABC34501DE35'

PhoneSchema().parse('(11) 98765-4321')     // '+5511987654321'
PhoneSchema().safeParse('(20) 98765-4321') // invalidPhone — no such area code`}
					filename="documents.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Schemas</h2>
				<PropsTable
					props={[
						{
							description:
								'Both check digits, mask optional, repeated sequences rejected.',
							name: 'CpfSchema',
							type: '(options?: DocumentOptions) => ZodType<string>',
						},
						{
							description:
								'Numeric and alphanumeric. Each character weighs its ASCII code minus 48, so A counts as 17.',
							name: 'CnpjSchema',
							type: '(options?: DocumentOptions) => ZodType<string>',
						},
						{
							description:
								'One field for both, discriminated by length. The error names the document that failed.',
							name: 'CpfOrCnpjSchema',
							type: '(options?: DocumentOptions) => ZodType<string>',
						},
						{
							description: 'Eight digits, mask optional, 00000000 rejected.',
							name: 'CepSchema',
							type: '(options?: DocumentOptions) => ZodType<string>',
						},
						{
							description:
								'Area code checked against the ones ANATEL assigned, ninth digit required on mobile, 2-5 range on landline. Returns E.164.',
							name: 'PhoneSchema',
							type: '(options?: PhoneOptions) => ZodType<string>',
						},
						{
							description: 'PIS, PASEP or NIT, verified by its check digit.',
							name: 'PisSchema',
							type: '(options?: DocumentOptions) => ZodType<string>',
						},
						{
							description:
								'Health card number, covering the definitive and provisional families, which follow different rules.',
							name: 'CnsSchema',
							type: '(options?: DocumentOptions) => ZodType<string>',
						},
						{
							description:
								'Voter registration, whose check digits depend on the embedded state code and differ for São Paulo and Minas Gerais.',
							name: 'VoterIdSchema',
							type: '(options?: DocumentOptions) => ZodType<string>',
						},
						{
							description:
								'Vehicle registration, padded to eleven digits before its check digit is verified.',
							name: 'RenavamSchema',
							type: '() => ZodType<string>',
						},
						{
							description:
								'Legacy AAA0000 and Mercosul AAA0A00 layouts, which differ only in the position of one letter.',
							name: 'PlateSchema',
							type: '(options?: PlateOptions) => ZodType<string>',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Masked or bare, in and out
				</h2>
				<CodeBlock
					code={`import { CpfSchema, isValidCpf } from '@turystack/fields/br'

// Store digits, render the mask
CpfSchema().parse('529.982.247-25')                       // '52998224725'
CpfSchema({ format: 'masked' }).parse('52998224725')      // '529.982.247-25'

// The checksums are exported on their own, for the places a schema is not
// what you need
isValidCpf('52998224725')  // true`}
					filename="format.ts"
					language="ts"
				/>
			</div>
		</div>
	)
}
