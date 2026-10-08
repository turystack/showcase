import { createFileRoute } from '@tanstack/react-router'
import { BooleanText, Table, Typography } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const booleanTextProps = [
	{
		description: 'The flag; null renders the fallback, not false.',
		name: 'value',
		required: true,
		type: 'boolean | null',
	},
	{
		default: '"yesNo"',
		description: 'yesNo, activeInactive, enabledDisabled or check (an icon).',
		name: 'variant',
		type: 'BooleanTextVariant',
	},
	{
		description: 'Paints true green and false in the error colour.',
		name: 'colored',
		type: 'boolean',
	},
]

const appearanceProps = [
	{
		default: '"—"',
		description: 'Text shown for an absent or unreadable value.',
		name: 'fallback',
		type: 'string',
	},
	{
		description: 'Adds a button that copies the rendered text.',
		name: 'copyable',
		type: 'boolean',
	},
	{
		description: 'Shows the rendered text in a tooltip on hover.',
		name: 'tooltip',
		type: 'boolean',
	},
	{
		default: '"span"',
		description: 'The element the value renders as.',
		name: 'component',
		type: 'TypographyComponent',
	},
	{
		default: '"base"',
		description: 'Typography size preset; "inherit" takes the parent\'s size.',
		name: 'size',
		type: 'TypographySize | "inherit"',
	},
	{
		default: '"normal"',
		description: 'Font weight.',
		name: 'weight',
		type: 'TypographyWeight',
	},
	{
		description: 'Text alignment.',
		name: 'align',
		type: 'TypographyAlign',
	},
	{
		description: 'Renders in the muted foreground colour.',
		name: 'muted',
		type: 'boolean',
	},
	{
		default: 'false',
		description: "Takes the surrounding text's colour instead of foreground.",
		name: 'inheritColor',
		type: 'boolean',
	},
	{
		description: 'Renders in the error colour.',
		name: 'destructive',
		type: 'boolean',
	},
	{
		description: 'Truncates with an ellipsis on overflow.',
		name: 'truncate',
		type: 'boolean',
	},
]

type PlanFeature = {
	feature: string
	free: boolean
	pro: boolean
}

const PLAN_FEATURES: PlanFeature[] = [
	{
		feature: 'Reservas ilimitadas',
		free: false,
		pro: true,
	},
	{
		feature: 'Link de pagamento',
		free: true,
		pro: true,
	},
	{
		feature: 'Relatórios de comissão',
		free: false,
		pro: true,
	},
]

const planColumns = [
	{
		key: 'feature',
		label: 'Recurso',
	},
	{
		align: 'center' as const,
		key: 'free',
		label: 'Grátis',
		selector: (row: PlanFeature) => (
			<BooleanText
				value={row.free}
				variant="check"
			/>
		),
	},
	{
		align: 'center' as const,
		key: 'pro',
		label: 'Pro',
		selector: (row: PlanFeature) => (
			<BooleanText
				value={row.pro}
				variant="check"
			/>
		),
	},
]

const usageCode = `import { BooleanText, Table, Typography } from '@turystack/react-web'

<BooleanText value={booking.confirmed} />                        // Yes / No
<BooleanText value={user.active} variant="activeInactive" />     // Active / Inactive
<BooleanText value={feature.on} variant="check" />               // a tick, with the word for AT
<BooleanText colored value={payment.settled} />

// A centred plan column: the tick follows the cell's alignment
{ align: 'center', key: 'pro', label: 'Pro', selector: (row) => <BooleanText value={row.pro} variant="check" /> }

// A flag nobody answered is not a no
<BooleanText fallback="Not answered" value={survey.optIn} />

// Inline in a sentence — the value takes the text's size and colour
<Typography size="sm" variant="muted">
  Reembolso automático: <BooleanText inheritColor size="inherit" value weight="semibold" />
</Typography>`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Formatters
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					BooleanText
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A flag rendered as the words the product uses for it — and, when the
					flag is unanswered, as neither.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={booleanTextProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Shared with every formatter
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Every{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						*Text
					</code>{' '}
					component shares these appearance props.
				</p>
				<PropsTable props={appearanceProps} />
			</section>

			<SlotsSection slug="boolean-text" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Wording</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Words come from the labels; the check variant keeps the word for
					screen readers.
				</p>
				<ComponentPreview title="The same flag, four ways">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">yesNo</span>
							<BooleanText value={true} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								activeInactive
							</span>
							<BooleanText
								value={true}
								variant="activeInactive"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								enabledDisabled
							</span>
							<BooleanText
								value={false}
								variant="enabledDisabled"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">check</span>
							<BooleanText
								value={true}
								variant="check"
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								check, false
							</span>
							<BooleanText
								value={false}
								variant="check"
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Ticks in a centred column
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The check icon follows the text alignment, so{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						align: 'center'
					</code>{' '}
					centres the tick in its cell.
				</p>
				<ComponentPreview
					className="block items-stretch p-6"
					title='Plan comparison with variant="check"'
				>
					<Table
						columns={planColumns}
						itemKey="feature"
						items={PLAN_FEATURES}
					/>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Colour, and the third state
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A flag that has not been answered is not a "no". Rendering it as one
					is how a page reports a fact nobody established.
				</p>
				<ComponentPreview title="true, false and unknown">
					<div className="flex w-full max-w-md flex-col gap-3 text-sm">
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								coloured true
							</span>
							<BooleanText
								colored
								value={true}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								coloured false
							</span>
							<BooleanText
								colored
								value={false}
							/>
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">unknown</span>
							<BooleanText value={null} />
						</div>
						<div className="flex items-center justify-between gap-6">
							<span className="text-muted-foreground text-xs">
								unknown, named
							</span>
							<BooleanText
								fallback="Not answered"
								value={null}
							/>
						</div>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Inline in a sentence
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					In running text,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size="inherit"
					</code>{' '}
					and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						inheritColor
					</code>{' '}
					take the sentence's size and colour;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						weight
					</code>{' '}
					can still lift it.
				</p>
				<ComponentPreview title='size="inherit" and inheritColor in muted copy'>
					<div className="max-w-md">
						<Typography
							size="sm"
							variant="muted"
						>
							Reembolso automático:{' '}
							<BooleanText
								inheritColor
								size="inherit"
								value
								weight="semibold"
							/>
							, desde que o cancelamento seja feito até 48h antes.
						</Typography>
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

export const Route = createFileRoute('/libs/react-web/components/boolean-text')(
	{
		component: Page,
	},
)
