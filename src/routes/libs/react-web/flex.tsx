import { createFileRoute } from '@tanstack/react-router'
import { Flex, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const flexProps = [
	{
		default: '"row"',
		description: 'The flex direction.',
		name: 'direction',
		type: '"row" | "col" | "row-reverse" | "col-reverse"',
	},
	{
		default: '"start"',
		description: 'How flex children are aligned along the main axis.',
		name: 'justify',
		type: '"start" | "end" | "center" | "between" | "around" | "evenly"',
	},
	{
		default: '"stretch"',
		description: 'How flex children are aligned along the cross axis.',
		name: 'align',
		type: '"start" | "end" | "center" | "baseline" | "stretch"',
	},
	{
		default: '"none"',
		description: 'Gap between children.',
		name: 'gap',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
	},
	{
		default: '"nowrap"',
		description: 'Flex wrap behavior.',
		name: 'wrap',
		type: '"wrap" | "nowrap" | "wrap-reverse"',
	},
	{
		default: 'false',
		description: 'When true, renders as inline-flex instead of flex.',
		name: 'inline',
		type: 'boolean',
	},
	{
		default: 'undefined',
		description: 'Minimum height of the flex container.',
		name: 'minHeight',
		type: '"sm" | "md" | "lg" | "screen"',
	},
]

const usageCode = `import { Flex } from '@turystack/ui'

// Row with gap
<Flex gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Centered column
<Flex direction="col" align="center" gap="sm">
  <h1>Title</h1>
  <p>Subtitle</p>
</Flex>

// Space between
<Flex justify="between" align="center">
  <Logo />
  <Nav />
</Flex>

// Wrapping row
<Flex wrap="wrap" gap="md">
  {items.map(item => <Card key={item.id} {...item} />)}
</Flex>

// Centered content with minimum height
<Flex justify="center" align="center" minHeight="md">
  <Card>...</Card>
</Flex>`

const Item = ({ label }: { label: string }) => (
	<div className="flex h-10 min-w-16 items-center justify-center rounded-md bg-muted px-3 text-sm">
		{label}
	</div>
)

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Flex
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A layout primitive that applies flexbox utilities for direction,
						alignment, gap, and wrapping.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={flexProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Direction</h2>
					<ComponentPreview title="Row and column direction">
						<div className="w-full space-y-4">
							<div>
								<p className="mb-2 text-muted-foreground text-xs">
									direction='row' (default)
								</p>
								<Flex gap="sm">
									<Item label="1" />
									<Item label="2" />
									<Item label="3" />
								</Flex>
							</div>
							<div>
								<p className="mb-2 text-muted-foreground text-xs">
									direction='col'
								</p>
								<Flex
									direction="col"
									gap="sm"
								>
									<Item label="1" />
									<Item label="2" />
									<Item label="3" />
								</Flex>
							</div>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Justify</h2>
					<ComponentPreview title="Main axis alignment">
						<div className="w-full space-y-3">
							{(
								[
									'start',
									'center',
									'end',
									'between',
									'around',
									'evenly',
								] as const
							).map((j) => (
								<div key={j}>
									<p className="mb-1 text-muted-foreground text-xs">
										justify='{j}'
									</p>
									<Flex
										gap="sm"
										justify={j}
									>
										<Item label="A" />
										<Item label="B" />
										<Item label="C" />
									</Flex>
								</div>
							))}
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Gap</h2>
					<ComponentPreview title="Gap sizes">
						<div className="w-full space-y-3">
							{(
								[
									'xs',
									'sm',
									'md',
									'lg',
									'xl',
								] as const
							).map((g) => (
								<div key={g}>
									<p className="mb-1 text-muted-foreground text-xs">
										gap='{g}'
									</p>
									<Flex gap={g}>
										<Item label="1" />
										<Item label="2" />
										<Item label="3" />
									</Flex>
								</div>
							))}
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Min Height</h2>
					<ComponentPreview title="Centering content with minHeight">
						<div className="w-full space-y-4">
							{(
								[
									'sm',
									'md',
								] as const
							).map((h) => (
								<div key={h}>
									<p className="mb-2 text-muted-foreground text-xs">
										minHeight='{h}'
									</p>
									<Flex
										align="center"
										justify="center"
										minHeight={h}
									>
										<Item label={`min-h (${h})`} />
									</Flex>
								</div>
							))}
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

export const Route = createFileRoute('/libs/react-web/flex')({
	component: Page,
})
