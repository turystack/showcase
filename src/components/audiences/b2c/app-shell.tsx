import {
	ChevronDownIcon,
	HeartIcon,
	HouseIcon,
	LogOutIcon,
	MapPinIcon,
	MenuIcon,
	PlusIcon,
	ReceiptIcon,
	SearchIcon,
	SettingsIcon,
	ShoppingBagIcon,
	UserIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Box,
	Button,
	DropdownMenu,
	Flex,
	Grid,
	Indicator,
	Input,
	Layout,
	Page,
	Progress,
	SegmentedControl,
	Typography,
	useIsMobile,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { AcmeLogo, AcmeMark } from '@/components/audiences/acme-logo'
import { CUSTOMER, STORES } from '@/components/audiences/b2c/data'
import {
	SHELF_PER_CONTAINER,
	Shelf,
	StoreCard,
} from '@/components/audiences/b2c/parts'

/**
 * The frame every consumer page sits in, in four ways a consumer product
 * ships it.
 *
 * - `header` — the delivery topbar: logo, delivery or pickup, the address,
 *   search, cart and account. The destinations live in a drawer behind the
 *   menu button, the way delivery apps do it on the web
 * - `tab-bar` — the destinations in the header on a desktop, and in a tab bar
 *   at the bottom below 768px, where a thumb reaches them. Narrow the window
 *   to see it; a desktop has no bottom tab bar
 * - `minimal` — logo and account only, for the pages that must not distract:
 *   checkout, errors, maintenance
 * - `sidebar-bar` — a library rail, the content, and a bar that stays at the
 *   bottom whatever the page: a music app's player, here the order on its way
 *
 * Every other B2C screen renders inside `ConsumerShell`, so the shell is
 * decided here once.
 */
export type AppShellVariant = 'header' | 'tab-bar' | 'minimal' | 'sidebar-bar'

export type Destination = 'home' | 'search' | 'orders' | 'favourites'

const DESTINATIONS: {
	icon: typeof HouseIcon
	id: Destination
	label: string
}[] = [
	{
		icon: HouseIcon,
		id: 'home',
		label: 'Home',
	},
	{
		icon: SearchIcon,
		id: 'search',
		label: 'Search',
	},
	{
		icon: ReceiptIcon,
		id: 'orders',
		label: 'Orders',
	},
	{
		icon: HeartIcon,
		id: 'favourites',
		label: 'Favourites',
	},
]

function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel="Account"
					size="icon-md"
					variant="ghost"
				>
					<Avatar
						alt={CUSTOMER.name}
						size="sm"
					>
						{CUSTOMER.initials}
					</Avatar>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={220}
			>
				<DropdownMenu.Label>{CUSTOMER.name}</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<UserIcon size={16} />
					Account
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<ReceiptIcon size={16} />
					Orders
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

function CartButton() {
	return (
		<Indicator
			count={3}
			label="3 items in the cart"
		>
			<Button
				ariaLabel="Cart"
				size="icon-md"
				variant="outline"
			>
				<ShoppingBagIcon size={18} />
			</Button>
		</Indicator>
	)
}

function SearchField({
	hideBelow,
	query,
}: {
	/** Gone below this breakpoint, where the header has no room for it. */
	hideBelow?: 'md'
	query?: string
}) {
	return (
		<Box
			grow
			hideBelow={hideBelow}
		>
			<Input
				ariaLabel="Search"
				defaultValue={query}
				inputMode="search"
				leftSection={<SearchIcon size={16} />}
				placeholder="Search stores, dishes and groceries"
			/>
		</Box>
	)
}

function AddressButton() {
	return (
		<Button
			leftSection={<MapPinIcon size={16} />}
			rightSection={<ChevronDownIcon size={14} />}
			size="sm"
			variant="ghost"
		>
			Rua Harmonia, 412
		</Button>
	)
}

/** The bar the `sidebar-bar` shell keeps at the bottom of every page. */
function ActiveOrderBar() {
	return (
		<Flex
			align="center"
			block
			gap="md"
			justify="between"
		>
			<Avatar
				alt="Padaria Aurora"
				size="md"
				variant="square"
			>
				PA
			</Avatar>
			{/*
			 * The progress sits under the words, as a player's scrubber sits under
			 * the track: beside them it is the first thing a narrow bar squeezes
			 * to nothing.
			 */}
			<Box
				grow
				overflow="hidden"
			>
				<Flex
					align="stretch"
					direction="col"
					gap="xs"
				>
					<Typography
						component="span"
						size="sm"
						truncate
						weight="semibold"
					>
						Out for delivery · arrives 12:40
					</Typography>
					<Typography
						component="span"
						size="xs"
						truncate
						variant="muted"
					>
						Padaria Aurora&nbsp;· order #4821&nbsp;· Rafael, on a motorbike
					</Typography>
					<Progress
						ariaLabel="Order #4821 delivery progress"
						size="sm"
						value={72}
					/>
				</Flex>
			</Box>
			<Button
				href="#"
				size="sm"
			>
				Track order
			</Button>
		</Flex>
	)
}

function HeaderShell({
	banner,
	children,
	extra,
	query,
}: {
	banner?: ReactNode
	children: ReactNode
	extra?: ReactNode
	query?: string
}) {
	return (
		<Layout
			banner={banner}
			height="fill"
		>
			<Layout.Header
				bordered
				leftSection={
					<Flex
						align="center"
						gap="sm"
					>
						<Button
							ariaLabel="Open menu"
							size="icon-md"
							variant="ghost"
						>
							<MenuIcon size={18} />
						</Button>
						<AcmeLogo />
						{/*
						 * A phone keeps the menu, the logo, the cart and the account;
						 * delivery mode and address wait behind the menu.
						 */}
						<Flex
							align="center"
							gap="sm"
							hideBelow="md"
						>
							<SegmentedControl
								ariaLabel="Delivery or pickup"
								defaultValue="delivery"
								optionLabel="label"
								options={[
									{
										label: 'Delivery',
										value: 'delivery',
									},
									{
										label: 'Pickup',
										value: 'pickup',
									},
								]}
								optionValue="value"
								size="sm"
							/>
							<AddressButton />
						</Flex>
					</Flex>
				}
				rightSection={
					<Flex
						align="center"
						gap="sm"
					>
						{extra}
						<CartButton />
						<AccountMenu />
					</Flex>
				}
				size="lg"
			>
				{/* With a control beside the cart there is no room left for the
				 * field on a phone; it waits behind the menu with the address. */}
				<SearchField
					hideBelow={extra ? 'md' : undefined}
					query={query}
				/>
			</Layout.Header>
			<Layout.Main>{children}</Layout.Main>
		</Layout>
	)
}

function TabBarShell({
	active,
	banner,
	children,
	query,
}: {
	active: Destination
	banner?: ReactNode
	children: ReactNode
	query?: string
}) {
	const isMobile = useIsMobile()

	return (
		<Layout
			banner={banner}
			height="fill"
		>
			<Layout.Header
				bordered
				leftSection={
					<Flex
						align="center"
						gap="md"
					>
						<AcmeLogo />
						<Flex
							align="center"
							gap="xs"
							hideBelow="md"
						>
							{DESTINATIONS.map((item) => (
								<Button
									current={item.id === active && 'page'}
									href="#"
									key={item.id}
									leftSection={<item.icon size={16} />}
									size="sm"
									variant={item.id === active ? 'secondary' : 'ghost'}
								>
									{item.label}
								</Button>
							))}
						</Flex>
					</Flex>
				}
				rightSection={
					<Flex
						align="center"
						gap="sm"
					>
						<CartButton />
						<AccountMenu />
					</Flex>
				}
				size="lg"
			>
				<SearchField
					hideBelow="md"
					query={query}
				/>
			</Layout.Header>
			<Layout.Main>{children}</Layout.Main>
			{isMobile && (
				<Layout.Footer
					bordered
					size="lg"
				>
					<Grid
						cols={4}
						gap="xs"
					>
						{DESTINATIONS.map((item) => (
							<Button
								block
								current={item.id === active && 'page'}
								href="#"
								key={item.id}
								leftSection={<item.icon size={18} />}
								size="sm"
								variant={item.id === active ? 'secondary' : 'ghost'}
							>
								{item.label}
							</Button>
						))}
					</Grid>
				</Layout.Footer>
			)}
		</Layout>
	)
}

export function MinimalShell({
	banner,
	centered = false,
	children,
	signedIn = true,
}: {
	banner?: ReactNode
	/** One thing in the middle of the page — an error, a sign-in prompt. */
	centered?: boolean
	children: ReactNode
	signedIn?: boolean
}) {
	return (
		<Layout
			banner={banner}
			height="fill"
			variant={centered ? 'centered' : 'default'}
		>
			<Layout.Header
				bordered
				leftSection={<AcmeLogo />}
				rightSection={
					<Flex
						align="center"
						gap="sm"
					>
						<Button
							href="#"
							size="sm"
							variant="link-muted"
						>
							Help
						</Button>
						{signedIn ? (
							<AccountMenu />
						) : (
							<Button
								size="sm"
								variant="outline"
							>
								Sign in
							</Button>
						)}
					</Flex>
				}
				size="lg"
			/>
			<Layout.Main>{children}</Layout.Main>
		</Layout>
	)
}

const Sidebar = Layout.Sidebar

function SidebarBarShell({
	active,
	banner,
	children,
	query,
}: {
	active: Destination
	banner?: ReactNode
	children: ReactNode
	query?: string
}) {
	return (
		<Sidebar.Provider
			banner={banner}
			height="fill"
			width="lg"
		>
			<Sidebar collapsible="icon">
				<Sidebar.Header>
					<Sidebar.Brand
						action={<Sidebar.Trigger />}
						logo={<AcmeMark size={24} />}
					>
						Acme
					</Sidebar.Brand>
				</Sidebar.Header>
				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.Menu>
							{DESTINATIONS.map((item) => (
								<Sidebar.Menu.Item key={item.id}>
									<Sidebar.Menu.Button
										isActive={item.id === active}
										leftSection={<item.icon />}
										tooltip={item.label}
									>
										{item.label}
									</Sidebar.Menu.Button>
								</Sidebar.Menu.Item>
							))}
						</Sidebar.Menu>
					</Sidebar.Group>
					<Sidebar.Group>
						<Sidebar.Group.Label>Your places</Sidebar.Group.Label>
						<Sidebar.Group.Action ariaLabel="Add a place">
							<PlusIcon />
						</Sidebar.Group.Action>
						<Sidebar.Menu>
							{STORES.slice(0, 6).map((store) => (
								<Sidebar.Menu.Item key={store.id}>
									<Sidebar.Menu.Button
										description={`${store.category}\u00a0· ${store.eta}`}
										leftSection={
											<Avatar
												alt={store.name}
												size="sm"
												variant="square"
											>
												{store.initials}
											</Avatar>
										}
										size="lg"
										tooltip={store.name}
									>
										{store.name}
									</Sidebar.Menu.Button>
								</Sidebar.Menu.Item>
							))}
						</Sidebar.Menu>
					</Sidebar.Group>
				</Sidebar.Content>
			</Sidebar>
			<Layout>
				<Layout.Header
					bordered
					rightSection={
						<Flex
							align="center"
							gap="sm"
						>
							<AddressButton />
							<CartButton />
							<AccountMenu />
						</Flex>
					}
					size="lg"
				>
					<SearchField query={query} />
				</Layout.Header>
				<Layout.Main>{children}</Layout.Main>
				<Layout.Footer
					bordered
					size="lg"
				>
					<ActiveOrderBar />
				</Layout.Footer>
			</Layout>
		</Sidebar.Provider>
	)
}

/**
 * The shell, chosen once. `children` is what goes in `Layout.Main`: one
 * `Layout.Content`, or two side by side for a page with an aside.
 */
export function ConsumerShell({
	active = 'home',
	banner,
	children,
	extra,
	query,
	variant = 'header',
}: {
	active?: Destination
	banner?: ReactNode
	children: ReactNode
	/** A control beside the cart, such as the notifications bell. */
	extra?: ReactNode
	query?: string
	variant?: AppShellVariant
}) {
	if (variant === 'minimal') {
		return <MinimalShell banner={banner}>{children}</MinimalShell>
	}

	if (variant === 'tab-bar') {
		return (
			<TabBarShell
				active={active}
				banner={banner}
				query={query}
			>
				{children}
			</TabBarShell>
		)
	}

	if (variant === 'sidebar-bar') {
		return (
			<SidebarBarShell
				active={active}
				banner={banner}
				query={query}
			>
				{children}
			</SidebarBarShell>
		)
	}

	return (
		<HeaderShell
			banner={banner}
			extra={extra}
			query={query}
		>
			{children}
		</HeaderShell>
	)
}

export function AppShell({ variant }: { variant: AppShellVariant }) {
	return (
		<ConsumerShell variant={variant}>
			<Layout.Content maxWidth="lg">
				<Page>
					{/* Same inset as the shelves, whose arrows need the gutter. */}
					<Box paddingX="lg">
						<Page.Header
							description="Delivering to Rua Harmonia, 412 — Vila Madalena"
							title="Good evening, Marina"
						/>
					</Box>
					<Page.Content>
						{/*
						 * The library rail takes a column, so beside it the shelf counts
						 * its cards by its own width, not the screen's.
						 */}
						<Shelf
							perView={
								variant === 'sidebar-bar' ? SHELF_PER_CONTAINER : undefined
							}
							responsiveTo={variant === 'sidebar-bar' ? 'container' : undefined}
							subtitle="The places you order from most"
							title="Order again"
						>
							{STORES.slice(0, 6).map((store) => (
								<StoreCard
									key={store.id}
									saved={store.id === 'aurora'}
									store={store}
								/>
							))}
						</Shelf>
					</Page.Content>
				</Page>
			</Layout.Content>
		</ConsumerShell>
	)
}
