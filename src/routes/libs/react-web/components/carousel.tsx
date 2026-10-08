import { createFileRoute } from '@tanstack/react-router'
import {
	Badge,
	Button,
	Card,
	Carousel,
	MoneyText,
	SegmentedControl,
} from '@turystack/react-web'
import { Quote, Star } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const carouselProps = [
	{
		description: 'Names the carousel for assistive technology.',
		name: 'ariaLabel',
		type: 'string',
	},
	{
		description: 'Ms between advances; pauses on hover, focus, reduced motion.',
		name: 'autoplay',
		type: 'number',
	},
	{
		description: 'Wraps around instead of stopping at the ends.',
		name: 'loop',
		type: 'boolean',
	},
	{
		default: '"start"',
		description: 'Where a slide settles.',
		name: 'align',
		type: '"start" | "center" | "end"',
	},
	{
		default: 'true',
		description: 'Space between slides.',
		name: 'gap',
		type: 'boolean',
	},
	{
		default: 'perView (object form: what fits)',
		description: 'Slides per press; unset, one press moves a whole page.',
		name: 'slidesToScroll',
		type: 'number',
	},
	{
		description: 'Slide it opens on.',
		name: 'defaultIndex',
		type: 'number',
	},
	{
		description: 'Fires with the index of the slide in view.',
		name: 'onChange',
		type: '(index: number) => void',
	},
	{
		description: 'Further Embla options. The props above win.',
		name: 'opts',
		type: 'EmblaOptionsType',
	},
	{
		description: 'Embla plugins.',
		name: 'plugins',
		type: 'EmblaPluginType[]',
	},
	{
		description: 'Receives the Embla instance.',
		name: 'setApi',
		type: '(api: CarouselApi) => void',
	},
	{
		default: '"horizontal"',
		description: 'Direction of travel. Vertical takes the height of its box.',
		name: 'orientation',
		type: '"horizontal" | "vertical"',
	},
	{
		default: '1',
		description: 'Slides in view: one count, or one per breakpoint.',
		name: 'perView',
		type: '1 | 2 | 3 | 4 | 6 | { base?, sm?, md?, lg?, xl? }',
	},
	{
		default: '"viewport"',
		description: 'What perView breakpoints measure: window or carousel.',
		name: 'responsiveTo',
		type: '"viewport" | "container"',
	},
]

const usageCode = `import { Carousel } from '@turystack/react-web'

<Carousel ariaLabel="Photos" loop>
  <Carousel.Content>
    {photos.map((photo) => (
      <Carousel.Item key={photo.id}>
        <img alt={photo.alt} src={photo.url} />
      </Carousel.Item>
    ))}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
  <Carousel.Dots />
</Carousel>

// Controls sit 48px outside the slides: leave that room
<div className="px-12">
  <Carousel ariaLabel="Photos" loop>…</Carousel>
</div>

// Three at a time
<Carousel ariaLabel="Rooms" perView={3}>
  <Carousel.Content>…</Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel>

// One on a phone, two from 768px, four from 1024px;
// a press moves whatever fits at the current width
<Carousel ariaLabel="Rooms" perView={{ base: 1, md: 2, lg: 4 }}>
  <Carousel.Content>…</Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel>

// A shelf beside a sidebar: the breakpoints measure the carousel, not the window
<Carousel ariaLabel="Shelf" perView={{ base: 2, md: 4 }} responsiveTo="container">
  <Carousel.Content>…</Carousel.Content>
</Carousel>

// Advances on its own; pauses on hover and focus
<Carousel ariaLabel="Reviews" autoplay={4000} loop>
  <Carousel.Content>…</Carousel.Content>
  <Carousel.Dots />
</Carousel>

// Follow the slide in view from outside
<Carousel onChange={setIndex}>…</Carousel>`

const photos = [
	{
		id: 'pool',
		name: 'Piscina',
		tint: 'from-sky-400/80 to-cyan-600/80',
	},
	{
		id: 'suite',
		name: 'Suite master',
		tint: 'from-amber-300/80 to-orange-500/80',
	},
	{
		id: 'lobby',
		name: 'Lobby',
		tint: 'from-emerald-300/80 to-teal-600/80',
	},
	{
		id: 'spa',
		name: 'Spa',
		tint: 'from-violet-400/80 to-fuchsia-600/80',
	},
]

const rooms = [
	{
		cents: 48_000,
		id: '101',
		name: 'Standard casal',
		rating: '4,6',
	},
	{
		cents: 72_000,
		id: '102',
		name: 'Superior vista mar',
		rating: '4,8',
	},
	{
		cents: 96_000,
		id: '103',
		name: 'Suite master',
		rating: '4,9',
	},
	{
		cents: 54_000,
		id: '104',
		name: 'Standard twin',
		rating: '4,5',
	},
	{
		cents: 128_000,
		id: '105',
		name: 'Cobertura',
		rating: '5,0',
	},
]

const extraRooms = [
	{
		cents: 61_000,
		id: '106',
		name: 'Superior jardim',
		rating: '4,7',
	},
	{
		cents: 83_000,
		id: '107',
		name: 'Família',
		rating: '4,6',
	},
	{
		cents: 150_000,
		id: '108',
		name: 'Presidencial',
		rating: '5,0',
	},
]

const reviews = [
	{
		author: 'Ana Ribeiro',
		id: 'r1',
		text: 'O cafe da manha sozinho ja vale a estadia. Voltamos em dezembro.',
	},
	{
		author: 'Marcos Lima',
		id: 'r2',
		text: 'Check-in em cinco minutos e o quarto exatamente como nas fotos.',
	},
	{
		author: 'Julia Castro',
		id: 'r3',
		text: 'A vista da suite master e absurda. A equipe lembra do seu nome.',
	},
]

function Photo({ name, tint }: { name: string; tint: string }) {
	return (
		<div
			className={`flex h-56 items-end bg-gradient-to-br ${tint} p-4 sm:h-64`}
		>
			<span className="font-medium text-sm text-white drop-shadow">{name}</span>
		</div>
	)
}

type ShelfWidth = '360' | '760' | '960'

const SHELF_WIDTHS: {
	label: string
	value: ShelfWidth
}[] = [
	{
		label: '360px',
		value: '360',
	},
	{
		label: '760px',
		value: '760',
	},
	{
		label: '960px',
		value: '960',
	},
]

const SHELF_CLASS: Record<ShelfWidth, string> = {
	'360': 'w-[360px]',
	'760': 'w-[760px]',
	'960': 'w-[960px]',
}

function ContainerShelf() {
	const [width, setWidth] = useState<ShelfWidth>('760')

	return (
		<div className="flex w-full flex-col items-center gap-4">
			<SegmentedControl
				ariaLabel="Largura da prateleira"
				onChange={setWidth}
				optionLabel="label"
				options={SHELF_WIDTHS}
				optionValue="value"
				size="sm"
				value={width}
			/>
			<div className="w-full overflow-x-auto">
				<div className={`mx-auto px-12 ${SHELF_CLASS[width]}`}>
					<Carousel
						ariaLabel="Quartos em destaque"
						perView={{
							base: 1,
							md: 3,
							sm: 2,
						}}
						responsiveTo="container"
					>
						<Carousel.Content>
							{[
								...rooms,
								...extraRooms,
							].map((room) => (
								<Carousel.Item key={room.id}>
									<Card>
										<Card.Header>
											<Card.Title>{room.name}</Card.Title>
											<Card.Description>Quarto {room.id}</Card.Description>
										</Card.Header>
									</Card>
								</Carousel.Item>
							))}
						</Carousel.Content>
						<Carousel.Previous />
						<Carousel.Next />
					</Carousel>
				</div>
			</div>
		</div>
	)
}

function Page() {
	const [index, setIndex] = useState(0)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Carousel
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A row of slides, with real buttons and not only a swipe.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The root owns behaviour and sizing; compose{' '}
					<code>Carousel.Content</code>, <code>Carousel.Item</code>,{' '}
					<code>Carousel.Previous</code>, <code>Carousel.Next</code>,{' '}
					<code>Carousel.Dots</code>.
				</p>
				<PropsTable props={carouselProps} />
			</section>

			<SlotsSection slug="carousel" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">A gallery</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Controls sit 48px outside the slides, so leave that room (here{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						px-12
					</code>
					). Arrow keys work inside.
				</p>
				<ComponentPreview title="One at a time, looping, with dots">
					<div className="w-full max-w-md px-12">
						<Carousel
							ariaLabel="Fotos do hotel"
							loop
							onChange={setIndex}
						>
							<Carousel.Content>
								{photos.map((photo) => (
									<Carousel.Item key={photo.id}>
										<Photo
											name={photo.name}
											tint={photo.tint}
										/>
									</Carousel.Item>
								))}
							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
							<Carousel.Dots />
						</Carousel>
						<p className="mt-4 text-center text-muted-foreground text-sm">
							{photos[index]?.name} — {index + 1} de {photos.length}
						</p>
					</div>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					The caption is outside the component, fed by{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						onChange
					</code>
					.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Several at a time
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						perView
					</code>{' '}
					sets how many slides share the track;{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						slidesToScroll
					</code>{' '}
					follows it, so one press moves a whole page.
				</p>
				<ComponentPreview title="Three cards per view, controls in the margin">
					<div className="w-full max-w-2xl px-12">
						<Carousel
							ariaLabel="Quartos"
							perView={3}
						>
							<Carousel.Content>
								{rooms.map((room) => (
									<Carousel.Item key={room.id}>
										<Card>
											<Card.Header>
												<Card.Title>{room.name}</Card.Title>
												<Card.Description>Quarto {room.id}</Card.Description>
											</Card.Header>
											<Card.Content>
												<div className="flex items-center gap-1 text-muted-foreground text-xs">
													<Star className="size-3 fill-current" />
													{room.rating}
												</div>
											</Card.Content>
											<Card.Footer bordered>
												<MoneyText
													size="sm"
													value={room.cents}
													weight="medium"
												/>
											</Card.Footer>
										</Card>
									</Carousel.Item>
								))}
							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
						</Carousel>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Responsive per view
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						perView
					</code>{' '}
					also takes one count per window breakpoint, mobile-first. Narrow the
					browser to watch it drop.
				</p>
				<ComponentPreview title="perView={{ base: 1, md: 2, lg: 4 }}">
					<div className="w-full max-w-3xl px-12">
						<Carousel
							ariaLabel="Quartos disponíveis"
							perView={{
								base: 1,
								lg: 4,
								md: 2,
							}}
						>
							<Carousel.Content>
								{[
									...rooms,
									...extraRooms,
								].map((room) => (
									<Carousel.Item key={room.id}>
										<Card>
											<Card.Header>
												<Card.Title>{room.name}</Card.Title>
												<Card.Description>Quarto {room.id}</Card.Description>
											</Card.Header>
											<Card.Footer bordered>
												<MoneyText
													size="sm"
													value={room.cents}
													weight="medium"
												/>
											</Card.Footer>
										</Card>
									</Carousel.Item>
								))}
							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
							<Carousel.Dots />
						</Carousel>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Measured on the carousel
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						responsiveTo="container"
					</code>{' '}
					measures the breakpoints on the carousel itself. Resize the box below.
				</p>
				<ComponentPreview title="Container breakpoints: { base: 1, sm: 2, md: 3 }">
					<ContainerShelf />
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					Under container, give the carousel a parent with a width.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">On its own</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						autoplay
					</code>{' '}
					advances on a timer, pauses on hover and focus, and stays off under
					reduced motion.
				</p>
				<ComponentPreview title="Reviews, advancing every four seconds">
					<div className="w-full max-w-lg">
						<Carousel
							ariaLabel="Avaliacoes"
							autoplay={4000}
							loop
						>
							<Carousel.Content>
								{reviews.map((review) => (
									<Carousel.Item key={review.id}>
										<Card minHeight="sm">
											<Card.Content>
												<div className="flex h-full flex-col justify-center gap-3 text-center">
													<Quote className="mx-auto size-5 text-muted-foreground" />
													<p className="text-balance">{review.text}</p>
													<span className="text-muted-foreground text-xs">
														{review.author}
													</span>
												</div>
											</Card.Content>
										</Card>
									</Carousel.Item>
								))}
							</Carousel.Content>
							<Carousel.Dots />
						</Carousel>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Vertical</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Takes the height of its box. The controls move above and below, and
					the arrow keys follow the axis.
				</p>
				<ComponentPreview title="A stack of notices in a fixed box">
					<div className="h-72 w-full max-w-sm py-12">
						<Carousel
							ariaLabel="Avisos"
							orientation="vertical"
						>
							<Carousel.Content>
								{[
									{
										body: 'Manutencao da piscina das 8h as 11h.',
										id: 'n1',
										title: 'Manutencao',
										tone: 'warning' as const,
									},
									{
										body: 'Tres reservas aguardando confirmacao.',
										id: 'n2',
										title: 'Pendencias',
										tone: 'info' as const,
									},
									{
										body: 'Fechamento do mes disponivel para download.',
										id: 'n3',
										title: 'Relatorio',
										tone: 'success' as const,
									},
								].map((notice) => (
									<Carousel.Item key={notice.id}>
										<Card>
											<Card.Content>
												<div className="flex flex-col gap-2">
													<Badge variant={notice.tone}>{notice.title}</Badge>
													<p className="text-sm">{notice.body}</p>
													<Button
														size="sm"
														variant="link"
													>
														Ver detalhes
													</Button>
												</div>
											</Card.Content>
										</Card>
									</Carousel.Item>
								))}
							</Carousel.Content>
							<Carousel.Previous />
							<Carousel.Next />
						</Carousel>
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

export const Route = createFileRoute('/libs/react-web/components/carousel')({
	component: Page,
})
