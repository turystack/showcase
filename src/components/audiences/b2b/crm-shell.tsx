import {
	BriefcaseIcon,
	Building2Icon,
	ChartColumnIcon,
	ChevronDownIcon,
	CircleCheckIcon,
	CircleHelpIcon,
	ClockIcon,
	ContactIcon,
	HomeIcon,
	LayoutGridIcon,
	LogOutIcon,
	MoonIcon,
	PlusIcon,
	SettingsIcon,
	UserPlusIcon,
	UserRoundIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Button,
	DropdownMenu,
	EmptyState,
	Flex,
	Layout,
	SpotlightSearch,
	type SpotlightSearchGroup,
	Tabs,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useEffect, useState } from 'react'

import {
	DEALS,
	ME,
	NOTICE_CATEGORIES,
	NOTICES,
	type Notice,
	OLDER_NOTICES,
} from './crm-data'

import { AcmeMark } from '@/components/audiences/acme-logo'
import {
	InboxBell,
	type InboxEntry,
	useNotificationInbox,
} from '@/components/audiences/notification-inbox'

/** The rail is `Layout.Sidebar`; the alias keeps the JSX readable. */
const Sidebar = Layout.Sidebar

/**
 * How the shell lays out object navigation.
 *
 * - `sidebar` — objects in a side rail, the common CRM arrangement
 * - `sidebar-collapsed` — the same rail reduced to icons
 * - `topbar` — the enterprise-CRM arrangement: a global header, and
 *   under it a context bar with the app's name and one tab per object
 */
export type CrmNav = 'sidebar' | 'sidebar-collapsed' | 'topbar'

export type CrmObject =
	| 'home'
	| 'leads'
	| 'contacts'
	| 'companies'
	| 'deals'
	| 'tasks'
	| 'reports'
	| 'setup'

const OBJECTS: {
	count?: number
	icon: typeof HomeIcon
	id: CrmObject
	label: string
}[] = [
	{
		icon: HomeIcon,
		id: 'home',
		label: 'Home',
	},
	{
		icon: UserPlusIcon,
		id: 'leads',
		label: 'Leads',
	},
	{
		icon: ContactIcon,
		id: 'contacts',
		label: 'Contacts',
	},
	{
		icon: Building2Icon,
		id: 'companies',
		label: 'Companies',
	},
	{
		icon: BriefcaseIcon,
		id: 'deals',
		label: 'Deals',
	},
	{
		count: 5,
		icon: CircleCheckIcon,
		id: 'tasks',
		label: 'Tasks',
	},
	{
		icon: ChartColumnIcon,
		id: 'reports',
		label: 'Reports',
	},
]

/**
 * Open once mounted, not while mounting.
 *
 * A screen that shows a popover already open is usually mounted by a click —
 * the scenario button that picked it. Opened in the first render, the popover
 * starts listening for outside presses while that same click is still on its
 * way to the document, and closes itself on it. Opening in an effect waits for
 * the click to finish.
 */
function useOpenAfterMount(defaultOpen: boolean) {
	const [open, setOpen] = useState(false)
	useEffect(() => {
		if (defaultOpen) {
			setOpen(true)
		}
	}, [
		defaultOpen,
	])
	return [
		open,
		setOpen,
	] as const
}

/* ─── Global search ─────────────────────────────────────────────────────── */

const viewAll = (label: string) => (
	<Button
		size="sm"
		variant="link"
	>
		View all {label}
	</Button>
)

const ACCOUNTS = Array.from(new Set(DEALS.map((deal) => deal.account)))
const CONTACTS = Array.from(
	new Map(
		DEALS.map((deal) => [
			deal.contact,
			deal.account,
		]),
	),
)

/**
 * Records the global search can find, grouped by object. The palette does the
 * matching — label, description and keywords — so a deal is found by its
 * company and its contact as well as by its name.
 */
export const SEARCH_GROUPS: SpotlightSearchGroup[] = [
	{
		action: viewAll('deals'),
		heading: 'Deals',
		items: DEALS.map((deal) => ({
			description: `${deal.account} · ${deal.id}`,
			icon: <BriefcaseIcon size={16} />,
			id: `deal-${deal.id}`,
			keywords: [
				deal.contact,
			],
			label: deal.name,
		})),
	},
	{
		action: viewAll('companies'),
		heading: 'Companies',
		items: ACCOUNTS.map((account) => ({
			description: 'Company',
			icon: <Building2Icon size={16} />,
			id: `account-${account}`,
			label: account,
		})),
	},
	{
		action: viewAll('contacts'),
		heading: 'Contacts',
		items: CONTACTS.map(([contact, account]) => ({
			description: `Contact · ${account}`,
			icon: <ContactIcon size={16} />,
			id: `contact-${contact}`,
			label: contact,
		})),
	},
]

const RECENT: SpotlightSearchGroup[] = [
	{
		heading: 'Recent records',
		items: DEALS.slice(0, 3).map((deal) => ({
			description: deal.account,
			icon: <ClockIcon size={16} />,
			id: `recent-${deal.id}`,
			label: deal.name,
		})),
	},
]

/**
 * The search box centred in the header. It answers while you type — records
 * grouped by object, each group with a way to its full results — and shows the
 * recent records before anything is typed. `defaultQuery` opens it with
 * something already typed, the way a results page arrives from `?q=`.
 */
export function GlobalSearch({
	defaultOpen = false,
	defaultQuery,
}: {
	defaultOpen?: boolean
	defaultQuery?: string
}) {
	const [open, setOpen] = useOpenAfterMount(defaultOpen)

	return (
		<SpotlightSearch
			ariaLabel="Search Acme"
			defaultSearchValue={defaultQuery}
			emptyQueryGroups={RECENT}
			emptySection={
				<EmptyState
					description="Try a company, a person or a deal number."
					size="sm"
					title="No records match"
				/>
			}
			groups={SEARCH_GROUPS}
			onOpenChange={setOpen}
			open={open}
			placeholder="Search deals, companies, contacts…"
			variant="popover"
			width="lg"
		/>
	)
}

/* ─── Notifications bell ────────────────────────────────────────────────── */

/** A notice as the notification components read it: its author's avatar. */
export function toInboxEntry(notice: Notice): InboxEntry {
	return {
		at: notice.at,
		description: notice.body,
		id: notice.id,
		kind: notice.kind,
		media: (
			<Avatar
				alt=""
				size="sm"
			>
				{notice.initials}
			</Avatar>
		),
		read: !notice.unread,
		title: notice.title,
		topic: notice.topic,
	}
}

export const NOTICE_ENTRIES = NOTICES.map(toInboxEntry)

export const OLDER_NOTICE_ENTRIES = OLDER_NOTICES.map(toInboxEntry)

/**
 * The bell every page shows unless it brings its own: react-web's
 * NotificationCenter over the seller's notices — nothing new is a plain bell,
 * new is a count on it, and "View all" leads to the notifications page.
 */
export function NotificationBell() {
	const inbox = useNotificationInbox({
		categories: NOTICE_CATEGORIES,
		initial: NOTICE_ENTRIES,
		older: OLDER_NOTICE_ENTRIES,
	})

	return <InboxBell inbox={inbox} />
}

/* ─── Account menu ──────────────────────────────────────────────────────── */

/** The avatar at the end of the header: who is signed in, and the way out. */
export function AccountMenu({
	defaultOpen = false,
}: {
	defaultOpen?: boolean
}) {
	const [open, setOpen] = useOpenAfterMount(defaultOpen)

	return (
		<DropdownMenu
			onOpenChange={setOpen}
			open={open}
		>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`Account menu for ${ME.name}`}
					size="icon-sm"
					variant="ghost"
				>
					<Avatar
						alt={ME.name}
						size="sm"
					>
						{ME.initials}
					</Avatar>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				side="bottom"
				sideOffset={8}
				width={256}
			>
				<DropdownMenu.Label>
					<Flex
						align="center"
						gap="sm"
					>
						<Avatar
							alt=""
							size="md"
						>
							{ME.initials}
						</Avatar>
						<Flex
							align="stretch"
							direction="col"
							gap="none"
						>
							<Typography
								size="sm"
								weight="semibold"
							>
								{ME.name}
							</Typography>
							<Typography
								size="xs"
								truncate
								variant="muted"
							>
								{ME.email}
							</Typography>
						</Flex>
					</Flex>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<UserRoundIcon size={16} />
					Profile
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<SettingsIcon size={16} />
					Settings
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<MoonIcon size={16} />
					Appearance
					<DropdownMenu.Shortcut>System</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Label>Workspace</DropdownMenu.Label>
				<DropdownMenu.Item>
					<Avatar
						alt=""
						size="sm"
						variant="square"
					>
						AL
					</Avatar>
					Acme Logistics
					<DropdownMenu.Shortcut>Owner</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOutIcon size={16} />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/* ─── Scope ─────────────────────────────────────────────────────────────── */

type Organization = {
	name: string
	organization_id: string
	role: string
	status: 'active' | 'suspended'
	workspace_mode: 'single' | 'multi'
}

/** The organizations Marina belongs to, and her role in each. */
const ORGANIZATIONS: Organization[] = [
	{
		name: 'Acme Logistics',
		organization_id: 'org-acme',
		role: 'Owner',
		status: 'active',
		workspace_mode: 'multi',
	},
	{
		name: 'Borealis Freight',
		organization_id: 'org-borealis',
		role: 'Sales manager',
		status: 'active',
		workspace_mode: 'single',
	},
]

/** Acme's workspaces — the sales teams a membership is scoped to. */
const WORKSPACES = [
	{
		is_default: true,
		name: 'Sales',
		workspace_id: 'ws-sales',
	},
	{
		is_default: false,
		name: 'Enterprise',
		workspace_id: 'ws-enterprise',
	},
	{
		is_default: false,
		name: 'Mid-market',
		workspace_id: 'ws-mid-market',
	},
]

/** A radio value that stands for "no workspace": the whole organization. */
const ALL_WORKSPACES = 'all-workspaces'

/** "Acme Logistics" → "AL"; one word gives its first two letters. */
function initialsOf(name: string) {
	const words = name.trim().split(/\s+/)

	return (
		words.length > 1
			? `${words[0][0]}${words[words.length - 1][0]}`
			: words[0].slice(0, 2)
	).toUpperCase()
}

/** The organization the session acts for, and the menu that switches it. */
function OrganizationMenu({
	currentId,
	onSwitch,
}: {
	currentId: string
	onSwitch: (organization_id: string) => void
}) {
	const name =
		ORGANIZATIONS.find(
			(organization) => organization.organization_id === currentId,
		)?.name ?? 'Choose an organization'

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`${name}, switch organization`}
					block
					className="h-auto min-w-0 max-w-full justify-between gap-1 rounded-md px-1.5 py-0.5 font-semibold text-foreground text-sm"
					rightSection={
						<ChevronDownIcon
							opacity={0.6}
							size={14}
						/>
					}
					size="sm"
					variant="ghost"
				>
					<Typography
						size="inherit"
						truncate
						variant="inherit"
						weight="inherit"
					>
						{name}
					</Typography>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="start"
				width={272}
			>
				<DropdownMenu.Label>Organizations</DropdownMenu.Label>
				<DropdownMenu.RadioGroup
					onValueChange={(value) => value !== currentId && onSwitch(value)}
					value={currentId}
				>
					{ORGANIZATIONS.map((organization) => (
						<DropdownMenu.RadioItem
							disabled={organization.status === 'suspended'}
							key={organization.organization_id}
							value={organization.organization_id}
						>
							<Flex
								align="center"
								block
								gap="sm"
							>
								<Avatar
									alt=""
									size="sm"
									variant="square"
								>
									{initialsOf(organization.name)}
								</Avatar>
								<Flex
									align="stretch"
									direction="col"
									gap="none"
								>
									<Typography
										size="inherit"
										truncate
										variant="inherit"
										weight="inherit"
									>
										{organization.name}
									</Typography>
									<Typography
										size="xs"
										truncate
										variant="muted"
									>
										{organization.status === 'suspended'
											? 'Suspended'
											: organization.role}
									</Typography>
								</Flex>
							</Flex>
						</DropdownMenu.RadioItem>
					))}
				</DropdownMenu.RadioGroup>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<PlusIcon />
					Create organization
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/**
 * The workspace the session acts in. An organization in single workspace
 * mode has nothing to choose, so the menu is not there at all (IAM-9).
 */
function WorkspaceMenu({
	currentId,
	onSwitch,
	organization,
}: {
	currentId: string | null
	onSwitch: (workspace_id: string | null) => void
	organization: Organization
}) {
	if (organization.workspace_mode === 'single') {
		return null
	}

	const value = currentId ?? ALL_WORKSPACES
	const name =
		currentId === null
			? 'All workspaces'
			: (WORKSPACES.find((workspace) => workspace.workspace_id === currentId)
					?.name ?? 'Choose a workspace')

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`${name}, switch workspace`}
					block
					className="h-auto min-w-0 max-w-full justify-between gap-1 rounded-md px-1.5 py-0.5 font-normal text-muted-foreground text-xs"
					rightSection={
						<ChevronDownIcon
							opacity={0.6}
							size={14}
						/>
					}
					size="sm"
					variant="ghost"
				>
					<Typography
						size="inherit"
						truncate
						variant="inherit"
						weight="inherit"
					>
						{name}
					</Typography>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="start"
				width={240}
			>
				<DropdownMenu.Label>Workspaces</DropdownMenu.Label>
				<DropdownMenu.RadioGroup
					onValueChange={(next) =>
						next !== value && onSwitch(next === ALL_WORKSPACES ? null : next)
					}
					value={value}
				>
					<DropdownMenu.RadioItem value={ALL_WORKSPACES}>
						All workspaces
					</DropdownMenu.RadioItem>
					{WORKSPACES.map((workspace) => (
						<DropdownMenu.RadioItem
							key={workspace.workspace_id}
							value={workspace.workspace_id}
						>
							<Flex
								align="center"
								block
								gap="sm"
								justify="between"
							>
								<Typography
									size="inherit"
									truncate
									variant="inherit"
									weight="inherit"
								>
									{workspace.name}
								</Typography>
								{workspace.is_default ? (
									<Typography
										size="xs"
										variant="muted"
									>
										Default
									</Typography>
								) : null}
							</Flex>
						</DropdownMenu.RadioItem>
					))}
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/**
 * The session's scope, in the brand: the organization as its title, the
 * workspace as its subtitle — which disappears for an organization in single
 * workspace mode (IAM-9).
 */
function ScopeBrand() {
	const [organizationId, setOrganizationId] = useState('org-acme')
	const [workspaceId, setWorkspaceId] = useState<string | null>('ws-sales')
	const organization =
		ORGANIZATIONS.find(
			(candidate) => candidate.organization_id === organizationId,
		) ?? ORGANIZATIONS[0]

	return (
		<Sidebar.Brand
			action={<Sidebar.Trigger />}
			logo={<AcmeMark size={18} />}
			subtitle={
				<WorkspaceMenu
					currentId={workspaceId}
					onSwitch={setWorkspaceId}
					organization={organization}
				/>
			}
		>
			<OrganizationMenu
				currentId={organizationId}
				onSwitch={(organization_id) => {
					setOrganizationId(organization_id)
					setWorkspaceId('ws-sales')
				}}
			/>
		</Sidebar.Brand>
	)
}

/* ─── The shell ─────────────────────────────────────────────────────────── */

/**
 * The id of the shell's `<main>`, the target of its "Skip to content" link.
 * The shell owns it, so no page has to mark the start of its own content.
 */
const MAIN_ID = 'main-content'

const SKIP_LINKS = [
	{
		href: `#${MAIN_ID}`,
		label: 'Skip to content',
	},
]

type CrmShellProps = {
	/** Which object the page belongs to; marks it in the navigation. */
	active?: CrmObject
	/** The avatar menu; the default is closed. */
	account?: ReactNode
	/** A full-width strip above the whole shell: offline, a maintenance window. */
	banner?: ReactNode
	/** The bell; the default is closed, with the unread count on it. */
	bell?: ReactNode
	/** What goes in `Layout.Main`: one or more `Layout.Content` panes. */
	children: ReactNode
	nav?: CrmNav
	/** The search box; the default is closed and empty. */
	search?: ReactNode
}

function HeaderActions({
	account,
	bell,
}: Pick<CrmShellProps, 'account' | 'bell'>) {
	return (
		<>
			<Button
				ariaLabel="Help"
				size="icon-sm"
				variant="ghost"
			>
				<CircleHelpIcon size={16} />
			</Button>
			<Button
				ariaLabel="Setup"
				size="icon-sm"
				variant="ghost"
			>
				<SettingsIcon size={16} />
			</Button>
			{bell ?? <NotificationBell />}
			{account ?? <AccountMenu />}
		</>
	)
}

function CentredSearch({ search }: Pick<CrmShellProps, 'search'>) {
	return (
		<Flex
			block
			justify="center"
		>
			{search ?? <GlobalSearch />}
		</Flex>
	)
}

/**
 * The frame every B2B page sits in, in the CRM style: global search centred in
 * the header, global actions at its end (help, setup, the bell, the avatar),
 * and the objects the organisation works with — leads, contacts, companies,
 * deals — as the navigation.
 */
export function CrmShell({
	account,
	active = 'deals',
	banner,
	bell,
	children,
	nav = 'sidebar',
	search,
}: CrmShellProps) {
	if (nav === 'topbar') {
		return (
			<Layout
				banner={banner}
				height="fill"
				padding="sm"
				skipLinks={SKIP_LINKS}
			>
				<Layout.Header
					bordered
					leftSection={
						<Flex
							align="center"
							gap="sm"
						>
							<Button
								ariaLabel="App launcher"
								size="icon-sm"
								variant="ghost"
							>
								<LayoutGridIcon size={16} />
							</Button>
							<AcmeMark size={22} />
							<Typography
								noWrap
								size="sm"
								weight="semibold"
							>
								Acme Sales
							</Typography>
						</Flex>
					}
					rightSection={
						<HeaderActions
							account={account}
							bell={bell}
						/>
					}
					size="md"
				>
					<CentredSearch search={search} />
				</Layout.Header>
				{/*
				  The context bar: one tab per object, the row enterprise CRMs keep under
				  its global header. Tabs rather than links because the row marks
				  where you are; the panels are the page below.
				*/}
				<Layout.Header
					bordered
					size="sm"
				>
					<Tabs
						block
						value={active}
					>
						<Tabs.List
							ariaLabel="Objects"
							block
						>
							{OBJECTS.map(({ icon: Icon, id, label }) => (
								<Tabs.Trigger
									icon={<Icon size={14} />}
									key={id}
									value={id}
								>
									{label}
								</Tabs.Trigger>
							))}
						</Tabs.List>
					</Tabs>
				</Layout.Header>
				<Layout.Main id={MAIN_ID}>{children}</Layout.Main>
			</Layout>
		)
	}

	return (
		<Sidebar.Provider
			banner={banner}
			defaultOpen={nav !== 'sidebar-collapsed'}
			height="fill"
			width="sm"
		>
			<Sidebar collapsible="icon">
				<Sidebar.Header>
					<ScopeBrand />
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.Group.Label>Objects</Sidebar.Group.Label>
						<Sidebar.Group.Content>
							<Sidebar.Menu>
								{OBJECTS.map(({ count, icon: Icon, id, label }) => (
									<Sidebar.Menu.Item key={id}>
										<Sidebar.Menu.Button
											isActive={id === active}
											tooltip={label}
										>
											<Icon />
											<Typography
												size="sm"
												variant="inherit"
												weight="inherit"
											>
												{label}
											</Typography>
										</Sidebar.Menu.Button>
										{count ? (
											<Sidebar.Menu.Badge>{count}</Sidebar.Menu.Badge>
										) : null}
									</Sidebar.Menu.Item>
								))}
							</Sidebar.Menu>
						</Sidebar.Group.Content>
					</Sidebar.Group>
					<Sidebar.Group>
						<Sidebar.Group.Label>Favourites</Sidebar.Group.Label>
						<Sidebar.Group.Content>
							<Sidebar.Menu>
								{[
									'My open deals',
									'Closing this month',
								].map((view) => (
									<Sidebar.Menu.Item key={view}>
										<Sidebar.Menu.Button
											size="sm"
											tooltip={view}
										>
											<BriefcaseIcon />
											<Typography
												size="sm"
												variant="inherit"
												weight="inherit"
											>
												{view}
											</Typography>
										</Sidebar.Menu.Button>
									</Sidebar.Menu.Item>
								))}
							</Sidebar.Menu>
						</Sidebar.Group.Content>
					</Sidebar.Group>
				</Sidebar.Content>
				<Sidebar.Footer>
					<Sidebar.Menu>
						<Sidebar.Menu.Item>
							<Sidebar.Menu.Button
								isActive={active === 'setup'}
								tooltip="Setup"
							>
								<SettingsIcon />
								<Typography
									size="sm"
									variant="inherit"
									weight="inherit"
								>
									Setup
								</Typography>
							</Sidebar.Menu.Button>
						</Sidebar.Menu.Item>
					</Sidebar.Menu>
				</Sidebar.Footer>
			</Sidebar>
			<Layout
				padding="md"
				skipLinks={SKIP_LINKS}
			>
				<Layout.Header
					bordered
					rightSection={
						<HeaderActions
							account={account}
							bell={bell}
						/>
					}
					size="md"
				>
					<CentredSearch search={search} />
				</Layout.Header>
				<Layout.Main id={MAIN_ID}>{children}</Layout.Main>
			</Layout>
		</Sidebar.Provider>
	)
}
