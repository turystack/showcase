#!/usr/bin/env node

/**
 * A props table is a claim about react-web's API. This makes the compiler check it.
 *
 * These pages are written by reading `<name>.types.ts` and retyping what is
 * there, which is exactly the kind of copy that is correct the day it is
 * written and wrong after the next release. The failure is silent in both
 * directions: a prop that no longer exists still renders as a row, and a prop
 * that was added never appears at all, so the page documents a component the
 * library stopped shipping.
 *
 * Rather than parse TypeScript here — a second, worse type checker — this emits
 * a file of type-level assertions and hands it to `tsc`. `Exclude` against
 * `keyof XxxProps` names the drifted prop in the error message, so the report
 * is the compiler's own words:
 *
 *   Type '"pageSize"' does not satisfy the constraint 'never'
 *
 * Pages whose props type is generic, or which document a compound component's
 * parts rather than one prop bag, are listed in SKIP with the reason. A skip is
 * a debt, not an exemption — it is printed on every run.
 */

import { spawnSync } from 'node:child_process'
import {
	existsSync,
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PAGES = resolve(ROOT, 'src/routes/libs/react-web/components')

/**
 * slug -> a type EXPRESSION whose keys the page's table must match.
 *
 * An expression rather than a bare name because most components are declared
 * `PropsWithChildren<XProps>`, so `children` is a real prop a page is right to
 * document even though it is absent from the props type itself.
 */
const CONTRACT = {
	accordion: 'PropsWithChildren<AccordionProps>',
	alert: 'PropsWithChildren<AlertProps>',
	'anchor-nav': 'AnchorNavProps',
	avatar: 'PropsWithChildren<AvatarProps>',
	badge: 'PropsWithChildren<BadgeProps>',
	board: 'BoardProps<{ id: string; stage: string }>',
	'boolean-text': 'BooleanTextProps',
	box: 'PropsWithChildren<BoxProps>',
	breadcrumb: 'PropsWithChildren<BreadcrumbProps>',
	'bulk-actions': 'BulkActionsProps<string>',
	button: 'PropsWithChildren<ButtonProps>',
	calendar: 'CalendarProps',
	card: 'PropsWithChildren<CardProps>',
	carousel: 'PropsWithChildren<CarouselProps>',
	checkbox: 'CheckboxProps',
	checklist: 'ChecklistProps',
	'code-block': 'CodeBlockProps',
	collapsible: 'PropsWithChildren<CollapsibleProps>',
	'color-picker': 'ColorPickerProps',
	'color-scheme-switcher': 'ColorSchemeSwitcherProps',
	confirm: 'ConfirmProps',
	container: 'PropsWithChildren<ContainerProps>',
	'copy-button': 'CopyButtonProps',
	'currency-input': 'CurrencyInputProps',
	'data-transfer-export':
		'DataTransferExportProps<{ code: string; id: string }>',
	'data-transfer-import':
		'DataTransferImportProps<{ code: string; id: string }>',
	'date-input': 'DateInputProps',
	'date-range-input': 'DateRangeInputProps',
	'date-text': 'DateTextProps',
	'date-time-input': 'DateTimeInputProps',
	'description-list': 'DescriptionListProps',
	'document-input': 'DocumentInputProps',
	'document-text': 'DocumentTextProps',
	'duration-text': 'DurationTextProps',
	'editable-text': 'EditableTextProps<string>',
	'empty-state': 'EmptyStateProps',
	'file-size-text': 'FileSizeTextProps',
	'filter-bar': 'PropsWithChildren<FilterBarProps>',
	'filter-chip': 'PropsWithChildren<FilterChipProps>',
	flex: 'PropsWithChildren<FlexProps>',
	form: 'PropsWithChildren<FormProps>',
	'format-provider': 'FormatProviderProps',
	grid: 'PropsWithChildren<GridProps>',
	identity: 'IdentityProps',
	image: 'ImageProps',
	indicator: 'IndicatorProps',
	input: 'InputProps',
	label: 'PropsWithChildren<LabelProps>',
	'labels-provider': 'LabelsProviderProps',
	// Only the root table, `layoutProps`, is compared with this. Every other
	// table on the page documents a part and is checked against it in
	// PART_CONTRACTS; `partProps` names its rows `Layout.Sidebar.Header` and so
	// on, which `documentable` drops, so the structural parts' one-line types
	// are the only thing on the page no compiler reads.
	layout: 'LayoutProps',
	loaded: 'LoadedProps<unknown>',
	loader: 'LoaderProps',
	'loading-bar': 'LoadingBarProps',
	'loading-overlay': 'LoadingOverlayProps',
	'mask-input': 'MaskInputProps',
	modal: 'PropsWithChildren<ModalProps>',
	'money-text': 'MoneyTextProps',
	'notification-card': 'NotificationCardProps',
	'notification-center': 'NotificationCenterProps',
	'notification-filter': 'NotificationFilterProps',
	'notification-list': 'NotificationListProps',
	'number-input': 'NumberInputProps',
	'number-text': 'NumberTextProps',
	'otp-input': 'OTPInputProps',
	pagination: 'PaginationProps',
	'password-input': 'PasswordInputProps',
	'phone-input': 'PhoneInputProps',
	'phone-text': 'PhoneTextProps',
	popconfirm: 'PropsWithChildren<PopconfirmProps>',
	popover: 'PropsWithChildren<PopoverProps>',
	'portal-provider': 'PortalProviderProps',
	progress: 'ProgressProps',
	protected: 'ProtectedProps',
	'protected-provider': 'ProtectedProviderProps',
	'qr-code': 'QrCodeProps',
	radio: 'RadioProps',
	rating: 'RatingProps',
	resizable: 'PropsWithChildren<ResizableProps>',
	'scroll-area': 'PropsWithChildren<ScrollAreaProps>',
	search: 'SearchProps',
	'segmented-control': 'SegmentedControlProps<{ id: string; name: string }>',
	separator: 'SeparatorProps',
	sheet: 'PropsWithChildren<SheetProps>',
	skeleton: 'SkeletonProps',
	slider: 'SliderProps',
	'spotlight-search': 'SpotlightSearchProps',
	stat: 'StatProps',
	stepper: 'PropsWithChildren<StepperProps>',
	switch: 'SwitchProps',
	tabs: 'PropsWithChildren<TabsProps>',
	// A union on children (plain text, or rich content with a required label);
	// keyof the union is the shared keys, which is every prop the page documents.
	tag: 'TagProps',
	'tags-input': 'TagsInputProps',
	textarea: 'TextareaProps',
	'time-input': 'TimeInputProps',
	timeline: 'PropsWithChildren<TimelineProps>',
	toggle: 'PropsWithChildren<ToggleProps>',
	tooltip: 'PropsWithChildren<TooltipProps>',
	tree: 'TreeProps<{ children?: unknown[]; id: string; name: string }>',
	'truncated-text': 'TruncatedTextProps',
	'tury-provider': 'TuryProviderProps',
	typography: 'PropsWithChildren<TypographyProps>',
	uploader: 'UploaderProps',
}

/** slug -> why the compiler cannot check this page's table. */
const SKIP = {
	'color-scheme-provider':
		'documents a provider plus the useColorScheme hook, not one prop bag',
	'dropdown-menu':
		'compound: the table covers Trigger/Content/Item/RadioGroup, which are separate contracts',
	list: 'generic over the row type',
	page: 'compound: the table covers Page.Header/Toolbar/Content',
	select: 'generic and discriminated on `mode`; keyof needs type arguments',
	table: 'generic over the row type',
	toast: 'the export is a function, not a component with props',
}

/**
 * Contracts that spread a DOM element's attributes, so `keyof` is ~300 names
 * and no table could ever list them all.
 *
 * These are not table gaps — they are the `PROP-1` breach in the library
 * itself: a primitive whose public API accepts `className`, `style` and every
 * DOM prop has no contract to document. Only the "documents a prop that does
 * not exist" direction runs for them, and they are printed on every run so the
 * debt stays visible.
 */
// Empty since 2026-09-26: the twelve inputs that spread `InputHTMLAttributes`
// now declare an explicit contract, so their tables are checked both ways.
// A slug belongs here again only if a primitive regresses to a DOM spread.
const LEAKY = new Set([])

/**
 * Pages that document a compound component's parts in one table.
 *
 * `Grid.Item`'s `span`, `Tabs.Item`'s `icon`, the sub-fields of `Switch`'s
 * `label` object — all real, none a key of the root contract. Showing them
 * together is the right call for a reader, so the "documents a prop that does
 * not exist" direction cannot run. The other direction still does: every prop
 * of the root contract must appear somewhere on the page.
 */
const PARTS = new Set([
	'avatar',
	'collapsible',
	'resizable',
	'timeline',
	'toggle',
	'breadcrumb',
	'bulk-actions',
	'card',
	'checkbox',
	'format-provider',
	'grid',
	'input',
	'modal',
	'radio',
	'sheet',
	'stepper',
	'switch',
	'tabs',
])

/**
 * slug -> table -> the contract of the compound part that one table documents.
 *
 * A part's props are real and are not keys of the root contract, so without
 * this a page had two choices: leave the part table out, or put the whole page
 * in PARTS and give up the "documents a prop that does not exist" direction for
 * every table on it. A table named here is checked against its own part in
 * both directions, and is left out of the root comparison.
 *
 * `imports` names what the expression needs from react-web, because a type
 * like `DataTransferImportRecord` does not end in `Props` and would not be
 * picked up from the expression alone.
 */
const PART_CONTRACTS = {
	'anchor-nav': {
		itemProps: {
			imports: [
				'AnchorNavItem',
			],
			type: 'AnchorNavItem',
		},
	},
	board: {
		columnProps: {
			imports: [
				'BoardColumn',
			],
			type: 'BoardColumn',
		},
	},
	card: {
		titleProps: {
			imports: [
				'CardTitleProps',
			],
			type: 'PropsWithChildren<CardTitleProps>',
		},
	},
	checklist: {
		itemProps: {
			imports: [
				'ChecklistItem',
			],
			type: 'ChecklistItem',
		},
	},
	'data-transfer-export': {
		downloadProps: {
			imports: [
				'DataTransferExportDownloadProps',
			],
			type: 'DataTransferExportDownloadProps',
		},
		// One table for both shapes, each row saying which it belongs to.
		partProps: {
			imports: [
				'DataTransferColumn',
				'DataTransferFilter',
			],
			type: 'DataTransferFilter | DataTransferColumn<{ code: string; id: string }>',
		},
	},
	'data-transfer-import': {
		recordShape: {
			imports: [
				'DataTransferImportRecord',
			],
			type: 'DataTransferImportRecord<{ code: string; id: string }>',
		},
		recordsProps: {
			imports: [
				'DataTransferImportRecordsProps',
			],
			type: 'DataTransferImportRecordsProps<{ code: string; id: string }>',
		},
	},
	'description-list': {
		itemProps: {
			imports: [
				'DescriptionListItem',
			],
			type: 'DescriptionListItem',
		},
	},
	form: {
		fieldGroupProps: {
			imports: [
				'FormFieldGroupProps',
			],
			type: 'FormFieldGroupProps',
		},
		fieldProps: {
			imports: [
				'FormFieldProps',
			],
			type: 'PropsWithChildren<FormFieldProps>',
		},
		fieldSeparatorProps: {
			imports: [
				'FormFieldSeparatorProps',
			],
			type: 'FormFieldSeparatorProps',
		},
		fieldSetProps: {
			imports: [
				'FormFieldSetProps',
			],
			type: 'PropsWithChildren<FormFieldSetProps>',
		},
	},
	// Layout is one page for the shell and the rail, so nearly every table is a
	// part. Two are not props at all — what `useLayout()` and `useSidebar()`
	// return — and are checked against those return types the same way.
	layout: {
		brandProps: {
			imports: [
				'SidebarBrandProps',
			],
			type: 'SidebarBrandProps',
		},
		collapsibleContentProps: {
			imports: [
				'SidebarMenuCollapsibleContentProps',
			],
			type: 'SidebarMenuCollapsibleContentProps',
		},
		collapsibleProps: {
			imports: [
				'SidebarMenuCollapsibleProps',
			],
			type: 'SidebarMenuCollapsibleProps',
		},
		collapsibleTriggerProps: {
			imports: [
				'SidebarMenuCollapsibleTriggerProps',
			],
			type: 'SidebarMenuCollapsibleTriggerProps',
		},
		contentProps: {
			imports: [
				'LayoutContentProps',
			],
			type: 'LayoutContentProps',
		},
		footerProps: {
			imports: [
				'LayoutFooterProps',
			],
			type: 'LayoutFooterProps',
		},
		groupActionProps: {
			imports: [
				'SidebarGroupActionProps',
			],
			type: 'SidebarGroupActionProps',
		},
		groupLabelProps: {
			imports: [
				'SidebarGroupLabelProps',
			],
			type: 'SidebarGroupLabelProps',
		},
		headerProps: {
			imports: [
				'LayoutHeaderProps',
			],
			type: 'PropsWithChildren<LayoutHeaderProps>',
		},
		mainProps: {
			imports: [
				'LayoutMainProps',
			],
			type: 'PropsWithChildren<LayoutMainProps>',
		},
		menuActionProps: {
			imports: [
				'SidebarMenuActionProps',
			],
			type: 'SidebarMenuActionProps',
		},
		menuButtonProps: {
			imports: [
				'SidebarMenuButtonProps',
			],
			type: 'SidebarMenuButtonProps',
		},
		menuSkeletonProps: {
			imports: [
				'SidebarMenuSkeletonProps',
			],
			type: 'SidebarMenuSkeletonProps',
		},
		menuSubButtonProps: {
			imports: [
				'SidebarMenuSubButtonProps',
			],
			type: 'SidebarMenuSubButtonProps',
		},
		providerProps: {
			imports: [
				'SidebarProviderProps',
			],
			type: 'SidebarProviderProps',
		},
		sidebarProps: {
			imports: [
				'SidebarProps',
			],
			type: 'SidebarProps',
		},
		tooltipObjectProps: {
			imports: [
				'SidebarMenuButtonTooltip',
			],
			type: 'Exclude<SidebarMenuButtonTooltip, string>',
		},
		triggerProps: {
			imports: [
				'SidebarTriggerProps',
			],
			type: 'SidebarTriggerProps',
		},
		useLayoutProps: {
			imports: [
				'useLayout',
			],
			type: 'ReturnType<typeof useLayout>',
		},
		useSidebarProps: {
			imports: [
				'SidebarContextValue',
			],
			type: 'SidebarContextValue',
		},
	},
	'notification-filter': {
		searchProps: {
			imports: [
				'NotificationFilterSearch',
			],
			type: 'NotificationFilterSearch',
		},
	},
	'notification-list': {
		itemProps: {
			imports: [
				'NotificationItem',
			],
			type: 'NotificationItem',
		},
	},
	search: {
		filterProps: {
			imports: [
				'SearchFilterProps',
			],
			type: 'SearchFilterProps',
		},
		itemProps: {
			imports: [
				'SearchItems',
			],
			type: 'SearchItems<Record<string, unknown>>',
		},
	},
	'spotlight-search': {
		groupProps: {
			imports: [
				'SpotlightSearchGroup',
			],
			type: 'SpotlightSearchGroup',
		},
		itemProps: {
			imports: [
				'SpotlightSearchItem',
			],
			type: 'SpotlightSearchItem',
		},
	},
}

/**
 * The row names of one table, read the same brace-aware way. A type annotation
 * is allowed — `const emptyProps: never[] = []` is how a part with no props of
 * its own says so — and `null` means the declaration was not found at all.
 */
function namesOfTable(source, table) {
	const declaration = new RegExp(
		`\\bconst ${table}(?:\\s*:\\s*[^=]+)?\\s*=\\s*\\[`,
	).exec(source)
	if (!declaration) {
		return null
	}

	let depth = 0
	let index = declaration.index + declaration[0].length - 1
	const from = index
	for (; index < source.length; index += 1) {
		const character = source[index]
		if (character === '[') {
			depth += 1
		} else if (character === ']') {
			depth -= 1
			if (depth === 0) {
				break
			}
		}
	}

	return [
		...source.slice(from, index + 1).matchAll(/\bname:\s*'([^']+)'/g),
	].map((row) => row[1])
}

/**
 * The prop names in a page's tables.
 *
 * Brace-aware on purpose: a row whose `type` is an object literal —
 * `Calendar`'s `selected?: { from: Date; to: Date }` — breaks any regex that
 * tries to match `name:` and `type:` inside one `[^{}]*` window, and the prop
 * then silently disappears from the comparison. A checker that drops a row is
 * worse than no checker, because it reports success.
 *
 * Only arrays actually handed to `<PropsTable props={...} />` are read, so the
 * `name` keys inside a page's demo data are not mistaken for documentation.
 * Tables in `skip` are the ones PART_CONTRACTS checks on their own.
 */
function tablesOf(source) {
	return new Set(
		[
			...source.matchAll(/<PropsTable\s+props=\{([A-Za-z0-9_]+)\}/g),
		].map((match) => match[1]),
	)
}

function propNamesOf(source, skip = new Set()) {
	const names = []

	for (const table of tablesOf(source)) {
		if (!skip.has(table)) {
			names.push(...(namesOfTable(source, table) ?? []))
		}
	}

	return documentable(names)
}

/**
 * `Alert.Action` documents a compound part, `...props` documents the spread —
 * neither is a key of the contract, and both are the right thing for a page to
 * show.
 */
function documentable(names) {
	return [
		...new Set(names),
	].filter((name) => !name.includes('.') && !name.startsWith('...'))
}

/**
 * A page is `<slug>.tsx`, or `<slug>/route.tsx` when the slug collides with a
 * name TanStack Router reserves for code splitting. `loader` is the live case:
 * `components/loader.tsx` is swallowed as the loader function for the
 * catalogue route instead of becoming a page. Discovering only the flat files
 * would skip such a page in silence, which is worse than not checking at all.
 */
const pages = []
for (const entry of readdirSync(PAGES, {
	withFileTypes: true,
})) {
	if (entry.isDirectory()) {
		if (existsSync(join(PAGES, entry.name, 'route.tsx'))) {
			pages.push(entry.name)
		}
		continue
	}
	if (!entry.name.endsWith('.tsx')) {
		continue
	}
	if (entry.name.startsWith('$') || entry.name === 'index.tsx') {
		continue
	}
	pages.push(entry.name.replace(/\.tsx$/, ''))
}
pages.sort()

function pageFile(slug) {
	const flat = join(PAGES, `${slug}.tsx`)
	return existsSync(flat) ? flat : join(PAGES, slug, 'route.tsx')
}

const undeclared = pages.filter(
	(slug) => !(slug in CONTRACT) && !(slug in SKIP),
)

if (undeclared.length > 0) {
	console.error(
		`\n✖ ${undeclared.length} page(s) declare no contract — add the slug to CONTRACT or to SKIP with a reason:`,
	)
	for (const slug of undeclared) {
		console.error(`  ${slug}`)
	}
	console.error('')
	process.exit(1)
}

const checked = pages.filter((slug) => slug in CONTRACT)
const body = []
const referenced = new Set()
const lostTables = []
const unreadable = []
let partTables = 0

for (const slug of checked) {
	const source = readFileSync(pageFile(slug), 'utf8')
	const parts = PART_CONTRACTS[slug] ?? {}

	// A table handed to <PropsTable> whose declaration this script cannot find
	// — built with .map, imported from elsewhere — would drop out of the
	// comparison and leave the page reported as matching. That is a failure,
	// not a skip.
	for (const table of tablesOf(source)) {
		if (namesOfTable(source, table) === null) {
			unreadable.push(`${slug}: ${table}`)
		}
	}
	const documented = propNamesOf(source, new Set(Object.keys(parts)))
	const id = slug.replace(/[^a-z0-9]/gi, '_')

	if (documented.length > 0) {
		const union = documented.map((name) => `'${name}'`).join(' | ')
		const type = CONTRACT[slug]
		body.push(`// ${slug}`)
		if (!PARTS.has(slug)) {
			body.push(
				`export type ${id}_documents_a_prop_that_does_not_exist = Assert<Exclude<${union}, AllKeys<${type}>>>`,
			)
		}
		if (!LEAKY.has(slug)) {
			body.push(
				`export type ${id}_omits_a_real_prop = Assert<Exclude<AllKeys<${type}>, ${union} | 'children'>>`,
			)
		}
		body.push('')
	}

	// A part table is checked both ways: it documents one contract, whole.
	for (const [table, part] of Object.entries(parts)) {
		const names = tablesOf(source).has(table)
			? documentable(namesOfTable(source, table) ?? [])
			: []

		if (names.length === 0) {
			lostTables.push(`${slug}: ${table}`)
			continue
		}

		const union = names.map((name) => `'${name}'`).join(' | ')
		body.push(`// ${slug} — ${table}`)
		body.push(
			`export type ${id}__${table}_documents_a_prop_that_does_not_exist = Assert<Exclude<${union}, AllKeys<${part.type}>>>`,
		)
		body.push(
			`export type ${id}__${table}_omits_a_real_prop = Assert<Exclude<AllKeys<${part.type}>, ${union} | 'children'>>`,
		)
		body.push('')
		for (const name of part.imports) {
			referenced.add(name)
		}
		partTables += 1
	}
}

if (unreadable.length > 0) {
	console.error(
		'\n✖ a props table is declared in a shape this script cannot read — write it as a literal, `const name = [ … ]`:',
	)
	for (const table of unreadable) {
		console.error(`  ${table}`)
	}
	console.error('')
	process.exit(1)
}

// A contract listed here and gone from the page would be a check that passes
// by checking nothing — the failure this script exists to refuse.
if (lostTables.length > 0) {
	console.error(
		'\n✖ PART_CONTRACTS names a table the page no longer hands to <PropsTable>:',
	)
	for (const lost of lostTables) {
		console.error(`  ${lost}`)
	}
	console.error('')
	process.exit(1)
}

for (const line of body) {
	for (const match of line.matchAll(/\b([A-Z][A-Za-z0-9]*Props)\b/g)) {
		referenced.add(match[1])
	}
}

const lines = [
	`import type { PropsWithChildren } from 'react'`,
	'import type {',
]
for (const name of [
	...referenced,
].sort()) {
	lines.push(`\t${name},`)
}
lines.push(`} from '@turystack/react-web'`)
lines.push('')
lines.push('type Assert<T extends never> = T')
lines.push('')
lines.push('/**')
lines.push(
	' * Distributive, so a discriminated contract answers for every arm.',
)
lines.push(
	' * `keyof (A | B)` is only the keys A and B share, which would call every',
)
lines.push(" * mode-specific prop — Accordion's `collapsible`, CurrencyInput's")
lines.push(' * `fromPlaceholder` — a prop that does not exist.')
lines.push(' */')
lines.push('type AllKeys<T> = T extends unknown ? keyof T : never')
lines.push('')
lines.push(...body)

// `PropsWithChildren` is only imported when a contract expression uses it
if (!lines.some((line) => /PropsWithChildren</.test(line))) {
	lines.shift()
}

const dir = mkdtempSync(join(tmpdir(), 'preview-props-'))
const file = join(ROOT, 'src', '__preview-props-check.ts')
writeFileSync(file, `${lines.join('\n')}\n`)

const run = spawnSync(
	'node',
	[
		resolve(ROOT, 'node_modules/typescript/bin/tsc'),
		'--noEmit',
		'-p',
		'tsconfig.app.json',
	],
	{
		cwd: ROOT,
		encoding: 'utf8',
	},
)

rmSync(file, {
	force: true,
})
rmSync(dir, {
	force: true,
	recursive: true,
})

const output = `${run.stdout ?? ''}${run.stderr ?? ''}`
const owner = new Map()
for (const [index, line] of lines.entries()) {
	const named =
		/^export type ([A-Za-z0-9_]+)_(documents_a_prop_that_does_not_exist|omits_a_real_prop)/.exec(
			line,
		)
	if (named) {
		owner.set(index + 1, [
			named[1],
			named[2],
		])
	}
}

const drift = output
	.split('\n')
	.filter((line) => line.includes('__preview-props-check'))
	.map((line) => {
		const at = /__preview-props-check\.ts\((\d+),/.exec(line)
		const found = at ? owner.get(Number(at[1])) : undefined
		const detail = line.slice(line.indexOf('error'))
		return found ? `${found[0]} — ${found[1]}\n      ${detail}` : line.trim()
	})

if (drift.length > 0) {
	console.error('\n✖ props tables have drifted from the library:\n')
	for (const line of drift) {
		console.error(`  ${line.trim()}`)
	}
	console.error('')
	process.exit(1)
}

if (run.status !== 0) {
	console.error('\n✖ typecheck failed for reasons outside this check:\n')
	console.error(output.split('\n').slice(0, 20).join('\n'))
	process.exit(1)
}

const both = checked.filter((slug) => !LEAKY.has(slug) && !PARTS.has(slug))
const unchecked = checked.filter((slug) => LEAKY.has(slug) && PARTS.has(slug))

console.log(`\n✓ ${checked.length} props table(s) match the library`)
console.log(`  ${both.length} checked in both directions`)
console.log(
	`  ${partTables} compound-part table(s) checked in both directions against their own part`,
)
console.log(
	`  ${LEAKY.size} contract(s) spread DOM attributes (PROP-1) — cannot be checked`,
)
console.log('  for completeness, because no table could list ~290 DOM props:')
console.log(
	`    ${[
		...LEAKY,
	].join(' · ')}`,
)
console.log(
	`  ${PARTS.size} page(s) document compound parts in one table — cannot be`,
)
console.log('  checked for invented props, only for missing root props:')
console.log(
	`    ${[
		...PARTS,
	].join(' · ')}`,
)
if (unchecked.length > 0) {
	console.log(
		`\n  ⚠ ${unchecked.length} page(s) are in BOTH sets, so nothing is verified:`,
	)
	console.log(`    ${unchecked.join(' · ')}`)
}
if (Object.keys(SKIP).length > 0) {
	console.log(`  ${Object.keys(SKIP).length} page(s) not checkable this way:`)
	for (const [slug, why] of Object.entries(SKIP)) {
		console.log(`    ${slug} — ${why}`)
	}
}
console.log('')
