export type BlockCategory =
	| 'authentication'
	| 'dashboard'
	| 'forms'
	| 'marketing'

export type BlockDefinition = {
	id: string
	name: string
	description: string
	category: BlockCategory
	component: React.ComponentType
	code: string
	fullPage?: boolean
}
