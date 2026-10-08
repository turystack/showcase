#!/usr/bin/env node

/**
 * Write the uiux template's `theme/example.html` from the real library.
 *
 * The page shows the same components twice — as @turystack/react-web ships
 * them, and with `theme/example.css` on top — so a reader sees what a theme is
 * allowed to be. Hand-written, it reproduced the markup from memory, and the
 * memory was wrong: it selected `[data-disabled="true"]` on a button that
 * publishes `data-disabled=""` and `.card` on a card whose class is
 * `.card-root`. Both rules parsed, matched nothing, and looked like a theme.
 *
 * So the markup is rendered here from react-web's own build, the stylesheet is
 * react-web's own, and every selector in `example.css` is looked up in that
 * markup: one that matches nothing fails the run. `--check` re-derives the page
 * and compares, so the prebuild fails when the library, the example or the page
 * drifted apart.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire, register } from 'node:module'
import { resolve } from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

const ROOT = resolve(import.meta.dirname, '..')
const LIBRARY = resolve(ROOT, '../react-web')
const SKILL = resolve(ROOT, '../uiux-template-skill/theme')
const THEME = resolve(SKILL, 'example.css')
const TARGET = resolve(SKILL, 'example.html')

// React, the server renderer and the DOM come from react-web's own install, so
// the components render against the React they were built with.
const library = createRequire(resolve(LIBRARY, 'package.json'))
const React = library('react')
const { renderToStaticMarkup } = library('react-dom/server')
const { JSDOM } = library('jsdom')
// One React. The linked @turystack packages each resolve `react` from their own
// install, and a second copy turns every hook call into "Invalid hook call" —
// the showcase dedupes it in Vite; here a resolve hook does the same.
register(
	`data:text/javascript,${encodeURIComponent(`
		const owner = ${JSON.stringify(pathToFileURL(resolve(LIBRARY, 'package.json')).href)}
		export async function resolve(specifier, context, next) {
			if (/^react(?:-dom)?(?:\\/|$)/.test(specifier)) {
				return next(specifier, { ...context, parentURL: owner })
			}
			return next(specifier, context)
		}
	`)}`,
)

// TuryProvider reads the stored colour scheme with no server guard; the scene
// renders on a machine with no storage, so it gets an empty one.
globalThis.localStorage ??= {
	getItem: () => null,
	removeItem() {},
	setItem() {},
}
/**
 * A browser-like global DOM, installed before the library loads: the headless
 * primitives decide at import time whether there is a document to portal into.
 */
function installDom() {
	const dom = new JSDOM('<!doctype html><html><body></body></html>', {
		pretendToBeVisual: true,
	})
	const { window } = dom

	for (const key of [
		'window',
		'document',
		'navigator',
		'HTMLElement',
		'Element',
		'Node',
		'getComputedStyle',
		'requestAnimationFrame',
		'cancelAnimationFrame',
		'MutationObserver',
		'Event',
		'KeyboardEvent',
		'MouseEvent',
		'FocusEvent',
		'CustomEvent',
		'DocumentFragment',
		'SVGElement',
		'HTMLInputElement',
		'HTMLButtonElement',
		'Text',
	]) {
		Object.defineProperty(globalThis, key, {
			configurable: true,
			value: window[key],
			writable: true,
		})
	}

	const inert = class {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	globalThis.ResizeObserver = inert
	globalThis.IntersectionObserver = inert
	globalThis.IS_REACT_ACT_ENVIRONMENT = true
	window.matchMedia = () => ({
		addEventListener() {},
		addListener() {},
		matches: false,
		removeEventListener() {},
		removeListener() {},
	})
	globalThis.matchMedia = window.matchMedia

	return dom
}

const installed = installDom().window
const ui = await import(pathToFileURL(resolve(LIBRARY, 'dist/index.js')).href)

const h = React.createElement

/** One labelled group of the scene. */
function group(title, ...children) {
	return h(
		'section',
		{
			className: 'scene-group',
		},
		h('h3', null, title),
		h(
			'div',
			{
				className: 'scene-row',
			},
			...children,
		),
	)
}

const orders = [
	{
		customer: 'Ana Ribeiro',
		id: '#1042',
		total: 'R$ 1.280,00',
	},
	{
		customer: 'Marcos Lima',
		id: '#1041',
		total: 'R$ 312,90',
	},
]

/**
 * Every component `example.css` reaches, in the states it reaches them in.
 * Add here before adding a scenario there — the run fails until you do.
 */
function scene() {
	return h(
		ui.TuryProvider,
		null,
		group(
			'Button — variant, size, state',
			h(ui.Button, null, 'Save order'),
			h(
				ui.Button,
				{
					variant: 'destructive',
				},
				'Cancel order',
			),
			h(
				ui.Button,
				{
					size: 'lg',
					variant: 'outline',
				},
				'Export',
			),
			h(
				ui.Button,
				{
					size: 'sm',
					variant: 'secondary',
				},
				'Row action',
			),
			h(
				ui.Button,
				{
					disabled: true,
				},
				'Refund',
			),
			h(
				ui.Button,
				{
					loading: true,
				},
				'Saving',
			),
			h(
				ui.Button,
				{
					current: 'page',
					href: '#orders',
					variant: 'link',
				},
				'Orders',
			),
		),
		group(
			'Card — a root and its parts',
			h(
				ui.Card,
				null,
				h(
					ui.Card.Header,
					null,
					h(ui.Card.Title, null, 'Order #1042'),
					h(ui.Card.Description, null, 'Two shipments reserved · 12 Aug 2026'),
				),
				h(
					ui.Card.Content,
					null,
					h(
						ui.Badge,
						{
							variant: 'success',
						},
						'paid',
					),
				),
			),
		),
		group(
			'Alert — a variant',
			h(
				ui.Alert,
				{
					variant: 'warning',
				},
				h(ui.Alert.Title, null, 'Shipment delayed'),
				h(
					ui.Alert.Description,
					null,
					'The carrier has not confirmed the second shipment.',
				),
			),
		),
		group(
			'Input — placeholder, accessible state',
			h(ui.Input, {
				ariaLabel: 'Customer',
				placeholder: 'Search customers',
			}),
			h(ui.Input, {
				'aria-invalid': true,
				ariaLabel: 'Tax id',
				defaultValue: '123',
			}),
		),
		group(
			"Checkbox, Switch, Tabs — a primitive's state",
			h(ui.Checkbox, {
				checked: true,
				label: 'Notify the customer',
				onCheckedChange() {},
			}),
			h(ui.Switch, {
				checked: true,
				label: 'Auto-capture',
				onCheckedChange() {},
			}),
			h(
				ui.Tabs,
				{
					defaultValue: 'items',
				},
				h(
					ui.Tabs.List,
					{
						ariaLabel: 'Order sections',
					},
					h(
						ui.Tabs.Trigger,
						{
							value: 'items',
						},
						'Items',
					),
					h(
						ui.Tabs.Trigger,
						{
							value: 'history',
						},
						'History',
					),
				),
			),
		),
		group(
			'Table — density',
			h(ui.Table, {
				columns: [
					{
						key: 'id',
						label: 'Order',
					},
					{
						key: 'customer',
						label: 'Customer',
					},
					{
						align: 'right',
						key: 'total',
						label: 'Total',
					},
				],
				density: 'compact',
				hidePagination: true,
				itemKey: 'id',
				items: orders,
			}),
		),
	)
}

/**
 * What only exists while open: a portaled popup and the item under the pointer.
 * The server render cannot show these, so the run checks them in a DOM that
 * renders like a browser — same components, opened, one item hovered.
 */
function openScene() {
	return h(
		ui.TuryProvider,
		null,
		h(
			ui.DropdownMenu,
			{
				onOpenChange() {},
				open: true,
			},
			h(
				ui.DropdownMenu.Trigger,
				{
					asChild: true,
				},
				h(ui.Button, null, 'Actions'),
			),
			h(
				ui.DropdownMenu.Content,
				null,
				h(ui.DropdownMenu.Item, null, 'Edit order'),
				h(
					ui.DropdownMenu.Item,
					{
						variant: 'destructive',
					},
					'Cancel order',
				),
			),
		),
	)
}

/** A browser-like document with both scenes mounted, the popup open and hovered. */
async function liveDocument() {
	const { window } = installed

	const { createRoot } = library('react-dom/client')
	const host = window.document.createElement('div')
	window.document.body.append(host)
	const settle = () =>
		React.act(async () => {
			await new Promise((done) => setTimeout(done, 50))
		})

	await React.act(async () => {
		createRoot(host).render(h('div', null, scene(), openScene()))
	})
	await settle()

	const item = window.document.querySelector('.dropdown-menu-item')
	await React.act(async () => {
		item?.dispatchEvent(
			new window.MouseEvent('mousemove', {
				bubbles: true,
			}),
		)
		item?.dispatchEvent(
			new window.Event('pointermove', {
				bubbles: true,
			}),
		)
	})
	await settle()

	return window.document
}

/** Every custom property the library reads: its own tokens and Tailwind's. */
function libraryTokens() {
	const source = readFileSync(resolve(LIBRARY, 'src/index.css'), 'utf8')
	const built = readFileSync(resolve(LIBRARY, 'dist/index.css'), 'utf8')

	return new Set(
		[
			...source.matchAll(/(--[\w-]+)\s*:/g),
			...built.matchAll(/(--[\w-]+):/g),
		].map((match) => match[1]),
	)
}

/** Every selector of a stylesheet, outside `@` preludes and comments. */
function selectors(css) {
	const source = css.replace(/\/\*[\s\S]*?\*\//g, '')
	const found = []

	for (const match of source.matchAll(/(^|[{};])([^{};@]+)\{/g)) {
		for (const selector of match[2].split(',')) {
			const trimmed = selector.trim()

			if (trimmed !== '') {
				found.push(trimmed)
			}
		}
	}

	return found
}

/** The part of a selector the markup can answer: no scheme scope, no pseudo. */
function structural(selector) {
	return selector
		.replace(/^\.dark\s+/, '')
		.replace(/::?[a-z-]+(\([^)]*\))?/g, '')
		.trim()
}

/** The library's stylesheet, its fonts included as the data URLs it ships. */
function libraryStyles() {
	return readFileSync(resolve(LIBRARY, 'dist/index.css'), 'utf8')
}

/** Keep `</style>` and `</template>` inside an embedded text from closing it. */
function embed(text) {
	return text.replace(/<\/(style|template|script)/gi, '<\\/$1')
}

async function render() {
	const markup = renderToStaticMarkup(scene())
	const theme = readFileSync(THEME, 'utf8')
	const document = await liveDocument()
	const unmatched = []
	const tokens = libraryTokens()
	const unknown = [
		...theme.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[\w-]+)\s*:/g),
	]
		.map((match) => match[1])
		.filter((token) => !tokens.has(token))

	if (unknown.length > 0) {
		throw new Error(
			`example.css sets custom properties the library never reads:\n${unknown
				.map((token) => `  ${token}`)
				.join('\n')}\nA misspelt token does nothing and looks like a theme.`,
		)
	}

	for (const selector of selectors(theme)) {
		const target = structural(selector)

		if (target === '' || target === ':root' || target === '.dark') {
			continue
		}

		if (document.querySelector(target) === null) {
			unmatched.push(selector)
		}
	}

	if (unmatched.length > 0) {
		throw new Error(
			`example.css selects what the rendered library does not paint:\n${unmatched
				.map((selector) => `  ${selector}`)
				.join('\n')}\nFix the selector, or add the component to the scene.`,
		)
	}

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Theme example</title>
<!--
  GENERATED by showcase › \`pnpm theme-example:write\` from @turystack/react-web's
  own build and from example.css. Do not edit it here.

  The two panes are the same markup, rendered from the real components, under
  the library's real stylesheet. The right one adds example.css — nothing else.
-->
<style>
  :root {
    color-scheme: light;
    --page: #f6f7f9;
    --panel: #ffffff;
    --ink: #1c2027;
    --quiet: #5d6572;
    --line: #dde1e7;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      color-scheme: dark;
      --page: #121418;
      --panel: #1a1d23;
      --ink: #e8eaee;
      --quiet: #9aa1ad;
      --line: #2c3139;
    }
  }
  :root[data-theme="dark"] {
    color-scheme: dark;
    --page: #121418;
    --panel: #1a1d23;
    --ink: #e8eaee;
    --quiet: #9aa1ad;
    --line: #2c3139;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 24px 16px 40px;
    background: var(--page);
    color: var(--ink);
    font: 15px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  header { max-width: 1200px; margin: 0 auto 20px; }
  h1 { margin: 0 0 4px; font-size: 20px; }
  header p { margin: 0; color: var(--quiet); max-width: 70ch; }
  .controls { margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap; }
  .controls button {
    font: inherit;
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--line);
    background: var(--panel);
    color: var(--ink);
    cursor: pointer;
  }
  .controls button[aria-pressed="true"] { border-color: var(--ink); }
  .panes {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 1fr);
  }
  @media (min-width: 900px) { .panes { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  figure {
    margin: 0;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 12px;
    overflow: hidden;
  }
  figcaption {
    padding: 10px 14px;
    border-bottom: 1px solid var(--line);
    font-size: 13px;
    color: var(--quiet);
  }
  figcaption strong { color: var(--ink); font-weight: 600; }
  iframe { display: block; width: 100%; height: 640px; border: 0; }
</style>
</head>
<body>
<header>
  <h1>Theme example — acme › internal</h1>
  <p>The same react-web components twice. Left, as the library ships them. Right, with
  <code>example.css</code> imported after the library — every override in it is numbered
  in the file and lands on one of these elements.</p>
  <div class="controls" role="group" aria-label="Colour scheme of the components">
    <button type="button" data-scheme="light" aria-pressed="true">Light</button>
    <button type="button" data-scheme="dark" aria-pressed="false">Dark</button>
  </div>
</header>
<main class="panes">
  <figure>
    <figcaption><strong>The library</strong> · @turystack/react-web/styles.css</figcaption>
    <iframe title="Components without a theme" data-pane="library"></iframe>
  </figure>
  <figure>
    <figcaption><strong>acme › internal</strong> · the library, then example.css</figcaption>
    <iframe title="Components with the example theme" data-pane="themed"></iframe>
  </figure>
</main>

<template id="scene">${embed(markup)}</template>
<style id="library-css" media="not all">${embed(libraryStyles())}</style>
<style id="theme-css" media="not all">${embed(theme)}</style>
<script>
  const scene = document.getElementById('scene').innerHTML
  const library = document.getElementById('library-css').textContent
  const theme = document.getElementById('theme-css').textContent
  const frame = (themed) => '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>' + library + '</style>' +
    (themed ? '<style>' + theme + '</style>' : '') +
    '<style>body{margin:0;padding:16px;background:var(--background);color:var(--foreground)}' +
    '.scene-group{margin:0 0 20px}.scene-group h3{margin:0 0 8px;font:600 11px/1.4 ui-sans-serif,system-ui,sans-serif;' +
    'letter-spacing:.06em;text-transform:uppercase;color:var(--muted-foreground)}' +
    '.scene-row{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.scene-row>*{max-width:100%}' +
    '.scene-row>.table-root,.scene-row>.card-root,.scene-row>.alert-root{flex:1 1 100%}</style>' +
    '</head><body>' + scene + '</body></html>'
  const panes = [...document.querySelectorAll('iframe[data-pane]')]
  // Both panes take the taller one's height, so the two scenes line up.
  const fit = () => {
    const heights = panes.map((pane) => pane.contentDocument?.body?.getBoundingClientRect().height ?? 0)
    const height = Math.ceil(Math.max(...heights)) + 8
    for (const pane of panes) pane.style.height = height + 'px'
  }
  for (const pane of panes) {
    pane.addEventListener('load', fit)
    pane.srcdoc = frame(pane.dataset.pane === 'themed')
  }
  for (const button of document.querySelectorAll('[data-scheme]')) {
    button.addEventListener('click', () => {
      const dark = button.dataset.scheme === 'dark'
      for (const other of document.querySelectorAll('[data-scheme]')) {
        other.setAttribute('aria-pressed', String(other === button))
      }
      for (const pane of panes) {
        pane.contentDocument.documentElement.classList.toggle('dark', dark)
      }
      fit()
    })
  }
</script>
</body>
</html>
`
}

const expected = await render()

if (process.argv.includes('--check')) {
	let actual = ''

	try {
		actual = readFileSync(TARGET, 'utf8')
	} catch {}

	if (actual !== expected) {
		process.stdout.write(
			'\n✖ uiux-template-skill/theme/example.html does not match the library and example.css\n  run `pnpm theme-example:write`\n\n',
		)
		process.exitCode = 1
	} else {
		process.stdout.write(
			'\n✓ theme example renders the real library, and every selector in example.css lands on it\n\n',
		)
	}
} else {
	writeFileSync(TARGET, expected)
	process.stdout.write(`wrote ${TARGET}\n`)
}

// The mounted scene keeps timers alive; the run is done.
process.exit(process.exitCode ?? 0)
