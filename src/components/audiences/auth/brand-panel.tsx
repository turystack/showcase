import { Flex, Layout, Typography } from '@turystack/react-web'
import type { ReactNode } from 'react'

import { AcmeLogo } from '@/components/audiences/acme-logo'

/**
 * The brand side of a split auth screen: the logo, a line of welcome, and
 * nothing to act on — the form beside it is the only thing to do.
 *
 * A surface of its own, so it is a second `Layout.Content` painted with the
 * theme's `gradient`
 * beside the form's, with `span={2}` against the form's `span={3}` for the
 * 60/40 split. `Layout.Main` puts the two side by side from `md` and stacks
 * them below it, form first.
 */
export function BrandPanel({
	children,
	title,
}: {
	children: ReactNode
	title: string
}) {
	return (
		<Layout.Content
			bg="gradient"
			// Wider than the form's column: a line of welcome that breaks before
			// its last word reads as a mistake.
			maxWidth="sm"
			span={2}
		>
			<Flex
				align="center"
				direction="col"
				gap="md"
			>
				<AcmeLogo size="lg" />
				{/* A line of welcome, not a section heading: the form beside it
				    names the page, so this stays a paragraph set large. */}
				<Typography
					align="center"
					component="p"
					size="xl"
					weight="bold"
				>
					{title}
				</Typography>
				<Typography
					align="center"
					component="p"
					size="sm"
					variant="muted"
				>
					{children}
				</Typography>
			</Flex>
		</Layout.Content>
	)
}
