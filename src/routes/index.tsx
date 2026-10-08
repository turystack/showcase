import { createFileRoute } from '@tanstack/react-router'

import { TuryMark } from '@/components/Logo'

/**
 * The front door: the mark and the name, nothing else.
 *
 * `/showcase` is internal — reachable by its URL, linked from nowhere here.
 * This page stays outside `_main` on purpose: no header, no search, no
 * library grid.
 */
function Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
			<TuryMark size={56} />

			<h1 className="font-bold font-display text-4xl tracking-tight md:text-5xl">
				tury<span className="text-tury-green">.dev</span>
			</h1>
		</main>
	)
}

export const Route = createFileRoute('/')({
	component: Page,
})
