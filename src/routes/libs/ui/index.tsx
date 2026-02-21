import { createFileRoute } from '@tanstack/react-router'

import { CodeBlock } from '@/components/docs/CodeBlock'

export const Route = createFileRoute('/libs/ui/')({
  component: UiIntroduction,
})

function UiIntroduction() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          @tury/ui
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          A collection of accessible, customizable UI components built with
          Radix UI and Tailwind CSS.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Installation</h2>
        <CodeBlock
          code="pnpm add @tury/ui"
          language="bash"
          filename="terminal"
        />
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Features</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1 text-tury-cyan">→</span>
            <span>
              Built on Radix UI primitives for full accessibility out of the box
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-tury-cyan">→</span>
            <span>
              Styled with Tailwind CSS and customizable via CSS variables
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-tury-cyan">→</span>
            <span>
              TypeScript-first with full type definitions for all components
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-tury-cyan">→</span>
            <span>
              Dark mode support via class-based theming
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Usage</h2>
        <CodeBlock
          code={`import { Button } from '@tury/ui'

export function App() {
  return <Button>Click me</Button>
}`}
          language="tsx"
          filename="App.tsx"
        />
      </div>
    </div>
  )
}
