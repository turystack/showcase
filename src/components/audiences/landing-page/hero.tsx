import { ArrowRightIcon } from '@turystack/react-icons'
import {
	Badge,
	Button,
	Container,
	Flex,
	Grid,
	Typography,
} from '@turystack/react-web'

import { ProductShot } from '@/components/audiences/landing-page/product-shot'
import {
	HREF,
	PRIMARY_CTA,
	SECONDARY_CTA,
	Section,
} from '@/components/audiences/landing-page/section'

/**
 * The first screen: the promise and the primary action.
 *
 * Anatomy, in every variant: badge, a 7-word H1, one sentence, one primary and
 * one secondary action, the reassurance line. No third action, no carousel,
 * no logos inside the hero — the logo strip is the next section.
 *
 * - `centered-with-screenshot` — the SaaS default: copy
 *   centred, the product underneath it
 * - `centered` — copy only, for a product that is hard to show in one frame
 * - `split` — copy beside the product, which keeps the action above the fold
 *   on a short screen; below 1024px the product drops under the copy
 */
export type HeroVariant = 'centered-with-screenshot' | 'centered' | 'split'

const HEADLINE = 'Every order, customer and payment in one place'

const DESCRIPTION =
	'Acme brings sales, billing and support into one workspace, so your team stops copying numbers between spreadsheets.'

function Announcement() {
	return (
		<Badge variant="outline">
			<Flex
				align="center"
				gap="xs"
				inline
			>
				New: recurring orders on autopilot
				<ArrowRightIcon size={12} />
			</Flex>
		</Badge>
	)
}

function Actions({ justify }: { justify: 'start' | 'center' }) {
	return (
		<Flex
			direction="col"
			gap="md"
		>
			<Flex
				gap="sm"
				justify={justify}
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
			<Typography
				align={justify === 'center' ? 'center' : 'left'}
				component="p"
				size="sm"
				variant="muted"
			>
				14 days free · No card required · Cancel anytime
			</Typography>
		</Flex>
	)
}

function CenteredCopy() {
	return (
		<Container
			maxWidth="md"
			textAlign="center"
		>
			<Flex
				align="center"
				direction="col"
				gap="lg"
			>
				<Announcement />
				<Typography
					align="center"
					component="h1"
					size="6xl"
					weight="bold"
				>
					{HEADLINE}
				</Typography>
				<Typography
					align="center"
					component="p"
					size="xl"
					variant="muted"
				>
					{DESCRIPTION}
				</Typography>
				<Actions justify="center" />
			</Flex>
		</Container>
	)
}

export function Hero({ variant }: { variant: HeroVariant }) {
	if (variant === 'split') {
		return (
			<Section spacing="xl">
				<Grid
					align="center"
					cols={{
						base: 1,
						lg: 2,
					}}
					gap="xl"
				>
					<Flex
						align="start"
						direction="col"
						gap="lg"
					>
						<Announcement />
						<Typography
							component="h1"
							size="5xl"
							weight="bold"
						>
							{HEADLINE}
						</Typography>
						<Typography
							component="p"
							size="lg"
							variant="muted"
						>
							{DESCRIPTION}
						</Typography>
						<Actions justify="start" />
					</Flex>
					<ProductShot compact />
				</Grid>
			</Section>
		)
	}

	return (
		<Section spacing="xl">
			<Flex
				direction="col"
				gap="xl"
			>
				<CenteredCopy />
				{variant === 'centered-with-screenshot' ? <ProductShot /> : null}
			</Flex>
		</Section>
	)
}
