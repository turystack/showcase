import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

import { highlight } from '@/lib/highlight'
import { cn } from '@/lib/utils'

type Tab = {
	label: string
	code: string
}

type CodeBlockProps = {
	code?: string
	language?: string
	filename?: string
	tabs?: Tab[]
}

function stripComments(code: string): string {
	return code
		.split('\n')
		.filter((line) => !line.trim().startsWith('//'))
		.join('\n')
}

export function CodeBlock({
	code,
	language = 'tsx',
	filename,
	tabs,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false)
	const [activeTab, setActiveTab] = useState(0)
	const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

	const activeCode = tabs ? tabs[activeTab].code : (code ?? '')
	const cleanedCode = stripComments(activeCode)

	useEffect(() => {
		setHighlightedHtml(null)
		highlight(cleanedCode, language).then(setHighlightedHtml)
	}, [
		cleanedCode,
		language,
	])

	const handleCopy = async () => {
		await navigator.clipboard.writeText(cleanedCode)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-zinc-950">
			{tabs ? (
				<div className="flex items-center border-border border-b">
					{tabs.map((tab, i) => (
						<button
							className={cn(
								'px-4 py-2 text-xs transition-colors',
								i === activeTab
									? 'border-tury-cyan border-b-2 text-tury-cyan'
									: 'text-zinc-400 hover:text-zinc-200',
							)}
							key={tab.label}
							onClick={() => setActiveTab(i)}
							type="button"
						>
							{tab.label}
						</button>
					))}
				</div>
			) : (
				filename && (
					<div className="flex items-center justify-between border-border border-b px-4 py-2">
						<span className="text-muted-foreground text-xs">{filename}</span>
						<span className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-400">
							{language}
						</span>
					</div>
				)
			)}
			<div className="relative">
				<button
					aria-label="Copy code"
					className="absolute top-3 right-3 rounded-md border border-border bg-zinc-800 p-1.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
					onClick={handleCopy}
					type="button"
				>
					{copied ? <Check size={14} /> : <Copy size={14} />}
				</button>
				<pre className="overflow-x-auto p-4 text-sm leading-relaxed">
					{highlightedHtml ? (
						<div
							className="[&>pre]:bg-transparent! [&>pre]:p-0!"
							dangerouslySetInnerHTML={{
								__html: highlightedHtml,
							}}
						/>
					) : (
						<code className="text-zinc-100">{cleanedCode}</code>
					)}
				</pre>
			</div>
		</div>
	)
}
