import {
	Alert,
	Avatar,
	Badge,
	Button,
	Card,
	Flex,
	Form,
	Input,
	PasswordInput,
	Separator,
	Typography,
} from '@turystack/react-web'
import { type FormEvent, useState } from 'react'

import {
	AuthPrompt,
	useFields,
	usePending,
} from '@/components/audiences/auth/auth-form'
import { AuthShell, settle, stay } from '@/components/audiences/auth/auth-shell'

export type InviteAcceptVariant =
	| 'preview'
	| 'accept'
	| 'other-account'
	| 'expired'

const MIN_PASSWORD = 8

/** The fields `GET /invitations/:token` returns that the card shows. */
const INVITATION = {
	email: 'you@example.com',
	expires: 'in 7 days',
	inviter: 'Marina Costa',
	organization: 'Acme Logistics',
	role: 'Operations manager',
}

/** Who sent it, where to, and as what: the context every open invitation shows. */
function InvitationContext() {
	return (
		<>
			<Flex
				align="center"
				gap="md"
			>
				<Avatar
					alt={INVITATION.inviter}
					variant="circle"
				>
					MC
				</Avatar>
				<Flex
					direction="col"
					gap="xs"
				>
					<Typography
						component="p"
						size="sm"
					>
						{INVITATION.inviter} invited you to
					</Typography>
					<Typography
						component="p"
						size="sm"
						weight="semibold"
					>
						{INVITATION.organization}
					</Typography>
				</Flex>
			</Flex>

			<Flex
				align="center"
				gap="sm"
			>
				<Typography
					component="span"
					size="sm"
					variant="muted"
				>
					Joining as
				</Typography>
				<Badge>{INVITATION.role}</Badge>
			</Flex>

			<Separator />
		</>
	)
}

/** Signed in as the invited address: the card is the decision. */
function Decide() {
	const action = usePending()
	const [running, setRunning] = useState<'accept' | 'decline'>()

	const answer = (next: 'accept' | 'decline') => {
		setRunning(next)
		void action.run(settle)
	}

	return (
		<Flex
			direction="col"
			gap="sm"
		>
			<Typography
				component="p"
				size="sm"
				variant="muted"
			>
				{`You'll join as ${INVITATION.email}.`}{' '}
				{`The invitation expires ${INVITATION.expires}.`}
			</Typography>
			<Button
				block
				disabled={action.pending && running !== 'accept'}
				loading={action.pending && running === 'accept'}
				onClick={() => answer('accept')}
			>
				Accept invitation
			</Button>
			<Button
				block
				disabled={action.pending && running !== 'decline'}
				loading={action.pending && running === 'decline'}
				onClick={() => answer('decline')}
				variant="outline"
			>
				Decline
			</Button>
		</Flex>
	)
}

/** Signed out: the fields that create the account, the address locked. */
function CreateAccount() {
	const fields = useFields({
		name: '',
		password: '',
	})
	const submit = usePending()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (submit.pending) {
			return
		}
		const { name, password } = fields.values
		const ok = fields.check({
			name: name.trim() ? undefined : 'Enter your name',
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
		<Flex
			direction="col"
			gap="sm"
		>
			<Form onSubmit={handleSubmit}>
				<Form.Field
					error={fields.errors.name}
					label={{
						content: 'Full name',
						required: true,
					}}
				>
					<Input
						autoComplete="name"
						name="name"
						onChange={fields.change('name')}
						placeholder="Your name"
						value={fields.values.name}
					/>
				</Form.Field>

				<Form.Field
					label={{
						content: 'Email',
					}}
				>
					<Input
						disabled
						name="email"
						value={INVITATION.email}
					/>
				</Form.Field>

				<Form.Field
					error={fields.errors.password}
					label={{
						content: 'Password',
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

				<Button
					block
					loading={submit.pending}
					type="submit"
				>
					Accept and create account
				</Button>
			</Form>

			<AuthPrompt
				action={
					<Button
						onClick={stay}
						size="sm"
						variant="link"
					>
						Sign in
					</Button>
				}
			>
				Already have an account?
			</AuthPrompt>
		</Flex>
	)
}

/** Signed in as someone else: both addresses, and the only way on. */
function SwitchAccount() {
	return (
		<Flex
			direction="col"
			gap="sm"
		>
			<Alert variant="warning">
				<Alert.Description>
					{`This invitation was sent to ${INVITATION.email}, but you're signed in as joao@northwind.com.`}
				</Alert.Description>
			</Alert>
			<Button
				block
				onClick={stay}
			>
				Switch account
			</Button>
		</Flex>
	)
}

/**
 * The screen behind an invitation link, composed from `Card`, `Avatar`,
 * `Badge`, `Separator` and, per variant, the answer below them.
 *
 * `preview` is someone signed in as the invited address: they are deciding,
 * so the card is the decision. `accept` is someone signed out: the same
 * context, plus the fields that create the account with the address locked.
 * `other-account` is signed in as someone else, and the only way on is to
 * switch. `expired` has nothing left to answer.
 *
 * The invitation details sit above the action rather than beside it. An
 * invite is the one screen where the person genuinely does not know what they
 * are agreeing to, and a workspace name in small print next to a green button
 * is how people join the wrong tenant.
 */
export function InviteAccept({ variant }: { variant: InviteAcceptVariant }) {
	if (variant === 'expired') {
		return (
			<AuthShell>
				<Card>
					<Card.Header>
						<Card.Title headingLevel={1}>
							This invitation has expired
						</Card.Title>
						<Card.Description>
							Ask the person who invited you for a new invitation.
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<Button
							block
							onClick={stay}
						>
							Continue
						</Button>
					</Card.Content>
				</Card>
			</AuthShell>
		)
	}

	const creating = variant === 'accept'

	return (
		<AuthShell>
			<Card>
				<Card.Header>
					<Card.Title headingLevel={1}>
						{creating ? 'Accept your invitation' : "You've been invited"}
					</Card.Title>
					<Card.Description>
						{creating
							? 'Set a password to finish creating your account.'
							: 'Review the invitation before you join.'}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Flex
						direction="col"
						gap="md"
					>
						<InvitationContext />
						{variant === 'preview' ? <Decide /> : null}
						{variant === 'accept' ? <CreateAccount /> : null}
						{variant === 'other-account' ? <SwitchAccount /> : null}
					</Flex>
				</Card.Content>
			</Card>
		</AuthShell>
	)
}
