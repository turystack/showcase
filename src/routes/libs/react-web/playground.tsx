import { createFileRoute } from '@tanstack/react-router'
import {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	Container,
	CurrencyInput,
	DateInput,
	DateRangeInput,
	DocumentInput,
	DropdownMenu,
	Flex,
	Grid,
	Input,
	Label,
	List,
	Loader,
	LoadingOverlay,
	MaskInput,
	Modal,
	NumberInput,
	OTPInput,
	Pagination,
	PasswordInput,
	PhoneInput,
	Popover,
	Progress,
	Radio,
	Rating,
	Select,
	Separator,
	Sheet,
	Skeleton,
	Slider,
	Stepper,
	Switch,
	Table,
	Tabs,
	TagsInput,
	Textarea,
	TimeInput,
	Tooltip,
	Typography,
	Uploader,
	useDisclosure,
} from '@turystack/react-web'
import type { ReactNode } from 'react'
import { useDeferredValue, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

/**
 * Props the panel drives across every demo that accepts them.
 *
 * Deliberately small: `variant` means something different on a Button than on
 * a Badge, so it stays local to each demo rather than pretending to be shared.
 */
type SharedProps = {
	size: 'sm' | 'md' | 'lg'
	disabled: boolean
}

const CATEGORIES = [
	'Form',
	'Display',
	'Feedback',
	'Overlays',
	'Layout',
] as const

type Category = (typeof CATEGORIES)[number]

type Demo = {
	name: string
	category: Category
	render: (shared: SharedProps) => ReactNode
}

const SELECT_OPTIONS = [
	{
		id: 'react',
		label: 'React',
	},
	{
		id: 'vue',
		label: 'Vue',
	},
	{
		id: 'svelte',
		label: 'Svelte',
	},
]

/** Each demo renders one component, small enough to read at a glance. */
const DEMOS: Demo[] = [
	// ── Form ────────────────────────────────────────────────────────────────
	{
		category: 'Form',
		name: 'Input',
		render: ({ disabled, size }) => (
			<Input
				disabled={disabled}
				placeholder="Type here"
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'Textarea',
		render: ({ disabled }) => (
			<Textarea
				disabled={disabled}
				placeholder="Longer text"
				rows={3}
			/>
		),
	},
	{
		category: 'Form',
		name: 'PasswordInput',
		render: ({ disabled, size }) => (
			<PasswordInput
				disabled={disabled}
				placeholder="••••••••"
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'NumberInput',
		render: ({ disabled, size }) => (
			<NumberInput
				disabled={disabled}
				placeholder="0"
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'CurrencyInput',
		render: ({ disabled, size }) => (
			<CurrencyInput
				disabled={disabled}
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'MaskInput',
		render: ({ disabled, size }) => (
			<MaskInput
				disabled={disabled}
				mask="00/00/0000"
				placeholder="00/00/0000"
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'PhoneInput',
		render: ({ disabled, size }) => (
			<PhoneInput
				disabled={disabled}
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'DocumentInput',
		render: ({ disabled, size }) => (
			<DocumentInput
				disabled={disabled}
				size={size}
				variant="cpf"
			/>
		),
	},
	{
		category: 'Form',
		name: 'OTPInput',
		render: ({ size }) => (
			<OTPInput
				pattern={[
					3,
					3,
				]}
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'DateInput',
		render: ({ disabled, size }) => (
			<DateInput
				disabled={disabled}
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'DateRangeInput',
		render: ({ disabled, size }) => (
			<DateRangeInput
				disabled={disabled}
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'TimeInput',
		render: ({ disabled, size }) => (
			<TimeInput
				disabled={disabled}
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'Select',
		render: ({ disabled, size }) => (
			<Select
				disabled={disabled}
				mode="single"
				optionLabel="label"
				options={SELECT_OPTIONS}
				optionValue="id"
				placeholder="Pick one"
				size={size}
			/>
		),
	},
	{
		category: 'Form',
		name: 'TagsInput',
		render: ({ disabled }) => (
			<TagsInput
				disabled={disabled}
				placeholder="Add a tag"
			/>
		),
	},
	{
		category: 'Form',
		name: 'Checkbox',
		render: ({ disabled }) => (
			<Checkbox
				defaultChecked
				disabled={disabled}
				label="Accept terms"
			/>
		),
	},
	{
		category: 'Form',
		name: 'Radio',
		render: ({ disabled }) => (
			<Radio.Group
				items={[
					{
						disabled,
						label: 'One',
						value: 'a',
					},
					{
						disabled,
						label: 'Two',
						value: 'b',
					},
				]}
			/>
		),
	},
	{
		category: 'Form',
		name: 'Switch',
		render: ({ disabled }) => (
			<Switch
				defaultChecked
				disabled={disabled}
			/>
		),
	},
	{
		category: 'Form',
		name: 'Slider',
		render: ({ disabled }) => (
			<Slider
				defaultValue={40}
				disabled={disabled}
				mode="single"
				orientation="horizontal"
			/>
		),
	},
	{
		category: 'Form',
		name: 'Rating',
		render: () => (
			<Rating
				readOnly
				value={3}
			/>
		),
	},
	{
		category: 'Form',
		name: 'Label',
		render: () => <Label>Field label</Label>,
	},
	{
		category: 'Form',
		name: 'Uploader',
		render: ({ disabled }) => (
			<Uploader
				disabled={disabled}
				// A playground has nowhere to put a file; the handler exists to show
				// the shape a real one returns.
				handler={async (fileName) => ({
					cdnUrl: `https://cdn.example.com/${fileName}`,
					expiresIn: 60,
					fields: {},
					key: fileName,
					upload: 'PUT' as never,
					url: 'https://example.com/upload',
				})}
			/>
		),
	},

	// ── Display ─────────────────────────────────────────────────────────────
	{
		category: 'Display',
		name: 'Button',
		render: ({ disabled, size }) => (
			<Flex gap="sm">
				<Button
					disabled={disabled}
					size={size}
				>
					Primary
				</Button>
				<Button
					disabled={disabled}
					size={size}
					variant="outline"
				>
					Outline
				</Button>
			</Flex>
		),
	},
	{
		category: 'Display',
		name: 'Badge',
		render: () => (
			<Flex gap="sm">
				<Badge>Default</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="destructive">Error</Badge>
			</Flex>
		),
	},
	{
		category: 'Display',
		name: 'Avatar',
		render: () => <Avatar alt="Tury Stack">TS</Avatar>,
	},
	{
		category: 'Display',
		name: 'Typography',
		render: () => (
			<div>
				<Typography
					component="h4"
					size="lg"
					weight="semibold"
				>
					Heading
				</Typography>
				<Typography variant="muted">Supporting copy</Typography>
			</div>
		),
	},
	{
		category: 'Display',
		name: 'Card',
		render: () => (
			<Card>
				<Card.Header>
					<Card.Title>Card</Card.Title>
					<Card.Description>With a header and a body.</Card.Description>
				</Card.Header>
				<Card.Content>
					<Typography variant="muted">Content sits here.</Typography>
				</Card.Content>
			</Card>
		),
	},
	{
		category: 'Display',
		name: 'Separator',
		render: () => (
			<div className="w-full">
				<span className="text-muted-foreground text-sm">Above</span>
				<Separator className="my-2" />
				<span className="text-muted-foreground text-sm">Below</span>
			</div>
		),
	},
	{
		category: 'Display',
		name: 'Table',
		render: () => (
			<Table
				columns={[
					{
						key: 'name',
						label: 'Name',
					},
					{
						key: 'role',
						label: 'Role',
					},
				]}
				itemKey="name"
				items={[
					{
						name: 'Ada',
						role: 'Engineer',
					},
					{
						name: 'Grace',
						role: 'Admiral',
					},
				]}
			/>
		),
	},
	{
		category: 'Display',
		name: 'List',
		render: () => (
			<List
				itemKey="id"
				items={[
					{
						id: '1',
						label: 'First',
					},
					{
						id: '2',
						label: 'Second',
					},
				]}
				renderItem={(item) => <span className="text-sm">{item.label}</span>}
			/>
		),
	},
	{
		category: 'Display',
		name: 'Tabs',
		render: () => (
			<Tabs defaultValue="one">
				<Tabs.List>
					<Tabs.Trigger value="one">One</Tabs.Trigger>
					<Tabs.Trigger value="two">Two</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="one">
					<span className="text-sm">First panel</span>
				</Tabs.Content>
				<Tabs.Content value="two">
					<span className="text-sm">Second panel</span>
				</Tabs.Content>
			</Tabs>
		),
	},
	{
		category: 'Display',
		name: 'Accordion',
		render: () => (
			<Accordion
				collapsible
				type="single"
			>
				<Accordion.Item value="one">
					<Accordion.Trigger>Section one</Accordion.Trigger>
					<Accordion.Content>Hidden until opened.</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		),
	},
	{
		category: 'Display',
		name: 'Breadcrumb',
		render: () => (
			<Breadcrumb>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="#">Home</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Playground</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb>
		),
	},
	{
		category: 'Display',
		name: 'Pagination',
		render: () => (
			<Pagination
				mode="offset"
				onPageChange={() => undefined}
				onRowsPerPageChange={() => undefined}
				page={2}
				rowsPerPage={10}
				total={100}
			/>
		),
	},
	{
		category: 'Display',
		name: 'Stepper',
		render: () => (
			<Stepper active={1}>
				<Stepper.Step label="Details" />
				<Stepper.Step label="Payment" />
				<Stepper.Step label="Done" />
			</Stepper>
		),
	},

	// ── Feedback ────────────────────────────────────────────────────────────
	{
		category: 'Feedback',
		name: 'Alert',
		render: () => (
			<Alert>
				<Alert.Title>Heads up</Alert.Title>
				<Alert.Description>Everything is where you left it.</Alert.Description>
			</Alert>
		),
	},
	{
		category: 'Feedback',
		name: 'Progress',
		render: () => <Progress value={60} />,
	},
	{
		category: 'Feedback',
		name: 'Loader',
		render: ({ size }) => <Loader size={size} />,
	},
	{
		category: 'Feedback',
		name: 'Skeleton',
		render: () => (
			<div className="w-full space-y-2">
				<Skeleton className="h-4 w-2/3" />
				<Skeleton className="h-4 w-1/2" />
			</div>
		),
	},
	{
		category: 'Feedback',
		name: 'LoadingOverlay',
		render: () => (
			<div className="relative h-20 w-full rounded-lg border border-border">
				<LoadingOverlay visible />
			</div>
		),
	},

	// ── Overlays ────────────────────────────────────────────────────────────
	{
		category: 'Overlays',
		name: 'Tooltip',
		render: ({ size }) => (
			<Tooltip content="A hint">
				<Button
					size={size}
					variant="outline"
				>
					Hover me
				</Button>
			</Tooltip>
		),
	},
	{
		category: 'Overlays',
		name: 'Popover',
		render: ({ size }) => (
			<Popover content={<span className="text-sm">Anchored content</span>}>
				<Button
					size={size}
					variant="outline"
				>
					Open popover
				</Button>
			</Popover>
		),
	},
	{
		category: 'Overlays',
		name: 'DropdownMenu',
		render: ({ size }) => (
			<DropdownMenu>
				<DropdownMenu.Trigger asChild>
					<Button
						size={size}
						variant="outline"
					>
						Open menu
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item>Edit</DropdownMenu.Item>
					<DropdownMenu.Item>Duplicate</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
		),
	},
	{
		category: 'Overlays',
		name: 'Modal',
		render: ({ size }) => <ModalDemo size={size} />,
	},
	{
		category: 'Overlays',
		name: 'Sheet',
		render: ({ size }) => <SheetDemo size={size} />,
	},

	// ── Layout ──────────────────────────────────────────────────────────────
	{
		category: 'Layout',
		name: 'Flex',
		render: () => (
			<Flex gap="sm">
				<Block>1</Block>
				<Block>2</Block>
				<Block>3</Block>
			</Flex>
		),
	},
	{
		category: 'Layout',
		name: 'Grid',
		render: () => (
			<Grid
				cols={3}
				gap="sm"
			>
				<Block>1</Block>
				<Block>2</Block>
				<Block>3</Block>
			</Grid>
		),
	},
	{
		category: 'Layout',
		name: 'Container',
		render: () => (
			<Container centered>
				<span className="text-muted-foreground text-sm">Centred content</span>
			</Container>
		),
	},
]

function Block({ children }: { children: ReactNode }) {
	return (
		<div className="rounded-md bg-secondary px-3 py-2 text-secondary-foreground text-sm">
			{children}
		</div>
	)
}

/** Overlays need a trigger that owns open state, so they get a small component. */
function ModalDemo({ size }: { size: SharedProps['size'] }) {
	const { off, on, value } = useDisclosure()

	return (
		<>
			<Button
				onClick={on}
				size={size}
				variant="outline"
			>
				Open modal
			</Button>
			<Modal
				onChange={(open) => (open ? on() : off())}
				open={value}
			>
				<Modal.Header>
					<Modal.Header.Title>Modal</Modal.Header.Title>
				</Modal.Header>
				<Modal.Body>
					<span className="text-sm">Anything can go in here.</span>
				</Modal.Body>
			</Modal>
		</>
	)
}

function SheetDemo({ size }: { size: SharedProps['size'] }) {
	const { off, on, value } = useDisclosure()

	return (
		<>
			<Button
				onClick={on}
				size={size}
				variant="outline"
			>
				Open sheet
			</Button>
			<Sheet
				onChange={(open) => (open ? on() : off())}
				open={value}
			>
				<Sheet.Header>
					<Sheet.Header.Title>Sheet</Sheet.Header.Title>
				</Sheet.Header>
				<Sheet.Body>
					<span className="text-sm">Slides in from the edge.</span>
				</Sheet.Body>
			</Sheet>
		</>
	)
}

const categoryCounts = DEMOS.reduce<Record<string, number>>((counts, demo) => {
	counts[demo.category] = (counts[demo.category] ?? 0) + 1
	return counts
}, {})

export const Route = createFileRoute('/libs/react-web/playground')({
	component: Page,
})

function Page() {
	const [query, setQuery] = useState('')
	const [category, setCategory] = useState<Category | 'all'>('all')
	const [size, setSize] = useState<SharedProps['size']>('md')
	const [disabled, setDisabled] = useState(false)

	const deferredQuery = useDeferredValue(query)
	const deferredCategory = useDeferredValue(category)

	const visible = useMemo(() => {
		const normalized = deferredQuery.trim().toLowerCase()

		return DEMOS.filter(
			(demo) =>
				(deferredCategory === 'all' || demo.category === deferredCategory) &&
				(!normalized || demo.name.toLowerCase().includes(normalized)),
		)
	}, [
		deferredCategory,
		deferredQuery,
	])

	const stale = deferredQuery !== query || deferredCategory !== category
	const shared: SharedProps = {
		disabled,
		size,
	}

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-6">
			<div className="shrink-0">
				<h1 className="font-bold font-display text-3xl tracking-tight">
					Playground
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Every component at once, live, sharing the props on the right.
				</p>
			</div>

			{/*
			 * Same shape as the icon playground: rows sized explicitly so the
			 * catalogue is the only thing that scrolls, and the search and filters
			 * stay put above it.
			 */}
			<div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_18rem] xl:grid-rows-1">
				<section className="flex h-full min-h-0 min-w-0 flex-col gap-4">
					<div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
						<div>
							<h2 className="font-display font-semibold text-xl">Components</h2>
							<p className="mt-1 text-muted-foreground text-sm">
								Showing {visible.length} of {DEMOS.length}
							</p>
						</div>
						<label className="block w-full sm:max-w-sm">
							<span className="sr-only">Search components</span>
							<input
								className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-lib"
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search by component name..."
								type="search"
								value={query}
							/>
						</label>
					</div>

					<div
						className="flex shrink-0 flex-wrap gap-1.5"
						data-testid="component-category-filter"
					>
						<CategoryChip
							active={category === 'all'}
							count={DEMOS.length}
							label="All"
							onSelect={() => setCategory('all')}
						/>
						{CATEGORIES.map((value) => (
							<CategoryChip
								active={category === value}
								count={categoryCounts[value] ?? 0}
								key={value}
								label={value}
								onSelect={() => setCategory(value)}
							/>
						))}
					</div>

					<div
						className={cn(
							'min-h-0 flex-1 overflow-y-auto rounded-lg border border-border transition-opacity',
							stale && 'opacity-60',
						)}
						data-testid="component-catalogue"
					>
						{visible.length === 0 ? (
							<p className="p-6 text-center text-muted-foreground text-sm">
								No components found.
							</p>
						) : (
							<div className="grid grid-cols-1 gap-3 p-3 lg:grid-cols-2 2xl:grid-cols-3">
								{visible.map((demo) => (
									<div
										className="flex min-h-40 flex-col gap-3 rounded-lg border border-border bg-card p-4"
										data-playground-component={demo.name}
										key={demo.name}
									>
										<div className="flex items-baseline justify-between gap-2">
											<code className="font-medium text-sm">{demo.name}</code>
											<span className="text-muted-foreground text-xs">
												{demo.category}
											</span>
										</div>
										<div className="flex flex-1 items-center">
											<div className="w-full">{demo.render(shared)}</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</section>

				<aside className="order-first h-full min-h-0 overflow-y-auto xl:order-last">
					<div
						className="space-y-5 border border-border bg-card p-5"
						data-testid="component-playground-controls"
					>
						<div className="flex items-start justify-between gap-4">
							<div>
								<h2 className="font-display font-semibold text-lg">
									Shared props
								</h2>
								<p className="mt-1 text-muted-foreground text-xs">
									Applied to every component that takes them.
								</p>
							</div>
							<button
								className="rounded-md bg-background/70 px-2.5 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-lib focus-visible:outline-offset-2"
								onClick={() => {
									setSize('md')
									setDisabled(false)
								}}
								type="button"
							>
								Reset
							</button>
						</div>

						<div className="space-y-2 border-border/60 border-t pt-4">
							<span className="font-medium text-sm">size</span>
							<div className="flex gap-1.5">
								{(
									[
										'sm',
										'md',
										'lg',
									] as const
								).map((value) => (
									<button
										className={cn(
											'flex-1 rounded-md border px-2 py-1.5 font-mono text-xs transition-colors',
											size === value
												? 'border-lib bg-lib/10 text-foreground'
												: 'border-border text-muted-foreground hover:text-foreground',
										)}
										key={value}
										onClick={() => setSize(value)}
										type="button"
									>
										{value}
									</button>
								))}
							</div>
						</div>

						<div className="flex items-center justify-between gap-4 border-border/60 border-t pt-4">
							<div>
								<label
									className="font-medium text-sm"
									htmlFor="component-playground-disabled"
								>
									disabled
								</label>
								<p className="mt-0.5 text-muted-foreground text-xs">
									Only where the component supports it.
								</p>
							</div>
							<input
								checked={disabled}
								className="h-4 w-4 accent-[var(--lib-accent)]"
								id="component-playground-disabled"
								onChange={(event) => setDisabled(event.target.checked)}
								type="checkbox"
							/>
						</div>

						<p className="border-border/60 border-t pt-4 text-muted-foreground text-xs">
							<code className="text-lib">variant</code> stays with each demo: it
							means something different on a Button than on a Badge, so a single
							global control would be lying about the API.
						</p>
					</div>
				</aside>
			</div>
		</div>
	)
}

type CategoryChipProps = {
	active: boolean
	count: number
	label: string
	onSelect: () => void
}

function CategoryChip({ active, count, label, onSelect }: CategoryChipProps) {
	return (
		<button
			aria-pressed={active}
			className={cn(
				'whitespace-nowrap rounded-full border px-2.5 py-1 font-medium text-xs transition-colors focus-visible:outline-2 focus-visible:outline-lib focus-visible:outline-offset-2',
				active
					? 'border-lib bg-lib/10 text-foreground'
					: 'border-border text-muted-foreground hover:border-lib/50 hover:text-foreground',
			)}
			onClick={onSelect}
			type="button"
		>
			{label}
			<span className="ml-1.5 text-muted-foreground tabular-nums">{count}</span>
		</button>
	)
}
