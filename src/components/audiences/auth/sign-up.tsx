import { FacebookColorIcon, GoogleColorIcon } from '@turystack/react-icons'
import {
	Button,
	Card,
	Flex,
	Form,
	Grid,
	Input,
	Layout,
	PasswordInput,
} from '@turystack/react-web'
import { type FormEvent, useState } from 'react'

import {
	AuthPrompt,
	emailError,
	useFields,
	usePending,
} from '@/components/audiences/auth/auth-form'
import { AuthShell, settle, stay } from '@/components/audiences/auth/auth-shell'
import { BrandPanel } from '@/components/audiences/auth/brand-panel'

/**
 * Sign up, in four comparable variants.
 *
 * `simple` drops the confirmation field, `default` keeps it, `social` leads
 * with the providers, and `split` puts the form beside a marketing panel. Same
 * card — composed here from `Card`, `Form`, `Input`, `PasswordInput` and
 * `Button` — four product decisions. There is no terms checkbox: the product
 * has no terms of use to agree to.
 */
export type SignUpVariant = 'simple' | 'default' | 'social' | 'split'

const MIN_PASSWORD = 8

/** `user_social_identity.provider` values offered, with the brand mark each shows. */
const PROVIDERS = [
	{
		icon: GoogleColorIcon,
		id: 'google',
		name: 'Google',
	},
	{
		icon: FacebookColorIcon,
		id: 'facebook',
		name: 'Facebook',
	},
]

function passwordError(password: string): string | undefined {
	if (!password) {
		return 'Enter your password'
	}
	return password.length < MIN_PASSWORD
		? `Use at least ${MIN_PASSWORD} characters`
		: undefined
}

function SignUpCard({ variant }: { variant: SignUpVariant }) {
	const confirm = variant === 'default' || variant === 'split'
	const fields = useFields({
		confirmation: '',
		email: '',
		name: '',
		password: '',
	})
	const submit = usePending()
	const social = usePending()
	const [provider, setProvider] = useState<string>()

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (submit.pending || social.pending) {
			return
		}
		const { confirmation, email, name, password } = fields.values
		const ok = fields.check({
			confirmation:
				confirm && confirmation !== password
					? "Passwords don't match"
					: undefined,
			email: emailError(email),
			name: name.trim() ? undefined : 'Enter your name',
			password: passwordError(password),
		})
		if (ok) {
			void submit.run(settle)
		}
	}

	const signUpWith = (id: string) => {
		setProvider(id)
		void social.run(settle)
	}

	return (
		<Card>
			<Card.Header>
				<Card.Title headingLevel={1}>Create your account</Card.Title>
				<Card.Description>
					Fill in the details below to get started
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					direction="col"
					gap="md"
				>
					{variant === 'social' ? (
						<>
							<Grid
								cols={2}
								gap="sm"
							>
								{PROVIDERS.map(({ icon: Icon, id, name }) => {
									const active = social.pending && provider === id
									return (
										<Button
											ariaLabel={`Continue with ${name}`}
											disabled={(submit.pending || social.pending) && !active}
											key={id}
											leftSection={<Icon size={18} />}
											loading={active}
											onClick={() => signUpWith(id)}
											variant="outline"
										>
											{name}
										</Button>
									)
								})}
							</Grid>
							<Form.FieldSeparator surface="card">
								or sign up with email
							</Form.FieldSeparator>
						</>
					) : null}

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

						{confirm ? (
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
						) : null}

						<Button
							block
							disabled={social.pending}
							loading={submit.pending}
							type="submit"
						>
							Create account
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
			</Card.Content>
		</Card>
	)
}

/**
 * The split variant is a second `Layout.Content` beside the card, not a
 * hand-made grid.
 */
export function SignUp({ variant }: { variant: SignUpVariant }) {
	if (variant === 'split') {
		return (
			<Layout
				height="fill"
				variant="centered"
			>
				<Layout.Main>
					<Layout.Content span={3}>
						<SignUpCard variant={variant} />
					</Layout.Content>

					<BrandPanel title="Welcome aboard">
						Join thousands of teams already building with Acme.
					</BrandPanel>
				</Layout.Main>
			</Layout>
		)
	}

	return (
		<AuthShell>
			<SignUpCard variant={variant} />
		</AuthShell>
	)
}
