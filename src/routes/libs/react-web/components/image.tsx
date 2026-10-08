import { createFileRoute } from '@tanstack/react-router'
import type { ImageFit, ImageRatio, ImageRounded } from '@turystack/react-web'
import { Avatar, Button, Card, Image } from '@turystack/react-web'
import { Store } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/image/image.types.ts` and the
 * `defaultVariants` in `image.tsx`.
 */
const imageProps = [
	{
		description: "The file's URL. Empty or broken shows the fallback.",
		name: 'src',
		required: true,
		type: 'string',
	},
	{
		description: 'What the image shows. "" marks it decorative.',
		name: 'alt',
		required: true,
		type: 'string',
	},
	{
		default: '"auto"',
		description: "Frame shape. auto keeps the file's proportions.",
		name: 'ratio',
		type: '"square" | "4/3" | "16/9" | "3/2" | "21/9" | "auto"',
	},
	{
		default: '"cover"',
		description: 'cover crops to fill; contain letterboxes.',
		name: 'fit',
		type: '"cover" | "contain"',
	},
	{
		default: '"md"',
		description: 'Corner radius of the frame.',
		name: 'rounded',
		type: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
	},
	{
		default: '"full"',
		description: "full spans the container; auto keeps the file's width.",
		name: 'width',
		type: '"auto" | "full"',
	},
	{
		default: '"lazy"',
		description: 'eager for an image above the fold.',
		name: 'loading',
		type: '"lazy" | "eager"',
	},
	{
		description: 'Shown when src is empty or fails. Defaults to an icon.',
		name: 'fallback',
		type: 'React.ReactNode',
	},
	{
		default: 'false',
		description: 'A hairline around the frame.',
		name: 'bordered',
		type: 'boolean',
	},
]

const usageCode = `import { Image } from '@turystack/react-web'

// A product shot in a fixed square
<Image alt="Tênis azul, vista lateral" ratio="square" src={shot} />

// A decorative banner: alt="" hides it from assistive technology
<Image alt="" ratio="21/9" rounded="none" src={banner} />

// A logo: letterboxed, bordered, its own width, a stand-in if it is missing
<Image
  alt="Logo da Pousada Maré"
  bordered
  fallback={<Store />}
  fit="contain"
  ratio="square"
  src={store.logoUrl ?? ''}
  width="auto"
/>

// The hero above the fold loads eagerly
<Image alt="Vista da piscina ao pôr do sol" loading="eager" ratio="16/9" src={hero} />`

/**
 * Stand-in photographs, drawn as SVG so the page needs no network and every
 * file has a known intrinsic size — which is what `ratio="auto"` shows off.
 */
function scene(
	width: number,
	height: number,
	sky: [
		string,
		string,
	],
) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#s)"/><circle cx="${width * 0.72}" cy="${height * 0.34}" r="${Math.min(width, height) * 0.1}" fill="#fff7d6" fill-opacity=".9"/><path d="M0 ${height * 0.72} L${width * 0.22} ${height * 0.46} L${width * 0.42} ${height * 0.66} L${width * 0.62} ${height * 0.4} L${width} ${height * 0.7} V${height} H0Z" fill="#1e3a5f" fill-opacity=".75"/><path d="M0 ${height * 0.84} Q${width * 0.5} ${height * 0.74} ${width} ${height * 0.86} V${height} H0Z" fill="#0f2740"/></svg>`

	return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const LANDSCAPE = scene(1200, 800, [
	'#f59e0b',
	'#7c3aed',
])
const PANORAMA = scene(2100, 900, [
	'#38bdf8',
	'#1d4ed8',
])
const PORTRAIT = scene(600, 900, [
	'#fb7185',
	'#6d28d9',
])

const LOGO = `data:image/svg+xml,${encodeURIComponent(
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 120" width="240" height="120"><rect width="240" height="120" fill="#fff"/><circle cx="60" cy="60" r="34" fill="#0ea5e9"/><path d="M34 70 q13 -16 26 0 t26 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/><text x="108" y="70" font-family="Arial, sans-serif" font-size="26" font-weight="700" fill="#0f172a">Maré</text></svg>',
)}`

const BROKEN = 'https://example.invalid/fotos/quarto-404.jpg'

const RATIOS: ImageRatio[] = [
	'square',
	'4/3',
	'3/2',
	'16/9',
	'21/9',
	'auto',
]

const FITS: ImageFit[] = [
	'cover',
	'contain',
]

const ROUNDED: ImageRounded[] = [
	'none',
	'sm',
	'md',
	'lg',
	'xl',
	'full',
]

function RetryDemo() {
	const [src, setSrc] = useState(BROKEN)

	return (
		<div className="flex w-full max-w-sm flex-col items-center gap-3">
			<Image
				alt="Quarto duplo com varanda"
				ratio="4/3"
				src={src}
			/>
			<Button
				onClick={() =>
					setSrc((current) => (current === BROKEN ? LANDSCAPE : BROKEN))
				}
				size="sm"
				variant="outline"
			>
				{src === BROKEN
					? 'Trocar por um arquivo que carrega'
					: 'Voltar ao link quebrado'}
			</Button>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Content
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Image
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Media in a fixed ratio and fit, with a fallback when the file is
					missing.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={imageProps} />
			</section>

			<SlotsSection slug="image" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Ratio</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						ratio
					</code>{' '}
					fixes the shape before the file loads, so nothing jumps.
				</p>
				<ComponentPreview title="Ratios">
					<div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
						{RATIOS.map((ratio) => (
							<figure
								className="space-y-1.5"
								key={ratio}
							>
								<Image
									alt="Montanhas ao entardecer"
									ratio={ratio}
									src={LANDSCAPE}
								/>
								<figcaption className="text-center text-muted-foreground text-xs">
									{ratio}
								</figcaption>
							</figure>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Fit</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						cover
					</code>{' '}
					suits photos;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						contain
					</code>{' '}
					suits logos and documents.
				</p>
				<ComponentPreview title="Portrait in a square">
					<div className="grid w-full max-w-md grid-cols-2 gap-4">
						{FITS.map((fit) => (
							<figure
								className="space-y-1.5"
								key={fit}
							>
								<Image
									alt="Fachada da pousada"
									bordered
									fit={fit}
									ratio="square"
									src={PORTRAIT}
								/>
								<figcaption className="text-center text-muted-foreground text-xs">
									{fit}
								</figcaption>
							</figure>
						))}
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Fallback</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					An empty or broken{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">src</code>{' '}
					shows{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						fallback
					</code>
					, keeping the alt as its name. A new src retries.
				</p>
				<ComponentPreview title="Broken and empty">
					<div className="grid w-full max-w-lg grid-cols-2 gap-4">
						<Image
							alt="Quarto duplo com varanda"
							ratio="4/3"
							src={BROKEN}
						/>
						<Image
							alt="Logo da loja"
							bordered
							fallback={
								<div className="flex flex-col items-center gap-1 text-xs">
									<Store />
									Sem logo
								</div>
							}
							fit="contain"
							ratio="4/3"
							src=""
						/>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Retry">
					<RetryDemo />
				</ComponentPreview>
				<ComponentPreview title="On a muted surface">
					<div className="grid w-full max-w-lg grid-cols-3 gap-3 rounded-lg bg-muted p-4">
						<figure className="space-y-1.5">
							<Image
								alt="Pacote Gramado no inverno"
								ratio="square"
								src=""
							/>
							<figcaption className="text-xs">Gramado</figcaption>
						</figure>
						<figure className="space-y-1.5">
							<Image
								alt="Pacote Bonito ecoturismo"
								ratio="square"
								src={LANDSCAPE}
							/>
							<figcaption className="text-xs">Bonito</figcaption>
						</figure>
						<figure className="space-y-1.5">
							<Image
								alt="Pacote Jericoacoara"
								ratio="square"
								src={BROKEN}
							/>
							<figcaption className="text-xs">Jericoacoara</figcaption>
						</figure>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Decorative images
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">alt</code>{' '}
					is required. Pass{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						alt=""
					</code>{' '}
					only for a purely decorative image.
				</p>
				<ComponentPreview title="Store header">
					<div className="w-full max-w-xl">
						<Card>
							<Image
								alt=""
								ratio="21/9"
								rounded="none"
								src={PANORAMA}
							/>
							<Card.Header>
								<div className="flex items-center gap-3">
									<Image
										alt="Logo da Pousada Maré"
										bordered
										fit="contain"
										ratio="square"
										rounded="full"
										src={LOGO}
										width="auto"
									/>
									<div>
										<Card.Title>Pousada Maré</Card.Title>
										<Card.Description>
											Ubatuba, SP · 4,8 ★ (312 avaliações)
										</Card.Description>
									</div>
								</div>
							</Card.Header>
						</Card>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Corners, border and width
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						width="auto"
					</code>{' '}
					keeps the file's width, for logos. For people, use Avatar.
				</p>
				<ComponentPreview title="rounded">
					<div className="grid w-full grid-cols-3 gap-4 sm:grid-cols-6">
						{ROUNDED.map((rounded) => (
							<figure
								className="space-y-1.5"
								key={rounded}
							>
								<Image
									alt="Montanhas ao entardecer"
									ratio="square"
									rounded={rounded}
									src={LANDSCAPE}
								/>
								<figcaption className="text-center text-muted-foreground text-xs">
									{rounded}
								</figcaption>
							</figure>
						))}
					</div>
				</ComponentPreview>
				<ComponentPreview title="width auto, beside Avatar">
					<div className="flex items-center gap-6">
						<Image
							alt="Logo da Pousada Maré"
							bordered
							src={LOGO}
							width="auto"
						/>
						<Avatar alt="Ana Souza">AS</Avatar>
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

export const Route = createFileRoute('/libs/react-web/components/image')({
	component: Page,
})
