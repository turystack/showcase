import { createFileRoute, Link } from '@tanstack/react-router'

import { MarkdownDoc } from '@/components/docs/MarkdownDoc'
import { getProofModeDoc } from '@/lib/skill-docs'

export const Route = createFileRoute('/libs/proof-mode/')({
	component: Page,
})

function Page() {
	const skill = getProofModeDoc('SKILL')

	return (
		<div className="space-y-10">
			<div>
				<h1 className="font-bold font-display text-3xl tracking-tight">
					@turystack/proof-mode
				</h1>
				<p className="mt-3 text-lg text-muted-foreground">
					The delivery harness: it takes one task, resolves its context, routes
					to the pattern skills, runs the gate ladder per slice, and closes with
					an evidence-backed report attached to the board task it came from.
					What decides the session — and which task this is — is{' '}
					<Link
						className="underline underline-offset-4"
						to="/libs/harness"
					>
						@turystack/harness
					</Link>
					.
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
