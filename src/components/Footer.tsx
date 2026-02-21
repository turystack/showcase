import { Terminal } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-tury-cyan" />

            <span className="font-display text-sm font-bold">
              tury<span className="text-tury-cyan">.dev</span>
            </span>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Open-source tools for the modern JavaScript ecosystem. Built with
            TypeScript.
          </p>

          <div className="flex gap-6">
            <a
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
