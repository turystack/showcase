import {
	PlusIcon,
	RotateCcwIcon,
	Trash2Icon,
	UserPlusIcon,
	XIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Badge,
	Box,
	Button,
	Card,
	Confirm,
	CurrencyInput,
	DateInput,
	DateText,
	DescriptionList,
	Flex,
	Form,
	Grid,
	Input,
	Layout,
	MoneyText,
	NumberInput,
	Page,
	Radio,
	Select,
	Separator,
	Sheet,
	Stepper,
	Switch,
	Table,
	Textarea,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { CUSTOMERS, type Customer, PAYMENTS } from './data'
import { PaymentsTable } from './payments-table'
import { BackofficeShell, SandboxBanner } from './shell'

import { AcmeLogo } from '@/components/audiences/acme-logo'

/**
 * - `sheet`         — create in a side sheet, the list still behind it
 * - `sheet-unsaved` — the same sheet, closed with changes in it
 * - `modal`         — a confirmation with one to three fields
 * - `sheet-stepper` — a longer create, in steps, in a wide sheet
 * - `page`          — a full-page editor with a live preview
 */
export type FormsVariant =
	| 'sheet'
	| 'sheet-unsaved'
	| 'modal'
	| 'sheet-stepper'
	| 'page'

const COUNTRIES = [
	{
		label: 'Brazil',
		value: 'BR',
	},
	{
		label: 'Portugal',
		value: 'PT',
	},
	{
		label: 'Argentina',
		value: 'AR',
	},
]

const PLANS = [
	{
		label: 'Starter\u00a0· R$ 99,00 / month',
		value: 'starter',
	},
	{
		label: 'Growth\u00a0· R$ 349,00 / month',
		value: 'growth',
	},
	{
		label: 'Scale\u00a0· R$ 990,00 / month',
		value: 'scale',
	},
]

const REFUND_REASONS = [
	{
		label: 'Requested by customer',
		value: 'requested_by_customer',
	},
	{
		label: 'Duplicate',
		value: 'duplicate',
	},
	{
		label: 'Fraudulent',
		value: 'fraudulent',
	},
]

/** What sits behind the overlays: the customers list the sheet adds to. */
function CustomersBehind({ onCreate }: { onCreate: () => void }) {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					action={
						<Button
							leftSection={<UserPlusIcon size={14} />}
							onClick={onCreate}
							size="sm"
						>
							Create customer
						</Button>
					}
					title="Customers"
				/>
				<Page.Content>
					<Table
						columns={[
							{
								key: 'name',
								label: 'Name',
								selector: (row: Customer) => (
									<Typography
										size="sm"
										weight="medium"
									>
										{row.name}
									</Typography>
								),
								width: 220,
							},
							{
								key: 'email',
								label: 'Email',
								selector: (row: Customer) => (
									<Typography size="sm">{row.email}</Typography>
								),
								width: 260,
							},
							{
								key: 'spent',
								label: 'Total spent',
								selector: (row: Customer) => (
									<MoneyText
										currency="brl"
										size="sm"
										value={row.spent}
									/>
								),
								width: 150,
							},
							{
								key: 'created',
								label: 'Created',
								selector: (row: Customer) => (
									<DateText
										format="d MMM yyyy"
										muted
										size="sm"
										value={row.createdAt}
									/>
								),
								width: 130,
							},
						]}
						density="compact"
						itemKey="id"
						items={CUSTOMERS}
					/>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

function CustomerFields() {
	return (
		<Form onSubmit={(event) => event.preventDefault()}>
			<Form.Field
				label={{
					content: 'Name',
					required: true,
				}}
				name="name"
			>
				<Input defaultValue="Helena Duarte" />
			</Form.Field>
			<Form.Field
				description="Receipts and invoices go here."
				label={{
					content: 'Email',
					required: true,
				}}
				name="email"
			>
				<Input defaultValue="helena.duarte@" />
			</Form.Field>
			<Form.Field
				label={{
					content: 'Description',
					optional: true,
				}}
				name="description"
			>
				<Textarea
					placeholder="Something only your team sees"
					rows={2}
				/>
			</Form.Field>
			<Form.FieldSet legend="Billing address">
				<Form.Field
					label="Country"
					name="country"
				>
					<Select
						defaultValue="BR"
						mode="single"
						optionLabel="label"
						options={COUNTRIES}
						optionValue="value"
					/>
				</Form.Field>
				<Form.Field
					label="Address"
					name="line1"
				>
					<Input placeholder="Street and number" />
				</Form.Field>
				<Grid
					cols={2}
					gap="md"
				>
					<Form.Field
						label="City"
						name="city"
					>
						<Input defaultValue="São Paulo" />
					</Form.Field>
					<Form.Field
						label="Postal code"
						name="postal"
					>
						<Input placeholder="00000-000" />
					</Form.Field>
				</Grid>
			</Form.FieldSet>
			<Form.Field name="tax">
				<Switch label="Collect tax ID on the next invoice" />
			</Form.Field>
		</Form>
	)
}

/**
 * A focus view: create without losing the place. Primary action on the
 * right of the footer, Cancel beside it; the list stays behind the sheet.
 */
function CustomerSheet({
	onOpenChange,
	open,
}: {
	onOpenChange: (open: boolean) => void
	open: boolean
}) {
	return (
		<Sheet
			onChange={onOpenChange}
			open={open}
			side="right"
			size="md"
		>
			<Sheet.Header
				bordered
				closable
			>
				<Sheet.Header.Title>Create a customer</Sheet.Header.Title>
				<Sheet.Header.Description>
					Add someone you will charge or invoice.
				</Sheet.Header.Description>
			</Sheet.Header>
			<Sheet.Body>
				<CustomerFields />
			</Sheet.Body>
			<Sheet.Footer bordered>
				<Flex
					align="center"
					gap="sm"
					justify="end"
				>
					<Button
						onClick={() => onOpenChange(false)}
						variant="outline"
					>
						Cancel
					</Button>
					<Button>Create customer</Button>
				</Flex>
			</Sheet.Footer>
		</Sheet>
	)
}

function SheetForm({ unsaved }: { unsaved: boolean }) {
	const [open, setOpen] = useState(true)
	const [confirming, setConfirming] = useState(unsaved)

	return (
		<BackofficeShell active="customers">
			<CustomersBehind onCreate={() => setOpen(true)} />
			<CustomerSheet
				onOpenChange={(next) => {
					if (next || !unsaved) {
						setOpen(next)
						return
					}
					setConfirming(true)
				}}
				open={open}
			/>
			<Confirm
				cancelText="Keep editing"
				confirmProps={{
					variant: 'destructive',
				}}
				confirmText="Discard"
				description="The customer has not been created. What you typed will be lost."
				onClose={() => setConfirming(false)}
				onConfirm={() => {
					setConfirming(false)
					setOpen(false)
				}}
				open={confirming}
				title="Discard unsaved changes?"
			/>
		</BackofficeShell>
	)
}

const STEPS = [
	'Customer',
	'Pricing',
	'Review',
]

/** A create that needs steps: progress in the header, Back / Continue below. */
function StepperSheet() {
	const [open, setOpen] = useState(true)
	const [active, setActive] = useState(1)

	return (
		<BackofficeShell active="subscriptions">
			<CustomersBehind onCreate={() => setOpen(true)} />
			<Sheet
				onChange={setOpen}
				open={open}
				side="right"
				size="xl"
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Header.Title>Create a subscription</Sheet.Header.Title>
				</Sheet.Header>
				<Sheet.Body>
					<Stepper
						active={active}
						allowNextStepsSelect={false}
						onActiveChange={setActive}
						size="sm"
					>
						<Stepper.Step
							description="Who pays"
							label={STEPS[0]}
						>
							<Form.Field
								label="Customer"
								name="customer"
							>
								<Select
									clearable={false}
									defaultValue={CUSTOMERS[1].id}
									mode="single"
									optionLabel="name"
									options={CUSTOMERS}
									optionValue="id"
								/>
							</Form.Field>
						</Stepper.Step>
						<Stepper.Step
							description="Plan and billing"
							label={STEPS[1]}
						>
							<Form onSubmit={(event) => event.preventDefault()}>
								<Form.Field
									label="Plan"
									name="plan"
								>
									<Radio.Group
										bordered
										defaultValue="growth"
										items={PLANS}
									/>
								</Form.Field>
								<Grid
									cols={2}
									gap="md"
								>
									<Form.Field
										label="Quantity"
										name="quantity"
									>
										<NumberInput defaultValue={12} />
									</Form.Field>
									<Form.Field
										label="Starts on"
										name="start"
									>
										<DateInput defaultValue={new Date(2026, 9, 1)} />
									</Form.Field>
								</Grid>
								<Form.Field
									description="The first invoice is prorated to the end of the month."
									name="trial"
								>
									<Switch label="Add a 14-day free trial" />
								</Form.Field>
							</Form>
						</Stepper.Step>
						<Stepper.Step
							description="Check and confirm"
							label={STEPS[2]}
						>
							<DescriptionList
								dividers
								items={[
									{
										label: 'Customer',
										value: CUSTOMERS[1].name,
									},
									{
										label: 'Plan',
										value: 'Growth × 12',
									},
								]}
								layout="inline"
							/>
						</Stepper.Step>
					</Stepper>
				</Sheet.Body>
				<Sheet.Footer bordered>
					<Flex
						align="center"
						gap="sm"
						justify="between"
					>
						<Typography
							size="sm"
							variant="muted"
						>
							Step {active + 1} of {STEPS.length}
						</Typography>
						<Flex
							align="center"
							gap="sm"
						>
							<Button
								disabled={active === 0}
								onClick={() => setActive(active - 1)}
								variant="outline"
							>
								Back
							</Button>
							<Button
								onClick={() =>
									setActive(Math.min(active + 1, STEPS.length - 1))
								}
							>
								{active === STEPS.length - 1
									? 'Create subscription'
									: 'Continue'}
							</Button>
						</Flex>
					</Flex>
				</Sheet.Footer>
			</Sheet>
		</BackofficeShell>
	)
}

/** A modal earns its place only for a confirmation with a field or three. */
function RefundModal() {
	const [open, setOpen] = useState(true)

	return (
		<BackofficeShell active="payments">
			<Layout.Content maxWidth="lg">
				<Page>
					<Page.Header
						action={
							<Button
								leftSection={<RotateCcwIcon size={14} />}
								onClick={() => setOpen(true)}
								size="sm"
								variant="outline"
							>
								Refund
							</Button>
						}
						title="Payments"
					/>
					<Page.Content>
						<PaymentsTable
							activeKey={PAYMENTS[0].id}
							items={PAYMENTS}
						/>
					</Page.Content>
				</Page>
			</Layout.Content>
			<Confirm
				cancelText="Cancel"
				confirmText="Refund R$ 4.899,00"
				content={
					<Form onSubmit={(event) => event.preventDefault()}>
						<Form.Field
							description="Up to R$ 4.899,00. A partial refund leaves the rest captured."
							label="Amount"
							name="amount"
						>
							<CurrencyInput
								defaultValue={PAYMENTS[0].amount}
								variant="brl"
							/>
						</Form.Field>
						<Form.Field
							label="Reason"
							name="reason"
						>
							<Select
								defaultValue="requested_by_customer"
								mode="single"
								optionLabel="label"
								options={REFUND_REASONS}
								optionValue="value"
							/>
						</Form.Field>
					</Form>
				}
				description="Refunds take 5–10 days to reach the customer's statement. Fees are not returned."
				onClose={() => setOpen(false)}
				open={open}
				title="Refund payment"
			/>
		</BackofficeShell>
	)
}

type Line = {
	amount: number
	description: string
	id: string
	quantity: number
}

const LINES: Line[] = [
	{
		amount: 34_900,
		description: 'Growth plan — October 2026',
		id: 'li_1',
		quantity: 12,
	},
	{
		amount: 150_000,
		description: 'Onboarding session',
		id: 'li_2',
		quantity: 1,
	},
]

const SUBTOTAL = LINES.reduce(
	(total, line) => total + line.amount * line.quantity,
	0,
)

/**
 * Invoices and subscriptions get a full-page editor: the app chrome
 * steps aside for a close control, the form on the left and the document it
 * produces on the right, updating as it is typed.
 */
function InvoiceEditor() {
	return (
		<Layout
			banner={<SandboxBanner />}
			height="fill"
		>
			<Layout.Header
				bordered
				leftSection={
					<Flex
						align="center"
						gap="sm"
					>
						<Button
							ariaLabel="Close editor"
							size="icon-sm"
							variant="ghost"
						>
							<XIcon size={16} />
						</Button>
						<Typography
							component="h1"
							size="sm"
							weight="semibold"
						>
							Create invoice
						</Typography>
						<Badge
							size="sm"
							variant="secondary"
						>
							Draft
						</Badge>
					</Flex>
				}
				rightSection={
					<Flex
						align="center"
						gap="sm"
					>
						<Typography
							size="xs"
							variant="muted"
						>
							Saved 10:52
						</Typography>
						<Button
							size="sm"
							variant="outline"
						>
							Save draft
						</Button>
						<Button size="sm">Review invoice</Button>
					</Flex>
				}
				size="md"
			/>
			<Layout.Main>
				<Layout.Content span={2}>
					<Form onSubmit={(event) => event.preventDefault()}>
						<Form.Field
							label="Customer"
							name="customer"
						>
							<Select
								clearable={false}
								defaultValue={CUSTOMERS[1].id}
								mode="single"
								optionLabel="name"
								options={CUSTOMERS}
								optionValue="id"
							/>
						</Form.Field>
						<Grid
							cols={2}
							gap="md"
						>
							<Form.Field
								label="Currency"
								name="currency"
							>
								<Input
									defaultValue="BRL — Brazilian real"
									readOnly
								/>
							</Form.Field>
							<Form.Field
								label="Due date"
								name="due"
							>
								<DateInput defaultValue={new Date(2026, 9, 10)} />
							</Form.Field>
						</Grid>
						<Form.FieldSet legend="Items">
							{LINES.map((line) => (
								<Grid
									cols={3}
									gap="sm"
									key={line.id}
								>
									<Form.Field
										label="Description"
										name={`${line.id}-description`}
									>
										<Input defaultValue={line.description} />
									</Form.Field>
									<Form.Field
										label="Qty"
										name={`${line.id}-quantity`}
									>
										<NumberInput defaultValue={line.quantity} />
									</Form.Field>
									<Form.Field
										label="Unit price"
										name={`${line.id}-amount`}
									>
										<CurrencyInput
											defaultValue={line.amount}
											rightSection={
												<Button
													ariaLabel={`Remove ${line.description}`}
													size="icon-xs"
													variant="ghost"
												>
													<Trash2Icon size={14} />
												</Button>
											}
											variant="brl"
										/>
									</Form.Field>
								</Grid>
							))}
							<Box>
								<Button
									leftSection={<PlusIcon size={14} />}
									size="sm"
									variant="dashed"
								>
									Add item
								</Button>
							</Box>
						</Form.FieldSet>
						<Form.Field
							label={{
								content: 'Memo',
								optional: true,
							}}
							name="memo"
						>
							<Textarea
								defaultValue="Thank you for travelling with Acme."
								rows={2}
							/>
						</Form.Field>
					</Form>
				</Layout.Content>
				<Layout.Content
					bg="muted"
					span={2}
				>
					<Flex
						align="stretch"
						direction="col"
						gap="sm"
					>
						<Typography
							component="h2"
							size="xs"
							variant="muted"
							weight="medium"
						>
							PREVIEW
						</Typography>
						<Card>
							<Card.Content>
								<Flex
									align="stretch"
									direction="col"
									gap="lg"
								>
									<Flex
										align="start"
										justify="between"
									>
										<AcmeLogo />
										<Flex
											align="end"
											direction="col"
											gap="none"
										>
											<Typography
												size="lg"
												weight="semibold"
											>
												Invoice
											</Typography>
											<Typography
												size="xs"
												variant="muted"
											>
												INV-2026-0934&nbsp;· due 10 Oct 2026
											</Typography>
										</Flex>
									</Flex>
									<Grid
										cols={2}
										gap="md"
									>
										<DescriptionList
											items={[
												{
													label: 'Billed to',
													value: CUSTOMERS[1].name,
												},
												{
													label: 'Email',
													value: CUSTOMERS[1].email,
												},
											]}
										/>
										<DescriptionList
											items={[
												{
													label: 'From',
													value: 'Acme Serviços Ltda.',
												},
												{
													label: 'Tax ID',
													value: '12.345.678/0001-90',
												},
											]}
										/>
									</Grid>
									<Table
										columns={[
											{
												key: 'description',
												label: 'Description',
												selector: (row: Line) => (
													<Typography size="sm">{row.description}</Typography>
												),
												width: 240,
											},
											{
												align: 'right',
												key: 'quantity',
												label: 'Qty',
												selector: (row: Line) => (
													<Typography size="sm">{row.quantity}</Typography>
												),
												width: 60,
											},
											{
												align: 'right',
												key: 'amount',
												label: 'Amount',
												selector: (row: Line) => (
													<MoneyText
														currency="brl"
														size="sm"
														value={row.amount * row.quantity}
													/>
												),
												width: 120,
											},
										]}
										density="compact"
										itemKey="id"
										items={LINES}
									/>
									<Separator />
									<Flex
										align="center"
										justify="between"
									>
										<Typography
											size="sm"
											weight="semibold"
										>
											Amount due
										</Typography>
										<MoneyText
											currency="brl"
											size="lg"
											value={SUBTOTAL}
											weight="semibold"
										/>
									</Flex>
									<Typography
										size="xs"
										variant="muted"
									>
										Thank you for travelling with Acme.
									</Typography>
								</Flex>
							</Card.Content>
						</Card>
						<Alert variant="info">
							<Alert.Title>Pix and boleto are on</Alert.Title>
							<Alert.Description>
								The customer can pay this invoice either way from the hosted
								page.
							</Alert.Description>
						</Alert>
					</Flex>
				</Layout.Content>
			</Layout.Main>
		</Layout>
	)
}

/**
 * Creating and editing, in the shapes a payments dashboard uses for them.
 *
 * The side sheet is the default: the list stays behind it and the place is not
 * lost. Closing it with changes in it asks first. A modal is kept for a
 * confirmation that needs a field or three — a refund's amount and reason.
 * A create with several decisions gets steps inside a wide sheet, and a
 * document the customer will read gets the full-page editor with its preview.
 */
export function Forms({ variant }: { variant: FormsVariant }) {
	if (variant === 'page') {
		return <InvoiceEditor />
	}

	if (variant === 'modal') {
		return <RefundModal />
	}

	if (variant === 'sheet-stepper') {
		return <StepperSheet />
	}

	return <SheetForm unsaved={variant === 'sheet-unsaved'} />
}
