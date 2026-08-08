import { createFileRoute } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getFrontendPatternDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/frontend-pattern/')({
	component: Page,
})

function Page() {
	const skill = getFrontendPatternDoc('SKILL')

	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/frontend-pattern
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					Frontend application decisions for web and mobile, without repeating
					library APIs. 15 focused sections, browsable below.
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
