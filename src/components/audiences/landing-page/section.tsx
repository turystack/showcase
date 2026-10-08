import { Badge, Box, Container, Flex, Typography } from '@turystack/react-web'
import type { PropsWithChildren, ReactNode } from 'react'

/**
 * The landing page's one rhythm, shared by every section.
 *
 * A section is a full-width band (so a muted background reaches both edges)
 * holding the page's single `Container` — `lg`, 1152px, with the shell's 24px
 * gutter inside it — so every section's left edge is the same line, and the
 * same line as the header's logo.
 *
 * - `xl` — 96px a side, the hero's: the first screen breathes the most
 * - `lg` — 64px a side, the generous band every content section uses
 * - `md` — 32px a side, the tighter band of the logo strip and the footer
 *
 * `id` makes the band an in-page anchor, the target of the header's links.
 */
export type SectionSpacing = 'md' | 'lg' | 'xl'

const PADDING_Y = {
	lg: '2xl',
	md: 'xl',
	xl: '3xl',
} as const

export function Section({
	bg,
	children,
	id,
	spacing = 'lg',
}: PropsWithChildren<{
	bg?: 'muted'
	id?: string
	spacing?: SectionSpacing
}>) {
	return (
		<Box
			bg={bg}
			id={id}
			paddingY={PADDING_Y[spacing]}
			width="full"
		>
			<Container
				maxWidth="lg"
				paddingX="md"
			>
				{children}
			</Container>
		</Box>
	)
}

/**
 * Eyebrow, H2 and one line of description, centred above a section's content.
 */
export function SectionHeading({
	description,
	eyebrow,
	title,
}: {
	description?: ReactNode
	eyebrow?: ReactNode
	title: ReactNode
}) {
	return (
		<Flex
			align="center"
			direction="col"
			gap="md"
		>
			{eyebrow ? <Badge variant="outline">{eyebrow}</Badge> : null}
			<Typography
				align="center"
				component="h2"
				size="4xl"
				weight="bold"
			>
				{title}
			</Typography>
			{description ? (
				<Typography
					align="center"
					centered
					component="p"
					maxWidth="lg"
					size="lg"
					variant="muted"
				>
					{description}
				</Typography>
			) : null}
		</Flex>
	)
}

/**
 * The page's one primary action, spelled the same in the header, the hero,
 * the closing call to action and the paid tiers. A specific verb, not
 * "Get started".
 */
export const PRIMARY_CTA = 'Start free trial'

/** The secondary path for a visitor not ready to sign up. */
export const SECONDARY_CTA = 'Book a demo'

/**
 * Where the actions go. They navigate — to the sign-up, the demo booking,
 * the sign-in — so each is a `Button href`, a real link, not a button with a
 * click handler.
 */
export const HREF = {
	contactSales: '/contact-sales',
	demo: '/demo',
	signIn: '/sign-in',
	signUp: '/sign-up',
} as const

/** A link's path from its label: "API reference" → "/api-reference". */
export function pathOf(label: string) {
	return `/${label.toLowerCase().replaceAll(' ', '-')}`
}
