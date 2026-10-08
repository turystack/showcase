import { InfoIcon } from '@turystack/react-icons'
import {
	Alert,
	Button,
	Card,
	Confirm,
	CurrencyInput,
	DateInput,
	Flex,
	Form,
	Grid,
	Input,
	Layout,
	Modal,
	Page,
	Radio,
	Select,
	Sheet,
	Stepper,
	Table,
	Textarea,
	Typography,
	toast,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import { DEALS, ME, STAGES } from './crm-data'
import { CrmShell } from './crm-shell'
import { DealsTableView } from './main-page'

/**
 * Creating and editing a record, the way a CRM decides between the surfaces.
 *
 * A long form is a `panel` — a side sheet, so the list it adds to stays in
 * sight. A short one, or a question, is a `modal`; the destructive question is
 * `confirm-danger`, which names what is lost and does not focus its own
 * button. Success is never a modal: it is a toast. The steppers keep Back and
 * Next together on the right and the progress on the left of the footer.
 * Buttons elsewhere sit bottom-left, primary first — a common CRM rule, so the
 * primary is where the eye ends the form.
 */
export type FormsVariant =
	| 'panel'
	| 'modal'
	| 'confirm-danger'
	| 'panel-stepper'
	| 'modal-stepper'
	| 'page'

const COMPANIES = Array.from(new Set(DEALS.map((deal) => deal.account))).map(
	(name) => ({
		name,
	}),
)

const OWNERS = [
	{
		name: 'Marina Costa',
	},
	{
		name: 'Diego Almeida',
	},
	{
		name: 'Ana Ribeiro',
	},
]

/** Buttons at the bottom-left, primary first. */
function LeftActions({ children }: { children: ReactNode }) {
	return (
		<Flex
			align="center"
			block
			gap="sm"
		>
			{children}
		</Flex>
	)
}

function DealFields() {
	return (
		<Form.FieldGroup>
			<Form.Field
				label="Deal name"
				name="deal-fields-deal-name"
			>
				<Input
					defaultValue="Wayne — 40 new stores"
					name="name"
				/>
			</Form.Field>
			<Grid
				cols={2}
				gap="md"
			>
				<Form.Field
					label="Company"
					name="deal-fields-company"
				>
					<Select
						clearable={false}
						defaultValue="Wayne Varejo"
						mode="single"
						optionLabel="name"
						options={COMPANIES}
						optionValue="name"
						searchable
					/>
				</Form.Field>
				<Form.Field
					label="Primary contact"
					name="deal-fields-primary-contact"
				>
					<Input
						defaultValue="Juliana Freitas"
						name="contact"
					/>
				</Form.Field>
			</Grid>
			<Grid
				cols={2}
				gap="md"
			>
				<Form.Field
					label="Amount"
					name="deal-fields-amount"
				>
					<CurrencyInput
						defaultValue={5_600_000}
						name="amount"
						variant="brl"
					/>
				</Form.Field>
				<Form.Field
					label="Close date"
					name="deal-fields-close-date"
				>
					<DateInput
						defaultValue={new Date(2026, 9, 8)}
						name="closeDate"
					/>
				</Form.Field>
			</Grid>
			<Grid
				cols={2}
				gap="md"
			>
				<Form.Field
					label="Stage"
					name="deal-fields-stage"
				>
					<Select
						clearable={false}
						defaultValue="proposal"
						mode="single"
						optionLabel="label"
						options={STAGES}
						optionValue="id"
					/>
				</Form.Field>
				<Form.Field
					label="Owner"
					name="deal-fields-owner"
				>
					<Select
						clearable={false}
						defaultValue={ME.name}
						mode="single"
						optionLabel="name"
						options={OWNERS}
						optionValue="name"
					/>
				</Form.Field>
			</Grid>
			<Form.Field
				description="Visible to everyone who can see the deal."
				label="Description"
				name="deal-fields-description"
			>
				<Textarea
					defaultValue="Rollout to 40 new stores opening in Q4, billed per store."
					maxLength={500}
					name="description"
					rows={3}
				/>
			</Form.Field>
		</Form.FieldGroup>
	)
}

/* ─── Panel ─────────────────────────────────────────────────────────────── */

function PanelForm() {
	const [open, setOpen] = useState(true)

	return (
		<Sheet
			onChange={setOpen}
			open={open}
			side="right"
			size="lg"
		>
			<Sheet.Header
				bordered
				closable
			>
				<Sheet.Header.Title>New deal</Sheet.Header.Title>
				<Sheet.Header.Description>
					Fields marked required must be filled before saving.
				</Sheet.Header.Description>
			</Sheet.Header>
			<Sheet.Body>
				<Form id="new-deal">
					<DealFields />
				</Form>
			</Sheet.Body>
			<Sheet.Footer bordered>
				<LeftActions>
					<Button
						form="new-deal"
						type="submit"
					>
						Create deal
					</Button>
					<Button variant="outline">Create and add another</Button>
					<Button
						onClick={() => setOpen(false)}
						variant="ghost"
					>
						Cancel
					</Button>
				</LeftActions>
			</Sheet.Footer>
		</Sheet>
	)
}

/* ─── Modal ─────────────────────────────────────────────────────────────── */

function ModalForm() {
	const [open, setOpen] = useState(true)

	return (
		<Modal
			onChange={setOpen}
			open={open}
			size="md"
		>
			<Modal.Header
				bordered
				closable
			>
				<Modal.Header.Title>Log a call</Modal.Header.Title>
				<Modal.Header.Description>
					Globex — fleet expansion · Helena Prado
				</Modal.Header.Description>
			</Modal.Header>
			<Modal.Body>
				<Form id="log-call">
					<Form.FieldGroup>
						<Form.Field label="Outcome">
							<Radio.Group
								defaultValue="connected"
								items={[
									{
										label: 'Connected',
										value: 'connected',
									},
									{
										label: 'Left voicemail',
										value: 'voicemail',
									},
									{
										label: 'No answer',
										value: 'no-answer',
									},
								]}
								variant="horizontal"
							/>
						</Form.Field>
						<Form.Field
							label="Notes"
							name="modal-form-notes"
						>
							<Textarea
								defaultValue="Helena confirmed 30 extra vehicles; wants pricing by Friday."
								name="notes"
								rows={3}
							/>
						</Form.Field>
					</Form.FieldGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer bordered>
				<LeftActions>
					<Button
						form="log-call"
						onClick={() => {
							setOpen(false)
							toast.success('Call logged', {
								description: 'It is on the Globex deal timeline.',
							})
						}}
					>
						Save
					</Button>
					<Button
						onClick={() => setOpen(false)}
						variant="ghost"
					>
						Cancel
					</Button>
				</LeftActions>
			</Modal.Footer>
		</Modal>
	)
}

/* ─── Confirm (danger) ──────────────────────────────────────────────────── */

function DangerConfirm() {
	const [open, setOpen] = useState(true)

	return (
		<Confirm
			cancelText="Keep deal"
			confirmProps={{
				variant: 'destructive',
			}}
			confirmText="Delete deal"
			content={
				<Alert variant="warning">
					<Alert.Icon>
						<InfoIcon />
					</Alert.Icon>
					<Alert.Title>3 contacts and 6 activities stay</Alert.Title>
					<Alert.Description>
						They are unlinked from the deal, not deleted.
					</Alert.Description>
				</Alert>
			}
			description="“Globex — fleet expansion” (R$ 72.500) moves to the recycle bin for 15 days, then it is gone for good."
			onClose={() => setOpen(false)}
			onConfirm={() => {
				setOpen(false)
				toast.success('Deal deleted', {
					description: 'Restore it from the recycle bin within 15 days.',
				})
			}}
			open={open}
			title="Delete this deal?"
		/>
	)
}

/* ─── Steppers ──────────────────────────────────────────────────────────── */

/** The footer both steppers share: where you are on the left, Back and Next on the right. */
function StepFooter({
	active,
	last,
	onChange,
	total,
}: {
	active: number
	last: string
	onChange: (step: number) => void
	total: number
}) {
	return (
		<Flex
			align="center"
			block
			gap="sm"
			justify="between"
		>
			<Typography
				size="sm"
				variant="muted"
			>
				Step {active + 1} of {total}
			</Typography>
			<Flex
				align="center"
				gap="sm"
			>
				<Button
					disabled={active === 0}
					onClick={() => onChange(active - 1)}
					variant="outline"
				>
					Back
				</Button>
				<Button onClick={() => onChange(Math.min(active + 1, total - 1))}>
					{active === total - 1 ? last : 'Next'}
				</Button>
			</Flex>
		</Flex>
	)
}

function PanelStepper() {
	const [open, setOpen] = useState(true)
	const [active, setActive] = useState(1)

	return (
		<Sheet
			onChange={setOpen}
			open={open}
			side="right"
			size="lg"
		>
			<Sheet.Header
				bordered
				closable
			>
				<Sheet.Header.Title>Convert lead</Sheet.Header.Title>
				<Sheet.Header.Description>
					Juliana Freitas · Wayne Varejo
				</Sheet.Header.Description>
			</Sheet.Header>
			<Sheet.Body>
				<Stepper
					active={active}
					onActiveChange={setActive}
					size="sm"
				>
					<Stepper.Step label="Company">
						<Form>
							<Form.FieldGroup>
								<Form.Field
									label="Company"
									name="panel-stepper-company"
								>
									<Input defaultValue="Wayne Varejo" />
								</Form.Field>
								<Form.Field
									label="Website"
									name="panel-stepper-website"
								>
									<Input defaultValue="wayne.example" />
								</Form.Field>
							</Form.FieldGroup>
						</Form>
					</Stepper.Step>
					<Stepper.Step label="Contact">
						<Form>
							<Form.FieldGroup>
								<Grid
									cols={2}
									gap="md"
								>
									<Form.Field
										label="First name"
										name="panel-stepper-first-name"
									>
										<Input defaultValue="Juliana" />
									</Form.Field>
									<Form.Field
										label="Last name"
										name="panel-stepper-last-name"
									>
										<Input defaultValue="Freitas" />
									</Form.Field>
								</Grid>
								<Form.Field
									label="Email"
									name="panel-stepper-email"
								>
									<Input defaultValue="juliana.freitas@wayne.example" />
								</Form.Field>
								<Form.Field
									label="Job title"
									name="panel-stepper-job-title"
								>
									<Input defaultValue="Expansion Director" />
								</Form.Field>
								<Form.Field
									description="A contact with this email already exists; converting links the lead to it."
									label="Match"
								>
									<Radio.Group
										bordered
										defaultValue="existing"
										items={[
											{
												description: 'Created 12 Aug by Diego Almeida',
												label: 'Use existing contact',
												value: 'existing',
											},
											{
												label: 'Create a new contact',
												value: 'new',
											},
										]}
									/>
								</Form.Field>
							</Form.FieldGroup>
						</Form>
					</Stepper.Step>
					<Stepper.Step label="Deal">
						<Form>
							<DealFields />
						</Form>
					</Stepper.Step>
				</Stepper>
			</Sheet.Body>
			<Sheet.Footer bordered>
				<StepFooter
					active={active}
					last="Convert"
					onChange={setActive}
					total={3}
				/>
			</Sheet.Footer>
		</Sheet>
	)
}

/**
 * Skipping a column is a choice in the list, not an empty Select: every column
 * says what happens to it, so the mapping Select is never cleared.
 */
const DONT_IMPORT = 'Don’t import'

const MAPPING = [
	{
		column: 'Nome',
		id: 'm1',
		property: 'First name',
		sample: 'Rafael',
	},
	{
		column: 'Sobrenome',
		id: 'm2',
		property: 'Last name',
		sample: 'Menezes',
	},
	{
		column: 'E-mail',
		id: 'm3',
		property: 'Email',
		sample: 'rafael@northwind.example',
	},
	{
		column: 'Empresa',
		id: 'm4',
		property: 'Company',
		sample: 'Northwind Logistics',
	},
	{
		column: 'Cargo',
		id: 'm5',
		property: DONT_IMPORT,
		sample: 'Head of Operations',
	},
]

const PROPERTIES = [
	'First name',
	'Last name',
	'Email',
	'Company',
	'Job title',
	'Phone',
	DONT_IMPORT,
].map((name) => ({
	name,
}))

function ModalStepper() {
	const [open, setOpen] = useState(true)
	const [active, setActive] = useState(1)

	return (
		<Modal
			onChange={setOpen}
			open={open}
			size="xl"
		>
			<Modal.Header
				bordered
				closable
			>
				<Modal.Header.Title>Import contacts</Modal.Header.Title>
			</Modal.Header>
			<Modal.Body>
				<Stepper
					active={active}
					onActiveChange={setActive}
					size="sm"
				>
					<Stepper.Step
						description="CSV or XLSX"
						label="Upload"
					>
						<Typography size="sm">contatos-setembro.csv · 48 rows</Typography>
					</Stepper.Step>
					<Stepper.Step
						description="Columns to properties"
						label="Map fields"
					>
						<Flex
							align="stretch"
							direction="col"
							gap="sm"
						>
							<Typography
								size="sm"
								variant="muted"
							>
								4 of 5 columns matched. Unmatched columns are skipped.
							</Typography>
							<Table
								columns={[
									{
										key: 'column',
										label: 'Column in file',
										width: 200,
									},
									{
										key: 'sample',
										label: 'Sample value',
										selector: (row) => (
											<Typography
												size="sm"
												truncate
												variant="muted"
											>
												{row.sample}
											</Typography>
										),
										width: 300,
									},
									{
										key: 'property',
										label: 'Acme property',
										selector: (row) => (
											<Select
												ariaLabel={`Acme property for ${row.column}`}
												clearable={false}
												defaultValue={row.property}
												mode="single"
												optionLabel="name"
												options={PROPERTIES}
												optionValue="name"
												size="sm"
											/>
										),
										width: 300,
									},
								]}
								density="compact"
								itemKey="id"
								items={MAPPING}
							/>
						</Flex>
					</Stepper.Step>
					<Stepper.Step
						description="Check and import"
						label="Review"
					>
						<Typography size="sm">48 contacts will be created.</Typography>
					</Stepper.Step>
				</Stepper>
			</Modal.Body>
			<Modal.Footer bordered>
				<StepFooter
					active={active}
					last="Import 48 contacts"
					onChange={setActive}
					total={3}
				/>
			</Modal.Footer>
		</Modal>
	)
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

function PageForm() {
	return (
		<Layout.Content maxWidth="md">
			<Page>
				<Page.Header
					breadcrumbs={[
						{
							href: '#deals',
							label: 'Deals',
						},
						{
							label: 'New deal',
						},
					]}
					description="A deal is one sale in progress: who is buying, what, and by when."
					title="New deal"
				/>
				<Page.Content>
					<Form id="deal-page">
						<Card>
							<Card.Header bordered>
								<Card.Title headingLevel={2}>Deal information</Card.Title>
							</Card.Header>
							<Card.Content>
								<DealFields />
							</Card.Content>
						</Card>
						<Card>
							<Card.Header bordered>
								<Card.Title headingLevel={2}>Line items</Card.Title>
								<Card.Description>
									Optional. The amount is recalculated from them.
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<Grid
									cols={2}
									gap="md"
								>
									<Form.Field
										label="Product"
										name="page-form-product"
									>
										<Input defaultValue="Store licence — annual" />
									</Form.Field>
									<Form.Field
										label="Quantity"
										name="page-form-quantity"
									>
										<Input
											defaultValue="40"
											inputMode="numeric"
										/>
									</Form.Field>
								</Grid>
							</Card.Content>
						</Card>
						<LeftActions>
							<Button type="submit">Create deal</Button>
							<Button variant="ghost">Cancel</Button>
						</LeftActions>
					</Form>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

export function Forms({ variant }: { variant: FormsVariant }) {
	if (variant === 'page') {
		return (
			<CrmShell active="deals">
				<PageForm />
			</CrmShell>
		)
	}

	return (
		<CrmShell active="deals">
			<Layout.Content>
				<DealsTableView />
			</Layout.Content>
			{variant === 'panel' && <PanelForm />}
			{variant === 'modal' && <ModalForm />}
			{variant === 'confirm-danger' && <DangerConfirm />}
			{variant === 'panel-stepper' && <PanelStepper />}
			{variant === 'modal-stepper' && <ModalStepper />}
		</CrmShell>
	)
}
