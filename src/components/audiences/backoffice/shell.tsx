import {
	ArrowLeftRightIcon,
	BanknoteIcon,
	BookOpenIcon,
	CircleHelpIcon,
	Code2Icon,
	CreditCardIcon,
	FileTextIcon,
	HomeIcon,
	LogOutIcon,
	PackageIcon,
	PinIcon,
	PlusIcon,
	ScaleIcon,
	SettingsIcon,
	ShieldAlertIcon,
	TestTubeIcon,
	UserRoundIcon,
	UsersIcon,
	WalletIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Avatar,
	Box,
	Button,
	DropdownMenu,
	Flex,
	FormatProvider,
	Layout,
	SpotlightSearch,
	type SpotlightSearchGroup,
	Tooltip,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useEffect, useState } from 'react'

import { CUSTOMERS, PAYMENTS } from './data'
import {
	NOTIFICATION_CATEGORIES,
	NOTIFICATIONS,
	OLDER_NOTIFICATIONS,
} from './notification-data'

import { AcmeMark } from '@/components/audiences/acme-logo'
import {
	InboxBell,
	useNotificationInbox,
} from '@/components/audiences/notification-inbox'

/** The rail is `Layout.Sidebar`; the alias keeps this file's JSX readable. */
const Sidebar = Layout.Sidebar

/**
 * - `sidebar`   — the rail, expanded: the default for an internal tool
 * - `collapsed` — the same rail reduced to icons, for a wide table
 * - `topbar`    — navigation across the header, for a tool with five pages
 */
export type ShellNav = 'sidebar' | 'collapsed' | 'topbar'

export type NavKey =
	| 'home'
	| 'balances'
	| 'payments'
	| 'customers'
	| 'products'
	| 'reports'
	| 'disputes'
	| 'payouts'
	| 'webhooks'
	| 'invoices'
	| 'subscriptions'
	| 'developers'
	| 'settings'

type NavItem = {
	badge?: number
	icon: ReactNode
	key: NavKey
	label: string
}

const MAIN_NAV: NavItem[] = [
	{
		icon: <HomeIcon size={16} />,
		key: 'home',
		label: 'Home',
	},
	{
		icon: <WalletIcon size={16} />,
		key: 'balances',
		label: 'Balances',
	},
	{
		icon: <ArrowLeftRightIcon size={16} />,
		key: 'payments',
		label: 'Payments',
	},
	{
		icon: <UsersIcon size={16} />,
		key: 'customers',
		label: 'Customers',
	},
	{
		icon: <PackageIcon size={16} />,
		key: 'products',
		label: 'Product catalog',
	},
	{
		icon: <FileTextIcon size={16} />,
		key: 'reports',
		label: 'Reports',
	},
]

/** Recent and pinned pages: what this operator opens every day. */
const SHORTCUTS: NavItem[] = [
	{
		badge: 2,
		icon: <ShieldAlertIcon size={16} />,
		key: 'disputes',
		label: 'Disputes',
	},
	{
		icon: <BanknoteIcon size={16} />,
		key: 'payouts',
		label: 'Payouts',
	},
]

const BILLING: {
	key: NavKey
	label: string
}[] = [
	{
		key: 'invoices',
		label: 'Invoices',
	},
	{
		key: 'subscriptions',
		label: 'Subscriptions',
	},
]

/**
 * The environment notice. It is not dismissible: an operator who closes it
 * and forgets which environment they are in is the accident it prevents.
 */
export function SandboxBanner() {
	return (
		<Alert
			layout="banner"
			variant="warning"
		>
			<Alert.Icon>
				<TestTubeIcon size={16} />
			</Alert.Icon>
			<Alert.Title>Sandbox</Alert.Title>
			<Alert.Description>
				You are working with test data. Nothing here moves real money.
			</Alert.Description>
			<Alert.Action>
				<Button
					size="sm"
					variant="link"
				>
					Switch to live
				</Button>
			</Alert.Action>
		</Alert>
	)
}

function NavLabel({ children }: { children: ReactNode }) {
	return (
		<Typography
			noWrap
			size="sm"
			variant="inherit"
			weight="inherit"
		>
			{children}
		</Typography>
	)
}

function NavGroup({
	action,
	active,
	children,
	items,
	label,
}: {
	action?: ReactNode
	active: NavKey
	children?: ReactNode
	items: NavItem[]
	label?: string
}) {
	return (
		<Sidebar.Group>
			{label && <Sidebar.Group.Label>{label}</Sidebar.Group.Label>}
			{action}
			<Sidebar.Group.Content>
				<Sidebar.Menu>
					{items.map((item) => (
						<Sidebar.Menu.Item key={item.key}>
							<Sidebar.Menu.Button
								ariaLabel={item.label}
								isActive={item.key === active}
								size="sm"
								tooltip={item.label}
							>
								{item.icon}
								<NavLabel>{item.label}</NavLabel>
							</Sidebar.Menu.Button>
							{item.badge !== undefined && (
								<Sidebar.Menu.Badge>{item.badge}</Sidebar.Menu.Badge>
							)}
						</Sidebar.Menu.Item>
					))}
					{children}
				</Sidebar.Menu>
			</Sidebar.Group.Content>
		</Sidebar.Group>
	)
}

/**
 * The billing products as one row that opens in place, the way a payments dashboard
 * folds Billing: a third labelled group of two rows made the rail taller than the
 * frame, and the rail's scroll has no visible bar, so its last rows read as
 * cut off. The row opens by itself on a billing page, so the current page is
 * always shown.
 */
function BillingItem({ active }: { active: NavKey }) {
	const current = BILLING.some((item) => item.key === active)

	return (
		<Sidebar.Menu.Item>
			<Sidebar.Menu.Collapsible
				defaultOpen={current}
				label="Billing"
			>
				<Sidebar.Menu.Collapsible.Trigger
					isActive={current}
					size="sm"
					tooltip="Billing"
				>
					<CreditCardIcon size={16} />
					<NavLabel>Billing</NavLabel>
				</Sidebar.Menu.Collapsible.Trigger>
				<Sidebar.Menu.Collapsible.Content>
					<Sidebar.Menu.Sub>
						{BILLING.map((item) => (
							<Sidebar.Menu.Sub.Item key={item.key}>
								<Sidebar.Menu.Sub.Button
									href={`#${item.key}`}
									isActive={item.key === active}
									size="sm"
								>
									{item.label}
								</Sidebar.Menu.Sub.Button>
							</Sidebar.Menu.Sub.Item>
						))}
					</Sidebar.Menu.Sub>
				</Sidebar.Menu.Collapsible.Content>
			</Sidebar.Menu.Collapsible>
		</Sidebar.Menu.Item>
	)
}

/**
 * The operator's own menu, at the end of the header, where dashboards keep it. It used
 * to be a two-line row at the foot of the rail, and that row was the height
 * the rail's navigation ran out of.
 */
function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel="Account: Ana Ribeiro"
					size="icon-sm"
					variant="ghost"
				>
					<Avatar
						alt="Ana Ribeiro"
						size="sm"
					>
						AR
					</Avatar>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={200}
			>
				<DropdownMenu.Label>
					Ana Ribeiro&nbsp;· Operations lead
				</DropdownMenu.Label>
				<DropdownMenu.Item>
					<UserRoundIcon size={16} />
					Profile
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<SettingsIcon size={16} />
					Settings
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOutIcon size={16} />
					Sign out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

function Rail({ active }: { active: NavKey }) {
	return (
		<Sidebar
			collapsible="icon"
			side="left"
		>
			<Sidebar.Header>
				<Sidebar.Brand
					action={<Sidebar.Trigger />}
					logo={<AcmeMark size={18} />}
					subtitle="Sandbox"
				>
					Acme Inc
				</Sidebar.Brand>
			</Sidebar.Header>

			<Sidebar.Content>
				<NavGroup
					active={active}
					items={MAIN_NAV}
				>
					<BillingItem active={active} />
				</NavGroup>
				<NavGroup
					action={
						<Sidebar.Group.Action ariaLabel="Pin the current page">
							<PinIcon size={14} />
						</Sidebar.Group.Action>
					}
					active={active}
					items={SHORTCUTS}
					label="Shortcuts"
				/>
			</Sidebar.Content>

			<Sidebar.Footer>
				<Sidebar.Menu>
					<Sidebar.Menu.Item>
						<Sidebar.Menu.Button
							ariaLabel="Developers"
							isActive={active === 'developers'}
							size="sm"
							tooltip="Developers"
						>
							<Code2Icon size={16} />
							<NavLabel>Developers</NavLabel>
						</Sidebar.Menu.Button>
					</Sidebar.Menu.Item>
				</Sidebar.Menu>
			</Sidebar.Footer>
		</Sidebar>
	)
}

/** What the header search knows about, before any server is involved. */
const SEARCH_RECORDS: SpotlightSearchGroup[] = [
	{
		heading: 'Payments',
		items: PAYMENTS.slice(0, 6).map((payment) => ({
			description: `${payment.customer}\u00a0· ${payment.id}`,
			icon: <ArrowLeftRightIcon size={16} />,
			id: payment.id,
			keywords: [
				payment.email,
				payment.id,
			],
			label: payment.description,
		})),
	},
	{
		heading: 'Customers',
		items: CUSTOMERS.map((customer) => ({
			description: `${customer.email}\u00a0· ${customer.id}`,
			icon: <UserRoundIcon size={16} />,
			id: customer.id,
			keywords: [
				customer.email,
				customer.id,
			],
			label: customer.name,
		})),
	},
]

/** Before anything is typed: where this person was, and where they go. */
export const SEARCH_RECENTS: SpotlightSearchGroup[] = [
	{
		heading: 'Recent',
		items: [
			{
				description: 'Payment\u00a0· py_3QxL2wP8hJvKYlo45',
				icon: <ArrowLeftRightIcon size={16} />,
				id: 'recent-payment',
				label: 'Order #10479',
			},
			{
				description: 'Customer\u00a0· cus_Q9pL3vBn6Yt1Cs',
				icon: <UserRoundIcon size={16} />,
				id: 'recent-customer',
				label: 'Northwind Travel',
			},
		],
	},
	{
		heading: 'Jump to',
		items: [
			{
				icon: <ShieldAlertIcon size={16} />,
				id: 'jump-disputes',
				label: 'Disputes',
				shortcut: [
					'G',
					'D',
				],
			},
			{
				icon: <BanknoteIcon size={16} />,
				id: 'jump-payouts',
				label: 'Payouts',
				shortcut: [
					'G',
					'O',
				],
			},
			{
				icon: <ScaleIcon size={16} />,
				id: 'jump-balances',
				label: 'Balances',
				shortcut: [
					'G',
					'B',
				],
			},
		],
	},
]

/** Matches the way the list page's search does: label, description, keywords. */
export function searchRecords(query: string): SpotlightSearchGroup[] {
	const needle = query.trim().toLowerCase()

	return SEARCH_RECORDS.map((group) => ({
		...group,
		items: group.items.filter((item) =>
			[
				item.label,
				item.description ?? '',
				...(item.keywords ?? []),
			].some((text) => text.toLowerCase().includes(needle)),
		),
	})).filter((group) => group.items.length > 0)
}

function HeaderSearch({
	defaultOpen,
	defaultQuery = '',
	shortcut = true,
}: {
	defaultOpen?: boolean
	defaultQuery?: string
	shortcut?: boolean
}) {
	const [query, setQuery] = useState(defaultQuery)
	const [open, setOpen] = useState(false)

	// Opened a beat after mount, so the click that brought this screen up is
	// not read as a press outside the dropdown that closes it again.
	useEffect(() => {
		if (!defaultOpen) {
			return
		}
		const timer = setTimeout(() => setOpen(true), 300)
		return () => clearTimeout(timer)
	}, [
		defaultOpen,
	])

	return (
		<SpotlightSearch
			ariaLabel="Search payments, customers and IDs"
			emptyQueryGroups={SEARCH_RECENTS}
			footer={
				<Box
					paddingX="sm"
					paddingY="xs"
				>
					<Typography
						size="xs"
						variant="muted"
					>
						Try email:, amount:&gt;100 or is:refunded — paste an ID to jump
						straight to it
					</Typography>
				</Box>
			}
			groups={searchRecords(query)}
			onOpenChange={setOpen}
			onSearchChange={setQuery}
			open={open}
			placeholder="Search payments, customers, IDs…"
			searchValue={query}
			shortcut={shortcut}
			variant="popover"
			width="md"
		/>
	)
}

/**
 * The bell every page shows unless it brings its own: react-web's
 * NotificationCenter over this shell's inbox, "View all" leading to the
 * notifications page.
 */
function ShellBell() {
	const inbox = useNotificationInbox({
		categories: NOTIFICATION_CATEGORIES,
		initial: NOTIFICATIONS,
		older: OLDER_NOTIFICATIONS,
	})

	return <InboxBell inbox={inbox} />
}

function CreateMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel="Create"
					size="icon-sm"
				>
					<PlusIcon size={16} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={200}
			>
				<DropdownMenu.Label>Create</DropdownMenu.Label>
				<DropdownMenu.Item>
					Payment
					<DropdownMenu.Shortcut>N P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Customer
					<DropdownMenu.Shortcut>N C</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Invoice
					<DropdownMenu.Shortcut>N I</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Product
					<DropdownMenu.Shortcut>N R</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/**
 * Settings lives here only: the gear marks itself current
 * on the settings page, and the rail keeps its height for navigation.
 */
function HeaderActions({ active, bell }: { active: NavKey; bell?: ReactNode }) {
	return (
		<Flex
			align="center"
			gap="xs"
		>
			<Tooltip content="Help and keyboard shortcuts (?)">
				<Button
					ariaLabel="Help"
					size="icon-sm"
					variant="ghost"
				>
					<CircleHelpIcon size={16} />
				</Button>
			</Tooltip>
			{bell ?? <ShellBell />}
			<Button
				ariaLabel="Settings"
				current={active === 'settings' && 'page'}
				href="#settings"
				size="icon-sm"
				variant="ghost"
			>
				<SettingsIcon size={16} />
			</Button>
			<CreateMenu />
			<AccountMenu />
		</Flex>
	)
}

const TOPBAR_NAV: NavItem[] = [
	MAIN_NAV[0],
	MAIN_NAV[2],
	MAIN_NAV[3],
	MAIN_NAV[4],
	MAIN_NAV[5],
]

export type BackofficeShellProps = {
	active: NavKey // the page the navigation marks as current
	banner?: ReactNode // the strip over the shell; default the sandbox notice, null for none
	bell?: ReactNode // the header bell; default a closed NotificationCenter over the shell's inbox
	children: ReactNode // the page: one or more Layout.Content
	nav?: ShellNav // where the navigation lives; default sidebar
	searchOpen?: boolean // opens the header search on mount
	searchQuery?: string // what the header search starts with
	searchShortcut?: boolean // binds Cmd+K to the header field; off when a page owns the palette
}

/**
 * How every number in the Backoffice is written. The account is Brazilian —
 * it takes Pix and boleto, pays out to a Brazilian bank, settles in BRL — so
 * amounts and figures read the Brazilian way (R$ 1.284.310,00, 12,4%) whatever
 * the reader's browser says, while the words stay English. Dates keep English
 * month names: every date here is an explicit pattern, which does not follow
 * the locale.
 */
const BACKOFFICE_FORMAT = {
	currency: 'brl',
	locale: 'pt-BR',
} as const

/**
 * The frame every Backoffice page sits in — a payments dashboard's: a rail
 * with the main sections, a Shortcuts group of pinned and recent pages and the
 * billing products; a header that is mostly search, with help, the bell,
 * settings and a create menu; and the environment banner above both.
 *
 * Pages hand it their `Layout.Content`. Everything else — which item is
 * current, whether the bell or the search starts open, which banner is up —
 * is a prop, so every page in this audience is shown inside the real frame.
 */
export function BackofficeShell({
	active,
	banner = <SandboxBanner />,
	bell,
	children,
	nav = 'sidebar',
	searchOpen,
	searchQuery,
	searchShortcut = true,
}: BackofficeShellProps) {
	const header = (
		<Layout.Header
			bordered
			leftSection={
				nav === 'topbar' ? (
					<Flex
						align="center"
						gap="md"
					>
						<Flex
							align="center"
							gap="xs"
						>
							<AcmeMark size={20} />
							<Typography
								noWrap
								size="sm"
								weight="semibold"
							>
								Acme Inc
							</Typography>
						</Flex>
						<Flex
							align="center"
							gap="none"
						>
							{TOPBAR_NAV.map((item) => (
								<Button
									current={item.key === active && 'page'}
									href={`#${item.key}`}
									key={item.key}
									size="sm"
									variant="ghost"
								>
									{item.label}
								</Button>
							))}
						</Flex>
					</Flex>
				) : undefined
			}
			rightSection={
				<HeaderActions
					active={active}
					bell={bell}
				/>
			}
			size="md"
		>
			<HeaderSearch
				defaultOpen={searchOpen}
				defaultQuery={searchQuery}
				shortcut={searchShortcut}
			/>
		</Layout.Header>
	)

	return (
		<FormatProvider format={BACKOFFICE_FORMAT}>
			{nav === 'topbar' ? (
				<Layout
					banner={banner}
					height="fill"
				>
					{header}
					<Layout.Main>{children}</Layout.Main>
				</Layout>
			) : (
				<Sidebar.Provider
					banner={banner}
					defaultOpen={nav !== 'collapsed'}
					height="fill"
					width="sm"
				>
					<Rail active={active} />
					<Layout>
						{header}
						<Layout.Main>{children}</Layout.Main>
					</Layout>
				</Sidebar.Provider>
			)}
		</FormatProvider>
	)
}

/** A docs link, for the footers of forms and empty pages. */
export function DocsLink({ children }: { children: ReactNode }) {
	return (
		<Button
			external
			href="https://docs.acme.example"
			leftSection={<BookOpenIcon size={14} />}
			size="sm"
			variant="link-muted"
		>
			{children}
		</Button>
	)
}
