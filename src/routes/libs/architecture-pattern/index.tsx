import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getArchitecturePatternDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/architecture-pattern/')({
	component: Page,
})

function Page() {
	const skill = getArchitecturePatternDoc('SKILL')

	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/architecture-pattern
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The constitution: the law that survives a change of stack. Read it
					before the stack skill, on any non-trivial change.
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
