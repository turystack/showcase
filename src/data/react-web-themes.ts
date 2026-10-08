/**
 * Custom CSS the site can drop over react-web, live.
 *
 * Five modes: what the library ships, three themes a real product would ship,
 * and a box the reader pastes their own into. The themes are the
 * documentation: each is what a team would actually write, and between them
 * they use both levers a theme has:
 *
 *   1. **Root tokens** — the shadcn-shaped variables (`--primary`, `--radius`,
 *      `--background`…). Change one and every component that reads it moves at
 *      once, because none of them hardcode a colour.
 *   2. **Component classes** — every `tv()` base in react-web opens with a
 *      semantic class (`.button`, `.card-root`, `.select-trigger`,
 *      `.layout-sidebar-menu-button`). Those are the hook for what a token
 *      cannot express: a pill on one control, a frame removed from another.
 *
 * Graphite is mostly the first lever: the default neutrals plus one brand
 * colour, which is how most products start. Pebble and Slate lean on the
 * second, and both drop the frames: Pebble parts surfaces with a soft lift and
 * rounds every control into a pill; Slate squares every corner and parts
 * surfaces by tone alone — no line, no radius, no shadow.
 *
 * ## Why every token is written twice
 *
 * The site and the library both compile Tailwind, and they disagree about which
 * variable a utility reads:
 *
 *     react-web   .bg-primary { background-color: var(--primary) }
 *     showcase    .bg-primary { background-color: var(--color-primary) }
 *
 * The showcase's stylesheet is imported second and wins, so setting only
 * `--primary` moves the library's own rules and leaves every utility the site
 * compiled untouched — a button that changes its focus ring and keeps its old
 * background. Both names have to be set together. `react-web-scope.css` already
 * does this, and anything layered on top of it must too.
 */

import { buildCustomStarter } from '@/data/react-web-theme-prompt'

export type ReactWebThemeMode =
	| 'default'
	| 'graphite'
	| 'pebble'
	| 'slate'
	| 'custom'

/**
 * Graphite: the default neutrals with one brand colour.
 *
 * Nothing about the layout moves — page, card and sidebar keep the library's
 * greys. What changes is everything that signals: the primary button, the
 * active nav item's icon, the focus ring and the first chart series all turn
 * the same blue. Dialogs and sheets sit a step off the page in light, so a
 * modal over a white page still reads as a separate surface.
 */
export const GRAPHITE_CSS = `/* turystack:theme graphite */
/* ── 1. Root tokens ── */
/* Write both names: --x for react-web's rules, --color-x for the site's. */
--primary: oklch(0.488 0.243 264.376);
--color-primary: oklch(0.488 0.243 264.376);
--primary-foreground: oklch(0.985 0 0);
--color-primary-foreground: oklch(0.985 0 0);

--ring: oklch(0.623 0.214 259.815);
--color-ring: oklch(0.623 0.214 259.815);

--sidebar-primary: oklch(0.488 0.243 264.376);
--color-sidebar-primary: oklch(0.488 0.243 264.376);
--sidebar-ring: oklch(0.623 0.214 259.815);
--color-sidebar-ring: oklch(0.623 0.214 259.815);

/* One blue leads; the rest stay quiet so the brand series is the loud one. */
--chart-1: oklch(0.488 0.243 264.376);
--color-chart-1: oklch(0.488 0.243 264.376);
--chart-2: oklch(0.707 0.165 254.624);
--color-chart-2: oklch(0.707 0.165 254.624);
--chart-3: oklch(0.556 0 0);
--color-chart-3: oklch(0.556 0 0);
--chart-4: oklch(0.769 0.188 70.08);
--color-chart-4: oklch(0.769 0.188 70.08);
--chart-5: oklch(0.6 0.118 184.704);
--color-chart-5: oklch(0.6 0.118 184.704);

/* Dark: a light blue with dark text, as the library's own dark primary is.
   A saturated mid blue held white text but fell to 3.8:1 as link text. */
.dark & {
  --primary: oklch(0.707 0.165 254.624);
  --color-primary: oklch(0.707 0.165 254.624);
  --primary-foreground: oklch(0.145 0 0);
  --color-primary-foreground: oklch(0.145 0 0);
  --ring: oklch(0.809 0.105 251.813);
  --color-ring: oklch(0.809 0.105 251.813);
  --sidebar-primary: oklch(0.707 0.165 254.624);
  --color-sidebar-primary: oklch(0.707 0.165 254.624);
  --sidebar-primary-foreground: oklch(0.145 0 0);
  --color-sidebar-primary-foreground: oklch(0.145 0 0);
  --chart-1: oklch(0.623 0.214 259.815);
  --color-chart-1: oklch(0.623 0.214 259.815);
  --chart-2: oklch(0.882 0.059 254.128);
  --color-chart-2: oklch(0.882 0.059 254.128);
  --chart-3: oklch(0.708 0 0);
  --color-chart-3: oklch(0.708 0 0);
}

/* ── 2. Component classes ── */
/* Dialogs and sheets paint with --popover. Re-pointed on the popup alone,
   so menus and selects keep a white surface. */
.modal-popup,
.sheet-popup,
.confirm-popup {
  --popover: oklch(0.985 0 0);
  --color-popover: oklch(0.985 0 0);
}

.dark & .modal-popup,
.dark & .sheet-popup,
.dark & .confirm-popup {
  --popover: oklch(0.205 0 0);
  --color-popover: oklch(0.205 0 0);
}

/* The active nav item carries the brand on its icon, not on a fill. */
.layout-sidebar-menu-button[data-active] svg {
  color: var(--sidebar-primary);
}`

/**
 * Pebble: no frames, round controls, warm stone.
 *
 * Surfaces part by tone and depth instead of by an outline: the page and
 * sidebar share one warm grey, cards are a lighter stone lifted by a soft
 * shadow, and fields are filled instead of framed. Every control a hand
 * presses — button, field, select, tab, nav item — is a pill; containers get a
 * large radius, because a pill-shaped card reads as a button.
 *
 * --border survives as a hairline for what has to stay ruled: table rows,
 * separators. Filled fields part from a card by tone and fall short of the
 * 3:1 a boundary needs, so the focus ring is what marks them — it is wide and
 * in the primary colour.
 */
export const PEBBLE_CSS = `/* turystack:theme pebble */
/* ── 1. Root tokens ── */
--radius: 1rem;
--color-radius: 1rem;

--background: oklch(0.97 0.005 85);
--color-background: oklch(0.97 0.005 85);
--foreground: oklch(0.22 0.01 70);
--color-foreground: oklch(0.22 0.01 70);
--card: oklch(0.995 0.002 85);
--color-card: oklch(0.995 0.002 85);
--card-foreground: oklch(0.22 0.01 70);
--color-card-foreground: oklch(0.22 0.01 70);
--popover: oklch(0.995 0.002 85);
--color-popover: oklch(0.995 0.002 85);
--popover-foreground: oklch(0.22 0.01 70);
--color-popover-foreground: oklch(0.22 0.01 70);

--primary: oklch(0.5 0.085 158);
--color-primary: oklch(0.5 0.085 158);
--primary-foreground: oklch(0.99 0 0);
--color-primary-foreground: oklch(0.99 0 0);
--secondary: oklch(0.93 0.007 85);
--color-secondary: oklch(0.93 0.007 85);
--secondary-foreground: oklch(0.22 0.01 70);
--color-secondary-foreground: oklch(0.22 0.01 70);
--muted: oklch(0.93 0.007 85);
--color-muted: oklch(0.93 0.007 85);
--muted-foreground: oklch(0.5 0.012 70);
--color-muted-foreground: oklch(0.5 0.012 70);
--accent: oklch(0.93 0.007 85);
--color-accent: oklch(0.93 0.007 85);
--accent-foreground: oklch(0.22 0.01 70);
--color-accent-foreground: oklch(0.22 0.01 70);

--border: oklch(0.22 0.01 70 / 8%);
--color-border: oklch(0.22 0.01 70 / 8%);
/* Fields frame in their own fill, so the edge disappears; the outline
   button's dark tint (input/30) still has something to show. */
--input: var(--muted);
--color-input: var(--muted);
/* Opaque: utilities already halve it (ring-ring/50), and on a frameless
   field the ring and the focus border are the only edge there is. */
--ring: oklch(0.5 0.085 158);
--color-ring: oklch(0.5 0.085 158);

--sidebar: oklch(0.97 0.005 85);
--color-sidebar: oklch(0.97 0.005 85);
--sidebar-foreground: oklch(0.22 0.01 70);
--color-sidebar-foreground: oklch(0.22 0.01 70);
--sidebar-primary: oklch(0.5 0.085 158);
--color-sidebar-primary: oklch(0.5 0.085 158);
--sidebar-primary-foreground: oklch(0.99 0 0);
--color-sidebar-primary-foreground: oklch(0.99 0 0);
--sidebar-accent: oklch(0.995 0.002 85);
--color-sidebar-accent: oklch(0.995 0.002 85);
--sidebar-accent-foreground: oklch(0.22 0.01 70);
--color-sidebar-accent-foreground: oklch(0.22 0.01 70);
/* Kept as a hairline: separators and sub-menu guides read it. The rail's
   own edge is removed below instead. */
--sidebar-border: oklch(0.22 0.01 70 / 8%);
--color-sidebar-border: oklch(0.22 0.01 70 / 8%);

/* Depth replaces the outline: wide and faint, never a hard edge. */
--elevation-sm: 0 1px 2px oklch(0.3 0.02 70 / 4%), 0 4px 16px -4px oklch(0.3 0.02 70 / 8%);
--color-elevation-sm: 0 1px 2px oklch(0.3 0.02 70 / 4%), 0 4px 16px -4px oklch(0.3 0.02 70 / 8%);

--chart-1: oklch(0.5 0.085 158);
--color-chart-1: oklch(0.5 0.085 158);
--chart-2: oklch(0.65 0.12 45);
--color-chart-2: oklch(0.65 0.12 45);
--chart-3: oklch(0.78 0.11 85);
--color-chart-3: oklch(0.78 0.11 85);
--chart-4: oklch(0.55 0.06 240);
--color-chart-4: oklch(0.55 0.06 240);
--chart-5: oklch(0.7 0.06 158);
--color-chart-5: oklch(0.7 0.06 158);

/* Dark: warm charcoal, not black, so the stone carries through. */
.dark & {
  --background: oklch(0.2 0.007 70);
  --color-background: oklch(0.2 0.007 70);
  --foreground: oklch(0.96 0.005 85);
  --color-foreground: oklch(0.96 0.005 85);
  --card: oklch(0.25 0.008 70);
  --color-card: oklch(0.25 0.008 70);
  --card-foreground: oklch(0.96 0.005 85);
  --color-card-foreground: oklch(0.96 0.005 85);
  --popover: oklch(0.25 0.008 70);
  --color-popover: oklch(0.25 0.008 70);
  --popover-foreground: oklch(0.96 0.005 85);
  --color-popover-foreground: oklch(0.96 0.005 85);

  --primary: oklch(0.8 0.09 158);
  --color-primary: oklch(0.8 0.09 158);
  --primary-foreground: oklch(0.2 0.02 158);
  --color-primary-foreground: oklch(0.2 0.02 158);
  --secondary: oklch(0.3 0.008 70);
  --color-secondary: oklch(0.3 0.008 70);
  --secondary-foreground: oklch(0.96 0.005 85);
  --color-secondary-foreground: oklch(0.96 0.005 85);
  --muted: oklch(0.3 0.008 70);
  --color-muted: oklch(0.3 0.008 70);
  --muted-foreground: oklch(0.72 0.01 80);
  --color-muted-foreground: oklch(0.72 0.01 80);
  --accent: oklch(0.3 0.008 70);
  --color-accent: oklch(0.3 0.008 70);
  --accent-foreground: oklch(0.96 0.005 85);
  --color-accent-foreground: oklch(0.96 0.005 85);

  --border: oklch(1 0 0 / 7%);
  --color-border: oklch(1 0 0 / 7%);
  --ring: oklch(0.8 0.09 158);
  --color-ring: oklch(0.8 0.09 158);

  --sidebar: oklch(0.2 0.007 70);
  --color-sidebar: oklch(0.2 0.007 70);
  --sidebar-foreground: oklch(0.96 0.005 85);
  --color-sidebar-foreground: oklch(0.96 0.005 85);
  --sidebar-primary: oklch(0.8 0.09 158);
  --color-sidebar-primary: oklch(0.8 0.09 158);
  --sidebar-primary-foreground: oklch(0.2 0.02 158);
  --color-sidebar-primary-foreground: oklch(0.2 0.02 158);
  --sidebar-accent: oklch(0.25 0.008 70);
  --color-sidebar-accent: oklch(0.25 0.008 70);
  --sidebar-accent-foreground: oklch(0.96 0.005 85);
  --color-sidebar-accent-foreground: oklch(0.96 0.005 85);

  --elevation-sm: 0 1px 2px oklch(0 0 0 / 20%), 0 6px 20px -6px oklch(0 0 0 / 35%);
  --color-elevation-sm: 0 1px 2px oklch(0 0 0 / 20%), 0 6px 20px -6px oklch(0 0 0 / 35%);

  --chart-1: oklch(0.8 0.09 158);
  --color-chart-1: oklch(0.8 0.09 158);
  --chart-2: oklch(0.74 0.12 45);
  --color-chart-2: oklch(0.74 0.12 45);
  --chart-3: oklch(0.84 0.1 85);
  --color-chart-3: oklch(0.84 0.1 85);
  --chart-4: oklch(0.7 0.07 240);
  --color-chart-4: oklch(0.7 0.07 240);
  --chart-5: oklch(0.6 0.05 158);
  --color-chart-5: oklch(0.6 0.05 158);
}

/* ── 2. Component classes ── */
/* Pills: everything a hand presses. */
.button,
.input-field,
.select-trigger,
.segmented-control,
.segmented-control-segment,
.tabs-list:not([data-variant="line"]) .tabs-trigger,
.toggle,
.layout-sidebar-menu-button,
.search-field-box,
.spotlight-search-field {
  border-radius: 9999px;
}

/* A small checkbox at the theme radius rounds into a circle and reads as a
   radio. Pin it square-ish. */
.checkbox-box {
  border-radius: 4px;
}

/* Fields are filled, not framed. A ghost field stays bare, and a disabled
   one drops to half the fill so it still reads as off. */
.input-field:not([data-variant="ghost"] *),
.textarea-field:not([data-variant="ghost"] *),
.select-trigger:not([data-variant="ghost"] *),
.spotlight-search-field {
  background-color: var(--muted);
}

.input-field:disabled,
.textarea-field:disabled,
.select-trigger:disabled,
.select-trigger[data-disabled] {
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}

/* Cards: the ring becomes a lift. Written as box-shadow, not as a ring
   token, because a card does not cast one by default. */
.card-root {
  box-shadow: var(--elevation-sm);
}

/* Frames that only outlined a surface. Table rows keep their hairline. */
.table-container,
.modal-popup,
.sheet-popup,
.confirm-popup,
.layout-header,
.layout-sidebar-container {
  border-color: transparent;
}

.table-container {
  background-color: var(--card);
  border-radius: calc(var(--radius) * 1.4);
  /* Sticky cells paint --background so scrolled rows hide behind them.
     Inside a card-toned table that is a stone patch; re-point it. */
  --background: var(--card);
  --color-background: var(--card);
}

/* Controls keep an edge. On a checkbox, radio or switch the line is the
   control itself, not a frame, and it has to hold 3:1 against whatever it
   sits on — a fill matched to --muted would vanish on a muted surface. */
.checkbox-box:not([data-checked]):not([data-indeterminate]),
.radio-control:not([data-checked]),
.radio-card[data-unchecked] .radio-card-control {
  border-color: color-mix(in oklch, var(--muted-foreground) 85%, transparent);
}

.switch-root[data-unchecked] {
  background-color: color-mix(in oklch, var(--muted-foreground) 85%, transparent);
}`

/**
 * Slate: no borders, no radius, no shadows — square surfaces that part by
 * tone alone.
 *
 * Three steps of one cool grey do all the work: the sidebar sits darkest, the
 * page in the middle, cards and popovers lightest. Fields are filled a step
 * below the card they sit on. Every corner is square — only a radio and a
 * switch keep their circle, because there the shape is the meaning — and a
 * single indigo carries every signal.
 *
 * `border-style: none` on every element: no rule, frame, separator or ring
 * draws anywhere. Card sections part by spacing, table rows by zebra, outline
 * buttons and fields by a fill, selection by a tint or a colour. Overlays
 * keep their shadow — a menu floating over the page with neither edge nor
 * depth would be indistinguishable from it. A focused field turns a primary
 * tint; only buttons and links keep a ring, and only for the keyboard.
 */
export const SLATE_CSS = `/* turystack:theme slate */
/* ── 1. Root tokens ── */
--radius: 0rem;
--color-radius: 0rem;

--background: oklch(0.965 0.005 255);
--color-background: oklch(0.965 0.005 255);
--foreground: oklch(0.21 0.02 265);
--color-foreground: oklch(0.21 0.02 265);
--card: oklch(1 0 0);
--color-card: oklch(1 0 0);
--card-foreground: oklch(0.21 0.02 265);
--color-card-foreground: oklch(0.21 0.02 265);
--popover: oklch(1 0 0);
--color-popover: oklch(1 0 0);
--popover-foreground: oklch(0.21 0.02 265);
--color-popover-foreground: oklch(0.21 0.02 265);

--primary: oklch(0.511 0.262 276.966);
--color-primary: oklch(0.511 0.262 276.966);
--primary-foreground: oklch(0.985 0 0);
--color-primary-foreground: oklch(0.985 0 0);
--secondary: oklch(0.93 0.01 255);
--color-secondary: oklch(0.93 0.01 255);
--secondary-foreground: oklch(0.21 0.02 265);
--color-secondary-foreground: oklch(0.21 0.02 265);
--muted: oklch(0.945 0.008 255);
--color-muted: oklch(0.945 0.008 255);
--muted-foreground: oklch(0.5 0.02 260);
--color-muted-foreground: oklch(0.5 0.02 260);
--accent: oklch(0.93 0.01 255);
--color-accent: oklch(0.93 0.01 255);
--accent-foreground: oklch(0.21 0.02 265);
--color-accent-foreground: oklch(0.21 0.02 265);

/* No line anywhere: every rule, frame and separator reads --border. */
--border: transparent;
--color-border: transparent;
--input: var(--muted);
--color-input: var(--muted);
/* Opaque: utilities already halve it (ring-ring/50), and on a frameless
   field the ring and the focus border are the only edge there is. */
--ring: oklch(0.511 0.262 276.966);
--color-ring: oklch(0.511 0.262 276.966);

--sidebar: oklch(0.93 0.01 255);
--color-sidebar: oklch(0.93 0.01 255);
--sidebar-foreground: oklch(0.21 0.02 265);
--color-sidebar-foreground: oklch(0.21 0.02 265);
--sidebar-primary: oklch(0.511 0.262 276.966);
--color-sidebar-primary: oklch(0.511 0.262 276.966);
--sidebar-primary-foreground: oklch(0.985 0 0);
--color-sidebar-primary-foreground: oklch(0.985 0 0);
--sidebar-accent: oklch(0.985 0.003 255);
--color-sidebar-accent: oklch(0.985 0.003 255);
--sidebar-accent-foreground: oklch(0.21 0.02 265);
--color-sidebar-accent-foreground: oklch(0.21 0.02 265);
--sidebar-border: transparent;
--color-sidebar-border: transparent;
--sidebar-ring: oklch(0.511 0.262 276.966);
--color-sidebar-ring: oklch(0.511 0.262 276.966);

/* Flat: the small elevations go. md and up stay for what floats. */
--elevation-2xs: 0 0 #0000;
--color-elevation-2xs: 0 0 #0000;
--elevation-xs: 0 0 #0000;
--color-elevation-xs: 0 0 #0000;
--elevation-sm: 0 0 #0000;
--color-elevation-sm: 0 0 #0000;

--chart-1: oklch(0.511 0.262 276.966);
--color-chart-1: oklch(0.511 0.262 276.966);
--chart-2: oklch(0.715 0.143 215.221);
--color-chart-2: oklch(0.715 0.143 215.221);
--chart-3: oklch(0.585 0.233 277.117);
--color-chart-3: oklch(0.585 0.233 277.117);
--chart-4: oklch(0.795 0.184 86.047);
--color-chart-4: oklch(0.795 0.184 86.047);
--chart-5: oklch(0.554 0.046 257.417);
--color-chart-5: oklch(0.554 0.046 257.417);

/* Dark: the same three steps, the sidebar still the deepest. */
.dark & {
  --background: oklch(0.18 0.01 260);
  --color-background: oklch(0.18 0.01 260);
  --foreground: oklch(0.96 0.005 255);
  --color-foreground: oklch(0.96 0.005 255);
  --card: oklch(0.235 0.012 260);
  --color-card: oklch(0.235 0.012 260);
  --card-foreground: oklch(0.96 0.005 255);
  --color-card-foreground: oklch(0.96 0.005 255);
  --popover: oklch(0.235 0.012 260);
  --color-popover: oklch(0.235 0.012 260);
  --popover-foreground: oklch(0.96 0.005 255);
  --color-popover-foreground: oklch(0.96 0.005 255);

  --primary: oklch(0.673 0.182 276.935);
  --color-primary: oklch(0.673 0.182 276.935);
  --primary-foreground: oklch(0.17 0.03 277);
  --color-primary-foreground: oklch(0.17 0.03 277);
  --secondary: oklch(0.29 0.014 260);
  --color-secondary: oklch(0.29 0.014 260);
  --secondary-foreground: oklch(0.96 0.005 255);
  --color-secondary-foreground: oklch(0.96 0.005 255);
  --muted: oklch(0.29 0.014 260);
  --color-muted: oklch(0.29 0.014 260);
  --muted-foreground: oklch(0.72 0.02 258);
  --color-muted-foreground: oklch(0.72 0.02 258);
  --accent: oklch(0.29 0.014 260);
  --color-accent: oklch(0.29 0.014 260);
  --accent-foreground: oklch(0.96 0.005 255);
  --color-accent-foreground: oklch(0.96 0.005 255);

  --ring: oklch(0.673 0.182 276.935);
  --color-ring: oklch(0.673 0.182 276.935);

  --sidebar: oklch(0.145 0.01 260);
  --color-sidebar: oklch(0.145 0.01 260);
  --sidebar-foreground: oklch(0.96 0.005 255);
  --color-sidebar-foreground: oklch(0.96 0.005 255);
  --sidebar-primary: oklch(0.673 0.182 276.935);
  --color-sidebar-primary: oklch(0.673 0.182 276.935);
  --sidebar-primary-foreground: oklch(0.17 0.03 277);
  --color-sidebar-primary-foreground: oklch(0.17 0.03 277);
  --sidebar-accent: oklch(0.235 0.012 260);
  --color-sidebar-accent: oklch(0.235 0.012 260);
  --sidebar-accent-foreground: oklch(0.96 0.005 255);
  --color-sidebar-accent-foreground: oklch(0.96 0.005 255);
  --sidebar-ring: oklch(0.673 0.182 276.935);
  --color-sidebar-ring: oklch(0.673 0.182 276.935);

  --chart-1: oklch(0.673 0.182 276.935);
  --color-chart-1: oklch(0.673 0.182 276.935);
  --chart-2: oklch(0.789 0.154 211.53);
  --color-chart-2: oklch(0.789 0.154 211.53);
  --chart-3: oklch(0.785 0.115 274.713);
  --color-chart-3: oklch(0.785 0.115 274.713);
  --chart-4: oklch(0.852 0.199 91.936);
  --color-chart-4: oklch(0.852 0.199 91.936);
  --chart-5: oklch(0.704 0.04 256.788);
  --color-chart-5: oklch(0.704 0.04 256.788);
}

/* ── 2. Component classes ── */
/* border: none, on every element and pseudo-element. Wherever a line
   carried meaning, a fill or a colour carries it instead — the rules below.
   Rings are borders drawn in box-shadow, so they go too. The keyboard focus
   ring stays on buttons and links only: it shows for Tab, never for a
   click. A focused field shows its focus by tone (below). */
*,
*::before,
*::after {
  border-style: none;
  border-radius: 0;
}

/* Square everything, except where the circle is the meaning: a square radio
   reads as a checkbox (one choice versus many), and a switch's round thumb is
   what says it slides. */
.radio-control,
.radio-dot,
.radio-card-control,
.accordion-trigger-radio,
.accordion-trigger-radio-dot,
.switch-root,
.switch-thumb {
  border-radius: 9999px;
}

*:not(:focus-visible),
.input-field,
.textarea-field,
.select-trigger,
.otp-input-slot {
  --tw-ring-shadow: 0 0 #0000;
}

/* Fields wear a fill a step below the card. Focus is a primary tint, not a
   ring: a text field matches :focus-visible on a click too, so a ring would
   draw a line every time it is used. An invalid field is tinted red, and its
   message says why. A ghost field stays bare; a disabled one drops to half
   the fill. */
.input-field:not([data-variant="ghost"] *),
.textarea-field:not([data-variant="ghost"] *),
.select-trigger:not([data-variant="ghost"] *),
.spotlight-search-field,
.otp-input-slot {
  background-color: var(--muted);
}

.input-field:disabled,
.textarea-field:disabled,
.select-trigger:disabled,
.select-trigger[data-disabled] {
  background-color: color-mix(in oklch, var(--muted) 50%, transparent);
}

.input-field[aria-invalid="true"],
.textarea-field[aria-invalid="true"],
.select-trigger[aria-invalid="true"] {
  background-color: color-mix(in oklch, var(--destructive) 12%, var(--muted));
}

.input-field:focus-visible,
.textarea-field:focus-visible,
.select-trigger:focus-visible,
.otp-input-slot[data-active="true"],
.spotlight-search-field:focus-within {
  box-shadow: none;
  background-color: color-mix(in oklch, var(--primary) 16%, var(--muted));
}

/* OTP slots were one bar split by rules; without the rules they are tiles. */
.otp-input-slot {
  margin-inline-end: 0.375rem;
}

/* Outline and dashed buttons have nothing left to draw: both become a
   card-toned chip, lighter than secondary's grey on the page where toolbars
   sit. On a card they read like ghost — the honest cost of no lines. */
.button[data-variant="outline"],
.button[data-variant="dashed"],
.toggle[data-variant="outline"]:not([data-pressed]) {
  background-color: var(--card);
}

.button[data-variant="outline"]:hover:not(:disabled),
.button[data-variant="dashed"]:hover:not(:disabled) {
  background-color: color-mix(in oklch, var(--card), var(--foreground) 6%);
}

/* Choice cards: unpicked is a faint tint, picked a primary one. A tint, not
   --muted, so it reads on a white card and on a grey panel alike. */
.radio-card[data-unchecked] {
  background-color: color-mix(in oklch, var(--foreground) 4%, transparent);
}

.radio-card[data-checked] {
  background-color: color-mix(in oklch, var(--primary) 14%, transparent);
}

/* Controls: the edge was the control. An unchecked box, radio or switch is
   now a solid grey fill that holds 3:1 against its surface; checked ones
   already fill with the primary. */
.checkbox-box:not([data-checked]):not([data-indeterminate]),
.radio-control[data-unchecked],
.radio-card[data-unchecked] .radio-card-control,
.accordion-trigger-radio,
.switch-root[data-unchecked] {
  background-color: color-mix(in oklch, var(--muted-foreground) 85%, transparent);
}

[aria-expanded="true"] .accordion-trigger-radio {
  background-color: var(--primary);
}

[aria-expanded="true"] .accordion-trigger-radio-dot {
  background-color: var(--primary-foreground);
}

/* The checklist marker exposes no state; only a done one carries a fill,
   so the utility is the only hook there is. */
.checklist-item-marker:not(.bg-primary) {
  background-color: var(--muted);
}

/* A line tab marked the active one with an underline: now it is colour. */
.tabs-list[data-variant="line"] .tabs-trigger[data-active] {
  color: var(--primary);
}

/* The chart legend's compare swatch was a dashed border. It is a data glyph,
   not a frame, so it comes back as a dashed background. */
.chart-swatch-compare {
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--muted-foreground) 0 3px, transparent 3px 5px);
}

/* Rows part by zebra instead of a rule. */
.table-row:nth-child(even):not([data-state="selected"]) {
  background-color: color-mix(in oklch, var(--muted) 55%, transparent);
}

.table-container {
  background-color: var(--card);
  /* Sticky cells paint --background so scrolled rows hide behind them.
     Inside a card-toned table that is a grey patch; re-point it. */
  --background: var(--card);
  --color-background: var(--card);
}`

/** What a reader starts from when they pick Custom. */
/**
 * What the Custom tab opens with: every hook react-web publishes, empty.
 *
 * It used to be four tokens and one rule — enough to show the shape and not
 * enough to start from. A reader who wanted to restyle the table had no way to
 * learn that `.table-row` existed short of opening the inspector. Built from
 * the slot catalogue, the scaffold is the documentation: delete what you do not
 * want, fill what you do, and an empty rule costs nothing.
 */
export const CUSTOM_STARTER = buildCustomStarter()

export const THEME_CSS: Record<
	Exclude<ReactWebThemeMode, 'default' | 'custom'>,
	string
> = {
	graphite: GRAPHITE_CSS,
	pebble: PEBBLE_CSS,
	slate: SLATE_CSS,
}

export const THEME_MODES: {
	id: ReactWebThemeMode
	name: string
	description: string
}[] = [
	{
		description: 'What the library ships: shadcn neutral, nothing overridden.',
		id: 'default',
		name: 'Default',
	},
	{
		description: 'The same neutrals with one brand blue on every signal.',
		id: 'graphite',
		name: 'Graphite',
	},
	{
		description: 'No frames, pill controls, warm stone surfaces.',
		id: 'pebble',
		name: 'Pebble',
	},
	{
		description: 'No borders, no radius, no shadows: square tonal surfaces.',
		id: 'slate',
		name: 'Slate',
	},
	{
		description: 'Yours. Paste CSS and it applies as you type.',
		id: 'custom',
		name: 'Custom',
	},
]
