import { createFileRoute } from '@tanstack/react-router'
import { Layout, Provider, Switch, useSidebar } from '@turystack/ui'
import { BarChart2, FileText, Home, Settings, Users } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'

import { CodeBlock, PropsTable } from '@/components'
import { cn } from '@/lib/utils'

// ─── Nav items ────────────────────────────────────────────────────────────────

const navItems = [
	{ type: 'item' as const, item: { label: 'Home', icon: Home, active: true } },
	{ type: 'item' as const, item: { label: 'Analytics', icon: BarChart2 } },
	{
		type: 'item' as const,
		item: {
			label: 'Users',
			icon: Users,
			children: [
				{ label: 'All users' },
				{ label: 'Roles & permissions' },
			],
		},
	},
	{ type: 'divider' as const },
	{ type: 'item' as const, item: { label: 'Documents', icon: FileText } },
	{ type: 'item' as const, item: { label: 'Settings', icon: Settings } },
]

// ─── Frame ────────────────────────────────────────────────────────────────────

function LayoutFrame({ children, label }: { children: ReactNode; label?: string }) {
	return (
		<div className="overflow-hidden rounded-lg border border-border">
			{label && (
				<div className="border-b border-border px-4 py-2">
					<span className="text-muted-foreground text-xs">{label}</span>
				</div>
			)}
			<div
				className="relative h-[640px] overflow-hidden"
				style={{
					backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
					backgroundSize: '20px 20px',
				}}
			>
				{children}
			</div>
		</div>
	)
}

// ─── Playground controls ───────────────────────────────────────────────────────

function CtrlSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<div className="space-y-1.5">
			<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
			<div className="space-y-1">{children}</div>
		</div>
	)
}

function CtrlSwitch({
	label,
	checked,
	onChange,
}: {
	label: string
	checked: boolean
	onChange: (v: boolean) => void
}) {
	return (
		<div className="flex items-center justify-between py-0.5">
			<span className="text-sm text-muted-foreground">{label}</span>
			<Switch size="sm" checked={checked} onCheckedChange={onChange} />
		</div>
	)
}

function CtrlSegment<T extends string>({
	label,
	options,
	value,
	onChange,
	withNone = false,
}: {
	label: string
	options: T[]
	value: T | undefined
	onChange: (v: T | undefined) => void
	withNone?: boolean
}) {
	return (
		<div className="flex items-center justify-between gap-2 py-0.5">
			<span className="text-sm text-muted-foreground shrink-0">{label}</span>
			<div className="flex gap-0.5">
				{withNone && (
					<button
						onClick={() => onChange(undefined)}
						className={cn(
							'rounded px-1.5 py-0.5 text-xs transition-colors',
							value === undefined
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground hover:bg-muted/80',
						)}
					>
						none
					</button>
				)}
				{options.map((opt) => (
					<button
						key={opt}
						onClick={() => onChange(opt === value && withNone ? undefined : opt)}
						className={cn(
							'rounded px-1.5 py-0.5 text-xs transition-colors',
							value === opt
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground hover:bg-muted/80',
						)}
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	)
}

// ─── SidebarSync ──────────────────────────────────────────────────────────────

function SidebarSync({ collapsed }: { collapsed: boolean }) {
	const { setCollapsed } = useSidebar()
	useEffect(() => {
		setCollapsed(collapsed)
	}, [collapsed, setCollapsed])
	return null
}

// ─── Playground ───────────────────────────────────────────────────────────────

function Playground() {
	// Visibilidade
	const [darkMode, setDarkMode] = useState(false)

	// Header
	const [headerBordered, setHeaderBordered] = useState(true)
	const [headerSticky, setHeaderSticky] = useState(false)
	const [headerSize, setHeaderSize] = useState<'sm' | 'md' | 'lg'>('md')
	const [headerSlots, setHeaderSlots] = useState(false)

	// Sidebar
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	const [sidebarBordered, setSidebarBordered] = useState(true)
	const [sidebarWidth, setSidebarWidth] = useState<'default' | 'wide'>('default')
	const [sidebarHeaderBordered, setSidebarHeaderBordered] = useState(true)
	const [sidebarHeaderSize, setSidebarHeaderSize] = useState<'sm' | 'md' | 'lg' | undefined>('md')
	const [sidebarFooterBordered, setSidebarFooterBordered] = useState(true)
	const [sidebarFooterSize, setSidebarFooterSize] = useState<'sm' | 'md' | 'lg' | undefined>('md')

	// Content
	const [contentPadding, setContentPadding] = useState<'sm' | 'md' | 'lg' | undefined>('md')
	const [contentPaddingH, setContentPaddingH] = useState<'sm' | 'md' | 'lg' | undefined>()
	const [contentPaddingV, setContentPaddingV] = useState<'sm' | 'md' | 'lg' | undefined>()
	const [contentMaxWidth, setContentMaxWidth] = useState<'sm' | 'md' | 'lg' | undefined>()

	// Footer
	const [showFooter, setShowFooter] = useState(true)
	const [footerBordered, setFooterBordered] = useState(true)
	const [footerSticky, setFooterSticky] = useState(false)
	const [footerSize, setFooterSize] = useState<'sm' | 'md' | 'lg'>('md')

	return (
		<div className="flex gap-4 items-start">
			{/* Controls */}
			<div className="w-72 shrink-0 overflow-y-auto max-h-[calc(100vh-10rem)] rounded-lg border border-border bg-card p-4 space-y-4">
				<CtrlSection title="Visibilidade">
					<CtrlSwitch label="Dark mode" checked={darkMode} onChange={setDarkMode} />
				</CtrlSection>

				<CtrlSection title="Layout.Header">
					<CtrlSwitch label="bordered" checked={headerBordered} onChange={setHeaderBordered} />
					<CtrlSwitch label="sticky" checked={headerSticky} onChange={setHeaderSticky} />
					<CtrlSwitch label="slots (L/C/R)" checked={headerSlots} onChange={setHeaderSlots} />
					<CtrlSegment
						label="size"
						options={['sm', 'md', 'lg'] as const}
						value={headerSize}
						onChange={(v) => setHeaderSize(v ?? 'md')}
					/>
				</CtrlSection>

				<CtrlSection title="Layout.Sidebar">
					<CtrlSwitch label="collapsed" checked={sidebarCollapsed} onChange={setSidebarCollapsed} />
					<CtrlSwitch label="bordered" checked={sidebarBordered} onChange={setSidebarBordered} />
					<CtrlSegment
						label="width"
						options={['default', 'wide'] as const}
						value={sidebarWidth}
						onChange={(v) => setSidebarWidth(v ?? 'default')}
					/>
					<CtrlSwitch label="Header: bordered" checked={sidebarHeaderBordered} onChange={setSidebarHeaderBordered} />
					<CtrlSegment
						label="Header: size"
						options={['sm', 'md', 'lg'] as const}
						value={sidebarHeaderSize}
						onChange={setSidebarHeaderSize}
						withNone
					/>
					<CtrlSwitch label="Footer: bordered" checked={sidebarFooterBordered} onChange={setSidebarFooterBordered} />
					<CtrlSegment
						label="Footer: size"
						options={['sm', 'md', 'lg'] as const}
						value={sidebarFooterSize}
						onChange={setSidebarFooterSize}
						withNone
					/>
				</CtrlSection>

				<CtrlSection title="Layout.Content">
					<CtrlSegment
						label="padding"
						options={['sm', 'md', 'lg'] as const}
						value={contentPadding}
						onChange={setContentPadding}
						withNone
					/>
					<CtrlSegment
						label="paddingH"
						options={['sm', 'md', 'lg'] as const}
						value={contentPaddingH}
						onChange={setContentPaddingH}
						withNone
					/>
					<CtrlSegment
						label="paddingV"
						options={['sm', 'md', 'lg'] as const}
						value={contentPaddingV}
						onChange={setContentPaddingV}
						withNone
					/>
					<CtrlSegment
						label="maxWidth"
						options={['sm', 'md', 'lg'] as const}
						value={contentMaxWidth}
						onChange={setContentMaxWidth}
						withNone
					/>
				</CtrlSection>

				<CtrlSection title="Layout.Footer">
					<CtrlSwitch label="show" checked={showFooter} onChange={setShowFooter} />
					<CtrlSwitch label="bordered" checked={footerBordered} onChange={setFooterBordered} />
					<CtrlSwitch label="sticky" checked={footerSticky} onChange={setFooterSticky} />
					<CtrlSegment
						label="size"
						options={['sm', 'md', 'lg'] as const}
						value={footerSize}
						onChange={(v) => setFooterSize(v ?? 'md')}
					/>
				</CtrlSection>
			</div>

			{/* Preview */}
			<div
				className={cn(
					'flex-1 overflow-hidden rounded-lg border border-border',
					darkMode && 'dark',
				)}
				style={{ height: 'calc(100vh - 10rem)' }}
			>
				<Provider>
					<Layout>
						<SidebarSync collapsed={sidebarCollapsed} />

						<Layout.Sidebar bordered={sidebarBordered} width={sidebarWidth}>
							<Layout.Sidebar.Header bordered={sidebarHeaderBordered} size={sidebarHeaderSize}>
								<span className="font-semibold text-sm">MyApp</span>
								<Layout.Sidebar.Trigger />
							</Layout.Sidebar.Header>
							<Layout.Sidebar.Body>
								<Layout.Nav items={navItems} />
							</Layout.Sidebar.Body>
							<Layout.Sidebar.Footer bordered={sidebarFooterBordered} size={sidebarFooterSize}>
								<span className="text-muted-foreground text-xs">v1.0.0</span>
							</Layout.Sidebar.Footer>
						</Layout.Sidebar>

						<Layout.Main>
							<Layout.Header bordered={headerBordered} sticky={headerSticky} size={headerSize}>
								{headerSlots ? (
									<>
										<Layout.Header.Left>
											<span className="text-sm font-medium">Dashboard</span>
										</Layout.Header.Left>
										<Layout.Header.Center>
											<span className="text-muted-foreground text-xs">Center slot</span>
										</Layout.Header.Center>
										<Layout.Header.Right>
											<span className="text-muted-foreground text-xs">user@app.com</span>
										</Layout.Header.Right>
									</>
								) : (
									<>
										<Layout.Header.Left>
											<span className="text-sm font-medium">Dashboard</span>
										</Layout.Header.Left>
										<Layout.Header.Right>
											<span className="text-muted-foreground text-xs">user@app.com</span>
										</Layout.Header.Right>
									</>
								)}
							</Layout.Header>

							<Layout.Content
								padding={contentPadding}
								paddingHorizontal={contentPaddingH}
								paddingVertical={contentPaddingV}
								maxWidth={contentMaxWidth}
							>
								<div className="space-y-4">
									<div className="grid grid-cols-2 gap-3">
										{['Revenue', 'Users', 'Sessions', 'Conversion'].map((label) => (
											<div key={label} className="rounded-lg border border-border bg-card p-3">
												<p className="text-muted-foreground text-xs">{label}</p>
												<p className="mt-1 font-semibold text-xl">—</p>
											</div>
										))}
									</div>
									{Array.from({ length: 12 }, (_, i) => (
										<div key={i} className="rounded-lg border border-border bg-card p-3">
											<p className="text-muted-foreground text-xs text-sm">
												Linha de conteúdo {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											</p>
										</div>
									))}
								</div>
							</Layout.Content>

							{showFooter && (
								<Layout.Footer bordered={footerBordered} sticky={footerSticky} size={footerSize}>
									<span className="text-muted-foreground text-xs">© 2025 MyApp</span>
								</Layout.Footer>
							)}
						</Layout.Main>
					</Layout>
				</Provider>
			</div>
		</div>
	)
}

// ─── Demos estáticos ──────────────────────────────────────────────────────────

function BasicDemo() {
	return (
		<Provider>
			<Layout>
				<Layout.Sidebar bordered>
					<Layout.Sidebar.Header bordered>
						<span className="font-semibold text-sm">MyApp</span>
						<Layout.Sidebar.Trigger />
					</Layout.Sidebar.Header>
					<Layout.Sidebar.Body>
						<Layout.Nav items={navItems} />
					</Layout.Sidebar.Body>
				</Layout.Sidebar>

				<Layout.Main>
					<Layout.Header bordered>
						<Layout.Header.Left>
							<span className="font-medium text-sm">Dashboard</span>
						</Layout.Header.Left>
						<Layout.Header.Right>
							<span className="text-muted-foreground text-xs">user@example.com</span>
						</Layout.Header.Right>
					</Layout.Header>

					<Layout.Content padding="md">
						<div className="grid grid-cols-3 gap-4">
							{['Revenue', 'Users', 'Sessions'].map((label) => (
								<div key={label} className="rounded-lg border border-border bg-card p-4">
									<p className="text-muted-foreground text-xs">{label}</p>
									<p className="mt-1 font-semibold text-2xl">—</p>
								</div>
							))}
						</div>
						<div className="mt-4 rounded-lg border border-border bg-card p-4">
							<p className="text-muted-foreground text-sm">
								Main content area. Click the sidebar trigger (panel icon) to collapse the sidebar — nav items show
								tooltips when collapsed.
							</p>
						</div>
					</Layout.Content>

					<Layout.Footer bordered>
						<span className="text-muted-foreground text-xs">© 2025 MyApp</span>
					</Layout.Footer>
				</Layout.Main>
			</Layout>
		</Provider>
	)
}

function WideDemo() {
	return (
		<Provider>
			<Layout>
				<Layout.Sidebar bordered width="wide">
					<Layout.Sidebar.Header bordered size="lg">
						<span className="font-semibold">MyApp</span>
						<Layout.Sidebar.Trigger />
					</Layout.Sidebar.Header>
					<Layout.Sidebar.Body>
						<Layout.Nav items={navItems} />
					</Layout.Sidebar.Body>
					<Layout.Sidebar.Footer bordered>
						<span className="text-muted-foreground text-xs">v1.0.0</span>
					</Layout.Sidebar.Footer>
				</Layout.Sidebar>

				<Layout.Main>
					<Layout.Header bordered sticky size="lg">
						<Layout.Header.Left>
							<span className="font-medium">Dashboard</span>
						</Layout.Header.Left>
						<Layout.Header.Center>
							<span className="text-muted-foreground text-sm">Wide sidebar variant</span>
						</Layout.Header.Center>
						<Layout.Header.Right>
							<span className="text-muted-foreground text-xs">admin</span>
						</Layout.Header.Right>
					</Layout.Header>
					<Layout.Content padding="lg" maxWidth="md">
						<div className="rounded-lg border border-border bg-card p-6">
							<p className="text-muted-foreground text-sm">
								Sidebar is <strong>wide</strong> (w-80). Header has all three slots (Left / Center / Right). Content
								is centered with <code>maxWidth="md"</code>.
							</p>
						</div>
					</Layout.Content>

					<Layout.Footer bordered>
						<span className="text-muted-foreground text-xs">© 2025 MyApp</span>
					</Layout.Footer>
				</Layout.Main>
			</Layout>
		</Provider>
	)
}

// ─── Props ────────────────────────────────────────────────────────────────────

const sidebarProps = [
	{ name: 'bordered', type: 'boolean', default: 'false', description: 'Adds a right border to the sidebar.' },
	{
		name: 'width',
		type: '"default" | "wide"',
		default: '"default"',
		description: 'Controls the expanded width (w-60 or w-80).',
	},
	{ name: 'paddingHorizontal', type: '"sm" | "md" | "lg"', description: 'Adds horizontal padding to the sidebar root.' },
	{ name: 'paddingVertical', type: '"sm" | "md" | "lg"', description: 'Adds vertical padding to the sidebar root.' },
]

const sidebarSectionProps = [
	{
		name: 'bordered',
		type: 'boolean',
		default: 'false',
		description: 'Adds a divider border (bottom on Header, top on Footer).',
	},
	{
		name: 'size',
		type: '"sm" | "md" | "lg"',
		default: '"md"',
		description: 'Controls the section height (h-10 / h-14 / h-16).',
	},
]

const headerProps = [
	{ name: 'bordered', type: 'boolean', default: 'false', description: 'Adds a bottom border to the header.' },
	{ name: 'sticky', type: 'boolean', default: 'false', description: 'Makes the header stick to the top of the scroll area.' },
	{
		name: 'size',
		type: '"sm" | "md" | "lg"',
		default: '"md"',
		description: 'Controls the header height (h-10 / h-14 / h-16).',
	},
]

const contentProps = [
	{ name: 'padding', type: '"sm" | "md" | "lg"', description: 'Uniform padding on all sides.' },
	{ name: 'paddingHorizontal', type: '"sm" | "md" | "lg"', description: 'Horizontal padding (px).' },
	{ name: 'paddingVertical', type: '"sm" | "md" | "lg"', description: 'Vertical padding (py).' },
	{
		name: 'maxWidth',
		type: '"sm" | "md" | "lg"',
		description: 'Centers content with a max-width constraint (max-w-2xl / 4xl / 6xl).',
	},
]

const footerProps = [
	{ name: 'bordered', type: 'boolean', default: 'false', description: 'Adds a top border to the footer.' },
	{ name: 'sticky', type: 'boolean', default: 'false', description: 'Sticks the footer to the bottom of the scroll area.' },
	{ name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Controls the footer height.' },
]

// ─── Usage code ───────────────────────────────────────────────────────────────

const usageCode = `import { Layout } from '@turystack/ui'
import { Home, Settings, Users } from 'lucide-react'

const navItems = [
  { type: 'item', item: { label: 'Home', icon: Home, active: true } },
  { type: 'item', item: {
      label: 'Users',
      icon: Users,
      children: [{ label: 'All users' }, { label: 'Roles' }],
    },
  },
  { type: 'divider' },
  { type: 'item', item: { label: 'Settings', icon: Settings } },
]

export function App() {
  return (
    <Layout>
      <Layout.Sidebar bordered>
        <Layout.Sidebar.Header bordered>
          <span>MyApp</span>
          <Layout.Sidebar.Trigger />
        </Layout.Sidebar.Header>
        <Layout.Sidebar.Body>
          <Layout.Nav items={navItems} />
        </Layout.Sidebar.Body>
        <Layout.Sidebar.Footer bordered>
          <span>v1.0.0</span>
        </Layout.Sidebar.Footer>
      </Layout.Sidebar>

      <Layout.Main>
        <Layout.Header bordered sticky>
          <Layout.Header.Left>Page title</Layout.Header.Left>
          <Layout.Header.Right>User menu</Layout.Header.Right>
        </Layout.Header>

        <Layout.Content padding="md" maxWidth="lg">
          {/* page content */}
        </Layout.Content>

        <Layout.Footer bordered>
          <span>© 2025 MyApp</span>
        </Layout.Footer>
      </Layout.Main>
    </Layout>
  )
}`

const hookCode = `import { useSidebar } from '@turystack/ui'

// Access all sidebar state from any component inside <Layout>
function MyComponent() {
  const { collapsed, toggle, setCollapsed } = useSidebar()

  return (
    <button onClick={toggle}>
      {collapsed ? 'Expand' : 'Collapse'}
    </button>
  )
}`

// ─── Page ─────────────────────────────────────────────────────────────────────

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">Layout</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A composable full-screen layout system with a collapsible sidebar, slotted header, scrollable content area,
						and a nav component with collapsed-mode tooltips and popovers.
					</p>
				</div>

				{/* Playground */}
				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Playground</h2>
					<p className="text-muted-foreground text-sm">
						Adjust the controls to see the layout respond in real time. Toggle{' '}
						<strong>sticky header/footer</strong> and scroll the content area to test position behavior.
					</p>
					<Playground />
				</div>

				{/* Basic */}
				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic layout</h2>
					<p className="text-muted-foreground text-sm">
						Sidebar with header, body (nav), and a header with Left/Right slots. Click the panel toggle icon to collapse
						the sidebar — nav items show tooltips when collapsed.
					</p>
					<LayoutFrame label="Layout with sidebar and header">
						<BasicDemo />
					</LayoutFrame>
				</div>

				{/* Wide + center slot */}
				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Wide sidebar + centered header</h2>
					<p className="text-muted-foreground text-sm">
						<code>width="wide"</code> expands the sidebar to w-80. The header uses all three slots (Left / Center /
						Right) and <code>maxWidth</code> constrains the content column.
					</p>
					<LayoutFrame label="Layout.Sidebar width=wide, Layout.Header with all slots">
						<WideDemo />
					</LayoutFrame>
				</div>

				{/* Sidebar props */}
				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Layout.Sidebar Props</h2>
					<PropsTable props={sidebarProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Layout.Sidebar.Header / Footer Props</h2>
					<PropsTable props={sidebarSectionProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Layout.Header Props</h2>
					<PropsTable props={headerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Layout.Content Props</h2>
					<PropsTable props={contentProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Layout.Footer Props</h2>
					<PropsTable props={footerProps} />
				</div>

				{/* Hooks */}
				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Hooks</h2>
					<p className="text-muted-foreground text-sm">
						Access sidebar state from any component inside{' '}
						<code className="rounded bg-muted px-1 text-sm">Layout</code>.
					</p>
					<CodeBlock code={hookCode} filename="hooks.tsx" language="tsx" />
				</div>

				{/* Usage */}
				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock code={usageCode} filename="app.tsx" language="tsx" />
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/layout')({
	component: Page,
})
