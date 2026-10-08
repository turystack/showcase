import { createFileRoute, Link } from '@tanstack/react-router'
import type { PartialTuryLabels } from '@turystack/react-web'
import { FilterChip, LabelsProvider, Radio } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/filter-chip/filter-chip.types.ts`
 * and the destructuring in `filter-chip.tsx`. The component is declared
 * `PropsWithChildren<FilterChipProps>`, and `children` is the picker, so it
 * gets a row of its own.
 */
const filterChipProps = [
	{
		description: 'The attribute being filtered. Also names the ×.',
		name: 'label',
		required: true,
		type: 'string',
	},
	{
		description: 'The chosen value. Set means active, unset means suggested.',
		name: 'value',
		type: 'React.ReactNode',
	},
	{
		description: 'Clears the value. Shows the × while active.',
		name: 'onRemove',
		type: '() => void',
	},
	{
		description: 'The picker, opened in a popover. Omit for a static chip.',
		name: 'children',
		type: 'React.ReactNode',
	},
	{
		description: 'Controlled picker visibility.',
		name: 'open',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Uncontrolled initial picker visibility.',
		name: 'defaultOpen',
		type: 'boolean',
	},
	{
		description: 'Fires when the picker opens or closes.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
	{
		default: 'false',
		description: 'Blocks the picker and the ×.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks both like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const usageCode = `import { FilterChip, Radio } from '@turystack/react-web'

const [status, setStatus] = useState<string>()
const [open, setOpen] = useState(false)

<FilterChip
  label="Status"
  onOpenChange={setOpen}
  onRemove={() => setStatus(undefined)}
  open={open}
  value={status}
>
  <Radio.Group
    items={statuses}
    onChange={(next) => {
      setStatus(next)
      setOpen(false) // the picker closes itself after a choice
    }}
    value={status}
  />
</FilterChip>

// A chip that cannot be changed right now
<FilterChip disabled label="Canal" value="Site">…</FilterChip>

// Blocked, and saying why
<FilterChip disabledReason="Definido pelo seu workspace" label="Região" value="Sul">…</FilterChip>`

const statuses = [
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

/**
 * Module scope: the provider memoises on this reference. The separator opens
 * with U+202F, the narrow no-break space French puts before a colon.
 */
const frenchChip: PartialTuryLabels = {
	filterChip: {
		remove: (label) => `Retirer le filtre ${label}`,
		separator: ' :',
	},
}

function StatusChip({ initial }: { initial?: string }) {
	const [status, setStatus] = useState<string | undefined>(initial)
	const [open, setOpen] = useState(false)

	return (
		<FilterChip
			label="Status"
			onOpenChange={setOpen}
			onRemove={() => setStatus(undefined)}
			open={open}
			value={status}
		>
			<div className="w-48">
				<Radio.Group
					items={statuses}
					onChange={(next) => {
						setStatus(next)
						setOpen(false)
					}}
					value={status}
				/>
			</div>
		</FilterChip>
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
					FilterChip
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One filter over a list, suggested or active, usually inside a{' '}
					<a
						className="underline underline-offset-4"
						href="/libs/react-web/components/filter-bar"
					>
						FilterBar
					</a>
					.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={filterChipProps} />
			</section>

			<SlotsSection slug="filter-chip" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Suggested and active
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						value
					</code>{' '}
					decides the state: dashed with a "+" when empty, solid with an × when
					set.
				</p>
				<ComponentPreview title="Empty and filled">
					<div className="flex flex-wrap items-center gap-3">
						<StatusChip />
						<StatusChip initial="Confirmada" />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					A picker that closes itself
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Control{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						open
					</code>{' '}
					and set it to false in the picker's change handler.
				</p>
				<ComponentPreview title="Closes on choice">
					<StatusChip />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Without a picker, and disabled
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without children only the × is a control.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					blocks both.
				</p>
				<ComponentPreview title="No children, disabled">
					<div className="flex flex-wrap items-center gap-3">
						<FilterChip
							label="Hotel"
							onRemove={() => undefined}
							value="Pousada Maré Alta"
						/>
						<FilterChip
							disabled
							label="Canal"
							onRemove={() => undefined}
							value="Site"
						>
							<p className="text-sm">Never opens.</p>
						</FilterChip>
						<FilterChip
							disabled
							label="Moeda"
						>
							<p className="text-sm">Never opens.</p>
						</FilterChip>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabledReason
					</code>{' '}
					blocks the chip but keeps it focusable; hover or focus it to read why.
				</p>
				<ComponentPreview title="A workspace filter next to a free one">
					<div className="flex flex-wrap items-center gap-3">
						<StatusChip initial="Confirmada" />
						<FilterChip
							disabledReason="Definido pelo seu workspace"
							label="Região"
							onRemove={() => undefined}
							value="Sul"
						>
							<p className="text-sm">Never opens.</p>
						</FilterChip>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Keyboard</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Enter and Space open the picker; Escape closes it. The × is its own
					tab stop, named "Remove Status filter".
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Labels</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The colon and the × name come from the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						filterChip
					</code>{' '}
					group of{' '}
					<Link
						className="text-lib underline underline-offset-4"
						to="/libs/react-web/components/labels-provider"
					>
						LabelsProvider
					</Link>
					:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						separator
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						remove(label)
					</code>
					.
				</p>
				<ComponentPreview title="French labels">
					<LabelsProvider labels={frenchChip}>
						<FilterChip
							label="Statut"
							onRemove={() => undefined}
							value="Payée"
						/>
					</LabelsProvider>
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

export const Route = createFileRoute('/libs/react-web/components/filter-chip')({
	component: Page,
})
