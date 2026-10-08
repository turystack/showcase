import { createFileRoute } from '@tanstack/react-router'
import { SegmentedControl } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const segmentedControlProps = [
	{
		description: 'The app’s own option objects, used as-is.',
		name: 'options',
		required: true,
		type: 'T[]',
	},
	{
		description: 'Reads an option’s label: a key of T or a function.',
		name: 'optionLabel',
		required: true,
		type: 'keyof T | ((option: T) => React.ReactNode)',
	},
	{
		description: 'Reads an option’s value; what `onChange` delivers.',
		name: 'optionValue',
		required: true,
		type: 'keyof T | ((option: T) => O)',
	},
	{
		description: 'An icon rendered before the label.',
		name: 'optionIcon',
		type: 'keyof T | ((option: T) => React.ReactNode)',
	},
	{
		description: 'Blocks one option without removing it from the row.',
		name: 'optionDisabled',
		type: 'keyof T | ((option: T) => boolean)',
	},
	{
		description: 'Blocks one option and says why in a tooltip.',
		name: 'optionDisabledReason',
		type: 'keyof T | ((option: T) => string | undefined)',
	},
	{
		description: 'Controlled selection.',
		name: 'value',
		type: 'I | null',
	},
	{
		description: 'Uncontrolled initial selection.',
		name: 'defaultValue',
		type: 'I | null',
	},
	{
		description: 'Fires with the option’s value, not a string key.',
		name: 'onChange',
		type: '(value: O) => void',
	},
	{
		default: '"md"',
		description: 'Visual size.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"horizontal"',
		description: 'Layout direction; vertical stacks the segments.',
		name: 'orientation',
		type: '"horizontal" | "vertical"',
	},
	{
		default: 'false',
		description: 'Fills the container, sharing width equally.',
		name: 'block',
		type: 'boolean',
	},
	{
		description: 'Blocks interaction and greys the whole control.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Shows the choice at full contrast; cannot change it.',
		name: 'readOnly',
		type: 'boolean',
	},
	{
		description: 'Blocks interaction and spins on the selected segment.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Accessible name of the radio group.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const usageCode = `import { SegmentedControl } from '@turystack/react-web'

const views = [
  { id: 'list', name: 'List' },
  { id: 'board', name: 'Board' },
  { id: 'calendar', name: 'Calendar' },
]

<SegmentedControl
  ariaLabel="View"
  onChange={setView}
  optionLabel="name"
  optionValue="id"
  options={views}
  value={view}
/>

// The value is the option's, whatever its type
<SegmentedControl
  onChange={(nights: number) => setNights(nights)}
  optionLabel={(option) => \`\${option.nights} nights\`}
  optionValue={(option) => option.nights}
  options={packages}
/>

// Full width, and one option out of reach
<SegmentedControl
  block
  optionDisabled="soldOut"
  optionLabel="name"
  optionValue="id"
  options={fares}
/>

// Blocked, and saying why
<SegmentedControl
  optionDisabledReason={(plan) => (plan.locked ? 'Upgrade to unlock' : undefined)}
  optionLabel="name"
  optionValue="id"
  options={plans}
/>`

type View = {
	id: string
	name: string
	soldOut?: boolean
}

const VIEWS: View[] = [
	{
		id: 'list',
		name: 'List',
	},
	{
		id: 'board',
		name: 'Board',
	},
	{
		id: 'calendar',
		name: 'Calendar',
		soldOut: true,
	},
]

type Period = {
	id: string
	lockedReason?: string
	name: string
}

const PERIODS: Period[] = [
	{
		id: 'week',
		name: 'Semana',
	},
	{
		id: 'month',
		name: 'Mês',
	},
	{
		id: 'year',
		lockedReason: 'Disponível no plano Pro',
		name: 'Ano',
	},
]

const SIZES = [
	'sm',
	'md',
	'lg',
] as const

function Page() {
	const [view, setView] = useState('list')

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Form
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					SegmentedControl
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One choice among a few visible options; it selects a value, not a view
					like Tabs.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={segmentedControlProps} />
			</section>

			<SlotsSection slug="segmented-control" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Not the pill Tabs
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'<Tabs variant="pill" />'}
					</code>{' '}
					looks like this and is a different component: it owns panels and
					selects which one is shown.
				</p>
				<ComponentPreview title="Controlled, with the value beneath it">
					<div className="flex w-full max-w-md flex-col items-center gap-4">
						<SegmentedControl
							ariaLabel="View"
							onChange={setView}
							optionLabel="name"
							options={VIEWS}
							optionValue="id"
							value={view}
						/>
						<span className="text-muted-foreground text-xs">value: {view}</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes and width</h2>
				<ComponentPreview title="sm, md, lg — and block">
					<div className="flex w-full max-w-md flex-col items-center gap-4">
						{SIZES.map((size) => (
							<SegmentedControl
								ariaLabel={`Size ${size}`}
								defaultValue="list"
								key={size}
								optionLabel="name"
								options={VIEWS}
								optionValue="id"
								size={size}
							/>
						))}
						<SegmentedControl
							ariaLabel="Block"
							block
							defaultValue="board"
							optionLabel="name"
							options={VIEWS}
							optionValue="id"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Vertical, and the blocked states
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						disabled
					</code>{' '}
					greys the control,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						readOnly
					</code>{' '}
					locks the answer, and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						loading
					</code>{' '}
					shows a save in progress.
				</p>
				<ComponentPreview title="One option blocked, and three blocked controls">
					<div className="flex w-full max-w-md flex-col items-center gap-4">
						<SegmentedControl
							ariaLabel="Vertical"
							defaultValue="list"
							optionDisabled="soldOut"
							optionLabel="name"
							options={VIEWS}
							optionValue="id"
							orientation="vertical"
						/>
						<SegmentedControl
							ariaLabel="Disabled"
							defaultValue="list"
							disabled
							optionLabel="name"
							options={VIEWS}
							optionValue="id"
						/>
						<SegmentedControl
							ariaLabel="Read only"
							defaultValue="board"
							optionLabel="name"
							options={VIEWS}
							optionValue="id"
							readOnly
						/>
						<SegmentedControl
							ariaLabel="Loading"
							loading
							optionLabel="name"
							options={VIEWS}
							optionValue="id"
							value="calendar"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Disabled with a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						optionDisabledReason
					</code>{' '}
					blocks a segment but keeps it reachable by arrows; hover or focus it
					to read why.
				</p>
				<ComponentPreview title="The yearly view locked by the plan">
					<SegmentedControl
						ariaLabel="Período"
						defaultValue="week"
						optionDisabledReason="lockedReason"
						optionLabel="name"
						options={PERIODS}
						optionValue="id"
					/>
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
	'/libs/react-web/components/segmented-control',
)({
	component: Page,
})
