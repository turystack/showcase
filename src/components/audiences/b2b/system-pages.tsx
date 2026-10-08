import {
	ArrowLeftIcon,
	CloudOffIcon,
	HelpIcon,
	LockIcon,
	RotateCwIcon,
	ServerIcon,
	SettingsIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Avatar,
	Button,
	Card,
	CopyButton,
	EmptyState,
	Flex,
	Layout,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { CrmShell } from './crm-shell'

import { AcmeLogo } from '@/components/audiences/acme-logo'

/**
 * The pages shown instead of the one asked for.
 *
 * The signed-in ones keep the shell, so the person is still somewhere they
 * know and the navigation is still the way out. 403 names who can grant
 * access — "ask your admin" is useless without the admin's name. 500 gives a
 * reference to quote to support. `maintenance` has no shell, because nothing
 * behind it works; `offline` keeps the shell and says so in a banner, because
 * what is already on screen still reads.
 */
export type SystemPagesVariant =
	| 'forbidden'
	| 'not-found'
	| 'server-error'
	| 'maintenance'
	| 'offline'

function Centred({ children }: { children: ReactNode }) {
	return (
		<Layout.Content maxWidth="sm">
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				{children}
			</Flex>
		</Layout.Content>
	)
}

function Forbidden() {
	return (
		<Centred>
			<EmptyState
				action={
					<Flex
						align="center"
						gap="sm"
					>
						<Button>Request access</Button>
						<Button
							leftSection={<ArrowLeftIcon size={16} />}
							variant="ghost"
						>
							Back to Home
						</Button>
					</Flex>
				}
				description="Your role, Sales rep, can’t open Reports. An admin of Acme Logistics can give you access."
				headingLevel={1}
				icon={<LockIcon size={28} />}
				size="lg"
				title="You don’t have access to Reports"
			/>
			<Card size="sm">
				<Card.Content>
					<Flex
						align="center"
						gap="md"
						justify="between"
					>
						<Flex
							align="center"
							gap="sm"
						>
							<Avatar
								alt=""
								size="sm"
							>
								AR
							</Avatar>
							<Flex
								align="stretch"
								direction="col"
								gap="none"
							>
								<Typography
									size="sm"
									weight="medium"
								>
									Ana Ribeiro
								</Typography>
								<Typography
									size="xs"
									variant="muted"
								>
									Workspace admin · ana.ribeiro@acme.example
								</Typography>
							</Flex>
						</Flex>
						<Button
							size="sm"
							variant="outline"
						>
							Ask Ana
						</Button>
					</Flex>
				</Card.Content>
			</Card>
		</Centred>
	)
}

function NotFound() {
	return (
		<Centred>
			<EmptyState
				action={
					<Flex
						align="center"
						gap="sm"
					>
						<Button>Go to Deals</Button>
						<Button variant="ghost">Search for it</Button>
					</Flex>
				}
				description="The deal D-0987 may have been deleted, merged into another, or the link is mistyped. Deleted deals stay in the recycle bin for 15 days."
				headingLevel={1}
				icon={<HelpIcon size={28} />}
				size="lg"
				title="We couldn’t find that deal"
			/>
		</Centred>
	)
}

function ServerError() {
	return (
		<Centred>
			<EmptyState
				action={
					<Flex
						align="center"
						gap="sm"
					>
						<Button leftSection={<RotateCwIcon size={16} />}>Try again</Button>
						<Button variant="ghost">Status page</Button>
					</Flex>
				}
				description="The page failed to load on our side. Your data is safe; trying again usually works."
				headingLevel={1}
				icon={<ServerIcon size={28} />}
				size="lg"
				title="Something went wrong"
			/>
			<Flex
				align="center"
				gap="xs"
				justify="center"
			>
				<Typography
					size="xs"
					variant="muted"
				>
					Reference for support: ERR-7F3A-2291
				</Typography>
				<CopyButton
					ariaLabel="Copy the reference"
					size="xs"
					value="ERR-7F3A-2291"
				/>
			</Flex>
		</Centred>
	)
}

function Maintenance() {
	return (
		<Layout
			height="fill"
			variant="centered"
		>
			<Layout.Main>
				<Layout.Content maxWidth="sm">
					<Flex
						align="stretch"
						direction="col"
						gap="lg"
					>
						<Flex justify="center">
							<AcmeLogo />
						</Flex>
						<Card>
							<Card.Content>
								<EmptyState
									action={
										<Button variant="outline">Follow on the status page</Button>
									}
									description="We’re upgrading the database. Acme is back by 03:00 (São Paulo time), Saturday 27 September. Nothing you saved is affected."
									headingLevel={1}
									icon={<SettingsIcon size={28} />}
									title="Acme is down for scheduled maintenance"
								/>
							</Card.Content>
						</Card>
					</Flex>
				</Layout.Content>
			</Layout.Main>
		</Layout>
	)
}

export function SystemPages({ variant }: { variant: SystemPagesVariant }) {
	if (variant === 'maintenance') {
		return <Maintenance />
	}

	if (variant === 'offline') {
		return (
			<CrmShell
				active="deals"
				banner={
					<Alert
						layout="banner"
						variant="warning"
					>
						<Alert.Icon>
							<CloudOffIcon />
						</Alert.Icon>
						<Alert.Title>You’re offline</Alert.Title>
						<Alert.Description>
							Changes are saved on this device and sync when you reconnect.
						</Alert.Description>
					</Alert>
				}
			>
				<Centred>
					<EmptyState
						action={
							<Button leftSection={<RotateCwIcon size={16} />}>
								Try again
							</Button>
						}
						description="Deals couldn’t load without a connection. Records you opened recently are still available."
						headingLevel={1}
						icon={<CloudOffIcon size={28} />}
						size="lg"
						title="No connection"
					/>
				</Centred>
			</CrmShell>
		)
	}

	return (
		<CrmShell active={variant === 'forbidden' ? 'reports' : 'deals'}>
			{variant === 'forbidden' && <Forbidden />}
			{variant === 'not-found' && <NotFound />}
			{variant === 'server-error' && <ServerError />}
		</CrmShell>
	)
}
