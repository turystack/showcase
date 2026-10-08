import type { BadgeVariant } from '@turystack/react-web'

/**
 * The records every Backoffice screen reads: one small, consistent data set,
 * so the list, the detail, the search and the log all talk about the same
 * payments and the same people.
 */

export type PaymentStatus =
	| 'succeeded'
	| 'pending'
	| 'uncaptured'
	| 'refunded'
	| 'disputed'
	| 'failed'

export type Payment = {
	amount: number // integer cents
	createdAt: Date
	customer: string
	description: string
	email: string
	id: string
	method: string
	status: PaymentStatus
}

export const PAYMENT_STATUS: Record<
	PaymentStatus,
	{
		label: string
		variant: BadgeVariant
	}
> = {
	disputed: {
		label: 'Disputed',
		variant: 'warning',
	},
	failed: {
		label: 'Failed',
		variant: 'destructive',
	},
	pending: {
		label: 'Pending',
		variant: 'info',
	},
	refunded: {
		label: 'Refunded',
		variant: 'secondary',
	},
	succeeded: {
		label: 'Succeeded',
		variant: 'success',
	},
	uncaptured: {
		label: 'Uncaptured',
		variant: 'outline',
	},
}

export const PAYMENTS: Payment[] = [
	{
		amount: 489_900,
		createdAt: new Date(2026, 8, 26, 10, 42),
		customer: 'Mariana Costa',
		description: 'Order #10482',
		email: 'mariana.costa@example.com',
		id: 'py_3QxR8mL2eZvKYlo21',
		method: 'Card •••• 4242',
		status: 'succeeded',
	},
	{
		amount: 129_000,
		createdAt: new Date(2026, 8, 26, 9, 15),
		customer: 'Rafael Almeida',
		description: 'Order #10481',
		email: 'rafael.almeida@example.com',
		id: 'py_3QxQ1aB7cDvKYlo09',
		method: 'Pix',
		status: 'pending',
	},
	{
		amount: 2_350_000,
		createdAt: new Date(2026, 8, 25, 18, 3),
		customer: 'Northwind Travel',
		description: 'Invoice INV-2026-0931',
		email: 'finance@northwind.example',
		id: 'py_3QxM9tK4fGvKYlo77',
		method: 'Boleto',
		status: 'succeeded',
	},
	{
		amount: 74_990,
		createdAt: new Date(2026, 8, 25, 16, 27),
		customer: 'Lucas Ferreira',
		description: 'Order #10479',
		email: 'lucas.ferreira@example.com',
		id: 'py_3QxL2wP8hJvKYlo45',
		method: 'Card •••• 5454',
		status: 'disputed',
	},
	{
		amount: 312_500,
		createdAt: new Date(2026, 8, 25, 11, 50),
		customer: 'Beatriz Souza',
		description: 'Order #10477',
		email: 'beatriz.souza@example.com',
		id: 'py_3QxJ6yN1kLvKYlo38',
		method: 'Card •••• 1881',
		status: 'refunded',
	},
	{
		amount: 58_000,
		createdAt: new Date(2026, 8, 24, 21, 14),
		customer: 'Gabriel Lima',
		description: 'Order #10476',
		email: 'gabriel.lima@example.com',
		id: 'py_3QxG3vM5nPvKYlo62',
		method: 'Card •••• 6550',
		status: 'failed',
	},
	{
		amount: 1_020_000,
		createdAt: new Date(2026, 8, 24, 14, 8),
		customer: 'Globex Tours',
		description: 'Invoice INV-2026-0928',
		email: 'ap@globex.example',
		id: 'py_3QxE8uR2qSvKYlo14',
		method: 'Card •••• 4242',
		status: 'uncaptured',
	},
	{
		amount: 199_900,
		createdAt: new Date(2026, 8, 24, 9, 31),
		customer: 'Camila Rocha',
		description: 'Order #10474',
		email: 'camila.rocha@example.com',
		id: 'py_3QxC5tT9wUvKYlo50',
		method: 'Pix',
		status: 'succeeded',
	},
	{
		amount: 45_500,
		createdAt: new Date(2026, 8, 23, 19, 46),
		customer: 'Pedro Martins',
		description: 'Order #10473',
		email: 'pedro.martins@example.com',
		id: 'py_3QxA1sW6xYvKYlo27',
		method: 'Card •••• 2210',
		status: 'succeeded',
	},
	{
		amount: 860_000,
		createdAt: new Date(2026, 8, 23, 13, 2),
		customer: 'Initech Brasil',
		description: 'Invoice INV-2026-0925',
		email: 'contas@initech.example',
		id: 'py_3Qx83rZ4aBvKYlo93',
		method: 'Boleto',
		status: 'pending',
	},
]

export type Customer = {
	country: string
	createdAt: Date
	email: string
	id: string
	name: string
	payments: number
	spent: number // integer cents
}

export const CUSTOMERS: Customer[] = [
	{
		country: 'Brazil',
		createdAt: new Date(2025, 2, 14),
		email: 'mariana.costa@example.com',
		id: 'cus_R4nT8kLq2Wm7Zx',
		name: 'Mariana Costa',
		payments: 14,
		spent: 2_148_300,
	},
	{
		country: 'Brazil',
		createdAt: new Date(2024, 10, 2),
		email: 'finance@northwind.example',
		id: 'cus_Q9pL3vBn6Yt1Cs',
		name: 'Northwind Travel',
		payments: 38,
		spent: 41_870_000,
	},
	{
		country: 'Portugal',
		createdAt: new Date(2026, 0, 21),
		email: 'lucas.ferreira@example.com',
		id: 'cus_S2hK7cDf4Gj8Rv',
		name: 'Lucas Ferreira',
		payments: 3,
		spent: 224_970,
	},
]

/** The same payment the detail page, the split preview and the log open. */
export const OPEN_PAYMENT = PAYMENTS[3]
