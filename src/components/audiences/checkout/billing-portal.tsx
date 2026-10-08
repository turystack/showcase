import {
	ArrowLeftIcon,
	CircleAlertIcon,
	CreditCardIcon,
	GiftIcon,
	MoreIcon,
	PixIcon,
	PlusIcon,
	ReceiptIcon,
	RotateCcwIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Avatar,
	Badge,
	type BadgeVariant,
	Box,
	Button,
	Card,
	DateText,
	DescriptionList,
	DocumentInput,
	DropdownMenu,
	EmptyState,
	Flex,
	Form,
	Grid,
	Identity,
	Input,
	Layout,
	List,
	MaskInput,
	MoneyText,
	Page,
	Radio,
	SegmentedControl,
	Separator,
	Table,
	Textarea,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import { AcmeLogo } from '@/components/audiences/acme-logo'
import { PaymentMethods } from '@/components/audiences/checkout/checkout'
import {
	CheckoutFormat,
	CUSTOMER,
	formatCents,
} from '@/components/audiences/checkout/checkout-shared'

/**
 * The billing portal: where a signed-in customer manages what they already
 * pay for. Plan, method, billing details, invoices and the way out, in that
 * order — the anatomy every portal the research looked at shares.
 *
 * "Mudar plano" does not live here: it opens the checkout in signed-in mode,
 * so a plan change is priced and confirmed on one page, wherever it starts.
 */
export type BillingPortalVariant =
	| 'overview'
	| 'overview-past-due'
	| 'update-method'
	| 'update-billing-info'
	| 'invoices'
	| 'cancel-reason'
	| 'cancel-retention-offer'
	| 'canceled-grace'
	| 'canceled-final'

/** How an invoice was last paid. */
type InvoicePayment = {
	kind: 'card' | 'pix_automatic' | 'boleto'
	last4?: string
	status: 'succeeded' | 'failed' | 'refunded'
}

/** An invoice as the API returns it; amounts in cents. */
type Invoice = {
	invoice_id: string
	number: number
	description: string
	issued_at: string
	total: number
	status: 'paid' | 'open'
	last_payment: InvoicePayment
}

/** The account's invoices, newest first. */
const INVOICES: Invoice[] = [
	{
		description: 'Acme Pro · Anual',
		invoice_id: '01932b31-1ec5-70d6-a2e3-5d6e7f8a9b00',
		issued_at: '2026-09-26T12:00:00-03:00',
		last_payment: {
			kind: 'card',
			last4: '4242',
			status: 'succeeded',
		},
		number: 1042,
		status: 'paid',
		total: 106800,
	},
	{
		description: 'Upgrade Starter → Pro (pró-rata)',
		invoice_id: '01932a10-0c4d-7e5f-8a60-7b8c9d0e1f00',
		issued_at: '2026-09-12T12:00:00-03:00',
		last_payment: {
			kind: 'card',
			last4: '4242',
			status: 'succeeded',
		},
		number: 1031,
		status: 'paid',
		total: 2333,
	},
	{
		description: 'Acme Starter · Mensal',
		invoice_id: '01931f02-6b7c-7d8e-9f00-1a2b3c4d5e00',
		issued_at: '2026-08-10T12:00:00-03:00',
		last_payment: {
			kind: 'pix_automatic',
			status: 'succeeded',
		},
		number: 988,
		status: 'paid',
		total: 4900,
	},
	{
		description: 'Acme Starter · Mensal',
		invoice_id: '01931c01-5a6b-7c7d-8e9f-0a1b2c3d4e00',
		issued_at: '2026-07-10T12:00:00-03:00',
		last_payment: {
			kind: 'boleto',
			status: 'succeeded',
		},
		number: 941,
		status: 'paid',
		total: 4900,
	},
	{
		description: 'Acme Starter · Mensal',
		invoice_id: '01931900-4f5a-7b6c-8d7e-9f0a1b2c3d00',
		issued_at: '2026-06-10T12:00:00-03:00',
		last_payment: {
			kind: 'boleto',
			status: 'refunded',
		},
		number: 897,
		status: 'paid',
		total: 4900,
	},
]

/**
 * The same history, with this year's renewal refused by the card: the invoice
 * stays `open` and its last payment `failed`, so it reads "Falhou".
 */
const PAST_DUE_INVOICES: Invoice[] = [
	{
		...INVOICES[0],
		last_payment: {
			kind: 'card',
			last4: '4242',
			status: 'failed',
		},
		status: 'open',
	},
	...INVOICES.slice(1),
]

function PortalShell({ children }: { children: ReactNode }) {
	return (
		<CheckoutFormat>
			<Layout height="fill">
				<Layout.Header
					bordered
					leftSection={
						<Flex
							align="center"
							gap="md"
						>
							<AcmeLogo />
							<Flex
								align="center"
								gap="md"
								hideBelow="sm"
							>
								<Separator orientation="vertical" />
								<Typography
									component="span"
									size="sm"
									variant="muted"
								>
									Portal da assinatura
								</Typography>
							</Flex>
						</Flex>
					}
					rightSection={
						<Flex
							align="center"
							gap="md"
						>
							<Box hideBelow="md">
								<Typography
									component="span"
									size="sm"
									variant="muted"
								>
									{CUSTOMER.email}
								</Typography>
							</Box>
							<Button
								leftSection={<ArrowLeftIcon size={16} />}
								size="sm"
								variant="outline"
							>
								Voltar para Acme
							</Button>
						</Flex>
					}
				/>
				<Layout.Main>
					<Layout.Content
						maxWidth="md"
						padding="lg"
					>
						<Page>{children}</Page>
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</CheckoutFormat>
	)
}

type InvoiceStatus = 'paid' | 'open' | 'failed' | 'refunded'

/**
 * The status an invoice is shown with: the stored one, except an open invoice
 * whose payment failed reads "Falhou" and a paid one that was refunded reads
 * "Estornada". Derived here, never stored.
 */
function statusOf(invoice: Invoice): InvoiceStatus {
	if (invoice.status === 'open' && invoice.last_payment.status === 'failed') {
		return 'failed'
	}
	if (invoice.status === 'paid' && invoice.last_payment.status === 'refunded') {
		return 'refunded'
	}

	return invoice.status
}

const INVOICE_STATUS: Record<
	InvoiceStatus,
	{
		label: string
		variant: BadgeVariant
	}
> = {
	failed: {
		label: 'Falhou',
		variant: 'destructive',
	},
	open: {
		label: 'Em aberto',
		variant: 'warning',
	},
	paid: {
		label: 'Paga',
		variant: 'success',
	},
	refunded: {
		label: 'Estornada',
		variant: 'secondary',
	},
}

/** "Cartão •••• 4242", "Pix Automático", "Boleto". */
function paidWith({ kind, last4 }: InvoicePayment): string {
	if (kind === 'card') {
		return last4 ? `Cartão •••• ${last4}` : 'Cartão'
	}

	return kind === 'boleto' ? 'Boleto' : 'Pix Automático'
}

/** Pay while there is something to pay, then view and download. */
function InvoiceMenu({ invoice }: { invoice: Invoice }) {
	const status = statusOf(invoice)
	const payable = status === 'open' || status === 'failed'

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button
					ariaLabel={`Ações da fatura nº ${invoice.number}`}
					size="icon-xs"
					variant="ghost"
				>
					<MoreIcon size={16} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align="end"
				width={200}
			>
				{payable && (
					<>
						<DropdownMenu.Item>
							{status === 'failed' ? 'Tentar pagar de novo' : 'Pagar'}
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
					</>
				)}
				<DropdownMenu.Item>Ver fatura</DropdownMenu.Item>
				<DropdownMenu.Item>Baixar</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu>
	)
}

/** Design widths; their sum is the width below which phones scroll sideways. */
const INVOICE_WIDTHS = {
	actions: 56,
	date: 96,
	description: 208,
	method: 128,
	status: 72,
	total: 80,
}

/**
 * The invoices as a compact Table: date, description, how it was paid, the
 * amount, the derived status, and a menu pinned to the right edge.
 */
function InvoiceList({
	invoices,
	paginated,
}: {
	invoices: Invoice[]
	paginated?: boolean
}) {
	const [page, setPage] = useState(1)
	const [rows, setRows] = useState(10)

	return (
		<Table<Invoice>
			columns={[
				{
					key: 'issued_at',
					label: 'Data',
					selector: (row) => (
						<DateText
							size="inherit"
							value={row.issued_at}
						/>
					),
					width: INVOICE_WIDTHS.date,
				},
				{
					key: 'description',
					label: 'Descrição',
					width: INVOICE_WIDTHS.description,
				},
				{
					key: 'method',
					label: 'Método',
					selector: (row) => paidWith(row.last_payment),
					width: INVOICE_WIDTHS.method,
				},
				{
					align: 'right',
					key: 'total',
					label: 'Valor',
					selector: (row) => (
						<MoneyText
							size="inherit"
							value={row.total}
						/>
					),
					width: INVOICE_WIDTHS.total,
				},
				{
					key: 'status',
					label: 'Status',
					selector: (row) => {
						const status = INVOICE_STATUS[statusOf(row)]

						return (
							<Badge
								size="sm"
								variant={status.variant}
							>
								{status.label}
							</Badge>
						)
					},
					width: INVOICE_WIDTHS.status,
				},
				{
					align: 'center',
					fixedWidth: true,
					key: 'actions',
					selector: (row) => <InvoiceMenu invoice={row} />,
					sticky: 'right',
					width: INVOICE_WIDTHS.actions,
				},
			]}
			density="compact"
			hidePagination={!paginated}
			itemKey="invoice_id"
			items={invoices}
			layoutWidth={Object.values(INVOICE_WIDTHS).reduce(
				(sum, width) => sum + width,
				0,
			)}
			pagination={
				paginated
					? {
							mode: 'offset',
							onPageChange: setPage,
							onRowsPerPageChange: setRows,
							page,
							rowsPerPage: rows,
							total: 23,
						}
					: undefined
			}
		/>
	)
}

type PlanState = 'active' | 'past-due' | 'grace'

/** What the card says about the plan in each state. */
const PLAN_STATUS: Record<
	PlanState,
	{
		badge: string
		variant: BadgeVariant
		sentence: ReactNode
	}
> = {
	active: {
		badge: 'Ativa',
		sentence: (
			<>
				Renova em{' '}
				<DateText
					inheritColor
					size="inherit"
					value="2027-09-26T12:00:00-03:00"
				/>{' '}
				por{' '}
				<MoneyText
					inheritColor
					size="inherit"
					value={106800}
				/>
				.
			</>
		),
		variant: 'success',
	},
	grace: {
		badge: 'Cancelada',
		sentence: (
			<>
				Ativa até{' '}
				<DateText
					inheritColor
					size="inherit"
					value="2027-09-26T12:00:00-03:00"
				/>
				. Não haverá renovação.
			</>
		),
		variant: 'warning',
	},
	'past-due': {
		badge: 'Pagamento em atraso',
		sentence: (
			<>
				A renovação de{' '}
				<DateText
					inheritColor
					size="inherit"
					value="2026-09-26T12:00:00-03:00"
				/>{' '}
				foi recusada. O acesso segue até{' '}
				<DateText
					inheritColor
					size="inherit"
					value="2026-10-03T12:00:00-03:00"
				/>
				.
			</>
		),
		variant: 'destructive',
	},
}

/**
 * The current plan: name and cadence with its status, the price and its
 * monthly equivalent, what happens next, and the actions that fit the state.
 */
function PlanCard({ state }: { state: PlanState }) {
	const status = PLAN_STATUS[state]

	return (
		<Card height="full">
			<Card.Header>
				<Flex
					align="center"
					gap="sm"
					justify="between"
				>
					<Card.Title headingLevel={2}>Acme Pro · Anual</Card.Title>
					<Badge variant={status.variant}>{status.badge}</Badge>
				</Flex>
				<Card.Description>Até 10 usuários · 5 em uso</Card.Description>
			</Card.Header>
			<Card.Content>
				<Flex
					direction="col"
					gap="sm"
				>
					<Flex
						align="baseline"
						gap="xs"
						wrap="wrap"
					>
						<MoneyText
							size="2xl"
							value={106800}
							weight="bold"
						/>
						<Typography
							component="span"
							size="sm"
							variant="muted"
						>
							por ano ·{' '}
							<MoneyText
								inheritColor
								size="inherit"
								value={8900}
							/>
							/mês
						</Typography>
					</Flex>
					<Typography
						component="p"
						size="sm"
						variant="muted"
					>
						{status.sentence}
					</Typography>
				</Flex>
			</Card.Content>
			<Card.Footer bordered>
				{state === 'grace' ? (
					<Button leftSection={<RotateCcwIcon size={16} />}>
						Reativar assinatura
					</Button>
				) : (
					<Flex gap="sm">
						<Button variant="outline">Mudar plano</Button>
						<Button variant="ghost">Mudar intervalo</Button>
					</Flex>
				)}
			</Card.Footer>
		</Card>
	)
}

/** A saved payment method as the API returns it. */
type SavedMethod = {
	payment_method_id: string
	kind: 'card' | 'pix_automatic'
	/** "Visa •••• 4242", "Pix Automático". */
	name: string
	/** "Vence 08/2028", "Itaú · autorizado até R$ 2.000,00". */
	detail: string
	is_default: boolean
}

const SAVED_METHODS: SavedMethod[] = [
	{
		detail: 'Vence 08/2028',
		is_default: true,
		kind: 'card',
		name: 'Visa •••• 4242',
		payment_method_id: '01932b31-3ae7-72f8-84a5-7f8a9b0c1d00',
	},
	{
		detail: 'Vence 03/2027',
		is_default: false,
		kind: 'card',
		name: 'Mastercard •••• 1881',
		payment_method_id: '01932b31-3ae7-72f8-84a5-7f8a9b0c1d01',
	},
	{
		detail: `Itaú · autorizado até ${formatCents(200000)}`,
		is_default: false,
		kind: 'pix_automatic',
		name: 'Pix Automático',
		payment_method_id: '01932b31-3ae7-72f8-84a5-7f8a9b0c1d02',
	},
]

/** One saved method: icon, name and detail, the default badge, its menu. */
function MethodRow({
	method,
	onRemove,
	onSetDefault,
	refused,
}: {
	method: SavedMethod
	onRemove: () => void
	onSetDefault: () => void
	refused: boolean
}) {
	return (
		<Flex
			align="center"
			gap="sm"
			justify="between"
		>
			<Identity
				description={
					<Typography
						component="span"
						destructive={refused}
						size="xs"
						variant={refused ? 'default' : 'muted'}
					>
						{refused ? 'Recusado em 26/09/2026' : method.detail}
					</Typography>
				}
				media={
					<Avatar
						alt=""
						size="sm"
						variant="square"
					>
						{method.kind === 'card' ? (
							<CreditCardIcon size={16} />
						) : (
							<PixIcon size={16} />
						)}
					</Avatar>
				}
				size="sm"
				title={method.name}
			/>
			<Flex
				align="center"
				gap="xs"
			>
				{method.is_default && (
					<Badge
						size="sm"
						variant="secondary"
					>
						Padrão
					</Badge>
				)}
				<DropdownMenu>
					<DropdownMenu.Trigger asChild>
						<Button
							ariaLabel={`Ações de ${method.name}`}
							size="icon-xs"
							variant="ghost"
						>
							<MoreIcon size={16} />
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						align="end"
						width={220}
					>
						<DropdownMenu.Item
							disabled={method.is_default}
							onClick={onSetDefault}
						>
							Definir como padrão
						</DropdownMenu.Item>
						<DropdownMenu.Item>Editar</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item
							disabled={method.is_default}
							onClick={onRemove}
							variant="destructive"
						>
							Remover
						</DropdownMenu.Item>
						{method.is_default && (
							<DropdownMenu.Label>
								<Typography
									component="span"
									size="xs"
									variant="muted"
								>
									Defina outra forma como padrão antes de remover esta.
								</Typography>
							</DropdownMenu.Label>
						)}
					</DropdownMenu.Content>
				</DropdownMenu>
			</Flex>
		</Flex>
	)
}

/**
 * Every saved method, the default first-class: it is the one renewals charge,
 * so it carries the badge, and "Definir como padrão" moves that role to
 * another. The default cannot be removed — there has to be one to charge.
 */
function MethodCard({ failed }: { failed?: boolean }) {
	const [methods, setMethods] = useState(SAVED_METHODS)

	return (
		<Card height="full">
			<Card.Header>
				<Card.Title headingLevel={2}>Formas de pagamento</Card.Title>
				<Card.Description>A padrão é usada nas renovações</Card.Description>
			</Card.Header>
			<Card.Content>
				<List<SavedMethod>
					ariaLabel="Formas de pagamento"
					divided
					gap="none"
					itemKey="payment_method_id"
					items={methods}
					renderItem={(method) => (
						<MethodRow
							method={method}
							onRemove={() =>
								setMethods((current) =>
									current.filter(
										(item) =>
											item.payment_method_id !== method.payment_method_id,
									),
								)
							}
							onSetDefault={() =>
								setMethods((current) =>
									current.map((item) => ({
										...item,
										is_default:
											item.payment_method_id === method.payment_method_id,
									})),
								)
							}
							refused={
								Boolean(failed) &&
								method.payment_method_id === SAVED_METHODS[0].payment_method_id
							}
						/>
					)}
				/>
			</Card.Content>
			<Card.Footer bordered>
				<Button
					leftSection={<PlusIcon size={16} />}
					variant={failed ? 'default' : 'outline'}
				>
					Adicionar forma de pagamento
				</Button>
			</Card.Footer>
		</Card>
	)
}

function BillingCard() {
	return (
		<Card>
			<Card.Header>
				<Flex
					align="center"
					justify="between"
				>
					<Card.Title headingLevel={2}>Dados de cobrança</Card.Title>
					<Button
						size="sm"
						variant="link"
					>
						Editar
					</Button>
				</Flex>
				<Card.Description>
					Faturas e recibos saem com estes dados
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<DescriptionList
					columns={2}
					items={[
						{
							label: 'Razão social',
							value: CUSTOMER.company,
						},
						{
							copyable: true,
							label: 'CNPJ',
							value: CUSTOMER.cnpj,
						},
						{
							label: 'E-mail de cobrança',
							value: 'financeiro@padariaestrela.example',
						},
						{
							label: 'Endereço',
							value: 'Rua Augusta, 1500, sala 4 · São Paulo — SP',
						},
					]}
				/>
			</Card.Content>
		</Card>
	)
}

function InvoicesCard({ invoices }: { invoices: Invoice[] }) {
	return (
		<Card>
			<Card.Header>
				<Flex
					align="center"
					justify="between"
				>
					<Card.Title headingLevel={2}>Faturas recentes</Card.Title>
					<Button
						size="sm"
						variant="link"
					>
						Ver todas
					</Button>
				</Flex>
			</Card.Header>
			<Card.Content>
				<InvoiceList invoices={invoices.slice(0, 3)} />
			</Card.Content>
		</Card>
	)
}

function DangerZone() {
	return (
		<Card>
			<Card.Header>
				<Card.Title headingLevel={2}>Cancelar assinatura</Card.Title>
				<Card.Description>
					Você continua com o Pro até o fim do período pago. Nada é apagado.
				</Card.Description>
			</Card.Header>
			<Card.Footer bordered>
				<Button variant="destructive">Cancelar assinatura</Button>
			</Card.Footer>
		</Card>
	)
}

function Overview({ state }: { state: PlanState }) {
	const invoices = state === 'past-due' ? PAST_DUE_INVOICES : INVOICES

	return (
		<>
			<Page.Header
				description="Plano, pagamento e faturas da Padaria Estrela."
				icon={<ReceiptIcon />}
				title="Assinatura"
			/>
			<Page.Content>
				<Flex
					direction="col"
					gap="lg"
				>
					{state === 'past-due' && (
						<Alert variant="destructive">
							<Alert.Icon>
								<CircleAlertIcon />
							</Alert.Icon>
							<Alert.Title>Não conseguimos cobrar a renovação</Alert.Title>
							<Alert.Description>
								O cartão •••• 4242 recusou R$ 1.068,00 em 26/09. Pague a fatura
								em aberto ou troque o método até 03/10 para não perder o acesso.
							</Alert.Description>
							<Alert.Action>
								<Button size="sm">Pagar agora</Button>
							</Alert.Action>
						</Alert>
					)}
					{state === 'grace' && (
						<Alert variant="warning">
							<Alert.Icon>
								<CircleAlertIcon />
							</Alert.Icon>
							<Alert.Title>Sua assinatura termina em 26/09/2027</Alert.Title>
							<Alert.Description>
								Mudou de ideia? Reative até lá e nada muda — mesmo plano, mesmo
								preço, mesma data.
							</Alert.Description>
							<Alert.Action>
								<Button size="sm">Reativar</Button>
							</Alert.Action>
						</Alert>
					)}
					<Grid
						cols={{
							base: 1,
							md: 2,
						}}
						gap="lg"
					>
						<PlanCard state={state} />
						<MethodCard failed={state === 'past-due'} />
					</Grid>
					<BillingCard />
					<InvoicesCard invoices={invoices} />
					{state === 'active' && <DangerZone />}
				</Flex>
			</Page.Content>
		</>
	)
}

function SubPageHeader({
	description,
	title,
}: {
	description: string
	title: string
}) {
	return (
		<Page.Header
			breadcrumbs={[
				{
					href: '#',
					label: 'Assinatura',
				},
				{
					label: title,
				},
			]}
			description={description}
			title={title}
		/>
	)
}

function FormActions({
	cancel = 'Cancelar',
	submit,
}: {
	cancel?: string
	submit: string
}) {
	return (
		<Flex
			gap="sm"
			justify="end"
		>
			<Button variant="ghost">{cancel}</Button>
			<Button type="submit">{submit}</Button>
		</Flex>
	)
}

function UpdateMethod() {
	const [method, setMethod] = useState<'pix' | 'card' | 'boleto'>('card')

	return (
		<>
			<SubPageHeader
				description="O novo método vale a partir da próxima cobrança, em 26/09/2027."
				title="Atualizar forma de pagamento"
			/>
			<Page.Content>
				<Form
					gap="lg"
					onSubmit={(event) => {
						event.preventDefault()
					}}
				>
					<Card size="sm">
						<Card.Content>
							<Flex
								align="center"
								gap="sm"
								justify="between"
							>
								<Flex
									align="center"
									gap="sm"
								>
									<CreditCardIcon size={18} />
									<Typography
										component="span"
										size="sm"
									>
										Atual: Cartão •••• 4242 · vence 08/2028
									</Typography>
								</Flex>
								<Badge
									size="sm"
									variant="secondary"
								>
									Será substituído
								</Badge>
							</Flex>
						</Card.Content>
					</Card>
					<Typography
						size="base"
						weight="semibold"
					>
						Nova forma de pagamento
					</Typography>
					<PaymentMethods
						amount={106800}
						every="Anual"
						headingLevel={2}
						method={method}
						onChange={setMethod}
					/>
					<Separator />
					<FormActions submit="Salvar forma de pagamento" />
				</Form>
			</Page.Content>
		</>
	)
}

type TaxKind = 'cpf' | 'cnpj'

/** The billing account as the form edits it. */
type Account = {
	tax_number_kind: TaxKind
	legal_name: string
	tax_number: string
	postal_code: string
	address_line: string
	address_number: string
	address_complement: string
	district: string
	city: string
	region: string
	email: string
}

type AccountField = Exclude<keyof Account, 'tax_number_kind'>

/** The account on file. */
const ACCOUNT: Account = {
	address_complement: 'Sala 4',
	address_line: 'Rua Augusta',
	address_number: '1500',
	city: 'São Paulo',
	district: 'Consolação',
	email: 'financeiro@padariaestrela.example',
	legal_name: CUSTOMER.company,
	postal_code: '01310300',
	region: 'SP',
	tax_number: CUSTOMER.cnpj,
	tax_number_kind: 'cnpj',
}

const ADDRESS_FIELDS = [
	'postal_code',
	'address_line',
	'address_number',
	'district',
	'city',
	'region',
] as const

const digits = (value: string) => value.replace(/\D/g, '')

/**
 * The client's light check, before the server's: the required fields, the
 * document's and the postal code's digits, the e-mail's shape, and an address
 * that is all or nothing.
 */
function validate(account: Account): Partial<Record<AccountField, string>> {
	const errors: Partial<Record<AccountField, string>> = {}
	const blank = (field: AccountField) => !account[field].trim()
	const taxDigits = digits(account.tax_number).length

	if (blank('legal_name')) {
		errors.legal_name = 'Obrigatório.'
	}
	if (taxDigits === 0) {
		errors.tax_number = 'Obrigatório.'
	} else if (account.tax_number_kind === 'cpf' && taxDigits !== 11) {
		errors.tax_number = 'O CPF tem 11 dígitos.'
	} else if (account.tax_number_kind === 'cnpj' && taxDigits !== 14) {
		errors.tax_number = 'O CNPJ tem 14 dígitos.'
	}
	if (blank('email')) {
		errors.email = 'Obrigatório.'
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email.trim())) {
		errors.email = 'Informe um e-mail válido.'
	}
	if (ADDRESS_FIELDS.some((field) => !blank(field))) {
		for (const field of ADDRESS_FIELDS) {
			if (blank(field)) {
				errors[field] = 'Obrigatório.'
			}
		}
		if (!errors.postal_code && digits(account.postal_code).length !== 8) {
			errors.postal_code = 'O CEP tem 8 dígitos.'
		}
	}

	return errors
}

const TAX_KINDS = [
	{
		label: 'Pessoa física',
		value: 'cpf',
	},
	{
		label: 'Pessoa jurídica',
		value: 'cnpj',
	},
]

/**
 * CPF or CNPJ, who the invoices are for, the address (optional, but whole
 * once started) and where they are sent. Each field clears its error as it is
 * edited; Save checks them all.
 */
function BillingAccountFields() {
	const [account, setAccount] = useState(ACCOUNT)
	const [errors, setErrors] = useState<Partial<Record<AccountField, string>>>(
		{},
	)
	const kind = account.tax_number_kind

	const set = (field: AccountField) => (value: string | null) => {
		setAccount((current) => ({
			...current,
			[field]: value ?? '',
		}))
		setErrors((current) => ({
			...current,
			[field]: undefined,
		}))
	}

	return (
		<Form
			gap="lg"
			onSubmit={(event) => {
				event.preventDefault()
				setErrors(validate(account))
			}}
		>
			<SegmentedControl
				ariaLabel="Tipo de documento"
				block
				onChange={(next) => {
					setAccount((current) => ({
						...current,
						tax_number: '',
						tax_number_kind: next as TaxKind,
					}))
					setErrors((current) => ({
						...current,
						tax_number: undefined,
					}))
				}}
				optionLabel="label"
				options={TAX_KINDS}
				optionValue="value"
				size="sm"
				value={kind}
			/>
			<Grid
				cols={{
					base: 1,
					sm: 2,
				}}
				gap="md"
			>
				<Form.Field
					error={errors.legal_name}
					label={kind === 'cpf' ? 'Nome completo' : 'Razão social'}
				>
					<Input
						autoComplete={kind === 'cpf' ? 'name' : 'organization'}
						onChange={set('legal_name')}
						value={account.legal_name}
					/>
				</Form.Field>
				<Form.Field
					error={errors.tax_number}
					label={kind === 'cpf' ? 'CPF' : 'CNPJ'}
				>
					<DocumentInput
						key={kind}
						onChange={(value) => set('tax_number')(value?.number ?? '')}
						value={{
							number: account.tax_number,
							type: kind,
						}}
						variant={kind}
					/>
				</Form.Field>
			</Grid>
			<Flex
				direction="col"
				gap="md"
			>
				<Grid
					cols={{
						base: 1,
						sm: 3,
					}}
					gap="md"
				>
					<Form.Field
						error={errors.postal_code}
						label="CEP"
					>
						<MaskInput
							autoComplete="postal-code"
							inputMode="numeric"
							mask="00000-000"
							onChange={set('postal_code')}
							placeholder="00000-000"
							value={account.postal_code}
						/>
					</Form.Field>
					<Grid.Item
						span={{
							base: 1,
							sm: 2,
						}}
					>
						<Form.Field
							error={errors.address_line}
							label="Rua"
						>
							<Input
								autoComplete="address-line1"
								onChange={set('address_line')}
								value={account.address_line}
							/>
						</Form.Field>
					</Grid.Item>
				</Grid>
				<Grid
					cols={{
						base: 1,
						sm: 3,
					}}
					gap="md"
				>
					<Form.Field
						error={errors.address_number}
						label="Número"
					>
						<Input
							onChange={set('address_number')}
							value={account.address_number}
						/>
					</Form.Field>
					<Grid.Item
						span={{
							base: 1,
							sm: 2,
						}}
					>
						<Form.Field
							label={{
								content: 'Complemento',
								optional: true,
							}}
						>
							<Input
								autoComplete="address-line2"
								onChange={set('address_complement')}
								value={account.address_complement}
							/>
						</Form.Field>
					</Grid.Item>
				</Grid>
				<Grid
					cols={{
						base: 1,
						sm: 3,
					}}
					gap="md"
				>
					<Form.Field
						error={errors.district}
						label="Bairro"
					>
						<Input
							onChange={set('district')}
							value={account.district}
						/>
					</Form.Field>
					<Form.Field
						error={errors.city}
						label="Cidade"
					>
						<Input
							autoComplete="address-level2"
							onChange={set('city')}
							value={account.city}
						/>
					</Form.Field>
					<Form.Field
						error={errors.region}
						label="UF"
					>
						<Input
							autoComplete="address-level1"
							maxLength={2}
							onChange={set('region')}
							value={account.region}
						/>
					</Form.Field>
				</Grid>
			</Flex>
			<Form.Field
				description="Para onde enviamos as faturas e os recibos."
				error={errors.email}
				label="E-mail de cobrança"
			>
				<Input
					autoComplete="email"
					inputMode="email"
					onChange={set('email')}
					value={account.email}
				/>
			</Form.Field>
			<Typography
				component="p"
				size="xs"
				variant="muted"
			>
				Faturas e recibos saem com estes dados.
			</Typography>
			<Flex
				gap="sm"
				justify="end"
			>
				<Button variant="ghost">Cancelar</Button>
				<Button type="submit">Salvar dados</Button>
			</Flex>
		</Form>
	)
}

function UpdateBillingInfo() {
	return (
		<>
			<SubPageHeader
				description="Vale para as próximas faturas. Faturas já emitidas não mudam."
				title="Dados de cobrança"
			/>
			<Page.Content>
				<BillingAccountFields />
			</Page.Content>
		</>
	)
}

function Invoices() {
	return (
		<>
			<SubPageHeader
				description="Todas as cobranças da conta, com recibo para baixar."
				title="Faturas"
			/>
			<Page.Content>
				<Card>
					<Card.Content>
						<InvoiceList
							invoices={INVOICES}
							paginated
						/>
					</Card.Content>
				</Card>
			</Page.Content>
		</>
	)
}

const CANCEL_REASONS = [
	{
		label: 'Está caro para o momento',
		value: 'price',
	},
	{
		label: 'Não uso o suficiente',
		value: 'usage',
	},
	{
		label: 'Falta um recurso de que preciso',
		value: 'feature',
	},
	{
		label: 'Vou usar outro produto',
		value: 'competitor',
	},
	{
		label: 'Problemas técnicos',
		value: 'technical',
	},
	{
		label: 'Outro motivo',
		value: 'other',
	},
]

/** Why they are leaving, a comment, and what canceling does. */
function CancelReason({ onContinue }: { onContinue: () => void }) {
	const [reason, setReason] = useState('price')
	const [comment, setComment] = useState('')

	return (
		<Form
			gap="lg"
			onSubmit={(event) => {
				event.preventDefault()
				onContinue()
			}}
		>
			<Form.FieldSet legend="Por que você está cancelando?">
				<Radio.Group
					bordered
					items={CANCEL_REASONS}
					onChange={(value) => setReason(String(value))}
					value={reason}
				/>
			</Form.FieldSet>
			<Form.Field
				label={{
					content: 'Quer contar mais?',
					optional: true,
				}}
			>
				<Textarea
					maxLength={500}
					onChange={(value) => setComment(value ?? '')}
					placeholder="O que teria feito você ficar"
					rows={3}
					value={comment}
				/>
			</Form.Field>
			<Alert variant="info">
				<Alert.Title>O que acontece depois</Alert.Title>
				<Alert.Description>
					Você continua com o plano até 26/09/2027 e não haverá novas cobranças.
					Seus dados continuam aqui se você voltar a assinar.
				</Alert.Description>
			</Alert>
			<Flex
				gap="sm"
				justify="end"
				wrap="wrap"
			>
				<Button variant="ghost">Manter assinatura</Button>
				<Button type="submit">Continuar</Button>
			</Flex>
		</Form>
	)
}

/**
 * The offer to stay, answering the reason: 50% off the next renewal, what
 * it saves, and the decline that cancels after all.
 */
function CancelOffer({ onBack }: { onBack: () => void }) {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<Card>
				<Card.Header>
					<Flex
						align="center"
						gap="sm"
					>
						<GiftIcon size={20} />
						<Badge variant="success">Oferta para ficar</Badge>
					</Flex>
					<Card.Title headingLevel={2}>
						50% de desconto na próxima renovação
					</Card.Title>
					<Card.Description>
						Continue no seu plano e pague menos em 26/09/2027. Depois, volta ao
						preço normal.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<DescriptionList
						dividers
						items={[
							{
								key: 'renewal',
								label: 'Próxima renovação',
								value: (
									<Flex
										align="center"
										gap="sm"
									>
										<MoneyText
											muted
											value={106800}
										/>
										<MoneyText
											value={53400}
											weight="semibold"
										/>
									</Flex>
								),
							},
							{
								key: 'savings',
								label: 'Economia',
								value: (
									<MoneyText
										size="inherit"
										value={53400}
									/>
								),
							},
							{
								key: 'plan',
								label: 'Plano e recursos',
								value: 'Os mesmos de hoje',
							},
						]}
						layout="inline"
					/>
				</Card.Content>
				<Card.Footer bordered>
					<Button>Aceitar oferta e manter o plano</Button>
				</Card.Footer>
			</Card>
			<Flex
				align="center"
				gap="sm"
				justify="between"
				wrap="wrap"
			>
				<Button
					leftSection={<ArrowLeftIcon size={16} />}
					onClick={onBack}
					variant="ghost"
				>
					Voltar
				</Button>
				<Button variant="destructive">Não, cancelar assinatura</Button>
			</Flex>
		</Flex>
	)
}

/**
 * The way out in two steps: the reason, then the offer to stay. Each variant
 * opens on its step; Continue and Back move between them like the real page.
 */
function Cancel({ step }: { step: 'reason' | 'offer' }) {
	const [current, setCurrent] = useState(step)

	return (
		<>
			<SubPageHeader
				description={
					current === 'offer'
						? 'Você disse que está caro para o momento.'
						: 'Uma pergunta antes: o que te fez decidir?'
				}
				title="Cancelar assinatura"
			/>
			<Page.Content>
				{current === 'offer' ? (
					<CancelOffer onBack={() => setCurrent('reason')} />
				) : (
					<CancelReason onContinue={() => setCurrent('offer')} />
				)}
			</Page.Content>
		</>
	)
}

function CanceledFinal() {
	return (
		<>
			<Page.Header
				description="Plano, pagamento e faturas da Padaria Estrela."
				icon={<ReceiptIcon />}
				title="Assinatura"
			/>
			<Page.Content>
				<Flex
					direction="col"
					gap="lg"
				>
					<EmptyState
						action={<Button>Assinar novamente</Button>}
						bordered="dashed"
						description="Seus dados continuam aqui. Assine de novo e continue de onde parou."
						headingLevel={2}
						icon={<ReceiptIcon size={32} />}
						title="Sua assinatura terminou em 26/09/2027"
					/>
					<Card>
						<Card.Header>
							<Card.Title headingLevel={2}>Faturas</Card.Title>
							<Card.Description>
								O histórico de faturas continua disponível.
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<InvoiceList invoices={INVOICES} />
						</Card.Content>
					</Card>
					<Box>
						<Button
							size="sm"
							variant="link-muted"
						>
							Excluir conta e dados agora
						</Button>
					</Box>
				</Flex>
			</Page.Content>
		</>
	)
}

export function BillingPortal({ variant }: { variant: BillingPortalVariant }) {
	let content: ReactNode

	switch (variant) {
		case 'overview-past-due':
			content = <Overview state="past-due" />
			break
		case 'update-method':
			content = <UpdateMethod />
			break
		case 'update-billing-info':
			content = <UpdateBillingInfo />
			break
		case 'invoices':
			content = <Invoices />
			break
		case 'cancel-reason':
			content = <Cancel step="reason" />
			break
		case 'cancel-retention-offer':
			content = <Cancel step="offer" />
			break
		case 'canceled-grace':
			content = <Overview state="grace" />
			break
		case 'canceled-final':
			content = <CanceledFinal />
			break
		default:
			content = <Overview state="active" />
	}

	return <PortalShell key={variant}>{content}</PortalShell>
}
