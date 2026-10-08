import {
	CloudOffIcon,
	RepeatIcon,
	SearchIcon,
	UploadIcon,
	UserPlusIcon,
	UsersIcon,
} from '@turystack/react-icons'
import {
	Button,
	Card,
	Checklist,
	DescriptionList,
	EmptyState,
	FilterBar,
	FilterChip,
	Flex,
	Grid,
	Layout,
	MoneyText,
	Page,
	Table,
} from '@turystack/react-web'
import { useState } from 'react'

import { CUSTOMERS } from './data'
import { PaymentsTable, paymentColumns } from './payments-table'
import { BackofficeShell, DocsLink } from './shell'

/**
 * - `first-run`  — a new account: the setup checklist, before any data
 * - `empty`      — a collection with nothing in it yet
 * - `no-results` — filters that matched nothing
 * - `section`    — one empty block inside a page that has content
 * - `error`      — the read failed, and how to try again
 */
export type EmptyStateVariant =
	| 'first-run'
	| 'empty'
	| 'no-results'
	| 'section'
	| 'error'

/** A new account's home: the steps before anything else is worth showing. */
function FirstRun() {
	const [dismissed, setDismissed] = useState(false)

	return (
		<Layout.Content maxWidth="md">
			<Page>
				<Page.Header
					description="A few steps and you can take your first real payment."
					title="Welcome to Acme, Ana"
				/>
				<Page.Content>
					{!dismissed && (
						<Card size="sm">
							<Card.Content>
								<Checklist
									collapsible
									items={[
										{
											done: true,
											id: 'email',
											label: 'Verify your email',
										},
										{
											done: true,
											id: 'business',
											label: 'Add your business details',
										},
										{
											action: <Button size="sm">Add bank account</Button>,
											description:
												'Where your payouts arrive, two days after each sale.',
											done: false,
											id: 'bank',
											label: 'Add a bank account',
										},
										{
											action: (
												<Button
													size="sm"
													variant="outline"
												>
													Invite teammates
												</Button>
											),
											description: 'Give support and finance their own logins.',
											done: false,
											id: 'team',
											label: 'Invite your team',
										},
										{
											action: (
												<Button
													size="sm"
													variant="outline"
												>
													Create test payment
												</Button>
											),
											description: 'Try the whole flow in the sandbox first.',
											done: false,
											id: 'test',
											label: 'Make a test payment',
										},
									]}
									onDismiss={() => setDismissed(true)}
									title="Set up your account"
								/>
							</Card.Content>
						</Card>
					)}
					<Grid
						cols={2}
						gap="md"
					>
						<EmptyState
							bordered="dashed"
							description="Figures appear after your first payment."
							headingLevel={2}
							size="sm"
							title="No volume yet"
						/>
						<EmptyState
							bordered="dashed"
							description="Your first payout is scheduled after your first sale."
							headingLevel={2}
							size="sm"
							title="No payouts yet"
						/>
					</Grid>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/** The title names what is missing; the action echoes it. */
function Empty() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header title="Customers" />
				<Page.Content>
					<Card>
						<Card.Content>
							<EmptyState
								action={
									<Flex
										align="center"
										gap="sm"
										justify="center"
									>
										<Button leftSection={<UserPlusIcon size={14} />}>
											Create customer
										</Button>
										<Button
											leftSection={<UploadIcon size={14} />}
											variant="outline"
										>
											Import customers
										</Button>
									</Flex>
								}
								description="Customers are the people and companies you charge or invoice."
								headingLevel={2}
								icon={<UsersIcon size={28} />}
								size="lg"
								title="No customers yet"
							/>
						</Card.Content>
					</Card>
					<Flex justify="center">
						<DocsLink>Read how customers work</DocsLink>
					</Flex>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/** Filtered to nothing: the way out is the filters, never "create". */
function NoResults() {
	const [amount, setAmount] = useState<string | undefined>('over R$ 50.000,00')
	const [status, setStatus] = useState<string | undefined>('Disputed')

	const clear = () => {
		setAmount(undefined)
		setStatus(undefined)
	}

	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header title="Payments" />
				<Page.Toolbar>
					<FilterBar onClear={clear}>
						<FilterChip label="Date" />
						<FilterChip
							label="Amount"
							onRemove={() => setAmount(undefined)}
							value={amount}
						/>
						<FilterChip
							label="Status"
							onRemove={() => setStatus(undefined)}
							value={status}
						/>
						<FilterChip label="Payment method" />
					</FilterBar>
				</Page.Toolbar>
				<Page.Content>
					<PaymentsTable
						emptySection={
							<EmptyState
								action={
									<Button
										onClick={clear}
										size="sm"
										variant="outline"
									>
										Clear filters
									</Button>
								}
								description="Try a wider amount, or another status."
								headingLevel={2}
								icon={<SearchIcon size={24} />}
								title="No payments match these filters"
							/>
						}
						items={[]}
					/>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/** One block of a page has nothing; the rest of the page does. */
function Section() {
	const customer = CUSTOMERS[0]

	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					breadcrumbs={[
						{
							href: '#customers',
							label: 'Customers',
						},
						{
							label: customer.id,
						},
					]}
					title={customer.name}
				/>
				<Page.Content>
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
								<Card size="sm">
									<Card.Header bordered>
										<Card.Title headingLevel={2}>Subscriptions</Card.Title>
									</Card.Header>
									<Card.Content>
										<EmptyState
											action={
												<Button
													leftSection={<RepeatIcon size={14} />}
													size="sm"
													variant="outline"
												>
													Create subscription
												</Button>
											}
											bordered="dashed"
											description="Charge this customer on a schedule."
											headingLevel={3}
											size="sm"
											title="No subscriptions"
										/>
									</Card.Content>
								</Card>
								<Card size="sm">
									<Card.Header bordered>
										<Card.Title headingLevel={2}>Invoices</Card.Title>
									</Card.Header>
									<Card.Content>
										<EmptyState
											bordered="dashed"
											description="Invoices you send this customer appear here."
											headingLevel={3}
											size="sm"
											title="No invoices"
										/>
									</Card.Content>
								</Card>
							</Flex>
						</Grid.Item>
						<Card size="sm">
							<Card.Header bordered>
								<Card.Title headingLevel={2}>Details</Card.Title>
							</Card.Header>
							<Card.Content>
								<DescriptionList
									items={[
										{
											copyable: true,
											label: 'Customer ID',
											value: customer.id,
										},
										{
											label: 'Email',
											value: customer.email,
										},
										{
											label: 'Total spent',
											value: (
												<MoneyText
													currency="brl"
													size="sm"
													value={customer.spent}
												/>
											),
										},
									]}
								/>
							</Card.Content>
						</Card>
					</Grid>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/**
 * The read failed. The table keeps its header, so the reader still knows
 * which page this is; the body says what went wrong and offers the retry.
 */
function Failed() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header title="Payments" />
				<Page.Content>
					<Table
						columns={paymentColumns()}
						density="compact"
						errorSection={
							<EmptyState
								action={
									<Button
										size="sm"
										variant="outline"
									>
										Try again
									</Button>
								}
								description="The request timed out. Nothing was changed."
								headingLevel={2}
								icon={<CloudOffIcon size={24} />}
								title="Payments could not be loaded"
							/>
						}
						itemKey="id"
						outcome={{
							error: new Error('Request timed out'),
							retry: () => undefined,
							status: 'error',
						}}
					/>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/**
 * Empty states: a title that says what is missing, a line under 14
 * words, an action that echoes the title and never "Get started". A first run
 * gets the setup checklist; a filtered list offers the filters back, not a
 * create button; an empty section inside a page is a dashed box; a failed read
 * keeps the table and offers a retry.
 */
export function EmptyStates({ variant }: { variant: EmptyStateVariant }) {
	return (
		<BackofficeShell
			active={
				variant === 'first-run'
					? 'home'
					: variant === 'empty' || variant === 'section'
						? 'customers'
						: 'payments'
			}
		>
			{variant === 'first-run' && <FirstRun />}
			{variant === 'empty' && <Empty />}
			{variant === 'no-results' && <NoResults />}
			{variant === 'section' && <Section />}
			{variant === 'error' && <Failed />}
		</BackofficeShell>
	)
}
