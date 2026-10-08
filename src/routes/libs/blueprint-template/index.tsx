import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getBlueprintTemplateDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/blueprint-template/')({
	component: Page,
})

function Page() {
	const skill = getBlueprintTemplateDoc('SKILL')

	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/blueprint-template
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Template for a project's own blueprint skill. Materialized once as
					&lt;project&gt;-blueprint and owned by that project from then on —
					business rules and modeling per domain, browsable as a Mintlify site,
					and the continuous board of what was done.
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
