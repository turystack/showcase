import {
	ExternalLinkIcon,
	MoreHorizontalIcon,
	PencilIcon,
	RotateCcwIcon,
	ShieldAlertIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Avatar,
	Badge,
	Button,
	Card,
	CopyButton,
	DateText,
	DescriptionList,
	DropdownMenu,
	Flex,
	Grid,
	Layout,
	List,
	MoneyText,
	Page,
	Sheet,
	Tabs,
	Timeline,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { CUSTOMERS, OPEN_PAYMENT, PAYMENTS } from './data'
import { PaymentPreview } from './main-page'
import { PaymentStatusBadge, PaymentsTable } from './payments-table'
import { BackofficeShell } from './shell'

/**
 * - `page`                 — the canonical record page: sections stacked on
 *   the left, the key/value Details column on the right
 * - `page-horizontal-tabs` — the same page split into tabs, for a record with
 *   several collections of its own (a customer)
 * - `sheet`                — a peek over the list, with the way to the page
 */
export type DetailsVariant = 'page' | 'page-horizontal-tabs' | 'sheet'

/** A titled block of the primary column. */
function Section({
	action,
	children,
	title,
}: {
	action?: ReactNode
	children: ReactNode
	title: string
}) {
	return (
		<Card size="sm">
			<Card.Header bordered>
				<Flex
					align="center"
					justify="between"
				>
					<Card.Title headingLevel={2}>{title}</Card.Title>
					{action}
				</Flex>
			</Card.Header>
			<Card.Content>{children}</Card.Content>
		</Card>
	)
}

/** The identifier, small and copyable, under a record's title. */
function RecordId({ value }: { value: string }) {
	return (
		<Flex
			align="center"
			gap="xs"
			inline
		>
			<Typography
				size="xs"
				variant="muted"
			>
				{value}
			</Typography>
			<CopyButton
				ariaLabel="Copy ID"
				size="xs"
				value={value}
			/>
		</Flex>
	)
}

function MoreMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel="More actions"
					size="icon-sm"
					variant="outline"
				>
					<MoreHorizontalIcon size={16} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={200}
			>
				<DropdownMenu.Item>Send receipt</DropdownMenu.Item>
				<DropdownMenu.Item>Edit metadata</DropdownMenu.Item>
				<DropdownMenu.Item>View in logs</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

const payment = OPEN_PAYMENT

/** The detail page for a payment: no tabs, sections stacked. */
function PaymentPage() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					action={
						<Flex
							align="center"
							gap="sm"
						>
							<Button
								leftSection={<RotateCcwIcon size={14} />}
								size="sm"
								variant="outline"
							>
								Refund
							</Button>
							<MoreMenu />
						</Flex>
					}
					breadcrumbs={[
						{
							href: '#payments',
							label: 'Payments',
						},
						{
							label: payment.id,
						},
					]}
					description={<RecordId value={payment.id} />}
					title={
						<Flex
							align="center"
							gap="sm"
						>
							<MoneyText
								currency="brl"
								size="2xl"
								value={payment.amount}
								weight="semibold"
							/>
							<Typography
								size="lg"
								variant="muted"
							>
								BRL
							</Typography>
							<PaymentStatusBadge status={payment.status} />
						</Flex>
					}
				/>
				<Page.Content>
					<Alert variant="warning">
						<Alert.Icon>
							<ShieldAlertIcon size={16} />
						</Alert.Icon>
						<Alert.Title>The customer disputed this payment</Alert.Title>
						<Alert.Description>
							Reason: product not received. Submit evidence by 3 Oct 2026 or the
							funds go back to the customer.
						</Alert.Description>
						<Alert.Action>
							<Button size="sm">Respond</Button>
						</Alert.Action>
					</Alert>
					<Grid
						cols={3}
						gap="lg"
					>
						<Grid.Item span={2}>
							<Flex
								align="stretch"
								direction="col"
								gap="md"
							>
								<Section title="Timeline">
									<Timeline compact>
										<Timeline.Item
											meta="26 Sep 2026, 10:51"
											status="error"
											title="Dispute opened: product not received"
										/>
										<Timeline.Item
											meta="25 Sep 2026, 16:40"
											status="error"
											title="Refund attempt declined"
										/>
										<Timeline.Item
											meta="25 Sep 2026, 16:27"
											status="done"
											title="Payment succeeded"
										/>
									</Timeline>
								</Section>
								<Section title="Payment breakdown">
									<DescriptionList
										dividers
										items={[
											{
												label: 'Payment amount',
												value: (
													<MoneyText
														currency="brl"
														size="inherit"
														value={payment.amount}
													/>
												),
											},
											{
												label: 'Acme fee',
												value: (
													<MoneyText
														currency="brl"
														size="inherit"
														value={-2_625}
													/>
												),
											},
											{
												label: 'Dispute withheld',
												value: (
													<MoneyText
														currency="brl"
														destructive
														size="inherit"
														value={-payment.amount}
													/>
												),
											},
											{
												label: 'Net',
												value: (
													<MoneyText
														currency="brl"
														size="inherit"
														value={-2_625}
														weight="semibold"
													/>
												),
											},
										]}
										layout="inline"
									/>
								</Section>
								<Section title="Payment method">
									<DescriptionList
										columns={2}
										items={[
											{
												label: 'Card',
												value: payment.method,
											},
											{
												label: 'Expires',
												value: '08 / 2029',
											},
											{
												label: 'Issuer',
												value: 'Issuing bank',
											},
											{
												label: 'Origin',
												value: 'Portugal',
											},
											{
												label: 'CVC check',
												value: (
													<Badge
														size="sm"
														variant="success"
													>
														Passed
													</Badge>
												),
											},
											{
												label: '3-D Secure',
												value: (
													<Badge
														size="sm"
														variant="success"
													>
														Authenticated
													</Badge>
												),
											},
										]}
									/>
								</Section>
								<Section
									action={
										<Button
											href="#logs"
											size="sm"
											variant="link-muted"
										>
											View all
										</Button>
									}
									title="Events and logs"
								>
									<List
										divided
										gap="none"
										itemKey="id"
										items={[
											{
												at: '26 Sep, 10:51',
												id: 'evt_1',
												label: 'charge.dispute.created',
											},
											{
												at: '25 Sep, 16:40',
												id: 'evt_2',
												label: 'POST /v1/refunds — 402',
											},
											{
												at: '25 Sep, 16:27',
												id: 'evt_3',
												label: 'payment.succeeded',
											},
										]}
										renderItem={(event) => (
											<Flex
												align="center"
												justify="between"
											>
												<Typography size="sm">{event.label}</Typography>
												<Typography
													size="xs"
													variant="muted"
												>
													{event.at}
												</Typography>
											</Flex>
										)}
									/>
								</Section>
							</Flex>
						</Grid.Item>
						<Flex
							align="stretch"
							direction="col"
							gap="md"
						>
							<Section
								action={
									<Button
										ariaLabel="Edit details"
										size="icon-xs"
										variant="ghost"
									>
										<PencilIcon size={14} />
									</Button>
								}
								title="Details"
							>
								<DescriptionList
									items={[
										{
											copyable: true,
											label: 'Payment ID',
											value: payment.id,
										},
										{
											label: 'Customer',
											value: (
												<Button
													href="#customer"
													size="sm"
													variant="link"
												>
													{payment.customer}
												</Button>
											),
										},
										{
											label: 'Created',
											value: (
												<DateText
													format="d MMM yyyy, HH:mm"
													size="inherit"
													value={payment.createdAt}
												/>
											),
										},
										{
											label: 'Description',
											value: payment.description,
										},
										{
											label: 'Statement descriptor',
											value: 'ACME* ORDER 10479',
										},
										{
											label: 'Risk evaluation',
											value: (
												<Badge
													size="sm"
													variant="success"
												>
													Normal&nbsp;· 12
												</Badge>
											),
										},
									]}
								/>
							</Section>
							<Section title="Metadata">
								<DescriptionList
									items={[
										{
											label: 'order_id',
											value: '10479',
										},
										{
											label: 'channel',
											value: 'web',
										},
									]}
									layout="inline"
								/>
							</Section>
						</Flex>
					</Grid>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

const customer = CUSTOMERS[2]

/** A customer has collections of its own, so here the tabs earn their place. */
function CustomerPage() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					action={
						<Flex
							align="center"
							gap="sm"
						>
							<Button
								size="sm"
								variant="outline"
							>
								Create payment
							</Button>
							<MoreMenu />
						</Flex>
					}
					breadcrumbs={[
						{
							href: '#customers',
							label: 'Customers',
						},
						{
							label: customer.id,
						},
					]}
					description={<RecordId value={customer.id} />}
					icon={
						<Avatar
							alt={customer.name}
							size="sm"
						>
							LF
						</Avatar>
					}
					title={customer.name}
				/>
				<Tabs
					block
					defaultValue="overview"
				>
					<Tabs.List ariaLabel="Customer sections">
						<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
						<Tabs.Trigger value="payments">Payments</Tabs.Trigger>
						<Tabs.Trigger value="subscriptions">Subscriptions</Tabs.Trigger>
						<Tabs.Trigger value="invoices">Invoices</Tabs.Trigger>
						<Tabs.Trigger value="events">Events</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="overview">
						<Grid
							cols={3}
							gap="lg"
						>
							<Grid.Item span={2}>
								<Flex
									align="stretch"
									direction="col"
									gap="md"
								>
									<Grid
										cols={3}
										gap="md"
									>
										<Card size="sm">
											<Card.Content>
												<DescriptionList
													items={[
														{
															label: 'Total spent',
															value: (
																<MoneyText
																	currency="brl"
																	size="lg"
																	value={customer.spent}
																	weight="semibold"
																/>
															),
														},
													]}
												/>
											</Card.Content>
										</Card>
										<Card size="sm">
											<Card.Content>
												<DescriptionList
													items={[
														{
															label: 'Payments',
															value: `${customer.payments}\u00a0· 1 disputed`,
														},
													]}
												/>
											</Card.Content>
										</Card>
										<Card size="sm">
											<Card.Content>
												<DescriptionList
													items={[
														{
															label: 'Customer since',
															value: (
																<DateText
																	format="d MMM yyyy"
																	size="inherit"
																	value={customer.createdAt}
																/>
															),
														},
													]}
												/>
											</Card.Content>
										</Card>
									</Grid>
									<Section
										action={
											<Button
												href="#payments"
												size="sm"
												variant="link-muted"
											>
												View all
											</Button>
										}
										title="Recent payments"
									>
										<PaymentsTable
											columns={[
												'amount',
												'description',
												'date',
												'actions',
											]}
											items={PAYMENTS.filter(
												(item) => item.customer === customer.name,
											).concat(PAYMENTS.slice(6, 8))}
										/>
									</Section>
								</Flex>
							</Grid.Item>
							<Section title="Details">
								<DescriptionList
									items={[
										{
											copyable: true,
											label: 'Customer ID',
											value: customer.id,
										},
										{
											copyable: true,
											label: 'Email',
											value: customer.email,
										},
										{
											label: 'Country',
											value: customer.country,
										},
										{
											label: 'Default payment method',
											value: 'Card •••• 5454',
										},
										{
											label: 'Tax ID',
											value: null,
										},
									]}
								/>
							</Section>
						</Grid>
					</Tabs.Content>
				</Tabs>
			</Page>
		</Layout.Content>
	)
}

/** The peek: the record over the list, and the way to its full page. */
function PeekSheet() {
	const [open, setOpen] = useState(true)

	return (
		<BackofficeShell active="payments">
			<Layout.Content maxWidth="lg">
				<Page>
					<Page.Header title="Payments" />
					<Page.Content>
						<PaymentsTable
							activeKey={open ? payment.id : undefined}
							items={PAYMENTS}
							onRowClick={() => setOpen(true)}
						/>
					</Page.Content>
				</Page>
			</Layout.Content>
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
					<Sheet.Header.Title>{payment.description}</Sheet.Header.Title>
				</Sheet.Header>
				<Sheet.Body>
					<PaymentPreview payment={payment} />
				</Sheet.Body>
				<Sheet.Footer bordered>
					<Flex
						align="center"
						justify="end"
					>
						<Button
							href="#payment"
							rightSection={<ExternalLinkIcon size={14} />}
							variant="outline"
						>
							Open full page
						</Button>
					</Flex>
				</Sheet.Footer>
			</Sheet>
		</BackofficeShell>
	)
}

/**
 * Reading one record, the payments-dashboard way: breadcrumbs, the title with
 * its ID and a copy control, the status as a badge, actions at the far end,
 * then sections stacked in a primary column with the key/value Details in a
 * secondary one. Tabs appear only where the record owns collections — a
 * customer — and the sheet is a peek that leads to the page.
 */
export function Details({ variant }: { variant: DetailsVariant }) {
	if (variant === 'sheet') {
		return <PeekSheet />
	}

	return (
		<BackofficeShell active={variant === 'page' ? 'payments' : 'customers'}>
			{variant === 'page' ? <PaymentPage /> : <CustomerPage />}
		</BackofficeShell>
	)
}
