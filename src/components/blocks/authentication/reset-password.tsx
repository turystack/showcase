import {
	Box,
	Button,
	Card,
	Container,
	Flex,
	Form,
	PasswordInput,
	Provider,
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

export default function ResetPassword() {
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
					<Container maxWidth="sm">
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
									<Card.Title>Reset Password</Card.Title>
									<Card.Description>
										Choose a strong new password for your account
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
														content: 'New Password',
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

												<Button
													block
													type="submit"
												>
													Reset Password
												</Button>
											</Flex>
										</Form>

										<Flex justify="center">
											<Button
												size="sm"
												variant="link"
											>
												Sign In
											</Button>
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
