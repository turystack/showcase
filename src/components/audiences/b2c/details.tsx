import {
	ChefHatIcon,
	ClockIcon,
	CoffeeIcon,
	EllipsisIcon,
	HeartIcon,
	InfoIcon,
	MinusIcon,
	PlusIcon,
	Share2Icon,
	ShoppingBagIcon,
	StarIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Image,
	Layout,
	List,
	Separator,
	Tabs,
	Typography,
} from '@turystack/react-web'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { DISHES, STORES } from '@/components/audiences/b2c/data'
import {
	SectionHeading,
	Shelf,
	StoreCard,
} from '@/components/audiences/b2c/parts'

/**
 * Reading one item, in the two shapes the references use.
 *
 * - `media-top` — a store: the banner across the top, the store's facts, a
 *   category row that stays on screen while the menu scrolls under it, and
 *   the cart in its own column that never scrolls away (delivery apps)
 * - `media-side` — a product, or any collection of items: the media beside
 *   the title, an action bar that stays on screen, then what it contains
 *   (a music app's album page, applied to a bundle)
 *
 * The staying-on-screen parts are real: the category row and the action bar
 * are sticky inside the scrolling pane, and the cart is a second pane with a
 * scroll of its own.
 */
export type DetailsVariant = 'media-top' | 'media-side'

const STORE = STORES[1]

const MENU = [
	{
		dishes: DISHES.slice(0, 2),
		id: 'popular',
		label: 'Most ordered',
	},
	{
		dishes: DISHES.slice(0, 5),
		id: 'pizzas',
		label: 'Pizzas',
	},
	{
		dishes: DISHES.slice(5),
		id: 'sweet',
		label: 'Sweet pizzas',
	},
]

function DishCard({ dish }: { dish: (typeof DISHES)[number] }) {
	return (
		<Card
			ariaLabel={dish.name}
			href={`#dish-${dish.id}`}
			size="sm"
		>
			<Card.Content>
				<Grid
					cols={3}
					gap="md"
				>
					<Grid.Item span={2}>
						<Flex
							align="stretch"
							direction="col"
							gap="xs"
						>
							<Flex
								align="center"
								gap="sm"
							>
								<Typography
									component="h3"
									size="sm"
									weight="semibold"
								>
									{dish.name}
								</Typography>
								{dish.tag && (
									<Badge
										size="sm"
										variant="secondary"
									>
										{dish.tag}
									</Badge>
								)}
							</Flex>
							<Typography
								component="p"
								size="xs"
								variant="muted"
							>
								{dish.description}
							</Typography>
							<Typography
								component="p"
								size="sm"
								weight="medium"
							>
								{dish.price}
							</Typography>
						</Flex>
					</Grid.Item>
					<Image
						alt={dish.name}
						fallback={<ChefHatIcon />}
						ratio="square"
						rounded="lg"
						src={dish.image}
					/>
				</Grid>
			</Card.Content>
		</Card>
	)
}

const CART = [
	{
		id: 'margherita',
		name: 'Margherita',
		note: 'Thin crust',
		price: 'R$ 54,90',
		quantity: 1,
	},
	{
		id: 'quatro-queijos',
		name: 'Quatro queijos',
		note: 'Half portion',
		price: 'R$ 31,45',
		quantity: 1,
	},
	{
		id: 'guarana',
		name: 'Guaraná 2 L',
		note: 'Cold',
		price: 'R$ 12,00',
		quantity: 2,
	},
]

function CartLine({ label, value }: { label: string; value: string }) {
	return (
		<Flex justify="between">
			<Typography
				component="span"
				size="sm"
				variant="muted"
			>
				{label}
			</Typography>
			<Typography
				component="span"
				size="sm"
			>
				{value}
			</Typography>
		</Flex>
	)
}

function CartAside() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="md"
		>
			<Flex
				align="center"
				justify="between"
			>
				<Typography
					component="h2"
					size="lg"
					weight="bold"
				>
					Your order
				</Typography>
				<Badge
					size="sm"
					variant="secondary"
				>
					4 items
				</Badge>
			</Flex>
			<Typography
				component="p"
				size="xs"
				variant="muted"
			>
				From {STORE.name}&nbsp;· {STORE.eta}
			</Typography>
			<List
				divided
				gap="sm"
				itemKey="id"
				items={CART}
				renderItem={(line) => (
					<Flex
						align="center"
						gap="sm"
					>
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
									weight="medium"
								>
									{line.name}
								</Typography>
								<Typography
									component="p"
									size="xs"
									variant="muted"
								>
									{line.note}&nbsp;· {line.price}
								</Typography>
							</Flex>
						</Box>
						<Flex
							align="center"
							gap="xs"
						>
							<Button
								ariaLabel={`One less ${line.name}`}
								size="icon-xs"
								variant="outline"
							>
								<MinusIcon size={12} />
							</Button>
							<Typography
								component="span"
								size="sm"
								weight="medium"
							>
								{line.quantity}
							</Typography>
							<Button
								ariaLabel={`One more ${line.name}`}
								size="icon-xs"
								variant="outline"
							>
								<PlusIcon size={12} />
							</Button>
						</Flex>
					</Flex>
				)}
			/>
			<Separator />
			<Flex
				align="stretch"
				direction="col"
				gap="xs"
			>
				<CartLine
					label="Subtotal"
					value="R$ 110,35"
				/>
				<CartLine
					label="Delivery"
					value="R$ 4,99"
				/>
				<CartLine
					label="Service fee"
					value="R$ 0,99"
				/>
			</Flex>
			<Separator />
			<Flex justify="between">
				<Typography
					component="span"
					weight="bold"
				>
					Total
				</Typography>
				<Typography
					component="span"
					weight="bold"
				>
					R$ 116,33
				</Typography>
			</Flex>
			<Button
				block
				leftSection={<ShoppingBagIcon size={16} />}
				size="lg"
			>
				Go to checkout
			</Button>
		</Flex>
	)
}

function StorePage() {
	return (
		<ConsumerShell>
			<Layout.Content span={3}>
				<Flex
					align="stretch"
					direction="col"
					gap="lg"
				>
					{/* The cover, decorative: the store's name is the heading below it. */}
					<Image
						alt=""
						fallback={<STORE.icon />}
						loading="eager"
						ratio="21/9"
						rounded="xl"
						src={STORE.image}
					/>
					<Flex
						align="start"
						gap="md"
						justify="between"
						wrap="wrap"
					>
						<Flex
							align="center"
							gap="md"
						>
							<Avatar
								alt={STORE.name}
								size="lg"
								variant="square"
							>
								{STORE.initials}
							</Avatar>
							<Flex
								align="stretch"
								direction="col"
								gap="xs"
							>
								<Typography
									component="h1"
									size="3xl"
									weight="bold"
								>
									{STORE.name}
								</Typography>
								<Flex
									align="center"
									gap="sm"
									wrap="wrap"
								>
									<Badge
										size="sm"
										variant="success"
									>
										Open until 23:30
									</Badge>
									<StarIcon size={14} />
									<Typography
										component="span"
										size="sm"
									>
										{STORE.rating} ({STORE.reviews} ratings)&nbsp;·{' '}
										{STORE.category}&nbsp;· {STORE.distance}
									</Typography>
								</Flex>
							</Flex>
						</Flex>
						<Flex
							align="center"
							gap="sm"
						>
							<Button
								leftSection={<HeartIcon size={16} />}
								size="sm"
								variant="outline"
							>
								Save
							</Button>
							<Button
								ariaLabel="Share"
								size="icon-sm"
								variant="outline"
							>
								<Share2Icon size={16} />
							</Button>
							<Button
								ariaLabel="Store information"
								size="icon-sm"
								variant="outline"
							>
								<InfoIcon size={16} />
							</Button>
						</Flex>
					</Flex>
					<Grid
						cols={3}
						gap="md"
					>
						<Card size="sm">
							<Card.Content>
								<Typography
									component="p"
									size="xs"
									variant="muted"
								>
									Delivery
								</Typography>
								<Typography
									component="p"
									size="sm"
									weight="semibold"
								>
									{STORE.eta}&nbsp;· {STORE.fee}
								</Typography>
							</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>
								<Typography
									component="p"
									size="xs"
									variant="muted"
								>
									Pickup
								</Typography>
								<Typography
									component="p"
									size="sm"
									weight="semibold"
								>
									Ready in 15 min · free
								</Typography>
							</Card.Content>
						</Card>
						<Card size="sm">
							<Card.Content>
								<Typography
									component="p"
									size="xs"
									variant="muted"
								>
									Minimum order
								</Typography>
								<Typography
									component="p"
									size="sm"
									weight="semibold"
								>
									R$ 30,00
								</Typography>
							</Card.Content>
						</Card>
					</Grid>
					{/* The category row sticks to the top of the scrolling pane. */}
					<Box
						bg="background"
						position="sticky"
					>
						<Tabs defaultValue="popular">
							<Tabs.List
								ariaLabel="Menu sections"
								block
							>
								{MENU.map((section) => (
									<Tabs.Trigger
										key={section.id}
										value={section.id}
									>
										{section.label}
									</Tabs.Trigger>
								))}
								<Tabs.Trigger value="drinks">Drinks</Tabs.Trigger>
							</Tabs.List>
						</Tabs>
					</Box>
					{MENU.map((section) => (
						<Flex
							align="stretch"
							direction="col"
							gap="md"
							key={section.id}
						>
							<SectionHeading title={section.label} />
							{/* Two columns only where the menu pane is wide enough for the photo. */}
							<Grid
								cols={{
									base: 1,
									xl: 2,
								}}
								gap="md"
							>
								{section.dishes.map((dish) => (
									<DishCard
										dish={dish}
										key={dish.id}
									/>
								))}
							</Grid>
						</Flex>
					))}
				</Flex>
			</Layout.Content>
			<Layout.Content
				bg="muted"
				span={1}
			>
				<CartAside />
			</Layout.Content>
		</ConsumerShell>
	)
}

const BOX_ITEMS = [
	{
		detail: 'Sourdough, 750 g',
		id: 'bread',
		name: 'Country loaf',
		quantity: '1',
	},
	{
		detail: 'Butter, baked this morning',
		id: 'croissant',
		name: 'Croissants',
		quantity: '4',
	},
	{
		detail: 'Minas cheese, 300 g',
		id: 'cheese',
		name: 'Queijo minas frescal',
		quantity: '1',
	},
	{
		detail: 'Pão de queijo, ready to bake',
		id: 'pao-de-queijo',
		name: 'Pão de queijo',
		quantity: '12',
	},
	{
		detail: 'Orange, pressed today, 1 L',
		id: 'juice',
		name: 'Orange juice',
		quantity: '1',
	},
	{
		detail: 'Guava, 250 g jar',
		id: 'goiabada',
		name: 'Goiabada cascão',
		quantity: '1',
	},
]

function ProductPage() {
	const aurora = STORES[0]

	return (
		<ConsumerShell>
			<Layout.Content maxWidth="lg">
				<Flex
					align="stretch"
					direction="col"
					gap="lg"
				>
					<Grid
						cols={5}
						gap="xl"
					>
						<Grid.Item span={2}>
							<Image
								alt="Weekend brunch box: bread, croissants, cheese and juice"
								fallback={<CoffeeIcon />}
								loading="eager"
								ratio="4/3"
								rounded="xl"
								src="/audiences/bundle-brunch.svg"
							/>
						</Grid.Item>
						<Grid.Item span={3}>
							<Flex
								align="start"
								direction="col"
								gap="sm"
							>
								<Badge
									size="sm"
									variant="secondary"
								>
									Bundle · serves 4
								</Badge>
								<Typography
									component="h1"
									size="5xl"
									weight="bold"
								>
									Weekend brunch box
								</Typography>
								<Flex
									align="center"
									gap="sm"
								>
									<Avatar
										alt={aurora.name}
										size="sm"
										variant="square"
									>
										{aurora.initials}
									</Avatar>
									<Typography
										component="span"
										size="sm"
										weight="semibold"
									>
										{aurora.name}&nbsp;·
									</Typography>
									<Typography
										component="span"
										size="sm"
										variant="muted"
									>
										6 items&nbsp;· ★ 4.9 (412)
									</Typography>
								</Flex>
								<Typography
									component="p"
									maxWidth="md"
									variant="muted"
								>
									Everything for a slow Saturday morning, baked at 6 and
									delivered warm. Order by Friday 22:00 for Saturday or Sunday
									delivery between 8:00 and 11:00.
								</Typography>
								<Flex
									align="center"
									gap="sm"
								>
									<Typography
										component="span"
										size="2xl"
										weight="bold"
									>
										R$ 89,90
									</Typography>
									<Badge
										size="sm"
										variant="success"
									>
										Save R$ 18,50
									</Badge>
								</Flex>
							</Flex>
						</Grid.Item>
					</Grid>
					{/* The action bar stays in view while the contents scroll. */}
					<Box
						bg="background"
						paddingY="sm"
						position="sticky"
					>
						<Flex
							align="center"
							block
							gap="sm"
						>
							<Button leftSection={<ShoppingBagIcon size={16} />}>
								Add to cart · R$ 89,90
							</Button>
							<Button
								ariaLabel="Save to favourites"
								size="icon-md"
								variant="outline"
							>
								<HeartIcon size={16} />
							</Button>
							<Button
								ariaLabel="Share"
								size="icon-md"
								variant="outline"
							>
								<Share2Icon size={16} />
							</Button>
							<Button
								ariaLabel="More options"
								size="icon-md"
								variant="ghost"
							>
								<EllipsisIcon size={16} />
							</Button>
							<Box grow />
							<Flex
								align="center"
								gap="xs"
							>
								<ClockIcon size={14} />
								<Typography
									component="span"
									size="sm"
									variant="muted"
								>
									Next delivery: Saturday, 8:00–11:00
								</Typography>
							</Flex>
						</Flex>
					</Box>
					<Flex
						align="stretch"
						direction="col"
						gap="sm"
					>
						<SectionHeading title="In the box" />
						<List
							divided
							itemKey="id"
							items={BOX_ITEMS}
							renderItem={(item, index) => (
								<Flex
									align="center"
									gap="lg"
								>
									<Typography
										component="span"
										size="sm"
										variant="muted"
									>
										{index + 1}
									</Typography>
									<Box grow>
										<Typography
											component="p"
											size="sm"
											weight="semibold"
										>
											{item.name}
										</Typography>
										<Typography
											component="p"
											size="xs"
											variant="muted"
										>
											{item.detail}
										</Typography>
									</Box>
									<Typography
										component="span"
										size="sm"
									>
										× {item.quantity}
									</Typography>
								</Flex>
							)}
						/>
					</Flex>
					<Shelf title="You might also like">
						{STORES.map((store) => (
							<StoreCard
								key={store.id}
								store={store}
							/>
						))}
					</Shelf>
				</Flex>
			</Layout.Content>
		</ConsumerShell>
	)
}

export function Details({ variant }: { variant: DetailsVariant }) {
	return variant === 'media-side' ? <ProductPage /> : <StorePage />
}
