import {
	Button,
	Card,
	Checkbox,
	Form,
	Input,
	PasswordInput,
	Provider,
	Typography,
} from '@turystack/ui'

export default function SignUpSplitPanel() {
	return (
		<Provider>
			<div
				className="grid min-h-screen"
				style={{
					gridTemplateColumns: '60% 40%',
				}}
			>
				{/* Panel Left — Form */}
				<div className="flex items-center justify-center bg-background p-8">
					<div className="w-full max-w-md">
						<Card>
							<Card.Header>
								<Card.Title>Create Account</Card.Title>
								<Card.Description>
									Fill in the details below to create your account
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Form
									onSubmit={(e) => {
										e.preventDefault()
									}}
								>
									<div className="space-y-4">
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
									</div>
								</Form>
							</Card.Content>
							<Card.Footer>
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
							</Card.Footer>
						</Card>
					</div>
				</div>

				{/* Panel Right — Neutral image/background */}
				<div className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-950">
					<div className="flex flex-col items-center gap-4 px-8 text-center">
						<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm dark:bg-black/20">
							<svg
								aria-hidden="true"
								className="text-slate-600 dark:text-slate-300"
								fill="none"
								height="32"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.5"
								viewBox="0 0 24 24"
								width="32"
							>
								<path d="M12 2L2 7l10 5 10-5-10-5z" />
								<path d="M2 17l10 5 10-5" />
								<path d="M2 12l10 5 10-5" />
							</svg>
						</div>
						<Typography
							component="h2"
							size="xl"
							weight="semibold"
						>
							Welcome aboard
						</Typography>
						<Typography
							component="p"
							size="sm"
							variant="muted"
						>
							Join thousands of teams already building with our platform.
						</Typography>
					</div>
				</div>
			</div>
		</Provider>
	)
}
