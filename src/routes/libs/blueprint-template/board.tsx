import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { prepareSkillMarkdown } from '@/lib/skill-docs'
import exampleIndex from '../../../../../blueprint-template-skill/example/board/index.mdx?raw'
import exampleTask from '../../../../../blueprint-template-skill/example/board/T-1.md?raw'
import exampleBoard from '../../../../../blueprint-template-skill/example/board/tasks.json?raw'

export const Route = createFileRoute('/libs/blueprint-template/board')({
	component: Page,
})

const EXAMPLE_SOURCE =
	'https://github.com/turystack/blueprint-template/blob/main/example'

/** The task whose page is rendered below the board. */
const SHOWN_TASK = 'T-1'

/**
 * The generated pages link the way the Mintlify site they belong to is laid
 * out — `/board/T-3`, `/domains/sales/rules#sales-r-4`. Those paths do not
 * exist here, so each one goes where it can still be read: the task shown on
 * this page to its anchor, the published example report to its copy under
 * `public/`, and every other page to its source in the example.
 */
function relink(markdown: string): string {
	return markdown.replace(/\]\((\/[^)\s]*)\)/g, (_match, target: string) => {
		const [path] = target.split('#')

		if (path === `/board/${SHOWN_TASK}`) {
			return `](#${SHOWN_TASK})`
		}

		if (path.startsWith('/board/reports/')) {
			return `](/examples${path})`
		}

		return `](${EXAMPLE_SOURCE}${path}.md)`
	})
}

/**
 * The first task of the shipped example, as it is written.
 *
 * Read from the file the skill ships rather than retyped here: a snippet that
 * drifts from the page beside it teaches the wrong shape, and nothing would
 * catch it.
 */
function firstTask(): string {
	const board = JSON.parse(exampleBoard) as {
		tasks: unknown[]
	}

	return JSON.stringify(board.tasks[0], null, 2)
}

function GeneratedPage({
	content,
	file,
	id,
}: {
	content: string
	file: string
	id?: string
}) {
	return (
		<div
			className="scroll-mt-20 rounded-lg border border-border bg-card"
			id={id}
		>
			<div className="flex items-center justify-between gap-4 border-border border-b px-4 py-2">
				<span className="font-mono text-muted-foreground text-xs">{file}</span>
				<a
					className="flex shrink-0 items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
					href={`${EXAMPLE_SOURCE}/${file.split('/').slice(1).join('/')}`}
					rel="noreferrer"
					target="_blank"
				>
					Source <ExternalLink size={12} />
				</a>
			</div>
			<div className="px-3 py-2 sm:px-5 [&_table]:min-w-[36rem]">
				<MarkdownDoc content={relink(prepareSkillMarkdown(content))} />
			</div>
		</div>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					The board
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Every project keeps its board inside its own blueprint, as pages of
					the same Mintlify site. <code>board/tasks.json</code> is the state;{' '}
					<code>board/index.mdx</code> and one <code>board/T-n.md</code> per
					task are generated from it by{' '}
					<code>turystack-proof board --write</code> and never edited by hand.
					Below are those pages from the skill's acme example, exactly as the
					command wrote them.
				</p>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The board page</h2>
				<p className="text-muted-foreground">
					The board is continuous: it is the record of what was done, so no task
					is ever deleted. A task a change in the blueprint made obsolete
					becomes <code>superseded</code> and names its successor, and its
					history only grows.
				</p>
				<GeneratedPage
					content={exampleIndex}
					file="acme-blueprint/board/index.mdx"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">A task page</h2>
				<p className="text-muted-foreground">
					A task is lean: an intent, the cases that will prove it, and its
					impact — data, rules, operations, effects, screens, scheduled — in
					words a person can validate. It never names a method, a class or a
					path; those are decided by the pattern skills and recorded afterwards
					as evidence. A person approves it twice before it reaches{' '}
					<code>doing</code>: the plan, then the cases.
				</p>
				<GeneratedPage
					content={exampleTask}
					file={`acme-blueprint/board/${SHOWN_TASK}.md`}
					id={SHOWN_TASK}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">What a task is</h2>
				<p className="text-muted-foreground">
					One entry of <code>tasks.json</code>, the page above before it was
					generated. <code>covers</code> is what makes “is this implemented?”
					answerable by a machine, and <code>cases</code> is what a person reads
					and adds to before any code is written.
				</p>
				<CodeBlock
					code={firstTask()}
					filename="board/tasks.json"
					language="json"
				/>
			</div>

			<div className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Why it lives in the skill
				</h2>
				<p className="text-muted-foreground">
					A board in an external tool disagrees with the repository silently,
					because nothing breaks when it does. Here it is reviewed with the
					change that moves it: <code>gate:board-pages</code> fails when a
					generated page drifts from <code>tasks.json</code>,{' '}
					<code>gate:board-covers-spec</code> fails when an id nobody scheduled
					is left behind, <code>gate:plan-approved</code> and{' '}
					<code>gate:cases-approved</code> fail when implementation started on a
					plan or a list nobody read, <code>gate:board-continuous</code> fails
					when a task disappears, and <code>gate:board-report-linked</code>{' '}
					fails when a task says <code>done</code> with no report attached.
				</p>
			</div>
		</div>
	)
}
