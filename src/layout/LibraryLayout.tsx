import { useState } from 'react'
import type { ReactNode } from 'react'

import { DocsHeader } from '@/components/docs/DocsHeader'
import { DocsSidebar } from '@/components/docs/DocsSidebar'
import type { SidebarSection } from '@/components/docs/DocsSidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface LibraryLayoutProps {
  children: ReactNode
  libraryName?: string
  sections?: SidebarSection[]
}

export function LibraryLayout({
  children,
  libraryName,
  sections,
}: LibraryLayoutProps) {
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev)
  const handleCloseSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex min-h-screen flex-col">
      <DocsHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        libraryName={libraryName}
      />

      <div className="flex flex-1">
        <DocsSidebar
          open={sidebarOpen}
          onClose={handleCloseSidebar}
          sections={sections}
        />

        <main
          className={cn(
            'flex-1 transition-all duration-300',
            sidebarOpen && !isMobile ? 'ml-64' : 'ml-0',
          )}
        >
          <div className="mx-auto max-w-3xl p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
