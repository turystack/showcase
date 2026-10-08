#!/usr/bin/env node

/**
 * Write the uiux template's `theme/template.css` from what react-web publishes.
 *
 * The template is where a project's theme starts — copy, rename, fill — so it
 * has to name every hook the library offers: every token in `index.css` and
 * every slot class. Typed by hand it named five tokens out of forty and no
 * slot at all, and a hook missing from the starting point is a hook nobody
 * knows they may override.
 *
 * The slots come from `src/data/react-web-slots.ts`, the same file the Theme
 * lab's scaffold and the Slots tables are built from, so the three cannot
 * disagree. The tokens come from react-web's own `src/index.css`. `--check`
 * re-derives and compares, and fails when the template drifted.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const ROOT = resolve(import.meta.dirname, '..')
const LIBRARY = resolve(ROOT, '../react-web')
const SLOTS = resolve(ROOT, 'src/data/react-web-slots.ts')
const TARGET = resolve(ROOT, '../uiux-template-skill/theme/template.css')

/**
 * Selectors the header cites as examples. Each must appear in `example.css`,
 * whose generator proves every selector lands on the real library — so the
 * template cannot cite one that matches nothing.
 */
const CITED = [
	'.button[data-variant="destructive"]',
	'.button[data-size="sm"]',
	'.checkbox-box[data-checked]',
	'.tabs-trigger[data-active]',
	'.dropdown-menu-item[data-highlighted]',
]

/** A family of Tailwind variables, by prefix, with what it decides. */
const FAMILIES = [
	[
		'--font-weight-',
		'Weights',
	],
	[
		'--font-',
		'Families',
	],
	[
		'--text-',
		"Type scale (and each step's line height)",
	],
	[
		'--leading-',
		'Line heights',
	],
	[
		'--tracking-',
		'Letter spacing',
	],
	[
		'--spacing',
		'Density — every padding, gap and fixed height is a multiple',
	],
	[
		'--radius-',
		'Radius scale — derived from --radius; set one only to break the scale',
	],
	[
		'--shadow-',
		'Shadow scale — derived from --elevation-*; set those instead',
	],
	[
		'--container-',
		'Widths',
	],
	[
		'--breakpoint-',
		'Breakpoints',
	],
	[
		'--blur-',
		'Blur',
	],
	[
		'--ease-',
		'Easing',
	],
	[
		'--animate-',
		'Animations',
	],
	[
		'--default-',
		'Defaults',
	],
	[
		'--color-',
		'Palette colours a component uses by name',
	],
]

/** Every variable in the built `@layer theme` block — what the utilities read. */
function themeLayer(built) {
	const start = built.indexOf('@layer theme{')
	const open = built.indexOf('{', built.indexOf('{', start) + 1)
	let depth = 1
	let index = open + 1

	while (depth > 0 && index < built.length) {
		if (built[index] === '{') {
			depth++
		} else if (built[index] === '}') {
			depth--
		}
		index++
	}

	return [
		...built.slice(open + 1, index - 1).matchAll(/(--[\w-]+):([^;}]+)/g),
	].map((match) => ({
		name: match[1],
		value: match[2].trim(),
	}))
}

/** The declarations of the first top-level block opened by `selector {`. */
function declarations(css, selector) {
	const start = css.indexOf(`\n${selector} {`)

	if (start === -1) {
		throw new Error(`react-web/src/index.css has no \`${selector}\` block`)
	}

	const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('\n}', start))
	const clean = body.replace(/\/\*[\s\S]*?\*\//g, '')

	return [
		...clean.matchAll(/(--[\w-]+):\s*([^;]+);/g),
	].map((match) => ({
		name: match[1],
		value: match[2].trim().replace(/\s+/g, ' '),
	}))
}

function readSlots() {
	const source = readFileSync(SLOTS, 'utf8')
	const body = source.slice(source.indexOf('reactWebSlots'))
	const components = new Map()
	let current

	for (const line of body.split('\n')) {
		const owner = /^\t'?([\w-]+)'?: \[$/.exec(line)

		if (owner) {
			current = owner[1]
			components.set(current, [])
			continue
		}

		const slot = /^\t\t\tname: '([\w-]+)',$/.exec(line)

		if (slot && current) {
			components.get(current).push(slot[1])
		}
	}

	return components
}

/** The Tailwind variables, grouped by what they decide. */
function families(scale, token) {
	const lines = []
	const placed = new Set()

	for (const [prefix, title] of FAMILIES) {
		const members = scale.filter(
			(entry) => entry.name.startsWith(prefix) && !placed.has(entry.name),
		)

		if (members.length === 0) {
			continue
		}

		lines.push('', `  /* ${title} */`)

		for (const member of members) {
			placed.add(member.name)
			lines.push(token(member))
		}
	}

	const rest = scale.filter((entry) => !placed.has(entry.name))

	if (rest.length > 0) {
		lines.push('', '  /* Other */', ...rest.map(token))
	}

	return lines
}

function render() {
	const css = readFileSync(resolve(LIBRARY, 'src/index.css'), 'utf8')
	const built = readFileSync(resolve(LIBRARY, 'dist/index.css'), 'utf8')
	const light = declarations(css, ':root')
	const dark = declarations(css, '.dark')
	const example = readFileSync(resolve(TARGET, '../example.css'), 'utf8')
	const missing = CITED.filter((selector) => !example.includes(selector))

	if (missing.length > 0) {
		throw new Error(
			`the template cites selectors example.css does not prove:\n  ${missing.join('\n  ')}`,
		)
	}

	const own = new Set(light.map((token) => token.name))
	const scale = themeLayer(built).filter(
		(token) =>
			!own.has(token.name) &&
			!token.name.startsWith('--tw-') &&
			// An alias of a library token (`--color-primary: var(--primary)`) is
			// the token, already listed above.
			!/^var\(--[\w-]+\)$/.test(token.value),
	)
	const slots = readSlots()
	const width = Math.max(
		...[
			...light,
			...scale,
		].map((token) => token.name.length),
	)
	const token = ({ name, value }) =>
		`  /* ${`${name}:`.padEnd(width + 1)} ;  library: ${value} */`

	const lines = [
		"/* turystack:theme <system> — write this file's name in place of <system>; the gates find copies by it */",
		'',
		'/*',
		' * {{PROJECT}} — theme starting point.',
		' *',
		' * GENERATED from @turystack/react-web by `showcase` › `pnpm theme-template:write`:',
		' * every variable the library reads — its own tokens and every Tailwind',
		' * variable in its built theme layer — and every slot class it paints. Do',
		' * not edit it here — `pnpm check:theme-template` fails when it drifts.',
		' *',
		' * Copy this file to `theme/<system>.css`, one per design system, and index it in',
		' * `07-theme.md` with the audiences it serves. `template.css` and `example.css`',
		" * are the skill's own reference files: they are never a project's theme, and",
		' * `gate:theme-per-system` skips them for that reason.',
		' *',
		' * Fill what the design states and delete the rest. A token left empty keeps',
		" * the library's value, which is shown beside it; a value the design never",
		' * declared stays out (HRN-10), it is not a plausible default.',
		' *',
		" * Import it AFTER `@turystack/react-web/styles.css`. The library's tokens are",
		' * declared at `:root` outside any cascade layer, exactly as these are: same',
		' * specificity, so the later file wins. The slot rules below win either way —',
		" * the library's utilities live in `@layer utilities` and an unlayered rule",
		' * beats every layer.',
		' *',
		' * Three layers, in the order they are reached for. Resolving at layer 1 and',
		' * stopping is the whole discipline — descending when layer 1 would have done it',
		' * is what turns a theme into a second implementation of the library.',
		' * `example.css` shows every kind of override against real slots.',
		' */',
		'',
		'/* ------------------------------------------------------------------------ */',
		'/* 1 — tokens. A rebrand is this layer and nothing else.                      */',
		'/* ------------------------------------------------------------------------ */',
		'',
		':root {',
		...light.map(token),
		'',
		...families(scale, token),
		'}',
		'',
		'.dark {',
		'  /* Every colour defined above needs a value here too: a token defined for one',
		'     scheme only breaks in the other, and the failure is invisible while you',
		'     build it (UIX-5). Elevation, type and radius usually hold in both. */',
		...dark.map(token),
		'}',
		'',
		'/* ------------------------------------------------------------------------ */',
		'/* 2 — a slot, when the design differs in shape and not only in colour.       */',
		'/* 3 — a slot in a variant, a size or a state the design treats differently: */',
		'/*     .button[data-variant="destructive"], .button[data-size="sm"],          */',
		'/*     .checkbox-box[data-checked], .tabs-trigger[data-active],               */',
		'/*     .dropdown-menu-item[data-highlighted].                                 */',
		'/*                                                                            */',
		'/* Every class react-web paints, by component. A selector that reaches        */',
		'/* through the markup instead binds {{PROJECT}} to an arrangement the library */',
		'/* may change in a patch release (UIX-18).                                    */',
		'/* ------------------------------------------------------------------------ */',
	]

	for (const [component, names] of [
		...slots,
	].sort(([a], [b]) => a.localeCompare(b))) {
		if (names.length === 0) {
			continue
		}

		lines.push('', `/* ${component} */`)

		for (const name of names) {
			lines.push(`/* .${name} {} */`)
		}
	}

	lines.push(
		'',
		'/*',
		' * Never:',
		' *   .card-root > div span { }            reaches through the markup',
		' *   .button { color: red !important }    wins the argument, hides which rule was wrong',
		' *   a component re-implemented in the app because a slot was missing —',
		' *   that is a gap to close in the library (UIX-18)',
		' */',
		'',
	)

	return lines.join('\n')
}

const expected = render()

if (process.argv.includes('--check')) {
	let actual = ''

	try {
		actual = readFileSync(TARGET, 'utf8')
	} catch {}

	if (actual !== expected) {
		process.stdout.write(
			'\n✖ uiux-template-skill/theme/template.css does not match what react-web publishes\n  run `pnpm theme-template:write`\n\n',
		)
		process.exitCode = 1
	} else {
		process.stdout.write(
			'\n✓ theme template names every token and slot react-web publishes\n\n',
		)
	}
} else {
	writeFileSync(TARGET, expected)
	process.stdout.write(`wrote ${TARGET}\n`)
}
