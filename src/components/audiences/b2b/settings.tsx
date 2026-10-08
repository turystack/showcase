import {
	MailIcon,
	MoreIcon,
	SearchIcon,
	UserPlusIcon,
} from '@turystack/react-icons'
import {
	AnchorNav,
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Confirm,
	DateText,
	DropdownMenu,
	EmptyState,
	Flex,
	Form,
	Grid,
	Identity,
	Input,
	Layout,
	List,
	Modal,
	Page,
	Select,
	Switch,
	Table,
	type TableColumns,
	Tabs,
	Textarea,
	Typography,
} from '@turystack/react-web'
import { type FormEvent, type ReactNode, useState } from 'react'

import { ME } from './crm-data'
import { CrmShell } from './crm-shell'

/**
 * Setup, the CRM way.
 *
 * `vertical-nav` is the enterprise-CRM setup page: every area in a side navigation, with a
 * quick-find field on top because there are dozens of them and nobody learns
 * where "Pipelines" lives. Inside an area only default-style tabs. `anchored`
 * is one area on one long page — the company profile — with an index that
 * follows the scroll, for settings people read top to bottom.
 */
export type SettingsVariant = 'vertical-nav' | 'anchored'

const AREAS = [
	{
		items: [
			'Profile',
			'Notifications',
			'Security',
		],
		label: 'Personal',
	},
	{
		items: [
			'Company profile',
			'Users',
			'Teams',
			'Roles & permissions',
			'Billing',
		],
		label: 'Workspace',
	},
	{
		items: [
			'Objects & fields',
			'Pipelines',
			'Import & export',
		],
		label: 'Data',
	},
	{
		items: [
			'Email & calendar',
			'Connected apps',
		],
		label: 'Integrations',
	},
]

/** The side navigation of Setup, with its quick find. */
export function SettingsNav({ active: initial }: { active: string }) {
	const [active, setActive] = useState(initial)
	const [query, setQuery] = useState<string | null>(null)
	const needle = (query ?? '').trim().toLowerCase()
	const groups = AREAS.map((group) => ({
		...group,
		items: group.items.filter((item) => item.toLowerCase().includes(needle)),
	})).filter((group) => group.items.length > 0)

	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Input
				ariaLabel="Quick find"
				leftSection={<SearchIcon size={16} />}
				onChange={setQuery}
				placeholder="Quick find"
				size="sm"
				value={query}
			/>
			{groups.length === 0 ? (
				<EmptyState
					size="sm"
					title="No setting matches"
				/>
			) : (
				groups.map((group) => (
					<Flex
						align="stretch"
						direction="col"
						gap="xs"
						key={group.label}
					>
						{/* A label for the rail's group, not a heading: the rail comes
						    before the page's h1 in the source. */}
						<Typography
							component="p"
							size="xs"
							variant="muted"
							weight="semibold"
						>
							{group.label}
						</Typography>
						<List
							activeKey={active}
							gap="none"
							itemKey={(item) => item}
							items={group.items}
							onItemClick={setActive}
							renderItem={(item) => (
								<Box
									paddingX="sm"
									paddingY="xs"
								>
									<Typography
										size="sm"
										variant={item === active ? 'default' : 'muted'}
										weight={item === active ? 'medium' : 'normal'}
									>
										{item}
									</Typography>
								</Box>
							)}
						/>
					</Flex>
				))
			)}
		</Flex>
	)
}

/** The workspace's roles, as IAM lists them for this organization. */
const ROLES = [
	{
		description: 'Everything, including billing and users.',
		name: 'Admin',
		role_id: 'role-admin',
	},
	{
		description: 'Owns the team’s pipeline and its forecasts.',
		name: 'Sales manager',
		role_id: 'role-sales-manager',
	},
	{
		description: 'Works their own leads, contacts and deals.',
		name: 'Sales rep',
		role_id: 'role-sales-rep',
	},
	{
		description: 'Sees everything, changes nothing.',
		name: 'Read only',
		role_id: 'role-read-only',
	},
]

/** The teams are workspaces: a membership is scoped to one, or to all. */
const TEAMS = [
	{
		name: 'Enterprise',
		workspace_id: 'ws-enterprise',
	},
	{
		name: 'Mid-market',
		workspace_id: 'ws-mid-market',
	},
	{
		name: 'Finance',
		workspace_id: 'ws-finance',
	},
]

/** A person with access to the organization (IAM `membership`). */
type Membership = {
	created_at: string
	membership_id: string
	role_id: string
	status: 'active' | 'suspended'
	user: {
		email: string
		name: string
		user_id: string
	}
	/** null is the whole organization. */
	workspace_id: string | null
}

/** An offer of access nobody accepted yet (IAM `invitation`). */
type Invitation = {
	created_at: string
	email: string
	expires_at: string
	invitation_id: string
	role_id: string
	status: 'pending'
	workspace_id: string | null
}

const USERS: Membership[] = [
	{
		created_at: '2025-03-04T12:00:00.000Z',
		membership_id: 'm-marina',
		role_id: 'role-admin',
		status: 'active',
		user: {
			email: ME.email,
			name: ME.name,
			user_id: 'u-marina',
		},
		workspace_id: null,
	},
	{
		created_at: '2025-06-18T12:00:00.000Z',
		membership_id: 'm-ana',
		role_id: 'role-sales-manager',
		status: 'active',
		user: {
			email: 'ana.ribeiro@acme.example',
			name: 'Ana Ribeiro',
			user_id: 'u-ana',
		},
		workspace_id: 'ws-enterprise',
	},
	{
		created_at: '2025-11-02T12:00:00.000Z',
		membership_id: 'm-diego',
		role_id: 'role-sales-rep',
		status: 'active',
		user: {
			email: 'diego.almeida@acme.example',
			name: 'Diego Almeida',
			user_id: 'u-diego',
		},
		workspace_id: 'ws-mid-market',
	},
	{
		created_at: '2026-01-12T12:00:00.000Z',
		membership_id: 'm-paula',
		role_id: 'role-sales-rep',
		status: 'active',
		user: {
			email: 'paula.moraes@acme.example',
			name: 'Paula Moraes',
			user_id: 'u-paula',
		},
		workspace_id: 'ws-mid-market',
	},
	{
		created_at: '2026-02-23T12:00:00.000Z',
		membership_id: 'm-jonas',
		role_id: 'role-read-only',
		status: 'active',
		user: {
			email: 'jonas.vieira@acme.example',
			name: 'Jonas Vieira',
			user_id: 'u-jonas',
		},
		workspace_id: 'ws-finance',
	},
	{
		created_at: '2025-09-09T12:00:00.000Z',
		membership_id: 'm-lucas',
		role_id: 'role-sales-rep',
		status: 'suspended',
		user: {
			email: 'lucas.prado@acme.example',
			name: 'Lucas Prado',
			user_id: 'u-lucas',
		},
		workspace_id: 'ws-enterprise',
	},
]

const INVITATIONS: Invitation[] = [
	{
		created_at: '2026-09-22T12:00:00.000Z',
		email: 'renata.souza@acme.example',
		expires_at: '2026-09-29T12:00:00.000Z',
		invitation_id: 'i-renata',
		role_id: 'role-sales-rep',
		status: 'pending',
		workspace_id: 'ws-enterprise',
	},
	{
		created_at: '2026-09-24T12:00:00.000Z',
		email: 'tiago.nunes@acme.example',
		expires_at: '2026-10-01T12:00:00.000Z',
		invitation_id: 'i-tiago',
		role_id: 'role-read-only',
		status: 'pending',
		workspace_id: 'ws-finance',
	},
]

const SEATS = 10

/** The signed-in reader: their own row reads "You" and has no controls. */
const MY_USER_ID = 'u-marina'

const roleName = (role_id: string) =>
	ROLES.find((role) => role.role_id === role_id)?.name ?? role_id

const scopeName = (workspace_id: string | null) =>
	workspace_id
		? (TEAMS.find((team) => team.workspace_id === workspace_id)?.name ??
			workspace_id)
		: 'Whole organization'

/** "Ana Ribeiro" → "AR". */
const initialsOf = (name: string) => {
	const words = name.trim().split(/\s+/)

	return `${words[0][0]}${words.length > 1 ? words[words.length - 1][0] : (words[0][1] ?? '')}`.toUpperCase()
}

/**
 * A read-only cell, inset so its text lines up with the role Selects in the
 * same column.
 */
function CellText({ children }: { children: ReactNode }) {
	return (
		<Box
			paddingX="sm"
			paddingY="sm"
		>
			<Typography size="sm">{children}</Typography>
		</Box>
	)
}

function PlainText({ children }: { children: ReactNode }) {
	return <Typography size="sm">{children}</Typography>
}

function AddedOn({ at }: { at: string }) {
	return (
		<Typography
			size="sm"
			variant="muted"
		>
			<DateText
				inheritColor
				size="inherit"
				value={at}
				variant="date"
			/>
		</Typography>
	)
}

/** The "…" of a row: safe actions first, the destructive one apart. */
function RowActions({
	destructive,
	name,
	safe = [],
}: {
	destructive: {
		label: string
		run: () => void
	}
	name: string
	safe?: {
		label: string
		run: () => void
	}[]
}) {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`Actions for ${name}`}
					size="icon-sm"
					variant="ghost"
				>
					<MoreIcon size={16} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				{safe.map((action) => (
					<DropdownMenu.Item
						key={action.label}
						onClick={action.run}
					>
						{action.label}
					</DropdownMenu.Item>
				))}
				{safe.length > 0 ? <DropdownMenu.Separator /> : null}
				<DropdownMenu.Item
					onClick={destructive.run}
					variant="destructive"
				>
					{destructive.label}
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/** Column widths are minimums: below their sum the table scrolls sideways. */
const LAYOUT_WIDTH = 240 + 150 + 140 + 120 + 110 + 56

/** Who has access: the role is a Select on everyone's row but your own. */
function MembersTable({
	emptySection,
	items,
	onChange,
	onRemove,
}: {
	emptySection?: ReactNode
	items: Membership[]
	onChange: (membership: Membership, patch: Partial<Membership>) => void
	onRemove: (membership: Membership) => void
}) {
	const [removing, setRemoving] = useState<Membership | null>(null)
	const isMe = (membership: Membership) =>
		membership.user.user_id === MY_USER_ID

	const columns: TableColumns<Membership> = [
		{
			key: 'person',
			label: 'Member',
			selector: (membership) => (
				<Identity
					action={
						isMe(membership) ? (
							<Badge
								size="sm"
								variant="secondary"
							>
								You
							</Badge>
						) : undefined
					}
					description={membership.user.email}
					media={
						<Avatar
							alt=""
							size="sm"
						>
							{initialsOf(membership.user.name)}
						</Avatar>
					}
					size="sm"
					title={membership.user.name}
					variant="table"
				/>
			),
			width: 240,
		},
		{
			key: 'role',
			label: 'Role',
			selector: (membership) =>
				isMe(membership) ? (
					<CellText>{roleName(membership.role_id)}</CellText>
				) : (
					<Select
						ariaLabel={`Role of ${membership.user.name}`}
						clearable={false}
						mode="single"
						onChange={(role_id) =>
							role_id &&
							role_id !== membership.role_id &&
							onChange(membership, {
								role_id,
							})
						}
						optionLabel="name"
						options={ROLES}
						optionValue="role_id"
						size="sm"
						value={membership.role_id}
						variant="ghost"
						width="auto"
					/>
				),
			width: 150,
		},
		{
			key: 'scope',
			label: 'Scope',
			selector: (membership) => (
				<PlainText>{scopeName(membership.workspace_id)}</PlainText>
			),
			width: 140,
		},
		{
			key: 'status',
			label: 'Status',
			selector: (membership) =>
				membership.status === 'active' ? (
					<Badge
						size="sm"
						variant="success"
					>
						Active
					</Badge>
				) : (
					<Badge
						size="sm"
						variant="warning"
					>
						Suspended
					</Badge>
				),
			width: 120,
		},
		{
			key: 'added',
			label: 'Added',
			selector: (membership) => <AddedOn at={membership.created_at} />,
			width: 110,
		},
		{
			align: 'center',
			fixedWidth: true,
			key: 'actions',
			selector: (membership) =>
				isMe(membership) ? null : (
					<RowActions
						destructive={{
							label: 'Remove',
							run: () => setRemoving(membership),
						}}
						name={membership.user.name}
						safe={[
							membership.status === 'active'
								? {
										label: 'Suspend',
										run: () =>
											onChange(membership, {
												status: 'suspended',
											}),
									}
								: {
										label: 'Reactivate',
										run: () =>
											onChange(membership, {
												status: 'active',
											}),
									},
						]}
					/>
				),
			sticky: 'right',
			width: 56,
		},
	]

	return (
		<>
			<Table
				columns={columns}
				density="compact"
				emptySection={emptySection}
				itemKey="membership_id"
				items={items}
				layoutWidth={LAYOUT_WIDTH}
			/>
			{removing ? (
				<Confirm
					confirmProps={{
						variant: 'destructive',
					}}
					confirmText="Remove"
					description="They lose access to this organization at once. You can invite them again later."
					onClose={() => setRemoving(null)}
					onConfirm={() => onRemove(removing)}
					open
					title={`Remove ${removing.user.name}?`}
				/>
			) : null}
		</>
	)
}

/** Offers nobody accepted yet: the address, what it grants, when it lapses. */
function InvitationsTable({
	emptySection,
	items,
	onRevoke,
}: {
	emptySection: ReactNode
	items: Invitation[]
	onRevoke: (invitation: Invitation) => void
}) {
	const [revoking, setRevoking] = useState<Invitation | null>(null)

	const columns: TableColumns<Invitation> = [
		{
			key: 'person',
			label: 'Member',
			selector: (invitation) => (
				<Identity
					media={
						<Avatar
							alt=""
							size="sm"
						>
							<MailIcon size={14} />
						</Avatar>
					}
					size="sm"
					title={invitation.email}
					variant="table"
				/>
			),
			width: 240,
		},
		{
			key: 'role',
			label: 'Role',
			selector: (invitation) => (
				<CellText>{roleName(invitation.role_id)}</CellText>
			),
			width: 150,
		},
		{
			key: 'scope',
			label: 'Scope',
			selector: (invitation) => (
				<PlainText>{scopeName(invitation.workspace_id)}</PlainText>
			),
			width: 140,
		},
		{
			key: 'status',
			label: 'Status',
			selector: (invitation) => (
				<Flex
					align="start"
					direction="col"
					gap="none"
				>
					<Badge
						size="sm"
						variant="info"
					>
						Invited
					</Badge>
					<Typography
						size="xs"
						variant="muted"
					>
						Expires{' '}
						<DateText
							inheritColor
							size="inherit"
							value={invitation.expires_at}
							variant="date"
						/>
					</Typography>
				</Flex>
			),
			width: 120,
		},
		{
			key: 'added',
			label: 'Added',
			selector: (invitation) => <AddedOn at={invitation.created_at} />,
			width: 110,
		},
		{
			align: 'center',
			fixedWidth: true,
			key: 'actions',
			selector: (invitation) => (
				<RowActions
					destructive={{
						label: 'Revoke invitation',
						run: () => setRevoking(invitation),
					}}
					name={invitation.email}
					safe={[
						{
							label: 'Resend invitation',
							run: () => undefined,
						},
					]}
				/>
			),
			sticky: 'right',
			width: 56,
		},
	]

	return (
		<>
			<Table
				columns={columns}
				density="compact"
				emptySection={emptySection}
				itemKey="invitation_id"
				items={items}
				layoutWidth={LAYOUT_WIDTH}
			/>
			{revoking ? (
				<Confirm
					confirmProps={{
						variant: 'destructive',
					}}
					confirmText="Revoke invitation"
					description="The link in the email stops working."
					onClose={() => setRevoking(null)}
					onConfirm={() => onRevoke(revoking)}
					open
					title={`Revoke the invitation to ${revoking.email}?`}
				/>
			) : null}
		</>
	)
}

/** Shaped like an address: something, an @, a domain with a dot. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** The value of the Team select that grants the whole organization. */
const WHOLE_ORGANIZATION = 'whole-organization'

/**
 * Who to invite, with which role, into which team. Several addresses go in
 * one field, split on commas, spaces or new lines; each is checked on submit.
 */
function InviteForm({
	onCancel,
	onInvite,
}: {
	onCancel: () => void
	onInvite: (
		emails: string[],
		role_id: string,
		workspace_id: string | null,
	) => void
}) {
	const [emails, setEmails] = useState<string | null>(null)
	const [roleId, setRoleId] = useState<string | null>(null)
	const [teamId, setTeamId] = useState(WHOLE_ORGANIZATION)
	const [errors, setErrors] = useState<{
		emails?: string
		role?: string
	}>({})
	const role = ROLES.find((candidate) => candidate.role_id === roleId)

	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const parsed = [
			...new Set(
				(emails ?? '')
					.split(/[\s,;]+/)
					.map((email) => email.trim().toLowerCase())
					.filter(Boolean),
			),
		]
		const refused = parsed.filter((email) => !EMAIL.test(email))
		const next = {
			emails:
				parsed.length === 0
					? 'Add at least one email address.'
					: refused.length > 0
						? `Not an email address: ${refused.join(', ')}`
						: undefined,
			role: roleId ? undefined : 'Choose a role.',
		}

		setErrors(next)
		if (!next.emails && roleId) {
			onInvite(parsed, roleId, teamId === WHOLE_ORGANIZATION ? null : teamId)
		}
	}

	return (
		<Form onSubmit={submit}>
			<Form.Field
				description="Separate several with commas or new lines."
				error={errors.emails}
				label="Email addresses"
			>
				<Textarea
					onChange={(value) => {
						setEmails(value)
						setErrors((current) => ({
							...current,
							emails: undefined,
						}))
					}}
					placeholder="name@company.com, another@company.com"
					rows={2}
					value={emails}
				/>
			</Form.Field>
			<Form.Field
				description={role?.description}
				error={errors.role}
				label="Role"
			>
				<Select
					clearable={false}
					mode="single"
					onChange={(value) => {
						setRoleId(value)
						setErrors((current) => ({
							...current,
							role: undefined,
						}))
					}}
					optionLabel="name"
					options={ROLES}
					optionValue="role_id"
					placeholder="Choose a role"
					value={roleId}
				/>
			</Form.Field>
			<Form.Field label="Workspace">
				<Select
					clearable={false}
					mode="single"
					onChange={(value) => setTeamId(value ?? WHOLE_ORGANIZATION)}
					optionLabel="name"
					options={[
						{
							name: 'Whole organization',
							workspace_id: WHOLE_ORGANIZATION,
						},
						...TEAMS,
					]}
					optionValue="workspace_id"
					value={teamId}
				/>
			</Form.Field>
			<Flex
				align="center"
				gap="sm"
				justify="end"
				wrap="wrap"
			>
				<Button
					onClick={onCancel}
					variant="ghost"
				>
					Cancel
				</Button>
				<Button type="submit">Send invitations</Button>
			</Flex>
		</Form>
	)
}

function UsersArea() {
	const [tab, setTab] = useState('active')
	const [users, setUsers] = useState(USERS)
	const [invitations, setInvitations] = useState(INVITATIONS)
	const [inviting, setInviting] = useState(false)
	const active = users.filter((user) => user.status === 'active')
	const deactivated = users.filter((user) => user.status === 'suspended')
	const update = (target: Membership, patch: Partial<Membership>) =>
		setUsers((current) =>
			current.map((user) =>
				user.membership_id === target.membership_id
					? {
							...user,
							...patch,
						}
					: user,
			),
		)
	const remove = (target: Membership) =>
		setUsers((current) =>
			current.filter((user) => user.membership_id !== target.membership_id),
		)

	return (
		<Page>
			<Page.Header
				action={
					<Button
						leftSection={<UserPlusIcon size={16} />}
						onClick={() => setInviting(true)}
					>
						Invite users
					</Button>
				}
				breadcrumbs={[
					{
						href: '#setup',
						label: 'Setup',
					},
					{
						label: 'Users',
					},
				]}
				description={`${active.length} of ${SEATS} seats in use on the Professional plan`}
				title="Users"
			/>
			<Page.Content>
				<Tabs
					justified={false}
					onChange={setTab}
					value={tab}
				>
					<Tabs.List
						ariaLabel="Users by status"
						justified={false}
					>
						<Tabs.Trigger value="active">Active ({active.length})</Tabs.Trigger>
						<Tabs.Trigger value="invited">
							Invited ({invitations.length})
						</Tabs.Trigger>
						<Tabs.Trigger value="deactivated">
							Deactivated ({deactivated.length})
						</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="active">
						<MembersTable
							items={active}
							onChange={update}
							onRemove={remove}
						/>
					</Tabs.Content>
					<Tabs.Content value="invited">
						<InvitationsTable
							emptySection={
								<EmptyState
									headingLevel={2}
									size="sm"
									title="No invitations are waiting"
								/>
							}
							items={invitations}
							onRevoke={(invitation) =>
								setInvitations((current) =>
									current.filter(
										(row) => row.invitation_id !== invitation.invitation_id,
									),
								)
							}
						/>
					</Tabs.Content>
					<Tabs.Content value="deactivated">
						<MembersTable
							emptySection={
								<EmptyState
									headingLevel={2}
									size="sm"
									title="Nobody has been deactivated"
								/>
							}
							items={deactivated}
							onChange={update}
							onRemove={remove}
						/>
					</Tabs.Content>
				</Tabs>
			</Page.Content>
			<Modal
				onChange={setInviting}
				open={inviting}
			>
				<Modal.Header closable>
					<Modal.Header.Title>Invite users</Modal.Header.Title>
					<Modal.Header.Description>
						{SEATS - active.length} seats left on the Professional plan
					</Modal.Header.Description>
				</Modal.Header>
				<Modal.Body>
					<InviteForm
						onCancel={() => setInviting(false)}
						onInvite={(emails, role_id, workspace_id) => {
							setInvitations((current) => [
								...current,
								...emails.map((email) => ({
									created_at: new Date().toISOString(),
									email,
									expires_at: new Date(
										Date.now() + 7 * 86_400_000,
									).toISOString(),
									invitation_id: `i-${email}`,
									role_id,
									status: 'pending' as const,
									workspace_id,
								})),
							])
							setInviting(false)
							setTab('invited')
						}}
					/>
				</Modal.Body>
			</Modal>
		</Page>
	)
}

const SECTIONS = [
	{
		id: 'general',
		label: 'General',
	},
	{
		id: 'address',
		label: 'Address',
	},
	{
		id: 'localisation',
		label: 'Localisation',
	},
	{
		id: 'fiscal-year',
		label: 'Fiscal year',
	},
	{
		id: 'danger-zone',
		label: 'Danger zone',
	},
]

/** One settings section: a form of its own, with its own save. */
function Section({
	children,
	description,
	id,
	title,
}: {
	children: React.ReactNode
	description: string
	id: string
	title: string
}) {
	return (
		<Form>
			<Card id={id}>
				<Card.Header bordered>
					<Card.Title headingLevel={2}>{title}</Card.Title>
					<Card.Description>{description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<Flex
						align="stretch"
						direction="col"
						gap="md"
					>
						{children}
					</Flex>
				</Card.Content>
				<Card.Footer bordered>
					<Button
						size="sm"
						type="submit"
					>
						Save
					</Button>
				</Card.Footer>
			</Card>
		</Form>
	)
}

function CompanyProfile() {
	return (
		<Page>
			<Page.Header
				breadcrumbs={[
					{
						href: '#setup',
						label: 'Setup',
					},
					{
						label: 'Company profile',
					},
				]}
				description="How Acme Logistics appears on quotes, invoices and emails"
				title="Company profile"
			/>
			<Page.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<Section
						description="The name and contact people see on everything you send."
						id="general"
						title="General"
					>
						<Grid
							cols={2}
							gap="md"
						>
							<Form.Field
								label="Company name"
								name="company-profile-company-name"
							>
								<Input defaultValue="Acme Logistics Ltda." />
							</Form.Field>
							<Form.Field
								label="CNPJ"
								name="company-profile-cnpj"
							>
								<Input defaultValue="12.345.678/0001-90" />
							</Form.Field>
						</Grid>
						<Grid
							cols={2}
							gap="md"
						>
							<Form.Field
								label="Website"
								name="company-profile-website"
							>
								<Input defaultValue="acmelogistics.example" />
							</Form.Field>
							<Form.Field
								label="Phone"
								name="company-profile-phone"
							>
								<Input defaultValue="+55 11 3456-7890" />
							</Form.Field>
						</Grid>
					</Section>
					<Section
						description="Printed on quotes and invoices."
						id="address"
						title="Address"
					>
						<Form.Field
							label="Street"
							name="company-profile-street"
						>
							<Input defaultValue="Av. Paulista, 1000 — 12º andar" />
						</Form.Field>
						<Grid
							cols={3}
							gap="md"
						>
							<Form.Field
								label="City"
								name="company-profile-city"
							>
								<Input defaultValue="São Paulo" />
							</Form.Field>
							<Form.Field
								label="State"
								name="company-profile-state"
							>
								<Input defaultValue="SP" />
							</Form.Field>
							<Form.Field
								label="Postcode"
								name="company-profile-postcode"
							>
								<Input defaultValue="01310-100" />
							</Form.Field>
						</Grid>
					</Section>
					<Section
						description="The defaults for new users; each person can change their own."
						id="localisation"
						title="Localisation"
					>
						<Grid
							cols={2}
							gap="md"
						>
							<Form.Field
								label="Currency"
								name="company-profile-currency"
							>
								<Select
									clearable={false}
									defaultValue="brl"
									mode="single"
									optionLabel="label"
									options={[
										{
											id: 'brl',
											label: 'Brazilian real (R$)',
										},
										{
											id: 'usd',
											label: 'US dollar (US$)',
										},
									]}
									optionValue="id"
								/>
							</Form.Field>
							<Form.Field
								label="Time zone"
								name="company-profile-time-zone"
							>
								<Select
									clearable={false}
									defaultValue="sp"
									mode="single"
									optionLabel="label"
									options={[
										{
											id: 'sp',
											label: '(GMT−03:00) São Paulo',
										},
										{
											id: 'manaus',
											label: '(GMT−04:00) Manaus',
										},
									]}
									optionValue="id"
								/>
							</Form.Field>
						</Grid>
					</Section>
					<Section
						description="Reports and forecasts group by it."
						id="fiscal-year"
						title="Fiscal year"
					>
						<Form.Field
							label="Starts in"
							name="company-profile-starts-in"
						>
							<Select
								clearable={false}
								defaultValue="january"
								mode="single"
								optionLabel="label"
								options={[
									{
										id: 'january',
										label: 'January',
									},
									{
										id: 'april',
										label: 'April',
									},
								]}
								optionValue="id"
							/>
						</Form.Field>
						<Switch
							defaultChecked
							description="Quarters follow the calendar, Jan–Mar being Q1."
							label="Standard quarters"
						/>
					</Section>
					<Card id="danger-zone">
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Danger zone</Card.Title>
							<Card.Description>
								Irreversible actions on the whole workspace.
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<Form>
								<Flex
									align="center"
									gap="md"
									justify="between"
								>
									<Flex
										align="stretch"
										direction="col"
										gap="none"
									>
										<Typography
											size="sm"
											weight="medium"
										>
											Delete this workspace
										</Typography>
										<Typography
											size="sm"
											variant="muted"
										>
											Every record, user and file in Acme Logistics.
										</Typography>
									</Flex>
									<Button variant="destructive">Delete workspace</Button>
								</Flex>
							</Form>
						</Card.Content>
					</Card>
				</Flex>
			</Page.Content>
		</Page>
	)
}

export function Settings({ variant }: { variant: SettingsVariant }) {
	return (
		<CrmShell active="setup">
			<Layout.Content
				bg="muted"
				padding="sm"
				span={1}
			>
				{variant === 'anchored' ? (
					<Flex
						align="stretch"
						direction="col"
						gap="sm"
					>
						<Typography
							component="p"
							size="xs"
							variant="muted"
							weight="semibold"
						>
							Company profile
						</Typography>
						<AnchorNav
							ariaLabel="Company profile"
							items={SECTIONS}
							offset="none"
						/>
					</Flex>
				) : (
					<SettingsNav active="Users" />
				)}
			</Layout.Content>
			<Layout.Content span={4}>
				{variant === 'anchored' ? <CompanyProfile /> : <UsersArea />}
			</Layout.Content>
		</CrmShell>
	)
}
