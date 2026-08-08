import { createFileRoute } from '@tanstack/react-router'
import type { ThemeFont, ThemeProps, ThemeRadius } from '@turystack/ui'
import { applyTheme, Button, Layout, Switch, useSidebar } from '@turystack/ui'
import { BarChart2, FileText, Home, Settings, Users } from 'lucide-react'
import { type ReactNode, useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

// ─── Playground controls ─────────────────────────────────────────────────────

function CtrlSection({
	title,
	children,
}: {
	title: string
	children: ReactNode
}) {
	return (
		<div className="space-y-1.5">
			<p className="font-semibold text-muted-foreground text-xs uppercase tracking-wide">
				{title}
			</p>
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
			<span className="text-muted-foreground text-sm">{label}</span>
			<Switch
				checked={checked}
				onCheckedChange={onChange}
				size="sm"
			/>
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
			<span className="shrink-0 text-muted-foreground text-sm">{label}</span>
			<div className="flex gap-0.5">
				{withNone && (
					<button
						className={cn(
							'rounded px-1.5 py-0.5 text-xs transition-colors',
							value === undefined
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground hover:bg-muted/80',
						)}
						onClick={() => onChange(undefined)}
						type="button"
					>
						none
					</button>
				)}
				{options.map((opt) => (
					<button
						className={cn(
							'rounded px-1.5 py-0.5 text-xs transition-colors',
							value === opt
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground hover:bg-muted/80',
						)}
						key={opt}
						onClick={() =>
							onChange(opt === value && withNone ? undefined : opt)
						}
						type="button"
					>
						{opt}
					</button>
				))}
			</div>
		</div>
	)
}

// ─── Sync helpers ────────────────────────────────────────────────────────────

function SidebarSync({ collapsed }: { collapsed: boolean }) {
	const { setOpen } = useSidebar()
	useEffect(() => {
		setOpen(!collapsed)
	}, [
		collapsed,
		setOpen,
	])
	return null
}

// ─── Playground ──────────────────────────────────────────────────────────────

function Playground() {
	// ─── Layout state ────────────────────────────────────────────────────────

	// Header
	const [headerBordered, setHeaderBordered] = useState(true)
	const [headerSticky, setHeaderSticky] = useState(false)
	const [headerSize, setHeaderSize] = useState<'sm' | 'md' | 'lg'>('md')
	const [headerSlots, setHeaderSlots] = useState(false)

	// Sidebar
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	const [sidebarBordered, setSidebarBordered] = useState(true)
	const [sidebarHeaderBordered, setSidebarHeaderBordered] = useState(true)
	const [sidebarHeaderSize, setSidebarHeaderSize] = useState<
		'sm' | 'md' | 'lg' | undefined
	>('md')
	const [sidebarFooterBordered, setSidebarFooterBordered] = useState(true)
	const [sidebarFooterSize, setSidebarFooterSize] = useState<
		'sm' | 'md' | 'lg' | undefined
	>('md')

	// Content
	const [contentPadding, setContentPadding] = useState<
		'sm' | 'md' | 'lg' | undefined
	>('md')
	const [contentPaddingH, setContentPaddingH] = useState<
		'sm' | 'md' | 'lg' | undefined
	>()
	const [contentPaddingV, setContentPaddingV] = useState<
		'sm' | 'md' | 'lg' | undefined
	>()
	const [contentMaxWidth, setContentMaxWidth] = useState<
		'sm' | 'md' | 'lg' | undefined
	>()

	// Footer
	const [showFooter, setShowFooter] = useState(true)
	const [footerBordered, setFooterBordered] = useState(true)
	const [footerSticky, setFooterSticky] = useState(false)
	const [footerSize, setFooterSize] = useState<'sm' | 'md' | 'lg'>('md')

	// ─── Theme state ─────────────────────────────────────────────────────────

	const [font, setFont] = useState<ThemeFont>('sans')
	const [radius, setRadius] = useState<ThemeRadius>('lg')
	const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'system'>(
		'system',
	)

	const themeProps: ThemeProps = useMemo(
		() => ({
			font,
			radius,
		}),
		[
			font,
			radius,
		],
	)

	// ─── Scoped theme (no Provider in demo) ──────────────────────────────

	const [systemDark, setSystemDark] = useState(
		() => window.matchMedia('(prefers-color-scheme: dark)').matches,
	)
	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)')
		const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches)
		mq.addEventListener('change', handler)
		return () => mq.removeEventListener('change', handler)
	}, [])

	const isDark = colorScheme === 'system' ? systemDark : colorScheme === 'dark'

	const scopedStyle = useMemo(() => {
		const vars = applyTheme(themeProps, isDark)

		// Derive Tailwind radius tokens so rounded-* classes work.
		// The showcase CSS uses --radius (not --t-radius) as the source for
		// --radius-lg/md/sm, so we must set --radius too.
		const r = vars['--t-radius']
		if (r) {
			vars['--radius'] = r
			vars['--radius-lg'] = r
			vars['--radius-md'] = `calc(${r} - 2px)`
			vars['--radius-sm'] = `calc(${r} - 4px)`
		}

		return vars as React.CSSProperties
	}, [
		themeProps,
		isDark,
	])

	return (
		<div className="flex gap-4">
			{/* Main area — Layout demo */}
			<div className="min-w-0 flex-1 space-y-4">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Playground
					</h1>
					<p className="mt-2 text-muted-foreground">
						Experiment with Layout, Theme and Color Scheme in real time.
					</p>
				</div>

				{/* Layout demo frame */}
				<div
					className={cn(
						'overflow-hidden rounded-lg border border-border',
						isDark && 'dark',
					)}
					style={{
						height: 'calc(100vh - 10rem)',
						...scopedStyle,
					}}
				>
					<Layout withSidebar>
						<SidebarSync collapsed={sidebarCollapsed} />

						<Layout.Sidebar bordered={sidebarBordered}>
							<Layout.Sidebar.Header
								bordered={sidebarHeaderBordered}
								size={sidebarHeaderSize}
							>
								<span className="font-semibold text-sm">MyApp</span>
								<Layout.Sidebar.Trigger />
							</Layout.Sidebar.Header>

							<Layout.Sidebar.Content>
								<Layout.Sidebar.Group>
									<Layout.Sidebar.Group.Content>
										<Layout.Sidebar.Menu>
											<Layout.Sidebar.Menu.Item>
												<Layout.Sidebar.Menu.Button
													isActive
													tooltip="Home"
												>
													<Home />
													<span>Home</span>
												</Layout.Sidebar.Menu.Button>
											</Layout.Sidebar.Menu.Item>

											<Layout.Sidebar.Menu.Item>
												<Layout.Sidebar.Menu.Button tooltip="Analytics">
													<BarChart2 />
													<span>Analytics</span>
												</Layout.Sidebar.Menu.Button>
											</Layout.Sidebar.Menu.Item>

											<Layout.Sidebar.Menu.Item>
												<Layout.Sidebar.Menu.Button tooltip="Users">
													<Users />
													<span>Users</span>
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
												<Layout.Sidebar.Menu.Button tooltip="Documents">
													<FileText />
													<span>Documents</span>
												</Layout.Sidebar.Menu.Button>
											</Layout.Sidebar.Menu.Item>

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

							<Layout.Sidebar.Footer
								bordered={sidebarFooterBordered}
								size={sidebarFooterSize}
							>
								<span className="text-muted-foreground text-xs">v1.0.0</span>
							</Layout.Sidebar.Footer>
						</Layout.Sidebar>

						<Layout.Main>
							<Layout.Header
								bordered={headerBordered}
								size={headerSize}
								sticky={headerSticky}
							>
								{headerSlots ? (
									<>
										<Layout.Header.Left>
											<span className="font-medium text-sm">Dashboard</span>
										</Layout.Header.Left>
										<Layout.Header.Center>
											<span className="text-muted-foreground text-xs">
												Center slot
											</span>
										</Layout.Header.Center>
										<Layout.Header.Right>
											<span className="text-muted-foreground text-xs">
												user@app.com
											</span>
										</Layout.Header.Right>
									</>
								) : (
									<>
										<Layout.Header.Left>
											<span className="font-medium text-sm">Dashboard</span>
										</Layout.Header.Left>
										<Layout.Header.Right>
											<span className="text-muted-foreground text-xs">
												user@app.com
											</span>
										</Layout.Header.Right>
									</>
								)}
							</Layout.Header>

							<Layout.Content
								maxWidth={contentMaxWidth}
								padding={contentPadding}
								paddingHorizontal={contentPaddingH}
								paddingVertical={contentPaddingV}
							>
								<div className="space-y-4">
									<div className="flex gap-2">
										<Button>Primary</Button>
										<Button variant="outline">Outline</Button>
										<Button variant="secondary">Secondary</Button>
									</div>
									<div className="grid grid-cols-2 gap-3">
										{[
											'Revenue',
											'Users',
											'Sessions',
											'Conversion',
										].map((label) => (
											<div
												className="rounded-lg border border-border bg-card p-3"
												key={label}
											>
												<p className="text-muted-foreground text-xs">{label}</p>
												<p className="mt-1 font-semibold text-xl">&mdash;</p>
											</div>
										))}
									</div>
									{Array.from(
										{
											length: 12,
										},
										(_, i) => (
											<div
												className="rounded-lg border border-border bg-card p-3"
												key={i}
											>
												<p className="text-muted-foreground text-sm text-xs">
													Linha de conte&uacute;do {i + 1} &mdash; Lorem ipsum
													dolor sit amet, consectetur adipiscing elit.
												</p>
											</div>
										),
									)}
								</div>
							</Layout.Content>

							{showFooter && (
								<Layout.Footer
									bordered={footerBordered}
									size={footerSize}
									sticky={footerSticky}
								>
									<span className="text-muted-foreground text-xs">
										&copy; 2025 MyApp
									</span>
								</Layout.Footer>
							)}
						</Layout.Main>
					</Layout>
				</div>
			</div>

			{/* Sticky right panel — all controls */}
			<div className="sticky top-20 h-fit w-[300px] shrink-0">
				<div className="max-h-[calc(100vh-6rem)] space-y-3 overflow-y-auto rounded-xl border bg-card p-4 shadow-lg">
					{/* ── Theme ── */}
					<CtrlSection title="Theme">
						<CtrlSegment
							label="Font"
							onChange={(v) => {
								if (v) {
									setFont(v)
								}
							}}
							options={
								[
									'sans',
									'serif',
									'mono',
								] as const
							}
							value={font}
						/>

						<CtrlSegment
							label="Radius"
							onChange={(v) => {
								if (v) {
									setRadius(v)
								}
							}}
							options={
								[
									'none',
									'sm',
									'md',
									'lg',
								] as const
							}
							value={radius}
						/>
					</CtrlSection>

					<div className="border-t" />

					{/* ── Color Scheme ── */}
					<CtrlSection title="Color Scheme">
						<CtrlSegment
							label="Mode"
							onChange={(v) => {
								if (v) {
									setColorScheme(v)
								}
							}}
							options={
								[
									'light',
									'dark',
									'system',
								] as const
							}
							value={colorScheme}
						/>
					</CtrlSection>

					<div className="border-t" />

					{/* ── Layout.Header ── */}
					<CtrlSection title="Layout.Header">
						<CtrlSwitch
							checked={headerBordered}
							label="bordered"
							onChange={setHeaderBordered}
						/>
						<CtrlSwitch
							checked={headerSticky}
							label="sticky"
							onChange={setHeaderSticky}
						/>
						<CtrlSwitch
							checked={headerSlots}
							label="slots (L/C/R)"
							onChange={setHeaderSlots}
						/>
						<CtrlSegment
							label="size"
							onChange={(v) => setHeaderSize(v ?? 'md')}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={headerSize}
						/>
					</CtrlSection>

					<div className="border-t" />

					{/* ── Layout.Sidebar ── */}
					<CtrlSection title="Layout.Sidebar">
						<CtrlSwitch
							checked={sidebarCollapsed}
							label="collapsed"
							onChange={setSidebarCollapsed}
						/>
						<CtrlSwitch
							checked={sidebarBordered}
							label="bordered"
							onChange={setSidebarBordered}
						/>
						<CtrlSwitch
							checked={sidebarHeaderBordered}
							label="Header: bordered"
							onChange={setSidebarHeaderBordered}
						/>
						<CtrlSegment
							label="Header: size"
							onChange={setSidebarHeaderSize}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={sidebarHeaderSize}
							withNone
						/>
						<CtrlSwitch
							checked={sidebarFooterBordered}
							label="Footer: bordered"
							onChange={setSidebarFooterBordered}
						/>
						<CtrlSegment
							label="Footer: size"
							onChange={setSidebarFooterSize}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={sidebarFooterSize}
							withNone
						/>
					</CtrlSection>

					<div className="border-t" />

					{/* ── Layout.Content ── */}
					<CtrlSection title="Layout.Content">
						<CtrlSegment
							label="padding"
							onChange={setContentPadding}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={contentPadding}
							withNone
						/>
						<CtrlSegment
							label="paddingH"
							onChange={setContentPaddingH}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={contentPaddingH}
							withNone
						/>
						<CtrlSegment
							label="paddingV"
							onChange={setContentPaddingV}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={contentPaddingV}
							withNone
						/>
						<CtrlSegment
							label="maxWidth"
							onChange={setContentMaxWidth}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={contentMaxWidth}
							withNone
						/>
					</CtrlSection>

					<div className="border-t" />

					{/* ── Layout.Footer ── */}
					<CtrlSection title="Layout.Footer">
						<CtrlSwitch
							checked={showFooter}
							label="show"
							onChange={setShowFooter}
						/>
						<CtrlSwitch
							checked={footerBordered}
							label="bordered"
							onChange={setFooterBordered}
						/>
						<CtrlSwitch
							checked={footerSticky}
							label="sticky"
							onChange={setFooterSticky}
						/>
						<CtrlSegment
							label="size"
							onChange={(v) => setFooterSize(v ?? 'md')}
							options={
								[
									'sm',
									'md',
									'lg',
								] as const
							}
							value={footerSize}
						/>
					</CtrlSection>
				</div>
			</div>
		</div>
	)
}

// ─── Page ────────────────────────────────────────────────────────────────────

function Page() {
	return <Playground />
}

export const Route = createFileRoute('/libs/react-web/playground')({
	component: Page,
})
