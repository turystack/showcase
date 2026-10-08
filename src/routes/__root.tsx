import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import { TuryProvider } from '@turystack/react-web'
import { useState } from 'react'

import { SpotlightSearch } from '@/components/SpotlightSearch'
import { ThemeLabProvider } from '@/lib/theme-lab'

/**
 * The host every react-web overlay portals into.
 *
 * Both stylesheets on this page declare the same design tokens at `:root`, and
 * this site's is imported second, so it wins. `.react-web-surface` restores the
 * library's palette for a subtree — but an overlay does not stay in that
 * subtree. Modal, Sheet, Popover, Tooltip, DropdownMenu and Select all render
 * through a portal, which mounts on `document.body`, outside every surface. So
 * a Modal opened from a preview showed its trigger in the library's colours and
 * its contents in this site's, which is exactly the drift these previews exist
 * to rule out.
 *
 * Mounting one host that wears the scope class and naming it as the provider's
 * `portalContainer` puts every portalled surface back inside the library's
 * tokens. It sits at the root rather than inside `ComponentPreview` because the
 * preview box is `overflow-hidden` and 8rem tall: a modal parented there would
 * render in the right colours and be clipped to a strip.
 */
function Root() {
	const [portalHost, setPortalHost] = useState<HTMLElement | null>(null)

	return (
		<TuryProvider
			defaultColorScheme="system"
			portalContainer={portalHost}
		>
			<ThemeLabProvider>
				<SpotlightSearch />
				<Outlet />
				<div
					className="react-web-surface"
					ref={setPortalHost}
				/>
			</ThemeLabProvider>
		</TuryProvider>
	)
}

/**
 * `@turystack/spec-template` became `@turystack/blueprint-template`.
 *
 * Its published README and every link already shared point at
 * `/libs/spec-template/…`, and the sections did not survive one to one, so each
 * old page goes to the page that now holds what it said. A route directory per
 * old path would register a library with no card; the root is the one place a
 * redirect costs nothing else.
 */
const LEGACY_SPEC_TEMPLATE: Record<string, string> = {
	'00-overview': '',
	'01-definition': '/index',
	'02-domains': '/guide-domain',
	'03-rules': '/guide-rules',
	'04-flows': '/guide-flows',
	'05-glossary': '/glossary',
	'06-filling': '/guide-filling',
	'07-board': '/guide-task',
	board: '/board',
}

function legacyRedirect(pathname: string): string | undefined {
	if (pathname === '/libs/harness/04-spec-bootstrap') {
		return '/libs/harness/04-blueprint-bootstrap'
	}

	const match = pathname.match(/^\/libs\/spec-template(?:\/([^/]*))?\/?$/)

	if (!match) {
		return undefined
	}

	return `/libs/blueprint-template${LEGACY_SPEC_TEMPLATE[match[1] ?? ''] ?? ''}`
}

export const Route = createRootRoute({
	beforeLoad: ({ location }) => {
		const target = legacyRedirect(location.pathname)

		if (target) {
			throw redirect({
				href: target,
				replace: true,
			})
		}
	},

	component: Root,

	notFoundComponent: () => (
		<div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
			<h1 className="font-bold font-display text-4xl">404</h1>
			<p className="text-muted-foreground">Page not found.</p>
		</div>
	),
})
