import { createFileRoute } from '@tanstack/react-router'
import { Button, Progress } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/progress/progress.types.ts` — which
 * is `WithLabelProps<{ value, defaultValue, size }>`, so `label` comes from
 * `label.types.ts` — and the `defaultVariants` in `progress.tsx`.
 */
const progressProps = [
	{
		description: 'Current progress, 0 to 100; omitted, it is indeterminate.',
		name: 'value',
		type: 'number',
	},
	{
		description: 'Uncontrolled start value, read once on mount.',
		name: 'defaultValue',
		type: 'number',
	},
	{
		default: '"md"',
		description: 'Track height: sm 8px, md 16px, lg 24px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Accessible name; wins over label when both are given.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Text above the bar naming it; an object adds Label flags.',
		name: 'label',
		type: 'string | (LabelProps & { content?: string })',
	},
	{
		description: 'Appends a red asterisk to the label.',
		name: 'label.required',
		type: 'boolean',
	},
	{
		description: 'Appends the optional hint to the label.',
		name: 'label.optional',
		type: 'boolean',
	},
	{
		description: 'Dims the label and stops it taking pointer events.',
		name: 'label.disabled',
		type: 'boolean',
	},
	{
		description: 'Info icon after the label showing this on hover or focus.',
		name: 'label.tooltip',
		type: 'React.ReactNode',
	},
	{
		description: 'Forwarded to Label as its for attribute.',
		name: 'label.htmlFor',
		type: 'string',
	},
]

const usageCode = `import { Progress } from '@turystack/react-web'

// Controlled — value updates the bar on every render
<Progress value={65} />

// Uncontrolled — defaultValue is read once, on mount, and the bar
// never moves again on its own
<Progress defaultValue={30} />

// Heights
<Progress size="sm" value={65} />
<Progress size="md" value={65} />
<Progress size="lg" value={65} />

// A plain label
<Progress label="Upload" value={65} />

// A label with the Label component's flags
<Progress
  label={{ content: 'Upload', required: true }}
  value={65}
/>
<Progress
  label={{ content: 'Upload', tooltip: 'Measured against the file size on disk' }}
  value={65}
/>

// No visible label: name the bar for a screen reader
<Progress ariaLabel="3 de 7 etapas concluídas" size="sm" value={43} />

// Driven by real work
const [done, setDone] = useState(0)
<Progress label="Uploading" value={(done / total) * 100} />`

const sizes = [
	'sm',
	'md',
	'lg',
] as const

function Page() {
	const [value, setValue] = useState(40)
	const [nextDefault, setNextDefault] = useState(30)
	const [mountKey, setMountKey] = useState(0)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Progress
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A horizontal bar for work whose end you can measure.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={progressProps} />
			</section>

			<SlotsSection slug="progress" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Value</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Two real modes: value is controlled and moves on every render,
					defaultValue seeds internal state.
				</p>
				<ComponentPreview title="Controlled — driven by the page">
					<div className="flex w-full max-w-md flex-col items-center gap-4">
						<Progress
							label="Upload"
							value={value}
						/>
						<div className="flex items-center gap-3">
							<Button
								onClick={() => setValue((current) => Math.max(0, current - 10))}
								size="sm"
								variant="outline"
							>
								−10
							</Button>
							<span className="w-12 text-center text-muted-foreground text-sm tabular-nums">
								{value}%
							</span>
							<Button
								onClick={() =>
									setValue((current) => Math.min(100, current + 10))
								}
								size="sm"
								variant="outline"
							>
								+10
							</Button>
							<Button
								onClick={() => setValue(0)}
								size="sm"
								variant="ghost"
							>
								Reset
							</Button>
						</div>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Uncontrolled — defaultValue, read once on mount">
					<div className="flex w-full max-w-md flex-col items-center gap-4">
						<Progress
							defaultValue={nextDefault}
							key={mountKey}
							label="Upload"
						/>
						<div className="flex flex-wrap items-center justify-center gap-3">
							<Button
								onClick={() =>
									setNextDefault((current) => Math.min(100, current + 10))
								}
								size="sm"
								variant="outline"
							>
								Bump the prop to {Math.min(100, nextDefault + 10)}
							</Button>
							<Button
								onClick={() => setMountKey((current) => current + 1)}
								size="sm"
								variant="ghost"
							>
								Remount to apply it
							</Button>
						</div>
						<p className="max-w-xs text-center text-muted-foreground text-xs">
							defaultValue is now {nextDefault}, but the bar above will not move
							until it remounts.
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg">
					<div className="w-full max-w-md space-y-4">
						{sizes.map((size) => (
							<Progress
								key={size}
								label={size}
								size={size}
								value={65}
							/>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">States</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					At 100 the root gains{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						data-complete
					</code>
					.
				</p>
				<ComponentPreview title="Empty, part way, complete, indeterminate">
					<div className="w-full max-w-md space-y-4">
						<Progress
							label="0"
							value={0}
						/>
						<Progress
							label="45"
							value={45}
						/>
						<Progress
							label="100 — data-complete"
							value={100}
						/>
						<Progress label="no value — data-indeterminate" />
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Labels</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					An object label goes straight to{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Label
					</code>
					, every field included. There is no{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						className
					</code>
					: the label's look belongs to the library.
				</p>
				<ComponentPreview title="String, required, optional, disabled, tooltip">
					<div className="w-full max-w-md space-y-4">
						<Progress
							label="A plain string"
							value={30}
						/>
						<Progress
							label={{
								content: 'Required',
								required: true,
							}}
							value={30}
						/>
						<Progress
							label={{
								content: 'Optional',
								optional: true,
							}}
							value={30}
						/>
						<Progress
							label={{
								content: 'Disabled',
								disabled: true,
							}}
							value={30}
						/>
						<Progress
							label={{
								content: 'With a tooltip',
								tooltip: 'Measured against the file size on disk.',
							}}
							value={30}
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					A bar with no visible label still needs a name;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>{' '}
					names it without drawing anything.
				</p>
				<ComponentPreview title="Named by ariaLabel, no visible label">
					<div className="w-full max-w-sm space-y-2 rounded-lg border p-4">
						<div className="flex items-center justify-between text-sm">
							<span className="font-medium">Configurar sua loja</span>
							<span className="text-muted-foreground">3 de 7</span>
						</div>
						<Progress
							ariaLabel="3 de 7 etapas concluídas"
							size="sm"
							value={43}
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

export const Route = createFileRoute('/libs/react-web/components/progress')({
	component: Page,
})
