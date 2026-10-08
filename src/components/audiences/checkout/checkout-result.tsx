import {
	ArrowRightIcon,
	CalendarIcon,
	CircleCheckIcon,
	DownloadIcon,
	ReceiptIcon,
	Undo2Icon,
} from '@turystack/react-icons'
import {
	Alert,
	Box,
	Button,
	Card,
	CopyButton,
	DateText,
	DescriptionList,
	Flex,
	Input,
	Layout,
	MoneyText,
	Separator,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import { AcmeLogo } from '@/components/audiences/acme-logo'
import {
	BUYER,
	CheckoutFormat,
	CUSTOMER,
} from '@/components/audiences/checkout/checkout-shared'

/**
 * How it ended, on a page of its own — the success URL. A declined card is not
 * here: it stays on the checkout with the error above the button, because the
 * person's next move is to fix a field, not to start over.
 *
 * Everyone here signed in at `auth` before paying. A first purchase: paid, or
 * a boleto still waiting for the bank. A plan change: an upgrade that took
 * effect, or a downgrade that is scheduled.
 */
export type CheckoutResultVariant =
	| 'confirmed'
	| 'boleto-awaiting'
	| 'upgrade-confirmed'
	| 'downgrade-scheduled-confirmed'

const BOLETO_LINE = '34191.79001 01043.510047 91020.150008 1 10480000106800'

function ResultShell({ children }: { children: ReactNode }) {
	return (
		<CheckoutFormat>
			<Layout
				height="fill"
				variant="centered"
			>
				<Layout.Main>
					<Layout.Content maxWidth="sm">
						<Flex
							align="stretch"
							direction="col"
							gap="lg"
						>
							<Flex justify="center">
								<AcmeLogo />
							</Flex>
							{children}
						</Flex>
					</Layout.Content>
				</Layout.Main>
			</Layout>
		</CheckoutFormat>
	)
}

function Headline({
	description,
	icon,
	title,
}: {
	description: ReactNode
	icon: ReactNode
	title: string
}) {
	return (
		<Flex
			align="center"
			direction="col"
			gap="sm"
		>
			{icon}
			<Typography
				align="center"
				component="h1"
				size="2xl"
				weight="bold"
			>
				{title}
			</Typography>
			<Typography
				align="center"
				component="p"
				size="sm"
				variant="muted"
			>
				{description}
			</Typography>
		</Flex>
	)
}

function Confirmed() {
	return (
		<ResultShell>
			<Headline
				description={
					<>Enviamos o recibo para {BUYER.email}. Pedido nº 48213.</>
				}
				icon={<CircleCheckIcon size={40} />}
				title="Assinatura confirmada"
			/>
			<Card>
				<Card.Content>
					<DescriptionList
						dividers
						items={[
							{
								label: 'Plano',
								value: 'Acme Pro · Anual',
							},
							{
								label: 'Cobrado hoje',
								value: (
									<MoneyText
										size="inherit"
										value={106800}
									/>
								),
							},
							{
								label: 'Método',
								value: 'Cartão •••• 4242',
							},
							{
								label: 'Próxima cobrança',
								value: (
									<DateText
										size="inherit"
										value="2027-09-26T12:00:00-03:00"
									/>
								),
							},
						]}
						layout="inline"
					/>
				</Card.Content>
			</Card>
			<Flex
				direction="col"
				gap="sm"
			>
				<Button
					block
					rightSection={<ArrowRightIcon size={16} />}
				>
					Ir para o painel
				</Button>
				<Button
					block
					variant="ghost"
				>
					Convidar usuários
				</Button>
			</Flex>
		</ResultShell>
	)
}

function BoletoAwaiting() {
	return (
		<ResultShell>
			<Headline
				description="Assim que o banco confirmar — até 1 dia útil depois do pagamento — sua assinatura é ativada e você recebe um e-mail."
				icon={<ReceiptIcon size={40} />}
				title="Boleto gerado, aguardando pagamento"
			/>
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
									label: 'Valor',
									value: (
										<MoneyText
											size="inherit"
											value={106800}
										/>
									),
								},
								{
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
						<Input
							ariaLabel="Linha digitável"
							readOnly
							rightSection={
								<CopyButton value={BOLETO_LINE.replace(/\D/g, '')} />
							}
							value={BOLETO_LINE}
						/>
						<Button
							block
							leftSection={<DownloadIcon size={16} />}
							variant="outline"
						>
							Baixar boleto em PDF
						</Button>
					</Flex>
				</Card.Content>
			</Card>
			<Alert variant="info">
				<Alert.Title>Enquanto isso</Alert.Title>
				<Alert.Description>
					Enviamos o boleto para {BUYER.email}. Sua conta já está aberta; os
					recursos do Pro liberam com a confirmação.
				</Alert.Description>
			</Alert>
			<Button
				block
				rightSection={<ArrowRightIcon size={16} />}
				variant="outline"
			>
				Ir para o painel
			</Button>
		</ResultShell>
	)
}

function UpgradeConfirmed() {
	return (
		<ResultShell>
			<Headline
				description="Os recursos novos já estão liberados para toda a Padaria Estrela."
				icon={<CircleCheckIcon size={40} />}
				title="Você agora está no Pro"
			/>
			<Card>
				<Card.Content>
					<DescriptionList
						dividers
						items={[
							{
								label: 'Plano',
								value: 'Starter → Pro · Mensal',
							},
							{
								label: 'Crédito do Starter',
								value: (
									<MoneyText
										colored
										size="inherit"
										value={-2287}
									/>
								),
							},
							{
								label: 'Cobrado hoje',
								value: (
									<MoneyText
										size="inherit"
										value={2333}
									/>
								),
							},
							{
								label: 'Próxima cobrança',
								value: (
									<>
										<MoneyText
											size="inherit"
											value={9900}
										/>{' '}
										em{' '}
										<DateText
											size="inherit"
											value="2026-10-10T12:00:00-03:00"
										/>
									</>
								),
							},
							{
								label: 'Recibo',
								value: CUSTOMER.email,
							},
						]}
						layout="inline"
					/>
				</Card.Content>
			</Card>
			<Flex
				direction="col"
				gap="sm"
			>
				<Button
					block
					rightSection={<ArrowRightIcon size={16} />}
				>
					Ir para o painel
				</Button>
				<Button
					block
					variant="ghost"
				>
					Convidar usuários
				</Button>
			</Flex>
		</ResultShell>
	)
}

function DowngradeScheduledConfirmed() {
	return (
		<ResultShell>
			<Headline
				description={
					<>
						Nada muda até{' '}
						<DateText
							inheritColor
							size="inherit"
							value="2026-10-10T12:00:00-03:00"
						/>
						. Até lá, você continua com tudo o que o Pro oferece.
					</>
				}
				icon={<CalendarIcon size={40} />}
				title="Downgrade agendado"
			/>
			<Card>
				<Card.Content>
					<DescriptionList
						dividers
						items={[
							{
								label: 'Hoje',
								value: 'Pro · Mensal',
							},
							{
								label: 'A partir de 10/10/2026',
								value: 'Starter · Mensal',
							},
							{
								label: 'Cobrado hoje',
								value: (
									<MoneyText
										size="inherit"
										value={0}
									/>
								),
							},
							{
								label: 'Próxima cobrança',
								value: (
									<>
										<MoneyText
											size="inherit"
											value={4900}
										/>{' '}
										em{' '}
										<DateText
											size="inherit"
											value="2026-10-10T12:00:00-03:00"
										/>
									</>
								),
							},
						]}
						layout="inline"
					/>
				</Card.Content>
			</Card>
			<Alert variant="warning">
				<Alert.Title>Escolha quem fica antes de 10/10</Alert.Title>
				<Alert.Description>
					O Starter tem até 3 usuários e hoje há 5 ativos. Sem escolha, os 2
					acessos mais recentes são suspensos.
				</Alert.Description>
				<Alert.Action>
					<Button
						size="sm"
						variant="outline"
					>
						Escolher usuários
					</Button>
				</Alert.Action>
			</Alert>
			<Separator />
			<Flex
				align="center"
				gap="sm"
				justify="between"
				wrap="wrap"
			>
				<Button
					leftSection={<Undo2Icon size={16} />}
					variant="ghost"
				>
					Desfazer agendamento
				</Button>
				<Box>
					<Button rightSection={<ArrowRightIcon size={16} />}>
						Voltar para o painel
					</Button>
				</Box>
			</Flex>
		</ResultShell>
	)
}

const RESULTS: Record<CheckoutResultVariant, () => ReactNode> = {
	'boleto-awaiting': BoletoAwaiting,
	confirmed: Confirmed,
	'downgrade-scheduled-confirmed': DowngradeScheduledConfirmed,
	'upgrade-confirmed': UpgradeConfirmed,
}

export function CheckoutResult({
	variant,
}: {
	variant: CheckoutResultVariant
}) {
	const Result = RESULTS[variant] ?? Confirmed

	return <Result />
}
