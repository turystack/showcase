#!/usr/bin/env node

/**
 * A locally linked package reaches this site through **two** steps, and either
 * one can be stale.
 *
 *     src/  ──build──▶  dist/  ──pnpm install──▶  node_modules/<name>/dist/
 *
 * The second arrow is the one that is easy to forget exists. A `file:`
 * dependency is **copied** into the store, not symlinked, so rebuilding the
 * package does nothing for a consumer that has already installed it. The site
 * keeps serving the previous build, the fix "does not work", and every
 * explanation you reach for is about the code rather than about the copy.
 *
 * That is not hypothetical: it is what made a fixed component keep throwing the
 * old error here. The earlier version of this script compared `src` against the
 * *source* package's `dist` — the first arrow only — so it was green through the
 * entire investigation. A check that cannot fail on the failure you have is
 * worse than no check, because it is evidence pointing the wrong way.
 *
 * Content, not mtime, for the second comparison: install copies files, and what
 * it does to their timestamps is its own business. What the site executes is the
 * bytes.
 */

import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'

const ROOT = resolve(import.meta.dirname, '..')
const STYLESHEET = resolve(ROOT, 'src/index.css')

function walk(directory) {
	const files = []

	for (const entry of readdirSync(directory, {
		withFileTypes: true,
	})) {
		if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
			continue
		}

		const path = join(directory, entry.name)
		files.push(
			...(entry.isDirectory()
				? walk(path)
				: [
						path,
					]),
		)
	}

	return files
}

function newestMtime(directory) {
	return walk(directory).reduce(
		(newest, file) => Math.max(newest, statSync(file).mtimeMs),
		0,
	)
}

/** A fingerprint of what a directory contains, path and bytes both. */
function fingerprint(directory) {
	const hash = createHash('sha256')

	for (const file of walk(directory).sort()) {
		hash.update(file.slice(directory.length))
		hash.update(readFileSync(file))
	}

	return hash.digest('hex').slice(0, 12)
}

const manifest = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'))
const linked = Object.entries({
	...manifest.dependencies,
	...manifest.devDependencies,
}).filter(
	([, version]) => typeof version === 'string' && version.startsWith('file:'),
)

const problems = []
let checked = 0

/**
 * A third arrow, and the quietest of the three: Tailwind reads the linked
 * package to learn which utilities to emit, and an `@source` aimed at a path
 * the installed copy does not have is not an error — it is silence. The classes
 * still reach the DOM, the site's own pass still emits the base utility later
 * in the same cascade layer, and the library's override loses. What you see is
 * a component styled almost right, which reads as a component bug.
 */
let sourced = 0

for (const [, path] of readFileSync(STYLESHEET, 'utf8').matchAll(
	/@source\s+"([^"]+)"/g,
)) {
	sourced += 1

	if (!existsSync(resolve(dirname(STYLESHEET), path))) {
		problems.push(
			`src/index.css: @source "${path}" does not exist — Tailwind scans nothing there, so that package's utilities are never emitted`,
		)
	}
}

for (const [name, version] of linked) {
	const packageRoot = resolve(ROOT, version.replace('file:', ''))
	const source = join(packageRoot, 'src')
	const built = join(packageRoot, 'dist')
	const installed = join(ROOT, 'node_modules', name, 'dist')

	let sourceTime

	try {
		sourceTime = newestMtime(source)
	} catch {
		continue // not a source package; nothing to compare
	}

	checked += 1

	let builtTime

	try {
		builtTime = newestMtime(built)
	} catch {
		problems.push(`${name} has no dist — run its build before using it here`)
		continue
	}

	if (sourceTime > builtTime) {
		const behind = Math.round((sourceTime - builtTime) / 1000)
		problems.push(
			`${name}: src is ${behind}s newer than its dist — build the package (\`pnpm --filter ${name} build\`)`,
		)
		continue
	}

	// The arrow the old check was blind to.
	let installedPrint

	try {
		installedPrint = fingerprint(installed)
	} catch {
		problems.push(
			`${name} is not installed here — run \`pnpm install\` so the site has a copy to serve`,
		)
		continue
	}

	const builtPrint = fingerprint(built)

	if (builtPrint !== installedPrint) {
		problems.push(
			`${name}: the installed copy (${installedPrint}) is not the build on disk (${builtPrint}) — a \`file:\` dependency is copied, not linked, so run \`pnpm install\` after building it`,
		)
	}
}

if (problems.length > 0) {
	process.stdout.write(`\n✖ ${problems.length} stale linked build(s):\n`)
	for (const problem of problems) {
		process.stdout.write(`  ${problem}\n`)
	}
	process.stdout.write('\n')
	process.exitCode = 1
} else {
	process.stdout.write(
		`\n✓ ${checked} linked package(s): built from current source, and the installed copy is that build\n`,
	)
	process.stdout.write(
		`✓ ${sourced} @source path(s) in src/index.css: all present, so Tailwind scans what it is aimed at\n\n`,
	)
}
