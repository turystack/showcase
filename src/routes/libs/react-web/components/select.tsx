import { createFileRoute } from '@tanstack/react-router'
import {
	Badge,
	Button,
	Flex,
	Form,
	Input,
	Label,
	Modal,
	Select,
	Textarea,
} from '@turystack/react-web'
import { Globe, Plane, Ticket } from 'lucide-react'
import { useRef, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/select/select.types.ts` —
 * `BaseSelectProps<T, O>` plus the `mode`-specific half of the discriminated
 * union. Defaults come from `defaultVariants` in the `tv()` call in
 * `select.tsx` (`size: 'md'`, `variant: 'default'`) and from the destructuring
 * in each of the three inner components (`placeholder = 'Select...'`,
 * `searchPlaceholder = 'Search...'`, `clearable = true`).
 */
const selectProps = [
	{
		description: 'Selection model; sets the shape of value and onChange.',
		name: 'mode',
		required: true,
		type: '"single" | "multiple"',
	},
	{
		description: 'The options, in any shape; extractors read them.',
		name: 'options',
		required: true,
		type: 'T[]',
	},
	{
		description: 'Reads the label off an option: a key of T or a function.',
		name: 'optionLabel',
		required: true,
		type: 'keyof T | ((option: T) => string)',
	},
	{
		description: 'Reads the value off an option: a key of T or a function.',
		name: 'optionValue',
		required: true,
		type: 'keyof T | ((option: T) => O)',
	},
	{
		description: 'Reads a section heading off an option.',
		name: 'optionGroup',
		type: 'keyof T | ((option: T) => string)',
	},
	{
		description: 'Controlled selection: a value or null, or an array.',
		name: 'value',
		type: 'I | null (single) | I[] (multiple)',
	},
	{
		description: 'Initial selection when uncontrolled.',
		name: 'defaultValue',
		type: 'I | null (single) | I[] (multiple)',
	},
	{
		description: 'Fires with the extracted value; null when single is cleared.',
		name: 'onChange',
		type: '(value: O | null) => void (single) | (value: O[]) => void (multiple)',
	},
	{
		default: '"Select..."',
		description: 'Muted text in the trigger while nothing is selected.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'false',
		description: 'Adds a filter input; case-insensitive, on the label.',
		name: 'searchable',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Offers the query as a new option when nothing matches.',
		name: 'creatable',
		type: 'boolean',
	},
	{
		description: 'Create config: onCreate (may be async), label, position…',
		name: 'creatableOptions',
		type: 'SelectCreatableOptions',
	},
	{
		default: '"Search..."',
		description: 'Placeholder for that filter input.',
		name: 'searchPlaceholder',
		type: 'string',
	},
	{
		description: 'Controlled search query.',
		name: 'searchValue',
		type: 'string',
	},
	{
		description: 'Fires as the query changes; turns built-in filtering off.',
		name: 'onSearchChange',
		type: '(query: string) => void',
	},
	{
		default: 'false',
		description: 'Delays onSearchChange 300ms after the last keystroke.',
		name: 'debounce',
		type: 'boolean',
	},
	{
		description: 'Replaces the “No options found.” empty line.',
		name: 'emptySection',
		type: 'React.ReactNode',
	},
	{
		description: 'Node placed before the value inside the trigger.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Trailing node in the trigger; replaces chevron and clear.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Custom body for each option row.',
		name: 'renderOption',
		type: '(option: T) => React.ReactNode',
	},
	{
		description: 'Custom body for the selected value in the trigger.',
		name: 'renderValue',
		type: '(option: T) => React.ReactNode',
	},
	{
		description: 'Incremental loading config; fields in the table below.',
		name: 'infinite',
		type: 'SelectInfiniteProps',
	},
	{
		default: 'false',
		description: 'Prevents the popup from opening and dims the trigger.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a spinner and blocks the trigger. Implies disabled.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: '"md"',
		description: 'Height of the trigger: 36px, 40px or 44px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'Bordered field, or a borderless trigger for other chrome.',
		name: 'variant',
		type: '"default" | "ghost"',
	},
	{
		default: 'true',
		description: 'Shows a clear button beside the trigger once selected.',
		name: 'clearable',
		type: 'boolean',
	},
	{
		default: '"full"',
		description: 'Trigger width: full, auto, or sm/md/lg presets.',
		name: 'width',
		type: '"auto" | "full" | "sm" | "md" | "lg"',
	},
	{
		description: 'Accessible name when no visible label names the trigger.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Id of the trigger, for a label htmlFor. Form.Field sets it.',
		name: 'id',
		type: 'string',
	},
]

/** `SelectInfiniteProps`, the shape of the `infinite` prop. */
const selectInfiniteProps = [
	{
		default: 'false',
		description: 'More to load: a bottom sentinel fires onLoadMore.',
		name: 'hasMore',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'A page is loading: shows a spinner, pauses the sentinel.',
		name: 'loadingMore',
		type: 'boolean',
	},
	{
		description: 'Asks for the next page.',
		name: 'onLoadMore',
		type: '() => void',
	},
	{
		description: 'Text shown beside the spinner while a page is loading.',
		name: 'loadingMoreText',
		type: 'string',
	},
]

type Airport = {
	city: string
	code: string
	country: string
	id: number
	region: string
}

const airports: Airport[] = [
	{
		city: 'São Paulo',
		code: 'GRU',
		country: 'Brazil',
		id: 1,
		region: 'South America',
	},
	{
		city: 'Rio de Janeiro',
		code: 'GIG',
		country: 'Brazil',
		id: 2,
		region: 'South America',
	},
	{
		city: 'Buenos Aires',
		code: 'EZE',
		country: 'Argentina',
		id: 3,
		region: 'South America',
	},
	{
		city: 'Lisbon',
		code: 'LIS',
		country: 'Portugal',
		id: 4,
		region: 'Europe',
	},
	{
		city: 'Madrid',
		code: 'MAD',
		country: 'Spain',
		id: 5,
		region: 'Europe',
	},
	{
		city: 'Paris',
		code: 'CDG',
		country: 'France',
		id: 6,
		region: 'Europe',
	},
	{
		city: 'New York',
		code: 'JFK',
		country: 'United States',
		id: 7,
		region: 'North America',
	},
	{
		city: 'Toronto',
		code: 'YYZ',
		country: 'Canada',
		id: 8,
		region: 'North America',
	},
	{
		city: 'Tokyo',
		code: 'HND',
		country: 'Japan',
		id: 9,
		region: 'Asia',
	},
]

const gates: Airport[] = Array.from(
	{
		length: 48,
	},
	(_, index) => ({
		city: `Gate ${String(index + 1)}`,
		code: `G${String(index + 1).padStart(2, '0')}`,
		country: `Terminal ${String(Math.floor(index / 12) + 1)}`,
		id: 1000 + index,
		region: `Terminal ${String(Math.floor(index / 12) + 1)}`,
	}),
)

const airportLabel = (airport: Airport) => `${airport.city} (${airport.code})`

const matches = (airport: Airport, query: string) =>
	airportLabel(airport).toLowerCase().includes(query.toLowerCase())

const usageCode = `import { Select } from '@turystack/react-web'
import { useState } from 'react'

type Airport = {
  city: string
  code: string
  country: string
  id: number
  region: string
}

// Single. The generic argument fixes the value type to the one optionValue
// yields — here the numeric id, not the option object.
function Origin({ airports }: { airports: Airport[] }) {
  const [airportId, setAirportId] = useState<number | null>(null)

  return (
    <Select<Airport, number>
      mode="single"
      onChange={setAirportId}
      optionLabel={(airport) => airport.city + ' (' + airport.code + ')'}
      optionValue="id"
      options={airports}
      placeholder="Where from?"
      value={airportId}
    />
  )
}

// Creatable, when a name is the whole record
<Select
  creatable
  creatableOptions={{ onCreate: (name) => addTag({ name }) }}
  mode="single"
  optionLabel="name"
  optionValue="id"
  options={tags}
/>

// Creatable, when it is not. onCreate returns a promise the modal resolves,
// so the create row spins for exactly as long as the form is open.
function TagPicker({ tags }: { tags: Tag[] }) {
  const [draft, setDraft] = useState<string | null>(null)
  const settle = useRef<(() => void) | null>(null)

  const openDraft = (name: string) =>
    new Promise<void>((resolve) => {
      setDraft(name)
      settle.current = resolve
    })

  const close = () => {
    setDraft(null)
    settle.current?.()
    settle.current = null
  }

  return (
    <>
      <Select
        creatable
        creatableOptions={{ onCreate: openDraft }}
        mode="single"
        optionLabel="name"
        optionValue="id"
        options={tags}
      />
      <Modal onChange={(next) => !next && close()} open={draft !== null} size="sm">
        <Modal.Header bordered closable>
          <Modal.Header.Title>New tag</Modal.Header.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form stacks and spaces its fields (gap md) — no wrapper needed */}
          <Form id="new-tag" onSubmit={(event) => { event.preventDefault(); save() }}>
            <Form.Field label="Name"><Input value={draft ?? ''} /></Form.Field>
            <Form.Field label="Notes"><Textarea /></Form.Field>
          </Form>
        </Modal.Body>
        <Modal.Footer bordered>
          <Button form="new-tag" type="submit">Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

// Multiple — onChange receives the whole array every time
function Stops({ airports }: { airports: Airport[] }) {
  const [ids, setIds] = useState<number[]>([])

  return (
    <Select<Airport, number>
      mode="multiple"
      onChange={setIds}
      optionLabel={(airport) => airport.city + ' (' + airport.code + ')'}
      optionValue="id"
      options={airports}
      searchable
      value={ids}
    />
  )
}

// Sections, from a key on the option
<Select
  mode="single"
  optionGroup="region"
  optionLabel="city"
  optionValue="code"
  options={airports}
/>

// Remote search: giving onSearchChange turns the built-in filter off, so the
// options you pass are the options that show.
<Select
  debounce
  mode="single"
  onSearchChange={setQuery}
  optionLabel="city"
  optionValue="code"
  options={resultsForQuery}
  searchable
/>

// Incremental loading
<Select
  infinite={{ hasMore, loadingMore, onLoadMore: loadNextPage }}
  mode="single"
  optionLabel="city"
  optionValue="code"
  options={loadedSoFar}
/>

// Sizes, variants, states
<Select mode="single" size="sm" ... />
<Select mode="single" variant="ghost" ... />
<Select clearable={false} mode="single" ... />
<Select loading mode="single" ... />
<Select disabled mode="single" ... />

// Naming — inside Form.Field the field wires the trigger: no id to repeat
<Form.Field label="Origem">
  <Select mode="single" options={airports} optionLabel="city" optionValue="code" />
</Form.Field>

// Width — in a toolbar row, auto fits the label instead of filling the row
<Flex align="center" gap="sm">
  <Input placeholder="Buscar voo" />
  <Select mode="single" width="auto" options={airports} optionLabel="city" optionValue="code" />
  <Select mode="single" width="sm" ... />
</Flex>

// Naming the trigger — a visible label pointing at its id…
<Label htmlFor="origin">Origem</Label>
<Select id="origin" mode="single" options={airports} optionLabel="city" optionValue="code" />

// …or, with nothing visible to point from, ariaLabel
<Select ariaLabel="Período" mode="single" width="auto" options={periods} ... />`

type Tag = {
	id: string
	name: string
}

type RichTag = Tag & {
	description?: string
	tone: 'info' | 'success' | 'warning' | 'destructive'
}

const initialTags: Tag[] = [
	{
		id: 'lua-de-mel',
		name: 'Lua de mel',
	},
	{
		id: 'corporativo',
		name: 'Corporativo',
	},
	{
		id: 'pet-friendly',
		name: 'Pet friendly',
	},
]

const initialRichTags: RichTag[] = [
	{
		description: 'Cortesias e decoracao no quarto',
		id: 'lua-de-mel',
		name: 'Lua de mel',
		tone: 'info',
	},
	{
		description: 'Nota fiscal em nome da empresa',
		id: 'corporativo',
		name: 'Corporativo',
		tone: 'success',
	},
]

const TONES: {
	id: RichTag['tone']
	name: string
}[] = [
	{
		id: 'info',
		name: 'Azul',
	},
	{
		id: 'success',
		name: 'Verde',
	},
	{
		id: 'warning',
		name: 'Ambar',
	},
	{
		id: 'destructive',
		name: 'Vermelho',
	},
]

const slugify = (value: string) =>
	value.trim().toLowerCase().replace(/\s+/g, '-')

function Page() {
	const [originId, setOriginId] = useState<number | null>(2)
	const [stopIds, setStopIds] = useState<number[]>([
		1,
		4,
	])
	const [codeValue, setCodeValue] = useState<string | null>('LIS')
	const [groupedId, setGroupedId] = useState<number | null>(null)
	const [searchableId, setSearchableId] = useState<number | null>(null)
	const [searchableIds, setSearchableIds] = useState<number[]>([])
	const [renderedId, setRenderedId] = useState<number | null>(6)
	const [renderedIds, setRenderedIds] = useState<number[]>([
		1,
		7,
		9,
	])

	const [tags, setTags] = useState<Tag[]>(initialTags)
	const [tagId, setTagId] = useState<string | null>(null)
	const [slowTags, setSlowTags] = useState<Tag[]>(initialTags)
	const [slowTagIds, setSlowTagIds] = useState<string[]>([])

	const createTag = (name: string) => {
		const tag = {
			id: name.toLowerCase().replace(/\s+/g, '-'),
			name,
		}
		setTags((current) => [
			...current,
			tag,
		])
		setTagId(tag.id)
	}

	const createSlowTag = async (name: string) => {
		await new Promise((resolve) => setTimeout(resolve, 700))
		const tag = {
			id: name.toLowerCase().replace(/\s+/g, '-'),
			name,
		}
		setSlowTags((current) => [
			...current,
			tag,
		])
		setSlowTagIds((current) => [
			...current,
			tag.id,
		])
	}

	const [richTags, setRichTags] = useState<RichTag[]>(initialRichTags)
	const [richTagId, setRichTagId] = useState<string | null>(null)
	const [draftOpen, setDraftOpen] = useState(false)
	const [draftName, setDraftName] = useState('')
	const [draftDescription, setDraftDescription] = useState('')
	const [draftTone, setDraftTone] = useState<RichTag['tone']>('info')

	/**
	 * The promise `onCreate` returned, held until the modal is done with it.
	 * Resolving it is what tells the create row to stop spinning and the search
	 * to clear — so the row stays busy for exactly as long as the form is open.
	 */
	const settleDraft = useRef<(() => void) | null>(null)

	const openDraft = (name: string) =>
		new Promise<void>((resolve) => {
			setDraftName(name)
			setDraftDescription('')
			setDraftTone('info')
			setDraftOpen(true)
			settleDraft.current = resolve
		})

	const closeDraft = () => {
		setDraftOpen(false)
		settleDraft.current?.()
		settleDraft.current = null
	}

	const saveDraft = () => {
		const tag: RichTag = {
			description: draftDescription || undefined,
			id: slugify(draftName),
			name: draftName.trim(),
			tone: draftTone,
		}

		setRichTags((current) => [
			...current,
			tag,
		])
		setRichTagId(tag.id)
		closeDraft()
	}

	const [remoteQuery, setRemoteQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState('')

	const [gateCount, setGateCount] = useState(8)
	const [loadingMore, setLoadingMore] = useState(false)
	const hasMore = gateCount < gates.length

	const loadMoreGates = () => {
		if (loadingMore || !hasMore) {
			return
		}
		setLoadingMore(true)
		setTimeout(() => {
			setGateCount((count) => Math.min(count + 8, gates.length))
			setLoadingMore(false)
		}, 600)
	}

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Select
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A dropdown over a list of your own objects.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={selectProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The infinite object
				</h2>
				<PropsTable props={selectInfiniteProps} />
			</section>

			<SlotsSection slug="select" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Extractors</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The select never assumes a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'{ label, value }'}
					</code>{' '}
					shape.
				</p>
				<ComponentPreview title="Function extractors — two-field label, numeric id">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Airport, number>
							ariaLabel="Aeroporto"
							mode="single"
							onChange={setOriginId}
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
							placeholder="Where from?"
							value={originId}
						/>
						<span className="text-center text-muted-foreground text-sm">
							value: {originId === null ? 'null' : originId}
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Key extractors — city label, code value">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							mode="single"
							onChange={setCodeValue}
							optionLabel="city"
							options={airports}
							optionValue="code"
							value={codeValue}
						/>
						<span className="text-center text-muted-foreground text-sm">
							value: {codeValue === null ? 'null' : codeValue}
						</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Modes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Multiple mode shows two badges and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">+N</code>.
					Rows stay open after a click. A badge’s × is mouse-only; the keyboard
					deselects in the listbox.
				</p>
				<ComponentPreview title="mode=&quot;multiple&quot;">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Airport, number>
							ariaLabel="Aeroportos"
							mode="multiple"
							onChange={setStopIds}
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
							placeholder="Add a stopover"
							value={stopIds}
						/>
						<span className="text-center text-muted-foreground text-sm">
							value: [{stopIds.join(', ')}]
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultValue, both modes">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, number>
							ariaLabel="Aeroporto"
							defaultValue={3}
							mode="single"
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
						/>
						<Select<Airport, number>
							ariaLabel="Aeroportos"
							defaultValue={[
								3,
								5,
							]}
							mode="multiple"
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Grouping</h2>
				<ComponentPreview title="Grouped by region, single and multiple">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, number>
							ariaLabel="Aeroporto"
							mode="single"
							onChange={setGroupedId}
							optionGroup="region"
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
							placeholder="Grouped by region"
							value={groupedId}
						/>
						<Select<Airport, string>
							ariaLabel="Aeroportos"
							mode="multiple"
							optionGroup={(airport) => airport.country}
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="Grouped by country"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Search</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every trigger — searchable or not, single or multiple — is{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						role="combobox"
					</code>{' '}
					with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-expanded
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						aria-controls
					</code>
					.
				</p>
				<ComponentPreview title="searchable, single">
					<div className="w-full max-w-xs">
						<Select<Airport, number>
							ariaLabel="Aeroporto"
							mode="single"
							onChange={setSearchableId}
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
							placeholder="Filter by city or code"
							searchable
							searchPlaceholder="Type a city…"
							value={searchableId}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="searchable, multiple">
					<div className="w-full max-w-xs">
						<Select<Airport, number>
							ariaLabel="Aeroportos"
							mode="multiple"
							onChange={setSearchableIds}
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
							placeholder="Pick a few"
							searchable
							value={searchableIds}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Handing over{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onSearchChange
					</code>{' '}
					turns the built-in filter off — the component then renders exactly the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						options
					</code>{' '}
					you hand it.
				</p>
				<ComponentPreview title="searchValue + onSearchChange — page filters">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							mode="single"
							onSearchChange={setRemoteQuery}
							optionLabel={airportLabel}
							options={airports.filter((airport) =>
								matches(airport, remoteQuery),
							)}
							optionValue="code"
							searchable
							searchValue={remoteQuery}
						/>
						<span className="text-center text-muted-foreground text-sm">
							query: "{remoteQuery}"
						</span>
					</div>
				</ComponentPreview>
				<ComponentPreview title="debounce — the report waits 300ms">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							debounce
							mode="single"
							onSearchChange={setDebouncedQuery}
							optionLabel={airportLabel}
							options={airports.filter((airport) =>
								matches(airport, debouncedQuery),
							)}
							optionValue="code"
							searchable
							searchPlaceholder="Type quickly…"
						/>
						<span className="text-center text-muted-foreground text-sm">
							last reported: "{debouncedQuery}"
						</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Creatable</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						creatable
					</code>{' '}
					offers the query as a new option when nothing matches it, and implies{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						searchable
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The offer is withheld while an option already carries that label.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						allowDuplicates
					</code>{' '}
					turns that off.
				</p>
				<ComponentPreview title="Type a tag that does not exist yet">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Tag, string>
							ariaLabel="Tag"
							creatable
							creatableOptions={{
								onCreate: createTag,
							}}
							mode="single"
							onChange={setTagId}
							optionLabel="name"
							options={tags}
							optionValue="id"
							placeholder="Escolha ou crie uma tag"
							value={tagId}
						/>
						<span className="text-center text-muted-foreground text-sm">
							{tags.length} tags
						</span>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onCreate
					</code>{' '}
					may return a promise: the row spins, refuses a second press, and the
					search clears once it resolves.
				</p>
				<ComponentPreview title="A slow create, custom wording, row at the bottom">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Tag, string>
							ariaLabel="Tags"
							creatable
							creatableOptions={{
								label: (query) => `Adicionar "${query}" a lista`,
								minLength: 3,
								onCreate: createSlowTag,
								position: 'bottom',
							}}
							mode="multiple"
							onChange={setSlowTagIds}
							optionLabel="name"
							options={slowTags}
							optionValue="id"
							placeholder="Marque ou crie"
							value={slowTagIds}
						/>
						<span className="text-center text-muted-foreground text-sm">
							minLength 3 — nothing is offered until the third character
						</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A create that needs a form
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					For a richer create, let{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onCreate
					</code>{' '}
					open a Modal and return a promise. The row spins; the query seeds the
					first field.
				</p>
				<ComponentPreview title="Type a missing tag, then press “Create”">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<RichTag, string>
							ariaLabel="Tag"
							creatable
							creatableOptions={{
								label: (query) => `Criar "${query}"…`,
								onCreate: openDraft,
							}}
							mode="single"
							onChange={setRichTagId}
							optionLabel="name"
							options={richTags}
							optionValue="id"
							placeholder="Escolha ou crie uma tag"
							renderOption={(tag) => (
								<span className="flex min-w-0 flex-1 items-center justify-between gap-2">
									<span className="min-w-0 truncate">{tag.name}</span>
									<Badge
										size="sm"
										variant={tag.tone}
									>
										{TONES.find((tone) => tone.id === tag.tone)?.name}
									</Badge>
								</span>
							)}
							value={richTagId}
						/>
						<span className="text-center text-muted-foreground text-sm">
							{richTags.length} tags
						</span>
					</div>
				</ComponentPreview>

				<Modal
					onChange={(next) => {
						if (!next) {
							closeDraft()
						}
					}}
					open={draftOpen}
					size="sm"
				>
					<Modal.Header
						bordered
						closable
					>
						<Modal.Header.Title>Nova tag</Modal.Header.Title>
						<Modal.Header.Description>
							Ela fica disponivel para todas as reservas.
						</Modal.Header.Description>
					</Modal.Header>
					<Modal.Body>
						<Form
							id="new-tag"
							onSubmit={(event) => {
								event.preventDefault()
								saveDraft()
							}}
						>
							<Form.Field label="Nome">
								<Input
									onChange={(value) => setDraftName(value ?? '')}
									placeholder="Lua de mel"
									value={draftName}
								/>
							</Form.Field>
							<Form.Field
								description="Aparece na lista interna, nunca para o hospede."
								label="Descricao"
							>
								<Textarea
									maxLength={120}
									onChange={(value) => setDraftDescription(value ?? '')}
									placeholder="Cortesias e decoracao no quarto"
									value={draftDescription}
								/>
							</Form.Field>
							<Form.Field label="Cor">
								<Select<(typeof TONES)[number], RichTag['tone']>
									mode="single"
									onChange={(value) => setDraftTone(value ?? 'info')}
									optionLabel="name"
									options={TONES}
									optionValue="id"
									renderOption={(tone) => (
										<span className="flex items-center gap-2">
											<Badge
												size="sm"
												variant={tone.id}
											>
												{tone.name}
											</Badge>
										</span>
									)}
									value={draftTone}
								/>
							</Form.Field>
						</Form>
					</Modal.Body>
					<Modal.Footer bordered>
						<Button
							disabled={!draftName.trim()}
							form="new-tag"
							type="submit"
						>
							Criar tag
						</Button>
						<Button
							onClick={closeDraft}
							variant="outline"
						>
							Cancelar
						</Button>
					</Modal.Footer>
				</Modal>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md and lg">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="Small"
							size="sm"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="Medium"
							size="md"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="Large"
							size="lg"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Width</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The trigger fills its column by default.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width=&quot;auto&quot;
					</code>{' '}
					fits its content;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">sm</code>,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">md</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">lg</code>{' '}
					are fixed presets.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Width lands on the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						select-root
					</code>{' '}
					wrapper, so the clear button adds none. Style the box via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						.select-root
					</code>
					.
				</p>
				<ComponentPreview title="A toolbar row — the search input takes the rest">
					<div className="w-full max-w-2xl">
						<Flex
							align="center"
							gap="sm"
						>
							<Input placeholder="Buscar voo ou reserva" />
							<Select<Airport, string>
								ariaLabel="Aeroporto"
								defaultValue="LIS"
								mode="single"
								optionLabel="city"
								options={airports}
								optionValue="code"
								width="auto"
							/>
							<Select<Airport, string>
								ariaLabel="Aeroporto"
								mode="single"
								optionLabel="city"
								options={airports}
								optionValue="code"
								placeholder="Destino"
								width="sm"
							/>
						</Flex>
					</div>
				</ComponentPreview>
				<ComponentPreview title="sm, md and lg presets">
					<div className="flex w-full flex-col gap-3">
						{(
							[
								'sm',
								'md',
								'lg',
							] as const
						).map((width) => (
							<Select<Airport, string>
								ariaLabel="Aeroporto"
								key={width}
								mode="single"
								optionLabel="city"
								options={airports}
								optionValue="code"
								placeholder={`width="${width}"`}
								width={width}
							/>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Naming the trigger
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The trigger is a combobox and needs a name: a label via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						htmlFor
					</code>
					, or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>{' '}
					when nothing is visible.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Inside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Form.Field
					</code>{' '}
					it is wired for you: id, description, error and invalid state. An
					explicit{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">id</code>{' '}
					still wins.
				</p>
				<ComponentPreview title="Inside Form.Field — wired without an id">
					<div className="w-full max-w-xs">
						<Form.Field
							description="O aeroporto de onde o voo parte."
							label="Origem"
						>
							<Select<Airport, string>
								mode="single"
								optionLabel="city"
								options={airports}
								optionValue="code"
								placeholder="Escolha um aeroporto"
							/>
						</Form.Field>
					</div>
				</ComponentPreview>
				<ComponentPreview title="A visible label — htmlFor pointing at id">
					<div className="flex w-full max-w-xs flex-col gap-2">
						<Label htmlFor="select-docs-origin">Origem</Label>
						<Select<Airport, string>
							id="select-docs-origin"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="Escolha um aeroporto"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Nothing visible — ariaLabel on a toolbar picker">
					<div className="w-full max-w-md">
						<Flex
							align="center"
							gap="sm"
							justify="between"
						>
							<span className="font-medium text-sm">Reservas</span>
							<Select<Airport, string>
								ariaLabel="Aeroporto de origem"
								defaultValue="GRU"
								mode="single"
								optionLabel="city"
								options={airports}
								optionValue="code"
								width="auto"
							/>
						</Flex>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ghost
					</code>{' '}
					drops the border, background and focus ring, for a select inside a
					bordered container.
				</p>
				<ComponentPreview title="default and ghost">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							defaultValue="LIS"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							defaultValue="LIS"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							variant="ghost"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sections</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						rightSection
					</code>{' '}
					replaces the chevron and the clear button — the third preview has no
					X.
				</p>
				<ComponentPreview title="leftSection, rightSection, and both">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							leftSection={<Plane className="size-4 text-muted-foreground" />}
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="Departure"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="With a right section"
							rightSection={<Globe className="size-4 text-muted-foreground" />}
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							defaultValue="MAD"
							leftSection={<Ticket className="size-4 text-muted-foreground" />}
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							rightSection={
								<span className="text-muted-foreground text-xs">IATA</span>
							}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Clearing</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The clear button sends{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						null
					</code>
					, or an empty array in multiple mode. It sits beside the trigger,
					reachable with Tab.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						clearable={'{false}'}
					</code>{' '}
					is a product choice, for a field that must always hold a value.
				</p>
				<ComponentPreview title="clearable (default) and clearable={false}">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							defaultValue="GRU"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							clearable={false}
							defaultValue="GRU"
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroportos"
							defaultValue={[
								'GRU',
								'LIS',
								'JFK',
							]}
							mode="multiple"
							optionLabel="city"
							options={airports}
							optionValue="code"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					swaps the trailing icon for a spinner and blocks the trigger on its
					own — you do not also need{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>
					.
				</p>
				<ComponentPreview title="loading and disabled">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							loading
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
							placeholder="Loading airports…"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							defaultValue="CDG"
							disabled
							mode="single"
							optionLabel="city"
							options={airports}
							optionValue="code"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroportos"
							defaultValue={[
								'CDG',
								'MAD',
							]}
							disabled
							mode="multiple"
							optionLabel="city"
							options={airports}
							optionValue="code"
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="An empty list, plain and with emptySection">
					<div className="flex w-full max-w-xs flex-col gap-4">
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							mode="single"
							optionLabel="city"
							options={[]}
							optionValue="code"
							placeholder="Nothing to pick"
						/>
						<Select<Airport, string>
							ariaLabel="Aeroporto"
							emptySection={
								<div className="space-y-1">
									<p className="font-medium text-foreground">No airports</p>
									<p className="text-xs">
										Try a different country, or add one first.
									</p>
								</div>
							}
							mode="single"
							optionLabel="city"
							options={[]}
							optionValue="code"
							placeholder="Custom empty state"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Custom rendering</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						renderOption
					</code>{' '}
					replaces each popup row;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						renderValue
					</code>{' '}
					the trigger value, inside the badge in multiple mode.
				</p>
				<ComponentPreview title="renderOption + renderValue, single">
					<div className="w-full max-w-xs">
						<Select<Airport, number>
							ariaLabel="Aeroporto"
							mode="single"
							onChange={setRenderedId}
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
							renderOption={(airport) => (
								<span className="flex w-full items-center justify-between gap-3">
									<span className="flex flex-col">
										<span className="font-medium">{airport.city}</span>
										<span className="text-muted-foreground text-xs">
											{airport.country}
										</span>
									</span>
									<Badge variant="outline">{airport.code}</Badge>
								</span>
							)}
							renderValue={(airport) => (
								<span className="flex items-center gap-2">
									<Plane className="size-3.5 text-muted-foreground" />
									{airport.code} · {airport.city}
								</span>
							)}
							value={renderedId}
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="renderValue inside the badges, multiple">
					<div className="w-full max-w-xs">
						<Select<Airport, number>
							ariaLabel="Aeroportos"
							mode="multiple"
							onChange={setRenderedIds}
							optionLabel={airportLabel}
							options={airports}
							optionValue="id"
							renderOption={(airport) => (
								<span>
									{airport.city}{' '}
									<span className="text-muted-foreground text-xs">
										{airport.region}
									</span>
								</span>
							)}
							renderValue={(airport) => <span>{airport.code}</span>}
							value={renderedIds}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Infinite scroll</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					While{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						infinite.hasMore
					</code>{' '}
					is true a one-pixel sentinel sits under the last row; when it scrolls
					into view the component calls{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onLoadMore
					</code>
					.
				</p>
				<ComponentPreview title="infinite — eight rows at a time">
					<div className="flex w-full max-w-xs flex-col gap-3">
						<Select<Airport, number>
							ariaLabel="Aeroporto"
							infinite={{
								hasMore,
								loadingMore,
								loadingMoreText: 'Loading more gates…',
								onLoadMore: loadMoreGates,
							}}
							mode="single"
							optionLabel="city"
							options={gates.slice(0, gateCount)}
							optionValue="id"
							placeholder="Pick a gate"
						/>
						<span className="text-center text-muted-foreground text-sm">
							{gateCount} of {gates.length} loaded
						</span>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The preview passes{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loadingMoreText
					</code>{' '}
					and you will see it next to the spinner; leave it out and the spinner
					stands on its own.
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

export const Route = createFileRoute('/libs/react-web/components/select')({
	component: Page,
})
