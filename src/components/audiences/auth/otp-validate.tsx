import { Button, Card, Flex, Form, OTPInput } from '@turystack/react-web'
import type { FormEvent } from 'react'

import {
	AuthPrompt,
	useCooldown,
	useFields,
	usePending,
} from '@/components/audiences/auth/auth-form'
import { AuthShell, settle, stay } from '@/components/audiences/auth/auth-shell'

/** Six digits, shown as two groups of three. */
const PATTERN = [
	3,
	3,
]

const LENGTH = 6

/**
 * Step two of password recovery: read the code back. The address is masked —
 * the person did not type it on this screen, and the code proves they own it.
 *
 * `OTPInput` inside a `Form.Field` is the whole field; the resend line waits
 * out a 30-second cooldown and counts it down on the link itself.
 */
export function OtpValidate() {
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
		<AuthShell>
			<Card>
				<Card.Header>
					<Card.Title headingLevel={1}>Check your email</Card.Title>
					<Card.Description>
						{`We sent a ${LENGTH}-digit code to yo•••@example.com`}
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
								Verify code
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
								Sign in
							</Button>
						</Flex>
					</Flex>
				</Card.Content>
			</Card>
		</AuthShell>
	)
}
