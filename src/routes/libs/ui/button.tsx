import { createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { CodeBlock } from '@/components/docs/CodeBlock'
import { ComponentPreview } from '@/components/docs/ComponentPreview'
import { PropsTable } from '@/components/docs/PropsTable'

export const Route = createFileRoute('/libs/ui/button')({
  component: ButtonDocs,
})

const buttonProps = [
  {
    name: 'variant',
    type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
    default: '"default"',
    description: 'The visual style variant of the button.',
  },
  {
    name: 'size',
    type: '"default" | "sm" | "lg" | "icon"',
    default: '"default"',
    description: 'The size of the button.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description:
      'When true, the button renders as its child element using Radix Slot.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button, preventing interaction.',
  },
  {
    name: 'onClick',
    type: '(event: React.MouseEvent<HTMLButtonElement>) => void',
    description: 'Handler called when the button is clicked.',
  },
]

const usageCode = `import { Button } from '@tury/ui'

// Default
<Button>Click me</Button>

// Variants
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="secondary">Secondary</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>`

function ButtonDocs() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Button
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Preview</h2>
        <ComponentPreview title="Button variants">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Sizes</h2>
        <ComponentPreview title="Button sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" filename="example.tsx" />
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Props</h2>
        <PropsTable props={buttonProps} />
      </div>
    </div>
  )
}
