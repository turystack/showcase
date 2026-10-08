import { createFileRoute } from '@tanstack/react-router'
import { TruncatedText } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/truncated-text/truncated-text.types.ts` and the
 * destructuring defaults in `truncated-text.tsx`. The `start`/`end`/`position`
 * defaults live inside the function body, not in a `tv()` call, and they only
 * take effect once character truncation has been switched on — which any one
 * of the three does.
 */
const truncatedTextProps = [
	{
		description: 'The text to show; numbers are stringified.',
		name: 'value',
		required: true,
		type: 'string | number',
	},
	{
		default: '1',
		description: 'Lines before clamping; 1 is a nowrap ellipsis.',
		name: 'lines',
		type: '1 | 2 | 3',
	},
	{
		default: '"middle"',
		description: 'Which end is elided; setting it enables char truncation.',
		name: 'position',
		type: '"end" | "middle" | "start"',
	},
	{
		default: '8',
		description: 'Leading characters kept (end, middle); min 0.',
		name: 'start',
		type: 'number',
	},
	{
		default: '6',
		description: 'Trailing characters kept (start, middle); min 0.',
		name: 'end',
		type: 'number',
	},
	{
		default: '"span"',
		description: 'Wrapping element; code renders a real <code>.',
		name: 'component',
		type: '"code" | "span"',
	},
	{
		default: 'false',
		description: 'Adds a CopyButton that copies the full value.',
		name: 'copyable',
		type: 'boolean',
	},
]

const usageCode = `import { TruncatedText } from '@turystack/react-web'

// No start/end/position: the value is untouched, CSS does the clamping
<TruncatedText value={id} />

// Character truncation — any one of the three switches it on
<TruncatedText position="middle" value={id} />      // abcdefgh...456789
<TruncatedText position="end" start={5} value={id} />  // abcde...
<TruncatedText end={4} position="start" value={id} />  // ...6789

// Wrap to two or three lines instead of one
<TruncatedText lines={2} value={description} />

// As a <code> element
<TruncatedText component="code" value="9f2b1c4e-77aa-4f01-9c2e-0d1b6a3e8f55" />

// The copy button copies the whole value, not what is on screen
<TruncatedText copyable position="middle" value={walletAddress} />`

const HASH = 'abcdefghijklmnopqrstuvwxyz0123456789'

const PARAGRAPH =
	'Cada reserva guarda o histórico completo de alterações, incluindo quem alterou, quando alterou e qual era o valor anterior de cada campo tocado.'

const positions = [
	'start',
	'middle',
	'end',
] as const

function Page() {
	const [position, setPosition] = useState<(typeof positions)[number]>('middle')
	const [start, setStart] = useState(8)
	const [end, setEnd] = useState(6)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					TruncatedText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Text that is too long for where it sits, shortened on purpose rather
					than by accident.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={truncatedTextProps} />
			</section>

			<SlotsSection slug="truncated-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Two kinds of truncation
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The component does one or both of two different things.
				</p>
				<ComponentPreview title="Same value, with and without character truncation">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="rounded-lg border border-border border-dashed p-2">
							<TruncatedText value={HASH} />
						</div>
						<div className="rounded-lg border border-border border-dashed p-2">
							<TruncatedText
								position="middle"
								value={HASH}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Position</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">end</code>{' '}
					keeps the first{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						start
					</code>{' '}
					chars,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						start
					</code>{' '}
					keeps the last{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">end</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						middle
					</code>{' '}
					keeps both.
				</p>
				<ComponentPreview title="All three positions">
					<div className="flex w-full max-w-md flex-col gap-3 font-mono text-sm">
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">
								{'position="start" end={4}'}
							</span>
							<TruncatedText
								end={4}
								position="start"
								value={HASH}
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">
								{'position="middle" start={8} end={6}'}
							</span>
							<TruncatedText
								position="middle"
								value={HASH}
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">
								{'position="end" start={5}'}
							</span>
							<TruncatedText
								position="end"
								start={5}
								value={HASH}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Try it against the numbers
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Two edges are worth finding here.
				</p>
				<ComponentPreview title="Live controls">
					<div className="flex w-full max-w-md flex-col gap-4">
						<div className="rounded-lg border border-border border-dashed p-3 text-center font-mono text-sm">
							<TruncatedText
								end={end}
								position={position}
								start={start}
								value={HASH}
							/>
						</div>
						<div className="flex flex-wrap items-center justify-center gap-2">
							{positions.map((value) => (
								<button
									className={
										position === value
											? 'rounded-md border border-foreground px-3 py-1.5 text-xs'
											: 'rounded-md border border-border px-3 py-1.5 text-muted-foreground text-xs'
									}
									key={value}
									onClick={() => setPosition(value)}
									type="button"
								>
									{value}
								</button>
							))}
						</div>
						<div className="flex flex-wrap items-center justify-center gap-6 text-xs">
							<label className="flex items-center gap-2">
								<span className="text-muted-foreground">start</span>
								<input
									className="w-16 rounded-lg border border-border bg-transparent px-2 py-1"
									max={36}
									min={0}
									onChange={(event) => setStart(Number(event.target.value))}
									type="number"
									value={start}
								/>
							</label>
							<label className="flex items-center gap-2">
								<span className="text-muted-foreground">end</span>
								<input
									className="w-16 rounded-lg border border-border bg-transparent px-2 py-1"
									max={36}
									min={0}
									onChange={(event) => setEnd(Number(event.target.value))}
									type="number"
									value={end}
								/>
							</label>
						</div>
						<p className="text-center text-muted-foreground text-xs">
							The full value is 36 characters. Hover the text above to see it.
						</p>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Lines</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						{'lines={1}'}
					</code>{' '}
					never wraps and ends in an ellipsis;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">2</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">3</code>{' '}
					wrap, then clamp.
				</p>
				<ComponentPreview title="1, 2 and 3 lines">
					<div className="flex w-full max-w-sm flex-col gap-4 text-sm">
						<div className="rounded-lg border border-border border-dashed p-2">
							<TruncatedText
								lines={1}
								value={PARAGRAPH}
							/>
						</div>
						<div className="rounded-lg border border-border border-dashed p-2">
							<TruncatedText
								lines={2}
								value={PARAGRAPH}
							/>
						</div>
						<div className="rounded-lg border border-border border-dashed p-2">
							<TruncatedText
								lines={3}
								value={PARAGRAPH}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Element and value
				</h2>
				<ComponentPreview title="component, and a numeric value">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">span</span>
							<TruncatedText
								component="span"
								position="middle"
								value="9f2b1c4e-77aa-4f01-9c2e-0d1b6a3e8f55"
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">code</span>
							<TruncatedText
								component="code"
								position="middle"
								value="9f2b1c4e-77aa-4f01-9c2e-0d1b6a3e8f55"
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">
								a number value
							</span>
							<TruncatedText value={9007199254740991} />
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Copyable</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						copyable
					</code>{' '}
					adds a CopyButton that copies the full value, not the shortened text,
					and announces "Copied".
				</p>
				<ComponentPreview title="A shortened address that copies whole">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">
								Carteira de recebimento
							</span>
							<TruncatedText
								component="code"
								copyable
								position="middle"
								value="0x71c7656ec7ab88b098defb751b7401b5f6d8976f"
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<span className="text-muted-foreground text-xs">
								Reservation ID
							</span>
							<TruncatedText
								copyable
								position="end"
								start={12}
								value="9f2b1c4e-77aa-4f01-9c2e-0d1b6a3e8f55"
							/>
						</div>
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
	'/libs/react-web/components/truncated-text',
)({
	component: Page,
})
