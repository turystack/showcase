import { Button, Card, Flex, Form, PasswordInput } from '@turystack/react-web'
import type { FormEvent } from 'react'

import { useFields, usePending } from '@/components/audiences/auth/auth-form'
import { AuthShell, settle, stay } from '@/components/audiences/auth/auth-shell'

const MIN_PASSWORD = 8

/**
 * Step three of password recovery: set the new password, twice. Two
 * `PasswordInput` fields in a `Form`, each with its own show/hide toggle.
 */
export function ResetPassword() {
	const fields = useFields({
		confirmation: '',
		password: '',
	})
	const submit = usePending()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (submit.pending) {
			return
		}
		const { confirmation, password } = fields.values
		const ok = fields.check({
			confirmation:
				confirmation === password ? undefined : "Passwords don't match",
			password: !password
				? 'Enter your password'
				: password.length < MIN_PASSWORD
					? `Use at least ${MIN_PASSWORD} characters`
					: undefined,
		})
		if (ok) {
			void submit.run(settle)
		}
	}

	return (
		<AuthShell>
			<Card>
				<Card.Header>
					<Card.Title headingLevel={1}>Reset password</Card.Title>
					<Card.Description>
						Choose a strong new password for your account
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Flex
						direction="col"
						gap="md"
					>
						<Form onSubmit={handleSubmit}>
							<Form.Field
								error={fields.errors.password}
								label={{
									content: 'New password',
									required: true,
								}}
							>
								<PasswordInput
									autoComplete="new-password"
									name="password"
									onChange={fields.change('password')}
									placeholder="••••••••"
									value={fields.values.password}
								/>
							</Form.Field>

							<Form.Field
								error={fields.errors.confirmation}
								label={{
									content: 'Confirm password',
									required: true,
								}}
							>
								<PasswordInput
									autoComplete="new-password"
									name="confirmation"
									onChange={fields.change('confirmation')}
									placeholder="••••••••"
									value={fields.values.confirmation}
								/>
							</Form.Field>

							<Button
								block
								loading={submit.pending}
								type="submit"
							>
								Reset password
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
		</AuthShell>
	)
}
