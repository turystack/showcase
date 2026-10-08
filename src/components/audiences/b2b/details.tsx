import {
	BriefcaseIcon,
	Building2Icon,
	CalendarPlusIcon,
	CheckIcon,
	EllipsisIcon,
	FileTextIcon,
	ListTodoIcon,
	MailIcon,
	NotebookIcon,
	PaperclipIcon,
	PencilIcon,
	PhoneIcon,
	StarIcon,
	Trash2Icon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Button,
	Card,
	DateText,
	DescriptionList,
	DropdownMenu,
	EmptyState,
	Flex,
	Grid,
	Layout,
	List,
	MoneyText,
	Page,
	Sheet,
	Stepper,
	Table,
	Tabs,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import { Composer } from './activity'
import {
	DEAL_HISTORY,
	type Deal,
	FOCUS_DEAL,
	STAGES,
	stageIndex,
} from './crm-data'
import { CrmShell } from './crm-shell'
import { KIND_ICON } from './dashboard'
import { DealsTableView, Owner, StageBadge } from './main-page'

/**
 * Reading one record, the CRM record page.
 *
 * Every variant opens the same way: a header with up to four highlighted
 * fields — the ones a seller checks before a call — and the Path, the stage
 * progression with the one action that moves it. `page-horizontal-tabs` is the
 * classic CRM record home: Details and Related as tabs on the left, activity in
 * a column on the right. `three-column` is the other common one: the record's properties
 * on the left, tabs in the middle, associated records on the right. `page` is
 * the same record without tabs, every section stacked. `preview-panel` is the
 * quick look — the list stays put and the record opens in a side panel.
 */
export type DetailsVariant =
	| 'page-horizontal-tabs'
	| 'three-column'
	| 'page'
	| 'preview-panel'

const deal = FOCUS_DEAL

const CONTACTS = [
	{
		email: 'rafael.menezes@northwind.example',
		id: 'c1',
		name: 'Rafael Menezes',
		role: 'Decision maker',
		title: 'Head of Operations',
	},
	{
		email: 'luiza.campos@northwind.example',
		id: 'c2',
		name: 'Luiza Campos',
		role: 'Economic buyer',
		title: 'CFO',
	},
	{
		email: 'tiago.nunes@northwind.example',
		id: 'c3',
		name: 'Tiago Nunes',
		role: 'Technical evaluator',
		title: 'IT Manager',
	},
]

function initials(name: string) {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
}

/* ─── Header, highlights and path ───────────────────────────────────────── */

export function RecordHeader({ record = deal }: { record?: Deal }) {
	return (
		<Page.Header
			action={
				<Flex
					align="center"
					gap="sm"
				>
					<Button
						leftSection={<StarIcon size={16} />}
						variant="outline"
					>
						Follow
					</Button>
					<Button
						leftSection={<PencilIcon size={16} />}
						variant="outline"
					>
						Edit
					</Button>
					<DropdownMenu>
						<DropdownMenu.Trigger asChild>
							<Button
								ariaLabel="More actions"
								size="icon-md"
								variant="outline"
							>
								<EllipsisIcon size={16} />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item>Clone</DropdownMenu.Item>
							<DropdownMenu.Item>Change owner</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item variant="destructive">
								<Trash2Icon size={16} />
								Delete
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu>
				</Flex>
			}
			breadcrumbs={[
				{
					href: '#deals',
					label: 'Deals',
				},
				{
					label: record.id,
				},
			]}
			description={`${record.account} · ${record.contact}`}
			icon={<BriefcaseIcon size={18} />}
			title={record.name}
		/>
	)
}

function Highlight({ label, value }: { label: string; value: ReactNode }) {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="xs"
		>
			<Typography
				size="xs"
				variant="muted"
			>
				{label}
			</Typography>
			<Typography
				component="div"
				size="sm"
				weight="semibold"
			>
				{value}
			</Typography>
		</Flex>
	)
}

/** The four fields a seller checks first, in a row under the title. */
export function Highlights({ record = deal }: { record?: Deal }) {
	return (
		<Grid
			cols={4}
			gap="md"
		>
			<Highlight
				label="Amount"
				value={
					<MoneyText
						currency="brl"
						size="inherit"
						value={record.amount}
					/>
				}
			/>
			<Highlight
				label="Close date"
				value={
					<DateText
						size="inherit"
						value={record.closeDate}
					/>
				}
			/>
			<Highlight
				label="Stage"
				value={<StageBadge stage={record.stage} />}
			/>
			<Highlight
				label="Owner"
				value={<Owner name={record.owner} />}
			/>
		</Grid>
	)
}

/**
 * The Path: where the deal is in the pipeline, and the action that moves it on
 * — chevron stages, the current one filled, the passed ones
 * checked.
 */
export function Path({ record = deal }: { record?: Deal }) {
	return (
		<Card size="sm">
			<Card.Content>
				<Flex
					align="center"
					gap="md"
					justify="between"
				>
					<Stepper
						active={stageIndex(record.stage)}
						variant="path"
					>
						{STAGES.map((stage) => (
							<Stepper.Step
								key={stage.id}
								label={stage.label}
							/>
						))}
					</Stepper>
					<Button
						leftSection={<CheckIcon size={16} />}
						size="sm"
					>
						Mark stage as complete
					</Button>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/* ─── Body parts ────────────────────────────────────────────────────────── */

function DetailsSection() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Card>
				<Card.Header bordered>
					<Card.Title headingLevel={2}>About this deal</Card.Title>
				</Card.Header>
				<Card.Content>
					<DescriptionList
						columns={2}
						dividers
						items={[
							{
								label: 'Deal name',
								value: deal.name,
							},
							{
								label: 'Company',
								value: deal.account,
							},
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
								label: 'Probability',
								value: `${deal.probability}%`,
							},
							{
								label: 'Expected close',
								value: (
									<DateText
										size="inherit"
										value={deal.closeDate}
									/>
								),
							},
							{
								label: 'Deal type',
								value: 'New business',
							},
							{
								copyable: true,
								label: 'Deal ID',
								value: deal.id,
							},
							{
								label: 'Lead source',
								value: 'Webinar — Logistics 2026',
							},
						]}
					/>
				</Card.Content>
			</Card>
			<Card>
				<Card.Header bordered>
					<Card.Title headingLevel={2}>Additional information</Card.Title>
				</Card.Header>
				<Card.Content>
					<DescriptionList
						columns={2}
						dividers
						items={[
							{
								label: 'Next step',
								value: 'Call with procurement, week of 29 Sep',
							},
							{
								label: 'Competitor',
								value: 'Rota Fleet',
							},
							{
								label: 'Description',
								value:
									'120 driver seats on the annual plan, with a 12-month ramp from 60 seats.',
							},
							{
								label: 'Loss reason',
								value: null,
							},
						]}
					/>
				</Card.Content>
			</Card>
		</Flex>
	)
}

function ContactsCard() {
	return (
		<Card>
			<Card.Header bordered>
				<Flex
					align="center"
					justify="between"
				>
					<Card.Title headingLevel={2}>Contacts (3)</Card.Title>
					<Button
						size="sm"
						variant="outline"
					>
						Add contact
					</Button>
				</Flex>
			</Card.Header>
			<Card.Content>
				<Table
					columns={[
						{
							key: 'name',
							label: 'Name',
							selector: (contact) => (
								<Button
									size="sm"
									variant="link"
								>
									{contact.name}
								</Button>
							),
							width: 200,
						},
						{
							key: 'title',
							label: 'Title',
							width: 200,
						},
						{
							key: 'role',
							label: 'Role',
							selector: (contact) => (
								<Badge
									size="sm"
									variant="outline"
								>
									{contact.role}
								</Badge>
							),
							width: 200,
						},
					]}
					density="compact"
					itemKey="id"
					items={CONTACTS}
				/>
			</Card.Content>
		</Card>
	)
}

function RelatedSection() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<ContactsCard />
			<Card>
				<Card.Header bordered>
					<Flex
						align="center"
						justify="between"
					>
						<Card.Title headingLevel={2}>Quotes (0)</Card.Title>
						<Button
							size="sm"
							variant="outline"
						>
							New quote
						</Button>
					</Flex>
				</Card.Header>
				<Card.Content>
					<EmptyState
						bordered="dashed"
						description="Quotes sent from this deal appear here."
						headingLevel={3}
						icon={<FileTextIcon size={20} />}
						size="sm"
						title="No quotes yet"
					/>
				</Card.Content>
			</Card>
			<Card>
				<Card.Header bordered>
					<Card.Title headingLevel={2}>Files (2)</Card.Title>
				</Card.Header>
				<Card.Content>
					<List
						divided
						itemKey="name"
						items={[
							{
								meta: 'PDF · 412 KB · 25 Sep',
								name: 'Northwind proposal v3.pdf',
							},
							{
								meta: 'XLSX · 38 KB · 17 Sep',
								name: 'Seat ramp model.xlsx',
							},
						]}
						renderItem={(file) => (
							<Flex
								align="center"
								gap="sm"
							>
								<PaperclipIcon size={16} />
								<Flex
									align="stretch"
									direction="col"
									gap="none"
								>
									<Typography
										size="sm"
										weight="medium"
									>
										{file.name}
									</Typography>
									<Typography
										size="xs"
										variant="muted"
									>
										{file.meta}
									</Typography>
								</Flex>
							</Flex>
						)}
					/>
				</Card.Content>
			</Card>
		</Flex>
	)
}

/** The recent history, compact, for a side column or a preview. */
export function RecentActivity({ limit = 4 }: { limit?: number }) {
	return (
		<List
			divided
			itemKey="id"
			items={DEAL_HISTORY.slice(0, limit)}
			renderItem={(item) => (
				<Flex
					align="start"
					gap="sm"
				>
					{KIND_ICON[item.kind]}
					<Flex
						align="stretch"
						direction="col"
						gap="none"
					>
						<Typography
							size="sm"
							weight="medium"
						>
							{item.title}
						</Typography>
						<Typography
							size="xs"
							variant="muted"
						>
							<DateText
								inheritColor
								size="inherit"
								value={item.at}
								variant="dateTime"
							/>{' '}
							· {item.by}
						</Typography>
						<Typography
							size="sm"
							variant="muted"
						>
							{item.detail}
						</Typography>
					</Flex>
				</Flex>
			)}
		/>
	)
}

function ActivityColumn() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Composer compact />
			<Card>
				<Card.Header bordered>
					<Flex
						align="center"
						justify="between"
					>
						<Card.Title headingLevel={2}>Activity</Card.Title>
						<Button
							size="sm"
							variant="link"
						>
							View all
						</Button>
					</Flex>
				</Card.Header>
				<Card.Content>
					<RecentActivity />
				</Card.Content>
			</Card>
		</Flex>
	)
}

/* ─── Variants ──────────────────────────────────────────────────────────── */

function RecordHome() {
	const [tab, setTab] = useState('details')

	return (
		<Page>
			<RecordHeader />
			<Highlights />
			<Path />
			<Page.Content>
				<Grid
					cols={3}
					gap="md"
				>
					<Grid.Item span={2}>
						<Tabs
							justified={false}
							onChange={setTab}
							value={tab}
						>
							<Tabs.List
								ariaLabel="Record sections"
								justified={false}
							>
								<Tabs.Trigger value="details">Details</Tabs.Trigger>
								<Tabs.Trigger value="related">Related</Tabs.Trigger>
							</Tabs.List>
							<Tabs.Content value="details">
								<DetailsSection />
							</Tabs.Content>
							<Tabs.Content value="related">
								<RelatedSection />
							</Tabs.Content>
						</Tabs>
					</Grid.Item>
					<ActivityColumn />
				</Grid>
			</Page.Content>
		</Page>
	)
}

function QuickActions() {
	const actions = [
		{
			icon: <NotebookIcon size={16} />,
			label: 'Note',
		},
		{
			icon: <MailIcon size={16} />,
			label: 'Email',
		},
		{
			icon: <PhoneIcon size={16} />,
			label: 'Call',
		},
		{
			icon: <ListTodoIcon size={16} />,
			label: 'Task',
		},
		{
			icon: <CalendarPlusIcon size={16} />,
			label: 'Meeting',
		},
	]

	return (
		<Flex
			gap="xs"
			justify="between"
		>
			{actions.map((action) => (
				<Flex
					align="center"
					direction="col"
					gap="xs"
					key={action.label}
				>
					<Button
						ariaLabel={action.label}
						size="icon-md"
						variant="outline"
					>
						{action.icon}
					</Button>
					<Typography
						size="xs"
						variant="muted"
					>
						{action.label}
					</Typography>
				</Flex>
			))}
		</Flex>
	)
}

function AssociationCard({
	children,
	count,
	title,
}: {
	children: ReactNode
	count: number
	title: string
}) {
	return (
		<Card size="sm">
			<Card.Header>
				<Flex
					align="center"
					justify="between"
				>
					<Card.Title headingLevel={2}>
						{title} ({count})
					</Card.Title>
					<Button
						size="sm"
						variant="link"
					>
						+ Add
					</Button>
				</Flex>
			</Card.Header>
			<Card.Content>{children}</Card.Content>
		</Card>
	)
}

function ThreeColumn() {
	const [tab, setTab] = useState('overview')

	return (
		<Grid
			cols={12}
			gap="md"
		>
			<Grid.Item span={3}>
				<Card>
					<Card.Content>
						<Flex
							align="stretch"
							direction="col"
							gap="md"
						>
							<Flex
								align="center"
								direction="col"
								gap="sm"
							>
								<Avatar
									alt=""
									size="lg"
									variant="square"
								>
									<BriefcaseIcon size={20} />
								</Avatar>
								<Typography
									align="center"
									component="h1"
									size="lg"
									weight="semibold"
								>
									{deal.name}
								</Typography>
								<Typography
									size="sm"
									variant="muted"
								>
									<MoneyText
										currency="brl"
										inheritColor
										size="inherit"
										value={deal.amount}
									/>{' '}
									· closes{' '}
									<DateText
										inheritColor
										size="inherit"
										value={deal.closeDate}
									/>
								</Typography>
								<StageBadge stage={deal.stage} />
							</Flex>
							<QuickActions />
							<Typography
								component="h2"
								size="sm"
								weight="semibold"
							>
								About this deal
							</Typography>
							<DescriptionList
								items={[
									{
										label: 'Deal owner',
										value: <Owner name={deal.owner} />,
									},
									{
										label: 'Pipeline',
										value: 'Sales pipeline',
									},
									{
										label: 'Deal type',
										value: 'New business',
									},
									{
										label: 'Probability',
										value: `${deal.probability}%`,
									},
									{
										label: 'Lead source',
										value: 'Webinar — Logistics 2026',
									},
									{
										copyable: true,
										label: 'Deal ID',
										value: deal.id,
									},
								]}
							/>
						</Flex>
					</Card.Content>
				</Card>
			</Grid.Item>
			<Grid.Item span={6}>
				<Tabs
					justified={false}
					onChange={setTab}
					value={tab}
				>
					<Tabs.List
						ariaLabel="Deal sections"
						justified={false}
					>
						<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
						<Tabs.Trigger value="activities">Activities</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="overview">
						<Flex
							align="stretch"
							direction="col"
							gap="md"
						>
							<Card>
								<Card.Header>
									<Card.Title headingLevel={2}>Data highlights</Card.Title>
								</Card.Header>
								<Card.Content>
									<Highlights />
								</Card.Content>
							</Card>
							<Path />
							<Card>
								<Card.Header bordered>
									<Card.Title headingLevel={2}>Recent activity</Card.Title>
								</Card.Header>
								<Card.Content>
									<RecentActivity limit={3} />
								</Card.Content>
							</Card>
						</Flex>
					</Tabs.Content>
					<Tabs.Content value="activities">
						<Card>
							<Card.Content>
								<RecentActivity limit={6} />
							</Card.Content>
						</Card>
					</Tabs.Content>
				</Tabs>
			</Grid.Item>
			<Grid.Item span={3}>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<AssociationCard
						count={1}
						title="Company"
					>
						<Flex
							align="center"
							gap="sm"
						>
							<Avatar
								alt=""
								size="sm"
								variant="square"
							>
								<Building2Icon size={14} />
							</Avatar>
							<Flex
								align="stretch"
								direction="col"
								gap="none"
							>
								<Typography
									size="sm"
									weight="medium"
								>
									{deal.account}
								</Typography>
								<Typography
									size="xs"
									variant="muted"
								>
									northwind.example · São Paulo
								</Typography>
							</Flex>
						</Flex>
					</AssociationCard>
					<AssociationCard
						count={CONTACTS.length}
						title="Contacts"
					>
						<List
							divided
							itemKey="id"
							items={CONTACTS}
							renderItem={(contact) => (
								<Flex
									align="center"
									gap="sm"
								>
									<Avatar
										alt=""
										size="sm"
									>
										{initials(contact.name)}
									</Avatar>
									<Flex
										align="stretch"
										direction="col"
										gap="none"
									>
										<Typography
											size="sm"
											weight="medium"
										>
											{contact.name}
										</Typography>
										<Typography
											size="xs"
											variant="muted"
										>
											{contact.title}
										</Typography>
									</Flex>
								</Flex>
							)}
						/>
					</AssociationCard>
					<AssociationCard
						count={0}
						title="Tickets"
					>
						<Typography
							size="sm"
							variant="muted"
						>
							No support tickets are linked to this deal.
						</Typography>
					</AssociationCard>
				</Flex>
			</Grid.Item>
		</Grid>
	)
}

function NoTabs() {
	return (
		<Page>
			<RecordHeader />
			<Highlights />
			<Path />
			<Page.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="md"
				>
					<DetailsSection />
					<ContactsCard />
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Activity</Card.Title>
						</Card.Header>
						<Card.Content>
							<RecentActivity />
						</Card.Content>
					</Card>
				</Flex>
			</Page.Content>
		</Page>
	)
}

/** The quick look: the list stays, the record opens beside it. */
function PreviewPanel() {
	const [open, setOpen] = useState(true)

	return (
		<>
			<DealsTableView />
			<Sheet
				onChange={setOpen}
				open={open}
				side="right"
				size="lg"
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Header.Title>{deal.name}</Sheet.Header.Title>
					<Sheet.Header.Description>
						{deal.account} · {deal.id}
					</Sheet.Header.Description>
				</Sheet.Header>
				<Sheet.Body>
					<Flex
						align="stretch"
						direction="col"
						gap="lg"
					>
						<DescriptionList
							columns={2}
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
						<Flex
							align="stretch"
							direction="col"
							gap="sm"
						>
							<Typography
								component="h3"
								size="sm"
								weight="semibold"
							>
								Recent activity
							</Typography>
							<RecentActivity limit={3} />
						</Flex>
					</Flex>
				</Sheet.Body>
				<Sheet.Footer bordered>
					<Flex
						block
						gap="sm"
					>
						<Button>Open record</Button>
						<Button variant="outline">Edit</Button>
					</Flex>
				</Sheet.Footer>
			</Sheet>
		</>
	)
}

export function Details({ variant }: { variant: DetailsVariant }) {
	let content: ReactNode
	if (variant === 'three-column') {
		content = <ThreeColumn />
	} else if (variant === 'page') {
		content = <NoTabs />
	} else if (variant === 'preview-panel') {
		content = <PreviewPanel />
	} else {
		content = <RecordHome />
	}

	return (
		<CrmShell active="deals">
			<Layout.Content>{content}</Layout.Content>
		</CrmShell>
	)
}
