import { createFileRoute } from '@tanstack/react-router'
import { Provider, TagsInput } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const tagsInputProps = [
	{
		description: 'The controlled array of tags.',
		name: 'value',
		type: 'string[]',
	},
	{
		description: 'The default tags when uncontrolled.',
		name: 'defaultValue',
		type: 'string[]',
	},
	{
		description: 'Maximum number of tags allowed.',
		name: 'maxTags',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Whether duplicate tags are allowed.',
		name: 'allowDuplicates',
		type: 'boolean',
	},
	{
		description: 'Placeholder text for the input field.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the input.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: 'false',
		description: 'Disables the input.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description: 'Handler called when tags change.',
		name: 'onChange',
		type: '(value: string[]) => void',
	},
]

const usageCode = `import { TagsInput } from '@turystack/ui'

// Basic
<TagsInput placeholder="Type and press Enter" />

// With default tags
<TagsInput
  defaultValue={["React", "TypeScript"]}
  placeholder="Add a tag"
/>

// Max tags limit
<TagsInput maxTags={3} placeholder="Max 3 tags" />

// Allow duplicates
<TagsInput allowDuplicates placeholder="Duplicates allowed" />`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						TagsInput
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A tags input that allows adding and removing tags. Press Enter to
						add a tag and click the X to remove one.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={tagsInputProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Type and press Enter to add">
						<div className="w-80">
							<TagsInput placeholder="Type and press Enter" />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With Default Tags
					</h2>
					<ComponentPreview title="Pre-populated tags">
						<div className="w-80">
							<TagsInput
								defaultValue={[
									'React',
									'TypeScript',
									'Tailwind',
								]}
								placeholder="Add a tag"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Max Tags</h2>
					<ComponentPreview title="Limited to 3 tags">
						<div className="w-80">
							<TagsInput
								maxTags={3}
								placeholder="Max 3 tags"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<TagsInput
								defaultValue={[
									'Locked',
								]}
								disabled
								placeholder="Disabled"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={usageCode}
						filename="example.tsx"
						language="tsx"
					/>
				</div>
			</div>
		</Provider>
	)
}

export const Route = createFileRoute('/libs/ui/tags-input')({
	component: Page,
})
