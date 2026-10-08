import { createFileRoute } from '@tanstack/react-router'
import type { DropdownMenuAlign, DropdownMenuSide } from '@turystack/react-web'
import { Button, DropdownMenu } from '@turystack/react-web'
import {
	Copy,
	CreditCard,
	LogOut,
	Pencil,
	Settings,
	Share2,
	Trash2,
	User,
} from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/dropdown-menu/dropdown-menu.types.ts` and the
 * destructuring defaults in `dropdown-menu.tsx`.
 */
const rootProps = [
	{
		default: 'undefined',
		description: 'Controlled open state; left off, it manages itself.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Fires with the requested open state.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
]

const triggerProps = [
	{
		default: 'false',
		description: 'Uses the child element as the trigger, unwrapped.',
		name: 'asChild',
		type: 'boolean',
	},
]

const contentProps = [
	{
		description: 'Popup width; defaults to the trigger’s, min 10rem.',
		name: 'width',
		type: 'React.CSSProperties["width"]',
	},
	{
		default: '"bottom"',
		description: 'Preferred edge of the trigger to open against.',
		name: 'side',
		type: '"top" | "right" | "bottom" | "left"',
	},
	{
		default: '"start"',
		description: 'Alignment along that side.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
	{
		default: '4',
		description: 'Gap between the trigger and the popup, in pixels.',
		name: 'sideOffset',
		type: 'number',
	},
]

const itemProps = [
	{
		default: '"default"',
		description: 'Visual variant; "destructive" turns label and icon red.',
		name: 'variant',
		type: '"default" | "destructive"',
	},
	{
		default: 'false',
		description: 'Blocks activation and mutes the row.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Renders the child (a link) as the item, row-styled.',
		name: 'asChild',
		type: 'boolean',
	},
	{
		description: 'Fires when the row is activated (typed for a div).',
		name: 'onClick',
		type: 'React.MouseEventHandler<HTMLDivElement>',
	},
]

const checkboxItemProps = [
	{
		default: 'undefined',
		description: 'Whether the row is ticked; left off, it is uncontrolled.',
		name: 'checked',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Blocks activation and mutes the row.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
	{
		description: 'Fires with the state the row wants to be in.',
		name: 'onCheckedChange',
		type: '(checked: boolean) => void',
	},
]

const radioGroupProps = [
	{
		description: 'The selected value in the group.',
		name: 'value',
		type: 'string',
	},
	{
		description: 'Fires with the value of the row the user picked.',
		name: 'onValueChange',
		type: '(value: string) => void',
	},
]

const radioItemProps = [
	{
		description: 'What this row stands for. Compared against the group value.',
		name: 'value',
		required: true,
		type: 'string',
	},
	{
		default: 'false',
		description: 'Blocks activation and mutes the row.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const labelProps = [
	{
		default: 'false',
		description: 'Indents the label to align with indicator rows.',
		name: 'inset',
		type: 'boolean',
	},
]

const emptyProps: never[] = []

const usageCode = `import { Button, DropdownMenu } from '@turystack/react-web'
import { useState } from 'react'

<DropdownMenu>
  <DropdownMenu.Trigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end" width={220}>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My account</DropdownMenu.Label>
      <DropdownMenu.Item onClick={editProfile}>
        <User /> Profile
        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item asChild>
        <a href="/billing"><CreditCard /> Billing</a>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onClick={remove} variant="destructive">
      <Trash2 /> Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>

// Checkbox rows
const [wrap, setWrap] = useState(true)

<DropdownMenu.CheckboxItem checked={wrap} onCheckedChange={setWrap}>
  Wrap lines
</DropdownMenu.CheckboxItem>

// Radio rows — RadioItem throws outside a RadioGroup
const [theme, setTheme] = useState('system')

<DropdownMenu.RadioGroup onValueChange={setTheme} value={theme}>
  <DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
  <DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
  <DropdownMenu.RadioItem value="system">System</DropdownMenu.RadioItem>
</DropdownMenu.RadioGroup>`

const SIDES: DropdownMenuSide[] = [
	'top',
	'right',
	'bottom',
	'left',
]

const ALIGNS: DropdownMenuAlign[] = [
	'start',
	'center',
	'end',
]

function ItemsMenu() {
	const [last, setLast] = useState('nothing yet')

	return (
		<div className="flex flex-col items-center gap-3">
			<DropdownMenu>
				<DropdownMenu.Trigger asChild>
					<Button variant="outline">Actions</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content width={240}>
					<DropdownMenu.Item onClick={() => setLast('Edit')}>
						<Pencil /> Edit
						<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item onClick={() => setLast('Duplicate')}>
						<Copy /> Duplicate
						<DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item
						disabled
						onClick={() => setLast('Settings')}
					>
						<Settings /> Settings
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item
						onClick={() => setLast('Delete')}
						variant="destructive"
					>
						<Trash2 /> Delete
						<DropdownMenu.Shortcut>⌫</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
			<p className="text-muted-foreground text-xs">
				last picked: <code className="text-foreground">{last}</code>
			</p>
		</div>
	)
}

function ReasonMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button variant="outline">Ações da reserva</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content width={240}>
				<DropdownMenu.Item>
					<Pencil /> Editar
				</DropdownMenu.Item>
				<DropdownMenu.Item disabledReason="Só proprietários podem compartilhar">
					<Share2 /> Compartilhar
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					disabledReason="Só administradores podem excluir"
					variant="destructive"
				>
					<Trash2 /> Excluir
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

function GroupedMenu() {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button variant="outline">Account</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content width={240}>
				<DropdownMenu.Group>
					<DropdownMenu.Label>My account</DropdownMenu.Label>
					<DropdownMenu.Item>
						<User /> Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CreditCard /> Billing
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Label inset>Workspace</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Settings /> Preferences
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<LogOut /> Sign out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

function CheckboxMenu() {
	const [wrap, setWrap] = useState(true)
	const [minimap, setMinimap] = useState(false)
	const [numbers, setNumbers] = useState(true)

	const on = [
		wrap && 'wrap',
		minimap && 'minimap',
		numbers && 'numbers',
	].filter(Boolean)

	return (
		<div className="flex flex-col items-center gap-3">
			<DropdownMenu>
				<DropdownMenu.Trigger asChild>
					<Button variant="outline">View options</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content width={220}>
					<DropdownMenu.Label>Editor</DropdownMenu.Label>
					<DropdownMenu.CheckboxItem
						checked={wrap}
						onCheckedChange={setWrap}
					>
						Wrap lines
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						checked={minimap}
						onCheckedChange={setMinimap}
					>
						Minimap
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem
						checked={numbers}
						onCheckedChange={setNumbers}
					>
						Line numbers
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem disabled>
						Sticky scroll
					</DropdownMenu.CheckboxItem>
				</DropdownMenu.Content>
			</DropdownMenu>
			<p className="text-muted-foreground text-xs">
				on: <code className="text-foreground">{on.join(', ') || 'none'}</code>
			</p>
		</div>
	)
}

function RadioMenu() {
	const [theme, setTheme] = useState('system')

	return (
		<div className="flex flex-col items-center gap-3">
			<DropdownMenu>
				<DropdownMenu.Trigger asChild>
					<Button variant="outline">Theme</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content width={200}>
					<DropdownMenu.Label>Appearance</DropdownMenu.Label>
					<DropdownMenu.RadioGroup
						onValueChange={setTheme}
						value={theme}
					>
						<DropdownMenu.RadioItem value="light">Light</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="dark">Dark</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="system">
							System
						</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem
							disabled
							value="high-contrast"
						>
							High contrast
						</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.Content>
			</DropdownMenu>
			<p className="text-muted-foreground text-xs">
				theme: <code className="text-foreground">{theme}</code>
			</p>
		</div>
	)
}

function ControlledMenu() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex flex-col items-center gap-3">
			<DropdownMenu
				onOpenChange={setOpen}
				open={open}
			>
				<DropdownMenu.Trigger asChild>
					<Button variant="outline">Controlled menu</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content width={220}>
					<DropdownMenu.Item onClick={() => setOpen(false)}>
						Close from an item
					</DropdownMenu.Item>
					<DropdownMenu.Item>Leave it open</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
			<Button
				onClick={() => setOpen((value) => !value)}
				size="sm"
				variant="ghost"
			>
				toggle from outside
			</Button>
			<p className="text-muted-foreground text-xs">
				open: <code className="text-foreground">{String(open)}</code>
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
					DropdownMenu
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					An action menu of items, checkbox and radio rows, labels and
					shortcuts.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<h3 className="font-medium text-sm">DropdownMenu</h3>
				<PropsTable props={rootProps} />
				<h3 className="font-medium text-sm">DropdownMenu.Trigger</h3>
				<PropsTable props={triggerProps} />
				<h3 className="font-medium text-sm">DropdownMenu.Content</h3>
				<PropsTable props={contentProps} />
				<h3 className="font-medium text-sm">DropdownMenu.Item</h3>
				<PropsTable props={itemProps} />
				<h3 className="font-medium text-sm">DropdownMenu.CheckboxItem</h3>
				<PropsTable props={checkboxItemProps} />
				<h3 className="font-medium text-sm">DropdownMenu.RadioGroup</h3>
				<PropsTable props={radioGroupProps} />
				<h3 className="font-medium text-sm">DropdownMenu.RadioItem</h3>
				<PropsTable props={radioItemProps} />
				<h3 className="font-medium text-sm">DropdownMenu.Label</h3>
				<PropsTable props={labelProps} />
				<h3 className="font-medium text-sm">
					DropdownMenu.Group · Separator · Shortcut
				</h3>
				<p className="max-w-prose text-muted-foreground text-sm">
					Children only. Group exists so the labels inside it name something;
					Separator takes no children at all.
				</p>
				<PropsTable props={emptyProps} />
			</section>

			<SlotsSection slug="dropdown-menu" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Items</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					An item lays out an icon, the label, then a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Shortcut
					</code>{' '}
					on the right. Picking an item closes the menu.
				</p>
				<ComponentPreview title="Icons, shortcuts, disabled and destructive">
					<ItemsMenu />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Labels, groups and separators
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A label inside a Group names it for assistive technology; outside one
					it falls back to a plain heading.
				</p>
				<ComponentPreview title="Two groups, a plain label and an inset one">
					<GroupedMenu />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Checkbox items</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The tick sits on the right, not the left. These rows are controlled
					here, so the state survives closing and reopening the menu.
				</p>
				<ComponentPreview title="Three toggles and a disabled one">
					<CheckboxMenu />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Radio items</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						RadioItem
					</code>{' '}
					outside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						RadioGroup
					</code>{' '}
					has nothing to be exclusive with, so it throws rather than rendering a
					row that cannot work.
				</p>
				<ComponentPreview title="An exclusive group">
					<RadioMenu />
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
					blocks a row but keeps it reachable by arrows; hover or focus it to
					read why.
				</p>
				<ComponentPreview title="Two rows blocked, one free">
					<ReasonMenu />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Placement</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width
					</code>{' '}
					the popup matches the width of its trigger, floored at 10rem — a wide
					trigger gives a wide menu whether you wanted one or not.
				</p>
				<ComponentPreview title="All four sides">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{SIDES.map((side) => (
							<DropdownMenu key={side}>
								<DropdownMenu.Trigger asChild>
									<Button variant="outline">{side}</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content
									side={side}
									sideOffset={8}
									width={180}
								>
									<DropdownMenu.Item>side="{side}"</DropdownMenu.Item>
									<DropdownMenu.Item>Second row</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview title="All three alignments">
					<div className="flex flex-wrap items-center justify-center gap-3">
						{ALIGNS.map((align) => (
							<DropdownMenu key={align}>
								<DropdownMenu.Trigger asChild>
									<Button variant="outline">{align}</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content
									align={align}
									width={200}
								>
									<DropdownMenu.Item>align="{align}"</DropdownMenu.Item>
									<DropdownMenu.Item>Second row</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview title="Width — inherited from the trigger, or fixed">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button variant="outline">
									A deliberately wide trigger button
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>As wide as the trigger</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button variant="outline">
									The same trigger, width={'{160}'}
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content width={160}>
								<DropdownMenu.Item>160 px</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Trigger and state
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						asChild
					</code>{' '}
					the trigger renders its own unstyled button around your children, so
					in practice every trigger holding a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Button
					</code>{' '}
					wants it.
				</p>
				<ComponentPreview title="asChild against the bare trigger">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button variant="outline">asChild</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content width={200}>
								<DropdownMenu.Item>A styled Button trigger</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenu.Trigger>Bare trigger</DropdownMenu.Trigger>
							<DropdownMenu.Content width={200}>
								<DropdownMenu.Item>
									The menu's own button element
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Controlled">
					<ControlledMenu />
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

export const Route = createFileRoute(
	'/libs/react-web/components/dropdown-menu',
)({
	component: Page,
})
