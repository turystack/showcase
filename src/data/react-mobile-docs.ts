export type MobilePropDoc = {
	default?: string
	description: string
	name: string
	required?: boolean
	type: string
}

export type MobileOptionDoc = {
	default?: string
	name: string
	values: string[]
}

export type MobileContractDoc = {
	description?: string
	name: string
	props: MobilePropDoc[]
}

export type MobileComponentDoc = {
	category: MobileComponentCategory
	compound?: string[]
	contracts?: MobileContractDoc[]
	description: string
	name: string
	nativeNote?: string
	options?: MobileOptionDoc[]
	props: MobilePropDoc[]
	slug: string
}

export type MobileComponentCategory =
	| 'Content'
	| 'Core'
	| 'Feedback'
	| 'Forms'
	| 'Layout'
	| 'Overlays & navigation'

const prop = (
	name: string,
	type: string,
	description: string,
	config?: Pick<MobilePropDoc, 'default' | 'required'>,
): MobilePropDoc => ({
	description,
	name,
	type,
	...config,
})

const option = (
	name: string,
	values: string[],
	defaultValue?: string,
): MobileOptionDoc => ({
	default: defaultValue,
	name,
	values,
})

const contract = (
	name: string,
	props: MobilePropDoc[],
	description?: string,
): MobileContractDoc => ({
	description,
	name,
	props,
})

const buttonContract = contract(
	'ButtonProps',
	[
		prop('ariaLabel', 'string', 'Accessible name for icon-only buttons.'),
		prop(
			'asChild',
			'boolean',
			'Delegates rendering to the child through Slot.',
		),
		prop('block', 'boolean', 'Fills the available width.'),
		prop('children', 'ReactNode', 'Button label or custom content.'),
		prop('disabled', 'boolean', 'Prevents interaction.'),
		prop('leftSection', 'ReactNode', 'Content before the label.'),
		prop(
			'loading',
			'boolean',
			'Disables interaction and shows pending content.',
		),
		prop(
			'onClick',
			'((event: GestureResponderEvent) => void) | null',
			'Compatibility alias for onPress.',
		),
		prop(
			'onPress',
			'((event: GestureResponderEvent) => void) | null',
			'Called when the button is pressed.',
		),
		prop('rightSection', 'ReactNode', 'Content after the label.'),
		prop('size', 'ButtonSize', 'Touch target and content scale.'),
		prop('variant', 'ButtonVariant', 'Visual treatment.'),
	],
	'Semantic configuration accepted by Button-based actions.',
)

const actionSheetItemConfirmContract = contract(
	'ActionSheetItemConfirmProps',
	[
		prop('cancelProps', 'ButtonProps', 'Cancel button configuration.'),
		prop('cancelText', 'ReactNode', 'Cancel action label.'),
		prop('confirmProps', 'ButtonProps', 'Confirm button configuration.'),
		prop('confirmText', 'ReactNode', 'Confirm action label.'),
		prop('description', 'ReactNode', 'Supporting explanation.'),
		prop('onConfirm', '() => void', 'Called by the confirm action.'),
		prop('side', 'SheetSide', 'Presentation edge.'),
		prop('size', 'SheetSize', 'Sheet extent.'),
		prop('title', 'ReactNode', 'Confirmation title.'),
	],
	'Confirmation configuration attached to an action item.',
)

const checkboxItemContract = contract(
	'CheckboxItem',
	[
		prop('disabled', 'boolean', 'Prevents selecting this item.'),
		prop('label', 'ReactNode', 'Visible item label.', {
			required: true,
		}),
		prop('value', 'string', 'Stable item value.', {
			required: true,
		}),
	],
	'Item accepted by Checkbox.Group data.',
)

const currencyInputMultipleValueContract = contract(
	'CurrencyInputMultipleValue',
	[
		prop('max', 'number', 'Upper monetary value.'),
		prop('min', 'number', 'Lower monetary value.'),
	],
	'Value used when CurrencyInput mode is multiple.',
)

const dateRangeContract = contract(
	'DateRange',
	[
		prop('from', 'Date', 'Start of the selected range.'),
		prop('to', 'Date', 'End of the selected range.'),
	],
	'Date interval used by range-capable components.',
)

const dateRangeInputPresetContract = contract(
	'DateRangeInputPreset',
	[
		prop('label', 'string', 'Visible preset name.', {
			required: true,
		}),
		prop('value', 'DateRange', 'Range applied by the preset.', {
			required: true,
		}),
	],
	'Named reusable range displayed by DateRangeInput.',
)

const selectInfiniteContract = contract(
	'SelectInfiniteProps',
	[
		prop('hasMore', 'boolean', 'Whether another page can be loaded.'),
		prop('loadingMore', 'boolean', 'Whether the next page is loading.'),
		prop(
			'loadingMoreText',
			'string',
			'Text displayed while the next page loads.',
		),
		prop('onLoadMore', '() => void', 'Requests the next page of options.'),
	],
	'Load-more behavior supplied through the Select infinite prop.',
)

const sliderSingleContract = contract(
	'SliderSingleProps',
	[
		prop('mode', '"single"', 'Selects a single numeric value.', {
			required: true,
		}),
		prop('value', 'number', 'Controlled value.'),
		prop('defaultValue', 'number', 'Initial uncontrolled value.'),
		prop(
			'onValueChange',
			'(value: number) => void',
			'Called when the value changes.',
		),
	],
	'Single-thumb Slider contract.',
)

const sliderRangeContract = contract(
	'SliderRangeProps',
	[
		prop('mode', '"range"', 'Selects a numeric interval.', {
			required: true,
		}),
		prop('value', '[number, number]', 'Controlled lower and upper values.'),
		prop(
			'defaultValue',
			'[number, number]',
			'Initial uncontrolled lower and upper values.',
		),
		prop(
			'onValueChange',
			'(value: [number, number]) => void',
			'Called when either range boundary changes.',
		),
	],
	'Two-boundary Slider contract.',
)

const inputProps = [
	prop('leftSection', 'ReactNode', 'Content rendered before the field value.'),
	prop('rightSection', 'ReactNode', 'Content rendered after the field value.'),
	prop('size', '"sm" | "md" | "lg"', 'Controls the field height and spacing.'),
	prop(
		'variant',
		'"default" | "error" | "filled"',
		'Controls the visual state of the field.',
	),
]

const currencyInputBaseProps = [
	prop('currency', 'Currency', 'ISO currency code.'),
	prop('disabled', 'boolean', 'Prevents editing.'),
	...inputProps,
]

const currencyInputSingleContract = contract(
	'CurrencyInputSingleProps',
	[
		...currencyInputBaseProps,
		prop('mode', '"single"', 'Edits one monetary value.', {
			required: true,
		}),
		prop('value', 'number', 'Controlled monetary value.'),
		prop('defaultValue', 'number', 'Initial uncontrolled monetary value.'),
		prop(
			'onValueChange',
			'(value?: number) => void',
			'Called when the monetary value changes.',
		),
	],
	'Single-value CurrencyInput contract.',
)

const currencyInputMultipleContract = contract(
	'CurrencyInputMultipleProps',
	[
		...currencyInputBaseProps,
		prop('mode', '"multiple"', 'Edits minimum and maximum values.', {
			required: true,
		}),
		prop(
			'value',
			'CurrencyInputMultipleValue',
			'Controlled minimum and maximum values.',
		),
		prop(
			'defaultValue',
			'CurrencyInputMultipleValue',
			'Initial uncontrolled minimum and maximum values.',
		),
		prop('minPlaceholder', 'string', 'Placeholder for the minimum field.'),
		prop('maxPlaceholder', 'string', 'Placeholder for the maximum field.'),
		prop(
			'onValueChange',
			'(value: CurrencyInputMultipleValue) => void',
			'Called when either monetary value changes.',
		),
	],
	'Multiple-value CurrencyInput contract.',
)

const uploaderBaseProps = [
	prop('accept', 'string', 'Accepted MIME types or extensions.'),
	prop('disabled', 'boolean', 'Prevents file selection.'),
	prop(
		'handler',
		'(fileName: string) => Promise<UploaderHandlerResponse>',
		'Returns the signed upload configuration for a file.',
		{
			required: true,
		},
	),
	prop('label', 'ReactNode', 'Picker action label.'),
	prop('maxFiles', 'number', 'Maximum number of selected files.'),
	prop('maxFileSize', 'number', 'Maximum size of each file in bytes.'),
]

const uploadContract = contract(
	'Upload',
	[
		prop('fields', 'Record<string, string>', 'Signed form fields.', {
			required: true,
		}),
		prop('url', 'string', 'Destination URL for the upload.', {
			required: true,
		}),
	],
	'Signed upload destination returned by the handler.',
)

const uploaderHandlerResponseContract = contract(
	'UploaderHandlerResponse',
	[
		prop('cdnUrl', 'string', 'Public URL of the uploaded asset.', {
			required: true,
		}),
		prop('expiresIn', 'number', 'Signed upload lifetime in seconds.', {
			required: true,
		}),
		prop('key', 'string', 'Storage key assigned to the asset.', {
			required: true,
		}),
		prop('upload', 'Upload', 'Signed upload destination and fields.', {
			required: true,
		}),
	],
	'Response returned by Uploader.handler.',
)

const singleUploaderContract = contract(
	'SingleUploaderProps',
	[
		...uploaderBaseProps,
		prop('mode', '"single"', 'Uploads one selected file.', {
			required: true,
		}),
		prop(
			'onUpload',
			'(response: UploaderHandlerResponse, index: number) => void',
			'Called after the file upload completes.',
		),
	],
	'Single-file Uploader contract.',
)

const multipleUploaderContract = contract(
	'MultipleUploaderProps',
	[
		...uploaderBaseProps,
		prop('mode', '"multiple"', 'Uploads multiple selected files.', {
			required: true,
		}),
		prop(
			'onUpload',
			'(responses: UploaderHandlerResponse[], index: number) => void',
			'Called with accumulated successful uploads.',
		),
	],
	'Multiple-file Uploader contract.',
)

const dateProps = [
	prop('value', 'Date', 'Controlled date value.'),
	prop(
		'onChange',
		'(value: Date) => void',
		'Called when the native value changes.',
	),
	prop('minimumDate', 'Date', 'Smallest selectable date.'),
	prop('maximumDate', 'Date', 'Largest selectable date.'),
	prop('mode', '"date" | "datetime" | "time"', 'Native picker mode.'),
]

const sheetOptions = [
	option('side', [
		'bottom',
		'left',
		'right',
		'top',
	]),
	option('size', [
		'sm',
		'md',
		'lg',
		'full',
	]),
]

export const reactMobileDocs: MobileComponentDoc[] = [
	{
		category: 'Core',
		description:
			'Composes the theme, color scheme, and portal host required by the mobile kit.',
		name: 'TuryProvider',
		nativeNote:
			'Mount once near the root of the Expo application, inside the gesture-handler root when sheets are used.',
		options: [
			option(
				'defaultColorScheme',
				[
					'system',
					'dark',
					'light',
				],
				'system',
			),
			option(
				'theme',
				[
					'default',
				],
				'default',
			),
		],
		props: [
			prop('children', 'ReactNode', 'Application subtree.', {
				required: true,
			}),
			prop(
				'defaultColorScheme',
				'ColorScheme',
				'Initial light, dark, or system scheme.',
			),
			prop('portalHostName', 'string', 'Portal host used by modal surfaces.'),
			prop(
				'theme',
				'Theme',
				'Semantic token preset used by the native components.',
			),
		],
		slug: 'tury-provider',
	},
	{
		category: 'Core',
		description:
			'Provides semantic visual tokens to the native component tree.',
		name: 'ThemeProvider',
		options: [
			option(
				'defaultTheme',
				[
					'default',
				],
				'default',
			),
		],
		props: [
			prop('children', 'ReactNode', 'Component subtree.', {
				required: true,
			}),
			prop('defaultTheme', 'Theme', 'Initial semantic token preset.'),
		],
		slug: 'theme-provider',
	},
	{
		category: 'Core',
		description:
			'Keeps the application color scheme synchronized with the operating system.',
		name: 'ColorSchemeProvider',
		options: [
			option(
				'defaultColorScheme',
				[
					'system',
					'dark',
					'light',
				],
				'system',
			),
		],
		props: [
			prop('children', 'ReactNode', 'Component subtree.', {
				required: true,
			}),
			prop(
				'defaultColorScheme',
				'ColorScheme',
				'Initial appearance preference.',
			),
		],
		slug: 'color-scheme-provider',
	},
	{
		category: 'Core',
		description:
			'Touch control for switching between light, dark, and system appearance.',
		name: 'ColorSchemeSwitcher',
		options: [
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop(
				'size',
				'ColorSchemeSwitcherSize',
				'Controls the touch target and icon size.',
			),
		],
		slug: 'color-scheme-switcher',
	},
	{
		category: 'Layout',
		description:
			'Semantic wrapper around React Native View for common surface properties.',
		name: 'Box',
		options: [
			option('bg', [
				'background',
				'card',
				'muted',
			]),
			option('padding', [
				'none',
				'xs',
				'sm',
				'md',
				'lg',
				'xl',
			]),
			option('rounded', [
				'none',
				'sm',
				'md',
				'lg',
				'xl',
				'full',
			]),
			option('position', [
				'static',
				'relative',
				'absolute',
			]),
		],
		props: [
			prop('bg', 'BoxBg', 'Semantic surface color.'),
			prop('grow', 'boolean', 'Fills available flex space.'),
			prop('minHeight', 'BoxMinHeight', 'Semantic minimum height.'),
			prop('overflow', 'BoxOverflow', 'Overflow behavior.'),
			prop('padding', 'BoxPadding', 'Padding on every side.'),
			prop('paddingX', 'BoxPadding', 'Horizontal padding.'),
			prop('paddingY', 'BoxPadding', 'Vertical padding.'),
			prop('position', 'BoxPosition', 'Positioning mode.'),
			prop('rounded', 'BoxRounded', 'Corner radius.'),
			prop('textAlign', 'BoxTextAlign', 'Inherited text alignment.'),
			prop('width', '"auto" | "full"', 'Semantic width.'),
		],
		slug: 'box',
	},
	{
		category: 'Layout',
		description:
			'Constrains screen content and applies consistent horizontal gutters.',
		name: 'Container',
		options: [
			option('maxWidth', [
				'xs',
				'sm',
				'md',
				'lg',
				'xl',
			]),
			option('textAlign', [
				'left',
				'center',
				'right',
			]),
		],
		props: [
			prop('maxWidth', 'ContainerMaxWidth', 'Maximum content width.'),
			prop('textAlign', 'ContainerTextAlign', 'Inherited text alignment.'),
		],
		slug: 'container',
	},
	{
		category: 'Layout',
		description: 'Arranges native views using a semantic flexbox API.',
		name: 'Flex',
		options: [
			option('direction', [
				'row',
				'row-reverse',
				'column',
				'column-reverse',
			]),
			option('align', [
				'start',
				'center',
				'end',
				'stretch',
				'baseline',
			]),
			option('justify', [
				'start',
				'center',
				'end',
				'between',
				'around',
				'evenly',
			]),
			option('wrap', [
				'nowrap',
				'wrap',
				'wrap-reverse',
			]),
		],
		props: [
			prop('direction', 'FlexDirection', 'Main-axis direction.'),
			prop('align', 'FlexAlign', 'Cross-axis alignment.'),
			prop('justify', 'FlexJustify', 'Main-axis distribution.'),
			prop(
				'gap',
				'number | "sm" | "md" | "lg" | "xl"',
				'Space between children.',
			),
			prop('minHeight', 'FlexMinHeight', 'Semantic minimum height.'),
			prop('wrap', 'FlexWrap', 'Wrapping behavior.'),
		],
		slug: 'flex',
	},
	{
		category: 'Layout',
		compound: [
			'Grid.Item',
		],
		description: 'Multi-column layout primitive with explicit item spans.',
		name: 'Grid',
		options: [
			option('cols', [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'12',
			]),
		],
		props: [
			prop('cols', 'GridCols', 'Number of columns.'),
			prop('gap', 'GridGap', 'Space between rows and columns.'),
		],
		slug: 'grid',
	},
	{
		category: 'Layout',
		compound: [
			'Layout.Header',
			'Layout.Content',
			'Layout.Main',
			'Layout.Footer',
		],
		description: 'Composes the structural regions of a native screen.',
		name: 'Layout',
		options: [
			option('Layout.Header size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [],
		slug: 'layout',
	},
	{
		category: 'Layout',
		description: 'Horizontal or vertical divider between native surfaces.',
		name: 'Separator',
		options: [
			option(
				'orientation',
				[
					'horizontal',
					'vertical',
				],
				'horizontal',
			),
		],
		props: [
			prop('orientation', 'SeparatorOrientation', 'Direction of the divider.'),
		],
		slug: 'separator',
	},
	{
		category: 'Forms',
		description:
			'Pressable action with semantic variants, sizes, and loading behavior.',
		name: 'Button',
		options: [
			option('variant', [
				'default',
				'dark',
				'dashed',
				'destructive',
				'ghost',
				'link',
				'link-muted',
				'outline',
				'secondary',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
				'icon-xs',
				'icon-sm',
				'icon-md',
				'icon-lg',
			]),
		],
		props: buttonContract.props,
		slug: 'button',
	},
	{
		category: 'Forms',
		compound: [
			'Checkbox.Group',
		],
		contracts: [
			checkboxItemContract,
		],
		description:
			'Boolean control and multi-value group with touch-friendly cards.',
		name: 'Checkbox',
		options: [
			option('size', [
				'sm',
				'md',
				'lg',
			]),
			option('Checkbox.Group variant', [
				'default',
				'cards',
			]),
		],
		props: [
			prop('checked', 'boolean', 'Controlled checked state.'),
			prop(
				'onCheckedChange',
				'(checked: boolean) => void',
				'Called when checked state changes.',
			),
			prop('label', 'ReactNode', 'Label displayed beside the control.'),
			prop('size', 'CheckboxSize', 'Control and touch-target size.'),
		],
		slug: 'checkbox',
	},
	{
		category: 'Forms',
		description: 'Touch-friendly color selection from a controlled palette.',
		name: 'ColorPicker',
		options: [
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop('colors', 'string[]', 'Selectable color values.'),
			prop('value', 'string', 'Controlled selected color.'),
			prop(
				'onChange',
				'(color: string) => void',
				'Called when a color is selected.',
			),
			prop('size', 'ColorPickerSize', 'Control size.'),
		],
		slug: 'color-picker',
	},
	{
		category: 'Forms',
		contracts: [
			currencyInputMultipleValueContract,
			currencyInputSingleContract,
			currencyInputMultipleContract,
		],
		description: 'Numeric input specialized for localized monetary values.',
		name: 'CurrencyInput',
		options: [
			option('mode', [
				'single',
				'multiple',
			]),
			option('currency', [
				'BRL',
				'EUR',
				'USD',
				'custom',
			]),
		],
		props: [
			...currencyInputBaseProps,
			prop(
				'mode',
				'"single" | "multiple"',
				'Controls whether one or two monetary values are edited.',
				{
					required: true,
				},
			),
			prop(
				'value',
				'number | CurrencyInputMultipleValue',
				'Controlled value matching the selected mode.',
			),
			prop(
				'defaultValue',
				'number | CurrencyInputMultipleValue',
				'Initial uncontrolled value matching the selected mode.',
			),
			prop(
				'onValueChange',
				'((value?: number) => void) | ((value: CurrencyInputMultipleValue) => void)',
				'Called with the value shape selected by mode.',
			),
			prop('minPlaceholder', 'string', 'Placeholder for the minimum field.'),
			prop('maxPlaceholder', 'string', 'Placeholder for the maximum field.'),
		],
		slug: 'currency-input',
	},
	{
		category: 'Forms',
		description: 'Semantic date field backed by the platform picker.',
		name: 'DateInput',
		nativeNote: 'Uses the native date picker rather than an HTML date input.',
		options: [
			option(
				'mode',
				[
					'date',
					'datetime',
					'time',
				],
				'date',
			),
		],
		props: dateProps,
		slug: 'date-input',
	},
	{
		category: 'Forms',
		description: 'Direct wrapper around the platform date and time picker.',
		name: 'DateNativeInput',
		nativeNote:
			'Maps directly to @react-native-community/datetimepicker behavior on iOS and Android.',
		options: [
			option('mode', [
				'date',
				'datetime',
				'time',
			]),
		],
		props: dateProps,
		slug: 'date-native-input',
	},
	{
		category: 'Forms',
		contracts: [
			dateRangeContract,
			dateRangeInputPresetContract,
		],
		description:
			'Controlled start and end date selection with optional presets.',
		name: 'DateRangeInput',
		props: [
			prop('value', 'DateRange', 'Controlled { from, to } value.'),
			prop(
				'onChange',
				'(range: DateRange) => void',
				'Called when either range boundary changes.',
			),
			prop('presets', 'DateRangeInputPreset[]', 'Named reusable date ranges.'),
		],
		slug: 'date-range-input',
	},
	{
		category: 'Forms',
		description: 'Date and time selection using the native picker contract.',
		name: 'DateTimeInput',
		options: [
			option(
				'mode',
				[
					'date',
					'datetime',
					'time',
				],
				'datetime',
			),
		],
		props: dateProps,
		slug: 'date-time-input',
	},
	{
		category: 'Forms',
		description: 'Masked document entry for CPF, CNPJ, or a custom document.',
		name: 'DocumentInput',
		options: [
			option('documentType', [
				'cpf',
				'cnpj',
				'other',
			]),
		],
		props: [
			prop('documentType', 'DocumentType', 'Mask and normalization strategy.'),
			prop(
				'onValueChange',
				'(value: string) => void',
				'Called with the document value.',
			),
			...inputProps,
		],
		slug: 'document-input',
	},
	{
		category: 'Forms',
		compound: [
			'Form.Field',
			'Form.FieldLabel',
			'Form.FieldGroup',
			'Form.FieldSet',
			'Form.FieldSeparator',
		],
		description:
			'Composable field layout for labels, validation, descriptions, and groups.',
		name: 'Form',
		options: [
			option('Form.FieldSeparator surface', [
				'default',
				'muted',
			]),
		],
		props: [],
		slug: 'form',
	},
	{
		category: 'Forms',
		description:
			'Base React Native text field with semantic sections and states.',
		name: 'Input',
		options: [
			option('variant', [
				'default',
				'error',
				'filled',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: inputProps,
		slug: 'input',
	},
	{
		category: 'Forms',
		description:
			'Accessible field label with description, error, and required state.',
		name: 'Label',
		props: [
			prop('children', 'ReactNode', 'Label content.'),
			prop('description', 'ReactNode', 'Supporting text.'),
			prop('error', 'ReactNode', 'Validation message.'),
			prop('required', 'boolean', 'Displays the required indicator.'),
		],
		slug: 'label',
	},
	{
		category: 'Forms',
		description: 'Text input that applies a display mask while editing.',
		name: 'MaskInput',
		props: [
			prop('mask', 'string', 'Mask expression applied to the value.'),
			...inputProps,
		],
		slug: 'mask-input',
	},
	{
		category: 'Forms',
		description:
			'Numeric field with parsed value and minimum/maximum constraints.',
		name: 'NumberInput',
		props: [
			prop('value', 'number', 'Controlled numeric value.'),
			prop(
				'onValueChange',
				'(value?: number) => void',
				'Called with the parsed number.',
			),
			prop('min', 'number', 'Minimum accepted value.'),
			prop('max', 'number', 'Maximum accepted value.'),
			...inputProps,
		],
		slug: 'number-input',
	},
	{
		category: 'Forms',
		description: 'One-time-password input optimized for mobile keyboard entry.',
		name: 'OTPInput',
		options: [
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop(
				'pattern',
				'number[]',
				'Digit count per visual group, such as [3, 3].',
			),
			prop('size', 'OTPInputSize', 'Cell size.'),
			prop('value', 'string | null', 'Controlled OTP value.'),
			prop('defaultValue', 'string | null', 'Initial uncontrolled OTP value.'),
			prop(
				'onChange',
				'(value: string | null) => void',
				'Called with the complete value or null when empty.',
			),
		],
		slug: 'otp-input',
	},
	{
		category: 'Forms',
		description: 'Secure text field with optional password-strength feedback.',
		name: 'PasswordInput',
		props: [
			prop('showStrength', 'boolean', 'Displays the computed strength meter.'),
			...inputProps,
		],
		slug: 'password-input',
	},
	{
		category: 'Forms',
		description: 'Phone entry that emits a normalized string value.',
		name: 'PhoneInput',
		props: [
			prop(
				'onValueChange',
				'(value: string) => void',
				'Called with the normalized phone value.',
			),
			...inputProps,
		],
		slug: 'phone-input',
	},
	{
		category: 'Forms',
		compound: [
			'Radio.Group',
		],
		description: 'Single selection control and data-driven group.',
		name: 'Radio',
		options: [
			option('Radio.Group variant', [
				'default',
				'cards',
			]),
		],
		props: [
			prop('checked', 'boolean', 'Controlled checked state.'),
			prop('label', 'ReactNode', 'Control label.'),
		],
		slug: 'radio',
	},
	{
		category: 'Forms',
		description: 'Touch rating control with a configurable item count.',
		name: 'Rating',
		props: [
			prop('count', 'number', 'Number of rating items.'),
			prop('value', 'number', 'Controlled rating.'),
			prop(
				'onChange',
				'(value: number) => void',
				'Called when the rating changes.',
			),
		],
		slug: 'rating',
	},
	{
		category: 'Forms',
		contracts: [
			selectInfiniteContract,
		],
		description:
			'Single or multiple selection exposed as Select and presented internally as a Sheet.',
		name: 'Select',
		nativeNote:
			'The public name remains Select; opening it presents a gesture-friendly Sheet on mobile.',
		options: [
			option('mode', [
				'single',
				'multiple',
			]),
			option('variant', [
				'default',
				'ghost',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop('mode', '"single" | "multiple"', 'Selection mode.', {
				required: true,
			}),
			prop('options', 'T[]', 'Available options.', {
				required: true,
			}),
			prop(
				'optionLabel',
				'keyof T | ((option: T) => string)',
				'Extracts the visible label.',
				{
					required: true,
				},
			),
			prop(
				'optionValue',
				'keyof T | ((option: T) => O)',
				'Extracts the stable value.',
				{
					required: true,
				},
			),
			prop(
				'optionGroup',
				'keyof T | ((option: T) => string)',
				'Extracts an optional group.',
			),
			prop('value', 'I | null | I[]', 'Controlled selected value.'),
			prop('defaultValue', 'I | null | I[]', 'Initial uncontrolled value.'),
			prop(
				'onChange',
				'(value: O | null | O[]) => void',
				'Called when selection changes.',
			),
			prop('debounce', 'boolean', 'Debounces search updates.'),
			prop('disabled', 'boolean', 'Prevents opening and changing selection.'),
			prop(
				'emptySection',
				'ReactNode',
				'Content rendered when no option matches.',
			),
			prop('leftSection', 'ReactNode', 'Content before the selected value.'),
			prop('loading', 'boolean', 'Displays the loading state.'),
			prop('placeholder', 'string', 'Text displayed without a selection.'),
			prop('searchable', 'boolean', 'Enables the search field.'),
			prop(
				'searchPlaceholder',
				'string',
				'Placeholder displayed by the search field.',
			),
			prop('searchValue', 'string', 'Controlled search query.'),
			prop(
				'onSearchChange',
				'(query: string) => void',
				'Called when search changes.',
			),
			prop('clearable', 'boolean', 'Allows clearing the selection.'),
			prop('infinite', 'SelectInfiniteProps', 'Load-more behavior.'),
			prop('rightSection', 'ReactNode', 'Content after the selected value.'),
			prop('size', 'SelectSize', 'Control and sheet density.'),
			prop('variant', 'SelectVariant', 'Visual treatment.'),
			prop(
				'renderOption',
				'(option: T) => ReactNode',
				'Custom option renderer.',
			),
			prop(
				'renderValue',
				'(option: T) => ReactNode',
				'Custom selected-value renderer.',
			),
		],
		slug: 'select',
	},
	{
		category: 'Forms',
		contracts: [
			sliderSingleContract,
			sliderRangeContract,
		],
		description:
			'Continuous or stepped value selection using the native slider.',
		name: 'Slider',
		options: [
			option('mode', [
				'single',
				'range',
			]),
			option('orientation', [
				'horizontal',
				'vertical',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop('disabled', 'boolean', 'Prevents value changes.'),
			prop('mode', '"single" | "range"', 'Selects one value or a range.', {
				required: true,
			}),
			prop('orientation', 'SliderOrientation', 'Direction of the control.', {
				required: true,
			}),
			prop('size', 'SliderSize', 'Track and thumb size.'),
			prop(
				'value',
				'number | [number, number]',
				'Controlled value matching the selected mode.',
			),
			prop(
				'defaultValue',
				'number | [number, number]',
				'Initial uncontrolled value matching the selected mode.',
			),
			prop(
				'onValueChange',
				'((value: number) => void) | ((value: [number, number]) => void)',
				'Called with the value shape selected by mode.',
			),
		],
		slug: 'slider',
	},
	{
		category: 'Forms',
		description: 'Boolean setting control built on the native Switch.',
		name: 'Switch',
		options: [
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop('label', 'ReactNode', 'Text rendered beside the switch.'),
			prop('size', 'SwitchSize', 'Visual and touch-target size.'),
		],
		slug: 'switch',
	},
	{
		category: 'Forms',
		description: 'Text entry for adding and removing multiple string values.',
		name: 'TagsInput',
		props: [
			prop('value', 'string[]', 'Controlled tags.'),
			prop(
				'onValueChange',
				'(value: string[]) => void',
				'Called when tags change.',
			),
			...inputProps,
		],
		slug: 'tags-input',
	},
	{
		category: 'Forms',
		description: 'Multi-line native text field sharing the Input contract.',
		name: 'Textarea',
		options: [
			option('variant', [
				'default',
				'error',
				'filled',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: inputProps,
		slug: 'textarea',
	},
	{
		category: 'Forms',
		description: 'Time selection through the platform picker.',
		name: 'TimeInput',
		options: [
			option(
				'mode',
				[
					'date',
					'datetime',
					'time',
				],
				'time',
			),
		],
		props: dateProps,
		slug: 'time-input',
	},
	{
		category: 'Forms',
		contracts: [
			uploadContract,
			uploaderHandlerResponseContract,
			singleUploaderContract,
			multipleUploaderContract,
		],
		description:
			'Native document picker with a signed-upload handler lifecycle.',
		name: 'Uploader',
		nativeNote:
			'Uses expo-document-picker for selection, calls handler with each file name, and posts the asset to the returned signed destination.',
		options: [
			option('mode', [
				'single',
				'multiple',
			]),
		],
		props: [
			...uploaderBaseProps,
			prop(
				'mode',
				'"single" | "multiple"',
				'Controls whether one or multiple files are selected.',
				{
					required: true,
				},
			),
			prop(
				'onUpload',
				'((response: UploaderHandlerResponse, index: number) => void) | ((responses: UploaderHandlerResponse[], index: number) => void)',
				'Called with the response shape selected by mode.',
			),
		],
		slug: 'uploader',
	},
	{
		category: 'Content',
		compound: [
			'Accordion.Item',
			'Accordion.Trigger',
			'Accordion.Content',
		],
		description: 'Expandable single or multiple content sections.',
		name: 'Accordion',
		options: [
			option('type', [
				'single',
				'multiple',
			]),
		],
		props: [
			prop('type', 'AccordionType', 'Single or multiple open items.'),
			prop('value', 'string | string[]', 'Controlled open item values.'),
			prop('defaultValue', 'string | string[]', 'Initial uncontrolled values.'),
			prop(
				'onValueChange',
				'(value: string | string[]) => void',
				'Called when open items change.',
			),
		],
		slug: 'accordion',
	},
	{
		category: 'Content',
		description: 'Displays a profile image or a fallback value.',
		name: 'Avatar',
		options: [
			option('variant', [
				'circle',
				'rounded',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
				'xl',
			]),
		],
		props: [
			prop('src', "ImageProps['source']", 'Native image source.'),
			prop('alt', 'string', 'Accessible image label.'),
			prop('fallback', 'ReactNode', 'Rendered when no image is available.'),
			prop('variant', 'AvatarVariant', 'Shape treatment.'),
			prop('size', 'AvatarSize', 'Avatar dimensions.'),
		],
		slug: 'avatar',
	},
	{
		category: 'Content',
		description: 'Compact semantic status or metadata label.',
		name: 'Badge',
		options: [
			option('variant', [
				'default',
				'destructive',
				'outline',
				'secondary',
			]),
			option('align', [
				'left',
				'center',
				'right',
			]),
		],
		props: [
			prop('variant', 'BadgeVariant', 'Visual intent.'),
			prop('align', 'BadgeAlign', 'Text alignment.'),
			prop('loading', 'boolean', 'Displays a pending state.'),
		],
		slug: 'badge',
	},
	{
		category: 'Content',
		contracts: [
			dateRangeContract,
		],
		description: 'Single-date or date-range selection using native inputs.',
		name: 'Calendar',
		options: [
			option('mode', [
				'single',
				'range',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop('mode', '"single" | "range"', 'Selection mode.'),
			prop('value', 'Date | DateRange', 'Controlled selection.'),
			prop('onChange', '(value) => void', 'Called when selection changes.'),
		],
		slug: 'calendar',
	},
	{
		category: 'Content',
		compound: [
			'Card.Header',
			'Card.Title',
			'Card.Description',
			'Card.Content',
			'Card.Footer',
			'Card.Separator',
		],
		description: 'Surface that groups related content and actions.',
		name: 'Card',
		options: [
			option('minHeight', [
				'auto',
				'full',
			]),
			option('verticalAlign', [
				'top',
				'center',
				'bottom',
			]),
		],
		props: [
			prop('minHeight', 'CardMinHeight', 'Minimum surface height.'),
			prop('verticalAlign', 'CardVerticalAlign', 'Vertical content alignment.'),
		],
		slug: 'card',
	},
	{
		category: 'Content',
		description:
			'Typed list abstraction with standard, infinite, and paginated modes.',
		name: 'List',
		props: [
			prop('data', 'ReadonlyArray<T>', 'Items to render.', {
				required: true,
			}),
			prop(
				'renderItem',
				'(item: T, index: number) => ReactElement | null',
				'Renders each item.',
				{
					required: true,
				},
			),
			prop(
				'keyExtractor',
				'(item: T, index: number) => string',
				'Returns a stable item key.',
			),
			prop('onLoadMore', '() => void', 'Infinite-mode load callback.'),
			prop('page', 'number', 'Controlled page in paginated mode.'),
			prop(
				'onPageChange',
				'(page: number) => void',
				'Paginated-mode callback.',
			),
		],
		slug: 'list',
	},
	{
		category: 'Content',
		compound: [
			'Stepper.Step',
			'Stepper.Previous',
			'Stepper.Next',
			'Stepper.Completed',
		],
		description:
			'Ordered multi-step flow with navigation helpers and custom fragments.',
		name: 'Stepper',
		options: [
			option('variant', [
				'dotted',
				'icon',
				'numbered',
			]),
			option('orientation', [
				'horizontal',
				'vertical',
			]),
			option('size', [
				'sm',
				'md',
				'lg',
			]),
			option('radius', [
				'none',
				'sm',
				'md',
				'lg',
				'xl',
				'full',
			]),
		],
		props: [
			prop('active', 'number', 'Active step index.', {
				required: true,
			}),
			prop(
				'onActiveChange',
				'(active: number) => void',
				'Called when the active step changes.',
			),
			prop('variant', 'StepperVariant', 'Step marker presentation.'),
			prop('orientation', 'StepperOrientation', 'Flow direction.'),
			prop('size', 'StepperSize', 'Marker and text scale.'),
			prop('allowNextStepsSelect', 'boolean', 'Allows selecting future steps.'),
			prop('keepMounted', 'boolean', 'Keeps inactive step content mounted.'),
		],
		slug: 'stepper',
	},
	{
		category: 'Content',
		compound: [
			'Tabs.List',
			'Tabs.Trigger',
			'Tabs.Content',
		],
		description:
			'Controlled or uncontrolled content views selected by tab triggers.',
		name: 'Tabs',
		options: [
			option('variant', [
				'default',
				'outline',
				'pills',
			]),
			option('orientation', [
				'horizontal',
				'vertical',
			]),
		],
		props: [
			prop('value', 'string', 'Controlled tab value.'),
			prop('defaultValue', 'string', 'Initial uncontrolled value.'),
			prop(
				'onValueChange',
				'(value: string) => void',
				'Called when the active tab changes.',
			),
			prop('variant', 'TabsVariant', 'Trigger presentation.'),
			prop('orientation', 'TabsOrientation', 'Tab list direction.'),
		],
		slug: 'tabs',
	},
	{
		category: 'Content',
		description:
			'Typography that truncates at a configurable line and position.',
		name: 'TruncatedText',
		options: [
			option('position', [
				'start',
				'middle',
				'end',
			]),
		],
		props: [
			prop('lines', 'number', 'Maximum rendered lines.'),
			prop('position', 'TruncatedTextPosition', 'Ellipsis position.'),
			prop('component', 'TypographyComponent', 'Semantic typography role.'),
		],
		slug: 'truncated-text',
	},
	{
		category: 'Content',
		description: 'Semantic text roles mapped to React Native Text.',
		name: 'Typography',
		options: [
			option('variant', [
				'body',
				'caption',
				'code',
				'heading',
				'label',
				'muted',
			]),
			option('size', [
				'xs',
				'sm',
				'md',
				'lg',
				'xl',
				'2xl',
			]),
			option('weight', [
				'normal',
				'medium',
				'semibold',
				'bold',
			]),
			option('align', [
				'left',
				'center',
				'right',
				'justify',
			]),
		],
		props: [
			prop('variant', 'TypographyVariant', 'Semantic text role.'),
			prop('size', 'TypographySize', 'Text size.'),
			prop('weight', 'TypographyWeight', 'Font weight.'),
			prop('align', 'TypographyAlign', 'Text alignment.'),
			prop(
				'component',
				'"p" | "span" | "label"',
				'Cross-platform semantic component name.',
			),
			prop(
				'maxWidth',
				'TypographyMaxWidth',
				'Readable line-length constraint.',
			),
		],
		slug: 'typography',
	},
	{
		category: 'Feedback',
		compound: [
			'Alert.Icon',
			'Alert.Title',
			'Alert.Description',
			'Alert.Action',
		],
		description: 'Inline contextual message with semantic severity.',
		name: 'Alert',
		options: [
			option('variant', [
				'default',
				'destructive',
				'info',
				'success',
				'warning',
			]),
		],
		props: [
			prop('variant', 'AlertVariant', 'Message severity.'),
		],
		slug: 'alert',
	},
	{
		category: 'Feedback',
		contracts: [
			buttonContract,
		],
		description:
			'Controlled confirmation surface with cancel and confirm actions.',
		name: 'Confirm',
		props: [
			prop('open', 'boolean', 'Controlled visibility.'),
			prop('title', 'ReactNode', 'Confirmation title.'),
			prop('description', 'ReactNode', 'Supporting explanation.'),
			prop('confirmText', 'ReactNode', 'Confirm action label.'),
			prop('cancelText', 'ReactNode', 'Cancel action label.'),
			prop('confirmProps', 'ButtonProps', 'Confirm button configuration.'),
			prop('cancelProps', 'ButtonProps', 'Cancel button configuration.'),
			prop('onConfirm', '() => void', 'Called by the confirm action.'),
			prop('onClose', '() => void', 'Called when the surface closes.'),
		],
		slug: 'confirm',
	},
	{
		category: 'Feedback',
		description: 'Confirmation flow presented as a gesture-driven sheet.',
		name: 'ConfirmSheet',
		nativeNote:
			'Uses Sheet internally and keeps the same confirmation contract as Confirm.',
		options: sheetOptions,
		props: [
			prop('open', 'boolean', 'Controlled visibility.'),
			prop('title', 'ReactNode', 'Confirmation title.'),
			prop('description', 'ReactNode', 'Supporting explanation.'),
			prop('side', 'SheetSide', 'Presentation edge.'),
			prop('size', 'SheetSize', 'Sheet extent.'),
			prop('onConfirm', '() => void', 'Called by the confirm action.'),
			prop('onClose', '() => void', 'Called when the sheet closes.'),
		],
		slug: 'confirm-sheet',
	},
	{
		category: 'Feedback',
		description: 'Indeterminate native activity indicator.',
		name: 'Loader',
		options: [
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop('size', 'LoaderSize', 'Indicator size.'),
			prop('color', 'string', 'Indicator color.'),
		],
		slug: 'loader',
	},
	{
		category: 'Feedback',
		description: 'Blocks a surface while an operation is running.',
		name: 'LoadingOverlay',
		props: [
			prop('open', 'boolean', 'Controls visibility.'),
			prop('text', 'ReactNode', 'Optional loading message.'),
		],
		slug: 'loading-overlay',
	},
	{
		category: 'Feedback',
		description: 'Determinate progress bar with semantic sizes.',
		name: 'Progress',
		options: [
			option('size', [
				'sm',
				'md',
				'lg',
			]),
		],
		props: [
			prop('value', 'number', 'Current progress value.'),
			prop('max', 'number', 'Value representing completion.'),
			prop('size', 'ProgressSize', 'Track thickness.'),
		],
		slug: 'progress',
	},
	{
		category: 'Feedback',
		description:
			'Animated placeholder surface for content that is still loading.',
		name: 'Skeleton',
		props: [],
		slug: 'skeleton',
	},
	{
		category: 'Feedback',
		description:
			'Transient status message positioned relative to the safe area.',
		name: 'Toast',
		options: [
			option('position', [
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
			]),
			option('theme', [
				'system',
				'dark',
				'light',
			]),
		],
		props: [
			prop('position', 'ToastPosition', 'Safe-area anchor.'),
			prop('theme', 'ToastTheme', 'Toast appearance.'),
		],
		slug: 'toast',
	},
	{
		category: 'Overlays & navigation',
		compound: [
			'ActionSheet.Trigger',
			'ActionSheet.Content',
			'ActionSheet.Group',
			'ActionSheet.Item',
			'ActionSheet.Separator',
		],
		contracts: [
			actionSheetItemConfirmContract,
			buttonContract,
		],
		description:
			'Contextual actions presented through a native bottom-sheet flow.',
		name: 'ActionSheet',
		nativeNote:
			'Composes Sheet and supports per-item confirmation before invoking destructive actions.',
		options: [
			...sheetOptions,
			option('ActionSheet.Item variant', [
				'default',
				'destructive',
			]),
		],
		props: [
			prop('open', 'boolean', 'Controlled visibility.'),
			prop(
				'onChange',
				'(open: boolean) => void',
				'Called when visibility changes.',
			),
		],
		slug: 'action-sheet',
	},
	{
		category: 'Overlays & navigation',
		compound: [
			'BottomTabs.Item',
		],
		description: 'Safe-area-aware primary navigation for native applications.',
		name: 'BottomTabs',
		props: [
			prop('value', 'string', 'Controlled active tab.'),
			prop(
				'onValueChange',
				'(value: string) => void',
				'Called when the active tab changes.',
			),
			prop('showLabels', 'boolean', 'Controls item-label visibility.'),
		],
		slug: 'bottom-tabs',
	},
	{
		category: 'Overlays & navigation',
		description: 'Native date picker presented inside a controlled sheet.',
		name: 'DatePickerSheet',
		nativeNote:
			'Combines DateNativeInput with a sheet title, description, and controlled lifecycle.',
		options: [
			option('mode', [
				'date',
				'datetime',
				'time',
			]),
		],
		props: [
			prop('open', 'boolean', 'Controlled visibility.'),
			prop('title', 'ReactNode', 'Sheet title.'),
			prop('description', 'ReactNode', 'Supporting text.'),
			prop('onClose', '() => void', 'Called when the sheet closes.'),
			...dateProps,
		],
		slug: 'date-picker-sheet',
	},
	{
		category: 'Overlays & navigation',
		compound: [
			'DropdownMenu.Trigger',
			'DropdownMenu.Content',
			'DropdownMenu.Group',
			'DropdownMenu.Item',
			'DropdownMenu.CheckboxItem',
			'DropdownMenu.RadioGroup',
			'DropdownMenu.RadioItem',
			'DropdownMenu.Label',
			'DropdownMenu.Separator',
			'DropdownMenu.Shortcut',
			'DropdownMenu.Sub',
			'DropdownMenu.SubTrigger',
			'DropdownMenu.SubContent',
		],
		contracts: [
			actionSheetItemConfirmContract,
			buttonContract,
		],
		description: 'Menu API with a mobile action-sheet presentation.',
		name: 'DropdownMenu',
		nativeNote:
			'The compound API remains menu-shaped while the mobile presentation is implemented with ActionSheet.',
		options: [
			option('item variant', [
				'default',
				'destructive',
			]),
			option('align', [
				'start',
				'center',
				'end',
			]),
			option('side', [
				'bottom',
				'left',
				'right',
				'top',
			]),
		],
		props: [
			prop('open', 'boolean', 'Controlled visibility.'),
			prop(
				'onChange',
				'(open: boolean) => void',
				'Called when visibility changes.',
			),
		],
		slug: 'dropdown-menu',
	},
	{
		category: 'Overlays & navigation',
		compound: [
			'Modal.Header',
			'Modal.Title',
			'Modal.Description',
			'Modal.Body',
			'Modal.Footer',
		],
		description: 'Focused native content above a dimmed application surface.',
		name: 'Modal',
		props: [
			prop('open', 'boolean', 'Controlled visibility.'),
			prop(
				'onChange',
				'(open: boolean) => void',
				'Called when visibility changes.',
			),
		],
		slug: 'modal',
	},
	{
		category: 'Overlays & navigation',
		compound: [
			'Sheet.Header',
			'Sheet.Title',
			'Sheet.Description',
			'Sheet.Body',
			'Sheet.Footer',
		],
		description: 'Gesture-driven surface powered by Gorhom Bottom Sheet.',
		name: 'Sheet',
		nativeNote:
			'Requires react-native-gesture-handler and react-native-reanimated to be configured in the Expo app.',
		options: sheetOptions,
		props: [
			prop('open', 'boolean', 'Controlled visibility.'),
			prop(
				'onChange',
				'(open: boolean) => void',
				'Called when visibility changes.',
			),
			prop('title', 'ReactNode', 'Sheet title.'),
			prop('description', 'ReactNode', 'Supporting text.'),
			prop('side', 'SheetSide', 'Presentation edge.'),
			prop('size', 'SheetSize', 'Sheet extent.'),
		],
		slug: 'sheet',
	},
]

type ApiProp = readonly [
	name: string,
	type: string,
	required?: boolean,
]

const percentageStringType = [
	'number | `',
	'$',
	'{number}%`',
].join('')

const apiProps: Record<string, readonly ApiProp[]> = {
	accordion: [
		[
			'type',
			'"single" | "multiple"',
			true,
		],
		[
			'bordered',
			'boolean',
		],
		[
			'value',
			'string | string[]',
		],
		[
			'defaultValue',
			'string | string[]',
		],
		[
			'collapsible',
			'boolean',
		],
		[
			'onChange',
			'((value: string | string[]) => void)',
		],
	],
	'action-sheet': [
		[
			'open',
			'boolean',
		],
		[
			'onChange',
			'(open: boolean) => void',
		],
	],
	alert: [
		[
			'variant',
			'AlertVariant',
		],
		[
			'closable',
			'boolean',
		],
		[
			'onClose',
			'() => void',
		],
	],
	avatar: [
		[
			'src',
			'string | null',
		],
		[
			'alt',
			'string',
		],
		[
			'size',
			'AvatarSize',
		],
		[
			'variant',
			'AvatarVariant',
		],
	],
	badge: [
		[
			'variant',
			'BadgeVariant',
		],
		[
			'align',
			'BadgeAlign',
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
			'asChild',
			'boolean',
		],
		[
			'onClick',
			'() => void',
		],
	],
	'bottom-tabs': [
		[
			'value',
			'string',
		],
		[
			'onChange',
			'(event: unknown, value: string) => void',
		],
		[
			'showLabels',
			'boolean',
		],
		[
			'children',
			'ReactNode',
			true,
		],
	],
	box: [
		[
			'bg',
			'BoxBg',
		],
		[
			'grow',
			'boolean',
		],
		[
			'minHeight',
			'BoxMinHeight',
		],
		[
			'overflow',
			'BoxOverflow',
		],
		[
			'padding',
			'BoxPadding',
		],
		[
			'paddingX',
			'BoxPadding',
		],
		[
			'paddingY',
			'BoxPadding',
		],
		[
			'position',
			'BoxPosition',
		],
		[
			'rounded',
			'BoxRounded',
		],
		[
			'textAlign',
			'BoxTextAlign',
		],
		[
			'width',
			'BoxWidth',
		],
	],
	button: [
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
			'() => void',
		],
		[
			'children',
			'ReactNode',
		],
	],
	calendar: [
		[
			'mode',
			'"single" | "range"',
			true,
		],
		[
			'selected',
			'Date | CalendarRangeValue | null',
		],
		[
			'onDateChange',
			'(value: Date | CalendarRangeValue | null) => void',
		],
		[
			'defaultMonth',
			'Date',
		],
		[
			'month',
			'Date',
		],
		[
			'onMonthChange',
			'(month: Date) => void',
		],
		[
			'minDate',
			'Date',
		],
		[
			'maxDate',
			'Date',
		],
		[
			'excludeDate',
			'(date: Date) => boolean',
		],
		[
			'numberOfMonths',
			'number',
		],
		[
			'showOutsideDays',
			'boolean',
		],
		[
			'highlightToday',
			'boolean',
		],
		[
			'fullWidth',
			'boolean',
		],
		[
			'locale',
			'CalendarLocale',
		],
		[
			'size',
			'CalendarSize',
		],
		[
			'weekStartsOn',
			'0 | 1 | 2 | 3 | 4 | 5 | 6',
		],
	],
	card: [
		[
			'minHeight',
			'CardMinHeight',
		],
		[
			'onClick',
			'() => void',
		],
		[
			'verticalAlign',
			'CardVerticalAlign',
		],
		[
			'children',
			'ReactNode',
		],
	],
	checkbox: [
		[
			'label',
			'string',
		],
		[
			'description',
			'string',
		],
		[
			'value',
			'string',
		],
		[
			'size',
			'CheckboxSize',
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
			'checked',
			'boolean',
		],
		[
			'defaultChecked',
			'boolean',
		],
		[
			'onChange',
			'(checked: boolean) => void',
		],
	],
	'color-picker': [
		[
			'value',
			'string | null',
		],
		[
			'defaultValue',
			'string | null',
		],
		[
			'onChange',
			'(hex: string | null) => void',
		],
		[
			'colors',
			'readonly string[]',
		],
		[
			'allowCustom',
			'boolean',
		],
		[
			'allowTransparent',
			'boolean',
		],
		[
			'size',
			'ColorPickerSize',
		],
		[
			'placeholder',
			'string',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'invalid',
			'boolean',
		],
		[
			'open',
			'boolean',
		],
		[
			'defaultOpen',
			'boolean',
		],
		[
			'onOpenChange',
			'(open: boolean) => void',
		],
		[
			'side',
			'ColorPickerSide',
		],
		[
			'sideOffset',
			'number',
		],
		[
			'align',
			'ColorPickerAlign',
		],
		[
			'renderTrigger',
			'(context: { value: string | null; open: boolean }) => ReactNode',
		],
	],
	'color-scheme-provider': [
		[
			'defaultColorScheme',
			'ColorScheme',
		],
		[
			'children',
			'ReactNode',
		],
	],
	'color-scheme-switcher': [
		[
			'size',
			'ColorSchemeSwitcherSize',
		],
	],
	confirm: [
		[
			'open',
			'boolean',
		],
		[
			'title',
			'string',
			true,
		],
		[
			'description',
			'string',
			true,
		],
		[
			'confirmText',
			'string',
		],
		[
			'cancelText',
			'string',
		],
		[
			'confirmProps',
			'Omit<ButtonProps, "loading" | "onClick">',
		],
		[
			'cancelProps',
			'Omit<ButtonProps, "loading" | "onClick">',
		],
		[
			'onConfirm',
			'() => void',
		],
		[
			'onCancel',
			'() => void',
		],
		[
			'onClose',
			'() => void',
		],
	],
	'confirm-sheet': [
		[
			'open',
			'boolean',
		],
		[
			'title',
			'string',
			true,
		],
		[
			'description',
			'string',
			true,
		],
		[
			'confirmText',
			'string',
		],
		[
			'cancelText',
			'string',
		],
		[
			'confirmProps',
			'Omit<ButtonProps, "loading" | "onClick">',
		],
		[
			'cancelProps',
			'Omit<ButtonProps, "loading" | "onClick">',
		],
		[
			'side',
			'SheetSide',
		],
		[
			'size',
			'SheetSize',
		],
		[
			'onConfirm',
			'() => void',
		],
		[
			'onCancel',
			'() => void',
		],
		[
			'onClose',
			'() => void',
		],
	],
	container: [
		[
			'centered',
			'boolean',
		],
		[
			'maxWidth',
			'ContainerMaxWidth',
		],
		[
			'textAlign',
			'ContainerTextAlign',
		],
	],
	'currency-input': [
		[
			'mode',
			'"single" | "multiple"',
			true,
		],
		[
			'variant',
			'CurrencyVariant',
		],
		[
			'value',
			'number | CurrencyInputMultipleValue | null',
		],
		[
			'defaultValue',
			'number | CurrencyInputMultipleValue | null',
		],
		[
			'onChange',
			'(value: number | CurrencyInputMultipleValue | null) => void',
		],
		[
			'fromPlaceholder',
			'string',
		],
		[
			'toPlaceholder',
			'string',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
		[
			'size',
			'InputSize',
		],
	],
	'date-input': [
		[
			'value',
			'Date | null',
		],
		[
			'defaultValue',
			'Date | null',
		],
		[
			'onChange',
			'(date: Date | null) => void',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	'date-native-input': [
		[
			'value',
			'Date | null',
		],
		[
			'defaultValue',
			'Date | null',
		],
		[
			'onChange',
			'(date: Date | null) => void',
		],
		[
			'mode',
			'DateNativeInputMode',
		],
		[
			'minDate',
			'Date',
		],
		[
			'maxDate',
			'Date',
		],
		[
			'step',
			'number',
		],
		[
			'clearable',
			'boolean',
		],
		[
			'valueFormat',
			'string',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	'date-picker-sheet': [
		[
			'value',
			'Date | null',
		],
		[
			'defaultValue',
			'Date | null',
		],
		[
			'onChange',
			'(date: Date | null) => void',
		],
		[
			'minDate',
			'Date',
		],
		[
			'maxDate',
			'Date',
		],
		[
			'clearable',
			'boolean',
		],
		[
			'valueFormat',
			'string',
		],
		[
			'title',
			'ReactNode',
		],
		[
			'description',
			'ReactNode',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	'date-range-input': [
		[
			'value',
			'DateRange | null',
		],
		[
			'defaultValue',
			'DateRange | null',
		],
		[
			'onChange',
			'(range: DateRange | null) => void',
		],
		[
			'presets',
			'DateRangeInputPreset[]',
		],
		[
			'showPresets',
			'boolean',
		],
		[
			'applyLabel',
			'string',
		],
		[
			'cancelLabel',
			'string',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	'date-time-input': [
		[
			'value',
			'Date | null',
		],
		[
			'defaultValue',
			'Date | null',
		],
		[
			'onChange',
			'(date: Date | null) => void',
		],
		[
			'defaultTime',
			'string',
		],
		[
			'withSeconds',
			'boolean',
		],
		[
			'valueFormat',
			'string',
		],
		[
			'minDate',
			'Date',
		],
		[
			'maxDate',
			'Date',
		],
		[
			'minTime',
			'string',
		],
		[
			'maxTime',
			'string',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	'document-input': [
		[
			'variant',
			'DocumentType',
			true,
		],
		[
			'value',
			'DocumentValue | null',
		],
		[
			'defaultValue',
			'DocumentValue | null',
		],
		[
			'onChange',
			'(value: DocumentValue | null) => void',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
		[
			'size',
			'InputSize',
		],
	],
	'dropdown-menu': [
		[
			'open',
			'boolean',
		],
		[
			'onOpenChange',
			'(open: boolean) => void',
		],
	],
	flex: [
		[
			'direction',
			'FlexDirection',
		],
		[
			'justify',
			'FlexJustify',
		],
		[
			'align',
			'FlexAlign',
		],
		[
			'gap',
			'FlexGap',
		],
		[
			'wrap',
			'FlexWrap',
		],
		[
			'inline',
			'boolean',
		],
		[
			'minHeight',
			'FlexMinHeight',
		],
		[
			'block',
			'boolean',
		],
	],
	form: [
		[
			'onSubmit',
			'() => void',
		],
		[
			'children',
			'ReactNode',
		],
	],
	grid: [
		[
			'cols',
			'GridCols',
		],
		[
			'gap',
			'GridGap',
		],
		[
			'children',
			'ReactNode',
		],
	],
	input: [
		[
			'value',
			'string | null',
		],
		[
			'defaultValue',
			'string | null',
		],
		[
			'onChange',
			'(value: string | null) => void',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	label: [
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
		[
			'children',
			'ReactNode',
		],
	],
	layout: [
		[
			'withSidebar',
			'boolean',
		],
		[
			'children',
			'ReactNode',
		],
	],
	list: [
		[
			'items',
			'T[]',
		],
		[
			'itemKey',
			'ListItemKey<T>',
			true,
		],
		[
			'renderItem',
			'(item: T, index: number) => ReactNode',
			true,
		],
		[
			'loading',
			'boolean',
		],
		[
			'error',
			'boolean',
		],
		[
			'loadingRows',
			'number',
		],
		[
			'emptySection',
			'ReactNode',
		],
		[
			'errorSection',
			'ReactNode',
		],
		[
			'loadingSection',
			'ReactNode',
		],
		[
			'footerSection',
			'ReactNode',
		],
		[
			'gap',
			'ListGap',
		],
		[
			'divided',
			'boolean',
		],
		[
			'padded',
			'boolean',
		],
		[
			'pagination',
			'ListPaginationProps',
		],
		[
			'infinite',
			'ListInfiniteProps',
		],
	],
	loader: [
		[
			'size',
			'LoaderSize',
		],
	],
	'loading-overlay': [
		[
			'visible',
			'boolean',
		],
	],
	'mask-input': [
		[
			'mask',
			'string | string[]',
			true,
		],
		[
			'value',
			'string | null',
		],
		[
			'defaultValue',
			'string | null',
		],
		[
			'onChange',
			'(value: string | null) => void',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	modal: [
		[
			'open',
			'boolean',
		],
		[
			'onChange',
			'(open: boolean) => void',
		],
		[
			'size',
			'ModalSize',
		],
		[
			'children',
			'ReactNode',
		],
	],
	'number-input': [
		[
			'value',
			'number | null',
		],
		[
			'defaultValue',
			'number | null',
		],
		[
			'onChange',
			'(value: number | null) => void',
		],
		[
			'step',
			'number',
		],
		[
			'min',
			'number',
		],
		[
			'max',
			'number',
		],
		[
			'size',
			'InputSize',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'grouping',
			'boolean',
		],
	],
	'otp-input': [
		[
			'value',
			'string | null',
		],
		[
			'defaultValue',
			'string | null',
		],
		[
			'onChange',
			'(value: string | null) => void',
		],
		[
			'pattern',
			'number[]',
		],
		[
			'size',
			'OTPInputSize',
		],
	],
	'password-input': [
		[
			'showStrength',
			'boolean',
		],
		[
			'value',
			'string | null',
		],
		[
			'defaultValue',
			'string | null',
		],
		[
			'onChange',
			'(value: string | null) => void',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	'phone-input': [
		[
			'value',
			'PhoneValue | null',
		],
		[
			'defaultValue',
			'PhoneValue | null',
		],
		[
			'onChange',
			'(value: PhoneValue | null) => void',
		],
		[
			'defaultCountry',
			'string',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	progress: [
		[
			'value',
			'number',
		],
		[
			'defaultValue',
			'number',
		],
		[
			'size',
			'ProgressSize',
		],
		[
			'label',
			'string | LabelProps',
		],
	],
	radio: [
		[
			'label',
			'string',
		],
		[
			'description',
			'string',
		],
		[
			'value',
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
			'checked',
			'boolean',
		],
		[
			'onChange',
			'(checked: boolean) => void',
		],
	],
	rating: [
		[
			'value',
			'number',
			true,
		],
		[
			'onChange',
			'(value: number) => void',
		],
		[
			'max',
			'number',
		],
		[
			'size',
			'number',
		],
		[
			'readOnly',
			'boolean',
		],
	],
	select: [
		[
			'mode',
			'"single" | "multiple"',
			true,
		],
		[
			'options',
			'T[]',
			true,
		],
		[
			'optionLabel',
			'keyof T | ((option: T) => string)',
			true,
		],
		[
			'optionValue',
			'keyof T | ((option: T) => O)',
			true,
		],
		[
			'optionGroup',
			'keyof T | ((option: T) => string)',
		],
		[
			'value',
			'I | I[] | null',
		],
		[
			'defaultValue',
			'I | I[] | null',
		],
		[
			'onChange',
			'(value: O | O[] | null) => void',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'emptySection',
			'ReactNode',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'searchable',
			'boolean',
		],
		[
			'searchPlaceholder',
			'string',
		],
		[
			'searchValue',
			'string',
		],
		[
			'onSearchChange',
			'(query: string) => void',
		],
		[
			'clearable',
			'boolean',
		],
		[
			'infinite',
			'SelectInfiniteProps',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'size',
			'SelectSize',
		],
		[
			'variant',
			'SelectVariant',
		],
		[
			'renderOption',
			'(option: T) => ReactNode',
		],
		[
			'renderValue',
			'(option: T) => ReactNode',
		],
	],
	separator: [
		[
			'orientation',
			'SeparatorOrientation',
		],
		[
			'decorative',
			'boolean',
		],
	],
	sheet: [
		[
			'open',
			'boolean',
		],
		[
			'side',
			'SheetSide',
		],
		[
			'size',
			'SheetSize',
		],
		[
			'onChange',
			'(open: boolean) => void',
		],
		[
			'children',
			'ReactNode',
		],
	],
	skeleton: [
		[
			'width',
			percentageStringType,
		],
		[
			'height',
			'number',
		],
		[
			'shape',
			'SkeletonShape',
		],
	],
	slider: [
		[
			'mode',
			'"single" | "range"',
			true,
		],
		[
			'orientation',
			'SliderOrientation',
			true,
		],
		[
			'disabled',
			'boolean',
		],
		[
			'size',
			'SliderSize',
		],
		[
			'value',
			'number | [number, number]',
		],
		[
			'defaultValue',
			'number | [number, number]',
		],
		[
			'onValueChange',
			'(value: number | [number, number]) => void',
		],
	],
	stepper: [
		[
			'active',
			'number',
			true,
		],
		[
			'allowNextStepsSelect',
			'boolean',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'completedIcon',
			'StepFragment',
		],
		[
			'icon',
			'StepFragment',
		],
		[
			'iconPosition',
			'StepperIconPosition',
		],
		[
			'iconSize',
			'number | string',
		],
		[
			'keepMounted',
			'boolean',
		],
		[
			'onActiveChange',
			'(active: number) => void',
		],
		[
			'orientation',
			'StepperOrientation',
		],
		[
			'progressIcon',
			'StepFragment',
		],
		[
			'radius',
			'StepperRadius',
		],
		[
			'size',
			'StepperSize',
		],
		[
			'variant',
			'StepperVariant',
		],
		[
			'wrap',
			'boolean',
		],
		[
			'children',
			'ReactNode',
		],
	],
	switch: [
		[
			'value',
			'string',
		],
		[
			'size',
			'SwitchSize',
		],
		[
			'description',
			'string',
		],
		[
			'checked',
			'boolean',
		],
		[
			'defaultChecked',
			'boolean',
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
			'onCheckedChange',
			'(checked: boolean) => void',
		],
		[
			'label',
			'string | LabelProps',
		],
	],
	tabs: [
		[
			'orientation',
			'TabsOrientation',
		],
		[
			'variant',
			'TabsVariant',
		],
		[
			'justified',
			'boolean',
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
			'onChange',
			'(value: string) => void',
		],
		[
			'children',
			'ReactNode',
		],
	],
	'tags-input': [
		[
			'value',
			'string[]',
		],
		[
			'defaultValue',
			'string[]',
		],
		[
			'onChange',
			'(value: string[]) => void',
		],
		[
			'maxTags',
			'number',
		],
		[
			'allowDuplicates',
			'boolean',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'loading',
			'boolean',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	textarea: [
		[
			'value',
			'string | null',
		],
		[
			'defaultValue',
			'string | null',
		],
		[
			'onChange',
			'(value: string | null) => void',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'maxLength',
			'number',
		],
		[
			'placeholder',
			'string',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'size',
			'InputSize',
		],
	],
	'theme-provider': [
		[
			'defaultTheme',
			'Theme',
		],
		[
			'children',
			'ReactNode',
		],
	],
	'time-input': [
		[
			'value',
			'string | null',
		],
		[
			'defaultValue',
			'string | null',
		],
		[
			'onChange',
			'(value: string | null) => void',
		],
		[
			'withSeconds',
			'boolean',
		],
		[
			'minTime',
			'string',
		],
		[
			'maxTime',
			'string',
		],
		[
			'autoFocus',
			'boolean',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'loading',
			'boolean',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'size',
			'InputSize',
		],
		[
			'variant',
			'InputVariant',
		],
	],
	toast: [
		[
			'position',
			'ToastPosition',
		],
		[
			'theme',
			'ToastTheme',
		],
	],
	'truncated-text': [
		[
			'value',
			'number | string',
			true,
		],
		[
			'component',
			'TruncatedTextComponent',
		],
		[
			'end',
			'number',
		],
		[
			'lines',
			'TruncatedTextLines',
		],
		[
			'position',
			'TruncatedTextPosition',
		],
		[
			'start',
			'number',
		],
	],
	'tury-provider': [
		[
			'defaultColorScheme',
			'ColorScheme',
		],
		[
			'portalHostName',
			'string',
		],
		[
			'theme',
			'Theme',
		],
		[
			'children',
			'ReactNode',
		],
	],
	typography: [
		[
			'align',
			'TypographyAlign',
		],
		[
			'centered',
			'boolean',
		],
		[
			'component',
			'TypographyComponent',
		],
		[
			'maxWidth',
			'TypographyMaxWidth',
		],
		[
			'size',
			'TypographySize',
		],
		[
			'variant',
			'TypographyVariant',
		],
		[
			'weight',
			'TypographyWeight',
		],
		[
			'truncate',
			'boolean',
		],
		[
			'destructive',
			'boolean',
		],
		[
			'children',
			'ReactNode',
		],
	],
	uploader: [
		[
			'mode',
			'"single" | "multiple"',
			true,
		],
		[
			'handler',
			'(fileName: string) => Promise<UploaderHandlerResponse>',
			true,
		],
		[
			'onUpload',
			'(response: UploaderHandlerResponse | UploaderHandlerResponse[], index: number) => void',
		],
		[
			'accept',
			'string',
		],
		[
			'disabled',
			'boolean',
		],
		[
			'label',
			'ReactNode',
		],
		[
			'maxFiles',
			'number',
		],
		[
			'maxFileSize',
			'number',
		],
	],
}

const apiPropDescriptions: Record<string, string> = {
	children: 'Conteúdo renderizado pelo componente.',
	defaultValue: 'Valor inicial não controlado.',
	disabled: 'Impede interação.',
	handler: 'Obtém os dados assinados usados para enviar o arquivo.',
	mode: 'Seleciona o contrato discriminado do componente.',
	onChange: 'Chamado quando o valor semântico muda.',
	onUpload: 'Chamado após a conclusão do upload.',
	tooltip: 'Conteúdo de ajuda aberto em um popover acionado por toque.',
	value: 'Valor controlado.',
}

for (const component of reactMobileDocs) {
	const specification = apiProps[component.slug]
	if (!specification) {
		continue
	}
	component.props = specification.map(([name, type, required]) =>
		prop(name, type, apiPropDescriptions[name] ?? `Configura ${name}.`, {
			required,
		}),
	)
}

const inheritedApiProps: Record<string, readonly ApiProp[]> = {
	accordion: [
		[
			'children',
			'ReactNode',
		],
	],
	'action-sheet': [
		[
			'children',
			'ReactNode',
		],
	],
	alert: [
		[
			'children',
			'ReactNode',
		],
	],
	badge: [
		[
			'children',
			'ReactNode',
		],
	],
	box: [
		[
			'children',
			'ReactNode',
		],
	],
	container: [
		[
			'children',
			'ReactNode',
		],
	],
	'currency-input': [
		[
			'debounce',
			'boolean',
		],
	],
	'date-native-input': [
		[
			'autoFocus',
			'boolean',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
	],
	'date-picker-sheet': [
		[
			'autoFocus',
			'boolean',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
	],
	'date-range-input': [
		[
			'autoFocus',
			'boolean',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
	],
	'date-time-input': [
		[
			'autoFocus',
			'boolean',
		],
		[
			'debounce',
			'boolean',
		],
		[
			'leftSection',
			'ReactNode',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'loading',
			'boolean',
		],
		[
			'rightSection',
			'ReactNode',
		],
		[
			'rightSectionWidth',
			'number',
		],
	],
	'dropdown-menu': [
		[
			'children',
			'ReactNode',
		],
	],
	flex: [
		[
			'children',
			'ReactNode',
		],
	],
	'phone-input': [
		[
			'debounce',
			'boolean',
		],
		[
			'leftSectionWidth',
			'number',
		],
	],
	'tags-input': [
		[
			'debounce',
			'boolean',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'rightSectionWidth',
			'number',
		],
	],
	'time-input': [
		[
			'debounce',
			'boolean',
		],
		[
			'leftSectionWidth',
			'number',
		],
		[
			'rightSectionWidth',
			'number',
		],
	],
}

for (const component of reactMobileDocs) {
	for (const [name, type, required] of inheritedApiProps[component.slug] ??
		[]) {
		component.props.push(
			prop(name, type, apiPropDescriptions[name] ?? `Configura ${name}.`, {
				required,
			}),
		)
	}
}

const apiOptions: Record<string, Record<string, readonly string[]>> = {
	accordion: {
		type: [
			'single',
			'multiple',
		],
	},
	alert: {
		variant: [
			'default',
			'destructive',
			'info',
			'success',
			'warning',
		],
	},
	avatar: {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'circle',
			'square',
		],
	},
	badge: {
		align: [
			'start',
			'center',
			'end',
		],
		variant: [
			'default',
			'secondary',
			'destructive',
			'outline',
			'success',
			'warning',
			'info',
			'solid',
			'solid-destructive',
			'solid-success',
			'solid-info',
			'purple',
			'pink',
			'teal',
			'orange',
		],
	},
	box: {
		bg: [
			'background',
			'muted',
			'card',
		],
		minHeight: [
			'sm',
			'md',
			'lg',
			'screen',
		],
		overflow: [
			'hidden',
			'visible',
			'auto',
		],
		padding: [
			'none',
			'xs',
			'sm',
			'md',
			'lg',
			'xl',
		],
		position: [
			'static',
			'relative',
			'absolute',
		],
		rounded: [
			'none',
			'sm',
			'md',
			'lg',
			'xl',
			'full',
		],
		textAlign: [
			'left',
			'center',
			'right',
		],
		width: [
			'auto',
			'full',
		],
	},
	button: {
		size: [
			'sm',
			'md',
			'lg',
			'icon-xs',
			'icon-sm',
			'icon-md',
			'icon-lg',
		],
		type: [
			'button',
			'submit',
			'reset',
		],
		variant: [
			'default',
			'dark',
			'destructive',
			'outline',
			'dashed',
			'secondary',
			'ghost',
			'link',
			'link-muted',
		],
	},
	calendar: {
		mode: [
			'single',
			'range',
		],
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	card: {
		minHeight: [
			'sm',
			'md',
			'lg',
			'xl',
		],
		verticalAlign: [
			'start',
			'center',
		],
	},
	checkbox: {
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	'color-picker': {
		align: [
			'start',
			'center',
			'end',
		],
		side: [
			'top',
			'right',
			'bottom',
			'left',
		],
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	'color-scheme-provider': {
		defaultColorScheme: [
			'light',
			'dark',
			'system',
		],
	},
	'color-scheme-switcher': {
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	container: {
		maxWidth: [
			'xs',
			'sm',
			'md',
			'lg',
			'xl',
			'2xl',
			'full',
		],
		textAlign: [
			'left',
			'center',
			'right',
		],
	},
	'currency-input': {
		mode: [
			'single',
			'multiple',
		],
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'any',
			'brl',
			'usd',
			'eur',
		],
	},
	'date-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	'date-native-input': {
		mode: [
			'date',
			'date-time',
		],
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	'date-picker-sheet': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	'date-range-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	'date-time-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	'document-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'cpf',
			'cnpj',
			'any',
		],
	},
	flex: {
		align: [
			'start',
			'end',
			'center',
			'baseline',
			'stretch',
		],
		direction: [
			'row',
			'col',
			'row-reverse',
			'col-reverse',
		],
		gap: [
			'none',
			'xs',
			'sm',
			'md',
			'lg',
			'xl',
		],
		justify: [
			'start',
			'end',
			'center',
			'between',
			'around',
			'evenly',
		],
		minHeight: [
			'sm',
			'md',
			'lg',
			'screen',
		],
		wrap: [
			'wrap',
			'nowrap',
			'wrap-reverse',
		],
	},
	grid: {
		cols: [
			'1',
			'2',
			'3',
			'4',
			'5',
			'6',
			'12',
		],
		gap: [
			'none',
			'xs',
			'sm',
			'md',
			'lg',
			'xl',
		],
	},
	input: {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	list: {
		gap: [
			'none',
			'xs',
			'sm',
			'md',
			'lg',
		],
	},
	'mask-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	modal: {
		size: [
			'sm',
			'md',
			'lg',
			'xl',
			'2xl',
			'full',
		],
	},
	'number-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	'otp-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	'password-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	'phone-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	progress: {
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	select: {
		mode: [
			'single',
			'multiple',
		],
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	separator: {
		orientation: [
			'horizontal',
			'vertical',
		],
	},
	sheet: {
		side: [
			'top',
			'right',
			'bottom',
			'left',
		],
		size: [
			'sm',
			'md',
			'lg',
			'xl',
			'2xl',
		],
	},
	skeleton: {
		shape: [
			'rectangle',
			'circle',
		],
	},
	slider: {
		mode: [
			'single',
			'range',
		],
		orientation: [
			'horizontal',
			'vertical',
		],
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	stepper: {
		iconPosition: [
			'left',
			'right',
		],
		orientation: [
			'horizontal',
			'vertical',
		],
		radius: [
			'none',
			'sm',
			'md',
			'lg',
			'xl',
			'full',
		],
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'dotted',
			'icon',
			'numbered',
		],
	},
	switch: {
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	tabs: {
		orientation: [
			'horizontal',
			'vertical',
		],
		variant: [
			'line',
			'pill',
		],
	},
	'tags-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	textarea: {
		size: [
			'sm',
			'md',
			'lg',
		],
	},
	'theme-provider': {
		defaultTheme: [
			'default',
		],
	},
	'time-input': {
		size: [
			'sm',
			'md',
			'lg',
		],
		variant: [
			'default',
			'ghost',
		],
	},
	toast: {
		position: [
			'bottom-center',
			'bottom-left',
			'bottom-right',
			'top-center',
			'top-left',
			'top-right',
		],
		theme: [
			'dark',
			'light',
			'system',
		],
	},
	'truncated-text': {
		component: [
			'code',
			'span',
		],
		lines: [
			'1',
			'2',
			'3',
		],
		position: [
			'end',
			'middle',
			'start',
		],
	},
	'tury-provider': {
		defaultColorScheme: [
			'light',
			'dark',
			'system',
		],
		theme: [
			'default',
		],
	},
	typography: {
		align: [
			'left',
			'center',
			'right',
		],
		component: [
			'span',
			'p',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'div',
		],
		maxWidth: [
			'xs',
			'sm',
			'md',
			'lg',
		],
		size: [
			'xs',
			'sm',
			'base',
			'lg',
			'xl',
			'2xl',
			'3xl',
			'4xl',
			'5xl',
			'6xl',
			'7xl',
			'8xl',
			'9xl',
		],
		variant: [
			'default',
			'muted',
		],
		weight: [
			'thin',
			'extralight',
			'light',
			'normal',
			'medium',
			'semibold',
			'bold',
			'extrabold',
			'black',
		],
	},
	uploader: {
		mode: [
			'single',
			'multiple',
		],
	},
}

for (const component of reactMobileDocs) {
	const options = apiOptions[component.slug]
	if (!options) {
		continue
	}
	component.options = Object.entries(options).map(([name, values]) =>
		option(name, [
			...values,
		]),
	)
}

const exactButtonContract = contract('ButtonProps', [
	prop('ariaLabel', 'string', 'Accessible action name.'),
	prop('form', 'string', 'Associated semantic form identifier.'),
	prop('type', 'ButtonType', 'Semantic action type.'),
	prop('size', 'ButtonSize', 'Action size.'),
	prop('variant', 'ButtonVariant', 'Visual treatment.'),
	prop('leftSection', 'ReactNode', 'Leading content.'),
	prop('rightSection', 'ReactNode', 'Trailing content.'),
	prop('block', 'boolean', 'Fills available width.'),
	prop('loading', 'boolean', 'Shows pending state.'),
	prop('disabled', 'boolean', 'Prevents interaction.'),
	prop('asChild', 'boolean', 'Delegates rendering to the child.'),
	prop('onClick', '() => void', 'Handles the action.'),
	prop('children', 'ReactNode', 'Action content.'),
])

const contractOverrides: Record<string, MobileContractDoc[]> = {
	'action-sheet': [
		contract('ActionSheetItemConfirmProps', [
			prop('title', 'string', 'Confirmation title.', {
				required: true,
			}),
			prop('description', 'string', 'Confirmation message.', {
				required: true,
			}),
			prop('confirmText', 'string', 'Confirm label.'),
			prop('cancelText', 'string', 'Cancel label.'),
			prop(
				'confirmProps',
				'Omit<ButtonProps, "loading" | "onClick">',
				'Confirm button configuration.',
			),
			prop(
				'cancelProps',
				'Omit<ButtonProps, "loading" | "onClick">',
				'Cancel button configuration.',
			),
			prop('side', 'SheetSide', 'Presentation edge.'),
			prop('size', 'SheetSize', 'Sheet extent.'),
			prop('onConfirm', '() => void', 'Handles confirmation.'),
			prop('onCancel', '() => void', 'Handles cancellation.'),
		]),
		exactButtonContract,
	],
	calendar: [
		contract('CalendarRangeValue', [
			prop('from', 'Date', 'Range start.'),
			prop('to', 'Date', 'Range end.'),
		]),
		contract('CalendarLocale', [
			prop('code', 'string', 'Locale identifier.'),
			prop('monthNames', 'readonly string[]', 'Localized months.'),
			prop('weekdayNames', 'readonly string[]', 'Localized weekdays.'),
		]),
	],
	confirm: [
		exactButtonContract,
	],
	'currency-input': [
		contract('CurrencyInputMultipleValue', [
			prop('from', 'number | null', 'Lower monetary value.'),
			prop('to', 'number | null', 'Upper monetary value.'),
		]),
		contract('CurrencyInputSingleProps', [
			prop('mode', '"single"', 'Single-value mode.', {
				required: true,
			}),
			prop('value', 'number | null', 'Controlled value.'),
			prop('defaultValue', 'number | null', 'Initial value.'),
			prop(
				'onChange',
				'(value: number | null) => void',
				'Handles value changes.',
			),
		]),
		contract('CurrencyInputMultipleProps', [
			prop('mode', '"multiple"', 'Two-value mode.', {
				required: true,
			}),
			prop('value', 'CurrencyInputMultipleValue | null', 'Controlled values.'),
			prop(
				'defaultValue',
				'CurrencyInputMultipleValue | null',
				'Initial values.',
			),
			prop('fromPlaceholder', 'string', 'Lower value placeholder.'),
			prop('toPlaceholder', 'string', 'Upper value placeholder.'),
			prop(
				'onChange',
				'(value: CurrencyInputMultipleValue | null) => void',
				'Handles value changes.',
			),
		]),
	],
	'date-range-input': [
		contract('DateRange', [
			prop('from', 'Date', 'Range start.'),
			prop('to', 'Date', 'Range end.'),
		]),
		contract('DateRangeInputPreset', [
			prop('key', 'string', 'Stable preset key.', {
				required: true,
			}),
			prop('label', 'string', 'Preset label.', {
				required: true,
			}),
			prop(
				'getValue',
				'() => DateRange | null',
				'Builds the range when selected.',
			),
		]),
	],
	'document-input': [
		contract('DocumentValue', [
			prop('type', 'DocumentType', 'Detected document type.', {
				required: true,
			}),
			prop('number', 'string', 'Unformatted document number.', {
				required: true,
			}),
		]),
	],
	dropdown: [],
	form: [
		contract('FormTooltipProps', [
			prop(
				'content',
				'ReactNode',
				'Conteúdo exibido no popover acionado por toque.',
				{
					required: true,
				},
			),
			prop('side', 'FormTooltipSide', 'Lado preferencial do popover.'),
			prop('sideOffset', 'number', 'Distância entre o ícone e o popover.'),
			prop(
				'delayDuration',
				'number',
				'Mantido por compatibilidade; não atrasa interação por toque.',
			),
		]),
	],
	list: [
		contract('ListInfiniteProps', [
			prop('hasMore', 'boolean', 'Whether more items exist.'),
			prop('loadingMore', 'boolean', 'Whether another chunk is loading.'),
			prop('disabled', 'boolean', 'Prevents requests.'),
			prop('rootMargin', 'string', 'Preload distance hint.'),
			prop('loadMoreText', 'ReactNode', 'Manual action content.'),
			prop('loadingMoreText', 'ReactNode', 'Incremental loading content.'),
			prop('endReachedSection', 'ReactNode', 'End-of-list content.'),
			prop('onLoadMore', '() => void', 'Requests more items.'),
		]),
		contract('ListPaginationProps', [
			prop('mode', '"offset" | "cursor"', 'Pagination strategy.', {
				required: true,
			}),
			prop('page', 'number', 'Current offset page.'),
			prop('rowsPerPage', 'number', 'Page size.', {
				required: true,
			}),
			prop('total', 'number', 'Total offset items.'),
			prop('hasPreviousPage', 'boolean', 'Cursor previous state.'),
			prop('hasNextPage', 'boolean', 'Cursor next state.'),
			prop('onPageChange', '(page: number) => void', 'Changes offset page.'),
			prop('onPreviousPage', '() => void', 'Loads previous cursor page.'),
			prop('onNextPage', '() => void', 'Loads next cursor page.'),
			prop(
				'onRowsPerPageChange',
				'(rows: number) => void',
				'Changes page size.',
			),
		]),
	],
	'phone-input': [
		contract('PhoneValue', [
			prop('iso', 'string', 'ISO country code.', {
				required: true,
			}),
			prop('ddi', 'string', 'International dialing code.'),
			prop('number', 'string', 'National phone number.', {
				required: true,
			}),
		]),
	],
	progress: [
		contract('LabelProps', [
			prop('content', 'string', 'Visible label.'),
			prop('required', 'boolean', 'Shows required marker.'),
			prop('optional', 'boolean', 'Shows optional marker.'),
			prop('disabled', 'boolean', 'Applies disabled state.'),
			prop('tooltip', 'ReactNode', 'Supplementary explanation.'),
		]),
	],
	select: [
		selectInfiniteContract,
	],
	slider: [
		contract('SliderSingleProps', [
			prop('mode', '"single"', 'Single thumb.', {
				required: true,
			}),
			prop('orientation', 'SliderOrientation', 'Axis.', {
				required: true,
			}),
			prop('disabled', 'boolean', 'Prevents interaction.'),
			prop('size', 'SliderSize', 'Track size.'),
			prop('value', 'number', 'Controlled value.'),
			prop('defaultValue', 'number', 'Initial value.'),
			prop('onValueChange', '(value: number) => void', 'Handles changes.'),
		]),
		contract('SliderRangeProps', [
			prop('mode', '"range"', 'Two boundaries.', {
				required: true,
			}),
			prop('orientation', 'SliderOrientation', 'Axis.', {
				required: true,
			}),
			prop('disabled', 'boolean', 'Prevents interaction.'),
			prop('size', 'SliderSize', 'Track size.'),
			prop('value', '[number, number]', 'Controlled range.'),
			prop('defaultValue', '[number, number]', 'Initial range.'),
			prop(
				'onValueChange',
				'(value: [number, number]) => void',
				'Handles changes.',
			),
		]),
	],
	switch: [
		contract('LabelProps', [
			prop('content', 'string', 'Visible label.'),
			prop('required', 'boolean', 'Shows required marker.'),
			prop('optional', 'boolean', 'Shows optional marker.'),
			prop('disabled', 'boolean', 'Applies disabled state.'),
			prop('tooltip', 'ReactNode', 'Supplementary explanation.'),
		]),
	],
	uploader:
		reactMobileDocs.find((item) => item.slug === 'uploader')?.contracts ?? [],
}

for (const component of reactMobileDocs) {
	if (component.slug === 'dropdown-menu') {
		component.contracts = []
	} else if (contractOverrides[component.slug]) {
		component.contracts = contractOverrides[component.slug]
	}
}

export const reactMobileDocGroups = [
	'Core',
	'Layout',
	'Forms',
	'Content',
	'Feedback',
	'Overlays & navigation',
] as const satisfies readonly MobileComponentCategory[]

export function getReactMobileDoc(slug: string) {
	return reactMobileDocs.find((component) => component.slug === slug)
}
