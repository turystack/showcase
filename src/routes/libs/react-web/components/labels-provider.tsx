import { createFileRoute, Link } from '@tanstack/react-router'
import type { PartialTuryLabels, TuryLabels } from '@turystack/react-web'
import {
	Button,
	Confirm,
	LabelsProvider,
	Stepper,
	useLabels,
} from '@turystack/react-web'
import type { ReactNode } from 'react'
import { useState } from 'react'

import {
	CodeBlock,
	ComponentPreview,
	PropsTable,
	SlotsSection,
} from '@/components/docs'

/**
 * Props read from
 * `react-web/src/components/labels-provider/labels-provider.types.ts`.
 *
 * The label contract itself is deliberately NOT a props table: it is well over
 * a hundred strings across two dozen groups, and a four-column table that long
 * is a wall, not documentation. It is rendered per group below, with the
 * default each key ships with, because the default is the thing a translator
 * actually needs to see.
 */
const providerProps = [
	{
		description: 'Partial overrides by group; omitted keys stay English.',
		name: 'labels',
		type: 'PartialTuryLabels',
	},
	{
		description: 'The subtree that reads these labels.',
		name: 'children',
		type: 'React.ReactNode',
	},
]

type LabelGroup = keyof TuryLabels

type LabelEntry<G extends LabelGroup> = {
	key: keyof TuryLabels[G] & string
	kind: string
	value: string
	note?: string
}

type LabelGroupDoc = {
	[G in LabelGroup]: {
		group: G
		read: string
		entries: readonly LabelEntry<G>[]
	}
}[LabelGroup]

/** What the table below reads: a group, without the typing that checks it. */
type LabelGroupView = {
	group: string
	read: string
	entries: readonly {
		key: string
		kind: string
		value: string
		note?: string
	}[]
}

/** The keys of the real contract that `Groups` leaves out, as `group.key`. */
type Undocumented<Groups extends readonly LabelGroupDoc[]> = {
	[G in LabelGroup]: `${G}.${Exclude<
		keyof TuryLabels[G],
		Extract<
			Groups[number],
			{
				group: G
			}
		>['entries'][number]['key']
	> &
		string}`
}[LabelGroup]

/**
 * The transcription, held to `TuryLabels` in both directions by the compiler.
 * A group or a key the library does not have fails on its own row; a key the
 * library has and this page leaves out fails here, where the error lists it as
 * a missing property — `common.retry`. The list used to be checked by eye, and
 * lost three keys and a whole group that way.
 */
function transcribed<const Groups extends readonly LabelGroupDoc[]>(
	groups: Groups &
		NoInfer<{
			[Key in Undocumented<Groups>]: 'in TuryLabels, missing from this page'
		}>,
) {
	return groups
}

/**
 * The contract, transcribed from react-i18n's `UiLabels` and its English
 * defaults. `read` names what consumes the group, taken from a sweep of
 * `useLabels()` callers in the library rather than from memory.
 */
const labelGroups = transcribed([
	{
		entries: [
			{
				key: 'label',
				kind: 'string',
				value: 'On this page',
			},
		],
		group: 'anchorNav',
		read: 'AnchorNav, as the name of its nav landmark',
	},
	{
		entries: [
			{
				key: 'add',
				kind: 'string',
				note: 'Per-column add-card control; `addLabel` overrides it per board.',
				value: 'Add',
			},
			{
				key: 'cancelled',
				kind: 'string',
				note: 'Announced when a lifted card is put back where it started.',
				value: 'Move cancelled. The card is back where it started.',
			},
			{
				key: 'dropped',
				kind: '(column: string, position: number, total: number) => string',
				note: 'Announced once a lifted card is put down; position is 1-based.',
				value: 'Dropped in Doing, position 2 of 4.',
			},
			{
				key: 'instructions',
				kind: 'string',
				note: 'Read to assistive technology on every movable card: how to move it with the keyboard.',
				value:
					'Press Space to pick up. Use the arrow keys to move, Space to drop, Escape to cancel.',
			},
			{
				key: 'moved',
				kind: '(column: string, position: number, total: number) => string',
				note: 'Announced as a lifted card travels.',
				value: 'Doing, position 3 of 4.',
			},
			{
				key: 'pickedUp',
				kind: '(column: string, position: number, total: number) => string',
				note: 'Announced when a card is lifted.',
				value: 'Picked up in To do, position 1 of 3.',
			},
		],
		group: 'board',
		read: 'Board — the add control and its keyboard-move announcements',
	},
	{
		entries: [
			{
				key: 'active',
				kind: 'string',
				value: 'Active',
			},
			{
				key: 'disabled',
				kind: 'string',
				value: 'Disabled',
			},
			{
				key: 'enabled',
				kind: 'string',
				value: 'Enabled',
			},
			{
				key: 'inactive',
				kind: 'string',
				value: 'Inactive',
			},
			{
				key: 'no',
				kind: 'string',
				value: 'No',
			},
			{
				key: 'yes',
				kind: 'string',
				value: 'Yes',
			},
		],
		group: 'booleanText',
		read: 'BooleanText, and the boolean filter in DataTransferExport',
	},
	{
		entries: [
			{
				key: 'label',
				kind: 'string',
				note: 'Names the <nav> landmark around the trail.',
				value: 'Breadcrumb',
			},
			{
				key: 'more',
				kind: 'string',
				note: 'Names the ellipsis standing in for the crumbs that were folded away.',
				value: 'More',
			},
		],
		group: 'breadcrumb',
		read: 'Breadcrumb — its landmark and the folded-crumbs ellipsis',
	},
	{
		entries: [
			{
				key: 'clear',
				kind: 'string',
				value: 'Clear selection',
			},
			{
				key: 'more',
				kind: 'string',
				note: 'Names the menu holding the actions that did not fit.',
				value: 'More actions',
			},
			{
				key: 'selected',
				kind: '(count: number) => string',
				value: '3 selected',
			},
		],
		group: 'bulkActions',
		read: 'BulkActions',
	},
	{
		entries: [
			{
				key: 'next',
				kind: 'string',
				value: 'Next slide',
			},
			{
				key: 'previous',
				kind: 'string',
				value: 'Previous slide',
			},
			{
				key: 'slide',
				kind: '(index: number, total: number) => string',
				note: 'Names a slide and its dot — index and total are 1-based.',
				value: 'Slide 2 of 5',
			},
		],
		group: 'carousel',
		read: 'Carousel',
	},
	{
		entries: [
			{
				key: 'done',
				kind: 'string',
				value: 'Done',
			},
			{
				key: 'hideCompleted',
				kind: 'string',
				value: 'Hide completed',
			},
			{
				key: 'progress',
				kind: '(done: number, total: number) => string',
				value: '2 of 5 complete',
			},
			{
				key: 'showCompleted',
				kind: '(count: number) => string',
				value: 'Show completed (3)',
			},
		],
		group: 'checklist',
		read: 'Checklist',
	},
	{
		entries: [
			{
				key: 'label',
				kind: 'string',
				value: 'Code',
			},
		],
		group: 'codeBlock',
		read: 'CodeBlock, as the name of its scroll region',
	},
	{
		entries: [
			{
				key: 'selectColor',
				kind: 'string',
				value: 'Select colour',
			},
			{
				key: 'transparent',
				kind: 'string',
				value: 'Transparent',
			},
		],
		group: 'colorPicker',
		read: 'ColorPicker',
	},
	{
		entries: [
			{
				key: 'dark',
				kind: 'string',
				note: 'Names the option that turns the dark scheme on; the option is an icon alone.',
				value: 'Dark',
			},
			{
				key: 'label',
				kind: 'string',
				note: 'Names the radiogroup holding the three options.',
				value: 'Color scheme',
			},
			{
				key: 'light',
				kind: 'string',
				note: 'Names the option that turns the light scheme on.',
				value: 'Light',
			},
			{
				key: 'system',
				kind: 'string',
				note: 'Names the option that follows the operating system’s scheme.',
				value: 'System',
			},
		],
		group: 'colorSchemeSwitcher',
		read: 'ColorSchemeSwitcher — the group and its icon-only options',
	},
	{
		entries: [
			{
				key: 'apply',
				kind: 'string',
				value: 'Apply',
			},
			{
				key: 'cancel',
				kind: 'string',
				value: 'Cancel',
			},
			{
				key: 'clear',
				kind: 'string',
				value: 'Clear',
			},
			{
				key: 'close',
				kind: 'string',
				note: 'Closes a DataTransfer surface from its Result step.',
				value: 'Close',
			},
			{
				key: 'copied',
				kind: 'string',
				note: 'Announced by the copy control once the value is on the clipboard.',
				value: 'Copied',
			},
			{
				key: 'copy',
				kind: 'string',
				note: 'Names the copy control, which is an icon and has no text of its own.',
				value: 'Copy',
			},
			{
				key: 'copyValue',
				kind: '(label: string) => string',
				note: 'Names a copy control by what it copies, not a bare “Copy”.',
				value: 'Copy Payment ID',
			},
			{
				key: 'from',
				kind: '(value: string) => string',
				note: 'Reads back a range with no upper bound.',
				value: 'From R$ 10,00',
			},
			{
				key: 'optional',
				kind: 'string',
				value: '(optional)',
			},
			{
				key: 'retry',
				kind: 'string',
				note: 'Names the control that runs a failed read again.',
				value: 'Try again',
			},
			{
				key: 'upTo',
				kind: '(value: string) => string',
				note: 'Reads back a range with no lower bound.',
				value: 'Up to R$ 50,00',
			},
		],
		group: 'common',
		read: 'Label, ranges, EditableText, failed states, DataTransfer…',
	},
	{
		entries: [
			{
				key: 'acknowledgeBlocked',
				kind: 'string',
				note: 'Why the confirm button is blocked while the statement is unticked.',
				value: 'Tick the statement above to continue.',
			},
			{
				key: 'cancel',
				kind: 'string',
				value: 'Cancel',
			},
			{
				key: 'confirm',
				kind: 'string',
				value: 'Confirm',
			},
			{
				key: 'error',
				kind: 'string',
				note: 'Shown when a rejected confirm carries no message of its own.',
				value: 'That did not work. Try again.',
			},
			{
				key: 'otpBlocked',
				kind: 'string',
				value: 'Enter the whole code to continue.',
			},
			{
				key: 'otpLabel',
				kind: 'string',
				value: 'One-time code',
			},
			{
				key: 'passwordBlocked',
				kind: 'string',
				value: 'Enter your password to continue.',
			},
			{
				key: 'passwordLabel',
				kind: 'string',
				value: 'Password',
			},
			{
				key: 'passwordPlaceholder',
				kind: 'string',
				note: 'Stands in the empty password field of a password challenge.',
				value: 'Your password',
			},
			{
				key: 'typedBlocked',
				kind: '(value: string) => string',
				value: 'Type acme-prod exactly to continue.',
			},
			{
				key: 'typedLabel',
				kind: '(value: string) => string',
				note: 'The argument is the text the user has to reproduce.',
				value: 'Type acme-prod to confirm',
			},
		],
		group: 'confirm',
		read: 'Confirm',
	},
	{
		entries: [
			{
				key: 'maximum',
				kind: 'string',
				value: 'Maximum value',
			},
			{
				key: 'minimum',
				kind: 'string',
				value: 'Minimum value',
			},
			{
				key: 'open',
				kind: 'string',
				note: 'Names the button beside a currency range field that opens its minimum and maximum.',
				value: 'Set value range',
			},
			{
				key: 'rangePlaceholder',
				kind: 'string',
				value: 'Filter by value',
			},
		],
		group: 'currencyInput',
		read: 'CurrencyInput',
	},
	{
		entries: [
			{
				key: 'clear',
				kind: 'string',
				note: 'Names the control that empties the date field.',
				value: 'Clear date',
			},
			{
				key: 'open',
				kind: 'string',
				note: 'Names the control that opens the calendar beside the date field.',
				value: 'Open calendar',
			},
		],
		group: 'dateInput',
		read: 'DateInput, DateRangeInput, DateTimeInput, export filters',
	},
	{
		entries: [
			{
				key: 'custom',
				kind: 'string',
				value: 'Custom',
			},
			{
				key: 'last30Days',
				kind: 'string',
				value: 'Last 30 days',
			},
			{
				key: 'last7Days',
				kind: 'string',
				value: 'Last 7 days',
			},
			{
				key: 'lastMonth',
				kind: 'string',
				value: 'Last month',
			},
			{
				key: 'thisMonth',
				kind: 'string',
				value: 'This month',
			},
			{
				key: 'today',
				kind: 'string',
				value: 'Today',
			},
			{
				key: 'yesterday',
				kind: 'string',
				value: 'Yesterday',
			},
		],
		group: 'dateRangeInput',
		read: 'DateRangeInput — the built-in presets',
	},
	{
		entries: [
			{
				key: 'today',
				kind: 'string',
				value: 'Today',
			},
			{
				key: 'tomorrow',
				kind: 'string',
				value: 'Tomorrow',
			},
			{
				key: 'yesterday',
				kind: 'string',
				value: 'Yesterday',
			},
		],
		group: 'dateText',
		read: 'DateText',
	},
	{
		entries: [
			{
				key: 'cnpj',
				kind: 'string',
				value: 'CNPJ',
			},
			{
				key: 'cpf',
				kind: 'string',
				value: 'CPF',
			},
			{
				key: 'hide',
				kind: 'string',
				note: 'Names the control that masks the number again.',
				value: 'Hide document number',
			},
			{
				key: 'reveal',
				kind: 'string',
				value: 'Show document number',
			},
		],
		group: 'documentText',
		read: 'DocumentText, PhoneText',
	},
	{
		entries: [
			{
				key: 'day',
				kind: 'string',
				value: 'day',
			},
			{
				key: 'dayShort',
				kind: 'string',
				note: 'Symbol form used by the short variant — 2d 4h.',
				value: 'd',
			},
			{
				key: 'days',
				kind: 'string',
				value: 'days',
			},
			{
				key: 'hour',
				kind: 'string',
				value: 'hour',
			},
			{
				key: 'hourShort',
				kind: 'string',
				value: 'h',
			},
			{
				key: 'hours',
				kind: 'string',
				value: 'hours',
			},
			{
				key: 'minute',
				kind: 'string',
				value: 'minute',
			},
			{
				key: 'minuteShort',
				kind: 'string',
				value: 'min',
			},
			{
				key: 'minutes',
				kind: 'string',
				value: 'minutes',
			},
			{
				key: 'second',
				kind: 'string',
				value: 'second',
			},
			{
				key: 'secondShort',
				kind: 'string',
				value: 's',
			},
			{
				key: 'seconds',
				kind: 'string',
				value: 'seconds',
			},
		],
		group: 'durationText',
		read: 'DurationText',
	},
	{
		entries: [
			{
				key: 'edit',
				kind: 'string',
				note: 'Names the control that opens the editor, which may be an icon alone.',
				value: 'Edit',
			},
			{
				key: 'empty',
				kind: 'string',
				note: 'Stands in for a value that is not set yet.',
				value: 'Empty',
			},
			{
				key: 'error',
				kind: 'string',
				note: 'Shown when a save was rejected without a message of its own.',
				value: 'That did not work. Try again.',
			},
			{
				key: 'save',
				kind: 'string',
				value: 'Save',
			},
		],
		group: 'editableText',
		read: 'EditableText',
	},
	{
		entries: [
			{
				key: 'accepted',
				kind: '(accept: string) => string',
				value: 'Accepted: .csv,.xlsx',
			},
			{
				key: 'hint',
				kind: 'string',
				value: 'Drag & drop files here, or click to select',
			},
		],
		group: 'filePicker',
		read: 'Uploader, DataTransferImport',
	},
	{
		entries: [
			{
				key: 'clear',
				kind: 'string',
				value: 'Clear filters',
			},
			{
				key: 'label',
				kind: 'string',
				value: 'Filters',
			},
		],
		group: 'filterBar',
		read: 'FilterBar',
	},
	{
		entries: [
			{
				key: 'remove',
				kind: '(label: string) => string',
				value: 'Remove Status filter',
			},
			{
				key: 'separator',
				kind: 'string',
				note: 'Between an active chip’s name and value — Status: Paid.',
				value: ':',
			},
		],
		group: 'filterChip',
		read: 'FilterChip — the separator and the remove control',
	},
	{
		entries: [
			{
				key: 'empty',
				kind: 'string',
				value: 'No data found',
			},
			{
				key: 'emptyDescription',
				kind: 'string',
				note: 'The line under the empty title, beside its icon.',
				value: 'When there is something to show, it appears here.',
			},
			{
				key: 'error',
				kind: 'string',
				value: 'The data could not be loaded',
			},
			{
				key: 'errorDescription',
				kind: 'string',
				note: 'The line under the error title: what the reader can do about it.',
				value: 'Check your connection and try again.',
			},
			{
				key: 'loadMore',
				kind: 'string',
				value: 'Load more',
			},
		],
		group: 'list',
		read: 'List, and Loaded’s own empty and error cards',
	},
	{
		entries: [
			{
				key: 'loading',
				kind: 'string',
				note: 'Names the spinner for assistive technology, which cannot see it spin.',
				value: 'Loading',
			},
		],
		group: 'loader',
		read: 'Loader, and everything with a loading state',
	},
	{
		entries: [
			{
				key: 'loading',
				kind: 'string',
				note: 'Names the bar across the top of the shell while a page loads.',
				value: 'Loading page',
			},
		],
		group: 'loadingBar',
		read: 'LoadingBar, and Layout’s loadingBar',
	},
	{
		entries: [
			{
				key: 'categories',
				kind: 'string',
				note: 'Names the chip that narrows the notifications by category.',
				value: 'Categories',
			},
			{
				key: 'empty',
				kind: 'string',
				note: 'The empty state’s title: nothing is waiting for the reader.',
				value: "You're all caught up",
			},
			{
				key: 'emptyDescription',
				kind: 'string',
				note: 'The line under the empty title.',
				value: 'New notifications will appear here.',
			},
			{
				key: 'list',
				kind: 'string',
				note: 'Names the list of notifications.',
				value: 'Notifications',
			},
			{
				key: 'markAllRead',
				kind: 'string',
				value: 'Mark all as read',
			},
			{
				key: 'search',
				kind: 'string',
				note: 'Prompt in the field that searches the notifications.',
				value: 'Search notifications',
			},
			{
				key: 'status',
				kind: 'string',
				note: 'Names the All / Unread control.',
				value: 'Show',
			},
			{
				key: 'statusAll',
				kind: 'string',
				value: 'All',
			},
			{
				key: 'statusUnread',
				kind: 'string',
				value: 'Unread',
			},
			{
				key: 'title',
				kind: 'string',
				note: 'Titles the popover and the sheet.',
				value: 'Notifications',
			},
			{
				key: 'today',
				kind: 'string',
				note: 'Heads the day group of today.',
				value: 'Today',
			},
			{
				key: 'trigger',
				kind: '(unread: number) => string',
				note: 'The bell’s accessible name; 0 drops the count.',
				value: 'Notifications, 3 unread',
			},
			{
				key: 'unread',
				kind: 'string',
				note: 'Read to assistive technology beside an unread row’s dot.',
				value: 'Unread',
			},
			{
				key: 'viewAll',
				kind: 'string',
				value: 'View all',
			},
			{
				key: 'yesterday',
				kind: 'string',
				note: 'Heads the day group of yesterday.',
				value: 'Yesterday',
			},
		],
		group: 'notifications',
		read: 'NotificationCenter, NotificationList and NotificationFilter',
	},
	{
		entries: [
			{
				key: 'label',
				kind: 'string',
				note: 'Names the <nav> landmark around the controls.',
				value: 'Pagination',
			},
			{
				key: 'next',
				kind: 'string',
				note: 'Names the arrow to the next page.',
				value: 'Next page',
			},
			{
				key: 'previous',
				kind: 'string',
				note: 'Names the arrow to the previous page.',
				value: 'Previous page',
			},
			{
				key: 'range',
				kind: '(from: number, to: number, total: number) => string',
				note: 'from and to are 1-based row numbers.',
				value: '21-40 of 100',
			},
			{
				key: 'rowsPerPage',
				kind: 'string',
				note: "The caption beside the page-size Select, and that Select's accessible name.",
				value: 'Rows per page',
			},
		],
		group: 'pagination',
		read: 'Pagination',
	},
	{
		entries: [
			{
				key: 'denied',
				kind: 'string',
				note: 'The reason Protected hands a control it blocks for a missing permission.',
				value: 'You do not have permission to do this',
			},
		],
		group: 'protected',
		read: 'Protected, and BulkActions for a permission it lacks',
	},
	{
		entries: [
			{
				key: 'hide',
				kind: 'string',
				note: 'Names the control that masks the typed password again.',
				value: 'Hide password',
			},
			{
				key: 'medium',
				kind: 'string',
				note: 'Strength verdict for 3 of the 5 rules met.',
				value: 'Medium',
			},
			{
				key: 'show',
				kind: 'string',
				note: 'Names the control that reveals the typed password.',
				value: 'Show password',
			},
			{
				key: 'strong',
				kind: 'string',
				note: 'Strength verdict for 4 of the 5 rules met.',
				value: 'Strong',
			},
			{
				key: 'veryStrong',
				kind: 'string',
				note: 'Strength verdict for all 5 rules met.',
				value: 'Very strong',
			},
			{
				key: 'veryWeak',
				kind: 'string',
				note: 'Strength verdict for at most 1 of the 5 rules met.',
				value: 'Very weak',
			},
			{
				key: 'weak',
				kind: 'string',
				note: 'Strength verdict for 2 of the 5 rules met.',
				value: 'Weak',
			},
		],
		group: 'passwordInput',
		read: 'PasswordInput — the show/hide control and the strength meter',
	},
	{
		entries: [
			{
				key: 'call',
				kind: 'string',
				value: 'Call',
			},
			{
				key: 'whatsapp',
				kind: 'string',
				value: 'Open in WhatsApp',
			},
		],
		group: 'phoneText',
		read: 'PhoneText',
	},
	{
		entries: [
			{
				key: 'filters',
				kind: 'string',
				note: 'Names the button that opens the popover holding the filters that are not on the row.',
				value: 'Filters',
			},
			{
				key: 'less',
				kind: 'string',
				note: 'Folds the second row of filters away again.',
				value: 'Show less',
			},
			{
				key: 'more',
				kind: 'string',
				note: 'Opens the second row, with the filters that did not fit on the first.',
				value: 'Show more',
			},
			{
				key: 'placeholder',
				kind: 'string',
				note: 'The empty query field, when the filter brings no placeholder of its own.',
				value: 'Search',
			},
			{
				key: 'reset',
				kind: 'string',
				note: 'Clears every filter and the query at once.',
				value: 'Reset',
			},
		],
		group: 'search',
		read: 'Search',
	},
	{
		entries: [
			{
				key: 'create',
				kind: '(query: string) => string',
				note: 'Creatable Select row for an unmatched query; per-instance override.',
				value: 'Create "acme"',
			},
			{
				key: 'error',
				kind: 'string',
				note: 'What the dropdown says when its options could not be loaded.',
				value: 'The options could not be loaded',
			},
		],
		group: 'select',
		read: 'Select',
	},
	{
		entries: [
			{
				key: 'results',
				kind: 'string',
				note: 'Names the results listbox when neither ariaLabel nor placeholder does.',
				value: 'Search results',
			},
		],
		group: 'spotlightSearch',
		read: 'SpotlightSearch',
	},
	{
		entries: [
			{
				key: 'blocked',
				kind: 'string',
				note: 'Why a step ahead of the current one cannot be opened yet.',
				value: 'Finish the current step first',
			},
			{
				key: 'completed',
				kind: 'string',
				note: 'Names the Stepper.Completed panel for assistive technology.',
				value: 'Completed',
			},
			{
				key: 'finish',
				kind: 'string',
				note: 'The Next button on the last step.',
				value: 'Finish',
			},
			{
				key: 'next',
				kind: 'string',
				value: 'Next',
			},
			{
				key: 'previous',
				kind: 'string',
				value: 'Back',
			},
			{
				key: 'step',
				kind: '(active: number, total: number) => string',
				note: 'Announced by the live region; both arguments are 1-based.',
				value: 'Step 2 of 4',
			},
		],
		group: 'stepper',
		read: 'Stepper',
	},
	{
		entries: [
			{
				key: 'empty',
				kind: 'string',
				value: 'No records found',
			},
			{
				key: 'emptyDescription',
				kind: 'string',
				note: 'The line under the empty title, beside its icon.',
				value: 'When there are records, they appear here.',
			},
			{
				key: 'error',
				kind: 'string',
				note: 'What the table says when its rows could not be loaded.',
				value: 'The records could not be loaded',
			},
			{
				key: 'errorDescription',
				kind: 'string',
				note: 'The line under the error title: what the reader can do about it.',
				value: 'Check your connection and try again.',
			},
			{
				key: 'selectAll',
				kind: 'string',
				note: 'Names the header checkbox that selects every row on the page.',
				value: 'Select all rows',
			},
			{
				key: 'selectRow',
				kind: '(row?: string) => string',
				note: "Names a row's checkbox by the row's name, if any.",
				value: 'Select row Ana Silva',
			},
		],
		group: 'table',
		read: 'Table',
	},
	{
		entries: [
			{
				key: 'remove',
				kind: '(label: string) => string',
				note: 'Names the × that removes one tag; the argument is the tag’s own text.',
				value: 'Remove Black Friday',
			},
		],
		group: 'tag',
		read: 'Tag, naming its remove control',
	},
	{
		entries: [
			{
				key: 'hours',
				kind: 'string',
				note: 'Names the hours segment of the field.',
				value: 'hours',
			},
			{
				key: 'minutes',
				kind: 'string',
				note: 'Names the minutes segment.',
				value: 'minutes',
			},
			{
				key: 'seconds',
				kind: 'string',
				note: 'Names the seconds segment, shown with withSeconds.',
				value: 'seconds',
			},
		],
		group: 'timeInput',
		read: 'TimeInput and DateTimeInput — each segment’s name',
	},
	{
		entries: [
			{
				key: 'allColumns',
				kind: 'string',
				value: 'All columns',
			},
			{
				key: 'clearFilters',
				kind: 'string',
				value: 'Clear filters',
			},
			{
				key: 'columns',
				kind: 'string',
				value: 'Columns',
			},
			{
				key: 'columnsChosen',
				kind: '(chosen: number, total: number) => string',
				value: '6 of 9',
			},
			{
				key: 'columnsNone',
				kind: 'string',
				note: 'Why Export is disabled: every column was unticked.',
				value: 'Choose at least one column',
			},
			{
				key: 'download',
				kind: 'string',
				note: 'Takes the file an export produced. On screen from the start, enabled once the file exists.',
				value: 'Download',
			},
			{
				key: 'downloadTemplate',
				kind: 'string',
				value: 'Download the template',
			},
			{
				key: 'export',
				kind: 'string',
				value: 'Export',
			},
			{
				key: 'exportDescription',
				kind: '(entity: string) => string',
				value: 'Choose which bookings leave, and in which shape.',
			},
			{
				key: 'exportTitle',
				kind: '(entity: string) => string',
				value: 'Export bookings',
			},
			{
				key: 'fileChosen',
				kind: '(name: string) => string',
				value: 'bookings.csv selected',
			},
			{
				key: 'fileColumn',
				kind: 'string',
				value: 'Column in your file',
			},
			{
				key: 'fileFailed',
				kind: 'string',
				note: 'The export produced no file and gave no reason of its own.',
				value: 'The file could not be generated',
			},
			{
				key: 'filePending',
				kind: 'string',
				note: 'The export was accepted and its file is still being built.',
				value: 'Preparing the file…',
			},
			{
				key: 'fileReady',
				kind: 'string',
				note: 'The export’s file exists and can be taken.',
				value: 'The file is ready',
			},
			{
				key: 'filters',
				kind: 'string',
				value: 'Filters',
			},
			{
				key: 'format',
				kind: 'string',
				value: 'Format',
			},
			{
				key: 'ignore',
				kind: 'string',
				note: 'The choice that leaves a field unfilled.',
				value: 'Do not import',
			},
			{
				key: 'import',
				kind: 'string',
				value: 'Import',
			},
			{
				key: 'importDescription',
				kind: '(entity: string) => string',
				value: 'Bring bookings in from a file.',
			},
			{
				key: 'importTitle',
				kind: '(entity: string) => string',
				value: 'Import bookings',
			},
			{
				key: 'mappingRequired',
				kind: '(label: string) => string',
				value: 'Guest needs a column',
			},
			{
				key: 'recordError',
				kind: 'string',
				note: 'A row the API refused. Its reasons are listed under it.',
				value: 'Failed',
			},
			{
				key: 'recordPending',
				kind: 'string',
				note: 'A row the API has not reached yet — not a failure.',
				value: 'Pending',
			},
			{
				key: 'recordRow',
				kind: 'string',
				note: 'Heads the column of file line numbers in the records list.',
				value: 'Row',
			},
			{
				key: 'recordStatus',
				kind: 'string',
				note: 'Heads the column saying what became of each row.',
				value: 'Result',
			},
			{
				key: 'recordSuccess',
				kind: 'string',
				note: 'A row the API took in.',
				value: 'Imported',
			},
			{
				key: 'resultLater',
				kind: 'string',
				note: 'Says the work outlives the surface. The product’s resultLink follows it.',
				value:
					'This keeps running after you close it. Follow the result on its page:',
			},
			{
				key: 'rowsFound',
				kind: '(rows: number) => string',
				value: '20 rows found',
			},
			{
				key: 'rowsReady',
				kind: '(ready: number, total: number) => string',
				value: '18 of 20 rows ready',
			},
			{
				key: 'rowsRefused',
				kind: '(rows: number) => string',
				value: '2 refused',
			},
			{
				key: 'rowsTooMany',
				kind: '(max: number) => string',
				value: 'That file holds more than 5000 rows',
			},
			{
				key: 'sending',
				kind: 'string',
				note: 'Shown while the request that starts the export or the import is in flight.',
				value: 'Sending the request…',
			},
			{
				key: 'stepData',
				kind: 'string',
				note: 'The export’s first step: which rows, in which shape, with which columns.',
				value: 'Data',
			},
			{
				key: 'stepDone',
				kind: 'string',
				value: 'Result',
			},
			{
				key: 'stepFile',
				kind: 'string',
				value: 'File',
			},
			{
				key: 'stepMap',
				kind: 'string',
				value: 'Columns',
			},
			{
				key: 'stepReview',
				kind: 'string',
				value: 'Check',
			},
		],
		group: 'transfer',
		read: 'DataTransferExport, DataTransferImport',
	},
	{
		entries: [
			{
				key: 'cancel',
				kind: 'string',
				value: 'Keep editing',
			},
			{
				key: 'confirm',
				kind: 'string',
				value: 'Leave without saving',
			},
			{
				key: 'description',
				kind: 'string',
				value: 'You have unsaved changes. Leaving now will discard them.',
			},
			{
				key: 'title',
				kind: 'string',
				value: 'Leave without saving?',
			},
		],
		group: 'unsaved',
		read: 'the useUnsaved hook',
	},
])

/** Counted, not typed: a number in the prose was the first thing to go stale. */
const labelEntries = (labelGroups as readonly LabelGroupView[]).flatMap(
	(group) => group.entries,
)
const labelCount = labelEntries.length
const interpolatedCount = labelEntries.filter((entry) =>
	entry.kind.includes('=>'),
).length

/**
 * A translation of twelve of the groups, used by the previews on this page and
 * printed in full under Usage. It is not the whole contract, and an app should
 * not start from it: react-i18n ships pt-BR complete, as `uiLabels['pt-br']`,
 * and a half-translated app is the failure this provider exists to prevent.
 */
const ptBR: PartialTuryLabels = {
	breadcrumb: {
		label: 'Trilha de navegação',
		more: 'Mais',
	},
	colorPicker: {
		selectColor: 'Selecionar cor',
		transparent: 'Transparente',
	},
	common: {
		apply: 'Aplicar',
		cancel: 'Cancelar',
		clear: 'Limpar',
		close: 'Fechar',
		from: (value) => `A partir de ${value}`,
		optional: '(opcional)',
		upTo: (value) => `Até ${value}`,
	},
	confirm: {
		acknowledgeBlocked: 'Marque a declaração acima para continuar.',
		cancel: 'Cancelar',
		confirm: 'Confirmar',
		error: 'Não deu certo. Tente de novo.',
		otpBlocked: 'Digite o código inteiro para continuar.',
		otpLabel: 'Código de uso único',
		passwordBlocked: 'Digite sua senha para continuar.',
		passwordLabel: 'Senha',
		typedBlocked: (value) => `Digite ${value} exatamente para continuar.`,
		typedLabel: (value) => `Digite ${value} para confirmar`,
	},
	currencyInput: {
		maximum: 'Valor máximo',
		minimum: 'Valor mínimo',
		open: 'Definir faixa de valores',
		rangePlaceholder: 'Filtrar por valor',
	},
	dateRangeInput: {
		custom: 'Personalizado',
		last7Days: 'Últimos 7 dias',
		last30Days: 'Últimos 30 dias',
		lastMonth: 'Mês passado',
		thisMonth: 'Este mês',
		today: 'Hoje',
		yesterday: 'Ontem',
	},
	list: {
		empty: 'Nenhum dado encontrado',
		error: 'Não foi possível carregar os dados',
		loadMore: 'Carregar mais',
	},
	loader: {
		loading: 'Carregando',
	},
	pagination: {
		label: 'Paginação',
		next: 'Próxima página',
		previous: 'Página anterior',
		range: (from, to, total) => `${from}-${to} de ${total}`,
		rowsPerPage: 'Linhas por página',
	},
	stepper: {
		completed: 'Concluído',
		finish: 'Concluir',
		next: 'Avançar',
		previous: 'Voltar',
		step: (active, total) => `Etapa ${active} de ${total}`,
	},
	table: {
		empty: 'Nenhum registro encontrado',
	},
	unsaved: {
		cancel: 'Continuar editando',
		confirm: 'Sair sem salvar',
		description: 'Você tem alterações não salvas. Sair agora vai descartá-las.',
		title: 'Sair sem salvar?',
	},
}

/** Overriding one string in one group, to show the siblings survive. */
const oneString: PartialTuryLabels = {
	stepper: {
		next: 'Continuar',
	},
}

const usageCode = `import { LabelsProvider } from '@turystack/react-web'
import type { PartialTuryLabels } from '@turystack/react-web'

// Module scope, not inline: the provider memoises on this reference, so an
// object literal written in JSX rebuilds the merged table on every render.
const ptBR: PartialTuryLabels = {
  breadcrumb: {
    label: 'Trilha de navegação',
    more: 'Mais',
  },
  colorPicker: {
    selectColor: 'Selecionar cor',
    transparent: 'Transparente',
  },
  common: {
    apply: 'Aplicar',
    cancel: 'Cancelar',
    clear: 'Limpar',
    close: 'Fechar',
    from: (value) => \`A partir de \${value}\`,
    optional: '(opcional)',
    upTo: (value) => \`Até \${value}\`,
  },
  confirm: {
    acknowledgeBlocked: 'Marque a declaração acima para continuar.',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    error: 'Não deu certo. Tente de novo.',
    otpBlocked: 'Digite o código inteiro para continuar.',
    otpLabel: 'Código de uso único',
    passwordBlocked: 'Digite sua senha para continuar.',
    passwordLabel: 'Senha',
    typedBlocked: (value) => \`Digite \${value} exatamente para continuar.\`,
    typedLabel: (value) => \`Digite \${value} para confirmar\`,
  },
  currencyInput: {
    maximum: 'Valor máximo',
    minimum: 'Valor mínimo',
    open: 'Definir faixa de valores',
    rangePlaceholder: 'Filtrar por valor',
  },
  dateRangeInput: {
    custom: 'Personalizado',
    last30Days: 'Últimos 30 dias',
    last7Days: 'Últimos 7 dias',
    lastMonth: 'Mês passado',
    thisMonth: 'Este mês',
    today: 'Hoje',
    yesterday: 'Ontem',
  },
  list: {
    empty: 'Nenhum dado encontrado',
    error: 'Não foi possível carregar os dados',
    loadMore: 'Carregar mais',
  },
  loader: {
    loading: 'Carregando',
  },
  pagination: {
    label: 'Paginação',
    next: 'Próxima página',
    previous: 'Página anterior',
    range: (from, to, total) => \`\${from}-\${to} de \${total}\`,
    rowsPerPage: 'Linhas por página',
  },
  stepper: {
    completed: 'Concluído',
    finish: 'Concluir',
    next: 'Avançar',
    previous: 'Voltar',
    step: (active, total) => \`Etapa \${active} de \${total}\`,
  },
  table: {
    empty: 'Nenhum registro encontrado',
  },
  unsaved: {
    cancel: 'Continuar editando',
    confirm: 'Sair sem salvar',
    description: 'Você tem alterações não salvas. Sair agora vai descartá-las.',
    title: 'Sair sem salvar?',
  },
}

<LabelsProvider labels={ptBR}>
  <App />
</LabelsProvider>

// One string, one group — the siblings keep their defaults
<LabelsProvider labels={{ stepper: { next: 'Continuar' } }}>
  <Checkout />
</LabelsProvider>

// Reading them yourself, for a string of your own that has to match
import { useLabels } from '@turystack/react-web'

function EmptyState() {
  const labels = useLabels()
  return <p>{labels.list.empty}</p>
}

// Merging by hand, without rendering a provider
import { defaultLabels, mergeLabels } from '@turystack/react-web'

const labels = mergeLabels(ptBR)      // every group, pt-BR over the defaults
const english = mergeLabels(undefined) // === defaultLabels`

function GroupTable({ group }: { group: LabelGroupView }) {
	return (
		<div className="overflow-hidden rounded-lg border border-border">
			<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-border border-b bg-muted/50 px-4 py-2">
				<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
					{group.group}
				</code>
				<span className="text-muted-foreground text-xs">
					read by {group.read}
				</span>
			</div>
			<dl className="divide-y divide-border">
				{group.entries.map((entry) => (
					<div
						className="grid gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[16rem_1fr]"
						key={entry.key}
					>
						<dt className="flex flex-wrap items-baseline gap-2">
							<code className="rounded-lg bg-muted px-1.5 py-0.5 font-medium text-foreground text-xs">
								{entry.key}
							</code>
							<code className="text-lib text-xs">{entry.kind}</code>
						</dt>
						<dd className="space-y-1 text-sm">
							<p className="text-foreground">“{entry.value}”</p>
							{entry.note && (
								<p className="text-muted-foreground text-xs">{entry.note}</p>
							)}
						</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

/** Reads the context directly, so a preview can show what a subtree sees. */
function Readout({ title }: { title: string }) {
	const labels = useLabels()

	const lines = [
		[
			'pagination.range(21, 40, 100)',
			labels.pagination.range(21, 40, 100),
		],
		[
			'pagination.rowsPerPage',
			labels.pagination.rowsPerPage,
		],
		[
			'stepper.step(2, 4)',
			labels.stepper.step(2, 4),
		],
		[
			'common.from("R$ 10,00")',
			labels.common.from('R$ 10,00'),
		],
		[
			'common.upTo("R$ 50,00")',
			labels.common.upTo('R$ 50,00'),
		],
		[
			'list.empty',
			labels.list.empty,
		],
	]

	return (
		<div className="w-full space-y-2 rounded-lg border border-border p-4">
			<p className="font-medium text-foreground text-sm">{title}</p>
			<dl className="space-y-1">
				{lines.map(([key, value]) => (
					<div
						className="flex flex-wrap items-baseline gap-2"
						key={key}
					>
						<dt className="text-muted-foreground text-xs">{key}</dt>
						<dd className="text-foreground text-sm">{value}</dd>
					</div>
				))}
			</dl>
		</div>
	)
}

function Flow() {
	const [active, setActive] = useState(0)

	return (
		<div className="w-full">
			<Stepper
				active={active}
				onActiveChange={setActive}
				size="sm"
			>
				<Stepper.Step label="Account">
					<p className="text-muted-foreground text-sm">Name and e-mail.</p>
				</Stepper.Step>
				<Stepper.Step label="Payment">
					<p className="text-muted-foreground text-sm">Card details.</p>
				</Stepper.Step>
				<Stepper.Completed>
					<p className="text-muted-foreground text-sm">Done.</p>
				</Stepper.Completed>
				<Stepper.Previous />
				<Stepper.Next />
			</Stepper>
		</div>
	)
}

function Column({ children, title }: { children: ReactNode; title: string }) {
	return (
		<div className="w-full space-y-2 rounded-lg border border-border p-4">
			<p className="font-medium text-foreground text-sm">{title}</p>
			{children}
		</div>
	)
}

/** A typed Confirm, whose blocked hint has no per-instance prop at all. */
function TranslatedConfirm() {
	const [open, setOpen] = useState(false)

	return (
		<LabelsProvider labels={ptBR}>
			<div className="flex flex-col items-center gap-3">
				<Button
					onClick={() => setOpen(true)}
					variant="destructive"
				>
					Excluir projeto
				</Button>
				<Confirm
					confirmationValue="acme-prod"
					confirmProps={{
						variant: 'destructive',
					}}
					description="O projeto e tudo dentro dele vai junto."
					mode="typed"
					onClose={() => setOpen(false)}
					open={open}
					title="Excluir acme-prod?"
				/>
			</div>
		</LabelsProvider>
	)
}

function Page() {
	return (
		<div className="space-y-10">
			<header>
				<p className="font-medium text-lib text-xs uppercase tracking-wider">
					Core
				</p>
				<h1 className="mt-2 font-bold font-display text-3xl tracking-tight">
					LabelsProvider
				</h1>
				<p className="mt-3 max-w-prose text-lg text-muted-foreground">
					Every word the library writes on its own, in one place.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Props</h2>
				<PropsTable props={providerProps} />
			</section>

			<SlotsSection slug="labels-provider" />

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Why it exists</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					A primitive that hardcodes a word decides the product’s language for
					the app consuming it, and the app has no way to argue.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The provider used to be part of{' '}
					<Link
						className="text-lib underline underline-offset-4"
						to="/libs/react-web/components/tury-provider"
					>
						TuryProvider
					</Link>
					, which is now only composition.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">The contract</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					{labelGroups.length} groups, {labelCount} strings. Each row shows the
					key, its type, the English default, and — where the name does not say
					it — what the string is for.
				</p>
				<div className="space-y-4">
					{labelGroups.map((group) => (
						<GroupTable
							group={group}
							key={group.group}
						/>
					))}
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					Overriding is per group
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						PartialTuryLabels
					</code>{' '}
					is a partial at both levels: every group is optional, and every key
					inside a group is optional.
				</p>
				<CodeBlock
					code={`export function mergeLabels(
  overrides: PartialTuryLabels | undefined,
): TuryLabels {
  if (!overrides) {
    return defaultLabels
  }

  const merged: Record<string, unknown> = {}
  for (const [group, strings] of Object.entries(defaultLabels)) {
    merged[group] = {
      ...strings,
      ...overrides[group as keyof TuryLabels],
    }
  }
  return merged as TuryLabels
}`}
					filename="labels-provider.utils.ts"
					language="ts"
				/>
				<p className="max-w-prose text-muted-foreground text-sm">
					The same stepper three times. The middle one overrides only{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						stepper.next
					</code>
					; the rest of the group stays English.
				</p>
				<ComponentPreview
					className="flex-col items-stretch gap-4"
					title="Nothing, one string, and the whole group"
				>
					<Column title="No provider — the English defaults">
						<Flow />
					</Column>
					<Column title="labels={{ stepper: { next: 'Continuar' } }}">
						<LabelsProvider labels={oneString}>
							<Flow />
						</LabelsProvider>
					</Column>
					<Column title="labels={ptBR}">
						<LabelsProvider labels={ptBR}>
							<Flow />
						</LabelsProvider>
					</Column>
				</ComponentPreview>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						mergeLabels
					</code>{' '}
					is exported, so you can resolve the table without a provider, e.g. in
					a test.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					useLabels() needs no provider
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The context is created holding{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						defaultLabels
					</code>
					, not{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						undefined
					</code>
					, so{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						useLabels()
					</code>{' '}
					outside a provider returns them instead of throwing.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					The hook is worth using for your own copy too, wherever a string of
					yours sits next to one of the library’s and has to agree with it.
				</p>
				<ComponentPreview
					className="flex-col items-stretch gap-4"
					title="The same hook, inside and outside a provider"
				>
					<Readout title="No provider" />
					<LabelsProvider labels={ptBR}>
						<Readout title="Inside LabelsProvider labels={ptBR}" />
					</LabelsProvider>
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					The {interpolatedCount} that interpolate
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						stepper.step(active, total)
					</code>
					,{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						pagination.range(from, to, total)
					</code>{' '}
					and every other function-typed entry are functions, not templates.
				</p>
				<p className="max-w-prose text-muted-foreground text-sm">
					These are the strings a translator most often breaks, because dropping
					an argument still compiles.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">
					What a translation actually buys
				</h2>
				<p className="max-w-prose text-muted-foreground text-sm">
					The{' '}
					<code className="rounded-lg bg-muted px-1.5 py-0.5 text-xs">
						confirm
					</code>{' '}
					group is the one that shows why this has to live in a provider rather
					than in props.
				</p>
				<ComponentPreview title="A typed Confirm with labels={ptBR}">
					<TranslatedConfirm />
				</ComponentPreview>
			</section>

			<section className="space-y-4">
				<h2 className="font-display font-semibold text-xl">Usage</h2>
				<CodeBlock
					code={usageCode}
					filename="labels.ts"
					language="tsx"
				/>
			</section>
		</div>
	)
}

export const Route = createFileRoute(
	'/libs/react-web/components/labels-provider',
)({
	component: Page,
})
