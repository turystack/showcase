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
 * Sign in, in three comparable variants.
 *
 * The variant arrives as a prop instead of living in local state: the
 * Audiences owns the switcher, so every layout is compared the same way. The
 * card is composed here from `Card`, `Form`, `Input`, `PasswordInput` and
 * `Button`; the variants only decide the providers and the page around it.
 */
export type SignInVariant = 'simple' | 'social' | 'split'

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

function SignInCard({ variant }: { variant: SignInVariant }) {
	const fields = useFields({
		email: '',
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
		const ok = fields.check({
			email: emailError(fields.values.email),
			password: fields.values.password ? undefined : 'Enter your password',
		})
		if (ok) {
			void submit.run(settle)
		}
	}

	const signInWith = (id: string) => {
		setProvider(id)
		void social.run(settle)
	}

	return (
		<Card>
			<Card.Header>
				<Card.Title headingLevel={1}>Sign in</Card.Title>
				<Card.Description>
					Enter your credentials to access your account
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

						<Form.Field
							error={fields.errors.password}
							label={{
								content: 'Password',
								required: true,
							}}
						>
							<PasswordInput
								autoComplete="current-password"
								name="password"
								onChange={fields.change('password')}
								placeholder="••••••••"
								value={fields.values.password}
							/>
						</Form.Field>

						<Flex justify="end">
							<Button
								onClick={stay}
								size="sm"
								variant="link"
							>
								Forgot password?
							</Button>
						</Flex>

						<Button
							block
							disabled={social.pending}
							loading={submit.pending}
							type="submit"
						>
							Sign in
						</Button>
					</Form>

					{variant === 'social' ? (
						<>
							<Form.FieldSeparator surface="card">
								or continue with
							</Form.FieldSeparator>
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
											onClick={() => signInWith(id)}
											variant="outline"
										>
											{name}
										</Button>
									)
								})}
							</Grid>
						</>
					) : null}

					<AuthPrompt
						action={
							<Button
								onClick={stay}
								size="sm"
								variant="link"
							>
								Sign up
							</Button>
						}
					>
						Don't have an account?
					</AuthPrompt>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/**
 * `simple` and `social` sit in the centred column under the logo; `split`
 * puts the card beside a second `Layout.Content` painted as the brand panel,
 * 60/40 from `md` and stacked below it.
 */
export function SignIn({ variant }: { variant: SignInVariant }) {
	if (variant === 'split') {
		return (
			<Layout
				height="fill"
				variant="centered"
			>
				<Layout.Main>
					<Layout.Content span={3}>
						<SignInCard variant={variant} />
					</Layout.Content>

					<BrandPanel title="Welcome back">
						Sign in to continue building with Acme.
					</BrandPanel>
				</Layout.Main>
			</Layout>
		)
	}

	return (
		<AuthShell>
			<SignInCard variant={variant} />
		</AuthShell>
	)
}
