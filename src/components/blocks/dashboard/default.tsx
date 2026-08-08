import {
	Avatar,
	Button,
	Card,
	DropdownMenu,
	Layout,
	Provider,
	useSidebar,
} from '@turystack/ui'
import {
	BarChart3,
	Bell,
	Home,
	LayoutDashboard,
	LogOut,
	Package,
	Settings,
	ShoppingCart,
	User,
	Users,
} from 'lucide-react'

function SidebarCustomHeader() {
	const { state } = useSidebar()
	const collapsed = state === 'collapsed'
	return (
		<div
			className={
				collapsed
					? 'flex items-center justify-center overflow-hidden'
					: 'flex flex-1 items-center gap-2 overflow-hidden'
			}
		>
			<LayoutDashboard className="h-5 w-5 shrink-0 text-primary" />
			{!collapsed && (
				<span className="truncate font-semibold text-sm">Acme Inc</span>
			)}
		</div>
	)
}

function SidebarFooterUser() {
	const { state } = useSidebar()
	const collapsed = state === 'collapsed'

	if (collapsed) {
		return (
			<Layout.Sidebar.Menu.Item>
				<Layout.Sidebar.Menu.Button size="lg">
					<Avatar size="sm">A</Avatar>
				</Layout.Sidebar.Menu.Button>
			</Layout.Sidebar.Menu.Item>
		)
	}

	return (
		<Layout.Sidebar.Menu.Item>
			<Layout.Sidebar.Menu.Button size="lg">
				<Avatar size="sm">A</Avatar>
				<div className="flex min-w-0 flex-1 flex-col text-left">
					<span className="truncate font-medium text-sm">Alice Johnson</span>
					<span className="truncate text-muted-foreground text-xs">
						alice@acme.com
					</span>
				</div>
			</Layout.Sidebar.Menu.Button>
		</Layout.Sidebar.Menu.Item>
	)
}

function AvatarMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<button type="button">
					<Avatar size="sm">A</Avatar>
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<div className="flex items-center gap-3 px-2 py-2">
					<Avatar>A</Avatar>
					<div className="flex flex-col">
						<span className="font-semibold text-sm">Alice Johnson</span>
						<span className="text-muted-foreground text-xs">
							alice@acme.com
						</span>
					</div>
				</div>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<User className="mr-2 h-4 w-4" />
					Profile
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Settings className="mr-2 h-4 w-4" />
					Settings
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOut className="mr-2 h-4 w-4" />
					Sign out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

export default function Default() {
	return (
		<Provider>
			<div className="h-[600px] overflow-hidden rounded-lg border border-border">
				<Layout withSidebar>
					<Layout.Sidebar>
						<Layout.Sidebar.Header size="lg">
							<SidebarCustomHeader />
						</Layout.Sidebar.Header>

						<Layout.Sidebar.Content>
							<Layout.Sidebar.Group>
								<Layout.Sidebar.Group.Content>
									<Layout.Sidebar.Menu>
										<Layout.Sidebar.Menu.Item>
											<Layout.Sidebar.Menu.Button
												isActive
												tooltip="Dashboard"
											>
												<Home />
												<span>Dashboard</span>
											</Layout.Sidebar.Menu.Button>
										</Layout.Sidebar.Menu.Item>

										<Layout.Sidebar.Menu.Item>
											<Layout.Sidebar.Menu.Button tooltip="Analytics">
												<BarChart3 />
												<span>Analytics</span>
											</Layout.Sidebar.Menu.Button>
										</Layout.Sidebar.Menu.Item>

										<Layout.Sidebar.Menu.Item>
											<Layout.Sidebar.Menu.Button tooltip="Products">
												<Package />
												<span>Products</span>
											</Layout.Sidebar.Menu.Button>
										</Layout.Sidebar.Menu.Item>

										<Layout.Sidebar.Menu.Item>
											<Layout.Sidebar.Menu.Button tooltip="Orders">
												<ShoppingCart />
												<span>Orders</span>
											</Layout.Sidebar.Menu.Button>
										</Layout.Sidebar.Menu.Item>

										<Layout.Sidebar.Menu.Item>
											<Layout.Sidebar.Menu.Button tooltip="Customers">
												<Users />
												<span>Customers</span>
											</Layout.Sidebar.Menu.Button>
										</Layout.Sidebar.Menu.Item>
									</Layout.Sidebar.Menu>
								</Layout.Sidebar.Group.Content>
							</Layout.Sidebar.Group>

							<Layout.Sidebar.Separator />

							<Layout.Sidebar.Group>
								<Layout.Sidebar.Group.Content>
									<Layout.Sidebar.Menu>
										<Layout.Sidebar.Menu.Item>
											<Layout.Sidebar.Menu.Button tooltip="Settings">
												<Settings />
												<span>Settings</span>
											</Layout.Sidebar.Menu.Button>
										</Layout.Sidebar.Menu.Item>
									</Layout.Sidebar.Menu>
								</Layout.Sidebar.Group.Content>
							</Layout.Sidebar.Group>
						</Layout.Sidebar.Content>

						<Layout.Sidebar.Footer>
							<Layout.Sidebar.Menu>
								<SidebarFooterUser />
							</Layout.Sidebar.Menu>
						</Layout.Sidebar.Footer>
					</Layout.Sidebar>

					<Layout.Main>
						<Layout.Header
							bordered
							size="sm"
						>
							<Layout.Header.Left>
								<Layout.Sidebar.Trigger />
							</Layout.Header.Left>
							<Layout.Header.Right>
								<Button
									size="icon-sm"
									variant="ghost"
								>
									<Bell className="h-4 w-4" />
								</Button>
								<Button
									size="icon-sm"
									variant="ghost"
								>
									<Settings className="h-4 w-4" />
								</Button>
								<AvatarMenu />
							</Layout.Header.Right>
						</Layout.Header>

						<Layout.Content padding="md">
							<div className="space-y-4">
								{[
									1,
									2,
									3,
									4,
									5,
									6,
									7,
									8,
								].map((n) => (
									<Card key={n}>
										<Card.Content>
											<div className="pt-6">
												<p className="font-medium text-sm">Content block {n}</p>
												<p className="mt-1 text-muted-foreground text-sm">
													Scrollable content area placeholder.
												</p>
											</div>
										</Card.Content>
									</Card>
								))}
							</div>
						</Layout.Content>

						<Layout.Footer
							bordered
							size="sm"
						>
							<span className="text-muted-foreground text-xs">
								© 2025 Acme Inc
							</span>
						</Layout.Footer>
					</Layout.Main>
				</Layout>
			</div>
		</Provider>
	)
}
