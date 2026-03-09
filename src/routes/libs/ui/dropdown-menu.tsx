import { createFileRoute } from '@tanstack/react-router'
import { Button, DropdownMenu, Provider } from '@turystack/ui'
import { ChevronRight, Copy, Edit, LogOut, MoreVertical, Settings, Trash } from 'lucide-react'
import { useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const dropdownMenuProps = [
	{
		description: 'Controls the open state of the dropdown.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Handler called when the open state changes.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
]

const contentProps = [
	{
		default: '"bottom"',
		description: 'The side of the trigger to render the content.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '"start"',
		description: 'Alignment of the content relative to the trigger.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
	{
		default: '4',
		description: 'Distance in pixels between the content and the trigger.',
		name: 'sideOffset',
		type: 'number',
	},
]

const itemProps = [
	{
		default: '"default"',
		description: 'The visual variant of the item.',
		name: 'variant',
		type: '"default" | "destructive"',
	},
	{
		default: 'false',
		description: 'Disables the item, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Handler called when the item is clicked.',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLDivElement>',
	},
]

const usageCode = `import { DropdownMenu, Button } from '@turystack/ui'

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline">Open menu</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onClick={() => {}}>
      <Settings /> Settings
    </DropdownMenu.Item>
    <DropdownMenu.Item onClick={() => {}}>
      <Copy /> Copy link
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item variant="destructive" onClick={() => {}}>
      <Trash /> Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>

// With checkbox items
const [showName, setShowName] = useState(true)
const [showEmail, setShowEmail] = useState(false)

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline">Columns</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.CheckboxItem checked={showName} onCheckedChange={setShowName}>
      Name
    </DropdownMenu.CheckboxItem>
    <DropdownMenu.CheckboxItem checked={showEmail} onCheckedChange={setShowEmail}>
      Email
    </DropdownMenu.CheckboxItem>
  </DropdownMenu.Content>
</DropdownMenu>

// With radio items
const [sort, setSort] = useState('name')

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline">Sort by</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
      <DropdownMenu.RadioItem value="name">Name</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="date">Date</DropdownMenu.RadioItem>
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu>`

function CheckboxDemo() {
	const [showName, setShowName] = useState(true)
	const [showEmail, setShowEmail] = useState(false)
	const [showRole, setShowRole] = useState(true)

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button variant="outline">Columns</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Label>Toggle columns</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.CheckboxItem
					checked={showName}
					onCheckedChange={setShowName}
				>
					Name
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem
					checked={showEmail}
					onCheckedChange={setShowEmail}
				>
					Email
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem
					checked={showRole}
					onCheckedChange={setShowRole}
				>
					Role
				</DropdownMenu.CheckboxItem>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

function RadioDemo() {
	const [sort, setSort] = useState('name')

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button variant="outline">Sort by</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Label>Sort by</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
					<DropdownMenu.RadioItem value="name">Name</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="date">Date created</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="updated">Last updated</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						DropdownMenu
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A contextual menu that appears when users interact with a trigger
						element. Supports items, checkboxes, radio groups, labels, and
						submenus.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						DropdownMenu Props
					</h2>
					<PropsTable props={dropdownMenuProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						DropdownMenu.Content Props
					</h2>
					<PropsTable props={contentProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						DropdownMenu.Item Props
					</h2>
					<PropsTable props={itemProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Dropdown menu with actions">
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button variant="outline">Open menu</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Label>Actions</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<Edit />
									Edit
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<Copy />
									Duplicate
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item variant="destructive">
									<Trash />
									Delete
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With submenu</h2>
					<ComponentPreview title="Dropdown menu with submenu">
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button variant="outline">Open menu</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>
									<Settings />
									Settings
								</DropdownMenu.Item>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger>
										<ChevronRight />
										Share
									</DropdownMenu.SubTrigger>
									<DropdownMenu.SubContent>
										<DropdownMenu.Item>Email</DropdownMenu.Item>
										<DropdownMenu.Item>Slack</DropdownMenu.Item>
										<DropdownMenu.Item>Copy link</DropdownMenu.Item>
									</DropdownMenu.SubContent>
								</DropdownMenu.Sub>
								<DropdownMenu.Separator />
								<DropdownMenu.Item variant="destructive">
									<LogOut />
									Log out
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Checkbox items</h2>
					<ComponentPreview title="Dropdown with checkbox items">
						<CheckboxDemo />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Radio items</h2>
					<ComponentPreview title="Dropdown with radio items">
						<RadioDemo />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Icon trigger</h2>
					<ComponentPreview title="Icon-only trigger button">
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground">
									<MoreVertical className="h-4 w-4" />
								</button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>
									<Edit />
									Edit
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<Copy />
									Duplicate
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item variant="destructive">
									<Trash />
									Delete
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
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

export const Route = createFileRoute('/libs/ui/dropdown-menu')({
	component: Page,
})
