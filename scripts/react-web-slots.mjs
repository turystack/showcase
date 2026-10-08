#!/usr/bin/env node

/**
 * The Slots table is a claim about what react-web paints. This derives it.
 *
 * A slot is the stable semantic class an element carries beside its utilities —
 * `.card-root`, `.select-trigger`, `.input-field`. It is the whole theming
 * surface: the Theme lab and every consuming app reskin the library through
 * these names, and a name that exists in the source and not in this table is a
 * hook nobody can find.
 *
 * Names come from `../react-web/src`, never from a second list kept here.
 * Descriptions cannot be derived, so they are written by hand — and preserved
 * across regenerations by slot name. Writing adds the slots the library grew
 * and drops the ones it lost, leaving every description that still has a slot
 * to belong to; `--check` fails when the two disagree, or when a slot reached
 * the table with nothing said about it.
 *
 * Why `element` is also by hand: a `tv()` slot is a class list, not a place. It
 * is applied somewhere in the JSX, sometimes to a Base UI primitive that
 * renders a tag of its own choosing, so the tag a reader will meet in the
 * inspector is not in the style declaration at all.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import process from 'node:process'

const ROOT = resolve(import.meta.dirname, '..')
const SOURCE = resolve(ROOT, '../react-web/src/components')
const TARGET = resolve(ROOT, 'src/data/react-web-slots.ts')

/**
 * Components that paint through another component's styles.
 *
 * Six of the eight formatters declare no class of their own — they hand a
 * string to `FormatterText` and it paints. Four of the typed inputs render
 * through `input.shared.ts`. Derived strictly by directory, their tables would
 * read "this component paints nothing", which is true of the folder and false
 * of the DOM: a reader restyling MoneyText needs `.formatter-text-value`, and
 * nothing in `money-text/` would ever tell them.
 *
 * A short list kept by hand, and the check verifies each base really publishes
 * what is claimed for it — so a rename in the base fails here rather than
 * leaving eight tables pointing at a class that no longer exists.
 */
const INHERITS = {
	'boolean-text': ['formatter-text'],
	'currency-input': ['input'],
	'data-transfer-export': ['data-transfer'],
	'data-transfer-import': ['data-transfer'],
	'date-text': ['formatter-text'],
	'document-text': ['formatter-text'],
	'duration-text': ['formatter-text'],
	'editable-text': ['input'],
	'file-size-text': ['formatter-text'],
	'mask-input': ['input'],
	'money-text': ['formatter-text'],
	'number-text': ['formatter-text'],
	'phone-text': ['formatter-text'],
	popconfirm: ['popover'],
	'time-input': ['input'],
}

/** `cellContent` → `cell-content`. */
function kebab(key) {
	return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function walk(dir) {
	const out = []

	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name)

		if (entry.isDirectory()) {
			out.push(...walk(path))
		} else if (/\.tsx?$/.test(path) && !/\.test\./.test(path)) {
			out.push(path)
		}
	}

	return out
}

/** The body of the object literal whose `{` is at `open`. */
function block(source, open) {
	let depth = 0
	let index = open

	while (index < source.length) {
		if (source[index] === '{') {
			depth++
		} else if (source[index] === '}') {
			depth--

			if (depth === 0) {
				return source.slice(open + 1, index)
			}
		}
		index++
	}

	return ''
}

function skipString(body, index) {
	const quote = body[index]
	let cursor = index + 1

	while (cursor < body.length && body[cursor] !== quote) {
		if (body[cursor] === '\\') {
			cursor++
		}
		cursor++
	}

	return cursor + 1
}

function skipComment(body, index) {
	if (body[index + 1] === '/') {
		const end = body.indexOf('\n', index)
		return end === -1 ? body.length : end + 1
	}

	const end = body.indexOf('*/', index + 2)
	return end === -1 ? body.length : end + 2
}

/**
 * The top-level entries of an object literal body.
 *
 * A depth scan rather than a regex, because a slot's value is an array of class
 * strings and class strings contain brackets: `transition-[width]` ended a
 * non-greedy `\[[\s\S]*?\]` two characters into the first string, leaving an
 * unterminated quote and therefore no tokens at all. The slot was then dropped
 * silently — `layout-sidebar-gap` was painted by the library, absent from this
 * table and unreachable from the Theme lab, and `--check` agreed with the file
 * because both sides were read by the same blind parser.
 */
function entries(body) {
	const out = []
	let index = 0
	let depth = 0

	while (index < body.length) {
		const char = body[index]

		if (char === '{' || char === '[' || char === '(') {
			depth++
			index++
			continue
		}

		if (char === '}' || char === ']' || char === ')') {
			depth--
			index++
			continue
		}

		if (char === "'" || char === '"' || char === '`') {
			index = skipString(body, index)
			continue
		}

		if (char === '/' && (body[index + 1] === '/' || body[index + 1] === '*')) {
			index = skipComment(body, index)
			continue
		}

		if (depth !== 0) {
			index++
			continue
		}

		const key = /^(['"`]?)(\w+)\1\s*:/.exec(body.slice(index))

		if (!key) {
			index++
			continue
		}

		let cursor = index + key[0].length

		while (cursor < body.length && /\s/.test(body[cursor])) {
			cursor++
		}

		const from = cursor
		let inner = 0

		while (cursor < body.length) {
			const current = body[cursor]

			if (current === '{' || current === '[' || current === '(') {
				inner++
			} else if (current === '}' || current === ']' || current === ')') {
				if (inner === 0) {
					break
				}
				inner--
			} else if (current === ',' && inner === 0) {
				break
			} else if (current === "'" || current === '"' || current === '`') {
				cursor = skipString(body, cursor) - 1
			} else if (
				current === '/' &&
				(body[cursor + 1] === '/' || body[cursor + 1] === '*')
			) {
				cursor = skipComment(body, cursor) - 1
			}

			cursor++
		}

		out.push({
			key: key[2],
			value: body.slice(from, cursor),
		})
		index = cursor
	}

	return out
}

/**
 * The value that starts at `index`, read the same way `entries` reads one.
 *
 * `base:` is matched file-wide rather than inside a `slots` block, so it needs
 * its value scanned the same way — a `base` holding `transition-[width]` lost
 * everything after the first bracket to the regex this replaced.
 */
function valueAfter(source, index) {
	const [entry] = entries(`x:${source.slice(index)}`)

	return entry?.value ?? ''
}

/** Every class token a slot value contributes, string or array of strings. */
function classTokens(value) {
	return [...value.matchAll(/'([^']*)'|"([^"]*)"/g)]
		.map((match) => match[1] ?? match[2])
		.join(' ')
		.split(/\s+/)
		.filter(Boolean)
}

/**
 * The one token out of a class list that is the slot.
 *
 * A suffixed name wins over the bare component name, and that ordering is the
 * whole trick: `Flex`'s root reads `'flex flex-root'`, where the first token is
 * Tailwind's display utility and the second is the hook. Taking the first token
 * would publish `.flex` as this library's API.
 */
function slotToken(tokens, component, derived) {
	if (derived && tokens.includes(derived)) {
		return derived
	}

	const suffixed = tokens.find((token) =>
		new RegExp(`^${component}-[a-z0-9-]+$`).test(token),
	)

	return suffixed ?? (tokens.includes(component) ? component : null)
}

/**
 * Tailwind utilities that happen to be shaped like one of our slot names.
 *
 * A component called `flex` or `table` shares its prefix with a whole family of
 * real utilities, and `.table-fixed` in a class list is a display mode, not a
 * part of the table. Only these exact names are excluded — `table-cell` and
 * `table-row` collide too and are kept, because they are also genuine slots
 * that the derived name asks for, and they are inert where they land.
 */
const UTILITIES = new Set([
	'box-border',
	'box-content',
	'box-decoration-clone',
	'box-decoration-slice',
	'container',
	'flex-auto',
	'flex-col',
	'flex-col-reverse',
	'flex-grow',
	'flex-initial',
	'flex-none',
	'flex-nowrap',
	'flex-row',
	'flex-row-reverse',
	'flex-shrink',
	'flex-wrap',
	'flex-wrap-reverse',
	'grid-flow-col',
	'grid-flow-row',
	'list-decimal',
	'list-disc',
	'list-inside',
	'list-none',
	'list-outside',
	'select-all',
	'select-auto',
	'select-none',
	'select-text',
	'table-auto',
	'table-fixed',
])

/**
 * Every other semantic token in the same class list.
 *
 * A slot usually publishes one name, and sometimes two: accordion's chevrons
 * carry `accordion-trigger-icon-down` and `-up` **and** the shared
 * `accordion-trigger-icon` that a theme would reach for to style both at once.
 * Taking only the derived name would leave that shared class out of the table
 * and out of the Theme lab scaffold — undocumented, and reachable only by
 * whoever wrote it.
 */
function extraTokens(tokens, component) {
	const semantic = new RegExp(`^${component}-[a-z0-9-]+$`)

	return tokens.filter(
		(token) =>
			semantic.test(token) &&
			!UTILITIES.has(token) &&
			!/^\d/.test(token.slice(component.length + 1)),
	)
}

function readSlots() {
	const found = new Map()

	const names = readdirSync(SOURCE).filter((name) =>
		statSync(join(SOURCE, name)).isDirectory(),
	)

	for (const component of names) {
		const slots = new Set()

		for (const file of walk(join(SOURCE, component))) {
			const source = readFileSync(file, 'utf8')

			for (const match of source.matchAll(/slots:\s*\{/g)) {
				const body = block(source, match.index + match[0].length - 1)

				for (const entry of entries(body)) {
					const derived =
						entry.key === 'root'
							? `${component}-root`
							: `${component}-${kebab(entry.key)}`
					const tokens = classTokens(entry.value)
					const token = slotToken(tokens, component, derived)

					if (token) {
						slots.add(token)
					}

					for (const extra of extraTokens(tokens, component)) {
						slots.add(extra)
					}
				}
			}

			for (const match of source.matchAll(/\bbase:/g)) {
				const tokens = classTokens(valueAfter(source, match.index + 5))
				const token = slotToken(tokens, component, `${component}-root`)

				if (token) {
					slots.add(token)
				}

				for (const extra of extraTokens(tokens, component)) {
					slots.add(extra)
				}
			}

			// A class list written straight into the JSX. The semantic token leads
			// it by convention, which is what makes it findable without guessing
			// which of a dozen utilities is the name.
			if (file.endsWith('.tsx')) {
				for (const match of source.matchAll(/className="([^"]+)"/g)) {
					const first = match[1].split(/\s+/)[0]

					if (
						first === component ||
						new RegExp(`^${component}-[a-z0-9-]+$`).test(first)
					) {
						slots.add(first)
					}
				}
			}
		}

		found.set(component, [...slots].sort())
	}

	for (const [component, bases] of Object.entries(INHERITS)) {
		const own = found.get(component) ?? []
		const borrowed = bases.flatMap((base) => found.get(base) ?? [])

		found.set(component, [...new Set([...own, ...borrowed])].sort())
	}

	return found
}

/**
 * The descriptions already written, by slot name.
 *
 * Read one `{ … }` block at a time, never by searching forward from a key.
 * Two versions of this failed before that was obvious. The first required the
 * exact line breaks this script emits, and the formatter rewraps short values
 * onto one line — so the next run matched nothing and blanked five hundred
 * descriptions. The second searched forward from `name:` for the sibling
 * fields, and the formatter sorts object keys, which puts `name` **last** — so
 * every entry was handed the description of the one after it. Both failures
 * were silent, and the second was worse for it: the file still looked full.
 */
function readNotes() {
	const notes = new Map()

	let existing = ''

	try {
		existing = readFileSync(TARGET, 'utf8')
	} catch {
		return notes
	}

	/**
	 * Either quote style, because the formatter picks whichever escapes less:
	 * `'The alert\\'s headline.'` comes back as `"The alert's headline."`, and a
	 * single-quote-only reader silently loses every description with an
	 * apostrophe in it — sixty-one of them, the first time this ran.
	 */
	const read = (entry, key) => {
		const match = new RegExp(
			`\\b${key}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`,
		).exec(entry)

		if (!match) {
			return ''
		}

		return (match[1] ?? match[2])
			.replace(/\\(['"])/g, '$1')
			.replace(/\\\\/g, '\\')
	}

	for (const entry of existing.matchAll(/\{[^{}]*\}/g)) {
		const name = read(entry[0], 'name')

		if (name) {
			notes.set(name, {
				description: read(entry[0], 'description'),
				element: read(entry[0], 'element'),
			})
		}
	}

	return notes
}

const found = readSlots()
const notes = readNotes()
const check = process.argv.includes('--check')

if (check) {
	const problems = []

	for (const [component, slots] of found) {
		for (const slot of slots) {
			const note = notes.get(slot)

			if (!note) {
				problems.push(
					`${component}: react-web paints .${slot} and the table does not list it`,
				)
			} else if (!note.description.trim() || !note.element.trim()) {
				problems.push(
					`${component}: .${slot} is listed with nothing said about it`,
				)
			}
		}
	}

	const live = new Set([...found.values()].flat())

	for (const slot of notes.keys()) {
		if (!live.has(slot)) {
			problems.push(
				`the table documents .${slot}, which react-web no longer paints`,
			)
		}
	}

	if (problems.length > 0) {
		process.stdout.write(`\n✖ ${problems.length} slot table problem(s):\n`)
		for (const problem of problems.sort()) {
			process.stdout.write(`  ${problem}\n`)
		}
		process.stdout.write('\n  run `pnpm slots:write`, then describe what it added\n\n')
		process.exitCode = 1
	} else {
		const total = [...found.values()].flat().length
		process.stdout.write(
			`\n✓ ${total} slot(s) across ${found.size} components: every class react-web paints is in the table, and every row is a class it paints\n\n`,
		)
	}
} else {
	const body = [...found]
		.filter(([, slots]) => slots.length > 0 || true)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([component, slots]) => {
			const rows = slots
				.map((slot) => {
					const note = notes.get(slot) ?? { description: '', element: '' }
					/** The quote style the formatter would settle on, chosen up front. */
					const quote = (value) => {
						const escaped = value.replace(/\\/g, '\\\\')

						return escaped.includes("'") && !escaped.includes('"')
							? `"${escaped}"`
							: `'${escaped.replace(/'/g, "\\'")}'`
					}

					// Alphabetical, because the formatter sorts them anyway and a file
					// that comes back from `biome check --write` unchanged is one this
					// script can read again.
					return `\t\t{\n\t\t\tdescription:\n\t\t\t\t${quote(note.description)},\n\t\t\telement: ${quote(note.element)},\n\t\t\tname: '${slot}',\n\t\t},`
				})
				.join('\n')

			return `\t'${component}': [\n${rows}\n\t],`
		})
		.join('\n')

	writeFileSync(
		TARGET,
		`/**
 * The classes a theme can reach, by component.
 *
 * GENERATED by \`pnpm slots:write\` from \`react-web/src\` — the slot names are
 * read out of the library's own \`tv()\` calls and JSX, never typed here. The
 * descriptions and the element each slot lands on are written by hand and
 * preserved across regenerations, because neither can be derived: a class list
 * does not say where it was applied.
 *
 * \`pnpm check:slots-table\` fails when the two drift apart in either direction.
 */

export type ReactWebSlot = {
	name: string
	element: string
	description: string
}

export const reactWebSlots: Record<string, ReactWebSlot[]> = {
${body}
}
`,
	)

	const total = [...found.values()].flat().length
	process.stdout.write(
		`\n✓ wrote ${total} slot(s) across ${found.size} components to src/data/react-web-slots.ts\n`,
	)
	process.stdout.write(
		'  run `pnpm check:fix` after this — the formatter rewraps what is written here\n\n',
	)
}
