import {
	Box,
	Button,
	Card,
	Checkbox,
	Container,
	Flex,
	Form,
	Input,
	PasswordInput,
	Provider,
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

export default function SignUpCard() {
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
										Fill in the details below to create your account
									</Card.Description>
								</Card.Header>
								<Card.Content>
									<Flex
										align="stretch"
										direction="col"
										gap="md"
									>
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

												<Form.Field
													label={{
														content: 'Confirm Password',
														required: true,
													}}
													name="confirmPassword"
												>
													<PasswordInput
														id="confirmPassword"
														placeholder="••••••••"
														showStrength={false}
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
