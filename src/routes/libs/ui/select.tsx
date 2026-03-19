import { createFileRoute } from '@tanstack/react-router'
import { Provider, Select } from '@turystack/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const singleOptions = [
	{
		label: 'React',
		value: 'react',
	},
	{
		label: 'Vue',
		value: 'vue',
	},
	{
		label: 'Angular',
		value: 'angular',
	},
	{
		label: 'Svelte',
		value: 'svelte',
	},
	{
		label: 'Solid',
		value: 'solid',
	},
]

const groupedOptions = [
	{
		category: 'Frontend',
		label: 'React',
		value: 'react',
	},
	{
		category: 'Frontend',
		label: 'Vue',
		value: 'vue',
	},
	{
		category: 'Frontend',
		label: 'Angular',
		value: 'angular',
	},
	{
		category: 'Backend',
		label: 'Express',
		value: 'express',
	},
	{
		category: 'Backend',
		label: 'Fastify',
		value: 'fastify',
	},
	{
		category: 'Backend',
		label: 'NestJS',
		value: 'nestjs',
	},
	{
		category: 'Database',
		label: 'PostgreSQL',
		value: 'postgres',
	},
	{
		category: 'Database',
		label: 'MongoDB',
		value: 'mongodb',
	},
]

const colorOptions = [
	{
		color: '#61DAFB',
		label: 'React',
		value: 'react',
	},
	{
		color: '#4FC08D',
		label: 'Vue',
		value: 'vue',
	},
	{
		color: '#DD0031',
		label: 'Angular',
		value: 'angular',
	},
	{
		color: '#FF3E00',
		label: 'Svelte',
		value: 'svelte',
	},
	{
		color: '#2C4F7C',
		label: 'Solid',
		value: 'solid',
	},
]

const selectProps = [
	{
		description: 'The selection mode.',
		name: 'mode',
		required: true,
		type: '"single" | "multiple"',
	},
	{
		description: 'Array of option objects.',
		name: 'options',
		required: true,
		type: 'T[]',
	},
	{
		description: 'Key or function to extract the label from an option.',
		name: 'optionLabel',
		required: true,
		type: 'keyof T | ((option: T) => string)',
	},
	{
		description: 'Key or function to extract the value from an option.',
		name: 'optionValue',
		required: true,
		type: 'keyof T | ((option: T) => O)',
	},
	{
		description:
			'Key or function to extract a group name from an option. Options with the same group are rendered under a shared heading.',
		name: 'optionGroup',
		type: 'keyof T | ((option: T) => string)',
	},
	{
		description: 'The controlled selected value (single) or values (multiple).',
		name: 'value',
		type: 'I | null (single) | I[] (multiple)',
	},
	{
		description: 'The default selected value when uncontrolled.',
		name: 'defaultValue',
		type: 'I | null (single) | I[] (multiple)',
	},
	{
		description: 'Placeholder text when nothing is selected.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: 'true',
		description: 'Whether the option list is searchable.',
		name: 'searchable',
		type: 'boolean',
	},
	{
		description: 'Placeholder for the search input.',
		name: 'searchPlaceholder',
		type: 'string',
	},
	{
		description: 'Content shown when no options match the search.',
		name: 'emptySection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content rendered on the left side of the trigger.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content rendered on the right side of the trigger.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Configuration for infinite scroll loading.',
		name: 'infinite',
		type: 'SelectInfiniteProps',
	},
	{
		default: 'false',
		description: 'Disables the select.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Shows a loading spinner.',
		name: 'loading',
		type: 'boolean',
	},
	{
		default: 'false',
		description: 'Makes the trigger take full width.',
		name: 'block',
		type: 'boolean',
	},
	{
		description: 'Custom render function for each option in the dropdown.',
		name: 'renderOption',
		type: '(option: T) => React.ReactNode',
	},
	{
		description: 'Custom render function for the selected value display.',
		name: 'renderValue',
		type: '(option: T) => React.ReactNode',
	},
	{
		description: 'Handler called when the selection changes.',
		name: 'onChange',
		type: '(value: O | null) => void (single) | (value: O[]) => void (multiple)',
	},
]

const usageCode = `import { Select } from '@turystack/ui'

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
]

// Single select
<Select
  mode="single"
  options={options}
  optionLabel="label"
  optionValue="value"
  placeholder="Choose a framework"
/>

// Multiple select
<Select
  mode="multiple"
  options={options}
  optionLabel="label"
  optionValue="value"
  placeholder="Choose frameworks"
/>`

const groupedCode = `const options = [
  { label: 'React', value: 'react', category: 'Frontend' },
  { label: 'Vue', value: 'vue', category: 'Frontend' },
  { label: 'Express', value: 'express', category: 'Backend' },
  { label: 'Fastify', value: 'fastify', category: 'Backend' },
]

<Select
  mode="single"
  options={options}
  optionLabel="label"
  optionValue="value"
  optionGroup="category"
  placeholder="Choose a technology"
/>

// With a function accessor
<Select
  mode="single"
  options={options}
  optionLabel="label"
  optionValue="value"
  optionGroup={(opt) => opt.category}
  placeholder="Choose a technology"
/>`

const renderOptionCode = `const options = [
  { label: 'React', value: 'react', color: '#61DAFB' },
  { label: 'Vue', value: 'vue', color: '#4FC08D' },
  { label: 'Angular', value: 'angular', color: '#DD0031' },
]

<Select
  mode="single"
  options={options}
  optionLabel="label"
  optionValue="value"
  placeholder="Choose a framework"
  renderOption={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: option.color,
        }}
      />
      {option.label}
    </div>
  )}
  renderValue={(option) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: option.color,
        }}
      />
      {option.label}
    </div>
  )}
/>`

const infiniteCode = `const [options, setOptions] = useState(initialOptions)
const [hasMore, setHasMore] = useState(true)
const [loadingMore, setLoadingMore] = useState(false)

const handleLoadMore = () => {
  setLoadingMore(true)
  fetchMoreOptions().then((newOptions) => {
    setOptions((prev) => [...prev, ...newOptions])
    setHasMore(newOptions.length > 0)
    setLoadingMore(false)
  })
}

<Select
  mode="single"
  options={options}
  optionLabel="label"
  optionValue="value"
  placeholder="Select..."
  infinite={{
    hasMore,
    loadingMore,
    onLoadMore: handleLoadMore,
    loadingMoreText: 'Loading more...',
  }}
/>`

const PAGE_SIZE = 20

function generateItems(start: number, count: number) {
	return Array.from(
		{
			length: count,
		},
		(_, i) => ({
			label: `Item ${start + i + 1}`,
			value: `item-${start + i + 1}`,
		}),
	)
}

function InfiniteScrollExample() {
	const [items, setItems] = useState(() => generateItems(0, PAGE_SIZE))
	const [loadingMore, setLoadingMore] = useState(false)
	const totalItems = 100
	const hasMore = items.length < totalItems
	const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current)
		}
	}, [])

	const handleLoadMore = useCallback(() => {
		if (loadingMore) return
		setLoadingMore(true)
		timerRef.current = setTimeout(() => {
			setItems((prev) => [
				...prev,
				...generateItems(prev.length, PAGE_SIZE),
			])
			setLoadingMore(false)
		}, 800)
	}, [
		loadingMore,
	])

	return (
		<Select
			infinite={{
				hasMore,
				loadingMore,
				loadingMoreText: 'Loading more items...',
				onLoadMore: handleLoadMore,
			}}
			mode="single"
			optionLabel="label"
			options={items}
			optionValue="value"
			placeholder={`Select from ${totalItems} items`}
		/>
	)
}

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Select
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A searchable select component with single and multiple selection
						modes, custom rendering, groups, and infinite scroll support.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={selectProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Single Select</h2>
					<ComponentPreview title="Choose one option">
						<Select
							mode="single"
							optionLabel="label"
							options={singleOptions}
							optionValue="value"
							placeholder="Choose a framework"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Multiple Select
					</h2>
					<ComponentPreview title="Choose multiple options">
						<Select
							mode="multiple"
							optionLabel="label"
							options={singleOptions}
							optionValue="value"
							placeholder="Choose frameworks"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Grouped Single Select
					</h2>
					<p className="text-muted-foreground text-sm">
						Use <code>optionGroup</code> to group options under headings. Pass a
						key name or a function.
					</p>
					<ComponentPreview title="Options grouped by category">
						<Select
							mode="single"
							optionGroup="category"
							optionLabel="label"
							options={groupedOptions}
							optionValue="value"
							placeholder="Choose a technology"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Grouped Multiple Select
					</h2>
					<ComponentPreview title="Multiple selection with groups">
						<Select
							mode="multiple"
							optionGroup="category"
							optionLabel="label"
							options={groupedOptions}
							optionValue="value"
							placeholder="Choose technologies"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Custom Rendering
					</h2>
					<p className="text-muted-foreground text-sm">
						Use <code>renderOption</code> to customize how each option looks in
						the dropdown, and <code>renderValue</code> to customize the selected
						value display in the trigger.
					</p>
					<ComponentPreview title="Color dots with custom render">
						<Select
							mode="single"
							optionLabel="label"
							options={colorOptions}
							optionValue="value"
							placeholder="Choose a framework"
							renderOption={(option) => (
								<div
									style={{
										alignItems: 'center',
										display: 'flex',
										gap: 8,
									}}
								>
									<span
										style={{
											backgroundColor: option.color,
											borderRadius: '50%',
											height: 10,
											width: 10,
										}}
									/>
									{option.label}
								</div>
							)}
							renderValue={(option) => (
								<div
									style={{
										alignItems: 'center',
										display: 'flex',
										gap: 8,
									}}
								>
									<span
										style={{
											backgroundColor: option.color,
											borderRadius: '50%',
											height: 10,
											width: 10,
										}}
									/>
									{option.label}
								</div>
							)}
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Infinite Scroll
					</h2>
					<p className="text-muted-foreground text-sm">
						Use the <code>infinite</code> prop to load more options as the user
						scrolls to the bottom of the list. Pass <code>hasMore</code>,{' '}
						<code>loadingMore</code>, and <code>onLoadMore</code>.
					</p>
					<ComponentPreview title="Scroll to load more (100 items total)">
						<InfiniteScrollExample />
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<Select
							disabled
							mode="single"
							optionLabel="label"
							options={singleOptions}
							optionValue="value"
							placeholder="Disabled"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Loading</h2>
					<ComponentPreview title="Loading state">
						<Select
							loading
							mode="single"
							optionLabel="label"
							options={singleOptions}
							optionValue="value"
							placeholder="Loading..."
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Block</h2>
					<ComponentPreview title="Full width select">
						<Select
							block
							mode="single"
							optionLabel="label"
							options={singleOptions}
							optionValue="value"
							placeholder="Full width"
						/>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="basic.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Grouped Usage</h2>
					<CodeBlock
						code={groupedCode}
						filename="grouped.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Custom Render Usage
					</h2>
					<CodeBlock
						code={renderOptionCode}
						filename="custom-render.tsx"
						language="tsx"
					/>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Infinite Scroll Usage
					</h2>
					<CodeBlock
						code={infiniteCode}
						filename="infinite-scroll.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/select')({
	component: Page,
})
