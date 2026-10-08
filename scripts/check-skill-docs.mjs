#!/usr/bin/env node

/**
 * Evaluates skill-docs the way the browser does.
 *
 * `vite build` bundles the module without running it, so a module-scope throw
 * lands in the browser rather than in CI — which is exactly how "no title for
 * 'README'" shipped green. Loading it through Vite's SSR pipeline runs the real
 * body, with the real globs, against the real skill packages.
 *
 * This replaces the parallel reimplementation that check-skill-titles.mjs used
 * to be: the two disagreed about README, and the disagreement was the bug.
 */

import process from 'node:process'

import { createServer } from 'vite'

const EXPECTED = [
	[
		'architecture',
		'architecturePatternDocs',
	],
	[
		'harness',
		'harnessDocs',
	],
	[
		'modeling',
		'modelingDocs',
	],
	[
		'backend',
		'backendPatternDocs',
	],
	[
		'frontend',
		'frontendPatternDocs',
	],
	[
		'primitives',
		'frontendPrimitivesPatternDocs',
	],
	[
		'proof-mode',
		'proofModeDocs',
	],
	[
		'blueprint-template',
		'blueprintTemplateDocs',
	],
	[
		'uiux-template',
		'uiuxTemplateDocs',
	],
]

const server = await createServer({
	configFile: 'vite.config.ts',
	logLevel: 'error',
	server: {
		middlewareMode: true,
	},
})

const problems = []

try {
	const docs = await server.ssrLoadModule('/src/lib/skill-docs.ts')

	for (const [name, exported] of EXPECTED) {
		const set = docs[exported]

		if (!Array.isArray(set) || set.length === 0) {
			problems.push(`${name}: ${exported} is empty — the glob resolved nothing`)
			continue
		}

		for (const doc of set) {
			if (doc.slug === 'README') {
				problems.push(`${name}: README leaked into the section list`)
			}

			// A nested skill flattens its path into the slug (`guide/task.md` →
			// `guide-task`); a slash or a dot left in would be a URL segment the
			// `$section` route never matches.
			if (!/^[A-Za-z0-9-]+$/.test(doc.slug)) {
				problems.push(`${name}: '${doc.slug}' is not one URL-safe segment`)
			}

			if (!doc.title || doc.title === doc.slug) {
				problems.push(`${name}: '${doc.slug}' has no real title`)
			}
		}
	}
} catch (error) {
	problems.push(`skill-docs threw while loading: ${error.message}`)
} finally {
	await server.close()
}

if (problems.length > 0) {
	process.stdout.write(`\n✖ ${problems.length} skill doc problem(s):\n`)
	for (const problem of problems) {
		process.stdout.write(`  ${problem}\n`)
	}
	process.stdout.write('\n')
	process.exitCode = 1
} else {
	process.stdout.write(
		`\n✓ ${EXPECTED.length} skill modules evaluate: no README, every section titled\n\n`,
	)
}
