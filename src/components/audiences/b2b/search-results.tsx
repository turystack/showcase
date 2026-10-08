import {
	BriefcaseIcon,
	Building2Icon,
	CalendarPlusIcon,
	CircleCheckIcon,
	ContactIcon,
	FileUpIcon,
	HomeIcon,
	ListTodoIcon,
	PhoneIcon,
	PlusIcon,
	SettingsIcon,
} from '@turystack/react-icons'
import {
	Badge,
	Box,
	Button,
	Card,
	DateText,
	Flex,
	Grid,
	Layout,
	List,
	MoneyText,
	Page,
	SpotlightSearch,
	Table,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { HomeOverview } from './app-shell'
import { ACTIVITIES, DEALS } from './crm-data'
import { CrmShell, GlobalSearch } from './crm-shell'
import { Owner, StageBadge } from './main-page'

/**
 * Finding a record, three ways, from the least to the most committed.
 *
 * `instant` is the dropdown under the header search that answers as you type,
 * grouped by object, each group with a way to its full list. Enter there opens
 * `top-results`: the same query as a page, the object scopes down the left
 * and the best few of each on the right. `command` is the keyboard palette,
 * which mixes records with actions — "New deal" and "Log a call" are found
 * the same way "Northwind" is.
 */
export type SearchResultsVariant = 'instant' | 'top-results' | 'command'

const QUERY = 'north'

const MATCHES = DEALS.filter((deal) =>
	`${deal.name} ${deal.account} ${deal.contact}`.toLowerCase().includes(QUERY),
)

const SCOPES = [
	{
		count: 6,
		id: 'top',
		label: 'Top results',
	},
	{
		count: MATCHES.length,
		id: 'deals',
		label: 'Deals',
	},
	{
		count: 1,
		id: 'companies',
		label: 'Companies',
	},
	{
		count: 1,
		id: 'contacts',
		label: 'Contacts',
	},
	{
		count: 3,
		id: 'activities',
		label: 'Activities',
	},
]

function ResultGroup({
	children,
	count,
	title,
}: {
	children: React.ReactNode
	count: number
	title: string
}) {
	return (
		<Card>
			<Card.Header bordered>
				<Flex
					align="center"
					justify="between"
				>
					<Flex
						align="center"
						gap="sm"
					>
						<Card.Title headingLevel={2}>{title}</Card.Title>
						<Badge
							size="sm"
							variant="secondary"
						>
							{count}
						</Badge>
					</Flex>
					<Button
						size="sm"
						variant="link"
					>
						View all
					</Button>
				</Flex>
			</Card.Header>
			<Card.Content>{children}</Card.Content>
		</Card>
	)
}

function TopResults() {
	const [scope, setScope] = useState('top')

	return (
		<Layout.Content>
			<Page>
				<Page.Header
					description="6 results across 4 objects · searched every record you can see"
					title={`Results for “${QUERY}”`}
				/>
				<Page.Content>
					<Grid
						cols={4}
						gap="md"
					>
						<Card size="sm">
							<Card.Content>
								<List
									activeKey={scope}
									gap="xs"
									itemKey="id"
									items={SCOPES}
									onItemClick={(item) => setScope(item.id)}
									renderItem={(item) => (
										<Box
											paddingX="sm"
											paddingY="xs"
										>
											<Flex
												align="center"
												justify="between"
											>
												<Typography
													size="sm"
													weight={item.id === scope ? 'medium' : 'normal'}
												>
													{item.label}
												</Typography>
												<Typography
													size="xs"
													variant="muted"
												>
													{item.count}
												</Typography>
											</Flex>
										</Box>
									)}
								/>
							</Card.Content>
						</Card>
						<Grid.Item span={3}>
							<Flex
								align="stretch"
								direction="col"
								gap="md"
							>
								<ResultGroup
									count={MATCHES.length}
									title="Deals"
								>
									<Table
										columns={[
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
												width: 300,
											},
											{
												key: 'stage',
												label: 'Stage',
												selector: (deal) => <StageBadge stage={deal.stage} />,
												width: 100,
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
												width: 100,
											},
											{
												key: 'owner',
												label: 'Owner',
												selector: (deal) => <Owner name={deal.owner} />,
												width: 200,
											},
										]}
										density="compact"
										itemKey="id"
										items={MATCHES}
									/>
								</ResultGroup>
								<Grid
									cols={2}
									gap="md"
								>
									<ResultGroup
										count={1}
										title="Companies"
									>
										<Flex
											align="center"
											gap="sm"
										>
											<Building2Icon size={16} />
											<Flex
												align="stretch"
												direction="col"
												gap="none"
											>
												<Button
													size="sm"
													variant="link"
												>
													Northwind Logistics
												</Button>
												<Typography
													size="xs"
													variant="muted"
												>
													Logistics · São Paulo, SP · 1 open deal
												</Typography>
											</Flex>
										</Flex>
									</ResultGroup>
									<ResultGroup
										count={1}
										title="Contacts"
									>
										<Flex
											align="center"
											gap="sm"
										>
											<ContactIcon size={16} />
											<Flex
												align="stretch"
												direction="col"
												gap="none"
											>
												<Button
													size="sm"
													variant="link"
												>
													Rafael Menezes
												</Button>
												<Typography
													size="xs"
													variant="muted"
												>
													Head of Operations · Northwind Logistics
												</Typography>
											</Flex>
										</Flex>
									</ResultGroup>
								</Grid>
								<ResultGroup
									count={3}
									title="Activities"
								>
									<List
										divided
										itemKey="id"
										items={ACTIVITIES.filter((item) =>
											item.record.toLowerCase().includes(QUERY),
										)}
										renderItem={(item) => (
											<Flex
												align="center"
												gap="md"
												justify="between"
											>
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
														{item.detail}
													</Typography>
												</Flex>
												<Typography
													noWrap
													size="xs"
													variant="muted"
												>
													<DateText
														inheritColor
														size="inherit"
														value={item.at}
													/>
												</Typography>
											</Flex>
										)}
									/>
								</ResultGroup>
							</Flex>
						</Grid.Item>
					</Grid>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}

/** The palette: actions first, then where to go, then records. */
function CommandPalette() {
	const [open, setOpen] = useState(true)

	return (
		<>
			<SpotlightSearch
				ariaLabel="Command palette"
				emptyQueryGroups={[
					{
						heading: 'Actions',
						items: [
							{
								icon: <PlusIcon size={16} />,
								id: 'new-deal',
								keywords: [
									'create',
									'opportunity',
								],
								label: 'New deal',
								shortcut: [
									'N',
									'D',
								],
							},
							{
								icon: <PhoneIcon size={16} />,
								id: 'log-call',
								label: 'Log a call',
								shortcut: [
									'L',
									'C',
								],
							},
							{
								icon: <ListTodoIcon size={16} />,
								id: 'new-task',
								label: 'Create a task',
								shortcut: [
									'N',
									'T',
								],
							},
							{
								icon: <CalendarPlusIcon size={16} />,
								id: 'meeting',
								label: 'Schedule a meeting',
							},
							{
								icon: <FileUpIcon size={16} />,
								id: 'import',
								label: 'Import contacts',
							},
						],
					},
					{
						heading: 'Go to',
						items: [
							{
								icon: <HomeIcon size={16} />,
								id: 'go-home',
								label: 'Home',
								shortcut: [
									'G',
									'H',
								],
							},
							{
								icon: <BriefcaseIcon size={16} />,
								id: 'go-deals',
								label: 'Deals',
								shortcut: [
									'G',
									'D',
								],
							},
							{
								icon: <SettingsIcon size={16} />,
								id: 'go-setup',
								label: 'Setup',
							},
						],
					},
					{
						heading: 'Recent records',
						items: DEALS.slice(0, 2).map((deal) => ({
							description: deal.account,
							icon: <CircleCheckIcon size={16} />,
							id: `recent-${deal.id}`,
							label: deal.name,
						})),
					},
				]}
				footer={
					<Typography
						size="xs"
						variant="muted"
					>
						↑↓ to move · Enter to run · Esc to close
					</Typography>
				}
				groups={[
					{
						heading: 'Actions',
						items: [
							{
								icon: <PlusIcon size={16} />,
								id: 'q-new-deal',
								label: 'New deal',
							},
							{
								icon: <PhoneIcon size={16} />,
								id: 'q-log-call',
								label: 'Log a call',
							},
						],
					},
					{
						heading: 'Deals',
						items: DEALS.map((deal) => ({
							description: `${deal.account} · ${deal.id}`,
							icon: <BriefcaseIcon size={16} />,
							id: `q-${deal.id}`,
							keywords: [
								deal.account,
								deal.contact,
							],
							label: deal.name,
						})),
					},
				]}
				onOpenChange={setOpen}
				open={open}
				placeholder="Type a command or search…"
			/>
			<HomeOverview />
		</>
	)
}

export function SearchResults({ variant }: { variant: SearchResultsVariant }) {
	if (variant === 'instant') {
		return (
			<CrmShell
				active="home"
				search={
					<GlobalSearch
						defaultOpen
						defaultQuery={QUERY}
					/>
				}
			>
				<HomeOverview />
			</CrmShell>
		)
	}

	if (variant === 'command') {
		return (
			<CrmShell active="home">
				<CommandPalette />
			</CrmShell>
		)
	}

	return (
		<CrmShell
			active="home"
			search={<GlobalSearch defaultQuery={QUERY} />}
		>
			<TopResults />
		</CrmShell>
	)
}
