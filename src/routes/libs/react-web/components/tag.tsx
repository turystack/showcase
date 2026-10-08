import { createFileRoute } from '@tanstack/react-router'
import {
	Button,
	FormatProvider,
	Input,
	MoneyText,
	Tag,
} from '@turystack/react-web'
import { MapPin, Tag as TagIcon, Ticket } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/tag/tag.types.ts` and the
 * destructuring defaults in `tag.tsx`. `TagProps` is a union on `children`:
 * plain text names the × by itself, rich content must bring `label`.
 */
const tagProps = [
	{
		description: 'The text. Rich content requires label.',
		name: 'children',
		required: true,
		type: 'string | number | React.ReactNode',
	},
	{
		description: 'Names the ×. Required for rich children.',
		name: 'label',
		type: 'string',
	},
	{
		default: '"secondary"',
		description: 'Any Badge variant.',
		name: 'variant',
		type: '"default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "solid" | "solid-destructive" | "solid-success" | "solid-info" | "purple" | "pink" | "teal" | "orange"',
	},
	{
		default: '"md"',
		description: "Scale: sm renders Badge's md, md renders Badge's lg.",
		name: 'size',
		type: '"sm" | "md"',
	},
	{
		description: 'A decorative icon before the text.',
		name: 'icon',
		type: 'React.ReactNode',
	},
	{
		description: 'Adds the × and fires when it is used.',
		name: 'onRemove',
		type: '() => void',
	},
	{
		default: 'false',
		description: 'Blocks the × and dims the tag.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Blocks the × like disabled; a tooltip says why.',
		name: 'disabledReason',
		type: 'string',
	},
]

const usageCode = `import { MoneyText, Tag } from '@turystack/react-web'

// An applied coupon
<Tag icon={<Ticket />} onRemove={clearCoupon} variant="success">
  BEMVINDO10
</Tag>

// A row of chosen filters — removing one hands focus to the next ×
{cities.map((city) => (
  <Tag icon={<MapPin />} key={city} onRemove={() => drop(city)}>
    {city}
  </Tag>
))}

// Rich content needs label: it is what the × names
<Tag label="Até R$ 500" onRemove={clearPrice}>
  Até <MoneyText inheritColor size="inherit" value={50000} />
</Tag>

// Read-only: no onRemove, no ×, no tab stop
<Tag size="sm" variant="outline">Pet friendly</Tag>

// Locked: the × is blocked, the tag stays readable
<Tag disabled onRemove={noop}>Plano anual</Tag>

// Locked, and saying why
<Tag disabledReason="Aplicado pelo seu plano" onRemove={noop}>PLANO10</Tag>`

const INITIAL_CITIES = [
	'São Paulo',
	'Rio de Janeiro',
	'Florianópolis',
	'Salvador',
	'Gramado',
]

function CouponDemo() {
	const [draft, setDraft] = useState('')
	const [coupon, setCoupon] = useState<string | null>('BEMVINDO10')

	return (
		<div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
			<div className="flex items-end gap-2">
				<div className="flex-1">
					<Input
						ariaLabel="Cupom de desconto"
						onChange={(next) => setDraft((next ?? '').toUpperCase())}
						placeholder="Ex.: BEMVINDO10"
						size="sm"
						value={draft}
					/>
				</div>
				<Button
					disabled={draft.trim() === ''}
					onClick={() => {
						setCoupon(draft.trim())
						setDraft('')
					}}
					size="sm"
					variant="outline"
				>
					Aplicar
				</Button>
			</div>
			<div className="flex min-h-7 items-center justify-between gap-2 text-sm">
				{coupon ? (
					<>
						<Tag
							icon={<Ticket />}
							onRemove={() => setCoupon(null)}
							variant="success"
						>
							{coupon}
						</Tag>
						<span className="text-success">
							−{' '}
							<MoneyText
								inheritColor
								size="inherit"
								value={4200}
							/>
						</span>
					</>
				) : (
					<span className="text-muted-foreground">Nenhum cupom aplicado</span>
				)}
			</div>
		</div>
	)
}

function FilterRowDemo() {
	const [cities, setCities] = useState(INITIAL_CITIES)

	return (
		<div className="flex w-full max-w-lg flex-col items-center gap-3">
			<div className="flex flex-wrap justify-center gap-2">
				{cities.map((city) => (
					<Tag
						icon={<MapPin />}
						key={city}
						onRemove={() =>
							setCities((list) => list.filter((item) => item !== city))
						}
					>
						{city}
					</Tag>
				))}
			</div>
			{cities.length === 0 ? (
				<p className="text-muted-foreground text-sm">Nenhuma cidade</p>
			) : null}
			<Button
				onClick={() => setCities(INITIAL_CITIES)}
				size="sm"
				variant="ghost"
			>
				Restaurar
			</Button>
		</div>
	)
}

function Page() {
	return (
		// Prices on this page are Brazilian: format them as the product would.
		<FormatProvider
			format={{
				currency: 'brl',
				locale: 'pt-BR',
			}}
		>
			<div className="space-y-10">
				<header>
					<p className="font-medium text-lib text-xs uppercase tracking-wider">
						Content
					</p>
					<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
						Tag
					</h1>
					<p className="mt-3 max-w-prose text-lg text-muted-foreground">
						A removable Badge, such as an applied coupon or a chosen filter.
					</p>
				</header>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={tagProps} />
				</section>

				<SlotsSection slug="tag" />

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						An applied coupon
					</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
							onRemove
						</code>{' '}
						adds the ×, named "Remove BEMVINDO10" by the{' '}
						<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
							tag.remove
						</code>{' '}
						label.
					</p>
					<ComponentPreview title="Checkout coupon">
						<CouponDemo />
					</ComponentPreview>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Keyboard</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						Each × is a tab stop. After a removal, focus moves to the next
						sibling's ×, else the previous one. Render the row as one flat list.
					</p>
					<ComponentPreview title="Chosen cities">
						<FilterRowDemo />
					</ComponentPreview>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Read-only and disabled
					</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						Without{' '}
						<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
							onRemove
						</code>{' '}
						a tag takes no focus.{' '}
						<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
							disabled
						</code>{' '}
						blocks the ×.
					</p>
					<ComponentPreview title="Read-only and disabled">
						<div className="flex flex-wrap items-center justify-center gap-2">
							<Tag
								size="sm"
								variant="outline"
							>
								Pet friendly
							</Tag>
							<Tag
								size="sm"
								variant="outline"
							>
								Wi-Fi
							</Tag>
							<Tag
								size="sm"
								variant="info"
							>
								Novo
							</Tag>
							<Tag
								disabled
								icon={<TagIcon />}
								onRemove={() => undefined}
							>
								Plano anual
							</Tag>
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
						blocks the × but keeps it focusable; hover or focus it to read why.
					</p>
					<ComponentPreview title="A locked coupon next to a removable one">
						<div className="flex flex-wrap items-center justify-center gap-2">
							<Tag
								icon={<Ticket />}
								onRemove={() => undefined}
								variant="success"
							>
								BEMVINDO10
							</Tag>
							<Tag
								disabledReason="Aplicado pelo seu plano"
								icon={<TagIcon />}
								onRemove={() => undefined}
							>
								PLANO10
							</Tag>
						</div>
					</ComponentPreview>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Rich content</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						Rich children require{' '}
						<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
							label
						</code>{' '}
						to name the ×.
					</p>
					<ComponentPreview title="Named by label">
						<div className="flex flex-wrap items-center justify-center gap-2">
							<Tag
								label="Até R$ 500 por noite"
								onRemove={() => undefined}
							>
								Até{' '}
								<MoneyText
									inheritColor
									size="inherit"
									value={50000}
								/>{' '}
								/ noite
							</Tag>
							<Tag
								label="4 estrelas ou mais"
								onRemove={() => undefined}
							>
								<strong>4★</strong>&nbsp;ou mais
							</Tag>
						</div>
					</ComponentPreview>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Sizes and variants
					</h2>
					<ComponentPreview title="sm and md">
						<div className="flex flex-col items-center gap-3">
							{(
								[
									'sm',
									'md',
								] as const
							).map((size) => (
								<div
									className="flex flex-wrap items-center justify-center gap-2"
									key={size}
								>
									{(
										[
											'secondary',
											'outline',
											'success',
											'warning',
											'info',
											'destructive',
										] as const
									).map((variant) => (
										<Tag
											key={variant}
											onRemove={() => undefined}
											size={size}
											variant={variant}
										>
											{variant}
										</Tag>
									))}
								</div>
							))}
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
		</FormatProvider>
	)
}

export const Route = createFileRoute('/libs/react-web/components/tag')({
	component: Page,
})
