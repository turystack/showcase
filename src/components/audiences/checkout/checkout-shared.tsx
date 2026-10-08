import { uiLabelsPtBr } from '@turystack/react-i18n'
import {
	ArrowLeftIcon,
	CheckIcon,
	ChevronDownIcon,
	LockIcon,
	TagIcon,
} from '@turystack/react-icons'
import {
	Badge,
	Box,
	Button,
	Collapsible,
	DateText,
	Flex,
	Form,
	FormatProvider,
	Input,
	LabelsProvider,
	Layout,
	MoneyText,
	Radio,
	Separator,
	Tag,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import { AcmeLogo } from '@/components/audiences/acme-logo'

/**
 * The pieces every checkout screen shares: the price table, the split shell,
 * the order summary and the trust footer.
 *
 * Amounts are integer cents, the unit MoneyText reads, and every screen is
 * wrapped in a Brazilian FormatProvider so R$ reads as R$ 1.068,00 whatever the
 * reader's browser locale is.
 */

export type IntervalId = 'monthly' | 'quarterly' | 'semiannual' | 'annual'

export type Interval = {
	id: IntervalId
	label: string
	/** "cobrados anualmente" — how the total is billed. */
	billed: string
	/** "a cada ano" — the recurrence, for "Depois, R$ X a cada …". */
	every: string
	/** Monthly-equivalent price, in cents. */
	perMonth: number
	/** What each charge is, in cents. */
	total: number
	/** Saving against paying monthly, in whole percent. */
	saving: number
	/** When the second charge lands, for a subscription starting today. */
	nextCharge: string
}

/** Acme Pro, the plan every checkout screen sells. */
export const PRO_INTERVALS: Interval[] = [
	{
		billed: 'cobrados mensalmente',
		every: 'a cada mês',
		id: 'monthly',
		label: 'Mensal',
		nextCharge: '2026-10-26T12:00:00-03:00',
		perMonth: 9900,
		saving: 0,
		total: 9900,
	},
	{
		billed: 'cobrados a cada 3 meses',
		every: 'a cada 3 meses',
		id: 'quarterly',
		label: 'Trimestral',
		nextCharge: '2026-12-26T12:00:00-03:00',
		perMonth: 9400,
		saving: 5,
		total: 28200,
	},
	{
		billed: 'cobrados a cada 6 meses',
		every: 'a cada 6 meses',
		id: 'semiannual',
		label: 'Semestral',
		nextCharge: '2027-03-26T12:00:00-03:00',
		perMonth: 9200,
		saving: 7,
		total: 55200,
	},
	{
		billed: 'cobrados anualmente',
		every: 'a cada ano',
		id: 'annual',
		label: 'Anual',
		nextCharge: '2027-09-26T12:00:00-03:00',
		perMonth: 8900,
		saving: 10,
		total: 106800,
	},
]

export function intervalOf(id: IntervalId): Interval {
	return PRO_INTERVALS.find((item) => item.id === id) ?? PRO_INTERVALS[3]
}

export const PRO_FEATURES = [
	'Até 10 usuários',
	'Relatórios avançados',
	'Integração com ERP e planilhas',
	'Suporte prioritário por chat',
]

/**
 * The person buying a first plan. Signed in at `auth` before paying, so the
 * page reads who is buying from the session, never from a field.
 */
export const BUYER = {
	email: 'marina@example.com',
	name: 'Marina Costa',
}

/** The customer changing a plan they already pay for. */
export const CUSTOMER = {
	cnpj: '98.765.432/0001-10',
	company: 'Padaria Estrela Ltda',
	email: 'ana@padariaestrela.example',
	name: 'Ana Souza',
}

/**
 * Brazilian formatting for every amount and date below it, and the library's
 * own words ("(opcional)", "Copiar") in Portuguese to match the copy.
 */
export function CheckoutFormat({ children }: { children: ReactNode }) {
	return (
		<FormatProvider
			format={{
				currency: 'brl',
				locale: 'pt-BR',
				timeZone: 'America/Sao_Paulo',
			}}
		>
			<LabelsProvider labels={uiLabelsPtBr}>{children}</LabelsProvider>
		</FormatProvider>
	)
}

/**
 * The split page: the order on the left, on a muted pane, and the payment on
 * the right. Each half is a `Layout.Content`, so each scrolls on its own and
 * they stack into one column on a narrow screen.
 */
export function CheckoutShell({
	left,
	right,
}: {
	left: ReactNode
	right: ReactNode
}) {
	return (
		<CheckoutFormat>
			<Layout height="fill">
				<Layout.Main>
					<Layout.Content
						bg="muted"
						maxWidth="sm"
						padding="lg"
					>
						{left}
					</Layout.Content>
					<Layout.Content
						maxWidth="sm"
						padding="lg"
					>
						{right}
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</CheckoutFormat>
	)
}

/** Where the person came from, and the product they are paying. */
export function CheckoutBack() {
	return (
		<Flex
			align="center"
			justify="between"
		>
			<AcmeLogo />
			<Button
				leftSection={<ArrowLeftIcon size={16} />}
				size="sm"
				variant="link-muted"
			>
				Voltar para Acme
			</Button>
		</Flex>
	)
}

/** A numbered heading for one block of the payment column. */
export function SectionTitle({
	action,
	step,
	title,
}: {
	action?: ReactNode
	step?: number
	title: string
}) {
	return (
		<Flex
			align="center"
			justify="between"
		>
			<Flex
				align="center"
				gap="sm"
			>
				{step !== undefined && (
					<Badge
						size="sm"
						variant="secondary"
					>
						{step}
					</Badge>
				)}
				<Typography
					component="h2"
					size="base"
					weight="semibold"
				>
					{title}
				</Typography>
			</Flex>
			{action}
		</Flex>
	)
}

/** One row of the totals: a label against an amount. */
export function SummaryLine({
	amount,
	children,
	strong,
	colored,
}: {
	amount: ReactNode
	children: ReactNode
	strong?: boolean
	colored?: boolean
}) {
	return (
		<Flex
			align="center"
			gap="md"
			justify="between"
		>
			<Typography
				component="span"
				size={strong ? 'base' : 'sm'}
				variant={strong || colored ? 'default' : 'muted'}
				weight={strong ? 'semibold' : 'normal'}
			>
				{children}
			</Typography>
			{typeof amount === 'number' ? (
				<MoneyText
					colored={colored}
					size={strong ? 'base' : 'sm'}
					value={amount}
					weight={strong ? 'semibold' : 'normal'}
				/>
			) : (
				amount
			)}
		</Flex>
	)
}

/** "Depois, R$ 1.068,00 a cada ano a partir de 26/09/2027." */
export function RecurringNote({
	amount,
	date,
	every,
}: {
	amount: number
	date: string
	every: string
}) {
	return (
		<Typography
			component="p"
			size="xs"
			variant="muted"
		>
			Depois,{' '}
			<MoneyText
				inheritColor
				size="inherit"
				value={amount}
			/>{' '}
			{every} a partir de{' '}
			<DateText
				inheritColor
				size="inherit"
				value={date}
			/>
			. Cancele quando quiser.
		</Typography>
	)
}

/** The plan's headline price: the monthly equivalent, and what is billed. */
export function PlanHeadline({
	interval,
	titleAs = 'p',
}: {
	interval: Interval
	/**
	 * `h1` where the headline is the page's title (the checkout), `p` where the
	 * page already has one (the pending screens).
	 */
	titleAs?: 'h1' | 'p'
}) {
	return (
		<Flex
			direction="col"
			gap="xs"
		>
			<Typography
				component={titleAs}
				size="sm"
				variant="muted"
			>
				Assinar Acme Pro
			</Typography>
			<Flex
				align="baseline"
				gap="xs"
			>
				<MoneyText
					size="4xl"
					value={interval.perMonth}
					weight="bold"
				/>
				<Typography
					component="span"
					size="sm"
					variant="muted"
				>
					/mês
				</Typography>
			</Flex>
			<Typography
				component="p"
				size="sm"
				variant="muted"
			>
				<MoneyText
					inheritColor
					size="inherit"
					value={interval.total}
				/>{' '}
				{interval.billed}
			</Typography>
		</Flex>
	)
}

/**
 * The billing interval as radio cards: more than two options, each with its
 * monthly-equivalent price and what it saves against paying monthly. The whole
 * card is the radio, the group keeps one tab stop and the arrow keys move the
 * choice; the price and the badge are read as the card's description.
 */
export function IntervalCards({
	current,
	onChange,
	value,
}: {
	current?: IntervalId
	onChange: (value: IntervalId) => void
	value: IntervalId
}) {
	return (
		<Form.FieldSet legend="Intervalo de cobrança">
			<Radio.Group
				card
				items={PRO_INTERVALS.map((interval) => ({
					badge:
						current === interval.id ? (
							<Badge
								size="sm"
								variant="outline"
							>
								Atual
							</Badge>
						) : interval.saving > 0 ? (
							<Badge
								size="sm"
								variant="success"
							>
								Economize {interval.saving}%
							</Badge>
						) : undefined,
					description:
						interval.id === 'monthly' ? (
							'Sem fidelidade'
						) : (
							<>
								<MoneyText
									inheritColor
									size="inherit"
									value={interval.total}
								/>{' '}
								{interval.billed}
							</>
						),
					label: interval.label,
					rightSection: (
						<Typography
							component="span"
							noWrap
							size="sm"
							weight="medium"
						>
							<MoneyText
								inheritColor
								size="inherit"
								value={interval.perMonth}
								weight="inherit"
							/>
							/mês
						</Typography>
					),
					value: interval.id,
				}))}
				onChange={(next) => onChange(next as IntervalId)}
				value={value}
			/>
		</Form.FieldSet>
	)
}

/** What the plan includes, as a short checked list. */
export function PlanFeatures({
	features = PRO_FEATURES,
}: {
	features?: string[]
}) {
	return (
		<Flex
			direction="col"
			gap="xs"
		>
			{features.map((feature) => (
				<Flex
					align="center"
					gap="sm"
					key={feature}
				>
					<CheckIcon size={16} />
					<Typography
						component="span"
						size="sm"
					>
						{feature}
					</Typography>
				</Flex>
			))}
			<Box>
				<Button
					size="sm"
					variant="link"
				>
					Ver tudo o que o Pro inclui
				</Button>
			</Box>
		</Flex>
	)
}

/** A coupon as the catalogue returns it: a percent off the first charge. */
export type Coupon = {
	code: string
	name: string
	percent_off: number
}

/** The coupon the checkout offers. */
export const COUPON: Coupon = {
	code: 'BEMVINDO20',
	name: '20% na primeira cobrança',
	percent_off: 20,
}

/** A line of the order that is not the plan: a proration credit or charge. */
export type OrderLine = {
	key: string
	description: string
	/** Cents; negative for a credit, painted by sign. */
	amount: number
}

/**
 * "Adicionar cupom", folded: a link that opens a code field and Apply. Enter
 * applies too, and the code is sent upper-cased.
 */
function CouponField({ onApply }: { onApply: (code: string) => void }) {
	const [code, setCode] = useState('')
	const apply = () => {
		const typed = code.trim().toUpperCase()

		if (typed) {
			onApply(typed)
		}
	}

	return (
		<Collapsible>
			<Flex
				direction="col"
				gap="sm"
			>
				<Collapsible.Trigger asChild>
					<Button
						leftSection={<TagIcon size={14} />}
						rightSection={<ChevronDownIcon size={16} />}
						size="sm"
						variant="link"
					>
						Adicionar cupom
					</Button>
				</Collapsible.Trigger>
				<Collapsible.Panel>
					<Flex gap="sm">
						<Box grow>
							<Input
								ariaLabel="Código do cupom"
								autoComplete="off"
								onChange={(value) => setCode(value ?? '')}
								onKeyDown={(event) => {
									if (event.key === 'Enter') {
										event.preventDefault()
										apply()
									}
								}}
								placeholder="Código do cupom"
								value={code}
							/>
						</Box>
						<Button
							disabled={!code.trim()}
							onClick={apply}
							variant="outline"
						>
							Aplicar
						</Button>
					</Flex>
				</Collapsible.Panel>
			</Flex>
		</Collapsible>
	)
}

/** The applied coupon as a removable tag, beside what it does. */
function AppliedCoupon({
	coupon,
	onRemove,
}: {
	coupon: Coupon
	onRemove?: () => void
}) {
	return (
		<Flex
			align="center"
			gap="sm"
			wrap="wrap"
		>
			<Tag
				icon={<TagIcon size={12} />}
				onRemove={onRemove}
				variant="success"
			>
				{coupon.code}
			</Tag>
			<Typography
				component="span"
				size="sm"
				variant="muted"
			>
				{`${coupon.percent_off}% de desconto na primeira cobrança`}
			</Typography>
		</Flex>
	)
}

/**
 * The order's totals, composed from lines: what is bought (or the proration
 * lines that replace it), the subtotal, the coupon's discount, taxes, the
 * total and the renewal note. Nothing here adds anything up — every figure is
 * the quote the checkout session froze.
 */
export function OrderSummary({
	coupon,
	discount = 0,
	lines,
	onApplyCoupon,
	onRemoveCoupon,
	renewal,
	subtotal,
	taxIncluded = true,
	total,
	totalLabel = 'Total hoje',
}: {
	coupon?: Coupon | null
	discount?: number
	lines: OrderLine[]
	onApplyCoupon?: (code: string) => void
	onRemoveCoupon?: () => void
	renewal?: {
		amount: number
		date: string
		every: string
	}
	/** Shown when set; a lone proration has none. */
	subtotal?: number
	taxIncluded?: boolean
	total: number
	totalLabel?: string
}) {
	return (
		<Flex
			block
			direction="col"
			gap="md"
		>
			{coupon ? (
				<AppliedCoupon
					coupon={coupon}
					onRemove={onRemoveCoupon}
				/>
			) : onApplyCoupon ? (
				<CouponField onApply={onApplyCoupon} />
			) : null}
			<Flex
				direction="col"
				gap="sm"
			>
				{lines.map((line) => (
					<SummaryLine
						amount={line.amount}
						colored={line.amount < 0}
						key={line.key}
					>
						{line.description}
					</SummaryLine>
				))}
				{subtotal !== undefined && (
					<SummaryLine amount={subtotal}>Subtotal</SummaryLine>
				)}
				{coupon && discount !== 0 && (
					<SummaryLine
						amount={-Math.abs(discount)}
						colored
					>
						Cupom {coupon.code} (−{coupon.percent_off}%)
					</SummaryLine>
				)}
				{taxIncluded && (
					<SummaryLine
						amount={
							<Typography
								component="span"
								size="sm"
								variant="muted"
							>
								Incluso no preço
							</Typography>
						}
					>
						Impostos
					</SummaryLine>
				)}
				<Separator spacing="sm" />
				<SummaryLine
					amount={total}
					strong
				>
					{totalLabel}
				</SummaryLine>
				{renewal && (
					<RecurringNote
						amount={renewal.amount}
						date={renewal.date}
						every={renewal.every}
					/>
				)}
			</Flex>
		</Flex>
	)
}

/**
 * A first purchase of Acme Pro: the plan line on the chosen interval, the
 * coupon's discount when one is applied, and the renewal at full price.
 */
export function Totals({
	coupon,
	interval,
	onApplyCoupon,
	onRemoveCoupon,
}: {
	coupon?: Coupon | null
	interval: Interval
	onApplyCoupon?: (code: string) => void
	onRemoveCoupon?: () => void
}) {
	const discount = coupon
		? Math.round((interval.total * coupon.percent_off) / 100)
		: 0

	return (
		<OrderSummary
			coupon={coupon}
			discount={discount}
			lines={[
				{
					amount: interval.total,
					description: `Acme Pro · ${interval.label}`,
					key: 'plan',
				},
			]}
			onApplyCoupon={onApplyCoupon}
			onRemoveCoupon={onRemoveCoupon}
			renewal={{
				amount: interval.total,
				date: interval.nextCharge,
				every: interval.every,
			}}
			subtotal={interval.total}
			total={interval.total - discount}
		/>
	)
}

/** The lock line under the pay button. */
export function TrustFooter() {
	return (
		<Flex
			align="center"
			direction="col"
			gap="xs"
		>
			<Flex
				align="center"
				gap="xs"
			>
				<LockIcon size={14} />
				<Typography
					component="span"
					size="xs"
					variant="muted"
				>
					Pagamento seguro processado por Acme Pay · PCI DSS
				</Typography>
			</Flex>
			<Flex
				align="center"
				gap="sm"
			>
				<Button
					size="sm"
					variant="link-muted"
				>
					Privacidade
				</Button>
				<Button
					size="sm"
					variant="link-muted"
				>
					Ajuda
				</Button>
			</Flex>
		</Flex>
	)
}

/**
 * An amount inside a plain string — a Checkbox label and a Select option
 * label are `string`, so they cannot hold a MoneyText.
 */
export function formatCents(cents: number): string {
	return new Intl.NumberFormat('pt-BR', {
		currency: 'BRL',
		style: 'currency',
	}).format(cents / 100)
}
