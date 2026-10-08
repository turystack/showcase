import {
	BriefcaseIcon,
	ChevronDownIcon,
	Columns2Icon,
	DownloadIcon,
	EllipsisIcon,
	LayoutGridIcon,
	ListIcon,
	MailIcon,
	PencilIcon,
	PhoneIcon,
	PlusIcon,
	Trash2Icon,
	UploadIcon,
	UserRoundIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	type BadgeVariant,
	Board,
	Box,
	BulkActions,
	Button,
	Card,
	DateText,
	DescriptionList,
	DropdownMenu,
	Flex,
	Layout,
	List,
	MoneyText,
	Page,
	Search,
	SegmentedControl,
	Select,
	Table,
	type TableColumns,
	Timeline,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import {
	ACTIVITIES,
	DEALS,
	type Deal,
	type DealStage,
	STAGES,
	stageLabel,
} from './crm-data'
import { CrmShell } from './crm-shell'

/**
 * The object home of Deals: one collection, shown three ways.
 *
 * The CRM list view names its saved view in the title ("All open deals ▾") —
 * the view is what the page is, so switching it is where the title is.
 * `table` is the dense list with row selection; selecting rows swaps the
 * toolbar for a selection bar, because filtering while holding a selection is
 * how people bulk-edit rows they can no longer see. `split` keeps the list
 * beside the open record. `kanban` is the pipeline board, one column a stage.
 */
export type MainPageVariant = 'table' | 'split' | 'kanban'

const STAGE_BADGE: Record<DealStage, BadgeVariant> = {
	'closed-won': 'success',
	negotiation: 'warning',
	proposal: 'purple',
	prospecting: 'secondary',
	qualification: 'info',
}

export function StageBadge({ stage }: { stage: DealStage }) {
	return (
		<Badge
			size="sm"
			variant={STAGE_BADGE[stage]}
		>
			{stageLabel(stage)}
		</Badge>
	)
}

export function initialsOf(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.slice(0, 2)
		.join('')
}

export function Owner({ name }: { name: string }) {
	return (
		<Flex
			align="center"
			gap="xs"
		>
			<Avatar
				alt=""
				size="sm"
			>
				{initialsOf(name)}
			</Avatar>
			<Typography size="sm">{name}</Typography>
		</Flex>
	)
}

const VIEWS = [
	'All open deals',
	'My open deals',
	'Closing this month',
	'Won this quarter',
]

/** The saved view, named in the title and switched from it. */
export function ViewSwitcher({ view = VIEWS[0] }: { view?: string }) {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					rightSection={<ChevronDownIcon size={16} />}
					size="lg"
					variant="ghost"
				>
					<Typography
						size="xl"
						variant="inherit"
						weight="semibold"
					>
						{view}
					</Typography>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="start"
				width={240}
			>
				<DropdownMenu.Label>Saved views</DropdownMenu.Label>
				<DropdownMenu.RadioGroup value={view}>
					{VIEWS.map((item) => (
						<DropdownMenu.RadioItem
							key={item}
							value={item}
						>
							{item}
						</DropdownMenu.RadioItem>
					))}
				</DropdownMenu.RadioGroup>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<PlusIcon size={16} />
					New view
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<PencilIcon size={16} />
					Rename this view
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

const DISPLAYS = [
	{
		icon: <ListIcon size={14} />,
		id: 'table',
		label: 'Table',
	},
	{
		icon: <Columns2Icon size={14} />,
		id: 'split',
		label: 'Split',
	},
	{
		icon: <LayoutGridIcon size={14} />,
		id: 'kanban',
		label: 'Kanban',
	},
]

/** "Display as": the same view as a table, a split view or a board. */
export function DisplayAs({ value }: { value: MainPageVariant }) {
	return (
		<SegmentedControl
			ariaLabel="Display as"
			optionIcon="icon"
			optionLabel="label"
			options={DISPLAYS}
			optionValue="id"
			size="sm"
			value={value}
		/>
	)
}

export function DealsHeader({
	count = DEALS.length,
	display,
	view,
}: {
	count?: number
	display: MainPageVariant
	view?: string
}) {
	return (
		<Page.Header
			action={
				<Flex
					align="center"
					gap="sm"
				>
					<DisplayAs value={display} />
					<Button
						leftSection={<UploadIcon size={16} />}
						variant="outline"
					>
						Import
					</Button>
					<Button leftSection={<PlusIcon size={16} />}>New deal</Button>
				</Flex>
			}
			breadcrumbs={[
				{
					href: '#deals',
					label: 'Deals',
				},
			]}
			description={`${count} deals · sorted by close date · updated a minute ago`}
			title={<ViewSwitcher view={view} />}
		/>
	)
}

const OWNERS = Array.from(new Set(DEALS.map((deal) => deal.owner))).map(
	(name) => ({
		name,
	}),
)

/** The list's own filters: the query, then the two fields people filter by. */
export function DealsFilters() {
	const [value, setValue] = useState<{
		owner: string | null
		stage: string | null
	}>({
		owner: null,
		stage: null,
	})

	return (
		<Search
			filter={{
				placeholder: 'Search this list…',
			}}
			items={[
				{
					field: (
						<Select
							ariaLabel="Owner"
							mode="single"
							onChange={(owner) =>
								setValue((current) => ({
									...current,
									owner,
								}))
							}
							optionLabel="name"
							options={OWNERS}
							optionValue="name"
							placeholder="Owner"
							size="sm"
							value={value.owner}
						/>
					),
					id: 'owner',
				},
				{
					field: (
						<Select
							ariaLabel="Stage"
							mode="single"
							onChange={(stage) =>
								setValue((current) => ({
									...current,
									stage,
								}))
							}
							optionLabel="label"
							options={STAGES}
							optionValue="id"
							placeholder="Stage"
							size="sm"
							value={value.stage}
						/>
					),
					id: 'stage',
				},
			]}
			onReset={() =>
				setValue({
					owner: null,
					stage: null,
				})
			}
			value={value}
		/>
	)
}

/**
 * The bar that takes the toolbar's place while rows are selected: the same
 * BulkActions a floating bar uses, drawn in the page's flow. It says how many,
 * offers the whole list, and holds what can be done to the selection.
 */
export function SelectionBar({
	onClear,
	selection,
}: {
	onClear: () => void
	selection: string[]
}) {
	return (
		<BulkActions
			actions={[
				{
					icon: <UserRoundIcon size={16} />,
					id: 'owner',
					label: 'Change owner',
					onRun: () => undefined,
					variant: 'outline',
				},
				{
					icon: <PencilIcon size={16} />,
					id: 'stage',
					label: 'Edit stage',
					onRun: () => undefined,
					variant: 'outline',
				},
				{
					icon: <DownloadIcon size={16} />,
					id: 'export',
					label: 'Export',
					onRun: () => undefined,
					variant: 'outline',
				},
				{
					confirm: (keys) => ({
						confirmProps: {
							variant: 'destructive',
						},
						confirmText: `Delete ${keys.length} deals`,
						description:
							'The deals, their activity and their files are deleted. This cannot be undone.',
						title: `Delete ${keys.length} deals?`,
					}),
					icon: <Trash2Icon size={16} />,
					id: 'delete',
					label: 'Delete',
					onRun: () => undefined,
					variant: 'destructive',
				},
			]}
			extra={
				<Button
					size="sm"
					variant="link"
				>
					Select all {DEALS.length}
				</Button>
			}
			maxVisible={4}
			onClear={onClear}
			placement="inline"
			selection={selection}
		/>
	)
}

function RowActions({ deal }: { deal: Deal }) {
	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`Actions for ${deal.name}`}
					size="icon-sm"
					variant="ghost"
				>
					<EllipsisIcon size={16} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item>
					<PencilIcon size={16} />
					Edit
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<UserRoundIcon size={16} />
					Change owner
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item variant="destructive">
					<Trash2Icon size={16} />
					Delete
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

export const DEAL_COLUMNS: TableColumns<Deal> = [
	{
		key: 'name',
		label: 'Deal name',
		selector: (deal) => (
			<Button
				size="sm"
				variant="link"
			>
				{deal.name}
			</Button>
		),
		sorter: true,
		width: 280,
	},
	{
		key: 'account',
		label: 'Company',
		selector: (deal) => <Typography size="sm">{deal.account}</Typography>,
		width: 190,
	},
	{
		key: 'stage',
		label: 'Stage',
		selector: (deal) => <StageBadge stage={deal.stage} />,
		width: 120,
	},
	{
		align: 'right',
		key: 'amount',
		label: 'Amount',
		selector: (deal) => (
			<MoneyText
				currency="brl"
				size="inherit"
				value={deal.amount}
			/>
		),
		sorter: true,
		width: 130,
	},
	{
		key: 'closeDate',
		label: 'Close date',
		selector: (deal) => (
			<DateText
				size="inherit"
				value={deal.closeDate}
			/>
		),
		sorter: true,
		width: 120,
	},
	{
		key: 'owner',
		label: 'Owner',
		selector: (deal) => <Owner name={deal.owner} />,
		width: 170,
	},
	{
		align: 'center',
		fixedWidth: true,
		key: 'actions',
		selector: (deal) => <RowActions deal={deal} />,
		sticky: 'right',
		width: 56,
	},
]

/* ─── Table ─────────────────────────────────────────────────────────────── */

export function DealsTableView({
	defaultSelected = [],
}: {
	defaultSelected?: string[]
}) {
	const [selected, setSelected] = useState<string[]>(defaultSelected)
	const [page, setPage] = useState(1)
	const [rows, setRows] = useState(10)

	return (
		<Page>
			<DealsHeader display="table" />
			<Page.Toolbar>
				{selected.length > 0 ? (
					<SelectionBar
						onClear={() => setSelected([])}
						selection={selected}
					/>
				) : (
					<DealsFilters />
				)}
			</Page.Toolbar>
			<Page.Content>
				<Table
					columns={DEAL_COLUMNS}
					density="compact"
					itemKey="id"
					items={DEALS}
					onSelectionChange={setSelected}
					pagination={{
						mode: 'offset',
						onPageChange: setPage,
						onRowsPerPageChange: setRows,
						page,
						rowsPerPage: rows,
						total: 48,
					}}
					rowName={(deal) => deal.name}
					selectedKeys={selected}
					selection="multiple"
					sort="closeDate"
				/>
			</Page.Content>
		</Page>
	)
}

/* ─── Split ─────────────────────────────────────────────────────────────── */

const KIND_ICON = {
	call: <PhoneIcon size={14} />,
	email: <MailIcon size={14} />,
}

function SplitView() {
	const [openId, setOpenId] = useState<string>(DEALS[0]?.id ?? '')
	const deal = DEALS.find((item) => item.id === openId) ?? DEALS[0]
	if (!deal) {
		return null
	}
	const history = ACTIVITIES.filter((item) => item.record === deal.name)

	return (
		<>
			<Layout.Content
				padding="sm"
				span={2}
			>
				<Flex
					align="stretch"
					direction="col"
					gap="sm"
				>
					<Flex
						align="center"
						justify="between"
					>
						<ViewSwitcher />
						<DisplayAs value="split" />
					</Flex>
					<Typography
						size="xs"
						variant="muted"
					>
						{DEALS.length} deals · sorted by close date
					</Typography>
					{/*
					  The row is the control: a click, Enter or Space opens the deal on
					  the right. The open row is marked by `activeKey`, not by selection.
					*/}
					<List
						activeKey={openId}
						gap="xs"
						itemKey="id"
						items={DEALS}
						onItemClick={(item) => setOpenId(item.id)}
						renderItem={(item) => (
							<Box
								paddingX="sm"
								paddingY="xs"
							>
								<Flex
									align="stretch"
									direction="col"
									gap="none"
								>
									<Flex
										align="center"
										gap="sm"
										justify="between"
									>
										<Typography
											size="sm"
											truncate
											weight="medium"
										>
											{item.name}
										</Typography>
										<MoneyText
											currency="brl"
											size="sm"
											value={item.amount}
											variant="compact"
										/>
									</Flex>
									<Flex
										align="center"
										gap="sm"
										justify="between"
									>
										<Typography
											size="xs"
											truncate
											variant="muted"
										>
											{item.account}
										</Typography>
										<StageBadge stage={item.stage} />
									</Flex>
								</Flex>
							</Box>
						)}
					/>
				</Flex>
			</Layout.Content>
			<Layout.Content
				bg="muted"
				span={3}
			>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<Page.Header
						action={
							<Flex
								align="center"
								gap="sm"
							>
								<Button variant="outline">Edit</Button>
								<Button>Log activity</Button>
							</Flex>
						}
						breadcrumbs={[
							{
								href: '#deals',
								label: 'Deals',
							},
							{
								label: deal.id,
							},
						]}
						description={deal.account}
						icon={<BriefcaseIcon size={18} />}
						title={deal.name}
					/>
					<Card>
						<Card.Content>
							<DescriptionList
								columns={3}
								items={[
									{
										label: 'Amount',
										value: (
											<MoneyText
												currency="brl"
												size="inherit"
												value={deal.amount}
											/>
										),
									},
									{
										label: 'Close date',
										value: (
											<DateText
												size="inherit"
												value={deal.closeDate}
											/>
										),
									},
									{
										label: 'Stage',
										value: <StageBadge stage={deal.stage} />,
									},
									{
										label: 'Owner',
										value: <Owner name={deal.owner} />,
									},
									{
										label: 'Primary contact',
										value: deal.contact,
									},
									{
										label: 'Probability',
										value: `${deal.probability}%`,
									},
								]}
							/>
						</Card.Content>
					</Card>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Activity</Card.Title>
						</Card.Header>
						<Card.Content>
							{history.length > 0 ? (
								<Timeline compact>
									{history.map((item) => (
										<Timeline.Item
											icon={
												KIND_ICON[item.kind as keyof typeof KIND_ICON] ??
												undefined
											}
											key={item.id}
											meta={
												<DateText
													inheritColor
													size="inherit"
													value={item.at}
													variant="dateTime"
												/>
											}
											status="done"
											title={item.title}
										>
											<Typography
												size="sm"
												variant="muted"
											>
												{item.detail}
											</Typography>
										</Timeline.Item>
									))}
								</Timeline>
							) : (
								<Typography
									size="sm"
									variant="muted"
								>
									No activity logged on this deal yet.
								</Typography>
							)}
						</Card.Content>
					</Card>
				</Flex>
			</Layout.Content>
		</>
	)
}

/* ─── Kanban ────────────────────────────────────────────────────────────── */

function DealCard({ deal }: { deal: Deal }) {
	return (
		<Card size="sm">
			<Card.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="xs"
				>
					<Flex>
						<Button
							href={`#${deal.id}`}
							size="sm"
							variant="link"
						>
							{deal.name}
						</Button>
					</Flex>
					<Typography
						size="xs"
						truncate
						variant="muted"
					>
						{deal.account}
					</Typography>
					<Flex
						align="center"
						gap="xs"
						justify="between"
					>
						<MoneyText
							currency="brl"
							size="sm"
							value={deal.amount}
							variant="compact"
							weight="semibold"
						/>
						<Avatar
							alt={deal.owner}
							size="sm"
						>
							{initialsOf(deal.owner)}
						</Avatar>
					</Flex>
					<Typography
						size="xs"
						variant="muted"
					>
						Closes{' '}
						<DateText
							inheritColor
							size="inherit"
							value={deal.closeDate}
						/>
					</Typography>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/**
 * The pipeline board: a column a stage, its count and its sum in the header,
 * cards that move between stages by drag and drop or by keyboard.
 */
function KanbanBoard() {
	const [deals, setDeals] = useState<Deal[]>(DEALS)

	const move = (id: string, stage: string, index: number) => {
		setDeals((current) => {
			const deal = current.find((item) => item.id === id)
			if (!deal) {
				return current
			}
			const rest = current.filter((item) => item.id !== id)
			const moved = {
				...deal,
				stage: stage as DealStage,
			}
			const before = rest.filter((item) => item.stage === stage)[index]
			const at = before ? rest.indexOf(before) : rest.length
			return [
				...rest.slice(0, at),
				moved,
				...rest.slice(at),
			]
		})
	}

	return (
		<Page>
			<DealsHeader display="kanban" />
			<Page.Toolbar>
				<DealsFilters />
			</Page.Toolbar>
			<Page.Content>
				<Board
					addLabel="Add deal"
					ariaLabel="Deals pipeline"
					columnOf={(deal) => deal.stage}
					columns={STAGES.map((stage) => ({
						id: stage.id,
						label: stage.label,
						summary: (
							<MoneyText
								currency="brl"
								inheritColor
								size="inherit"
								value={deals
									.filter((deal) => deal.stage === stage.id)
									.reduce((sum, deal) => sum + deal.amount, 0)}
								variant="compact"
							/>
						),
					}))}
					columnWidth="sm"
					itemKey="id"
					items={deals}
					onAdd={() => undefined}
					onMove={move}
					renderCard={(deal) => <DealCard deal={deal} />}
				/>
			</Page.Content>
		</Page>
	)
}

export function MainPage({ variant }: { variant: MainPageVariant }) {
	let content: ReactNode
	if (variant === 'split') {
		content = <SplitView />
	} else if (variant === 'kanban') {
		content = (
			<Layout.Content>
				<KanbanBoard />
			</Layout.Content>
		)
	} else {
		content = (
			<Layout.Content>
				<DealsTableView
					defaultSelected={[
						'D-1039',
						'D-1036',
					]}
				/>
			</Layout.Content>
		)
	}

	return <CrmShell active="deals">{content}</CrmShell>
}
