import { createFileRoute } from '@tanstack/react-router'
import { CopyButton } from '@turystack/react-web'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/copy-button/copy-button.types.ts`
 * and the destructuring defaults in `copy-button.tsx`. The size mapping —
 * icon-only goes to Button's `icon-<size>`, a labelled `xs` falls back to
 * Button `sm` — lives in two lookup tables at the top of that file.
 */
const copyButtonProps = [
	{
		description: 'The string written to the clipboard.',
		name: 'value',
		required: true,
		type: 'string',
	},
	{
		description: 'Visible text. Omit for an icon-only button.',
		name: 'label',
		type: 'React.ReactNode',
	},
	{
		description: 'Accessible name. Defaults to the common.copy label.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		default: '"sm"',
		description: "Button's scale. Labelled xs renders as sm.",
		name: 'size',
		type: '"xs" | "sm" | "md" | "lg"',
	},
	{
		default: '"ghost"',
		description: "Button's variant.",
		name: 'variant',
		type: '"default" | "dark" | "destructive" | "outline" | "dashed" | "secondary" | "ghost" | "link" | "link-muted"',
	},
	{
		default: 'false',
		description: 'Stretches to the full width of the container.',
		name: 'block',
		type: 'boolean',
	},
	{
		description: 'Runs after a successful copy, with the string.',
		name: 'onCopy',
		type: '(value: string) => void',
	},
	{
		default: '"copy-button"',
		description: 'Testing handle. Inner parts derive theirs from it.',
		name: 'data-testid',
		type: 'string',
	},
]

const usageCode = `import { CopyButton } from '@turystack/react-web'

// Icon-only, beside the value it copies
<code>{reservation.id}</code>
<CopyButton value={reservation.id} />

// With a label, larger, outlined
<CopyButton label="Copiar link" size="md" value={shareUrl} variant="outline" />

// Only after the clipboard accepted it
<CopyButton onCopy={(value) => track('pix_key_copied', { value })} value={pixKey} />

// The primary action of the screen: full width, no wrapper
<CopyButton block label="Copiar linha digitável" size="lg" value={boletoLine} variant="default" />

// Inside a scroll container: no positioned wrapper needed
<ScrollArea>
  <code>{token}</code>
  <CopyButton value={token} />
</ScrollArea>`

const sizes = [
	'xs',
	'sm',
	'md',
	'lg',
] as const

const RESERVATION_ID = 'RSV-2026-04821'

const BOLETO_LINE = '23793.38128 60082.677139 66000.063306 9 98760000129000'

function Page() {
	const [copies, setCopies] = useState<string[]>([])

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Actions
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					CopyButton
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Copies a string and confirms it; every{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						copyable
					</code>{' '}
					in the library renders it.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={copyButtonProps} />
			</section>

			<SlotsSection slug="copy-button" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Icon-only and labelled
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Without{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						label
					</code>{' '}
					it is icon-only, named "Copy". A copy shows a check for two seconds.
				</p>
				<ComponentPreview title="Icon-only and labelled">
					<div className="flex flex-col items-center gap-4">
						<div className="flex items-center gap-1 text-sm">
							<span className="text-muted-foreground">Reserva</span>
							<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
								{RESERVATION_ID}
							</code>
							<CopyButton value={RESERVATION_ID} />
						</div>
						<CopyButton
							label="Copiar link de pagamento"
							value="https://pay.turystack.com/l/7Hq2xK"
							variant="outline"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Announcement</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A polite live region announces the{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						common.copied
					</code>{' '}
					label. The name stays "Copy". A failed copy announces nothing.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Block</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						block
					</code>{' '}
					fills the width, for when copying is the screen's main action.
				</p>
				<ComponentPreview title="Boleto line">
					<div className="flex w-full max-w-sm flex-col gap-3">
						<p className="text-muted-foreground text-sm">Linha digitável</p>
						<code className="break-all rounded-lg bg-muted px-3 py-2 text-xs">
							{BOLETO_LINE}
						</code>
						<CopyButton
							block
							label="Copiar linha digitável"
							size="lg"
							value={BOLETO_LINE}
							variant="default"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Button's scale. Labelled,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">xs</code>{' '}
					renders as{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">sm</code>.
				</p>
				<ComponentPreview title="xs, sm, md, lg">
					<div className="flex flex-col gap-4">
						{[
							false,
							true,
						].map((labelled) => (
							<div
								className="flex items-center gap-3"
								key={String(labelled)}
							>
								{sizes.map((size) => (
									<CopyButton
										key={size}
										label={labelled ? `Copiar (${size})` : undefined}
										size={size}
										value={RESERVATION_ID}
										variant="outline"
									/>
								))}
							</div>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Variants</h2>
				<ComponentPreview title="Variants">
					<div className="flex flex-wrap items-center gap-3">
						<CopyButton
							label="ghost"
							value="ghost"
						/>
						<CopyButton
							label="outline"
							value="outline"
							variant="outline"
						/>
						<CopyButton
							label="secondary"
							value="secondary"
							variant="secondary"
						/>
						<CopyButton
							label="dashed"
							value="dashed"
							variant="dashed"
						/>
						<CopyButton
							label="link"
							value="link"
							variant="link"
						/>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">onCopy</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onCopy
					</code>{' '}
					runs only after a successful copy.
				</p>
				<ComponentPreview title="Counting copies">
					<div className="flex flex-col items-center gap-3">
						<div className="flex items-center gap-1 text-sm">
							<span className="text-muted-foreground">Chave Pix</span>
							<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
								financeiro@pousadamare.com.br
							</code>
							<CopyButton
								onCopy={(value) =>
									setCopies((list) => [
										...list,
										value,
									])
								}
								value="financeiro@pousadamare.com.br"
							/>
						</div>
						<p className="text-muted-foreground text-xs">
							copied {copies.length} time{copies.length === 1 ? '' : 's'}
						</p>
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

export const Route = createFileRoute('/libs/react-web/components/copy-button')({
	component: Page,
})
