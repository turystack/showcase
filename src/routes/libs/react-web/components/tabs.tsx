import { createFileRoute } from '@tanstack/react-router'
import { Tabs, type TabsJustify } from '@turystack/react-web'
import { Bell, ChartBar, CreditCard, Settings, User } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/tabs/tabs.types.ts` and the
 * `defaultVariants` plus destructuring defaults in `tabs.tsx`.
 */
const tabsProps = [
	{
		default: '"horizontal"',
		description: 'Layout direction: list above or beside the panel.',
		name: 'orientation',
		type: '"horizontal" | "vertical"',
	},
	{
		default: '"line"',
		description: 'Visual style of the list; inherited by Tabs.List.',
		name: 'variant',
		type: '"line" | "pill"',
	},
	{
		default: 'false',
		description: 'Rail fills the container; triggers keep natural width.',
		name: 'block',
		type: 'boolean',
	},
	{
		default: 'true',
		description: 'Gives every trigger an equal share of the list width.',
		name: 'justified',
		type: 'boolean',
	},
	{
		default: '"start"',
		description: 'Trigger position in a block rail; block only.',
		name: 'justify',
		type: '"start" | "center" | "between"',
	},
	{
		description: 'Controlled active tab; echo it back via onChange.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'Initial active tab when the component owns its own state.',
		name: 'defaultValue',
		type: 'string',
	},
	{
		description: 'Fires with the value of the tab the user activated.',
		name: 'onChange',
		type: '(value: string) => void',
	},
]

const tabsListProps = [
	{
		description: 'Accessible name of the tablist.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Per-list override of the root variant.',
		name: 'variant',
		type: '"line" | "pill"',
	},
	{
		description: 'Per-list override of the root block flag.',
		name: 'block',
		type: 'boolean',
	},
	{
		description: 'Per-list override of the root justified flag.',
		name: 'justified',
		type: 'boolean',
	},
	{
		description: 'Per-list override of the root justify; block only.',
		name: 'justify',
		type: '"start" | "center" | "between"',
	},
]

const tabsTriggerProps = [
	{
		description: 'Identifier of the tab. Must match a Tabs.Content value.',
		name: 'value',
		required: true,
		type: 'string',
	},
	{
		description: 'Node rendered before the label, inside the trigger.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		description: 'Blocks activation and mutes the trigger.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const tabsContentProps = [
	{
		description: 'Panel id; matches the value of its trigger.',
		name: 'value',
		required: true,
		type: 'string',
	},
]

const usageCode = `import { Tabs } from '@turystack/react-web'
import { useState } from 'react'

// Uncontrolled — the component keeps its own active tab.
// ariaLabel names the tablist: a screen reader says it on entering the list.
<Tabs defaultValue="account">
  <Tabs.List ariaLabel="Account settings">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account panel</Tabs.Content>
  <Tabs.Content value="billing">Billing panel</Tabs.Content>
</Tabs>

// Controlled — you own the value
const [tab, setTab] = useState('account')

<Tabs onChange={setTab} value={tab}>
  <Tabs.List ariaLabel="Account settings">
    <Tabs.Trigger icon={<User />} value="account">Account</Tabs.Trigger>
    <Tabs.Trigger disabled value="billing">Billing</Tabs.Trigger>
    <Tabs.Trigger disabledReason="Upgrade to see reports" value="reports">Reports</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account panel</Tabs.Content>
  <Tabs.Content value="billing">Billing panel</Tabs.Content>
</Tabs>

// Full-width rail, triggers at their natural width
<Tabs block defaultValue="account">
  <Tabs.List ariaLabel="Account settings">
    <Tabs.Trigger value="account">Account</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="account">Account panel</Tabs.Content>
  <Tabs.Content value="billing">Billing panel</Tabs.Content>
</Tabs>

// A block rail with its triggers centred (or "between")
<Tabs block defaultValue="account" justify="center">…</Tabs>

// justify without block, or block with justified, is a compile error
<Tabs justify="center">…</Tabs>

// block and justified are a union — this is a compile error
<Tabs block justified>…</Tabs>

// Pill variant, not stretched, vertical
<Tabs defaultValue="a" orientation="vertical" variant="pill">
  <Tabs.List ariaLabel="Sections" justified={false}>
    <Tabs.Trigger value="a">One</Tabs.Trigger>
    <Tabs.Trigger value="b">Two</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="a">Panel one</Tabs.Content>
  <Tabs.Content value="b">Panel two</Tabs.Content>
</Tabs>`

function panelClass() {
	return 'rounded-lg border border-border p-4 text-muted-foreground text-sm'
}

function LineTabs() {
	return (
		<div className="w-full max-w-md">
			<Tabs defaultValue="account">
				<Tabs.List ariaLabel="Account settings">
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
					<Tabs.Trigger value="alerts">Alerts</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Name, e-mail and password.</div>
				</Tabs.Content>
				<Tabs.Content value="billing">
					<div className={panelClass()}>Cards, invoices and the plan.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>What we are allowed to e-mail you.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function PillTabs() {
	return (
		<div className="w-full max-w-md">
			<Tabs
				defaultValue="account"
				variant="pill"
			>
				<Tabs.List ariaLabel="Account settings">
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
					<Tabs.Trigger value="alerts">Alerts</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Name, e-mail and password.</div>
				</Tabs.Content>
				<Tabs.Content value="billing">
					<div className={panelClass()}>Cards, invoices and the plan.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>What we are allowed to e-mail you.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function VerticalTabs({ variant }: { variant: 'line' | 'pill' }) {
	return (
		<div className="w-full max-w-md">
			<Tabs
				defaultValue="account"
				orientation="vertical"
				variant={variant}
			>
				<Tabs.List
					ariaLabel="Account settings"
					justified={false}
				>
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
					<Tabs.Trigger value="alerts">Alerts</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Name, e-mail and password.</div>
				</Tabs.Content>
				<Tabs.Content value="billing">
					<div className={panelClass()}>Cards, invoices and the plan.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>What we are allowed to e-mail you.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function JustifiedTabs({ justified }: { justified: boolean }) {
	return (
		<div className="w-full max-w-md">
			<Tabs
				defaultValue="account"
				justified={justified}
			>
				<Tabs.List ariaLabel="Account settings">
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
					<Tabs.Trigger value="alerts">Alerts</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Name, e-mail and password.</div>
				</Tabs.Content>
				<Tabs.Content value="billing">
					<div className={panelClass()}>Cards, invoices and the plan.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>What we are allowed to e-mail you.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function BlockTabs({ justify }: { justify?: TabsJustify }) {
	return (
		<div className="w-full max-w-md">
			<Tabs
				block
				defaultValue="account"
				justify={justify}
			>
				<Tabs.List ariaLabel="Account settings">
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
					<Tabs.Trigger value="alerts">Alerts</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Name, e-mail and password.</div>
				</Tabs.Content>
				<Tabs.Content value="billing">
					<div className={panelClass()}>Cards, invoices and the plan.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>What we are allowed to e-mail you.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function IconTabs() {
	return (
		<div className="w-full max-w-md">
			<Tabs defaultValue="account">
				<Tabs.List ariaLabel="Account settings">
					<Tabs.Trigger
						icon={<User />}
						value="account"
					>
						Account
					</Tabs.Trigger>
					<Tabs.Trigger
						icon={<CreditCard />}
						value="billing"
					>
						Billing
					</Tabs.Trigger>
					<Tabs.Trigger
						icon={<Bell />}
						value="alerts"
					>
						Alerts
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Name, e-mail and password.</div>
				</Tabs.Content>
				<Tabs.Content value="billing">
					<div className={panelClass()}>Cards, invoices and the plan.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>What we are allowed to e-mail you.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function DisabledTabs() {
	return (
		<div className="w-full max-w-md">
			<Tabs defaultValue="overview">
				<Tabs.List ariaLabel="Report views">
					<Tabs.Trigger
						icon={<ChartBar />}
						value="overview"
					>
						Overview
					</Tabs.Trigger>
					<Tabs.Trigger
						disabled
						icon={<Settings />}
						value="advanced"
					>
						Advanced
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="overview">
					<div className={panelClass()}>
						The Advanced tab is disabled — clicking it does nothing and onChange
						never fires.
					</div>
				</Tabs.Content>
				<Tabs.Content value="advanced">
					<div className={panelClass()}>
						You should not be able to get here.
					</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function ReasonTabs() {
	return (
		<div className="w-full max-w-md">
			<Tabs defaultValue="account">
				<Tabs.List ariaLabel="Configurações da conta">
					<Tabs.Trigger value="account">Conta</Tabs.Trigger>
					<Tabs.Trigger
						disabledReason="Disponível no plano Pro"
						value="reports"
					>
						Relatórios
					</Tabs.Trigger>
					<Tabs.Trigger value="alerts">Alertas</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Nome, e-mail e senha.</div>
				</Tabs.Content>
				<Tabs.Content value="reports">
					<div className={panelClass()}>Nunca aparece.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>O que podemos enviar por e-mail.</div>
				</Tabs.Content>
			</Tabs>
		</div>
	)
}

function ControlledTabs() {
	const [tab, setTab] = useState('account')

	return (
		<div className="w-full max-w-md space-y-3">
			<Tabs
				onChange={setTab}
				value={tab}
			>
				<Tabs.List ariaLabel="Account settings">
					<Tabs.Trigger value="account">Account</Tabs.Trigger>
					<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
					<Tabs.Trigger value="alerts">Alerts</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<div className={panelClass()}>Name, e-mail and password.</div>
				</Tabs.Content>
				<Tabs.Content value="billing">
					<div className={panelClass()}>Cards, invoices and the plan.</div>
				</Tabs.Content>
				<Tabs.Content value="alerts">
					<div className={panelClass()}>What we are allowed to e-mail you.</div>
				</Tabs.Content>
			</Tabs>
			<p className="text-center text-muted-foreground text-xs">
				value held in the page: <code className="text-foreground">{tab}</code>
			</p>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Navigation
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Tabs
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A compound tab set built on Base UI, with two styles, two orientations
					and three width modes.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<h3 className="font-medium text-sm">Tabs</h3>
				<PropsTable props={tabsProps} />
				<h3 className="font-medium text-sm">Tabs.List</h3>
				<p className="max-w-prose text-muted-foreground text-sm">
					ariaLabel names the list; the layout props are overrides — left off,
					the list reads whatever the root set.
				</p>
				<PropsTable props={tabsListProps} />
				<h3 className="font-medium text-sm">Tabs.Trigger</h3>
				<PropsTable props={tabsTriggerProps} />
				<h3 className="font-medium text-sm">Tabs.Content</h3>
				<PropsTable props={tabsContentProps} />
			</section>

			<SlotsSection slug="tabs" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="line: the default underline">
					<LineTabs />
				</ComponentPreview>
				<ComponentPreview title="pill — a segmented control on a muted track">
					<PillTabs />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Orientation</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Vertical moves the list to the side and turns the active underline
					into a right border.
				</p>
				<ComponentPreview title="vertical + line">
					<VerticalTabs variant="line" />
				</ComponentPreview>
				<ComponentPreview title="vertical + pill">
					<VerticalTabs variant="pill" />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Rail width</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						justified
					</code>{' '}
					is on by default: the rail fills the container and triggers share it
					equally.
				</p>
				<ComponentPreview title="justified — the default, triggers share the width">
					<JustifiedTabs justified />
				</ComponentPreview>
				<ComponentPreview title="justified={false}: rail shrinks to the triggers">
					<JustifiedTabs justified={false} />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						block
					</code>{' '}
					spans the rail across the container while triggers keep their natural
					width.
				</p>
				<ComponentPreview title="block — full-width rail, natural-width triggers">
					<BlockTabs />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<strong className="text-foreground">
						The two cannot be combined:
					</strong>{' '}
					with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						block
					</code>{' '}
					true,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						justified
					</code>{' '}
					must be{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						false
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						justify
					</code>{' '}
					places triggers in a block rail:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						start
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						center
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						between
					</code>
					. Block only.
				</p>
				<ComponentPreview title='block justify="center"'>
					<BlockTabs justify="center" />
				</ComponentPreview>
				<ComponentPreview title='block justify="between"'>
					<BlockTabs justify="between" />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Triggers</h2>
				<ComponentPreview title="Icons">
					<IconTabs />
				</ComponentPreview>
				<ComponentPreview title="Disabled">
					<DisabledTabs />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabledReason
					</code>{' '}
					blocks a tab but keeps it reachable by arrows; hover or focus it to
					read why.
				</p>
				<ComponentPreview title="Reports locked in a justified list">
					<ReasonTabs />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Naming the list</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>{' '}
					on{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Tabs.List
					</code>{' '}
					names the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="tablist"
					</code>
					, e.g. “Account settings, tab list”.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">State</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						value
					</code>{' '}
					set, tabs only switch when you update it from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>
					.
				</p>
				<ComponentPreview title="Controlled">
					<ControlledTabs />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="example.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/tabs')({
	component: Page,
})
