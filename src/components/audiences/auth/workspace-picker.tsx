import { PlusIcon } from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Button,
	Card,
	Flex,
	List,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { usePending } from '@/components/audiences/auth/auth-form'
import { AuthShell, settle, stay } from '@/components/audiences/auth/auth-shell'

export type WorkspacePickerVariant = 'several'

/**
 * The step-two list as the API returns it: each `membership` row with the
 * organization, workspace and role it points at embedded by table name.
 */
type Membership = {
	membership_id: string
	organization: {
		name: string
	}
	role: {
		name: string
	}
	workspace: {
		name: string
	} | null
}

const MEMBERSHIPS: Membership[] = [
	{
		membership_id: '01930f4c-2b90-7c81-84d2-3a7e1c9f5b00',
		organization: {
			name: 'Acme Logistics',
		},
		role: {
			name: 'Owner',
		},
		workspace: null,
	},
	{
		membership_id: '01930f4c-2b90-7c81-84d2-3a7e1c9f5b01',
		organization: {
			name: 'Northwind Travel',
		},
		role: {
			name: 'Operations manager',
		},
		workspace: {
			name: 'Operations',
		},
	},
	{
		membership_id: '01930f4c-2b90-7c81-84d2-3a7e1c9f5b02',
		organization: {
			name: 'Globex Tours',
		},
		role: {
			name: 'Viewer',
		},
		workspace: null,
	},
]

/** The organization, then the workspace after a dot when there is one. */
function scopeName(membership: Membership): string {
	return membership.workspace
		? `${membership.organization.name} · ${membership.workspace.name}`
		: membership.organization.name
}

/** Up to two initials, for the avatar. */
function initials(name: string): string {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((word) => word.charAt(0).toUpperCase())
		.join('')
}

/**
 * After signing in, before any screen: where to act (IAM-7, step two).
 *
 * A person is one account and many memberships — an organization, sometimes
 * one workspace inside it, and a role there. Each row of the `List` is a small
 * `Card` with the role as a `Badge` under the name, because the same person
 * is an owner in one place and a viewer in another. Accounts with zero or one
 * membership skip this screen; that decision is the app's, not the list's.
 */
export function WorkspacePicker({
	variant: _variant,
}: {
	variant: WorkspacePickerVariant
}) {
	const select = usePending()
	const [opening, setOpening] = useState<string>()

	const open = (membership: Membership) => {
		setOpening(membership.membership_id)
		void select.run(settle)
	}

	return (
		<AuthShell
			footer={
				<Flex justify="center">
					<Typography
						component="p"
						size="sm"
						variant="muted"
					>
						Signed in as you@example.com.{' '}
						<Button
							onClick={stay}
							size="sm"
							variant="link"
						>
							Sign out
						</Button>
					</Typography>
				</Flex>
			}
		>
			<Card>
				<Card.Header>
					<Card.Title headingLevel={1}>Choose a workspace</Card.Title>
					<Card.Description>
						You can switch later from the menu
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Flex
						direction="col"
						gap="sm"
					>
						<List
							ariaLabel="Choose a workspace"
							gap="sm"
							itemKey="membership_id"
							items={MEMBERSHIPS}
							renderItem={(membership) => {
								const name = scopeName(membership)
								const active =
									select.pending && opening === membership.membership_id
								return (
									<Card size="sm">
										<Card.Content>
											<Flex
												align="center"
												gap="sm"
												justify="between"
											>
												<Flex
													align="center"
													gap="sm"
												>
													<Avatar
														alt={membership.organization.name}
														size="sm"
														variant="square"
													>
														{initials(membership.organization.name)}
													</Avatar>
													<Flex
														direction="col"
														gap="xs"
													>
														<Typography
															component="span"
															size="sm"
															weight="semibold"
														>
															{name}
														</Typography>
														<Flex>
															<Badge
																size="sm"
																variant="secondary"
															>
																{membership.role.name}
															</Badge>
														</Flex>
													</Flex>
												</Flex>
												<Button
													ariaLabel={`Open ${name}`}
													disabled={select.pending && !active}
													loading={active}
													onClick={() => open(membership)}
													size="sm"
													variant="outline"
												>
													Open
												</Button>
											</Flex>
										</Card.Content>
									</Card>
								)
							}}
						/>

						<Button
							block
							leftSection={<PlusIcon size={16} />}
							onClick={stay}
							variant="ghost"
						>
							Create a workspace
						</Button>
					</Flex>
				</Card.Content>
			</Card>
		</AuthShell>
	)
}
