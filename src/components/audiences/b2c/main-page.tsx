import { Grid2x2Icon, ListIcon, StoreIcon } from '@turystack/react-icons'
import {
	Button,
	FilterBar,
	FilterChip,
	Flex,
	Grid,
	Layout,
	List,
	Page,
	Radio,
	Toggle,
	Typography,
} from '@turystack/react-web'
import { useState } from 'react'

import { ConsumerShell } from '@/components/audiences/b2c/app-shell'
import { STORES } from '@/components/audiences/b2c/data'
import {
	SHELF_PER_VIEW,
	StoreCard,
	StoreRow,
} from '@/components/audiences/b2c/parts'

/**
 * The page a section opens on: one collection of stores, never a table.
 *
 * The two variants are the two views of the same page, and the page carries
 * the toggle between them — a shopper switches, so the product must let them.
 * The variant only decides which view it opens on.
 *
 * - `grid` — image-first cards, four across: name, rating, time, fee and a
 *   favourite on every one
 * - `list` — the same stores as rows, logo and facts side by side, for
 *   scanning more of them at once
 *
 * Attribute filters sit above the collection as chips; each opens its picker
 * in place, and an active one reads "Label: value".
 */
export type MainPageVariant = 'grid' | 'list'

const SAVED = new Set([
	'aurora',
	'grao',
])

function SortPicker() {
	return (
		<Radio.Group
			ariaLabel="Sort by"
			defaultValue="recommended"
			items={[
				{
					label: 'Recommended',
					value: 'recommended',
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
					label: 'Lowest fee',
					value: 'fee',
				},
			]}
		/>
	)
}

function Collection({ initial }: { initial: MainPageVariant }) {
	const [view, setView] = useState<MainPageVariant>(initial)

	return (
		<Page>
			<Page.Header
				action={
					<Toggle.Group
						ariaLabel="View"
						mode="single"
						onChange={(value) => {
							const next = value[0]
							if (next === 'grid' || next === 'list') {
								setView(next)
							}
						}}
						value={[
							view,
						]}
						variant="outline"
					>
						<Toggle
							ariaLabel="Grid"
							value="grid"
						>
							<Grid2x2Icon size={16} />
						</Toggle>
						<Toggle
							ariaLabel="List"
							value="list"
						>
							<ListIcon size={16} />
						</Toggle>
					</Toggle.Group>
				}
				breadcrumbs={[
					{
						href: '#',
						label: 'Home',
					},
					{
						label: 'Restaurants',
					},
				]}
				description="86 open now, delivering to Rua Harmonia, 412"
				icon={<StoreIcon size={18} />}
				title="Restaurants"
			/>
			<Page.Toolbar>
				<FilterBar onClear={() => undefined}>
					<FilterChip
						label="Sort"
						value="Recommended"
					>
						<SortPicker />
					</FilterChip>
					<FilterChip
						label="Rating"
						onRemove={() => undefined}
						value="4.5+"
					/>
					<FilterChip label="Free delivery" />
					<FilterChip label="Under 30 min" />
					<FilterChip label="Offers" />
					<FilterChip label="Price" />
				</FilterBar>
			</Page.Toolbar>
			<Page.Content>
				{view === 'grid' ? (
					<Grid
						cols={SHELF_PER_VIEW}
						gap="md"
					>
						{STORES.map((store) => (
							<StoreCard
								headingLevel="h2"
								key={store.id}
								saved={SAVED.has(store.id)}
								store={store}
							/>
						))}
					</Grid>
				) : (
					<List
						gap="sm"
						itemKey="id"
						items={STORES}
						renderItem={(store) => (
							<StoreRow
								headingLevel="h2"
								saved={SAVED.has(store.id)}
								store={store}
							/>
						)}
					/>
				)}
				<Flex
					align="center"
					direction="col"
					gap="sm"
				>
					<Typography
						component="p"
						size="sm"
						variant="muted"
					>
						Showing 8 of 86
					</Typography>
					<Button variant="outline">Show more stores</Button>
				</Flex>
			</Page.Content>
		</Page>
	)
}

export function MainPage({ variant }: { variant: MainPageVariant }) {
	return (
		<ConsumerShell>
			<Layout.Content maxWidth="lg">
				{/* Keyed by the variant, so picking one re-opens the page on it. */}
				<Collection
					initial={variant}
					key={variant}
				/>
			</Layout.Content>
		</ConsumerShell>
	)
}
