import { Button, Card, Flex, Form, Input, OTPInput } from '@turystack/react-web'
import type { FormEvent } from 'react'

import {
	AuthPrompt,
	emailError,
	useCooldown,
	useFields,
	usePending,
} from '@/components/audiences/auth/auth-form'
import { AuthShell, settle, stay } from '@/components/audiences/auth/auth-shell'

export type PasswordlessVariant = 'email' | 'code'

/** Six digits, shown as two groups of three. */
const PATTERN = [
	3,
	3,
]

const LENGTH = 6

/** Step one: the address alone, and the way back to a password. */
function RequestCode() {
	const fields = useFields({
		email: '',
	})
	const submit = usePending()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (submit.pending) {
			return
		}
		if (
			fields.check({
				email: emailError(fields.values.email),
			})
		) {
			void submit.run(settle)
		}
	}

	return (
		<Card>
			<Card.Header>
				<Card.Title headingLevel={1}>Sign in</Card.Title>
				<Card.Description>
					We'll email you a code. No password to remember.
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					direction="col"
					gap="md"
				>
					<Form onSubmit={handleSubmit}>
						<Form.Field
							error={fields.errors.email}
							label={{
								content: 'Email',
								required: true,
							}}
						>
							<Input
								autoComplete="email"
								inputMode="email"
								name="email"
								onChange={fields.change('email')}
								placeholder="you@example.com"
								value={fields.values.email}
							/>
						</Form.Field>

						<Button
							block
							loading={submit.pending}
							type="submit"
						>
							Send code
						</Button>
					</Form>

					<AuthPrompt
						action={
							<Button
								onClick={stay}
								size="sm"
								variant="link"
							>
								Sign in with password
							</Button>
						}
					>
						Prefer a password?
					</AuthPrompt>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/**
 * Step two: the code, with the address on screen unmasked — the person typed
 * it a moment ago and needs to spot a typo.
 */
function EnterCode() {
	const fields = useFields({
		code: '',
	})
	const submit = usePending()
	const resend = usePending()
	const cooldown = useCooldown(30)

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (submit.pending) {
			return
		}
		const code = fields.values.code.replace(/\s/g, '')
		const ok = fields.check({
			code:
				code.length === LENGTH ? undefined : `Enter the ${LENGTH}-digit code`,
		})
		if (ok) {
			void submit.run(settle)
		}
	}

	const handleResend = async () => {
		if (cooldown.wait > 0) {
			return
		}
		if (await resend.run(settle)) {
			cooldown.restart()
		}
	}

	return (
		<Card>
			<Card.Header>
				<Card.Title headingLevel={1}>Enter your code</Card.Title>
				<Card.Description>
					{`We sent a ${LENGTH}-digit code to you@example.com`}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					direction="col"
					gap="md"
				>
					<Form onSubmit={handleSubmit}>
						<Form.Field
							error={fields.errors.code}
							label="Verification code"
						>
							<OTPInput
								onChange={fields.change('code')}
								pattern={PATTERN}
								value={fields.values.code}
							/>
						</Form.Field>

						<Button
							block
							loading={submit.pending}
							type="submit"
						>
							Sign in
						</Button>
					</Form>

					<AuthPrompt
						action={
							<Button
								disabled={cooldown.wait > 0}
								loading={resend.pending}
								onClick={handleResend}
								size="sm"
								variant="link"
							>
								{cooldown.wait > 0 ? `Resend in ${cooldown.wait}s` : 'Resend'}
							</Button>
						}
					>
						Didn't receive the code?
					</AuthPrompt>

					<Flex
						align="center"
						direction="col"
						gap="xs"
					>
						<Button
							onClick={stay}
							size="sm"
							variant="link"
						>
							Use a different email
						</Button>
					</Flex>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/**
 * Signing in with an address and a one-time code, in its two steps.
 *
 * The variants here are the steps, not competing designs — seeing step two
 * without step one hides the thing that makes it work: the address stays on
 * screen, unmasked, so the person can tell "the code has not arrived yet"
 * from "I typed my address wrong", which need different actions.
 */
export function Passwordless({ variant }: { variant: PasswordlessVariant }) {
	return (
		<AuthShell>
			{variant === 'email' ? <RequestCode /> : <EnterCode />}
		</AuthShell>
	)
}
