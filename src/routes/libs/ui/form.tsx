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
		description: 'Label for the field. Accepts a plain string or a label config object.',
		name: 'label',
		type: 'string | { content: string; required?: boolean; optional?: boolean; disabled?: boolean; tooltip?: React.ReactNode }',
	},
	{
		description: 'The id of the associated form control — passed as htmlFor to the label.',
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
		description: 'Tooltip shown on an info icon next to the legend. Accepts a string or a TooltipProps object.',
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
    <Input id="email" type="email" placeholder="you@example.com" block />
  </Form.Field>

  <Form.Field name="password" label={{ content: 'Password', required: true }}>
    <Input id="password" type="password" placeholder="••••••••" block />
  </Form.Field>

  <Button type="submit" block>Sign in</Button>
</Form>

// Simple string label
<Form.Field name="username" label="Username">
  <Input id="username" block />
</Form.Field>

// Form.FieldSet groups related fields with a legend
<Form.FieldSet legend="Personal Information">
  <Form.Field name="first-name" label="First name">
    <Input id="first-name" block />
  </Form.Field>
  <Form.Field name="last-name" label="Last name">
    <Input id="last-name" block />
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
						A compound component for building accessible, well-structured forms.
						<code className="mx-1 rounded bg-muted px-1 py-0.5 text-sm">Form.Field</code>
						composes label, description, and error automatically from props.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Form Props</h2>
					<PropsTable props={formProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Form.Field Props</h2>
					<PropsTable props={fieldProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Form.FieldSet Props</h2>
					<PropsTable props={fieldSetProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic form</h2>
					<ComponentPreview title="Login form">
						<div className="w-full max-w-sm">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Field
									name="email"
									label={{ content: 'Email', required: true }}
									description="We'll never share your email."
								>
									<Input
										id="email"
										block
										placeholder="you@example.com"
									/>
								</Form.Field>
								<Form.Field
									name="password"
									label={{ content: 'Password', required: true }}
								>
									<Input
										id="password"
										block
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
						<div className="w-full max-w-sm">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Field
									name="email"
									label={{ content: 'Email', required: true }}
									error="Please enter a valid email address."
								>
									<Input
										id="email"
										block
										defaultValue="not-an-email"
									/>
								</Form.Field>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With tooltip</h2>
					<ComponentPreview title="Label with tooltip">
						<div className="w-full max-w-sm">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.Field
									name="api-key"
									label={{ content: 'API Key', required: true, tooltip: 'Find your API key in the developer settings.' }}
									description="Keep this secret — never share it publicly."
								>
									<Input
										id="api-key"
										block
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
						<div className="w-full max-w-sm">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.FieldSet legend="Contact details">
									<Form.Field
										name="phone"
										label={{ content: 'Phone', optional: true }}
									>
										<Input
											id="phone"
											block
											placeholder="+1 555 000 0000"
										/>
									</Form.Field>
									<Form.Field
										name="website"
										label={{ content: 'Website', optional: true }}
									>
										<Input
											id="website"
											block
											placeholder="https://example.com"
										/>
									</Form.Field>
								</Form.FieldSet>
							</Form>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">FieldSet with tooltip</h2>
					<ComponentPreview title="Legend info tooltip">
						<div className="w-full max-w-sm">
							<Form onSubmit={(e) => e.preventDefault()}>
								<Form.FieldSet
									legend="Billing address"
									tooltip="This address will appear on your invoices and receipts."
								>
									<Form.Field name="address" label="Street address">
										<Input id="address" block placeholder="123 Main St" />
									</Form.Field>
									<Form.Field name="city" label="City">
										<Input id="city" block placeholder="San Francisco" />
									</Form.Field>
								</Form.FieldSet>
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

export const Route = createFileRoute('/libs/ui/form')({
	component: Page,
})
