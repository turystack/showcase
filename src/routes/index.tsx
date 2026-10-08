import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { TuryMark } from '@/components/Logo'

/**
 * The front door: the mark, one line, one way in.
 *
 * Everything the site documents lives at `/showcase`. This page stays outside
 * `_main` on purpose — no header, no search, no library grid.
 */
function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
			<TuryMark size={56} />

			<h1 className="font-bold font-display text-4xl tracking-tight md:text-5xl">
				tury<span className="text-tury-green">.dev</span>
			</h1>

			<Link
				className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
				to="/showcase"
			>
				Showcase
				<ArrowRight size={14} />
			</Link>
		</main>
	)
}

export const Route = createFileRoute('/')({
	component: Page,
})
