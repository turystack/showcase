import { Link } from '@tanstack/react-router'

import { LibraryCard } from './docs/LibraryCard'

import { categories, libraries } from '@/data/libraries'

export function LibrariesSection() {
	return (
		<section
			className="py-24"
			id="libraries"
		>
			<div className="container">
				<div className="text-center">
					<h2 className="font-bold font-display text-3xl tracking-tight md:text-4xl">
						The <span className="text-tury-green">tury</span> ecosystem
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-muted-foreground">
						Modular, composable packages that work together seamlessly — or
						standalone.
					</p>
				</div>

				{categories.map((category) => (
					<div
						className="mt-14"
						key={category}
					>
						{/* The section label is how a reader finds the shelf they came
						    for, so it is set to be read: full contrast, and tracking
						    wide enough to separate the words without stretching them
						    past legibility. */}
						<div className="flex items-center gap-4">
							<h3 className="font-display font-semibold text-base text-foreground uppercase tracking-wide">
								{category}
							</h3>
							<span className="h-px flex-1 bg-border" />
						</div>
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{libraries
								.filter((lib) => lib.category === category)
								.map((lib, i) => (
									<div
										className="h-full animate-fade-in-up"
										key={lib.name}
										style={{
											animationDelay: `${i * 100}ms`,
										}}
									>
										<Link
											className="block h-full"
											to={lib.href}
										>
											<LibraryCard {...lib} />
										</Link>
									</div>
								))}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
