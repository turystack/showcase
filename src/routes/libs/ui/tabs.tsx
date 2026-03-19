import { createFileRoute } from '@tanstack/react-router'
import { Provider, Tabs } from '@turystack/ui'
import { BarChart, Settings, Users } from 'lucide-react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const tabsProps = [
	{
		default: '"horizontal"',
		description: 'The layout orientation of the tabs list.',
		name: 'orientation',
		type: '"horizontal" | "vertical"',
	},
	{
		description: 'The controlled selected tab value.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'The default selected tab when uncontrolled.',
		name: 'defaultValue',
		type: 'string',
	},
	{
		description: 'Handler called when the selected tab changes.',
		name: 'onChange',
		type: '(value: string) => void',
	},
]

const triggerProps = [
	{
		description: 'The unique value identifying this tab.',
		name: 'value',
		required: true,
		type: 'string',
	},
	{
		description: 'An icon rendered before the tab label.',
		name: 'icon',
		type: 'React.ReactNode',
	},
]

const contentProps = [
	{
		description: 'The tab value this content panel is associated with.',
		name: 'value',
		required: true,
		type: 'string',
	},
]

const listProps = [
	{
		default: 'false',
		description:
			'When true, tabs expand to fill the full width of the list, each tab taking equal space.',
		name: 'justified',
		type: 'boolean',
	},
]

const usageCode = `import { Tabs } from '@turystack/ui'
import { Users, Settings } from 'lucide-react'

// Horizontal tabs (default)
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">
    <p>Overview content</p>
  </Tabs.Content>
  <Tabs.Content value="settings">
    <p>Settings content</p>
  </Tabs.Content>
</Tabs>

// With icons
<Tabs defaultValue="users">
  <Tabs.List>
    <Tabs.Trigger value="users" icon={<Users />}>Users</Tabs.Trigger>
    <Tabs.Trigger value="settings" icon={<Settings />}>Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="users">Users panel</Tabs.Content>
  <Tabs.Content value="settings">Settings panel</Tabs.Content>
</Tabs>

// Vertical
<Tabs orientation="vertical" defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="security">Security</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile">Profile settings</Tabs.Content>
  <Tabs.Content value="security">Security settings</Tabs.Content>
</Tabs>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Tabs
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A set of layered sections of content—known as tab panels—that are
						displayed one at a time. Supports horizontal and vertical
						orientations.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Tabs Props</h2>
					<PropsTable props={tabsProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Tabs.Trigger Props
					</h2>
					<PropsTable props={triggerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Tabs.Content Props
					</h2>
					<PropsTable props={contentProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Tabs.List Props
					</h2>
					<PropsTable props={listProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Horizontal tabs">
						<div className="w-full max-w-md">
							<Tabs defaultValue="overview">
								<Tabs.List>
									<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
									<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
									<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="overview">
									<p className="text-sm">
										Overview content — summary of your account activity.
									</p>
								</Tabs.Content>
								<Tabs.Content value="analytics">
									<p className="text-sm">
										Analytics content — charts and reports.
									</p>
								</Tabs.Content>
								<Tabs.Content value="settings">
									<p className="text-sm">
										Settings content — configure your preferences.
									</p>
								</Tabs.Content>
							</Tabs>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With icons</h2>
					<ComponentPreview title="Tabs with icon in trigger">
						<div className="w-full max-w-md">
							<Tabs defaultValue="users">
								<Tabs.List>
									<Tabs.Trigger
										icon={<Users />}
										value="users"
									>
										Users
									</Tabs.Trigger>
									<Tabs.Trigger
										icon={<BarChart />}
										value="reports"
									>
										Reports
									</Tabs.Trigger>
									<Tabs.Trigger
										icon={<Settings />}
										value="settings"
									>
										Settings
									</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="users">
									<p className="text-sm">
										Manage team members and permissions.
									</p>
								</Tabs.Content>
								<Tabs.Content value="reports">
									<p className="text-sm">View usage reports and metrics.</p>
								</Tabs.Content>
								<Tabs.Content value="settings">
									<p className="text-sm">Configure workspace settings.</p>
								</Tabs.Content>
							</Tabs>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Vertical</h2>
					<ComponentPreview title="Vertical tabs">
						<div className="w-full max-w-md">
							<Tabs
								defaultValue="profile"
								orientation="vertical"
							>
								<Tabs.List>
									<Tabs.Trigger value="profile">Profile</Tabs.Trigger>
									<Tabs.Trigger value="security">Security</Tabs.Trigger>
									<Tabs.Trigger value="notifications">
										Notifications
									</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="profile">
									<p className="text-sm">
										Edit your public profile information.
									</p>
								</Tabs.Content>
								<Tabs.Content value="security">
									<p className="text-sm">Manage passwords and 2FA.</p>
								</Tabs.Content>
								<Tabs.Content value="notifications">
									<p className="text-sm">Control notification preferences.</p>
								</Tabs.Content>
							</Tabs>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Justified</h2>
					<ComponentPreview title="Tabs filling full width">
						<div className="w-full max-w-md">
							<Tabs defaultValue="overview">
								<Tabs.List justified>
									<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
									<Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
									<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="overview">
									<p className="text-sm">Overview content.</p>
								</Tabs.Content>
								<Tabs.Content value="analytics">
									<p className="text-sm">Analytics content.</p>
								</Tabs.Content>
								<Tabs.Content value="settings">
									<p className="text-sm">Settings content.</p>
								</Tabs.Content>
							</Tabs>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/tabs')({
	component: Page,
})
