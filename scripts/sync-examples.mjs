#!/usr/bin/env node

/**
 * Publishes the skills' example pages so the site can embed them.
 *
 * The examples are real files in the skill packages — the harness flow,
 * `uiux-template`'s theme and the delivery report `blueprint-template`'s example
 * board links from its finished task — and that is the point: what the site
 * shows is what a project materializes, not a mock of it. They cannot be
 * embedded or opened from where they live, because an iframe or a link needs a
 * URL, so they are copied under `public/` with their neighbours intact. (The
 * board itself is not here: its pages are markdown, rendered by the route.)
 *
 * `--check` re-derives and fails when a copy is stale, which is what stops the
 * site from showing a page the skill no longer ships.
 *
 * The pages are linked as `/examples/<name>/index.html`, never as the directory.
 * A directory URL is served by the static middleware in `vite preview` and by
 * the SPA fallback in `vite dev` — so the same href renders the example in one
 * and the site's own 404, inside the iframe, in the other.
 */

import {
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'

const ROOT = resolve(import.meta.dirname, '..')

/** source, relative to the repository root → destination, relative to public/ */
const PUBLISHED = [
	[
		'harness-skill/flow/index.html',
		'examples/flow/index.html',
	],
	[
		'blueprint-template-skill/example/board/reports/T-1/report.html',
		'examples/board/reports/T-1/report.html',
	],
	[
		'uiux-template-skill/theme/example.html',
		'examples/theme/index.html',
	],
]

/**
 * A directory URL is not the page.
 *
 * `vite preview` serves `public/examples/board/` from the static middleware and
 * `vite dev` hands the same path to the SPA fallback, so the identical href
 * renders the example in one and the site's own 404 — inside the iframe — in
 * the other. It shipped that way once; the difference is invisible to `curl`,
 * which gets a 200 either way.
 */
function checkLinks(problems) {
	const files = []

	const walk = (directory) => {
		for (const entry of readdirSync(directory)) {
			const path = join(directory, entry)

			if (statSync(path).isDirectory()) {
				walk(path)
				continue
			}

			if (entry.endsWith('.tsx')) {
				files.push(path)
			}
		}
	}

	walk(resolve(ROOT, 'src/routes'))

	for (const file of files) {
		const seen = new Set()

		for (const [link] of readFileSync(file, 'utf8').matchAll(
			/\/examples\/[\w-]+\/[\w./-]*/g,
		)) {
			if (!link.endsWith('.html') && !seen.has(link)) {
				seen.add(link)
				problems.push(
					`${file.slice(ROOT.length + 1)} links ${link} — a directory URL renders the site's 404 inside the frame under \`vite dev\`; link \`${link}index.html\``,
				)
			}
		}
	}
}

const check = process.argv.includes('--check')
const stale = []

for (const [from, to] of PUBLISHED) {
	const source = readFileSync(resolve(ROOT, '..', from), 'utf8')
	const target = resolve(ROOT, 'public', to)

	if (check) {
		const current = (() => {
			try {
				return readFileSync(target, 'utf8')
			} catch {
				return ''
			}
		})()

		if (current !== source) {
			stale.push(`public/${to} is not ${from}`)
		}

		continue
	}

	mkdirSync(dirname(target), {
		recursive: true,
	})
	writeFileSync(target, source, 'utf8')
}

/**
 * A file under `public/examples/` that no entry publishes is a page the skills
 * stopped shipping — the retired `board/example.html` stayed served at its old
 * URL after the template that shipped it was gone, because writing only adds.
 */
function checkOrphans(problems) {
	const published = new Set(PUBLISHED.map(([, to]) => to))
	const base = resolve(ROOT, 'public')

	const walk = (directory) => {
		for (const entry of readdirSync(directory)) {
			const path = join(directory, entry)

			if (statSync(path).isDirectory()) {
				walk(path)
				continue
			}

			const relative = path.slice(base.length + 1)

			if (!published.has(relative)) {
				problems.push(
					`public/${relative} is published by no entry — delete it, or add the skill file it copies`,
				)
			}
		}
	}

	walk(resolve(base, 'examples'))
}

if (check) {
	checkOrphans(stale)
	checkLinks(stale)
}

if (!check) {
	process.stdout.write(
		`\n✓ published ${PUBLISHED.length} example file(s) under public/examples\n\n`,
	)
} else if (stale.length > 0) {
	process.stdout.write(`\n✖ ${stale.length} example problem(s):\n`)
	for (const problem of stale) {
		process.stdout.write(`  ${problem}\n`)
	}
	process.stdout.write(
		'\n  a stale copy is fixed by `pnpm examples:write`; a link is fixed in the route\n\n',
	)
	process.exitCode = 1
} else {
	process.stdout.write(
		`\n✓ ${PUBLISHED.length} example file(s) match the skills that ship them\n\n`,
	)
}
