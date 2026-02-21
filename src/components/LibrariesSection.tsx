import { Link } from '@tanstack/react-router'
import { Palette, Wrench } from 'lucide-react'

import { LibraryCard } from './docs/LibraryCard'

const libraries = [
	{
		color: 'cyan' as const,
		description:
			'A collection of accessible, customizable UI components with built-in dark mode and full TypeScript support.',
		downloads: '120k',
		href: '/libs/ui' as const,
		icon: <Palette size={20} />,
		name: '@tury/ui',
		tagline: 'React UI Components',
		version: 'v2.4.0',
	},
	{
		color: 'orange' as const,
		description:
			'Type-safe utility functions for common mathematical and general-purpose operations. Zero dependencies.',
		downloads: '41k',
		href: '/libs/common' as const,
		icon: <Wrench size={20} />,
		name: '@tury/common',
		tagline: 'Utility Functions',
		version: 'v1.0.0',
	},
]

export function LibrariesSection() {
	return (
		<section
			className="py-24"
			id="libraries"
		>
			<div className="container">
				<div className="text-center">
					<h2 className="font-bold font-display text-3xl tracking-tight md:text-4xl">
						The <span className="text-tury-cyan">tury</span> ecosystem
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-muted-foreground">
						Modular, composable packages that work together seamlessly — or
						standalone.
					</p>
				</div>

				<div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{libraries.map((lib, i) => (
						<div
							className="animate-fade-in-up"
							key={lib.name}
							style={{
								animationDelay: `${i * 100}ms`,
							}}
						>
							<Link to={lib.href}>
								<LibraryCard {...lib} />
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
