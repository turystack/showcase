import { createFileRoute } from '@tanstack/react-router'
import { Box, Container, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const containerProps = [
	{
		default: 'true',
		description: 'When true, centers the container horizontally (mx-auto).',
		name: 'centered',
		type: 'boolean',
	},
	{
		default: 'undefined',
		description: 'Maximum width constraint for the container.',
		name: 'maxWidth',
		type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"',
	},
	{
		default: 'undefined',
		description: 'Text alignment for content inside the container.',
		name: 'textAlign',
		type: '"left" | "center" | "right"',
	},
]

const usageCode = `import { Box, Container, Flex } from '@turystack/ui'

// Constrained centered content
<Container maxWidth="md">
  <Card>...</Card>
</Container>

// Full-page auth layout
<Box bg="background" padding="lg" width="full">
  <Flex justify="center" align="center" minHeight="md">
    <Container maxWidth="sm">
      <Card>...</Card>
    </Container>
  </Flex>
</Box>

// Centered text block
<Container maxWidth="lg" textAlign="center">
  <Typography component="h1">Welcome</Typography>
  <Typography variant="muted">Get started below</Typography>
</Container>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Container
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						A layout primitive that constrains content width and centers it
						horizontally.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={containerProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Max Width</h2>
					<ComponentPreview title="Width constraints">
						<div className="w-full space-y-3">
							{(
								[
									'xs',
									'sm',
									'md',
									'lg',
									'xl',
									'2xl',
								] as const
							).map((w) => (
								<div key={w}>
									<p className="mb-1 text-muted-foreground text-xs">
										maxWidth='{w}'
									</p>
									<Container maxWidth={w}>
										<Box
											bg="muted"
											padding="sm"
											rounded="md"
										>
											<span className="text-sm">maxWidth="{w}"</span>
										</Box>
									</Container>
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

export const Route = createFileRoute('/libs/react-web/container')({
	component: Page,
})
