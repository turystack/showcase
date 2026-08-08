import type { ComponentProps, ReactNode } from 'react'
import { Children, isValidElement, useEffect, useId, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { highlight } from '@/lib/highlight'

type MarkdownDocProps = {
	content: string
}

function HighlightedBlock({
	code,
	language,
}: {
	code: string
	language: string
}) {
	const [html, setHtml] = useState<string | null>(null)

	useEffect(() => {
		let active = true
		highlight(code, language).then((result) => {
			if (active) {
				setHtml(result)
			}
		})
		return () => {
			active = false
		}
	}, [
		code,
		language,
	])

	if (!html) {
		return (
			<pre className="my-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-relaxed">
				{code}
			</pre>
		)
	}

	return (
		<div
			className="my-4 overflow-x-auto rounded-lg border border-border bg-card p-4 text-[13px] leading-relaxed [&>pre]:m-0 [&>pre]:bg-transparent! [&>pre]:p-0 [&_code]:font-mono"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: html gerado localmente pelo shiki a partir dos .md do repo
			dangerouslySetInnerHTML={{
				__html: html,
			}}
		/>
	)
}

function MermaidDiagram({ code }: { code: string }) {
	const [svg, setSvg] = useState('')
	const id = useId().replace(/[^a-zA-Z0-9]/g, '')

	useEffect(() => {
		let active = true

		const render = async () => {
			try {
				const { default: mermaid } = await import('mermaid')
				mermaid.initialize({
					securityLevel: 'loose',
					startOnLoad: false,
					theme: 'dark',
				})
				const rendered = await mermaid.render(`mmd${id}`, code)
				if (active) {
					setSvg(rendered.svg)
				}
			} catch {
				if (active) {
					setSvg('')
				}
			}
		}

		void render()

		return () => {
			active = false
		}
	}, [
		code,
		id,
	])

	if (!svg) {
		return (
			<pre className="my-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-relaxed">
				{code}
			</pre>
		)
	}

	return (
		<div
			className="my-4 flex justify-center overflow-x-auto rounded-lg border border-border bg-card p-6 [&_svg]:h-auto [&_svg]:max-w-full"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: svg gerado localmente pelo mermaid a partir dos .md do repo
			dangerouslySetInnerHTML={{
				__html: svg,
			}}
		/>
	)
}

function extractCodeBlock(children: ReactNode): {
	code: string
	language: string
} | null {
	try {
		const child = Children.only(children)
		if (
			isValidElement<{
				children?: ReactNode
				className?: string
			}>(child)
		) {
			const language =
				child.props.className?.match(/language-([\w-]+)/)?.[1] ?? ''
			return {
				code: String(child.props.children ?? '').replace(/\n$/, ''),
				language,
			}
		}
	} catch {
		return null
	}
	return null
}

const components: ComponentProps<typeof ReactMarkdown>['components'] = {
	a: ({ children, href }) => (
		<a
			className="text-lib underline underline-offset-2"
			href={href}
		>
			{children}
		</a>
	),
	blockquote: ({ children }) => (
		<blockquote className="my-4 border-lib/40 border-l-2 pl-4 text-muted-foreground [&>p]:my-2">
			{children}
		</blockquote>
	),
	code: ({ children, className }) => {
		if (className?.includes('language-')) {
			return <code className={className}>{children}</code>
		}
		return (
			<code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
				{children}
			</code>
		)
	},
	em: ({ children }) => <em>{children}</em>,
	h1: ({ children }) => (
		<h1 className="mb-4 font-bold font-display text-3xl tracking-tight">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="mt-10 mb-4 border-border border-b pb-2 font-display font-semibold text-xl">
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="mt-8 mb-3 font-display font-semibold text-lg">{children}</h3>
	),
	hr: () => <hr className="my-8 border-border" />,
	li: ({ children }) => <li className="leading-relaxed">{children}</li>,
	ol: ({ children }) => (
		<ol className="my-3 list-decimal space-y-1.5 pl-6 text-muted-foreground">
			{children}
		</ol>
	),
	p: ({ children }) => (
		<p className="my-3 text-muted-foreground leading-relaxed">{children}</p>
	),
	pre: ({ children }) => {
		const block = extractCodeBlock(children)

		if (block?.language === 'mermaid') {
			return <MermaidDiagram code={block.code} />
		}

		if (block) {
			return (
				<HighlightedBlock
					code={block.code}
					language={block.language}
				/>
			)
		}

		return (
			<pre className="my-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-relaxed [&_code]:bg-transparent [&_code]:p-0">
				{children}
			</pre>
		)
	},
	strong: ({ children }) => (
		<strong className="font-semibold text-foreground">{children}</strong>
	),
	table: ({ children }) => (
		<div className="my-4 overflow-x-auto rounded-lg border border-border">
			<table className="w-full text-sm">{children}</table>
		</div>
	),
	tbody: ({ children }) => <tbody>{children}</tbody>,
	td: ({ children }) => (
		<td className="border-border border-t px-3 py-2 align-top text-muted-foreground">
			{children}
		</td>
	),
	th: ({ children }) => (
		<th className="bg-secondary px-3 py-2 text-left font-semibold text-foreground">
			{children}
		</th>
	),
	ul: ({ children }) => (
		<ul className="my-3 list-disc space-y-1.5 pl-6 text-muted-foreground">
			{children}
		</ul>
	),
}

/** Renders a skill .md file with the docs visual language. */
export function MarkdownDoc({ content }: MarkdownDocProps) {
	return (
		<div className="max-w-none">
			<ReactMarkdown
				components={components}
				remarkPlugins={[
					remarkGfm,
				]}
			>
				{content}
			</ReactMarkdown>
		</div>
	)
}
