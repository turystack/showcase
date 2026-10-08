import { createFileRoute, Link } from '@tanstack/react-router'
import type {
	DataTransferExportConfig,
	DataTransferFilterValues,
	DataTransferFormat,
	DataTransferJob,
	DataTransferStatus,
	DataTransferSurface,
	DateRange,
} from '@turystack/react-web'
import { Button, DataTransferExport, EmptyState } from '@turystack/react-web'
import { FileDown } from 'lucide-react'
import type { ReactElement } from 'react'
import { useEffect, useState, useSyncExternalStore } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const exportProps = [
	{
		description: 'Exportable columns; at least one must stay ticked.',
		name: 'columns',
		required: true,
		type: 'DataTransferColumn<T>[]',
	},
	{
		description: 'Starts the export and returns the API job; may throw.',
		name: 'onExport',
		required: true,
		type: '(config: DataTransferExportConfig<T>) => Promise<DataTransferJob>',
	},
	{
		description: 'Router link to the export’s own page.',
		name: 'resultLink',
		required: true,
		type: '(job: DataTransferJob) => React.ReactNode',
	},
	{
		description: 'Result step content, usually Download over the job.',
		name: 'result',
		type: '(job: DataTransferJob) => React.ReactNode',
	},
	{
		description: 'Filter section, declared by what each filter is.',
		name: 'filters',
		type: 'DataTransferFilter[]',
	},
	{
		description: 'Current page filters; the export opens with them.',
		name: 'defaultValues',
		type: 'Record<string, unknown>',
	},
	{
		default: '["csv", "xlsx", "json"]',
		description: 'Formats to offer.',
		name: 'formats',
		type: 'DataTransferFormat[]',
	},
	{
		default: 'the first offered',
		description: 'Which format starts picked.',
		name: 'defaultFormat',
		type: 'DataTransferFormat',
	},
	{
		default: 'all',
		description: 'Which columns start ticked.',
		name: 'defaultColumns',
		type: '(keyof T & string)[]',
	},
	{
		description: 'What is being exported; titles the surface.',
		name: 'entity',
		type: '{ plural: string; singular?: string }',
	},
	{
		default: '"sheet"',
		description: 'Surface the form is shown in.',
		name: 'surface',
		type: '"modal" | "sheet"',
	},
	{
		default: '"md"',
		description: 'Surface width, in the Modal and Sheet scale.',
		name: 'size',
		type: '"sm" | "md" | "lg" | "xl"',
	},
	{
		description: 'Overrides what the entity would have said.',
		name: 'title',
		type: 'string',
	},
	{
		description: 'Overrides what the entity would have said.',
		name: 'description',
		type: 'string',
	},
	{
		description: 'What opens it. Its own onClick still fires.',
		name: 'trigger',
		type: 'React.ReactElement',
	},
	{
		description: 'Controlled visibility.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Uncontrolled initial visibility.',
		name: 'defaultOpen',
		type: 'boolean',
	},
	{
		description: 'Fires when it opens or closes.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
]

const partProps = [
	{
		description: 'Filter kind; picks the input (text, date, select…).',
		name: 'type',
		required: true,
		type: 'DataTransferFilterType',
	},
	{
		description: 'DataTransferFilter / DataTransferColumn: identity.',
		name: 'key',
		required: true,
		type: 'string',
	},
	{
		description: 'DataTransferFilter / DataTransferColumn: what it is called.',
		name: 'label',
		required: true,
		type: 'string',
	},
	{
		description: 'Options for select and multiSelect filters.',
		name: 'options',
		type: '{ label: string; value: string }[]',
	},
	{
		description: 'DataTransferFilter: what the empty field says.',
		name: 'placeholder',
		type: 'string',
	},
	{
		description: 'Import only: mapping needs it. Export ignores it.',
		name: 'required',
		type: 'boolean',
	},
	{
		description: 'Why the column exists; shown as a tooltip.',
		name: 'hint',
		type: 'string',
	},
	{
		description: 'Sample value shown in the import template.',
		name: 'example',
		type: 'string',
	},
]

const downloadProps = [
	{
		description: 'File status; Download stays visible, disabled.',
		name: 'status',
		required: true,
		type: '"pending" | "success" | "error"',
	},
	{
		description: 'File URL once it exists; the button becomes a link.',
		name: 'href',
		type: 'string',
	},
	{
		description: 'Fetches the file when an href cannot.',
		name: 'onDownload',
		type: '() => void',
	},
	{
		description: 'Label once ready; the saved file name with href.',
		name: 'fileName',
		type: 'string',
	},
	{
		default: 'labels.transfer.fileFailed',
		description: 'Why no file came out. Shown instead of the button.',
		name: 'error',
		type: 'string',
	},
]

const usageCode = `import { Link } from '@tanstack/react-router'
import { columnsFromTable, DataTransferExport } from '@turystack/react-web'

import { useExport, useStartExport } from '@/~sdk/bookings'

<DataTransferExport
  columns={columnsFromTable(columns)}
  defaultValues={listQuery}          // what the page is already filtered by
  entity={{ plural: 'bookings' }}
  filters={[
    { key: 'guest', label: 'Guest', type: 'text' },
    { key: 'status', label: 'Status', options: statuses, type: 'select' },
    { key: 'checkIn', label: 'Check-in', type: 'dateRange' },
    { key: 'price', label: 'Price', type: 'money' },
  ]}
  onExport={(config) => startExport.mutateAsync(config)}   // answers { id }
  result={(job) => <ExportFile id={job.id} />}
  resultLink={(job) => (
    <Link params={{ exportId: job.id }} to="/exports/$exportId">
      Open the export
    </Link>
  )}
  trigger={<Button variant="outline">Export</Button>}
/>

// The same component on the Result step and on /exports/$exportId
function ExportFile({ id }: { id: string }) {
  const { data } = useExport(id, {
    // asks again while the file is being built, and never after
    refetchInterval: (query) =>
      query.state.data?.status === 'pending' ? 2000 : false,
  })

  return (
    <DataTransferExport.Download
      error={data?.error}
      fileName={data?.fileName}
      href={data?.url}
      status={data?.status ?? 'pending'}
    />
  )
}`

type Booking = {
	checkIn: string
	code: string
	guest: string
	id: string
	price: number
	status: string
}

const BOOKINGS: Booking[] = [
	{
		checkIn: '2026-10-02',
		code: 'TRY-1041',
		guest: 'Ada Lovelace',
		id: 'bkg_01',
		price: 128000,
		status: 'confirmed',
	},
	{
		checkIn: '2026-10-09',
		code: 'TRY-1042',
		guest: 'Grace Hopper',
		id: 'bkg_02',
		price: 94000,
		status: 'pending',
	},
	{
		checkIn: '2026-10-14',
		code: 'TRY-1043',
		guest: 'Ada Lovelace',
		id: 'bkg_03',
		price: 57500,
		status: 'confirmed',
	},
	{
		checkIn: '2026-10-21',
		code: 'TRY-1044',
		guest: 'Katherine Johnson',
		id: 'bkg_04',
		price: 210000,
		status: 'confirmed',
	},
	{
		checkIn: '2026-11-03',
		code: 'TRY-1045',
		guest: 'Ada Lovelace',
		id: 'bkg_05',
		price: 76000,
		status: 'pending',
	},
	{
		checkIn: '2026-11-11',
		code: 'TRY-1046',
		guest: 'Margaret Hamilton',
		id: 'bkg_06',
		price: 132000,
		status: 'confirmed',
	},
	{
		checkIn: '2026-11-28',
		code: 'TRY-1047',
		guest: 'Ada Lovelace',
		id: 'bkg_07',
		price: 188000,
		status: 'confirmed',
	},
]

const COLUMNS = [
	{
		hint: 'The reference every other system joins on',
		key: 'id' as const,
		label: 'Id',
	},
	{
		key: 'code' as const,
		label: 'Code',
	},
	{
		key: 'guest' as const,
		label: 'Guest',
	},
	{
		key: 'status' as const,
		label: 'Status',
	},
	{
		key: 'checkIn' as const,
		label: 'Check-in',
	},
	{
		key: 'price' as const,
		label: 'Price',
	},
]

const FILTERS = [
	{
		key: 'guest',
		label: 'Guest',
		placeholder: 'Any guest',
		type: 'text' as const,
	},
	{
		key: 'status',
		label: 'Status',
		options: [
			{
				label: 'Confirmed',
				value: 'confirmed',
			},
			{
				label: 'Pending',
				value: 'pending',
			},
		],
		type: 'select' as const,
	},
	{
		key: 'checkIn',
		label: 'Check-in',
		type: 'dateRange' as const,
	},
	{
		key: 'price',
		label: 'Minimum price',
		type: 'money' as const,
	},
]

/** The two this page's fake API can actually build. */
const FORMATS: DataTransferFormat[] = [
	'csv',
	'json',
]

const SEND_MS = 900 // the request that starts an export
const BUILD_MS = 3000 // the API building the file after it answered
const POLL_MS = 500 // how often the product's query asks again

/**
 * What the API keeps of an export. It belongs to the API, not to the surface
 * that started it: closing the surface loses nothing, and the export's own
 * page further down reads the very same record.
 */
type ExportRecord = {
	error?: string
	fileName: string
	href?: string
	id: string
	status: DataTransferStatus
}

const exportsById = new Map<string, ExportRecord>()
const listeners = new Set<() => void>()
let latestExport: DataTransferJob | null = null

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function isSet(value: unknown) {
	return value !== undefined && value !== null && value !== ''
}

/** The sample rows the config's filters let through. */
function matches(booking: Booking, filters: DataTransferFilterValues) {
	const guest = filters.guest as string | null | undefined
	const status = filters.status as string | null | undefined
	const checkIn = filters.checkIn as DateRange | null | undefined
	const minimum = filters.price as number | null | undefined
	const day = new Date(`${booking.checkIn}T00:00:00`)

	return (
		(!isSet(guest) ||
			booking.guest.toLowerCase().includes(String(guest).toLowerCase())) &&
		(!isSet(status) || booking.status === status) &&
		(!checkIn?.from || day >= checkIn.from) &&
		(!checkIn?.to || day <= checkIn.to) &&
		(!isSet(minimum) || booking.price >= Number(minimum))
	)
}

/** Money leaves in currency units, not the cents the rows hold. */
function cell(booking: Booking, key: keyof Booking) {
	return key === 'price' ? booking.price / 100 : booking[key]
}

/** A real file: the rows the filters let through, the columns in declared order. */
function fileOf({
	columns,
	filters,
	format,
}: DataTransferExportConfig<Booking>) {
	const rows = BOOKINGS.filter((booking) => matches(booking, filters))

	if (format === 'json') {
		return new Blob(
			[
				JSON.stringify(
					rows.map((booking) =>
						Object.fromEntries(
							columns.map((key) => [
								key,
								cell(booking, key),
							]),
						),
					),
					null,
					2,
				),
			],
			{
				type: 'application/json',
			},
		)
	}

	const lines = [
		columns.map(
			(key) => COLUMNS.find((column) => column.key === key)?.label ?? key,
		),
		...rows.map((booking) =>
			columns.map((key) =>
				key === 'price' ? (booking.price / 100).toFixed(2) : cell(booking, key),
			),
		),
	]

	return new Blob(
		[
			lines
				.map((line) =>
					line
						.map((value) => `"${String(value).replace(/"/g, '""')}"`)
						.join(','),
				)
				.join('\n'),
		],
		{
			type: 'text/csv;charset=utf-8',
		},
	)
}

/**
 * The page's stand-in for the product's API. `onExport` is the request that
 * opens a job and answers with its id; the file is built afterwards, on the
 * API's own time, and nobody holds a promise open for it.
 */
async function startExport(
	config: DataTransferExportConfig<Booking>,
	noun = 'bookings',
): Promise<DataTransferJob> {
	await wait(SEND_MS)

	const id = `exp_${Math.random().toString(36).slice(2, 8)}`
	const fileName = `${noun}-${id}.${config.format}`

	exportsById.set(id, {
		fileName,
		id,
		status: 'pending',
	})

	setTimeout(() => {
		exportsById.set(id, {
			fileName,
			href: URL.createObjectURL(fileOf(config)),
			id,
			status: 'success',
		})
	}, BUILD_MS)

	latestExport = {
		id,
	}
	for (const listener of listeners) {
		listener()
	}

	return {
		id,
	}
}

/** An API that says no — the refusal lands back on the Data step. */
async function refuseExport(): Promise<DataTransferJob> {
	await wait(SEND_MS)

	throw new Error(
		'Exports are paused while tonight’s billing run finishes. Try again after 06:00.',
	)
}

function subscribe(listener: () => void) {
	listeners.add(listener)

	return () => {
		listeners.delete(listener)
	}
}

/**
 * Stands in for the product's query — `useExport(id)` with a `refetchInterval`
 * that stops once the file exists. It asks again while the export is pending
 * and never after.
 */
function useExportQuery(id: string) {
	const [, setAsked] = useState(0)
	const record = exportsById.get(id)
	const pending = record?.status === 'pending'

	useEffect(() => {
		if (!pending) {
			return
		}

		const timer = window.setInterval(
			() => setAsked((count) => count + 1),
			POLL_MS,
		)

		return () => window.clearInterval(timer)
	}, [
		pending,
	])

	return record
}

/** One component for the Result step and for the export's own page. */
function ExportFile({ job }: { job: DataTransferJob }) {
	const record = useExportQuery(job.id)

	return (
		<DataTransferExport.Download
			error={record?.error}
			fileName={record?.fileName}
			href={record?.href}
			status={record?.status ?? 'pending'}
		/>
	)
}

/**
 * Controlled only so the link can close the surface. In an app the link goes
 * to another route and the surface goes with the page it was on; here the
 * export's page is a section of this same route, so the link closes it on the
 * way there.
 */
function ExportDemo({
	defaultValues,
	filters = FILTERS,
	noun,
	onExport,
	surface,
	trigger,
}: {
	defaultValues?: DataTransferFilterValues
	filters?: typeof FILTERS
	noun: string
	onExport?: (
		config: DataTransferExportConfig<Booking>,
	) => Promise<DataTransferJob>
	surface?: DataTransferSurface
	trigger: ReactElement
}) {
	const [open, setOpen] = useState(false)

	return (
		<DataTransferExport<Booking>
			columns={COLUMNS}
			defaultValues={defaultValues}
			entity={{
				plural: noun,
			}}
			filters={filters}
			formats={FORMATS}
			onExport={onExport ?? ((config) => startExport(config, noun))}
			onOpenChange={setOpen}
			open={open}
			result={(job) => <ExportFile job={job} />}
			resultLink={(job) => (
				<Link
					hash="export-result"
					onClick={() => {
						setOpen(false)
						// The router scrolls to a hash only when the URL changes, so a
						// second trip, with the hash already there, would stay put.
						document.getElementById('export-result')?.scrollIntoView()
					}}
					to="/libs/react-web/components/data-transfer-export"
				>
					Export {job.id}
				</Link>
			)}
			surface={surface}
			trigger={trigger}
		/>
	)
}

/** A small file that already exists, for the Download part's ready state. */
const READY_HREF = `data:text/csv;charset=utf-8,${encodeURIComponent('Code,Guest\nTRY-1041,Ada Lovelace\n')}`

function Page() {
	const latest = useSyncExternalStore(subscribe, () => latestExport)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					DataTransfer
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					DataTransferExport
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Two steps: choose the rows, format and columns, then follow the file.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={exportProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Filters and columns
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A filter is declared by what it <em>is</em>, never by which input
					draws it.
				</p>
				<PropsTable props={partProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					DataTransferExport.Download
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The export’s file. Download stays on screen, disabled until the file
					exists; a failed file shows the reason.
				</p>
				<PropsTable props={downloadProps} />
				<ComponentPreview title="pending, success, error">
					<div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
						<DataTransferExport.Download status="pending" />
						<DataTransferExport.Download
							fileName="bookings.csv"
							href={READY_HREF}
							status="success"
						/>
						<DataTransferExport.Download
							error="The warehouse did not answer in time."
							status="error"
						/>
					</div>
				</ComponentPreview>
			</section>

			<SlotsSection slug="data-transfer-export" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					From the form to the file
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Open it: the Data step carries the page filters. Clear every column
					and Export disables. Hover Id for its tooltip.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Export opens a fake job; Download enables after about three seconds.
					The CSV or JSON file is real.
				</p>
				<ComponentPreview title="Data, then Result">
					<ExportDemo
						defaultValues={{
							guest: 'Ada',
							status: 'confirmed',
						}}
						noun="bookings"
						trigger={
							<Button
								leftSection={<FileDown className="size-4" />}
								variant="outline"
							>
								Export bookings
							</Button>
						}
					/>
				</ComponentPreview>
			</section>

			<section
				className="scroll-mt-8 space-y-4"
				id="export-result"
			>
				<h2 className="font-display font-semibold text-xl">
					The export’s own page
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Where{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						resultLink
					</code>{' '}
					leads: the same{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						DataTransferExport.Download
					</code>{' '}
					over the same job. Close the export early and watch it finish here.
				</p>
				<ComponentPreview
					title={latest ? `exports/${latest.id}` : 'no export yet'}
				>
					{latest ? (
						<div className="w-full max-w-sm">
							<ExportFile job={latest} />
						</div>
					) : (
						<EmptyState
							description="Start one above and it appears here, still building if it has not finished."
							icon={<FileDown />}
							title="No export yet"
						/>
					)}
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					When the API says no
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onExport
					</code>{' '}
					may throw: the Data step returns with the reason and every choice
					kept.
				</p>
				<ComponentPreview title="onExport throws">
					<ExportDemo
						filters={FILTERS.slice(0, 2)}
						noun="bookings"
						onExport={refuseExport}
						surface="modal"
						trigger={<Button variant="outline">Export bookings</Button>}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Modal or sheet</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same form in any surface.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						entity
					</code>{' '}
					sets the title;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size
					</code>{' '}
					sets the width, from{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">md</code>.
				</p>
				<ComponentPreview title="Same component, two surfaces">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<ExportDemo
							filters={FILTERS.slice(0, 2)}
							noun="guests"
							surface="modal"
							trigger={<Button variant="outline">In a modal</Button>}
						/>
						<ExportDemo
							filters={FILTERS.slice(0, 2)}
							noun="invoices"
							surface="sheet"
							trigger={<Button variant="outline">In a sheet</Button>}
						/>
					</div>
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

export const Route = createFileRoute(
	'/libs/react-web/components/data-transfer-export',
)({
	component: Page,
})
