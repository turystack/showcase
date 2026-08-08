import {
	Box,
	Button,
	Card,
	Checkbox,
	Container,
	Flex,
	Form,
	Grid,
	Input,
	PasswordInput,
	Provider,
	Separator,
	Typography,
} from '@turystack/ui'

function ReactLogo() {
	return (
		<svg
			height="40"
			viewBox="-11.5 -10.232 23 20.463"
			width="40"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>React Logo</title>
			<circle
				cx="0"
				cy="0"
				fill="#61dafb"
				r="2.05"
			/>
			<g
				fill="none"
				stroke="#61dafb"
				strokeWidth="1"
			>
				<ellipse
					rx="11"
					ry="4.2"
				/>
				<ellipse
					rx="11"
					ry="4.2"
					transform="rotate(60)"
				/>
				<ellipse
					rx="11"
					ry="4.2"
					transform="rotate(120)"
				/>
			</g>
		</svg>
	)
}

function GoogleIcon() {
	return (
		<svg
			height="18"
			viewBox="0 0 24 24"
			width="18"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Google</title>
			<path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				fill="#4285F4"
			/>
			<path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
				fill="#FBBC05"
			/>
			<path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				fill="#EA4335"
			/>
		</svg>
	)
}

function FacebookIcon() {
	return (
		<svg
			height="18"
			viewBox="0 0 24 24"
			width="18"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Facebook</title>
			<path
				d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
				fill="#1877F2"
			/>
		</svg>
	)
}

export default function SignUpWithSocial() {
	return (
		<Provider>
			<Box
				bg="background"
				padding="lg"
				width="full"
			>
				<Flex
					align="center"
					justify="center"
					minHeight="md"
				>
					<Container maxWidth="md">
						<Flex
							align="stretch"
							direction="col"
							gap="lg"
						>
							<Flex justify="center">
								<ReactLogo />
							</Flex>
							<Card>
								<Card.Header>
									<Card.Title>Create Account</Card.Title>
									<Card.Description>
										Sign up with your social account or email
									</Card.Description>
								</Card.Header>
								<Card.Content>
									<Flex
										align="stretch"
										direction="col"
										gap="md"
									>
										<Grid
											cols={2}
											gap="sm"
										>
											<Button
												leftSection={<GoogleIcon />}
												variant="outline"
											>
												Google
											</Button>
											<Button
												leftSection={<FacebookIcon />}
												variant="outline"
											>
												Facebook
											</Button>
										</Grid>

										<Flex
											align="center"
											gap="sm"
										>
											<Box grow>
												<Separator />
											</Box>
											<Typography
												component="span"
												size="xs"
												variant="muted"
											>
												or sign up with email
											</Typography>
											<Box grow>
												<Separator />
											</Box>
										</Flex>

										<Form
											onSubmit={(e) => {
												e.preventDefault()
											}}
										>
											<Flex
												align="stretch"
												direction="col"
												gap="md"
											>
												<Form.Field
													label={{
														content: 'Full Name',
														required: true,
													}}
													name="name"
												>
													<Input
														id="name"
														placeholder="John Doe"
														type="text"
													/>
												</Form.Field>

												<Form.Field
													label={{
														content: 'Email',
														required: true,
													}}
													name="email"
												>
													<Input
														id="email"
														placeholder="you@example.com"
														type="text"
													/>
												</Form.Field>

												<Form.Field
													label={{
														content: 'Password',
														required: true,
													}}
													name="password"
												>
													<PasswordInput
														id="password"
														placeholder="••••••••"
													/>
												</Form.Field>

												<Checkbox label="I agree to the Terms of Service and Privacy Policy" />

												<Button
													block
													type="submit"
												>
													Create Account
												</Button>
											</Flex>
										</Form>

										<Flex justify="center">
											<Typography
												component="p"
												size="sm"
												variant="muted"
											>
												Already have an account?{' '}
												<Button
													size="sm"
													variant="link"
												>
													Sign In
												</Button>
											</Typography>
										</Flex>
									</Flex>
								</Card.Content>
							</Card>
						</Flex>
					</Container>
				</Flex>
			</Box>
		</Provider>
	)
}
