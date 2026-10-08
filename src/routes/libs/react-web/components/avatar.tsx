import { createFileRoute } from '@tanstack/react-router'
import { Avatar } from '@turystack/react-web'
import { UserRound } from 'lucide-react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/avatar/avatar.types.ts` and the
 * `defaultVariants` in `avatar.tsx`. The component is a thin wrapper over
 * Base UI's Avatar — Root, Image and Fallback — so the fallback is what the
 * headless primitive shows until the image has actually decoded.
 */
const avatarProps = [
	{
		description: 'Image URL; children show when absent or broken.',
		name: 'src',
		type: 'string | null',
	},
	{
		description: 'Image alt text; only rendered when src is set.',
		name: 'alt',
		type: 'string',
	},
	{
		default: '"md"',
		description: 'Rendered box: sm is 28px, md is 36px, lg is 48px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"circle"',
		description: 'Corner radius: circle is round, square a small radius.',
		name: 'variant',
		type: '"circle" | "square"',
	},
	{
		description: 'Fallback (initials or icon) while loading or without image.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

/**
 * A data URI, not a network request. The preview has to show the loaded-image
 * branch even with no connection, and a remote URL would only demonstrate the
 * fallback on a bad day.
 */
const PORTRAIT =
	'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 96 96%27%3E%3Cdefs%3E%3ClinearGradient id=%27g%27 x1=%270%27 y1=%270%27 x2=%271%27 y2=%271%27%3E%3Cstop offset=%270%27 stop-color=%27%2338bdf8%27/%3E%3Cstop offset=%271%27 stop-color=%27%236366f1%27/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%2796%27 height=%2796%27 fill=%27url(%23g)%27/%3E%3Ccircle cx=%2748%27 cy=%2738%27 r=%2716%27 fill=%27white%27 fill-opacity=%27.9%27/%3E%3Cpath d=%27M16 96c0-17.7 14.3-32 32-32s32 14.3 32 32z%27 fill=%27white%27 fill-opacity=%27.9%27/%3E%3C/svg%3E'

const BROKEN = '/this-image-does-not-exist.png'

const usageCode = `import { Avatar } from '@turystack/react-web'

// Initials — the children are the fallback
<Avatar>AS</Avatar>

// Sizes
<Avatar size="sm">AS</Avatar>
<Avatar size="md">AS</Avatar>
<Avatar size="lg">AS</Avatar>

// Shapes
<Avatar variant="circle">AS</Avatar>
<Avatar variant="square">AS</Avatar>

// With a photo — keep the initials, they cover the load and the 404
<Avatar alt="Ana Silva" src="/ana.png">AS</Avatar>

// An icon works as the fallback just as well
<Avatar>
  <UserRound className="size-4" />
</Avatar>`

function Page() {
	const [src, setSrc] = useState<string | null>(PORTRAIT)

	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Display
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					Avatar
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					A person's picture, with the initials underneath it.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={avatarProps} />
			</section>

			<SlotsSection slug="avatar" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Sizes</h2>
				<ComponentPreview title="sm, md, lg — fallback only">
					<div className="flex flex-wrap items-end justify-center gap-4">
						<Avatar size="sm">AS</Avatar>
						<Avatar size="md">AS</Avatar>
						<Avatar size="lg">AS</Avatar>
					</div>
				</ComponentPreview>
				<ComponentPreview title="sm, md, lg — with an image">
					<div className="flex flex-wrap items-end justify-center gap-4">
						<Avatar
							alt="Ana Silva"
							size="sm"
							src={PORTRAIT}
						>
							AS
						</Avatar>
						<Avatar
							alt="Ana Silva"
							size="md"
							src={PORTRAIT}
						>
							AS
						</Avatar>
						<Avatar
							alt="Ana Silva"
							size="lg"
							src={PORTRAIT}
						>
							AS
						</Avatar>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Shapes</h2>
				<ComponentPreview title="circle and square, both branches">
					<div className="flex flex-wrap items-end justify-center gap-4">
						<Avatar
							size="lg"
							variant="circle"
						>
							AS
						</Avatar>
						<Avatar
							size="lg"
							variant="square"
						>
							AS
						</Avatar>
						<Avatar
							alt="Ana Silva"
							size="lg"
							src={PORTRAIT}
							variant="circle"
						>
							AS
						</Avatar>
						<Avatar
							alt="Ana Silva"
							size="lg"
							src={PORTRAIT}
							variant="square"
						>
							AS
						</Avatar>
					</div>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Fallback</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The children are not an alternative to the image, they are underneath
					it the whole time.
				</p>
				<ComponentPreview title="Swap the source">
					<div className="flex flex-col items-center gap-4">
						<Avatar
							alt="Ana Silva"
							size="lg"
							src={src}
						>
							AS
						</Avatar>
						<div className="flex flex-wrap items-center justify-center gap-2">
							<button
								className="rounded-md border border-border px-3 py-1.5 text-xs"
								onClick={() => setSrc(PORTRAIT)}
								type="button"
							>
								Working image
							</button>
							<button
								className="rounded-md border border-border px-3 py-1.5 text-xs"
								onClick={() => setSrc(BROKEN)}
								type="button"
							>
								Broken image
							</button>
							<button
								className="rounded-md border border-border px-3 py-1.5 text-xs"
								onClick={() => setSrc(null)}
								type="button"
							>
								No image
							</button>
						</div>
						<p className="text-muted-foreground text-xs">
							src is currently{' '}
							{src === PORTRAIT
								? 'a working data URI'
								: src === BROKEN
									? 'a URL that 404s'
									: 'null'}
						</p>
					</div>
				</ComponentPreview>
				<ComponentPreview title="Any node works as the fallback">
					<div className="flex flex-wrap items-end justify-center gap-4">
						<Avatar size="lg">AS</Avatar>
						<Avatar size="lg">
							<UserRound className="size-5" />
						</Avatar>
						<Avatar
							size="lg"
							variant="square"
						>
							<UserRound className="size-5" />
						</Avatar>
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

export const Route = createFileRoute('/libs/react-web/components/avatar')({
	component: Page,
})
