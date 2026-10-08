#!/usr/bin/env node

/**
 * Every documented package appears on the home page, and every card leads
 * somewhere.
 *
 * A package reaches the site through three separate registrations: a route, a
 * sidebar section, and a card in `libraries.tsx`. Nothing connects them, so
 * missing the third produces a page that exists and that nobody can find from
 * the front door — which is how four new packages shipped invisible.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'

const ROOT = resolve(import.meta.dirname, '..')
const ROUTES = resolve(ROOT, 'src/routes/libs')

/**
 * A card names its package the way npm does.
 *
 * `tury-stack-proof-mode` sat among thirty-five `@turystack/…` cards because a
 * skill has two names — the one an agent loads and the one npm installs — and
 * the card took the wrong one. Small on its own; it was the loose thread that
 * turned out to be attached to a package whose `name` no rename had reached.
 */
function checkCardNames(problems) {
	const source = readFileSync(resolve(ROOT, 'src/data/libraries.tsx'), 'utf8')
	const names = [
		...source.matchAll(/name: '([^']+)',\n\t\ttagline/g),
	].map((match) => match[1])

	for (const name of names) {
		if (!name.startsWith('@turystack/')) {
			problems.push(
				`card '${name}' is not a package name — every other card is '@turystack/…', and a reader cannot tell what to install from this one`,
			)
		}
	}
}

/**
 * Every skill the CLI installs resolves to a package that exists.
 *
 * `SKILL_PACKAGE` maps a skill to the `packageName` it does `require.resolve`
 * on. When the skill's own `package.json` says something else, the install
 * fails at run time and nothing before that notices — which is exactly what a
 * rename left behind: the CLI looking for `@turystack/proof-mode` and the
 * package still published as `@turystack/delivery`.
 */
function checkSkillPackageNames(problems) {
	const map = resolve(ROOT, '../cli/src/commands/skills/skills.ts')

	if (!existsSync(map)) {
		return
	}

	const source = readFileSync(map, 'utf8')
	const entries = [
		...source.matchAll(/directory: '([^']+)',[\s\S]*?packageName: '([^']+)'/g),
	]

	for (const [, directory, packageName] of entries) {
		const manifest = resolve(ROOT, '..', directory, 'package.json')

		if (!existsSync(manifest)) {
			problems.push(
				`the CLI installs '${directory}', which has no package.json`,
			)
			continue
		}

		const actual = JSON.parse(readFileSync(manifest, 'utf8')).name

		if (actual !== packageName) {
			problems.push(
				`the CLI resolves '${packageName}' for ${directory} and the package is named '${actual}' — \`turystack skills\` would fail to find it`,
			)
		}
	}
}

const cards = new Set(
	[
		...readFileSync(resolve(ROOT, 'src/data/libraries.tsx'), 'utf8').matchAll(
			/href: '\/libs\/([\w-]+)' as const/g,
		),
	].map((match) => match[1]),
)

const routed = new Set(
	readdirSync(ROUTES)
		.filter((entry) => entry.endsWith('.tsx'))
		.map((entry) => entry.replace('.tsx', ''))
		.concat(
			readdirSync(ROUTES).filter((entry) =>
				statSync(join(ROUTES, entry)).isDirectory(),
			),
		),
)

const problems = [
	...[
		...routed,
	]
		.filter((slug) => !cards.has(slug))
		.map((slug) => `/libs/${slug} has a route but no card on the home page`),
	...[
		...cards,
	]
		.filter((slug) => !routed.has(slug))
		.map((slug) => `libraries.tsx links /libs/${slug}, which has no route`),
]

checkCardNames(problems)
checkSkillPackageNames(problems)

if (problems.length > 0) {
	process.stdout.write(
		`\n✖ ${problems.length} showcase registration problem(s):\n`,
	)
	for (const problem of problems) {
		process.stdout.write(`  ${problem}\n`)
	}
	process.stdout.write('\n')
	process.exitCode = 1
} else {
	process.stdout.write(
		`\n✓ ${cards.size} packages: every route has a card, every card names its package, every skill the CLI installs resolves\n\n`,
	)
}
