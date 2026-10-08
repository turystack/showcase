import { createFileRoute } from '@tanstack/react-router'
import {
	Button,
	Checkbox,
	Form,
	Input,
	NumberInput,
	PasswordInput,
	Radio,
	SegmentedControl,
	Textarea,
} from '@turystack/react-web'
import { AtSign } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/form/form.types.ts` and the
 * destructuring in `form.tsx`. `Form` is a compound: `FormRoot` with `Field`,
 * `FieldGroup`, `FieldSet` and `FieldSeparator` assigned onto it. Each part
 * has its own props type, so each gets its own table.
 *
 * The rich label object is `FormFieldLabelInput` — `LabelProps & { content:
 * string }` — so the label row spells that out rather than naming the alias.
 */
const formProps = [
	{
		default: '"md"',
		description: 'Space between direct children: none, sm, md or lg.',
		name: 'gap',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		description: 'Submit handler. Call preventDefault yourself.',
		name: 'onSubmit',
		type: 'React.FormEventHandler<HTMLFormElement>',
	},
	{
		description: 'Form id, for a submit button outside it (<Button form>).',
		name: 'id',
		type: 'string',
	},
	{
		description: 'Fields, groups and buttons, stacked and spaced by gap.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const fieldProps = [
	{
		description: 'Label text or Label config; wired to the control.',
		name: 'label',
		type: 'string | (LabelProps & { content: string })',
	},
	{
		default: 'false',
		description: 'Floating label inside the control; rises on focus or value.',
		name: 'labelFloating',
		type: 'boolean',
	},
	{
		description: 'Label fallback for a control the field can’t wire.',
		name: 'name',
		type: 'string',
	},
	{
		description: 'Helper text under the control, tinted on error.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'Error message; any truthy node marks the field invalid.',
		name: 'error',
		type: 'React.ReactNode',
	},
	{
		description: 'The control; it gets the id and aria wiring via context.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const fieldGroupProps = [
	{
		description: 'The fields to stack. FieldGroup’s only prop.',
		name: 'children',
		required: true,
		type: 'React.ReactNode',
	},
]

const fieldSetProps = [
	{
		description: 'Fieldset legend; also names a group placed inside.',
		name: 'legend',
		type: 'string',
	},
	{
		description: 'Info icon after the legend: tooltip string or config.',
		name: 'tooltip',
		type: 'string | TooltipProps',
	},
	{
		description: 'The fields the fieldset groups.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const fieldSeparatorProps = [
	{
		description: 'Optional text centred on the rule.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		default: '"background"',
		description: 'Colour behind the text; match the form’s surface.',
		name: 'surface',
		type: '"background" | "card" | "transparent"',
	},
]

const usageCode = `import { Button, Form, Input, Radio } from '@turystack/react-web'

// Form is a column: gap spaces its children (md by default)
<Form gap="lg" onSubmit={handleSubmit}>
  <Form.FieldGroup>
    {/* No id to pair: the field wires its control and points the label at it */}
    <Form.Field label="First name">
      <Input name="first_name" onChange={setFirst} placeholder="Ada" value={first} />
    </Form.Field>

    {/* description and error reach the control as aria-describedby,
        and the error as aria-invalid — nothing to pass by hand */}
    <Form.Field
      description="We only use it to send the receipt"
      error={errors.email}
      label={{ content: 'Email', required: true, tooltip: 'Your work address' }}
    >
      <Input name="email" placeholder="you@company.com" />
    </Form.Field>
  </Form.FieldGroup>

  {/* The label starts inside the control and floats up on focus */}
  <Form.Field label="Company" labelFloating>
    <Input name="company" placeholder="Acme Inc." />
  </Form.Field>

  {/* A group is named by the field's label through aria-labelledby */}
  <Form.Field label="Plan">
    <Radio.Group items={plans} onChange={setPlan} value={plan} />
  </Form.Field>

  <Form.FieldSeparator>or</Form.FieldSeparator>

  <Form.FieldSet legend="Address" tooltip="Where we ship the order">
    <Form.Field label="Street">
      <Input name="street" placeholder="221B Baker Street" />
    </Form.Field>
  </Form.FieldSet>

  {/* A group placed directly in a FieldSet is named by its legend */}
  <Form.FieldSet legend="Notifications">
    <Checkbox.Group items={channels} onChange={setChannels} value={channels} />
  </Form.FieldSet>

  <Button type="submit">Save</Button>
</Form>`

type Submitted = {
	company: string
	email: string
	name: string
	notes: string
	plan: string | null
	seats: number | null
}

type Option = {
	label: string
	value: string
}

const BILLING: Option[] = [
	{
		label: 'Monthly',
		value: 'monthly',
	},
	{
		label: 'Yearly',
		value: 'yearly',
	},
]

const ROOM_TYPES = [
	{
		label: 'Standard',
		value: 'standard',
	},
	{
		label: 'Deluxe',
		value: 'deluxe',
	},
	{
		label: 'Suite',
		value: 'suite',
	},
]

const CHANNELS = [
	{
		label: 'E-mail',
		value: 'email',
	},
	{
		label: 'SMS',
		value: 'sms',
	},
	{
		label: 'WhatsApp',
		value: 'whatsapp',
	},
]

function Page() {
	const [name, setName] = useState<string | null>('')
	const [email, setEmail] = useState<string | null>('')
	const [company, setCompany] = useState<string | null>('')
	const [notes, setNotes] = useState<string | null>('')
	const [seats, setSeats] = useState<number | null>(1)
	const [password, setPassword] = useState<string | null>(null)
	const [plan, setPlan] = useState<string | null>('monthly')
	const [submitted, setSubmitted] = useState<Submitted | null>(null)

	const emailError =
		email && !email.includes('@') ? 'That is not an email address.' : undefined

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Form
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Layout for a form, not a form library.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The parts</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form
					</code>{' '}
					has four parts attached, so one import.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					wires its control through context and works outside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;Form&gt;
					</code>{' '}
					too.
				</p>
				<div className="overflow-hidden rounded-lg border border-border">
					<table className="w-full text-sm">
						<tbody>
							<tr className="border-border border-b">
								<td className="px-4 py-3 align-top">
									<code className="rounded-lg bg-muted px-1.5 py-0.5 text-foreground text-xs">
										Form
									</code>
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									The <code>&lt;form&gt;</code> element, laid out as a column;{' '}
									<code>gap</code> spaces its children.
								</td>
							</tr>
							<tr className="border-border border-b">
								<td className="px-4 py-3 align-top">
									<code className="rounded-lg bg-muted px-1.5 py-0.5 text-foreground text-xs">
										Form.Field
									</code>
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									One control plus its label, description and error, stacked in
									that order — and wired to the control without an id.
								</td>
							</tr>
							<tr className="border-border border-b">
								<td className="px-4 py-3 align-top">
									<code className="rounded-lg bg-muted px-1.5 py-0.5 text-foreground text-xs">
										Form.FieldGroup
									</code>
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									A column of fields with a wider gap between them.
								</td>
							</tr>
							<tr className="border-border border-b">
								<td className="px-4 py-3 align-top">
									<code className="rounded-lg bg-muted px-1.5 py-0.5 text-foreground text-xs">
										Form.FieldSet
									</code>
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									A real <code>&lt;fieldset&gt;</code> with a{' '}
									<code>&lt;legend&gt;</code> and an optional tooltip.
								</td>
							</tr>
							<tr>
								<td className="px-4 py-3 align-top">
									<code className="rounded-lg bg-muted px-1.5 py-0.5 text-foreground text-xs">
										Form.FieldSeparator
									</code>
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									A horizontal rule, optionally with a word sitting on it.
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props — Form</h2>
				<PropsTable props={formProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Props — Form.Field
				</h2>
				<PropsTable props={fieldProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Props — Form.FieldGroup
				</h2>
				<PropsTable props={fieldGroupProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Props — Form.FieldSet
				</h2>
				<PropsTable props={fieldSetProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Props — Form.FieldSeparator
				</h2>
				<PropsTable props={fieldSeparatorProps} />
			</section>

			<SlotsSection slug="form" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">A working form</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every part in one place, wired to real state. Not one control on it
					carries an id: click any label and focus lands in its control.
				</p>
				<ComponentPreview title="Submit it">
					<div className="w-full max-w-md">
						<Form
							gap="lg"
							onSubmit={(event) => {
								event.preventDefault()
								setSubmitted({
									company: company ?? '',
									email: email ?? '',
									name: name ?? '',
									notes: notes ?? '',
									plan,
									seats,
								})
							}}
						>
							<Form.FieldGroup>
								<Form.Field
									label={{
										content: 'Full name',
										required: true,
									}}
								>
									<Input
										name="full_name"
										onChange={setName}
										placeholder="Ada Lovelace"
										value={name}
									/>
								</Form.Field>

								<Form.Field
									description="We only use it to send the receipt."
									error={emailError}
									label={{
										content: 'Email',
										required: true,
										tooltip: 'Your work address, if you have one',
									}}
								>
									<Input
										leftSection={<AtSign size={16} />}
										name="email"
										onChange={setEmail}
										placeholder="you@company.com"
										value={email}
									/>
								</Form.Field>

								<Form.Field
									label={{
										content: 'Company',
										optional: true,
									}}
								>
									<Input
										name="company"
										onChange={setCompany}
										placeholder="Acme Inc."
										value={company}
									/>
								</Form.Field>
							</Form.FieldGroup>

							<Form.FieldSeparator>Plan</Form.FieldSeparator>

							<Form.FieldSet
								legend="Subscription"
								tooltip="You can change this later"
							>
								<Form.Field label="Billing">
									<SegmentedControl<Option>
										onChange={setPlan}
										optionLabel="label"
										options={BILLING}
										optionValue="value"
										value={plan}
									/>
								</Form.Field>

								<Form.Field
									description="Each seat is one login."
									label="Seats"
								>
									<div className="max-w-[10rem]">
										<NumberInput
											min={1}
											name="seats"
											onChange={setSeats}
											placeholder="1"
											value={seats}
										/>
									</div>
								</Form.Field>

								<Form.Field
									description="Anything we should know before setting the account up."
									label="Notes"
								>
									<Textarea
										maxLength={200}
										name="notes"
										onChange={setNotes}
										placeholder="We arrive after 10pm and need step-free access."
										value={notes}
									/>
								</Form.Field>
							</Form.FieldSet>

							<Button type="submit">Save</Button>

							{submitted && (
								<pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
									{JSON.stringify(submitted, null, 2)}
								</pre>
							)}
						</Form>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Wiring the control
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					hands its control an id,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-describedby
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-invalid
					</code>
					; the label follows. An explicit{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					on the control wins.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					A group isn’t labelable, so the label takes an id and the group points{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-labelledby
					</code>{' '}
					at it, as in the radios below.
				</p>
				<ComponentPreview title="Groups named by the field's label">
					<div className="flex w-full max-w-md flex-col gap-6">
						<Form.Field
							description="O preço muda conforme o tipo."
							label="Tipo de quarto"
						>
							<Radio.Group
								defaultValue="deluxe"
								items={ROOM_TYPES}
								variant="horizontal"
							/>
						</Form.Field>
						<Form.Field label="Canais de aviso">
							<Checkbox.Group
								defaultValue={[
									'whatsapp',
								]}
								items={CHANNELS}
								variant="horizontal"
							/>
						</Form.Field>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					For a control the field can’t reach (a native{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;input&gt;
					</code>
					), the label targets its{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>,
					else the field’s{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						name
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Spacing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form
					</code>{' '}
					is a column;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">gap</code>{' '}
					spaces its children:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						none
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">sm</code>,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">md</code>{' '}
					(default) or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">lg</code>.
				</p>
				<ComponentPreview title='gap="sm" and gap="lg"'>
					<div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
						<Form gap="sm">
							<Form.Field label="Check-in">
								<Input
									name="check_in"
									placeholder="12/10/2026"
								/>
							</Form.Field>
							<Form.Field label="Check-out">
								<Input
									name="check_out"
									placeholder="15/10/2026"
								/>
							</Form.Field>
							<Button type="button">Buscar</Button>
						</Form>
						<Form gap="lg">
							<Form.Field label="Check-in">
								<Input
									name="check_in"
									placeholder="12/10/2026"
								/>
							</Form.Field>
							<Form.Field label="Check-out">
								<Input
									name="check_out"
									placeholder="15/10/2026"
								/>
							</Form.Field>
							<Button type="button">Buscar</Button>
						</Form>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Labels</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A string label becomes{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&#123; content &#125;
					</code>{' '}
					and points at the wired control. Click a label: focus lands in its
					input.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Pass an object to use every{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Label
					</code>{' '}
					prop:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						required
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						optional
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						tooltip
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						htmlFor
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>.
				</p>
				<ComponentPreview title="String, rich object, and none">
					<div className="w-full max-w-md space-y-6">
						<Form.Field label="A plain string">
							<Input placeholder="Ada Lovelace" />
						</Form.Field>

						<Form.Field
							label={{
								content: 'Required, with a tooltip',
								required: true,
								tooltip: 'Everything LabelProps accepts lands here',
							}}
						>
							<Input placeholder="you@company.com" />
						</Form.Field>

						<Form.Field
							label={{
								content: 'Optional',
								optional: true,
							}}
						>
							<Input placeholder="Acme Inc." />
						</Form.Field>

						<Form.Field
							label={{
								content: 'Disabled label and control',
								disabled: true,
							}}
						>
							<Input
								disabled
								placeholder="Not editable while disabled"
							/>
						</Form.Field>

						<Form.Field>
							<Input
								ariaLabel="No label at all"
								placeholder="No label — the control stands alone"
							/>
						</Form.Field>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Description and error
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Any truthy{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						error
					</code>{' '}
					marks the field invalid and announces it. Description and error reach
					the control via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-describedby
					</code>
					.
				</p>
				<ComponentPreview title="Description, error, and both">
					<div className="w-full max-w-md space-y-6">
						<Form.Field
							description="Helper text sits under the control."
							label="Description only"
						>
							<Input placeholder="https://acme.com/webhooks" />
						</Form.Field>

						<Form.Field
							description="This description is tinted by the error above it."
							error="Required field"
							label="Description and error"
						>
							<Input placeholder="you@company.com" />
						</Form.Field>

						<Form.Field
							error="Required field"
							label="Error only"
						>
							<Input placeholder="you@company.com" />
						</Form.Field>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Floating label</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						labelFloating
					</code>{' '}
					renders the label after the control instead of before it and pins it
					over the field.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The placeholder is hidden until focus, so it reads as a hint rather
					than competing with the label.
				</p>
				<ComponentPreview title="Focus it, then type">
					<div className="w-full max-w-md space-y-6">
						<Form.Field
							label="Email"
							labelFloating
						>
							<Input placeholder="you@company.com — hidden until focus" />
						</Form.Field>

						<Form.Field
							label="Already filled"
							labelFloating
						>
							<Input
								defaultValue="me@work.com"
								placeholder="you@company.com"
							/>
						</Form.Field>

						<Form.Field
							error="We could not verify this address."
							label="Floating and invalid"
							labelFloating
						>
							<Input
								defaultValue="not-an-email"
								placeholder="you@company.com"
							/>
						</Form.Field>

						<Form.Field
							description="Helper text sits below; the label still rests centred in the field."
							label="Floating with a description"
							labelFloating
						>
							<Input placeholder="+55 11 90000-0000" />
						</Form.Field>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">FieldGroup</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A vertical stack with a wider gap than{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					uses internally — it separates fields from each other, not a label
					from its control.
				</p>
				<ComponentPreview title="Two fields in a group">
					<div className="w-full max-w-md">
						<Form.FieldGroup>
							<Form.Field label="First name">
								<Input placeholder="Ada" />
							</Form.Field>
							<Form.Field label="Last name">
								<Input placeholder="Lovelace" />
							</Form.Field>
						</Form.FieldGroup>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">FieldSet</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A real{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						&lt;fieldset&gt;
					</code>
					, so assistive technology announces its legend as the name of the
					group.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The legend also names a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Radio.Group
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Checkbox.Group
					</code>{' '}
					placed directly inside, via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-labelledby
					</code>
					.
				</p>
				<ComponentPreview title="A group named by the legend">
					<div className="w-full max-w-md">
						<Form.FieldSet legend="Notificações">
							<Checkbox.Group
								defaultValue={[
									'email',
								]}
								items={CHANNELS}
							/>
						</Form.FieldSet>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Legend, string tooltip, configured tooltip">
					<div className="w-full max-w-md space-y-8">
						<Form.FieldSet legend="Address">
							<Form.Field label="Street">
								<Input placeholder="221B Baker Street" />
							</Form.Field>
						</Form.FieldSet>

						<Form.FieldSet
							legend="Billing"
							tooltip="Only shown on the invoice"
						>
							<Form.Field label="Tax ID">
								<Input placeholder="12.345.678/0001-90" />
							</Form.Field>
						</Form.FieldSet>

						<Form.FieldSet
							legend="Security"
							tooltip={{
								content: 'This tooltip opens to the right, without a delay',
								delayDuration: 0,
								side: 'right',
							}}
						>
							<Form.Field label="Password">
								<PasswordInput
									onChange={setPassword}
									placeholder="At least 8 characters"
									showStrength
									value={password}
								/>
							</Form.Field>
						</Form.FieldSet>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">FieldSeparator</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The rule runs edge to edge behind the label, and the label hides the
					part it covers by painting{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						surface
					</code>{' '}
					behind itself.
				</p>
				<ComponentPreview title="On the page background">
					<div className="w-full max-w-md space-y-2">
						<Form.FieldSeparator surface="background">
							background — correct here
						</Form.FieldSeparator>
						<Form.FieldSeparator surface="card">
							card — wrong shade behind the text
						</Form.FieldSeparator>
						<Form.FieldSeparator surface="transparent">
							transparent — the line runs through
						</Form.FieldSeparator>
					</div>
				</ComponentPreview>
				<ComponentPreview title="On a card">
					<div className="w-full max-w-md rounded-lg border border-border bg-card p-6">
						<div className="space-y-2">
							<Form.FieldSeparator surface="background">
								background — wrong shade behind the text
							</Form.FieldSeparator>
							<Form.FieldSeparator surface="card">
								card — correct here
							</Form.FieldSeparator>
							<Form.FieldSeparator surface="transparent">
								transparent — the line runs through
							</Form.FieldSeparator>
						</div>
					</div>
				</ComponentPreview>
				<ComponentPreview title="No label — a plain rule">
					<div className="w-full max-w-md">
						<Form.FieldSeparator />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/form')({
	component: Page,
})
