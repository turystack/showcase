import {
	BriefcaseIcon,
	HouseIcon,
	MapPinIcon,
	MoreHorizontalIcon,
	PlusIcon,
	ShieldCheckIcon,
} from '@turystack/react-icons'
import {
	Badge,
	Box,
	Button,
	Card,
	Checkbox,
	Flex,
	Form,
	Grid,
	Input,
	Layout,
	List,
	Modal,
	Page,
	Radio,
	SegmentedControl,
	Separator,
	Stepper,
	Textarea,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	ConsumerShell,
	MinimalShell,
} from '@/components/audiences/b2c/app-shell'

/**
 * Filling something in, at three sizes.
 *
 * - `page` — the order, reviewed and placed on one page: address, when,
 *   how to pay, a note, and the total beside it. The shell is the minimal
 *   one, because a checkout that links everywhere is a checkout people leave
 * - `modal` — a small edit over the page it belongs to: a new address over
 *   the list of saved ones. On a phone this is where a bottom sheet goes
 * - `stepper` — a longer task split into steps a person can see the end of:
 *   reporting a problem with an order
 */
export type FormsVariant = 'page' | 'modal' | 'stepper'

function SummaryLine({
	label,
	value,
	strong,
}: {
	label: string
	value: string
	strong?: boolean
}) {
	return (
		<Flex justify="between">
			<Typography
				component="span"
				size="sm"
				variant={strong ? 'default' : 'muted'}
				weight={strong ? 'bold' : 'normal'}
			>
				{label}
			</Typography>
			<Typography
				component="span"
				size="sm"
				weight={strong ? 'bold' : 'normal'}
			>
				{value}
			</Typography>
		</Flex>
	)
}

function CheckoutPage() {
	return (
		<MinimalShell>
			<Layout.Content maxWidth="lg">
				<Page>
					<Page.Header
						breadcrumbs={[
							{
								href: '#',
								label: 'Forno Vila Madalena',
							},
							{
								label: 'Checkout',
							},
						]}
						description="Check everything once; nothing is charged until you place the order."
						title="Review and place your order"
					/>
					<Page.Content>
						<Grid
							cols={3}
							gap="xl"
						>
							<Grid.Item span={2}>
								<Form
									gap="lg"
									id="checkout"
									onSubmit={(event) => {
										event.preventDefault()
									}}
								>
									<Form.FieldSet legend="Delivery address">
										<Radio.Group
											bordered
											defaultValue="home"
											items={[
												{
													description:
														'Rua Harmonia, 412, ap. 71 — Vila Madalena',
													label: 'Home',
													value: 'home',
												},
												{
													description:
														'Av. Paulista, 1578, 9º andar — Bela Vista',
													label: 'Work',
													value: 'work',
												},
											]}
										/>
										<Flex>
											<Button
												leftSection={<PlusIcon size={16} />}
												size="sm"
												variant="link"
											>
												Deliver somewhere else
											</Button>
										</Flex>
									</Form.FieldSet>
									<Form.FieldSet legend="When">
										<SegmentedControl
											block
											defaultValue="now"
											optionLabel="label"
											options={[
												{
													label: 'As soon as possible\u00a0· 25–35 min',
													value: 'now',
												},
												{
													label: 'Schedule for later',
													value: 'later',
												},
											]}
											optionValue="value"
										/>
									</Form.FieldSet>
									<Form.FieldSet legend="Payment">
										<Radio.Group
											bordered
											defaultValue="pix"
											items={[
												{
													description:
														'Pay in your bank app; confirmed in seconds.',
													label: 'PIX',
													value: 'pix',
												},
												{
													description: 'Card ending 4242\u00a0· expires 08/29',
													label: 'Credit card',
													value: 'card',
												},
												{
													description:
														'Card or cash to the courier. Tell us if you need change.',
													label: 'Pay on delivery',
													value: 'on-delivery',
												},
											]}
										/>
									</Form.FieldSet>
									<Form.Field
										description="The courier reads this at the door."
										label="Note for the courier"
									>
										<Textarea
											maxLength={140}
											placeholder="Ring 71. The intercom is on the left of the gate."
											rows={2}
										/>
									</Form.Field>
									<Form.Field label="CPF on the receipt">
										<Input
											inputMode="numeric"
											placeholder="000.000.000-00"
										/>
									</Form.Field>
								</Form>
							</Grid.Item>
							<Card>
								<Card.Header bordered>
									<Card.Title headingLevel={2}>Forno Vila Madalena</Card.Title>
									<Card.Description>4 items · 25–35 min</Card.Description>
								</Card.Header>
								<Card.Content>
									<Flex
										align="stretch"
										direction="col"
										gap="sm"
									>
										<SummaryLine
											label="1× Margherita"
											value="R$ 54,90"
										/>
										<SummaryLine
											label="1× Quatro queijos (half)"
											value="R$ 31,45"
										/>
										<SummaryLine
											label="2× Guaraná 2 L"
											value="R$ 24,00"
										/>
										<Separator />
										<SummaryLine
											label="Subtotal"
											value="R$ 110,35"
										/>
										<SummaryLine
											label="Delivery"
											value="R$ 4,99"
										/>
										<SummaryLine
											label="Coupon WEEKEND10"
											value="− R$ 11,04"
										/>
										<Separator />
										<SummaryLine
											label="Total"
											strong
											value="R$ 104,30"
										/>
									</Flex>
								</Card.Content>
								<Card.Footer bordered>
									<Flex
										align="stretch"
										block
										direction="col"
										gap="sm"
									>
										<Button
											block
											form="checkout"
											size="lg"
											type="submit"
										>
											Place order · R$ 104,30
										</Button>
										<Flex
											align="center"
											gap="xs"
											justify="center"
										>
											<ShieldCheckIcon size={14} />
											<Typography
												component="span"
												size="xs"
												variant="muted"
											>
												Paid through Acme; the store never sees your card.
											</Typography>
										</Flex>
									</Flex>
								</Card.Footer>
							</Card>
						</Grid>
					</Page.Content>
				</Page>
			</Layout.Content>
		</MinimalShell>
	)
}

const ADDRESSES = [
	{
		detail: 'Rua Harmonia, 412, ap. 71 — Vila Madalena, São Paulo',
		icon: HouseIcon,
		id: 'home',
		label: 'Home',
	},
	{
		detail: 'Av. Paulista, 1578, 9º andar — Bela Vista, São Paulo',
		icon: BriefcaseIcon,
		id: 'work',
		label: 'Work',
	},
	{
		detail: 'Rua Girassol, 88 — Pinheiros, São Paulo',
		icon: MapPinIcon,
		id: 'mum',
		label: "Mum's",
	},
]

function AddressModal() {
	const [open, setOpen] = useState(true)

	return (
		<ConsumerShell>
			<Layout.Content maxWidth="md">
				<Page>
					<Page.Header
						action={
							<Button
								leftSection={<PlusIcon size={16} />}
								onClick={() => setOpen(true)}
							>
								Add address
							</Button>
						}
						description="Where your orders can be delivered."
						title="Addresses"
					/>
					<Page.Content>
						<List
							gap="sm"
							itemKey="id"
							items={ADDRESSES}
							renderItem={(address) => (
								<Card size="sm">
									<Card.Content>
										<Flex
											align="center"
											gap="md"
										>
											<address.icon size={20} />
											<Flex
												align="stretch"
												direction="col"
												gap="none"
											>
												<Flex
													align="center"
													gap="sm"
												>
													<Typography
														component="span"
														size="sm"
														weight="semibold"
													>
														{address.label}
													</Typography>
													{address.id === 'home' && (
														<Badge
															size="sm"
															variant="secondary"
														>
															Default
														</Badge>
													)}
												</Flex>
												<Typography
													component="span"
													size="sm"
													variant="muted"
												>
													{address.detail}
												</Typography>
											</Flex>
											<Box grow />
											<Button
												ariaLabel={`Edit ${address.label}`}
												size="icon-sm"
												variant="ghost"
											>
												<MoreHorizontalIcon size={16} />
											</Button>
										</Flex>
									</Card.Content>
								</Card>
							)}
						/>
					</Page.Content>
				</Page>
			</Layout.Content>
			<Modal
				onChange={setOpen}
				open={open}
			>
				<Modal.Header
					bordered
					closable
				>
					<Modal.Header.Title>New address</Modal.Header.Title>
					<Modal.Header.Description>
						Start with the CEP; we fill in the street.
					</Modal.Header.Description>
				</Modal.Header>
				<Modal.Body>
					<Form
						id="new-address"
						onSubmit={(event) => {
							event.preventDefault()
							setOpen(false)
						}}
					>
						<Grid
							cols={3}
							gap="md"
						>
							<Form.Field
								label={{
									content: 'CEP',
									required: true,
								}}
							>
								<Input
									defaultValue="05435-000"
									inputMode="numeric"
								/>
							</Form.Field>
							<Grid.Item span={2}>
								<Form.Field label="Street">
									<Input
										defaultValue="Rua Harmonia"
										readOnly
									/>
								</Form.Field>
							</Grid.Item>
						</Grid>
						<Grid
							cols={3}
							gap="md"
						>
							<Form.Field
								label={{
									content: 'Number',
									required: true,
								}}
							>
								<Input
									inputMode="numeric"
									placeholder="412"
								/>
							</Form.Field>
							<Grid.Item span={2}>
								<Form.Field label="Complement">
									<Input placeholder="Apartment, block, floor" />
								</Form.Field>
							</Grid.Item>
						</Grid>
						<Form.Field label="Save as">
							<SegmentedControl
								block
								defaultValue="home"
								optionLabel="label"
								options={[
									{
										label: 'Home',
										value: 'home',
									},
									{
										label: 'Work',
										value: 'work',
									},
									{
										label: 'Other',
										value: 'other',
									},
								]}
								optionValue="value"
							/>
						</Form.Field>
						<Checkbox label="Make this my default address" />
					</Form>
				</Modal.Body>
				<Modal.Footer bordered>
					{/* The footer lays out right to left: the first child is the primary. */}
					<Button
						form="new-address"
						type="submit"
					>
						Save address
					</Button>
					<Button
						onClick={() => setOpen(false)}
						variant="ghost"
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</ConsumerShell>
	)
}

function ReportProblem() {
	const [active, setActive] = useState(1)

	return (
		<ConsumerShell active="orders">
			<Layout.Content maxWidth="md">
				<Page>
					<Page.Header
						breadcrumbs={[
							{
								href: '#',
								label: 'Orders',
							},
							{
								href: '#',
								label: 'Order #4821',
							},
							{
								label: 'Report a problem',
							},
						]}
						description="Padaria Aurora&nbsp;· delivered today at 12:38"
						title="Report a problem"
					/>
					<Page.Content>
						<Stepper
							active={active}
							onActiveChange={setActive}
						>
							<Stepper.Step
								description="What went wrong"
								label="Problem"
							>
								<Radio.Group
									ariaLabel="What went wrong"
									bordered
									defaultValue="missing"
									items={[
										{
											label: 'Something was missing',
											value: 'missing',
										},
										{
											label: 'Something was wrong or damaged',
											value: 'wrong',
										},
										{
											label: 'It arrived late or cold',
											value: 'late',
										},
										{
											label: 'It never arrived',
											value: 'never',
										},
									]}
								/>
							</Stepper.Step>
							<Stepper.Step
								description="Which items"
								label="Items"
							>
								<Flex
									align="stretch"
									direction="col"
									gap="md"
								>
									<Typography
										component="p"
										size="sm"
										variant="muted"
									>
										Pick everything that was missing. You get back what you paid
										for each one.
									</Typography>
									<Checkbox.Group
										ariaLabel="Missing items"
										bordered
										defaultValue={[
											'croissant',
										]}
										items={[
											{
												description: '4 × R$ 7,50',
												label: 'Butter croissant',
												value: 'croissant',
											},
											{
												description: '1 × R$ 18,90',
												label: 'Country loaf',
												value: 'bread',
											},
											{
												description: '1 × R$ 14,00',
												label: 'Orange juice 1 L',
												value: 'juice',
											},
										]}
									/>
								</Flex>
							</Stepper.Step>
							<Stepper.Step
								description="Refund or credit"
								label="Resolution"
							>
								<Radio.Group
									ariaLabel="Refund or credit"
									bordered
									defaultValue="credit"
									items={[
										{
											description: 'Available now, for any store.',
											label: 'Acme credit · R$ 30,00',
											value: 'credit',
										},
										{
											description: 'Back to your PIX key in up to 2 days.',
											label: 'Refund · R$ 30,00',
											value: 'refund',
										},
									]}
								/>
							</Stepper.Step>
							<Stepper.Completed>
								<Typography
									component="p"
									weight="semibold"
								>
									Sent. R$ 30,00 of credit is already in your account.
								</Typography>
							</Stepper.Completed>
							<Stepper.Previous variant="outline">Back</Stepper.Previous>
							<Stepper.Next lastChildren="Send report">Continue</Stepper.Next>
						</Stepper>
					</Page.Content>
				</Page>
			</Layout.Content>
		</ConsumerShell>
	)
}

export function Forms({ variant }: { variant: FormsVariant }) {
	if (variant === 'modal') {
		return <AddressModal />
	}

	if (variant === 'stepper') {
		return <ReportProblem />
	}

	return <CheckoutPage />
}
