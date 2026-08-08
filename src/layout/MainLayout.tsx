import { Link } from '@tanstack/react-router'
import { Github } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import { TuryMark } from '@/components/Logo'
import { SpotlightTrigger } from '@/components/SpotlightSearch'
import { ThemeToggle } from '@/components/ThemeToggle'

export function MainLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 border-border/50 border-b bg-background/80 backdrop-blur-xl">
				<div className="container flex h-16 items-center justify-between">
					<Link
						className="flex items-center gap-2"
						to="/"
					>
						<TuryMark size={24} />
						<span className="font-bold font-display text-lg tracking-tight">
							tury<span className="text-tury-green">.dev</span>
						</span>
					</Link>

					<nav className="hidden items-center gap-6 md:flex">
						<SpotlightTrigger className="w-56" />
						<a
							className="text-muted-foreground text-sm transition-colors hover:text-foreground"
							href="#libraries"
						>
							Libraries
						</a>
						<div className="flex items-center gap-1">
							<a
								className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
								href="https://github.com"
								rel="noreferrer"
								target="_blank"
							>
								<Github size={18} />
							</a>
							<ThemeToggle />
						</div>
					</nav>

					<div className="flex items-center gap-2 md:hidden">
						<SpotlightTrigger />
						<ThemeToggle />
					</div>
				</div>
			</header>

			<main className="flex-1">{children}</main>

			<footer className="border-border border-t py-12">
				<div className="container">
					<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
						<div className="flex items-center gap-2">
							<TuryMark size={20} />

							<span className="font-bold font-display text-sm">
								tury<span className="text-tury-green">.dev</span>
							</span>
						</div>

						<p className="text-center text-muted-foreground text-sm">
							Open-source tools for the modern JavaScript ecosystem. Built with
							TypeScript.
						</p>

						<div className="flex gap-6">
							<a
								className="text-muted-foreground text-xs transition-colors hover:text-foreground"
								href="https://github.com"
							>
								GitHub
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
