import { Link } from '@tanstack/react-router'
import { Github, Terminal } from 'lucide-react'

import { ThemeToggle } from './ThemeToggle'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-tury-cyan" />
          <span className="font-display text-lg font-bold tracking-tight">
            tury<span className="text-tury-cyan">.dev</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="#libraries"
          >
            Libraries
          </a>
          <a
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com"
            rel="noreferrer"
            target="_blank"
          >
            <Github size={18} />
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
