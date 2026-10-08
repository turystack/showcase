import { Box, Button, Card, Flex, Typography } from '@turystack/react-web'

import {
	HREF,
	PRIMARY_CTA,
	SECONDARY_CTA,
	Section,
} from '@/components/audiences/landing-page/section'

/**
 * The last ask before the footer: a short H2, one sentence, and the hero's
 * two actions spelled exactly as they were at the top of the page.
 *
 * - `banner` — a full-width muted band
 * - `card` — a contained card inside the page's column, copy against actions
 */
export type CallToActionVariant = 'banner' | 'card'

const TITLE = 'Run your operation from one place'

const DESCRIPTION =
	'Set up in an afternoon, with your own orders imported. Fourteen days free, no card required.'

function Actions() {
	return (
		<Flex
			gap="sm"
			wrap="wrap"
		>
			<Button
				href={HREF.signUp}
				size="lg"
			>
				{PRIMARY_CTA}
			</Button>
			<Button
				href={HREF.demo}
				size="lg"
				variant="outline"
			>
				{SECONDARY_CTA}
			</Button>
		</Flex>
	)
}

export function CallToAction({ variant }: { variant: CallToActionVariant }) {
	if (variant === 'card') {
		return (
			<Section>
				<Card>
					<Card.Content>
						<Box padding="lg">
							<Flex
								align="center"
								gap="xl"
								justify="between"
								wrap="wrap"
							>
								<Flex
									direction="col"
									gap="sm"
								>
									<Typography
										component="h2"
										size="3xl"
										weight="bold"
									>
										{TITLE}
									</Typography>
									<Typography
										component="p"
										variant="muted"
									>
										{DESCRIPTION}
									</Typography>
								</Flex>
								<Actions />
							</Flex>
						</Box>
					</Card.Content>
				</Card>
			</Section>
		)
	}

	return (
		<Section bg="muted">
			<Flex
				align="center"
				direction="col"
				gap="lg"
			>
				<Typography
					align="center"
					component="h2"
					size="4xl"
					weight="bold"
				>
					{TITLE}
				</Typography>
				<Typography
					align="center"
					centered
					component="p"
					maxWidth="lg"
					size="lg"
					variant="muted"
				>
					{DESCRIPTION}
				</Typography>
				<Actions />
			</Flex>
		</Section>
	)
}
