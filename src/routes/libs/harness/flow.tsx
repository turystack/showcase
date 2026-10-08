import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'

export const Route = createFileRoute('/libs/harness/flow')({
	component: Page,
})

function Page() {
	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					The flow
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The whole path on one page: from an empty repository to tasks whose
					every id is tied to the test that proved it, with the branch at each
					step and the check that holds it. This is <code>flow/index.html</code>
					, which ships with the skill — in a project it opens from{' '}
					<code>.claude/skills/turystack-harness/flow/index.html</code>.
				</p>
			</div>

			<div className="rounded-lg border border-border bg-card">
				<div className="flex items-center justify-between border-border border-b px-4 py-2">
					<span className="font-mono text-muted-foreground text-xs">
						turystack-harness/flow/index.html
					</span>
					<a
						className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
						href="/examples/flow/index.html"
						rel="noreferrer"
						target="_blank"
					>
						Open in a new tab <ExternalLink size={12} />
					</a>
				</div>
				<iframe
					className="h-[52rem] w-full rounded-b-lg bg-background"
					src="/examples/flow/index.html"
					title="The Turystack flow, end to end"
				/>
			</div>
		</div>
	)
}
