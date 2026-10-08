import { createFileRoute } from '@tanstack/react-router'
import type { DataOutcome } from '@turystack/react-hooks'
import { useDataOutcome } from '@turystack/react-hooks'
import {
	Button,
	Card,
	EmptyState,
	List,
	Loaded,
	Select,
	Table,
} from '@turystack/react-web'
import { Inbox, ShieldAlert } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const loadedProps = [
	{
		description: 'The five states of a remote read, from useDataOutcome.',
		name: 'outcome',
		required: true,
		type: 'DataOutcome<T>',
	},
	{
		description: 'Render function, run only once the read succeeded.',
		name: 'children',
		required: true,
		type: '(data: T) => ReactNode',
	},
	{
		description: 'Replaces the denied card (which has no retry).',
		name: 'deniedSection',
		type: 'ReactNode',
	},
	{
		description: 'Replaces the card shown when the read came back empty.',
		name: 'emptySection',
		type: 'ReactNode',
	},
	{
		description: 'Replaces the failed card (default has a retry).',
		name: 'errorSection',
		type: 'ReactNode',
	},
	{
		description: 'Replaces the skeleton drawn while the read is pending.',
		name: 'loadingSection',
		type: 'ReactNode',
	},
	{
		default: '3',
		description: 'How many skeleton blocks the pending state draws.',
		name: 'loadingRows',
		type: 'number',
	},
	{
		default: '"md"',
		description: 'Size of the state cards, as in EmptyState.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

type Booking = {
	guest: string
	id: string
	nights: number
}

const bookings: Booking[] = [
	{
		guest: 'Ada Lovelace',
		id: 'b1',
		nights: 3,
	},
	{
		guest: 'Grace Hopper',
		id: 'b2',
		nights: 5,
	},
	{
		guest: 'Alan Turing',
		id: 'b3',
		nights: 2,
	},
]

const columns = [
	{
		key: 'guest',
		label: 'Guest',
	},
	{
		key: 'nights',
		label: 'Nights',
	},
]

type DemoStatus =
	| 'denied'
	| 'empty'
	| 'error'
	| 'pending'
	| 'refreshing'
	| 'success'

const DEMO_STATUSES: DemoStatus[] = [
	'pending',
	'denied',
	'error',
	'empty',
	'success',
	'refreshing',
]

const DENIED = new Error('denied')

/**
 * A stand-in for a query hook, so the page demonstrates the real derivation
 * instead of hand-built union literals.
 */
function useDemoOutcome(status: DemoStatus): DataOutcome<Booking[]> {
	const hasRows = status === 'success' || status === 'refreshing'

	return useDataOutcome<Booking[]>({
		denied: (error) =>
			error === DENIED
				? 'Guest details start on the Business contract'
				: undefined,
		query: {
			data: hasRows ? bookings : status === 'empty' ? [] : undefined,
			error:
				status === 'denied'
					? DENIED
					: status === 'error'
						? new Error('the network went away')
						: undefined,
			isFetching: status === 'refreshing',
			isPending: status === 'pending',
			refetch: () => undefined,
		},
	})
}

function StatusPicker({
	onChange,
	value,
}: {
	onChange: (next: DemoStatus) => void
	value: DemoStatus
}) {
	return (
		<div className="flex flex-wrap gap-2">
			{DEMO_STATUSES.map((status) => (
				<Button
					key={status}
					onClick={() => onChange(status)}
					size="sm"
					variant={status === value ? 'default' : 'outline'}
				>
					{status}
				</Button>
			))}
		</div>
	)
}

const derivationCode = `import { useDataOutcome } from '@turystack/react-hooks'

const outcome = useDataOutcome({
  query: useListBookings(params),
  select: (page) => page.data,
})`

const regionCode = `import { Loaded } from '@turystack/react-web'

<Loaded outcome={outcome}>
  {(bookings) => <BookingSummary bookings={bookings} />}
</Loaded>

// Only the empty state usually carries copy of its own
<Loaded
  emptySection={
    <EmptyState
      action={<Button>New booking</Button>}
      title="No bookings yet"
    />
  }
  outcome={outcome}
>
  {(bookings) => <BookingSummary bookings={bookings} />}
</Loaded>`

const surfacesCode = `// A table keeps its header, columns and pagination in every state
<Table columns={columns} itemKey="id" outcome={outcome} />

// A list draws skeleton rows, then the rows
<List itemKey="id" outcome={outcome} renderItem={renderBooking} />

// A select paints the state inside its own popup, and never disables the
// trigger — a disabled control fires no pointer events, so the reason
// would be out of reach
<Select
  mode="single"
  optionLabel="guest"
  optionValue="id"
  outcome={outcome}
/>`

const paginationCode = `// A failed next page is not a failed read: the rows stay, the footer
// carries the failure, and the sentinel stops asking for more
<List
  infinite={{
    error: page.isError,
    errorSection: (
      <Button onClick={page.fetchNextPage} variant="outline">
        Try again
      </Button>
    ),
    hasMore: page.hasNextPage,
    loadingMore: page.isFetchingNextPage,
    onLoadMore: page.fetchNextPage,
  }}
  itemKey="id"
  outcome={outcome}
  renderItem={renderBooking}
/>`

const switchCode = `// When no surface paints it for you — a confirmation modal that has to
// read its blast radius before offering the button
switch (outcome.status) {
  case 'pending':
    return <ImpactSkeleton reason="Checking what will be affected" />
  case 'denied':
    return <Unavailable reason={outcome.reason} />
  case 'error':
    return <ImpactFailed onRetry={outcome.retry} />
  case 'empty':
    return <Confirm description="This guest drags nothing along." />
  case 'success':
    return <ImpactConfirm impact={outcome.data} />
}

// outcome.data does not exist outside the success branch, so the
// fallback that turns a failure into an empty list has nowhere to happen`

const denialCode = `// Once, at the root: which codes mean "you may not"
<DataOutcomeContext value={{ denied: resolveDenial }}>
  <App />
</DataOutcomeContext>

// src/api/denial.ts
const DENIAL_REASONS: Partial<Record<ErrorCode, string>> = {
  'booking.period_closed': 'This period is closed',
  'report.contract_tier_too_low': 'Reports start on the Business contract',
}

export function resolveDenial(error: unknown) {
  return isException(error) ? DENIAL_REASONS[error.code] : undefined
}`

function Page() {
	const [status, setStatus] = useState<DemoStatus>('pending')
	const outcome = useDemoOutcome(status)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Data
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Loaded
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Renders its children once a read lands, and the reason why not until
					then.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Where the value comes from
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Five outcomes, in order: pending, denied, error, empty, success.
					Denied comes before error so it never offers a retry.
				</p>
				<CodeBlock
					code={derivationCode}
					filename="use-outcome.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={loadedProps} />
			</section>

			<SlotsSection slug="loaded" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The five states</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Pick a state and every surface below follows; the real hook derives
					the outcome.
				</p>
				<StatusPicker
					onChange={setStatus}
					value={status}
				/>
				<ComponentPreview title="Loaded inside a card">
					<div className="w-full max-w-md">
						<Card>
							<Card.Header bordered>
								<Card.Title>Reservas</Card.Title>
								<Card.Description>Próximos check-ins</Card.Description>
							</Card.Header>
							<Card.Content>
								<Loaded
									emptySection={
										<EmptyState
											action={<Button size="sm">Nova reserva</Button>}
											icon={<Inbox />}
											size="sm"
											title="Nenhuma reserva ainda"
										/>
									}
									outcome={outcome}
									size="sm"
								>
									{(rows) => (
										<ul className="space-y-2 text-sm">
											{rows.map((booking) => (
												<li
													className="flex justify-between"
													key={booking.id}
												>
													<span>{booking.guest}</span>
													<span className="text-muted-foreground">
														{booking.nights} noites
													</span>
												</li>
											))}
										</ul>
									)}
								</Loaded>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={regionCode}
					filename="booking-panel.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A table takes the same value
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A failed read shows inside the table, keeping header, columns and
					pagination in place.
				</p>
				<StatusPicker
					onChange={setStatus}
					value={status}
				/>
				<ComponentPreview title="Table outcome">
					<div className="w-full max-w-2xl">
						<Table<Booking>
							columns={columns}
							itemKey="id"
							outcome={outcome}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					So do a list and a select
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A select paints the state in its popup and keeps the trigger usable.
				</p>
				<StatusPicker
					onChange={setStatus}
					value={status}
				/>
				<ComponentPreview title="List and Select on the same outcome">
					<div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
						<List<Booking>
							emptySection={
								<EmptyState
									size="sm"
									title="Nenhuma reserva"
								/>
							}
							itemKey="id"
							outcome={outcome}
							renderItem={(booking) => (
								<span className="text-sm">{booking.guest}</span>
							)}
						/>
						<Select<Booking>
							mode="single"
							optionLabel="guest"
							optionValue="id"
							outcome={outcome}
							placeholder="Escolha um hóspede"
							searchable
						/>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={surfacesCode}
					filename="surfaces.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Denied is not an error
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Empty, failed and denied are different facts. The denied card states
					the reason, with no retry.
				</p>
				<ComponentPreview title="Three cards that must not look alike">
					<div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
						<EmptyState
							icon={<Inbox />}
							size="sm"
							title="Nenhuma reserva ainda"
						/>
						<EmptyState
							action={
								<Button
									size="sm"
									variant="outline"
								>
									Tentar novamente
								</Button>
							}
							size="sm"
							title="Não foi possível carregar"
						/>
						<EmptyState
							icon={<ShieldAlert />}
							size="sm"
							title="Relatórios começam no contrato Business"
						/>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={denialCode}
					filename="denial.ts"
					language="ts"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A failed next page is not a failed read
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A failed next page shows in the footer; loaded rows stay and the
					sentinel stops observing.
				</p>
				<ComponentPreview title="The rows stay, the footer explains">
					<div className="w-full max-w-md">
						<List<Booking>
							infinite={{
								error: true,
								errorSection: (
									<Button
										size="sm"
										variant="outline"
									>
										Tentar novamente
									</Button>
								),
								hasMore: true,
								onLoadMore: () => undefined,
							}}
							itemKey="id"
							items={bookings}
							renderItem={(booking) => (
								<span className="text-sm">{booking.guest}</span>
							)}
						/>
					</div>
				</ComponentPreview>
				<CodeBlock
					code={paginationCode}
					filename="booking-feed.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					When nothing paints it for you
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Elsewhere, read the union directly; the compiler flags any missing
					case.
				</p>
				<CodeBlock
					code={switchCode}
					filename="delete-modal.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/loaded')({
	component: Page,
})
