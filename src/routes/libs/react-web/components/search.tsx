import { createFileRoute, Link } from '@tanstack/react-router'
import type {
	DateRange,
	SearchColumns,
	SearchItems,
} from '@turystack/react-web'
import {
	CurrencyInput,
	DateRangeInput,
	Input,
	Search,
	SegmentedControl,
	Select,
	Switch,
} from '@turystack/react-web'
import type { ReactNode } from 'react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Read from `react-web/src/components/search/search.types.ts`. The item type is
 * a union on purpose: `label` is optional on a row item and required on a
 * popover one, so the placement rule is checked by the compiler rather than
 * written down here and hoped for.
 */
const searchProps = [
	{
		description: 'The debounced query field (table below).',
		name: 'filter',
		type: 'SearchFilterProps',
	},
	{
		description: 'The filters, each saying where it lives.',
		name: 'items',
		type: 'SearchItems<T>[]',
	},
	{
		description: 'Current values by item id; read to count active filters.',
		name: 'value',
		type: 'T',
	},
	{
		description: 'Clears filters and query; disabled while nothing to clear.',
		name: 'onReset',
		type: '() => void',
	},
	{
		default: '"bar"',
		description: 'bar for a list screen; grid lays items out as a form.',
		name: 'variant',
		type: '"bar" | "grid"',
	},
	{
		default: '2',
		description: 'Grid only: cells per row, by the grid’s own width.',
		name: 'columns',
		type: '1 | 2 | 3 | 4',
	},
]

/** `SearchFilterProps`, the shape of the `filter` prop. */
const filterProps = [
	{
		description: 'The query, controlled.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'The initial query, when the bar owns it.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Fires with the query, debounced.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
	{
		default: 'labels.search.placeholder',
		description: 'The hint inside the empty field.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'the placeholder’s words',
		description: 'The field’s accessible name; defaults to its placeholder.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Shows the field’s own loader while a search is in flight.',
		name: 'loading',
		type: 'boolean',
	},
]

const itemProps = [
	{
		description: 'A key of value. Names which entry this field is about.',
		name: 'id',
		required: true,
		type: 'keyof T & string',
	},
	{
		description: 'The control itself. It carries its own placeholder.',
		name: 'field',
		required: true,
		type: 'React.ReactNode',
	},
	{
		default: '"inline"',
		description: 'Where it lives: the first row, Show more, or a popover.',
		name: 'placement',
		type: '"inline" | "popover" | "expand"',
	},
	{
		description: 'Beside the field on a row; required above it in a popover.',
		name: 'label',
		type: 'React.ReactNode',
	},
	{
		description: 'Overrides the emptiness rule for this field.',
		name: 'isActive',
		type: '(value: T[K]) => boolean',
	},
]

const usageCode = `// src/features/orders/components/orders-toolbar/orders-toolbar.tsx
import { Search, Select, Switch } from '@turystack/react-web'

export function OrdersToolbar({ onSearchChange, value }: OrdersToolbarProps) {
  // one callback, always the complete object — the page reset lives in the merge
  function change(next: Partial<ListOrdersQueryParams>) {
    onSearchChange({ ...value, ...next, page: 1 })
  }

  function handleQueryChange(term: string | null) {
    change({ search: term ?? undefined })
  }

  function handleStatusChange(next: string[]) {
    change({ status: next.length > 0 ? next.join(',') : undefined })
  }

  function handleArchivedChange(archived: boolean) {
    change({ archived: archived || undefined })
  }

  function handleReset() {
    onSearchChange({ page: 1, perPage: value.perPage })
  }

  return (
    <Search
      filter={{
        // named by the placeholder's words unless ariaLabel says otherwise
        ariaLabel: 'Search orders',
        onChange: handleQueryChange,
        placeholder: 'Search by code or customer',
        value: value.search,
      }}
      items={[
        {
          id: 'status',
          field: (
            <Select
              ariaLabel="Status" // a placeholder is not an accessible name
              mode="multiple"
              onChange={handleStatusChange}
              options={STATUS_OPTIONS}
              placeholder="Filter by status"
              value={value.status?.split(',')}
            />
          ),
        },
        {
          id: 'archived',
          placement: 'popover',
          label: 'Archived',
          field: (
            <Switch checked={value.archived ?? false} onChange={handleArchivedChange} />
          ),
        },
      ]}
      onReset={handleReset}
      value={value}
    />
  )
}`

const gridCode = `// A form's filter section — inside a modal, a sheet, a card
<Search
  columns={3}                      // cells per row once the grid is wide enough
  items={[
    { id: 'guest', label: 'Guest', field: <Input onChange={setGuest} value={criteria.guest} /> },
    { id: 'status', label: 'Status', field: <Select mode="single" … /> },
    { id: 'checkIn', label: 'Check-in', field: <DateRangeInput … /> },
  ]}
  onReset={reset}                  // Reset, in a footer under the cells
  value={criteria}
  variant="grid"
/>`

const countingCode = `// A route's search is not only filters:
{
  "page": 1,                   // no item -> invisible to the count
  "perPage": 20,               // no item -> invisible
  "sort": "-created_at",        // no item -> invisible
  "search": "acme",            // the query field, not a filter
  "status": "paid,pending",    // item -> counts
  "channelId": null,           // item -> does not
  "archived": true             // item -> counts
}
// 2 set, 1 of them in the popover. Badge reads 1. Reset enables.

// Only what you declared as an item can count. Counting every key of
// value would report three filters to someone who set none.`

const STATUS_OPTIONS = [
	{
		label: 'Paid',
		value: 'paid',
	},
	{
		label: 'Awaiting',
		value: 'awaiting',
	},
	{
		label: 'Refunded',
		value: 'refunded',
	},
]

const CHANNEL_OPTIONS = [
	{
		label: 'Web',
		value: 'web',
	},
	{
		label: 'Store',
		value: 'store',
	},
	{
		label: 'Partner',
		value: 'partner',
	},
]

const PRIORITY_OPTIONS = [
	{
		label: 'High',
		value: 'high',
	},
	{
		label: 'Normal',
		value: 'normal',
	},
]

type Filters = {
	archived: boolean
	channelId: string | null
	page: number
	perPage: number
	priority: string | null
	search?: string
	status?: string
}

const EMPTY: Filters = {
	archived: false,
	channelId: null,
	page: 1,
	perPage: 20,
	priority: null,
}

function Code({ children }: { children: ReactNode }) {
	return (
		<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
			{children}
		</code>
	)
}

function Demo({ overflow }: { overflow: 'expand' | 'popover' }) {
	const [value, setValue] = useState<Filters>(EMPTY)

	function change(next: Partial<Filters>) {
		setValue((current) => ({
			...current,
			...next,
			page: 1,
		}))
	}

	function handleQueryChange(search: string | null) {
		change({
			search: search ?? undefined,
		})
	}

	function handleStatusChange(status: string[]) {
		change({
			status: status.length > 0 ? status.join(',') : undefined,
		})
	}

	function handleChannelChange(channelId: string | null) {
		change({
			channelId,
		})
	}

	function handleArchivedChange(archived: boolean) {
		change({
			archived,
		})
	}

	function handlePriorityChange(priority: string | null) {
		change({
			priority,
		})
	}

	function handleReset() {
		setValue(EMPTY)
	}

	const archived = (
		<Switch
			checked={value.archived}
			onCheckedChange={handleArchivedChange}
		/>
	)

	/**
	 * Built per placement rather than shared, because the two are not the same
	 * item. In the popover a field is alone on its line and its label is
	 * required. On the second row it is one of a row of filters: the Switch keeps
	 * its label, beside the field, because a switch has nothing to say for
	 * itself; the Select drops it and introduces itself by its placeholder —
	 * on screen. A placeholder is not an accessible name, so it carries
	 * ariaLabel for assistive tech.
	 */
	const overflowItems: SearchItems<Filters>[] =
		overflow === 'popover'
			? [
					{
						field: archived,
						id: 'archived',
						label: 'Archived',
						placement: 'popover',
					},
					{
						field: (
							<Select
								mode="single"
								onChange={handlePriorityChange}
								optionLabel="label"
								options={PRIORITY_OPTIONS}
								optionValue="value"
								placeholder="Any"
								value={value.priority}
							/>
						),
						id: 'priority',
						label: 'Priority',
						placement: 'popover',
					},
				]
			: [
					{
						field: archived,
						id: 'archived',
						label: 'Archived',
						placement: 'expand',
					},
					{
						field: (
							<Select
								ariaLabel="Priority"
								mode="single"
								onChange={handlePriorityChange}
								optionLabel="label"
								options={PRIORITY_OPTIONS}
								optionValue="value"
								placeholder="Any priority"
								value={value.priority}
							/>
						),
						id: 'priority',
						placement: 'expand',
					},
				]

	return (
		<Search
			filter={{
				onChange: handleQueryChange,
				placeholder: 'Search by code or customer',
				value: value.search,
			}}
			items={[
				{
					field: (
						<Select
							ariaLabel="Status"
							mode="multiple"
							onChange={handleStatusChange}
							optionLabel="label"
							options={STATUS_OPTIONS}
							optionValue="value"
							placeholder="Filter by status"
							value={value.status?.split(',')}
						/>
					),
					id: 'status',
				},
				{
					field: (
						<Select
							ariaLabel="Channel"
							mode="single"
							onChange={handleChannelChange}
							optionLabel="label"
							options={CHANNEL_OPTIONS}
							optionValue="value"
							placeholder="Filter by channel"
							value={value.channelId}
						/>
					),
					id: 'channelId',
				},
				...overflowItems,
			]}
			onReset={handleReset}
			value={value}
		/>
	)
}

/** A form's filter section: every value a field of its own, nothing in a URL. */
type Criteria = {
	channel: string | null
	checkIn: DateRange | null
	guest: string | null
	minimum: number | null
	priority: string | null
	status: string | null
}

const NO_CRITERIA: Criteria = {
	channel: null,
	checkIn: null,
	guest: null,
	minimum: null,
	priority: null,
	status: null,
}

/**
 * The same kind of items as the bar, drawn as a grid. Every item carries a
 * label, because in a cell the label is what sits above the field — and none
 * says where it lives, because a grid has no second row to put it in.
 */
function GridDemo({ columns }: { columns: SearchColumns }) {
	const [value, setValue] = useState<Criteria>(NO_CRITERIA)

	function change(next: Partial<Criteria>) {
		setValue((current) => ({
			...current,
			...next,
		}))
	}

	return (
		<Search<Criteria>
			columns={columns}
			items={[
				{
					field: (
						<Input
							onChange={(guest) =>
								change({
									guest,
								})
							}
							placeholder="Any guest"
							value={value.guest}
						/>
					),
					id: 'guest',
					label: 'Guest',
				},
				{
					field: (
						<Select
							mode="single"
							onChange={(status: string | null) =>
								change({
									status,
								})
							}
							optionLabel="label"
							options={STATUS_OPTIONS}
							optionValue="value"
							placeholder="Any status"
							value={value.status}
						/>
					),
					id: 'status',
					label: 'Status',
				},
				{
					field: (
						<DateRangeInput
							onChange={(checkIn) =>
								change({
									checkIn,
								})
							}
							value={value.checkIn}
						/>
					),
					id: 'checkIn',
					label: 'Check-in',
				},
				{
					field: (
						<CurrencyInput
							onChange={(minimum) =>
								change({
									minimum,
								})
							}
							value={value.minimum}
						/>
					),
					id: 'minimum',
					label: 'Minimum total',
				},
				{
					field: (
						<Select
							mode="single"
							onChange={(channel: string | null) =>
								change({
									channel,
								})
							}
							optionLabel="label"
							options={CHANNEL_OPTIONS}
							optionValue="value"
							placeholder="Any channel"
							value={value.channel}
						/>
					),
					id: 'channel',
					label: 'Channel',
				},
				{
					field: (
						<Select
							mode="single"
							onChange={(priority: string | null) =>
								change({
									priority,
								})
							}
							optionLabel="label"
							options={PRIORITY_OPTIONS}
							optionValue="value"
							placeholder="Any priority"
							value={value.priority}
						/>
					),
					id: 'priority',
					label: 'Priority',
				},
			]}
			onReset={() => setValue(NO_CRITERIA)}
			value={value}
			variant="grid"
		/>
	)
}

const BOX_WIDTHS = [
	{
		label: '360px',
		value: '360',
	},
	{
		label: '512px',
		value: '512',
	},
	{
		label: '768px',
		value: '768',
	},
]

/**
 * The window never changes here — only the box the grid sits in. That is the
 * whole claim of the container query, shown rather than stated.
 */
function WidthDemo() {
	const [width, setWidth] = useState('768')

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<SegmentedControl
				ariaLabel="Width of the box around the grid"
				onChange={(next: string) => setWidth(next)}
				optionLabel="label"
				options={BOX_WIDTHS}
				optionValue="value"
				size="sm"
				value={width}
			/>
			<div
				className="max-w-full rounded-lg border border-border border-dashed p-4"
				style={{
					width: Number(width),
				}}
			>
				<GridDemo columns={3} />
			</div>
		</div>
	)
}

function SearchPage() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Layout
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Search
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A list’s filter bar, or a form’s filter section as a grid.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={searchProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>SearchFilterProps</Code>: the query field, named by{' '}
					<Code>ariaLabel</Code> or its placeholder.
				</p>
				<PropsTable props={filterProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>SearchItems</Code> — one filter. A union on the{' '}
					<Code>placement</Code>, so the label rule is the compiler's to keep.
				</p>
				<PropsTable props={itemProps} />
			</section>

			<SlotsSection slug="search" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Playground</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every filter has a fixed width, so filling one moves nothing.{' '}
					<Code>Reset</Code> stays in place, disabled until needed.
				</p>
				{/*
				 * A list toolbar's width, centred — not the preview's full width, which
				 * is what a filter bar never gets on a real screen.
				 */}
				<ComponentPreview
					className="min-h-44"
					title="the overflow behind a Filters popover"
				>
					<div className="w-full max-w-4xl">
						<Demo overflow="popover" />
					</div>
				</ComponentPreview>
				<ComponentPreview
					className="min-h-44"
					title="the overflow on a second row"
				>
					<div className="w-full max-w-4xl">
						<Demo overflow="expand" />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					As a form’s filter section
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>variant="grid"</Code> makes each item a labelled cell; Reset
					moves to a footer. It is how{' '}
					<Link
						className="text-lib underline underline-offset-4"
						to="/libs/react-web/components/data-transfer-export"
					>
						DataTransferExport
					</Link>{' '}
					draws its filters.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>columns={'{2}'}</Code>, the default: two fields per row. The box
					is as wide as an <Code>md</Code> modal.
				</p>
				<ComponentPreview title='variant="grid" columns={2}, in a md modal’s width'>
					<div className="w-full max-w-lg rounded-lg border border-border border-dashed p-4">
						<GridDemo columns={2} />
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Columns follow the box’s width, not the window’s: one under 384px, two
					from there, three from 672px.
				</p>
				<ComponentPreview title='variant="grid" columns={3}, in a box you size'>
					<WidthDemo />
				</ComponentPreview>
				<CodeBlock
					code={gridCode}
					filename="booking-filters.tsx"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What counts</h2>
				<CodeBlock
					code={countingCode}
					filename="counting.jsonc"
					language="tsx"
				/>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="orders-toolbar.tsx"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute('/libs/react-web/components/search')({
	component: SearchPage,
})
