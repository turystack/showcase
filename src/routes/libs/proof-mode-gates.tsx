import { createFileRoute } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import { CodeBlock } from '@/components/docs/CodeBlock'
import { reportBlocks, reportCommands } from '@/data/proof-mode-report'
import { proofModeGatesSections } from '@/data/search-items'

function Page() {
	return (
		<LibraryLayout
			githubUrl="https://github.com/turystack/proof-mode-gates"
			libraryName="@turystack/proof-mode-gates"
			sections={proofModeGatesSections}
		>
			<div className="space-y-10">
				<div>
					<h1 className="font-bold font-display text-3xl tracking-tight">
						@turystack/proof-mode-gates
					</h1>
					<p className="mt-3 text-lg text-muted-foreground">
						The gate runner. It orchestrates the delivery ladder, executes the
						structural checks the skills bind to, and emits a report whose
						verdict is computed from the gates and the evidence rather than
						declared in a payload.
					</p>
				</div>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Install</h2>
					<CodeBlock
						code="pnpm add -D @turystack/proof-mode-gates"
						language="bash"
					/>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">Usage</h2>
					<CodeBlock
						code={reportCommands
							.map(({ command, does }) => `${command.padEnd(38)}# ${does}`)
							.join('\n')}
						language="bash"
					/>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">What it writes</h2>
					<p className="max-w-prose text-muted-foreground">
						Two files, always as a pair, into the <code>--out</code> directory.
						The JSON is the source and the page is the JSON injected into a
						template — so the verdict is computed twice from the same object and
						never typed by hand.
					</p>

					<div className="overflow-x-auto rounded-lg border border-border">
						<table className="w-full text-sm">
							<tbody>
								<tr className="border-border border-b">
									<td className="p-3 font-medium">
										<code>gate-report.json</code>
									</td>
									<td className="p-3 text-muted-foreground">
										the payload — what CI reads
									</td>
								</tr>
								<tr>
									<td className="p-3 font-medium">
										<code>gate-report.html</code>
									</td>
									<td className="p-3 text-muted-foreground">
										self-contained page — what a person opens and disagrees with
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<p className="max-w-prose text-muted-foreground text-sm">
						<code>structure</code> and <code>skill</code> write nothing — they
						report to stdout and set an exit code. Both <code>run</code> and{' '}
						<code>report</code> also print one line for a pull request comment.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						What the payload carries
					</h2>
					<p className="max-w-prose text-muted-foreground">
						{reportBlocks.length} blocks, and each one is there to stop
						something specific. This table is generated from the runner's own
						template, so the page cannot describe a report it does not emit.
					</p>

					<div className="overflow-x-auto rounded-lg border border-border">
						<table className="w-full text-sm">
							<thead className="border-border border-b bg-muted/40">
								<tr>
									<th className="p-3 text-left font-medium">Block</th>
									<th className="p-3 text-left font-medium">Shape</th>
									<th className="p-3 text-left font-medium">Stops</th>
								</tr>
							</thead>
							<tbody>
								{reportBlocks.map((block) => (
									<tr
										className="border-border border-b last:border-0"
										key={block.name}
									>
										<td className="p-3 align-top font-medium">
											<code className="text-xs">{block.name}</code>
										</td>
										<td className="p-3 align-top">
											<code className="text-muted-foreground text-xs">
												{block.shape}
											</code>
										</td>
										<td className="p-3 align-top text-muted-foreground">
											{block.stops}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<p className="max-w-prose text-muted-foreground text-sm">
						The verdict is not one of them. It is recomputed on write and on
						render from the ladder, the required captures and the signed manual
						bindings — so a payload cannot declare itself green.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						What it is, and what it is not
					</h2>
					<div className="overflow-x-auto rounded-lg border border-border">
						<table className="w-full text-sm">
							<tbody>
								<tr className="border-border border-b">
									<td className="p-3 font-medium">
										@turystack/proof-mode-gates
									</td>
									<td className="p-3 text-muted-foreground">
										runs the ladder, the gate:* checks, and emits the report
									</td>
								</tr>
								<tr className="border-border border-b">
									<td className="p-3 font-medium">
										@turystack/backend-config · frontend-config
									</td>
									<td className="p-3 text-muted-foreground">
										ship the Biome config and the grit:* plugins
									</td>
								</tr>
								<tr>
									<td className="p-3 font-medium">@turystack/proof-mode</td>
									<td className="p-3 text-muted-foreground">
										the skill that says when to run it and what must be proven
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p className="text-muted-foreground text-sm">
						The grit:* rules do not live here: a GritQL plugin is loaded by
						Biome, and a plugin path does not resolve through an extended config
						in node_modules — so the .grit files ship with the config packages
						and the project declares them in its own biome.json.
					</p>
				</section>

				<section className="space-y-4">
					<h2 className="font-display font-semibold text-xl">
						Pending is not passing
					</h2>
					<p className="text-muted-foreground">
						A skill declares more gate: bindings than this runner implements.
						The unimplemented ones are carried into the report as pending, never
						dropped and never counted as green. A report that silently omits
						what it could not check is a report claiming coverage it does not
						have.
					</p>
				</section>
			</div>
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/proof-mode-gates')({
	component: Page,
})
