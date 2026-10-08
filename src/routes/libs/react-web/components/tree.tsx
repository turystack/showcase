import { createFileRoute } from '@tanstack/react-router'
import { Tree } from '@turystack/react-web'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

const treeProps = [
	{
		description: 'The roots. Nested objects, not a flattened list.',
		name: 'items',
		required: true,
		type: 'T[]',
	},
	{
		description: 'Stable identity.',
		name: 'itemKey',
		required: true,
		type: 'keyof T | ((item: T) => V)',
	},
	{
		description: 'What the row says.',
		name: 'itemLabel',
		required: true,
		type: 'keyof T | ((item: T) => React.ReactNode)',
	},
	{
		description: 'How to read children.',
		name: 'itemChildren',
		type: 'keyof T | ((item: T) => T[] | undefined)',
	},
	{
		description: 'A node before the label.',
		name: 'itemIcon',
		type: 'keyof T | ((item: T) => React.ReactNode)',
	},
	{
		description: 'Blocks one node.',
		name: 'itemDisabled',
		type: 'keyof T | ((item: T) => boolean)',
	},
	{
		description: 'Controlled open branches.',
		name: 'expanded',
		type: 'V[]',
	},
	{
		description: 'Uncontrolled open branches.',
		name: 'defaultExpanded',
		type: 'V[]',
	},
	{
		description: 'Fires with every open branch.',
		name: 'onExpandedChange',
		type: '(expanded: V[]) => void',
	},
	{
		description: 'Controlled selection.',
		name: 'selected',
		type: 'V | null',
	},
	{
		description: 'Uncontrolled selection.',
		name: 'defaultSelected',
		type: 'V | null',
	},
	{
		description: 'Fires with the picked value and its source object.',
		name: 'onSelect',
		type: '(value: V, item: T) => void',
	},
	{
		description: 'Names the tree.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const usageCode = `import { Tree } from '@turystack/react-web'

<Tree
  ariaLabel="Destinations"
  defaultExpanded={['south-america']}
  itemChildren="children"
  itemKey="id"
  itemLabel="name"
  items={destinations}
  onSelect={(id) => open(id)}
/>`

const DESTINATIONS = [
	{
		children: [
			{
				id: 'brazil',
				name: 'Brazil',
			},
			{
				id: 'chile',
				name: 'Chile',
			},
		],
		id: 'south-america',
		name: 'South America',
	},
	{
		children: [
			{
				id: 'portugal',
				name: 'Portugal',
			},
		],
		id: 'europe',
		name: 'Europe',
	},
]

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Navigation
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Tree
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A hierarchy the reader can open, close and pick from with the arrow
					keys.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={treeProps} />
			</section>

			<SlotsSection slug="tree" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Open, close, pick
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					Right opens, left closes, up and down walk visible rows, Enter picks.
					Opening is not selecting.
				</p>
				<ComponentPreview title="Destinations, one branch open">
					<div className="w-full max-w-sm">
						<Tree
							ariaLabel="Destinations"
							defaultExpanded={[
								'south-america',
							]}
							itemChildren="children"
							itemKey="id"
							itemLabel="name"
							items={DESTINATIONS}
						/>
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

export const Route = createFileRoute('/libs/react-web/components/tree')({
	component: Page,
})
