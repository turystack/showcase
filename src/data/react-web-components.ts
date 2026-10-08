/**
 * The component catalogue for `@turystack/react-web`.
 *
 * Every name here is exported by the package — the list was taken from the
 * built entry point, not from a hand-kept menu, so the sidebar cannot drift
 * away from the library. Providers and hooks that are not renderable UI are
 * grouped under "Core" rather than hidden.
 *
 * `documented: true` means the slug has a real route file. Everything else
 * falls through to the placeholder page.
 *
 * ## Why the groups are shaped this way
 *
 * The groups answer "what am I doing right now", not "what is this thing made
 * of". A reader arrives wanting to collect a date, or show a table, or ask for
 * confirmation — so `date-input` sits with the other three date fields rather
 * than in a single Form drawer of twenty-seven, and `confirm` sits with the
 * modals it actually is rather than under Feedback.
 *
 * Group size is the honest signal. A twenty-seven item group is a drawer
 * nobody scans, and a one item group is a heading that earns nothing; both are
 * bugs in the taxonomy, not in the library. Nothing here should grow past
 * roughly a dozen without splitting.
 *
 * Two placements are worth stating because they read as surprises:
 *
 *   - `bulk-actions` sits under Data, not Overlays. It is the bar a table
 *     grows, and someone building a table is who goes looking for it.
 *   - Access, Notifications and Data Transfer are their own groups: each is a
 *     small family read together (a provider and its gate; the bell, its list,
 *     its card and its filter; the export and the import dialogs). There is no
 *     domain kit — screens built from a domain live in Audiences, composed
 *     from these primitives.
 *   - `spotlight-search` sits under Navigation, not Overlays. It happens to be
 *     an overlay, but nobody reaches for it wanting an overlay — they reach
 *     for it wanting to jump somewhere.
 */

export type ComponentEntry = {
	name: string
	slug: string
	description: string
	documented?: boolean
}

export type ComponentGroup = {
	title: string
	components: ComponentEntry[]
}

export const componentGroups: ComponentGroup[] = [
	{
		components: [
			{
				description:
					'Root provider: scheme, toaster, strings and overlay mount.',
				documented: true,
				name: 'TuryProvider',
				slug: 'tury-provider',
			},
			{
				description: 'Every string the library renders, for translation.',
				documented: true,
				name: 'LabelsProvider',
				slug: 'labels-provider',
			},
			{
				description: 'Names the element the library mounts its overlays into.',
				documented: true,
				name: 'PortalProvider',
				slug: 'portal-provider',
			},
			{
				description: 'Holds the light/dark colour scheme and persists it.',
				documented: true,
				name: 'ColorSchemeProvider',
				slug: 'color-scheme-provider',
			},
			{
				description: 'Control that flips the active colour scheme.',
				documented: true,
				name: 'ColorSchemeSwitcher',
				slug: 'color-scheme-switcher',
			},
			{
				description: 'Locale, time zone and currency for every formatter.',
				documented: true,
				name: 'FormatProvider',
				slug: 'format-provider',
			},
		],
		title: 'Core',
	},
	{
		components: [
			{
				description: 'App shell: header, main, content, footer and nav rail.',
				documented: true,
				name: 'Layout',
				slug: 'layout',
			},
			{
				description: 'Page body: breadcrumbs, title, action, toolbar, content.',
				documented: true,
				name: 'Page',
				slug: 'page',
			},
			{
				description: 'A list filter bar, or a form filter section as a grid.',
				documented: true,
				name: 'Search',
				slug: 'search',
			},
			{
				description: 'Width-constrained, centred page wrapper.',
				documented: true,
				name: 'Container',
				slug: 'container',
			},
			{
				description: 'Primitive div with spacing, background and radius props.',
				documented: true,
				name: 'Box',
				slug: 'box',
			},
			{
				description: 'Flexbox layout primitive with direction, gap and align.',
				documented: true,
				name: 'Flex',
				slug: 'flex',
			},
			{
				description: 'Grid layout primitive with column and span control.',
				documented: true,
				name: 'Grid',
				slug: 'grid',
			},
			{
				description: 'Horizontal or vertical rule between regions.',
				documented: true,
				name: 'Separator',
				slug: 'separator',
			},
			{
				description:
					'A scrollable region with a scrollbar the design system owns.',
				documented: true,
				name: 'ScrollArea',
				slug: 'scroll-area',
			},
			{
				description: 'One section that opens and closes on its own.',
				documented: true,
				name: 'Collapsible',
				slug: 'collapsible',
			},
			{
				description: 'Expandable sections, single or multiple open.',
				documented: true,
				name: 'Accordion',
				slug: 'accordion',
			},
			{
				description: 'Resizable panels with a keyboard-operable handle.',
				documented: true,
				name: 'Resizable',
				slug: 'resizable',
			},
		],
		title: 'Layout',
	},
	{
		components: [
			{
				description: 'Text primitive carrying the type scale and tone.',
				documented: true,
				name: 'Typography',
				slug: 'typography',
			},
			{
				description: 'Text that clamps and reveals the rest on demand.',
				documented: true,
				name: 'TruncatedText',
				slug: 'truncated-text',
			},
		],
		title: 'Typography',
	},
	{
		components: [
			{
				description: 'Primary action element with variants, sizes and loading.',
				documented: true,
				name: 'Button',
				slug: 'button',
			},
			{
				description: 'Copies a string and confirms it.',
				documented: true,
				name: 'CopyButton',
				slug: 'copy-button',
			},
			{
				description: 'Action menu with groups, checkboxes and radio items.',
				documented: true,
				name: 'DropdownMenu',
				slug: 'dropdown-menu',
			},
			{
				description: 'A button that stays pressed, and a group of them.',
				documented: true,
				name: 'Toggle',
				slug: 'toggle',
			},
		],
		title: 'Actions',
	},
	{
		components: [
			{
				description: 'Form root that wires fields, labels and error state.',
				documented: true,
				name: 'Form',
				slug: 'form',
			},
			{
				description: 'Field label with required, optional and tooltip states.',
				documented: true,
				name: 'Label',
				slug: 'label',
			},
			{
				description: 'Single-line text field with sections and loading state.',
				documented: true,
				name: 'Input',
				slug: 'input',
			},
			{
				description: 'Multi-line text field with counter and auto-size.',
				documented: true,
				name: 'Textarea',
				slug: 'textarea',
			},
			{
				description: 'File upload with accept rules and a handler.',
				documented: true,
				name: 'Uploader',
				slug: 'uploader',
			},
			{
				description: 'Click-or-drop file picker with size and count limits.',
				documented: false,
				name: 'FilePicker',
				slug: 'file-picker',
			},
		],
		title: 'Form',
	},
	{
		components: [
			{
				description: 'Password field with reveal toggle and strength meter.',
				documented: true,
				name: 'PasswordInput',
				slug: 'password-input',
			},
			{
				description: 'One-time-code field split into individual boxes.',
				documented: true,
				name: 'OTPInput',
				slug: 'otp-input',
			},
			{
				description: 'Numeric field with step, bounds and grouping.',
				documented: true,
				name: 'NumberInput',
				slug: 'number-input',
			},
			{
				description: 'Money field bound to a currency and locale.',
				documented: true,
				name: 'CurrencyInput',
				slug: 'currency-input',
			},
			{
				description: 'Text field driven by a mask pattern.',
				documented: true,
				name: 'MaskInput',
				slug: 'mask-input',
			},
			{
				description: 'CPF/CNPJ field that validates the document as you type.',
				documented: true,
				name: 'DocumentInput',
				slug: 'document-input',
			},
			{
				description: 'Phone field with country selection and formatting.',
				documented: true,
				name: 'PhoneInput',
				slug: 'phone-input',
			},
			{
				description: 'A shown value that turns into any field to edit.',
				documented: true,
				name: 'EditableText',
				slug: 'editable-text',
			},
		],
		title: 'Typed inputs',
	},
	{
		components: [
			{
				description: 'Date field with a calendar popover.',
				documented: true,
				name: 'DateInput',
				slug: 'date-input',
			},
			{
				description: 'Start/end date field with presets.',
				documented: true,
				name: 'DateRangeInput',
				slug: 'date-range-input',
			},
			{
				description: 'Combined date and time field.',
				documented: true,
				name: 'DateTimeInput',
				slug: 'date-time-input',
			},
			{
				description: 'Time field with bounds and optional seconds.',
				documented: true,
				name: 'TimeInput',
				slug: 'time-input',
			},
		],
		title: 'Date & time',
	},
	{
		components: [
			{
				description: 'Single or multiple choice with search and async options.',
				documented: true,
				name: 'Select',
				slug: 'select',
			},
			{
				description: 'Boolean field, standalone or grouped.',
				documented: true,
				name: 'Checkbox',
				slug: 'checkbox',
			},
			{
				description: 'Exclusive choice group with descriptions.',
				documented: true,
				name: 'Radio',
				slug: 'radio',
			},
			{
				description: 'Boolean toggle with rich label support.',
				documented: true,
				name: 'Switch',
				slug: 'switch',
			},
			{
				description: 'Single value or range along a track.',
				documented: true,
				name: 'Slider',
				slug: 'slider',
			},
			{
				description: 'Star rating input.',
				documented: true,
				name: 'Rating',
				slug: 'rating',
			},
			{
				description: 'Free-form tags with duplicate and max rules.',
				documented: true,
				name: 'TagsInput',
				slug: 'tags-input',
			},
			{
				description: 'Colour field with a palette and custom hex.',
				documented: true,
				name: 'ColorPicker',
				slug: 'color-picker',
			},
			{
				description: 'One choice among a few, all of them visible at once.',
				documented: true,
				name: 'SegmentedControl',
				slug: 'segmented-control',
			},
		],
		title: 'Selection',
	},
	{
		components: [
			{
				description: 'A date in the reader locale: calendar, relative, range.',
				documented: true,
				name: 'DateText',
				slug: 'date-text',
			},
			{
				description: 'An amount in cents as money: compact or accounting.',
				documented: true,
				name: 'MoneyText',
				slug: 'money-text',
			},
			{
				description: 'A plain number, a percent or a compact one.',
				documented: true,
				name: 'NumberText',
				slug: 'number-text',
			},
			{
				description: 'A CPF or CNPJ under its mask, coverable and revealable.',
				documented: true,
				name: 'DocumentText',
				slug: 'document-text',
			},
			{
				description: 'A phone number as its own country writes it.',
				documented: true,
				name: 'PhoneText',
				slug: 'phone-text',
			},
			{
				description: 'A span of time as a length: 2h 15min, or a clock.',
				documented: true,
				name: 'DurationText',
				slug: 'duration-text',
			},
			{
				description: 'A byte count as a size a person can judge.',
				documented: true,
				name: 'FileSizeText',
				slug: 'file-size-text',
			},
			{
				description: 'A flag as the words the product uses for it.',
				documented: true,
				name: 'BooleanText',
				slug: 'boolean-text',
			},
		],
		title: 'Formatters',
	},
	{
		components: [
			{
				description: 'Name, facts, media and actions for any entity.',
				documented: true,
				name: 'Identity',
				slug: 'identity',
			},
			{
				description: 'Surface with header, content and footer slots.',
				documented: true,
				name: 'Card',
				slug: 'card',
			},
			{
				description: 'User image with initials fallback.',
				documented: true,
				name: 'Avatar',
				slug: 'avatar',
			},
			{
				description: 'Media in a fixed ratio, with a fallback.',
				documented: true,
				name: 'Image',
				slug: 'image',
			},
			{
				description: 'Status and category label.',
				documented: true,
				name: 'Badge',
				slug: 'badge',
			},
			{
				description: 'Removable Badge, with a named ×.',
				documented: true,
				name: 'Tag',
				slug: 'tag',
			},
			{
				description: 'Count or dot pinned to a corner.',
				documented: true,
				name: 'Indicator',
				slug: 'indicator',
			},
			{
				description:
					'A row of slides, with real controls and not only a swipe.',
				documented: true,
				name: 'Carousel',
				slug: 'carousel',
			},
			{
				description: 'What a surface says when it has nothing to show.',
				documented: true,
				name: 'EmptyState',
				slug: 'empty-state',
			},
			{
				description: "Label / value pairs for a record's details.",
				documented: true,
				name: 'DescriptionList',
				slug: 'description-list',
			},
			{
				description: 'Read-only code and JSON.',
				documented: true,
				name: 'CodeBlock',
				slug: 'code-block',
			},
			{
				description: 'Scannable QR code for a link or Pix payload.',
				documented: true,
				name: 'QrCode',
				slug: 'qr-code',
			},
		],
		title: 'Content',
	},
	{
		components: [
			{
				description: 'Data table with sorting, selection and pagination.',
				documented: true,
				name: 'Table',
				slug: 'table',
			},
			{
				description:
					'Collection renderer with loading, empty and infinite modes.',
				documented: true,
				name: 'List',
				slug: 'list',
			},
			{
				description: 'Kanban columns, moved by drag or keyboard.',
				documented: true,
				name: 'Board',
				slug: 'board',
			},
			{
				description: 'One dashboard number: label, figure and trend.',
				documented: true,
				name: 'Stat',
				slug: 'stat',
			},
			{
				description: 'Month grid for single dates and ranges.',
				documented: true,
				name: 'Calendar',
				slug: 'calendar',
			},
			{
				description: 'What happened to something, in the order it happened.',
				documented: true,
				name: 'Timeline',
				slug: 'timeline',
			},
			{
				description: 'Row of filter chips above a table.',
				documented: true,
				name: 'FilterBar',
				slug: 'filter-bar',
			},
			{
				description: 'One filter over a list, suggested or active.',
				documented: true,
				name: 'FilterChip',
				slug: 'filter-chip',
			},
			{
				description: 'Bar for a selection: count, actions and confirmations.',
				documented: true,
				name: 'BulkActions',
				slug: 'bulk-actions',
			},
			{
				description: 'Renders children once a read lands, else the reason why.',
				documented: true,
				name: 'Loaded',
				slug: 'loaded',
			},
		],
		title: 'Data',
	},
	{
		components: [
			{
				description: 'Tab set with icons, pill and vertical variants.',
				documented: true,
				name: 'Tabs',
				slug: 'tabs',
			},
			{
				description: 'Trail of ancestor links with overflow handling.',
				documented: true,
				name: 'Breadcrumb',
				slug: 'breadcrumb',
			},
			{
				description: 'Offset and cursor pagination controls.',
				documented: true,
				name: 'Pagination',
				slug: 'pagination',
			},
			{
				description: 'Multi-step flow with jump-ahead and loading steps.',
				documented: true,
				name: 'Stepper',
				slug: 'stepper',
			},
			{
				description: 'A hierarchy to expand and pick with the arrow keys.',
				documented: true,
				name: 'Tree',
				slug: 'tree',
			},
			{
				description: 'Search as you type: palette, header field or inline.',
				documented: true,
				name: 'SpotlightSearch',
				slug: 'spotlight-search',
			},
			{
				description: '"On this page" index that follows the scroll.',
				documented: true,
				name: 'AnchorNav',
				slug: 'anchor-nav',
			},
		],
		title: 'Navigation',
	},
	{
		components: [
			{
				description: 'Inline message with tone, icon and actions.',
				documented: true,
				name: 'Alert',
				slug: 'alert',
			},
			{
				description: 'Transient notification queue.',
				documented: true,
				name: 'Toast',
				slug: 'toast',
			},
			{
				description: 'Determinate progress bar with labels.',
				documented: true,
				name: 'Progress',
				slug: 'progress',
			},
			{
				description: 'Setup steps with progress.',
				documented: true,
				name: 'Checklist',
				slug: 'checklist',
			},
			{
				description: 'Spinner in three sizes.',
				documented: true,
				name: 'Loader',
				slug: 'loader',
			},
			{
				description:
					'Thin bar across the top of the screen while a page loads.',
				documented: true,
				name: 'LoadingBar',
				slug: 'loading-bar',
			},
			{
				description: 'Spinner over a loading region, fading its content.',
				documented: true,
				name: 'LoadingOverlay',
				slug: 'loading-overlay',
			},
			{
				description: 'Placeholder shape shown before content arrives.',
				documented: true,
				name: 'Skeleton',
				slug: 'skeleton',
			},
		],
		title: 'Feedback',
	},
	{
		components: [
			{
				description: 'Centred dialog in five sizes with a compound API.',
				documented: true,
				name: 'Modal',
				slug: 'modal',
			},
			{
				description: 'Edge-anchored panel, scrollable and sized.',
				documented: true,
				name: 'Sheet',
				slug: 'sheet',
			},
			{
				description: 'Anchored floating surface for rich content.',
				documented: true,
				name: 'Popover',
				slug: 'popover',
			},
			{
				description: 'Short hint anchored to a trigger.',
				documented: true,
				name: 'Tooltip',
				slug: 'tooltip',
			},
			{
				description: 'Imperative confirmation dialog, sync or async.',
				documented: true,
				name: 'Confirm',
				slug: 'confirm',
			},
			{
				description: 'The small confirmation anchored to one control.',
				documented: true,
				name: 'Popconfirm',
				slug: 'popconfirm',
			},
		],
		title: 'Overlays',
	},
	{
		components: [
			{
				description: 'Permissions of the signed-in user, for the tree.',
				documented: true,
				name: 'ProtectedProvider',
				slug: 'protected-provider',
			},
			{
				description: 'Renders, hides or disables by permission (UI only).',
				documented: true,
				name: 'Protected',
				slug: 'protected',
			},
		],
		title: 'Access',
	},
	{
		components: [
			{
				description:
					'The bell: unread count, latest in a popover, all in a sheet.',
				documented: true,
				name: 'NotificationCenter',
				slug: 'notification-center',
			},
			{
				description: 'Notification rows, read or unread, grouped by day.',
				documented: true,
				name: 'NotificationList',
				slug: 'notification-list',
			},
			{
				description: 'One notification: what happened, when, read or unread.',
				documented: true,
				name: 'NotificationCard',
				slug: 'notification-card',
			},
			{
				description: 'All or unread, search and category above the list.',
				documented: true,
				name: 'NotificationFilter',
				slug: 'notification-filter',
			},
		],
		title: 'Notifications',
	},
	{
		components: [
			{
				description:
					'Export: filters, format, columns, then an API-built file.',
				documented: true,
				name: 'DataTransferExport',
				slug: 'data-transfer-export',
			},
			{
				description: 'Import rows from a file in four steps, tracked per row.',
				documented: true,
				name: 'DataTransferImport',
				slug: 'data-transfer-import',
			},
		],
		title: 'Data Transfer',
	},
]

export const allComponents: ComponentEntry[] = componentGroups.flatMap(
	(group) => group.components,
)

export function findComponent(slug: string): ComponentEntry | undefined {
	return allComponents.find((component) => component.slug === slug)
}

export function findComponentGroup(slug: string): string | undefined {
	return componentGroups.find((group) =>
		group.components.some((component) => component.slug === slug),
	)?.title
}
