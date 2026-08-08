import {
	Box,
	Button,
	Card,
	Container,
	Flex,
	Form,
	Input,
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

export default function ForgotPassword() {
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
									<Card.Title>Forgot Password</Card.Title>
									<Card.Description>
										Enter your email and we'll send you a reset link
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

												<Button
													block
													type="submit"
												>
													Send Code
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
