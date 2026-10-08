import { HeartFilledIcon, HeartIcon, StarIcon } from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Carousel,
	type CarouselPerViewResponsive,
	type CarouselResponsiveTo,
	Flex,
	Image,
	Typography,
} from '@turystack/react-web'
import type { ReactNode } from 'react'

import type { Store } from '@/components/audiences/b2c/data'

/**
 * The pieces every B2C screen repeats: the store card and row, and the shelf.
 *
 * Photos are `Image` with the store's `image` URL. The showcase ships no
 * photos, so every frame shows the stand-in — the store's category glyph on a
 * muted surface, in the photo's own ratio — which is also what a real product
 * shows when a file is missing.
 */

/**
 * Rating, time and fee — the three numbers a delivery shopper decides on.
 *
 * Each fact is an unbreakable segment and carries the separator that follows
 * it, so when the line wraps the dot stays at the end of a line and the next
 * line starts with a fact, never with "·".
 */
export function StoreFacts({ store }: { store: Store }) {
	const facts = [
		`(${store.reviews})`,
		store.eta,
		store.fee === 'Free' ? 'Free delivery' : store.fee,
	]

	return (
		<Flex
			align="center"
			gap="xs"
			wrap="wrap"
		>
			<StarIcon size={12} />
			<Typography
				component="span"
				noWrap
				size="xs"
				weight="medium"
			>
				{store.rating}
			</Typography>
			{facts.map((fact, index) => (
				<Typography
					component="span"
					key={fact}
					noWrap
					size="xs"
					variant="muted"
				>
					{index < facts.length - 1 ? `${fact} ·` : fact}
				</Typography>
			))}
		</Flex>
	)
}

export function FavouriteButton({
	name,
	saved = false,
}: {
	name: string
	saved?: boolean
}) {
	return (
		<Button
			ariaLabel={saved ? `Remove ${name} from favourites` : `Save ${name}`}
			size="icon-sm"
			variant="ghost"
		>
			{saved ? <HeartFilledIcon size={16} /> : <HeartIcon size={16} />}
		</Button>
	)
}

type StoreHeadingLevel = 'h2' | 'h3'

/**
 * Image first: the grid card of a store. The card is a link into the store;
 * the favourite button sits above that link and acts on its own.
 */
export function StoreCard({
	store,
	saved,
	headingLevel = 'h3',
}: {
	store: Store
	saved?: boolean
	/** h3 under a shelf's h2; h2 where the stores sit straight under the page's h1. */
	headingLevel?: StoreHeadingLevel
}) {
	return (
		<Card
			ariaLabel={store.name}
			href="#"
			size="sm"
		>
			<Card.Content>
				<Flex
					align="stretch"
					direction="col"
					gap="sm"
				>
					<Image
						alt={store.name}
						fallback={<store.icon />}
						ratio="16/9"
						rounded="lg"
						src={store.image}
					/>
					<Flex
						align="start"
						gap="xs"
						justify="between"
					>
						<Box
							grow
							overflow="hidden"
						>
							<Flex
								align="stretch"
								direction="col"
								gap="xs"
							>
								<Typography
									component={headingLevel}
									size="sm"
									truncate
									weight="semibold"
								>
									{store.name}
								</Typography>
								<StoreFacts store={store} />
							</Flex>
						</Box>
						<FavouriteButton
							name={store.name}
							saved={saved}
						/>
					</Flex>
					{/* Every card has the same three lines, so a shelf of them lines up. */}
					{store.promo ? (
						<Flex>
							<Badge
								size="sm"
								variant="success"
							>
								{store.promo}
							</Badge>
						</Flex>
					) : (
						<Typography
							component="span"
							size="xs"
							variant="muted"
						>
							{store.category}&nbsp;· {store.distance}
						</Typography>
					)}
				</Flex>
			</Card.Content>
		</Card>
	)
}

/** The same store as a row: logo, name, facts, and the distance on the right. */
export function StoreRow({
	store,
	saved,
	headingLevel = 'h3',
}: {
	store: Store
	saved?: boolean
	/** h3 under a shelf's h2; h2 where the stores sit straight under the page's h1. */
	headingLevel?: StoreHeadingLevel
}) {
	return (
		<Card
			ariaLabel={store.name}
			href="#"
			size="sm"
		>
			<Card.Content>
				<Flex
					align="center"
					gap="md"
				>
					<Avatar
						alt={store.name}
						size="lg"
						variant="square"
					>
						{store.initials}
					</Avatar>
					<Box
						grow
						overflow="hidden"
					>
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
									component={headingLevel}
									size="sm"
									truncate
									weight="semibold"
								>
									{store.name}
								</Typography>
								{store.promo && (
									<Badge
										size="sm"
										variant="success"
									>
										{store.promo}
									</Badge>
								)}
							</Flex>
							<Typography
								component="span"
								size="xs"
								variant="muted"
							>
								{store.category}&nbsp;· {store.distance}
							</Typography>
							<StoreFacts store={store} />
						</Flex>
					</Box>
					<FavouriteButton
						name={store.name}
						saved={saved}
					/>
				</Flex>
			</Card.Content>
		</Card>
	)
}

/** Title on the left, the way into the whole set on the right. */
export function SectionHeading({
	title,
	subtitle,
	action,
}: {
	title: string
	subtitle?: string
	action?: ReactNode
}) {
	return (
		<Flex
			align="center"
			gap="md"
			justify="between"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="none"
			>
				<Typography
					component="h2"
					size="xl"
					weight="bold"
				>
					{title}
				</Typography>
				{subtitle && (
					<Typography
						component="p"
						size="sm"
						variant="muted"
					>
						{subtitle}
					</Typography>
				)}
			</Flex>
			{action}
		</Flex>
	)
}

/**
 * How many cards a shelf shows, by viewport: one on a phone, two from 640px,
 * three from 1024px, four from 1280px. A card never gets narrower than its
 * name and its three facts need.
 */
export const SHELF_PER_VIEW: CarouselPerViewResponsive = {
	base: 1,
	lg: 3,
	sm: 2,
	xl: 4,
}

/**
 * The same shelf measured on its own width (`responsiveTo="container"`), for a
 * shelf narrower than the screen — beside a sidebar. Two cards from 640px of
 * shelf, three from 768px, four from 1280px: never under 256px a card.
 */
export const SHELF_PER_CONTAINER: CarouselPerViewResponsive = {
	base: 1,
	md: 3,
	sm: 2,
	xl: 4,
}

/**
 * A shelf: a titled row that scrolls sideways, with "See all" into the full
 * list. The arrows are the carousel's own, in the margin either side of the
 * track; the `paddingX` on the box is that margin.
 */
export function Shelf({
	title,
	subtitle,
	perView = SHELF_PER_VIEW,
	responsiveTo,
	children,
}: {
	title: string
	subtitle?: string
	perView?: CarouselPerViewResponsive
	/** Whose width `perView` measures: the screen (default) or the shelf. */
	responsiveTo?: CarouselResponsiveTo
	children: ReactNode[]
}) {
	return (
		<Box paddingX="lg">
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<SectionHeading
					action={
						<Button
							href="#"
							size="sm"
							variant="link"
						>
							See all
						</Button>
					}
					subtitle={subtitle}
					title={title}
				/>
				<Carousel
					ariaLabel={title}
					perView={perView}
					responsiveTo={responsiveTo}
				>
					<Carousel.Content>
						{children.map((child, index) => (
							// Shelves are static lists; the position is the identity.
							// biome-ignore lint/suspicious/noArrayIndexKey: static content
							<Carousel.Item key={index}>
								{/* Room for the card's ring, which the track would clip. */}
								<Box padding="xs">{child}</Box>
							</Carousel.Item>
						))}
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel>
			</Flex>
		</Box>
	)
}
