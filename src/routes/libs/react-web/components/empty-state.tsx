import { createFileRoute } from '@tanstack/react-router'
import {
	Button,
	Card,
	EmptyState,
	List,
	Select,
	Table,
} from '@turystack/react-web'
import {
	CalendarX,
	Inbox,
	Plug,
	Plus,
	SearchX,
	ShieldAlert,
	Upload,
	WifiOff,
} from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const emptyStateProps = [
	{
		description: 'What is missing.',
		name: 'title',
		required: true,
		type: 'string',
	},
	{
		description: 'Why it is empty, when that is not obvious from the title.',
		name: 'description',
		type: 'string',
	},
	{
		description: 'Renders the title as h1–h6; otherwise a paragraph.',
		name: 'headingLevel',
		type: '1 | 2 | 3 | 4 | 5 | 6',
	},
	{
		description: 'Node before the title, hidden from assistive tech.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		description: 'The way out: a button, a link, or nothing at all.',
		name: 'action',
		type: 'React.ReactNode',
	},
	{
		default: '"none"',
		description: 'Edge of the empty region: dashed, solid or none.',
		name: 'bordered',
		type: '"none" | "solid" | "dashed"',
	},
	{
		default: '"md"',
		description: 'How much room it takes; sm fits a popup, lg a page.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
]

const usageCode = `import { EmptyState, List } from '@turystack/react-web'

// On its own
<EmptyState
  action={<Button>New booking</Button>}
  description="Bookings appear here once a guest confirms."
  icon={<Search />}
  title="No bookings yet"
/>

// Where it belongs: the slot every data surface already takes
<List
  emptySection={<EmptyState size="sm" title="Nothing matches that filter" />}
  itemKey="id"
  items={bookings}
  renderItem={(booking) => <Row booking={booking} />}
/>

// Inside a card, which is where a dashboard panel says it is empty
<Card>
  <Card.Content>
    <EmptyState
      action={<Button size="sm">Connect a channel</Button>}
      description="Bookings from Booking.com and Airbnb land here."
      icon={<Plug />}
      title="No channel connected"
    />
  </Card.Content>
</Card>

// A section of a card with nothing in it yet: a dashed, compact box
<Card.Content>
  <EmptyState bordered="dashed" size="sm" title="No payouts yet" />
</Card.Content>

// The empty state IS the page's section: its title becomes a real heading
<EmptyState headingLevel={2} size="lg" title="No projects yet" />

// Table and Select take the same slot
<Table emptySection={<EmptyState icon={<SearchX />} title="No rows" />} … />
<Select emptySection={<EmptyState size="sm" title="No cities" />} … />`

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					EmptyState
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					What a surface says when it has nothing to show.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={emptyStateProps} />
			</section>

			<SlotsSection slug="empty-state" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Title, reason, way out
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Title first, then the reason, then the way out — a reader needs to
					know what is missing before being handed a button.
				</p>
				<ComponentPreview title="Three levels of empty">
					<div className="flex w-full max-w-md flex-col divide-y divide-border">
						<EmptyState
							size="sm"
							title="No results"
						/>
						<EmptyState
							description="Bookings appear here once a guest confirms."
							title="No bookings yet"
						/>
						<EmptyState
							action={<Button>New booking</Button>}
							description="Nothing matches this filter. Try widening the dates."
							size="lg"
							title="Nothing to show"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Inside a List</h2>
				<ComponentPreview title="The slot it was built for">
					<div className="w-full max-w-md">
						<List
							emptySection={
								<EmptyState
									size="sm"
									title="No bookings yet"
								/>
							}
							itemKey="id"
							items={[]}
							renderItem={() => null}
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">With an icon</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The icon is decorative and hidden from assistive tech; it scales with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size
					</code>
					.
				</p>
				<ComponentPreview title="Four reasons a surface is empty">
					<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
						<EmptyState
							description="Bookings appear here once a guest confirms."
							icon={<Inbox />}
							title="Nada por aqui ainda"
						/>
						<EmptyState
							description="Try widening the dates or clearing a filter."
							icon={<SearchX />}
							title="Nenhum resultado"
						/>
						<EmptyState
							description="The calendar is blocked for this period."
							icon={<CalendarX />}
							title="Sem disponibilidade"
						/>
						<EmptyState
							description="You do not have access to this report."
							icon={<ShieldAlert />}
							title="Sem permissao"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Inside a card</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					By default EmptyState draws no box, so the card supplies the frame.
				</p>
				<ComponentPreview title="Two panels with nothing to show">
					<div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
						<Card>
							<Card.Header bordered>
								<Card.Title>Canais</Card.Title>
								<Card.Description>
									Booking.com, Airbnb, Expedia
								</Card.Description>
							</Card.Header>
							<Card.Content>
								<EmptyState
									action={
										<Button
											leftSection={<Plug className="size-4" />}
											size="sm"
										>
											Conectar um canal
										</Button>
									}
									description="Reservas dos canais conectados chegam aqui."
									icon={<Plug />}
									title="Nenhum canal conectado"
								/>
							</Card.Content>
						</Card>
						<Card>
							<Card.Header bordered>
								<Card.Title>Documentos</Card.Title>
								<Card.Description>Contratos e comprovantes</Card.Description>
							</Card.Header>
							<Card.Content>
								<EmptyState
									action={
										<Button
											leftSection={<Upload className="size-4" />}
											size="sm"
											variant="outline"
										>
											Enviar arquivo
										</Button>
									}
									description="PDF, JPG ou PNG ate 10 MB."
									icon={<Upload />}
									title="Nenhum documento"
								/>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Bordered</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					When one section of a card is empty,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bordered="dashed"
					</code>{' '}
					outlines just that region.
				</p>
				<ComponentPreview title="A dashed, compact empty section inside a card">
					<div className="w-full max-w-md">
						<Card>
							<Card.Header bordered>
								<Card.Title>Financeiro</Card.Title>
								<Card.Description>Saldo e repasses do mês</Card.Description>
							</Card.Header>
							<Card.Content>
								<div className="flex items-baseline justify-between">
									<span className="text-muted-foreground">
										Saldo disponível
									</span>
									<span className="font-medium text-base">R$ 12.480,00</span>
								</div>
							</Card.Content>
							<Card.Separator />
							<Card.Content>
								<EmptyState
									action={
										<Button
											size="sm"
											variant="outline"
										>
											Configurar conta bancária
										</Button>
									}
									bordered="dashed"
									description="Os repasses aparecem aqui depois do primeiro saque."
									icon={<Inbox />}
									size="sm"
									title="Nenhum repasse ainda"
								/>
							</Card.Content>
						</Card>
					</div>
				</ComponentPreview>
				<ComponentPreview title="none, solid and dashed at size sm">
					<div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
						<EmptyState
							size="sm"
							title="none"
						/>
						<EmptyState
							bordered="solid"
							size="sm"
							title="solid"
						/>
						<EmptyState
							bordered="dashed"
							size="sm"
							title="dashed"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Empty, and empty for a reason
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The action is the way out of <em>this</em> emptiness; if there is
					none, leave it off.
				</p>
				<ComponentPreview title="First run, filtered out, and offline">
					<div className="flex w-full max-w-md flex-col divide-y divide-border">
						<EmptyState
							action={
								<Button
									leftSection={<Plus className="size-4" />}
									size="sm"
								>
									Nova reserva
								</Button>
							}
							description="Crie a primeira e ela aparece aqui."
							icon={<Inbox />}
							title="Nenhuma reserva ainda"
						/>
						<EmptyState
							action={
								<Button
									size="sm"
									variant="outline"
								>
									Limpar filtros
								</Button>
							}
							description="Tres filtros ativos escondem 128 reservas."
							icon={<SearchX />}
							title="Nada corresponde a esse filtro"
						/>
						<EmptyState
							description="Sem conexao. Os dados voltam quando a rede voltar."
							icon={<WifiOff />}
							title="Nao foi possivel carregar"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The slot every surface takes
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					List, Table and Select all accept{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						emptySection
					</code>
					; use{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						size="sm"
					</code>{' '}
					inside a popup.
				</p>
				<ComponentPreview title="A table and a select, both with nothing">
					<div className="flex w-full max-w-2xl flex-col gap-6">
						<Table
							columns={[
								{
									key: 'code',
									label: 'Codigo',
								},
								{
									key: 'guest',
									label: 'Hospede',
								},
							]}
							emptySection={
								<EmptyState
									description="Nenhuma reserva no periodo selecionado."
									icon={<SearchX />}
									title="Sem resultados"
								/>
							}
							itemKey="code"
							items={
								[] as {
									code: string
									guest: string
								}[]
							}
						/>
						<Select
							emptySection={
								<EmptyState
									icon={<SearchX />}
									size="sm"
									title="Nenhuma cidade"
								/>
							}
							mode="single"
							optionLabel="name"
							options={[]}
							optionValue="id"
							placeholder="Escolha uma cidade"
							searchable
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Title as a heading
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The title is a paragraph. When the empty state <em>is</em> the region,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						headingLevel
					</code>{' '}
					makes it a real h1–h6.
				</p>
				<ComponentPreview title="A projects page with none yet — headingLevel={2}">
					<div className="w-full max-w-md">
						<EmptyState
							action={<Button>New project</Button>}
							description="Projects group your bookings, rates and channels."
							headingLevel={2}
							icon={<Inbox />}
							size="lg"
							title="No projects yet"
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

export const Route = createFileRoute('/libs/react-web/components/empty-state')({
	component: Page,
})
