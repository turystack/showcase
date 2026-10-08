import {
	ArrowDownIcon,
	CircleAlertIcon,
	CircleUserRoundIcon,
	CreditCardIcon,
	LogInIcon,
	PlusIcon,
	QrCodeIcon,
	ReceiptIcon,
	TagIcon,
	UserPlusIcon,
} from '@turystack/react-icons'
import {
	Accordion,
	Alert,
	Badge,
	Button,
	Card,
	Checkbox,
	Collapsible,
	DateText,
	DescriptionList,
	DocumentInput,
	Flex,
	Form,
	Grid,
	Input,
	Layout,
	MaskInput,
	MoneyText,
	Radio,
	SegmentedControl,
	Select,
	Separator,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import { AcmeLogo } from '@/components/audiences/acme-logo'
import {
	BUYER,
	CheckoutBack,
	CheckoutFormat,
	CheckoutShell,
	COUPON,
	CUSTOMER,
	formatCents,
	IntervalCards,
	type IntervalId,
	intervalOf,
	OrderSummary,
	PlanFeatures,
	PlanHeadline,
	PRO_INTERVALS,
	RecurringNote,
	SectionTitle,
	SummaryLine,
	Totals,
	TrustFooter,
} from '@/components/audiences/checkout/checkout-shared'

/**
 * Checkout as one split page: the order on the left, the payment on the
 * right. It replaces the step-per-screen flow — plans, identification,
 * address, method and review are all slots of this page now.
 *
 * Checkout never signs anyone in: it is a client of `auth`, like the console.
 * The plan and the quote are public; paying needs a session, so a person who
 * has none sees the quote and a step that sends them to `auth`, and comes back
 * signed in.
 *
 * The variants come in three families. First purchase: that hand-off, then a
 * signed-in person buying a first plan, in every state the right column can be
 * in. Existing customer: changing what they pay for (proration, a scheduled
 * downgrade, a new interval) or buying again with what is on file. Mobile: the
 * same page in one column, with the summary folded into a bar.
 *
 * The interval and the method are live state seeded from the variant, so
 * switching them reprices the summary the way the real page does.
 */
export type CheckoutVariant =
	| 'sign-in-to-continue'
	| 'card'
	| 'pix-selected'
	| 'boleto-selected'
	| 'coupon-applied'
	| 'card-declined'
	| 'validation-errors'
	| 'upgrade-proration'
	| 'downgrade-scheduled'
	| 'interval-change'
	| 'saved-method'
	| 'new-method'
	| 'saved-billing'
	| 'mobile-summary-collapsed'
	| 'mobile-summary-expanded'

type Method = 'pix' | 'card' | 'boleto'

/* ------------------------------------------------------------------ */
/* Payment methods                                                      */
/* ------------------------------------------------------------------ */

function CardFields({
	errors,
	filled,
}: {
	errors?: boolean
	filled?: boolean
}) {
	return (
		<Flex
			direction="col"
			gap="md"
		>
			<Form.Field
				error={errors ? 'Número do cartão incompleto' : undefined}
				label="Número do cartão"
			>
				<MaskInput
					defaultValue={
						errors ? '4111 1111 11' : filled ? '4000 0000 0000 0002' : undefined
					}
					inputMode="numeric"
					mask="0000 0000 0000 0000"
					placeholder="1234 1234 1234 1234"
					rightSection={<CreditCardIcon size={16} />}
				/>
			</Form.Field>
			<Grid
				cols={2}
				gap="md"
			>
				<Form.Field label="Validade">
					<MaskInput
						defaultValue={filled || errors ? '08/28' : undefined}
						inputMode="numeric"
						mask="00/00"
						placeholder="MM/AA"
					/>
				</Form.Field>
				<Form.Field label="CVC">
					<MaskInput
						defaultValue={filled || errors ? '123' : undefined}
						inputMode="numeric"
						mask="0000"
						placeholder="123"
					/>
				</Form.Field>
			</Grid>
			<Form.Field label="Nome impresso no cartão">
				<Input
					defaultValue={filled || errors ? 'MARINA COSTA' : undefined}
					placeholder="Como está no cartão"
				/>
			</Form.Field>
			<Checkbox
				defaultChecked
				label="Salvar cartão para as renovações automáticas"
			/>
		</Flex>
	)
}

function PixFields({ amount, every }: { amount: number; every: string }) {
	return (
		<Flex
			direction="col"
			gap="md"
		>
			<Typography
				component="p"
				size="sm"
			>
				Você autoriza uma vez no app do seu banco. A primeira cobrança sai hoje
				e as próximas caem sozinhas, sem QR Code novo.
			</Typography>
			<DescriptionList
				items={[
					{
						label: 'Valor por cobrança',
						value: (
							<MoneyText
								size="inherit"
								value={amount}
							/>
						),
					},
					{
						label: 'Frequência',
						value: every,
					},
					{
						label: 'Validade',
						value: 'Até você cancelar',
					},
				]}
				layout="inline"
			/>
			<Typography
				component="p"
				size="xs"
				variant="muted"
			>
				A autorização usa o CPF ou CNPJ dos dados de cobrança e pode ser
				revogada no app do banco a qualquer momento.
			</Typography>
		</Flex>
	)
}

function BoletoFields() {
	return (
		<Typography
			component="p"
			size="sm"
		>
			O boleto vence em 3 dias. A assinatura é ativada até 1 dia útil depois do
			pagamento; nas renovações, o boleto chega por e-mail 10 dias antes do
			vencimento. Boleto exige endereço — preencha em Dados de cobrança.
		</Typography>
	)
}

export function PaymentMethods({
	amount,
	errors,
	every,
	filled,
	headingLevel,
	method,
	onChange,
}: {
	amount: number
	errors?: boolean
	every: string
	filled?: boolean
	/** The level of the methods' headings; 3 under a section's h2, 2 right under the page's h1. */
	headingLevel?: 2 | 3
	method: Method
	onChange: (method: Method) => void
}) {
	return (
		<Accordion
			bordered
			headingLevel={headingLevel}
			indicator="radio"
			onChange={(next) => {
				if (next) {
					onChange(next as Method)
				}
			}}
			type="single"
			value={method}
		>
			<Accordion.Item value="pix">
				<Accordion.Trigger
					description="Autorize no app do banco — cobrança automática"
					rightSection={<QrCodeIcon size={18} />}
				>
					Pix Automático
				</Accordion.Trigger>
				<Accordion.Content>
					<PixFields
						amount={amount}
						every={every}
					/>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="card">
				<Accordion.Trigger
					description="Crédito, renovação automática"
					rightSection={<CreditCardIcon size={18} />}
				>
					Cartão
				</Accordion.Trigger>
				<Accordion.Content>
					<CardFields
						errors={errors}
						filled={filled}
					/>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="boleto">
				<Accordion.Trigger
					description="Confirma até 1 dia útil após o pagamento"
					rightSection={<ReceiptIcon size={18} />}
				>
					Boleto
				</Accordion.Trigger>
				<Accordion.Content>
					<BoletoFields />
				</Accordion.Content>
			</Accordion.Item>
		</Accordion>
	)
}

/* ------------------------------------------------------------------ */
/* Billing details                                                      */
/* ------------------------------------------------------------------ */

const DOCUMENT_TYPES = [
	{
		label: 'Pessoa física',
		value: 'cpf',
	},
	{
		label: 'Pessoa jurídica',
		value: 'cnpj',
	},
]

function AddressFields({ filled }: { filled?: boolean }) {
	return (
		<Flex
			direction="col"
			gap="md"
		>
			<Grid
				cols={3}
				gap="md"
			>
				<Form.Field label="CEP">
					<MaskInput
						defaultValue={filled ? '01310-300' : undefined}
						inputMode="numeric"
						mask="00000-000"
						placeholder="00000-000"
					/>
				</Form.Field>
				<Grid.Item span={2}>
					<Form.Field label="Rua">
						<Input
							defaultValue={filled ? 'Rua Augusta' : undefined}
							placeholder="Preenchida pelo CEP"
						/>
					</Form.Field>
				</Grid.Item>
			</Grid>
			<Grid
				cols={3}
				gap="md"
			>
				<Form.Field label="Número">
					<Input defaultValue={filled ? '1500' : undefined} />
				</Form.Field>
				<Grid.Item span={2}>
					<Form.Field
						label={{
							content: 'Complemento',
							optional: true,
						}}
					>
						<Input defaultValue={filled ? 'Sala 4' : undefined} />
					</Form.Field>
				</Grid.Item>
			</Grid>
			<Grid
				cols={3}
				gap="md"
			>
				<Form.Field label="Bairro">
					<Input defaultValue={filled ? 'Consolação' : undefined} />
				</Form.Field>
				<Form.Field label="Cidade">
					<Input defaultValue={filled ? 'São Paulo' : undefined} />
				</Form.Field>
				<Form.Field label="UF">
					<Input
						defaultValue={filled ? 'SP' : undefined}
						maxLength={2}
					/>
				</Form.Field>
			</Grid>
		</Flex>
	)
}

export function BillingDetails({
	company,
	errors,
	filled,
	withAddress,
}: {
	/** Prefilled with the signed-in customer's company, CNPJ first. */
	company?: boolean
	errors?: boolean
	filled?: boolean
	withAddress: boolean
}) {
	const [documentType, setDocumentType] = useState(company ? 'cnpj' : 'cpf')

	return (
		<Flex
			direction="col"
			gap="md"
		>
			<SegmentedControl
				ariaLabel="Tipo de documento"
				block
				onChange={setDocumentType}
				optionLabel="label"
				options={DOCUMENT_TYPES}
				optionValue="value"
				size="sm"
				value={documentType}
			/>
			{documentType === 'cpf' ? (
				<Grid
					cols={2}
					gap="md"
				>
					<Form.Field label="Nome completo">
						<Input
							defaultValue={filled || errors ? 'Marina Costa' : undefined}
						/>
					</Form.Field>
					<Form.Field
						error={errors ? 'CPF inválido' : undefined}
						label="CPF"
					>
						<DocumentInput
							defaultValue={
								errors
									? {
											number: '123.456.789-00',
											type: 'cpf',
										}
									: filled
										? {
												number: '318.402.967-10',
												type: 'cpf',
											}
										: undefined
							}
							variant="cpf"
						/>
					</Form.Field>
				</Grid>
			) : (
				<Grid
					cols={2}
					gap="md"
				>
					<Form.Field label="Razão social">
						<Input defaultValue={company ? CUSTOMER.company : undefined} />
					</Form.Field>
					<Form.Field label="CNPJ">
						<DocumentInput
							defaultValue={
								company
									? {
											number: CUSTOMER.cnpj,
											type: 'cnpj',
										}
									: undefined
							}
							variant="cnpj"
						/>
					</Form.Field>
				</Grid>
			)}
			{withAddress && <AddressFields filled={company} />}
			<Typography
				component="p"
				size="xs"
				variant="muted"
			>
				Faturas e recibos saem com estes dados.
				{withAddress || company ? '' : ' Endereço só é pedido para boleto.'}
			</Typography>
		</Flex>
	)
}

/* ------------------------------------------------------------------ */
/* Shared right-column parts                                            */
/* ------------------------------------------------------------------ */

/**
 * The submit button. Its label mixes words and a MoneyText, and Button lays
 * its children out as flex items with a gap, so the label is one span — the
 * button's own size, colour and weight — to keep the sentence's spacing.
 */
function PayButton({ children }: { children: ReactNode }) {
	return (
		<Button
			block
			size="lg"
			type="submit"
		>
			<Typography
				component="span"
				size="inherit"
				variant="inherit"
				weight="inherit"
			>
				{children}
			</Typography>
		</Button>
	)
}

/** An amount inside a button label, in the label's own size and colour. */
function Price({ value }: { value: number }) {
	return (
		<MoneyText
			inheritColor
			size="inherit"
			value={value}
			weight="inherit"
		/>
	)
}

function payLabel(method: Method, amount: number): ReactNode {
	if (method === 'boleto') {
		return (
			<>
				Gerar boleto — <Price value={amount} />
			</>
		)
	}
	if (method === 'pix') {
		return (
			<>
				Assinar com Pix — <Price value={amount} />
			</>
		)
	}
	return (
		<>
			Assinar — <Price value={amount} />
		</>
	)
}

/* ------------------------------------------------------------------ */
/* Left column: the order                                               */
/* ------------------------------------------------------------------ */

function OrderColumn({
	couponApplied,
	interval,
	notice,
	onCoupon,
	onInterval,
	withCoupon = true,
}: {
	couponApplied: boolean
	interval: IntervalId
	notice?: ReactNode
	onCoupon: (applied: boolean) => void
	onInterval: (interval: IntervalId) => void
	withCoupon?: boolean
}) {
	const chosen = intervalOf(interval)

	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<CheckoutBack />
			{notice}
			<PlanHeadline
				interval={chosen}
				titleAs="h1"
			/>
			<IntervalCards
				onChange={onInterval}
				value={interval}
			/>
			<PlanFeatures />
			<Separator />
			<Totals
				coupon={couponApplied ? COUPON : null}
				interval={chosen}
				onApplyCoupon={withCoupon ? () => onCoupon(true) : undefined}
				onRemoveCoupon={withCoupon ? () => onCoupon(false) : undefined}
			/>
		</Flex>
	)
}

/* ------------------------------------------------------------------ */
/* Signed in: who is buying                                            */
/* ------------------------------------------------------------------ */

/** Who is buying, read from the session; "Trocar conta" goes back to `auth`. */
function SignedInIdentity({ email }: { email: string }) {
	return (
		<Flex
			align="center"
			gap="sm"
			justify="between"
		>
			<Flex
				align="center"
				gap="sm"
			>
				<CircleUserRoundIcon size={20} />
				<Typography
					component="span"
					size="sm"
					variant="muted"
				>
					Conectado como{' '}
					<Typography
						component="span"
						size="sm"
						weight="medium"
					>
						{email}
					</Typography>
				</Typography>
			</Flex>
			<Button
				size="sm"
				variant="link"
			>
				Trocar conta
			</Button>
		</Flex>
	)
}

/* ------------------------------------------------------------------ */
/* Not signed in: the public quote                                      */
/* ------------------------------------------------------------------ */

/** What comes after signing in, so the hand-off does not read as a dead end. */
const NEXT_STEPS = [
	{
		icon: <TagIcon size={16} />,
		label: 'Cupom, se tiver um',
	},
	{
		icon: <CreditCardIcon size={16} />,
		label: 'Forma de pagamento',
	},
	{
		icon: <ReceiptIcon size={16} />,
		label: 'Dados de cobrança',
	},
]

/**
 * A person with no session: the plan, the interval and the quote are theirs to
 * change, and the right column hands them to `auth` to sign in or create an
 * account. The coupon waits for the session, like everything the order writes.
 */
function SignInToContinue() {
	const [interval, setIntervalId] = useState<IntervalId>('annual')

	return (
		<CheckoutShell
			left={
				<OrderColumn
					couponApplied={false}
					interval={interval}
					onCoupon={() => undefined}
					onInterval={setIntervalId}
					withCoupon={false}
				/>
			}
			right={
				<Flex
					direction="col"
					gap="lg"
				>
					<Flex
						direction="col"
						gap="sm"
					>
						<SectionTitle title="Entrar para continuar" />
						<Typography
							component="p"
							size="sm"
							variant="muted"
						>
							Para pagar, entre na sua conta ou crie uma. Você volta direto para
							este pedido, com o plano e o intervalo que escolheu.
						</Typography>
					</Flex>
					<Flex
						direction="col"
						gap="sm"
					>
						<Button
							block
							leftSection={<LogInIcon size={16} />}
							size="lg"
						>
							Entrar para continuar
						</Button>
						<Button
							block
							leftSection={<UserPlusIcon size={16} />}
							variant="outline"
						>
							Criar conta
						</Button>
					</Flex>
					<Separator />
					<Flex
						direction="col"
						gap="sm"
					>
						<Typography
							component="p"
							size="sm"
							weight="medium"
						>
							Depois de entrar
						</Typography>
						{NEXT_STEPS.map((step) => (
							<Flex
								align="center"
								gap="sm"
								key={step.label}
							>
								{step.icon}
								<Typography
									component="span"
									size="sm"
									variant="muted"
								>
									{step.label}
								</Typography>
							</Flex>
						))}
						<Typography
							component="p"
							size="xs"
							variant="muted"
						>
							Nada é cobrado antes de você confirmar o pagamento.
						</Typography>
					</Flex>
					<TrustFooter />
				</Flex>
			}
		/>
	)
}

/* ------------------------------------------------------------------ */
/* First purchase                                                       */
/* ------------------------------------------------------------------ */

function initialMethod(variant: CheckoutVariant): Method {
	if (variant === 'pix-selected') {
		return 'pix'
	}
	if (variant === 'boleto-selected') {
		return 'boleto'
	}
	return 'card'
}

function FirstPurchaseCheckout({ variant }: { variant: CheckoutVariant }) {
	const [interval, setIntervalId] = useState<IntervalId>('annual')
	const [method, setMethod] = useState<Method>(initialMethod(variant))
	const [coupon, setCoupon] = useState(variant === 'coupon-applied')

	const chosen = intervalOf(interval)
	const discount = coupon
		? Math.round((chosen.total * COUPON.percent_off) / 100)
		: 0
	const today = chosen.total - discount
	const errors = variant === 'validation-errors'
	const declined = variant === 'card-declined'
	const filled = declined || variant === 'coupon-applied'

	return (
		<CheckoutShell
			left={
				<OrderColumn
					couponApplied={coupon}
					interval={interval}
					onCoupon={setCoupon}
					onInterval={setIntervalId}
				/>
			}
			right={
				<Form
					gap="lg"
					onSubmit={(event) => {
						event.preventDefault()
					}}
				>
					<SignedInIdentity email={BUYER.email} />
					<Separator />
					<Flex
						direction="col"
						gap="md"
					>
						<SectionTitle
							step={1}
							title="Forma de pagamento"
						/>
						<PaymentMethods
							amount={chosen.total}
							errors={errors}
							every={chosen.label}
							filled={filled}
							method={method}
							onChange={setMethod}
						/>
					</Flex>
					<Separator />
					<Flex
						direction="col"
						gap="md"
					>
						<SectionTitle
							step={2}
							title="Dados de cobrança"
						/>
						<BillingDetails
							errors={errors}
							filled={filled}
							withAddress={method === 'boleto'}
						/>
					</Flex>
					{declined && method === 'card' && (
						<Alert variant="destructive">
							<Alert.Icon>
								<CircleAlertIcon />
							</Alert.Icon>
							<Alert.Title>Cartão recusado</Alert.Title>
							<Alert.Description>
								O banco emissor recusou a cobrança de{' '}
								<MoneyText
									inheritColor
									size="inherit"
									value={today}
								/>
								. Nada foi cobrado. Confira os dados ou use outro método.
							</Alert.Description>
							<Alert.Action>
								<Button
									onClick={() => setMethod('pix')}
									size="sm"
									variant="outline"
								>
									Pagar com Pix
								</Button>
							</Alert.Action>
						</Alert>
					)}
					{errors && (
						<Alert variant="destructive">
							<Alert.Icon>
								<CircleAlertIcon />
							</Alert.Icon>
							<Alert.Title>Revise 2 campos</Alert.Title>
							<Alert.Description>
								O número do cartão e o CPF estão destacados acima.
							</Alert.Description>
						</Alert>
					)}
					<PayButton>{payLabel(method, today)}</PayButton>
					<TrustFooter />
				</Form>
			}
		/>
	)
}

/* ------------------------------------------------------------------ */
/* Existing customer                                                    */
/* ------------------------------------------------------------------ */

function SavedMethodLine() {
	return (
		<Card size="sm">
			<Card.Content>
				<Flex
					align="center"
					gap="md"
					justify="between"
				>
					<Flex
						align="center"
						gap="sm"
					>
						<CreditCardIcon size={18} />
						<Flex direction="col">
							<Typography
								component="span"
								size="sm"
								weight="medium"
							>
								Cartão •••• 4242
							</Typography>
							<Typography
								component="span"
								size="xs"
								variant="muted"
							>
								Vence 08/2028
							</Typography>
						</Flex>
					</Flex>
					<Badge
						size="sm"
						variant="secondary"
					>
						Padrão
					</Badge>
				</Flex>
			</Card.Content>
		</Card>
	)
}

function SavedMethods() {
	const [method, setMethod] = useState('card')

	return (
		<Flex
			direction="col"
			gap="sm"
		>
			<Radio.Group
				ariaLabel="Forma de pagamento salva"
				card
				items={[
					{
						badge: (
							<Badge
								size="sm"
								variant="secondary"
							>
								Padrão
							</Badge>
						),
						description: 'Vence 08/2028',
						label: 'Cartão •••• 4242',
						rightSection: <CreditCardIcon size={18} />,
						value: 'card',
					},
					{
						description: (
							<>
								Seu banco · autorizado até{' '}
								<MoneyText
									inheritColor
									size="inherit"
									value={120000}
								/>{' '}
								por ano
							</>
						),
						label: 'Pix Automático',
						rightSection: <QrCodeIcon size={18} />,
						value: 'pix',
					},
				]}
				onChange={setMethod}
				value={method}
			/>
			<Button
				block
				leftSection={<PlusIcon size={16} />}
				variant="dashed"
			>
				Usar outro método
			</Button>
		</Flex>
	)
}

function SavedBillingFull() {
	return (
		<Card size="sm">
			<Card.Content>
				<DescriptionList
					dividers
					items={[
						{
							label: 'Razão social',
							value: CUSTOMER.company,
						},
						{
							label: 'CNPJ',
							value: CUSTOMER.cnpj,
						},
						{
							label: 'E-mail de cobrança',
							value: 'financeiro@padariaestrela.example',
						},
						{
							label: 'Endereço',
							value: 'Rua Augusta, 1500, sala 4 · Consolação · São Paulo — SP',
						},
					]}
					layout="inline"
				/>
			</Card.Content>
		</Card>
	)
}

type SignedInScenario = {
	left: 'upgrade' | 'downgrade' | 'interval' | 'purchase'
	payment: 'compact' | 'list' | 'new' | 'nothing-today'
	billing: 'compact' | 'full'
}

const SIGNED_IN_SCENARIOS: Record<string, SignedInScenario> = {
	'downgrade-scheduled': {
		billing: 'compact',
		left: 'downgrade',
		payment: 'nothing-today',
	},
	'interval-change': {
		billing: 'compact',
		left: 'interval',
		payment: 'compact',
	},
	'new-method': {
		billing: 'compact',
		left: 'purchase',
		payment: 'new',
	},
	'saved-billing': {
		billing: 'full',
		left: 'purchase',
		payment: 'compact',
	},
	'saved-method': {
		billing: 'compact',
		left: 'purchase',
		payment: 'list',
	},
	'upgrade-proration': {
		billing: 'compact',
		left: 'upgrade',
		payment: 'compact',
	},
}

/** A plan in the "Plano atual → Novo plano" pair. */
function PlanRow({
	badge,
	detail,
	name,
	price,
	selected,
}: {
	badge: ReactNode
	detail: string
	name: string
	price: number
	/** The plan the customer is moving to. */
	selected?: boolean
}) {
	return (
		<Card
			selected={selected}
			size="sm"
		>
			<Card.Content>
				<Flex
					align="center"
					gap="md"
					justify="between"
				>
					<Flex direction="col">
						<Flex
							align="center"
							gap="sm"
						>
							<Typography
								component="span"
								weight="semibold"
							>
								{name}
							</Typography>
							{badge}
						</Flex>
						<Typography
							component="span"
							size="xs"
							variant="muted"
						>
							{detail}
						</Typography>
					</Flex>
					<Typography
						component="span"
						noWrap
						size="sm"
						weight="medium"
					>
						<MoneyText
							inheritColor
							size="inherit"
							value={price}
							weight="inherit"
						/>
						/mês
					</Typography>
				</Flex>
			</Card.Content>
		</Card>
	)
}

function PlanChange({ from, to }: { from: ReactNode; to: ReactNode }) {
	return (
		<Flex
			direction="col"
			gap="xs"
		>
			{from}
			<Flex justify="center">
				<ArrowDownIcon size={16} />
			</Flex>
			{to}
		</Flex>
	)
}

const CURRENT = (
	<Badge
		size="sm"
		variant="outline"
	>
		Atual
	</Badge>
)

/** Period end of the signed-in customer: 14 of 30 days left. */
const PERIOD_END = '2026-10-10T12:00:00-03:00'

function UpgradeColumn() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<CheckoutBack />
			<Typography
				component="h1"
				size="2xl"
				weight="bold"
			>
				Mudar de plano
			</Typography>
			<PlanChange
				from={
					<PlanRow
						badge={CURRENT}
						detail="Mensal · até 3 usuários"
						name="Starter"
						price={4900}
					/>
				}
				to={
					<PlanRow
						badge={
							<Badge
								size="sm"
								variant="success"
							>
								Upgrade
							</Badge>
						}
						detail="Mensal · até 10 usuários"
						name="Pro"
						price={9900}
						selected
					/>
				}
			/>
			<PlanFeatures />
			<Separator />
			<OrderSummary
				lines={[
					{
						amount: -2287,
						description: 'Crédito do Starter (14 dias não usados)',
						key: 'credit',
					},
					{
						amount: 4620,
						description: 'Pro de hoje até 10/10 (14 dias)',
						key: 'charge',
					},
				]}
				renewal={{
					amount: 9900,
					date: PERIOD_END,
					every: 'a cada mês',
				}}
				total={2333}
				totalLabel="Cobrado hoje"
			/>
		</Flex>
	)
}

function DowngradeColumn() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<CheckoutBack />
			<Typography
				component="h1"
				size="2xl"
				weight="bold"
			>
				Mudar de plano
			</Typography>
			<PlanChange
				from={
					<PlanRow
						badge={CURRENT}
						detail="Mensal · até 10 usuários"
						name="Pro"
						price={9900}
					/>
				}
				to={
					<PlanRow
						badge={
							<Badge
								size="sm"
								variant="warning"
							>
								Downgrade
							</Badge>
						}
						detail="Mensal · até 3 usuários"
						name="Starter"
						price={4900}
						selected
					/>
				}
			/>
			<Alert variant="warning">
				<Alert.Icon>
					<CircleAlertIcon />
				</Alert.Icon>
				<Alert.Title>
					O que muda em{' '}
					<DateText
						inheritColor
						size="inherit"
						value={PERIOD_END}
					/>
				</Alert.Title>
				<Alert.Description>
					O limite cai para 3 usuários — hoje há 5 ativos, e você escolhe quem
					fica. Relatórios avançados e a integração com ERP deixam de funcionar.
				</Alert.Description>
			</Alert>
			<Separator />
			<Flex
				direction="col"
				gap="sm"
			>
				<SummaryLine
					amount={
						<DateText
							size="sm"
							value={PERIOD_END}
						/>
					}
				>
					Pro continua ativo até
				</SummaryLine>
				<Separator spacing="sm" />
				<SummaryLine
					amount={0}
					strong
				>
					Cobrado hoje
				</SummaryLine>
				<RecurringNote
					amount={4900}
					date={PERIOD_END}
					every="a cada mês"
				/>
			</Flex>
		</Flex>
	)
}

/** Unused days of the current Pro month, credited on an interval change. */
const MONTHLY_CREDIT = 4620

function IntervalColumn({
	interval,
	onInterval,
}: {
	interval: IntervalId
	onInterval: (interval: IntervalId) => void
}) {
	const chosen = intervalOf(interval)
	const same = interval === 'monthly'
	const today = same ? 0 : chosen.total - MONTHLY_CREDIT

	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<CheckoutBack />
			<Flex
				direction="col"
				gap="xs"
			>
				<Typography
					component="h1"
					size="2xl"
					weight="bold"
				>
					Mudar intervalo do Pro
				</Typography>
				<Typography
					component="p"
					size="sm"
					variant="muted"
				>
					Mesmo plano, cobrado com menos frequência e mais barato por mês.
				</Typography>
			</Flex>
			<IntervalCards
				current="monthly"
				onChange={onInterval}
				value={interval}
			/>
			<Separator />
			{same ? (
				<Typography
					component="p"
					size="sm"
					variant="muted"
				>
					Você já paga mensalmente. Escolha outro intervalo para ver a
					diferença.
				</Typography>
			) : (
				<OrderSummary
					lines={[
						{
							amount: -MONTHLY_CREDIT,
							description: 'Crédito do mês atual (14 dias não usados)',
							key: 'credit',
						},
						{
							amount: chosen.total,
							description: `Pro ${chosen.label.toLowerCase()} a partir de hoje`,
							key: 'charge',
						},
					]}
					renewal={{
						amount: chosen.total,
						date: chosen.nextCharge,
						every: chosen.every,
					}}
					taxIncluded={false}
					total={today}
					totalLabel="Cobrado hoje"
				/>
			)}
		</Flex>
	)
}

function SignedInCheckout({ variant }: { variant: CheckoutVariant }) {
	const scenario =
		SIGNED_IN_SCENARIOS[variant] ?? SIGNED_IN_SCENARIOS['upgrade-proration']
	const [interval, setIntervalId] = useState<IntervalId>('annual')
	const [method, setMethod] = useState<Method>('card')

	const chosen = intervalOf(interval)

	let left: ReactNode
	let button: ReactNode

	if (scenario.left === 'upgrade') {
		left = <UpgradeColumn />
		button = (
			<>
				Confirmar upgrade — <Price value={2333} /> hoje
			</>
		)
	} else if (scenario.left === 'downgrade') {
		left = <DowngradeColumn />
		button = 'Agendar downgrade'
	} else if (scenario.left === 'interval') {
		left = (
			<IntervalColumn
				interval={interval}
				onInterval={setIntervalId}
			/>
		)
		button =
			interval === 'monthly' ? (
				'Nada a mudar'
			) : (
				<>
					Mudar para {chosen.label.toLowerCase()} —{' '}
					<Price value={chosen.total - MONTHLY_CREDIT} /> hoje
				</>
			)
	} else {
		left = (
			<OrderColumn
				couponApplied={false}
				interval={interval}
				notice={
					<Alert variant="info">
						<Alert.Title>Seu teste gratuito terminou em 20/09</Alert.Title>
						<Alert.Description>
							Seus dados continuam aqui. Assine para voltar a usar o Acme.
						</Alert.Description>
					</Alert>
				}
				onCoupon={() => undefined}
				onInterval={setIntervalId}
				withCoupon={false}
			/>
		)
		button = (
			<>
				Assinar — <Price value={chosen.total} />
			</>
		)
	}

	return (
		<CheckoutShell
			left={left}
			right={
				<Form
					gap="lg"
					onSubmit={(event) => {
						event.preventDefault()
					}}
				>
					<SignedInIdentity email={CUSTOMER.email} />
					<Separator />
					<Flex
						direction="col"
						gap="md"
					>
						<SectionTitle
							action={
								scenario.payment === 'new' ? (
									<Button
										size="sm"
										variant="link"
									>
										Usar método salvo
									</Button>
								) : scenario.payment === 'list' ? undefined : (
									<Button
										size="sm"
										variant="link"
									>
										Trocar
									</Button>
								)
							}
							title="Forma de pagamento"
						/>
						{scenario.payment === 'compact' && <SavedMethodLine />}
						{scenario.payment === 'list' && <SavedMethods />}
						{scenario.payment === 'new' && (
							<Flex
								direction="col"
								gap="md"
							>
								<PaymentMethods
									amount={chosen.total}
									every={chosen.label}
									method={method}
									onChange={setMethod}
								/>
								<Checkbox
									defaultChecked
									label="Tornar este o método padrão da conta"
								/>
							</Flex>
						)}
						{scenario.payment === 'nothing-today' && (
							<Flex
								direction="col"
								gap="sm"
							>
								<Typography
									component="p"
									size="sm"
								>
									Nada a pagar hoje. A partir de{' '}
									<DateText
										inheritColor
										size="inherit"
										value={PERIOD_END}
									/>
									, o Starter será cobrado no método abaixo.
								</Typography>
								<SavedMethodLine />
							</Flex>
						)}
					</Flex>
					<Separator />
					<Flex
						direction="col"
						gap="md"
					>
						<SectionTitle
							action={
								<Button
									size="sm"
									variant="link"
								>
									Editar
								</Button>
							}
							title="Dados de cobrança"
						/>
						{scenario.billing === 'full' ? (
							<>
								<SavedBillingFull />
								<Typography
									component="p"
									size="xs"
									variant="muted"
								>
									Faturas e recibos saem com estes dados. Editar aqui atualiza a
									conta inteira, não só este pedido.
								</Typography>
							</>
						) : (
							<Typography
								component="p"
								size="sm"
								variant="muted"
							>
								{CUSTOMER.company} · CNPJ {CUSTOMER.cnpj}
							</Typography>
						)}
					</Flex>
					{scenario.left === 'downgrade' ? (
						<Flex
							direction="col"
							gap="sm"
						>
							<Button
								block
								size="lg"
								type="submit"
							>
								{button}
							</Button>
							<Button
								block
								variant="ghost"
							>
								Manter o Pro
							</Button>
						</Flex>
					) : (
						<PayButton>{button}</PayButton>
					)}
					<TrustFooter />
				</Form>
			}
		/>
	)
}

/* ------------------------------------------------------------------ */
/* Mobile                                                               */
/* ------------------------------------------------------------------ */

/**
 * The page on a phone: one column, and the whole order folded into a bar
 * that always shows the total and the interval.
 *
 * The stage cannot shrink a viewport, and Layout stacks its panes by viewport
 * width, not by container width — so the phone is drawn as a 384px column
 * holding the composition a small screen gets, rather than the same page
 * reflowing.
 */
function MobileCheckout({ expanded }: { expanded: boolean }) {
	const [interval, setIntervalId] = useState<IntervalId>('annual')
	const [method, setMethod] = useState<Method>('pix')
	const chosen = intervalOf(interval)

	return (
		<CheckoutFormat>
			<Layout height="fill">
				<Layout.Main>
					<Layout.Content
						bg="muted"
						maxWidth="xs"
						padding="md"
					>
						<Flex
							direction="col"
							gap="md"
						>
							<Flex
								align="center"
								justify="between"
							>
								<AcmeLogo />
								<Typography
									component="h1"
									size="sm"
									variant="muted"
								>
									Assinar Acme Pro
								</Typography>
							</Flex>
							<Card>
								<Card.Header bordered>
									<Collapsible defaultOpen={expanded}>
										<Collapsible.Trigger
											description={`Pro · ${chosen.every}`}
											indicator
											rightSection={
												<MoneyText
													value={chosen.total}
													weight="semibold"
												/>
											}
										>
											Resumo do pedido
										</Collapsible.Trigger>
										<Collapsible.Panel>
											<Flex
												direction="col"
												gap="md"
											>
												<Separator spacing="sm" />
												<Select
													ariaLabel="Intervalo de cobrança"
													/* An interval is always chosen: nothing to clear. */
													clearable={false}
													mode="single"
													onChange={(value) => {
														if (value) {
															setIntervalId(value as IntervalId)
														}
													}}
													optionLabel={(option) =>
														option.saving > 0
															? `${option.label} · ${formatCents(option.perMonth)}/mês · −${option.saving}%`
															: `${option.label} · ${formatCents(option.perMonth)}/mês`
													}
													options={PRO_INTERVALS}
													optionValue="id"
													value={interval}
												/>
												<Totals interval={chosen} />
											</Flex>
										</Collapsible.Panel>
									</Collapsible>
								</Card.Header>
								<Card.Content>
									<Flex
										direction="col"
										gap="lg"
									>
										<SignedInIdentity email={BUYER.email} />
										<Flex
											direction="col"
											gap="md"
										>
											<SectionTitle
												step={1}
												title="Forma de pagamento"
											/>
											<PaymentMethods
												amount={chosen.total}
												every={chosen.label}
												method={method}
												onChange={setMethod}
											/>
										</Flex>
										<Flex
											direction="col"
											gap="md"
										>
											<SectionTitle
												step={2}
												title="Dados de cobrança"
											/>
											<Form.Field label="CPF ou CNPJ">
												<DocumentInput variant="any" />
											</Form.Field>
										</Flex>
										<PayButton>{payLabel(method, chosen.total)}</PayButton>
										<TrustFooter />
									</Flex>
								</Card.Content>
							</Card>
						</Flex>
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</CheckoutFormat>
	)
}

/**
 * Each variant mounts under its own key, so the live interval, method and
 * coupon start from that variant's state instead of carrying the last one's.
 */
export function Checkout({ variant }: { variant: CheckoutVariant }) {
	if (variant === 'mobile-summary-collapsed') {
		return (
			<MobileCheckout
				expanded={false}
				key={variant}
			/>
		)
	}
	if (variant === 'mobile-summary-expanded') {
		return (
			<MobileCheckout
				expanded
				key={variant}
			/>
		)
	}
	if (variant === 'sign-in-to-continue') {
		return <SignInToContinue key={variant} />
	}
	if (variant in SIGNED_IN_SCENARIOS) {
		return (
			<SignedInCheckout
				key={variant}
				variant={variant}
			/>
		)
	}
	return (
		<FirstPurchaseCheckout
			key={variant}
			variant={variant}
		/>
	)
}
