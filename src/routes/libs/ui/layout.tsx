import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock, PropsTable } from '@/components'

// ─── Props ────────────────────────────────────────────────────────────────────

const sidebarProps = [
	{
		default: 'false',
		description: 'Adds a right border to the sidebar.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: '"default"',
		description: 'Controls the expanded width (w-60 or w-80).',
		name: 'width',
		type: '"default" | "wide"',
	},
	{
		description: 'Adds horizontal padding to the sidebar root.',
		name: 'paddingHorizontal',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Adds vertical padding to the sidebar root.',
		name: 'paddingVertical',
		type: '"sm" | "md" | "lg"',
	},
]

const sidebarSectionProps = [
	{
		default: 'false',
		description: 'Adds a divider border (bottom on Header, top on Footer).',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: '"md"',
		description: 'Controls the section height (h-10 / h-14 / h-16).',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const headerProps = [
	{
		default: 'false',
		description: 'Adds a bottom border to the header.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Makes the header stick to the top of the scroll area.',
		name: 'sticky',
		type: 'boolean',
	},
	{
		default: '"md"',
		description: 'Controls the header height (h-10 / h-14 / h-16).',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const contentProps = [
	{
		description: 'Uniform padding on all sides.',
		name: 'padding',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Horizontal padding (px).',
		name: 'paddingHorizontal',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Vertical padding (py).',
		name: 'paddingVertical',
		type: '"sm" | "md" | "lg"',
	},
	{
		description:
			'Centers content with a max-width constraint (max-w-2xl / 4xl / 6xl).',
		name: 'maxWidth',
		type: '"sm" | "md" | "lg"',
	},
]

const footerProps = [
	{
		default: 'false',
		description: 'Adds a top border to the footer.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Sticks the footer to the bottom of the scroll area.',
		name: 'sticky',
		type: 'boolean',
	},
	{
		default: '"md"',
		description: 'Controls the footer height.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
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
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Layout
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					A composable full-screen layout system with a collapsible sidebar,
					slotted header, scrollable content area, and a nav component with
					collapsed-mode tooltips and popovers.
				</p>
			</div>

			{/* Composition */}
			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Composition</h2>
				<p className="text-muted-foreground text-sm">
					Layout uses a compound component pattern. The top-level{' '}
					<code className="rounded bg-muted px-1 text-sm">Layout</code> accepts{' '}
					<code className="rounded bg-muted px-1 text-sm">Layout.Sidebar</code>{' '}
					and <code className="rounded bg-muted px-1 text-sm">Layout.Main</code>{' '}
					as children.
				</p>
				<CodeBlock
					code={`<Layout>
  <Layout.Sidebar>
    <Layout.Sidebar.Header />
    <Layout.Sidebar.Body />
    <Layout.Sidebar.Footer />
    <Layout.Sidebar.Trigger />
  </Layout.Sidebar>

  <Layout.Main>
    <Layout.Header>
      <Layout.Header.Left />
      <Layout.Header.Center />
      <Layout.Header.Right />
    </Layout.Header>
    <Layout.Content />
    <Layout.Footer />
  </Layout.Main>

  <Layout.Nav items={[...]} />
</Layout>`}
					filename="structure.tsx"
					language="tsx"
				/>
			</div>

			{/* Sidebar props */}
			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Layout.Sidebar Props
				</h2>
				<PropsTable props={sidebarProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Layout.Sidebar.Header / Footer Props
				</h2>
				<PropsTable props={sidebarSectionProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Layout.Header Props
				</h2>
				<PropsTable props={headerProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Layout.Content Props
				</h2>
				<PropsTable props={contentProps} />
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Layout.Footer Props
				</h2>
				<PropsTable props={footerProps} />
			</div>

			{/* Hooks */}
			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Hooks</h2>
				<p className="text-muted-foreground text-sm">
					Access sidebar state from any component inside{' '}
					<code className="rounded bg-muted px-1 text-sm">Layout</code>.
				</p>
				<CodeBlock
					code={hookCode}
					filename="hooks.tsx"
					language="tsx"
				/>
			</div>

			{/* Usage */}
			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="app.tsx"
					language="tsx"
				/>
			</div>
		</div>
	)
}

export const Route = createFileRoute('/libs/ui/layout')({
	component: Page,
})
