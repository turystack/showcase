import { createFileRoute } from '@tanstack/react-router'
import { Provider, Textarea } from '@turystack/ui'
import { Search } from 'lucide-react'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const textareaProps = [
	{
		description: 'The controlled value of the textarea.',
		name: 'value',
		type: 'string | null',
	},
	{
		description: 'The default value when uncontrolled.',
		name: 'defaultValue',
		type: 'string | null',
	},
	{
		description: 'Placeholder text displayed when the textarea is empty.',
		name: 'placeholder',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the textarea.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		description: 'Content rendered on the left side of the textarea.',
		name: 'leftSection',
		type: 'React.ReactNode',
	},
	{
		description: 'Content rendered on the right side of the textarea.',
		name: 'rightSection',
		type: 'React.ReactNode',
	},
	{
		description:
			'Maximum number of characters allowed. Shows a counter inside the field when set.',
		name: 'maxLength',
		type: 'number',
	},
	{
		default: 'false',
		description: 'Disables the textarea, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
	{
		description:
			'Additional CSS class name applied to the root wrapper element.',
		name: 'rootClassName',
		type: 'string',
	},
	{
		description:
			'Handler called when the value changes. Receives null when empty.',
		name: 'onChange',
		type: '(value: string | null) => void',
	},
]

const usageCode = `import { Textarea } from '@turystack/ui'

// Basic — auto-expands as you type
<Textarea placeholder="Enter a description..." />

// Sizes
<Textarea size="sm" placeholder="Small" />
<Textarea size="md" placeholder="Medium" />
<Textarea size="lg" placeholder="Large" />

// With sections
<Textarea
  leftSection={<Search className="size-4 text-muted-foreground" />}
  placeholder="Search notes..."
/>

// With character counter (shown inside bottom-right)
<Textarea
  placeholder="Write something..."
  maxLength={280}
/>

// Controlled
const [text, setText] = useState('')

<Textarea
  value={text}
  onChange={setText}
  placeholder="Type here..."
  maxLength={500}
/>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Textarea
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A multi-line text input. Auto-expands as content grows. Supports{' '}
						<code className="rounded bg-muted px-1 text-sm">maxLength</code>{' '}
						which shows an inline character counter at the bottom-right.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={textareaProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Basic</h2>
					<ComponentPreview title="Auto-expanding textarea">
						<div className="w-80">
							<Textarea placeholder="Enter a description..." />
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Textarea sizes">
						<div className="flex w-80 flex-col gap-3">
							<Textarea
								placeholder="Small"
								size="sm"
							/>
							<Textarea
								placeholder="Medium"
								size="md"
							/>
							<Textarea
								placeholder="Large"
								size="lg"
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With sections</h2>
					<ComponentPreview title="Left and right sections">
						<div className="flex w-80 flex-col gap-3">
							<Textarea
								leftSection={
									<Search className="size-4 text-muted-foreground" />
								}
								placeholder="Search notes..."
							/>
							<Textarea
								placeholder="Description"
								rightSection={
									<span className="text-muted-foreground text-sm">opt.</span>
								}
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						With character counter
					</h2>
					<ComponentPreview title="Counter inside the field">
						<div className="w-80">
							<Textarea
								maxLength={280}
								placeholder="Write something (max 280 chars)..."
							/>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled</h2>
					<ComponentPreview title="Disabled state">
						<div className="w-80">
							<Textarea
								defaultValue="This textarea is disabled and cannot be edited."
								disabled
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

export const Route = createFileRoute('/libs/ui/textarea')({
	component: Page,
})
