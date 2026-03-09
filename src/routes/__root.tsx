import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Provider } from '@turystack/ui'

export const Route = createRootRoute({
	component: () => (
		<Provider defaultColorScheme="system">
			<Outlet />
		</Provider>
	),

	notFoundComponent: () => (
		<div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
			<h1 className="font-bold font-display text-4xl">404</h1>
			<p className="text-muted-foreground">Page not found.</p>
		</div>
	),
})
