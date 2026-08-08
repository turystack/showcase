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
						<h3 className="font-display font-semibold text-muted-foreground text-sm uppercase tracking-widest">
							{category}
						</h3>
						<div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{libraries
								.filter((lib) => lib.category === category)
								.map((lib, i) => (
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
				))}
			</div>
		</section>
	)
}
