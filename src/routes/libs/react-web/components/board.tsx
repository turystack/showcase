import { createFileRoute } from '@tanstack/react-router'
import {
	Badge,
	Board,
	type BoardColumn,
	Button,
	Card,
	MoneyText,
} from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/board/board.types.ts` and the
 * destructuring default in `board.tsx` (`columnWidth = 'md'`). `BoardProps` is
 * generic over the card's type; the gate reads it as
 * `BoardProps<{ id: string; stage: string }>`.
 */
const boardProps = [
	{
		description: 'The stages, left to right.',
		name: 'columns',
		required: true,
		type: 'BoardColumn[]',
	},
	{
		description: 'Every card. The board is controlled by it.',
		name: 'items',
		required: true,
		type: 'T[]',
	},
	{
		description: 'Stable identity of an item, reported by onMove.',
		name: 'itemKey',
		required: true,
		type: 'keyof T | ((item: T) => string | number)',
	},
	{
		description: 'The column id an item sits in.',
		name: 'columnOf',
		required: true,
		type: '(item: T) => string',
	},
	{
		description: 'Renders one card. Return content, not a button.',
		name: 'renderCard',
		required: true,
		type: '(item: T) => React.ReactNode',
	},
	{
		description: 'Enables moving by drag and keyboard.',
		name: 'onMove',
		type: '(itemId: string, toColumnId: string, toIndex: number) => void',
	},
	{
		description: 'Adds an add button under every column.',
		name: 'onAdd',
		type: '(columnId: string) => void',
	},
	{
		description: 'Overrides the add button text.',
		name: 'addLabel',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Column width: 256, 288 or 320px.',
		name: 'columnWidth',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Names the board as a region landmark.',
		name: 'ariaLabel',
		type: 'string',
	},
]

/** `BoardColumn`, one entry in `columns`. */
const columnProps = [
	{
		description: 'Stable identity; what columnOf returns for its cards.',
		name: 'id',
		required: true,
		type: 'string',
	},
	{
		description: 'The heading and accessible name.',
		name: 'label',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'A line under the heading, such as a total.',
		name: 'summary',
		type: 'React.ReactNode',
	},
]

type Deal = {
	company: string
	contact: string
	id: string
	stage: string
	value: number
}

const STAGES = [
	{
		id: 'lead',
		label: 'Lead',
	},
	{
		id: 'qualified',
		label: 'Qualificado',
	},
	{
		id: 'proposal',
		label: 'Proposta',
	},
	{
		id: 'won',
		label: 'Ganho',
	},
]

const INITIAL_DEALS: Deal[] = [
	{
		company: 'Pousada Mar Azul',
		contact: 'Ana Souza',
		id: 'D-101',
		stage: 'lead',
		value: 1_280_000,
	},
	{
		company: 'Hotel Serra Verde',
		contact: 'Bruno Lima',
		id: 'D-102',
		stage: 'lead',
		value: 4_500_000,
	},
	{
		company: 'Rede Litoral',
		contact: 'Carla Mendes',
		id: 'D-103',
		stage: 'qualified',
		value: 18_900_000,
	},
	{
		company: 'Chalés do Vale',
		contact: 'Diego Rocha',
		id: 'D-104',
		stage: 'proposal',
		value: 960_000,
	},
	{
		company: 'Resort Ponta Norte',
		contact: 'Elisa Castro',
		id: 'D-105',
		stage: 'proposal',
		value: 32_000_000,
	},
	{
		company: 'Hostel Centro',
		contact: 'Fábio Nunes',
		id: 'D-106',
		stage: 'won',
		value: 420_000,
	},
]

/**
 * What a page does with onMove: take the card out, then put it — moved to its
 * new column by `land` — before the card that holds `index` in the
 * destination column, or after that column's last card when `index` is past
 * the end. `index` is counted without the card itself, which is why it is
 * removed first.
 */
function moveCard<
	T extends {
		id: string
	},
>(
	items: T[],
	id: string,
	index: number,
	inDestination: (item: T) => boolean,
	land: (item: T) => T,
) {
	const card = items.find((candidate) => candidate.id === id)

	if (!card) {
		return items
	}

	const rest = items.filter((candidate) => candidate.id !== id)
	const column = rest.filter(inDestination)
	const before = column[index]
	const last = column.at(-1)
	const at = before
		? rest.indexOf(before)
		: last
			? rest.indexOf(last) + 1
			: rest.length

	rest.splice(at, 0, land(card))

	return rest
}

function DealCard({ deal }: { deal: Deal }) {
	return (
		<Card size="sm">
			<Card.Content>
				<div className="flex flex-col gap-1">
					<span className="truncate font-medium text-sm">{deal.company}</span>
					<span className="truncate text-muted-foreground text-xs">
						{deal.contact} · {deal.id}
					</span>
					<MoneyText
						size="sm"
						value={deal.value}
						weight="semibold"
					/>
				</div>
			</Card.Content>
		</Card>
	)
}

function PipelineExample() {
	const [deals, setDeals] = useState(INITIAL_DEALS)
	const [lastEvent, setLastEvent] = useState('nenhum')

	const columns: BoardColumn[] = STAGES.map((stage) => ({
		...stage,
		summary: (
			<MoneyText
				inheritColor
				size="inherit"
				value={deals
					.filter((deal) => deal.stage === stage.id)
					.reduce((total, deal) => total + deal.value, 0)}
			/>
		),
	}))

	return (
		<div className="flex w-full min-w-0 flex-col gap-3">
			<Board
				ariaLabel="Funil de vendas"
				columnOf={(deal) => deal.stage}
				columns={columns}
				itemKey="id"
				items={deals}
				onAdd={(stage) => setLastEvent(`adicionar em ${stage}`)}
				onMove={(id, stage, index) => {
					setDeals((current) =>
						moveCard(
							current,
							id,
							index,
							(deal) => deal.stage === stage,
							(deal) => ({
								...deal,
								stage,
							}),
						),
					)
					setLastEvent(`onMove("${id}", "${stage}", ${index})`)
				}}
				renderCard={(deal) => <DealCard deal={deal} />}
			/>
			<span className="text-muted-foreground text-xs">
				último evento: <code>{lastEvent}</code>
			</span>
		</div>
	)
}

type Task = {
	id: string
	status: string
	title: string
	urgent?: boolean
}

const TASK_COLUMNS: BoardColumn[] = [
	{
		id: 'todo',
		label: 'A fazer',
	},
	{
		id: 'doing',
		label: 'Fazendo',
		summary: 'Limite: 3',
	},
	{
		id: 'done',
		label: 'Feito',
	},
]

const TASKS: Task[] = [
	{
		id: 'T-1',
		status: 'todo',
		title: 'Revisar tarifas de alta temporada',
		urgent: true,
	},
	{
		id: 'T-2',
		status: 'todo',
		title: 'Responder avaliações do mês',
	},
	{
		id: 'T-3',
		status: 'doing',
		title: 'Fotos novas dos quartos',
	},
	{
		id: 'T-4',
		status: 'done',
		title: 'Publicar política de cancelamento',
	},
]

function TaskCard({ task }: { task: Task }) {
	return (
		<Card size="sm">
			<Card.Content>
				<div className="flex items-start justify-between gap-2">
					<span className="text-sm">{task.title}</span>
					{task.urgent ? (
						<Badge
							size="sm"
							variant="destructive"
						>
							Urgente
						</Badge>
					) : null}
				</div>
			</Card.Content>
		</Card>
	)
}

function ReadOnlyExample() {
	return (
		<div className="w-full min-w-0">
			<Board
				ariaLabel="Tarefas da equipe"
				columnOf={(task) => task.status}
				columns={TASK_COLUMNS}
				columnWidth="sm"
				itemKey="id"
				items={TASKS}
				renderCard={(task) => <TaskCard task={task} />}
			/>
		</div>
	)
}

/** The read-only board squeezed into a narrow frame, so it has to scroll. */
function NarrowExample() {
	return (
		<div className="w-full min-w-0 max-w-md">
			<Board
				ariaLabel="Tarefas em uma coluna estreita"
				columnOf={(task) => task.status}
				columns={TASK_COLUMNS}
				columnWidth="sm"
				itemKey="id"
				items={TASKS}
				renderCard={(task) => <TaskCard task={task} />}
			/>
		</div>
	)
}

function ControlsExample() {
	const [tasks, setTasks] = useState(TASKS)
	const [opened, setOpened] = useState('nenhuma')

	return (
		<div className="flex w-full min-w-0 flex-col gap-3">
			<Board
				addLabel="Nova tarefa"
				ariaLabel="Tarefas com ações"
				columnOf={(task) => task.status}
				columns={TASK_COLUMNS}
				columnWidth="sm"
				itemKey="id"
				items={tasks}
				onAdd={(status) => setOpened(`nova em ${status}`)}
				onMove={(id, status, index) =>
					setTasks((current) =>
						moveCard(
							current,
							id,
							index,
							(task) => task.status === status,
							(task) => ({
								...task,
								status,
							}),
						),
					)
				}
				renderCard={(task) => (
					<Card size="sm">
						<Card.Content>
							<div className="flex items-center justify-between gap-2">
								<span className="min-w-0 truncate text-sm">{task.title}</span>
								<Button
									ariaLabel={`Abrir ${task.title}`}
									onClick={() => setOpened(task.id)}
									size="sm"
									variant="outline"
								>
									Abrir
								</Button>
							</div>
						</Card.Content>
					</Card>
				)}
			/>
			<span className="text-muted-foreground text-xs">
				aberta: <code>{opened}</code>
			</span>
		</div>
	)
}

const usageCode = `import { Board, Card, MoneyText } from '@turystack/react-web'
import { useState } from 'react'

const [deals, setDeals] = useState<Deal[]>(initialDeals)

<Board
  ariaLabel="Funil de vendas"
  columns={[
    { id: 'lead', label: 'Lead' },
    { id: 'proposal', label: 'Proposta', summary: <MoneyText value={proposalTotal} /> },
    { id: 'won', label: 'Ganho' },
  ]}
  items={deals}
  itemKey="id"
  columnOf={(deal) => deal.stage}
  renderCard={(deal) => <DealCard deal={deal} />}
  onMove={(id, stage, index) =>
    setDeals((current) =>
      moveCard(current, id, index, (deal) => deal.stage === stage, (deal) => ({ ...deal, stage })),
    )
  }
  onAdd={(stage) => openNewDeal(stage)}
/>

// Read-only: no onMove
<Board columnOf={(task) => task.status} columns={columns} itemKey="id" items={tasks} renderCard={renderTask} />

// Narrow columns, custom add text
<Board addLabel="Nova tarefa" columnWidth="sm" onAdd={createTask} … />`

const keys = [
	[
		'Space / Enter',
		'Picks the focused card up; pressed again, drops it where it hovers.',
	],
	[
		'↑ / ↓',
		'Moves the lifted card within its column.',
	],
	[
		'← / →',
		'Moves the lifted card to the previous or next column.',
	],
	[
		'Escape, or Tab away',
		'Puts the card back where it started.',
	],
] as const

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Data
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Board
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Kanban columns of cards, moved by drag or keyboard.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={boardProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">BoardColumn</h2>
				<PropsTable props={columnProps} />
			</section>

			<SlotsSection slug="board" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">A sales pipeline</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Controlled: a move calls{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onMove(itemId, toColumnId, toIndex)
					</code>{' '}
					and the page updates{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						items
					</code>
					. toIndex is 0-based, counted without the card.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Sales pipeline"
				>
					<PipelineExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Scrolling</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Columns never shrink; the board scrolls sideways.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						.board
					</code>{' '}
					is the frame,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						.board-viewport
					</code>{' '}
					the scroller.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Narrow frame"
				>
					<NarrowExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Keyboard</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onMove
					</code>{' '}
					every card is a tab stop. Each step is announced with the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						board
					</code>{' '}
					labels.
				</p>
				<div className="max-w-prose overflow-hidden rounded-lg border border-border">
					<table className="w-full text-sm">
						<thead className="bg-muted/50 text-left">
							<tr>
								<th className="px-3 py-2 font-medium">Key</th>
								<th className="px-3 py-2 font-medium">On a card</th>
							</tr>
						</thead>
						<tbody>
							{keys.map(([key, effect]) => (
								<tr
									className="border-border border-t"
									key={key}
								>
									<td className="whitespace-nowrap px-3 py-2">
										<kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
											{key}
										</kbd>
									</td>
									<td className="px-3 py-2 text-muted-foreground">{effect}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Controls inside a card
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Keys on a control inside a card go to that control. Add buttons are
					named{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						addLabel
					</code>{' '}
					plus the column name.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="Buttons in cards"
				>
					<ControlsExample />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Read-only</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Leave{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onMove
					</code>{' '}
					out and nothing drags or takes focus.
				</p>
				<ComponentPreview
					className="items-stretch"
					title="No onMove, no onAdd"
				>
					<ReadOnlyExample />
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

export const Route = createFileRoute('/libs/react-web/components/board')({
	component: Page,
})
