import { createFileRoute } from '@tanstack/react-router'
import { Box, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const boxProps = [
	{
		default: 'undefined',
		description: 'Background color using a semantic design token.',
		name: 'bg',
		type: '"background" | "muted" | "card"',
	},
	{
		default: 'false',
		description:
			'When true, applies flex-grow (flex-1) to fill available space.',
		name: 'grow',
		type: 'boolean',
	},
	{
		default: 'undefined',
		description: 'Minimum height of the box.',
		name: 'minHeight',
		type: '"sm" | "md" | "lg" | "screen"',
	},
	{
		default: 'undefined',
		description: 'Overflow behavior.',
		name: 'overflow',
		type: '"hidden" | "visible" | "auto"',
	},
	{
		default: 'undefined',
		description: 'Uniform padding on all sides.',
		name: 'padding',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
	},
	{
		default: 'undefined',
		description: 'Horizontal padding (left and right).',
		name: 'paddingX',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
	},
	{
		default: 'undefined',
		description: 'Vertical padding (top and bottom).',
		name: 'paddingY',
		type: '"none" | "xs" | "sm" | "md" | "lg" | "xl"',
	},
	{
		default: 'undefined',
		description: 'CSS position strategy.',
		name: 'position',
		type: '"static" | "relative" | "absolute"',
	},
	{
		default: 'undefined',
		description: 'Border radius.',
		name: 'rounded',
		type: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
	},
	{
		default: 'undefined',
		description: 'Text alignment for content inside the box.',
		name: 'textAlign',
		type: '"left" | "center" | "right"',
	},
	{
		default: 'undefined',
		description: 'Width of the box.',
		name: 'width',
		type: '"auto" | "full"',
	},
]

const usageCode = `import { Box, Flex } from '@turystack/ui'

// Padded section with background
<Box bg="muted" padding="lg" rounded="md">
  <p>Content</p>
</Box>

// Full-width page background
<Box bg="background" padding="lg" width="full">
  <Flex justify="center" align="center" minHeight="md">
    <Card>...</Card>
  </Flex>
</Box>

// Flex spacer (grow fills available space)
<Flex align="center" gap="sm">
  <Box grow><Separator /></Box>
  <Typography>or</Typography>
  <Box grow><Separator /></Box>
</Flex>

// Positioned overlay
<Box position="relative">
  <img src="..." />
  <Box position="absolute">
    <Badge>New</Badge>
  </Box>
</Box>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Box
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A generic layout primitive for background, padding, rounded corners,
						overflow, and positioning.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={boxProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Background</h2>
					<ComponentPreview title="Semantic background colors">
						<div className="w-full space-y-3">
							{(
								[
									'background',
									'muted',
									'card',
								] as const
							).map((bg) => (
								<div key={bg}>
									<p className="mb-1 text-muted-foreground text-xs">
										bg='{bg}'
									</p>
									<Box
										bg={bg}
										padding="md"
										rounded="md"
									>
										<span className="text-sm">bg="{bg}"</span>
									</Box>
								</div>
							))}
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Padding</h2>
					<ComponentPreview title="Padding sizes">
						<div className="w-full space-y-3">
							{(
								[
									'xs',
									'sm',
									'md',
									'lg',
									'xl',
								] as const
							).map((p) => (
								<div key={p}>
									<p className="mb-1 text-muted-foreground text-xs">
										padding='{p}'
									</p>
									<Box
										bg="muted"
										padding={p}
										rounded="md"
									>
										<span className="text-sm">Content</span>
									</Box>
								</div>
							))}
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Rounded</h2>
					<ComponentPreview title="Border radius">
						<div className="flex flex-wrap gap-3">
							{(
								[
									'none',
									'sm',
									'md',
									'lg',
									'xl',
									'full',
								] as const
							).map((r) => (
								<div
									className="text-center"
									key={r}
								>
									<Box
										bg="muted"
										padding="md"
										rounded={r}
									>
										<span className="text-sm">{r}</span>
									</Box>
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

export const Route = createFileRoute('/libs/react-web/box')({
	component: Page,
})
