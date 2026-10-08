import { createFileRoute } from '@tanstack/react-router'
import { useDataOutcome } from '@turystack/react-hooks'
import {
	Alert,
	Avatar,
	Badge,
	BulkActions,
	Button,
	Container,
	columnsFromTable,
	type DataTransferColumn,
	DataTransferExport,
	type DataTransferFilter,
	type DataTransferFilterValues,
	DataTransferImport,
	type DataTransferImportMeta,
	type DataTransferImportRecord,
	type DataTransferJob,
	type DataTransferStatus,
	DropdownMenu,
	Layout,
	type LayoutContentMaxWidth,
	type LayoutFooterSize,
	type LayoutHeaderSize,
	type LayoutPadding,
	Page,
	PortalProvider,
	Search as SearchBar,
	Select,
	type SidebarCollapsible,
	type SidebarSide,
	type SidebarVariant,
	type SidebarWidth,
	Switch,
	Table,
} from '@turystack/react-web'
import {
	Archive,
	Bell,
	ChartNoAxesColumn,
	Check,
	ChevronRight,
	ChevronsUpDown,
	CreditCard,
	Ellipsis,
	FileDown,
	FileUp,
	FlaskConical,
	House,
	LifeBuoy,
	LogOut,
	Menu as MenuIcon,
	Package,
	Plus,
	Search,
	Settings,
	ShoppingCart,
	Truck,
	User,
	Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'
import { cn } from '@/lib/utils'

/**
 * Layout and the sidebar are one component, and this is one page.
 *
 * They were two of each until the shells in this repo made the case against it.
 * `Sidebar.Inset` and `<Layout withSidebar>` declared the same box — fill what
 * is left, column, clip your own overflow — so every shell nested one inside
 * the other, and since both rendered a landmark, every shell shipped a `<main>`
 * inside a `<main>`. The rail's own classes had already given the game away:
 * every one of them is named `layout-sidebar-…`.
 *
 * The page keeps the shape every other component page has: Props, then Slots,
 * then the examples, then Usage. It is a long Props section because this is a
 * long component, not because the page is telling a story.
 *
 * Every table was read from the types in `react-web/src/components/layout/` —
 * `layout.types.ts`, the four part folders and `sidebar/sidebar.types.ts` —
 * with the Default column taken from each `tv()` call's `defaultVariants` and
 * from the destructuring defaults.
 *
 * The pixel figures were checked against the Tailwind classes they describe:
 * Content's maxWidth is `max-w-2xl` (672), `max-w-4xl` (896) and `max-w-7xl`
 * (1280); Header and Footer's size is `h-10` (40), `h-14` (56) and `h-16` (64);
 * the gutter is `layout.gutter.ts`, one map read by the header, the footer and
 * the content alike — `px-4` (16), `px-6` (24) and `px-8` (32), plus the same
 * steps vertically on the content.
 */

// ─── Layout ───────────────────────────────────────────────────────────────────

const layoutProps = [
	{
		description: 'Full-width strip above the shell, usually an Alert banner.',
		name: 'banner',
		type: 'React.ReactNode',
	},
	{
		default: '"viewport"',
		description: 'Shell height: viewport is h-svh, fill is h-full flex-1.',
		name: 'height',
		type: '"viewport" | "fill"',
	},
	{
		description: 'Top bar while a page loads; absent is off.',
		name: 'loadingBar',
		type: 'Omit<LoadingBarProps, "position">',
	},
	{
		default: '"md"',
		description: 'Gutter for every part: sm 16px, md 24px, lg 32px.',
		name: 'padding',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		description: '“Skip to content” links, hidden until focused.',
		name: 'skipLinks',
		type: 'Array<{ href: string; label: string }>',
	},
	{
		default: '"default"',
		description: 'How content sits in the pane; centered for sign-in screens.',
		name: 'variant',
		type: '"default" | "centered"',
	},
]

const useLayoutProps = [
	{
		description: 'The gutter every part falls back to; "md" outside a Layout.',
		name: 'padding',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		description: 'The <Layout variant>, else "default".',
		name: 'variant',
		type: '"default" | "centered"',
	},
	{
		description: 'Whether a Layout.Sidebar.Provider sits above this shell.',
		name: 'withSidebar',
		type: 'boolean',
	},
]

const headerProps = [
	{
		default: '"md"',
		description: 'Header height: sm 40px, md 56px, lg 64px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Adds a bottom border against the content below.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: 'the shell\u2019s ("md", 24px)',
		description: 'Horizontal padding; unset follows <Layout padding>.',
		name: 'padding',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Sticks to the top (z-50) on a solid background.',
		name: 'sticky',
		type: 'boolean',
	},
	{
		description: 'Left slot; either section switches to three slots.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Right slot, laid out as a flex row with an 8px gap.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		description: 'A truly centred middle slot, e.g. a logo.',
		name: 'centerSection',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Drops one height step and shows its border after 8px scroll.',
		name: 'condenseOnScroll',
		type: 'boolean',
	},
	{
		default: '"full"',
		description: 'Caps and centres the bar’s row, on Container’s scale.',
		name: 'maxWidth',
		type: '"sm" | "md" | "lg" | "xl" | "2xl" | "full"',
	},
	{
		description: 'The header content; the flexible middle beside sections.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const mainProps = [
	{
		description: 'id of the <main> element, a skip-link target.',
		name: 'id',
		type: 'string',
	},
	{
		description: 'The panes: one or more Layout.Content, and a rail inset.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const contentProps = [
	{
		description: 'Caps and centres the inner column; xs when centered.',
		name: 'maxWidth',
		type: '"xs" | "sm" | "md" | "lg"',
	},
	{
		description: 'Paints the pane, e.g. a split screen’s brand side.',
		name: 'bg',
		type: '"background" | "muted" | "card" | "gradient"',
	},
	{
		default: '1',
		description: 'Its share of Main’s row: span={3} beside span={2} is 60/40.',
		name: 'span',
		type: '1 | 2 | 3 | 4',
	},
	{
		default: 'the shell\u2019s ("md", 24px)',
		description: 'Padding on all sides; unset follows <Layout padding>.',
		name: 'padding',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		description: 'Horizontal padding; replaces padding on the x axis.',
		name: 'paddingHorizontal',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		description: 'Vertical padding; replaces padding on the y axis.',
		name: 'paddingVertical',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		description: 'id of the scrolling pane, a skip-link target.',
		name: 'id',
		type: 'string',
	},
]

const footerProps = [
	{
		default: '"md"',
		description: 'Footer height: sm 40px, md 56px, lg 64px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Adds a top border against the content above.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		default: 'the shell\u2019s ("md", 24px)',
		description: 'Horizontal padding; unset follows <Layout padding>.',
		name: 'padding',
		type: '"none" | "sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Sticks to the bottom (z-40) on a solid background.',
		name: 'sticky',
		type: 'boolean',
	},
]

// ─── Layout.Sidebar ───────────────────────────────────────────────────────────

const providerProps = [
	{
		default: 'true',
		description: 'Starting open state, until the sidebar_state cookie is read.',
		name: 'defaultOpen',
		type: 'boolean',
	},
	{
		description: 'Controlled open state; ignores defaultOpen and the cookie.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Called with the next open state; pair it with open.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
	{
		default: '"sidebar"',
		description: 'Default variant for the rail; its own variant wins.',
		name: 'variant',
		type: '"sidebar" | "floating" | "inset"',
	},
	{
		default: '"viewport"',
		description: 'Shell height: viewport pins the rail; fill fits the parent.',
		name: 'height',
		type: '"viewport" | "fill"',
	},
	{
		default: '"md"',
		description: 'Rail width (--sidebar-width): sm 14rem, md 16rem, lg 20rem.',
		name: 'width',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Full-width strip above the rail and the Layout.',
		name: 'banner',
		type: 'React.ReactNode',
	},
	{
		description: 'The rail and the Layout beside it, in a flex row.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const sidebarProps = [
	{
		default: '"left"',
		description: 'Which edge the rail is pinned to.',
		name: 'side',
		type: '"left" | "right"',
	},
	{
		description: 'Overrides the provider variant; no effect on mobile.',
		name: 'variant',
		type: '"sidebar" | "floating" | "inset"',
	},
	{
		default: '"offcanvas"',
		description: 'What collapsing does: slide off, shrink to icons, or none.',
		name: 'collapsible',
		type: '"offcanvas" | "icon" | "none"',
	},
	{
		description: 'The rail’s parts: Header, Content, Footer, separators.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const useSidebarProps = [
	{
		description: '"expanded" or "collapsed", derived from open.',
		name: 'state',
		type: '"expanded" | "collapsed"',
	},
	{
		description: 'Whether the desktop rail is open.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Sets open and writes the sidebar_state cookie.',
		name: 'setOpen',
		type: '(open: boolean | ((current: boolean) => boolean)) => void',
	},
	{
		description: 'Whether the mobile drawer is open. Tracked separately.',
		name: 'openMobile',
		type: 'boolean',
	},
	{
		description: 'Opens or closes the mobile drawer.',
		name: 'setOpenMobile',
		type: '(open: boolean) => void',
	},
	{
		description: 'True below a 768px viewport. Decides which of the two it is.',
		name: 'isMobile',
		type: 'boolean',
	},
	{
		description: 'Flips the state in play; what Cmd/Ctrl+B calls.',
		name: 'toggleSidebar',
		type: '() => void',
	},
	{
		description: 'The variant the provider was given.',
		name: 'variant',
		type: '"sidebar" | "floating" | "inset"',
	},
	{
		description: 'Collapsible mode of the nested rail; "offcanvas" by default.',
		name: 'collapsible',
		type: '"offcanvas" | "icon" | "none"',
	},
	{
		description: 'Edge of the nested rail; "left" by default.',
		name: 'side',
		type: '"left" | "right"',
	},
]

const triggerProps = [
	{
		description: 'Runs before the toggle; it cannot prevent it.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
	},
	{
		description: 'Replaces the default chevron icon.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'Forwarded to the underlying Button as its accessible name.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		default: '"icon-sm"',
		description: 'Forwarded to the underlying Button.',
		name: 'size',
		type: '"sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon-md" | "icon-lg"',
	},
	{
		default: '"ghost"',
		description: 'Forwarded to the underlying Button.',
		name: 'variant',
		type: '"default" | "dark" | "destructive" | "outline" | "dashed" | "secondary" | "ghost" | "link" | "link-muted"',
	},
	{
		description: 'Forwarded to Button: renders the element you hand it.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Forwarded to the underlying Button. Blocks the toggle too.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Forwarded to Button: shows a spinner, blocks interaction.',
		name: 'loading',
		type: 'boolean',
	},
]

const brandProps = [
	{
		description: 'The product name; hidden on the icon rail.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'The mark; shown at every width.',
		name: 'logo',
		type: 'React.ReactNode',
	},
	{
		description: 'Leading control, e.g. the collapse toggle.',
		name: 'action',
		type: 'React.ReactNode',
	},
	{
		description: 'A second line under the name, e.g. the workspace.',
		name: 'subtitle',
		type: 'React.ReactNode',
	},
]

const partProps = [
	{
		description: 'The top block: brand, workspace switcher.',
		name: 'Layout.Sidebar.Header',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'The scrolling middle; fades edges while items lie past them.',
		name: 'Layout.Sidebar.Content',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'The bottom block — account, sign out.',
		name: 'Layout.Sidebar.Footer',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'A horizontal 1px rule; takes no props.',
		name: 'Layout.Sidebar.Separator',
		type: '{}',
	},
	{
		description: 'One titled section of the rail.',
		name: 'Layout.Sidebar.Group',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'The body of a group.',
		name: 'Layout.Sidebar.Group.Content',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'The <ul> of menu items.',
		name: 'Layout.Sidebar.Menu',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'One <li>; a menu action must live inside one.',
		name: 'Layout.Sidebar.Menu.Item',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'A count or status at a row’s right; hidden in icon mode.',
		name: 'Layout.Sidebar.Menu.Badge',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'The <ul> for a nested list; hidden in icon mode.',
		name: 'Layout.Sidebar.Menu.Sub',
		type: '{ children?: React.ReactNode }',
	},
	{
		description: 'One <li> of a nested list.',
		name: 'Layout.Sidebar.Menu.Sub.Item',
		type: '{ children?: React.ReactNode }',
	},
]

const groupLabelProps = [
	{
		description: 'The section title; hidden from screen readers in icon mode.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const groupActionProps = [
	{
		description: 'Icon of a button at the group’s top-right, e.g. add.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'The accessible name; required for an icon button.',
		name: 'ariaLabel',
		required: true,
		type: 'string',
	},
	{
		description: 'Click handler; works under DropdownMenu.Trigger asChild.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
	},
	{
		default: 'false',
		description: 'Disables the button.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const menuButtonProps = [
	{
		default: 'false',
		description: 'Marks the current route (aria-current="page").',
		name: 'isActive',
		type: 'boolean',
	},
	{
		default: '"default"',
		description: 'default is transparent until hovered; outline has a ring.',
		name: 'variant',
		type: '"default" | "outline"',
	},
	{
		default: '"default"',
		description: 'Row height: sm 28px, default 32px, lg 48px.',
		name: 'size',
		type: '"sm" | "default" | "lg"',
	},
	{
		description: 'Label on hover while collapsed; names the icon-only row.',
		name: 'tooltip',
		type: 'string | SidebarMenuButtonTooltip',
	},
	{
		description: 'Click handler; the row is type="button".',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
	},
	{
		default: 'false',
		description: 'Disables the row and blocks the click.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; wins the rail tooltip.',
		name: 'disabledReason',
		type: 'string',
	},
	{
		description: 'The accessible name, for a row without text; wins if given.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'The row content: an icon, then the label.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'A muted second line that describes the row.',
		name: 'description',
		type: 'React.ReactNode',
	},
	{
		description: 'The leading element, kept on the icon rail.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'The trailing element, e.g. a chevron; hidden on icon rail.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
]

const tooltipObjectProps = [
	{
		description: 'The tooltip content.',
		name: 'children',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: '"right"',
		description: 'Which side of the row the tooltip is placed on.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '4',
		description: 'Distance in pixels between the row and the tooltip.',
		name: 'sideOffset',
		type: 'number',
	},
	{
		default: '"center"',
		description: 'Which edge of the row the tooltip aligns to.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
]

const menuActionProps = [
	{
		default: 'false',
		description: 'Shows the action only on row hover or focus (desktop).',
		name: 'showOnHover',
		type: 'boolean',
	},
	{
		description: 'The accessible name; required for an icon action.',
		name: 'ariaLabel',
		required: true,
		type: 'string',
	},
	{
		description: 'Click handler; works under DropdownMenu.Trigger asChild.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
	},
	{
		description: 'The icon.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const menuSkeletonProps = [
	{
		default: 'false',
		description: 'Adds a square placeholder for the row icon.',
		name: 'showIcon',
		type: 'boolean',
	},
]

const menuSubButtonProps = [
	{
		default: '"md"',
		description: 'Text size of the nested row: sm 12px, md 14px.',
		name: 'size',
		type: '"sm" | "md"',
	},
	{
		default: 'false',
		description: 'Marks the current nested route (aria-current="page").',
		name: 'isActive',
		type: 'boolean',
	},
	{
		description: 'Where the row goes; renders an <a>.',
		name: 'href',
		type: 'string',
	},
	{
		description: 'Click handler, for a router navigating in JavaScript.',
		name: 'onClick',
		type: '(event: React.MouseEvent<HTMLAnchorElement>) => void',
	},
	{
		description: 'The label of the nested row.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const collapsibleProps = [
	{
		description: 'The trigger and the content.',
		name: 'children',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Whether the inline panel starts open.',
		name: 'defaultOpen',
		type: 'boolean',
	},
	{
		description: 'Controls the inline panel. Overrides the internal state.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Called on every panel change, including forced closes.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
	{
		description: 'A heading atop the icon-mode dropdown.',
		name: 'label',
		type: 'React.ReactNode',
	},
]

const collapsibleTriggerProps = [
	{
		description: 'The row content — icon and label.',
		name: 'children',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'Marks the row as current.',
		name: 'isActive',
		type: 'boolean',
	},
	{
		default: '"default"',
		description: 'Same two looks as a menu button.',
		name: 'variant',
		type: '"default" | "outline"',
	},
	{
		default: '"default"',
		description: 'Same three heights as a menu button.',
		name: 'size',
		type: '"sm" | "default" | "lg"',
	},
	{
		description: 'Shown in icon mode before the dropdown opens; names the row.',
		name: 'tooltip',
		type: 'string | SidebarMenuButtonTooltip',
	},
	{
		description: 'The accessible name, for a row whose content is not text.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Disables the row; the panel cannot open.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; wins the rail tooltip.',
		name: 'disabledReason',
		type: 'string',
	},
]

const collapsibleContentProps = [
	{
		description: 'The nested rows, inside Layout.Sidebar.Menu.Sub.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

// ─── Code samples ─────────────────────────────────────────────────────────────

const shellCode = `import { Layout } from '@turystack/react-web'

function AppShell() {
  // The gutter is set once, on the root. Header, content and footer all
  // read it, so all three are padded by the same step — a part given a
  // different padding of its own is the one out of line.
  return (
    <Layout padding="lg">
      <Layout.Header
        bordered
        leftSection={<Logo />}
        rightSection={<UserMenu />}
        size="md"
      >
        <SearchField />
      </Layout.Header>

      <Layout.Main>
        <Layout.Content maxWidth="lg">
          <Outlet />
        </Layout.Content>
      </Layout.Main>

      <Layout.Footer bordered size="sm">
        <span>© Turystack</span>
      </Layout.Footer>
    </Layout>
  )
}`

const anatomyCode = `// What each part actually renders, from the source:

<Layout>          → <div    class="layout-root flex min-h-0 min-w-0 flex-col overflow-hidden h-svh">
  <Layout.Header> → <header class="layout-header flex min-w-0 shrink-0 items-center gap-3 px-6 h-14">
  <Layout.Main>   → <main   class="layout-main flex min-h-0 min-w-0 flex-1 overflow-hidden">
    <Layout.Content>
                  → <div    class="layout-content min-h-0 min-w-0 flex-1 overflow-auto">
                      <div  class="layout-content-inner mx-auto min-h-full w-full min-w-0 px-6 py-6"> … </div>
                    </div>
  <Layout.Footer> → <footer class="layout-footer flex min-w-0 shrink-0 items-center gap-3 px-6 h-14">
</Layout>

// The root is a <div>, so Layout.Main is the page's only main landmark.
// The whole column is overflow-hidden and header and footer are shrink-0,
// so Layout.Content is the single scrolling box — which is the point.
// px-6 three times is one gutter, not three: <Layout padding> defaults to
// md, and header, footer and content all read it from the same map.`

const withSidebarCode = `import { Layout, useLayout } from '@turystack/react-web'

<Layout.Sidebar.Provider>
  <Layout.Sidebar collapsible="icon">…</Layout.Sidebar>

  {/* No flag. The shell reads the sidebar context and becomes the
      content pane beside the rail — the box Sidebar.Inset used to be. */}
  <Layout>
    <SidebarAwareChrome />
  </Layout>
</Layout.Sidebar.Provider>

function SidebarAwareChrome() {
  const { withSidebar } = useLayout()

  return withSidebar ? <RailOffsetHeader /> : <PlainHeader />
}

// Read outside any Layout, the hook returns { padding: 'md', variant: 'default', withSidebar: false }
// from the context default rather than throwing.`

const compositionCode = `import { Layout } from '@turystack/react-web'

<Layout.Sidebar.Provider>
  <Layout.Sidebar collapsible="icon">
    <Layout.Sidebar.Header>
      {/* The toggle lives here, in the rail's own icon column — never in
          Layout.Header. */}
      <Layout.Sidebar.Brand
        action={<Layout.Sidebar.Trigger />}
        logo={<Mark />}
        subtitle="Operations"
      >
        Turystack
      </Layout.Sidebar.Brand>
    </Layout.Sidebar.Header>

    <Layout.Sidebar.Content>
      <Layout.Sidebar.Group>
        <Layout.Sidebar.Group.Label>Platform</Layout.Sidebar.Group.Label>
        {/* Icon-only, so the name is required */}
        <Layout.Sidebar.Group.Action ariaLabel="New project">
          <Plus />
        </Layout.Sidebar.Group.Action>
        <Layout.Sidebar.Group.Content>
          <Layout.Sidebar.Menu>
            <Layout.Sidebar.Menu.Item>
              <Layout.Sidebar.Menu.Button isActive tooltip="Overview">
                <House />
                <span>Overview</span>
              </Layout.Sidebar.Menu.Button>
            </Layout.Sidebar.Menu.Item>
          </Layout.Sidebar.Menu>
        </Layout.Sidebar.Group.Content>
      </Layout.Sidebar.Group>
    </Layout.Sidebar.Content>

    <Layout.Sidebar.Footer>…</Layout.Sidebar.Footer>
  </Layout.Sidebar>

  <Layout>
    <Layout.Header bordered leftSection={<Breadcrumbs />}>
      Orders
    </Layout.Header>
    <Layout.Main>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout.Main>
  </Layout>
</Layout.Sidebar.Provider>`

const geometryCode = `// From the constants at the top of sidebar.tsx:
SIDEBAR_WIDTH          = { sm: '14rem', md: '16rem', lg: '20rem' } // --sidebar-width
SIDEBAR_WIDTH_MOBILE   = '18rem'    // the drawer
SIDEBAR_WIDTH_ICON     = '3.5rem'   // --sidebar-width-icon
SIDEBAR_KEYBOARD_SHORTCUT = 'b'     // with meta or ctrl
SIDEBAR_COOKIE_NAME    = 'sidebar_state'
SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7

// The rail's width is a preset on the provider, not a style —
// sm 14rem, md 16rem (SIDEBAR_WIDTH.md, the default), lg 20rem:
<Layout.Sidebar.Provider width="lg" />

// And a shell that is not the whole page fills the box it is given
// instead of the viewport. The parent must have a height:
<div className="h-[40rem]">
  <Layout.Sidebar.Provider height="fill">…</Layout.Sidebar.Provider>
</div>`

const persistenceCode = `// Every toggle writes the cookie; an effect reads it back after the
// first paint, so a reload lands on the rail you left. It runs after
// paint on purpose — a server render and the first client render have
// to agree on defaultOpen, and the cookie is not available to both.
// The write uses the Cookie Store API: without it (Safari < 18.4,
// Firefox < 140) the state is not remembered between visits.

// Controlled providers are left alone entirely: pass \`open\` and the
// stored value is neither read nor applied.
<Layout.Sidebar.Provider open={open} onOpenChange={setOpen} />`

const triggerCode = `import { Button, Layout, useSidebar } from '@turystack/react-web'

// The stock trigger. It belongs in the rail, as the brand's action —
// a toggle in the page header is a control the rail cannot take with
// it when it collapses.
<Layout.Sidebar.Brand action={<Layout.Sidebar.Trigger />}>…</Layout.Sidebar.Brand>

// The same behaviour, with a button you own
function MyTrigger() {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      ariaLabel={state === 'expanded' ? 'Collapse menu' : 'Expand menu'}
      onClick={toggleSidebar}
      variant="outline"
    >
      Menu
    </Button>
  )
}`

const tooltipCode = `// A string — placed to the right, 4px out. On the collapsed rail the
// row is an icon alone, and this text is its accessible name there too:
// a screen reader hears "Orders", not an unnamed button
<Layout.Sidebar.Menu.Button tooltip="Orders">…</Layout.Sidebar.Menu.Button>

// An object — same defaults, overridable
<Layout.Sidebar.Menu.Button
  tooltip={{ children: 'Orders', side: 'bottom', sideOffset: 12 }}
>
  …
</Layout.Sidebar.Menu.Button>`

const mobileCode = `// Below a 768px viewport, <Layout.Sidebar> renders a Base UI Dialog
// instead of the rail: a portalled 18rem drawer over the shared
// bg-overlay scrim (the --overlay token), sliding in from the given side.
//
//   - The rail is not merely covered: the component returns the
//     Dialog instead of it, so the rail is never rendered.
//   - The drawer has its own state: openMobile / setOpenMobile.
//   - The trigger and Cmd/Ctrl+B both route to toggleSidebar,
//     which picks the right one by reading isMobile.
//   - variant has no visual effect on the drawer, and neither do
//     offcanvas and icon — but collapsible="none" is checked
//     first and never becomes a drawer at all: it stays the
//     inline column at every width.
//
// Branch on it when the chrome differs:
const { isMobile, openMobile, setOpenMobile } = useSidebar()

// Close the drawer after navigating, which the library does not
// do for you:
<Layout.Sidebar.Menu.Button onClick={() => isMobile && setOpenMobile(false)}>
  <House />
  <span>Overview</span>
</Layout.Sidebar.Menu.Button>`

// ─── Playground ───────────────────────────────────────────────────────────────

const PLATFORM = [
	{
		icon: House,
		label: 'Overview',
	},
	{
		badge: '12',
		icon: Package,
		label: 'Orders',
	},
	{
		icon: Users,
		label: 'Customers',
	},
	{
		icon: ChartNoAxesColumn,
		label: 'Reports',
	},
]

type Options = {
	brandSubtitle: boolean
	collapsible: SidebarCollapsible
	contentMaxWidth: LayoutContentMaxWidth | 'none'
	contentPadding: LayoutPadding | 'shell'
	footer: boolean
	footerBordered: boolean
	footerPadding: LayoutPadding | 'shell'
	footerSize: LayoutFooterSize
	header: boolean
	headerBordered: boolean
	headerPadding: LayoutPadding | 'shell'
	headerSections: boolean
	headerSize: LayoutHeaderSize
	loading: boolean
	shellPadding: LayoutPadding
	side: SidebarSide
	sidebar: boolean
	variant: SidebarVariant
	width: SidebarWidth
}

const INITIAL: Options = {
	brandSubtitle: true,
	collapsible: 'icon',
	contentMaxWidth: 'lg',
	contentPadding: 'shell',
	footer: false,
	footerBordered: true,
	footerPadding: 'shell',
	footerSize: 'sm',
	header: true,
	headerBordered: true,
	headerPadding: 'shell',
	headerSections: true,
	headerSize: 'md',
	loading: false,
	shellPadding: 'md',
	side: 'left',
	sidebar: true,
	variant: 'sidebar',
	width: 'md',
}

/**
 * Why a control has nothing to act on. Said beside it rather than left to be
 * guessed: a button that silently does nothing reads as a broken playground.
 */
const HIDDEN = {
	footer: 'No footer to change — it is hidden under parts.',
	header: 'No header to change — it is hidden under parts.',
	sidebar: 'No rail to change — the sidebar is hidden under parts.',
} as const

/** The reasons a group's disabled toggles are disabled, as one line — or none. */
function why(...reasons: (string | false)[]) {
	const given = reasons.filter((reason): reason is string => reason !== false)

	return given.length > 0 ? given.join(' ') : undefined
}

/** `shell` means "whatever <Layout padding> says", which is the real default. */
function own<T>(value: T | 'shell'): T | undefined {
	return value === 'shell' ? undefined : value
}

/** A header of `size` and a button of the same weight read as one bar. */
const BUTTON_SIZE = {
	lg: 'md',
	md: 'sm',
	sm: 'sm',
} as const

/**
 * The panel is built from this site's own markup, never from react-web.
 *
 * It drives the component below it, so a control built out of the component
 * would restyle itself as you used it — pick `variant="inset"` and the buttons
 * you clicked with move. Staying outside the scope keeps the controls readable
 * whatever the shell is doing.
 *
 * `off` is why the whole group has nothing to act on, and it disables the
 * group through a fieldset rather than button by button. `note` is the line
 * under an enabled group: what it means, or why one of its toggles is off.
 */
function Field({
	children,
	label,
	note,
	off,
}: {
	children: ReactNode
	label: string
	note?: string
	off?: string
}) {
	const said = off ?? note

	return (
		<div className="space-y-1.5">
			<span className="block font-medium text-[11px] text-muted-foreground uppercase tracking-wider">
				{label}
			</span>
			<fieldset
				aria-label={label}
				className="flex flex-wrap gap-1"
				disabled={off !== undefined}
			>
				{children}
			</fieldset>
			{said ? (
				<p className="text-[11px] text-muted-foreground leading-snug">{said}</p>
			) : null}
		</div>
	)
}

function Choice<T extends string>({
	onChange,
	options,
	value,
}: {
	onChange: (value: T) => void
	options: readonly T[]
	value: T
}) {
	return (
		<>
			{options.map((option) => (
				<button
					className={cn(
						'cursor-pointer rounded-md border px-2 py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50',
						option === value
							? 'border-lib bg-lib/10 text-foreground'
							: 'border-border text-muted-foreground enabled:hover:bg-muted',
					)}
					key={option}
					onClick={() => onChange(option)}
					type="button"
				>
					{option}
				</button>
			))}
		</>
	)
}

function Toggle({
	checked,
	disabled,
	label,
	onChange,
}: {
	checked: boolean
	disabled?: boolean
	label: string
	onChange: (checked: boolean) => void
}) {
	return (
		<button
			className={cn(
				'cursor-pointer rounded-md border px-2 py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50',
				checked
					? 'border-lib bg-lib/10 text-foreground'
					: 'border-border text-muted-foreground enabled:hover:bg-muted',
			)}
			disabled={disabled}
			onClick={() => onChange(!checked)}
			type="button"
		>
			{label}
		</button>
	)
}

function Panel({
	onChange,
	options,
}: {
	onChange: (next: Partial<Options>) => void
	options: Options
}) {
	const noRail = options.sidebar ? undefined : HIDDEN.sidebar
	const noHeader = options.header ? undefined : HIDDEN.header
	const noFooter = options.footer ? undefined : HIDDEN.footer

	return (
		<div className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-2 lg:grid-cols-3">
			<Field
				label="collapsible"
				off={noRail}
			>
				<Choice
					onChange={(collapsible) =>
						onChange({
							collapsible,
						})
					}
					options={[
						'offcanvas',
						'icon',
						'none',
					]}
					value={options.collapsible}
				/>
			</Field>
			<Field
				label="side"
				off={noRail}
			>
				<Choice
					onChange={(side) =>
						onChange({
							side,
						})
					}
					options={[
						'left',
						'right',
					]}
					value={options.side}
				/>
			</Field>
			<Field
				label="variant"
				off={noRail}
			>
				<Choice
					onChange={(variant) =>
						onChange({
							variant,
						})
					}
					options={[
						'sidebar',
						'floating',
						'inset',
					]}
					value={options.variant}
				/>
			</Field>
			<Field
				label="width"
				note="The rail: sm 14rem, md 16rem, lg 20rem. The icon strip stays 3.5rem."
				off={noRail}
			>
				<Choice
					onChange={(width) =>
						onChange({
							width,
						})
					}
					options={[
						'sm',
						'md',
						'lg',
					]}
					value={options.width}
				/>
			</Field>
			<Field
				label="header size"
				off={noHeader}
			>
				<Choice
					onChange={(headerSize) =>
						onChange({
							headerSize,
						})
					}
					options={[
						'sm',
						'md',
						'lg',
					]}
					value={options.headerSize}
				/>
			</Field>
			<Field
				label="Layout padding — every part falls back to it"
				note="One scale for all three parts: sm 16px, md 24px, lg 32px."
			>
				<Choice
					onChange={(shellPadding) =>
						onChange({
							shellPadding,
						})
					}
					options={[
						'none',
						'sm',
						'md',
						'lg',
					]}
					value={options.shellPadding}
				/>
			</Field>
			<Field
				label="header padding"
				note="shell follows Layout padding. A different step pads the header apart from the content."
				off={noHeader}
			>
				<Choice
					onChange={(headerPadding) =>
						onChange({
							headerPadding,
						})
					}
					options={[
						'shell',
						'none',
						'sm',
						'md',
						'lg',
					]}
					value={options.headerPadding}
				/>
			</Field>
			<Field
				label="content padding"
				note="shell follows Layout padding. A different step pads the content apart from the header and footer."
			>
				<Choice
					onChange={(contentPadding) =>
						onChange({
							contentPadding,
						})
					}
					options={[
						'shell',
						'none',
						'sm',
						'md',
						'lg',
					]}
					value={options.contentPadding}
				/>
			</Field>
			<Field
				label="footer padding"
				note="shell follows Layout padding. A different step pads the footer apart from the content."
				off={noFooter}
			>
				<Choice
					onChange={(footerPadding) =>
						onChange({
							footerPadding,
						})
					}
					options={[
						'shell',
						'none',
						'sm',
						'md',
						'lg',
					]}
					value={options.footerPadding}
				/>
			</Field>
			<Field
				label="content maxWidth"
				note="A cap narrower than the pane centres the column, so its edge sits further in than the header's."
			>
				<Choice
					onChange={(contentMaxWidth) =>
						onChange({
							contentMaxWidth,
						})
					}
					options={[
						'none',
						'sm',
						'md',
						'lg',
					]}
					value={options.contentMaxWidth}
				/>
			</Field>
			<Field
				label="footer size"
				off={noFooter}
			>
				<Choice
					onChange={(footerSize) =>
						onChange({
							footerSize,
						})
					}
					options={[
						'sm',
						'md',
						'lg',
					]}
					value={options.footerSize}
				/>
			</Field>
			<Field
				label="borders"
				note={why(
					!options.header && 'The header is hidden.',
					!options.footer && 'The footer is hidden.',
				)}
			>
				<Toggle
					checked={options.headerBordered}
					disabled={!options.header}
					label="header"
					onChange={(headerBordered) =>
						onChange({
							headerBordered,
						})
					}
				/>
				<Toggle
					checked={options.footerBordered}
					disabled={!options.footer}
					label="footer"
					onChange={(footerBordered) =>
						onChange({
							footerBordered,
						})
					}
				/>
			</Field>
			<Field
				label="parts"
				note={why(
					!options.header && 'Header sections need the header.',
					!options.sidebar &&
						'Brand subtitle and skeleton rows need the sidebar.',
				)}
			>
				<Toggle
					checked={options.header}
					label="header"
					onChange={(header) =>
						onChange({
							header,
						})
					}
				/>
				<Toggle
					checked={options.sidebar}
					label="sidebar"
					onChange={(sidebar) =>
						onChange({
							sidebar,
						})
					}
				/>
				<Toggle
					checked={options.footer}
					label="footer"
					onChange={(footer) =>
						onChange({
							footer,
						})
					}
				/>
				<Toggle
					checked={options.headerSections}
					disabled={!options.header}
					label="header sections"
					onChange={(headerSections) =>
						onChange({
							headerSections,
						})
					}
				/>
				<Toggle
					checked={options.brandSubtitle}
					disabled={!options.sidebar}
					label="brand subtitle"
					onChange={(brandSubtitle) =>
						onChange({
							brandSubtitle,
						})
					}
				/>
				<Toggle
					checked={options.loading}
					disabled={!options.sidebar}
					label="skeleton rows"
					onChange={(loading) =>
						onChange({
							loading,
						})
					}
				/>
			</Field>
		</div>
	)
}

/** The mark the brand wears. */
function Mark() {
	return <span className="font-semibold text-[11px]">T</span>
}

const ORGANIZATIONS = [
	{
		id: 'acme',
		name: 'Acme Inc',
		plan: 'Enterprise',
	},
	{
		id: 'northwind',
		name: 'Northwind',
		plan: 'Growth',
	},
	{
		id: 'globex',
		name: 'Globex',
		plan: 'Trial',
	},
]

/**
 * Picking the organization, in the one place every app puts it.
 *
 * A menu button rather than a Select: on the icon rail it has to survive as a
 * 32px square, and a Select's trigger is a field — it would be a text input
 * squeezed into a strip. `asChild` hands the trigger to the real row instead of
 * nesting a button inside a button.
 */
function OrganizationMenu() {
	const [current, setCurrent] = useState(ORGANIZATIONS[0])

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Layout.Sidebar.Menu.Button
					size="lg"
					tooltip={current.name}
				>
					<span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent font-semibold text-[10px]">
						{current.name.slice(0, 1)}
					</span>
					<span className="grid min-w-0 flex-1 text-left leading-tight">
						<span className="truncate font-medium">{current.name}</span>
						<span className="truncate text-muted-foreground text-xs">
							{current.plan}
						</span>
					</span>
					<ChevronsUpDown className="ml-auto" />
				</Layout.Sidebar.Menu.Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="start"
				side="right"
				sideOffset={8}
			>
				<DropdownMenu.Label>Organizations</DropdownMenu.Label>
				{ORGANIZATIONS.map((organization) => (
					<DropdownMenu.Item
						key={organization.id}
						onClick={() => setCurrent(organization)}
					>
						<span className="mr-2 flex size-5 items-center justify-center rounded bg-muted font-semibold text-[10px]">
							{organization.name.slice(0, 1)}
						</span>
						{organization.name}
						{organization.id === current.id ? (
							<Check className="ml-auto size-4" />
						) : null}
					</DropdownMenu.Item>
				))}
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<Plus className="mr-2 size-4" />
					New organization
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/**
 * The signed-in account, which is the whole of a sidebar footer in practice.
 *
 * A menu button rather than a link: the row opens the account menu, so it wears
 * a chevron pointing at where the panel appears. `asChild` hands the trigger to
 * the real menu button instead of nesting a button inside a button. The avatar,
 * the address and the chevron are sections, not children: the row stays named
 * by the name alone, and the collapsed rail keeps only the avatar.
 */
function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Layout.Sidebar.Menu.Button
					description="ana@turystack.io"
					leftSection={<Avatar size="sm">A</Avatar>}
					rightSection={<ChevronRight />}
					size="lg"
					tooltip="Ana Ribeiro"
				>
					Ana Ribeiro
				</Layout.Sidebar.Menu.Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				side="right"
				sideOffset={8}
			>
				{/* Who you are signed in as, repeated inside the menu: on the icon
				    rail the row collapses to the avatar, so the panel is the only
				    place the name and the address are still readable. */}
				<DropdownMenu.Label>
					<span className="flex items-center gap-2 py-1">
						<Avatar size="sm">A</Avatar>
						<span className="grid min-w-0 text-left leading-tight">
							<span className="truncate font-medium text-sm">Ana Ribeiro</span>
							<span className="truncate font-normal text-muted-foreground text-xs">
								ana@turystack.io
							</span>
						</span>
					</span>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<User className="mr-2 size-4" />
					Profile
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<CreditCard className="mr-2 size-4" />
					Billing
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Settings className="mr-2 size-4" />
					Settings
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOut className="mr-2 size-4" />
					Sign out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

function Rail({ options }: { options: Options }) {
	return (
		<Layout.Sidebar
			// No height here: the provider's height="fill" is what makes the rail
			// end where the frame ends rather than a screen below it.
			collapsible={options.collapsible}
			side={options.side}
		>
			<Layout.Sidebar.Header>
				<Layout.Sidebar.Brand
					action={<Layout.Sidebar.Trigger />}
					logo={<Mark />}
					subtitle={options.brandSubtitle ? 'Operations' : undefined}
				>
					Turystack
				</Layout.Sidebar.Brand>
				<Layout.Sidebar.Menu>
					<Layout.Sidebar.Menu.Item>
						<OrganizationMenu />
					</Layout.Sidebar.Menu.Item>
				</Layout.Sidebar.Menu>
			</Layout.Sidebar.Header>

			<Layout.Sidebar.Content>
				<Layout.Sidebar.Group>
					<Layout.Sidebar.Group.Label>Platform</Layout.Sidebar.Group.Label>
					<Layout.Sidebar.Group.Action ariaLabel="Add">
						<Plus />
					</Layout.Sidebar.Group.Action>
					<Layout.Sidebar.Group.Content>
						<Layout.Sidebar.Menu>
							{options.loading
								? [
										'a',
										'b',
										'c',
										'd',
									].map((row) => (
										<Layout.Sidebar.Menu.Item key={row}>
											<Layout.Sidebar.Menu.Skeleton showIcon />
										</Layout.Sidebar.Menu.Item>
									))
								: PLATFORM.map(({ badge, icon: Icon, label }) => (
										<Layout.Sidebar.Menu.Item key={label}>
											<Layout.Sidebar.Menu.Button
												isActive={label === 'Orders'}
												tooltip={label}
											>
												<Icon />
												<span>{label}</span>
											</Layout.Sidebar.Menu.Button>
											{badge ? (
												<Layout.Sidebar.Menu.Badge>
													{badge}
												</Layout.Sidebar.Menu.Badge>
											) : null}
										</Layout.Sidebar.Menu.Item>
									))}
						</Layout.Sidebar.Menu>
					</Layout.Sidebar.Group.Content>
				</Layout.Sidebar.Group>

				<Layout.Sidebar.Separator />

				<Layout.Sidebar.Group>
					<Layout.Sidebar.Group.Label>Workspace</Layout.Sidebar.Group.Label>
					<Layout.Sidebar.Group.Content>
						<Layout.Sidebar.Menu>
							<Layout.Sidebar.Menu.Item>
								<Layout.Sidebar.Menu.Collapsible label="Billing">
									<Layout.Sidebar.Menu.Collapsible.Trigger tooltip="Billing">
										<CreditCard />
										<span>Billing</span>
									</Layout.Sidebar.Menu.Collapsible.Trigger>
									<Layout.Sidebar.Menu.Collapsible.Content>
										<Layout.Sidebar.Menu.Sub>
											<Layout.Sidebar.Menu.Sub.Item>
												<Layout.Sidebar.Menu.Sub.Button
													href="#invoices"
													isActive
												>
													Invoices
												</Layout.Sidebar.Menu.Sub.Button>
											</Layout.Sidebar.Menu.Sub.Item>
											<Layout.Sidebar.Menu.Sub.Item>
												<Layout.Sidebar.Menu.Sub.Button href="#plans">
													Plans
												</Layout.Sidebar.Menu.Sub.Button>
											</Layout.Sidebar.Menu.Sub.Item>
										</Layout.Sidebar.Menu.Sub>
									</Layout.Sidebar.Menu.Collapsible.Content>
								</Layout.Sidebar.Menu.Collapsible>
							</Layout.Sidebar.Menu.Item>
							<Layout.Sidebar.Menu.Item>
								<Layout.Sidebar.Menu.Button tooltip="Team">
									<Users />
									<span>Team</span>
								</Layout.Sidebar.Menu.Button>
								<Layout.Sidebar.Menu.Action
									ariaLabel="Invite"
									showOnHover
								>
									<Ellipsis />
								</Layout.Sidebar.Menu.Action>
							</Layout.Sidebar.Menu.Item>
							<Layout.Sidebar.Menu.Item>
								<Layout.Sidebar.Menu.Button tooltip="Support">
									<LifeBuoy />
									<span>Support</span>
								</Layout.Sidebar.Menu.Button>
							</Layout.Sidebar.Menu.Item>
						</Layout.Sidebar.Menu>
					</Layout.Sidebar.Group.Content>
				</Layout.Sidebar.Group>
			</Layout.Sidebar.Content>

			<Layout.Sidebar.Separator />

			<Layout.Sidebar.Footer>
				<Layout.Sidebar.Menu>
					<Layout.Sidebar.Menu.Item>
						<AccountMenu />
					</Layout.Sidebar.Menu.Item>
				</Layout.Sidebar.Menu>
			</Layout.Sidebar.Footer>
		</Layout.Sidebar>
	)
}

const STATUS_OPTIONS = [
	{
		label: 'Paid',
		value: 'paid',
	},
	{
		label: 'Awaiting payment',
		value: 'awaiting',
	},
	{
		label: 'Shipped',
		value: 'shipped',
	},
	{
		label: 'Refunded',
		value: 'refunded',
	},
]

const ORDER_ROWS = [
	{
		archived: false,
		channel: 'Web',
		customer: 'Ana Ribeiro',
		id: '1042',
		status: 'Paid',
		total: 'R$ 1.240,00',
	},
	{
		archived: false,
		channel: 'Store',
		customer: 'Bruno Alves',
		id: '1041',
		status: 'Awaiting',
		total: 'R$ 380,00',
	},
	{
		archived: false,
		channel: 'Web',
		customer: 'Carla Dias',
		id: '1040',
		status: 'Shipped',
		total: 'R$ 2.115,00',
	},
	{
		archived: false,
		channel: 'Partner',
		customer: 'Diego Melo',
		id: '1039',
		status: 'Refunded',
		total: 'R$ 90,00',
	},
	{
		archived: false,
		channel: 'Web',
		customer: 'Elis Prado',
		id: '1038',
		status: 'Paid',
		total: 'R$ 655,00',
	},
	{
		archived: false,
		channel: 'Store',
		customer: 'Fábio Nunes',
		id: '1037',
		status: 'Paid',
		total: 'R$ 1.980,00',
	},
]

type OrderRow = (typeof ORDER_ROWS)[number]

/**
 * Widths are pixels, on the one scale the table also measures its 40px
 * checkbox column in — written as 1 and 2 they left the checkboxes most of the
 * row, and capped every cell's content at a pixel or two.
 */
const ORDER_COLUMNS = [
	{
		key: 'id',
		label: 'Order',
		selector: (row: OrderRow) => `#${row.id}`,
		width: 90,
	},
	{
		key: 'customer',
		label: 'Customer',
		width: 220,
	},
	{
		key: 'channel',
		label: 'Channel',
		width: 110,
	},
	{
		key: 'status',
		label: 'Status',
		selector: (row: OrderRow) => <Badge size="sm">{row.status}</Badge>,
		width: 130,
	},
	{
		align: 'right' as const,
		key: 'total',
		label: 'Total',
		width: 130,
	},
]

type OrderFilters = {
	archived: boolean
	page: number
	perPage: number
	search?: string
	status?: string
}

const NO_FILTERS: OrderFilters = {
	archived: false,
	page: 1,
	perPage: 20,
}

/**
 * The table's own columns, so the file and the screen agree on what an order
 * is. Every one of them can leave in an export.
 */
const EXPORT_COLUMNS = columnsFromTable<OrderRow>(ORDER_COLUMNS)

/** What a spreadsheet row looks like for each column that can come in. */
const IMPORT_DETAILS: Partial<
	Record<keyof OrderRow, Partial<DataTransferColumn<OrderRow>>>
> = {
	channel: {
		example: 'Web',
	},
	customer: {
		example: 'Ana Ribeiro',
		required: true,
	},
	total: {
		example: '1240.00',
		required: true,
	},
}

/**
 * The same columns coming in, less two that make no sense in a file: the order
 * number is the API's to assign, and a status is what payments and shipments
 * make of an order, not a value typed into a spreadsheet.
 */
const IMPORT_COLUMNS = columnsFromTable<OrderRow>(ORDER_COLUMNS)
	.filter((column) => column.key !== 'id' && column.key !== 'status')
	.map((column) => ({
		...column,
		...IMPORT_DETAILS[column.key],
	}))

/**
 * The page's own three filters, under the page's own keys, so what the table is
 * filtered by drops straight into the export's `defaultValues`. Status is
 * several values on both sides — `multiSelect` — so a page showing "paid or
 * shipped" opens an export holding both, never one of the two.
 */
const EXPORT_FILTERS: DataTransferFilter[] = [
	{
		key: 'search',
		label: 'Search',
		placeholder: 'Code or customer',
		type: 'text',
	},
	{
		key: 'status',
		label: 'Status',
		options: STATUS_OPTIONS,
		placeholder: 'Any status',
		type: 'multiSelect',
	},
	{
		key: 'archived',
		label: 'Archived',
		placeholder: 'Either',
		type: 'boolean',
	},
]

/**
 * Six orders for Import, two of which the fake API refuses: a channel it does
 * not sell through, and a total written as money rather than as a number.
 */
const IMPORT_SAMPLE_HREF = `data:text/csv;charset=utf-8,${encodeURIComponent(
	[
		'Customer,Channel,Total',
		'Gabriela Lima,Web,480.00',
		'Heitor Souza,Store,1320.00',
		'Isabela Rocha,Marketplace,210.00',
		'João Pires,Web,"R$ 75,00"',
		'Karina Mendes,Partner,960.00',
		'Lucas Freitas,Web,305.50',
	].join('\n'),
)}`

const SEND_MS = 900 // the request that opens a job, or runs a bulk action
const BUILD_MS = 2500 // the export's file, built after the API answered
const STEP_MS = 800 // the import reaching its next two rows
const POLL_MS = 500 // how often the stand-in query asks again

/**
 * The page's stand-in for the orders API, cut to what this screen needs.
 *
 * Both requests answer with a job straight away and do the work afterwards, on
 * the API's own time — the shape DataTransferImport and DataTransferExport are
 * built around. The full versions, each with the job's own page, are on those
 * components' pages; these only have to make the shell's content real.
 */
const exportsById = new Map<
	string,
	{
		fileName: string
		href?: string
		status: DataTransferStatus
	}
>()

const importsById = new Map<
	string,
	{
		records: DataTransferImportRecord<OrderRow>[]
		startedAt: number
	}
>()

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function jobId(prefix: string) {
	return `${prefix}_${Math.random().toString(36).slice(2, 8)}`
}

/** "1 order", "3 orders". */
function countOrders(count: number) {
	return `${count} ${count === 1 ? 'order' : 'orders'}`
}

/**
 * The rows a set of filters lets through. One function for the table and the
 * export, so the file holds what the list shows. An unset Archived — which only
 * the export can have — lets both kinds through.
 */
function matches(row: OrderRow, values: DataTransferFilterValues) {
	const archived = values.archived
	const search = String(values.search ?? '')
		.trim()
		.toLowerCase()
	const statuses = (values.status as string[] | null | undefined) ?? []

	return (
		(typeof archived !== 'boolean' || row.archived === archived) &&
		(statuses.length === 0 || statuses.includes(row.status.toLowerCase())) &&
		(search === '' ||
			`#${row.id} ${row.customer}`.toLowerCase().includes(search))
	)
}

/** A real CSV: the rows given, the columns the reader kept, in declared order. */
function csvOf(rows: OrderRow[], columns: (keyof OrderRow)[]) {
	const header = columns.map(
		(key) => EXPORT_COLUMNS.find((column) => column.key === key)?.label ?? key,
	)

	return [
		header,
		...rows.map((row) => columns.map((key) => row[key])),
	]
		.map((line) =>
			line.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','),
		)
		.join('\n')
}

async function startExport(
	rows: OrderRow[],
	columns: (keyof OrderRow)[],
): Promise<DataTransferJob> {
	await wait(SEND_MS)

	const id = jobId('exp')
	const fileName = `orders-${id}.csv`

	exportsById.set(id, {
		fileName,
		status: 'pending',
	})
	setTimeout(() => {
		exportsById.set(id, {
			fileName,
			href: URL.createObjectURL(
				new Blob(
					[
						csvOf(rows, columns),
					],
					{
						type: 'text/csv;charset=utf-8',
					},
				),
			),
			status: 'success',
		})
	}, BUILD_MS)

	return {
		id,
	}
}

const CHANNELS = [
	'Web',
	'Store',
	'Partner',
]

/**
 * What the API refuses, row by row. This screen passes no schema, so every rule
 * lands here and comes back on the line of the file it came from.
 */
function refusals(row: OrderRow) {
	const errors: string[] = []
	const channel = row.channel.trim()
	const total = row.total.trim()

	if (row.customer.trim() === '') {
		errors.push('Customer is required')
	}

	if (channel !== '' && !CHANNELS.includes(channel)) {
		errors.push(`Channel must be Web, Store or Partner, not “${channel}”`)
	}

	if (total === '') {
		errors.push('Total is required')
	} else if (Number.isNaN(Number(total))) {
		errors.push(`Total is not a number: “${total}”`)
	}

	return errors
}

async function startImport(
	rows: OrderRow[],
	{ lines }: DataTransferImportMeta,
): Promise<DataTransferJob> {
	await wait(SEND_MS)

	const id = jobId('imp')

	importsById.set(id, {
		records: rows.map((row, index) => {
			const errors = refusals(row)

			return {
				errors,
				// The file's line, not the position in `rows`: a row refused at the
				// Check step is not sent, and every position after it shifts.
				row: lines[index] ?? index + 1,
				status: errors.length > 0 ? 'error' : 'success',
				values: {
					channel: row.channel,
					customer: row.customer,
					total: row.total,
				},
			}
		}),
		startedAt: Date.now(),
	})

	return {
		id,
	}
}

/**
 * One page of an import's rows as the API would answer it: the rows it has
 * reached carry their fate, two more every STEP_MS, and the rest are pending.
 */
function readImport(id: string, page: number, perPage: number) {
	const job = importsById.get(id)
	const all = job?.records ?? []
	const reached = job
		? Math.floor((Date.now() - job.startedAt) / STEP_MS) * 2
		: 0

	return {
		pending: Math.max(0, all.length - reached),
		records: all
			.map(
				(record, index): DataTransferImportRecord<OrderRow> =>
					index < reached
						? record
						: {
								row: record.row,
								status: 'pending',
								values: record.values,
							},
			)
			.slice((page - 1) * perPage, page * perPage),
		total: all.length,
	}
}

/**
 * Stands in for a query's `refetchInterval`: renders again every POLL_MS while
 * `active`, and never after.
 */
function usePolling(active: boolean) {
	const [, setAsked] = useState(0)

	useEffect(() => {
		if (!active) {
			return
		}

		const timer = window.setInterval(
			() => setAsked((count) => count + 1),
			POLL_MS,
		)

		return () => window.clearInterval(timer)
	}, [
		active,
	])
}

/** The export's file, asked about until it exists. */
function ExportResult({ job }: { job: DataTransferJob }) {
	const file = exportsById.get(job.id)

	usePolling(file?.status === 'pending')

	return (
		<DataTransferExport.Download
			fileName={file?.fileName}
			href={file?.href}
			status={file?.status ?? 'pending'}
		/>
	)
}

/** The import's rows, asked about while any of them is still pending. */
function ImportResult({ job }: { job: DataTransferJob }) {
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(5)
	const data = readImport(job.id, page, perPage)

	usePolling(data.pending > 0)

	const outcome = useDataOutcome({
		query: {
			data,
			// A poll is not a refresh the reader asked for. Reported as one, the
			// list would dim under a spinner on every tick and hide the very
			// badges that are settling.
			isFetching: false,
			isPending: false,
			refetch: () => undefined,
		},
		select: (answer) => answer.records,
	})

	return (
		<DataTransferImport.Records
			columns={IMPORT_COLUMNS}
			outcome={outcome}
			pagination={{
				mode: 'offset',
				onPageChange: setPage,
				onRowsPerPageChange: (next) => {
					setPerPage(next)
					setPage(1)
				},
				page,
				rowsPerPage: perPage,
				rowsPerPageOptions: [
					5,
					10,
				],
				total: data.total,
			}}
		/>
	)
}

/**
 * The page a route renders into the shell: `Page` around `Search` and `Table`,
 * plus the three things a list of orders is for besides reading it — acting on
 * a selection, bringing orders in, and taking them out.
 *
 * The state here stands in for the route's search. In an app it is
 * `Route.useSearch()` and every change is a `navigate`, which is why the whole
 * object moves at once rather than field by field.
 */
function OrdersScreen({ headerSize }: { headerSize: LayoutHeaderSize }) {
	const [filters, setFilters] = useState<OrderFilters>(NO_FILTERS)
	const [rows, setRows] = useState<OrderRow[]>(ORDER_ROWS)
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const [exportOpen, setExportOpen] = useState(false)
	// What the export takes: null for whatever the filters let through, a list
	// of keys for exactly those orders and no others.
	const [exportScope, setExportScope] = useState<string[] | null>(null)
	const buttonSize = BUTTON_SIZE[headerSize]
	// What the table is filtered by, in the export's own keys — the same object
	// is the table's filter and the export's `defaultValues`.
	const shown: DataTransferFilterValues = {
		archived: filters.archived,
		search: filters.search,
		status: filters.status?.split(','),
	}
	const visible = rows.filter((row) => matches(row, shown))

	// A new filter is a new list, and a selection of rows it no longer shows
	// would act on orders the reader cannot see.
	function change(next: Partial<OrderFilters>) {
		setSelectedKeys([])
		setFilters((current) => ({
			...current,
			...next,
			page: 1,
		}))
	}

	function handleQueryChange(search: string | null) {
		change({
			search: search ?? undefined,
		})
	}

	function handleStatusChange(status: string[]) {
		change({
			status: status.length > 0 ? status.join(',') : undefined,
		})
	}

	function handleArchivedChange(archived: boolean) {
		change({
			archived,
		})
	}

	function handleReset() {
		setSelectedKeys([])
		setFilters(NO_FILTERS)
	}

	function openExport(scope: string[] | null) {
		setExportScope(scope)
		setExportOpen(true)
	}

	return (
		<>
			<Page>
				<Page.Header
					action={
						<>
							<DataTransferImport<OrderRow>
								columns={IMPORT_COLUMNS}
								entity={{
									plural: 'orders',
								}}
								onImport={startImport}
								result={(job) => <ImportResult job={job} />}
								// There is no import page in this playground to land on. In
								// an app this is a router Link to /imports/$importId.
								resultLink={(job) => (
									<a href={`#${job.id}`}>Open import {job.id}</a>
								)}
								templateFileName="orders-template.csv"
								trigger={
									<Button
										size={buttonSize}
										variant="outline"
									>
										<FileUp />
										Import
									</Button>
								}
							/>
							<Button
								onClick={() => openExport(null)}
								size={buttonSize}
								variant="outline"
							>
								<FileDown />
								Export
							</Button>
							<Button size={buttonSize}>
								<Plus />
								New order
							</Button>
						</>
					}
					breadcrumbs={[
						{
							href: '#operations',
							label: 'Operations',
						},
						{
							label: 'Orders',
						},
					]}
					description="Every order, across every channel."
					icon={<Package />}
					title="Orders"
				/>

				<Page.Toolbar>
					<SearchBar
						filter={{
							onChange: handleQueryChange,
							placeholder: 'Search by code or customer',
							value: filters.search,
						}}
						items={[
							{
								field: (
									<Select
										ariaLabel="Status"
										mode="multiple"
										onChange={handleStatusChange}
										optionLabel="label"
										options={STATUS_OPTIONS}
										optionValue="value"
										placeholder="Filter by status"
										value={filters.status?.split(',')}
									/>
								),
								id: 'status',
							},
							{
								field: (
									<Switch
										checked={filters.archived}
										onCheckedChange={handleArchivedChange}
									/>
								),
								id: 'archived',
								label: 'Archived',
								placement: 'popover',
							},
						]}
						onReset={handleReset}
						value={filters}
					/>
				</Page.Toolbar>

				<Page.Content>
					<Table
						columns={ORDER_COLUMNS}
						itemKey="id"
						items={visible}
						onSelectionChange={setSelectedKeys}
						pagination={{
							mode: 'offset',
							onPageChange: (page) =>
								setFilters((c) => ({
									...c,
									page,
								})),
							onRowsPerPageChange: (perPage) =>
								setFilters((c) => ({
									...c,
									page: 1,
									perPage,
								})),
							page: filters.page,
							rowsPerPage: filters.perPage,
							total: 128,
						}}
						selectedKeys={selectedKeys}
						selection="multiple"
					/>
				</Page.Content>
			</Page>

			<BulkActions
				actions={[
					{
						icon: <Truck />,
						id: 'ship',
						label: 'Mark as shipped',
						onRun: async (keys) => {
							await wait(SEND_MS)
							setRows((current) =>
								current.map((row) =>
									keys.includes(row.id)
										? {
												...row,
												status: 'Shipped',
											}
										: row,
								),
							)
							setSelectedKeys([])
						},
					},
					{
						icon: <FileDown />,
						id: 'export',
						label: 'Export',
						// The header's export, taking these orders instead of the filters.
						onRun: (keys) => openExport(keys),
					},
					{
						confirm: (keys) => ({
							confirmProps: {
								variant: 'destructive',
							},
							confirmText: 'Archive',
							description:
								'They leave this list; the Archived filter still finds them.',
							title: `Archive ${countOrders(keys.length)}?`,
						}),
						hidden: filters.archived,
						icon: <Archive />,
						id: 'archive',
						label: 'Archive',
						onRun: async (keys) => {
							await wait(SEND_MS)
							setRows((current) =>
								current.map((row) =>
									keys.includes(row.id)
										? {
												...row,
												archived: true,
											}
										: row,
								),
							)
							setSelectedKeys([])
						},
						variant: 'destructive',
					},
				]}
				// Each action clears the selection itself, except Export: that one only
				// opens a form, and a reader who cancels it should find the rows still
				// ticked.
				clearOnRun={false}
				onClear={() => setSelectedKeys([])}
				selection={selectedKeys}
			/>

			<DataTransferExport<OrderRow>
				columns={EXPORT_COLUMNS}
				// Read at every opening, so the export always opens on what the table
				// shows now — no key, no remount. A selection has no filters at all.
				defaultValues={exportScope ? undefined : shown}
				description={
					exportScope
						? 'Only the orders you selected leave. The page\u2019s filters do not apply to a selection.'
						: undefined
				}
				entity={{
					plural: 'orders',
				}}
				filters={exportScope ? undefined : EXPORT_FILTERS}
				// The one shape this page's fake API builds, so no format to pick.
				formats={[
					'csv',
				]}
				onExport={({ columns, filters: values }) =>
					startExport(
						rows.filter((row) =>
							exportScope ? exportScope.includes(row.id) : matches(row, values),
						),
						columns,
					)
				}
				onOpenChange={setExportOpen}
				open={exportOpen}
				result={(job) => <ExportResult job={job} />}
				// No export page to land on here either; in an app, /exports/$exportId.
				resultLink={(job) => <a href={`#${job.id}`}>Open export {job.id}</a>}
				title={
					exportScope ? `Export ${countOrders(exportScope.length)}` : undefined
				}
			/>
		</>
	)
}

function Playground() {
	const [options, setOptions] = useState<Options>(INITIAL)
	// A state ref, so the portal provider below re-renders once the host exists.
	// Until then its container is null, which holds every portal back rather
	// than sending it to the body.
	const [overlays, setOverlays] = useState<HTMLDivElement | null>(null)

	const change = (next: Partial<Options>) =>
		setOptions((current) => ({
			...current,
			...next,
		}))

	return (
		<div className="space-y-4">
			<Panel
				onChange={change}
				options={options}
			/>

			{/*
			  The frame is docs chrome: a 46rem box with a border. What a shell
			  inside a box needs from the provider itself — as tall as the box, the
			  box popovers measure from, and an off-screen rail that cannot scroll
			  it — is height="fill".
			*/}
			<div
				// `overflow-clip`, not `overflow-hidden`: a hidden box is still a
				// scroll container. Opening a sheet moved focus to a popup that starts
				// off the frame's right edge, and the browser scrolled the frame 512px
				// sideways to show it. A clipped box cannot be scrolled at all.
				className="h-[46rem] overflow-clip rounded-lg border border-border"
				style={{
					// `position: fixed` resolves against the nearest ancestor that
					// establishes a containing block. A transform does that, which keeps
					// the page's own fixed surfaces — the bulk bar and the import and
					// export sheets, portalled into the host at the end of the frame —
					// inside this frame instead of pinned to the browser window. The rail
					// needs none of this: under height="fill" it is positioned against
					// the provider.
					transform: 'translate(0)',
				}}
			>
				<Layout.Sidebar.Provider
					height="fill"
					// A new provider per collapse mode. `collapsible` decides which of
					// three branches <Layout.Sidebar> takes, and the open state means a
					// different thing in each — carrying it across reads as the panel
					// having no effect.
					key={options.collapsible}
					variant={options.variant}
					width={options.width}
				>
					{/*
				  Hiding the sidebar drops the rail and keeps the provider. Without
				  the provider <Layout> would stand alone and be h-svh inside this
				  46rem frame; with it, the shell is still the content pane — flex-1
				  in the provider's row — and with no rail before it, not one of the
				  inset variant's peer classes matches, so it simply takes the width.
				*/}
					{options.sidebar ? <Rail options={options} /> : null}

					<Layout padding={options.shellPadding}>
						{options.header ? (
							<Layout.Header
								bordered={options.headerBordered}
								// The toggle is never here. It belongs beside the brand, in the
								// rail's own icon column — including in `offcanvas`, where that
								// means the collapsed rail is reopened with Cmd/Ctrl + B.
								// No breadcrumb here: the trail belongs to the page, not to the
								// shell — `Page.Header` carries it, right above the title it is
								// the trail to.
								leftSection={
									options.headerSections ? (
										<span className="truncate font-medium text-sm">Orders</span>
									) : undefined
								}
								padding={own(options.headerPadding)}
								rightSection={
									options.headerSections ? (
										<>
											<Button
												ariaLabel="Search"
												size="icon-sm"
												variant="ghost"
											>
												<Search />
											</Button>
											<Button
												ariaLabel="Notifications"
												size="icon-sm"
												variant="ghost"
											>
												<Bell />
											</Button>
											<Avatar size="sm">A</Avatar>
										</>
									) : undefined
								}
								size={options.headerSize}
							>
								{null}
							</Layout.Header>
						) : null}

						<Layout.Main>
							<Layout.Content
								maxWidth={
									options.contentMaxWidth === 'none'
										? undefined
										: options.contentMaxWidth
								}
								padding={own(options.contentPadding)}
							>
								{/* Everything the page opens mounts in this frame, not the window. */}
								<PortalProvider container={overlays}>
									<OrdersScreen headerSize={options.headerSize} />
								</PortalProvider>
							</Layout.Content>
						</Layout.Main>

						{options.footer ? (
							<Layout.Footer
								bordered={options.footerBordered}
								padding={own(options.footerPadding)}
								size={options.footerSize}
							>
								<span className="text-muted-foreground text-xs">
									14 of 128 orders
								</span>
							</Layout.Footer>
						) : null}
					</Layout>

					<div ref={setOverlays} />
				</Layout.Sidebar.Provider>
			</div>
		</div>
	)
}

const bannerShellCode = `import { Alert, Button, Layout } from '@turystack/react-web'
import { FlaskConical } from 'lucide-react'

// The banner belongs to the outermost box. With a rail that is the provider,
// so the strip spans the rail and the pane, and the rail starts under it.
<Layout.Sidebar.Provider
  banner={
    <Alert layout="banner" variant="warning">
      <Alert.Icon><FlaskConical /></Alert.Icon>
      <Alert.Title>Sandbox</Alert.Title>
      <Alert.Description>You are viewing test data.</Alert.Description>
      <Alert.Action>
        <Button size="sm" variant="outline">Go live</Button>
      </Alert.Action>
    </Alert>
  }
>
  <Layout.Sidebar>…</Layout.Sidebar>
  <Layout>
    <Layout.Header bordered>…</Layout.Header>
    <Layout.Main>…</Layout.Main>
  </Layout>
</Layout.Sidebar.Provider>

// No rail: the same prop on Layout itself
<Layout banner={<Alert layout="banner" variant="warning">…</Alert>}>
  <Layout.Header>…</Layout.Header>
  <Layout.Main>…</Layout.Main>
</Layout>`

function SandboxBanner() {
	return (
		<Alert
			layout="banner"
			variant="warning"
		>
			<Alert.Icon>
				<FlaskConical />
			</Alert.Icon>
			<Alert.Title>Sandbox</Alert.Title>
			<Alert.Description>
				You are viewing test data — orders placed here never reach a customer.
			</Alert.Description>
			<Alert.Action>
				<Button
					size="sm"
					variant="outline"
				>
					Go live
				</Button>
			</Alert.Action>
		</Alert>
	)
}

/**
 * The banner on the provider: one strip over the rail and the pane. The frame
 * is docs chrome, like the playground's — height="fill" makes the shell as
 * tall as it; the provider's banner then takes its row off the top and the
 * rail starts under it.
 */
function BannerShell() {
	return (
		<div
			className="h-[28rem] overflow-clip rounded-lg border border-border"
			style={{
				transform: 'translate(0)',
			}}
		>
			<Layout.Sidebar.Provider
				banner={<SandboxBanner />}
				height="fill"
			>
				<Layout.Sidebar collapsible="icon">
					<Layout.Sidebar.Header>
						<Layout.Sidebar.Brand
							action={<Layout.Sidebar.Trigger />}
							logo={<Mark />}
						>
							Turystack
						</Layout.Sidebar.Brand>
					</Layout.Sidebar.Header>
					<Layout.Sidebar.Content>
						<Layout.Sidebar.Group>
							<Layout.Sidebar.Group.Label>Platform</Layout.Sidebar.Group.Label>
							<Layout.Sidebar.Group.Content>
								<Layout.Sidebar.Menu>
									{PLATFORM.map(({ icon: Icon, label }) => (
										<Layout.Sidebar.Menu.Item key={label}>
											<Layout.Sidebar.Menu.Button
												isActive={label === 'Orders'}
												tooltip={label}
											>
												<Icon />
												<span>{label}</span>
											</Layout.Sidebar.Menu.Button>
										</Layout.Sidebar.Menu.Item>
									))}
								</Layout.Sidebar.Menu>
							</Layout.Sidebar.Group.Content>
						</Layout.Sidebar.Group>
					</Layout.Sidebar.Content>
				</Layout.Sidebar>

				<Layout>
					<Layout.Header
						bordered
						leftSection={<span className="font-medium text-sm">Orders</span>}
						rightSection={<Avatar size="sm">A</Avatar>}
					>
						{null}
					</Layout.Header>
					<Layout.Main>
						<Layout.Content>
							<p className="text-muted-foreground text-sm">
								The banner spans the rail and the pane; the rail starts under it
								and ends at the bottom of the frame. Only this content region
								scrolls.
							</p>
						</Layout.Content>
					</Layout.Main>
				</Layout>
			</Layout.Sidebar.Provider>
		</div>
	)
}

function ReasonShell() {
	return (
		<div
			className="h-[26rem] overflow-clip rounded-lg border border-border"
			style={{
				transform: 'translate(0)',
			}}
		>
			<Layout.Sidebar.Provider height="fill">
				<Layout.Sidebar collapsible="icon">
					<Layout.Sidebar.Header>
						<Layout.Sidebar.Brand
							action={<Layout.Sidebar.Trigger />}
							logo={<Mark />}
						>
							Turystack
						</Layout.Sidebar.Brand>
					</Layout.Sidebar.Header>
					<Layout.Sidebar.Content>
						<Layout.Sidebar.Group>
							<Layout.Sidebar.Group.Label>Vendas</Layout.Sidebar.Group.Label>
							<Layout.Sidebar.Group.Action ariaLabel="Novo pedido">
								<Plus />
							</Layout.Sidebar.Group.Action>
							<Layout.Sidebar.Group.Content>
								<Layout.Sidebar.Menu>
									<Layout.Sidebar.Menu.Item>
										<Layout.Sidebar.Menu.Button
											isActive
											tooltip="Pedidos"
										>
											<ShoppingCart />
											<span>Pedidos</span>
										</Layout.Sidebar.Menu.Button>
									</Layout.Sidebar.Menu.Item>
									<Layout.Sidebar.Menu.Item>
										<Layout.Sidebar.Menu.Button
											disabledReason="Peça acesso a um administrador"
											tooltip="Faturamento"
										>
											<CreditCard />
											<span>Faturamento</span>
										</Layout.Sidebar.Menu.Button>
									</Layout.Sidebar.Menu.Item>
								</Layout.Sidebar.Menu>
							</Layout.Sidebar.Group.Content>
						</Layout.Sidebar.Group>
						<Layout.Sidebar.Group>
							<Layout.Sidebar.Group.Label>Equipe</Layout.Sidebar.Group.Label>
							<Layout.Sidebar.Group.Action
								ariaLabel="Convidar pessoa"
								disabledReason="Limite de 5 pessoas no plano Free"
							>
								<Plus />
							</Layout.Sidebar.Group.Action>
							<Layout.Sidebar.Group.Content>
								<Layout.Sidebar.Menu>
									<Layout.Sidebar.Menu.Item>
										<Layout.Sidebar.Menu.Collapsible label="Relatórios">
											<Layout.Sidebar.Menu.Collapsible.Trigger
												disabledReason="Disponível no plano Pro"
												tooltip="Relatórios"
											>
												<ChartNoAxesColumn />
												<span>Relatórios</span>
											</Layout.Sidebar.Menu.Collapsible.Trigger>
											<Layout.Sidebar.Menu.Collapsible.Content>
												<Layout.Sidebar.Menu.Sub>
													<Layout.Sidebar.Menu.Sub.Item>
														<Layout.Sidebar.Menu.Sub.Button href="#vendas">
															Vendas
														</Layout.Sidebar.Menu.Sub.Button>
													</Layout.Sidebar.Menu.Sub.Item>
												</Layout.Sidebar.Menu.Sub>
											</Layout.Sidebar.Menu.Collapsible.Content>
										</Layout.Sidebar.Menu.Collapsible>
									</Layout.Sidebar.Menu.Item>
									<Layout.Sidebar.Menu.Item>
										<Layout.Sidebar.Menu.Button tooltip="Pessoas">
											<Users />
											<span>Pessoas</span>
										</Layout.Sidebar.Menu.Button>
									</Layout.Sidebar.Menu.Item>
								</Layout.Sidebar.Menu>
							</Layout.Sidebar.Group.Content>
						</Layout.Sidebar.Group>
					</Layout.Sidebar.Content>
				</Layout.Sidebar>

				<Layout>
					<Layout.Main>
						<Layout.Content>
							<p className="text-muted-foreground text-sm">
								Passe o mouse ou use Tab nos itens bloqueados.
							</p>
						</Layout.Content>
					</Layout.Main>
				</Layout>
			</Layout.Sidebar.Provider>
		</div>
	)
}

const condensingHeaderCode = `import { Button, Layout } from '@turystack/react-web'

<Layout>
  <Layout.Header
    centerSection={<Logo />}
    condenseOnScroll
    leftSection={<Button ariaLabel="Menu" size="icon-sm" variant="ghost"><Menu /></Button>}
    rightSection={<CartButton />}
    size="lg"
  />
  <Layout.Main>
    {/* scroll this and the bar drops 64 → 48px and draws its border */}
    <Layout.Content>…</Layout.Content>
  </Layout.Main>
</Layout>`

const skipLinksCode = `<Layout skipLinks={[{ href: '#main', label: 'Pular para o conteúdo' }]}>
  <Layout.Header>…</Layout.Header>
  <Layout.Main id="main">
    <Layout.Content>…</Layout.Content>
  </Layout.Main>
</Layout>

// A split screen: land on one pane instead of the whole of Main
<Layout skipLinks={[{ href: '#form', label: 'Pular para o formulário' }]} variant="centered">
  <Layout.Main>
    <Layout.Content bg="gradient" span={2}>…</Layout.Content>
    <Layout.Content id="form" span={3}>…</Layout.Content>
  </Layout.Main>
</Layout>`

const DESTINATIONS = [
	'Lisboa',
	'Porto',
	'Madri',
	'Barcelona',
	'Roma',
	'Florença',
	'Paris',
	'Amsterdã',
	'Praga',
	'Viena',
]

/**
 * A storefront header: menu button, a logo on the bar's true centre, a cart
 * on the right, condensing once the content scrolls. The frame is docs
 * chrome; height="fill" makes the shell as tall as it, so Layout.Content is
 * the pane that scrolls and the header condenses on its scroll.
 */
function CondensingHeaderShell() {
	return (
		<div className="h-96 overflow-clip rounded-lg border border-border">
			<Layout height="fill">
				<Layout.Header
					centerSection={<span className="font-bold text-base">Turystack</span>}
					condenseOnScroll
					leftSection={
						<Button
							ariaLabel="Abrir menu"
							size="icon-sm"
							variant="ghost"
						>
							<MenuIcon />
						</Button>
					}
					rightSection={
						<>
							<Button
								ariaLabel="Buscar"
								size="icon-sm"
								variant="ghost"
							>
								<Search />
							</Button>
							<Button
								ariaLabel="Carrinho"
								size="icon-sm"
								variant="ghost"
							>
								<ShoppingCart />
							</Button>
						</>
					}
					size="lg"
				/>
				<Layout.Main>
					<Layout.Content>
						<div className="flex flex-col gap-3">
							<p className="text-muted-foreground text-sm">
								Role esta lista: a barra passa de 64 para 48px e ganha a borda.
								Volte ao topo e ela se restaura.
							</p>
							{DESTINATIONS.map((city) => (
								<div
									className="rounded-lg bg-muted px-4 py-6 font-medium text-sm"
									key={city}
								>
									Pacotes para {city}
								</div>
							))}
						</div>
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</div>
	)
}

const cappedHeaderCode = `<Layout>
  <Layout.Header
    bordered
    maxWidth="lg"
    padding="md"
    rightSection={<Button size="sm">Criar conta</Button>}
  >
    <Logo />
  </Layout.Header>
  <Layout.Main id="main">
    <Layout.Content padding="none">
      {/* the same step: the header's row and the page share their edges */}
      <Container maxWidth="lg" paddingX="md">…</Container>
    </Layout.Content>
  </Layout.Main>
</Layout>`

/**
 * A marketing header capped at md over a Container capped at md: the border
 * spans the frame, the row does not, and the two edges line up.
 */
function CappedHeaderShell() {
	return (
		<div className="h-64 overflow-clip rounded-lg border border-border">
			<Layout height="fill">
				<Layout.Header
					bordered
					maxWidth="md"
					padding="md"
					rightSection={<Button size="sm">Criar conta</Button>}
				>
					<span className="font-bold text-base">Turystack</span>
				</Layout.Header>
				<Layout.Main>
					<Layout.Content padding="none">
						<Container
							maxWidth="md"
							paddingX="md"
						>
							<div className="py-8">
								<p className="font-bold font-display text-2xl tracking-tight">
									Venda pacotes sem planilha
								</p>
								<p className="mt-2 text-muted-foreground text-sm">
									Reservas, pagamentos e vouchers num lugar só. O título começa
									onde o logo começa, e o texto termina onde o botão termina.
								</p>
							</div>
						</Container>
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</div>
	)
}

const loadingBarCode = `// src/routes/_app.tsx — the route reads the router, the shell only renders
function AppShell() {
  const loading = useRouterState({ select: (state) => state.isLoading })

  return (
    <DefaultLayout loading={loading}>
      <Outlet />
    </DefaultLayout>
  )
}

// src/layouts/default-layout/default-layout.tsx
<Layout loadingBar={{ loading }}>…</Layout>`

const LOADING_BAR_PAGES = {
	hotels: 'Hotéis',
	packages: 'Pacotes',
} as const

type LoadingBarPage = keyof typeof LOADING_BAR_PAGES

/**
 * A fake navigation: each click loads for `ms`, then swaps the page. The slow
 * one shows the bar; the fast one ends inside the 200ms delay and shows none.
 */
function LoadingBarShell() {
	const [page, setPage] = useState<LoadingBarPage>('packages')
	const [pending, setPending] = useState<number | null>(null)
	const loading = pending !== null

	// The fake load is an effect, so leaving the page cancels it.
	useEffect(() => {
		if (pending === null) {
			return
		}

		const timer = setTimeout(() => {
			setPage((current) => (current === 'packages' ? 'hotels' : 'packages'))
			setPending(null)
		}, pending)

		return () => clearTimeout(timer)
	}, [
		pending,
	])

	function navigate(ms: number) {
		setPending(ms)
	}

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex flex-wrap gap-2">
				<Button
					disabled={loading}
					onClick={() => navigate(1500)}
					size="sm"
				>
					Navegação lenta (1,5s)
				</Button>
				<Button
					disabled={loading}
					onClick={() => navigate(100)}
					size="sm"
					variant="outline"
				>
					Navegação rápida (100ms)
				</Button>
			</div>
			<div className="h-56 overflow-clip rounded-lg border border-border">
				<Layout
					height="fill"
					loadingBar={{
						loading,
					}}
				>
					<Layout.Header bordered>
						<span className="font-semibold text-sm">Turystack</span>
					</Layout.Header>
					<Layout.Main>
						<Layout.Content>
							<Page>
								<Page.Content>
									<p className="font-medium text-sm">
										{LOADING_BAR_PAGES[page]}
									</p>
								</Page.Content>
							</Page>
						</Layout.Content>
					</Layout.Main>
				</Layout>
			</div>
		</div>
	)
}

/**
 * Skip links in a frame. The transform makes the frame the containing block
 * of the focused link's position: fixed, so it shows in the frame's corner
 * rather than the window's.
 */
function SkipLinksShell() {
	return (
		<div
			className="h-72 overflow-clip rounded-lg border border-border"
			style={{
				transform: 'translate(0)',
			}}
		>
			<Layout
				height="fill"
				skipLinks={[
					{
						href: '#layout-skip-demo-main',
						label: 'Pular para o conteúdo',
					},
				]}
			>
				<Layout.Header
					bordered
					rightSection={
						<>
							<Button
								size="sm"
								variant="ghost"
							>
								Pacotes
							</Button>
							<Button
								size="sm"
								variant="ghost"
							>
								Hotéis
							</Button>
							<Button
								size="sm"
								variant="ghost"
							>
								Minha conta
							</Button>
						</>
					}
				>
					<span className="font-semibold text-sm">Turystack</span>
				</Layout.Header>
				<Layout.Main id="layout-skip-demo-main">
					<Layout.Content>
						<Page>
							<Page.Content>
								<p className="text-muted-foreground text-sm">
									O conteúdo da página. Com o teclado, o primeiro Tab neste
									quadro mostra o link no canto; Enter pula o menu e chega aqui.
								</p>
							</Page.Content>
						</Page>
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</div>
	)
}

function Code({ children }: { children: ReactNode }) {
	return (
		<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
			{children}
		</code>
	)
}

/** The name a Props sub-table belongs to, in the shape every other page uses. */
function PartName({ children }: { children: ReactNode }) {
	return (
		<p className="max-w-prose text-muted-foreground text-sm">
			<Code>{children}</Code>
		</p>
	)
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function LayoutDocsPage() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Layout
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The application shell — header, main, content, footer and the
					navigation rail — as one component where exactly one region scrolls.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>

				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>Layout</Code> — the root. Inside a{' '}
					<Code>Layout.Sidebar.Provider</Code> it is the content pane beside the
					rail.
				</p>
				<PropsTable props={layoutProps} />

				<PartName>useLayout()</PartName>
				<PropsTable props={useLayoutProps} />

				<PartName>Layout.Header</PartName>
				<PropsTable props={headerProps} />

				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>Layout.Main</Code> — the page's only <Code>{'<main>'}</Code>,
					beside a rail included. Its <Code>id</Code> is the target a skip link
					points at.
				</p>
				<PropsTable props={mainProps} />

				<PartName>Layout.Content</PartName>
				<PropsTable props={contentProps} />

				<PartName>Layout.Footer</PartName>
				<PropsTable props={footerProps} />

				<PartName>Layout.Sidebar.Provider</PartName>
				<PropsTable props={providerProps} />

				<PartName>Layout.Sidebar</PartName>
				<PropsTable props={sidebarProps} />

				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>useSidebar()</Code> — throws outside a provider. Where "no
					sidebar" is an ordinary answer, ask <Code>useLayout()</Code>.
				</p>
				<PropsTable props={useSidebarProps} />

				<PartName>Layout.Sidebar.Trigger</PartName>
				<PropsTable props={triggerProps} />

				<PartName>Layout.Sidebar.Brand</PartName>
				<PropsTable props={brandProps} />

				<p className="max-w-prose text-muted-foreground text-sm">
					The structural parts take their children and nothing else — each is a
					styled element whose look is the library&apos;s.
				</p>
				<PropsTable props={partProps} />

				<PartName>Layout.Sidebar.Content</PartName>
				<p className="max-w-prose text-muted-foreground text-sm">
					While more of the rail lies past an edge, a fade covers it. Themes
					reach it as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						.layout-sidebar-content-fade
					</code>
					.
				</p>

				<PartName>Layout.Sidebar.Group.Label</PartName>
				<p className="max-w-prose text-muted-foreground text-sm">
					On the icon rail the label is also{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-hidden
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						inert
					</code>
					; tooltips name the rows.
				</p>
				<PropsTable props={groupLabelProps} />

				<PartName>Layout.Sidebar.Group.Action</PartName>
				<PropsTable props={groupActionProps} />

				<PartName>Layout.Sidebar.Menu.Button</PartName>
				<PropsTable props={menuButtonProps} />

				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>tooltip</Code> as an object, when the placement matters.
				</p>
				<PropsTable props={tooltipObjectProps} />

				<PartName>Layout.Sidebar.Menu.Action</PartName>
				<PropsTable props={menuActionProps} />

				<PartName>Layout.Sidebar.Menu.Skeleton</PartName>
				<PropsTable props={menuSkeletonProps} />

				<PartName>Layout.Sidebar.Menu.Sub.Button</PartName>
				<PropsTable props={menuSubButtonProps} />

				<PartName>Layout.Sidebar.Menu.Collapsible</PartName>
				<PropsTable props={collapsibleProps} />

				<PartName>Layout.Sidebar.Menu.Collapsible.Trigger</PartName>
				<PropsTable props={collapsibleTriggerProps} />

				<PartName>Layout.Sidebar.Menu.Collapsible.Content</PartName>
				<PropsTable props={collapsibleContentProps} />
			</section>

			<SlotsSection slug="layout" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Playground</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One shell, every option. The panel drives real props — nothing here is
					a picture of the component.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Tick rows for the bulk bar, export, or import{' '}
					<a
						className="text-lib underline underline-offset-4"
						download="orders-sample.csv"
						href={IMPORT_SAMPLE_HREF}
					>
						this sample
					</a>
					, with two bad rows.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Layout, Layout.Sidebar and every part they compose"
				>
					<Playground />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Banner</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>banner</Code> is a strip above the shell. Give it to{' '}
					<Code>Layout.Sidebar.Provider</Code> to span the rail too.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Sandbox banner above the rail and the header"
				>
					<BannerShell />
				</ComponentPreview>
				<CodeBlock
					code={bannerShellCode}
					filename="app-shell-with-banner.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>disabledReason</Code> blocks a row, a group action or a
					collapsible trigger; each stays focusable and says why.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Three blocked controls in one rail"
				>
					<ReasonShell />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Header: centre slot and condensing
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>centerSection</Code> keeps the logo truly centred;{' '}
					<Code>condenseOnScroll</Code> shrinks the bar after 8px of scroll.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Header: lg, centerSection, condenseOnScroll"
				>
					<CondensingHeaderShell />
				</ComponentPreview>
				<CodeBlock
					code={condensingHeaderCode}
					filename="storefront-header.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Header: a capped row
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Give the header’s <Code>maxWidth</Code> the step of the page’s{' '}
					<Code>Container</Code>, and their edges line up.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title={'Header and Container, both maxWidth="md"'}
				>
					<CappedHeaderShell />
				</ComponentPreview>
				<CodeBlock
					code={cappedHeaderCode}
					filename="marketing-header.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Skip links</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>skipLinks</Code> appear on focus.{' '}
					<Code>{'<Layout.Main id="main">'}</Code> is the target. Click the
					preview’s title bar, press Tab.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Layout skipLinks — press Tab inside the frame"
				>
					<SkipLinksShell />
				</ComponentPreview>
				<CodeBlock
					code={skipLinksCode}
					filename="skip-links.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Loading bar</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>loadingBar</Code> shows a bar on the shell&apos;s top edge while
					a page loads. A load under 200ms shows nothing.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title="Layout loadingBar — slow and fast navigation"
				>
					<LoadingBarShell />
				</ComponentPreview>
				<CodeBlock
					code={loadingBarCode}
					filename="app-shell.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={anatomyCode}
					filename="anatomy.txt"
					language="tsx"
				/>
				<CodeBlock
					code={shellCode}
					filename="app-shell.tsx"
					language="tsx"
				/>
				<CodeBlock
					code={compositionCode}
					filename="app-shell-with-rail.tsx"
					language="tsx"
				/>
				<CodeBlock
					code={withSidebarCode}
					filename="use-layout.tsx"
					language="tsx"
				/>
				<CodeBlock
					code={triggerCode}
					filename="trigger.tsx"
					language="tsx"
				/>
				<CodeBlock
					code={tooltipCode}
					filename="tooltip.tsx"
					language="tsx"
				/>
				<CodeBlock
					code={geometryCode}
					filename="geometry.ts"
					language="ts"
				/>
				<CodeBlock
					code={persistenceCode}
					filename="persistence.tsx"
					language="tsx"
				/>
				<CodeBlock
					code={mobileCode}
					filename="mobile.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/layout')({
	component: LayoutDocsPage,
})
