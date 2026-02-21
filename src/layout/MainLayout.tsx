import type { PropsWithChildren } from 'react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
