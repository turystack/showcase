import { createFileRoute } from '@tanstack/react-router'
import { Accordion, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const accordionProps = [
	{
		description:
			'Determines whether one or multiple items can be opened at the same time.',
		name: 'type',
		required: true,
		type: '"single" | "multiple"',
	},
	{
		default: 'false',
		description: 'When true, renders a bordered style around the accordion.',
		name: 'bordered',
		type: 'boolean',
	},
	{
		description:
			'The controlled value of the open item(s). String for single, string[] for multiple.',
		name: 'value',
		type: 'string | string[]',
	},
	{
		description: 'The default open item(s) when uncontrolled.',
		name: 'defaultValue',
		type: 'string | string[]',
	},
	{
		default: 'false',
		description:
			'When type is "single", allows closing the open item by clicking its trigger again.',
		name: 'collapsible',
		type: 'boolean',
	},
	{
		description: 'Handler called when the open item(s) change.',
		name: 'onChange',
		type: '(value: string | string[]) => void',
	},
]

const accordionItemProps = [
	{
		description: 'A unique identifier for the accordion item.',
		name: 'value',
		required: true,
		type: 'string',
	},
	{
		default: 'false',
		description: 'Disables the item, preventing interaction.',
		name: 'disabled',
		type: 'boolean',
	},
]

const usageCode = `import { Accordion } from '@turystack/ui'

// Single (only one open at a time)
<Accordion type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Is it styled?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It comes with default styles that matches the other components.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>

// Multiple (many open at the same time)
<Accordion type="multiple" defaultValue={["item-1"]}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>First item</Accordion.Trigger>
    <Accordion.Content>Content for the first item.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Second item</Accordion.Trigger>
    <Accordion.Content>Content for the second item.</Accordion.Content>
  </Accordion.Item>
</Accordion>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Accordion
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A vertically stacked set of interactive headings that each reveal a
						section of content.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={accordionProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Accordion.Item Props
					</h2>
					<PropsTable props={accordionItemProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Single</h2>
					<ComponentPreview title="Single accordion (collapsible)">
						<div className="w-full max-w-md">
							<Accordion
								collapsible
								type="single"
							>
								<Accordion.Item value="item-1">
									<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
									<Accordion.Content>
										Yes. It adheres to the WAI-ARIA design pattern.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-2">
									<Accordion.Trigger>Is it styled?</Accordion.Trigger>
									<Accordion.Content>
										Yes. It comes with default styles that matches the other
										components.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-3">
									<Accordion.Trigger>Is it animated?</Accordion.Trigger>
									<Accordion.Content>
										Yes. It's animated by default, but you can disable it if you
										prefer.
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Multiple</h2>
					<ComponentPreview title="Multiple accordion">
						<div className="w-full max-w-md">
							<Accordion
								defaultValue={[
									'item-1',
								]}
								type="multiple"
							>
								<Accordion.Item value="item-1">
									<Accordion.Trigger>First item</Accordion.Trigger>
									<Accordion.Content>
										Content for the first item. This is open by default.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-2">
									<Accordion.Trigger>Second item</Accordion.Trigger>
									<Accordion.Content>
										Content for the second item.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-3">
									<Accordion.Trigger>Third item</Accordion.Trigger>
									<Accordion.Content>
										Content for the third item.
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Disabled item</h2>
					<ComponentPreview title="Accordion with disabled item">
						<div className="w-full max-w-md">
							<Accordion
								collapsible
								type="single"
							>
								<Accordion.Item value="item-1">
									<Accordion.Trigger>Available item</Accordion.Trigger>
									<Accordion.Content>
										This item can be interacted with.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item
									disabled
									value="item-2"
								>
									<Accordion.Trigger>Disabled item</Accordion.Trigger>
									<Accordion.Content>
										This content is not reachable.
									</Accordion.Content>
								</Accordion.Item>
							</Accordion>
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

export const Route = createFileRoute('/libs/ui/accordion')({
	component: Page,
})
