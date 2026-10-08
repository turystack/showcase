import { reactChartsWebClasses } from '@/data/react-charts-slots'
import { componentGroups } from '@/data/react-web-components'
import { reactWebSlots } from '@/data/react-web-slots'

/**
 * The Custom tab, and the prompt that fills it.
 *
 * Both are built from `reactWebSlots` rather than written out, for the same
 * reason the table is: a slot the library grows has to appear here without
 * anyone remembering. A hand-written scaffold would be complete on the day it
 * was typed and quietly short a component after the next release — and short in
 * the one direction nobody notices, because a missing rule looks exactly like a
 * rule you chose not to write.
 */

/** Every slot, in menu order, with the shared bases last. */
function slotsByGroup() {
	const grouped: {
		title: string
		components: {
			slug: string
			slots: string[]
		}[]
	}[] = []
	const seen = new Set<string>()

	for (const group of componentGroups) {
		const components = group.components
			.map((component) => ({
				slots: (reactWebSlots[component.slug] ?? []).map((slot) => slot.name),
				slug: component.slug,
			}))
			.filter((component) => component.slots.length > 0)

		for (const component of components) {
			seen.add(component.slug)
		}

		if (components.length > 0) {
			grouped.push({
				components,
				title: group.title,
			})
		}
	}

	const shared = Object.keys(reactWebSlots)
		.filter((slug) => !seen.has(slug) && reactWebSlots[slug].length > 0)
		.sort()
		.map((slug) => ({
			slots: reactWebSlots[slug].map((slot) => slot.name),
			slug,
		}))

	if (shared.length > 0) {
		grouped.push({
			components: shared,
			title: 'Shared',
		})
	}

	// react-charts paints inside the same scope, so a theme reaches its
	// classes the same way; its marks read --chart-1…5, --border and
	// --muted-foreground from the tokens above.
	grouped.push({
		components: reactChartsWebClasses,
		title: 'Charts (@turystack/react-charts)',
	})

	return grouped
}

/**
 * The colour tokens worth offering by name.
 *
 * Not every variable react-web reads — that list is long and most of it is
 * derived. These are the colours a design system actually decides, and each is
 * written twice because the site and the library disagree about which name a
 * colour utility reads.
 */
const TOKENS = [
	'background',
	'foreground',
	'card',
	'card-foreground',
	'primary',
	'primary-foreground',
	'secondary',
	'secondary-foreground',
	'muted',
	'muted-foreground',
	'accent',
	'accent-foreground',
	'destructive',
	'destructive-foreground',
	'success',
	'success-foreground',
	'warning',
	'warning-foreground',
	'info',
	'info-foreground',
	'border',
	'input',
	'ring',
	'overlay',
	'sidebar',
	'sidebar-foreground',
	'sidebar-primary',
	'sidebar-primary-foreground',
	'sidebar-accent',
	'sidebar-accent-foreground',
	'sidebar-border',
	'sidebar-ring',
	'chart-1',
	'chart-2',
	'chart-3',
	'chart-4',
	'chart-5',
	'category-orange',
	'category-orange-foreground',
	'category-pink',
	'category-pink-foreground',
	'category-purple',
	'category-purple-foreground',
	'category-teal',
	'category-teal-foreground',
	'control-thumb',
]

/**
 * Tokens that are not colours — shape, type, density, elevation, scrim. Both
 * builds read these under the same name, so each is written once.
 */
const SCALE_TOKENS = [
	'radius',
	'font-sans',
	'font-heading',
	'font-mono',
	'spacing',
	'text-2xs',
	'text-caption',
	'text-compact',
	'elevation-xs',
	'elevation-sm',
	'elevation-md',
	'elevation-lg',
	'elevation-xl',
	'overlay-blur',
]

/** The scaffold the Custom tab opens with: every hook, nothing decided. */
export function buildCustomStarter() {
	const lines: string[] = [
		'/* Every hook react-web and react-charts publish, empty. Fill what you want to change',
		'   and delete the rest — an empty rule does nothing. */',
		'',
		'/* ── Tokens: one change moves every component ──────────────── */',
		'/* Colours: write both names — --x for react-web, --color-x for this site. */',
	]

	for (const token of TOKENS) {
		lines.push(`--${token}: ;`, `--color-${token}: ;`)
	}

	lines.push('', '/* Shape, type, density, elevation: one name each. */')

	for (const token of SCALE_TOKENS) {
		lines.push(`--${token}: ;`)
	}

	for (const group of slotsByGroup()) {
		lines.push(
			'',
			`/* ── ${group.title} ${'─'.repeat(Math.max(0, 54 - group.title.length))} */`,
		)

		for (const component of group.components) {
			lines.push('', `/* ${component.slug} */`)

			for (const slot of component.slots) {
				lines.push(`.${slot} {}`)
			}
		}
	}

	return lines.join('\n')
}

/**
 * The prompt a reader hands to an AI, with their own design system.
 *
 * It carries the whole slot surface inline on purpose. A prompt that says "use
 * react-web's slots" is a prompt that invents class names, and an invented
 * selector fails silently — the CSS parses, the rule matches nothing, and the
 * reader concludes the theme did not work.
 */
export function buildThemePrompt() {
	const surface = slotsByGroup()
		.map((group) =>
			[
				`## ${group.title}`,
				...group.components.map(
					(component) =>
						`- **${component.slug}** — ${component.slots
							.map((slot) => `.${slot}`)
							.join(', ')}`,
				),
			].join('\n'),
		)
		.join('\n\n')

	const total =
		Object.values(reactWebSlots).flat().length +
		reactChartsWebClasses.flatMap((component) => component.slots).length
	const tokenList = TOKENS.map((token) => `\`--${token}\``).join(', ')
	const scaleList = SCALE_TOKENS.map((token) => `\`--${token}\``).join(', ')

	return `You are going to write a theme for @turystack/react-web, a React component
library. I will paste your output into its Theme lab and it will apply live.

## First, ask me one question

Before writing anything, ask me **where the design system you should follow
lives** — a Figma file, a brand guide, a hex palette, a screenshot, a live site,
or "invent one and tell me what you chose". Wait for my answer. Do not guess a
palette, and do not start from a generic dark theme.

If I give you a source, read it and tell me in two lines what you took from it:
the primary colour, the corner radius, the type, and the one thing that makes it
recognisable. Then write the CSS.

## How the theme is applied

Everything you write lands inside react-web's scope. Two kinds of rule:

1. **Bare declarations are tokens.** They cascade to every component at once —
   colour, radius, type, spacing and elevation are all read through them.

   \`\`\`css
   --primary: oklch(58% 0.22 27);
   --color-primary: oklch(58% 0.22 27);
   --radius: 0rem;
   --elevation-sm: none;
   \`\`\`

   **Write every colour twice** — \`--x\` and \`--color-x\`. The library and the
   site compile Tailwind against different colour names, and setting only one
   moves half the page. The other tokens have one name.

2. **Nested rules target slots.** Every element react-web paints carries a
   stable class. Use these for what a token cannot express: a border width, an
   offset shadow, a transform on press, a letter-spacing. To reach one variant,
   size or state, add the attribute the root publishes —
   \`.button[data-variant="destructive"]\`, \`.button[data-size="sm"]\`,
   \`.checkbox-box[data-checked]\` — never a descendant selector.

   \`\`\`css
   .button {
     border: 2px solid var(--border);
     box-shadow: 3px 3px 0 var(--border);
   }
   .button:active:not(:disabled) {
     transform: translate(3px, 3px);
     box-shadow: none;
   }
   \`\`\`

## Rules

- Output **CSS only**, no \`\`\` fence, no commentary before or after. It goes
  straight into a textarea.
- Do the work in tokens first. Reach for a slot only when a token cannot say it.
- Never invent a class name. Use the list below verbatim; a selector that
  matches nothing fails silently and looks like the theme not working.
- Keep it coherent: one radius scale, one shadow language, one type pairing.
- Say what you changed in a \`/* comment */\` at the top, in one line.

## The tokens a theme decides

Colours: ${tokenList}

Shape, type, density, elevation: ${scaleList}

The four status pairs — \`destructive\`, \`success\`, \`warning\`, \`info\` —
colour Alert, Toast, Badge, the formatters' signed values, the password
strength meter, the uploader and every form error state.
Each \`-foreground\` is the ink that sits on a fill of that colour, so keep the
pair at readable contrast in both schemes (react-web's dark scheme lightens the
fill and switches the ink to near-black).

\`chart-1\` to \`chart-5\` paint the series of @turystack/react-charts, in order;
its grid reads \`border\`, its axis text \`muted-foreground\`, and a previous
period is drawn in \`muted-foreground\`. A chart's root publishes
\`[data-height]\`, a sparkline's \`[data-height]\` and \`[data-trend]\`.

\`overlay\` and \`overlay-blur\` are the shared scrim behind Modal, Sheet,
Confirm, SpotlightSearch and the Sidebar's mobile drawer — a colour with alpha
and a blur length (default 50% black + 8px, 70% in dark).

## The slot surface — ${total} classes react-web and react-charts publish

${surface}
`
}
