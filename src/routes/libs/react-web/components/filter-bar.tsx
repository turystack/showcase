import { createFileRoute } from '@tanstack/react-router'
import {
	Button,
	type DateRange,
	DateRangeInput,
	FilterBar,
	FilterChip,
	Radio,
} from '@turystack/react-web'
import { Columns3 } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/filter-bar/filter-bar.types.ts`
 * and `filter-bar.tsx`. The component is `PropsWithChildren<FilterBarProps>`
 * — the children are the chips. There is deliberately no count prop: the
 * chips report their own state through the bar's context.
 */
const filterBarProps = [
	{
		description: 'The FilterChips.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'Clears the filters; leave locked chips as they are.',
		name: 'onClear',
		type: '() => void',
	},
	{
		description: 'Content at the end of the row.',
		name: 'trailing',
		type: 'React.ReactNode',
	},
	{
		description: 'Names the fieldset. Defaults to the filterBar.label label.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const usageCode = `import { DateRangeInput, FilterBar, FilterChip } from '@turystack/react-web'

<FilterBar
  onClear={() => {
    setStatus(undefined)
    setGuests(undefined)
  }}
  trailing={<DateRangeInput onChange={setRange} value={range} />}
>
  <FilterChip label="Status" onRemove={() => setStatus(undefined)} value={status}>
    <StatusPicker onChange={setStatus} />
  </FilterChip>
  <FilterChip label="Hóspedes" onRemove={() => setGuests(undefined)} value={guests}>
    <GuestsPicker onChange={setGuests} />
  </FilterChip>
</FilterBar>

// No count prop: the bar learns which chips are active from the chips.`

type Option = {
	label: string
	value: string
}

const statuses: Option[] = [
	{
		label: 'Confirmada',
		value: 'Confirmada',
	},
	{
		label: 'Pendente',
		value: 'Pendente',
	},
	{
		label: 'Cancelada',
		value: 'Cancelada',
	},
]

const guestCounts: Option[] = [
	{
		label: '1 hóspede',
		value: '1',
	},
	{
		label: '2 hóspedes',
		value: '2',
	},
	{
		label: '3 ou mais',
		value: '3+',
	},
]

const channels: Option[] = [
	{
		label: 'Site',
		value: 'Site',
	},
	{
		label: 'Booking',
		value: 'Booking',
	},
	{
		label: 'Airbnb',
		value: 'Airbnb',
	},
]

/** A chip whose picker closes itself once a value is chosen. */
function PickerChip({
	label,
	onChange,
	options,
	value,
}: {
	label: string
	onChange: (next: string | undefined) => void
	options: Option[]
	value: string | undefined
}) {
	const [open, setOpen] = useState(false)
	const chosen = options.find((option) => option.value === value)

	return (
		<FilterChip
			label={label}
			onOpenChange={setOpen}
			onRemove={() => onChange(undefined)}
			open={open}
			value={chosen?.label}
		>
			<div className="w-48">
				<Radio.Group
					items={options}
					onChange={(next) => {
						onChange(next)
						setOpen(false)
					}}
					value={value}
				/>
			</div>
		</FilterChip>
	)
}

function ReservationsFilters({ trailing }: { trailing: 'date' | 'columns' }) {
	const [status, setStatus] = useState<string>()
	const [guests, setGuests] = useState<string>()
	const [channel, setChannel] = useState<string>()
	const [range, setRange] = useState<DateRange | null>(null)

	return (
		<div className="w-full">
			<FilterBar
				onClear={() => {
					setStatus(undefined)
					setGuests(undefined)
					setChannel(undefined)
				}}
				trailing={
					trailing === 'date' ? (
						<div className="w-64">
							<DateRangeInput
								onChange={setRange}
								placeholder="Check-in"
								size="sm"
								value={range}
							/>
						</div>
					) : (
						<Button
							leftSection={<Columns3 />}
							size="sm"
							variant="outline"
						>
							Editar colunas
						</Button>
					)
				}
			>
				<PickerChip
					label="Status"
					onChange={setStatus}
					options={statuses}
					value={status}
				/>
				<PickerChip
					label="Hóspedes"
					onChange={setGuests}
					options={guestCounts}
					value={guests}
				/>
				<PickerChip
					label="Canal"
					onChange={setChannel}
					options={channels}
					value={channel}
				/>
			</FilterBar>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Data
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					FilterBar
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The row of{' '}
					<a
						className="underline underline-offset-4"
						href="/libs/react-web/components/filter-chip"
					>
						FilterChips
					</a>{' '}
					above a table.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={filterBarProps} />
			</section>

			<SlotsSection slug="filter-bar" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Clear filters</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Shown while any chip holds a value; no count prop. Using it moves
					focus to the first chip.
				</p>
				<ComponentPreview title="With a date range">
					<ReservationsFilters trailing="date" />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Trailing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						trailing
					</code>{' '}
					stays at the end of the row, and wraps with it.
				</p>
				<ComponentPreview title="Edit columns button">
					<ReservationsFilters trailing="columns" />
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

export const Route = createFileRoute('/libs/react-web/components/filter-bar')({
	component: Page,
})
