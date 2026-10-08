import { useInterval } from '@turystack/react-hooks'
import {
	ArrowLeftIcon,
	CheckIcon,
	ClockIcon,
	DownloadIcon,
	MailIcon,
	QrCodeIcon,
	ReceiptIcon,
	SmartphoneIcon,
} from '@turystack/react-icons'
import {
	Alert,
	Badge,
	Box,
	Button,
	Card,
	CopyButton,
	DateText,
	DescriptionList,
	EmptyState,
	Flex,
	Input,
	Loader,
	MoneyText,
	Progress,
	QrCode,
	Separator,
	Typography,
} from '@turystack/react-web'
import { type ReactNode, useState } from 'react'

import {
	CheckoutBack,
	CheckoutShell,
	formatCents,
	intervalOf,
	PlanHeadline,
	Totals,
	TrustFooter,
} from '@/components/audiences/checkout/checkout-shared'

/**
 * Paid, not confirmed yet. The page keeps the checkout's shell — the order
 * stays on the left, read-only — and only the right column is swapped for
 * what the method needs next: a QR code, an authorization in the bank's app,
 * a boleto to pay. Whoever reaches them is signed in — a first purchase or a
 * customer changing plans — and the four states are the same for both, so the
 * variants have no group.
 */
export type CheckoutPendingVariant =
	| 'pix-waiting'
	| 'pix-expired'
	| 'pix-automatico-authorize'
	| 'boleto-issued'

const ANNUAL = intervalOf('annual')

/**
 * A Pix "copia e cola" in the EMV BR Code layout — merchant account under
 * br.gov.bcb.pix, amount 1068.00, BRL (986), txid ACMEPRO48213 and a CRC16
 * that checks out. The key is the RFC 4122 example UUID, so it is well formed
 * and pays no one.
 */
const PIX_CODE =
	'00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-42661417400052040000530398654071068.005802BR5920ACME TECNOLOGIA LTDA6009SAO PAULO62160512ACMEPRO4821363047E8D'

const BOLETO_LINE = '34191.79001 01043.510047 91020.150008 1 10480000106800'

function OrderReadOnly() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<CheckoutBack />
			<PlanHeadline interval={ANNUAL} />
			<Separator />
			<Totals interval={ANNUAL} />
		</Flex>
	)
}

function BackToMethods() {
	return (
		<Box>
			<Button
				leftSection={<ArrowLeftIcon size={16} />}
				size="sm"
				variant="link-muted"
			>
				Escolher outro método
			</Button>
		</Box>
	)
}

function PanelTitle({
	badge,
	description,
	title,
}: {
	badge?: ReactNode
	description: ReactNode
	title: string
}) {
	return (
		<Flex
			direction="col"
			gap="xs"
		>
			<Flex
				align="center"
				gap="sm"
			>
				<Typography
					component="h1"
					size="2xl"
					weight="bold"
				>
					{title}
				</Typography>
				{badge}
			</Flex>
			<Typography
				component="p"
				size="sm"
				variant="muted"
			>
				{description}
			</Typography>
		</Flex>
	)
}

const SECOND_MS = 1000
const MINUTE_MS = 60 * SECOND_MS

/**
 * The Pix of this order: issued eight minutes ago, payable for the seller's
 * four hours, so the countdown reads "Expira em 3h 52min" when the screen
 * opens.
 */
function pixWindow() {
	const created = Date.now() - 8 * MINUTE_MS

	return {
		created,
		expires: created + 240 * MINUTE_MS,
	}
}

/** "3h 52min", "12min", "40s" — the two largest units of what is left. */
function timeLeft(seconds: number): string {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)

	if (hours > 0) {
		return `${hours}h ${minutes}min`
	}
	if (minutes > 0) {
		return `${minutes}min`
	}

	return `${Math.max(0, seconds)}s`
}

/** "14:32" in the shop's time zone. */
function clockOf(time: number): string {
	return new Intl.DateTimeFormat('pt-BR', {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'America/Sao_Paulo',
	}).format(time)
}

/** The page is listening for the payment, and says so. */
function Listening({ children }: { children: string }) {
	return (
		<Flex
			align="center"
			gap="sm"
			justify="center"
		>
			<Loader
				label={children}
				size="sm"
			/>
			<Typography
				align="center"
				component="span"
				size="sm"
				variant="muted"
			>
				{children}
			</Typography>
		</Flex>
	)
}

/** The QR code, the copy-and-paste field and the big copy button. */
function PixCode() {
	return (
		<Flex
			direction="col"
			gap="md"
		>
			<Flex justify="center">
				<QrCode
					label={`QR Code Pix de ${formatCents(ANNUAL.total)}`}
					size="lg"
					value={PIX_CODE}
				/>
			</Flex>
			<Input
				ariaLabel="Código Pix copia e cola"
				readOnly
				rightSection={<CopyButton value={PIX_CODE} />}
				value={PIX_CODE}
			/>
			<CopyButton
				block
				label="Copiar código Pix"
				size="lg"
				value={PIX_CODE}
				variant="default"
			/>
		</Flex>
	)
}

/** The amount and the code, a countdown to the expiry, and the wait. */
function PixCharge() {
	const [{ created, expires }] = useState(pixWindow)
	const [now, setNow] = useState(() => Date.now())
	const left = Math.ceil((expires - now) / SECOND_MS)

	useInterval(() => setNow(Date.now()), SECOND_MS)

	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<Card>
				<Card.Content>
					<Flex
						direction="col"
						gap="md"
					>
						<Flex
							align="baseline"
							justify="between"
						>
							<Typography
								component="span"
								size="sm"
								variant="muted"
							>
								Valor
							</Typography>
							<MoneyText
								size="xl"
								value={ANNUAL.total}
								weight="bold"
							/>
						</Flex>
						<PixCode />
					</Flex>
				</Card.Content>
			</Card>
			<Flex
				direction="col"
				gap="xs"
			>
				<Flex
					align="center"
					justify="between"
				>
					<Flex
						align="center"
						gap="xs"
					>
						<ClockIcon size={14} />
						<Typography
							component="span"
							size="sm"
						>
							Expira em {timeLeft(left)}
						</Typography>
					</Flex>
					<Typography
						component="span"
						size="xs"
						variant="muted"
					>
						às {clockOf(expires)}
					</Typography>
				</Flex>
				<Progress
					ariaLabel={`Expira em ${timeLeft(left)}`}
					size="sm"
					value={Math.max(
						0,
						Math.min(100, ((expires - now) / (expires - created)) * 100),
					)}
				/>
			</Flex>
			<Listening>A página atualiza sozinha quando o pagamento cair.</Listening>
		</Flex>
	)
}

/** The code ran out: nothing was charged, and the two ways forward. */
function PixCodeExpired() {
	return (
		<EmptyState
			action={
				<Flex
					direction="col"
					gap="sm"
				>
					<Button leftSection={<QrCodeIcon size={16} />}>
						Gerar novo código
					</Button>
					<Button variant="ghost">Escolher outro método</Button>
				</Flex>
			}
			bordered="dashed"
			description="Nenhuma cobrança foi feita. Gere um novo código para o mesmo pedido — o valor e o cupom continuam os mesmos."
			icon={<ClockIcon size={40} />}
			size="lg"
			title="O código Pix expirou"
		/>
	)
}

const AUTHORIZE_STEPS = [
	'Abra o app do seu banco — enviamos o pedido de autorização para ele.',
	'Entre em Pix › Pix Automático › Autorizações pendentes.',
	'Confira recebedor, valor e frequência, e autorize.',
]

/**
 * Pix Automático, still with the bank: the steps to authorize, the terms of
 * the mandate as the bank will show them, and the QR code as a fallback.
 */
function PixMandate() {
	const [showCode, setShowCode] = useState(false)

	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<Card>
				<Card.Content>
					<Flex
						direction="col"
						gap="md"
					>
						{AUTHORIZE_STEPS.map((step, index) => (
							<Flex
								align="start"
								gap="md"
								key={step}
							>
								<Badge
									size="sm"
									variant="secondary"
								>
									{index + 1}
								</Badge>
								<Typography
									component="span"
									size="sm"
								>
									{step}
								</Typography>
							</Flex>
						))}
					</Flex>
				</Card.Content>
			</Card>
			<Flex
				direction="col"
				gap="sm"
			>
				<Typography
					component="h2"
					size="sm"
					weight="semibold"
				>
					O que você vai autorizar
				</Typography>
				<DescriptionList
					dividers
					items={[
						{
							key: 'receiver',
							label: 'Recebedor',
							value: 'Acme Tecnologia Ltda · CNPJ 12.345.678/0001-90',
						},
						{
							key: 'limit',
							label: 'Limite por cobrança',
							value: (
								<MoneyText
									size="inherit"
									value={ANNUAL.total}
								/>
							),
						},
						{
							key: 'frequency',
							label: 'Frequência',
							value: 'Anual',
						},
						{
							key: 'first-charge',
							label: 'Primeira cobrança',
							value: (
								<DateText
									size="inherit"
									value="2026-09-26T12:00:00-03:00"
								/>
							),
						},
						{
							key: 'validity',
							label: 'Validade',
							value: 'Até você cancelar',
						},
					]}
					layout="inline"
				/>
			</Flex>
			<Listening>Esperando a confirmação do seu banco…</Listening>
			{showCode ? (
				<Card>
					<Card.Content>
						<PixCode />
					</Card.Content>
				</Card>
			) : (
				<Flex justify="center">
					<Button
						leftSection={<SmartphoneIcon size={16} />}
						onClick={() => setShowCode(true)}
						variant="outline"
					>
						Não chegou? Mostrar QR Code
					</Button>
				</Flex>
			)}
		</Flex>
	)
}

/**
 * The boleto: amount and due date, the linha digitável to copy (digits only
 * reach the clipboard), the PDF, an e-mail copy, and how long the bank takes.
 */
function Boleto() {
	const [email, setEmail] = useState<'idle' | 'sending' | 'sent'>('idle')
	const sendEmail = () => {
		setEmail('sending')
		setTimeout(() => setEmail('sent'), 800)
	}

	return (
		<>
			<Card>
				<Card.Content>
					<Flex
						direction="col"
						gap="md"
					>
						<DescriptionList
							columns={2}
							items={[
								{
									key: 'amount',
									label: 'Valor',
									value: (
										<MoneyText
											size="inherit"
											value={ANNUAL.total}
											weight="semibold"
										/>
									),
								},
								{
									key: 'due',
									label: 'Vencimento',
									value: (
										<DateText
											size="inherit"
											value="2026-09-29T12:00:00-03:00"
										/>
									),
								},
							]}
						/>
						<Flex
							direction="col"
							gap="xs"
						>
							<Typography
								component="span"
								size="sm"
								weight="medium"
							>
								Linha digitável
							</Typography>
							<Input
								ariaLabel="Linha digitável"
								leftSection={<ReceiptIcon size={16} />}
								readOnly
								value={BOLETO_LINE}
							/>
						</Flex>
						<CopyButton
							block
							label="Copiar linha digitável"
							size="lg"
							value={BOLETO_LINE.replace(/\D/g, '')}
							variant="default"
						/>
						{/* A row that wraps: side by side while both fit, each full width when not. */}
						<Flex
							gap="sm"
							wrap="wrap"
						>
							<Box grow>
								<Button
									block
									leftSection={<DownloadIcon size={16} />}
									variant="outline"
								>
									Baixar PDF
								</Button>
							</Box>
							<Box grow>
								<Button
									block
									disabled={email === 'sent'}
									leftSection={
										email === 'sent' ? (
											<CheckIcon size={16} />
										) : (
											<MailIcon size={16} />
										)
									}
									loading={email === 'sending'}
									onClick={sendEmail}
									variant="outline"
								>
									{email === 'sent'
										? 'Enviado por e-mail'
										: 'Enviar por e-mail'}
								</Button>
							</Box>
						</Flex>
					</Flex>
				</Card.Content>
			</Card>
			<Alert variant="info">
				<Alert.Title>A confirmação leva até 1 dia útil</Alert.Title>
				<Alert.Description>
					O banco avisa depois do pagamento. O acesso é liberado assim que
					chegar.
				</Alert.Description>
			</Alert>
		</>
	)
}

function PixWaiting() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<BackToMethods />
			<PanelTitle
				badge={<Badge variant="warning">Aguardando pagamento</Badge>}
				description="Escaneie o QR Code no app do banco, ou copie o código. Pagando este Pix você também autoriza as próximas cobranças (Pix Automático)."
				title="Pague com Pix"
			/>
			<PixCharge />
			<TrustFooter />
		</Flex>
	)
}

function PixExpired() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<BackToMethods />
			<PanelTitle
				badge={<Badge variant="destructive">Expirado</Badge>}
				description="O prazo de 4 horas para pagar este código terminou."
				title="Pague com Pix"
			/>
			<PixCodeExpired />
			<TrustFooter />
		</Flex>
	)
}

function PixAutomaticoAuthorize() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<BackToMethods />
			<PanelTitle
				badge={<Badge variant="warning">Aguardando autorização</Badge>}
				description="Autorize uma vez; as próximas cobranças caem sozinhas, até você cancelar."
				title="Autorize no app do banco"
			/>
			<PixMandate />
			<TrustFooter />
		</Flex>
	)
}

function BoletoIssued() {
	return (
		<Flex
			direction="col"
			gap="lg"
		>
			<BackToMethods />
			<PanelTitle
				badge={<Badge variant="warning">Aguardando pagamento</Badge>}
				description="Pague em qualquer banco, lotérica ou app até o vencimento."
				title="Boleto gerado"
			/>
			<Boleto />
			<TrustFooter />
		</Flex>
	)
}

const PANELS: Record<CheckoutPendingVariant, () => ReactNode> = {
	'boleto-issued': BoletoIssued,
	'pix-automatico-authorize': PixAutomaticoAuthorize,
	'pix-expired': PixExpired,
	'pix-waiting': PixWaiting,
}

export function CheckoutPending({
	variant,
}: {
	variant: CheckoutPendingVariant
}) {
	const Panel = PANELS[variant] ?? PixWaiting

	return (
		<CheckoutShell
			left={<OrderReadOnly />}
			right={<Panel />}
		/>
	)
}
