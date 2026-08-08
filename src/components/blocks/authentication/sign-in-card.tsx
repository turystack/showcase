import {
	Box,
	Button,
	Card,
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

export default function SignInCard() {
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
									<Card.Title>Sign In</Card.Title>
									<Card.Description>
										Enter your credentials to access your account
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
														showStrength={false}
													/>
												</Form.Field>

												<Flex justify="end">
													<Button
														size="sm"
														variant="link"
													>
														Forgot password?
													</Button>
												</Flex>

												<Button
													block
													type="submit"
												>
													Sign In
												</Button>
											</Flex>
										</Form>

										<Flex justify="center">
											<Typography
												component="p"
												size="sm"
												variant="muted"
											>
												Don't have an account?{' '}
												<Button
													size="sm"
													variant="link"
												>
													Sign Up
												</Button>
											</Typography>
										</Flex>

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
												or continue with
											</Typography>
											<Box grow>
												<Separator />
											</Box>
										</Flex>

										<Grid
											cols={2}
											gap="sm"
										>
											<Button variant="outline">Google</Button>
											<Button variant="outline">GitHub</Button>
										</Grid>
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
