import { createFileRoute, Outlet } from '@tanstack/react-router'

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
				label: 'TuryStackProvider',
				to: '/libs/ui/provider',
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
						label: 'Input',
						to: '/libs/ui/input',
					},
					{
						label: 'MaskInput',
						to: '/libs/ui/mask-input',
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
						label: 'Select',
						to: '/libs/ui/select',
					},
					{
						label: 'TagsInput',
						to: '/libs/ui/tags-input',
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
						label: 'Button',
						to: '/libs/ui/button',
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
						label: 'Loader',
						to: '/libs/ui/t-loader',
					},
				],
				title: 'Feedback',
			},
			{
				items: [
					{
						label: 'Breadcrumb',
						to: '/libs/ui/breadcrumb',
					},
				],
				title: 'Navigation',
			},
		],
		title: 'Components',
	},
]

function Page() {
	return (
		<LibraryLayout
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
