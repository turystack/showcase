import { createFileRoute } from '@tanstack/react-router'
import { Button, EmptyState, SpotlightSearch } from '@turystack/react-web'
import {
	ArrowRight,
	CalendarPlus,
	CreditCard,
	Download,
	FileText,
	History,
	LifeBuoy,
	LogOut,
	SearchX,
	Settings,
	UserRound,
	Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const spotlightProps = [
	{
		description: 'The rows, grouped into sections.',
		name: 'groups',
		required: true,
		type: 'SpotlightSearchGroup[]',
	},
	{
		default: '"dialog"',
		description: 'Placement: dialog, popover under a field, or inline.',
		name: 'variant',
		type: '"dialog" | "popover" | "inline"',
	},
	{
		default: '"md"',
		description: "Width preset of the popover's field.",
		name: 'width',
		type: '"sm" | "md" | "lg" | "full"',
	},
	{
		description: 'Shown while the query is empty; never filtered.',
		name: 'emptyQueryGroups',
		type: 'SpotlightSearchGroup[]',
	},
	{
		description: 'Controlled visibility of the dialog or the dropdown.',
		name: 'open',
		type: 'boolean',
	},
	{
		description: 'Uncontrolled initial visibility of dialog or dropdown.',
		name: 'defaultOpen',
		type: 'boolean',
	},
	{
		description: 'Fires when the dialog or the dropdown opens or closes.',
		name: 'onOpenChange',
		type: '(open: boolean) => void',
	},
	{
		description: 'Binds Cmd+K / Ctrl+K to open or focus the search.',
		name: 'shortcut',
		type: 'boolean',
	},
	{
		description: 'What the empty field says.',
		name: 'placeholder',
		type: 'string',
	},
	{
		description: 'Takes over filtering, for a server-backed palette.',
		name: 'onSearchChange',
		type: '(query: string) => void',
	},
	{
		description: 'Controlled query.',
		name: 'searchValue',
		type: 'string',
	},
	{
		description: 'Prefills the first query without controlling it.',
		name: 'defaultSearchValue',
		type: 'string',
	},
	{
		description: 'Results are on their way; the field shows a loader.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'What an empty result says. Defaults to a small EmptyState.',
		name: 'emptySection',
		type: 'React.ReactNode',
	},
	{
		description: 'Node under the list: key hints, a count, a link.',
		name: 'footer',
		type: 'React.ReactNode',
	},
	{
		description: 'Names the palette, field and results listbox.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const groupProps = [
	{
		description: 'The rows of the section.',
		name: 'items',
		required: true,
		type: 'SpotlightSearchItem[]',
	},
	{
		description: 'Names the section above its rows.',
		name: 'heading',
		type: 'string',
	},
	{
		description: 'Node right of the heading, e.g. a “View all” link.',
		name: 'action',
		type: 'React.ReactNode',
	},
	{
		description: 'Stable identity, and the React key. Defaults to the heading.',
		name: 'id',
		type: 'string',
	},
]

const itemProps = [
	{
		description: 'Stable identity, and the React key.',
		name: 'id',
		required: true,
		type: 'string',
	},
	{
		description: 'What the row says.',
		name: 'label',
		required: true,
		type: 'string',
	},
	{
		description: 'Line under the label; matched on too.',
		name: 'description',
		type: 'string',
	},
	{
		description: 'A node before the label, never an icon name.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		description: 'Extra words that also find this row.',
		name: 'keywords',
		type: 'string[]',
	},
	{
		description: 'The keys that also run it, rendered as keycaps on the right.',
		name: 'shortcut',
		type: 'string[]',
	},
	{
		description: 'Runs the command.',
		name: 'onSelect',
		type: '() => void',
	},
	{
		description: 'Keeps the palette open after the row runs.',
		name: 'keepOpen',
		type: 'boolean',
	},
	{
		description: 'Blocks the row, and visibly so.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks it, still reachable by arrows; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const usageCode = `import { SpotlightSearch } from '@turystack/react-web'

const groups = [
  {
    heading: 'Bookings',
    items: [
      {
        description: 'Start a reservation from scratch',
        icon: <CalendarPlus />,
        id: 'new',
        keywords: ['create', 'reserva'],
        label: 'New booking',
        onSelect: () => navigate('/bookings/new'),
        shortcut: ['N'],
      },
    ],
  },
]

// Opens over the page on Cmd+K
<SpotlightSearch groups={groups} placeholder="Search…" shortcut />

// Controlled, so a button can open it too
<SpotlightSearch groups={groups} onOpenChange={setOpen} open={open} shortcut />

// The search box in an app header: its own field, results hanging under it,
// recents before anything is typed
<SpotlightSearch
  emptyQueryGroups={[{ heading: 'Recent', items: recents }]}
  groups={groups}
  placeholder="Search"
  shortcut
  variant="popover"
  width="lg"
/>

// A "View all" beside a section heading — never a row
const groups = [
  { action: <a href="/customers?q=ana">View all</a>, heading: 'Customers', items },
]

// A search panel that lives on the page
<SpotlightSearch groups={groups} variant="inline" />

// Opened from /busca?q=fatura — prefilled, still uncontrolled
<SpotlightSearch defaultSearchValue={searchParams.q} groups={groups} variant="inline" />

// Backed by a server: the palette stops filtering
<SpotlightSearch
  groups={results}
  loading={isFetching}
  onSearchChange={search}
/>`

const REASON_GROUPS = [
	{
		heading: 'Relatórios',
		items: [
			{
				icon: <FileText />,
				id: 'view',
				label: 'Ver relatório de vendas',
			},
			{
				disabledReason: 'Só administradores podem exportar',
				icon: <Download />,
				id: 'export',
				label: 'Exportar CSV',
			},
		],
	},
]

function Page() {
	const [open, setOpen] = useState(false)
	const [ran, setRan] = useState<string | null>(null)
	const [query, setQuery] = useState('')
	const [headerRan, setHeaderRan] = useState<string | null>(null)

	const groups = useMemo(
		() => [
			{
				heading: 'Reservas',
				items: [
					{
						description: 'Comeca uma reserva do zero',
						icon: <CalendarPlus />,
						id: 'new-booking',
						keywords: [
							'criar',
							'nova',
						],
						label: 'Nova reserva',
						onSelect: () => setRan('Nova reserva'),
						shortcut: [
							'N',
						],
					},
					{
						description: 'Cobrancas, recibos e estornos',
						icon: <FileText />,
						id: 'invoices',
						keywords: [
							'billing',
							'faturamento',
							'nota',
						],
						label: 'Faturas',
						onSelect: () => setRan('Faturas'),
					},
					{
						description: 'Cartoes e formas de pagamento',
						icon: <CreditCard />,
						id: 'payments',
						keywords: [
							'billing',
							'cartao',
						],
						label: 'Pagamentos',
						onSelect: () => setRan('Pagamentos'),
					},
				],
			},
			{
				heading: 'Configuracoes',
				items: [
					{
						icon: <Users />,
						id: 'team',
						keywords: [
							'equipe',
							'usuarios',
						],
						label: 'Membros da equipe',
						onSelect: () => setRan('Membros da equipe'),
						shortcut: [
							'T',
						],
					},
					{
						icon: <Settings />,
						id: 'preferences',
						label: 'Preferencias',
						onSelect: () => setRan('Preferencias'),
					},
					{
						description: 'Requer permissao de administrador',
						disabled: true,
						icon: <CreditCard />,
						id: 'plan',
						label: 'Plano e cobranca',
					},
				],
			},
			{
				heading: 'Conta',
				items: [
					{
						icon: <LifeBuoy />,
						id: 'support',
						keywords: [
							'ajuda',
							'suporte',
						],
						label: 'Falar com o suporte',
						onSelect: () => setRan('Falar com o suporte'),
					},
					{
						icon: <LogOut />,
						id: 'logout',
						label: 'Sair',
						onSelect: () => setRan('Sair'),
						shortcut: [
							'Shift',
							'Q',
						],
					},
				],
			},
		],
		[],
	)

	const recents = useMemo(
		() => [
			{
				heading: 'Buscas recentes',
				items: [
					'Ana Souza',
					'RSV-20931',
					'Faturas de setembro',
				].map((label) => ({
					icon: <History />,
					id: `recent-${label}`,
					label,
					onSelect: () => setHeaderRan(label),
				})),
			},
			{
				heading: 'Ir para',
				items: [
					{
						icon: <CalendarPlus />,
						id: 'jump-new-booking',
						label: 'Nova reserva',
						onSelect: () => setHeaderRan('Nova reserva'),
						shortcut: [
							'N',
						],
					},
				],
			},
		],
		[],
	)

	const headerGroups = useMemo(
		() => [
			{
				action: (
					<Button
						onClick={() => setHeaderRan('Ver todos os hospedes')}
						size="sm"
						variant="link"
					>
						Ver todos
					</Button>
				),
				heading: 'Hospedes',
				items: [
					{
						description: 'ana.souza@example.com · 4 estadias',
						icon: <UserRound />,
						id: 'guest-ana-souza',
						label: 'Ana Souza',
					},
					{
						description: 'ana.lima@example.com · 1 estadia',
						icon: <UserRound />,
						id: 'guest-ana-lima',
						label: 'Ana Lima',
					},
					{
						description: 'mariana.costa@example.com · 2 estadias',
						icon: <UserRound />,
						id: 'guest-mariana-costa',
						label: 'Mariana Costa',
					},
					{
						description: 'bruno.alves@example.com · 6 estadias',
						icon: <UserRound />,
						id: 'guest-bruno-alves',
						label: 'Bruno Alves',
					},
				].map((guest) => ({
					...guest,
					onSelect: () => setHeaderRan(guest.label),
				})),
			},
			...groups,
		],
		[
			groups,
		],
	)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Navigation
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					SpotlightSearch
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A search that answers as you type: a dialog, a header field with a
					dropdown, or an inline list.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Rows are data, not children; group and row shapes have their own
					tables below.
				</p>
				<PropsTable props={spotlightProps} />
				<p className="max-w-prose text-muted-foreground text-sm">
					The backdrop is the shared{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						bg-overlay
					</code>{' '}
					scrim, blurred by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--overlay-blur
					</code>
					; theme it via{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						--overlay
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					SpotlightSearchGroup
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One entry in{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						groups
					</code>{' '}
					or{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						emptyQueryGroups
					</code>
					: a section and its rows.
				</p>
				<PropsTable props={groupProps} />
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					SpotlightSearchItem
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					One row of a group.
				</p>
				<PropsTable props={itemProps} />
			</section>

			<SlotsSection slug="spotlight-search" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Over the page</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					It sits near the top of the viewport, so results grow downward from
					the field.
				</p>
				<ComponentPreview title="Press Cmd+K, or use the button">
					<div className="flex flex-col items-center gap-3">
						<Button
							leftSection={<ArrowRight className="size-4" />}
							onClick={() => setOpen(true)}
						>
							Abrir a paleta
						</Button>
						<span className="text-muted-foreground text-sm">
							{ran ? `Ultimo comando: ${ran}` : 'Nenhum comando ainda'}
						</span>
						<SpotlightSearch
							ariaLabel="Busca de comandos"
							footer={
								<>
									<kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
										↑↓
									</kbd>
									<span>para navegar</span>
									<kbd className="rounded border border-border bg-muted px-1 font-mono text-[10px]">
										↵
									</kbd>
									<span>para executar</span>
								</>
							}
							groups={groups}
							onOpenChange={setOpen}
							open={open}
							placeholder="Buscar comandos, paginas, ajustes…"
							shortcut
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					In the app header
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						variant="popover"
					</code>{' '}
					renders its own field with results in a dropdown;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width
					</code>{' '}
					sets its width preset.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					Focus the field:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						emptyQueryGroups
					</code>{' '}
					shows recents. Type <strong>ana</strong> to see a heading{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						action
					</code>
					.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						shortcut
					</code>{' '}
					is off here because the dialog above owns Cmd+K.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The results listbox is always named:{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ariaLabel
					</code>
					, else{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						placeholder
					</code>
					, else a default label.
				</p>
				<ComponentPreview title={'Popover with width="lg" and recents'}>
					<div className="flex w-full max-w-3xl flex-col gap-3">
						<div className="flex items-center gap-4 rounded-lg border border-border bg-background px-4 py-3">
							<span className="font-semibold text-sm">Pousada do Sol</span>
							<div className="flex flex-1 justify-center">
								<SpotlightSearch
									ariaLabel="Buscar no sistema"
									emptyQueryGroups={recents}
									groups={headerGroups}
									placeholder="Buscar hospedes, reservas, comandos…"
									variant="popover"
									width="lg"
								/>
							</div>
							<Button
								size="sm"
								variant="outline"
							>
								Sair
							</Button>
						</div>
						<span className="text-center text-muted-foreground text-sm">
							{headerRan ? `Abriu: ${headerRan}` : 'Nada aberto ainda'}
						</span>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Found by what the reader thinks in
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Matching reads label, description and{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						keywords
					</code>
					: type <strong>billing</strong> to find Faturas.
				</p>
				<ComponentPreview title={'variant="inline": rendered in place'}>
					<div className="w-full max-w-lg overflow-hidden rounded-lg ring-1 ring-foreground/10">
						<SpotlightSearch
							groups={groups}
							placeholder="Tente: billing, equipe, sair"
							variant="inline"
						/>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultSearchValue
					</code>{' '}
					prefills the first query, as from a link with{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">?q=</code>
					.
				</p>
				<ComponentPreview title={'defaultSearchValue="fatura"'}>
					<div className="w-full max-w-lg overflow-hidden rounded-lg ring-1 ring-foreground/10">
						<SpotlightSearch
							defaultSearchValue="fatura"
							groups={groups}
							placeholder="Buscar em tudo"
							variant="inline"
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
						disabledReason
					</code>{' '}
					blocks a row but keeps it reachable by arrows; the tooltip says why.
				</p>
				<ComponentPreview title="Export blocked beside a free row">
					<div className="w-full max-w-lg overflow-hidden rounded-lg ring-1 ring-foreground/10">
						<SpotlightSearch
							groups={REASON_GROUPS}
							placeholder="Buscar relatórios"
							variant="inline"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					When the server does the searching
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onSearchChange
					</code>{' '}
					stops local filtering;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						emptySection
					</code>{' '}
					replaces the empty message.
				</p>
				<ComponentPreview title="The page owns the query and the filtering">
					<div className="flex w-full max-w-lg flex-col gap-3">
						<div className="overflow-hidden rounded-lg ring-1 ring-foreground/10">
							<SpotlightSearch
								emptySection={
									<EmptyState
										description={`Nada encontrado para "${query}".`}
										icon={<SearchX />}
										size="sm"
										title="Sem resultados"
									/>
								}
								groups={groups
									.map((group) => ({
										...group,
										items: group.items.filter((item) =>
											item.label.toLowerCase().includes(query.toLowerCase()),
										),
									}))
									.filter((group) => group.items.length > 0)}
								onSearchChange={setQuery}
								placeholder="Filtrado pela pagina, nao pelo componente"
								variant="inline"
							/>
						</div>
						<span className="text-center text-muted-foreground text-sm">
							query: "{query}"
						</span>
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
	'/libs/react-web/components/spotlight-search',
)({
	component: Page,
})
