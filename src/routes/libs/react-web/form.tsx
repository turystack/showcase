import { createFileRoute } from '@tanstack/react-router'
import { Button, Form, Input, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const formProps = [
	{
		description: 'Handler called when the form is submitted.',
		name: 'onSubmit',
		type: 'React.FormEventHandler<HTMLFormElement>',
	},
]

const fieldProps = [
	{
		description:
			'Label for the field. Accepts a plain string or a label config object.',
		name: 'label',
		type: 'string | { content: string; required?: boolean; optional?: boolean; disabled?: boolean; tooltip?: React.ReactNode }',
	},
	{
		default: 'false',
		description:
			'When true, the label floats inside the input and animates on focus/fill.',
		name: 'labelFloating',
		type: 'boolean',
	},
	{
		description:
			'The id of the associated form control — passed as htmlFor to the label.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Helper text rendered below the label.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'Validation error message rendered below the field children.',
		name: 'error',
		type: 'React.ReactNode',
	},
]

const fieldSetProps = [
	{
		description: 'Legend text displayed at the top of the fieldset.',
		name: 'legend',
		type: 'string',
	},
	{
		description:
			'Tooltip shown on an info icon next to the legend. Accepts a string or a TooltipProps object.',
		name: 'tooltip',
		type: 'string | TooltipProps',
	},
]

const usageCode = `import { Form, Input, Button } from '@turystack/ui'

// Form.Field composes label, description and error from props
<Form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
  <Form.Field
    name="email"
    label={{ content: 'Email', required: true, tooltip: 'We never share your email.' }}
    description="We'll never share your email."
    error={errors.email}
  >
    <Input id="email" type="email" placeholder="you@example.com" />
  </Form.Field>

  <Form.Field name="password" label={{ content: 'Password', required: true }}>
    <Input id="password" type="password" placeholder="••••••••" />
  </Form.Field>

  <Button type="submit" block>Sign in</Button>
</Form>

// Simple string label
<Form.Field name="username" label="Username">
  <Input id="username" />
</Form.Field>

// Form.FieldSet groups related fields with a legend
<Form.FieldSet legend="Personal Information">
  <Form.Field name="first-name" label="First name">
    <Input id="first-name" />
  </Form.Field>
  <Form.Field name="last-name" label="Last name">
    <Input id="last-name" />
  </Form.Field>
</Form.FieldSet>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Form
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A compound component for building accessible forms.
						<code className="mx-1 rounded bg-muted px-1 py-0.5 text-sm">
							Form.Field
						</code>
						composes label, description, and error from props.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Form Props</h2>
					<PropsTable props={formProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Form.Field Props
					</h2>
					<PropsTable props={fieldProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Form.FieldSet Props
					</h2>
					<PropsTable props={fieldSetProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic form</h2>
					<ComponentPreview title="Login form">
						<div className="w-80">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Field
									description="We'll never share your email."
									label={{
										content: 'Email',
										required: true,
									}}
									name="email"
								>
									<Input
										id="email"
										placeholder="you@example.com"
									/>
								</Form.Field>
								<Form.Field
									label={{
										content: 'Password',
										required: true,
									}}
									name="password"
								>
									<Input
										id="password"
										placeholder="••••••••"
										type="password"
									/>
								</Form.Field>
								<Button
									block
									type="submit"
								>
									Sign in
								</Button>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With error</h2>
					<ComponentPreview title="Field with validation error">
						<div className="w-80">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Field
									error="Please enter a valid email address."
									label={{
										content: 'Email',
										required: true,
									}}
									name="email"
								>
									<Input
										defaultValue="not-an-email"
										id="email"
									/>
								</Form.Field>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With tooltip</h2>
					<ComponentPreview title="Label with tooltip">
						<div className="w-80">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Field
									description="Keep this secret — never share it publicly."
									label={{
										content: 'API Key',
										required: true,
										tooltip: 'Find your API key in the developer settings.',
									}}
									name="api-key"
								>
									<Input
										id="api-key"
										placeholder="sk-••••••••"
									/>
								</Form.Field>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">FieldSet</h2>
					<ComponentPreview title="Grouped fields with legend">
						<div className="w-80">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.FieldSet legend="Contact details">
									<Form.Field
										label={{
											content: 'Phone',
											optional: true,
										}}
										name="phone"
									>
										<Input
											id="phone"
											placeholder="+1 555 000 0000"
										/>
									</Form.Field>
									<Form.Field
										label={{
											content: 'Website',
											optional: true,
										}}
										name="website"
									>
										<Input
											id="website"
											placeholder="https://example.com"
										/>
									</Form.Field>
								</Form.FieldSet>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						FieldSet with tooltip
					</h2>
					<ComponentPreview title="Legend info tooltip">
						<div className="w-80">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.FieldSet
									legend="Billing address"
									tooltip="This address will appear on your invoices and receipts."
								>
									<Form.Field
										label="Street address"
										name="address"
									>
										<Input
											id="address"
											placeholder="123 Main St"
										/>
									</Form.Field>
									<Form.Field
										label="City"
										name="city"
									>
										<Input
											id="city"
											placeholder="San Francisco"
										/>
									</Form.Field>
								</Form.FieldSet>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Floating Label</h2>
					<p className="text-muted-foreground text-sm">
						Use <code>labelFloating</code> to place the label inside the input.
						The label animates up on focus or when the input has a value.
					</p>
					<ComponentPreview title="Floating label fields">
						<div className="w-80">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Field
									label="Email"
									labelFloating
									name="floating-email"
								>
									<Input
										id="floating-email"
										placeholder=" "
									/>
								</Form.Field>
								<Form.Field
									label="Password"
									labelFloating
									name="floating-password"
								>
									<Input
										id="floating-password"
										placeholder=" "
										type="password"
									/>
								</Form.Field>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/react-web/form')({
	component: Page,
})
