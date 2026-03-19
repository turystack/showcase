import { createHighlighter } from 'shiki'

const highlighterPromise = createHighlighter({
	langs: [
		'tsx',
		'typescript',
		'javascript',
		'jsx',
		'bash',
		'json',
	],
	themes: [
		'github-dark',
	],
})

const validLangs = [
	'tsx',
	'typescript',
	'javascript',
	'jsx',
	'bash',
	'json',
]

export async function highlight(code: string, lang: string): Promise<string> {
	const highlighter = await highlighterPromise
	const language = validLangs.includes(lang) ? lang : 'tsx'
	return highlighter.codeToHtml(code, {
		lang: language,
		theme: 'github-dark',
	})
}
