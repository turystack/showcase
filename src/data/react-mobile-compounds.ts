import type { MobilePropDoc } from './react-mobile-docs'

export type MobileCompoundDoc = {
	description: string
	name: string
	props: MobilePropDoc[]
}

const prop = (
	name: string,
	type: string,
	description: string,
	required = false,
): MobilePropDoc => ({
	description,
	name,
	required,
	type,
})

const compound = (
	name: string,
	description: string,
	props: MobilePropDoc[] = [],
): MobileCompoundDoc => ({
	description,
	name,
	props,
})

const buttonProps = [
	prop('ariaLabel', 'string', 'Accessible name for icon-only buttons.'),
	prop('asChild', 'boolean', 'Delegates rendering to the child through Slot.'),
	prop('block', 'boolean', 'Fills the available width.'),
	prop('children', 'ReactNode', 'Button label or custom content.'),
	prop('disabled', 'boolean', 'Prevents interaction.'),
	prop('leftSection', 'ReactNode', 'Content before the label.'),
	prop('loading', 'boolean', 'Disables interaction and shows pending content.'),
	prop(
		'onClick',
		'((event: GestureResponderEvent) => void) | null',
		'Compatibility alias for onPress.',
	),
	prop(
		'onPress',
		'((event: GestureResponderEvent) => void) | null',
		'Called when the action is pressed.',
	),
	prop('rightSection', 'ReactNode', 'Content after the label.'),
	prop('size', 'ButtonSize', 'Touch target and content scale.'),
	prop('variant', 'ButtonVariant', 'Visual treatment.'),
]

const actionSheetTriggerProps = [
	prop('asChild', 'boolean', 'Delegates rendering to the trigger child.'),
]

const actionSheetContentProps = [
	prop('children', 'ReactNode', 'Sheet content.'),
	prop('description', 'ReactNode', 'Supporting text.'),
	prop('side', 'SheetSide', 'Presentation edge.'),
	prop('size', 'SheetSize', 'Sheet extent.'),
	prop('title', 'ReactNode', 'Sheet title.'),
]

const actionSheetItemProps = [
	...buttonProps.filter(
		(item) => item.name !== 'rightSection' && item.name !== 'variant',
	),
	prop(
		'confirm',
		'ActionSheetItemConfirmProps',
		'Optional confirmation before invoking the action.',
	),
	prop('icon', 'ReactNode', 'Leading action icon.'),
	prop('rightSection', 'ReactNode', 'Content after the action label.'),
	prop('variant', 'ActionSheetItemVariant', 'Action visual intent.'),
]

const stepperPreviousProps = [
	...buttonProps.filter((item) => item.name !== 'onClick'),
	prop(
		'onClick',
		'(event: unknown, currentStep: number) => void',
		'Called before moving to the previous step.',
	),
	prop(
		'render',
		'(props: { disabled: boolean; onClick: () => void }) => ReactElement',
		'Custom previous-action renderer.',
	),
]

const stepperNextProps = [
	...buttonProps.filter((item) => item.name !== 'onClick'),
	prop('lastChildren', 'ReactNode', 'Label displayed on the final step.'),
	prop(
		'onClick',
		'(event: unknown, currentStep: number) => void',
		'Called before moving to the next step.',
	),
	prop('onLastClick', '() => void', 'Called by the final action.'),
	prop(
		'render',
		'(props: { disabled: boolean; isLast: boolean; onClick: () => void }) => ReactElement',
		'Custom next-action renderer.',
	),
]

export const reactMobileCompoundDocs: Record<string, MobileCompoundDoc[]> = {
	accordion: [
		compound('Accordion.Item', 'Associates trigger and content with a value.', [
			prop('value', 'string', 'Stable item identifier.', true),
		]),
		compound('Accordion.Trigger', 'Toggles its parent item.', [
			prop('children', 'ReactNode', 'Trigger content.'),
		]),
		compound('Accordion.Content', 'Renders while its parent item is open.'),
	],
	'action-sheet': [
		compound(
			'ActionSheet.Trigger',
			'Opens the action sheet.',
			actionSheetTriggerProps,
		),
		compound(
			'ActionSheet.Content',
			'Configures the presented sheet content.',
			actionSheetContentProps,
		),
		compound('ActionSheet.Group', 'Groups related actions.'),
		compound(
			'ActionSheet.Item',
			'Represents an action and its optional confirmation flow.',
			actionSheetItemProps,
		),
		compound('ActionSheet.Separator', 'Separates groups of actions.'),
	],
	alert: [
		compound('Alert.Icon', 'Holds the leading status icon.'),
		compound('Alert.Title', 'Displays the alert heading.'),
		compound('Alert.Description', 'Displays supporting alert copy.'),
		compound('Alert.Action', 'Holds an optional alert action.'),
	],
	'bottom-tabs': [
		compound('BottomTabs.Item', 'Declares a navigable tab destination.', [
			prop('asChild', 'boolean', 'Delegates rendering to the child.'),
			prop('icon', 'ReactNode', 'Tab icon.'),
			prop('label', 'string', 'Tab label.'),
			prop('value', 'string', 'Stable destination value.', true),
		]),
	],
	card: [
		compound('Card.Header', 'Groups title and description.'),
		compound('Card.Title', 'Displays the card heading.'),
		compound('Card.Description', 'Displays supporting card copy.'),
		compound('Card.Content', 'Holds the primary card content.'),
		compound('Card.Footer', 'Groups card actions.'),
		compound('Card.Separator', 'Separates card regions.', [
			prop('orientation', 'SeparatorOrientation', 'Direction of the divider.'),
		]),
	],
	checkbox: [
		compound('Checkbox.Group', 'Renders a controlled collection of choices.', [
			prop('data', 'ReadonlyArray<CheckboxItem>', 'Available group items.'),
			prop(
				'onChange',
				'(value: string[]) => void',
				'Called with the selected values.',
			),
			prop('value', 'string[]', 'Controlled selected values.'),
			prop('variant', 'CheckboxGroupVariant', 'Group presentation.'),
		]),
	],
	'dropdown-menu': [
		compound(
			'DropdownMenu.Trigger',
			'Opens the menu sheet.',
			actionSheetTriggerProps,
		),
		compound(
			'DropdownMenu.Content',
			'Configures the menu sheet content.',
			actionSheetContentProps,
		),
		compound('DropdownMenu.Group', 'Groups related menu items.'),
		compound(
			'DropdownMenu.Item',
			'Represents a standard menu action.',
			actionSheetItemProps,
		),
		compound(
			'DropdownMenu.CheckboxItem',
			'Represents a checkable menu action.',
			[
				...actionSheetItemProps,
				prop('checked', 'boolean', 'Controlled checked state.'),
			],
		),
		compound('DropdownMenu.RadioGroup', 'Groups radio menu items.', [
			prop('value', 'string', 'Controlled selected value.'),
		]),
		compound('DropdownMenu.RadioItem', 'Represents a radio menu action.', [
			...actionSheetItemProps,
			prop('value', 'string', 'Stable radio value.', true),
		]),
		compound('DropdownMenu.Label', 'Labels a group of menu items.'),
		compound('DropdownMenu.Separator', 'Separates groups of menu items.'),
		compound('DropdownMenu.Shortcut', 'Displays shortcut metadata.'),
		compound('DropdownMenu.Sub', 'Controls a nested menu.', [
			prop('children', 'ReactNode', 'Nested menu subtree.'),
			prop(
				'onChange',
				'(open: boolean) => void',
				'Called when nested visibility changes.',
			),
			prop('open', 'boolean', 'Controlled nested-menu visibility.'),
		]),
		compound(
			'DropdownMenu.SubTrigger',
			'Opens the nested menu.',
			actionSheetTriggerProps,
		),
		compound(
			'DropdownMenu.SubContent',
			'Configures nested menu content.',
			actionSheetContentProps,
		),
	],
	form: [
		compound('Form.Field', 'Connects a control with field metadata.', [
			prop('description', 'ReactNode', 'Supporting text.'),
			prop('error', 'ReactNode', 'Validation message.'),
			prop('label', 'ReactNode', 'Field label.'),
			prop('required', 'boolean', 'Marks the field as required.'),
		]),
		compound('Form.FieldLabel', 'Renders a standalone field label.', [
			prop('children', 'ReactNode', 'Label content.'),
			prop('description', 'ReactNode', 'Supporting text.'),
			prop('error', 'ReactNode', 'Validation message.'),
			prop('required', 'boolean', 'Displays the required indicator.'),
		]),
		compound('Form.FieldGroup', 'Arranges related fields.'),
		compound('Form.FieldSet', 'Groups fields under a legend.', [
			prop('legend', 'ReactNode', 'Group legend.'),
		]),
		compound('Form.FieldSeparator', 'Separates groups of fields.'),
	],
	grid: [
		compound('Grid.Item', 'Occupies columns inside Grid.', [
			prop('span', 'GridItemSpan', 'Number of columns occupied by the item.'),
		]),
	],
	layout: [
		compound('Layout.Header', 'Safe-area-aware screen header.', [
			prop('size', 'LayoutHeaderSize', 'Header height preset.'),
		]),
		compound('Layout.Content', 'Groups the main screen regions.'),
		compound('Layout.Main', 'Provides the scrollable screen body.'),
		compound('Layout.Footer', 'Safe-area-aware screen actions.'),
	],
	modal: [
		compound('Modal.Header', 'Groups modal heading content.'),
		compound('Modal.Title', 'Displays the modal title.'),
		compound('Modal.Description', 'Displays supporting modal copy.'),
		compound('Modal.Body', 'Holds the primary modal content.'),
		compound('Modal.Footer', 'Groups modal actions.'),
	],
	radio: [
		compound('Radio.Group', 'Renders a controlled single-choice collection.', [
			prop('data', 'ReadonlyArray<RadioItem>', 'Available group items.'),
			prop(
				'onChange',
				'(value: string) => void',
				'Called with the selected value.',
			),
			prop('value', 'string', 'Controlled selected value.'),
			prop('variant', 'RadioGroupVariant', 'Group presentation.'),
		]),
	],
	sheet: [
		compound('Sheet.Header', 'Groups sheet heading content.'),
		compound('Sheet.Title', 'Displays the sheet title.'),
		compound('Sheet.Description', 'Displays supporting sheet copy.'),
		compound('Sheet.Body', 'Holds the primary sheet content.'),
		compound('Sheet.Footer', 'Groups sheet actions.'),
	],
	stepper: [
		compound('Stepper.Step', 'Declares a step and its content.', [
			prop('allowStepClick', 'boolean', 'Allows activating this step.'),
			prop('allowStepSelect', 'boolean', 'Allows selecting this step.'),
			prop('children', 'ReactNode', 'Step content.'),
			prop('completedIcon', 'StepFragment', 'Completed-state marker.'),
			prop('description', 'ReactNode', 'Supporting step copy.'),
			prop('icon', 'StepFragment', 'Inactive-state marker.'),
			prop('label', 'ReactNode', 'Step label.'),
			prop('loading', 'boolean', 'Displays the pending state.'),
			prop('progressIcon', 'StepFragment', 'Active-state marker.'),
		]),
		compound(
			'Stepper.Previous',
			'Moves to the previous step.',
			stepperPreviousProps,
		),
		compound(
			'Stepper.Next',
			'Moves forward or completes the flow.',
			stepperNextProps,
		),
		compound('Stepper.Completed', 'Renders after the final step.', [
			prop('children', 'ReactNode', 'Completed-state content.'),
		]),
	],
	tabs: [
		compound('Tabs.List', 'Groups the available tab triggers.'),
		compound('Tabs.Trigger', 'Activates a tab value.', [
			prop('value', 'string', 'Trigger identifier.', true),
		]),
		compound('Tabs.Content', 'Renders content for the active value.', [
			prop('value', 'string', 'Content identifier.', true),
		]),
	],
}

type CompoundApiProp = readonly [
	name: string,
	type: string,
	required?: boolean,
]
const percentageStringType = [
	'number | `',
	'$',
	'{number}%`',
].join('')

const compoundApi: Record<
	string,
	Record<string, readonly CompoundApiProp[]>
> = {
	accordion: {
		'Accordion.Content': [],
		'Accordion.Item': [
			[
				'value',
				'string',
				true,
			],
			[
				'disabled',
				'boolean',
			],
		],
		'Accordion.Trigger': [],
	},
	'action-sheet': {
		'ActionSheet.Content': [
			[
				'side',
				'SheetSide',
			],
			[
				'size',
				'SheetSize',
			],
			[
				'title',
				'ReactNode',
			],
			[
				'description',
				'ReactNode',
			],
		],
		'ActionSheet.Group': [],
		'ActionSheet.Item': [
			[
				'variant',
				'ActionSheetItemVariant',
			],
			[
				'icon',
				'ReactNode',
			],
			[
				'rightSection',
				'ReactNode',
			],
			[
				'confirm',
				'ActionSheetItemConfirmProps',
			],
			[
				'onClick',
				'() => void',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'loading',
				'boolean',
			],
		],
		'ActionSheet.Separator': [],
		'ActionSheet.Trigger': [
			[
				'asChild',
				'boolean',
			],
		],
	},
	alert: {
		'Alert.Action': [],
		'Alert.Description': [],
		'Alert.Icon': [],
		'Alert.Title': [],
	},
	'bottom-tabs': {
		'BottomTabs.Item': [
			[
				'value',
				'string',
				true,
			],
			[
				'label',
				'string',
			],
			[
				'icon',
				'ReactNode',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'onClick',
				'() => void',
			],
			[
				'asChild',
				'boolean',
			],
			[
				'children',
				'ReactNode',
			],
		],
	},
	card: {
		'Card.Content': [],
		'Card.Description': [],
		'Card.Footer': [
			[
				'bordered',
				'boolean',
			],
		],
		'Card.Header': [
			[
				'bordered',
				'boolean',
			],
		],
		'Card.Separator': [],
		'Card.Title': [],
	},
	checkbox: {
		'Checkbox.Group': [
			[
				'items',
				'CheckboxItem[]',
				true,
			],
			[
				'value',
				'string[]',
			],
			[
				'defaultValue',
				'string[]',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'variant',
				'CheckboxGroupVariant',
			],
			[
				'onChange',
				'(value: string[]) => void',
			],
		],
	},
	'dropdown-menu': {
		'DropdownMenu.CheckboxItem': [
			[
				'checked',
				'boolean',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'onCheckedChange',
				'(checked: boolean) => void',
			],
		],
		'DropdownMenu.Content': [
			[
				'width',
				percentageStringType,
			],
			[
				'side',
				'DropdownMenuSide',
			],
			[
				'align',
				'DropdownMenuAlign',
			],
			[
				'sideOffset',
				'number',
			],
		],
		'DropdownMenu.Group': [],
		'DropdownMenu.Item': [
			[
				'variant',
				'DropdownMenuItemVariant',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'asChild',
				'boolean',
			],
			[
				'onClick',
				'() => void',
			],
		],
		'DropdownMenu.Label': [
			[
				'inset',
				'boolean',
			],
		],
		'DropdownMenu.RadioGroup': [
			[
				'value',
				'string',
			],
			[
				'onValueChange',
				'(value: string) => void',
			],
		],
		'DropdownMenu.RadioItem': [
			[
				'value',
				'string',
				true,
			],
			[
				'disabled',
				'boolean',
			],
		],
		'DropdownMenu.Separator': [],
		'DropdownMenu.Shortcut': [],
		'DropdownMenu.Sub': [],
		'DropdownMenu.SubContent': [],
		'DropdownMenu.SubTrigger': [
			[
				'inset',
				'boolean',
			],
		],
		'DropdownMenu.Trigger': [
			[
				'asChild',
				'boolean',
			],
		],
	},
	form: {
		'Form.Field': [
			[
				'label',
				'FormFieldLabelInput',
			],
			[
				'labelFloating',
				'boolean',
			],
			[
				'name',
				'string',
			],
			[
				'description',
				'ReactNode',
			],
			[
				'error',
				'ReactNode',
			],
		],
		'Form.FieldGroup': [
			[
				'children',
				'ReactNode',
				true,
			],
		],
		'Form.FieldLabel': [
			[
				'required',
				'boolean',
			],
			[
				'optional',
				'boolean',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'tooltip',
				'ReactNode',
			],
		],
		'Form.FieldSeparator': [
			[
				'children',
				'ReactNode',
			],
			[
				'surface',
				'FormFieldSeparatorSurface',
			],
		],
		'Form.FieldSet': [
			[
				'legend',
				'string',
			],
			[
				'tooltip',
				'FormFieldSetTooltip',
			],
		],
	},
	grid: {
		'Grid.Item': [
			[
				'span',
				'GridItemSpan',
			],
		],
	},
	layout: {
		'Layout.Content': [
			[
				'padding',
				'"sm" | "md" | "lg"',
			],
			[
				'paddingHorizontal',
				'"sm" | "md" | "lg"',
			],
			[
				'paddingVertical',
				'"sm" | "md" | "lg"',
			],
			[
				'maxWidth',
				'"sm" | "md" | "lg"',
			],
		],
		'Layout.Footer': [
			[
				'bordered',
				'boolean',
			],
			[
				'sticky',
				'boolean',
			],
			[
				'size',
				'"sm" | "md" | "lg"',
			],
		],
		'Layout.Header': [
			[
				'bordered',
				'boolean',
			],
			[
				'leftSection',
				'ReactNode',
			],
			[
				'rightSection',
				'ReactNode',
			],
			[
				'size',
				'LayoutHeaderSize',
			],
			[
				'sticky',
				'boolean',
			],
		],
		'Layout.Main': [],
	},
	modal: {
		'Modal.Body': [],
		'Modal.Description': [],
		'Modal.Footer': [
			[
				'bordered',
				'boolean',
			],
		],
		'Modal.Header': [
			[
				'closable',
				'boolean',
			],
			[
				'bordered',
				'boolean',
			],
		],
		'Modal.Title': [],
	},
	radio: {
		'Radio.Group': [
			[
				'items',
				'RadioItem[]',
				true,
			],
			[
				'value',
				'string',
			],
			[
				'defaultValue',
				'string',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'bordered',
				'boolean',
			],
			[
				'variant',
				'RadioGroupVariant',
			],
			[
				'onChange',
				'(value: string) => void',
			],
		],
	},
	sheet: {
		'Sheet.Body': [
			[
				'minHeight',
				'string | number',
			],
		],
		'Sheet.Description': [],
		'Sheet.Footer': [
			[
				'bordered',
				'boolean',
			],
		],
		'Sheet.Header': [
			[
				'closable',
				'boolean',
			],
			[
				'bordered',
				'boolean',
			],
		],
		'Sheet.Title': [],
	},
	stepper: {
		'Stepper.Completed': [
			[
				'children',
				'ReactNode',
			],
		],
		'Stepper.Next': [
			[
				'ariaLabel',
				'string',
			],
			[
				'form',
				'string',
			],
			[
				'type',
				'ButtonType',
			],
			[
				'size',
				'ButtonSize',
			],
			[
				'variant',
				'ButtonVariant',
			],
			[
				'leftSection',
				'ReactNode',
			],
			[
				'rightSection',
				'ReactNode',
			],
			[
				'block',
				'boolean',
			],
			[
				'loading',
				'boolean',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'asChild',
				'boolean',
			],
			[
				'lastChildren',
				'ReactNode',
			],
			[
				'onClick',
				'(event: unknown, currentStep: number) => void',
			],
			[
				'onLastClick',
				'() => void',
			],
			[
				'render',
				'(props: { disabled: boolean; isLast: boolean; onClick: () => void }) => ReactElement',
			],
			[
				'children',
				'ReactNode',
			],
		],
		'Stepper.Previous': [
			[
				'ariaLabel',
				'string',
			],
			[
				'form',
				'string',
			],
			[
				'type',
				'ButtonType',
			],
			[
				'size',
				'ButtonSize',
			],
			[
				'variant',
				'ButtonVariant',
			],
			[
				'leftSection',
				'ReactNode',
			],
			[
				'rightSection',
				'ReactNode',
			],
			[
				'block',
				'boolean',
			],
			[
				'loading',
				'boolean',
			],
			[
				'disabled',
				'boolean',
			],
			[
				'asChild',
				'boolean',
			],
			[
				'onClick',
				'(event: unknown, currentStep: number) => void',
			],
			[
				'render',
				'(props: { disabled: boolean; onClick: () => void }) => ReactElement',
			],
			[
				'children',
				'ReactNode',
			],
		],
		'Stepper.Step': [
			[
				'allowStepClick',
				'boolean',
			],
			[
				'allowStepSelect',
				'boolean',
			],
			[
				'children',
				'ReactNode',
			],
			[
				'completedIcon',
				'StepFragment',
			],
			[
				'description',
				'ReactNode',
			],
			[
				'icon',
				'StepFragment',
			],
			[
				'label',
				'ReactNode',
			],
			[
				'loading',
				'boolean',
			],
			[
				'progressIcon',
				'StepFragment',
			],
		],
	},
	tabs: {
		'Tabs.Content': [
			[
				'value',
				'string',
				true,
			],
		],
		'Tabs.List': [
			[
				'variant',
				'TabsVariant',
			],
			[
				'justified',
				'boolean',
			],
		],
		'Tabs.Trigger': [
			[
				'value',
				'string',
				true,
			],
			[
				'icon',
				'ReactNode',
			],
			[
				'disabled',
				'boolean',
			],
		],
	},
}

const compoundPropDescriptions: Record<string, string> = {
	tooltip: 'Conteúdo de ajuda aberto em um popover acionado por toque.',
}

for (const [slug, components] of Object.entries(compoundApi)) {
	for (const component of reactMobileCompoundDocs[slug] ?? []) {
		const specification = components[component.name]
		if (!specification) {
			continue
		}
		component.props = specification.map(([name, type, required]) =>
			prop(
				name,
				type,
				compoundPropDescriptions[name] ?? `Configura ${name}.`,
				required,
			),
		)
	}
}

export function getReactMobileCompoundDocs(slug: string) {
	return reactMobileCompoundDocs[slug] ?? []
}
