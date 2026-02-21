import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
}

export function CodeBlock({ code, language = 'tsx', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-zinc-950">
      {filename && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">{filename}</span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <button
          className="absolute right-3 top-3 rounded-md border border-border bg-zinc-800 p-1.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
          onClick={handleCopy}
          type="button"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-zinc-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
