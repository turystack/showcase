import { Link } from '@tanstack/react-router'
import { ChevronRight, Menu, Terminal, X } from 'lucide-react'

import { ThemeToggle } from '@/components/ThemeToggle'

interface DocsHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  libraryName?: string
}

export function DocsHeader({
  sidebarOpen,
  onToggleSidebar,
  libraryName,
}: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <button
          aria-label="Toggle sidebar"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={onToggleSidebar}
          type="button"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-2">
          <Link
            className="flex items-center gap-2 hover:opacity-80"
            to="/"
          >
            <Terminal className="h-5 w-5 text-tury-cyan" />
            <span className="font-display text-sm font-bold tracking-tight">
              tury<span className="text-tury-cyan">.dev</span>
            </span>
          </Link>

          {libraryName && (
            <>
              <ChevronRight
                className="text-muted-foreground"
                size={14}
              />
              <span className="text-sm font-medium text-foreground">
                {libraryName}
              </span>
            </>
          )}
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
