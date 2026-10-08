import { createFileRoute, Link } from '@tanstack/react-router'
import { useDataOutcome } from '@turystack/react-hooks'
import type {
	DataTransferImportMeta,
	DataTransferImportRecord,
	DataTransferJob,
	DataTransferSurface,
} from '@turystack/react-web'
import { Button, DataTransferImport, EmptyState } from '@turystack/react-web'
import { FileUp } from 'lucide-react'
import type { ReactElement } from 'react'
import { useEffect, useState, useSyncExternalStore } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const importProps = [
	{
		description: 'Columns a row can hold; required ones block mapping.',
		name: 'columns',
		required: true,
		type: 'DataTransferColumn<T>[]',
	},
	{
		description: 'Starts the import with validated rows; returns the job.',
		name: 'onImport',
		required: true,
		type: '(rows: T[], meta: { lines, mapping, raw }) => Promise<DataTransferJob>',
	},
	{
		description: 'Router link to the import’s own page.',
		name: 'resultLink',
		required: true,
		type: '(job: DataTransferJob) => React.ReactNode',
	},
	{
		description: 'Result step content, usually Records over the job.',
		name: 'result',
		type: '(job: DataTransferJob) => React.ReactNode',
	},
	{
		description: 'Per-row validation; any zod schema fits.',
		name: 'schema',
		type: 'StandardSchema<T>',
	},
	{
		description: 'Cross-row checks, e.g. duplicates within the file.',
		name: 'onValidate',
		type: '(rows: T[]) => DataTransferImportIssue[]',
	},
	{
		description: 'Parser for non-CSV formats or server-side imports.',
		name: 'parse',
		type: '(file: File) => Promise<{ headers, rows }>',
	},
	{
		default: '".csv,text/csv"',
		description: 'Accepted file types; pair with parse for non-CSV.',
		name: 'accept',
		type: 'string',
	},
	{
		description: 'Most rows a file may hold; more is refused.',
		name: 'maxRows',
		type: 'number',
	},
	{
		default: '"template.csv"',
		description: 'What the template downloads as.',
		name: 'templateFileName',
		type: 'string',
	},
	{
		description: 'What is being imported; titles the surface.',
		name: 'entity',
		type: '{ plural: string; singular?: string }',
	},
	{
		default: '"sheet"',
		description: 'Where the four steps are shown.',
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

const recordsProps = [
	{
		description: 'Columns to show and their labels.',
		name: 'columns',
		required: true,
		type: 'DataTransferColumn<T>[]',
	},
	{
		description: 'The page shown, as a DataOutcome from the query.',
		name: 'outcome',
		required: true,
		type: 'DataOutcome<DataTransferImportRecord<T>[]>',
	},
	{
		description: 'Required pagination; the list never loads whole.',
		name: 'pagination',
		required: true,
		type: 'PaginationProps',
	},
]

const recordShape = [
	{
		description: 'Source file row number, as shown in the Check step.',
		name: 'row',
		required: true,
		type: 'number',
	},
	{
		description: 'What the row held, keyed by column.',
		name: 'values',
		required: true,
		type: 'Partial<Record<keyof T, string | number | boolean | null>>',
	},
	{
		description: 'Row status: pending, success or error.',
		name: 'status',
		required: true,
		type: '"pending" | "success" | "error"',
	},
	{
		description: 'Why the API refused the row (status error).',
		name: 'errors',
		type: 'string[]',
	},
]

const usageCode = `import { Link } from '@tanstack/react-router'
import { useDataOutcome } from '@turystack/react-hooks'
import { DataTransferImport } from '@turystack/react-web'

import {
  createBookingSchema,
  useImportBookings,
  useImportRecords,
} from '@/~sdk/bookings'

<DataTransferImport
  columns={columns}
  entity={{ plural: 'bookings' }}
  maxRows={5000}
  onImport={(rows, { lines }) =>
    importBookings.mutateAsync({ data: rows, lines })     // answers { id }
  }
  result={(job) => <ImportRecords id={job.id} />}
  resultLink={(job) => (
    <Link params={{ importId: job.id }} to="/imports/$importId">
      Open the import
    </Link>
  )}
  schema={createBookingSchema}      // the same schema the form validates with
  surface="sheet"
  templateFileName="bookings-template.csv"
  trigger={<Button>Import</Button>}
/>

// The same component on the Result step and on /imports/$importId
function ImportRecords({ id }: { id: string }) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const query = useImportRecords(
    { id, page, perPage },
    // asks again while the API is still working through the rows
    { refetchInterval: (query) => (query.state.data?.pending ? 2000 : false) },
  )
  const outcome = useDataOutcome({
    // A poll is not a refresh the reader asked for: only a page change is.
    // Passed through, isFetching becomes \`refreshing\` and the table dims
    // under a spinner on every tick of the interval.
    query: { ...query, isFetching: query.isPlaceholderData },
    select: (answer) => answer.records,
  })

  return (
    <DataTransferImport.Records
      columns={columns}
      outcome={outcome}
      pagination={{
        mode: 'offset',
        onPageChange: setPage,
        onRowsPerPageChange: setPerPage,
        page,
        rowsPerPage: perPage,
        total: query.data?.total ?? 0,
      }}
    />
  )
}

// A file too big for the browser: upload it, let the API read the headers
<DataTransferImport
  accept=".xlsx"
  columns={columns}
  onImport={commit}
  parse={async (file) => {
    const { key } = await uploadToBucket(file)
    return api.inspectImport({ key })
  }}
  resultLink={(job) => (
    <Link params={{ importId: job.id }} to="/imports/$importId">
      Open the import
    </Link>
  )}
/>`

type Booking = {
	code: string
	guest: string
	price: number
}

const COLUMNS = [
	{
		example: 'TRY-1041',
		key: 'code' as const,
		label: 'Code',
		required: true,
	},
	{
		example: 'Ada Lovelace',
		key: 'guest' as const,
		label: 'Guest',
	},
	{
		example: '128000',
		hint: 'In cents, the way CurrencyInput reads it',
		key: 'price' as const,
		label: 'Price',
	},
]

/**
 * Twelve bookings, three of which the API will refuse: one code it already
 * holds, one code that appears twice in the file, and one price that is not a
 * number. Enough lines for the records to span three pages.
 */
const SAMPLE_CSV = [
	'Code,Guest,Price',
	'TRY-1041,Ada Lovelace,128000',
	'TRY-1042,Grace Hopper,94000',
	'TRY-1001,Alan Turing,210000',
	'TRY-1043,Katherine Johnson,76000',
	'TRY-1044,Margaret Hamilton,"R$ 1.320,00"',
	'TRY-1045,Hedy Lamarr,132000',
	'TRY-1046,Radia Perlman,88000',
	'TRY-1042,Barbara Liskov,99000',
	'TRY-1047,Frances Allen,154000',
	'TRY-1048,Edsger Dijkstra,67000',
	'TRY-1049,Donald Knuth,112000',
	'TRY-1050,Leslie Lamport,143000',
].join('\n')

const SAMPLE_HREF = `data:text/csv;charset=utf-8,${encodeURIComponent(SAMPLE_CSV)}`

const SEND_MS = 900 // the request that starts an import
const STEP_MS = 800 // how long the API takes to reach the next rows
const BATCH = 2 // how many rows it reaches each step
const POLL_MS = 500 // how often the product's query asks again

/** Codes the fake API already holds, so a line of the sample collides with a real booking. */
const TAKEN = new Set([
	'TRY-1001',
])

/**
 * What the API keeps of an import: every row with the fate it will reach, and
 * when it started. It belongs to the API, not to the surface that started it —
 * the import's own page further down reads the very same record.
 */
type ImportJob = {
	records: DataTransferImportRecord<Booking>[]
	startedAt: number
}

const importsById = new Map<string, ImportJob>()
const listeners = new Set<() => void>()
let latestImport: DataTransferJob | null = null

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * The checks only the server can run, and the one this page left to it by
 * passing no schema. A booking already in the system is invisible to the
 * browser; a price that is not a number would be caught by a schema, and here
 * reaches the API to be refused on its own line.
 */
function verdict(row: Booking, line: number, seen: Map<string, number>) {
	const errors: string[] = []
	const code = String(row.code ?? '').trim()
	const price = String(row.price ?? '').trim()

	if (TAKEN.has(code)) {
		errors.push(`A booking with code ${code} already exists`)
	} else if (seen.has(code)) {
		errors.push(
			`Code ${code} already appears on line ${seen.get(code)} of this import`,
		)
	} else {
		seen.set(code, line)
	}

	if (String(row.guest ?? '').trim() === '') {
		errors.push('Guest is required')
	}

	if (price !== '' && Number.isNaN(Number(price))) {
		errors.push(`Price is not a number: “${price}”`)
	}

	return errors
}

/**
 * The page's stand-in for the product's API. `onImport` is the request that
 * opens a job and answers with its id; the rows are worked through afterwards,
 * on the API's own time, and nobody holds a promise open for them.
 */
async function startImport(
	rows: Booking[],
	{ lines }: DataTransferImportMeta,
): Promise<DataTransferJob> {
	await wait(SEND_MS)

	const id = `imp_${Math.random().toString(36).slice(2, 8)}`
	const seen = new Map<string, number>()

	importsById.set(id, {
		records: rows.map((row, index) => {
			// The file's row, not the position in `rows`: a row refused at the
			// Check step is not sent, and every position after it shifts.
			const line = lines[index] ?? index + 1
			const errors = verdict(row, line, seen)

			return {
				errors,
				row: line,
				status: errors.length > 0 ? 'error' : 'success',
				values: {
					code: row.code,
					guest: row.guest,
					price: row.price,
				},
			}
		}),
		startedAt: Date.now(),
	})

	latestImport = {
		id,
	}
	for (const listener of listeners) {
		listener()
	}

	return {
		id,
	}
}

function subscribe(listener: () => void) {
	listeners.add(listener)

	return () => {
		listeners.delete(listener)
	}
}

/**
 * One page of an import's rows, as the API would answer it: the rows it has
 * reached carry their fate, the rest are still pending.
 */
function readRecords(id: string, page: number, perPage: number) {
	const job = importsById.get(id)

	if (!job) {
		return {
			pending: 0,
			records: [],
			total: 0,
		}
	}

	const reached = Math.floor((Date.now() - job.startedAt) / STEP_MS) * BATCH
	const records = job.records.map(
		(record, index): DataTransferImportRecord<Booking> =>
			index < reached
				? record
				: {
						row: record.row,
						status: 'pending',
						values: record.values,
					},
	)

	return {
		pending: Math.max(0, job.records.length - reached),
		records: records.slice((page - 1) * perPage, page * perPage),
		total: job.records.length,
	}
}

/**
 * Stands in for the product's query — `useImportRecords({ id, page, perPage })`
 * with a `refetchInterval` that stops once no row is pending. It asks again
 * while the API is working and never after.
 */
function useRecordsQuery(id: string, page: number, perPage: number) {
	const [, setAsked] = useState(0)
	const data = readRecords(id, page, perPage)
	const working = data.pending > 0

	useEffect(() => {
		if (!working) {
			return
		}

		const timer = window.setInterval(
			() => setAsked((count) => count + 1),
			POLL_MS,
		)

		return () => window.clearInterval(timer)
	}, [
		working,
	])

	return {
		data,
		// Not a refetch the reader started: the pending badges already say the
		// API is working, and a table dimmed under a spinner would hide the very
		// rows that are settling.
		isFetching: false,
		isPending: false,
		refetch: () => setAsked((count) => count + 1),
	}
}

/** One component for the Result step and for the import's own page. */
function ImportRecords({ job }: { job: DataTransferJob }) {
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(5)
	const query = useRecordsQuery(job.id, page, perPage)
	const outcome = useDataOutcome({
		query,
		select: (answer) => answer.records,
	})

	return (
		<DataTransferImport.Records
			columns={COLUMNS}
			outcome={outcome}
			pagination={{
				mode: 'offset',
				onPageChange: setPage,
				onRowsPerPageChange: (next) => {
					setPerPage(next)
					setPage(1)
				},
				page,
				rowsPerPage: perPage,
				rowsPerPageOptions: [
					5,
					10,
					20,
				],
				total: query.data.total,
			}}
		/>
	)
}

/**
 * Controlled only so the link can close the surface. In an app the link goes
 * to another route and the surface goes with the page it was on; here the
 * import's page is a section of this same route, so the link closes it on the
 * way there.
 */
function ImportDemo({
	noun,
	surface,
	trigger,
}: {
	noun: string
	surface?: DataTransferSurface
	trigger: ReactElement
}) {
	const [open, setOpen] = useState(false)

	return (
		<DataTransferImport<Booking>
			columns={COLUMNS}
			entity={{
				plural: noun,
			}}
			maxRows={500}
			onImport={startImport}
			onOpenChange={setOpen}
			open={open}
			result={(job) => <ImportRecords job={job} />}
			resultLink={(job) => (
				<Link
					hash="import-result"
					onClick={() => {
						setOpen(false)
						// The router scrolls to a hash only when the URL changes, so a
						// second trip, with the hash already there, would stay put.
						document.getElementById('import-result')?.scrollIntoView()
					}}
					to="/libs/react-web/components/data-transfer-import"
				>
					Import {job.id}
				</Link>
			)}
			surface={surface}
			templateFileName={`${noun}-template.csv`}
			trigger={trigger}
		/>
	)
}

function Code({ children }: { children: string }) {
	return (
		<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
			{children}
		</code>
	)
}

function Page() {
	const latest = useSyncExternalStore(subscribe, () => latestImport)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					DataTransfer
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					DataTransferImport
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Rows in from a file, in four steps: pick, map, check, and follow the
					API.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={importProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					DataTransferImport.Records
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Import rows as the API processes them. Takes a{' '}
					<Code>DataOutcome</Code> and is always paginated.
				</p>
				<PropsTable props={recordsProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					<Code>DataTransferImportRecord&lt;T&gt;</Code> — one row after it
					reached the API.
				</p>
				<PropsTable props={recordShape} />
			</section>

			<SlotsSection slug="data-transfer-import" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The four steps</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Try{' '}
					<a
						className="text-lib underline underline-offset-4"
						download="bookings-sample.csv"
						href={SAMPLE_HREF}
					>
						the sample file
					</a>{' '}
					(with errors) or any CSV with header <Code>Code,Guest,Price</Code>.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Import opens a fake job; rows settle two at a time, refused ones with
					their reason.
				</p>
				<ComponentPreview title="File, Columns, Check, Result">
					<ImportDemo
						noun="bookings"
						trigger={
							<Button leftSection={<FileUp className="size-4" />}>
								Import bookings
							</Button>
						}
					/>
				</ComponentPreview>
			</section>

			<section
				className="scroll-mt-8 space-y-4"
				id="import-result"
			>
				<h2 className="font-display font-semibold text-xl">
					The import’s own page
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Where <Code>resultLink</Code> leads: the same{' '}
					<Code>DataTransferImport.Records</Code> over the same job. Close early
					and watch rows settle here.
				</p>
				<ComponentPreview
					className="items-stretch"
					title={latest ? `imports/${latest.id}` : 'no import yet'}
				>
					{latest ? (
						<div className="w-full">
							<ImportRecords
								job={latest}
								key={latest.id}
							/>
						</div>
					) : (
						<EmptyState
							description="Start one above and its rows appear here, still settling if the API has not reached them all."
							icon={<FileUp />}
							title="No import yet"
						/>
					)}
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Modal or sheet</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same four steps, in whichever surface the screen wants.{' '}
					<Code>size</Code> sets the width in the Modal’s and the Sheet’s own
					scale, and starts at <Code>md</Code>.
				</p>
				<ComponentPreview title="Same four steps, two surfaces">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<ImportDemo
							noun="guests"
							surface="modal"
							trigger={<Button variant="outline">In a modal</Button>}
						/>
						<ImportDemo
							noun="invoices"
							surface="sheet"
							trigger={<Button variant="outline">In a sheet</Button>}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What crosses the boundary
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The <Code>File</Code> is parsed and validated in the browser; the API
					gets <Code>T[</Code>] and returns a job.
				</p>
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
	'/libs/react-web/components/data-transfer-import',
)({
	component: Page,
})
