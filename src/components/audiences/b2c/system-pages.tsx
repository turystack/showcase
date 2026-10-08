import {
	CloudOffIcon,
	CompassIcon,
	LockIcon,
	RefreshCwIcon,
	ServerIcon,
	SettingsIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Button,
	EmptyState,
	Flex,
	Layout,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { MinimalShell } from '@/components/audiences/b2c/app-shell'

/**
 * The pages shown instead of the one asked for, all on the minimal shell:
 * a page that failed should not also offer twenty links that may fail too.
 *
 * - `forbidden` — for a consumer a 403 is almost always "you are not signed
 *   in", so it says that and offers the sign-in, not an error code
 * - `not-found` — the address points at nothing
 * - `server-error` — our fault, said plainly, with a retry and a reference
 * - `maintenance` — down on purpose, and until when
 * - `offline` — the connection, not the product: a banner across the shell
 *   and a retry, because the page will work the moment the network does
 */
export type SystemPagesVariant =
	| 'forbidden'
	| 'not-found'
	| 'server-error'
	| 'maintenance'
	| 'offline'

function Reference({ children }: { children: ReactNode }) {
	return (
		<Flex justify="center">
			<Typography
				component="p"
				size="xs"
				variant="muted"
			>
				{children}
			</Typography>
		</Flex>
	)
}

export function SystemPages({ variant }: { variant: SystemPagesVariant }) {
	if (variant === 'forbidden') {
		return (
			<MinimalShell
				centered
				signedIn={false}
			>
				<Layout.Content maxWidth="sm">
					<EmptyState
						action={
							<Flex
								align="stretch"
								direction="col"
								gap="sm"
							>
								<Button
									href="#"
									size="lg"
								>
									Sign in
								</Button>
								<Button
									href="#"
									variant="link"
								>
									Create an account
								</Button>
							</Flex>
						}
						description="Your orders, addresses and saved cards are only shown to you. Sign in and we’ll bring you straight back here."
						headingLevel={1}
						icon={<LockIcon />}
						size="lg"
						title="Sign in to continue"
					/>
				</Layout.Content>
			</MinimalShell>
		)
	}

	if (variant === 'not-found') {
		return (
			<MinimalShell centered>
				<Layout.Content maxWidth="sm">
					<EmptyState
						action={
							<Flex
								gap="sm"
								justify="center"
								wrap="wrap"
							>
								<Button href="#">Go to Home</Button>
								<Button
									href="#"
									variant="outline"
								>
									Search stores
								</Button>
							</Flex>
						}
						description="The link may be old, or the store may have left Acme. Nothing you did went wrong."
						headingLevel={1}
						icon={<CompassIcon />}
						size="lg"
						title="This page doesn’t exist"
					/>
					<Reference>Error 404</Reference>
				</Layout.Content>
			</MinimalShell>
		)
	}

	if (variant === 'server-error') {
		return (
			<MinimalShell centered>
				<Layout.Content maxWidth="sm">
					<EmptyState
						action={
							<Flex
								gap="sm"
								justify="center"
								wrap="wrap"
							>
								<Button leftSection={<RefreshCwIcon size={16} />}>
									Try again
								</Button>
								<Button
									href="#"
									variant="outline"
								>
									Contact support
								</Button>
							</Flex>
						}
						description="Something failed on our side. Your cart is saved and nothing was charged."
						headingLevel={1}
						icon={<ServerIcon />}
						size="lg"
						title="We couldn’t load this page"
					/>
					<Reference>Error 500 · reference 7f3a-91c2</Reference>
				</Layout.Content>
			</MinimalShell>
		)
	}

	if (variant === 'maintenance') {
		return (
			<MinimalShell
				banner={
					<Alert
						layout="banner"
						variant="warning"
					>
						<Alert.Icon>
							<SettingsIcon />
						</Alert.Icon>
						<Alert.Title>Scheduled maintenance</Alert.Title>
						<Alert.Description>
							Ordering is paused from 03:00 to 04:30 (Brasília time).
						</Alert.Description>
					</Alert>
				}
				centered
			>
				<Layout.Content maxWidth="sm">
					<EmptyState
						action={
							<Button
								external
								href="https://example.com/acme"
								variant="outline"
							>
								Follow @acme for updates
							</Button>
						}
						description="We’re upgrading payments. Orders already on their way are not affected, and we’ll be back by 04:30."
						headingLevel={1}
						icon={<SettingsIcon />}
						size="lg"
						title="Back at 04:30"
					/>
				</Layout.Content>
			</MinimalShell>
		)
	}

	return (
		<MinimalShell
			banner={
				<Alert
					layout="banner"
					variant="destructive"
				>
					<Alert.Icon>
						<CloudOffIcon />
					</Alert.Icon>
					<Alert.Title>You’re offline</Alert.Title>
					<Alert.Description>
						Check your connection. We’ll reconnect on our own.
					</Alert.Description>
				</Alert>
			}
			centered
		>
			<Layout.Content maxWidth="sm">
				<EmptyState
					action={
						<Button leftSection={<RefreshCwIcon size={16} />}>Retry</Button>
					}
					description="This page needs a connection to show stores near you. Your cart is kept on this device."
					headingLevel={1}
					icon={<CloudOffIcon />}
					size="lg"
					title="No internet connection"
				/>
			</Layout.Content>
		</MinimalShell>
	)
}
