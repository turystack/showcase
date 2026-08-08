import {
	Box,
	Button,
	Card,
	Container,
	Flex,
	OTPInput,
	Provider,
	Typography,
} from '@turystack/ui'

export default function OtpVerification() {
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
						<Card>
							<Card.Header>
								<Card.Title>Verify Your Email</Card.Title>
								<Card.Description>
									We sent a 6-digit code to your email address. Enter it below
									to verify your account.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Flex
									align="center"
									direction="col"
									gap="lg"
								>
									<OTPInput
										pattern={[
											3,
											3,
										]}
									/>

									<Button
										block
										type="button"
									>
										Verify
									</Button>

									<Typography
										component="p"
										size="sm"
										variant="muted"
									>
										Didn't receive the code?{' '}
										<Button
											size="sm"
											variant="link"
										>
											Resend code
										</Button>
									</Typography>
								</Flex>
							</Card.Content>
						</Card>
					</Container>
				</Flex>
			</Box>
		</Provider>
	)
}
