import {
	BanknoteIcon,
	BellIcon,
	Building2Icon,
	CreditCardIcon,
	FileTextIcon,
	KeyRoundIcon,
	LinkIcon,
	MailIcon,
	MoreIcon,
	PaletteIcon,
	ReceiptIcon,
	ShieldCheckIcon,
	UserPlusIcon,
	UserRoundIcon,
	UsersIcon,
} from '@turystack/react-icons'
import {
	AnchorNav,
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Confirm,
	CopyButton,
	DateText,
	DropdownMenu,
	Flex,
	Form,
	Grid,
	Identity,
	Input,
	Layout,
	Modal,
	Page,
	Radio,
	Select,
	Switch,
	Table,
	type TableColumns,
	Tabs,
	Textarea,
	Typography,
} from '@turystack/react-web'
import { type FormEvent, type ReactNode, useState } from 'react'

import { BackofficeShell } from './shell'

/**
 * - `hub`           — every settings page as a link, in three groups
 * - `vertical-tabs` — one area with its pages in a side navigation
 * - `anchored`      — one area on a single page, with an index beside it
 */
export type SettingsVariant = 'hub' | 'vertical-tabs' | 'anchored'

type SettingsLink = {
	description: string
	href: string
	icon: ReactNode
	title: string
}

/** Settings grouped by whose they are: yours, the account's, a product's. */
const HUB: {
	links: SettingsLink[]
	title: string
}[] = [
	{
		links: [
			{
				description: 'Name, email, password and two-step login.',
				href: '#profile',
				icon: <UserRoundIcon size={16} />,
				title: 'Personal details',
			},
			{
				description: 'What reaches your inbox and your phone.',
				href: '#communication',
				icon: <BellIcon size={16} />,
				title: 'Communication preferences',
			},
		],
		title: 'Personal settings',
	},
	{
		links: [
			{
				description: 'Legal name, address and tax IDs.',
				href: '#business',
				icon: <Building2Icon size={16} />,
				title: 'Business',
			},
			{
				description: 'Who has access, and with which role.',
				href: '#team',
				icon: <UsersIcon size={16} />,
				title: 'Team and security',
			},
			{
				description: 'Bank accounts and the payout schedule.',
				href: '#payouts',
				icon: <BanknoteIcon size={16} />,
				title: 'Payouts',
			},
			{
				description: 'Plan, usage and the invoices Acme sends you.',
				href: '#billing',
				icon: <CreditCardIcon size={16} />,
				title: 'Your plan',
			},
			{
				description: 'Logo, colours and the emails customers get.',
				href: '#branding',
				icon: <PaletteIcon size={16} />,
				title: 'Branding',
			},
			{
				description: 'Keys, webhooks and the API version in use.',
				href: '#developers',
				icon: <KeyRoundIcon size={16} />,
				title: 'Developers',
			},
		],
		title: 'Account settings',
	},
	{
		links: [
			{
				description: 'Accepted methods: card, Pix and boleto.',
				href: '#payments',
				icon: <ReceiptIcon size={16} />,
				title: 'Payments',
			},
			{
				description: 'Numbering, reminders and default terms.',
				href: '#invoices',
				icon: <FileTextIcon size={16} />,
				title: 'Invoices',
			},
			{
				description: 'Receipts and payment confirmations.',
				href: '#emails',
				icon: <MailIcon size={16} />,
				title: 'Customer emails',
			},
		],
		title: 'Product settings',
	},
]

function SettingsHub() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					description="Everything that configures this account, grouped by whose it is."
					title="Settings"
				/>
				<Page.Content>
					{HUB.map((group) => (
						<Flex
							align="stretch"
							direction="col"
							gap="sm"
							key={group.title}
						>
							<Typography
								component="h2"
								size="sm"
								weight="semibold"
							>
								{group.title}
							</Typography>
							<Grid
								cols={3}
								gap="md"
							>
								{group.links.map((link) => (
									<Card
										href={link.href}
										key={link.title}
										size="sm"
									>
										<Card.Header>
											<Flex
												align="center"
												gap="sm"
											>
												{link.icon}
												<Card.Title headingLevel={3}>{link.title}</Card.Title>
											</Flex>
											<Card.Description>{link.description}</Card.Description>
										</Card.Header>
									</Card>
								))}
							</Grid>
						</Flex>
					))}
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

const ROLES = [
	{
		description: 'Everything, including payouts and the team.',
		name: 'Administrator',
		role_id: 'role-administrator',
	},
	{
		description: 'Refunds, disputes and customer details.',
		name: 'Support specialist',
		role_id: 'role-support',
	},
	{
		description: 'Reports and exports; changes nothing.',
		name: 'Analyst',
		role_id: 'role-analyst',
	},
	{
		description: 'API keys, webhooks and logs.',
		name: 'Developer',
		role_id: 'role-developer',
	},
]

/** A person on the team (IAM `membership`). */
type Member = {
	created_at: string
	membership_id: string
	role_id: string
	status: 'active'
	user: {
		email: string
		name: string
		user_id: string
	}
}

/** An offer to join nobody accepted yet (IAM `invitation`). */
type Invitation = {
	created_at: string
	email: string
	expires_at: string
	invitation_id: string
	role_id: string
	status: 'pending'
}

const MEMBERS: Member[] = [
	{
		created_at: '2025-02-10T12:00:00.000Z',
		membership_id: 'm1',
		role_id: 'role-administrator',
		status: 'active',
		user: {
			email: 'ana.ribeiro@acme.example',
			name: 'Ana Ribeiro',
			user_id: 'u-ana',
		},
	},
	{
		created_at: '2025-07-01T12:00:00.000Z',
		membership_id: 'm2',
		role_id: 'role-support',
		status: 'active',
		user: {
			email: 'bruno.teixeira@acme.example',
			name: 'Bruno Teixeira',
			user_id: 'u-bruno',
		},
	},
	{
		created_at: '2026-01-19T12:00:00.000Z',
		membership_id: 'm3',
		role_id: 'role-analyst',
		status: 'active',
		user: {
			email: 'carla.menezes@acme.example',
			name: 'Carla Menezes',
			user_id: 'u-carla',
		},
	},
]

const INVITATIONS: Invitation[] = [
	{
		created_at: '2026-09-23T12:00:00.000Z',
		email: 'diego.prado@acme.example',
		expires_at: '2026-09-30T12:00:00.000Z',
		invitation_id: 'i1',
		role_id: 'role-developer',
		status: 'pending',
	},
]

/** The signed-in reader: their own row reads "You" and has no controls. */
const MY_USER_ID = 'u-ana'

/** One line of the team table: a member, or an invitation after them. */
type TeamRow =
	| {
			key: string
			kind: 'member'
			member: Member
	  }
	| {
			invitation: Invitation
			key: string
			kind: 'invitation'
	  }

const roleName = (role_id: string) =>
	ROLES.find((role) => role.role_id === role_id)?.name ?? role_id

/** "Ana Ribeiro" → "AR". */
const initialsOf = (name: string) => {
	const words = name.trim().split(/\s+/)

	return `${words[0][0]}${words.length > 1 ? words[words.length - 1][0] : (words[0][1] ?? '')}`.toUpperCase()
}

/** Pending confirmation: removing a member, or revoking an invitation. */
type Pending =
	| {
			kind: 'remove'
			member: Member
	  }
	| {
			invitation: Invitation
			kind: 'revoke'
	  }
	| null

/**
 * Who is on the team and who was invited, in one table: the role is a
 * Select on every member's row but your own, and removing or revoking asks
 * first.
 */
function TeamTable({
	invitations,
	members,
	onChangeRole,
	onRemove,
	onRevoke,
}: {
	invitations: Invitation[]
	members: Member[]
	onChangeRole: (member: Member, role_id: string) => void
	onRemove: (member: Member) => void
	onRevoke: (invitation: Invitation) => void
}) {
	const [pending, setPending] = useState<Pending>(null)
	const rows: TeamRow[] = [
		...members.map((member) => ({
			key: member.membership_id,
			kind: 'member' as const,
			member,
		})),
		...invitations.map((invitation) => ({
			invitation,
			key: invitation.invitation_id,
			kind: 'invitation' as const,
		})),
	]
	const isMe = (row: TeamRow) =>
		row.kind === 'member' && row.member.user.user_id === MY_USER_ID

	const columns: TableColumns<TeamRow> = [
		{
			key: 'person',
			label: 'Member',
			selector: (row) =>
				row.kind === 'invitation' ? (
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
						title={row.invitation.email}
						variant="table"
					/>
				) : (
					<Identity
						action={
							isMe(row) ? (
								<Badge
									size="sm"
									variant="secondary"
								>
									You
								</Badge>
							) : undefined
						}
						description={row.member.user.email}
						media={
							<Avatar
								alt=""
								size="sm"
							>
								{initialsOf(row.member.user.name)}
							</Avatar>
						}
						size="sm"
						title={row.member.user.name}
						variant="table"
					/>
				),
			width: 240,
		},
		{
			key: 'role',
			label: 'Role',
			selector: (row) =>
				row.kind === 'member' && !isMe(row) ? (
					<Select
						ariaLabel={`Role of ${row.member.user.name}`}
						clearable={false}
						mode="single"
						onChange={(role_id) =>
							role_id &&
							role_id !== row.member.role_id &&
							onChangeRole(row.member, role_id)
						}
						optionLabel="name"
						options={ROLES}
						optionValue="role_id"
						size="sm"
						value={row.member.role_id}
						variant="ghost"
						width="auto"
					/>
				) : (
					// Inset so the text lines up with the Selects in the column.
					<Box
						paddingX="sm"
						paddingY="sm"
					>
						<Typography size="sm">
							{roleName(
								row.kind === 'member'
									? row.member.role_id
									: row.invitation.role_id,
							)}
						</Typography>
					</Box>
				),
			width: 150,
		},
		{
			key: 'status',
			label: 'Status',
			selector: (row) =>
				row.kind === 'member' ? (
					<Badge
						size="sm"
						variant="success"
					>
						Active
					</Badge>
				) : (
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
								value={row.invitation.expires_at}
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
			selector: (row) => (
				<Typography
					size="sm"
					variant="muted"
				>
					<DateText
						inheritColor
						size="inherit"
						value={
							row.kind === 'member'
								? row.member.created_at
								: row.invitation.created_at
						}
						variant="date"
					/>
				</Typography>
			),
			width: 110,
		},
		{
			align: 'center',
			fixedWidth: true,
			key: 'actions',
			selector: (row) =>
				isMe(row) ? null : (
					<DropdownMenu>
						<DropdownMenu.Trigger asChild>
							<Button
								ariaLabel={`Actions for ${row.kind === 'member' ? row.member.user.name : row.invitation.email}`}
								size="icon-sm"
								variant="ghost"
							>
								<MoreIcon size={16} />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							{row.kind === 'member' ? (
								<DropdownMenu.Item
									onClick={() =>
										setPending({
											kind: 'remove',
											member: row.member,
										})
									}
									variant="destructive"
								>
									Remove
								</DropdownMenu.Item>
							) : (
								<>
									<DropdownMenu.Item>Resend invitation</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item
										onClick={() =>
											setPending({
												invitation: row.invitation,
												kind: 'revoke',
											})
										}
										variant="destructive"
									>
										Revoke invitation
									</DropdownMenu.Item>
								</>
							)}
						</DropdownMenu.Content>
					</DropdownMenu>
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
				itemKey="key"
				items={rows}
				layoutWidth={240 + 150 + 120 + 110 + 56}
			/>
			{pending?.kind === 'remove' ? (
				<Confirm
					confirmProps={{
						variant: 'destructive',
					}}
					confirmText="Remove"
					description="They lose access to this organization at once. You can invite them again later."
					onClose={() => setPending(null)}
					onConfirm={() => onRemove(pending.member)}
					open
					title={`Remove ${pending.member.user.name}?`}
				/>
			) : null}
			{pending?.kind === 'revoke' ? (
				<Confirm
					confirmProps={{
						variant: 'destructive',
					}}
					confirmText="Revoke invitation"
					description="The link in the email stops working."
					onClose={() => setPending(null)}
					onConfirm={() => onRevoke(pending.invitation)}
					open
					title={`Revoke the invitation to ${pending.invitation.email}?`}
				/>
			) : null}
		</>
	)
}

/** Shaped like an address: something, an @, a domain with a dot. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Who to invite and with which role. Several addresses go in one field,
 * split on commas, spaces or new lines; each is checked on submit.
 */
function InviteForm({
	onCancel,
	onInvite,
}: {
	onCancel: () => void
	onInvite: (emails: string[], role_id: string) => void
}) {
	const [emails, setEmails] = useState<string | null>(null)
	const [roleId, setRoleId] = useState<string | null>(null)
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
			onInvite(parsed, roleId)
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

/** A section with its own Save: nothing on the page is saved by another's button. */
function SettingsSection({
	children,
	description,
	id,
	title,
	footer = true,
}: {
	children: ReactNode
	description: string
	footer?: boolean
	id?: string
	title: string
}) {
	return (
		<Form onSubmit={(event) => event.preventDefault()}>
			<Card
				id={id}
				size="sm"
			>
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
				{footer && (
					<Card.Footer bordered>
						<Flex
							align="center"
							gap="sm"
							justify="end"
						>
							<Button
								size="sm"
								variant="ghost"
							>
								Cancel
							</Button>
							<Button
								size="sm"
								type="submit"
							>
								Save
							</Button>
						</Flex>
					</Card.Footer>
				)}
			</Card>
		</Form>
	)
}

function TeamSection() {
	const [members, setMembers] = useState(MEMBERS)
	const [invitations, setInvitations] = useState(INVITATIONS)
	const [inviting, setInviting] = useState(false)

	return (
		<SettingsSection
			description={`${members.length + invitations.length} of 10 seats used. Roles decide what each person can see and change.`}
			footer={false}
			title="Team"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Flex justify="end">
					<Button
						leftSection={<UserPlusIcon size={14} />}
						onClick={() => setInviting(true)}
						size="sm"
					>
						Invite member
					</Button>
				</Flex>
				<TeamTable
					invitations={invitations}
					members={members}
					onChangeRole={(member, role_id) =>
						setMembers((current) =>
							current.map((row) =>
								row.membership_id === member.membership_id
									? {
											...row,
											role_id,
										}
									: row,
							),
						)
					}
					onRemove={(member) =>
						setMembers((current) =>
							current.filter(
								(row) => row.membership_id !== member.membership_id,
							),
						)
					}
					onRevoke={(invitation) =>
						setInvitations((current) =>
							current.filter(
								(row) => row.invitation_id !== invitation.invitation_id,
							),
						)
					}
				/>
			</Flex>
			<Modal
				onChange={setInviting}
				open={inviting}
			>
				<Modal.Header closable>
					<Modal.Header.Title>Invite a member</Modal.Header.Title>
				</Modal.Header>
				<Modal.Body>
					<InviteForm
						onCancel={() => setInviting(false)}
						onInvite={(emails, role_id) => {
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
								})),
							])
							setInviting(false)
						}}
					/>
				</Modal.Body>
			</Modal>
		</SettingsSection>
	)
}

function SecuritySection() {
	return (
		<SettingsSection
			description="Rules every member of the team signs in under."
			title="Security"
		>
			<Switch
				bordered
				defaultChecked
				description="Members without it are asked to set it up at their next sign-in."
				label="Require two-step authentication"
			/>
			<Switch
				bordered
				description="Only acme.example addresses can be invited."
				label="Restrict invitations to the company domain"
			/>
			<Form.Field
				label="Sign out idle sessions after"
				name="idle"
			>
				<Select
					clearable={false}
					defaultValue="12h"
					mode="single"
					optionLabel="label"
					options={[
						{
							label: '1 hour',
							value: '1h',
						},
						{
							label: '12 hours',
							value: '12h',
						},
						{
							label: '7 days',
							value: '7d',
						},
					]}
					optionValue="value"
				/>
			</Form.Field>
		</SettingsSection>
	)
}

function BusinessSection({ id }: { id?: string }) {
	return (
		<SettingsSection
			description="Shown on invoices and receipts, and used for tax."
			id={id}
			title="Business details"
		>
			<Grid
				cols={2}
				gap="md"
			>
				<Form.Field
					label="Legal name"
					name="legal"
				>
					<Input defaultValue="Acme Serviços Ltda." />
				</Form.Field>
				<Form.Field
					label="CNPJ"
					name="cnpj"
				>
					<Input defaultValue="12.345.678/0001-90" />
				</Form.Field>
			</Grid>
			<Form.Field
				label="Support email"
				name="support"
			>
				<Input defaultValue="ajuda@acme.example" />
			</Form.Field>
		</SettingsSection>
	)
}

function PayoutsSection({ id }: { id?: string }) {
	return (
		<SettingsSection
			description="Where the balance goes, and how often."
			id={id}
			title="Payouts"
		>
			<Form.Field
				label="Bank account"
				name="bank"
			>
				<Input
					defaultValue={'Your bank\u00a0· agency 0932\u00a0· account •••• 4410'}
					readOnly
				/>
			</Form.Field>
			<Form.Field
				label="Schedule"
				name="schedule"
			>
				<Radio.Group
					bordered
					defaultValue="daily"
					items={[
						{
							description: 'Two business days after each payment.',
							label: 'Daily',
							value: 'daily',
						},
						{
							description: 'Every Monday, for the week before.',
							label: 'Weekly',
							value: 'weekly',
						},
						{
							description: 'Only when someone asks for it here.',
							label: 'Manual',
							value: 'manual',
						},
					]}
				/>
			</Form.Field>
		</SettingsSection>
	)
}

function BrandingSection({ id }: { id?: string }) {
	return (
		<SettingsSection
			description="How receipts, invoices and the hosted pages look."
			id={id}
			title="Branding"
		>
			<Grid
				cols={2}
				gap="md"
			>
				<Form.Field
					label="Brand colour"
					name="color"
				>
					<Input defaultValue="#111111" />
				</Form.Field>
				<Form.Field
					label="Accent colour"
					name="accent"
				>
					<Input defaultValue="#16A34A" />
				</Form.Field>
			</Grid>
			<Switch
				defaultChecked
				label="Show the logo on receipts"
			/>
		</SettingsSection>
	)
}

function EmailsSection({ id }: { id?: string }) {
	return (
		<SettingsSection
			description="Messages Acme sends your customers on your behalf."
			id={id}
			title="Customer emails"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Switch
					defaultChecked
					label="Successful payments"
				/>
				<Switch
					defaultChecked
					label="Refunds"
				/>
				<Switch label="Failed payments, with a link to retry" />
			</Flex>
		</SettingsSection>
	)
}

function ApiSection({ id }: { id?: string }) {
	return (
		<SettingsSection
			description="Keys for the sandbox. Live keys are shown once, when created."
			footer={false}
			id={id}
			title="API keys"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Flex
					align="center"
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
							Publishable key
						</Typography>
						<Typography
							size="xs"
							variant="muted"
						>
							pk_test_51Qx8…Yl0o21
						</Typography>
					</Flex>
					<CopyButton
						label="Copy"
						size="sm"
						value="pk_test_51Qx8mL2eZvKYlo21"
						variant="outline"
					/>
				</Flex>
				<Flex
					align="center"
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
							Secret key
						</Typography>
						<Typography
							size="xs"
							variant="muted"
						>
							sk_test_•••••••••••••••••••••••0f3a
						</Typography>
					</Flex>
					<Button
						size="sm"
						variant="outline"
					>
						Roll key
					</Button>
				</Flex>
				<Flex
					align="center"
					gap="xs"
				>
					<LinkIcon size={14} />
					<Typography
						size="xs"
						variant="muted"
					>
						2 webhook endpoints&nbsp;· API version 2026-08-01
					</Typography>
				</Flex>
			</Flex>
		</SettingsSection>
	)
}

const TEAM_TABS = [
	{
		icon: <Building2Icon size={14} />,
		label: 'Business details',
		value: 'business',
	},
	{
		icon: <UsersIcon size={14} />,
		label: 'Team',
		value: 'team',
	},
	{
		icon: <ShieldCheckIcon size={14} />,
		label: 'Security',
		value: 'security',
	},
	{
		icon: <BanknoteIcon size={14} />,
		label: 'Payouts',
		value: 'payouts',
	},
	{
		icon: <KeyRoundIcon size={14} />,
		label: 'API keys',
		value: 'api',
	},
]

/** One area, its pages in a side navigation, one page at a time. */
function VerticalTabs() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					breadcrumbs={[
						{
							href: '#settings',
							label: 'Settings',
						},
						{
							label: 'Team and security',
						},
					]}
					title="Team and security"
				/>
				<Tabs
					defaultValue="team"
					justified={false}
					orientation="vertical"
				>
					<Tabs.List ariaLabel="Team and security sections">
						{TEAM_TABS.map((tab) => (
							<Tabs.Trigger
								icon={tab.icon}
								key={tab.value}
								value={tab.value}
							>
								{tab.label}
							</Tabs.Trigger>
						))}
					</Tabs.List>
					<Tabs.Content value="business">
						<BusinessSection />
					</Tabs.Content>
					<Tabs.Content value="team">
						<Flex
							align="stretch"
							direction="col"
							gap="md"
						>
							<TeamSection />
							<SecuritySection />
						</Flex>
					</Tabs.Content>
					<Tabs.Content value="security">
						<SecuritySection />
					</Tabs.Content>
					<Tabs.Content value="payouts">
						<PayoutsSection />
					</Tabs.Content>
					<Tabs.Content value="api">
						<ApiSection />
					</Tabs.Content>
				</Tabs>
			</Page>
		</Layout.Content>
	)
}

const ANCHORS = [
	{
		id: 'settings-business',
		label: 'Business details',
	},
	{
		id: 'settings-payouts',
		label: 'Payouts',
	},
	{
		id: 'settings-branding',
		label: 'Branding',
	},
	{
		id: 'settings-emails',
		label: 'Customer emails',
	},
	{
		id: 'settings-api',
		label: 'API keys',
	},
]

/**
 * One area on one page. The index sits in a sticky column beside the
 * sections, so it stays in view while they scroll under it; the sections are
 * the cards themselves, each carrying the id its link points at.
 */
function Anchored() {
	return (
		<Layout.Content maxWidth="lg">
			<Page>
				<Page.Header
					breadcrumbs={[
						{
							href: '#settings',
							label: 'Settings',
						},
						{
							label: 'Account',
						},
					]}
					description="Each section saves on its own."
					title="Account"
				/>
				<Grid
					cols={4}
					gap="lg"
				>
					<Grid.Item>
						<Box
							offset="none"
							paddingY="xs"
							position="sticky"
						>
							<AnchorNav
								ariaLabel="Account settings"
								items={ANCHORS}
								offset="none"
							/>
						</Box>
					</Grid.Item>
					<Grid.Item span={3}>
						<Page.Content>
							<BusinessSection id="settings-business" />
							<PayoutsSection id="settings-payouts" />
							<BrandingSection id="settings-branding" />
							<EmailsSection id="settings-emails" />
							<ApiSection id="settings-api" />
						</Page.Content>
					</Grid.Item>
				</Grid>
			</Page>
		</Layout.Content>
	)
}

/**
 * Settings the way a payments dashboard keeps them: a hub of links grouped into personal,
 * account and product settings, each opening a page whose sections save on
 * their own. A small area uses vertical tabs; a single area that is read top
 * to bottom is one anchored page with an index beside it.
 */
export function Settings({ variant }: { variant: SettingsVariant }) {
	return (
		<BackofficeShell active="settings">
			{variant === 'hub' && <SettingsHub />}
			{variant === 'vertical-tabs' && <VerticalTabs />}
			{variant === 'anchored' && <Anchored />}
		</BackofficeShell>
	)
}
