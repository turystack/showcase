#!/usr/bin/env node

/**
 * The component menu is a claim about react-web's public API. This checks it.
 *
 * A hand-maintained navigation drifts in three directions, and each one lies to
 * a different person:
 *
 *   listed but not exported   a link to a component that no longer exists
 *   listed but deprecated     the docs advertising the name you renamed away from
 *   exported but not listed   a component nobody can find, so nobody uses it
 *
 * The first is loud eventually. The other two never surface on their own — a
 * retired provider alias sat in the menu as a first-class entry for as long as
 * nobody read the source and noticed it was a `@deprecated const` pointing at
 * the real one. A reader following the menu would have adopted the very name
 * the library was trying to retire.
 *
 * The truth is read from the artifact the site serves and from react-web's own
 * source, never from a second list kept here. Comparing two hand-written lists
 * only proves they were typed by the same person.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'

const ROOT = resolve(import.meta.dirname, '..')
const DIST = resolve(ROOT, 'node_modules/@turystack/react-web/dist/index.js')
const SOURCE = resolve(ROOT, '../react-web/src')
const MENU = resolve(ROOT, 'src/data/react-web-components.ts')
const HOOKS = resolve(ROOT, 'src/data/react-web-hooks.ts')

/**
 * Exports that are neither a component nor a hook.
 *
 * They still have to be *findable*, so this list is not an exemption — it is
 * checked against `OTHER_EXPORTS` in the hook catalogue, which the hooks
 * overview renders. An export that appears here and not there would be one a
 * reader could only discover by opening the bundle.
 */
const NOT_A_COMPONENT = new Set([
	'ColorSchemeContext',
	'LayoutContext',
	'LabelsContext',
	'PortalContext',
	'DEFAULT_COLORS',
	'styles',
	'toast',
])

function exportsOf(file) {
	const source = readFileSync(file, 'utf8')
	const names = new Set()

	for (const block of source.matchAll(/export\s*\{([^}]*)\}/g)) {
		for (const part of block[1].split(',')) {
			const name = part
				.trim()
				.split(/\s+as\s+/)
				.pop()
				?.trim()

			if (name) {
				names.add(name)
			}
		}
	}

	return names
}

/** Names react-web itself marks `@deprecated`, read from its source. */
function deprecatedIn(directory) {
	const names = new Set()

	for (const entry of readdirSync(directory, {
		withFileTypes: true,
	})) {
		const path = join(directory, entry.name)

		if (entry.isDirectory()) {
			for (const name of deprecatedIn(path)) {
				names.add(name)
			}
			continue
		}

		if (!/\.tsx?$/.test(entry.name)) {
			continue
		}

		for (const match of readFileSync(path, 'utf8').matchAll(
			/@deprecated[^*]*\*\/\s*export\s+(?:const|function|type|class)\s+(\w+)/g,
		)) {
			names.add(match[1])
		}
	}

	return names
}

const exported = exportsOf(DIST)
const deprecated = deprecatedIn(SOURCE)
const menu = [
	...readFileSync(MENU, 'utf8').matchAll(/name:\s*'([^']+)'/g),
].map((match) => match[1])

const hookCatalogue = readFileSync(HOOKS, 'utf8')
const documentedHooks = [
	...hookCatalogue.matchAll(/name:\s*'(use[A-Z]\w*)'/g),
].map((match) => match[1])
const surfaced = [
	...hookCatalogue.matchAll(/name:\s*'([A-Za-z_][\w]*)',\n\t\tnote:/g),
].map((match) => match[1])

const isHook = (name) => /^use[A-Z]/.test(name)
const isConstant = (name) => /^[A-Z0-9_]+$/.test(name)
const isValue = (name) => /^[a-z]/.test(name) && !isHook(name)

const components = [
	...exported,
].filter(
	(name) =>
		!isHook(name) &&
		!isValue(name) &&
		!isConstant(name) &&
		!NOT_A_COMPONENT.has(name),
)

const problems = []

for (const name of menu) {
	if (!exported.has(name)) {
		problems.push(
			`${name} is in the menu and react-web does not export it — the link goes nowhere`,
		)
		continue
	}

	if (deprecated.has(name)) {
		problems.push(
			`${name} is marked @deprecated in react-web — a menu entry advertises it as current API, which is the opposite of retiring it`,
		)
	}
}

for (const name of components) {
	if (deprecated.has(name) || menu.includes(name)) {
		continue
	}

	problems.push(
		`${name} is exported and absent from the menu — a component nobody can find is a component nobody uses`,
	)
}

for (const name of [
	...exported,
].filter(isHook)) {
	if (documentedHooks.includes(name)) {
		continue
	}

	problems.push(
		`${name} is exported and absent from the hook catalogue — twenty three of these were invisible until someone read the bundle`,
	)
}

for (const name of documentedHooks) {
	if (!exported.has(name)) {
		problems.push(
			`${name} is in the hook catalogue and react-web does not export it`,
		)
	}
}

// The leftovers are allowed to have no page. They are not allowed to have no
// mention: every one has to appear in OTHER_EXPORTS, which the overview renders.
for (const name of NOT_A_COMPONENT) {
	if (!exported.has(name)) {
		problems.push(
			`${name} is allowlisted here and react-web no longer exports it — drop it`,
		)
	} else if (!surfaced.includes(name)) {
		problems.push(
			`${name} is exported, has no page, and is not listed in OTHER_EXPORTS — it would be findable only by reading the bundle`,
		)
	}
}

const hooks = [
	...exported,
]
	.filter(isHook)
	.sort()

if (problems.length > 0) {
	process.stdout.write(`\n✖ ${problems.length} react-web API problem(s):\n`)
	for (const problem of problems) {
		process.stdout.write(`  ${problem}\n`)
	}
	process.stdout.write('\n')
	process.exitCode = 1
} else {
	const current = components.filter((name) => !deprecated.has(name))
	const retired = components.length - current.length

	process.stdout.write(
		`\n✓ react-web API: every export is in the menu\n` +
			`  ${current.length} component(s)${retired > 0 ? ` (${retired} deprecated, correctly absent)` : ''}` +
			` · ${hooks.length} hook(s) · ${surfaced.length} other export(s) listed on the hooks overview\n\n`,
	)
}
