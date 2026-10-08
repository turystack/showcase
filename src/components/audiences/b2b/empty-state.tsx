import {
	BriefcaseIcon,
	CloudOffIcon,
	FileTextIcon,
	ListTodoIcon,
	PlusIcon,
	RotateCwIcon,
	SearchIcon,
	UploadIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Button,
	Card,
	Checklist,
	EmptyState,
	FilterBar,
	FilterChip,
	Flex,
	Grid,
	Layout,
	List,
	Page,
	Table,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { type Deal, ME } from './crm-data'
import { CrmShell } from './crm-shell'
import { SETUP_STEPS } from './dashboard'
import { DEAL_COLUMNS, DealsHeader, initialsOf } from './main-page'

/**
 * Nothing to show, at the two sizes it happens.
 *
 * A page with nothing in it gets the large state, with the icon, the reason
 * and the way out (`empty`, `first-run`). A section of a page that has other
 * things in it gets the small, bordered one inside its card (`in-card`), so
 * the page does not look broken for one empty list. `no-results` is a filter
 * that matched nothing — its way out is clearing the filter, not creating a
 * record. `fetch-error` is not empty at all: the read failed, the table keeps
 * its header, and the way out is Try again.
 */
export type EmptyStateVariant =
	| 'empty'
	| 'first-run'
	| 'in-card'
	| 'no-results'
	| 'fetch-error'

function NoDeals() {
	return (
		<Page>
			<DealsHeader
				count={0}
				display="table"
			/>
			<Page.Content>
				<Card>
					<Card.Content>
						<EmptyState
							action={
								<Flex
									align="center"
									gap="sm"
								>
									<Button leftSection={<PlusIcon size={16} />}>New deal</Button>
									<Button
										leftSection={<UploadIcon size={16} />}
										variant="outline"
									>
										Import from a spreadsheet
									</Button>
								</Flex>
							}
							description="A deal follows one sale from the first call to the signature. Create one, or bring your pipeline in from a spreadsheet."
							headingLevel={2}
							icon={<BriefcaseIcon size={28} />}
							size="lg"
							title="No deals yet"
						/>
					</Card.Content>
				</Card>
			</Page.Content>
		</Page>
	)
}

function FirstRun() {
	return (
		<Page>
			<Page.Header
				description="Acme Logistics was created today. Five steps and your team can start selling."
				title={`Welcome to Acme, ${ME.name.split(' ')[0]}`}
			/>
			<Page.Content>
				<Grid
					cols={3}
					gap="md"
				>
					<Grid.Item span={2}>
						<Card>
							<Card.Content>
								<Checklist
									items={SETUP_STEPS.map((step, index) => ({
										...step,
										action: step.action ?? (
											<Button
												size="sm"
												variant="outline"
											>
												Start
											</Button>
										),
										done: index === 0,
									}))}
									title="Set up your workspace"
								/>
							</Card.Content>
						</Card>
					</Grid.Item>
					<Card>
						<Card.Header>
							<Card.Title headingLevel={2}>Your tasks</Card.Title>
						</Card.Header>
						<Card.Content>
							<EmptyState
								bordered="dashed"
								description="Tasks you create or are assigned show up here."
								headingLevel={3}
								icon={<ListTodoIcon size={20} />}
								size="sm"
								title="Nothing due"
							/>
						</Card.Content>
					</Card>
				</Grid>
			</Page.Content>
		</Page>
	)
}

const CONTACTS = [
	{
		name: 'Helena Prado',
		title: 'Fleet Manager',
	},
	{
		name: 'Caio Martins',
		title: 'CFO',
	},
]

function InCard() {
	return (
		<Page>
			<Page.Header
				breadcrumbs={[
					{
						href: '#companies',
						label: 'Companies',
					},
					{
						label: 'Globex Tours',
					},
				]}
				description="Tourism · Rio de Janeiro, RJ · customer since 2024"
				title="Globex Tours"
			/>
			<Page.Content>
				<Grid
					cols={2}
					gap="md"
				>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Contacts (2)</Card.Title>
						</Card.Header>
						<Card.Content>
							<List
								divided
								itemKey="name"
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
											{initialsOf(contact.name)}
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
						</Card.Content>
					</Card>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Open deals (0)</Card.Title>
						</Card.Header>
						<Card.Content>
							<EmptyState
								action={
									<Button
										size="sm"
										variant="outline"
									>
										New deal
									</Button>
								}
								bordered="dashed"
								description="The last one was won in August."
								headingLevel={3}
								size="sm"
								title="No open deals"
							/>
						</Card.Content>
					</Card>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Quotes (0)</Card.Title>
						</Card.Header>
						<Card.Content>
							<EmptyState
								bordered="dashed"
								headingLevel={3}
								icon={<FileTextIcon size={20} />}
								size="sm"
								title="No quotes sent"
							/>
						</Card.Content>
					</Card>
					<Card>
						<Card.Header bordered>
							<Card.Title headingLevel={2}>Files (0)</Card.Title>
						</Card.Header>
						<Card.Content>
							<EmptyState
								bordered="dashed"
								description="Drop contracts and proposals here."
								headingLevel={3}
								size="sm"
								title="No files"
							/>
						</Card.Content>
					</Card>
				</Grid>
			</Page.Content>
		</Page>
	)
}

function NoResults() {
	const [stage, setStage] = useState<string | undefined>('Negotiation')
	const [owner, setOwner] = useState<string | undefined>('Paula Moraes')
	const clear = () => {
		setStage(undefined)
		setOwner(undefined)
	}

	return (
		<Page>
			<DealsHeader
				count={0}
				display="table"
				view="My open deals"
			/>
			<Page.Toolbar>
				<FilterBar onClear={clear}>
					<FilterChip
						label="Stage"
						onRemove={() => setStage(undefined)}
						value={stage}
					/>
					<FilterChip
						label="Owner"
						onRemove={() => setOwner(undefined)}
						value={owner}
					/>
					<FilterChip label="Close date" />
				</FilterBar>
			</Page.Toolbar>
			<Page.Content>
				<Table<Deal>
					columns={DEAL_COLUMNS}
					density="compact"
					emptySection={
						<EmptyState
							action={
								<Button
									onClick={clear}
									variant="outline"
								>
									Clear filters
								</Button>
							}
							description="No deal in this view is in Negotiation and owned by Paula Moraes."
							headingLevel={2}
							icon={<SearchIcon size={20} />}
							title="No deals match these filters"
						/>
					}
					itemKey="id"
					items={[]}
				/>
			</Page.Content>
		</Page>
	)
}

function FetchError() {
	return (
		<Page>
			<DealsHeader display="table" />
			<Page.Content>
				<Table<Deal>
					columns={DEAL_COLUMNS}
					density="compact"
					errorSection={
						<EmptyState
							action={
								<Button
									leftSection={<RotateCwIcon size={16} />}
									variant="outline"
								>
									Try again
								</Button>
							}
							description="The connection timed out before the list arrived. Nothing you saved was lost."
							headingLevel={2}
							icon={<CloudOffIcon size={20} />}
							title="We couldn’t load your deals"
						/>
					}
					itemKey="id"
					outcome={{
						error: new Error('timeout'),
						retry: () => undefined,
						status: 'error',
					}}
				/>
			</Page.Content>
		</Page>
	)
}

export function EmptyStates({ variant }: { variant: EmptyStateVariant }) {
	return (
		<CrmShell
			active={
				variant === 'first-run'
					? 'home'
					: variant === 'in-card'
						? 'companies'
						: 'deals'
			}
		>
			<Layout.Content>
				{variant === 'empty' && <NoDeals />}
				{variant === 'first-run' && <FirstRun />}
				{variant === 'in-card' && <InCard />}
				{variant === 'no-results' && <NoResults />}
				{variant === 'fetch-error' && <FetchError />}
			</Layout.Content>
		</CrmShell>
	)
}
