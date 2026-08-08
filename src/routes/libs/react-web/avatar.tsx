import { createFileRoute } from '@tanstack/react-router'
import { Avatar, Provider } from '@turystack/ui'

import { CodeBlock, ComponentPreview, PropsTable } from '@/components'

const avatarProps = [
	{
		description: 'The image source URL for the avatar.',
		name: 'src',
		type: 'string | null',
	},
	{
		description: 'Alt text for the avatar image.',
		name: 'alt',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'The size of the avatar.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"circle"',
		description: 'The shape variant of the avatar.',
		name: 'variant',
		type: '"circle" | "square"',
	},
	{
		description:
			'Fallback content displayed when the image is not available. Typically initials or an icon.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

const usageCode = `import { Avatar } from '@turystack/ui'

// With image
<Avatar src="https://github.com/shadcn.png" alt="User" />

// With fallback
<Avatar>JD</Avatar>

// Sizes
<Avatar size="sm">SM</Avatar>
<Avatar size="md">MD</Avatar>
<Avatar size="lg">LG</Avatar>

// Variants
<Avatar variant="circle">AB</Avatar>
<Avatar variant="square">CD</Avatar>`

function Page() {
	return (
		<Provider>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						Avatar
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						An image element with a fallback for representing the user.
					</p>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Props</h2>
					<PropsTable props={avatarProps} />
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">With image</h2>
					<ComponentPreview title="Avatar with image source">
						<div className="flex flex-wrap items-center gap-3">
							<Avatar
								alt="User avatar"
								src="https://github.com/shadcn.png"
							>
								CN
							</Avatar>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Fallback</h2>
					<ComponentPreview title="Avatar with fallback initials">
						<div className="flex flex-wrap items-center gap-3">
							<Avatar>JD</Avatar>
							<Avatar>AB</Avatar>
							<Avatar>TU</Avatar>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Sizes</h2>
					<ComponentPreview title="Avatar sizes">
						<div className="flex flex-wrap items-end gap-3">
							<Avatar size="sm">SM</Avatar>
							<Avatar size="md">MD</Avatar>
							<Avatar size="lg">LG</Avatar>
						</div>
					</ComponentPreview>
				</div>

				<div className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Variants</h2>
					<ComponentPreview title="Avatar shape variants">
						<div className="flex flex-wrap items-center gap-3">
							<Avatar variant="circle">AB</Avatar>
							<Avatar variant="square">CD</Avatar>
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

export const Route = createFileRoute('/libs/react-web/avatar')({
	component: Page,
})
