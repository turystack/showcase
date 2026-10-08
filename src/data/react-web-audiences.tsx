import type { ReactNode } from 'react'

import {
	ForgotPassword,
	type ForgotPasswordVariant,
} from '@/components/audiences/auth/forgot-password'
import forgotPasswordSource from '@/components/audiences/auth/forgot-password.tsx?raw'
import {
	InviteAccept,
	type InviteAcceptVariant,
} from '@/components/audiences/auth/invite-accept'
import inviteAcceptSource from '@/components/audiences/auth/invite-accept.tsx?raw'
import otpValidateSource from '@/components/audiences/auth/otp-validate.tsx?raw'
import {
	Passwordless,
	type PasswordlessVariant,
} from '@/components/audiences/auth/passwordless'
import passwordlessSource from '@/components/audiences/auth/passwordless.tsx?raw'
import resetPasswordSource from '@/components/audiences/auth/reset-password.tsx?raw'
import { SignIn, type SignInVariant } from '@/components/audiences/auth/sign-in'
import signInSource from '@/components/audiences/auth/sign-in.tsx?raw'
import { SignUp, type SignUpVariant } from '@/components/audiences/auth/sign-up'
import signUpSource from '@/components/audiences/auth/sign-up.tsx?raw'
import {
	WorkspacePicker,
	type WorkspacePickerVariant,
} from '@/components/audiences/auth/workspace-picker'
import workspacePickerSource from '@/components/audiences/auth/workspace-picker.tsx?raw'
import {
	ActivityPage as B2bActivity,
	type ActivityVariant as B2bActivityVariant,
} from '@/components/audiences/b2b/activity'
import b2bActivitySource from '@/components/audiences/b2b/activity.tsx?raw'
import {
	AppShell as B2bAppShell,
	type AppShellVariant as B2bAppShellVariant,
} from '@/components/audiences/b2b/app-shell'
import b2bAppShellSource from '@/components/audiences/b2b/app-shell.tsx?raw'
import {
	Dashboard as B2bDashboard,
	type DashboardVariant as B2bDashboardVariant,
} from '@/components/audiences/b2b/dashboard'
import b2bDashboardSource from '@/components/audiences/b2b/dashboard.tsx?raw'
import {
	Details as B2bDetails,
	type DetailsVariant as B2bDetailsVariant,
} from '@/components/audiences/b2b/details'
import b2bDetailsSource from '@/components/audiences/b2b/details.tsx?raw'
import {
	EmptyStates as B2bEmptyState,
	type EmptyStateVariant as B2bEmptyStateVariant,
} from '@/components/audiences/b2b/empty-state'
import b2bEmptyStateSource from '@/components/audiences/b2b/empty-state.tsx?raw'
import {
	Forms as B2bForms,
	type FormsVariant as B2bFormsVariant,
} from '@/components/audiences/b2b/forms'
import b2bFormsSource from '@/components/audiences/b2b/forms.tsx?raw'
import {
	MainPage as B2bMainPage,
	type MainPageVariant as B2bMainPageVariant,
} from '@/components/audiences/b2b/main-page'
import b2bMainPageSource from '@/components/audiences/b2b/main-page.tsx?raw'
import {
	Notifications as B2bNotifications,
	type NotificationsVariant as B2bNotificationsVariant,
} from '@/components/audiences/b2b/notifications'
import b2bNotificationsSource from '@/components/audiences/b2b/notifications.tsx?raw'
import {
	Profile as B2bProfile,
	type ProfileVariant as B2bProfileVariant,
} from '@/components/audiences/b2b/profile'
import b2bProfileSource from '@/components/audiences/b2b/profile.tsx?raw'
import {
	SearchResults as B2bSearchResults,
	type SearchResultsVariant as B2bSearchResultsVariant,
} from '@/components/audiences/b2b/search-results'
import b2bSearchResultsSource from '@/components/audiences/b2b/search-results.tsx?raw'
import {
	Settings as B2bSettings,
	type SettingsVariant as B2bSettingsVariant,
} from '@/components/audiences/b2b/settings'
import b2bSettingsSource from '@/components/audiences/b2b/settings.tsx?raw'
import {
	SystemPages as B2bSystemPages,
	type SystemPagesVariant as B2bSystemPagesVariant,
} from '@/components/audiences/b2b/system-pages'
import b2bSystemPagesSource from '@/components/audiences/b2b/system-pages.tsx?raw'
import {
	AppShell as B2cAppShell,
	type AppShellVariant as B2cAppShellVariant,
} from '@/components/audiences/b2c/app-shell'
import b2cAppShellSource from '@/components/audiences/b2c/app-shell.tsx?raw'
import {
	Details as B2cDetails,
	type DetailsVariant as B2cDetailsVariant,
} from '@/components/audiences/b2c/details'
import b2cDetailsSource from '@/components/audiences/b2c/details.tsx?raw'
import {
	EmptyState as B2cEmptyState,
	type EmptyStateVariant as B2cEmptyStateVariant,
} from '@/components/audiences/b2c/empty-state'
import b2cEmptyStateSource from '@/components/audiences/b2c/empty-state.tsx?raw'
import {
	Forms as B2cForms,
	type FormsVariant as B2cFormsVariant,
} from '@/components/audiences/b2c/forms'
import b2cFormsSource from '@/components/audiences/b2c/forms.tsx?raw'
import {
	Home as B2cHome,
	type HomeVariant as B2cHomeVariant,
} from '@/components/audiences/b2c/home'
import b2cHomeSource from '@/components/audiences/b2c/home.tsx?raw'
import {
	MainPage as B2cMainPage,
	type MainPageVariant as B2cMainPageVariant,
} from '@/components/audiences/b2c/main-page'
import b2cMainPageSource from '@/components/audiences/b2c/main-page.tsx?raw'
import {
	Notifications as B2cNotifications,
	type NotificationsVariant as B2cNotificationsVariant,
} from '@/components/audiences/b2c/notifications'
import b2cNotificationsSource from '@/components/audiences/b2c/notifications.tsx?raw'
import {
	Profile as B2cProfile,
	type ProfileVariant as B2cProfileVariant,
} from '@/components/audiences/b2c/profile'
import b2cProfileSource from '@/components/audiences/b2c/profile.tsx?raw'
import {
	SearchResults as B2cSearchResults,
	type SearchResultsVariant as B2cSearchResultsVariant,
} from '@/components/audiences/b2c/search-results'
import b2cSearchResultsSource from '@/components/audiences/b2c/search-results.tsx?raw'
import {
	Settings as B2cSettings,
	type SettingsVariant as B2cSettingsVariant,
} from '@/components/audiences/b2c/settings'
import b2cSettingsSource from '@/components/audiences/b2c/settings.tsx?raw'
import {
	SystemPages as B2cSystemPages,
	type SystemPagesVariant as B2cSystemPagesVariant,
} from '@/components/audiences/b2c/system-pages'
import b2cSystemPagesSource from '@/components/audiences/b2c/system-pages.tsx?raw'
import {
	Activity as BackofficeActivity,
	type ActivityVariant as BackofficeActivityVariant,
} from '@/components/audiences/backoffice/activity'
import backofficeActivitySource from '@/components/audiences/backoffice/activity.tsx?raw'
import {
	AppShell as BackofficeAppShell,
	type AppShellVariant as BackofficeAppShellVariant,
} from '@/components/audiences/backoffice/app-shell'
import backofficeAppShellSource from '@/components/audiences/backoffice/app-shell.tsx?raw'
import {
	Dashboard as BackofficeDashboard,
	type DashboardVariant as BackofficeDashboardVariant,
} from '@/components/audiences/backoffice/dashboard'
import backofficeDashboardSource from '@/components/audiences/backoffice/dashboard.tsx?raw'
import {
	Details as BackofficeDetails,
	type DetailsVariant as BackofficeDetailsVariant,
} from '@/components/audiences/backoffice/details'
import backofficeDetailsSource from '@/components/audiences/backoffice/details.tsx?raw'
import {
	EmptyStates as BackofficeEmptyStates,
	type EmptyStateVariant as BackofficeEmptyStateVariant,
} from '@/components/audiences/backoffice/empty-state'
import backofficeEmptyStateSource from '@/components/audiences/backoffice/empty-state.tsx?raw'
import {
	Forms as BackofficeForms,
	type FormsVariant as BackofficeFormsVariant,
} from '@/components/audiences/backoffice/forms'
import backofficeFormsSource from '@/components/audiences/backoffice/forms.tsx?raw'
import {
	MainPage as BackofficeMainPage,
	type MainPageVariant as BackofficeMainPageVariant,
} from '@/components/audiences/backoffice/main-page'
import backofficeMainPageSource from '@/components/audiences/backoffice/main-page.tsx?raw'
import {
	Notifications as BackofficeNotifications,
	type NotificationsVariant as BackofficeNotificationsVariant,
} from '@/components/audiences/backoffice/notifications'
import backofficeNotificationsSource from '@/components/audiences/backoffice/notifications.tsx?raw'
import {
	SearchResults as BackofficeSearchResults,
	type SearchResultsVariant as BackofficeSearchResultsVariant,
} from '@/components/audiences/backoffice/search-results'
import backofficeSearchResultsSource from '@/components/audiences/backoffice/search-results.tsx?raw'
import {
	Settings as BackofficeSettings,
	type SettingsVariant as BackofficeSettingsVariant,
} from '@/components/audiences/backoffice/settings'
import backofficeSettingsSource from '@/components/audiences/backoffice/settings.tsx?raw'
import {
	SystemPages as BackofficeSystemPages,
	type SystemPagesVariant as BackofficeSystemPagesVariant,
} from '@/components/audiences/backoffice/system-pages'
import backofficeSystemPagesSource from '@/components/audiences/backoffice/system-pages.tsx?raw'
import {
	BillingPortal,
	type BillingPortalVariant,
} from '@/components/audiences/checkout/billing-portal'
import billingPortalSource from '@/components/audiences/checkout/billing-portal.tsx?raw'
import {
	Checkout,
	type CheckoutVariant,
} from '@/components/audiences/checkout/checkout'
import checkoutSource from '@/components/audiences/checkout/checkout.tsx?raw'
import {
	CheckoutPending,
	type CheckoutPendingVariant,
} from '@/components/audiences/checkout/checkout-pending'
import checkoutPendingSource from '@/components/audiences/checkout/checkout-pending.tsx?raw'
import {
	CheckoutResult,
	type CheckoutResultVariant,
} from '@/components/audiences/checkout/checkout-result'
import checkoutResultSource from '@/components/audiences/checkout/checkout-result.tsx?raw'
import {
	CallToAction,
	type CallToActionVariant,
} from '@/components/audiences/landing-page/call-to-action'
import callToActionSource from '@/components/audiences/landing-page/call-to-action.tsx?raw'
import { Faq, type FaqVariant } from '@/components/audiences/landing-page/faq'
import faqSource from '@/components/audiences/landing-page/faq.tsx?raw'
import {
	Features,
	type FeaturesVariant,
} from '@/components/audiences/landing-page/features'
import featuresSource from '@/components/audiences/landing-page/features.tsx?raw'
import {
	type FooterVariant,
	Footer as LandingFooter,
} from '@/components/audiences/landing-page/footer'
import landingFooterSource from '@/components/audiences/landing-page/footer.tsx?raw'
import {
	FullPage,
	type FullPageVariant,
} from '@/components/audiences/landing-page/full-page'
import fullPageSource from '@/components/audiences/landing-page/full-page.tsx?raw'
import {
	type HeaderVariant,
	Header as LandingHeader,
} from '@/components/audiences/landing-page/header'
import landingHeaderSource from '@/components/audiences/landing-page/header.tsx?raw'
import {
	Hero,
	type HeroVariant,
} from '@/components/audiences/landing-page/hero'
import heroSource from '@/components/audiences/landing-page/hero.tsx?raw'
import {
	Pricing,
	type PricingVariant,
} from '@/components/audiences/landing-page/pricing'
import pricingSource from '@/components/audiences/landing-page/pricing.tsx?raw'
import {
	SocialProof,
	type SocialProofVariant,
} from '@/components/audiences/landing-page/social-proof'
import socialProofSource from '@/components/audiences/landing-page/social-proof.tsx?raw'
/**
 * The Audiences catalogue: whole layouts, grouped by the audience they serve.
 *
 * A layout is not a component demo. It is a screen a product actually ships,
 * and its `variants` are the competing ways to ship it — comparing them is why
 * this layer exists.
 *
 * Audiences with no layouts yet carry their scenario list instead of a
 * stand-in screen. Naming what is missing is honest; inventing a layout to
 * fill the page is not.
 */

export type StageFit = 'fill' | 'center'

export type AudienceVariant = {
	id: string
	label: string
	description: string
	/** A compact family within one layout, such as Overlay or Page. */
	group?: string
	/** Overrides the layout's `stage` — see {@link AudienceLayout.stage}. */
	stage?: StageFit
	/**
	 * Overrides the layout's `source` when this variant is drawn by another file
	 * — a dispatcher layout would otherwise show its own switch, not the screen.
	 */
	source?: string
}

export type AudienceLayout = {
	id: string
	name: string
	description: string
	source: string
	/** A short, user-facing family for keeping the scenario picker compact. */
	group?: string
	variants: AudienceVariant[]
	render: (variant: string) => ReactNode
	/**
	 * How the screen behaves on a stage taller than it asks for.
	 *
	 * `center` — it keeps its natural height and sits in the middle. The default,
	 * because most of these screens are a card that is meant to be a card.
	 *
	 * `fill` — it stretches, and whatever centres inside it centres against the
	 * full height. A split panel needs this: shown at its own `min-h`, its
	 * branded half becomes a band with dead ground above and below.
	 *
	 * It is per variant as often as per layout — `sign-in` renders a split grid
	 * for one variant and a centred card for the other two, so declaring it on
	 * the layout got the split right and pushed the other two to the top.
	 */
	stage?: StageFit
}

/**
 * Audience routes are spelled out rather than built from the slug: the router
 * types every path it knows, and a template string is not one of them.
 */
export type AudiencePath =
	| '/libs/react-web/audiences/auth'
	| '/libs/react-web/audiences/b2b'
	| '/libs/react-web/audiences/b2c'
	| '/libs/react-web/audiences/backoffice'
	| '/libs/react-web/audiences/checkout'
	| '/libs/react-web/audiences/landing-page'

export type Audience = {
	slug: string
	to: AudiencePath
	title: string
	tagline: string
	summary: string
	/** Screens this audience is expected to cover, shipped or not. */
	scenarios: string[]
	layouts: AudienceLayout[]
}

function variant(
	id: string,
	label: string,
	description: string,
	group?: string,
): AudienceVariant {
	return {
		description,
		group,
		id,
		label,
	}
}

/** An audience with no built screens expects exactly its skeletons. */
function scenariosOf(layouts: AudienceLayout[]): string[] {
	return layouts.map((layout) => layout.name)
}

/*
 * Backoffice, B2B and B2C share one set of page archetypes. Each is a page any
 * product ships, not a feature of one product; what changes between the three
 * audiences is the shell around it and how densely it is packed.
 */

const settingsVariants: AudienceVariant[] = [
	variant(
		'vertical-tabs',
		'Vertical tabs',
		'Sections in a side navigation, one at a time.',
	),
	variant(
		'anchored',
		'Anchored page',
		'Every section on one long page, with an anchor index.',
	),
]

/*
 * Backoffice follows the payments-dashboard archetype (see the UX research): it has its
 * own layouts rather than a set shared with B2B, because the two disagree on
 * which variants each page has — Details drops vertical tabs and the modal,
 * the list drops the card grid, Settings gains a hub, Activity becomes a log.
 */
const backofficeLayouts: AudienceLayout[] = [
	{
		description: 'Internal frame: shortcuts rail, search header, sandbox bar.',
		group: 'Shell',
		id: 'app-shell',
		name: 'App shell',
		render: (variant) => (
			<BackofficeAppShell
				key={variant}
				variant={variant as BackofficeAppShellVariant}
			/>
		),
		source: backofficeAppShellSource,
		stage: 'fill',
		variants: [
			variant('sidebar', 'Sidebar', 'Navigation in a side rail.'),
			variant(
				'sidebar-collapsed',
				'Collapsed sidebar',
				'The rail reduced to icons.',
			),
			variant(
				'topbar-nav',
				'Topbar',
				'Navigation across the header — only for a small tool.',
			),
		],
	},
	{
		description: 'Home: what needs attention, then figures vs last period.',
		group: 'Pages',
		id: 'dashboard',
		name: 'Dashboard',
		render: (variant) => (
			<BackofficeDashboard
				key={variant}
				variant={variant as BackofficeDashboardVariant}
			/>
		),
		source: backofficeDashboardSource,
		stage: 'fill',
		variants: [
			variant(
				'overview',
				'Overview',
				'Alerts, KPI tiles with sparklines, the chart against the previous period, and the modules beside it.',
			),
			variant(
				'customize',
				'Customize',
				'The same widgets unlocked: reorder, remove, add, then apply.',
			),
		],
	},
	{
		description: 'A collection with saved views, filter chips, bulk actions.',
		group: 'Pages',
		id: 'main-page',
		name: 'Main page',
		render: (variant) => (
			<BackofficeMainPage
				key={variant}
				variant={variant as BackofficeMainPageVariant}
			/>
		),
		source: backofficeMainPageSource,
		stage: 'fill',
		variants: [
			variant(
				'table',
				'Table',
				'Status tabs, filter chips, compact rows, a pinned actions column, and bulk actions in the filter row while rows are ticked.',
			),
			variant(
				'split',
				'Split view',
				'The collection beside a preview of the open row.',
			),
		],
	},
	{
		description: 'Global search: dropdown, results page and action palette.',
		group: 'Pages',
		id: 'search-results',
		name: 'Search results',
		render: (variant) => (
			<BackofficeSearchResults
				key={variant}
				variant={variant as BackofficeSearchResultsVariant}
			/>
		),
		source: backofficeSearchResultsSource,
		stage: 'fill',
		variants: [
			variant(
				'instant',
				'Instant',
				'Top hits by kind under the header field, as you type.',
			),
			variant(
				'grouped',
				'Grouped',
				'The results page: scope, query operators, one section per kind.',
			),
			variant(
				'command',
				'Command palette',
				'Cmd+K over the page: actions and navigation, not records.',
			),
		],
	},
	{
		description: 'Who did what, and when.',
		group: 'Pages',
		id: 'activity',
		name: 'Activity',
		render: (variant) => (
			<BackofficeActivity
				key={variant}
				variant={variant as BackofficeActivityVariant}
			/>
		),
		source: backofficeActivitySource,
		stage: 'fill',
		variants: [
			variant('timeline', 'Timeline', 'The history of one record.'),
			variant(
				'log',
				'Log',
				'A filterable request log with the payload inspector beside it.',
			),
		],
	},
	{
		description: 'Creating and editing a record without losing the place.',
		group: 'Records',
		id: 'forms',
		name: 'Forms',
		render: (variant) => (
			<BackofficeForms
				key={variant}
				variant={variant as BackofficeFormsVariant}
			/>
		),
		source: backofficeFormsSource,
		stage: 'fill',
		variants: [
			variant(
				'sheet',
				'Sheet',
				'Create in a side sheet — the default.',
				'Overlay',
			),
			variant(
				'sheet-unsaved',
				'Unsaved changes',
				'The sheet closed with changes in it asks first.',
				'Overlay',
			),
			variant(
				'modal',
				'Confirm modal',
				'Only a confirmation with one to three fields.',
				'Overlay',
			),
			variant(
				'sheet-stepper',
				'Sheet',
				'A longer create, in steps, in a wide sheet.',
				'Stepper',
			),
			variant(
				'page',
				'Full-page editor',
				'A document the customer reads: the form beside a live preview.',
				'Page',
			),
		],
	},
	{
		description: 'Reading one record.',
		group: 'Records',
		id: 'details',
		name: 'Details',
		render: (variant) => (
			<BackofficeDetails
				key={variant}
				variant={variant as BackofficeDetailsVariant}
			/>
		),
		source: backofficeDetailsSource,
		stage: 'fill',
		variants: [
			variant(
				'page',
				'Two columns',
				'Breadcrumbs, ID with copy, status badge; sections stacked beside a Details column.',
				'Page',
			),
			variant(
				'page-horizontal-tabs',
				'Horizontal tabs',
				'Tabs, for a record that owns collections — a customer.',
				'Page',
			),
			variant(
				'sheet',
				'Peek',
				'A side sheet over the list, with the way to the full page.',
				'Overlay',
			),
		],
	},
	{
		description: 'Preferences, grouped into sections that save on their own.',
		group: 'Account',
		id: 'settings',
		name: 'Settings',
		render: (variant) => (
			<BackofficeSettings
				key={variant}
				variant={variant as BackofficeSettingsVariant}
			/>
		),
		source: backofficeSettingsSource,
		stage: 'fill',
		variants: [
			variant(
				'hub',
				'Hub',
				'Every settings page as a link: personal, account, product.',
			),
			variant(
				'vertical-tabs',
				'Vertical tabs',
				'One area, its pages in a side navigation.',
			),
			variant(
				'anchored',
				'Anchored page',
				'One area on one long page, with an anchor index.',
			),
		],
	},
	{
		description: 'What happened, on the channel that fits it.',
		group: 'Account',
		id: 'notifications',
		name: 'Notifications',
		render: (variant) => (
			<BackofficeNotifications
				key={variant}
				variant={variant as BackofficeNotificationsVariant}
			/>
		),
		source: backofficeNotificationsSource,
		stage: 'fill',
		variants: [
			variant('popover', 'Popover', 'Recent items from the header bell.'),
			variant(
				'popover-empty',
				'Caught up',
				'A plain bell, open on nothing new.',
			),
			variant(
				'sheet',
				'Sheet',
				'View all as a side sheet: every notification, by day, filterable.',
			),
			variant(
				'page',
				'Page',
				'The full inbox: filters, search, row actions, delivery settings.',
			),
			variant(
				'banner',
				'Banner and toast',
				'A banner for what needs action, a toast for what just happened.',
			),
		],
	},
	{
		description: 'A page, or part of one, with nothing to show.',
		group: 'States',
		id: 'empty-state',
		name: 'Empty state',
		render: (variant) => (
			<BackofficeEmptyStates
				key={variant}
				variant={variant as BackofficeEmptyStateVariant}
			/>
		),
		source: backofficeEmptyStateSource,
		stage: 'fill',
		variants: [
			variant(
				'first-run',
				'First run',
				'A setup checklist shown before there is anything to show.',
			),
			variant(
				'empty',
				'Empty',
				'Nothing here yet, and the action that fixes it.',
			),
			variant(
				'no-results',
				'No results',
				'Filters that matched nothing — the way out is the filters.',
			),
			variant(
				'section',
				'Section',
				'One empty block, dashed, inside a full page.',
			),
			variant(
				'error',
				'Error',
				'The read failed; the table stays and offers a retry.',
			),
		],
	},
	{
		description: 'Error and empty pages shown inside the shell.',
		group: 'States',
		id: 'system-pages',
		name: 'System pages',
		render: (variant) => (
			<BackofficeSystemPages
				key={variant}
				variant={variant as BackofficeSystemPagesVariant}
			/>
		),
		source: backofficeSystemPagesSource,
		stage: 'fill',
		variants: [
			variant('forbidden', '403', 'Signed in, but not allowed here.'),
			variant('not-found', '404', 'The address points at nothing.'),
			variant(
				'server-error',
				'500',
				'Our failure, with a copyable request ID.',
			),
			variant(
				'maintenance',
				'Maintenance',
				'A banner and read-only mode, not a page that blocks.',
			),
		],
	},
]

/*
 * B2B follows the CRM archetype: global search in
 * the middle of the header, the organisation's objects as the navigation, and
 * the record page as the centre of gravity. Every screen is the whole shell
 * (`CrmShell`, built once and reused), so every one fills the stage; overlay
 * variants open over the page they belong to.
 */
const b2bLayouts: AudienceLayout[] = [
	{
		description: 'B2B frame: centred search, global actions, objects as nav.',
		group: 'Shell',
		id: 'app-shell',
		name: 'App shell',
		render: (variant) => (
			<B2bAppShell
				key={variant}
				variant={variant as B2bAppShellVariant}
			/>
		),
		source: b2bAppShellSource,
		stage: 'fill',
		variants: [
			variant('sidebar', 'Sidebar', 'Objects in a side rail.'),
			variant('sidebar-collapsed', 'Collapsed sidebar', 'The rail as icons.'),
			variant(
				'topbar-context-bar',
				'Topbar + context bar',
				'A global header, and a row of object tabs under it.',
			),
		],
	},
	{
		description: 'Home: one primary action in the header, then the rest.',
		group: 'Pages',
		id: 'dashboard',
		name: 'Dashboard',
		render: (variant) => (
			<B2bDashboard
				key={variant}
				variant={variant as B2bDashboardVariant}
			/>
		),
		source: b2bDashboardSource,
		stage: 'fill',
		variants: [
			variant('metrics', 'Metrics', 'Figures first, charts on wide surfaces.'),
			variant('activity', 'Activity', 'What changed recently first.'),
			variant(
				'my-work',
				'My work',
				'The seller’s own tasks, and the setup assistant.',
			),
		],
	},
	{
		description: 'An object list view: table, split view or board.',
		group: 'Pages',
		id: 'main-page',
		name: 'Main page',
		render: (variant) => (
			<B2bMainPage
				key={variant}
				variant={variant as B2bMainPageVariant}
			/>
		),
		source: b2bMainPageSource,
		stage: 'fill',
		variants: [
			variant(
				'table',
				'Table',
				'Dense rows; a selection swaps the toolbar for a selection bar.',
			),
			variant('split', 'Split view', 'The list beside the record it has open.'),
			variant('kanban', 'Kanban', 'The pipeline as a board, a column a stage.'),
		],
	},
	{
		description: 'Find a record: dropdown, results page, action palette.',
		group: 'Pages',
		id: 'search-results',
		name: 'Search results',
		render: (variant) => (
			<B2bSearchResults
				key={variant}
				variant={variant as B2bSearchResultsVariant}
			/>
		),
		source: b2bSearchResultsSource,
		stage: 'fill',
		variants: [
			variant(
				'instant',
				'Instant',
				'Results under the header search as you type.',
			),
			variant(
				'top-results',
				'Top results',
				'Object scopes on the left, the best of each on the right.',
			),
			variant(
				'command',
				'Command palette',
				'A keyboard overlay with actions as well as records.',
			),
		],
	},
	{
		description: 'Who did what, and when.',
		group: 'Pages',
		id: 'activity',
		name: 'Activity',
		render: (variant) => (
			<B2bActivity
				key={variant}
				variant={variant as B2bActivityVariant}
			/>
		),
		source: b2bActivitySource,
		stage: 'fill',
		variants: [
			variant(
				'timeline',
				'Timeline',
				'A record’s activity: composer, upcoming and overdue, then by month.',
			),
			variant('feed', 'Compact feed', 'One event per line, filtered by chips.'),
		],
	},
	{
		description: 'Create and edit: a panel for long forms, a modal for short.',
		group: 'Records',
		id: 'forms',
		name: 'Forms',
		render: (variant) => (
			<B2bForms
				key={variant}
				variant={variant as B2bFormsVariant}
			/>
		),
		source: b2bFormsSource,
		stage: 'fill',
		variants: [
			variant('panel', 'Panel', 'A long form in a side panel.', 'Overlay'),
			variant('modal', 'Modal', 'A short form; success is a toast.', 'Overlay'),
			variant(
				'confirm-danger',
				'Danger confirm',
				'A destructive question that names what is lost.',
				'Overlay',
			),
			variant(
				'panel-stepper',
				'Panel',
				'Steps in a side panel; Back and Next on the right.',
				'Stepper',
			),
			variant(
				'modal-stepper',
				'Modal',
				'Steps in a modal; progress in the footer.',
				'Stepper',
			),
			variant('page', 'Page', 'A full page inside the shell.', 'Page'),
		],
	},
	{
		description: 'Record page: highlights, stage path, details and activity.',
		group: 'Records',
		id: 'details',
		name: 'Details',
		render: (variant) => (
			<B2bDetails
				key={variant}
				variant={variant as B2bDetailsVariant}
			/>
		),
		source: b2bDetailsSource,
		stage: 'fill',
		variants: [
			variant(
				'page-horizontal-tabs',
				'Record page',
				'Details and Related as tabs, activity in a side column.',
				'Page',
			),
			variant(
				'three-column',
				'Three columns',
				'Properties, tabs, and associated records side by side.',
				'Page',
			),
			variant('page', 'No tabs', 'Every section stacked.', 'Page'),
			variant(
				'preview-panel',
				'Preview panel',
				'A quick look beside the list.',
				'Overlay',
			),
		],
	},
	{
		description: 'Setup: every area of the workspace, and each one’s settings.',
		group: 'Account',
		id: 'settings',
		name: 'Settings',
		render: (variant) => (
			<B2bSettings
				key={variant}
				variant={variant as B2bSettingsVariant}
			/>
		),
		source: b2bSettingsSource,
		stage: 'fill',
		variants: [
			variant(
				'vertical-nav',
				'Vertical nav',
				'Areas in a side navigation with quick find.',
			),
			variant(
				'anchored',
				'Anchored page',
				'One area on one page, with an index that follows the scroll.',
			),
		],
	},
	{
		description: 'What happened that needs attention.',
		group: 'Account',
		id: 'notifications',
		name: 'Notifications',
		render: (variant) => (
			<B2bNotifications
				key={variant}
				variant={variant as B2bNotificationsVariant}
			/>
		),
		source: b2bNotificationsSource,
		stage: 'fill',
		variants: [
			variant('popover', 'New', 'The bell with a count, open on what is new.'),
			variant(
				'popover-empty',
				'Caught up',
				'A plain bell, open on nothing new.',
			),
			variant(
				'sheet',
				'Sheet',
				'View all as a side sheet: every notice, by day, filterable.',
			),
			variant(
				'page',
				'Page',
				'The full inbox: filters by kind, search, row actions.',
			),
		],
	},
	{
		description: 'Account: details, password, sessions and the user menu.',
		group: 'Account',
		id: 'profile',
		name: 'Profile',
		render: (variant) => (
			<B2bProfile
				key={variant}
				variant={variant as B2bProfileVariant}
			/>
		),
		source: b2bProfileSource,
		stage: 'fill',
		variants: [
			variant('page', 'Page', 'My profile, inside Setup’s navigation.'),
			variant(
				'account-menu',
				'Account menu',
				'The menu off the avatar: who, settings, workspace, log out.',
			),
		],
	},
	{
		description: 'Nothing to show, at the size of a page and of a section.',
		group: 'States',
		id: 'empty-state',
		name: 'Empty state',
		render: (variant) => (
			<B2bEmptyState
				key={variant}
				variant={variant as B2bEmptyStateVariant}
			/>
		),
		source: b2bEmptyStateSource,
		stage: 'fill',
		variants: [
			variant(
				'empty',
				'Empty',
				'No records yet, and the way to the first.',
				'Page',
			),
			variant(
				'first-run',
				'First run',
				'The setup checklist before there is anything to show.',
				'Page',
			),
			variant(
				'in-card',
				'In a card',
				'Small, bordered empties inside a page that has content.',
				'Section',
			),
			variant(
				'no-results',
				'No results',
				'A filter that matched nothing; the way out is clearing it.',
				'Section',
			),
			variant(
				'fetch-error',
				'Fetch error',
				'The read failed; the table keeps its header and offers a retry.',
				'Section',
			),
		],
	},
	{
		description: 'The pages shown instead of the one asked for.',
		group: 'States',
		id: 'system-pages',
		name: 'System pages',
		render: (variant) => (
			<B2bSystemPages
				key={variant}
				variant={variant as B2bSystemPagesVariant}
			/>
		),
		source: b2bSystemPagesSource,
		stage: 'fill',
		variants: [
			variant('forbidden', '403', 'Not allowed here, and which admin to ask.'),
			variant('not-found', '404', 'The record the link points at is gone.'),
			variant('server-error', '500', 'Failed on our side, with a reference.'),
			variant('maintenance', 'Maintenance', 'Down on purpose, and until when.'),
			variant('offline', 'Offline', 'No connection; the shell stays.'),
		],
	},
]

/*
 * B2C follows the consumer web of delivery and streaming apps: wider pages,
 * lists and cards instead of tables, media first. Every screen is a whole
 * shell, so every one fills the stage.
 */
const b2cLayouts: AudienceLayout[] = [
	{
		description: 'Consumer frame: drawer, header, bottom tabs or library rail.',
		group: 'Shell',
		id: 'app-shell',
		name: 'App shell',
		render: (variant) => (
			<B2cAppShell variant={variant as B2cAppShellVariant} />
		),
		source: b2cAppShellSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'header',
				'Header',
				'Logo, delivery or pickup, address, search, cart and account; destinations in a drawer.',
			),
			variant(
				'tab-bar',
				'Header + mobile tab bar',
				'Destinations in the header on a desktop, in a bottom tab bar below 768px.',
			),
			variant('minimal', 'Minimal', 'Logo, help and account only.'),
			variant(
				'sidebar-bar',
				'Sidebar + persistent bar',
				'A library rail, the content, and the order in flight in a bar that never leaves.',
			),
		],
	},
	{
		description: 'The first page after signing in, built for browsing.',
		group: 'Pages',
		id: 'home',
		name: 'Home',
		render: (variant) => <B2cHome variant={variant as B2cHomeVariant} />,
		source: b2cHomeSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'shelves',
				'Shelves',
				'Category shortcuts, then titled rows that scroll sideways, each with See all.',
			),
			variant(
				'hero',
				'Hero-led',
				'A promotion carousel leads, fewer shelves follow.',
			),
		],
	},
	{
		description: 'A collection of stores, never a table, with two views.',
		group: 'Pages',
		id: 'main-page',
		name: 'Main page',
		render: (variant) => (
			<B2cMainPage variant={variant as B2cMainPageVariant} />
		),
		source: b2cMainPageSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'grid',
				'Grid',
				'Image-first cards: name, rating, time, fee and a favourite.',
			),
			variant(
				'list',
				'List',
				'The same stores as rows, for scanning more at once.',
			),
		],
	},
	{
		description: 'Search, before the query and after it.',
		group: 'Pages',
		id: 'search-results',
		name: 'Search results',
		render: (variant) => (
			<B2cSearchResults variant={variant as B2cSearchResultsVariant} />
		),
		source: b2cSearchResultsSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'categories',
				'Categories',
				'An empty field: recent searches and every category to browse.',
				'Before typing',
			),
			variant(
				'top-result',
				'Top result',
				'The best match large, dishes beside it, the rest grouped by kind.',
				'Results',
			),
			variant(
				'sidebar-filters',
				'Side filters',
				'A result list with its filters always open in a column.',
				'Results',
			),
			variant(
				'sheet-filters',
				'Filter sheet',
				'Filters behind one button, in a sheet — the narrow-screen collapse.',
				'Results',
			),
		],
	},
	{
		description: 'Reading one item, with the key part kept on screen.',
		group: 'Records',
		id: 'details',
		name: 'Details',
		render: (variant) => <B2cDetails variant={variant as B2cDetailsVariant} />,
		source: b2cDetailsSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'media-top',
				'Store page',
				'Banner on top, sticky category row, menu, and the cart in its own column.',
			),
			variant(
				'media-side',
				'Product page',
				'Media beside the title, a sticky action bar, then what it contains.',
			),
		],
	},
	{
		description: 'Filling something in, at three sizes.',
		group: 'Records',
		id: 'forms',
		name: 'Forms',
		render: (variant) => <B2cForms variant={variant as B2cFormsVariant} />,
		source: b2cFormsSource,
		stage: 'fill' as const,
		variants: [
			variant('page', 'Page', 'An order reviewed and placed on one page.'),
			variant('modal', 'Modal', 'A new address over the saved ones.'),
			variant(
				'stepper',
				'Stepper',
				'Reporting a problem with an order, in steps.',
			),
		],
	},
	{
		description: 'A person, as they see themselves and as others see them.',
		group: 'Account',
		id: 'profile',
		name: 'Profile',
		render: (variant) => <B2cProfile variant={variant as B2cProfileVariant} />,
		source: b2cProfileSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'account-hub',
				'Account hub',
				'Who you are, then a menu of destinations.',
			),
			variant(
				'public',
				'Public',
				'The same kind of person, seen by someone else.',
			),
		],
	},
	{
		description: 'Preferences, security and the account itself.',
		group: 'Account',
		id: 'settings',
		name: 'Settings',
		render: (variant) => (
			<B2cSettings variant={variant as B2cSettingsVariant} />
		),
		source: b2cSettingsSource,
		stage: 'fill' as const,
		variants: settingsVariants,
	},
	{
		description: 'What happened that needs attention, and the order in flight.',
		group: 'Account',
		id: 'notifications',
		name: 'Notifications',
		render: (variant) => (
			<B2cNotifications
				key={variant}
				variant={variant as B2cNotificationsVariant}
			/>
		),
		source: b2cNotificationsSource,
		stage: 'fill' as const,
		variants: [
			variant('popover', 'Popover', 'The latest few, from the header bell.'),
			variant(
				'popover-empty',
				'Caught up',
				'A plain bell, open on nothing new.',
			),
			variant(
				'sheet',
				'Sheet',
				'View all as a side sheet: every notification, by day, filterable.',
			),
			variant(
				'page',
				'Page',
				'The whole inbox by day: filters by kind, search, row actions.',
			),
			variant(
				'live-status',
				'Live status',
				'An order on its way: a banner across the shell and a tracker page.',
			),
		],
	},
	{
		description: 'A page with nothing to show, for five different reasons.',
		group: 'States',
		id: 'empty-state',
		name: 'Empty state',
		render: (variant) => (
			<B2cEmptyState variant={variant as B2cEmptyStateVariant} />
		),
		source: b2cEmptyStateSource,
		stage: 'fill' as const,
		variants: [
			variant('empty', 'Empty', 'No orders yet, and the way to the first.'),
			variant('first-run', 'First run', 'A setup list before the first order.'),
			variant(
				'no-results',
				'No results',
				'A search the filters narrowed to nothing.',
			),
			variant('cleared', 'Cleared', 'Nothing left, and that is good news.'),
			variant('out-of-area', 'Out of area', 'The address is not served yet.'),
		],
	},
	{
		description: 'Error and empty pages on the minimal shell.',
		group: 'States',
		id: 'system-pages',
		name: 'System pages',
		render: (variant) => (
			<B2cSystemPages variant={variant as B2cSystemPagesVariant} />
		),
		source: b2cSystemPagesSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'forbidden',
				'Sign in',
				'A 403, which for a consumer means signed out.',
			),
			variant('not-found', '404', 'The address points at nothing.'),
			variant('server-error', '500', 'Something failed on our side.'),
			variant('maintenance', 'Maintenance', 'Down on purpose, and until when.'),
			variant('offline', 'Offline', 'The connection, not the product.'),
		],
	},
]

const landingPageLayouts: AudienceLayout[] = [
	{
		description: 'Logo, four links, a "Sign in" link and one primary action.',
		group: 'Sections',
		id: 'header',
		name: 'Header',
		render: (variant) => <LandingHeader variant={variant as HeaderVariant} />,
		source: landingHeaderSource,
		stage: 'fill',
		variants: [
			variant(
				'minimal',
				'Minimal',
				'Links beside the logo, actions at the end.',
			),
			variant('centered', 'Centered', 'Links in the true centre of the bar.'),
			variant(
				'sticky-condensing',
				'Condensing',
				'Shrinks a step and shows its border once the page scrolls. Scroll the stage.',
			),
		],
	},
	{
		description: 'Badge, short H1, one sentence and two actions.',
		group: 'Sections',
		id: 'hero',
		name: 'Hero',
		render: (variant) => <Hero variant={variant as HeroVariant} />,
		source: heroSource,
		stage: 'center',
		variants: [
			variant(
				'centered-with-screenshot',
				'Product shot',
				'Copy centred above the product. The SaaS default.',
			),
			variant('centered', 'Centered', 'Headline and actions, centred.'),
			variant('split', 'Split', 'Copy beside the product.'),
		],
	},
	{
		description: 'What the product does.',
		group: 'Sections',
		id: 'features',
		name: 'Features',
		render: (variant) => <Features variant={variant as FeaturesVariant} />,
		source: featuresSource,
		stage: 'center',
		variants: [
			variant('grid', 'Grid', 'Icon, title and line, three by two.'),
			variant(
				'alternating',
				'Alternating',
				'Copy and a product fragment, swapping sides.',
			),
			variant('bento', 'Bento', 'Unequal tiles, each a working fragment.'),
		],
	},
	{
		description: 'Why to believe it.',
		group: 'Sections',
		id: 'social-proof',
		name: 'Social proof',
		render: (variant) => (
			<SocialProof variant={variant as SocialProofVariant} />
		),
		source: socialProofSource,
		stage: 'center',
		variants: [
			variant('logos', 'Logos', 'Six monochrome customer marks.'),
			variant('featured', 'Featured quote', 'One long quote, large.'),
			variant(
				'testimonials',
				'Quote cards',
				'Three quotes with a name and a role.',
			),
		],
	},
	{
		description: 'Plans and prices, with a monthly or yearly switch.',
		group: 'Sections',
		id: 'pricing',
		name: 'Pricing',
		render: (variant) => <Pricing variant={variant as PricingVariant} />,
		source: pricingSource,
		stage: 'center',
		variants: [
			variant(
				'tiers',
				'Tiers',
				'Three plans, the middle one recommended, with the billing switch.',
			),
			variant('comparison', 'Comparison', 'A feature-by-plan table.'),
		],
	},
	{
		description: 'The objections, answered.',
		group: 'Sections',
		id: 'faq',
		name: 'FAQ',
		render: (variant) => <Faq variant={variant as FaqVariant} />,
		source: faqSource,
		stage: 'center',
		variants: [
			variant(
				'accordion',
				'Accordion',
				'One question open at a time, for long lists.',
			),
			variant(
				'two-column-open',
				'Two columns, open',
				'Every answer visible. Preferred for six or fewer short ones.',
			),
		],
	},
	{
		description: 'Final ask before the footer, repeating the hero actions.',
		group: 'Sections',
		id: 'call-to-action',
		name: 'Call to action',
		render: (variant) => (
			<CallToAction variant={variant as CallToActionVariant} />
		),
		source: callToActionSource,
		stage: 'center',
		variants: [
			variant('banner', 'Banner', 'A full-width band.'),
			variant('card', 'Card', 'A contained card.'),
		],
	},
	{
		description: 'Links, legal and the way out.',
		group: 'Sections',
		id: 'footer',
		name: 'Footer',
		render: (variant) => <LandingFooter variant={variant as FooterVariant} />,
		source: landingFooterSource,
		stage: 'center',
		variants: [
			variant('simple', 'Simple', 'One row.'),
			variant('columns', 'Columns', 'Grouped link columns.'),
		],
	},
	{
		description: 'All sections in the recommended order, sticky header.',
		group: 'Page',
		id: 'full-page',
		name: 'Full page',
		render: (variant) => <FullPage variant={variant as FullPageVariant} />,
		source: fullPageSource,
		stage: 'fill',
		variants: [
			variant(
				'recommended',
				'Recommended order',
				'Header, hero, logos, features, testimonials, pricing, FAQ, call to action, footer.',
			),
		],
	},
]

/*
 * Checkout is one split page, not a step per screen: the order on the left,
 * the payment on the right, and every state as a variant of that page. The
 * two people who pay on it are variant groups — a signed-in first purchase,
 * and a customer changing what they already pay for — so the same slot is
 * compared across both. Nobody signs in on checkout: without a session the
 * first purchase starts at the public quote and a hand-off to `auth`.
 */
const FIRST_PURCHASE = 'First purchase'
const SIGNED_IN = 'Existing customer'
const MOBILE = 'Mobile'

const checkoutLayouts: AudienceLayout[] = [
	{
		description: 'Split checkout: order summary left, payment details right.',
		group: 'Purchase',
		id: 'checkout',
		name: 'Checkout',
		render: (variant) => <Checkout variant={variant as CheckoutVariant} />,
		source: checkoutSource,
		// Two full-height panes, each scrolling on its own.
		stage: 'fill' as const,
		variants: [
			variant(
				'sign-in-to-continue',
				'Sign in to continue',
				'No session: the public quote, and a hand-off to auth to sign in or sign up.',
				FIRST_PURCHASE,
			),
			variant(
				'card',
				'Card',
				'The default: annual interval, card open in the method accordion.',
				FIRST_PURCHASE,
			),
			variant(
				'pix-selected',
				'Pix Automático',
				'Pix for a subscription: an authorization in the bank app, not a one-off QR.',
				FIRST_PURCHASE,
			),
			variant(
				'boleto-selected',
				'Boleto',
				'Boleto chosen, so the billing details grow an address.',
				FIRST_PURCHASE,
			),
			variant(
				'coupon-applied',
				'Coupon applied',
				'A removable coupon chip and its discount line in the totals.',
				FIRST_PURCHASE,
			),
			variant(
				'card-declined',
				'Card declined',
				'Refused by the bank: the error sits above the button and nothing is cleared.',
				FIRST_PURCHASE,
			),
			variant(
				'validation-errors',
				'Validation errors',
				'Each invalid field says what is wrong, with a summary above the button.',
				FIRST_PURCHASE,
			),
			variant(
				'upgrade-proration',
				'Upgrade',
				'Current plan to a higher one: credit for unused days, what is due today.',
				SIGNED_IN,
			),
			variant(
				'downgrade-scheduled',
				'Downgrade',
				'Nothing charged today; the change lands at the end of the period, with what is lost.',
				SIGNED_IN,
			),
			variant(
				'interval-change',
				'Interval change',
				'Same plan, a longer interval, repriced live against the current month.',
				SIGNED_IN,
			),
			variant(
				'saved-method',
				'Saved method',
				'A returning customer: the method on file preselected, another one a click away.',
				SIGNED_IN,
			),
			variant(
				'new-method',
				'New method',
				'The full method accordion, with a way back to the saved one.',
				SIGNED_IN,
			),
			variant(
				'saved-billing',
				'Saved billing',
				'The billing details on file, collapsed, with Edit.',
				SIGNED_IN,
			),
			variant(
				'mobile-summary-collapsed',
				'Summary collapsed',
				'One column; the order folded into a bar that keeps the total visible.',
				MOBILE,
			),
			variant(
				'mobile-summary-expanded',
				'Summary expanded',
				'The same bar opened: interval and totals above the payment.',
				MOBILE,
			),
		],
	},
	{
		description: 'Paid, not confirmed: the next step the method needs.',
		group: 'After payment',
		id: 'checkout-pending',
		name: 'Pending',
		render: (variant) => (
			<CheckoutPending variant={variant as CheckoutPendingVariant} />
		),
		source: checkoutPendingSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'pix-waiting',
				'Pix waiting',
				'A QR code, the copy-paste key and a countdown.',
			),
			variant(
				'pix-expired',
				'Pix expired',
				'The code ran out; nothing was charged, generate another.',
			),
			variant(
				'pix-automatico-authorize',
				'Authorize Pix Automático',
				'Waiting for the mandate to be approved in the bank app.',
			),
			variant(
				'boleto-issued',
				'Boleto issued',
				'The linha digitável to copy, the PDF and the due date.',
			),
		],
	},
	{
		description: 'The outcome page; a declined card stays on checkout.',
		group: 'After payment',
		id: 'checkout-result',
		name: 'Result',
		render: (variant) => (
			<CheckoutResult variant={variant as CheckoutResultVariant} />
		),
		source: checkoutResultSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'confirmed',
				'Confirmed',
				'Paid: the receipt, what was charged and the way into the product.',
				FIRST_PURCHASE,
			),
			variant(
				'boleto-awaiting',
				'Boleto awaiting',
				'The boleto is out; access unlocks when the bank confirms.',
				FIRST_PURCHASE,
			),
			variant(
				'upgrade-confirmed',
				'Upgrade confirmed',
				'The new plan is live, with what was charged and when the next charge is.',
				SIGNED_IN,
			),
			variant(
				'downgrade-scheduled-confirmed',
				'Downgrade scheduled',
				'Nothing changes until the date, and the way to undo it.',
				SIGNED_IN,
			),
		],
	},
	{
		description: 'Plan, method, details, invoices and cancellation.',
		group: 'Subscription',
		id: 'billing-portal',
		name: 'Billing portal',
		render: (variant) => (
			<BillingPortal variant={variant as BillingPortalVariant} />
		),
		source: billingPortalSource,
		stage: 'fill' as const,
		variants: [
			variant(
				'overview',
				'Overview',
				'Current plan, method, billing details, recent invoices.',
			),
			variant(
				'overview-past-due',
				'Past due',
				'The renewal failed: what to do, by when, and an open invoice to pay.',
			),
			variant(
				'update-method',
				'Update method',
				'Replacing the payment method for the next charges.',
			),
			variant(
				'update-billing-info',
				'Billing info',
				'CPF/CNPJ, company name and address for the invoices.',
			),
			variant('invoices', 'Invoices', 'Every charge, with its invoice.'),
			variant(
				'cancel-reason',
				'Cancel: reason',
				'Why they are leaving, and what happens after.',
			),
			variant(
				'cancel-retention-offer',
				'Cancel: offer',
				'A discount to stay, answering the reason given.',
			),
			variant(
				'canceled-grace',
				'Canceled, grace',
				'Canceled but active until the period ends, with Reactivate.',
			),
			variant(
				'canceled-final',
				'Canceled, final',
				'Ended: subscribe again, and the invoice history.',
			),
		],
	},
]

export const audiences: Audience[] = [
	{
		layouts: [
			{
				description:
					'Sign-in; variants differ in social login and brand space.',
				group: 'Sign In',
				id: 'sign-in',
				name: 'Sign in',
				render: (variant) => <SignIn variant={variant as SignInVariant} />,
				source: signInSource,
				// The screen is a whole `Layout` that centres itself, so it takes the
				// stage's full height rather than being centred inside it.
				stage: 'fill' as const,
				variants: [
					{
						description: 'Email and password only.',
						id: 'simple',
						label: 'Simple',
					},
					{
						description: 'Adds Google and Facebook below a divider.',
						id: 'social',
						label: 'Social',
					},
					{
						description: 'Form beside a branded panel.',
						id: 'split',
						label: 'Split panel',
					},
				],
			},
			{
				description: 'Sign-up, trading friction for safety.',
				group: 'Sign Up',
				id: 'sign-up',
				name: 'Sign up',
				render: (variant) => <SignUp variant={variant as SignUpVariant} />,
				source: signUpSource,
				// The screen is a whole `Layout` that centres itself, so it takes the
				// stage's full height rather than being centred inside it.
				stage: 'fill' as const,
				variants: [
					{
						description: 'Name, email, password. Nothing else.',
						id: 'simple',
						label: 'Simple',
					},
					{
						description: 'Adds password confirmation.',
						id: 'default',
						label: 'Default',
					},
					{
						description: 'Providers first, email form below.',
						id: 'social',
						label: 'Social',
					},
					{
						description: 'Form beside a marketing panel.',
						id: 'split',
						label: 'Split panel',
					},
				],
			},
			{
				description: 'Sign-in with an email and a one-time code, both steps.',
				group: 'Sign In',
				id: 'passwordless',
				name: 'Passwordless',
				render: (variant) => (
					<Passwordless variant={variant as PasswordlessVariant} />
				),
				source: passwordlessSource,
				// The screen is a whole `Layout` that centres itself, so it takes the
				// stage's full height rather than being centred inside it.
				stage: 'fill' as const,
				variants: [
					{
						description: 'Step one: the address the code goes to.',
						id: 'email',
						label: 'Request code',
					},
					{
						description:
							'Step two: the code, with the address still on screen.',
						id: 'code',
						label: 'Enter code',
					},
				],
			},
			{
				description: 'Pick a workspace after sign-in, with the role in each.',
				group: 'Workspaces',
				id: 'workspace-picker',
				name: 'Choose workspace',
				render: (variant) => (
					<WorkspacePicker variant={variant as WorkspacePickerVariant} />
				),
				source: workspacePickerSource,
				// The screen is a whole `Layout` that centres itself, so it takes the
				// stage's full height rather than being centred inside it.
				stage: 'fill' as const,
				variants: [
					{
						description: 'Every workspace with the role held in it.',
						id: 'several',
						label: 'Several',
					},
				],
			},
			{
				description: 'Invitation link, by sign-in state and invite status.',
				group: 'Invitation',
				id: 'invite-accept',
				name: 'Accept invite',
				render: (variant) => (
					<InviteAccept variant={variant as InviteAcceptVariant} />
				),
				source: inviteAcceptSource,
				// The screen is a whole `Layout` that centres itself, so it takes the
				// stage's full height rather than being centred inside it.
				stage: 'fill' as const,
				variants: [
					{
						description: 'Existing account: review the invitation and decide.',
						id: 'preview',
						label: 'Preview',
					},
					{
						description: 'New account: the same context, plus the fields.',
						id: 'accept',
						label: 'Accept & create',
					},
					{
						description: 'Wrong account: both addresses and Switch account.',
						id: 'other-account',
						label: 'Other account',
					},
					{
						description: 'Past expires_at: nothing left to answer.',
						id: 'expired',
						label: 'Expired',
					},
				],
			},
			{
				description: 'Password recovery: email, code, then a new password.',
				group: 'Forgot Password',
				id: 'forgot-password',
				name: 'Forgot password',
				render: (variant) => (
					<ForgotPassword variant={variant as ForgotPasswordVariant} />
				),
				source: forgotPasswordSource,
				// The screen is a whole `Layout` that centres itself, so it takes the
				// stage's full height rather than being centred inside it.
				stage: 'fill' as const,
				variants: [
					{
						description: 'Ask for the email address to start recovery.',
						id: 'request',
						label: 'Request',
					},
					{
						description: 'Validate the one-time code sent by email.',
						id: 'verify',
						label: 'Validate OTP',
						source: otpValidateSource,
					},
					{
						description: 'Choose and confirm a new password.',
						id: 'reset',
						label: 'Reset password',
						source: resetPasswordSource,
					},
				],
			},
		],
		scenarios: [
			'Email login',
			'OTP login',
			'Social login',
			'Sign-up',
			'Workspace selection',
			'Invite acceptance',
			'Forgot password',
			'Reset password',
		],
		slug: 'auth',
		summary:
			'Everything between a stranger and a session. These screens are small, high-traffic, and where a design system is judged first.',
		tagline: 'Entering the product',
		title: 'Auth',
		to: '/libs/react-web/audiences/auth',
	},
	{
		layouts: backofficeLayouts,
		scenarios: scenariosOf(backofficeLayouts),
		slug: 'backoffice',
		summary:
			'Internal tools for the team running the operation. Dense, keyboard-driven, and judged on how much it shows at once.',
		tagline: 'Running the operation',
		title: 'Backoffice',
		to: '/libs/react-web/audiences/backoffice',
	},
	{
		layouts: b2bLayouts,
		scenarios: scenariosOf(b2bLayouts),
		slug: 'b2b',
		summary:
			'What a paying customer administers inside their own account. Same density as Backoffice, scoped to one organisation.',
		tagline: 'Administering an account',
		title: 'B2B Facing',
		to: '/libs/react-web/audiences/b2b',
	},
	{
		layouts: b2cLayouts,
		scenarios: scenariosOf(b2cLayouts),
		slug: 'b2c',
		summary:
			'The consumer surface. Wider layouts, lists instead of tables, and more room for media than for data.',
		tagline: 'Using the product',
		title: 'B2C Facing',
		to: '/libs/react-web/audiences/b2c',
	},
	{
		layouts: landingPageLayouts,
		scenarios: scenariosOf(landingPageLayouts),
		slug: 'landing-page',
		summary:
			'The page before the product. It is measured on conversion rather than on task completion, which makes it the one audience where the design system has to get out of the way.',
		tagline: 'Before the product',
		title: 'Landing Page',
		to: '/libs/react-web/audiences/landing-page',
	},
	{
		layouts: checkoutLayouts,
		scenarios: scenariosOf(checkoutLayouts),
		slug: 'checkout',
		summary:
			'Where money changes hands, for a person buying a first plan and for a customer changing theirs. Every step is abandonable, and the unhappy paths matter more here than anywhere else.',
		tagline: 'Paying for it',
		title: 'Checkout',
		to: '/libs/react-web/audiences/checkout',
	},
]

export function findAudience(slug: string): Audience | undefined {
	return audiences.find((audience) => audience.slug === slug)
}
