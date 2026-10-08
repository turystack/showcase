import { createFileRoute } from '@tanstack/react-router'
import type { QrCodeLevel } from '@turystack/react-web'
import {
	CopyButton,
	FormatProvider,
	MoneyText,
	QrCode,
} from '@turystack/react-web'
import { Waves } from 'lucide-react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/qr-code/qr-code.types.ts` and the
 * `defaultVariants` / destructuring defaults in `qr-code.tsx`.
 */
const qrCodeProps = [
	{
		description: 'The text to encode. Throws if too long to fit.',
		name: 'value',
		required: true,
		type: 'string',
	},
	{
		description: 'Accessible name. Say what scanning it does.',
		name: 'label',
		required: true,
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Square size: 128, 192 or 256px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"M"',
		description: 'Error correction: 7%, 15%, 25% or 30%.',
		name: 'level',
		type: '"L" | "M" | "Q" | "H"',
	},
	{
		description: 'A centred brand mark. Forces level H.',
		name: 'logo',
		type: 'React.ReactNode',
	},
]

/**
 * A real Pix "copia e cola" payload (BR Code, EMV MPM) for R$ 420,00, with a
 * valid CRC16 — any bank app would read it. The key and names are fictitious.
 */
const PIX_PAYLOAD =
	'00020126510014br.gov.bcb.pix0129financeiro@pousadamare.com.br5204000053039865406420.005802BR5917POUSADA MARE LTDA6007UBATUBA62160512RSV20260482163043C39'

const PAIRING_URL = 'https://app.turystack.com/pair?code=7HQ2-XK4M'

const LEVELS: QrCodeLevel[] = [
	'L',
	'M',
	'Q',
	'H',
]

const usageCode = `import { CopyButton, QrCode } from '@turystack/react-web'

// Pix: the code, and the same payload to copy for paying on this device
<QrCode label="QR code Pix de R$ 420,00 para Pousada Maré" value={pix.payload} />
<CopyButton label="Copiar código Pix" value={pix.payload} variant="outline" />

// More error correction for a code printed on a receipt that gets creased
<QrCode label="Ingresso 4821" level="Q" size="sm" value={ticket.id} />

// A brand mark in the middle forces level H
<QrCode
  label="Parear seu celular com a conta"
  logo={<AcmeMark />}
  size="lg"
  value={pairingUrl}
/>`

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
						QrCode
					</h1>
					<p className="mt-3 max-w-prose text-lg text-muted-foreground">
						A scannable QR code for a link or Pix payload, drawn as SVG.
					</p>
				</header>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={qrCodeProps} />
				</section>

				<SlotsSection slug="qr-code" />

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Pix payment</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						Pair it with a{' '}
						<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
							CopyButton
						</code>{' '}
						for customers paying on the same phone.
					</p>
					<ComponentPreview title="Pix checkout">
						<div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-lg border p-6 text-center">
							<div className="space-y-1">
								<p className="text-muted-foreground text-sm">Total a pagar</p>
								<p className="font-semibold text-2xl">
									<MoneyText
										inheritColor
										size="inherit"
										value={42000}
									/>
								</p>
							</div>
							<QrCode
								label="QR code Pix de R$ 420,00 para Pousada Maré"
								value={PIX_PAYLOAD}
							/>
							<p className="text-muted-foreground text-xs">
								Abra o app do seu banco, escolha Pix › Ler QR code. O código
								expira em 30 minutos.
							</p>
							<CopyButton
								label="Copiar código Pix"
								value={PIX_PAYLOAD}
								variant="outline"
							/>
						</div>
					</ComponentPreview>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Error correction
					</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						M suits a screen; Q or H suit print.
					</p>
					<ComponentPreview title="L, M, Q, H">
						<div className="flex flex-wrap items-start justify-center gap-6">
							{LEVELS.map((level) => (
								<figure
									className="flex flex-col items-center gap-1.5"
									key={level}
								>
									<QrCode
										label={`QR code Pix, nível ${level}`}
										level={level}
										size="sm"
										value={PIX_PAYLOAD}
									/>
									<figcaption className="text-muted-foreground text-xs">
										level="{level}"
									</figcaption>
								</figure>
							))}
						</div>
					</ComponentPreview>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Logo</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
							logo
						</code>{' '}
						forces level H.
					</p>
					<ComponentPreview title="Logo, size lg">
						<div className="flex flex-col items-center gap-3">
							<QrCode
								label="Parear seu celular com a conta Pousada Maré"
								logo={<Waves className="text-sky-600" />}
								size="lg"
								value={PAIRING_URL}
							/>
							<p className="text-muted-foreground text-xs">
								Escaneie com a câmera do celular para entrar sem senha.
							</p>
						</div>
					</ComponentPreview>
					<ComponentPreview title="sm, md, lg">
						<div className="flex flex-wrap items-end justify-center gap-6">
							{(
								[
									'sm',
									'md',
									'lg',
								] as const
							).map((size) => (
								<QrCode
									key={size}
									label={`Link de pareamento, tamanho ${size}`}
									size={size}
									value={PAIRING_URL}
								/>
							))}
						</div>
					</ComponentPreview>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Dark scheme</h2>
					<p className="max-w-prose text-muted-foreground text-sm">
						Always black on white, quiet zone included, so every reader can scan
						it.
					</p>
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

export const Route = createFileRoute('/libs/react-web/components/qr-code')({
	component: Page,
})
