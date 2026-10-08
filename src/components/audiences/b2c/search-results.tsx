import {
	HistoryIcon,
	PlusIcon,
	SlidersHorizontalIcon,
} from '@turystack/react-icons'
import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Checkbox,
	Flex,
	Grid,
	Image,
	Layout,
	List,
	Radio,
	Separator,
	Sheet,
	Slider,
	Switch,
	Tag,
	Toggle,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { CATEGORIES, DISHES, STORES } from '@/components/audiences/b2c/data'
import {
	SectionHeading,
	SHELF_PER_VIEW,
	StoreCard,
	StoreFacts,
	StoreRow,
} from '@/components/audiences/b2c/parts'

/**
 * Search, before and after the query.
 *
 * - `categories` — the field is empty: recent searches, and every category
 *   as a tile to browse by instead of typing
 * - `top-result` — "pizza": the best match large, the dishes beside it, and
 *   the rest grouped by kind under a row of scope chips
 * - `sidebar-filters` — the same results as a list, filters in a column of
 *   their own beside it, always open; the desktop pattern
 * - `sheet-filters` — the filters behind one button, in a sheet; the same
 *   page collapsed for a narrow screen
 */
export type SearchResultsVariant =
	| 'categories'
	| 'top-result'
	| 'sidebar-filters'
	| 'sheet-filters'

const QUERY = 'pizza'

const PIZZA_STORES = STORES.filter((store) =>
	[
		'forno',
		'brasa',
		'mercado',
		'aurora',
	].includes(store.id),
)

const TOP = STORES[1]

function ScopeChips() {
	const [scope, setScope] = useState([
		'all',
	])

	return (
		<Flex
			align="center"
			gap="sm"
			justify="between"
			wrap="wrap"
		>
			<Toggle.Group
				ariaLabel="Show"
				mode="single"
				onChange={(value) => {
					if (value.length > 0) {
						setScope(value)
					}
				}}
				size="sm"
				value={scope}
				variant="outline"
			>
				<Toggle value="all">All</Toggle>
				<Toggle value="stores">Stores</Toggle>
				<Toggle value="dishes">Dishes</Toggle>
				<Toggle value="grocery">Grocery</Toggle>
				<Toggle value="offers">Offers</Toggle>
			</Toggle.Group>
		</Flex>
	)
}

function ResultsHeading({ count }: { count: number }) {
	return (
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
				Results for “{QUERY}”
			</Typography>
			<Typography
				component="p"
				size="sm"
				variant="muted"
			>
				{count} stores and 140 dishes deliver to Rua Harmonia, 412
			</Typography>
		</Flex>
	)
}

function Filters() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="lg"
		>
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Typography
					component="h3"
					size="sm"
					weight="semibold"
				>
					Sort by
				</Typography>
				<Radio.Group
					ariaLabel="Sort by"
					defaultValue="relevance"
					items={[
						{
							label: 'Relevance',
							value: 'relevance',
						},
						{
							label: 'Fastest delivery',
							value: 'fastest',
						},
						{
							label: 'Highest rated',
							value: 'rating',
						},
						{
							label: 'Distance',
							value: 'distance',
						},
					]}
				/>
			</Flex>
			<Separator />
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Typography
					component="h3"
					size="sm"
					weight="semibold"
				>
					Delivery
				</Typography>
				<Switch
					defaultChecked
					label="Free delivery"
				/>
				<Switch label="Pickup available" />
			</Flex>
			<Separator />
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Typography
					component="h3"
					size="sm"
					weight="semibold"
				>
					Delivery time
				</Typography>
				{/* The value row follows the thumb, and the thumb speaks the unit. */}
				<Slider
					ariaLabel="Delivery time"
					defaultValue={40}
					formatValue={(minutes) => `Up to ${minutes} min`}
					max={60}
					min={10}
					mode="single"
					orientation="horizontal"
					showValue
					step={5}
				/>
			</Flex>
			<Separator />
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Typography
					component="h3"
					size="sm"
					weight="semibold"
				>
					Rating
				</Typography>
				<Radio.Group
					ariaLabel="Rating"
					defaultValue="4.5"
					items={[
						{
							label: 'Any rating',
							value: 'any',
						},
						{
							label: '4.0 and up',
							value: '4.0',
						},
						{
							label: '4.5 and up',
							value: '4.5',
						},
					]}
				/>
			</Flex>
			<Separator />
			<Flex
				align="stretch"
				direction="col"
				gap="sm"
			>
				<Typography
					component="h3"
					size="sm"
					weight="semibold"
				>
					Dietary
				</Typography>
				<Checkbox.Group
					ariaLabel="Dietary"
					defaultValue={[
						'vegetarian',
					]}
					items={[
						{
							label: 'Vegetarian',
							value: 'vegetarian',
						},
						{
							label: 'Vegan',
							value: 'vegan',
						},
						{
							label: 'Gluten-free',
							value: 'gluten-free',
						},
						{
							label: 'Lactose-free',
							value: 'lactose-free',
						},
					]}
				/>
			</Flex>
		</Flex>
	)
}

function DishRow({ dish }: { dish: (typeof DISHES)[number] }) {
	return (
		<Flex
			align="center"
			gap="sm"
		>
			<Avatar
				alt={dish.name}
				size="lg"
				variant="square"
			>
				{dish.name.slice(0, 2)}
			</Avatar>
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
						{dish.name}
					</Typography>
					<Typography
						component="p"
						size="xs"
						truncate
						variant="muted"
					>
						{dish.store}&nbsp;· {dish.price}
					</Typography>
				</Flex>
			</Box>
			<Button
				ariaLabel={`Add ${dish.name}`}
				size="icon-sm"
				variant="outline"
			>
				<PlusIcon size={16} />
			</Button>
		</Flex>
	)
}

function TopResult() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="xl"
		>
			<ResultsHeading count={24} />
			<ScopeChips />
			<Grid
				cols={5}
				gap="lg"
			>
				<Grid.Item span={2}>
					<Flex
						align="stretch"
						direction="col"
						gap="sm"
					>
						<Typography
							component="h2"
							size="xl"
							weight="bold"
						>
							Top result
						</Typography>
						<Card
							ariaLabel={TOP.name}
							href="#"
						>
							<Card.Content>
								<Flex
									align="stretch"
									direction="col"
									gap="md"
								>
									<Image
										alt={TOP.name}
										fallback={<TOP.icon />}
										ratio="16/9"
										rounded="lg"
										src={TOP.image}
									/>
									<Flex
										align="stretch"
										direction="col"
										gap="xs"
									>
										<Typography
											component="h3"
											size="2xl"
											weight="bold"
										>
											{TOP.name}
										</Typography>
										<Flex
											align="center"
											gap="sm"
										>
											<Badge
												size="sm"
												variant="secondary"
											>
												Store
											</Badge>
											<StoreFacts store={TOP} />
										</Flex>
									</Flex>
									<Flex>
										<Button href="#">View menu</Button>
									</Flex>
								</Flex>
							</Card.Content>
						</Card>
					</Flex>
				</Grid.Item>
				<Grid.Item span={3}>
					<Flex
						align="stretch"
						direction="col"
						gap="sm"
					>
						<SectionHeading
							action={
								<Button
									href="#"
									size="sm"
									variant="link"
								>
									See all dishes
								</Button>
							}
							title="Dishes"
						/>
						<List
							divided
							gap="sm"
							itemKey="id"
							items={DISHES.slice(0, 4)}
							renderItem={(dish) => <DishRow dish={dish} />}
						/>
					</Flex>
				</Grid.Item>
			</Grid>
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
							See all stores
						</Button>
					}
					title="Stores"
				/>
				<Grid
					cols={SHELF_PER_VIEW}
					gap="md"
				>
					{PIZZA_STORES.map((store) => (
						<StoreCard
							key={store.id}
							store={store}
						/>
					))}
				</Grid>
			</Flex>
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<SectionHeading title="Offers" />
				<Grid
					cols={2}
					gap="md"
				>
					{PIZZA_STORES.filter((store) => store.promo).map((store) => (
						<StoreRow
							key={store.id}
							store={store}
						/>
					))}
				</Grid>
			</Flex>
		</Flex>
	)
}

const RECENT_SEARCHES = [
	'pizza margherita',
	'açaí',
	'Padaria Aurora',
	'sushi combo',
	'pharmacy',
]

function Categories() {
	// Each recent search is a Tag: its × is a real button that takes the term
	// off the list, and Clear empties it.
	const [recent, setRecent] = useState(RECENT_SEARCHES)

	return (
		<Flex
			align="stretch"
			direction="col"
			gap="xl"
		>
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
					Search
				</Typography>
				<Typography
					component="p"
					size="sm"
					variant="muted"
				>
					Stores, dishes and groceries that deliver to Rua Harmonia, 412
				</Typography>
			</Flex>
			{recent.length > 0 && (
				<Flex
					align="stretch"
					direction="col"
					gap="sm"
				>
					<SectionHeading
						action={
							<Button
								onClick={() => setRecent([])}
								size="sm"
								variant="link"
							>
								Clear
							</Button>
						}
						title="Recent searches"
					/>
					<Flex
						gap="sm"
						wrap="wrap"
					>
						{recent.map((term) => (
							<Tag
								icon={<HistoryIcon size={14} />}
								key={term}
								onRemove={() =>
									setRecent((terms) => terms.filter((item) => item !== term))
								}
							>
								{term}
							</Tag>
						))}
					</Flex>
				</Flex>
			)}
			<Flex
				align="stretch"
				direction="col"
				gap="md"
			>
				<SectionHeading title="Browse all" />
				<Grid
					cols={4}
					gap="md"
				>
					{CATEGORIES.map((category) => (
						<Card
							ariaLabel={category.label}
							href={`#category-${category.id}`}
							key={category.id}
						>
							<Card.Content>
								<Flex
									align="center"
									gap="md"
									justify="between"
								>
									<Typography
										component="h3"
										size="lg"
										weight="bold"
									>
										{category.label}
									</Typography>
									<category.icon size={40} />
								</Flex>
							</Card.Content>
						</Card>
					))}
				</Grid>
			</Flex>
		</Flex>
	)
}

function ResultList() {
	return (
		<Flex
			align="stretch"
			direction="col"
			gap="sm"
		>
			<SectionHeading title="Stores" />
			<List
				gap="sm"
				itemKey="id"
				items={PIZZA_STORES}
				renderItem={(store) => <StoreRow store={store} />}
			/>
		</Flex>
	)
}

function SheetFilters() {
	const [open, setOpen] = useState(true)

	return (
		<Flex
			align="stretch"
			direction="col"
			gap="lg"
		>
			<ResultsHeading count={24} />
			<Flex
				align="center"
				gap="sm"
				wrap="wrap"
			>
				<Button
					leftSection={<SlidersHorizontalIcon size={16} />}
					onClick={() => setOpen(true)}
					size="sm"
					variant="outline"
				>
					Filters · 3
				</Button>
				<ScopeChips />
			</Flex>
			<SectionHeading title="Stores" />
			<Grid
				cols={SHELF_PER_VIEW}
				gap="md"
			>
				{PIZZA_STORES.map((store) => (
					<StoreCard
						key={store.id}
						store={store}
					/>
				))}
			</Grid>
			<Sheet
				onChange={setOpen}
				open={open}
				side="right"
			>
				<Sheet.Header
					bordered
					closable
				>
					<Sheet.Header.Title>Filters</Sheet.Header.Title>
					<Sheet.Header.Description>
						24 stores match right now
					</Sheet.Header.Description>
				</Sheet.Header>
				<Sheet.Body>
					<Filters />
				</Sheet.Body>
				<Sheet.Footer bordered>
					<Flex
						block
						gap="sm"
						justify="between"
					>
						<Button variant="ghost">Clear all</Button>
						<Button onClick={() => setOpen(false)}>Show 24 stores</Button>
					</Flex>
				</Sheet.Footer>
			</Sheet>
		</Flex>
	)
}

export function SearchResults({ variant }: { variant: SearchResultsVariant }) {
	if (variant === 'sidebar-filters') {
		// The page's h1 comes first in the source and spans both columns, so the
		// filters' own heading reads as a section of the results page, not
		// before it.
		return (
			<ConsumerShell
				active="search"
				query={QUERY}
			>
				<Layout.Content maxWidth="lg">
					<Flex
						align="stretch"
						direction="col"
						gap="lg"
					>
						<ResultsHeading count={24} />
						<Grid
							align="start"
							cols={{
								base: 1,
								md: 4,
							}}
							gap="lg"
						>
							<Card size="sm">
								<Card.Content>
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
												Filters
											</Typography>
											<Button
												size="sm"
												variant="link"
											>
												Clear all
											</Button>
										</Flex>
										<Filters />
									</Flex>
								</Card.Content>
							</Card>
							<Grid.Item
								span={{
									base: 1,
									md: 3,
								}}
							>
								<Flex
									align="stretch"
									direction="col"
									gap="lg"
								>
									<ScopeChips />
									<ResultList />
								</Flex>
							</Grid.Item>
						</Grid>
					</Flex>
				</Layout.Content>
			</ConsumerShell>
		)
	}

	return (
		<ConsumerShell
			active="search"
			query={variant === 'categories' ? undefined : QUERY}
		>
			<Layout.Content maxWidth="lg">
				{variant === 'categories' && <Categories />}
				{variant === 'top-result' && <TopResult />}
				{variant === 'sheet-filters' && <SheetFilters />}
			</Layout.Content>
		</ConsumerShell>
	)
}
