import { Link } from '@tanstack/react-router'
import { Github, Terminal } from 'lucide-react'
import type { PropsWithChildren } from 'react'

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
						<Terminal className="h-6 w-6 text-tury-cyan" />
						<span className="font-bold font-display text-lg tracking-tight">
							tury<span className="text-tury-cyan">.dev</span>
						</span>
					</Link>

					<nav className="hidden items-center gap-8 md:flex">
						<a
							className="text-muted-foreground text-sm transition-colors hover:text-foreground"
							href="#libraries"
						>
							Libraries
						</a>
						<a
							className="text-muted-foreground text-sm transition-colors hover:text-foreground"
							href="https://github.com"
							rel="noreferrer"
							target="_blank"
						>
							<Github size={18} />
						</a>
						<ThemeToggle />
					</nav>

					<div className="flex items-center gap-2 md:hidden">
						<ThemeToggle />
					</div>
				</div>
			</header>

			<main className="flex-1">{children}</main>

			<footer className="border-border border-t py-12">
				<div className="container">
					<div className="flex flex-col items-center justify-between gap-6 md:flex-row">
						<div className="flex items-center gap-2">
							<Terminal className="h-5 w-5 text-tury-cyan" />

							<span className="font-bold font-display text-sm">
								tury<span className="text-tury-cyan">.dev</span>
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
