import {
	ChefHatIcon,
	CoffeeIcon,
	DonutIcon,
	FlameIcon,
	type IconComponent,
	LeafIcon,
	PillIcon,
	ShoppingBasketIcon,
	SnowflakeIcon,
	SoupIcon,
	WineIcon,
} from '@turystack/react-icons'

/**
 * The catalogue every B2C screen draws from: one neighbourhood of stores, so
 * the Home, the list, the search and the store page all describe the same
 * place and a reader can follow one store from shelf to checkout.
 */

export type Store = {
	category: string
	/** Delivery fee, already formatted; `Free` is a value, not a missing one. */
	fee: string
	icon: IconComponent
	id: string
	/**
	 * The store's cover. Some stores carry a small original illustration from
	 * `public/audiences/`; the rest stay empty on purpose, so the same shelf
	 * shows `Image` loaded and its stand-in in the photo's frame side by side.
	 */
	image: string
	initials: string
	/** Minutes, as the range the product quotes. */
	eta: string
	distance: string
	name: string
	promo?: string
	rating: string
	reviews: string
}

export const STORES: Store[] = [
	{
		category: 'Bakery',
		distance: '0.8 km',
		eta: '15–25 min',
		fee: 'Free',
		icon: CoffeeIcon,
		id: 'aurora',
		image: '/audiences/store-bakery.svg',
		initials: 'PA',
		name: 'Padaria Aurora',
		promo: '20% off breakfast',
		rating: '4.9',
		reviews: '2.1k',
	},
	{
		category: 'Pizza',
		distance: '1.4 km',
		eta: '25–35 min',
		fee: 'R$ 4,99',
		icon: ChefHatIcon,
		id: 'forno',
		image: '/audiences/store-pizza.svg',
		initials: 'FV',
		name: 'Forno Vila Madalena',
		rating: '4.8',
		reviews: '3.4k',
	},
	{
		category: 'Japanese',
		distance: '2.1 km',
		eta: '35–45 min',
		fee: 'R$ 6,90',
		icon: SoupIcon,
		id: 'kaizen',
		image: '',
		initials: 'KS',
		name: 'Kaizen Sushi Bar',
		promo: 'Free delivery over R$ 80',
		rating: '4.7',
		reviews: '1.8k',
	},
	{
		category: 'Healthy',
		distance: '0.6 km',
		eta: '10–20 min',
		fee: 'R$ 2,99',
		icon: LeafIcon,
		id: 'verde',
		image: '',
		initials: 'VV',
		name: 'Verde Vivo Saladas',
		rating: '4.6',
		reviews: '940',
	},
	{
		category: 'Burgers',
		distance: '1.9 km',
		eta: '30–40 min',
		fee: 'Free',
		icon: FlameIcon,
		id: 'brasa',
		image: '/audiences/store-burger.svg',
		initials: 'BB',
		name: 'Brasa Burger Co.',
		promo: 'Combo for R$ 39,90',
		rating: '4.5',
		reviews: '5.2k',
	},
	{
		category: 'Coffee',
		distance: '0.4 km',
		eta: '10–15 min',
		fee: 'R$ 1,99',
		icon: CoffeeIcon,
		id: 'grao',
		image: '/audiences/store-cafe.svg',
		initials: 'GT',
		name: 'Grão Torrado Café',
		rating: '4.9',
		reviews: '760',
	},
	{
		category: 'Desserts',
		distance: '2.6 km',
		eta: '30–45 min',
		fee: 'R$ 5,49',
		icon: DonutIcon,
		id: 'doce',
		image: '/audiences/store-sweets.svg',
		initials: 'DM',
		name: 'Doce Maria Confeitaria',
		rating: '4.8',
		reviews: '1.1k',
	},
	{
		category: 'Grocery',
		distance: '1.1 km',
		eta: '20–30 min',
		fee: 'Free',
		icon: ShoppingBasketIcon,
		id: 'mercado',
		image: '',
		initials: 'MC',
		name: 'Mercado da Esquina',
		promo: 'R$ 15 off your first order',
		rating: '4.4',
		reviews: '3.9k',
	},
]

export type Category = {
	icon: IconComponent
	id: string
	label: string
}

export const CATEGORIES: Category[] = [
	{
		icon: ChefHatIcon,
		id: 'pizza',
		label: 'Pizza',
	},
	{
		icon: SoupIcon,
		id: 'japanese',
		label: 'Japanese',
	},
	{
		icon: FlameIcon,
		id: 'burgers',
		label: 'Burgers',
	},
	{
		icon: LeafIcon,
		id: 'healthy',
		label: 'Healthy',
	},
	{
		icon: CoffeeIcon,
		id: 'bakery',
		label: 'Bakery',
	},
	{
		icon: CoffeeIcon,
		id: 'coffee',
		label: 'Coffee',
	},
	{
		icon: DonutIcon,
		id: 'desserts',
		label: 'Desserts',
	},
	{
		icon: SnowflakeIcon,
		id: 'ice-cream',
		label: 'Ice cream',
	},
	{
		icon: SoupIcon,
		id: 'soups',
		label: 'Soups',
	},
	{
		icon: ShoppingBasketIcon,
		id: 'grocery',
		label: 'Grocery',
	},
	{
		icon: PillIcon,
		id: 'pharmacy',
		label: 'Pharmacy',
	},
	{
		icon: WineIcon,
		id: 'drinks',
		label: 'Drinks',
	},
]

export type Dish = {
	description: string
	id: string
	/** The dish photo; an illustration or empty, like `Store.image`. */
	image: string
	name: string
	price: string
	store: string
	tag?: string
}

export const DISHES: Dish[] = [
	{
		description: 'Tomato, fior di latte, basil and olive oil. 8 slices.',
		id: 'margherita',
		image: '/audiences/dish-pizza.svg',
		name: 'Margherita',
		price: 'R$ 54,90',
		store: 'Forno Vila Madalena',
		tag: 'Most ordered',
	},
	{
		description: 'Calabresa, red onion and black olives. 8 slices.',
		id: 'calabresa',
		image: '/audiences/dish-calabresa.svg',
		name: 'Calabresa',
		price: 'R$ 58,90',
		store: 'Forno Vila Madalena',
	},
	{
		description: 'Four cheeses: mozzarella, gorgonzola, parmesan, catupiry.',
		id: 'quatro-queijos',
		image: '',
		name: 'Quatro queijos',
		price: 'R$ 62,90',
		store: 'Forno Vila Madalena',
		tag: 'New',
	},
	{
		description: 'Mortadella, burrata and pistachio pesto. 8 slices.',
		id: 'mortadela',
		image: '',
		name: 'Mortadela e burrata',
		price: 'R$ 69,90',
		store: 'Forno Vila Madalena',
	},
	{
		description: 'Crushed tomato, garlic and oregano. No cheese.',
		id: 'marinara',
		image: '',
		name: 'Marinara',
		price: 'R$ 44,90',
		store: 'Forno Vila Madalena',
	},
	{
		description: 'Chocolate, strawberries and condensed milk. 4 slices.',
		id: 'brigadeiro',
		image: '',
		name: 'Sweet brigadeiro',
		price: 'R$ 39,90',
		store: 'Forno Vila Madalena',
	},
]

export const CUSTOMER = {
	address: 'Rua Harmonia, 412 — Vila Madalena',
	email: 'marina.costa@example.com',
	initials: 'MC',
	name: 'Marina Costa',
}
