import { Link } from '@tanstack/react-router'
import { X } from 'lucide-react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

export interface SidebarItem {
  label: string
  to: string
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}

const defaultSections: SidebarSection[] = [
  {
    title: 'Getting Started',
    items: [{ label: 'Introduction', to: '/libs/ui' }],
  },
  {
    title: 'Components',
    items: [{ label: 'Button', to: '/libs/ui/button' }],
  },
]

interface DocsSidebarProps {
  open: boolean
  onClose: () => void
  sections?: SidebarSection[]
}

export function DocsSidebar({
  open,
  onClose,
  sections = defaultSections,
}: DocsSidebarProps) {
  const isMobile = useIsMobile()

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-border bg-background transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <span className="text-sm font-medium">Menu</span>
          <button
            className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            onClick={onClose}
            type="button"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="p-4 pt-2">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      activeOptions={{ exact: true }}
                      activeProps={{
                        className:
                          'block rounded-md px-3 py-2 text-sm bg-tury-cyan/10 text-tury-cyan font-medium border-l-2 border-tury-cyan transition-colors',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
