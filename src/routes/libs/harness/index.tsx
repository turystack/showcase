import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getHarnessDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/harness/')({
	component: Page,
})

function Page() {
	const skill = getHarnessDoc('SKILL')

	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/harness
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The session's entry point. It reads the disk to decide between
					bootstrap — in the order blueprint → uiux → board: resolve the
					sources, write &lt;project&gt;-blueprint complete through a
					conversation, sweep the design into &lt;project&gt;-uiux, derive the
					board — and routine: implement a task, audit ids against the reports
					that claim them, or hunt a bug.
				</p>
			</div>

			<div className="rounded-lg border border-border bg-card p-6">
				<p className="font-display font-semibold">Install into your repo</p>
				<p className="mt-2 text-muted-foreground text-sm">
					npx @turystack/cli skills — copies the sections into .claude/skills
					and/or .codex/skills, where coding agents pick them up automatically.
				</p>
			</div>

			{skill && <MarkdownDoc content={skill.content} />}
		</div>
	)
}
