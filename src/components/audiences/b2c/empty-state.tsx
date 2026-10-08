import {
	CircleCheckIcon,
	MapPinIcon,
	ReceiptIcon,
	SearchIcon,
	ShoppingBagIcon,
} from '@turystack/react-icons'
import {
	Button,
	Checklist,
	EmptyState as EmptyStateBlock,
	FilterBar,
	FilterChip,
	Flex,
	Layout,
	Page,
	Typography,
} from '@turystack/react-web'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { CATEGORIES } from '@/components/audiences/b2c/data'

/**
 * A page with nothing to show, and the five different reasons for it. Each
 * says what is missing before it offers the way out, and the way out is
 * specific to the reason.
 *
 * - `empty` — nothing yet: no orders, so go and order
 * - `first-run` — a new account, before the first order: a short setup
 *   list instead of an empty Home
 * - `no-results` — a search that matched nothing: loosen it or try another
 * - `cleared` — nothing left, and that is good news: every notification read
 * - `out-of-area` — the product is fine, the address is not served
 */
export type EmptyStateVariant =
	| 'empty'
	| 'first-run'
	| 'no-results'
	| 'cleared'
	| 'out-of-area'

function Orders() {
	return (
		<Page>
			<Page.Header title="Orders" />
			<Page.Content>
				<EmptyStateBlock
					action={
						<Button
							href="#"
							leftSection={<ShoppingBagIcon size={16} />}
						>
							Browse stores
						</Button>
					}
					bordered="dashed"
					description="Your first order shows up here, with its status while it is on the way and a receipt once it arrives."
					headingLevel={2}
					icon={<ReceiptIcon />}
					size="lg"
					title="No orders yet"
				/>
			</Page.Content>
		</Page>
	)
}

function FirstRun() {
	return (
		<Page>
			<Page.Header
				description="Three things, and your first order arrives in about half an hour."
				title="Welcome to Acme, Marina"
			/>
			<Page.Content>
				<Checklist
					items={[
						{
							description: 'We only show stores that deliver to it.',
							done: true,
							id: 'address',
							label: 'Add your delivery address',
						},
						{
							action: (
								<Button
									size="sm"
									variant="outline"
								>
									Add payment
								</Button>
							),
							description: 'PIX or a card, so checkout is one tap.',
							done: false,
							id: 'payment',
							label: 'Choose how to pay',
						},
						{
							action: (
								<Button
									size="sm"
									variant="outline"
								>
									Pick favourites
								</Button>
							),
							description: 'So the Home starts with what you like.',
							done: false,
							id: 'tastes',
							label: 'Tell us what you like',
						},
						{
							action: <Button size="sm">Use R$ 15 off</Button>,
							description: 'R$ 15 off your first order over R$ 40.',
							done: false,
							id: 'order',
							label: 'Place your first order',
						},
					]}
					title="Get set up"
				/>
				<Flex
					align="stretch"
					direction="col"
					gap="sm"
				>
					<Typography
						component="h2"
						size="lg"
						weight="bold"
					>
						Or start from a craving
					</Typography>
					<Flex
						gap="sm"
						wrap="wrap"
					>
						{CATEGORIES.slice(0, 8).map((category) => (
							<Button
								key={category.id}
								leftSection={<category.icon size={16} />}
								size="sm"
								variant="outline"
							>
								{category.label}
							</Button>
						))}
					</Flex>
				</Flex>
			</Page.Content>
		</Page>
	)
}

function NoResults() {
	return (
		<Page>
			<Page.Header
				description="0 stores deliver this to Rua Harmonia, 412"
				title="Results for “vegan ramen”"
			/>
			<Page.Toolbar>
				<FilterBar onClear={() => undefined}>
					<FilterChip
						label="Delivery time"
						onRemove={() => undefined}
						value="Under 20 min"
					/>
					<FilterChip
						label="Rating"
						onRemove={() => undefined}
						value="4.8+"
					/>
					<FilterChip
						label="Delivery fee"
						onRemove={() => undefined}
						value="Free"
					/>
				</FilterBar>
			</Page.Toolbar>
			<Page.Content>
				<EmptyStateBlock
					action={
						<Flex
							gap="sm"
							justify="center"
							wrap="wrap"
						>
							<Button>Clear the 3 filters</Button>
							<Button variant="outline">Search “ramen”</Button>
						</Flex>
					}
					description="Three filters are narrowing this down. Without them, 4 stores near you make ramen, and 2 have vegan options."
					headingLevel={2}
					icon={<SearchIcon />}
					size="lg"
					title="Nothing matches all of that"
				/>
			</Page.Content>
		</Page>
	)
}

function Cleared() {
	return (
		<Page>
			<Page.Header title="Notifications" />
			<Page.Content>
				<EmptyStateBlock
					action={<Button variant="outline">See earlier notifications</Button>}
					description="Everything here is read. New order updates and offers will show up as they happen."
					headingLevel={2}
					icon={<CircleCheckIcon />}
					size="lg"
					title="You’re all caught up"
				/>
			</Page.Content>
		</Page>
	)
}

function OutOfArea() {
	return (
		<EmptyStateBlock
			action={
				<Flex
					gap="sm"
					justify="center"
					wrap="wrap"
				>
					<Button>Change address</Button>
					<Button variant="outline">Tell me when you arrive</Button>
				</Flex>
			}
			description="Acme doesn’t deliver to Rua das Palmeiras, 90 — Ilhabela yet. Pickup still works at stores in São Sebastião, 18 km away."
			headingLevel={1}
			icon={<MapPinIcon />}
			size="lg"
			title="We’re not in your area yet"
		/>
	)
}

export function EmptyState({ variant }: { variant: EmptyStateVariant }) {
	const active =
		variant === 'empty'
			? 'orders'
			: variant === 'no-results'
				? 'search'
				: 'home'

	return (
		<ConsumerShell active={active}>
			<Layout.Content maxWidth={variant === 'out-of-area' ? 'sm' : 'md'}>
				{variant === 'empty' && <Orders />}
				{variant === 'first-run' && <FirstRun />}
				{variant === 'no-results' && <NoResults />}
				{variant === 'cleared' && <Cleared />}
				{variant === 'out-of-area' && <OutOfArea />}
			</Layout.Content>
		</ConsumerShell>
	)
}
