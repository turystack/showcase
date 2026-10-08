import{j as n}from"./index-B7Ig6kNO.js";import{C as e}from"./CodeBlock-jMISp3qZ.js";import{E as t}from"./external-link-zu_phdHm.js";import"./highlight-XlOl9cwO.js";import"./copy-DmxgNTfX.js";const r=`/* turystack:theme example */

/*
 * acme › internal — the theme the backoffice and the console are built against.
 *
 * A worked example for reading rather than importing: every kind of override a
 * theme can make, numbered, each against a slot @turystack/react-web really
 * paints. \`example.html\` renders the real components with and without this
 * file, and its generator fails when a selector here matches nothing. The
 * project's own themes live beside this file under their system's name;
 * \`gate:theme-per-system\` skips \`template.css\` and \`example.css\`.
 *
 * Imported after \`@turystack/react-web/styles.css\` (UIX-21).
 *
 *   1  tokens        1.1 colour roles   1.2 status        1.3 the dark half
 *                    1.4 shape          1.5 type          1.6 density
 *                    1.7 elevation      1.8 scrim         1.9 regions
 *   2  slots         2.1 a root         2.2 its parts     2.3 a pseudo-class
 *                    2.4 a scheme       2.5 a viewport    2.6 a preference
 *                    2.7 a portaled part
 *   3  axes, states  3.1 variant        3.2 size          3.3 variant × size
 *                    3.4 density        3.5 a primitive's state
 *                    3.6 an accessible state             3.7 state × axis
 */

/* ======================================================================== */
/* 1 — tokens. Most of acme's identity is here, and a rebrand touches         */
/*     nothing else. Every utility in the library reads one of these.         */
/* ======================================================================== */

:root {
  /* 1.1 — colour roles. A role, never an appearance (UIX-4): \`primary\`, not
     \`blue\`. Each fill has the ink that sits on it. */
  --background: oklch(0.99 0.002 258);
  --foreground: oklch(0.2 0.02 258);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.2 0.02 258);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.2 0.02 258);
  --primary: oklch(0.42 0.09 258);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.95 0.01 258);
  --secondary-foreground: oklch(0.3 0.04 258);
  --muted: oklch(0.96 0.005 258);
  --muted-foreground: oklch(0.52 0.02 258);
  --accent: oklch(0.94 0.02 258);
  --accent-foreground: oklch(0.3 0.06 258);
  --border: oklch(0.9 0.01 258);
  --input: oklch(0.86 0.01 258);
  --ring: oklch(0.62 0.09 258);

  /* 1.2 — status. Alerts, toasts, badges, signed values and every form error
     read these; each pair stays readable in both schemes. */
  --destructive: oklch(0.51 0.17 24);
  --destructive-foreground: oklch(0.98 0 0);
  --success: oklch(0.52 0.12 155);
  --success-foreground: oklch(0.98 0 0);
  --warning: oklch(0.58 0.14 65);
  --warning-foreground: oklch(0.98 0 0);
  --info: oklch(0.52 0.12 240);
  --info-foreground: oklch(0.98 0 0);

  /* 1.4 — shape. One value; the scale from \`sm\` to \`4xl\` is derived from it,
     so a squarer product is this line and nothing else. */
  --radius: 0.375rem;

  /* 1.5 — type. The family the body, the headings and the code are set in,
     and the steps of the type scale. Loading the font is the application's
     job (a @fontsource import at its entry); naming it is the theme's. */
  --font-sans: "Inter Variable", "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Inter Tight Variable", var(--font-sans);
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --text-sm: 0.8125rem;
  --text-base: 0.9375rem;

  /* 1.6 — density. Every padding, gap and fixed height is a multiple of this:
     operators scan hundreds of rows a day, so acme runs a step tighter. */
  --spacing: 0.225rem;

  /* 1.7 — elevation. Every \`shadow-*\` the library casts. A card here is a
     surface for data, not a raised object: the low steps go flat. */
  --elevation-xs: none;
  --elevation-sm: 0 0 0 1px var(--border);
  --elevation-md: 0 2px 6px -2px oklch(0.2 0.02 258 / 0.18);
  --elevation-lg: 0 8px 24px -8px oklch(0.2 0.02 258 / 0.22);

  /* 1.8 — the scrim behind Modal, Sheet, Confirm and SpotlightSearch. */
  --overlay: oklch(0.2 0.02 258 / 45%);
  --overlay-blur: 4px;

  /* 1.9 — regions with their own palette: the sidebar shell and the series a
     chart draws in. */
  --sidebar: oklch(0.97 0.006 258);
  --sidebar-foreground: oklch(0.25 0.02 258);
  --sidebar-primary: oklch(0.42 0.09 258);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.93 0.015 258);
  --sidebar-accent-foreground: oklch(0.25 0.04 258);
  --sidebar-border: oklch(0.9 0.01 258);
  --sidebar-ring: oklch(0.62 0.09 258);
  --chart-1: oklch(0.55 0.12 258);
  --chart-2: oklch(0.62 0.12 185);
  --chart-3: oklch(0.7 0.13 85);
  --chart-4: oklch(0.6 0.15 25);
  --chart-5: oklch(0.55 0.1 310);
}

/* 1.3 — the dark half. Every colour declared above has its value here too
   (UIX-5): a token defined for one scheme only breaks in the other, invisibly,
   for whoever built it in light. Shape, type and density hold in both. */
.dark {
  --background: oklch(0.17 0.015 258);
  --foreground: oklch(0.95 0.005 258);
  --card: oklch(0.21 0.018 258);
  --card-foreground: oklch(0.95 0.005 258);
  --popover: oklch(0.21 0.018 258);
  --popover-foreground: oklch(0.95 0.005 258);
  --primary: oklch(0.72 0.11 258);
  --primary-foreground: oklch(0.18 0.02 258);
  --secondary: oklch(0.27 0.02 258);
  --secondary-foreground: oklch(0.92 0.01 258);
  --muted: oklch(0.26 0.02 258);
  --muted-foreground: oklch(0.68 0.02 258);
  --accent: oklch(0.3 0.03 258);
  --accent-foreground: oklch(0.92 0.02 258);
  --border: oklch(0.32 0.02 258);
  --input: oklch(0.36 0.02 258);
  --ring: oklch(0.6 0.09 258);
  --destructive: oklch(0.68 0.15 24);
  --destructive-foreground: oklch(0.17 0.015 258);
  --success: oklch(0.72 0.13 155);
  --success-foreground: oklch(0.17 0.015 258);
  --warning: oklch(0.8 0.13 75);
  --warning-foreground: oklch(0.17 0.015 258);
  --info: oklch(0.72 0.11 240);
  --info-foreground: oklch(0.17 0.015 258);
  --overlay: oklch(0 0 0 / 65%);
  --sidebar: oklch(0.19 0.016 258);
  --sidebar-foreground: oklch(0.92 0.01 258);
  --sidebar-primary: oklch(0.72 0.11 258);
  --sidebar-primary-foreground: oklch(0.18 0.02 258);
  --sidebar-accent: oklch(0.27 0.02 258);
  --sidebar-accent-foreground: oklch(0.92 0.01 258);
  --sidebar-border: oklch(0.3 0.02 258);
  --sidebar-ring: oklch(0.6 0.09 258);
  --chart-1: oklch(0.72 0.11 258);
  --chart-2: oklch(0.75 0.11 185);
  --chart-3: oklch(0.82 0.12 85);
  --chart-4: oklch(0.72 0.14 25);
  --chart-5: oklch(0.7 0.1 310);
}

/* ======================================================================== */
/* 2 — slots, where acme's design differs in shape and not only in colour.    */
/*     The class is the slot's public name; its markup is not.                */
/* ======================================================================== */

/* 2.1 — a root. Labels set in small caps, which no token can say. */
.button {
  letter-spacing: 0.02em;
  font-variant-caps: all-small-caps;
}

/* 2.2 — its parts. Each part publishes its own class, so the title is reached
   by name rather than by where it sits inside the card. */
.card-root {
  border-color: var(--border);
}

.card-title {
  font-family: var(--font-heading);
  letter-spacing: -0.01em;
}

.card-description {
  font-size: var(--text-sm);
}

.table-head {
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.table-cell {
  font-variant-numeric: tabular-nums;
}

/* 2.3 — a pseudo-class on a slot. The browser's states need no attribute. */
.button:hover {
  filter: saturate(1.15);
}

.input-field::placeholder {
  font-style: italic;
}

.input-field:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 1px;
}

/* 2.4 — a scheme. The colour-scheme scope is the one place a theme may nest,
   one level deep: for what differs by scheme and is not a colour. */
.dark .card-root {
  border-width: 1px;
  border-color: oklch(1 0 0 / 8%);
}

/* 2.5 — a viewport. A media query wraps the slot; it never replaces it. */
@media (max-width: 30rem) {
  .card-root {
    border-radius: 0;
  }
}

/* 2.6 — a preference. What the reader asked for wins over acme's motion. */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
}

/* 2.7 — a portaled part. A popup renders at the end of the document, far from
   its trigger, so it is reached by its own class — never through the trigger
   that opened it. */
.dropdown-menu-popup {
  border-color: var(--border);
}

/* ======================================================================== */
/* 3 — axes and states acme treats differently. The slot is the same; one     */
/*     attribute it publishes narrows it.                                     */
/* ======================================================================== */

/* 3.1 — variant. Cancelling an order is destructive and reversible by nobody:
   acme states it with an outline rather than a filled block, so the primary
   action on the screen stays the primary action. */
.button[data-variant="destructive"] {
  background: transparent;
  color: var(--destructive);
  border-color: var(--destructive);
}

.badge-root[data-variant="success"] {
  border-radius: var(--radius);
}

.alert-root[data-variant="warning"] {
  border-inline-start: 3px solid var(--warning);
}

/* 3.2 — size. The small button is the one in table rows, where acme drops the
   small caps to keep the label legible at that height. */
.button[data-size="sm"] {
  font-variant-caps: normal;
}

/* 3.3 — variant × size. Both attributes on the same slot, never a descendant. */
.button[data-variant="outline"][data-size="lg"] {
  border-width: 2px;
}

/* 3.4 — density. Compact tables are a decision for a surface kind (UIX-7),
   expressed once. */
.table-root[data-density="compact"] .table-cell {
  padding-block: 0.125rem;
}

/* 3.5 — a primitive's state. Published present and empty: select on presence,
   never on \`="true"\`. */
.checkbox-box[data-checked] {
  border-radius: 9999px;
}

.switch-root[data-checked] {
  background: var(--success);
}

.tabs-trigger[data-active] {
  font-weight: 600;
}

/* The item under the pointer or the keyboard, and the trigger whose popup is
   open — both exist only while the menu does. */
.dropdown-menu-item[data-highlighted] {
  background: var(--accent);
}

.button[data-popup-open] {
  background: var(--accent);
}

/* A blocked action stays visible and inert with its reason (ARC-ERR-9); acme
   dims it rather than hiding it. */
.button[data-disabled] {
  opacity: 0.55;
}

/* 3.6 — an accessible state. The component's own semantics are a hook too. */
.input-field[aria-invalid="true"] {
  background: color-mix(in oklch, var(--destructive) 6%, transparent);
}

.button[aria-busy="true"] {
  cursor: progress;
}

.button[aria-current="page"] {
  text-decoration-thickness: 2px;
}

/* 3.7 — state × axis. */
.button[data-variant="destructive"]:hover {
  background: color-mix(in oklch, var(--destructive) 10%, transparent);
}

/*
 * Never:
 *   .card-root > div span { }               reaches through the markup (UIX-18)
 *   .button { color: red !important }       wins the argument, hides which rule was wrong
 *   .button[data-disabled="true"] { }       the state is published empty; this matches nothing
 *   .card-root { box-shadow: … }            when every surface changed — that is \`--elevation-*\`
 *   .button { font-family: … }              when the product's type changed — that is \`--font-sans\`
 *   a component re-implemented in the app because a slot was missing —
 *   that is a gap to close in the library (HRN-12)
 */
`,a=`/* turystack:theme <system> — write this file's name in place of <system>; the gates find copies by it */

/*
 * {{PROJECT}} — theme starting point.
 *
 * GENERATED from @turystack/react-web by \`showcase\` › \`pnpm theme-template:write\`:
 * every variable the library reads — its own tokens and every Tailwind
 * variable in its built theme layer — and every slot class it paints. Do
 * not edit it here — \`pnpm check:theme-template\` fails when it drifts.
 *
 * Copy this file to \`theme/<system>.css\`, one per design system, and index it in
 * \`07-theme.md\` with the audiences it serves. \`template.css\` and \`example.css\`
 * are the skill's own reference files: they are never a project's theme, and
 * \`gate:theme-per-system\` skips them for that reason.
 *
 * Fill what the design states and delete the rest. A token left empty keeps
 * the library's value, which is shown beside it; a value the design never
 * declared stays out (HRN-10), it is not a plausible default.
 *
 * Import it AFTER \`@turystack/react-web/styles.css\`. The library's tokens are
 * declared at \`:root\` outside any cascade layer, exactly as these are: same
 * specificity, so the later file wins. The slot rules below win either way —
 * the library's utilities live in \`@layer utilities\` and an unlayered rule
 * beats every layer.
 *
 * Three layers, in the order they are reached for. Resolving at layer 1 and
 * stopping is the whole discipline — descending when layer 1 would have done it
 * is what turns a theme into a second implementation of the library.
 * \`example.css\` shows every kind of override against real slots.
 */

/* ------------------------------------------------------------------------ */
/* 1 — tokens. A rebrand is this layer and nothing else.                      */
/* ------------------------------------------------------------------------ */

:root {
  /* --radius:                             ;  library: 0.625rem */
  /* --background:                         ;  library: oklch(1 0 0) */
  /* --foreground:                         ;  library: oklch(0.145 0 0) */
  /* --card:                               ;  library: oklch(1 0 0) */
  /* --card-foreground:                    ;  library: oklch(0.145 0 0) */
  /* --popover:                            ;  library: oklch(1 0 0) */
  /* --popover-foreground:                 ;  library: oklch(0.145 0 0) */
  /* --primary:                            ;  library: oklch(0.205 0 0) */
  /* --primary-foreground:                 ;  library: oklch(0.985 0 0) */
  /* --secondary:                          ;  library: oklch(0.97 0 0) */
  /* --secondary-foreground:               ;  library: oklch(0.205 0 0) */
  /* --muted:                              ;  library: oklch(0.97 0 0) */
  /* --muted-foreground:                   ;  library: oklch(0.556 0 0) */
  /* --accent:                             ;  library: oklch(0.97 0 0) */
  /* --accent-foreground:                  ;  library: oklch(0.205 0 0) */
  /* --destructive:                        ;  library: oklch(0.49 0.2 27.325) */
  /* --destructive-foreground:             ;  library: oklch(0.985 0 0) */
  /* --success:                            ;  library: oklch(0.527 0.154 150.069) */
  /* --success-foreground:                 ;  library: oklch(0.985 0 0) */
  /* --warning:                            ;  library: oklch(0.555 0.163 48.998) */
  /* --warning-foreground:                 ;  library: oklch(0.985 0 0) */
  /* --info:                               ;  library: oklch(0.546 0.245 262.881) */
  /* --info-foreground:                    ;  library: oklch(0.985 0 0) */
  /* --border:                             ;  library: oklch(0.922 0 0) */
  /* --input:                              ;  library: oklch(0.922 0 0) */
  /* --ring:                               ;  library: oklch(0.708 0 0) */
  /* --chart-1:                            ;  library: oklch(0.646 0.222 41.116) */
  /* --chart-2:                            ;  library: oklch(0.6 0.118 184.704) */
  /* --chart-3:                            ;  library: oklch(0.398 0.07 227.392) */
  /* --chart-4:                            ;  library: oklch(0.828 0.189 84.429) */
  /* --chart-5:                            ;  library: oklch(0.769 0.188 70.08) */
  /* --sidebar:                            ;  library: oklch(0.985 0 0) */
  /* --sidebar-foreground:                 ;  library: oklch(0.145 0 0) */
  /* --sidebar-primary:                    ;  library: oklch(0.205 0 0) */
  /* --sidebar-primary-foreground:         ;  library: oklch(0.985 0 0) */
  /* --sidebar-accent:                     ;  library: oklch(0.97 0 0) */
  /* --sidebar-accent-foreground:          ;  library: oklch(0.205 0 0) */
  /* --sidebar-border:                     ;  library: oklch(0.922 0 0) */
  /* --sidebar-ring:                       ;  library: oklch(0.708 0 0) */
  /* --overlay:                            ;  library: oklch(0 0 0 / 50%) */
  /* --overlay-blur:                       ;  library: 8px */
  /* --elevation-2xs:                      ;  library: 0 1px rgb(0 0 0 / 0.05) */
  /* --elevation-xs:                       ;  library: 0 1px 2px 0 rgb(0 0 0 / 0.05) */
  /* --elevation-sm:                       ;  library: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) */
  /* --elevation-md:                       ;  library: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) */
  /* --elevation-lg:                       ;  library: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) */
  /* --elevation-xl:                       ;  library: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) */
  /* --elevation-2xl:                      ;  library: 0 25px 50px -12px rgb(0 0 0 / 0.25) */
  /* --category-orange:                    ;  library: oklch(95.4% 0.038 75.164) */
  /* --category-orange-foreground:         ;  library: oklch(55.3% 0.195 38.402) */
  /* --category-pink:                      ;  library: oklch(94.8% 0.028 342.258) */
  /* --category-pink-foreground:           ;  library: oklch(52.5% 0.223 3.958) */
  /* --category-purple:                    ;  library: oklch(94.6% 0.033 307.174) */
  /* --category-purple-foreground:         ;  library: oklch(49.6% 0.265 301.924) */
  /* --category-teal:                      ;  library: oklch(95.3% 0.051 180.801) */
  /* --category-teal-foreground:           ;  library: oklch(51.1% 0.096 186.391) */
  /* --control-thumb:                      ;  library: #fff */


  /* Weights */
  /* --font-weight-thin:                   ;  library: 100 */
  /* --font-weight-extralight:             ;  library: 200 */
  /* --font-weight-light:                  ;  library: 300 */
  /* --font-weight-normal:                 ;  library: 400 */
  /* --font-weight-medium:                 ;  library: 500 */
  /* --font-weight-semibold:               ;  library: 600 */
  /* --font-weight-bold:                   ;  library: 700 */
  /* --font-weight-extrabold:              ;  library: 800 */
  /* --font-weight-black:                  ;  library: 900 */

  /* Families */
  /* --font-sans:                          ;  library: "Geist Variable", sans-serif */
  /* --font-mono:                          ;  library: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace */

  /* Type scale (and each step's line height) */
  /* --text-xs:                            ;  library: .75rem */
  /* --text-xs--line-height:               ;  library: calc(1 / .75) */
  /* --text-sm:                            ;  library: .875rem */
  /* --text-sm--line-height:               ;  library: calc(1.25 / .875) */
  /* --text-base:                          ;  library: 1rem */
  /* --text-base--line-height:             ;  library: calc(1.5 / 1) */
  /* --text-lg:                            ;  library: 1.125rem */
  /* --text-lg--line-height:               ;  library: calc(1.75 / 1.125) */
  /* --text-xl:                            ;  library: 1.25rem */
  /* --text-xl--line-height:               ;  library: calc(1.75 / 1.25) */
  /* --text-2xl:                           ;  library: 1.5rem */
  /* --text-2xl--line-height:              ;  library: calc(2 / 1.5) */
  /* --text-3xl:                           ;  library: 1.875rem */
  /* --text-3xl--line-height:              ;  library: calc(2.25 / 1.875) */
  /* --text-4xl:                           ;  library: 2.25rem */
  /* --text-4xl--line-height:              ;  library: calc(2.5 / 2.25) */
  /* --text-5xl:                           ;  library: 3rem */
  /* --text-5xl--line-height:              ;  library: 1 */
  /* --text-6xl:                           ;  library: 3.75rem */
  /* --text-6xl--line-height:              ;  library: 1 */
  /* --text-7xl:                           ;  library: 4.5rem */
  /* --text-7xl--line-height:              ;  library: 1 */
  /* --text-8xl:                           ;  library: 6rem */
  /* --text-8xl--line-height:              ;  library: 1 */
  /* --text-9xl:                           ;  library: 8rem */
  /* --text-9xl--line-height:              ;  library: 1 */
  /* --text-2xs:                           ;  library: .625rem */
  /* --text-caption:                       ;  library: .7rem */
  /* --text-compact:                       ;  library: .8rem */

  /* Line heights */
  /* --leading-tight:                      ;  library: 1.25 */
  /* --leading-snug:                       ;  library: 1.375 */
  /* --leading-normal:                     ;  library: 1.5 */
  /* --leading-relaxed:                    ;  library: 1.625 */

  /* Letter spacing */
  /* --tracking-tight:                     ;  library: -.025em */
  /* --tracking-wide:                      ;  library: .025em */
  /* --tracking-widest:                    ;  library: .1em */

  /* Density — every padding, gap and fixed height is a multiple */
  /* --spacing:                            ;  library: .25rem */

  /* Radius scale — derived from --radius; set one only to break the scale */
  /* --radius-md:                          ;  library: calc(var(--radius) * .8) */

  /* Widths */
  /* --container-xs:                       ;  library: 20rem */
  /* --container-sm:                       ;  library: 24rem */
  /* --container-md:                       ;  library: 28rem */
  /* --container-lg:                       ;  library: 32rem */
  /* --container-xl:                       ;  library: 36rem */
  /* --container-2xl:                      ;  library: 42rem */
  /* --container-3xl:                      ;  library: 48rem */
  /* --container-4xl:                      ;  library: 56rem */
  /* --container-6xl:                      ;  library: 72rem */
  /* --container-7xl:                      ;  library: 80rem */

  /* Breakpoints */
  /* --breakpoint-2xl:                     ;  library: 96rem */

  /* Easing */
  /* --ease-out:                           ;  library: cubic-bezier(0, 0, .2, 1) */
  /* --ease-in-out:                        ;  library: cubic-bezier(.4, 0, .2, 1) */

  /* Animations */
  /* --animate-spin:                       ;  library: spin 1s linear infinite */
  /* --animate-pulse:                      ;  library: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite */

  /* Defaults */
  /* --default-transition-duration:        ;  library: .15s */
  /* --default-transition-timing-function: ;  library: cubic-bezier(.4, 0, .2, 1) */

  /* Palette colours a component uses by name */
  /* --color-red-500:                      ;  library: oklch(63.7% .237 25.331) */
  /* --color-slate-500:                    ;  library: oklch(55.4% .046 257.417) */
  /* --color-black:                        ;  library: #000 */
  /* --color-white:                        ;  library: #fff */

  /* Other */
  /* --drop-shadow-sm:                     ;  library: 0 1px 2px #00000026 */
  /* --aspect-video:                       ;  library: 16 / 9 */
}

.dark {
  /* Every colour defined above needs a value here too: a token defined for one
     scheme only breaks in the other, and the failure is invisible while you
     build it (UIX-5). Elevation, type and radius usually hold in both. */
  /* --background:                         ;  library: oklch(0.145 0 0) */
  /* --foreground:                         ;  library: oklch(0.985 0 0) */
  /* --card:                               ;  library: oklch(0.205 0 0) */
  /* --card-foreground:                    ;  library: oklch(0.985 0 0) */
  /* --popover:                            ;  library: oklch(0.205 0 0) */
  /* --popover-foreground:                 ;  library: oklch(0.985 0 0) */
  /* --primary:                            ;  library: oklch(0.985 0 0) */
  /* --primary-foreground:                 ;  library: oklch(0.205 0 0) */
  /* --secondary:                          ;  library: oklch(0.269 0 0) */
  /* --secondary-foreground:               ;  library: oklch(0.985 0 0) */
  /* --muted:                              ;  library: oklch(0.269 0 0) */
  /* --muted-foreground:                   ;  library: oklch(0.708 0 0) */
  /* --accent:                             ;  library: oklch(0.269 0 0) */
  /* --accent-foreground:                  ;  library: oklch(0.985 0 0) */
  /* --destructive:                        ;  library: oklch(0.75 0.191 22.216) */
  /* --destructive-foreground:             ;  library: oklch(0.145 0 0) */
  /* --success:                            ;  library: oklch(0.723 0.219 149.579) */
  /* --success-foreground:                 ;  library: oklch(0.145 0 0) */
  /* --warning:                            ;  library: oklch(0.828 0.189 84.429) */
  /* --warning-foreground:                 ;  library: oklch(0.145 0 0) */
  /* --info:                               ;  library: oklch(0.707 0.165 254.624) */
  /* --info-foreground:                    ;  library: oklch(0.145 0 0) */
  /* --border:                             ;  library: oklch(0.269 0 0) */
  /* --input:                              ;  library: oklch(0.269 0 0) */
  /* --ring:                               ;  library: oklch(0.556 0 0) */
  /* --chart-1:                            ;  library: oklch(0.488 0.243 264.376) */
  /* --chart-2:                            ;  library: oklch(0.696 0.17 162.48) */
  /* --chart-3:                            ;  library: oklch(0.769 0.188 70.08) */
  /* --chart-4:                            ;  library: oklch(0.627 0.265 303.9) */
  /* --chart-5:                            ;  library: oklch(0.645 0.246 16.439) */
  /* --sidebar:                            ;  library: oklch(0.205 0 0) */
  /* --sidebar-foreground:                 ;  library: oklch(0.985 0 0) */
  /* --sidebar-primary:                    ;  library: oklch(0.488 0.243 264.376) */
  /* --sidebar-primary-foreground:         ;  library: oklch(0.985 0 0) */
  /* --sidebar-accent:                     ;  library: oklch(0.269 0 0) */
  /* --sidebar-accent-foreground:          ;  library: oklch(0.985 0 0) */
  /* --sidebar-border:                     ;  library: oklch(1 0 0 / 10%) */
  /* --sidebar-ring:                       ;  library: oklch(0.556 0 0) */
  /* --overlay:                            ;  library: oklch(0 0 0 / 70%) */
  /* --category-orange:                    ;  library: color-mix(in oklab, oklch(70.5% 0.213 47.604) 15%, transparent) */
  /* --category-orange-foreground:         ;  library: oklch(83.7% 0.128 66.29) */
  /* --category-pink:                      ;  library: color-mix(in oklab, oklch(65.6% 0.241 354.308) 15%, transparent) */
  /* --category-pink-foreground:           ;  library: oklch(82.3% 0.12 346.018) */
  /* --category-purple:                    ;  library: color-mix(in oklab, oklch(62.7% 0.265 303.9) 15%, transparent) */
  /* --category-purple-foreground:         ;  library: oklch(82.7% 0.119 306.383) */
  /* --category-teal:                      ;  library: color-mix(in oklab, oklch(70.4% 0.14 182.503) 15%, transparent) */
  /* --category-teal-foreground:           ;  library: oklch(85.5% 0.138 181.071) */
}

/* ------------------------------------------------------------------------ */
/* 2 — a slot, when the design differs in shape and not only in colour.       */
/* 3 — a slot in a variant, a size or a state the design treats differently: */
/*     .button[data-variant="destructive"], .button[data-size="sm"],          */
/*     .checkbox-box[data-checked], .tabs-trigger[data-active],               */
/*     .dropdown-menu-item[data-highlighted].                                 */
/*                                                                            */
/* Every class react-web paints, by component. A selector that reaches        */
/* through the markup instead binds {{PROJECT}} to an arrangement the library */
/* may change in a patch release (UIX-18).                                    */
/* ------------------------------------------------------------------------ */

/* accordion */
/* .accordion-content-inner {} */
/* .accordion-header {} */
/* .accordion-item {} */
/* .accordion-panel {} */
/* .accordion-root {} */
/* .accordion-trigger {} */
/* .accordion-trigger-body {} */
/* .accordion-trigger-description {} */
/* .accordion-trigger-icon {} */
/* .accordion-trigger-icon-down {} */
/* .accordion-trigger-icon-up {} */
/* .accordion-trigger-radio {} */
/* .accordion-trigger-radio-dot {} */
/* .accordion-trigger-right-section {} */
/* .accordion-trigger-title {} */

/* alert */
/* .alert-action {} */
/* .alert-close {} */
/* .alert-close-icon {} */
/* .alert-description {} */
/* .alert-icon {} */
/* .alert-root {} */
/* .alert-title {} */

/* anchor-nav */
/* .anchor-nav {} */
/* .anchor-nav-item {} */
/* .anchor-nav-link {} */
/* .anchor-nav-list {} */

/* avatar */
/* .avatar-fallback {} */
/* .avatar-group {} */
/* .avatar-group-count {} */
/* .avatar-image {} */
/* .avatar-root {} */

/* badge */
/* .badge-content {} */
/* .badge-root {} */
/* .badge-spinner {} */
/* .badge-spinner-wrap {} */

/* board */
/* .board {} */
/* .board-add {} */
/* .board-card {} */
/* .board-column {} */
/* .board-column-count {} */
/* .board-column-header {} */
/* .board-column-heading {} */
/* .board-column-list {} */
/* .board-column-summary {} */
/* .board-column-title {} */
/* .board-drop-indicator {} */
/* .board-fade {} */
/* .board-instructions {} */
/* .board-live {} */
/* .board-viewport {} */

/* boolean-text */
/* .boolean-text-check {} */
/* .boolean-text-label {} */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* box */
/* .box-root {} */

/* breadcrumb */
/* .breadcrumb-ellipsis {} */
/* .breadcrumb-item {} */
/* .breadcrumb-link {} */
/* .breadcrumb-list {} */
/* .breadcrumb-page {} */
/* .breadcrumb-root {} */
/* .breadcrumb-separator {} */

/* bulk-actions */
/* .bulk-actions {} */
/* .bulk-actions-count {} */
/* .bulk-actions-divider {} */
/* .bulk-actions-group {} */

/* button */
/* .button {} */
/* .button-spinner {} */

/* calendar */
/* .calendar-day-button {} */
/* .calendar-root {} */

/* card */
/* .card-content {} */
/* .card-description {} */
/* .card-footer {} */
/* .card-header {} */
/* .card-link {} */
/* .card-link-cover {} */
/* .card-link-label {} */
/* .card-root {} */
/* .card-separator {} */
/* .card-title {} */

/* carousel */
/* .carousel {} */
/* .carousel-content {} */
/* .carousel-control {} */
/* .carousel-dot {} */
/* .carousel-dot-indicator {} */
/* .carousel-dots {} */
/* .carousel-item {} */
/* .carousel-next {} */
/* .carousel-previous {} */
/* .carousel-track {} */

/* checkbox */
/* .checkbox-box {} */
/* .checkbox-content {} */
/* .checkbox-description {} */
/* .checkbox-error {} */
/* .checkbox-field {} */
/* .checkbox-group {} */
/* .checkbox-group-error {} */
/* .checkbox-indicator {} */
/* .checkbox-label {} */
/* .checkbox-root {} */

/* checklist */
/* .checklist {} */
/* .checklist-action {} */
/* .checklist-count {} */
/* .checklist-header {} */
/* .checklist-heading {} */
/* .checklist-item {} */
/* .checklist-item-body {} */
/* .checklist-item-description {} */
/* .checklist-item-label {} */
/* .checklist-item-marker {} */
/* .checklist-item-status {} */
/* .checklist-list {} */
/* .checklist-title {} */
/* .checklist-toggle {} */

/* code-block */
/* .code-block-actions {} */
/* .code-block-code {} */
/* .code-block-header {} */
/* .code-block-line {} */
/* .code-block-line-content {} */
/* .code-block-line-number {} */
/* .code-block-root {} */
/* .code-block-title {} */
/* .code-block-token {} */
/* .code-block-viewport {} */

/* collapsible */
/* .collapsible {} */
/* .collapsible-own-trigger {} */
/* .collapsible-panel {} */
/* .collapsible-trigger {} */
/* .collapsible-trigger-body {} */
/* .collapsible-trigger-description {} */
/* .collapsible-trigger-indicator {} */
/* .collapsible-trigger-left-section {} */
/* .collapsible-trigger-right-section {} */
/* .collapsible-trigger-title {} */

/* color-picker */
/* .color-picker-check-icon {} */
/* .color-picker-chevron {} */
/* .color-picker-grid {} */
/* .color-picker-hex-input {} */
/* .color-picker-popup {} */
/* .color-picker-positioner {} */
/* .color-picker-preview-swatch {} */
/* .color-picker-swatch {} */
/* .color-picker-trigger {} */
/* .color-picker-value-text {} */

/* color-scheme-switcher */
/* .color-scheme-switcher-icon {} */
/* .color-scheme-switcher-option {} */
/* .color-scheme-switcher-root {} */

/* confirm */
/* .confirm-backdrop {} */
/* .confirm-challenge {} */
/* .confirm-content {} */
/* .confirm-description {} */
/* .confirm-error {} */
/* .confirm-footer {} */
/* .confirm-header {} */
/* .confirm-hint {} */
/* .confirm-popup {} */
/* .confirm-title {} */

/* container */
/* .container-root {} */

/* copy-button */
/* .copy-button {} */
/* .copy-button-status {} */
/* .copy-button-trigger {} */

/* currency-input */
/* .currency-input-actions {} */
/* .currency-input-clear-icon {} */
/* .currency-input-clear-trigger {} */
/* .currency-input-content {} */
/* .currency-input-field {} */
/* .currency-input-field-wrapper {} */
/* .currency-input-fields {} */
/* .currency-input-open-trigger {} */
/* .currency-input-range-root {} */
/* .currency-input-root {} */
/* .currency-input-symbol {} */
/* .currency-input-trigger {} */
/* .currency-input-trigger-icon {} */
/* .input-field {} */
/* .input-root {} */
/* .input-section {} */

/* data-transfer */
/* .data-transfer-body {} */
/* .data-transfer-link {} */
/* .data-transfer-notice {} */
/* .data-transfer-notice-text {} */
/* .data-transfer-result {} */
/* .data-transfer-sending {} */

/* data-transfer-export */
/* .data-transfer-body {} */
/* .data-transfer-export {} */
/* .data-transfer-export-column-hint {} */
/* .data-transfer-export-columns {} */
/* .data-transfer-export-columns-count {} */
/* .data-transfer-export-download {} */
/* .data-transfer-export-download-file {} */
/* .data-transfer-export-download-icon {} */
/* .data-transfer-export-download-status {} */
/* .data-transfer-export-error {} */
/* .data-transfer-export-heading {} */
/* .data-transfer-export-section {} */
/* .data-transfer-link {} */
/* .data-transfer-notice {} */
/* .data-transfer-notice-text {} */
/* .data-transfer-result {} */
/* .data-transfer-sending {} */

/* data-transfer-import */
/* .data-transfer-body {} */
/* .data-transfer-import {} */
/* .data-transfer-import-column {} */
/* .data-transfer-import-error {} */
/* .data-transfer-import-file {} */
/* .data-transfer-import-file-rows {} */
/* .data-transfer-import-issue {} */
/* .data-transfer-import-issue-message {} */
/* .data-transfer-import-issue-row {} */
/* .data-transfer-import-issues {} */
/* .data-transfer-import-label {} */
/* .data-transfer-import-mapping {} */
/* .data-transfer-import-record-errors {} */
/* .data-transfer-import-record-status {} */
/* .data-transfer-import-record-value {} */
/* .data-transfer-import-records {} */
/* .data-transfer-import-row {} */
/* .data-transfer-import-sample {} */
/* .data-transfer-import-source {} */
/* .data-transfer-import-summary {} */
/* .data-transfer-link {} */
/* .data-transfer-notice {} */
/* .data-transfer-notice-text {} */
/* .data-transfer-result {} */
/* .data-transfer-sending {} */

/* date-input */
/* .date-input-calendar {} */
/* .date-input-clear-icon {} */
/* .date-input-clear-trigger {} */
/* .date-input-icon {} */
/* .date-input-open-trigger {} */
/* .date-input-root {} */

/* date-range-input */
/* .date-range-input-actions {} */
/* .date-range-input-calendar {} */
/* .date-range-input-calendar-panel {} */
/* .date-range-input-clear-icon {} */
/* .date-range-input-clear-trigger {} */
/* .date-range-input-icon {} */
/* .date-range-input-open-trigger {} */
/* .date-range-input-popover {} */
/* .date-range-input-preset-list {} */
/* .date-range-input-root {} */

/* date-text */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* date-time-input */
/* .date-time-input-calendar {} */
/* .date-time-input-clear-icon {} */
/* .date-time-input-clear-trigger {} */
/* .date-time-input-confirm-icon {} */
/* .date-time-input-icon {} */
/* .date-time-input-open-trigger {} */
/* .date-time-input-popover-content {} */
/* .date-time-input-root {} */
/* .date-time-input-time-row {} */

/* description-list */
/* .description-list {} */
/* .description-list-content {} */
/* .description-list-empty {} */
/* .description-list-item {} */
/* .description-list-label {} */
/* .description-list-value {} */

/* document-input */
/* .document-input-field {} */
/* .document-input-root {} */
/* .document-input-trigger {} */
/* .document-input-trigger-icon {} */

/* document-text */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* dropdown-menu */
/* .dropdown-menu-checkbox-item {} */
/* .dropdown-menu-indicator {} */
/* .dropdown-menu-item {} */
/* .dropdown-menu-label {} */
/* .dropdown-menu-popup {} */
/* .dropdown-menu-positioner {} */
/* .dropdown-menu-radio-item {} */
/* .dropdown-menu-separator {} */
/* .dropdown-menu-shortcut {} */

/* duration-text */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* editable-text */
/* .editable-text {} */
/* .editable-text-box {} */
/* .editable-text-copy {} */
/* .editable-text-editor {} */
/* .editable-text-error {} */
/* .editable-text-overlay {} */
/* .editable-text-row {} */
/* .editable-text-section {} */
/* .editable-text-trigger {} */
/* .input-field {} */
/* .input-root {} */
/* .input-section {} */

/* empty-state */
/* .empty-state {} */
/* .empty-state-action {} */
/* .empty-state-description {} */
/* .empty-state-icon {} */
/* .empty-state-title {} */

/* file-picker */
/* .file-picker-accepted {} */
/* .file-picker-hint {} */
/* .file-picker-icon {} */
/* .file-picker-root {} */

/* file-size-text */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* filter-bar */
/* .filter-bar-clear {} */
/* .filter-bar-root {} */
/* .filter-bar-trailing {} */

/* filter-chip */
/* .filter-chip-body {} */
/* .filter-chip-icon {} */
/* .filter-chip-label {} */
/* .filter-chip-remove {} */
/* .filter-chip-root {} */
/* .filter-chip-value {} */

/* flex */
/* .flex-root {} */

/* form */
/* .form {} */
/* .form-field {} */
/* .form-field-description {} */
/* .form-field-error {} */
/* .form-field-group {} */
/* .form-field-legend {} */
/* .form-field-legend-tooltip-icon {} */
/* .form-field-separator {} */
/* .form-field-separator-content {} */
/* .form-field-separator-line {} */
/* .form-field-set {} */
/* .form-floating-control {} */
/* .form-floating-label {} */

/* formatter-text */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* grid */
/* .grid-item {} */
/* .grid-root {} */

/* identity */
/* .identity {} */
/* .identity-action {} */
/* .identity-content {} */
/* .identity-description {} */
/* .identity-heading {} */
/* .identity-media {} */
/* .identity-title {} */

/* image */
/* .image-fallback {} */
/* .image-img {} */
/* .image-root {} */

/* indicator */
/* .indicator-badge {} */
/* .indicator-label {} */
/* .indicator-root {} */

/* input */
/* .input-field {} */
/* .input-root {} */
/* .input-section {} */

/* label */
/* .label-hint {} */
/* .label-indicator {} */
/* .label-root {} */
/* .label-tooltip-icon {} */

/* layout */
/* .layout-banner {} */
/* .layout-content {} */
/* .layout-content-inner {} */
/* .layout-footer {} */
/* .layout-header {} */
/* .layout-header-center {} */
/* .layout-header-end {} */
/* .layout-header-inner {} */
/* .layout-header-middle {} */
/* .layout-header-row {} */
/* .layout-header-section {} */
/* .layout-header-start {} */
/* .layout-main {} */
/* .layout-root {} */
/* .layout-sidebar-backdrop {} */
/* .layout-sidebar-banner {} */
/* .layout-sidebar-brand {} */
/* .layout-sidebar-brand-action {} */
/* .layout-sidebar-brand-logo {} */
/* .layout-sidebar-brand-subtitle {} */
/* .layout-sidebar-brand-text {} */
/* .layout-sidebar-brand-title {} */
/* .layout-sidebar-container {} */
/* .layout-sidebar-content {} */
/* .layout-sidebar-content-fade {} */
/* .layout-sidebar-content-frame {} */
/* .layout-sidebar-footer {} */
/* .layout-sidebar-frame {} */
/* .layout-sidebar-gap {} */
/* .layout-sidebar-group {} */
/* .layout-sidebar-group-action {} */
/* .layout-sidebar-group-content {} */
/* .layout-sidebar-group-label {} */
/* .layout-sidebar-header {} */
/* .layout-sidebar-inner {} */
/* .layout-sidebar-menu {} */
/* .layout-sidebar-menu-action {} */
/* .layout-sidebar-menu-badge {} */
/* .layout-sidebar-menu-button {} */
/* .layout-sidebar-menu-button-body {} */
/* .layout-sidebar-menu-button-description {} */
/* .layout-sidebar-menu-button-left-section {} */
/* .layout-sidebar-menu-button-right-section {} */
/* .layout-sidebar-menu-button-title {} */
/* .layout-sidebar-menu-collapsible-chevron {} */
/* .layout-sidebar-menu-collapsible-panel {} */
/* .layout-sidebar-menu-dropdown-item {} */
/* .layout-sidebar-menu-dropdown-label {} */
/* .layout-sidebar-menu-dropdown-popup {} */
/* .layout-sidebar-menu-dropdown-positioner {} */
/* .layout-sidebar-menu-item {} */
/* .layout-sidebar-menu-skeleton {} */
/* .layout-sidebar-menu-skeleton-icon {} */
/* .layout-sidebar-menu-skeleton-text {} */
/* .layout-sidebar-menu-sub {} */
/* .layout-sidebar-menu-sub-button {} */
/* .layout-sidebar-menu-sub-item {} */
/* .layout-sidebar-mobile-inner {} */
/* .layout-sidebar-mobile-popup {} */
/* .layout-sidebar-root {} */
/* .layout-sidebar-separator {} */
/* .layout-sidebar-static {} */
/* .layout-sidebar-tooltip {} */
/* .layout-sidebar-tooltip-positioner {} */
/* .layout-sidebar-trigger-label {} */
/* .layout-sidebar-wrapper {} */
/* .layout-skip-link {} */
/* .layout-skip-links {} */

/* list */
/* .list-content {} */
/* .list-end-reached {} */
/* .list-footer {} */
/* .list-infinite-control {} */
/* .list-load-more-icon {} */
/* .list-loading-more {} */
/* .list-root {} */
/* .list-row {} */
/* .list-sentinel {} */
/* .list-state {} */

/* loaded */
/* .loaded {} */
/* .loaded-loading {} */
/* .loaded-loading-row {} */
/* .loaded-state {} */

/* loader */
/* .loader {} */
/* .loader-icon {} */
/* .loader-label {} */

/* loading-bar */
/* .loading-bar-indicator {} */
/* .loading-bar-root {} */
/* .loading-bar-track {} */

/* loading-overlay */
/* .loading-overlay-root {} */

/* mask-input */
/* .input-field {} */
/* .input-root {} */
/* .input-section {} */

/* modal */
/* .modal-backdrop {} */
/* .modal-body {} */
/* .modal-close-label {} */
/* .modal-description {} */
/* .modal-footer {} */
/* .modal-header {} */
/* .modal-header-content {} */
/* .modal-popup {} */
/* .modal-title {} */

/* money-text */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* notification-card */
/* .notification-card-actions {} */
/* .notification-card-body {} */
/* .notification-card-description {} */
/* .notification-card-main {} */
/* .notification-card-media {} */
/* .notification-card-root {} */
/* .notification-card-time {} */
/* .notification-card-title {} */
/* .notification-card-unread {} */
/* .notification-card-unread-label {} */

/* notification-center */
/* .notification-center-bell {} */
/* .notification-center-footer {} */
/* .notification-center-header {} */
/* .notification-center-panel {} */
/* .notification-center-root {} */
/* .notification-center-sheet-body {} */
/* .notification-center-sheet-header {} */
/* .notification-center-title {} */

/* notification-filter */
/* .notification-filter-root {} */
/* .notification-filter-search {} */

/* notification-list */
/* .notification-list-body {} */
/* .notification-list-heading {} */
/* .notification-list-loading {} */
/* .notification-list-loading-row {} */
/* .notification-list-main {} */

/* number-input */
/* .number-input-btn {} */
/* .number-input-control {} */
/* .number-input-field {} */
/* .number-input-group {} */
/* .number-input-root {} */

/* number-text */
/* .formatter-text {} */
/* .formatter-text-value {} */

/* otp-input */
/* .otp-input-caret {} */
/* .otp-input-caret-wrapper {} */
/* .otp-input-group {} */
/* .otp-input-root {} */
/* .otp-input-separator {} */
/* .otp-input-slot {} */

/* page */
/* .page-content {} */
/* .page-header {} */
/* .page-header-action {} */
/* .page-header-description {} */
/* .page-header-icon {} */
/* .page-header-identity {} */
/* .page-header-main {} */
/* .page-header-text {} */
/* .page-header-title {} */
/* .page-root {} */
/* .page-toolbar {} */

/* pagination */
/* .pagination-controls {} */
/* .pagination-ellipsis {} */
/* .pagination-ellipsis-icon {} */
/* .pagination-info {} */
/* .pagination-next-icon {} */
/* .pagination-page-btn {} */
/* .pagination-page-btn-active {} */
/* .pagination-pages {} */
/* .pagination-prev-icon {} */
/* .pagination-root {} */
/* .pagination-rows-per-page {} */

/* password-input */
/* .password-input-root {} */
/* .password-input-sections {} */
/* .password-input-strength-bar {} */
/* .password-input-strength-bars {} */
/* .password-input-strength-footer {} */
/* .password-input-strength-label {} */
/* .password-input-toggle {} */

/* phone-input */
/* .phone-input-chevron {} */
/* .phone-input-country-list {} */
/* .phone-input-field {} */
/* .phone-input-flag {} */
/* .phone-input-option {} */
/* .phone-input-option-code {} */
/* .phone-input-option-label {} */
/* .phone-input-popover {} */
/* .phone-input-root {} */
/* .phone-input-trigger {} */

/* phone-text */
/* .formatter-text {} */
/* .formatter-text-value {} */
/* .phone-text-call-link {} */

/* popconfirm */
/* .popconfirm {} */
/* .popconfirm-challenge {} */
/* .popconfirm-content {} */
/* .popconfirm-description {} */
/* .popconfirm-error {} */
/* .popconfirm-footer {} */
/* .popconfirm-title {} */
/* .popover-popup {} */
/* .popover-positioner {} */
/* .popover-trigger {} */

/* popover */
/* .popover-popup {} */
/* .popover-positioner {} */
/* .popover-trigger {} */

/* progress */
/* .progress-indicator {} */
/* .progress-label {} */
/* .progress-root {} */
/* .progress-track {} */

/* qr-code */
/* .qr-code-background {} */
/* .qr-code-logo {} */
/* .qr-code-modules {} */
/* .qr-code-root {} */
/* .qr-code-svg {} */

/* radio */
/* .radio-card {} */
/* .radio-card-badge {} */
/* .radio-card-body {} */
/* .radio-card-control {} */
/* .radio-card-description {} */
/* .radio-card-heading {} */
/* .radio-card-label {} */
/* .radio-card-right {} */
/* .radio-card-slot {} */
/* .radio-content {} */
/* .radio-control {} */
/* .radio-description {} */
/* .radio-dot {} */
/* .radio-group {} */
/* .radio-indicator {} */
/* .radio-label {} */
/* .radio-root {} */

/* rating */
/* .rating-input {} */
/* .rating-option {} */
/* .rating-root {} */
/* .rating-star {} */

/* resizable */
/* .resizable {} */
/* .resizable-grip {} */
/* .resizable-handle {} */
/* .resizable-panel {} */

/* scroll-area */
/* .scroll-area {} */
/* .scroll-area-content {} */
/* .scroll-area-scrollbar {} */
/* .scroll-area-thumb {} */
/* .scroll-area-viewport {} */

/* search */
/* .search-expand-filter {} */
/* .search-expand-row {} */
/* .search-field {} */
/* .search-field-box {} */
/* .search-filter {} */
/* .search-filter-dot {} */
/* .search-filter-label {} */
/* .search-filters {} */
/* .search-filters-count {} */
/* .search-grid {} */
/* .search-grid-cell {} */
/* .search-grid-cells {} */
/* .search-grid-field {} */
/* .search-grid-footer {} */
/* .search-inline-filter {} */
/* .search-more {} */
/* .search-panel {} */
/* .search-reset {} */
/* .search-root {} */
/* .search-row {} */

/* segmented-control */
/* .segmented-control {} */
/* .segmented-control-segment {} */
/* .segmented-control-slot {} */

/* select */
/* .select-checkbox {} */
/* .select-clear-space {} */
/* .select-clear-trigger {} */
/* .select-create {} */
/* .select-create-icon {} */
/* .select-create-label {} */
/* .select-empty {} */
/* .select-group-label {} */
/* .select-item {} */
/* .select-item-check {} */
/* .select-item-check-icon {} */
/* .select-item-label {} */
/* .select-left-section {} */
/* .select-list {} */
/* .select-load-more-error {} */
/* .select-loading-more {} */
/* .select-multiple-item {} */
/* .select-placeholder {} */
/* .select-popup {} */
/* .select-positioner {} */
/* .select-right-section {} */
/* .select-root {} */
/* .select-scroll-down-arrow {} */
/* .select-scroll-down-icon {} */
/* .select-scroll-up-arrow {} */
/* .select-scroll-up-icon {} */
/* .select-search {} */
/* .select-search-icon {} */
/* .select-search-input {} */
/* .select-sentinel {} */
/* .select-trigger {} */
/* .select-trigger-icon {} */
/* .select-trigger-value {} */
/* .select-value-overflow {} */
/* .select-value-remove {} */

/* separator */
/* .separator {} */

/* sheet */
/* .sheet-backdrop {} */
/* .sheet-body {} */
/* .sheet-close {} */
/* .sheet-close-label {} */
/* .sheet-description {} */
/* .sheet-footer {} */
/* .sheet-header {} */
/* .sheet-header-content {} */
/* .sheet-popup {} */
/* .sheet-title {} */

/* skeleton */
/* .skeleton {} */

/* slider */
/* .slider-control {} */
/* .slider-indicator {} */
/* .slider-root {} */
/* .slider-thumb {} */
/* .slider-track {} */
/* .slider-value {} */
/* .slider-value-row {} */

/* spotlight-search */
/* .spotlight-search {} */
/* .spotlight-search-anchor {} */
/* .spotlight-search-backdrop {} */
/* .spotlight-search-dropdown {} */
/* .spotlight-search-empty {} */
/* .spotlight-search-field {} */
/* .spotlight-search-field-icon {} */
/* .spotlight-search-footer {} */
/* .spotlight-search-group {} */
/* .spotlight-search-group-action {} */
/* .spotlight-search-group-heading {} */
/* .spotlight-search-group-label {} */
/* .spotlight-search-input {} */
/* .spotlight-search-item {} */
/* .spotlight-search-item-body {} */
/* .spotlight-search-item-description {} */
/* .spotlight-search-item-icon {} */
/* .spotlight-search-item-label {} */
/* .spotlight-search-item-shortcut {} */
/* .spotlight-search-key {} */
/* .spotlight-search-list {} */
/* .spotlight-search-popup {} */
/* .spotlight-search-positioner {} */

/* stat */
/* .stat {} */
/* .stat-figure {} */
/* .stat-hint {} */
/* .stat-label {} */
/* .stat-trend {} */

/* stepper */
/* .stepper-actions {} */
/* .stepper-completed {} */
/* .stepper-connector {} */
/* .stepper-content {} */
/* .stepper-description {} */
/* .stepper-indicator {} */
/* .stepper-label {} */
/* .stepper-list {} */
/* .stepper-live-region {} */
/* .stepper-panels {} */
/* .stepper-progress-icon {} */
/* .stepper-root {} */
/* .stepper-shape {} */
/* .stepper-step {} */
/* .stepper-trigger {} */
/* .stepper-trigger-body {} */

/* switch */
/* .switch-content {} */
/* .switch-description {} */
/* .switch-label {} */
/* .switch-root {} */
/* .switch-thumb {} */
/* .switch-wrapper {} */

/* table */
/* .table-body {} */
/* .table-cell {} */
/* .table-cell-content {} */
/* .table-container {} */
/* .table-empty-cell {} */
/* .table-head {} */
/* .table-header {} */
/* .table-header-row {} */
/* .table-root {} */
/* .table-row {} */
/* .table-sort-button {} */
/* .table-sort-icon {} */
/* .table-table {} */

/* tabs */
/* .tabs-content {} */
/* .tabs-list {} */
/* .tabs-root {} */
/* .tabs-trigger {} */

/* tag */
/* .tag-icon {} */
/* .tag-label {} */
/* .tag-remove {} */
/* .tag-root {} */

/* tags-input */
/* .tags-input-field {} */
/* .tags-input-root {} */
/* .tags-input-section {} */
/* .tags-input-tag {} */

/* textarea */
/* .textarea-counter {} */
/* .textarea-field {} */
/* .textarea-root {} */
/* .textarea-section {} */

/* time-input */
/* .input-field {} */
/* .input-root {} */
/* .input-section {} */

/* timeline */
/* .timeline {} */
/* .timeline-body {} */
/* .timeline-connector {} */
/* .timeline-content {} */
/* .timeline-group {} */
/* .timeline-group-items {} */
/* .timeline-group-label {} */
/* .timeline-item {} */
/* .timeline-marker {} */
/* .timeline-meta {} */
/* .timeline-title {} */

/* toast */
/* .toast {} */
/* .toast-action-button {} */
/* .toast-cancel-button {} */
/* .toast-close-button {} */
/* .toast-content {} */
/* .toast-description {} */
/* .toast-icon {} */
/* .toast-icon-error {} */
/* .toast-icon-info {} */
/* .toast-icon-loading {} */
/* .toast-icon-success {} */
/* .toast-icon-warning {} */
/* .toast-item {} */
/* .toast-title {} */

/* toggle */
/* .toggle {} */
/* .toggle-group {} */

/* tooltip */
/* .tooltip-arrow {} */
/* .tooltip-popup {} */
/* .tooltip-positioner {} */
/* .tooltip-trigger {} */

/* tree */
/* .tree {} */
/* .tree-branch {} */
/* .tree-chevron {} */
/* .tree-group {} */
/* .tree-label {} */
/* .tree-row {} */

/* truncated-text */
/* .truncated-text-root {} */
/* .truncated-text-text {} */

/* typography */
/* .typography {} */

/* uploader */
/* .uploader-file-body {} */
/* .uploader-file-header {} */
/* .uploader-file-item {} */
/* .uploader-file-list {} */
/* .uploader-file-name {} */
/* .uploader-file-percent {} */
/* .uploader-file-status {} */
/* .uploader-icon-done {} */
/* .uploader-icon-error {} */
/* .uploader-icon-pending {} */
/* .uploader-icon-uploading {} */
/* .uploader-progress {} */
/* .uploader-progress-indicator {} */
/* .uploader-remove-button {} */
/* .uploader-remove-icon {} */
/* .uploader-root {} */

/*
 * Never:
 *   .card-root > div span { }            reaches through the markup
 *   .button { color: red !important }    wins the argument, hides which rule was wrong
 *   a component re-implemented in the app because a slot was missing —
 *   that is a gap to close in the library (UIX-18)
 */
`;function d(){return n.jsxs("div",{className:"space-y-10",children:[n.jsxs("div",{children:[n.jsx("h1",{className:"font-bold font-display text-3xl tracking-tight",children:"The theme"}),n.jsx("p",{className:"mt-3 text-lg text-muted-foreground",children:"The component library ships project-agnostic. One file per design system turns it into this product, by overriding the class each slot publishes — never by reaching through the markup around it."})]}),n.jsxs("div",{className:"rounded-lg border border-border bg-card",children:[n.jsxs("div",{className:"flex items-center justify-between border-border border-b px-4 py-2",children:[n.jsx("span",{className:"font-mono text-muted-foreground text-xs",children:"acme-uiux/theme/example.html"}),n.jsxs("a",{className:"flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground",href:"/examples/theme/index.html",rel:"noreferrer",target:"_blank",children:["Open in a new tab ",n.jsx(t,{size:12})]})]}),n.jsx("iframe",{className:"h-[30rem] w-full rounded-b-lg bg-background",src:"/examples/theme/index.html",title:"The same components with and without acme's theme"})]}),n.jsxs("p",{className:"text-muted-foreground",children:["Same markup on both sides, same classes, same ",n.jsx("code",{children:"data-slot"}),"s. One stylesheet of difference — and that stylesheet is the only place a project-specific visual value is allowed to exist."]}),n.jsxs("div",{className:"space-y-4",children:[n.jsx("h2",{className:"font-display font-semibold text-xl",children:"The stylesheet behind it"}),n.jsx("p",{className:"text-muted-foreground",children:"Three layers, in the order they are reached for: tokens, then the slot when the design differs in shape, then a variant the design treats differently. Resolving at the first layer and stopping is the whole discipline — descending when a token would have done it is what turns a theme into a second implementation of the library."}),n.jsx(e,{language:"css",tabs:[{code:r,label:"example.css"},{code:a,label:"template.css"}]})]}),n.jsxs("div",{className:"space-y-4",children:[n.jsx("h2",{className:"font-display font-semibold text-xl",children:"What is checked"}),n.jsxs("p",{className:"text-muted-foreground",children:[n.jsx("code",{children:"gate:theme-override-shape"})," reads every theme file and fails on ",n.jsx("code",{children:"!important"})," and on any selector that reaches through a component's markup — including these two, because an example that breaks the rule it illustrates is worse than no example."," ",n.jsx("code",{children:"gate:theme-per-system"})," keeps the index and the files in agreement, and ",n.jsx("code",{children:"gate:theme-in-sync"})," compares an application's copy against the one this skill holds."]})]})]})}export{d as component};
