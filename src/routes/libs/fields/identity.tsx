import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/fields/identity')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Identity
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Name, email and password — the three fields every sign-up form has and
					the three that a shape check is least able to validate.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">PersonNameSchema</h2>
				<p className="text-muted-foreground">
					Accepts accents, apostrophes and hyphens while rejecting the digits
					and symbols <code>z.string().min(2)</code> lets through. Can require a
					full name, and can title-case without uppercasing Portuguese
					particles.
				</p>
				<CodeBlock
					code={`import { PersonNameSchema } from '@turystack/fields'

PersonNameSchema().parse('  Ana   Maria ')                    // 'Ana Maria'
PersonNameSchema().safeParse('Ana 123')                       // invalidPersonName
PersonNameSchema({ requireFullName: true }).safeParse('Ana')  // fullNameRequired
PersonNameSchema({ capitalize: true }).parse('ANA DE SOUZA')  // 'Ana de Souza'`}
					filename="name.ts"
					language="ts"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">EmailSchema</h2>
				<p className="text-muted-foreground">
					<code>z.email()</code> checks the shape. This adds what decides
					whether the address is storable and deliverable: the RFC caps (254
					total, 64 for the local part), rejection of dots at the edges or
					doubled up, case folding so one person cannot register twice, and
					optional blocking of sub-addressing and throwaway providers.
				</p>
				<CodeBlock
					code={`import { EmailSchema } from '@turystack/fields'

EmailSchema().parse('  Ana@Example.COM ')                    // 'ana@example.com'
EmailSchema().safeParse('ana..maria@example.com')            // invalidEmail
EmailSchema({ blockAlias: true }).safeParse('a+x@e.com')     // emailAliasNotAllowed
EmailSchema({ blockDisposable: true }).safeParse('a@mailinator.com')
// disposableEmail`}
					filename="email.ts"
					language="ts"
				/>
				<PropsTable
					props={[
						{
							default: 'true',
							description: 'Lowercases the whole address.',
							name: 'lowercase',
							type: 'boolean',
						},
						{
							default: 'false',
							description: 'Rejects sub-addressing such as ana+promo@x.com.',
							name: 'blockAlias',
							type: 'boolean',
						},
						{
							default: 'false',
							description: 'Rejects known throwaway providers.',
							name: 'blockDisposable',
							type: 'boolean',
						},
						{
							description: 'Extra domains rejected as disposableEmail.',
							name: 'blockedDomains',
							type: 'readonly string[]',
						},
						{
							description:
								'Restricts to an allowlist — a corporate sign-up that only accepts its own domain.',
							name: 'allowedDomains',
							type: 'readonly string[]',
						},
					]}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">PasswordSchema</h2>
				<p className="text-muted-foreground">
					Length alone accepts <code>Senha@123</code>. This measures the entropy
					of the character pool actually used, rejects keyboard walks and
					repeated runs, rejects anything containing the user's own email or
					name, and caps the value at 72 bytes — past that bcrypt truncates and
					two different passwords start unlocking the same account.
				</p>
				<p className="text-muted-foreground">
					Whitespace at the edges is rejected rather than trimmed: trimming
					changes the secret, and the user cannot see what was removed.
				</p>
				<CodeBlock
					code={`import { PasswordSchema } from '@turystack/fields'

const Password = PasswordSchema({
  context: [input.email, input.name],  // rejects a password built from these
  strength: (value) => zxcvbn(value).score,
})

Password.safeParse(' abc ')          // passwordHasWhitespace
Password.safeParse('abcdefghijkl')   // passwordSequential
Password.safeParse('a1B!'.repeat(20))  // passwordTooLong (72-byte bcrypt limit)`}
					filename="password.ts"
					language="ts"
				/>
				<p className="text-muted-foreground">
					Normalization must match between sign-up and sign-in, so keep this
					schema as the single definition of both.
				</p>
			</div>
		</div>
	)
}
