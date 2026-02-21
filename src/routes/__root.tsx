import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => <Outlet />,

  notFoundComponent: () => (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-display text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found.</p>
    </div>
  ),
})
