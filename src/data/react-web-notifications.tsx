/**
 * Demo notifications for the three Notification* pages.
 *
 * One Acme inbox, shared so the Center, the List and the Filter pages show the
 * same rows. Times are computed from when the page loaded, so "4 min ago" is
 * always four minutes ago and the day groups always read Today / Yesterday.
 *
 * `category` is not part of `NotificationItem` — it is the app's own field,
 * which the Filter page narrows by. A wider object is still a NotificationItem.
 */

import type { NotificationItem } from '@turystack/react-web'
import { Avatar } from '@turystack/react-web'
import {
	AlertTriangle,
	BarChart3,
	CreditCard,
	FileDown,
	Package,
	RefreshCw,
	ShieldCheck,
	Truck,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useCallback, useRef, useState } from 'react'

export type DemoNotification = NotificationItem & {
	category: 'comentarios' | 'financeiro' | 'equipe' | 'sistema'
}

export const notificationCategories = [
	{
		label: 'Comentários',
		value: 'comentarios',
	},
	{
		label: 'Financeiro',
		value: 'financeiro',
	},
	{
		label: 'Equipe',
		value: 'equipe',
	},
	{
		label: 'Sistema',
		value: 'sistema',
	},
]

const loadedAt = Date.now()

function minutesAgo(minutes: number): Date {
	return new Date(loadedAt - minutes * 60_000)
}

function daysAgo(days: number, hours: number, minutes: number): Date {
	const at = new Date(loadedAt)
	at.setDate(at.getDate() - days)
	at.setHours(hours, minutes, 0, 0)
	return at
}

/** An icon in a square — the media of a notification no person sent. */
function IconMedia({
	icon: Icon,
	tone,
}: {
	icon: ComponentType<{
		className?: string
	}>
	tone: string
}) {
	return (
		<span
			className={`flex size-9 items-center justify-center rounded-md ${tone}`}
		>
			<Icon className="size-4" />
		</span>
	)
}

function person(name: string, initials: string) {
	return (
		<Avatar
			alt={name}
			size="md"
		>
			{initials}
		</Avatar>
	)
}

const muted = 'bg-muted text-muted-foreground'
const good = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
const bad = 'bg-red-500/10 text-red-600 dark:text-red-400'

export const notificationSamples: DemoNotification[] = [
	{
		at: minutesAgo(4),
		category: 'comentarios',
		description: '“Podemos fechar em 12 parcelas sem juros?”',
		id: 'n-01',
		media: person('Ana Souza', 'AS'),
		title: 'Ana Souza comentou na proposta #1042',
	},
	{
		at: minutesAgo(38),
		category: 'financeiro',
		description: 'A fatura #88213, de R$ 1.240,00, foi paga via Pix.',
		id: 'n-02',
		media: (
			<IconMedia
				icon={CreditCard}
				tone={good}
			/>
		),
		title: 'Pagamento aprovado',
	},
	{
		at: minutesAgo(130),
		category: 'equipe',
		description: 'Bruno Lima entrou em Acme · Financeiro como editor.',
		id: 'n-03',
		media: person('Bruno Lima', 'BL'),
		title: 'Novo membro na equipe',
	},
	{
		at: minutesAgo(290),
		category: 'sistema',
		description: 'clientes-setembro.csv (2,4 MB) está pronto para baixar.',
		id: 'n-04',
		media: (
			<IconMedia
				icon={FileDown}
				tone={muted}
			/>
		),
		read: true,
		title: 'Exportação concluída',
	},
	{
		at: daysAgo(1, 18, 20),
		category: 'sistema',
		description:
			'O estoque de 3 produtos não foi atualizado. A próxima tentativa roda em 15 minutos; se falhar de novo, avisamos por e-mail.',
		id: 'n-05',
		media: (
			<IconMedia
				icon={AlertTriangle}
				tone={bad}
			/>
		),
		title: 'Falha na sincronização do estoque',
	},
	{
		at: daysAgo(1, 10, 5),
		category: 'comentarios',
		description: '“@você pode revisar a cláusula 4 do contrato?”',
		id: 'n-06',
		media: person('Carla Mendes', 'CM'),
		read: true,
		title: 'Carla Mendes mencionou você',
	},
	{
		at: daysAgo(3, 9, 0),
		category: 'financeiro',
		description: 'O plano Pro foi renovado por mais 12 meses.',
		id: 'n-07',
		media: (
			<IconMedia
				icon={RefreshCw}
				tone={muted}
			/>
		),
		read: true,
		title: 'Assinatura renovada',
	},
	{
		at: daysAgo(6, 8, 30),
		category: 'sistema',
		description: 'As vendas subiram 12% em relação à semana anterior.',
		id: 'n-08',
		media: (
			<IconMedia
				icon={BarChart3}
				tone={muted}
			/>
		),
		read: true,
		title: 'Seu relatório semanal está pronto',
	},
]

const olderTitles = [
	{
		category: 'sistema' as const,
		description: 'O pedido #5520 saiu do centro de distribuição.',
		icon: Truck,
		title: 'Pedido enviado',
	},
	{
		category: 'financeiro' as const,
		description: 'O boleto da fatura #88190 vence em 3 dias.',
		icon: CreditCard,
		title: 'Fatura perto do vencimento',
	},
	{
		category: 'equipe' as const,
		description: 'A verificação em duas etapas foi ativada na sua conta.',
		icon: ShieldCheck,
		title: 'Segurança da conta',
	},
	{
		category: 'sistema' as const,
		description: '42 produtos novos foram importados do catálogo.',
		icon: Package,
		title: 'Catálogo atualizado',
	},
]

/** Older notifications for the infinite demos: `count` rows from `from` on. */
export function olderNotifications(
	from: number,
	count: number,
): DemoNotification[] {
	return Array.from(
		{
			length: count,
		},
		(_, offset) => {
			const index = from + offset
			const sample = olderTitles[index % olderTitles.length]

			return {
				at: daysAgo(7 + index, 9 + (index % 8), 15),
				category: sample.category,
				description: sample.description,
				id: `old-${index}`,
				media: (
					<IconMedia
						icon={sample.icon}
						tone={muted}
					/>
				),
				read: index % 5 !== 0,
				title: sample.title,
			}
		},
	)
}

export const OLDER_TOTAL = 16
const PAGE = 6

/**
 * A stateful Acme inbox: the rows, what an app does to them, and a fake
 * infinite loader that appends a page of older notifications after 700ms.
 */
export function useDemoInbox(
	initial: DemoNotification[] = notificationSamples,
) {
	const [items, setItems] = useState(initial)
	const [older, setOlder] = useState(0)
	const [loadingMore, setLoadingMore] = useState(false)
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
	const olderRef = useRef(0)

	const setRead = useCallback((id: string, read: boolean) => {
		setItems((current) =>
			current.map((item) =>
				item.id === id
					? {
							...item,
							read,
						}
					: item,
			),
		)
	}, [])

	const remove = useCallback((id: string) => {
		setItems((current) => current.filter((item) => item.id !== id))
	}, [])

	const markAllRead = useCallback(() => {
		setItems((current) =>
			current.map((item) => ({
				...item,
				read: true,
			})),
		)
	}, [])

	const hasMore = older < OLDER_TOTAL

	const loadMore = useCallback(() => {
		if (timer.current) {
			return
		}
		setLoadingMore(true)
		timer.current = setTimeout(() => {
			const loaded = olderRef.current
			const next = Math.min(loaded + PAGE, OLDER_TOTAL)
			const page = olderNotifications(loaded, next - loaded)
			olderRef.current = next
			setOlder(next)
			setItems((current) => [
				...current,
				...page,
			])
			setLoadingMore(false)
			timer.current = null
		}, 700)
	}, [])

	const reset = useCallback(() => {
		if (timer.current) {
			clearTimeout(timer.current)
			timer.current = null
		}
		setLoadingMore(false)
		olderRef.current = 0
		setOlder(0)
		setItems(initial)
	}, [
		initial,
	])

	return {
		hasMore,
		items,
		loadingMore,
		loadMore,
		markAllRead,
		remove,
		reset,
		setRead,
	}
}
