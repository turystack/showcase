import { createFileRoute } from '@tanstack/react-router'
import { Button, LoadingBar } from '@turystack/react-web'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from `react-web/src/components/loading-bar/loading-bar.types.ts`
 * and the defaults in `loading-bar.tsx` (`defaultVariants` and the
 * destructuring). Every preview passes `position="absolute"` so the bar stays
 * in its box instead of running over the top of this page.
 */
const loadingBarProps = [
	{
		default: 'false',
		description: 'true shows and creeps; false completes and fades.',
		name: 'loading',
		type: 'boolean',
	},
	{
		description: 'Real progress, 0-100. Replaces the creep.',
		name: 'value',
		type: 'number',
	},
	{
		default: '200',
		description: 'Milliseconds before the bar appears.',
		name: 'delay',
		type: 'number',
	},
	{
		default: '"fixed"',
		description: 'Top of the viewport, or of the positioned parent.',
		name: 'position',
		type: '"fixed" | "absolute"',
	},
	{
		default: '"sm"',
		description: 'Bar height: 2px, 3px or 4px.',
		name: 'size',
		type: '"sm" | "md" | "lg"',
	},
	{
		default: '"default"',
		description: 'Bar colour.',
		name: 'variant',
		type: '"default" | "success" | "warning" | "destructive"',
	},
	{
		default: '"Loading page"',
		description: 'Accessible name of the progressbar.',
		name: 'ariaLabel',
		type: 'string',
	},
]

const usageCode = `import { LoadingBar } from '@turystack/react-web'

// A router transition — top of the viewport
const loading = useRouterState({ select: (state) => state.isLoading })
<LoadingBar loading={loading} />

// Real progress — name it, the default says "Loading page"
<LoadingBar ariaLabel="Uploading" loading={uploading} value={percent} />

// Inside a shell, let the Layout place it
<Layout loadingBar={{ loading }}>…</Layout>`

function Frame({ children }: { children: ReactNode }) {
	return (
		<div className="relative flex h-24 w-full max-w-md items-end justify-center gap-2 overflow-hidden rounded-lg border border-border p-4">
			{children}
		</div>
	)
}

function ManualPreview() {
	const [loading, setLoading] = useState(false)

	return (
		<Frame>
			<LoadingBar
				loading={loading}
				position="absolute"
			/>
			<Button
				disabled={loading}
				onClick={() => setLoading(true)}
				size="sm"
			>
				Start
			</Button>
			<Button
				disabled={!loading}
				onClick={() => setLoading(false)}
				size="sm"
				variant="outline"
			>
				Finish
			</Button>
		</Frame>
	)
}

function UploadPreview() {
	const [value, setValue] = useState<number | null>(null)

	useEffect(() => {
		if (value === null || value >= 100) {
			return
		}

		const timer = setTimeout(() => setValue(value + 10), 250)

		return () => clearTimeout(timer)
	}, [
		value,
	])

	const uploading = value !== null && value < 100

	return (
		<Frame>
			<LoadingBar
				ariaLabel="Uploading"
				delay={0}
				loading={uploading}
				position="absolute"
				size="md"
				value={value ?? 0}
				variant="success"
			/>
			<Button
				disabled={uploading}
				onClick={() => setValue(0)}
				size="sm"
			>
				{uploading ? `${value}%` : 'Upload'}
			</Button>
		</Frame>
	)
}

const VARIANTS = [
	'default',
	'success',
	'warning',
	'destructive',
] as const
const SIZES = [
	'sm',
	'md',
	'lg',
] as const

function AppearancePreview() {
	return (
		<div className="grid w-full max-w-md gap-3">
			{SIZES.map((size) =>
				VARIANTS.map((variant) => (
					<div
						className="relative h-6 overflow-hidden rounded-md border border-border"
						key={`${size}-${variant}`}
					>
						<LoadingBar
							delay={0}
							loading
							position="absolute"
							size={size}
							value={60}
							variant={variant}
						/>
						<span className="absolute right-2 bottom-0.5 text-muted-foreground text-xs">
							{size} · {variant}
						</span>
					</div>
				)),
			)}
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Feedback
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					LoadingBar
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					The thin bar across the top of the screen while a page loads.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={loadingBarProps} />
			</section>

			<SlotsSection slug="loading-bar" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Start and finish</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					It creeps towards 90% while loading, then runs to 100% and fades.
					Finish within 200ms and it never shows.
				</p>
				<ComponentPreview title="Driven by loading">
					<ManualPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Real progress</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					With <code>value</code> it shows the number it is given, and reports
					it to screen readers.
				</p>
				<ComponentPreview title="value with variant success">
					<UploadPreview />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Sizes and variants
				</h2>
				<ComponentPreview title="Every size and variant at 60%">
					<AppearancePreview />
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

export const Route = createFileRoute('/libs/react-web/components/loading-bar')({
	component: Page,
})
