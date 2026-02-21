import { createFileRoute, Outlet } from '@tanstack/react-router'

import { MainLayout } from '@/layout'

export const Route = createFileRoute('/_main')({
  component: () => (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ),
})
