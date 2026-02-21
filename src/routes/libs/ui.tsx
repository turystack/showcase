import { createFileRoute, Outlet } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

export const Route = createFileRoute('/libs/ui')({
  component: () => (
    <LibraryLayout libraryName="@tury/ui">
      <Outlet />
    </LibraryLayout>
  ),
})
