import { createFileRoute, Outlet, useMatchRoute } from '@tanstack/react-router'

import { LibraryLayout } from '@/layout'

import type { SidebarSection } from '@/components/docs/DocsSidebar'

const sections: SidebarSection[] = [
	{
		items: [
			{
				label: 'Introduction',
				to: '/libs/ui',
			},
		],
		title: 'Getting Started',
	},
	{
		items: [
			{
				label: 'Playground',
				to: '/libs/ui/playground',
			},
		],
		title: 'Playground',
	},
	{
		items: [
			{
				label: 'Provider',
				to: '/libs/ui/provider',
			},
			{
				label: 'Theme',
				to: '/libs/ui/theme',
			},
			{
				label: 'ColorScheme',
				to: '/libs/ui/color-scheme',
			},
			{
				label: 'Layout',
				to: '/libs/ui/layout',
			},
			{
				label: 'I18n',
				to: '/libs/ui/i18n',
			},
		],
		title: 'Core',
	},
	{
		subsections: [
			{
				items: [
					{
						label: 'Checkbox',
						to: '/libs/ui/checkbox',
					},
					{
						label: 'CurrencyInput',
						to: '/libs/ui/currency-input',
					},
					{
						label: 'DateInput',
						to: '/libs/ui/date-input',
					},
					{
						label: 'DateRangeInput',
						to: '/libs/ui/date-range-input',
					},
					{
						label: 'DocumentInput',
						to: '/libs/ui/document-input',
					},
					{
						label: 'Form',
						to: '/libs/ui/form',
					},
					{
						label: 'Input',
						to: '/libs/ui/input',
					},
					{
						label: 'Label',
						to: '/libs/ui/label',
					},
					{
						label: 'MaskInput',
						to: '/libs/ui/mask-input',
					},
					{
						label: 'NumberInput',
						to: '/libs/ui/number-input',
					},
					{
						label: 'OTPInput',
						to: '/libs/ui/otp-input',
					},
					{
						label: 'PhoneInput',
						to: '/libs/ui/phone-input',
					},
					{
						label: 'Radio',
						to: '/libs/ui/radio',
					},
					{
						label: 'Select',
						to: '/libs/ui/select',
					},
					{
						label: 'Slider',
						to: '/libs/ui/slider',
					},
					{
						label: 'Switch',
						to: '/libs/ui/switch',
					},
					{
						label: 'TagsInput',
						to: '/libs/ui/tags-input',
					},
					{
						label: 'Textarea',
						to: '/libs/ui/textarea',
					},
					{
						label: 'Uploader',
						to: '/libs/ui/uploader',
					},
				],
				title: 'Form',
			},
			{
				items: [
					{
						label: 'Accordion',
						to: '/libs/ui/accordion',
					},
					{
						label: 'Avatar',
						to: '/libs/ui/avatar',
					},
					{
						label: 'Badge',
						to: '/libs/ui/badge',
					},
					{
						label: 'Breadcrumb',
						to: '/libs/ui/breadcrumb',
					},
					{
						label: 'Button',
						to: '/libs/ui/button',
					},
					{
						label: 'Card',
						to: '/libs/ui/card',
					},
					{
						label: 'Flex',
						to: '/libs/ui/flex',
					},
					{
						label: 'Grid',
						to: '/libs/ui/grid',
					},
					{
						label: 'Separator',
						to: '/libs/ui/separator',
					},
					{
						label: 'Skeleton',
						to: '/libs/ui/skeleton',
					},
					{
						label: 'Table',
						to: '/libs/ui/table',
					},
					{
						label: 'Tabs',
						to: '/libs/ui/tabs',
					},
					{
						label: 'Typography',
						to: '/libs/ui/typography',
					},
				],
				title: 'Display',
			},
			{
				items: [
					{
						label: 'Alert',
						to: '/libs/ui/alert',
					},
					{
						label: 'Confirm',
						to: '/libs/ui/confirm',
					},
					{
						label: 'Loader',
						to: '/libs/ui/t-loader',
					},
					{
						label: 'LoadingOverlay',
						to: '/libs/ui/loading-overlay',
					},
					{
						label: 'Pagination',
						to: '/libs/ui/pagination',
					},
					{
						label: 'Progress',
						to: '/libs/ui/progress',
					},
					{
						label: 'Toast',
						to: '/libs/ui/toast',
					},
				],
				title: 'Feedback',
			},
			{
				items: [
					{
						label: 'DropdownMenu',
						to: '/libs/ui/dropdown-menu',
					},
					{
						label: 'Modal',
						to: '/libs/ui/modal',
					},
					{
						label: 'Popover',
						to: '/libs/ui/popover',
					},
					{
						label: 'Sheet',
						to: '/libs/ui/sheet',
					},
					{
						label: 'Tooltip',
						to: '/libs/ui/tooltip',
					},
				],
				title: 'Overlays',
			},
		],
		title: 'Components',
	},
]

function Page() {
	const matchRoute = useMatchRoute()
	const isPlayground = matchRoute({
		to: '/libs/ui/playground',
	})

	return (
		<LibraryLayout
			contentClassName={isPlayground ? 'max-w-none py-8 px-10' : undefined}
			githubUrl="https://github.com/turystack/ui"
			libraryName="@tury/ui"
			sections={sections}
		>
			<Outlet />
		</LibraryLayout>
	)
}

export const Route = createFileRoute('/libs/ui')({
	component: Page,
})
