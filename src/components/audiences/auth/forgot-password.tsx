import { Button, Card, Flex, Form, Input } from '@turystack/react-web'
import { type FormEvent, useState } from 'react'

import {
	emailError,
	useFields,
	usePending,
} from '@/components/audiences/auth/auth-form'
import { AuthShell, settle, stay } from '@/components/audiences/auth/auth-shell'
import { OtpValidate } from '@/components/audiences/auth/otp-validate'
import { ResetPassword } from '@/components/audiences/auth/reset-password'

export type ForgotPasswordVariant = 'request' | 'verify' | 'reset'

/**
 * Step one of password recovery: ask for the address. Once the request
 * settles, the same card turns into the "check your inbox" confirmation — it
 * never says whether the account exists — with the way back to the form.
 */
function RequestReset() {
	const fields = useFields({
		email: '',
	})
	const submit = usePending()
	const [sent, setSent] = useState(false)
	const email = fields.values.email.trim()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (submit.pending) {
			return
		}
		if (
			fields.check({
				email: emailError(email),
			}) &&
			(await submit.run(settle))
		) {
			setSent(true)
		}
	}

	if (sent) {
		return (
			<Card>
				<Card.Header>
					<Card.Title headingLevel={1}>Check your inbox</Card.Title>
					<Card.Description>
						{`If an account exists for ${email}, a code to reset the password is on its way.`}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Flex
						align="center"
						direction="col"
						gap="xs"
					>
						<Button
							onClick={() => setSent(false)}
							size="sm"
							variant="link"
						>
							Use a different email
						</Button>
						<Button
							onClick={stay}
							size="sm"
							variant="link"
						>
							Sign in
						</Button>
					</Flex>
				</Card.Content>
			</Card>
		)
	}

	return (
		<Card>
			<Card.Header>
				<Card.Title headingLevel={1}>Forgot password</Card.Title>
				<Card.Description>
					Enter your email and we'll send you a code to reset your password
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
							Sign in
						</Button>
					</Flex>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/** The three steps of password recovery, kept together as one product flow. */
export function ForgotPassword({
	variant = 'request',
}: {
	variant?: ForgotPasswordVariant
}) {
	if (variant === 'verify') {
		return <OtpValidate />
	}

	if (variant === 'reset') {
		return <ResetPassword />
	}

	return (
		<AuthShell>
			<RequestReset />
		</AuthShell>
	)
}
