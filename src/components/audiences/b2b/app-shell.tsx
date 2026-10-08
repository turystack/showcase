import { BriefcaseIcon, PlusIcon } from '@turystack/react-icons'
import {
	Badge,
	Button,
	Card,
	Flex,
	Grid,
	Identity,
	Layout,
	List,
	MoneyText,
	Page,
	Typography,
} from '@turystack/react-web'

import { DEALS, ME, stageLabel, TASKS } from './crm-data'
import { type CrmNav, CrmShell } from './crm-shell'

/**
 * The frame every B2B page sits in, compared three ways.
 *
 * `sidebar` and `sidebar-collapsed` are the common CRM arrangement: objects in a
 * rail that folds to icons. `topbar-context-bar` is the enterprise one: a global
 * header with the search in its centre, and under it a context bar with one
 * tab per object. All three keep the same global header — search in the
 * middle, help, setup, the bell and the avatar at the end — because that row
 * is the part of a CRM people reach for from every page.
 */
export type AppShellVariant =
	| 'sidebar'
	| 'sidebar-collapsed'
	| 'topbar-context-bar'

const NAV: Record<AppShellVariant, CrmNav> = {
	sidebar: 'sidebar',
	'sidebar-collapsed': 'sidebar-collapsed',
	'topbar-context-bar': 'topbar',
}

export function AppShell({ variant }: { variant: AppShellVariant }) {
	return (
		<CrmShell
			active="home"
			nav={NAV[variant]}
		>
			<HomeOverview />
		</CrmShell>
	)
}

/** The Home page: the day's tasks and the records touched lately. */
export function HomeOverview() {
	return (
		<Layout.Content>
			<Page>
				<Page.Header
					action={
						<Button leftSection={<PlusIcon size={16} />}>New deal</Button>
					}
					description="Friday, 25 September · 2 tasks due today"
					title={`Good afternoon, ${ME.name.split(' ')[0]}`}
				/>
				<Page.Content>
					<Grid
						cols={2}
						gap="md"
					>
						<Card>
							<Card.Header bordered>
								<Card.Title headingLevel={2}>Due today</Card.Title>
								<Card.Description>
									Your open tasks, oldest first
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<List
									divided
									itemKey="id"
									items={TASKS.slice(0, 3)}
									renderItem={(task) => (
										<Flex
											align="center"
											gap="sm"
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
													{task.title}
												</Typography>
												<Typography
													size="xs"
													variant="muted"
												>
													{task.record}
												</Typography>
											</Flex>
											<Badge
												size="sm"
												variant={task.overdue ? 'destructive' : 'secondary'}
											>
												{task.overdue ? 'Overdue' : task.due}
											</Badge>
										</Flex>
									)}
								/>
							</Card.Content>
						</Card>
						<Card>
							<Card.Header bordered>
								<Card.Title headingLevel={2}>Recently viewed</Card.Title>
								<Card.Description>
									Records you opened this week
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<List
									divided
									itemKey="id"
									items={DEALS.slice(0, 3)}
									renderItem={(deal) => (
										<Flex
											align="center"
											gap="sm"
											justify="between"
										>
											<Identity
												description={`${deal.account} · ${stageLabel(deal.stage)}`}
												media={<BriefcaseIcon size={16} />}
												size="sm"
												title={deal.name}
												variant="compact"
											/>
											<MoneyText
												currency="brl"
												size="sm"
												value={deal.amount}
												variant="compact"
											/>
										</Flex>
									)}
								/>
							</Card.Content>
						</Card>
					</Grid>
				</Page.Content>
			</Page>
		</Layout.Content>
	)
}
