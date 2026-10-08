import {
	ArrowRightIcon,
	BadgePercentIcon,
	BikeIcon,
	CoffeeIcon,
	type IconComponent,
	ShoppingBasketIcon,
} from '@turystack/react-icons'
import {
	Badge,
	Box,
	Button,
	Card,
	Carousel,
	Flex,
	Grid,
	Image,
	Layout,
	List,
	Skeleton,
	Typography,
} from '@turystack/react-web'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { CATEGORIES, STORES } from '@/components/audiences/b2c/data'
import {
	SectionHeading,
	SHELF_PER_VIEW,
	Shelf,
	StoreCard,
	StoreRow,
} from '@/components/audiences/b2c/parts'

/**
 * The first page after signing in, built for browsing rather than for a task.
 *
 * - `shelves` — category shortcuts, then titled rows that scroll sideways,
 *   each with "See all" into the full list, and every store at the end. The
 *   last-but-one shelf is still loading, in the shelf's own shape
 * - `hero` — one promotion carousel leads, and fewer shelves follow it
 *
 * There is no feed variant: none of the references ship one on the web.
 */
export type HomeVariant = 'shelves' | 'hero'

function CategoryShortcuts() {
	return (
		<Box paddingX="lg">
			<Carousel
				ariaLabel="Categories"
				perView={{
					base: 2,
					md: 4,
					sm: 3,
					xl: 6,
				}}
			>
				<Carousel.Content>
					{CATEGORIES.map((category) => (
						<Carousel.Item key={category.id}>
							<Box padding="xs">
								<Card
									ariaLabel={category.label}
									href={`#category-${category.id}`}
									size="sm"
								>
									<Card.Content>
										<Flex
											align="center"
											direction="col"
											gap="xs"
										>
											<category.icon size={28} />
											<Typography
												component="span"
												size="sm"
												weight="medium"
											>
												{category.label}
											</Typography>
										</Flex>
									</Card.Content>
								</Card>
							</Box>
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
			</Carousel>
		</Box>
	)
}

/** A shelf that has not arrived yet, drawn in the shape it will take. */
function LoadingShelf({ title }: { title: string }) {
	return (
		<Box paddingX="lg">
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<SectionHeading title={title} />
				{/* The same columns as the shelf it stands in for. */}
				<Grid
					cols={SHELF_PER_VIEW}
					gap="md"
				>
					{[
						1,
						2,
						3,
						4,
					].map((slot) => (
						<Flex
							align="stretch"
							direction="col"
							gap="sm"
							key={slot}
						>
							<Skeleton height="xl" />
							<Skeleton
								height="sm"
								width="lg"
							/>
							<Skeleton
								height="xs"
								width="md"
							/>
						</Flex>
					))}
				</Grid>
			</Flex>
		</Box>
	)
}

function AllStores() {
	return (
		<Box paddingX="lg">
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<SectionHeading
					subtitle="86 open now near you"
					title="All stores"
				/>
				<List
					gap="sm"
					itemKey="id"
					items={STORES.slice(0, 5)}
					renderItem={(store) => <StoreRow store={store} />}
				/>
			</Flex>
		</Box>
	)
}

type Promo = {
	action: string
	description: string
	icon: IconComponent
	id: string
	label: string
	title: string
}

const PROMOS: Promo[] = [
	{
		action: 'See the offers',
		description:
			'Breakfast from 12 bakeries near you, with delivery on us until 11:00.',
		icon: CoffeeIcon,
		id: 'breakfast',
		label: 'This week',
		title: '20% off breakfast',
	},
	{
		action: 'Start shopping',
		description:
			'Your first grocery order over R$ 60 comes with R$ 15 off. Arrives in 30 minutes.',
		icon: ShoppingBasketIcon,
		id: 'grocery',
		label: 'New on Acme',
		title: 'Groceries, in half an hour',
	},
	{
		action: 'Join Acme One',
		description:
			'Unlimited free delivery on orders over R$ 30, for R$ 9,90 a month.',
		icon: BikeIcon,
		id: 'one',
		label: 'Membership',
		title: 'Free delivery, every order',
	},
]

function PromoSlide({ promo }: { promo: Promo }) {
	return (
		<Box
			bg="muted"
			padding="xl"
			rounded="xl"
		>
			<Grid
				cols={5}
				gap="lg"
			>
				<Grid.Item span={3}>
					<Flex
						align="start"
						direction="col"
						gap="md"
					>
						<Badge
							size="sm"
							variant="solid"
						>
							{promo.label}
						</Badge>
						<Typography
							component="h2"
							size="4xl"
							weight="bold"
						>
							{promo.title}
						</Typography>
						<Typography
							component="p"
							maxWidth="sm"
							variant="muted"
						>
							{promo.description}
						</Typography>
						<Button rightSection={<ArrowRightIcon size={16} />}>
							{promo.action}
						</Button>
					</Flex>
				</Grid.Item>
				<Grid.Item span={2}>
					{/* Decorative: the slide's heading already says what it shows. */}
					<Image
						alt=""
						fallback={<promo.icon />}
						ratio="4/3"
						rounded="lg"
						src=""
					/>
				</Grid.Item>
			</Grid>
		</Box>
	)
}

function Hero() {
	return (
		<Box paddingX="lg">
			<Carousel
				ariaLabel="Promotions"
				loop
			>
				<Carousel.Content>
					{PROMOS.map((promo) => (
						<Carousel.Item key={promo.id}>
							<PromoSlide promo={promo} />
						</Carousel.Item>
					))}
				</Carousel.Content>
				<Carousel.Previous />
				<Carousel.Next />
				<Carousel.Dots />
			</Carousel>
		</Box>
	)
}

function OffersStrip() {
	return (
		<Box paddingX="lg">
			<Grid
				cols={3}
				gap="md"
			>
				{STORES.filter((store) => store.promo).map((store) => (
					<Card
						ariaLabel={`${store.promo} at ${store.name}`}
						href={`#store-${store.id}`}
						key={store.id}
						size="sm"
					>
						<Card.Content>
							<Flex
								align="center"
								gap="sm"
							>
								<BadgePercentIcon size={20} />
								<Box
									grow
									overflow="hidden"
								>
									<Flex
										align="stretch"
										direction="col"
										gap="none"
									>
										<Typography
											component="p"
											size="sm"
											truncate
											weight="semibold"
										>
											{store.promo}
										</Typography>
										<Typography
											component="p"
											size="xs"
											truncate
											variant="muted"
										>
											{store.name}&nbsp;· {store.eta}
										</Typography>
									</Flex>
								</Box>
							</Flex>
						</Card.Content>
					</Card>
				))}
			</Grid>
		</Box>
	)
}

export function Home({ variant }: { variant: HomeVariant }) {
	const cards = STORES.map((store) => (
		<StoreCard
			key={store.id}
			saved={store.id === 'aurora' || store.id === 'grao'}
			store={store}
		/>
	))

	return (
		<ConsumerShell>
			<Layout.Content maxWidth="lg">
				<Flex
					align="stretch"
					direction="col"
					gap="xl"
				>
					{/* The page's one h1: every shelf below is a section of it. */}
					<Box paddingX="lg">
						<Flex
							align="stretch"
							direction="col"
							gap="none"
						>
							<Typography
								component="h1"
								size="2xl"
								weight="bold"
							>
								Good afternoon, Marina
							</Typography>
							<Typography
								component="p"
								size="sm"
								variant="muted"
							>
								Delivering to Rua Harmonia, 412
							</Typography>
						</Flex>
					</Box>
					{variant === 'hero' ? (
						<>
							<Hero />
							<Shelf
								subtitle="The places you order from most"
								title="Order again"
							>
								{cards}
							</Shelf>
							<Box paddingX="lg">
								<SectionHeading title="Offers near you" />
							</Box>
							<OffersStrip />
							<AllStores />
						</>
					) : (
						<>
							<CategoryShortcuts />
							<Shelf
								subtitle="The places you order from most"
								title="Order again"
							>
								{cards}
							</Shelf>
							<Shelf
								subtitle="Under 20 minutes to Rua Harmonia"
								title="Fastest near you"
							>
								{[
									...cards,
								].reverse()}
							</Shelf>
							<LoadingShelf title="Picked for you" />
							<AllStores />
						</>
					)}
				</Flex>
			</Layout.Content>
		</ConsumerShell>
	)
}
