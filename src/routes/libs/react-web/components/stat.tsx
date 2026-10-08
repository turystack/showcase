import { createFileRoute } from '@tanstack/react-router'
import {
	Card,
	DurationText,
	MoneyText,
	NumberText,
	Separator,
	Stat,
} from '@turystack/react-web'
import {
	BedDouble,
	CalendarCheck,
	CircleAlert,
	Clock,
	TrendingUp,
	Users,
} from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const statProps = [
	{
		description: 'What the number counts.',
		name: 'label',
		required: true,
		type: 'string',
	},
	{
		description: 'The figure, already formatted (a node).',
		name: 'value',
		required: true,
		type: 'React.ReactNode',
	},
	{
		description: 'Change beside the figure, already formatted.',
		name: 'trend',
		type: 'React.ReactNode',
	},
	{
		default: '"inline"',
		description: 'Trend position: inline (wraps if narrow) or below.',
		name: 'trendPlacement',
		type: '"inline" | "below"',
	},
	{
		description: 'Small print under the figure: period, source, caveat.',
		name: 'hint',
		type: 'string',
	},
	{
		description: 'A node beside the label.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		description: 'Shows size-matched placeholders while loading.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: '"start"',
		description: 'Where the content sits.',
		name: 'align',
		type: '"start" | "center"',
	},
]

const usageCode = `import { MoneyText, NumberText, Stat } from '@turystack/react-web'

<Stat
  hint="Last 30 days"
  label="Revenue"
  trend={<NumberText colored signDisplay="always" value={0.12} variant="percent" />}
  value={<MoneyText value={cents} />}
/>

// While the query runs
<Stat label="Revenue" loading value="—" />

// A tile too narrow for the figure and the delta side by side
<Stat label="Revenue" trend={…} trendPlacement="below" value={…} />`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Stat
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					One number a dashboard is built around.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={statProps} />
			</section>

			<SlotsSection slug="stat" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">A row of them</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The trend is coloured by the formatter that rendered it, not by this
					component — one colour vocabulary for every number on the screen.
				</p>
				<ComponentPreview title="Revenue, occupancy, and one still loading">
					<div className="grid w-full max-w-2xl gap-6 sm:grid-cols-3">
						<Stat
							hint="Last 30 days"
							label="Revenue"
							trend={
								<NumberText
									colored
									signDisplay="always"
									value={0.12}
									variant="percent"
								/>
							}
							value={<MoneyText value={12845000} />}
						/>
						<Stat
							hint="Rooms sold vs available"
							label="Occupancy"
							trend={
								<NumberText
									colored
									signDisplay="always"
									value={-0.04}
									variant="percent"
								/>
							}
							value={
								<NumberText
									value={0.87}
									variant="percent"
								/>
							}
						/>
						<Stat
							label="Cancellations"
							loading
							value="—"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">With an icon</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The icon sits beside the label, not the figure, so the number reads
					alone.
				</p>
				<ComponentPreview title="Four counts, each with its mark">
					<div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<Stat
							icon={<CalendarCheck className="size-4" />}
							label="Reservas"
							value={<NumberText value={1284} />}
						/>
						<Stat
							icon={<Users className="size-4" />}
							label="Hospedes"
							value={<NumberText value={3910} />}
						/>
						<Stat
							icon={<BedDouble className="size-4" />}
							label="Ocupacao"
							value={
								<NumberText
									value={0.87}
									variant="percent"
								/>
							}
						/>
						<Stat
							icon={<Clock className="size-4" />}
							label="Estadia media"
							value={<DurationText value={309_600} />}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">One per card</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Stat draws no box; a dashboard tile is a Stat inside a{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						Card
					</code>
					.
				</p>
				<ComponentPreview title="A row of tiles">
					<div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
						<Card>
							<Card.Content>
								<Stat
									hint="Ultimos 30 dias"
									icon={<TrendingUp className="size-4" />}
									label="Receita"
									trend={
										<NumberText
											colored
											signDisplay="always"
											value={0.12}
											variant="percent"
										/>
									}
									value={<MoneyText value={12_845_000} />}
								/>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<Stat
									hint="Quartos vendidos vs disponiveis"
									icon={<BedDouble className="size-4" />}
									label="Ocupacao"
									trend={
										<NumberText
											colored
											signDisplay="always"
											value={-0.04}
											variant="percent"
										/>
									}
									value={
										<NumberText
											value={0.87}
											variant="percent"
										/>
									}
								/>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<Stat
									hint="Nao reembolsaveis"
									icon={<CircleAlert className="size-4" />}
									label="Cancelamentos"
									trend={
										<NumberText
											colored
											signDisplay="always"
											value={0.03}
											variant="percent"
										/>
									}
									value={<NumberText value={38} />}
								/>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">In a narrow tile</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Inline, the trend wraps under a long figure.{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						trendPlacement="below"
					</code>{' '}
					always gives it its own line.
				</p>
				<ComponentPreview title="Inline wrapping, and below, in two narrow tiles">
					<div className="grid w-full max-w-md grid-cols-2 gap-4">
						<Card>
							<Card.Content>
								<Stat
									hint="trendPlacement inline"
									label="Receita anual"
									trend={
										<NumberText
											colored
											signDisplay="always"
											value={0.128}
											variant="percent"
										/>
									}
									value={<MoneyText value={1_284_500_000} />}
								/>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<Stat
									hint="trendPlacement below"
									label="Receita anual"
									trend={
										<NumberText
											colored
											signDisplay="always"
											value={0.128}
											variant="percent"
										/>
									}
									trendPlacement="below"
									value={<MoneyText value={1_284_500_000} />}
								/>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Centred</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						align="center"
					</code>{' '}
					suits a card holding one figure only.
				</p>
				<ComponentPreview title="Three figures sharing one card">
					<div className="w-full max-w-2xl">
						<Card>
							<Card.Content>
								<div className="flex items-stretch justify-around gap-4">
									<Stat
										align="center"
										label="Diarias"
										value={<NumberText value={412} />}
									/>
									<Separator
										decorative
										orientation="vertical"
									/>
									<Stat
										align="center"
										label="Ticket medio"
										value={<MoneyText value={31_200} />}
									/>
									<Separator
										decorative
										orientation="vertical"
									/>
									<Stat
										align="center"
										label="Avaliacao"
										value="4,8"
									/>
								</div>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">While it loads</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Placeholders match the coming content, so the card does not resize.
					Hint and trend wait too.
				</p>
				<ComponentPreview title="Loaded, and loading, side by side">
					<div className="grid w-full max-w-2xl gap-4 md:grid-cols-2">
						<Card>
							<Card.Content>
								<Stat
									hint="Ultimos 30 dias"
									icon={<TrendingUp className="size-4" />}
									label="Receita"
									trend={
										<NumberText
											colored
											signDisplay="always"
											value={0.12}
											variant="percent"
										/>
									}
									value={<MoneyText value={12_845_000} />}
								/>
							</Card.Content>
						</Card>
						<Card>
							<Card.Content>
								<Stat
									hint="Ultimos 30 dias"
									icon={<CircleAlert className="size-4" />}
									label="Cancelamentos"
									loading
									value="—"
								/>
							</Card.Content>
						</Card>
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

export const Route = createFileRoute('/libs/react-web/components/stat')({
	component: Page,
})
