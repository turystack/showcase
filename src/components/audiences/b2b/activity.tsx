import {
	CalendarIcon,
	CircleAlertIcon,
	DownloadIcon,
	ListTodoIcon,
	MailIcon,
	NotebookIcon,
	PhoneIcon,
} from '@turystack/react-icons'
import {
	Button,
	Card,
	Checkbox,
	DateText,
	FilterBar,
	FilterChip,
	Flex,
	Layout,
	Page,
	Select,
	Table,
	Tabs,
	Textarea,
	Timeline,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	ACTIVITIES,
	type Activity,
	DEAL_HISTORY,
	FOCUS_DEAL,
	TASKS,
} from './crm-data'
import { CrmShell } from './crm-shell'
import { KIND_ICON } from './dashboard'
import { Owner } from './main-page'

/**
 * Who did what, and when — twice.
 *
 * `timeline` is the activity of one record, the CRM way: a composer across the
 * top (log a call, write an email, create a task, leave a note), then what is
 * still to do — upcoming and overdue — and then the history, grouped by month
 * so a long record stays scannable. `feed` is the workspace's compact log, one
 * line per event, filtered by chips.
 */
export type ActivityVariant = 'timeline' | 'feed'

/**
 * Log a call, write an email, create a task, leave a note — one strip.
 * `compact` is the same strip in a side column: the follow-up option goes,
 * because at that width it wraps into three lines beside the button.
 */
export function Composer({ compact = false }: { compact?: boolean }) {
	const [tab, setTab] = useState('call')

	return (
		<Card size="sm">
			<Tabs
				block
				onChange={setTab}
				value={tab}
			>
				<Tabs.List
					ariaLabel="Activity type"
					block
				>
					<Tabs.Trigger
						icon={<PhoneIcon size={14} />}
						value="call"
					>
						Log a call
					</Tabs.Trigger>
					<Tabs.Trigger
						icon={<MailIcon size={14} />}
						value="email"
					>
						Email
					</Tabs.Trigger>
					<Tabs.Trigger
						icon={<ListTodoIcon size={14} />}
						value="task"
					>
						Task
					</Tabs.Trigger>
					<Tabs.Trigger
						icon={<NotebookIcon size={14} />}
						value="note"
					>
						Note
					</Tabs.Trigger>
				</Tabs.List>
				<Card.Content>
					<Flex
						align="stretch"
						direction="col"
						gap="sm"
					>
						<Textarea
							ariaLabel="What happened"
							placeholder={
								tab === 'task'
									? 'What needs to be done?'
									: tab === 'email'
										? 'Write an email to Rafael Menezes…'
										: 'What was said, and what happens next?'
							}
							rows={2}
						/>
						{!compact && <Checkbox label="Create a follow-up task" />}
						<Flex
							align="center"
							gap="sm"
							justify="between"
						>
							<Flex
								align="center"
								gap="sm"
							>
								{tab === 'call' && (
									<Select
										ariaLabel="Call outcome"
										defaultValue="connected"
										mode="single"
										optionLabel="label"
										options={[
											{
												id: 'connected',
												label: 'Connected',
											},
											{
												id: 'voicemail',
												label: 'Left voicemail',
											},
											{
												id: 'no-answer',
												label: 'No answer',
											},
										]}
										optionValue="id"
										size="sm"
									/>
								)}
							</Flex>
							<Button size="sm">
								{tab === 'email'
									? 'Send'
									: tab === 'task'
										? 'Create task'
										: 'Save'}
							</Button>
						</Flex>
					</Flex>
				</Card.Content>
			</Tabs>
		</Card>
	)
}

function historyItems(items: Activity[]) {
	return items.map((item) => (
		<Timeline.Item
			icon={KIND_ICON[item.kind]}
			key={item.id}
			meta={
				<>
					<DateText
						inheritColor
						size="inherit"
						value={item.at}
						variant="dateTime"
					/>{' '}
					· {item.by}
				</>
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
	))
}

/** One record's activity: composer, what is next, then the history by month. */
export function RecordTimeline() {
	const september = DEAL_HISTORY.filter((item) => item.at.startsWith('2026-09'))
	const august = DEAL_HISTORY.filter((item) => item.at.startsWith('2026-08'))

	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Composer />
			<Flex
				align="center"
				gap="sm"
				justify="between"
			>
				<Typography
					size="xs"
					variant="muted"
				>
					Filters: All time · All activities · All types
				</Typography>
				<Flex
					align="center"
					gap="sm"
				>
					<Button
						size="sm"
						variant="link"
					>
						Refresh
					</Button>
					<Button
						size="sm"
						variant="link"
					>
						Expand all
					</Button>
				</Flex>
			</Flex>
			<Timeline>
				<Timeline.Group
					headingLevel={2}
					label="Upcoming & overdue"
				>
					{TASKS.filter((task) => task.record === FOCUS_DEAL.name).map(
						(task) => (
							<Timeline.Item
								icon={
									task.overdue ? (
										<CircleAlertIcon size={14} />
									) : (
										<CalendarIcon size={14} />
									)
								}
								key={task.id}
								meta={
									task.overdue ? 'Overdue · due yesterday' : `Due ${task.due}`
								}
								status={task.overdue ? 'error' : 'pending'}
								title={task.title}
							/>
						),
					)}
				</Timeline.Group>
				<Timeline.Group
					headingLevel={2}
					label="September 2026"
				>
					{historyItems(september)}
				</Timeline.Group>
				<Timeline.Group
					headingLevel={2}
					label="August 2026"
				>
					{historyItems(august)}
				</Timeline.Group>
			</Timeline>
		</Flex>
	)
}

const KIND_LABEL = {
	call: 'Call',
	email: 'Email',
	meeting: 'Meeting',
	note: 'Note',
	stage: 'Stage change',
	task: 'Task',
}

function Feed() {
	const [type, setType] = useState<string | undefined>('Calls, emails')

	return (
		<Page>
			<Page.Header
				action={
					<Button
						leftSection={<DownloadIcon size={16} />}
						variant="outline"
					>
						Export log
					</Button>
				}
				description="Everything logged in Acme Logistics, newest first"
				title="Activity log"
			/>
			<Page.Toolbar>
				<FilterBar onClear={() => setType(undefined)}>
					<FilterChip
						label="Type"
						onRemove={() => setType(undefined)}
						value={type}
					/>
					<FilterChip label="Owner" />
					<FilterChip label="Object" />
					<FilterChip label="Date" />
				</FilterBar>
			</Page.Toolbar>
			<Page.Content>
				<Table
					columns={[
						{
							key: 'at',
							label: 'When',
							selector: (item) => (
								<Typography
									noWrap
									size="sm"
									variant="muted"
								>
									<DateText
										inheritColor
										size="inherit"
										value={item.at}
										variant="dateTime"
									/>
								</Typography>
							),
							width: 200,
						},
						{
							key: 'by',
							label: 'Who',
							selector: (item) => <Owner name={item.by} />,
							width: 200,
						},
						{
							key: 'kind',
							label: 'Type',
							selector: (item) => (
								<Flex
									align="center"
									gap="xs"
								>
									{KIND_ICON[item.kind]}
									<Typography size="sm">{KIND_LABEL[item.kind]}</Typography>
								</Flex>
							),
							width: 200,
						},
						{
							key: 'title',
							label: 'What',
							selector: (item) => (
								<Typography
									size="sm"
									truncate
								>
									{item.title}
								</Typography>
							),
							width: 400,
						},
						{
							key: 'record',
							label: 'Record',
							selector: (item) => (
								<Button
									size="sm"
									variant="link"
								>
									{item.record}
								</Button>
							),
							width: 400,
						},
					]}
					density="compact"
					itemKey="id"
					items={ACTIVITIES}
				/>
			</Page.Content>
		</Page>
	)
}

export function ActivityPage({ variant }: { variant: ActivityVariant }) {
	return (
		<CrmShell active={variant === 'feed' ? 'reports' : 'deals'}>
			<Layout.Content>
				{variant === 'feed' ? (
					<Feed />
				) : (
					<Page>
						<Page.Header
							breadcrumbs={[
								{
									href: '#deals',
									label: 'Deals',
								},
								{
									href: `#${FOCUS_DEAL.id}`,
									label: FOCUS_DEAL.name,
								},
								{
									label: 'Activity',
								},
							]}
							description={`${FOCUS_DEAL.account} · ${DEAL_HISTORY.length} activities`}
							title="Activity"
						/>
						<Page.Content>
							<RecordTimeline />
						</Page.Content>
					</Page>
				)}
			</Layout.Content>
		</CrmShell>
	)
}
