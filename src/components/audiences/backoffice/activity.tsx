import {
	CreditCardIcon,
	DownloadIcon,
	MailIcon,
	RotateCcwIcon,
	ShieldAlertIcon,
	UserRoundIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	type BadgeVariant,
	Button,
	Card,
	CodeBlock,
	CopyButton,
	DateText,
	DescriptionList,
	FilterBar,
	FilterChip,
	Flex,
	Layout,
	MoneyText,
	Page,
	Table,
	type TableColumns,
	Tabs,
	Timeline,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { OPEN_PAYMENT } from './data'
import { PaymentStatusBadge } from './payments-table'
import { BackofficeShell } from './shell'

/**
 * - `timeline` — the history of one record, newest first
 * - `log`      — every API request, filterable, with the payload beside it
 */
export type ActivityVariant = 'timeline' | 'log'

type LogEntry = {
	at: Date
	duration: number // milliseconds
	id: string
	method: 'GET' | 'POST' | 'DELETE'
	path: string
	source: string
	status: number
}

const LOGS: LogEntry[] = [
	{
		at: new Date(2026, 8, 26, 10, 52, 14),
		duration: 412,
		id: 'req_8mQ2vX7cLp0Rz1',
		method: 'POST',
		path: '/v1/payments',
		source: 'Checkout web',
		status: 200,
	},
	{
		at: new Date(2026, 8, 26, 10, 51, 58),
		duration: 1_204,
		id: 'req_4kN9tB2wHs6Yd3',
		method: 'POST',
		path: '/v1/refunds',
		source: 'Dashboard',
		status: 402,
	},
	{
		at: new Date(2026, 8, 26, 10, 51, 40),
		duration: 88,
		id: 'req_1pV5rM8qJx2Fe7',
		method: 'GET',
		path: '/v1/customers/cus_S2hK7cDf4Gj8Rv',
		source: 'Back office',
		status: 200,
	},
	{
		at: new Date(2026, 8, 26, 10, 50, 3),
		duration: 30_000,
		id: 'req_7wD3yK6nGt9Uc4',
		method: 'POST',
		path: '/v1/webhook_endpoints/we_1Q2/test',
		source: 'Dashboard',
		status: 503,
	},
	{
		at: new Date(2026, 8, 26, 10, 48, 27),
		duration: 97,
		id: 'req_2sF8uL4bNq1Wa5',
		method: 'POST',
		path: '/v1/payments',
		source: 'Checkout web',
		status: 400,
	},
	{
		at: new Date(2026, 8, 26, 10, 46, 11),
		duration: 64,
		id: 'req_9hT1eP7vCz3Kb8',
		method: 'DELETE',
		path: '/v1/subscriptions/sub_1Qk',
		source: 'Back office',
		status: 200,
	},
	{
		at: new Date(2026, 8, 26, 10, 44, 55),
		duration: 355,
		id: 'req_5cJ6gR2mYw8Lh0',
		method: 'POST',
		path: '/v1/payments',
		source: 'Public API',
		status: 200,
	},
	{
		at: new Date(2026, 8, 26, 10, 42, 9),
		duration: 71,
		id: 'req_3aX4dS9kVe5Pn2',
		method: 'GET',
		path: '/v1/balance',
		source: 'Back office',
		status: 200,
	},
]

function statusVariant(status: number): BadgeVariant {
	if (status >= 500) {
		return 'destructive'
	}

	if (status >= 400) {
		return 'warning'
	}

	return 'success'
}

const STATUS_TEXT: Record<number, string> = {
	200: 'OK',
	400: 'Bad request',
	402: 'Request failed',
	503: 'Unavailable',
}

const LOG_COLUMNS: TableColumns<LogEntry> = [
	{
		key: 'status',
		label: 'Status',
		selector: (row) => (
			<Badge
				size="sm"
				variant={statusVariant(row.status)}
			>
				{row.status} {STATUS_TEXT[row.status]}
			</Badge>
		),
		width: 150,
	},
	{
		key: 'request',
		label: 'Request',
		selector: (row) => (
			<Flex
				align="center"
				gap="xs"
			>
				<Badge
					size="sm"
					variant="outline"
				>
					{row.method}
				</Badge>
				<Typography
					size="sm"
					truncate
				>
					{row.path}
				</Typography>
			</Flex>
		),
		width: 320,
	},
	{
		key: 'source',
		label: 'Source',
		selector: (row) => (
			<Typography
				noWrap
				size="sm"
				variant="muted"
			>
				{row.source}
			</Typography>
		),
		width: 130,
	},
	{
		align: 'right',
		key: 'at',
		label: 'Time',
		selector: (row) => (
			<DateText
				format="HH:mm:ss"
				muted
				size="sm"
				value={row.at}
			/>
		),
		width: 90,
	},
]

const REQUEST_BODY = {
	amount: 74_990,
	currency: 'brl',
	payment: 'py_3QxL2wP8hJvKYlo45',
	reason: 'requested_by_customer',
}

const RESPONSE_BODY = {
	error: {
		code: 'charge_disputed',
		doc_url: 'https://docs.acme.example/errors#charge_disputed',
		message:
			'This payment has an open dispute and cannot be refunded until the dispute is closed.',
		payment: 'py_3QxL2wP8hJvKYlo45',
		type: 'invalid_request_error',
	},
}

/** The right-hand pane: one request, its metadata, and both bodies. */
function Inspector({ entry }: { entry: LogEntry }) {
	return (
		<Card size="sm">
			<Card.Header bordered>
				<Flex
					align="stretch"
					direction="col"
					gap="xs"
				>
					<Flex
						align="center"
						gap="sm"
					>
						<Badge
							size="sm"
							variant={statusVariant(entry.status)}
						>
							{entry.status} {STATUS_TEXT[entry.status]}
						</Badge>
						<Card.Title headingLevel={2}>
							{entry.method} {entry.path}
						</Card.Title>
					</Flex>
					<Flex
						align="center"
						gap="xs"
					>
						<Typography
							size="xs"
							variant="muted"
						>
							{entry.id}
						</Typography>
						<CopyButton
							size="xs"
							value={entry.id}
						/>
					</Flex>
				</Flex>
			</Card.Header>
			<Card.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<DescriptionList
						columns={2}
						items={[
							{
								label: 'Time',
								value: (
									<DateText
										format="d MMM yyyy, HH:mm:ss"
										size="inherit"
										value={entry.at}
									/>
								),
							},
							{
								label: 'Duration',
								value: `${entry.duration.toLocaleString('pt-BR')} ms`,
							},
							{
								label: 'Source',
								value: entry.source,
							},
							{
								label: 'IP address',
								value: '177.92.14.201',
							},
							{
								label: 'API version',
								value: '2026-08-01',
							},
							{
								copyable: true,
								label: 'Idempotency key',
								value: 'rf-10479-01',
							},
						]}
					/>
					<Tabs
						block
						defaultValue="response"
					>
						<Tabs.List ariaLabel="Request and response bodies">
							<Tabs.Trigger value="response">Response body</Tabs.Trigger>
							<Tabs.Trigger value="request">Request body</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="response">
							<CodeBlock
								lineNumbers
								maxHeight="md"
								value={RESPONSE_BODY}
								wrap
							/>
						</Tabs.Content>
						<Tabs.Content value="request">
							<CodeBlock
								lineNumbers
								maxHeight="md"
								value={REQUEST_BODY}
							/>
						</Tabs.Content>
					</Tabs>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/** Requests in a compact table, the selected one opened in the inspector. */
function RequestLog() {
	const [openId, setOpenId] = useState(LOGS[1].id)
	const [status, setStatus] = useState<string | undefined>('Failed')
	const open = LOGS.find((entry) => entry.id === openId) ?? LOGS[1]

	return (
		<>
			<Layout.Content span={3}>
				<Page>
					<Page.Header
						action={
							<Button
								leftSection={<DownloadIcon size={14} />}
								size="sm"
								variant="outline"
							>
								Export
							</Button>
						}
						description="Every request made with this account's keys."
						title="Logs"
					/>
					<Page.Toolbar>
						<FilterBar onClear={() => setStatus(undefined)}>
							<FilterChip
								label="Status"
								onRemove={() => setStatus(undefined)}
								value={status}
							/>
							<FilterChip label="Method" />
							<FilterChip label="Endpoint" />
							<FilterChip label="Source" />
							<FilterChip
								label="Date"
								value="Today"
							/>
						</FilterBar>
					</Page.Toolbar>
					<Page.Content>
						<Table
							activeKey={openId}
							columns={LOG_COLUMNS}
							density="compact"
							itemKey="id"
							items={LOGS}
							onRowClick={(row) => setOpenId(row.id)}
							pagination={{
								hasNextPage: true,
								mode: 'cursor',
								rowsPerPage: 20,
							}}
						/>
					</Page.Content>
				</Page>
			</Layout.Content>
			<Layout.Content
				bg="muted"
				span={2}
			>
				<Inspector entry={open} />
			</Layout.Content>
		</>
	)
}

/** One payment's life, newest first; each entry says who and what. */
function RecordTimeline() {
	return (
		<Layout.Content maxWidth="md">
			<Page>
				<Page.Header
					breadcrumbs={[
						{
							href: '#payments',
							label: 'Payments',
						},
						{
							href: '#payment',
							label: OPEN_PAYMENT.description,
						},
						{
							label: 'Activity',
						},
					]}
					description={`${OPEN_PAYMENT.customer}\u00a0· ${OPEN_PAYMENT.id}`}
					title="Activity"
				/>
				<Page.Content>
					<Card size="sm">
						<Card.Content>
							<Timeline>
								<Timeline.Item
									icon={<ShieldAlertIcon size={14} />}
									meta={'26 Sep 2026, 10:51\u00a0· by the issuer'}
									status="error"
									title="Dispute opened: product not received"
								>
									<Flex
										align="start"
										direction="col"
										gap="sm"
									>
										<Typography
											size="sm"
											variant="muted"
										>
											<MoneyText
												currency="brl"
												size="inherit"
												value={OPEN_PAYMENT.amount}
											/>{' '}
											withheld until the dispute closes. Evidence is due 3 Oct.
										</Typography>
										<Button
											size="sm"
											variant="outline"
										>
											Submit evidence
										</Button>
									</Flex>
								</Timeline.Item>
								<Timeline.Item
									icon={<RotateCcwIcon size={14} />}
									meta={'25 Sep 2026, 16:40\u00a0· Ana Ribeiro'}
									status="error"
									title="Refund attempt declined"
								>
									<Typography
										size="sm"
										variant="muted"
									>
										The payment was already under review by the issuer.
									</Typography>
								</Timeline.Item>
								<Timeline.Item
									icon={<MailIcon size={14} />}
									meta={'25 Sep 2026, 16:28\u00a0· automatic'}
									status="done"
									title="Receipt sent to lucas.ferreira@example.com"
								/>
								<Timeline.Item
									icon={<CreditCardIcon size={14} />}
									meta="25 Sep 2026, 16:27"
									status="done"
									title="Payment succeeded"
								>
									<Flex
										align="center"
										gap="xs"
									>
										<PaymentStatusBadge status="succeeded" />
										<Typography
											size="sm"
											variant="muted"
										>
											{OPEN_PAYMENT.method}&nbsp;· 3-D Secure passed
										</Typography>
									</Flex>
								</Timeline.Item>
								<Timeline.Item
									icon={<UserRoundIcon size={14} />}
									meta="25 Sep 2026, 16:26"
									status="done"
									title="Customer created from checkout"
								>
									<Flex
										align="center"
										gap="xs"
									>
										<Avatar
											alt="Lucas Ferreira"
											size="sm"
										>
											LF
										</Avatar>
										<Typography
											size="sm"
											variant="muted"
										>
											Lucas Ferreira&nbsp;· Portugal
										</Typography>
									</Flex>
								</Timeline.Item>
							</Timeline>
						</Card.Content>
					</Card>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/**
 * Two readings of "who did what, and when".
 *
 * `timeline` is one record's history, the way it sits on a detail page: every
 * entry says what happened, who or what did it, and — when it needs a person —
 * the action. `log` is a developer workbench: a compact table of requests with
 * status chips, and the selected one open beside it with its metadata and the
 * request and response bodies.
 */
export function Activity({ variant }: { variant: ActivityVariant }) {
	if (variant === 'log') {
		return (
			<BackofficeShell
				active="developers"
				nav="collapsed"
			>
				<RequestLog />
			</BackofficeShell>
		)
	}

	return (
		<BackofficeShell active="payments">
			<RecordTimeline />
		</BackofficeShell>
	)
}
