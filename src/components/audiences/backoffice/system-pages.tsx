import {
	CompassIcon,
	LockIcon,
	PlusIcon,
	ServerIcon,
	SettingsIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Badge,
	Button,
	Card,
	CopyButton,
	DescriptionList,
	EmptyState,
	Flex,
	Layout,
	Page,
	Tooltip,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { PAYMENTS } from './data'
import { PaymentsTable } from './payments-table'
import { BackofficeShell, SandboxBanner } from './shell'

/**
 * - `forbidden`    — 403: signed in, not allowed here
 * - `not-found`    — 404: the address points at nothing
 * - `server-error` — 500: our failure, with the request ID support asks for
 * - `maintenance`  — a banner and read-only mode, not a page that blocks
 */
export type SystemPagesVariant =
	| 'forbidden'
	| 'not-found'
	| 'server-error'
	| 'maintenance'

const REQUEST_ID = 'req_7wD3yK6nGt9Uc4'

/** The page the shell holds instead of the one asked for, centred in it. */
function SystemPage({ children, code }: { children: ReactNode; code: string }) {
	return (
		<Layout.Content maxWidth="sm">
			<Flex
				align="center"
				direction="col"
				gap="md"
				justify="center"
				minHeight="lg"
			>
				<Badge
					size="sm"
					variant="outline"
				>
					Error {code}
				</Badge>
				{children}
			</Flex>
		</Layout.Content>
	)
}

function Forbidden() {
	return (
		<SystemPage code="403">
			<EmptyState
				action={
					<Flex
						align="center"
						gap="sm"
						justify="center"
					>
						<Button>Request access</Button>
						<Button
							href="#home"
							variant="outline"
						>
							Back to Home
						</Button>
					</Flex>
				}
				description="Your role, Support specialist, cannot view payouts. An administrator can change that."
				headingLevel={1}
				icon={<LockIcon size={28} />}
				size="lg"
				title="You don't have access to Payouts"
			/>
			<Typography
				size="xs"
				variant="muted"
			>
				Administrators on this account: Ana Ribeiro, Carla Menezes
			</Typography>
		</SystemPage>
	)
}

function NotFound() {
	return (
		<SystemPage code="404">
			<EmptyState
				action={
					<Flex
						align="center"
						gap="sm"
						justify="center"
					>
						<Button href="#home">Back to Home</Button>
						<Button variant="outline">Search payments</Button>
					</Flex>
				}
				description="The link may be old, or the record was deleted. Search finds it by ID."
				headingLevel={1}
				icon={<CompassIcon size={28} />}
				size="lg"
				title="This page doesn't exist"
			/>
			<Typography
				size="xs"
				variant="muted"
			>
				/payments/py_3QxZ0000000000
			</Typography>
		</SystemPage>
	)
}

function ServerError() {
	return (
		<SystemPage code="500">
			<EmptyState
				action={
					<Flex
						align="center"
						gap="sm"
						justify="center"
					>
						<Button>Try again</Button>
						<Button
							href="mailto:ajuda@acme.example"
							variant="outline"
						>
							Contact support
						</Button>
					</Flex>
				}
				description="Nothing you did caused this, and nothing was changed. It usually passes in a minute."
				headingLevel={1}
				icon={<ServerIcon size={28} />}
				size="lg"
				title="Something went wrong on our side"
			/>
			<Card size="sm">
				<Card.Content>
					<Flex
						align="center"
						gap="lg"
						justify="between"
					>
						<DescriptionList
							items={[
								{
									label: 'Request ID — give this to support',
									value: REQUEST_ID,
								},
							]}
						/>
						<CopyButton
							label="Copy"
							value={REQUEST_ID}
							variant="outline"
						/>
					</Flex>
				</Card.Content>
			</Card>
		</SystemPage>
	)
}

/**
 * Maintenance is not a page: the banner says what is paused and until when,
 * and the pages still read — only the actions that would write are disabled.
 */
function Maintenance() {
	return (
		<BackofficeShell
			active="payments"
			banner={
				<Flex
					align="stretch"
					direction="col"
					gap="none"
				>
					<SandboxBanner />
					<Alert
						layout="banner"
						variant="info"
					>
						<Alert.Icon>
							<SettingsIcon size={16} />
						</Alert.Icon>
						<Alert.Title>Scheduled maintenance until 04:00</Alert.Title>
						<Alert.Description>
							You can read everything; creating and refunding payments is
							paused.
						</Alert.Description>
						<Alert.Action>
							<Button
								external
								href="https://status.acme.example"
								size="sm"
								variant="link"
							>
								Status page
							</Button>
						</Alert.Action>
					</Alert>
				</Flex>
			}
		>
			<Layout.Content maxWidth="lg">
				<Page>
					<Page.Header
						action={
							<Tooltip content="Paused during maintenance">
								<Button
									disabled
									leftSection={<PlusIcon size={14} />}
									size="sm"
								>
									Create payment
								</Button>
							</Tooltip>
						}
						title="Payments"
					/>
					<Page.Content>
						<PaymentsTable items={PAYMENTS} />
					</Page.Content>
				</Page>
			</Layout.Content>
		</BackofficeShell>
	)
}

/**
 * The pages shown instead of the one asked for. They stay inside the shell,
 * so the way out — the rail, search — is still there; the 500 carries the
 * request ID with a copy control. Maintenance is a banner and a read-only
 * mode, because a transient problem does not deserve a page that blocks.
 */
export function SystemPages({ variant }: { variant: SystemPagesVariant }) {
	if (variant === 'maintenance') {
		return <Maintenance />
	}

	return (
		<BackofficeShell active={variant === 'forbidden' ? 'payouts' : 'payments'}>
			{variant === 'forbidden' && <Forbidden />}
			{variant === 'not-found' && <NotFound />}
			{variant === 'server-error' && <ServerError />}
		</BackofficeShell>
	)
}
