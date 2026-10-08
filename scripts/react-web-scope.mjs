#!/usr/bin/env node

/**
 * Give react-web back its own palette, inside this site.
 *
 * The showcase and react-web both style through Tailwind, and both declare the
 * same design tokens at `:root` — 57 of them collide. The showcase's stylesheet
 * is imported second, so it wins every one, and a `<Button>` on this site has
 * never rendered in the library's colours. It renders in the site's.
 *
 * Scoping the raw tokens is not enough, and the reason is worth writing down
 * because it is not obvious. The two builds compile the same utility to
 * different bodies:
 *
 *     react-web   .bg-primary { background-color: var(--primary) }
 *     showcase    .bg-primary { background-color: var(--color-primary) }
 *
 * The showcase's rule wins the cascade, and its `--color-primary` was already
 * resolved against `--primary` at `:root` — a custom property that substitutes
 * another one is computed where it is *declared*, not where it is used. So
 * redefining `--primary` deeper in the tree changes nothing for it. Both
 * families have to be declared together, in the scope.
 *
 * The values are read from the artifact the site actually serves —
 * `node_modules/@turystack/react-web/dist/index.css` — and never copied by
 * hand. A copy would be correct on the day it was written and silently wrong
 * after the next release, which is the failure this whole repository is built
 * to refuse. `--check` re-derives and compares, so the prebuild fails when the
 * generated file no longer matches the installed library.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'

const ROOT = resolve(import.meta.dirname, '..')
const SOURCE = resolve(ROOT, 'node_modules/@turystack/react-web/dist/index.css')
const TARGET = resolve(ROOT, 'src/react-web-scope.css')

/** The class a surface wears to render in the library's own palette. */
export const SCOPE = 'react-web-surface'

/**
 * The declaration block of the rule whose selector is `selector` and which
 * declares `--primary`.
 *
 * Anchoring on a token rather than on the selector alone matters: a minified
 * Tailwind build has many `:root` rules, and only one of them is the palette.
 */
function tokenBlock(css, selector) {
	for (const match of css.matchAll(/--primary:/g)) {
		const index = match.index
		const open = css.lastIndexOf('{', index)
		const previous = Math.max(
			css.lastIndexOf('}', open),
			css.lastIndexOf('{', open - 1),
		)

		if (
			css
				.slice(previous + 1, open)
				.trim()
				.endsWith(selector)
		) {
			return css.slice(open + 1, css.indexOf('}', index))
		}
	}

	throw new Error(`no ${selector} palette in ${SOURCE}`)
}


/**
 * The block a token is declared in, found by brace matching from that token.
 *
 * `tokenBlock` above anchors on `--primary` and stops at the first `}`, which
 * is right for the palette and wrong for everything else: Tailwind's theme
 * layer is `@layer theme{:root,:host{…}}`, so the first `}` closes nothing
 * useful and the selector test never sees `:root,:host`.
 */
function blockAround(css, token) {
	const index = css.indexOf(token)
	if (index === -1) {
		throw new Error(`no ${token} in ${SOURCE}`)
	}

	const open = css.lastIndexOf('{', index)
	let depth = 1
	let end = open + 1
	for (; end < css.length && depth > 0; end += 1) {
		if (css[end] === '{') depth += 1
		else if (css[end] === '}') depth -= 1
	}

	return css.slice(open + 1, end - 1)
}

/**
 * The font the library establishes at the document root.
 *
 * This is not a token and that is the whole problem. `font-family` and `color`
 * are inherited: the browser computes them on `html`/`body` — outside every
 * `.react-web-surface` — and a descendant inherits the computed value, so
 * redefining `--font-sans` deeper in the tree changes nothing that has already
 * been resolved. The showcase's `body { font-family: var(--font-display) }`
 * therefore put Inter on every component in every preview, no matter how many
 * colour tokens were restored. The scope has to restate the inherited
 * properties, not just the custom ones.
 */
function rootFontFamily(css) {
	const match = /(?:^|\})html\{font-family:([^;}]+)/.exec(css)
	if (!match) {
		throw new Error(`no root font-family in ${SOURCE}`)
	}
	return match[1].trim()
}

/** `--name: value` pairs, in the order the library declares them. */
function tokensOf(block) {
	return [
		...block.matchAll(/(--[a-z][\w-]*)\s*:\s*([^;}]+)/g),
	].map((match) => [
		match[1],
		match[2].trim(),
	])
}

/**
 * Both families, from one source value.
 *
 * `--color-x` is Tailwind v4's theme namespace and `--x` is what react-web's
 * own utilities read. Emitting only one of them fixes half the page, which is
 * worse than fixing none: it looks like it worked.
 */
function declarations(tokens, indent) {
	return tokens
		.flatMap(([name, value]) =>
			name.startsWith('--color-')
				? [
						`${name}: ${value};`,
					]
				: [
						`${name}: ${value};`,
						`--color-${name.slice(2)}: ${value};`,
					],
		)
		.map((line) => `${indent}${line}`)
		.join('\n')
}

function generate() {
	const css = readFileSync(SOURCE, 'utf8')
	const light = tokensOf(tokenBlock(css, ':root'))
	const dark = tokensOf(tokenBlock(css, '.dark'))
	const theme = tokensOf(blockAround(css, '--font-sans:'))
	const font = rootFontFamily(css)

	return `/*
 * Generated by scripts/react-web-scope.mjs — do not edit.
 *
 * Derived from @turystack/react-web's own dist, so a surface wearing
 * .${SCOPE} renders in the library's palette instead of this site's.
 * Run \`pnpm scope:write\` after upgrading react-web.
 */

.${SCOPE} {
${declarations(light, '\t')}
${declarations(theme, '\t')}

	/* Inherited, so it has to be restated — see rootFontFamily() in the generator. */
	font-family: ${font};
	color: var(--foreground);
}

.dark .${SCOPE} {
${declarations(dark, '\t')}
}
`
}

const generated = generate()

if (process.argv.includes('--check')) {
	const current = (() => {
		try {
			return readFileSync(TARGET, 'utf8')
		} catch {
			return ''
		}
	})()

	if (current === generated) {
		const tokens = (generated.match(/--[a-z][\w-]*\s*:/g) ?? []).length
		process.stdout.write(
			`\n✓ react-web scope: ${tokens} declaration(s) match the installed library\n\n`,
		)
		checkPortalHost()
	} else {
		process.stdout.write(
			`\n✖ src/react-web-scope.css is not what @turystack/react-web now ships — run \`pnpm scope:write\`\n` +
				'  The site would keep painting the library in its own colours, which is the bug this file exists to fix.\n\n',
		)
		process.exitCode = 1
	}
} else {
	writeFileSync(TARGET, generated, 'utf8')
	const tokens = (generated.match(/--[a-z][\w-]*\s*:/g) ?? []).length
	process.stdout.write(
		`✓ wrote src/react-web-scope.css — ${tokens} declaration(s)\n`,
	)
}

/**
 * The scope class only reaches what is inside it, and an overlay is not.
 *
 * Modal, Sheet, Popover, Tooltip, DropdownMenu and Select all render through a
 * portal, which mounts on `document.body` — outside every `.react-web-surface`
 * on the page. Before the library accepted a `portalContainer`, opening a Modal
 * from a preview showed its trigger in the library's colours and its contents
 * in this site's.
 *
 * Nothing about that failure is loud: the page renders, no request fails, no
 * type is wrong. It is only visible to someone who knows what the library is
 * supposed to look like. So the wiring is checked rather than remembered.
 */
function checkPortalHost() {
	const root = resolve(ROOT, 'src/routes/__root.tsx')
	const source = readFileSync(root, 'utf8')
	const passesContainer = /portalContainer=\{/.test(source)
	const mountsHost = new RegExp(`className="${SCOPE}"`).test(source)

	if (passesContainer && mountsHost) {
		process.stdout.write(
			`✓ react-web portals: __root.tsx mounts a .${SCOPE} host and names it as portalContainer\n\n`,
		)
		return
	}

	process.stdout.write(
		`\n✖ src/routes/__root.tsx no longer routes react-web's overlays into a .${SCOPE} host\n` +
			(passesContainer
				? ''
				: '  missing: portalContainer={...} on TuryProvider\n') +
			(mountsHost
				? ''
				: `  missing: a <div className="${SCOPE}" ref={...} /> for it to point at\n`) +
			'  Every portalled surface would render in this site\'s palette instead of the library\'s.\n\n',
	)
	process.exitCode = 1
}
